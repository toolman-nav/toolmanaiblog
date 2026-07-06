const { pathToFileURL } = require("node:url");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const siteModule = pathToFileURL(path.join(root, "src/data/site.mjs")).href;
const ninetyDays = 90 * 24 * 60 * 60 * 1000;

(async () => {
  const site = (await import(siteModule)).default;
  const now = new Date();
  const stale = site.tools.filter((tool) => {
    const reviewed = new Date(tool.lastReviewed);
    return Number.isNaN(reviewed.getTime()) || now.getTime() - reviewed.getTime() > ninetyDays;
  });

  if (!stale.length) {
    console.log("工具页复查：无需复查，所有工具 lastReviewed 均在 90 天内。");
    return;
  }

  console.warn("工具页复查：以下工具超过 90 天需复查：");
  for (const tool of stale) {
    console.warn(`- ${tool.name} (${tool.slug || tool.id}) lastReviewed=${tool.lastReviewed || "missing"}`);
  }
})();
