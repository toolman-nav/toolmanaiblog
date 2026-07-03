# SEO Foundation Design

## Goal

Improve Toolman AI's crawlability and search-result presentation by adding a consistent technical SEO foundation for `https://toolmanai.com/`.

## Scope

- Generate absolute canonical URLs from one site URL source.
- Add richer head metadata for search snippets and social previews.
- Add robots, sitemap, and RSS discovery files.
- Add JSON-LD for the home page, tool pages, tutorial pages, and listing pages.
- Extend static tests so SEO regressions are caught during `npm test`.

## Decisions

- Use `https://toolmanai.com/` as the production site URL.
- Keep the site static and avoid new runtime services.
- Use JSON-LD because Google recommends it for structured data.
- Keep structured data faithful to visible page content.
- Use the existing Astro page structure and route helpers instead of reorganizing routes.

## Out Of Scope

- Keyword research and new content cluster creation.
- Tool detail template redesign.
- Search Console submission and analytics dashboard work.
