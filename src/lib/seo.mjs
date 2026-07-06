export const SITE_URL = "https://toolmanai.com";
export const SITE_NAME = "工具人AI导航";
export const SITE_DESCRIPTION = "工具人AI导航是一个面向中文用户的 AI 工具评测与国内使用教程站，帮助你更快发现工具、学习方法、形成工作流。";
export const SITE_LOGO = "/logo-512.png";
export const DEFAULT_OG_IMAGE = "/og-default.png";

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

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl(SITE_LOGO),
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

export function breadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function articleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary,
    image: [absoluteUrl(article.image || DEFAULT_OG_IMAGE)],
    datePublished: article.date,
    dateModified: article.dateModified || article.date,
    author: {
      "@type": "Organization",
      name: "工具人AI导航团队",
      url: absoluteUrl("/about/authors/"),
    },
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
    image: absoluteUrl(tool.icon || DEFAULT_OG_IMAGE),
    applicationCategory: tool.subcategory || tool.category,
    operatingSystem: "Web",
    publisher: organizationSchema(),
  };
}

export function faqPageSchema(faq = []) {
  if (!faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
