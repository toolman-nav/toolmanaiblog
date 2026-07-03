const coverTypes = ["deep", "blue", "green", "red", "code"];
const postImageModules = import.meta.glob("../assets/images/**/*.{jpg,jpeg,png,webp,gif}", {
  eager: true,
  import: "default",
  query: "?url",
});

export function normalizePostImage(image, { allowRemote = true } = {}) {
  const value = String(image || "").trim();
  if (!value) return "";
  if (/^https?:\/\//.test(value)) return allowRemote ? value : "";
  const imageKey = value.replace(/^["']|["']$/g, "").replace(/^(\.\.\/)+assets\/images\//, "../assets/images/");
  return postImageModules[imageKey] || "";
}

export function firstMarkdownImage(body) {
  const match = String(body || "").match(/!\[[^\]]*]\(([^)\s]+)[^)]*\)/);
  return match?.[1] || "";
}

export function sortPosts(posts) {
  return [...posts]
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export function formatPostDate(date) {
  return date.toISOString().slice(0, 10);
}

export function postToArticle(entry, index = 0) {
  const image = normalizePostImage(entry.data.image) || normalizePostImage(firstMarkdownImage(entry.body), { allowRemote: false });
  return {
    id: entry.id.replace(/\.md$/, ""),
    title: entry.data.title,
    summary: entry.data.description || "来自工具人AI导航博客的实用教程。",
    category: entry.data.category || "AI教程",
    date: formatPostDate(entry.data.published),
    reads: `${Math.max(2.4, 12.8 - index * 0.6).toFixed(1)}k`,
    featured: index === 0,
    coverType: coverTypes[index % coverTypes.length],
    image,
    tags: entry.data.tags,
    entry,
  };
}

export function postsToArticles(posts) {
  return sortPosts(posts).map(postToArticle);
}
