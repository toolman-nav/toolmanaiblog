const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

assert.ok(fs.existsSync(dist), "dist must exist; run pnpm build first");

const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));
const textFiles = walk(dist).filter((file) => /\.(html|xml|txt|js|css)$/.test(file));
const allDistText = textFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");

assert.ok(!allDistText.includes("categories/%"), "dist should not contain encoded category links");
assert.ok(!allDistText.includes("%20"), "dist should not contain %20 links");
assert.ok(!allDistText.includes("pic.code-nav.cn"), "dist should not reference pic.code-nav.cn");
assert.ok(!/(?:my\.)?feishu\.cn|larksuite\.com/i.test(allDistText), "dist should not reference Feishu/Lark images");
assert.ok(!allDistText.includes("12.8k"), "dist should not contain fake read counts");

// Internal review notes must never be visible to users (HTML comments are tolerated).
for (const file of htmlFiles) {
  const visible = fs.readFileSync(file, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  for (const phrase of ["需人工核实", "人工复核", "人工补充", "需人工"]) {
    assert.ok(!visible.includes(phrase), `${path.relative(dist, file)} leaks internal note "${phrase}" into visible content`);
  }
}

// og:image must be a real share image, never a favicon-sized icon.
for (const file of htmlFiles) {
  const og = fs.readFileSync(file, "utf8").match(/property="og:image" content="([^"]+)"/)?.[1] || "";
  assert.ok(og && !/\.(ico|svg)$/i.test(og), `${path.relative(dist, file)} og:image must not be a favicon/icon (got "${og}")`);
}

assert.ok(fs.existsSync(path.join(dist, "404.html")), "dist must contain 404.html so the host stops serving index.html with 200 for unknown paths");
assert.ok(fs.existsSync(path.join(dist, "_redirects")), "dist must contain the Cloudflare Pages _redirects file");
assert.ok(!fs.existsSync(path.join(dist, "tutorials")), "dist must not contain the legacy /tutorials/ tree");

for (const file of [path.join(dist, "index.html"), path.join(dist, "blog/claude-code-guide/index.html")]) {
  const html = fs.readFileSync(file, "utf8");
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  assert.equal(h1Count, 1, `${path.relative(dist, file)} should have exactly one H1`);
  assert.ok(html.includes('property="og:image" content="https://toolmanai.com/'), `${file} should use absolute og:image`);
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), `${file} should use large Twitter card`);
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  assert.ok(jsonLdBlocks.length > 0, `${file} should include JSON-LD`);
  for (const block of jsonLdBlocks) {
    const parsed = JSON.parse(block);
    assert.ok(parsed["@context"], "JSON-LD should include @context");
    assert.ok(parsed["@type"], "JSON-LD should include @type");
  }
}

const articleHtml = fs.readFileSync(path.join(dist, "blog/claude-code-guide/index.html"), "utf8");
const title = articleHtml.match(/<title>([^<]+)<\/title>/)?.[1] || "";
const h1 = articleHtml.match(/<h1[^>]*>([^<]+)<\/h1>/)?.[1] || "";
assert.notEqual(title, h1, "article title tag should differ from H1");
assert.ok(title.includes("Claude Code 国内使用教程 2026"), "article title should include seoTitle");

const robots = read("dist/robots.txt");
for (const line of ["User-agent: GPTBot", "User-agent: ClaudeBot", "User-agent: PerplexityBot", "User-agent: Google-Extended", "Sitemap: https://toolmanai.com/sitemap-index.xml"]) {
  assert.ok(robots.includes(line), `robots should include ${line}`);
}
assert.ok(fs.existsSync(path.join(dist, "llms.txt")), "llms.txt should exist in dist");
assert.ok(fs.existsSync(path.join(dist, "rss.xml")), "rss.xml should exist in dist");
assert.ok(fs.existsSync(path.join(dist, "sitemap-index.xml")), "sitemap-index.xml should exist in dist");

console.log(`SEO build verification passed for ${htmlFiles.length} HTML files`);
