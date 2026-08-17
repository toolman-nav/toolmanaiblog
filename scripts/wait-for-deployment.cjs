const config = require("../indexnow.config.cjs");

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForDeployment(expectedCommit, options = {}) {
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  const attempts = options.attempts || 90;
  const intervalMs = options.intervalMs ?? 10_000;

  if (!/^[0-9a-f]{40}$/i.test(expectedCommit)) throw new Error("Expected commit must be a full 40-character SHA");
  if (typeof fetchImpl !== "function") throw new Error("Node.js built-in fetch is required");

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const markerUrl = new URL(config.deploymentMarkerUrl);
      markerUrl.searchParams.set("expected", expectedCommit);
      markerUrl.searchParams.set("attempt", String(attempt));
      const response = await fetchImpl(markerUrl, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(15_000),
      });
      if (response.ok) {
        const marker = await response.json();
        if (marker.commit === expectedCommit) return attempt;
      }
    } catch (error) {
      if (attempt === attempts) throw error;
    }
    if (attempt < attempts) await sleep(intervalMs);
  }

  throw new Error(`Cloudflare Pages did not publish commit ${expectedCommit} within the wait window`);
}

async function main() {
  const expectedCommit = process.argv[2];
  const attempt = await waitForDeployment(expectedCommit);
  console.log(`Cloudflare Pages published ${expectedCommit} (check ${attempt}).`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`Deployment wait failed: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { waitForDeployment };
