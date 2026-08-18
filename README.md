# 工具人AI导航

工具人AI导航是面向中文用户的 AI 工具评测与国内使用教程站，线上地址为 https://toolmanai.com 。

## 技术栈

- Astro static output
- Astro Content Collections
- `@astrojs/sitemap`
- `@astrojs/rss`
- Sharp image processing

## 本地开发

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm run verify:seo
pnpm run check:tool-reviews
```

当前 Codex 桌面环境未提供 `npm/npx`，本仓库本次验证使用 `pnpm`。

## 目录结构

- `src/pages/`: Astro 页面路由
- `src/content/posts/`: 教程文章内容
- `src/components/`: 页面组件
- `src/data/site.mjs`: 工具与分类数据
- `src/lib/`: 路由、SEO 和渲染工具
- `public/`: 静态资源、robots、llms、OG 默认图
- `scripts/`: SEO 构建验证和工具复查脚本
- `_archive/legacy-spa/`: 旧 SPA 原型归档，不参与部署

## 部署与站点集成

- 生产环境仅使用 Cloudflare Pages；`public/_redirects` 是唯一重定向配置源，仓库不保留 Vercel 配置。
- Google 站点验证与 Google Analytics 统一由 `src/config/integrations.mjs` 提供默认值，再由 `src/components/SiteIntegrations.astro` 注入一次。需要切换账号时，在 Cloudflare Pages 设置对应的 `PUBLIC_GOOGLE_SITE_VERIFICATION` 或 `PUBLIC_GOOGLE_ANALYTICS_ID` 环境变量覆盖默认值。
- `public/llms.txt` 由文章 frontmatter 与工具数据自动生成。修改内容后可运行 `pnpm generate:llms`；构建前会自动更新，测试会检查文件是否同步。

## IndexNow

站点在根目录发布 IndexNow 所需的所有权验证文件，并通过 `scripts/submit-indexnow.cjs` 主动通知支持 IndexNow 的搜索引擎。构建过程本身不会发送通知，避免预览构建或生产部署完成前误报 URL。

Push 到 `website-h5` 后，`.github/workflows/indexnow.yml` 会自动执行以下流程：

1. 根据前后两个 Git 提交识别真正受影响的页面；文章改动只提交文章页、首页和博客列表页。
2. 轮询 `https://toolmanai.com/deployment.json`，直到其中的 `CF_PAGES_COMMIT_SHA` 与本次 push 完全一致。
3. 确认 Cloudflare Pages 已发布该提交后，再调用 IndexNow。站点结构变更或首次发布 key 时，从生产 sitemap 读取 URL。

该工作流不需要 GitHub Secret；IndexNow key 按协议本来就通过站点根目录的文本文件公开验证。

首次启用时，应先把验证文件部署到生产站。确认 `https://toolmanai.com/41edbf7721a023c052c2d785e69dab39.txt` 可访问后，再提交 URL：

```bash
# 先构建并预览全站提交内容，不发送网络请求
pnpm build
pnpm indexnow -- --dry-run --all

# 生产部署完成后，只提交本次新增、修改或删除的 URL（推荐）
pnpm indexnow -- /blog/example/ /tools/example/

# 确需通知全站时，从构建后的 sitemap 批量提交
pnpm indexnow:all
```

脚本只接受 `toolmanai.com` 下的 URL，会自动去重，单次最多提交 10,000 条。IndexNow 返回 HTTP 200 或首次验证时的 HTTP 202 均视为已接收。
