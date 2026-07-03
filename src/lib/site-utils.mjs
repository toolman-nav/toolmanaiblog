export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function articleTags(article) {
  const tagMap = {
    入门指南: ["AI入门", "实用教程"],
    AI办公: ["效率提升", "办公自动化"],
    AI编程: ["AI开发", "代码助手"],
    AI绘画: ["AI图像", "创意设计"],
    自动化工作流: ["智能体", "工作流"],
    行业案例: ["场景实战", "案例拆解"],
    提示词工程: ["提示词", "模型调优"],
  };
  return [...new Set([article.category, ...(tagMap[article.category] || ["AI工具", "实战教程"])])].slice(0, 3);
}

export function articleReadingStats(article) {
  const length = `${article.title}${article.summary}`.replace(/\s+/g, "").length;
  const words = Math.max(860, Math.round(length * 14 + String(article.id).length * 3));
  return {
    words,
    minutes: Math.max(4, Math.ceil(words / 220)),
  };
}

export function renderInlineMarkdown(value) {
  return escapeHtml(value).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

export function renderToolContent(content) {
  const blocks = String(content || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return blocks
    .map((line) => {
      if (line.startsWith("## ")) {
        return `<h2>${escapeHtml(line.slice(3))}</h2>`;
      }
      if (line.startsWith("- ")) {
        return `<p class="tool-detail-bullet">${renderInlineMarkdown(line.slice(2))}</p>`;
      }
      if (/^\d+\.\s+/.test(line)) {
        const [, number, text] = line.match(/^(\d+)\.\s+(.+)$/);
        return `<p class="tool-detail-numbered"><span class="numbered-index">${escapeHtml(`${number}.`)}</span><span class="numbered-body">${renderInlineMarkdown(text)}</span></p>`;
      }
      return `<p>${renderInlineMarkdown(line)}</p>`;
    })
    .join("");
}

export function coverAccent(coverType) {
  return (
    {
      deep: "#4f46e5",
      red: "#fb7185",
      code: "#14b8a6",
      green: "#10b981",
      blue: "#60a5fa",
    }[coverType] || "#1677ff"
  );
}
