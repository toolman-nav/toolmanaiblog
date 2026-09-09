# 定时发布

published: YYYY-MM-DD 表示该日北京时间 08:00 开始可发布。draft: true 始终不发布。
构建时所有文章入口、详情页、RSS、sitemap 和 llms.txt 都排除未到期文章。
日期字段为日期，不支持自定义小时；dateModified 不控制发布。

## 线上启用

1. Cloudflare Pages 项目 Settings → Builds → Add deploy hook，分支选择 website-h5。
2. 将 hook URL 保存到 GitHub 仓库 Settings → Secrets and variables → Actions，名称 CLOUDFLARE_PAGES_DEPLOY_HOOK。不要写入仓库。
3. 合并发布逻辑到生产分支；scheduled-publish.yml 必须也在 GitHub 默认分支上，schedule 才运行。
4. Actions 中手动运行 Publish scheduled posts，确认 Cloudflare 构建成功。

每天 UTC 00:00（北京时间 08:00）触发构建；GitHub 排队和 Cloudflare 构建可能延迟，不保证 08:00:00 精确上线。调度失败可手动重跑；以后任何一次成功构建都会补发已到期文章。
文章必须提前推送到 website-h5，本地文件不会自动上传。此流程不是 Codex 本地提醒。
未来文章虽不进入网站，但公开 GitHub 仓库里的 Markdown 仍可被访问。
