export function routeSegment(value) {
  return encodeURIComponent(String(value ?? "").trim());
}

export function toolCategoryPath(category) {
  return `/tools/categories/${routeSegment(category)}/`;
}

export function toolSubcategoryPath(category, subcategory) {
  return `/tools/categories/${routeSegment(category)}/${routeSegment(subcategory)}/`;
}

export function tutorialCategoryPath(category) {
  return `/tutorials/categories/${routeSegment(category)}/`;
}

export function matchRouteValue(value, candidates) {
  const decoded = decodeURIComponent(String(value ?? ""));
  return candidates.find((candidate) => candidate === decoded || routeSegment(candidate) === value);
}
