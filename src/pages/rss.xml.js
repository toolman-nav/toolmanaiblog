import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { postToArticle, sortPosts } from "../lib/posts.mjs";
import { blogDetailPath } from "../lib/routes.mjs";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../lib/seo.mjs";

export async function GET(context) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: context.site || SITE_URL,
    items: sortPosts(posts).map((entry, index) => {
      const article = postToArticle(entry, index);
      return {
        title: article.title,
        description: article.summary,
        pubDate: entry.data.published,
        link: blogDetailPath(article),
      };
    }),
  });
}
