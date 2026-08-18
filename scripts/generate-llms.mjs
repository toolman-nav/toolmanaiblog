import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import siteData from "../src/data/site.mjs";
import { blogDetailPath, toolDetailPath } from "../src/lib/routes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = path.join(root, "src", "content", "posts");
const outputPath = path.join(root, "public", "llms.txt");
const siteUrl = "https://toolmanai.com";

function scalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  if (!match) return "";
  const value = match[1].trim();
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1);
    }
  }
  return value.replace(/^['"]|['"]$/g, "");
}

function readPosts() {
  return fs.readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = fs.readFileSync(path.join(postsDir, file), "utf8");
      const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || "";
      return {
        title: scalar(frontmatter, "title"),
        slug: scalar(frontmatter, "slug"),
        description: scalar(frontmatter, "description"),
        published: scalar(frontmatter, "published"),
        draft: scalar(frontmatter, "draft") === "true",
      };
    })
    .filter((post) => !post.draft && post.title && post.slug)
    .sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title, "zh-CN"));
}

function absolute(pathname) {
  return new URL(pathname, siteUrl).href;
}

function render() {
  const posts = readPosts();
  const tools = [...siteData.tools].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
  const lines = [
    "# 工具人AI导航",
    "",
    "工具人AI导航是面向中文用户的 AI 工具评测与国内使用教程站，整理常用 AI 工具、订阅充值、海外数字服务和实践教程，帮助用户更快找到可用入口并完成上手。",
    "",
    "Toolman AI Navigation is a Chinese AI tools and tutorials directory focused on practical reviews, local usage guides, subscriptions, and workflows for AI products and overseas digital services.",
    "",
    "## 主要入口",
    "",
    `- [首页](${absolute("/")}): 站点首页与精选内容。`,
    `- [AI 教程](${absolute("/blog/")}): 全部教程与指南。`,
    `- [AI 工具导航](${absolute("/tools/")}): 工具目录与分类。`,
    `- [关于我们](${absolute("/about/")}): 站点定位与编辑说明。`,
    `- [RSS](${absolute("/rss.xml")}): 最新文章订阅源。`,
    `- [Sitemap](${absolute("/sitemap-index.xml")}): 全站 XML 站点地图。`,
    "",
    "## 教程文章",
    "",
    ...posts.map((post) => `- [${post.title}](${absolute(blogDetailPath(post))}): ${post.description}`),
    "",
    "## 工具目录",
    "",
    ...tools.map((tool) => `- [${tool.name}](${absolute(toolDetailPath(tool))}): ${tool.description}`),
    "",
  ];
  return lines.join("\n");
}

const generated = render();
if (process.argv.includes("--check")) {
  const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
  if (current !== generated) {
    console.error("public/llms.txt is out of date; run pnpm generate:llms");
    process.exit(1);
  }
  console.log("llms.txt is up to date");
} else {
  fs.writeFileSync(outputPath, generated, "utf8");
  console.log(`generated ${path.relative(root, outputPath)}`);
}
