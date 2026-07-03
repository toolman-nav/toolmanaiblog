import { getCollection } from "astro:content";
import site from "../data/site.mjs";
import { postsToArticles } from "../lib/posts.mjs";
import { toolCategoryPath, toolDetailPath, toolSubcategoryPath, tutorialCategoryPath, tutorialDetailPath } from "../lib/routes.mjs";
import { absoluteUrl } from "../lib/seo.mjs";

const xmlEscape = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function urlEntry({ path, lastmod, priority = "0.7" }) {
  return [
    "  <url>",
    `    <loc>${xmlEscape(absoluteUrl(path))}</loc>`,
    lastmod ? `    <lastmod>${xmlEscape(lastmod)}</lastmod>` : "",
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function GET() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const tutorials = postsToArticles(posts);
  const tutorialCategories = [...new Set(tutorials.map((article) => article.category))];

  const routes = [
    { path: "/", priority: "1.0" },
    { path: "/tools/", priority: "0.9" },
    { path: "/tutorials/", priority: "0.9" },
    { path: "/about/", priority: "0.5" },
    ...site.categories.map((category) => ({ path: toolCategoryPath(category.name), priority: "0.8" })),
    ...site.categories.flatMap((category) =>
      category.subcategories.map((subcategory) => ({ path: toolSubcategoryPath(category.name, subcategory), priority: "0.8" })),
    ),
    ...site.tools.map((tool) => ({ path: toolDetailPath(tool), priority: "0.8" })),
    ...tutorialCategories.map((category) => ({ path: tutorialCategoryPath(category), priority: "0.8" })),
    ...tutorials.map((article) => ({ path: tutorialDetailPath(article), lastmod: article.date, priority: "0.8" })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map(urlEntry)
    .join("\n")}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
