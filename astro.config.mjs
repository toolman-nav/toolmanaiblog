import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import affiliateLinks from "./scripts/affiliate-links.mjs";

export default defineConfig({
  site: "https://toolmanai.com",
  output: "static",
  trailingSlash: "always",
  vite: {
    resolve: {
      // Vite 8's Windows module runner otherwise evaluates picomatch's CommonJS entry as ESM during content sync.
      alias: [
        {
          find: /^picomatch$/,
          replacement: fileURLToPath(new URL("./scripts/picomatch-esm.mjs", import.meta.url)),
        },
      ],
    },
  },
  integrations: [
    affiliateLinks(),
    sitemap({
      filter(page) {
        return page !== "https://toolmanai.com/deployment.json";
      },
      serialize(item) {
        if (item.url === "https://toolmanai.com/sitemap.xml") {
          item.url = "https://toolmanai.com/sitemap-index.xml";
        }
        return item;
      },
    }),
  ],
});
