const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const config = require("../indexnow.config.cjs");
const {
  buildPayload,
  collectRemoteSitemapUrls,
  extractSitemapUrls,
  normalizeUrl,
  parseArgs,
  submitIndexNow,
} = require("../scripts/submit-indexnow.cjs");
const { createPlan } = require("../scripts/collect-indexnow-urls.cjs");
const { waitForDeployment } = require("../scripts/wait-for-deployment.cjs");

const root = path.resolve(__dirname, "..");
const keyFile = path.join(root, "public", config.keyFileName);

assert.match(config.key, /^[A-Za-z0-9-]{8,128}$/, "IndexNow key should use the allowed format");
assert.ok(fs.existsSync(keyFile), "IndexNow key file should exist in public/");
assert.equal(fs.readFileSync(keyFile, "utf8").trim(), config.key, "key file content should exactly match the configured key");
assert.equal(config.keyLocation, `${config.siteOrigin}/${config.keyFileName}`);

assert.equal(normalizeUrl("/blog/example/"), "https://toolmanai.com/blog/example/");
assert.equal(normalizeUrl("https://toolmanai.com/tools/chatgpt/#details"), "https://toolmanai.com/tools/chatgpt/");
assert.throws(() => normalizeUrl("https://example.com/"), /must belong to toolmanai\.com/);

assert.deepEqual(
  extractSitemapUrls("<urlset><url><loc>https://toolmanai.com/?a=1&amp;b=2</loc></url></urlset>"),
  ["https://toolmanai.com/?a=1&b=2"],
);

const payload = buildPayload(["/", "/blog/example/", "https://toolmanai.com/blog/example/#top"]);
assert.deepEqual(payload, {
  host: "toolmanai.com",
  key: config.key,
  keyLocation: config.keyLocation,
  urlList: ["https://toolmanai.com/", "https://toolmanai.com/blog/example/"],
});

assert.deepEqual(parseArgs(["--", "--dry-run", "--all", "/blog/example/"]), {
  all: true,
  dryRun: true,
  remote: false,
  urls: ["/blog/example/"],
  urlsFile: "",
});
assert.throws(() => parseArgs(["--unknown"]), /Unknown option/);
assert.throws(() => parseArgs(["--all", "--remote"]), /only one/);

const postChangePlan = createPlan(
  [{ status: "M", path: "src/content/posts/example.md", before: "before", after: "after" }],
  () => "---\nslug: changed-article\n---\n",
);
assert.deepEqual(postChangePlan, {
  all: false,
  urls: [
    "https://toolmanai.com/",
    "https://toolmanai.com/blog/",
    "https://toolmanai.com/blog/changed-article/",
  ],
});
assert.equal(
  createPlan([{ status: "M", path: "src/layouts/SiteLayout.astro" }], () => "").all,
  true,
  "site-wide source changes should submit the production sitemap",
);
assert.equal(
  createPlan([{ status: "A", path: `public/${config.keyFileName}` }], () => "").all,
  true,
  "the first key deployment should initialize IndexNow with the production sitemap",
);

(async () => {
  let captured;
  const status = await submitIndexNow(payload, async (url, options) => {
    captured = { url, options };
    return { status: 202, text: async () => "" };
  });
  assert.equal(status, 202);
  assert.equal(captured.url, "https://api.indexnow.org/indexnow");
  assert.deepEqual(JSON.parse(captured.options.body), payload);
  assert.equal(captured.options.method, "POST");

  const sitemapResponses = new Map([
    [
      "/sitemap-index.xml",
      '<sitemapindex><sitemap><loc>https://toolmanai.com/sitemap-0.xml</loc></sitemap></sitemapindex>',
    ],
    [
      "/sitemap-0.xml",
      '<urlset><url><loc>https://toolmanai.com/</loc></url><url><loc>https://toolmanai.com/blog/</loc></url></urlset>',
    ],
  ]);
  const remoteUrls = await collectRemoteSitemapUrls(async (url) => ({
    ok: true,
    status: 200,
    text: async () => sitemapResponses.get(new URL(url).pathname),
  }));
  assert.deepEqual(remoteUrls, ["https://toolmanai.com/", "https://toolmanai.com/blog/"]);

  const expectedCommit = "a".repeat(40);
  let deploymentChecks = 0;
  const matchedAttempt = await waitForDeployment(expectedCommit, {
    attempts: 2,
    intervalMs: 0,
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({ commit: ++deploymentChecks === 2 ? expectedCommit : "b".repeat(40) }),
    }),
  });
  assert.equal(matchedAttempt, 2);
  console.log("IndexNow integration assertions passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
