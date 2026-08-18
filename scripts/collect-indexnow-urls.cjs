const { execFileSync } = require("node:child_process");

const config = require("../indexnow.config.cjs");
const { siteOrigin } = config;

const ALL_URLS_MARKER = "__INDEXNOW_ALL__";
const POST_PATH = /^src\/content\/posts\/.*\.md$/;
const GLOBAL_SOURCE_PATH = /^src\//;

function postUrlFromSource(source) {
  const slug = source.match(/^slug:\s*["']?([a-z0-9]+(?:-[a-z0-9]+)*)["']?\s*$/m)?.[1];
  if (!slug) throw new Error("Changed post is missing a valid slug");
  return `${siteOrigin}/blog/${slug}/`;
}

function createPlan(changes, readAtRef) {
  const urls = new Set();
  let all = false;

  for (const change of changes) {
    const paths = [change.oldPath, change.path].filter(Boolean);
    const sourcePaths = paths.filter((file) => POST_PATH.test(file));

    if (sourcePaths.length > 0) {
      if (change.oldPath && POST_PATH.test(change.oldPath)) {
        urls.add(postUrlFromSource(readAtRef(change.before, change.oldPath)));
      }
      if (change.path && change.status !== "D" && POST_PATH.test(change.path)) {
        urls.add(postUrlFromSource(readAtRef(change.after, change.path)));
      }
      urls.add(`${siteOrigin}/`);
      urls.add(`${siteOrigin}/blog/`);
      continue;
    }

    if (paths.some((file) => GLOBAL_SOURCE_PATH.test(file) && file !== "src/pages/deployment.json.js")) {
      all = true;
    }
    if (paths.some((file) => file === "astro.config.mjs" || file === "public/_redirects")) {
      all = true;
    }
    if (paths.some((file) => file === "indexnow.config.cjs" || file === `public/${config.keyFileName}`)) {
      all = true;
    }
  }

  return { all, urls: [...urls].sort() };
}

function parseNameStatus(output, before, after) {
  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const [status, firstPath, secondPath] = line.split("\t");
      if (!status || !firstPath) throw new Error(`Unexpected git diff line: ${line}`);
      if (status.startsWith("R") || status.startsWith("C")) {
        return { status: status[0], oldPath: firstPath, path: secondPath, before, after };
      }
      return { status: status[0], oldPath: status[0] === "D" ? firstPath : undefined, path: status[0] === "D" ? undefined : firstPath, before, after };
    });
}

function collectChangedUrls(before, after, git = "git") {
  if (!before || /^0+$/.test(before)) return { all: true, urls: [] };
  const output = execFileSync(git, ["-c", "core.quotePath=false", "diff", "--name-status", "--find-renames", before, after], {
    encoding: "utf8",
  });
  const changes = parseNameStatus(output, before, after);
  const readAtRef = (ref, file) => execFileSync(git, ["show", `${ref}:${file}`], { encoding: "utf8" });
  return createPlan(changes, readAtRef);
}

function main() {
  const [before, after] = process.argv.slice(2);
  if (!before || !after) throw new Error("Usage: node scripts/collect-indexnow-urls.cjs <before-sha> <after-sha>");
  const plan = collectChangedUrls(before, after);
  if (plan.all) console.log(ALL_URLS_MARKER);
  else if (plan.urls.length > 0) console.log(plan.urls.join("\n"));
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`IndexNow change detection failed: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { ALL_URLS_MARKER, createPlan, parseNameStatus, postUrlFromSource };
