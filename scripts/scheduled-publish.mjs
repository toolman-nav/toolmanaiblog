import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isPublished, publicationTime } from '../src/lib/publication.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://toolmanai.com';
export function dueUrls(sources, now = Date.now()) {
  return sources.flatMap(source => {
    const front = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
    if (!front) throw new Error('Missing post frontmatter');
    const scalar = key => (front.match(new RegExp('^' + key + ':\\s*([^\\r\\n]+)', 'm'))?.[1] || '').trim().replace(/^["']|["']$/g, '');
    const data = { published: scalar('published'), draft: scalar('draft') === 'true' };
    const slug = scalar('slug');
    if (!Number.isFinite(publicationTime(data.published)) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid post date or slug');
    return isPublished(data, now) ? [origin + '/blog/' + slug + '/'] : [];
  });
}

export async function missingUrls(urls, fetchImpl = fetch) {
  const missing = [];
  for (const url of urls) {
    const response = await fetchImpl(url + '?publication-check=' + Date.now(), {
      redirect: 'manual', signal: AbortSignal.timeout(15000), headers: { 'Cache-Control': 'no-cache' },
    });
    if (response.status === 404) { missing.push(url); continue; }
    if (response.status !== 200) throw new Error('Cannot verify article: HTTP ' + response.status + ' ' + url);
    const html = await response.text();
    // Reject soft 404s, challenges, and pages that belong to a different article.
    const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].some(([tag]) =>
      /\brel=["']canonical["']/i.test(tag) && tag.includes('href="' + url + '"'));
    if (!canonical) throw new Error('Article response lacks expected canonical: ' + url);
  }
  return missing;
}

async function main() {
  const urls = dueUrls(fs.readdirSync(path.join(root, 'src/content/posts')).filter(f => f.endsWith('.md')).map(f => fs.readFileSync(path.join(root, 'src/content/posts', f), 'utf8')));
  const verify = process.argv.includes('--verify');
  for (let attempt = 0; attempt < (verify ? 20 : 1); attempt++) {
    const missing = await missingUrls(urls);
    console.log('Due articles: ' + urls.length + '; not online: ' + missing.length);
    if (!verify) {
      if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, 'needed=' + (missing.length > 0) + '\n');
      missing.forEach(url => console.log(url));
      return;
    }
    if (!missing.length) return;
    if (attempt < 19) await new Promise(resolve => setTimeout(resolve, 30000));
  }
  throw new Error('Deployment did not publish all due articles. A later scheduled check will retry.');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
