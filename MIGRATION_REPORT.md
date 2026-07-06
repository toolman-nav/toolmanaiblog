# SEO Migration Report

## 任务完成状态

- P0-1 锁定依赖版本：完成。Astro 实测为 `7.0.5`，依赖中已无 `latest`。
- P0-2 URL 结构重构：完成。文章新 URL 为 `/blog/{slug}/`，工具详情新 URL 为 `/tools/{slug}/`，分类使用英文 slug。
- P0-3 图片全部自托管：完成。工具图使用本地 icon；飞书临时图已替换为 `<!-- ⚠️ 需人工补图：原图已失效 -->`。
- P0-4 工具详情页内容修正与结构统一：完成。Claude 过时版本描述已移除，工具页统一为简介、核心功能、相关教程、官网入口。
- P0-5 工具页与教程双向内链：完成。文章 frontmatter 增加 `relatedTools`，工具详情反查相关文章。
- P0-6 首页 H1 与标题层级修正：完成。首页 H1 为品牌+价值主张。
- P0-7 清理根目录 SPA 残留：完成。旧 `index.html`、`app.js`、`styles.css` 已移入 `_archive/legacy-spa/`。
- P1-1 sitemap 统一为官方插件：完成。启用 `@astrojs/sitemap`，旧自定义 endpoint 已删除。
- P1-2 robots.txt 与 llms.txt：完成。两者均位于 `public/`。
- P1-3 title/H1 分离与 seoTitle 回填：完成。文章 `<title>` 使用 `seoTitle`，H1 保留 `title`。
- P1-4 结构化数据与日期字段：完成。文章、工具、面包屑和 FAQ JSON-LD 已接入。
- P1-5 OG 分享图与 Twitter 卡片：完成第一级。`public/og-default.png` 已生成，Twitter 卡片为 `summary_large_image`。
- P1-6 RSS Feed：完成。`/rss.xml` 使用 `@astrojs/rss`。
- P1-7 文章 FAQ 区块：完成。现有文章均有 3 条 FAQ。
- P1-8 信任信号修复：完成。移除伪阅读量 UI，含邀请码文章已添加披露，新增作者页。
- P2-1 Frontmatter Schema 强校验：完成。Content schema 要求 `slug`、`seoTitle`、`dateModified`、`relatedTools`、`faq` 等字段。
- P2-2 工具页季度复查机制：完成。`pnpm run check:tool-reviews` 输出复查清单或无需复查说明。
- P2-3 README 与仓库卫生：完成。README 已新增；GitHub description/topics 属人工操作。

## 新旧 URL 对照

| 旧 URL | 新 URL |
|---|---|
| `/tutorials/` | `/blog/` |
| `/tutorials/categories/AI教程/` | `/blog/categories/ai-tutorials/` |
| `/tutorials/categories/AI实用工具/` | `/blog/categories/ai-practical-tools/` |
| `/tutorials/categories/海外AI使用教程/` | `/blog/categories/overseas-ai-guides/` |
| `/tutorials/categories/海外工具使用教程/` | `/blog/categories/overseas-service-guides/` |
| `/tutorials/claudecode-jiaocheng/` | `/blog/claude-code-guide/` |
| `/tutorials/claude-shengji-jiaocheng/` | `/blog/claude-subscription-guide/` |
| `/tutorials/claude-fable-5-来了强是真强但苟也是真苟附国内使用教程/` | `/blog/claude-fable-5-review/` |
| `/tutorials/chatgpt-plus-shengji-jiaocheng/` | `/blog/chatgpt-plus-subscription-guide/` |
| `/tutorials/poe-jiaocheng/` | `/blog/poe-subscription-guide/` |
| `/tutorials/sunoai-jiaocheng/` | `/blog/suno-ai-music-guide/` |
| `/tutorials/spotify-jiaocheng/` | `/blog/spotify-premium-guide/` |
| `/tutorials/notebooklm-jiaocheng/` | `/blog/notebooklm-guide/` |
| `/tutorials/免费还好用google-ai-studio保姆级教程/` | `/blog/google-ai-studio-guide/` |
| `/tutorials/aippt-jiaocheng/` | `/blog/ai-ppt-tools-guide/` |
| `/tutorials/ai-siweidaotu-jiaocheng/` | `/blog/ai-mindmap-guide/` |
| `/tutorials/meiqu-appleid-jiaocheng/` | `/blog/us-apple-id-guide/` |
| `/tutorials/google-play-jiaocheng/` | `/blog/google-play-install-guide/` |
| `/tools/categories/AI 工具/AI 对话助手/claude/` | `/tools/claude/` |
| `/tools/categories/AI 工具/AI 对话助手/chatgpt/` | `/tools/chatgpt/` |
| `/tools/categories/AI 工具/AI 对话助手/poe/` | `/tools/poe/` |
| `/tools/categories/AI 工具/AI 对话助手/google-ai/` | `/tools/google-ai-studio/` |
| `/tools/categories/AI 工具/AI 对话助手/notebooklm/` | `/tools/notebooklm/` |
| `/tools/categories/AI 工具/AI 音乐生成/suno/` | `/tools/suno/` |
| `/tools/categories/AI 工具/AI 编程工具/claude-code/` | `/tools/claude-code/` |
| `/tools/categories/海外数字服务/流媒体娱乐/spotify/` | `/tools/spotify/` |
| `/tools/categories/AI 工具/` | `/tools/categories/ai-tools/` |
| `/tools/categories/AI 工具/AI 对话助手/` | `/tools/categories/ai-tools/ai-chat/` |
| `/tools/categories/AI 工具/AI 音乐生成/` | `/tools/categories/ai-tools/ai-music/` |
| `/tools/categories/AI 工具/AI 编程工具/` | `/tools/categories/ai-tools/ai-coding/` |
| `/tools/categories/海外数字服务/` | `/tools/categories/overseas-services/` |
| `/tools/categories/海外数字服务/流媒体娱乐/` | `/tools/categories/overseas-services/streaming/` |
| `/sitemap.xml` | `/sitemap-index.xml` |

## ⚠️ 需人工核实/补充

- 工具版本信息：Claude、ChatGPT、Poe、Google AI Studio、NotebookLM、Suno、Claude Code、Spotify 的模型、价格、套餐和地区权益需上线前复核官方页面。
- 作者资料：`/about/authors/` 目前为团队占位，需补真实姓名、头像、资历、社交账号和审核流程。
- 失效图片：飞书/飞书 AI 临时图片已移除渲染并留下补图注释，需要人工补回本地图片。
- relatedTools 空缺：`ai-ppt-tools-guide`、`us-apple-id-guide`、`google-play-install-guide`、`ai-mindmap-guide` 暂无明确工具关联，已保留空数组。
- npm 验证：当前 Codex 环境没有 `npm/npx` 可执行文件，本次使用 `pnpm` 执行安装、测试和构建验证。

## 2026-07-06 复盘修复：301 从未生效（双站并存）

- 实测结论：生产站点由 Cloudflare Pages 托管（响应头 `server: cloudflare`、无 `x-vercel-*`），`vercel.json` 的 301 规则从未被执行。
- 症状：构建产物无 `404.html` 时 Cloudflare Pages 进入 SPA 回退模式，任意未知路径（含全部旧 `/tutorials/`、旧 `/tools/categories/` URL）都以 200 返回 `index.html`，形成大规模可索引重复内容。
- 修复：
  - 新增 `public/_redirects`（Cloudflare Pages 原生格式），覆盖全部旧文章、旧分类、旧工具 URL（含中文百分号编码与未编码两种形式）及 `/tutorials/*` 兜底，全部 301 到新地址。注意：`/tools/categories/` 下不能加 splat 兜底，因为新站的分类页也在该前缀下，Pages 的 redirect 优先于静态文件，会误伤新页面；该前缀只保留精确匹配和三段式详情页占位符规则。
  - 新增 `src/pages/404.astro`，构建产出 `404.html`，关闭 SPA 回退，未知路径返回真实 404（noindex）。
  - `vercel.json` 保留，仅在迁回 Vercel 时生效。
- 上线验收：`curl -I "https://toolmanai.com/tutorials/categories/AI%E6%95%99%E7%A8%8B/claudecode-jiaocheng/"` 必须返回 `301` 且 `Location: /blog/claude-code-guide/`；`curl -I https://toolmanai.com/nonexistent/` 必须返回 `404`。

## 2026-07-06 复盘修复：内部话术泄漏到线上

- 移除工具页正文 8 处“⚠️ 需人工核实”提示、作者页“⚠️ 需人工补充”占位段落。
- 13 篇文章的通用模板 FAQ（“教程中的价格和权益是否固定？”等）全部重写为基于各文章正文的特定问答，FAQPage 结构化数据随之更新。
- `pnpm test` 与 `pnpm run verify:seo` 新增反向断言：源码 FAQ 不得含模板话术；构建产物的可见内容（剔除 HTML 注释后）不得出现“需人工”类内部标注；`dist` 必须含 `404.html` 与 `_redirects`，且不得再出现 `/tutorials/` 目录。

## robots.txt 最终内容

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://toolmanai.com/sitemap-index.xml
```
