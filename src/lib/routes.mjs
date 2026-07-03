export function routeSegment(value) {
  return encodeURIComponent(String(value ?? "").trim());
}

export function toolCategoryPath(category) {
  return `/tools/categories/${routeSegment(category)}/`;
}

export function toolSubcategoryPath(category, subcategory) {
  return `/tools/categories/${routeSegment(category)}/${routeSegment(subcategory)}/`;
}

export function toolDetailPath(tool) {
  return `/tools/categories/${routeSegment(tool.category)}/${routeSegment(tool.subcategory)}/${routeSegment(tool.id)}/`;
}

export function tutorialCategoryPath(category) {
  return `/tutorials/categories/${routeSegment(category)}/`;
}

export function tutorialDetailPath(article) {
  return `/tutorials/categories/${routeSegment(article.category)}/${routeSegment(article.id)}/`;
}

export function matchRouteValue(value, candidates) {
  const decoded = decodeURIComponent(String(value ?? ""));
  return candidates.find((candidate) => candidate === decoded || routeSegment(candidate) === value);
}
