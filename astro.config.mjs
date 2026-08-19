import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const ASTRO_IMG_SRC = /<img\b([^>]*?)\bsrc="(\/_astro\/[^"]+)"([^>]*)>/gi;

function deferAstroImages(html) {
  return html.replace(ASTRO_IMG_SRC, (full, pre, src, post) => {
    if (/\bdata-defer-src=/.test(full)) return full;
    const alt = (full.match(/\balt="([^"]*)"/) || [])[1] || "";
    return `<img${pre}src="${PLACEHOLDER}" data-defer-src="${src}" decoding="async"${post}><noscript><img src="${src}" alt="${alt}"></noscript>`;
  });
}

function deferAstroImagesIntegration() {
  return {
    name: "defer-astro-images",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const root = fileURLToPath(dir);
        const walk = (folder) => {
          for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
            const full = path.join(folder, entry.name);
            if (entry.isDirectory()) {
              walk(full);
              continue;
            }
            if (!entry.name.endsWith(".html")) continue;
            const html = fs.readFileSync(full, "utf8");
            const next = deferAstroImages(html);
            if (next !== html) fs.writeFileSync(full, next);
          }
        };
        walk(root);
      },
    },
  };
}

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
    deferAstroImagesIntegration(),
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
