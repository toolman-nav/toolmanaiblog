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
