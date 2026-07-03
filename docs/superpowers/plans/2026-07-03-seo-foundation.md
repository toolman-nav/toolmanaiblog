# SEO Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add technical SEO infrastructure for Toolman AI on `https://toolmanai.com/`.

**Architecture:** Centralize site URL and SEO helpers in small library modules, then pass metadata and structured data through the existing Astro layout. Static endpoints generate robots, sitemap, and RSS from the same route/data sources used by the visible pages.

**Tech Stack:** Astro static output, Astro content collections, Node static tests.

---

### Task 1: Add Regression Tests

**Files:**
- Modify: `tests/static-site.test.cjs`

- [ ] Assert the official domain appears in SEO helpers and generated metadata.
- [ ] Assert `src/lib/seo.mjs`, `src/pages/sitemap.xml.js`, `src/pages/robots.txt.js`, and `src/pages/rss.xml.js` exist.
- [ ] Assert `SiteLayout.astro` renders canonical, Open Graph, Twitter Card, robots meta, and JSON-LD hooks.
- [ ] Assert home, tool detail, tutorial detail, and listing pages pass structured data props.

### Task 2: Add SEO Helpers

**Files:**
- Create: `src/lib/seo.mjs`

- [ ] Export `SITE_URL`, `absoluteUrl`, `pageUrl`, `jsonLdScript`, and schema builders.
- [ ] Build `WebSite`, `CollectionPage`, `ItemList`, `Article`, and `SoftwareApplication` JSON-LD from existing page data.

### Task 3: Extend Layout Metadata

**Files:**
- Modify: `src/layouts/SiteLayout.astro`

- [ ] Normalize canonical URLs to absolute URLs.
- [ ] Render Open Graph and Twitter metadata.
- [ ] Render `index, follow` robots meta by default.
- [ ] Render JSON-LD scripts passed by pages.

### Task 4: Wire Page Metadata

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/tools/index.astro`
- Modify: `src/pages/tools/[id].astro`
- Modify: `src/pages/tools/categories/[category]/index.astro`
- Modify: `src/pages/tools/categories/[category]/[subcategory]/index.astro`
- Modify: `src/pages/tools/categories/[category]/[subcategory]/[id].astro`
- Modify: `src/pages/tutorials/index.astro`
- Modify: `src/pages/tutorials/[id].astro`
- Modify: `src/pages/tutorials/categories/[category]/index.astro`
- Modify: `src/pages/tutorials/categories/[category]/[id].astro`
- Modify: `src/pages/about.astro`

- [ ] Pass canonical paths, page type, images, and structured data to `SiteLayout`.
- [ ] Keep structured data consistent with visible page content.

### Task 5: Add Discovery Endpoints

**Files:**
- Create: `src/pages/sitemap.xml.js`
- Create: `src/pages/robots.txt.js`
- Create: `src/pages/rss.xml.js`

- [ ] Generate all static route URLs from route helpers and content collections.
- [ ] Reference `https://toolmanai.com/sitemap.xml` from robots.
- [ ] Include tutorial posts in RSS with absolute URLs.

### Task 6: Verify

**Files:**
- No source edits.

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Inspect generated `dist/sitemap.xml`, `dist/robots.txt`, and representative HTML for absolute canonicals and JSON-LD.
