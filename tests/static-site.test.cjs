const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const walk = (dir) => {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return [];
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(dir, entry.name).split(path.sep).join("/");
    return entry.isDirectory() ? walk(relative) : [relative];
  });
};

const packageJson = JSON.parse(read("package.json"));
assert.equal(packageJson.dependencies.astro, "^7.0.5", "Astro should be pinned to the measured 7.0.5 range");
for (const [name, version] of Object.entries(packageJson.dependencies)) {
  assert.ok(!String(version).includes("latest"), `${name} should not use latest`);
}
assert.ok(packageJson.dependencies["@astrojs/sitemap"], "official Astro sitemap integration should be installed");
assert.ok(packageJson.dependencies["@astrojs/rss"], "official Astro RSS package should be installed");
assert.ok(packageJson.scripts.test.includes("tests/static-site.test.cjs"), "test script should run source assertions");
assert.ok(packageJson.scripts.test.includes("tests/indexnow.test.cjs"), "test script should run IndexNow assertions");
assert.ok(packageJson.scripts["check:tool-reviews"], "tool review script should be wired");
assert.ok(packageJson.scripts["verify:seo"], "SEO build verifier should be wired");
assert.ok(packageJson.scripts.indexnow, "IndexNow submission script should be wired");
assert.ok(packageJson.scripts["indexnow:all"], "full-sitemap IndexNow submission should be wired");
assert.ok(packageJson.scripts["indexnow:remote"], "production-sitemap IndexNow submission should be wired");
assert.ok(exists(".github/workflows/indexnow.yml"), "post-deployment IndexNow workflow should exist");
assert.ok(exists("src/pages/deployment.json.js"), "Cloudflare deployment marker endpoint should exist");
assert.ok(read("src/pages/deployment.json.js").includes("CF_PAGES_COMMIT_SHA"), "deployment marker should use Cloudflare's commit SHA");
assert.ok(exists("public/_headers"), "Cloudflare headers file should exist");
assert.ok(read("public/_headers").includes("/deployment.json"), "deployment marker should disable caching");

assert.ok(!exists("index.html"), "legacy root index.html should be archived");
assert.ok(!exists("app.js"), "legacy root app.js should be archived");
assert.ok(!exists("styles.css"), "legacy root styles.css should be archived");
assert.ok(exists("_archive/legacy-spa/index.html"), "legacy SPA should be preserved under _archive");
assert.ok(exists("_archive/legacy-spa/app.js"), "legacy SPA data should be preserved under _archive");
assert.ok(exists("_archive/legacy-spa/styles.css"), "legacy SPA styles should be preserved under _archive");

const astroConfig = read("astro.config.mjs");
assert.ok(astroConfig.includes("@astrojs/sitemap"), "astro config should import sitemap integration");
assert.ok(astroConfig.includes("sitemap("), "astro config should enable sitemap integration");
assert.ok(astroConfig.includes('page !== "https://toolmanai.com/deployment.json"'), "sitemap should exclude the deployment marker");
assert.ok(astroConfig.includes("defer-astro-images"), "build should defer hashed images so they do not block window.load");
assert.ok(astroConfig.includes('output: "static"'), "Astro output must stay static");
assert.ok(astroConfig.includes('trailingSlash: "always"'), "trailing slash should stay enabled");

const redirects = read("vercel.json");
const vercelRedirects = JSON.parse(redirects).redirects;
const hasVercelRedirect = (source, destination) =>
  vercelRedirects.some((redirect) => redirect.source === source && redirect.destination === destination && redirect.statusCode === 301);
assert.ok(redirects.includes('"statusCode": 301'), "redirects should use 301");
assert.ok(redirects.includes("/tutorials/categories/"), "legacy tutorial category/detail redirects should be covered");
assert.ok(redirects.includes("/tools/categories/"), "legacy tool category/detail redirects should be covered");
assert.ok(redirects.includes("/sitemap.xml"), "legacy sitemap URL should redirect");
assert.ok(redirects.includes("/sitemap-index.xml"), "sitemap redirect destination should be sitemap-index.xml");

assert.ok(!exists("src/pages/sitemap.xml.js"), "custom sitemap endpoint should be removed");
assert.ok(!exists("src/pages/robots.txt.js"), "robots should be a static public file");
assert.ok(!exists("src/pages/tutorials/index.astro"), "old /tutorials route should be removed after redirects exist");
assert.ok(exists("src/pages/blog/index.astro"), "new /blog route should exist");
assert.ok(exists("src/pages/blog/[slug].astro"), "new flat article route should exist");
assert.ok(exists("src/pages/blog/categories/[categorySlug]/index.astro"), "new blog category route should exist");

const routes = read("src/lib/routes.mjs");
assert.ok(routes.includes("CATEGORY_SLUGS"), "route helpers should define category slug mappings");
assert.ok(routes.includes("blogDetailPath"), "blog detail helper should exist");
assert.ok(routes.includes("return `/blog/${"), "blog details should be flat under /blog/{slug}/");
assert.ok(routes.includes("return `/tools/${"), "tool details should be flat under /tools/{slug}/");
assert.ok(!routes.includes("encodeURIComponent(String(value"), "SEO routes should not derive canonical slugs from encoded display names");

const siteData = read("src/data/site.mjs");
assert.ok(!siteData.includes('require(path.join(process.cwd(), "app.js"))'), "Astro data should not depend on the archived root SPA");
assert.ok(siteData.includes("categories"), "site data should export category data");
assert.ok(siteData.includes("slug:"), "site categories and tools should include explicit slugs");
assert.ok(siteData.includes("lastReviewed"), "tools should include lastReviewed dates");
assert.ok(!siteData.includes("需人工核实"), "internal review notes must not leak into rendered tool content");
assert.ok(!siteData.includes("pic.code-nav.cn"), "tool images should not use pic.code-nav.cn");
assert.ok(!siteData.includes("Claude 3 Haiku"), "known stale Claude model copy should be removed");
assert.ok(!siteData.includes("重塑人机交互的未来"), "empty marketing copy should be removed");

const contentConfig = read("src/content.config.ts");
for (const field of ["seoTitle", "slug", "dateModified", "relatedTools", "faq"]) {
  assert.ok(contentConfig.includes(field), `content schema should include ${field}`);
}
assert.ok(contentConfig.includes("descriptionSchema"), "description should use a strict schema");

const postFiles = walk("src/content/posts").filter((file) => file.endsWith(".md"));
assert.ok(postFiles.length > 0, "posts should exist");
const relatedToolsEmpty = [];
for (const file of postFiles) {
  const source = read(file);
  for (const field of ["slug:", "seoTitle:", "dateModified:", "relatedTools:", "faq:"]) {
    assert.ok(source.includes(field), `${file} should include ${field}`);
  }
  assert.ok(!source.match(/!\[[^\]]*]\(https?:\/\/[^)]*(feishu|larksuite)[^)]*\)/i), `${file} should not render Feishu/Lark image embeds`);
  assert.ok(!source.match(/!\[\s*]\(/), `${file} content images must have descriptive alt text`);
  assert.ok(!source.includes("12.8k 阅读"), `${file} should not contain fake reads`);
  const frontmatter = source.split("---")[1] || "";
  for (const phrase of ["需人工核实", "人工复核", "人工补充", "这篇教程适合谁阅读"]) {
    assert.ok(!frontmatter.includes(phrase), `${file} FAQ must be article-specific, not internal template copy (found ${phrase})`);
  }
  if (source.match(/relatedTools:\s*\[\s*]/)) relatedToolsEmpty.push(file);
}

const allSource = walk(".")
  .filter((file) => !file.startsWith(".git/") && !file.startsWith("node_modules/") && !file.startsWith("dist/"))
  .filter((file) => !file.startsWith(".astro/"))
  .filter((file) => !file.startsWith("_archive/"))
  .filter((file) => !file.startsWith("tests/"))
  .filter((file) => !file.startsWith("scripts/"))
  .filter((file) => /\.(astro|js|mjs|cjs|ts|md|json|txt)$/.test(file));
const allSourceText = allSource.map((file) => read(file)).join("\n");
for (const file of allSource) {
  assert.ok(!read(file).match(/!\[[^\]]*]\(https?:\/\/[^)]*(feishu|larksuite)[^)]*\)/i), `${file} should not render Feishu/Lark images`);
}
for (const file of ["src/lib/seo.mjs", "src/pages/rss.xml.js", ...postFiles]) {
  assert.ok(!read(file).includes("localStorage"), `${file} should remain static and not use localStorage`);
}
assert.ok(!allSourceText.includes("pic.code-nav.cn"), "source should not reference pic.code-nav.cn");
assert.ok(!allSourceText.includes("12.8k 阅读"), "fake read count copy should be gone");

const layout = read("src/layouts/SiteLayout.astro");
assert.ok(layout.includes("/og-default.png"), "layout should fall back to default OG image");
assert.ok(layout.includes("canonical === false"), "layout should allow noindex error pages to omit canonical URLs");
assert.ok(layout.includes('summary_large_image'), "Twitter card should always be large image");
assert.ok(layout.includes('href={absoluteUrl("/rss.xml")}'), "head should expose RSS");
assert.ok(layout.includes("<JsonLd"), "layout should use unified JSON-LD component");
assert.ok(layout.includes('localStorage.getItem("toolman-theme")'), "layout should bootstrap saved theme before CSS loads");
assert.ok(layout.includes('data-theme-toggle'), "layout should render the header theme toggle");
assert.ok(layout.includes("`/site.js?v=${assetVersion}`"), "site script should be cache-busted");
assert.ok(layout.includes('img[data-defer-src]'), "layout should hide deferred placeholders when JavaScript is disabled");
assert.ok(layout.includes('querySelectorAll("img[data-defer-src]")'), "layout should hydrate deferred images without waiting on site.js");
assert.ok(layout.includes('window.addEventListener("load", hydrateDeferredImages)'), "deferred images must wait for window.load so the tab spinner can stop");
assert.ok(
  !layout.match(/<script[^>]+src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js/),
  "layout must not parser-insert Google Analytics; a blocked gtag.js keeps the tab spinner spinning",
);

const integrations = read("src/components/SiteIntegrations.astro");
assert.ok(
  !integrations.match(/<script[^>]+src=\{?`?https:\/\/www\.googletagmanager\.com\/gtag\/js/),
  "integrations must not parser-insert Google Analytics",
);
assert.ok(integrations.includes('window.addEventListener("load", inject)'), "Google Analytics must load after window.load");
assert.ok(integrations.includes("document.createElement"), "analytics scripts should be injected dynamically");

const deferredCover = read("src/components/DeferredCover.astro");
assert.ok(deferredCover.includes("data-defer-src"), "cover images must not use a real src until after window.load");
assert.ok(deferredCover.includes("<noscript>"), "cover images must remain visible when JavaScript is disabled");
assert.ok(deferredCover.includes('format: "webp"'), "local covers should be resized to webp");
assert.ok(read("src/components/TutorialCard.astro").includes("DeferredCover"), "tutorial cards should use deferred covers");
assert.ok(read("src/components/ArticleVisual.astro").includes("DeferredCover"), "article visuals should use deferred covers");
assert.ok(!read("src/lib/posts.mjs").includes('query: "?url"'), "post images should stay ImageMetadata so Astro can optimize them");

const siteScript = read("public/site.js");
assert.ok(siteScript.includes('THEME_STORAGE_KEY = "toolman-theme"'), "site script should define the theme storage key");
assert.ok(siteScript.includes('prefers-color-scheme: dark'), "site script should read the system dark preference");
assert.ok(siteScript.includes("matchMedia"), "site script should listen for system theme changes");

const styles = read("public/styles.css");
assert.ok(styles.includes('color-scheme: light'), "light theme should declare its color scheme");
assert.ok(styles.includes('html[data-theme="dark"]'), "styles should include dark theme token overrides");
assert.ok(styles.includes(".theme-toggle"), "styles should include the header theme toggle");
assert.ok(styles.includes(".markdown-body table"), "markdown tables should have grid styles");
assert.ok(styles.includes(".markdown-body th"), "markdown table headers should be styled");
assert.ok(styles.includes(".markdown-body td"), "markdown table cells should be styled");
assert.ok(styles.includes("border-collapse: collapse"), "markdown tables should collapse borders into a visible grid");

const home = read("src/pages/index.astro");
assert.ok(home.includes("工具人AI导航：AI 工具评测与国内使用教程"), "home H1 should include brand and value proposition");
assert.ok(!home.includes("<h1 id=\"homeArticlesTitle\""), "recommended articles should no longer be the H1");

const blogDetail = read("src/pages/blog/[slug].astro");
assert.ok(blogDetail.includes("seoTitle"), "article title tag should prefer seoTitle");
assert.ok(blogDetail.includes("<RelatedTools"), "article pages should render related tool cards");
assert.ok(blogDetail.includes("<FAQBlock"), "article pages should render FAQ blocks");
assert.ok(blogDetail.includes("dateModified"), "article pages should use modified dates");
assert.ok(blogDetail.includes("/about/authors/"), "article authorship should link to author page");

const toolDetail = read("src/pages/tools/[id].astro");
assert.ok(toolDetail.includes("<RelatedTutorials"), "tool pages should render related tutorials");
assert.ok(toolDetail.includes("SoftwareApplication"), "tool pages should include software JSON-LD data");

assert.ok(exists("src/components/JsonLd.astro"), "JSON-LD component should exist");
assert.ok(exists("src/components/FAQBlock.astro"), "FAQ component should exist");
assert.ok(exists("src/components/RelatedTools.astro"), "article related tools component should exist");
assert.ok(exists("src/components/RelatedTutorials.astro"), "tool related tutorials component should exist");
assert.ok(exists("src/pages/about/authors/index.astro"), "author page should exist");
assert.ok(!read("src/pages/about/authors/index.astro").includes("需人工"), "author page must not expose internal placeholders");
assert.ok(exists("src/pages/404.astro"), "404 page must exist so Cloudflare Pages disables the SPA fallback");
assert.ok(read("src/pages/404.astro").includes("canonical={false}"), "404 page must not canonicalize every missing URL to /404/");
assert.ok(exists("public/_redirects"), "Cloudflare Pages _redirects file must exist for legacy 301s");
const cfRedirects = read("public/_redirects");
const cfRedirectEntries = cfRedirects
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => {
    const [source, destination, status, ...extra] = line.split(/\s+/);
    assert.deepEqual(extra, [], `_redirects line must contain exactly three fields: ${line}`);
    assert.equal(status, "301", `_redirects must use permanent redirects: ${line}`);
    return { source, destination };
  });
assert.equal(new Set(cfRedirectEntries.map(({ source }) => source)).size, cfRedirectEntries.length, "_redirects sources must be unique");
assert.equal(new Set(vercelRedirects.map(({ source }) => source)).size, vercelRedirects.length, "vercel.json sources must be unique");
assert.ok(cfRedirects.includes("/tutorials/claudecode-jiaocheng/ /blog/claude-code-guide/ 301"), "_redirects should map legacy tutorial URLs");
const legacyPostMappings = {
  "poe-jiaocheng": "poe-subscription-guide",
  "claude-shengji-jiaocheng": "claude-subscription-guide",
  "notebooklm-jiaocheng": "notebooklm-guide",
  "免费还好用google-ai-studio保姆级教程": "google-ai-studio-guide",
  "claude-fable-5-来了强是真强但苟也是真苟附国内使用教程": "claude-fable-5-review",
  "sunoai-jiaocheng": "suno-ai-music-guide",
  "ai-siweidaotu-jiaocheng": "ai-mindmap-guide",
  "claudecode-jiaocheng": "claude-code-guide",
  "google-play-jiaocheng": "google-play-install-guide",
  "spotify-jiaocheng": "spotify-premium-guide",
  "aippt-jiaocheng": "ai-ppt-tools-guide",
  "chatgpt-plus-shengji-jiaocheng": "chatgpt-plus-subscription-guide",
  "meiqu-appleid-jiaocheng": "us-apple-id-guide",
};
for (const [oldSlug, newSlug] of Object.entries(legacyPostMappings)) {
  for (const suffix of ["", "/"]) {
    const source = `/posts/${oldSlug}${suffix}`;
    const destination = `/blog/${newSlug}/`;
    assert.ok(
      cfRedirects.includes(`${source} ${destination} 301`),
      `_redirects should map ${source}`,
    );
    assert.ok(hasVercelRedirect(source, destination), `vercel.json should map ${source}`);
  }
}
const legacyToolMappings = {
  claude: "claude",
  chatgpt: "chatgpt",
  poe: "poe",
  "google-ai": "google-ai-studio",
  notebooklm: "notebooklm",
  suno: "suno",
  "claude-code": "claude-code",
  spotify: "spotify",
};
for (const [oldSlug, newSlug] of Object.entries(legacyToolMappings)) {
  for (const suffix of ["", "/"]) {
    const source = `/tools/categories/:category/:subcategory/${oldSlug}${suffix}`;
    const destination = `/tools/${newSlug}/`;
    assert.ok(cfRedirects.includes(`${source} ${destination} 301`), `_redirects should map ${source}`);
    assert.ok(hasVercelRedirect(source, destination), `vercel.json should map ${source}`);
  }
}
assert.ok(!cfRedirects.includes("/posts/*"), "unknown legacy post URLs should remain 404");
assert.ok(!cfRedirects.includes("/tutorials/* /blog/ 301"), "unknown legacy tutorial URLs should remain 404");
assert.ok(!cfRedirects.includes(":old/ /blog/:old/ 301"), "redirects must not guess current article slugs");
assert.ok(!cfRedirects.includes(":id/ /tools/:id/ 301"), "redirects must not guess current tool slugs");
assert.ok(!vercelRedirects.some(({ source }) => source.startsWith("/posts/") && source.includes(":")), "Vercel must not wildcard legacy posts");
assert.ok(!vercelRedirects.some(({ source }) => source.includes("/tutorials/categories/:category/:old")), "Vercel must not guess article slugs");
assert.ok(!vercelRedirects.some(({ source }) => source.endsWith("/:id") || source.endsWith("/:id/")), "Vercel must not guess tool slugs");
assert.ok(cfRedirects.includes("/sitemap.xml /sitemap-index.xml 301"), "_redirects should map legacy sitemap URL");
assert.ok(exists("public/robots.txt"), "static robots.txt should exist");
assert.ok(exists("public/llms.txt"), "llms.txt should exist");
assert.ok(exists("public/og-default.png"), "default OG image should exist");
assert.ok(exists("scripts/check-tool-reviews.cjs"), "tool review scanner should exist");
assert.ok(exists("scripts/verify-seo-build.cjs"), "SEO build verifier should exist");
assert.ok(exists("scripts/submit-indexnow.cjs"), "IndexNow submission script should exist");
assert.ok(exists("scripts/collect-indexnow-urls.cjs"), "IndexNow change detector should exist");
assert.ok(exists("scripts/wait-for-deployment.cjs"), "Cloudflare deployment waiter should exist");
assert.ok(exists("README.md"), "README should exist");
assert.ok(exists("MIGRATION_REPORT.md"), "migration report should exist");

const robots = read("public/robots.txt");
for (const line of ["User-agent: GPTBot", "User-agent: ClaudeBot", "User-agent: PerplexityBot", "User-agent: Google-Extended", "Sitemap: https://toolmanai.com/sitemap-index.xml"]) {
  assert.ok(robots.includes(line), `robots.txt should include ${line}`);
}
assert.ok(!robots.includes("Disallow: /tools/"), "robots should not block tools");
assert.ok(!robots.includes("Disallow: /blog/"), "robots should not block blog");

const llms = read("public/llms.txt");
assert.ok(llms.includes("工具人AI导航"), "llms.txt should include Chinese site description");
assert.ok(llms.includes("Toolman AI Navigation"), "llms.txt should include English site description");
assert.ok(llms.includes("https://toolmanai.com/blog/"), "llms.txt should list new blog URL");
assert.ok(llms.includes("https://toolmanai.com/tools/"), "llms.txt should list tools URL");

const rss = read("src/pages/rss.xml.js");
assert.ok(rss.includes("@astrojs/rss"), "RSS should use @astrojs/rss");
assert.ok(rss.includes("blogDetailPath"), "RSS should link to new blog detail URLs");

const report = read("MIGRATION_REPORT.md");
assert.ok(report.includes("新旧 URL 对照"), "report should include URL mapping");
assert.ok(report.includes("⚠️ 需人工"), "report should include manual follow-ups");
assert.ok(report.includes(robots.trim()), "report should include final robots.txt content");

assert.ok(relatedToolsEmpty.length > 0, "uncertain relatedTools should remain explicitly empty for reporting");

console.log("static-site v2 source assertions passed");
