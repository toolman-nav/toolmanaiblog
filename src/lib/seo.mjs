export const SITE_URL = "https://toolmanai.com";
export const SITE_NAME = "工具人AI导航";
export const SITE_DESCRIPTION = "工具人AI导航是一个面向中文用户的 AI 工具与教程导航站，帮助你更快发现工具、学习方法、形成工作流。";

const trimTrailingSlash = (value) => String(value || "").replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  const value = String(path || "/").trim();
  if (/^https?:\/\//.test(value)) return value;
  const normalizedPath = value.startsWith("/") ? value : `/${value}`;
  return `${trimTrailingSlash(SITE_URL)}${normalizedPath}`;
}

export function pageUrl(path = "/") {
  return absoluteUrl(path);
}

export function jsonLdScript(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function organizationSchema() {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  };
}

function imageList(image) {
  if (!image) return undefined;
  return [absoluteUrl(image)];
}

function itemList(items = []) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name || item.title,
      url: absoluteUrl(item.url || item.path || "/"),
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: SITE_DESCRIPTION,
    publisher: organizationSchema(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/tools/")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function collectionPageSchema({ name, description, path, items = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    mainEntity: itemList(items),
  };
}

export function itemListSchema(items = []) {
  return {
    "@context": "https://schema.org",
    ...itemList(items),
  };
}

export function articleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    image: imageList(article.image),
    datePublished: article.date,
    author: organizationSchema(),
    publisher: organizationSchema(),
    mainEntityOfPage: absoluteUrl(article.url || article.path || "/"),
  };
}

export function softwareApplicationSchema(tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: absoluteUrl(tool.url || tool.path || "/"),
    image: tool.cover ? absoluteUrl(tool.cover) : undefined,
    applicationCategory: tool.subcategory || tool.category,
    operatingSystem: "Web",
    publisher: organizationSchema(),
  };
}
