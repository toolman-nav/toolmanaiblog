export const CATEGORY_SLUGS = {
  "AI 工具": "ai-tools",
  "AI 对话助手": "ai-chat",
  "AI 音乐生成": "ai-music",
  "AI 编程工具": "ai-coding",
  海外数字服务: "overseas-services",
  流媒体娱乐: "streaming",
  AI教程: "ai-tutorials",
  海外AI使用教程: "overseas-ai-guides",
  海外工具使用教程: "overseas-service-guides",
  AI实用工具: "ai-practical-tools",
  订阅充值: "subscription-guides",
};

export const SLUG_TO_CATEGORY = Object.fromEntries(Object.entries(CATEGORY_SLUGS).map(([name, slug]) => [slug, name]));

export function categorySlug(value) {
  const key = String(value || "").trim();
  return CATEGORY_SLUGS[key] || key.toLowerCase().replace(/\s+/g, "-");
}

export function toolCategoryPath(category) {
  return `/tools/categories/${categorySlug(category)}/`;
}

export function toolSubcategoryPath(category, subcategory) {
  return `/tools/categories/${categorySlug(category)}/${categorySlug(subcategory)}/`;
}

export function toolDetailPath(tool) {
  return `/tools/${tool.slug || tool.id}/`;
}

export function blogCategoryPath(category) {
  return `/blog/categories/${categorySlug(category)}/`;
}

export function blogDetailPath(article) {
  return `/blog/${article.slug || article.id}/`;
}

export const tutorialCategoryPath = blogCategoryPath;
export const tutorialDetailPath = blogDetailPath;

export function matchRouteValue(value, candidates) {
  const key = String(value || "");
  const decoded = SLUG_TO_CATEGORY[key] || decodeURIComponent(key);
  return candidates.find((candidate) => candidate === decoded || categorySlug(candidate) === key);
}
