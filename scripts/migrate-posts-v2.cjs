const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const postsDir = path.join(root, "src/content/posts");

const meta = {
  "poe-jiaocheng.md": {
    slug: "poe-subscription-guide",
    seoTitle: "Poe 国内使用教程 2026：订阅与 API",
    relatedTools: ["poe", "claude", "chatgpt"],
  },
  "sunoai-jiaocheng.md": {
    slug: "suno-ai-music-guide",
    seoTitle: "Suno AI 音乐教程 2026：注册与创作",
    relatedTools: ["suno"],
  },
  "spotify-jiaocheng.md": {
    slug: "spotify-premium-guide",
    seoTitle: "Spotify 国内使用教程 2026：注册与会员",
    relatedTools: ["spotify"],
  },
  "chatgpt-plus-shengji-jiaocheng.md": {
    slug: "chatgpt-plus-subscription-guide",
    seoTitle: "ChatGPT Plus 国内订阅教程 2026",
    relatedTools: ["chatgpt"],
  },
  "aippt-jiaocheng.md": {
    slug: "ai-ppt-tools-guide",
    seoTitle: "AI PPT 工具教程 2026：免费生成演示",
    relatedTools: [],
  },
  "notebooklm-jiaocheng.md": {
    slug: "notebooklm-guide",
    seoTitle: "NotebookLM 国内使用教程 2026",
    relatedTools: ["notebooklm"],
  },
  "免费还好用！google-ai-studio保姆级教程.md": {
    slug: "google-ai-studio-guide",
    seoTitle: "Google AI Studio 教程 2026：免费体验",
    relatedTools: ["google-ai"],
  },
  "claude-fable-5-来了！强是真强，但苟也是真苟（附国内使用教程）.md": {
    slug: "claude-fable-5-review",
    seoTitle: "Claude Fable 5 评测 2026：国内使用",
    relatedTools: ["claude"],
  },
  "claudecode-jiaocheng.md": {
    slug: "claude-code-guide",
    seoTitle: "Claude Code 国内使用教程 2026",
    relatedTools: ["claude-code", "claude"],
  },
  "meiqu-appleid-jiaocheng.md": {
    slug: "us-apple-id-guide",
    seoTitle: "美区 Apple ID 注册教程 2026",
    relatedTools: [],
  },
  "google-play-jiaocheng.md": {
    slug: "google-play-install-guide",
    seoTitle: "Google Play 安装教程 2026：安卓三件套",
    relatedTools: [],
  },
  "ai-siweidaotu-jiaocheng.md": {
    slug: "ai-mindmap-guide",
    seoTitle: "AI 思维导图教程 2026：文档转导图",
    relatedTools: [],
  },
  "claude-shengji-jiaocheng.md": {
    slug: "claude-subscription-guide",
    seoTitle: "Claude 国内使用教程 2026：注册与订阅",
    relatedTools: ["claude"],
  },
};

const linkMap = new Map(Object.values(meta).map((item) => [item.slug, item.slug]));
for (const [file, item] of Object.entries(meta)) {
  linkMap.set(file.replace(/\.md$/, ""), item.slug);
}

function frontmatterValue(source, key, fallback = "") {
  const match = source.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  if (!match) return fallback;
  return match[1].trim().replace(/^['"]|['"]$/g, "");
}

function tagsFromFrontmatter(source) {
  const inline = source.match(/^tags:\s*\[([^\]]*)]/m);
  if (inline) {
    return inline[1]
      .split(",")
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }
  const block = source.match(/^tags:\s*\n((?:\s+-\s+.+\n?)+)/m);
  if (!block) return [];
  return block[1]
    .split("\n")
    .map((line) => line.replace(/^\s+-\s+/, "").trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function yamlArray(values) {
  if (!values.length) return "[]";
  return `[${values.map(yamlString).join(", ")}]`;
}

function faqFor(title, category) {
  return [
    {
      q: "这篇教程适合谁阅读？",
      a: `适合想了解${category || "AI工具"}使用流程、注册入口和常见注意事项的中文用户。`,
    },
    {
      q: "教程中的价格和权益是否固定？",
      a: "不固定。涉及价格、套餐和额度的内容发布前仍需人工复核官方页面。",
    },
    {
      q: "遇到页面访问或支付失败怎么办？",
      a: "先检查地区、账号和支付方式限制，再参考文中替代方案或等待人工补充。",
    },
  ];
}

function renderFrontmatter(original, file) {
  const item = meta[file];
  const title = frontmatterValue(original, "title");
  const published = frontmatterValue(original, "published");
  const description = frontmatterValue(original, "description");
  const image = frontmatterValue(original, "image", "");
  const category = frontmatterValue(original, "category", "AI教程");
  const tags = tagsFromFrontmatter(original);
  const faq = faqFor(title, category);

  return [
    "---",
    `title: ${yamlString(title)}`,
    `seoTitle: ${yamlString(item.seoTitle)}`,
    `slug: ${item.slug}`,
    `published: ${published}`,
    `dateModified: ${published}`,
    `description: ${yamlString(description)}`,
    `image: ${yamlString(image)}`,
    `tags: ${yamlArray(tags)}`,
    `category: ${yamlString(category)}`,
    `relatedTools: ${yamlArray(item.relatedTools)}`,
    "faq:",
    ...faq.flatMap((entry) => [`  - q: ${yamlString(entry.q)}`, `    a: ${yamlString(entry.a)}`]),
    "---",
  ].join("\n");
}

function migrateBody(body) {
  let result = body.replace(/!\[[^\]]*]\(https?:\/\/[^)]*(?:feishu|larksuite)[^)]*\)/gi, "<!-- ⚠️ 需人工补图：原图已失效 -->");
  result = result.replace(/https:\/\/toolmanai\.com\/posts\/([^)\/]+)\/?/g, (_match, oldSlug) => {
    const slug = linkMap.get(oldSlug) || oldSlug;
    return `https://toolmanai.com/blog/${slug}/`;
  });

  if (/[?&](?:ic|code|aff|ref)=|\/37h7sn|\/i\/TOOLMAN/i.test(result) && !result.includes("本文部分链接含邀请码")) {
    result = `> 本文部分链接含邀请码，注册可能为本站带来收益，不影响你的使用。\n\n${result}`;
  }

  return result;
}

for (const file of fs.readdirSync(postsDir).filter((name) => name.endsWith(".md"))) {
  if (!meta[file]) {
    throw new Error(`Missing migration metadata for ${file}`);
  }
  const fullPath = path.join(postsDir, file);
  const source = fs.readFileSync(fullPath, "utf8");
  const parts = source.split(/^---\s*$/m);
  if (parts.length < 3) throw new Error(`Missing frontmatter in ${file}`);
  const originalFrontmatter = parts[1];
  const body = parts.slice(2).join("---");
  const next = `${renderFrontmatter(originalFrontmatter, file)}\n${migrateBody(body).trimStart()}`;
  fs.writeFileSync(fullPath, next);
}
