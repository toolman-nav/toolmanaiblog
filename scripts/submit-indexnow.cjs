const fs = require("node:fs");
const path = require("node:path");

const config = require("../indexnow.config.cjs");

const MAX_URLS_PER_REQUEST = 10_000;

function decodeXmlText(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeXmlText(match[1].trim()));
}

function normalizeUrl(value) {
  const url = new URL(value, `${config.siteOrigin}/`);
  if (url.origin !== config.siteOrigin) {
    throw new Error(`IndexNow URL must belong to ${config.host}: ${value}`);
  }
  url.hash = "";
  return url.href;
}

function collectSitemapUrls(distDir = path.resolve(__dirname, "../dist")) {
  if (!fs.existsSync(distDir)) {
    throw new Error("dist does not exist; run pnpm build before using --all");
  }

  const sitemapFiles = fs
    .readdirSync(distDir)
    .filter((name) => /^sitemap-\d+\.xml$/.test(name))
    .sort();

  if (sitemapFiles.length === 0) {
    throw new Error("No dist/sitemap-*.xml files found; run pnpm build before using --all");
  }

  return sitemapFiles.flatMap((name) => extractSitemapUrls(fs.readFileSync(path.join(distDir, name), "utf8")));
}

async function fetchText(url, fetchImpl) {
  const response = await fetchImpl(url, {
    headers: { Accept: "application/xml, text/xml;q=0.9, */*;q=0.1" },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`Unable to fetch ${url}: HTTP ${response.status}`);
  return response.text();
}

async function collectRemoteSitemapUrls(fetchImpl = globalThis.fetch) {
  if (typeof fetchImpl !== "function") throw new Error("Node.js built-in fetch is required");
  const indexUrl = new URL("/sitemap-index.xml", config.siteOrigin);
  indexUrl.searchParams.set("indexnow", Date.now().toString());
  const indexXml = await fetchText(indexUrl, fetchImpl);

  if (/<urlset\b/i.test(indexXml)) return extractSitemapUrls(indexXml).map(normalizeUrl);
  const childSitemaps = extractSitemapUrls(indexXml).map(normalizeUrl);
  if (childSitemaps.length === 0) throw new Error("Production sitemap index does not list any child sitemaps");

  const documents = await Promise.all(childSitemaps.map((url) => fetchText(url, fetchImpl)));
  return documents.flatMap(extractSitemapUrls).map(normalizeUrl);
}

function buildPayload(urls) {
  const urlList = [...new Set(urls.map(normalizeUrl))];
  if (urlList.length === 0) throw new Error("Provide at least one URL or use --all");
  if (urlList.length > MAX_URLS_PER_REQUEST) {
    throw new Error(`IndexNow accepts at most ${MAX_URLS_PER_REQUEST} URLs per request`);
  }

  return {
    host: config.host,
    key: config.key,
    keyLocation: config.keyLocation,
    urlList,
  };
}

function parseArgs(args) {
  const options = { all: false, dryRun: false, remote: false, urls: [], urlsFile: "" };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--") continue;
    if (arg === "--all") options.all = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--remote") options.remote = true;
    else if (arg === "--urls-file") {
      options.urlsFile = args[index + 1] || "";
      if (!options.urlsFile) throw new Error("--urls-file requires a path");
      index += 1;
    } else if (arg.startsWith("--")) throw new Error(`Unknown option: ${arg}`);
    else options.urls.push(arg);
  }
  if ([options.all, options.remote].filter(Boolean).length > 1) {
    throw new Error("Use only one of --all or --remote");
  }
  return options;
}

async function submitIndexNow(payload, fetchImpl = globalThis.fetch) {
  if (typeof fetchImpl !== "function") {
    throw new Error("This command requires Node.js with the built-in fetch API");
  }

  const response = await fetchImpl(config.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000),
  });

  if (response.status !== 200 && response.status !== 202) {
    const details = (await response.text()).trim();
    throw new Error(`IndexNow returned HTTP ${response.status}${details ? `: ${details}` : ""}`);
  }

  return response.status;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const fileUrls = options.urlsFile
    ? fs.readFileSync(path.resolve(options.urlsFile), "utf8").split(/\r?\n/).map((url) => url.trim()).filter(Boolean)
    : [];
  let urls = [...options.urls, ...fileUrls];
  if (options.all) urls = [...urls, ...collectSitemapUrls()];
  if (options.remote) urls = [...urls, ...(await collectRemoteSitemapUrls())];
  const payload = buildPayload(urls);

  if (options.dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    console.log(`IndexNow dry run: ${payload.urlList.length} URL(s), no request sent.`);
    return;
  }

  const status = await submitIndexNow(payload);
  console.log(`IndexNow accepted ${payload.urlList.length} URL(s) with HTTP ${status}.`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`IndexNow submission failed: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  MAX_URLS_PER_REQUEST,
  buildPayload,
  collectRemoteSitemapUrls,
  collectSitemapUrls,
  extractSitemapUrls,
  normalizeUrl,
  parseArgs,
  submitIndexNow,
};
