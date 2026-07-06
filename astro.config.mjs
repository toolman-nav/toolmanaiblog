import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://toolmanai.com",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      serialize(item) {
        if (item.url === "https://toolmanai.com/sitemap.xml") {
          item.url = "https://toolmanai.com/sitemap-index.xml";
        }
        return item;
      },
    }),
  ],
});
