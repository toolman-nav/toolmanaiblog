const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

assert.ok(fs.existsSync(path.join(root, "index.html")), "index.html should exist");
assert.ok(fs.existsSync(path.join(root, "styles.css")), "styles.css should exist");
assert.ok(fs.existsSync(path.join(root, "app.js")), "app.js should exist");
assert.ok(fs.existsSync(path.join(root, "package.json")), "package.json should exist for the Astro project");
assert.ok(fs.existsSync(path.join(root, "astro.config.mjs")), "astro.config.mjs should configure Astro");
assert.ok(fs.existsSync(path.join(root, "src/pages/index.astro")), "Astro should statically render the home page");
assert.ok(fs.existsSync(path.join(root, "src/pages/tools/index.astro")), "Astro should statically render the AI navigation page");
assert.ok(fs.existsSync(path.join(root, "src/pages/tools/[id].astro")), "Astro should statically render tool detail pages");
assert.ok(
  fs.existsSync(path.join(root, "src/pages/tools/categories/[category]/index.astro")),
  "Astro should statically render tool category routes",
);
assert.ok(
  fs.existsSync(path.join(root, "src/pages/tools/categories/[category]/[subcategory]/index.astro")),
  "Astro should statically render tool subcategory routes",
);
assert.ok(fs.existsSync(path.join(root, "src/pages/tutorials/index.astro")), "Astro should statically render the tutorial listing page");
assert.ok(fs.existsSync(path.join(root, "src/pages/tutorials/[id].astro")), "Astro should statically render tutorial detail pages");
assert.ok(
  fs.existsSync(path.join(root, "src/pages/tutorials/categories/[category]/index.astro")),
  "Astro should statically render tutorial category routes",
);
assert.ok(fs.existsSync(path.join(root, "src/pages/about.astro")), "Astro should statically render the about page");
assert.ok(fs.existsSync(path.join(root, "src/data/site.mjs")), "Astro should import legacy site data through an ESM wrapper");
assert.ok(fs.existsSync(path.join(root, "src/lib/routes.mjs")), "Astro should centralize SEO route generation");
assert.ok(fs.existsSync(path.join(root, "src/lib/seo.mjs")), "Astro should centralize SEO metadata and structured data helpers");
assert.ok(fs.existsSync(path.join(root, "src/pages/sitemap.xml.js")), "Astro should generate an XML sitemap");
assert.ok(fs.existsSync(path.join(root, "src/pages/robots.txt.js")), "Astro should generate robots.txt");
assert.ok(fs.existsSync(path.join(root, "src/pages/rss.xml.js")), "Astro should generate an RSS feed");
assert.ok(fs.existsSync(path.join(root, "src/components/SiteIntegrations.astro")), "Astro should centralize search and analytics integrations");
assert.ok(fs.existsSync(path.join(root, ".env.example")), "Project should document search and analytics environment variables");
assert.ok(fs.existsSync(path.join(root, "src/content.config.ts")), "Astro should define a content collection for GitHub tutorial posts");
assert.ok(
  fs.existsSync(path.join(root, "src/content/posts/claudecode-jiaocheng.md")),
  "GitHub tutorial posts should be copied into the local content collection",
);
assert.ok(
  fs.existsSync(path.join(root, "src/assets/images/claudecode-jiaocheng/00.png")),
  "GitHub tutorial images should be copied into local assets",
);

const packageJson = JSON.parse(read("package.json"));
assert.ok(packageJson.dependencies?.astro, "Astro should be a project dependency");
assert.equal(packageJson.scripts?.dev, "astro dev", "dev script should start the Astro dev server");
assert.equal(packageJson.scripts?.build, "astro build", "build script should generate the static site");
assert.equal(packageJson.scripts?.test, "node tests/static-site.test.cjs", "test script should run the project assertions");

const layoutSource = read("src/layouts/SiteLayout.astro");
const siteIntegrations = read("src/components/SiteIntegrations.astro");
const envExample = read(".env.example");
assert.ok(layoutSource.includes('href: "/tools/"'), "site layout should link to the real AI navigation route");
assert.ok(layoutSource.includes('href: "/tutorials/"'), "site layout should link to the real tutorial route");
assert.ok(layoutSource.includes('href: "/about/"'), "site layout should link to the real about route");
assert.ok(layoutSource.includes('data-global-search'), "site layout should keep a global search form");
assert.ok(layoutSource.includes("<SiteIntegrations />"), "site layout should include search and analytics integrations in head");
assert.ok(siteIntegrations.includes('name="google-site-verification"'), "integrations should support Google Search Console verification");
assert.ok(siteIntegrations.includes('name="msvalidate.01"'), "integrations should support Bing Webmaster verification");
assert.ok(siteIntegrations.includes('name="baidu-site-verification"'), "integrations should support Baidu resource platform verification");
assert.ok(siteIntegrations.includes("googletagmanager.com/gtag/js"), "integrations should support Google Analytics gtag");
assert.ok(siteIntegrations.includes("hm.baidu.com/hm.js"), "integrations should support Baidu Tongji statistics");
for (const envName of [
  "PUBLIC_GOOGLE_SITE_VERIFICATION",
  "PUBLIC_BING_SITE_VERIFICATION",
  "PUBLIC_BAIDU_SITE_VERIFICATION",
  "PUBLIC_GOOGLE_ANALYTICS_ID",
  "PUBLIC_BAIDU_TONGJI_ID",
]) {
  assert.ok(envExample.includes(envName), `.env.example should document ${envName}`);
}

const astroHome = read("src/pages/index.astro");
const astroTools = read("src/pages/tools/index.astro");
const astroToolDetail = read("src/pages/tools/[id].astro");
const astroToolCategory = read("src/pages/tools/categories/[category]/index.astro");
const astroToolSubcategory = read("src/pages/tools/categories/[category]/[subcategory]/index.astro");
const astroToolHierarchicalDetail = read("src/pages/tools/categories/[category]/[subcategory]/[id].astro");
const astroTutorials = read("src/pages/tutorials/index.astro");
const astroTutorialDetail = read("src/pages/tutorials/[id].astro");
const astroTutorialCategory = read("src/pages/tutorials/categories/[category]/index.astro");
const astroTutorialHierarchicalDetail = read("src/pages/tutorials/categories/[category]/[id].astro");
const articleVisual = read("src/components/ArticleVisual.astro");
const tutorialCard = read("src/components/TutorialCard.astro");
const toolTile = read("src/components/ToolTile.astro");
const toolCard = read("src/components/ToolCard.astro");
const routeUtils = read("src/lib/routes.mjs");
const postsLib = read("src/lib/posts.mjs");
const seoLib = read("src/lib/seo.mjs");
const sitemapEndpoint = read("src/pages/sitemap.xml.js");
const robotsEndpoint = read("src/pages/robots.txt.js");
const rssEndpoint = read("src/pages/rss.xml.js");
assert.ok(seoLib.includes('SITE_URL = "https://toolmanai.com"'), "SEO helpers should use the official Toolman AI domain");
assert.ok(seoLib.includes("absoluteUrl"), "SEO helpers should expose absolute URL generation");
assert.ok(seoLib.includes("websiteSchema"), "SEO helpers should generate WebSite structured data");
assert.ok(seoLib.includes("collectionPageSchema"), "SEO helpers should generate CollectionPage structured data");
assert.ok(seoLib.includes("articleSchema"), "SEO helpers should generate Article structured data");
assert.ok(seoLib.includes("softwareApplicationSchema"), "SEO helpers should generate SoftwareApplication structured data");
assert.ok(layoutSource.includes('property="og:title"'), "site layout should render Open Graph titles");
assert.ok(layoutSource.includes('property="og:url"'), "site layout should render Open Graph canonical URLs");
assert.ok(layoutSource.includes('name="twitter:card"'), "site layout should render Twitter card metadata");
assert.ok(layoutSource.includes('name="robots"'), "site layout should render robots indexing metadata");
assert.ok(layoutSource.includes('application/ld+json'), "site layout should render JSON-LD structured data");
assert.ok(layoutSource.includes("absoluteUrl"), "site layout should normalize SEO URLs to the official domain");
assert.ok(
  robotsEndpoint.includes('absoluteUrl("/sitemap.xml")') || robotsEndpoint.includes("https://toolmanai.com/sitemap.xml"),
  "robots.txt should point crawlers to the official sitemap URL",
);
assert.ok(sitemapEndpoint.includes("toolDetailPath"), "sitemap should include canonical tool detail routes");
assert.ok(sitemapEndpoint.includes("tutorialDetailPath"), "sitemap should include canonical tutorial detail routes");
assert.ok(rssEndpoint.includes("application/rss+xml"), "RSS endpoint should emit RSS XML");
assert.ok(rssEndpoint.includes("tutorialDetailPath"), "RSS feed should link to canonical tutorial detail routes");
assert.ok(astroHome.includes('getCollection("posts"'), "Astro home should render GitHub posts at build time");
assert.ok(astroHome.includes("Claude Code国内使用指南"), "Astro home should include the GitHub tutorial titles");
assert.ok(astroHome.includes("getPopularTools(8)"), "Astro home should render the current curated tool set at build time");
assert.ok(astroHome.includes("websiteSchema"), "Astro home should describe the site with WebSite structured data");
assert.ok(astroHome.includes("collectionPageSchema"), "Astro home should describe home recommendations with CollectionPage structured data");
assert.ok(astroTools.includes("collectionPageSchema"), "Astro tools index should describe the tool directory as structured data");
assert.ok(astroToolDetail.includes("softwareApplicationSchema"), "Tool detail pages should describe each tool with SoftwareApplication structured data");
assert.ok(astroToolHierarchicalDetail.includes("softwareApplicationSchema"), "Hierarchical tool detail pages should describe each tool with SoftwareApplication structured data");
assert.ok(astroTutorials.includes("collectionPageSchema"), "Tutorial listing should describe tutorial collections as structured data");
assert.ok(astroTutorialCategory.includes("collectionPageSchema"), "Tutorial category pages should describe category collections as structured data");
assert.ok(astroTutorialDetail.includes("articleSchema"), "Tutorial detail pages should describe posts with Article structured data");
assert.ok(astroTutorialHierarchicalDetail.includes("articleSchema"), "Hierarchical tutorial detail pages should describe posts with Article structured data");
assert.ok(postsLib.includes("normalizePostImage"), "GitHub post image paths should be normalized for local rendering");
assert.ok(postsLib.includes("const image = normalizePostImage"), "Mapped tutorial articles should expose GitHub cover images");
assert.ok(postsLib.includes("firstMarkdownImage"), "Mapped tutorial articles should fall back to the first Markdown image as cover");
assert.ok(articleVisual.includes("article.image"), "Article visuals should prefer GitHub cover images when present");
assert.ok(articleVisual.includes("<img"), "Article visuals should render real image elements for GitHub covers");
assert.ok(articleVisual.includes("{article.title}"), "Gradient article placeholders should use the article title");
assert.ok(tutorialCard.includes("article.image ? <img"), "Compact home article cards should render GitHub cover images");
assert.ok(tutorialCard.includes("<span class=\"visual-label\">{article.title}</span>"), "Compact article placeholders should use the article title");
assert.ok(astroTools.includes("getToolSections"), "Astro tools page should render full tool sections at build time");
assert.ok(routeUtils.includes("toolCategoryPath"), "Tool category URLs should be generated from a shared route helper");
assert.ok(routeUtils.includes("toolSubcategoryPath"), "Tool subcategory URLs should be generated from a shared route helper");
assert.ok(routeUtils.includes("toolDetailPath"), "Tool detail URLs should include category and subcategory hierarchy");
assert.ok(routeUtils.includes("tutorialCategoryPath"), "Tutorial category URLs should be generated from a shared route helper");
assert.ok(routeUtils.includes("tutorialDetailPath"), "Tutorial detail URLs should include topic hierarchy");
assert.ok(toolTile.includes("toolDetailPath(tool)"), "Tool directory cards should link to hierarchical detail routes");
assert.ok(toolCard.includes("toolDetailPath(tool)"), "Home tool cards should link to hierarchical detail routes");
assert.ok(tutorialCard.includes("tutorialDetailPath(article)"), "Tutorial cards should link to hierarchical detail routes");
assert.ok(astroTools.includes("toolCategoryPath"), "AI navigation category strip should link to category routes");
assert.ok(astroTools.includes("toolSubcategoryPath"), "AI navigation subcategory tabs should link to subcategory routes");
assert.ok(!astroTools.includes('href={`#tool-section-${index}`}'), "AI navigation category strip should not rely on hash-only category URLs");
assert.ok(!read("src/components/ToolSidebar.astro").includes('href={`#tool-section-'), "AI navigation sidebar should not rely on hash-only category URLs");
assert.ok(astroToolCategory.includes("getStaticPaths"), "Tool category pages should generate static category paths");
assert.ok(astroToolSubcategory.includes("getStaticPaths"), "Tool subcategory pages should generate static subcategory paths");
assert.ok(astroToolCategory.includes("toolCategoryPath"), "Tool category pages should preserve category navigation links");
assert.ok(astroToolSubcategory.includes("toolSubcategoryPath"), "Tool subcategory pages should preserve subcategory navigation links");
assert.ok(astroToolDetail.includes("getStaticPaths"), "Tool detail page should generate static paths");
assert.ok(astroToolDetail.includes("canonical={toolDetailPath(tool)}"), "Legacy tool detail pages should canonicalize to hierarchical routes");
assert.ok(astroToolHierarchicalDetail.includes("getStaticPaths"), "Hierarchical tool detail pages should generate static tool paths");
assert.ok(astroToolHierarchicalDetail.includes("toolSubcategoryPath"), "Hierarchical tool detail pages should link back to their subcategory");
assert.ok(astroToolDetail.includes("renderToolContent"), "Tool detail page should render source markdown content");
assert.ok(astroTutorials.includes('getCollection("posts"'), "Tutorial listing should render GitHub post content at build time");
assert.ok(astroTutorials.includes("Claude Code国内使用指南"), "Tutorial listing should include the GitHub tutorial titles");
assert.ok(astroTutorials.includes("tutorialCategoryPath"), "Tutorial listing should link to indexable tutorial category routes");
assert.ok(astroTutorialCategory.includes("getStaticPaths"), "Tutorial category pages should generate static topic paths");
assert.ok(astroTutorialCategory.includes("tutorialCategoryPath"), "Tutorial category pages should keep category navigation indexable");
assert.ok(astroTutorialDetail.includes("getStaticPaths"), "Tutorial detail page should generate static paths");
assert.ok(astroTutorialDetail.includes("canonical={tutorialDetailPath(article)}"), "Legacy tutorial detail pages should canonicalize to hierarchical routes");
assert.ok(astroTutorialHierarchicalDetail.includes("getStaticPaths"), "Hierarchical tutorial detail pages should generate static article paths");
assert.ok(astroTutorialHierarchicalDetail.includes("tutorialCategoryPath(article.category)"), "Hierarchical tutorial detail pages should link back to their category");
assert.ok(astroTutorialDetail.includes("render(entry)"), "Tutorial detail page should render Markdown post bodies");

const html = read("index.html");
for (const label of ["主页", "AI导航", "AI教程", "关于我们"]) {
  assert.ok(html.includes(label), `index.html should include nav label ${label}`);
}
assert.ok(html.includes("styles.css"), "index.html should load styles.css");
assert.ok(html.includes("app.js"), "index.html should load app.js");

const app = require(path.join(root, "app.js"));
const appSource = read("app.js");
const cssSource = read("styles.css");
const publicCssSource = read("public/styles.css");
const publicSiteSource = read("public/site.js");

assert.ok(!appSource.includes('class="bookmark"'), "home recommendation cards should not render bookmark icons");
assert.ok(!cssSource.includes(".bookmark"), "bookmark styles should be removed with the icon");
assert.ok(!appSource.includes('class="panel home-articles"'), "home recommended articles should not use a large panel background");
assert.ok(!appSource.includes('class="panel home-tools"'), "home recommended tools should not use a large panel background");
assert.ok(appSource.includes('class="home-articles"'), "home recommended articles should render as a plain section");
assert.ok(appSource.includes('class="home-tools"'), "home recommended tools should render as a plain section");
assert.ok(appSource.includes("function articleInfoPanel"), "article cards should share the richer text panel renderer");
assert.ok(appSource.includes('class="article-info-panel"'), "article cards should render a styled text panel");
assert.ok(appSource.includes("articleReadingStats"), "article cards should render estimated word count and reading time");
assert.ok(
  appSource.includes("getRecommendedTutorials(8)"),
  "home recommendation section should render a two-row four-column article grid",
);
assert.ok(appSource.includes("查看更多"), "home recommendation section should render the view-more action");
assert.ok(
  appSource.includes('data-tab-target="tutorials"'),
  "home load more action should jump to the AI tutorial tab",
);
assert.ok(!cssSource.includes("overflow-y: auto"), "home recommendations should expand in the page instead of using an internal scrollbar");
const loadMoreStyle = cssSource.match(/\.load-more-button\s*\{[^}]+\}/)?.[0] || "";
const loadMoreRowStyle = cssSource.match(/\.load-more-row\s*\{[^}]+\}/)?.[0] || "";
const recommendListStyle = cssSource.match(/\.recommend-list\s*\{[^}]+\}/)?.[0] || "";
const homeSectionStyle = cssSource.match(/\.home-articles,\n\.home-tools\s*\{[^}]+\}/)?.[0] || "";
const homeLayoutStyle = cssSource.match(/\.home-layout\s*\{[^}]+\}/)?.[0] || "";
const headerSearchStyle = cssSource.match(/\.header-search\s*\{[^}]+\}/)?.[0] || "";
const articleInfoPanelStyle = cssSource.match(/\.article-info-panel\s*\{[^}]+\}/)?.[0] || "";
const articleInfoMetaStyle = cssSource.match(/\.article-info-meta\s*\{[^}]+\}/)?.[0] || "";
const articleInfoIconStyle = cssSource.match(/\.article-info-icon\s*\{[^}]+\}/)?.[0] || "";
const articleInfoStatsStyle = cssSource.match(/\.article-info-stats\s*\{[^}]+\}/)?.[0] || "";
const articleRowStyle = cssSource.match(/\.article-row\s*\{[^}]+\}/)?.[0] || "";
const articleThumbStyle = cssSource.match(/\.thumb\s*\{[^}]+\}/)?.[0] || "";
const publicArticleVisualStyle = publicCssSource.match(/\.article-visual\s*\{[^}]+\}/)?.[0] || "";
const publicArticleThumbStyle = publicCssSource.match(/\.thumb\s*\{[^}]+\}/)?.[0] || "";
const publicArticleCardLinkStyle = publicCssSource.match(/\.article-row,\n\.tutorial-card\s*\{[^}]+\}/)?.[0] || "";
const visualLabelStyle = publicCssSource.match(/\.visual-label\s*\{[^}]+\}/)?.[0] || "";
const compactArticlePanelStyle = cssSource.match(/\.article-row \.article-info-panel\s*\{[^}]+\}/)?.[0] || "";
const compactArticleTitleStyle = cssSource.match(/\.article-row \.article-info-title\s*\{[^}]+\}/)?.[0] || "";
const compactArticleMetaStyle = cssSource.match(/\.article-row \.article-info-meta\s*\{[^}]+\}/)?.[0] || "";
const compactArticleSummaryStyle = cssSource.match(/\.article-row \.article-info-summary\s*\{[^}]+\}/)?.[0] || "";
const publicCompactArticlePanelStyle = publicCssSource.match(/\.article-row \.article-info-panel\s*\{[^}]+\}/)?.[0] || "";
const publicCompactArticleMetaStyle = publicCssSource.match(/\.article-row \.article-info-meta\s*\{[^}]+\}/)?.[0] || "";
const publicCompactArticleSummaryStyle = publicCssSource.match(/\.article-row \.article-info-summary\s*\{[^}]+\}/)?.[0] || "";
const tutorialCardIconStyle =
  [...publicCssSource.matchAll(/\.tutorial-card \.article-info-icon\s*\{[^}]+\}/g)]
    .map((match) => match[0])
    .find((rule) => rule.includes("width: 18px")) || "";
assert.ok(headerSearchStyle.includes("height: 38px"), "global header search should be ten pixels shorter");
assert.ok(articleInfoPanelStyle.includes("background: #fff"), "article text panels should keep a white background");
assert.ok(articleInfoPanelStyle.includes("color: var(--text)"), "article text panels should use the site text color");
assert.ok(articleInfoMetaStyle.includes("display: flex"), "article text panels should show icon metadata in a row");
assert.ok(articleInfoIconStyle.includes("background: #eaf4ff"), "article metadata icons should use light rounded squares");
assert.ok(articleInfoStatsStyle.includes("color: #747e84"), "article text panels should render weak word-count metadata");
assert.ok(homeLayoutStyle.includes("gap: 36px"), "home article and tool sections should have doubled vertical spacing");
assert.ok(homeSectionStyle.includes("background: transparent"), "home recommendation sections should sit directly on the page background");
assert.ok(homeSectionStyle.includes("border: 0"), "home recommendation sections should not draw an outer border");
assert.ok(homeSectionStyle.includes("box-shadow: none"), "home recommendation sections should not draw an outer shadow");
assert.ok(recommendListStyle.includes("display: grid"), "home article items should render as a block grid");
assert.ok(recommendListStyle.includes("grid-template-columns: repeat(4, minmax(0, 1fr))"), "home article grid should render four columns on desktop");
assert.ok(recommendListStyle.includes("gap: 14px"), "home article grid should keep compact card spacing");
assert.ok(articleRowStyle.includes("grid-template-columns: 1fr"), "home article cards should use a vertical block layout");
assert.ok(articleRowStyle.includes("padding: 8px"), "home article cards should reduce padding for the shorter item height");
assert.ok(articleThumbStyle.includes("min-height: 84px"), "home article thumbnails should be reduced to three quarters of the prior height");
assert.ok(publicArticleVisualStyle.includes("align-items: center"), "gradient article placeholders should center their title vertically");
assert.ok(publicArticleVisualStyle.includes("justify-content: center"), "gradient article placeholders should center their title horizontally");
assert.ok(publicArticleThumbStyle.includes("place-items: center"), "compact gradient placeholders should center their title");
assert.ok(publicArticleCardLinkStyle.includes("text-decoration: none"), "article card links should not underline nested placeholder text");
assert.ok(visualLabelStyle.includes("-webkit-line-clamp: 3"), "gradient placeholder text should be clamped to three lines");
assert.ok(visualLabelStyle.includes("max-height: calc(1.35em * 3)"), "gradient placeholder text should keep a hard three-line height limit");
assert.ok(visualLabelStyle.includes("text-decoration: none"), "gradient placeholder titles should not look like text links");
assert.ok(visualLabelStyle.includes("pointer-events: none"), "gradient placeholder titles should not capture pointer events");
assert.ok(compactArticlePanelStyle.includes("padding: 10px 12px"), "home article text panels should use compact padding");
assert.ok(compactArticlePanelStyle.includes("gap: 4px"), "home article text panels should reduce vertical spacing around metadata");
assert.ok(compactArticleTitleStyle.includes("font-size: 17px"), "home article titles should be compact");
assert.ok(compactArticleMetaStyle.includes("gap: 3px 8px"), "home article metadata should use tighter vertical tag spacing");
assert.ok(compactArticleSummaryStyle.includes("-webkit-line-clamp: 2"), "home article summaries should show up to two lines");
assert.ok(publicCompactArticlePanelStyle.includes("gap: 4px"), "published home article text panels should reduce vertical spacing around metadata");
assert.ok(publicCompactArticleMetaStyle.includes("gap: 3px 8px"), "published home article metadata should use tighter vertical tag spacing");
assert.ok(publicCompactArticleSummaryStyle.includes("-webkit-line-clamp: 2"), "published home article summaries should show up to two lines");
assert.ok(tutorialCardIconStyle.includes("width: 18px"), "tutorial list metadata icons should be visually quiet");
assert.ok(tutorialCardIconStyle.includes("background: transparent"), "tutorial list metadata icons should not render large filled squares");
assert.ok(loadMoreRowStyle.includes("background: transparent"), "home load more row should not introduce a separate background block");
assert.ok(loadMoreRowStyle.includes("margin: 10px 0 0"), "home load more row should align with the plain article section");
assert.ok(loadMoreRowStyle.includes("padding: 0"), "home load more row should not add extra vertical spacing");
assert.ok(loadMoreStyle.includes("width: 100%"), "home load more action should span the article section width");
assert.ok(loadMoreStyle.includes("background: #fff"), "home load more action should use the white bar style");
assert.ok(loadMoreStyle.includes("color: #4f9bff"), "home load more action should use a lighter blue text");
assert.ok(appSource.includes("关于 工具人AI导航"), "about page should replace the placeholder title with a branded about title");
assert.ok(appSource.includes("实战工作流"), "about page should reuse the source page's practical workflow positioning");
assert.ok(appSource.includes("严选工具导航"), "about page should include curated tool navigation positioning");
assert.ok(appSource.includes("工作流复盘"), "about page should include workflow recap positioning");
assert.ok(appSource.includes("所有内容仅作学习参考"), "about page should include the source page's learning-reference disclaimer");
assert.ok(!appSource.includes("mock-window"), "about page should not render the removed mock preview");
assert.ok(!cssSource.includes(".mock-window"), "removed about mock preview styles should be cleaned up");
assert.ok(!appSource.includes("沪ICP备19026706号-6"), "about page footer should not render the removed ICP text");

assert.ok(app.tutorials.length >= 20, "tutorial dataset should include at least twenty articles");
assert.equal(app.tools.length, 8, "tool dataset should stay focused on the initial curated set");
assert.deepEqual(
  app.categories,
  [
    { name: "AI 工具", subcategories: ["AI 对话助手", "AI 音乐生成", "AI 编程工具"] },
    { name: "海外数字服务", subcategories: ["流媒体娱乐"] },
  ],
  "AI navigation should match the compact taxonomy from the reference image",
);
assert.deepEqual(
  app.tools.map((tool) => [tool.name, tool.category, tool.subcategory]),
  [
    ["Claude", "AI 工具", "AI 对话助手"],
    ["ChatGPT", "AI 工具", "AI 对话助手"],
    ["Poe", "AI 工具", "AI 对话助手"],
    ["Google AI Studio", "AI 工具", "AI 对话助手"],
    ["NotebookLM", "AI 工具", "AI 对话助手"],
    ["Suno", "AI 工具", "AI 音乐生成"],
    ["Claude Code", "AI 工具", "AI 编程工具"],
    ["Spotify", "海外数字服务", "流媒体娱乐"],
  ],
  "AI navigation tools should follow the reference image grouping",
);
const toolTree = app.categories.map((category) => ({
  name: category.name,
  children: category.subcategories.map((subcategory) => ({
    name: subcategory,
    tools: app.tools.filter((tool) => tool.category === category.name && tool.subcategory === subcategory).map((tool) => tool.name),
  })),
}));
assert.deepEqual(
  toolTree,
  [
    {
      name: "AI 工具",
      children: [
        { name: "AI 对话助手", tools: ["Claude", "ChatGPT", "Poe", "Google AI Studio", "NotebookLM"] },
        { name: "AI 音乐生成", tools: ["Suno"] },
        { name: "AI 编程工具", tools: ["Claude Code"] },
      ],
    },
    {
      name: "海外数字服务",
      children: [{ name: "流媒体娱乐", tools: ["Spotify"] }],
    },
  ],
  "AI navigation tree should exactly match the provided reference image",
);

assert.equal(typeof app.getToolSections, "function", "AI navigation should expose full directory sections");
const toolSections = app.getToolSections();
assert.equal(toolSections.length, 2, "AI navigation should render the two top-level sections from the reference image");
assert.ok(toolSections.every((section) => section.tools.length > 0), "each directory section should have visible tools");
assert.ok(appSource.includes('class="directory-shell"'), "AI navigation should render a plain directory shell");
assert.ok(appSource.includes('class="tool-directory-layout"'), "AI navigation should render a sidebar and content layout");
assert.ok(appSource.includes('class="tool-sidebar"'), "AI navigation should include a category sidebar");
assert.ok(appSource.includes("renderToolSidebar"), "AI navigation sidebar should be generated from category data");
assert.ok(appSource.includes("sidebar-subcategory"), "AI navigation sidebar should include category subitems");
assert.ok(!appSource.includes('data-action="more-categories"'), "AI navigation should not show a placeholder for extra categories");
assert.ok(!publicSiteSource.includes("more-categories"), "client script should not keep the removed extra-category action");
assert.ok(appSource.includes("expandedToolCategory"), "AI navigation sidebar should track expanded state separately from selected category");
assert.ok(appSource.includes("renderSidebarIcon"), "AI navigation sidebar categories should render left-side icons");
assert.ok(appSource.includes("sidebar-arrow"), "AI navigation sidebar categories should render arrow icons");
assert.ok(appSource.includes('aria-expanded="${isExpanded}"'), "AI navigation sidebar categories should expose collapsed state");
assert.ok(appSource.includes('categoryButton.closest(".tool-sidebar")'), "sidebar category clicks should be distinguishable from top category tabs");
assert.ok(appSource.includes('state.expandedToolCategory = ""'), "clicking the expanded sidebar category should collapse it");
assert.ok(
  appSource.includes('${isExpanded ? `') && appSource.includes(': ""}'),
  "AI navigation sidebar should render subcategories only for the expanded category",
);
assert.ok(!appSource.includes('class="panel directory-shell"'), "AI navigation tab should not render a white panel background");
assert.ok(!appSource.includes("category-caret"), "AI navigation category tabs should not render dropdown caret icons");
assert.ok(!appSource.includes("⌄"), "AI navigation category tabs should not render caret glyphs");
assert.ok(!cssSource.includes(".category-caret"), "unused category caret styles should be removed");
const toolLayoutStyle = cssSource.match(/\.tool-directory-layout\s*\{[^}]+\}/)?.[0] || "";
const toolSidebarStyle = cssSource.match(/\.tool-sidebar\s*\{[^}]+\}/)?.[0] || "";
const publicToolSidebarStyle = publicCssSource.match(/\.tool-sidebar\s*\{[^}]+\}/)?.[0] || "";
assert.ok(toolLayoutStyle.includes("grid-template-columns: 196px minmax(0, 1fr)"), "AI navigation layout should reserve a narrower left sidebar");
assert.ok(toolSidebarStyle.includes("position: sticky"), "AI navigation sidebar should stay visible while scrolling");
assert.ok(toolSidebarStyle.includes("top: 112px"), "AI navigation sidebar should use a fixed sticky offset below the header");
assert.ok(!toolSidebarStyle.includes("calc(50vh"), "AI navigation sidebar should not use viewport-centered positioning");
assert.ok(!toolSidebarStyle.includes("translateY(-50%)"), "AI navigation sidebar should not vertically center itself around the sticky anchor");
assert.ok(publicToolSidebarStyle.includes("top: 112px"), "published AI navigation sidebar should use a fixed sticky offset below the header");
assert.ok(!publicToolSidebarStyle.includes("calc(50vh"), "published AI navigation sidebar should not use viewport-centered positioning");
assert.ok(!publicToolSidebarStyle.includes("translateY(-50%)"), "published AI navigation sidebar should not vertically center itself around the sticky anchor");
assert.ok(toolSidebarStyle.includes("max-height: calc(100vh - 96px)"), "AI navigation sidebar should fit within the viewport");
const sidebarCategoryButtonStyle = cssSource.match(/\.sidebar-category-button\s*\{[^}]+\}/)?.[0] || "";
const sidebarActiveCategoryButtonStyle = cssSource.match(/\.sidebar-category\.is-active \.sidebar-category-button\s*\{[^}]+\}/)?.[0] || "";
const sidebarArrowStyle = cssSource.match(/\.sidebar-arrow\s*\{[^}]+\}/)?.[0] || "";
const sidebarActiveArrowStyle = cssSource.match(/\.sidebar-category\.is-active \.sidebar-arrow\s*\{[^}]+\}/)?.[0] || "";
const sidebarIconStyle = cssSource.match(/\.sidebar-icon\s*\{[^}]+\}/)?.[0] || "";
const sidebarSubcategoryStyle =
  [...cssSource.matchAll(/\.sidebar-subcategory\s*\{[^}]+\}/g)]
    .map((match) => match[0])
    .find((rule) => rule.includes("min-height")) || "";
const sidebarActiveSubcategoryStyle = cssSource.match(/\.sidebar-subcategory\.is-active\s*\{[^}]+\}/)?.[0] || "";
assert.ok(sidebarCategoryButtonStyle.includes("grid-template-columns: 22px minmax(0, 1fr) 12px"), "AI navigation sidebar category rows should use smaller icon, label, and arrow columns");
assert.ok(sidebarCategoryButtonStyle.includes("font-size: 14px"), "AI navigation sidebar category text should be smaller");
assert.ok(sidebarIconStyle.includes("width: 18px"), "AI navigation sidebar icons should be smaller");
assert.ok(sidebarActiveCategoryButtonStyle.includes("background: #e5e5e5"), "AI navigation expanded category should use a gray selected background");
assert.ok(sidebarActiveCategoryButtonStyle.includes("color: #5b5ff4"), "AI navigation expanded category should use blue-purple text");
assert.ok(sidebarArrowStyle.includes("transform: rotate(-45deg)"), "AI navigation collapsed arrow should point right");
assert.ok(sidebarActiveArrowStyle.includes("transform: rotate(45deg)"), "AI navigation expanded arrow should point down");
assert.ok(sidebarSubcategoryStyle.includes("font-size: 13px"), "AI navigation sidebar subcategory text should be smaller");
assert.ok(sidebarSubcategoryStyle.includes("width: 100%"), "AI navigation sidebar subcategory rows should share the same alignment width");
assert.ok(sidebarSubcategoryStyle.includes("justify-content: flex-start"), "AI navigation sidebar subcategory text should align with category labels");
assert.ok(sidebarSubcategoryStyle.includes("text-align: left"), "AI navigation sidebar subcategory text should be left aligned");
assert.ok(sidebarActiveSubcategoryStyle.includes("background: #e5e5e5"), "AI navigation active subcategory should use the gray rounded block style");
assert.ok(sidebarActiveSubcategoryStyle.includes("justify-content: flex-start"), "AI navigation active subcategory text should keep the same left alignment");
assert.ok(!sidebarActiveSubcategoryStyle.includes("box-shadow"), "AI navigation active subcategory should not use the old left-line selection");
const toolGridStyle = cssSource.match(/\.tool-grid\s*\{[^}]+\}/)?.[0] || "";
assert.ok(toolGridStyle.includes("padding: 16px"), "AI navigation item grid should have breathing room on a gray background");
assert.ok(toolGridStyle.includes("border-radius: var(--radius)"), "AI navigation item grid should use rounded gray background");
assert.ok(toolGridStyle.includes("background: var(--surface-soft)"), "AI navigation item grid should sit on a soft gray background");
const directorySectionHeadStyle = cssSource.match(/\.directory-section \.section-head\s*\{[^}]+\}/)?.[0] || "";
const directorySectionTitleStyle = cssSource.match(/\.directory-section \.section-title\s*\{[^}]+\}/)?.[0] || "";
assert.ok(directorySectionHeadStyle.includes("margin-bottom: 12px"), "AI navigation section title spacing should be more refined");
assert.ok(directorySectionTitleStyle.includes("font-size: 22px"), "AI navigation section titles should be smaller");
assert.ok(directorySectionTitleStyle.includes("font-weight: 700"), "AI navigation section titles should be less heavy");
assert.ok(directorySectionTitleStyle.includes("color: #182230"), "AI navigation section titles should use a softer dark color");
const subtabRowStyle = cssSource.match(/\.subtab-row\s*\{[^}]+\}/)?.[0] || "";
const subtabStyle = cssSource.match(/\.subtab\s*\{[^}]+\}/)?.[0] || "";
const activeSubtabStyle = cssSource.match(/\.subtab\.is-active\s*\{[^}]+\}/)?.[0] || "";
assert.ok(subtabRowStyle.includes("border-radius: 999px"), "AI navigation subcategory tabs should use a pill rail");
assert.ok(subtabRowStyle.includes("background: #e5e5e5"), "AI navigation subcategory tabs should sit on a gray rail");
assert.ok(subtabRowStyle.includes("flex-wrap: nowrap"), "AI navigation subcategory tabs should stay in one horizontal rail");
assert.ok(subtabRowStyle.includes("width: max-content"), "AI navigation subcategory rail should size to its content");
assert.ok(subtabRowStyle.includes("max-width: 100%"), "AI navigation subcategory rail should not exceed the parent layout");
assert.ok(subtabStyle.includes("border-radius: 999px"), "AI navigation subcategory items should be rounded pills");
assert.ok(subtabStyle.includes("color: #808080"), "AI navigation inactive subcategory text should be soft gray");
assert.ok(activeSubtabStyle.includes("linear-gradient"), "AI navigation active subcategory should use a blue-purple pill");
assert.ok(activeSubtabStyle.includes("color: #fff"), "AI navigation active subcategory text should be white");

assert.equal(typeof app.getTutorialById, "function", "tutorial detail lookup should be exposed");
const tutorialDetail = app.getTutorialById("deepseek-workflow");
assert.equal(
  tutorialDetail.title,
  "DeepSeek 入门实战：从提示词到工作流",
  "tutorial detail lookup should return the requested article",
);
assert.ok(appSource.includes("data-tutorial-id"), "tutorial cards should expose clickable article ids");
assert.ok(appSource.includes("返回教程列表"), "tutorial detail view should include a back-to-list action");
assert.ok(appSource.includes("scrollToPageTop"), "tutorial detail navigation should reset the page scroll position");
assert.ok(appSource.includes('class="tutorial-page"'), "AI tutorial page should use the learning-list layout shell");
assert.ok(appSource.includes("AI 学习教程"), "AI tutorial page should use the learning tutorial title");
assert.ok(appSource.includes('placeholder="在「AI教程」中搜索"'), "AI tutorial search placeholder should match the compact learning layout");
assert.ok(appSource.includes('class="tutorial-list"'), "AI tutorial page should render a vertical list of article cards");
assert.ok(appSource.includes("matched.map(renderTutorialCard)"), "AI tutorial page should list every matched tutorial in one feed");
assert.ok(!appSource.includes('class="panel tutorial-sidebar"'), "AI tutorial page should not render the old sidebar");
assert.ok(!appSource.includes('class="panel tutorial-featured"'), "AI tutorial page should not render the old featured card");
assert.ok(!appSource.includes('class="pagination"'), "AI tutorial page should not render the old pagination controls");
assert.ok(!appSource.includes("data-tool-all"), "AI navigation sections should not render a redundant all action");
assert.ok(!appSource.includes(".slice(0, 25)"), "AI navigation should render every tool in each section without truncation");
assert.equal(typeof app.getToolById, "function", "tool click interactions should be able to look up a tool");
assert.equal(app.getToolById("chatgpt").name, "ChatGPT", "tool lookup should return the clicked tool");
assert.equal(typeof app.getToolUrl, "function", "tool cards should expose a jump link resolver");
assert.equal(
  app.getToolUrl("claude-code"),
  "https://claude.com/product/claude-code",
  "tool jump links should resolve current curated tools when available",
);
assert.ok(
  app.tools.every((tool) => /^https?:\/\//.test(tool.url)),
  "every tool should have a real HTTP jump link",
);
assert.equal(typeof app.getToolDetail, "function", "tool detail lookup should be exposed");
assert.deepEqual(
  Object.fromEntries(app.tools.map((tool) => [tool.id, tool.externalUrl])),
  {
    claude: "https://claude.ai/",
    chatgpt: "https://chatgpt.com/",
    poe: "https://poe.com/",
    "google-ai": "https://aistudio.google.com/",
    notebooklm: "https://notebooklm.google.com/",
    suno: "https://suno.com/",
    "claude-code": "https://claude.com/product/claude-code",
    spotify: "https://www.spotify.com/",
  },
  "curated tool detail buttons should go directly to official websites",
);
const notebookDetail = app.getToolDetail("notebooklm");
assert.equal(notebookDetail.externalUrl, "https://notebooklm.google.com/", "NotebookLM detail should keep the official link");
assert.ok(
  notebookDetail.content.includes("智能笔记助手NotebookLM"),
  "NotebookLM should render the synced Codefather detail content",
);
assert.ok(
  notebookDetail.sourceUrl.includes("ai.codefather.cn/tool/1965402623599337488"),
  "NotebookLM detail should include the matched Codefather source",
);
const spotifyDetail = app.getToolDetail("spotify");
assert.equal(spotifyDetail.externalUrl, "https://www.spotify.com/", "Spotify detail should keep the official link");
assert.ok(
  spotifyDetail.content.includes("海外数字服务"),
  "Spotify detail should include the overseas digital service category",
);
assert.ok(
  spotifyDetail.content.includes("流媒体娱乐"),
  "Spotify detail should include its compact subcategory",
);
assert.ok(appSource.includes("tool-detail-numbered"), "tool detail markdown renderer should support numbered source lists");
assert.ok(appSource.includes("renderToolDetail"), "AI navigation should render a local tool detail view");
assert.ok(appSource.includes("selectedToolId"), "tool item clicks should open a selected tool detail state");
assert.ok(appSource.includes("data-tool-back"), "tool detail view should include a back action");
assert.ok(!appSource.includes("data-tool-source"), "tool detail view should not include the removed source detail action");
assert.ok(!appSource.includes("查看原站详情"), "tool detail view should not render the removed source detail button");
assert.ok(!appSource.includes("tool-stat-grid"), "tool detail view should not render the removed stats cards");
assert.ok(!appSource.includes("tool-detail-side"), "tool detail view should not render the removed tool info sidebar");
assert.ok(!appSource.includes("工具信息"), "tool detail view should not render the removed tool info title");
assert.ok(!cssSource.includes(".tool-stat-grid"), "removed stats styles should be cleaned up");
assert.ok(!cssSource.includes(".tool-detail-side"), "removed tool info sidebar styles should be cleaned up");
assert.ok(!appSource.includes('<a class="panel tool-tile"'), "tool grid items should open local detail instead of direct external links");
assert.ok(appSource.includes('target="_blank"'), "tool detail external actions should open jump links in a new tab");
assert.ok(appSource.includes('rel="noopener noreferrer"'), "external tool links should use safe link attributes");
assert.ok(!appSource.includes("data-tool-link"), "tool cards should use direct anchor navigation instead of placeholder actions");
assert.equal(typeof app.searchEverywhere, "function", "global search should expose a shared search helper");
const searchResult = app.searchEverywhere("Claude Code");
assert.equal(searchResult.preferredTab, "tools", "global search should prefer tool results when tools match");
assert.equal(searchResult.tools.length, 1, "global search should return matching tools");
assert.ok(html.includes('data-tab-target="home"'), "brand click should return to the home tab");
assert.ok(!html.includes("登录/注册"), "header should not render the login/register placeholder");
assert.ok(!html.includes('data-action="login"'), "header should not keep the login placeholder action");
assert.ok(!cssSource.includes(".login-button"), "unused login button styles should be removed");
assert.ok(html.includes('data-global-search'), "header search should be a real submit form");
assert.ok(html.includes('type="submit"'), "header search should include a visible submit button");
assert.ok(appSource.includes('document.addEventListener("submit"'), "global search should respond to form submission");
assert.ok(appSource.includes("applyGlobalSearch(input?.value"), "global search form should submit the input value");
assert.ok(
  appSource.includes('event.key === "Enter" && event.target.id === "globalSearch"'),
  "global search input should respond to the Enter key",
);
assert.ok(
  !cssSource.includes(".header-actions {\n    display: none;"),
  "header search should remain available at responsive breakpoints",
);
assert.ok(html.includes('class="search-icon"'), "header search should render a dedicated search icon area");
const searchIconStyle = cssSource.match(/\.search-icon\s*\{[^}]+\}/)?.[0] || "";
assert.ok(searchIconStyle.includes("width: 30px"), "header search icon area should fit the shorter search field");
assert.ok(searchIconStyle.includes("height: 30px"), "header search icon area should fit the shorter search field");
assert.ok(searchIconStyle.includes("flex: 0 0 30px"), "header search icon flex basis should fit the shorter search field");
assert.ok(appSource.includes("tool-search-field"), "AI navigation search should have a scoped width class");
assert.ok(
  appSource.includes("scheduleScopedSearchRender"),
  "scoped AI navigation and tutorial searches should debounce expensive list rendering",
);
assert.ok(
  appSource.includes("restoreSearchFocus"),
  "scoped search rendering should restore input focus and cursor position",
);
assert.ok(
  !appSource.includes('state.toolQuery = event.target.value;\n        state.selectedToolId = "";\n        render();'),
  "AI navigation search should not re-render the whole view on every keystroke",
);
assert.ok(
  !appSource.includes('state.tutorialQuery = event.target.value;\n        state.selectedTutorialId = "";\n        render();'),
  "AI tutorial search should not re-render the whole view on every keystroke",
);
const toolSearchStyle = cssSource.match(/\.tool-search-field\s*\{[^}]+\}/)?.[0] || "";
assert.ok(toolSearchStyle.includes("width: min(260px, 100%)"), "AI navigation search should be half of the previous compact width");
assert.ok(toolSearchStyle.includes("height: 44px"), "AI navigation search should be ten pixels shorter than the default search field");
assert.ok(toolSearchStyle.includes("padding: 2px 12px 2px 6px"), "AI navigation search should keep the icon aligned at the shorter height");
assert.ok(appSource.includes("tutorial-search-field"), "AI tutorial search should have a scoped compact width class");
const tutorialSearchStyle = cssSource.match(/\.tutorial-search-field\s*\{[^}]+\}/)?.[0] || "";
assert.ok(tutorialSearchStyle.includes("width: min(253px, 100%)"), "AI tutorial search should be one third of the original search width");
assert.ok(tutorialSearchStyle.includes("height: 44px"), "AI tutorial search should be ten pixels shorter than the default search field");
assert.ok(tutorialSearchStyle.includes("padding: 2px 12px 2px 6px"), "AI tutorial search should keep the icon aligned at the shorter height");
const tutorialListStyle = cssSource.match(/\.tutorial-list\s*\{[^}]+\}/)?.[0] || "";
const tutorialCardStyle =
  [...cssSource.matchAll(/\.tutorial-card\s*\{[^}]+\}/g)]
    .map((match) => match[0])
    .find((rule) => rule.includes("grid-template-columns")) || "";
const tutorialCardVisualStyle = cssSource.match(/\.tutorial-card \.article-visual\s*\{[^}]+\}/)?.[0] || "";
const tutorialArticlePanelStyle = cssSource.match(/\.tutorial-card \.article-info-panel\s*\{[^}]+\}/)?.[0] || "";
const tutorialArticleTitleStyle = cssSource.match(/\.tutorial-card \.article-info-title\s*\{[^}]+\}/)?.[0] || "";
const tutorialArticleSummaryStyle = cssSource.match(/\.tutorial-card \.article-info-summary\s*\{[^}]+\}/)?.[0] || "";
const tutorialArticleIconStyle = cssSource.match(/\.tutorial-card \.article-info-icon\s*\{[^}]+\}/)?.[0] || "";
const tutorialArticleHashIconStyle = cssSource.match(/\.tutorial-card \.article-info-icon-hash::before\s*\{[^}]+\}/)?.[0] || "";
assert.ok(tutorialListStyle.includes("display: grid"), "AI tutorial feed should use a vertical list container");
assert.ok(tutorialListStyle.includes("gap: 12px"), "AI tutorial feed should match the compact card spacing");
assert.ok(tutorialCardStyle.includes("grid-template-columns: 290px minmax(0, 1fr)"), "AI tutorial cards should use a large image column and content column");
assert.ok(tutorialCardStyle.includes("align-items: stretch"), "AI tutorial cards should stretch the text panel to the item height");
assert.ok(tutorialCardStyle.includes("min-height: 116px"), "AI tutorial cards should be compressed to roughly three quarters height");
assert.ok(tutorialCardStyle.includes("padding: 14px"), "AI tutorial cards should use compact padding");
assert.ok(tutorialCardVisualStyle.includes("min-height: 96px"), "AI tutorial thumbnails should be reduced to roughly three quarters height");
assert.ok(tutorialArticlePanelStyle.includes("padding: 12px 14px"), "AI tutorial text panels should use compact padding");
assert.ok(tutorialArticleTitleStyle.includes("font-size: 22px"), "AI tutorial text panels should use compact titles");
assert.ok(tutorialArticleTitleStyle.includes("-webkit-line-clamp: 1"), "AI tutorial titles should stay to one line in compact items");
assert.ok(tutorialArticleSummaryStyle.includes("font-size: 13px"), "AI tutorial summaries should use compact text");
assert.ok(tutorialArticleSummaryStyle.includes("-webkit-line-clamp: 1"), "AI tutorial summaries should stay to one line in compact items");
assert.ok(tutorialArticleIconStyle.includes("width: 20px"), "AI tutorial metadata icons should be smaller and more refined");
assert.ok(tutorialArticleIconStyle.includes("height: 20px"), "AI tutorial metadata icons should be smaller and more refined");
assert.ok(tutorialArticleHashIconStyle.includes("font-size: 15px"), "AI tutorial hash icon should be lighter inside the smaller badge");
assert.ok(appSource.includes("field-search-icon"), "internal search fields should render a larger dedicated search icon");
assert.ok(!appSource.includes(">⌕</span>"), "internal search fields should not rely on the tiny glyph icon");
const fieldSearchIconStyle = cssSource.match(/\.field-search-icon\s*\{[^}]+\}/)?.[0] || "";
assert.ok(fieldSearchIconStyle.includes("width: 40px"), "internal search icon area should be wide enough");
assert.ok(fieldSearchIconStyle.includes("height: 40px"), "internal search icon area should be tall enough");
const toastStyle = cssSource.match(/\.site-toast\s*\{[^}]+\}/)?.[0] || "";
assert.ok(toastStyle.includes("top: 84px"), "toast should use a common top-center message position");
assert.ok(!toastStyle.includes("bottom:"), "toast should not look like a bottom floating modal");
assert.ok(toastStyle.includes("display: inline-flex"), "toast should use compact inline message layout");
assert.ok(toastStyle.includes("min-height: 40px"), "toast should use a compact message height");
assert.ok(toastStyle.includes("box-shadow: 0 8px 24px"), "toast should use a subtle product-style shadow");
assert.ok(!cssSource.includes(".site-toast::before"), "toast should not include a status icon marker");
for (const marker of [
  "data-tool-id",
  "data-tutorial-id",
  "showToast",
  "applyGlobalSearch",
]) {
  assert.ok(appSource.includes(marker), `click behavior should include ${marker}`);
}

const homeArticles = app.getRecommendedTutorials(8);
assert.equal(homeArticles.length, 8, "home should render two rows of four recommended articles");
assert.equal(
  homeArticles[0].title,
  "DeepSeek 入门实战：从提示词到工作流",
  "featured newest tutorial should lead home recommendations",
);

const featuredTools = app.getFeaturedTools();
assert.ok(featuredTools.length > 0, "featured tool helper should keep a visible curated subset available");
assert.ok(featuredTools.length < app.tools.length, "featured tool helper should stay smaller than the compact tool set");
assert.ok(featuredTools.every((tool) => tool.featured), "featured tool helper should return only featured tools");

assert.equal(typeof app.getPopularTools, "function", "home should expose a popular tools helper");
const popularTools = app.getPopularTools(8);
assert.equal(popularTools.length, 8, "home should render the current curated tool set");
assert.ok(new Set(popularTools.map((tool) => tool.id)).size === 8, "popular tools should not contain duplicates");
assert.ok(
  new Set(popularTools.map((tool) => tool.category)).size === 2,
  "popular tools should cover both top-level navigation categories",
);
assert.ok(appSource.includes("getPopularTools(8)"), "home recommended tools should request the current curated tool count");

const conversationTools = app.filterTools({ category: "AI 工具", subcategory: "AI 对话助手", query: "NotebookLM" });
assert.equal(conversationTools.length, 1, "AI navigation should filter by category, subcategory, and query");
assert.equal(conversationTools[0].name, "NotebookLM");

const codingTutorials = app.filterTutorials({ category: "AI编程", query: "研发" });
assert.equal(codingTutorials.length, 1, "tutorials should filter by category and keyword");
assert.equal(codingTutorials[0].title, "AI 编程助手如何提高研发效率");

console.log("static-site tests passed");
