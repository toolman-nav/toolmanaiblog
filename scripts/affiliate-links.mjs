import site from '../src/data/site.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Only hosts explicitly identified as commercial partners in our tool data.
const affiliateHosts = new Set(site.tools.filter(tool => tool.affiliate).map(tool => new URL(tool.externalUrl).hostname));
export function qualifyAffiliateLinks(html) {
  return html.replace(/<a\b[^>]*>/gi, tag => {
    const href = tag.match(/\shref=(['"])(.*?)\1/i)?.[2];
    let url;
    try { url = new URL(href); } catch { return tag; }
    if (!['https:', 'http:'].includes(url.protocol) || !affiliateHosts.has(url.hostname)) return tag;
    const rel = tag.match(/\srel=(['"])(.*?)\1/i);
    const values = [...new Set([...(rel?.[2].split(/\s+/).filter(Boolean) || []), 'sponsored'])].join(' ');
    return rel ? tag.replace(rel[0], ` rel="${values}"`) : tag.replace(/>$/, ` rel="${values}">`);
  });
}

export default function affiliateLinks() {
  return { name: 'affiliate-links', hooks: {
    'astro:build:done': ({ dir }) => {
      function walk(folder) {
        for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
          const file = path.join(folder, entry.name);
          if (entry.isDirectory()) walk(file);
          else if (file.endsWith('.html')) {
            const html = fs.readFileSync(file, 'utf8');
            const next = qualifyAffiliateLinks(html);
            if (next !== html) fs.writeFileSync(file, next);
          }
        }
      }
      walk(fileURLToPath(dir));
    },
  } };
}
