const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

assert.ok(fs.existsSync(path.join(root, "index.html")), "index.html should exist");
assert.ok(fs.existsSync(path.join(root, "styles.css")), "styles.css should exist");
assert.ok(fs.existsSync(path.join(root, "app.js")), "app.js should exist");
assert.ok(fs.existsSync(path.join(root, "package.json")), "package.json should exist for the Astro project");
assert.ok(fs.existsSync(path.join(root, "astro.config.mjs")), "astro.config.mjs should configure Astro");
assert.ok(fs.existsSync(path.join(root, "src/pages/index.astro")), "Astro should statically render the home page");
assert.ok(fs.existsSync(path.join(root, "src/pages/tools/index.astro")), "Astro should statically render the AI navigation page");
assert.ok(fs.existsSync(path.join(root, "src/pages/tools/[id].astro")), "Astro should statically render tool detail pages");
assert.ok(
  fs.existsSync(path.join(root, "src/pages/tools/categories/[category]/index.astro")),
  "Astro should statically render tool category routes",
);
assert.ok(
  fs.existsSync(path.join(root, "src/pages/tools/categories/[category]/[subcategory]/index.astro")),
  "Astro should statically render tool subcategory routes",
);
assert.ok(fs.existsSync(path.join(root, "src/pages/tutorials/index.astro")), "Astro should statically render the tutorial listing page");
assert.ok(fs.existsSync(path.join(root, "src/pages/tutorials/[id].astro")), "Astro should statically render tutorial detail pages");
assert.ok(
  fs.existsSync(path.join(root, "src/pages/tutorials/categories/[category]/index.astro")),
  "Astro should statically render tutorial category routes",
);
assert.ok(fs.existsSync(path.join(root, "src/pages/about.astro")), "Astro should statically render the about page");
assert.ok(fs.existsSync(path.join(root, "src/data/site.mjs")), "Astro should import legacy site data through an ESM wrapper");
assert.ok(fs.existsSync(path.join(root, "src/lib/routes.mjs")), "Astro should centralize SEO route generation");
assert.ok(fs.existsSync(path.join(root, "src/content.config.ts")), "Astro should define a content collection for GitHub tutorial posts");
assert.ok(
  fs.existsSync(path.join(root, "src/content/posts/claudecode-jiaocheng.md")),
  "GitHub tutorial posts should be copied into the local content collection",
);
assert.ok(
  fs.existsSync(path.join(root, "src/assets/images/claudecode-jiaocheng/00.png")),
  "GitHub tutorial images should be copied into local assets",
);

const packageJson = JSON.parse(read("package.json"));
assert.ok(packageJson.dependencies?.astro, "Astro should be a project dependency");
assert.equal(packageJson.scripts?.dev, "astro dev", "dev script should start the Astro dev server");
assert.equal(packageJson.scripts?.build, "astro build", "build script should generate the static site");
assert.equal(packageJson.scripts?.test, "node tests/static-site.test.cjs", "test script should run the project assertions");

const layoutSource = read("src/layouts/SiteLayout.astro");
assert.ok(layoutSource.includes('href: "/tools/"'), "site layout should link to the real AI navigation route");
assert.ok(layoutSource.includes('href: "/tutorials/"'), "site layout should link to the real tutorial route");
assert.ok(layoutSource.includes('href: "/about/"'), "site layout should link to the real about route");
assert.ok(layoutSource.includes('data-global-search'), "site layout should keep a global search form");

const astroHome = read("src/pages/index.astro");
const astroTools = read("src/pages/tools/index.astro");
const astroToolDetail = read("src/pages/tools/[id].astro");
const astroTutorials = read("src/pages/tutorials/index.astro");
const astroTutorialDetail = read("src/pages/tutorials/[id].astro");
const articleVisual = read("src/components/ArticleVisual.astro");
const tutorialCard = read("src/components/TutorialCard.astro");
const postsLib = read("src/lib/posts.mjs");
assert.ok(astroHome.includes('getCollection("posts"'), "Astro home should render GitHub posts at build time");
assert.ok(astroHome.includes("Claude Code国内使用指南"), "Astro home should include the GitHub tutorial titles");
assert.ok(astroHome.includes("getPopularTools(10)"), "Astro home should render two rows of popular tools at build time");
assert.ok(postsLib.includes("normalizePostImage"), "GitHub post image paths should be normalized for local rendering");
assert.ok(postsLib.includes("const image = normalizePostImage"), "Mapped tutorial articles should expose GitHub cover images");
assert.ok(postsLib.includes("firstMarkdownImage"), "Mapped tutorial articles should fall back to the first Markdown image as cover");
assert.ok(articleVisual.includes("article.image"), "Article visuals should prefer GitHub cover images when present");
assert.ok(articleVisual.includes("<img"), "Article visuals should render real image elements for GitHub covers");
assert.ok(articleVisual.includes("{article.title}"), "Gradient article placeholders should use the article title");
assert.ok(tutorialCard.includes("article.image ? <img"), "Compact home article cards should render GitHub cover images");
assert.ok(tutorialCard.includes("<span class=\"visual-label\">{article.title}</span>"), "Compact article placeholders should use the article title");
assert.ok(astroTools.includes("getToolSections"), "Astro tools page should render full tool sections at build time");
assert.ok(read("src/components/ToolTile.astro").includes('href={`/tools/${tool.id}/`}'), "Tool cards should link to indexable detail routes");
assert.ok(astroToolDetail.includes("getStaticPaths"), "Tool detail page should generate static paths");
assert.ok(astroToolDetail.includes("renderToolContent"), "Tool detail page should render source markdown content");
assert.ok(astroTutorials.includes('getCollection("posts"'), "Tutorial listing should render GitHub post content at build time");
assert.ok(astroTutorials.includes("Claude Code国内使用指南"), "Tutorial listing should include the GitHub tutorial titles");
assert.ok(read("src/components/TutorialCard.astro").includes('href={`/tutorials/${article.id}/`}'), "Tutorial cards should link to indexable detail routes");
assert.ok(astroTutorialDetail.includes("getStaticPaths"), "Tutorial detail page should generate static paths");
assert.ok(astroTutorialDetail.includes("render(entry)"), "Tutorial detail page should render Markdown post bodies");

const html = read("index.html");
for (const label of ["主页", "AI导航", "AI教程", "关于我们"]) {
  assert.ok(html.includes(label), `index.html should include nav label ${label}`);
}
assert.ok(html.includes("styles.css"), "index.html should load styles.css");
assert.ok(html.includes("app.js"), "index.html should load app.js");

const app = require(path.join(root, "app.js"));
const appSource = read("app.js");
const cssSource = read("styles.css");
const publicCssSource = read("public/styles.css");

assert.ok(!appSource.includes('class="bookmark"'), "home recommendation cards should not render bookmark icons");
assert.ok(!cssSource.includes(".bookmark"), "bookmark styles should be removed with the icon");
assert.ok(!appSource.includes('class="panel home-articles"'), "home recommended articles should not use a large panel background");
assert.ok(!appSource.includes('class="panel home-tools"'), "home recommended tools should not use a large panel background");
assert.ok(appSource.includes('class="home-articles"'), "home recommended articles should render as a plain section");
assert.ok(appSource.includes('class="home-tools"'), "home recommended tools should render as a plain section");
assert.ok(appSource.includes("function articleInfoPanel"), "article cards should share the richer text panel renderer");
assert.ok(appSource.includes('class="article-info-panel"'), "article cards should render a styled text panel");
assert.ok(appSource.includes("articleReadingStats"), "article cards should render estimated word count and reading time");
assert.ok(
  appSource.includes("getRecommendedTutorials(8)"),
  "home recommendation section should render a two-row four-column article grid",
);
assert.ok(appSource.includes("查看更多"), "home recommendation section should render the view-more action");
assert.ok(
  appSource.includes('data-tab-target="tutorials"'),
  "home load more action should jump to the AI tutorial tab",
);
assert.ok(!cssSource.includes("overflow-y: auto"), "home recommendations should expand in the page instead of using an internal scrollbar");
const loadMoreStyle = cssSource.match(/\.load-more-button\s*\{[^}]+\}/)?.[0] || "";
const loadMoreRowStyle = cssSource.match(/\.load-more-row\s*\{[^}]+\}/)?.[0] || "";
const recommendListStyle = cssSource.match(/\.recommend-list\s*\{[^}]+\}/)?.[0] || "";
const homeSectionStyle = cssSource.match(/\.home-articles,\n\.home-tools\s*\{[^}]+\}/)?.[0] || "";
const homeLayoutStyle = cssSource.match(/\.home-layout\s*\{[^}]+\}/)?.[0] || "";
const headerSearchStyle = cssSource.match(/\.header-search\s*\{[^}]+\}/)?.[0] || "";
const articleInfoPanelStyle = cssSource.match(/\.article-info-panel\s*\{[^}]+\}/)?.[0] || "";
const articleInfoMetaStyle = cssSource.match(/\.article-info-meta\s*\{[^}]+\}/)?.[0] || "";
const articleInfoIconStyle = cssSource.match(/\.article-info-icon\s*\{[^}]+\}/)?.[0] || "";
const articleInfoStatsStyle = cssSource.match(/\.article-info-stats\s*\{[^}]+\}/)?.[0] || "";
const articleRowStyle = cssSource.match(/\.article-row\s*\{[^}]+\}/)?.[0] || "";
const articleThumbStyle = cssSource.match(/\.thumb\s*\{[^}]+\}/)?.[0] || "";
const publicArticleVisualStyle = publicCssSource.match(/\.article-visual\s*\{[^}]+\}/)?.[0] || "";
const publicArticleThumbStyle = publicCssSource.match(/\.thumb\s*\{[^}]+\}/)?.[0] || "";
const visualLabelStyle = publicCssSource.match(/\.visual-label\s*\{[^}]+\}/)?.[0] || "";
const compactArticlePanelStyle = cssSource.match(/\.article-row \.article-info-panel\s*\{[^}]+\}/)?.[0] || "";
const compactArticleTitleStyle = cssSource.match(/\.article-row \.article-info-title\s*\{[^}]+\}/)?.[0] || "";
const compactArticleMetaStyle = cssSource.match(/\.article-row \.article-info-meta\s*\{[^}]+\}/)?.[0] || "";
const compactArticleSummaryStyle = cssSource.match(/\.article-row \.article-info-summary\s*\{[^}]+\}/)?.[0] || "";
const publicCompactArticlePanelStyle = publicCssSource.match(/\.article-row \.article-info-panel\s*\{[^}]+\}/)?.[0] || "";
const publicCompactArticleMetaStyle = publicCssSource.match(/\.article-row \.article-info-meta\s*\{[^}]+\}/)?.[0] || "";
const publicCompactArticleSummaryStyle = publicCssSource.match(/\.article-row \.article-info-summary\s*\{[^}]+\}/)?.[0] || "";
const tutorialCardIconStyle =
  [...publicCssSource.matchAll(/\.tutorial-card \.article-info-icon\s*\{[^}]+\}/g)]
    .map((match) => match[0])
    .find((rule) => rule.includes("width: 18px")) || "";
assert.ok(headerSearchStyle.includes("height: 38px"), "global header search should be ten pixels shorter");
assert.ok(articleInfoPanelStyle.includes("background: #fff"), "article text panels should keep a white background");
assert.ok(articleInfoPanelStyle.includes("color: var(--text)"), "article text panels should use the site text color");
assert.ok(articleInfoMetaStyle.includes("display: flex"), "article text panels should show icon metadata in a row");
assert.ok(articleInfoIconStyle.includes("background: #eaf4ff"), "article metadata icons should use light rounded squares");
assert.ok(articleInfoStatsStyle.includes("color: #747e84"), "article text panels should render weak word-count metadata");
assert.ok(homeLayoutStyle.includes("gap: 36px"), "home article and tool sections should have doubled vertical spacing");
assert.ok(homeSectionStyle.includes("background: transparent"), "home recommendation sections should sit directly on the page background");
assert.ok(homeSectionStyle.includes("border: 0"), "home recommendation sections should not draw an outer border");
assert.ok(homeSectionStyle.includes("box-shadow: none"), "home recommendation sections should not draw an outer shadow");
assert.ok(recommendListStyle.includes("display: grid"), "home article items should render as a block grid");
assert.ok(recommendListStyle.includes("grid-template-columns: repeat(4, minmax(0, 1fr))"), "home article grid should render four columns on desktop");
assert.ok(recommendListStyle.includes("gap: 14px"), "home article grid should keep compact card spacing");
assert.ok(articleRowStyle.includes("grid-template-columns: 1fr"), "home article cards should use a vertical block layout");
assert.ok(articleRowStyle.includes("padding: 8px"), "home article cards should reduce padding for the shorter item height");
assert.ok(articleThumbStyle.includes("min-height: 84px"), "home article thumbnails should be reduced to three quarters of the prior height");
assert.ok(publicArticleVisualStyle.includes("align-items: center"), "gradient article placeholders should center their title vertically");
assert.ok(publicArticleVisualStyle.includes("justify-content: center"), "gradient article placeholders should center their title horizontally");
assert.ok(publicArticleThumbStyle.includes("place-items: center"), "compact gradient placeholders should center their title");
assert.ok(visualLabelStyle.includes("-webkit-line-clamp: 3"), "gradient placeholder text should be clamped to three lines");
assert.ok(visualLabelStyle.includes("max-height: calc(1.35em * 3)"), "gradient placeholder text should keep a hard three-line height limit");
assert.ok(visualLabelStyle.includes("text-decoration: none"), "gradient placeholder titles should not look like text links");
assert.ok(visualLabelStyle.includes("pointer-events: none"), "gradient placeholder titles should not capture pointer events");
assert.ok(compactArticlePanelStyle.includes("padding: 10px 12px"), "home article text panels should use compact padding");
assert.ok(compactArticlePanelStyle.includes("gap: 4px"), "home article text panels should reduce vertical spacing around metadata");
assert.ok(compactArticleTitleStyle.includes("font-size: 17px"), "home article titles should be compact");
assert.ok(compactArticleMetaStyle.includes("gap: 3px 8px"), "home article metadata should use tighter vertical tag spacing");
assert.ok(compactArticleSummaryStyle.includes("-webkit-line-clamp: 2"), "home article summaries should show up to two lines");
assert.ok(publicCompactArticlePanelStyle.includes("gap: 4px"), "published home article text panels should reduce vertical spacing around metadata");
assert.ok(publicCompactArticleMetaStyle.includes("gap: 3px 8px"), "published home article metadata should use tighter vertical tag spacing");
assert.ok(publicCompactArticleSummaryStyle.includes("-webkit-line-clamp: 2"), "published home article summaries should show up to two lines");
assert.ok(tutorialCardIconStyle.includes("width: 18px"), "tutorial list metadata icons should be visually quiet");
assert.ok(tutorialCardIconStyle.includes("background: transparent"), "tutorial list metadata icons should not render large filled squares");
assert.ok(loadMoreRowStyle.includes("background: transparent"), "home load more row should not introduce a separate background block");
assert.ok(loadMoreRowStyle.includes("margin: 10px 0 0"), "home load more row should align with the plain article section");
assert.ok(loadMoreRowStyle.includes("padding: 0"), "home load more row should not add extra vertical spacing");
assert.ok(loadMoreStyle.includes("width: 100%"), "home load more action should span the article section width");
assert.ok(loadMoreStyle.includes("background: #fff"), "home load more action should use the white bar style");
assert.ok(loadMoreStyle.includes("color: #4f9bff"), "home load more action should use a lighter blue text");
assert.ok(appSource.includes("关于 工具人AI导航"), "about page should replace the placeholder title with a branded about title");
assert.ok(appSource.includes("实战工作流"), "about page should reuse the source page's practical workflow positioning");
assert.ok(appSource.includes("严选工具导航"), "about page should include curated tool navigation positioning");
assert.ok(appSource.includes("工作流复盘"), "about page should include workflow recap positioning");
assert.ok(appSource.includes("所有内容仅作学习参考"), "about page should include the source page's learning-reference disclaimer");
assert.ok(!appSource.includes("mock-window"), "about page should not render the removed mock preview");
assert.ok(!cssSource.includes(".mock-window"), "removed about mock preview styles should be cleaned up");
assert.ok(!appSource.includes("沪ICP备19026706号-6"), "about page footer should not render the removed ICP text");

assert.ok(app.tutorials.length >= 20, "tutorial dataset should include at least twenty articles");
assert.ok(app.tools.length >= 50, "tool dataset should include at least fifty tools");
for (const category of [
  "AI写作",
  "AI图像",
  "AI视频创作",
  "AI办公",
  "AI开发平台",
  "AI智能体",
  "AI聊天对话",
  "AI音频音乐",
  "AI商业设计",
  "AI大模型",
  "AI学习平台",
  "AI搜索引擎",
  "AI内容检测",
  "AI应用",
]) {
  assert.ok(app.categories.some((item) => item.name === category), `AI navigation should include ${category}`);
}

assert.equal(typeof app.getToolSections, "function", "AI navigation should expose full directory sections");
const toolSections = app.getToolSections();
assert.ok(toolSections.length >= 14, "AI navigation should render all major directory sections");
assert.ok(toolSections.every((section) => section.tools.length > 0), "each directory section should have visible tools");
assert.ok(appSource.includes('class="directory-shell"'), "AI navigation should render a plain directory shell");
assert.ok(appSource.includes('class="tool-directory-layout"'), "AI navigation should render a sidebar and content layout");
assert.ok(appSource.includes('class="tool-sidebar"'), "AI navigation should include a category sidebar");
assert.ok(appSource.includes("renderToolSidebar"), "AI navigation sidebar should be generated from category data");
assert.ok(appSource.includes("sidebar-subcategory"), "AI navigation sidebar should include category subitems");
assert.ok(appSource.includes("expandedToolCategory"), "AI navigation sidebar should track expanded state separately from selected category");
assert.ok(appSource.includes("renderSidebarIcon"), "AI navigation sidebar categories should render left-side icons");
assert.ok(appSource.includes("sidebar-arrow"), "AI navigation sidebar categories should render arrow icons");
assert.ok(appSource.includes('aria-expanded="${isExpanded}"'), "AI navigation sidebar categories should expose collapsed state");
assert.ok(appSource.includes('categoryButton.closest(".tool-sidebar")'), "sidebar category clicks should be distinguishable from top category tabs");
assert.ok(appSource.includes('state.expandedToolCategory = ""'), "clicking the expanded sidebar category should collapse it");
assert.ok(
  appSource.includes('${isExpanded ? `') && appSource.includes(': ""}'),
  "AI navigation sidebar should render subcategories only for the expanded category",
);
assert.ok(!appSource.includes('class="panel directory-shell"'), "AI navigation tab should not render a white panel background");
assert.ok(!appSource.includes("category-caret"), "AI navigation category tabs should not render dropdown caret icons");
assert.ok(!appSource.includes("⌄"), "AI navigation category tabs should not render caret glyphs");
assert.ok(!cssSource.includes(".category-caret"), "unused category caret styles should be removed");
const toolLayoutStyle = cssSource.match(/\.tool-directory-layout\s*\{[^}]+\}/)?.[0] || "";
const toolSidebarStyle = cssSource.match(/\.tool-sidebar\s*\{[^}]+\}/)?.[0] || "";
assert.ok(toolLayoutStyle.includes("grid-template-columns: 196px minmax(0, 1fr)"), "AI navigation layout should reserve a narrower left sidebar");
assert.ok(toolSidebarStyle.includes("position: sticky"), "AI navigation sidebar should stay visible while scrolling");
assert.ok(toolSidebarStyle.includes("top: calc(50vh + 32px)"), "AI navigation sidebar should be vertically centered below the header");
assert.ok(toolSidebarStyle.includes("transform: translateY(-50%)"), "AI navigation sidebar should center itself around the sticky anchor");
assert.ok(toolSidebarStyle.includes("max-height: calc(100vh - 96px)"), "AI navigation sidebar should fit within the viewport");
const sidebarCategoryButtonStyle = cssSource.match(/\.sidebar-category-button\s*\{[^}]+\}/)?.[0] || "";
const sidebarActiveCategoryButtonStyle = cssSource.match(/\.sidebar-category\.is-active \.sidebar-category-button\s*\{[^}]+\}/)?.[0] || "";
const sidebarArrowStyle = cssSource.match(/\.sidebar-arrow\s*\{[^}]+\}/)?.[0] || "";
const sidebarActiveArrowStyle = cssSource.match(/\.sidebar-category\.is-active \.sidebar-arrow\s*\{[^}]+\}/)?.[0] || "";
const sidebarIconStyle = cssSource.match(/\.sidebar-icon\s*\{[^}]+\}/)?.[0] || "";
const sidebarSubcategoryStyle =
  [...cssSource.matchAll(/\.sidebar-subcategory\s*\{[^}]+\}/g)]
    .map((match) => match[0])
    .find((rule) => rule.includes("min-height")) || "";
const sidebarActiveSubcategoryStyle = cssSource.match(/\.sidebar-subcategory\.is-active\s*\{[^}]+\}/)?.[0] || "";
assert.ok(sidebarCategoryButtonStyle.includes("grid-template-columns: 22px minmax(0, 1fr) 12px"), "AI navigation sidebar category rows should use smaller icon, label, and arrow columns");
assert.ok(sidebarCategoryButtonStyle.includes("font-size: 14px"), "AI navigation sidebar category text should be smaller");
assert.ok(sidebarIconStyle.includes("width: 18px"), "AI navigation sidebar icons should be smaller");
assert.ok(sidebarActiveCategoryButtonStyle.includes("background: #e5e5e5"), "AI navigation expanded category should use a gray selected background");
assert.ok(sidebarActiveCategoryButtonStyle.includes("color: #5b5ff4"), "AI navigation expanded category should use blue-purple text");
assert.ok(sidebarArrowStyle.includes("transform: rotate(-45deg)"), "AI navigation collapsed arrow should point right");
assert.ok(sidebarActiveArrowStyle.includes("transform: rotate(45deg)"), "AI navigation expanded arrow should point down");
assert.ok(sidebarSubcategoryStyle.includes("font-size: 13px"), "AI navigation sidebar subcategory text should be smaller");
assert.ok(sidebarSubcategoryStyle.includes("width: 100%"), "AI navigation sidebar subcategory rows should share the same alignment width");
assert.ok(sidebarSubcategoryStyle.includes("justify-content: flex-start"), "AI navigation sidebar subcategory text should align with category labels");
assert.ok(sidebarSubcategoryStyle.includes("text-align: left"), "AI navigation sidebar subcategory text should be left aligned");
assert.ok(sidebarActiveSubcategoryStyle.includes("background: #e5e5e5"), "AI navigation active subcategory should use the gray rounded block style");
assert.ok(sidebarActiveSubcategoryStyle.includes("justify-content: flex-start"), "AI navigation active subcategory text should keep the same left alignment");
assert.ok(!sidebarActiveSubcategoryStyle.includes("box-shadow"), "AI navigation active subcategory should not use the old left-line selection");
const toolGridStyle = cssSource.match(/\.tool-grid\s*\{[^}]+\}/)?.[0] || "";
assert.ok(toolGridStyle.includes("padding: 16px"), "AI navigation item grid should have breathing room on a gray background");
assert.ok(toolGridStyle.includes("border-radius: var(--radius)"), "AI navigation item grid should use rounded gray background");
assert.ok(toolGridStyle.includes("background: var(--surface-soft)"), "AI navigation item grid should sit on a soft gray background");
const directorySectionHeadStyle = cssSource.match(/\.directory-section \.section-head\s*\{[^}]+\}/)?.[0] || "";
const directorySectionTitleStyle = cssSource.match(/\.directory-section \.section-title\s*\{[^}]+\}/)?.[0] || "";
assert.ok(directorySectionHeadStyle.includes("margin-bottom: 12px"), "AI navigation section title spacing should be more refined");
assert.ok(directorySectionTitleStyle.includes("font-size: 22px"), "AI navigation section titles should be smaller");
assert.ok(directorySectionTitleStyle.includes("font-weight: 700"), "AI navigation section titles should be less heavy");
assert.ok(directorySectionTitleStyle.includes("color: #182230"), "AI navigation section titles should use a softer dark color");
const subtabRowStyle = cssSource.match(/\.subtab-row\s*\{[^}]+\}/)?.[0] || "";
const subtabStyle = cssSource.match(/\.subtab\s*\{[^}]+\}/)?.[0] || "";
const activeSubtabStyle = cssSource.match(/\.subtab\.is-active\s*\{[^}]+\}/)?.[0] || "";
assert.ok(subtabRowStyle.includes("border-radius: 999px"), "AI navigation subcategory tabs should use a pill rail");
assert.ok(subtabRowStyle.includes("background: #e5e5e5"), "AI navigation subcategory tabs should sit on a gray rail");
assert.ok(subtabRowStyle.includes("flex-wrap: nowrap"), "AI navigation subcategory tabs should stay in one horizontal rail");
assert.ok(subtabRowStyle.includes("width: max-content"), "AI navigation subcategory rail should size to its content");
assert.ok(subtabRowStyle.includes("max-width: 100%"), "AI navigation subcategory rail should not exceed the parent layout");
assert.ok(subtabStyle.includes("border-radius: 999px"), "AI navigation subcategory items should be rounded pills");
assert.ok(subtabStyle.includes("color: #808080"), "AI navigation inactive subcategory text should be soft gray");
assert.ok(activeSubtabStyle.includes("linear-gradient"), "AI navigation active subcategory should use a blue-purple pill");
assert.ok(activeSubtabStyle.includes("color: #fff"), "AI navigation active subcategory text should be white");

assert.equal(typeof app.getTutorialById, "function", "tutorial detail lookup should be exposed");
const tutorialDetail = app.getTutorialById("deepseek-workflow");
assert.equal(
  tutorialDetail.title,
  "DeepSeek 入门实战：从提示词到工作流",
  "tutorial detail lookup should return the requested article",
);
assert.ok(appSource.includes("data-tutorial-id"), "tutorial cards should expose clickable article ids");
assert.ok(appSource.includes("返回教程列表"), "tutorial detail view should include a back-to-list action");
assert.ok(appSource.includes("scrollToPageTop"), "tutorial detail navigation should reset the page scroll position");
assert.ok(appSource.includes('class="tutorial-page"'), "AI tutorial page should use the learning-list layout shell");
assert.ok(appSource.includes("AI 学习教程"), "AI tutorial page should use the learning tutorial title");
assert.ok(appSource.includes('placeholder="在「AI教程」中搜索"'), "AI tutorial search placeholder should match the compact learning layout");
assert.ok(appSource.includes('class="tutorial-list"'), "AI tutorial page should render a vertical list of article cards");
assert.ok(appSource.includes("matched.map(renderTutorialCard)"), "AI tutorial page should list every matched tutorial in one feed");
assert.ok(!appSource.includes('class="panel tutorial-sidebar"'), "AI tutorial page should not render the old sidebar");
assert.ok(!appSource.includes('class="panel tutorial-featured"'), "AI tutorial page should not render the old featured card");
assert.ok(!appSource.includes('class="pagination"'), "AI tutorial page should not render the old pagination controls");
assert.ok(!appSource.includes("data-tool-all"), "AI navigation sections should not render a redundant all action");
assert.ok(!appSource.includes(".slice(0, 25)"), "AI navigation should render every tool in each section without truncation");
assert.equal(typeof app.getToolById, "function", "tool click interactions should be able to look up a tool");
assert.equal(app.getToolById("chatgpt").name, "ChatGPT", "tool lookup should return the clicked tool");
assert.equal(typeof app.getToolUrl, "function", "tool cards should expose a jump link resolver");
assert.equal(
  app.getToolUrl("spark"),
  "https://ai.codefather.cn/tool/1983423688002134045",
  "tool jump links should mirror the source directory detail links when available",
);
assert.ok(
  app.tools.every((tool) => /^https?:\/\//.test(tool.url)),
  "every tool should have a real HTTP jump link",
);
assert.equal(typeof app.getToolDetail, "function", "tool detail lookup should be exposed");
const musetDetail = app.getToolDetail("muset");
assert.equal(musetDetail.externalUrl, "https://www.muset.ai/", "tool detail should keep the source official link");
assert.ok(musetDetail.cover.includes("pic.code-nav.cn"), "tool detail should use cover data from the source directory");
assert.equal(musetDetail.viewCount, "576", "tool detail should keep source view count data");
assert.ok(
  musetDetail.content.includes("Muset是一款基于人工智能的智能创作工作空间"),
  "Muset detail content should match the source directory markdown",
);
assert.ok(
  musetDetail.content.includes("上下文感知的共同创作代理"),
  "Muset source detail should keep the original feature sections",
);
const xiaoinDetail = app.getToolDetail("xiaoin");
assert.equal(xiaoinDetail.externalUrl, "https://xiaoin.com.cn/create", "万能小in should keep the source official link");
assert.equal(xiaoinDetail.viewCount, "108", "万能小in should keep source view count data");
assert.ok(
  xiaoinDetail.content.includes("## 智能写作助手：万能小in"),
  "万能小in should render source detail content instead of the local generic template",
);
assert.ok(
  xiaoinDetail.content.includes("实习报告一键生成"),
  "万能小in source detail should keep feature bullets",
);
const sparkDetail = app.getToolDetail("spark");
assert.equal(sparkDetail.externalUrl, "https://xinghuo.xfyun.cn/desk", "讯飞星火 should keep the source official link");
assert.equal(sparkDetail.viewCount, "174", "讯飞星火 should keep source view count data");
assert.ok(
  sparkDetail.content.includes("## 讯飞星火：智能时代的全能AI助手"),
  "讯飞星火 should render source detail content instead of the local generic template",
);
assert.ok(sparkDetail.content.includes("多模态交互"), "讯飞星火 source detail should keep core advantage content");
assert.ok(appSource.includes("tool-detail-numbered"), "tool detail markdown renderer should support numbered source lists");
assert.ok(appSource.includes("renderToolDetail"), "AI navigation should render a local tool detail view");
assert.ok(appSource.includes("selectedToolId"), "tool item clicks should open a selected tool detail state");
assert.ok(appSource.includes("data-tool-back"), "tool detail view should include a back action");
assert.ok(!appSource.includes("data-tool-source"), "tool detail view should not include the removed source detail action");
assert.ok(!appSource.includes("查看原站详情"), "tool detail view should not render the removed source detail button");
assert.ok(!appSource.includes("tool-stat-grid"), "tool detail view should not render the removed stats cards");
assert.ok(!appSource.includes("tool-detail-side"), "tool detail view should not render the removed tool info sidebar");
assert.ok(!appSource.includes("工具信息"), "tool detail view should not render the removed tool info title");
assert.ok(!cssSource.includes(".tool-stat-grid"), "removed stats styles should be cleaned up");
assert.ok(!cssSource.includes(".tool-detail-side"), "removed tool info sidebar styles should be cleaned up");
assert.ok(!appSource.includes('<a class="panel tool-tile"'), "tool grid items should open local detail instead of direct external links");
assert.ok(appSource.includes('target="_blank"'), "tool detail external actions should open jump links in a new tab");
assert.ok(appSource.includes('rel="noopener noreferrer"'), "external tool links should use safe link attributes");
assert.ok(!appSource.includes("data-tool-link"), "tool cards should use direct anchor navigation instead of placeholder actions");
assert.equal(typeof app.searchEverywhere, "function", "global search should expose a shared search helper");
const searchResult = app.searchEverywhere("Paperpal");
assert.equal(searchResult.preferredTab, "tools", "global search should prefer tool results when tools match");
assert.equal(searchResult.tools.length, 1, "global search should return matching tools");
assert.ok(html.includes('data-tab-target="home"'), "brand click should return to the home tab");
assert.ok(!html.includes("登录/注册"), "header should not render the login/register placeholder");
assert.ok(!html.includes('data-action="login"'), "header should not keep the login placeholder action");
assert.ok(!cssSource.includes(".login-button"), "unused login button styles should be removed");
assert.ok(html.includes('data-global-search'), "header search should be a real submit form");
assert.ok(html.includes('type="submit"'), "header search should include a visible submit button");
assert.ok(appSource.includes('document.addEventListener("submit"'), "global search should respond to form submission");
assert.ok(appSource.includes("applyGlobalSearch(input?.value"), "global search form should submit the input value");
assert.ok(
  appSource.includes('event.key === "Enter" && event.target.id === "globalSearch"'),
  "global search input should respond to the Enter key",
);
assert.ok(
  !cssSource.includes(".header-actions {\n    display: none;"),
  "header search should remain available at responsive breakpoints",
);
assert.ok(html.includes('class="search-icon"'), "header search should render a dedicated search icon area");
const searchIconStyle = cssSource.match(/\.search-icon\s*\{[^}]+\}/)?.[0] || "";
assert.ok(searchIconStyle.includes("width: 30px"), "header search icon area should fit the shorter search field");
assert.ok(searchIconStyle.includes("height: 30px"), "header search icon area should fit the shorter search field");
assert.ok(searchIconStyle.includes("flex: 0 0 30px"), "header search icon flex basis should fit the shorter search field");
assert.ok(appSource.includes("tool-search-field"), "AI navigation search should have a scoped width class");
assert.ok(
  appSource.includes("scheduleScopedSearchRender"),
  "scoped AI navigation and tutorial searches should debounce expensive list rendering",
);
assert.ok(
  appSource.includes("restoreSearchFocus"),
  "scoped search rendering should restore input focus and cursor position",
);
assert.ok(
  !appSource.includes('state.toolQuery = event.target.value;\n        state.selectedToolId = "";\n        render();'),
  "AI navigation search should not re-render the whole view on every keystroke",
);
assert.ok(
  !appSource.includes('state.tutorialQuery = event.target.value;\n        state.selectedTutorialId = "";\n        render();'),
  "AI tutorial search should not re-render the whole view on every keystroke",
);
const toolSearchStyle = cssSource.match(/\.tool-search-field\s*\{[^}]+\}/)?.[0] || "";
assert.ok(toolSearchStyle.includes("width: min(260px, 100%)"), "AI navigation search should be half of the previous compact width");
assert.ok(toolSearchStyle.includes("height: 44px"), "AI navigation search should be ten pixels shorter than the default search field");
assert.ok(toolSearchStyle.includes("padding: 2px 12px 2px 6px"), "AI navigation search should keep the icon aligned at the shorter height");
assert.ok(appSource.includes("tutorial-search-field"), "AI tutorial search should have a scoped compact width class");
const tutorialSearchStyle = cssSource.match(/\.tutorial-search-field\s*\{[^}]+\}/)?.[0] || "";
assert.ok(tutorialSearchStyle.includes("width: min(253px, 100%)"), "AI tutorial search should be one third of the original search width");
assert.ok(tutorialSearchStyle.includes("height: 44px"), "AI tutorial search should be ten pixels shorter than the default search field");
assert.ok(tutorialSearchStyle.includes("padding: 2px 12px 2px 6px"), "AI tutorial search should keep the icon aligned at the shorter height");
const tutorialListStyle = cssSource.match(/\.tutorial-list\s*\{[^}]+\}/)?.[0] || "";
const tutorialCardStyle = cssSource.match(/\.tutorial-card\s*\{[^}]+\}/)?.[0] || "";
const tutorialCardVisualStyle = cssSource.match(/\.tutorial-card \.article-visual\s*\{[^}]+\}/)?.[0] || "";
const tutorialArticlePanelStyle = cssSource.match(/\.tutorial-card \.article-info-panel\s*\{[^}]+\}/)?.[0] || "";
const tutorialArticleTitleStyle = cssSource.match(/\.tutorial-card \.article-info-title\s*\{[^}]+\}/)?.[0] || "";
const tutorialArticleSummaryStyle = cssSource.match(/\.tutorial-card \.article-info-summary\s*\{[^}]+\}/)?.[0] || "";
const tutorialArticleIconStyle = cssSource.match(/\.tutorial-card \.article-info-icon\s*\{[^}]+\}/)?.[0] || "";
const tutorialArticleHashIconStyle = cssSource.match(/\.tutorial-card \.article-info-icon-hash::before\s*\{[^}]+\}/)?.[0] || "";
assert.ok(tutorialListStyle.includes("display: grid"), "AI tutorial feed should use a vertical list container");
assert.ok(tutorialListStyle.includes("gap: 12px"), "AI tutorial feed should match the compact card spacing");
assert.ok(tutorialCardStyle.includes("grid-template-columns: 290px minmax(0, 1fr)"), "AI tutorial cards should use a large image column and content column");
assert.ok(tutorialCardStyle.includes("align-items: stretch"), "AI tutorial cards should stretch the text panel to the item height");
assert.ok(tutorialCardStyle.includes("min-height: 116px"), "AI tutorial cards should be compressed to roughly three quarters height");
assert.ok(tutorialCardStyle.includes("padding: 14px"), "AI tutorial cards should use compact padding");
assert.ok(tutorialCardVisualStyle.includes("min-height: 96px"), "AI tutorial thumbnails should be reduced to roughly three quarters height");
assert.ok(tutorialArticlePanelStyle.includes("padding: 12px 14px"), "AI tutorial text panels should use compact padding");
assert.ok(tutorialArticleTitleStyle.includes("font-size: 22px"), "AI tutorial text panels should use compact titles");
assert.ok(tutorialArticleTitleStyle.includes("-webkit-line-clamp: 1"), "AI tutorial titles should stay to one line in compact items");
assert.ok(tutorialArticleSummaryStyle.includes("font-size: 13px"), "AI tutorial summaries should use compact text");
assert.ok(tutorialArticleSummaryStyle.includes("-webkit-line-clamp: 1"), "AI tutorial summaries should stay to one line in compact items");
assert.ok(tutorialArticleIconStyle.includes("width: 20px"), "AI tutorial metadata icons should be smaller and more refined");
assert.ok(tutorialArticleIconStyle.includes("height: 20px"), "AI tutorial metadata icons should be smaller and more refined");
assert.ok(tutorialArticleHashIconStyle.includes("font-size: 15px"), "AI tutorial hash icon should be lighter inside the smaller badge");
assert.ok(appSource.includes("field-search-icon"), "internal search fields should render a larger dedicated search icon");
assert.ok(!appSource.includes(">⌕</span>"), "internal search fields should not rely on the tiny glyph icon");
const fieldSearchIconStyle = cssSource.match(/\.field-search-icon\s*\{[^}]+\}/)?.[0] || "";
assert.ok(fieldSearchIconStyle.includes("width: 40px"), "internal search icon area should be wide enough");
assert.ok(fieldSearchIconStyle.includes("height: 40px"), "internal search icon area should be tall enough");
const toastStyle = cssSource.match(/\.site-toast\s*\{[^}]+\}/)?.[0] || "";
assert.ok(toastStyle.includes("top: 84px"), "toast should use a common top-center message position");
assert.ok(!toastStyle.includes("bottom:"), "toast should not look like a bottom floating modal");
assert.ok(toastStyle.includes("display: inline-flex"), "toast should use compact inline message layout");
assert.ok(toastStyle.includes("min-height: 40px"), "toast should use a compact message height");
assert.ok(toastStyle.includes("box-shadow: 0 8px 24px"), "toast should use a subtle product-style shadow");
assert.ok(!cssSource.includes(".site-toast::before"), "toast should not include a status icon marker");
for (const marker of [
  "data-tool-id",
  "data-tutorial-id",
  "data-action=\"more-categories\"",
  "showToast",
  "applyGlobalSearch",
]) {
  assert.ok(appSource.includes(marker), `click behavior should include ${marker}`);
}

const homeArticles = app.getRecommendedTutorials(8);
assert.equal(homeArticles.length, 8, "home should render two rows of four recommended articles");
assert.equal(
  homeArticles[0].title,
  "DeepSeek 入门实战：从提示词到工作流",
  "featured newest tutorial should lead home recommendations",
);

const featuredTools = app.getFeaturedTools();
assert.ok(featuredTools.length >= 15, "featured tool helper should keep the curated subset available");
assert.ok(featuredTools.every((tool) => tool.featured), "featured tool helper should return only featured tools");

assert.equal(typeof app.getPopularTools, "function", "home should expose a popular tools helper");
const popularTools = app.getPopularTools(10);
assert.equal(popularTools.length, 10, "home should render two rows of five popular tools");
assert.ok(new Set(popularTools.map((tool) => tool.id)).size === 10, "popular tools should not contain duplicates");
assert.ok(
  new Set(popularTools.map((tool) => tool.category)).size > 5,
  "popular tools should come from the full tool library instead of one category",
);
assert.ok(appSource.includes("getPopularTools(10)"), "home recommended tools should request ten popular tools");

const writingTools = app.filterTools({ category: "AI写作", subcategory: "AI论文写作", query: "Paperpal" });
assert.equal(writingTools.length, 1, "AI navigation should filter by category, subcategory, and query");
assert.equal(writingTools[0].name, "Paperpal");

const codingTutorials = app.filterTutorials({ category: "AI编程", query: "研发" });
assert.equal(codingTutorials.length, 1, "tutorials should filter by category and keyword");
assert.equal(codingTutorials[0].title, "AI 编程助手如何提高研发效率");

console.log("static-site tests passed");
