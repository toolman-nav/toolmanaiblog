import { getCollection } from "astro:content";
import { postsToArticles } from "../lib/posts.mjs";
import { tutorialDetailPath } from "../lib/routes.mjs";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "../lib/seo.mjs";

const xmlEscape = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function rssItem(article) {
  const url = absoluteUrl(tutorialDetailPath(article));
  return [
    "    <item>",
    `      <title>${xmlEscape(article.title)}</title>`,
    `      <link>${xmlEscape(url)}</link>`,
    `      <guid>${xmlEscape(url)}</guid>`,
    `      <pubDate>${new Date(article.date).toUTCString()}</pubDate>`,
    `      <description>${xmlEscape(article.summary)}</description>`,
    "    </item>",
  ].join("\n");
}

export async function GET() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const tutorials = postsToArticles(posts);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${xmlEscape(SITE_NAME)}</title>\n    <link>${xmlEscape(absoluteUrl("/"))}</link>\n    <description>${xmlEscape(SITE_DESCRIPTION)}</description>\n${tutorials
    .map(rssItem)
    .join("\n")}\n  </channel>\n</rss>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
