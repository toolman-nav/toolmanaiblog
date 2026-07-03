import { absoluteUrl } from "../lib/seo.mjs";

export function GET() {
  return new Response(`User-agent: *
Allow: /

# 允许 AI 搜索引擎爬虫进行 GEO 优化
User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}