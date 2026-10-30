import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { qualifyAffiliateLinks } from '../scripts/affiliate-links.mjs';
import { articleSchema, softwareApplicationSchema } from '../src/lib/seo.mjs';

const paid = '<a href="https://bewild.ai?code=TOOLMAN" rel="noopener">服务</a>';
assert.match(qualifyAffiliateLinks(paid), /rel="noopener sponsored"/);
assert.equal(qualifyAffiliateLinks(qualifyAffiliateLinks(paid)), qualifyAffiliateLinks(paid));
for (const href of ['https://openai.com/', 'https://acceboyaibot.acceboy.com/', 'https://bewild.ai.evil.example/', '/tools/']) {
  const anchor = `<a href="${href}">引用</a>`;
  assert.equal(qualifyAffiliateLinks(anchor), anchor, 'ordinary sources and unconfirmed partners stay unchanged');
}
assert.equal(articleSchema({}).author.name, '工具鸽');
assert.equal(articleSchema({}).author['@type'], 'Person');
assert.equal(softwareApplicationSchema({}).publisher, undefined);
assert.equal(softwareApplicationSchema({ serviceType: 'third-party' })['@type'], 'Service');

// Exercise the actual search input handler with matches, no matches and reset.
const handlers = {};
const cards = [{ dataset: { searchText: 'Claude 注册教程' } }, { dataset: { searchText: 'Suno 音乐' } }];
const input = { value: '' }, empty = {};
const doc = {
  documentElement: { dataset: {}, style: {} },
  addEventListener: (name, fn) => { handlers[name] = fn; },
  getElementById: id => id === 'tutorialSearch' ? input : null,
  querySelector: sel => sel === '[data-empty-search]' ? empty : null,
  querySelectorAll: sel => sel === '.tutorial-card' ? cards : [],
};
vm.runInNewContext(fs.readFileSync('public/site.js', 'utf8'), {
  document: doc, URLSearchParams, localStorage: { getItem: () => null },
  window: { location: { search: '' }, matchMedia: () => ({ matches: false, addListener() {} }) },
});
for (const [value, hidden, noResults] of [['claude', [false, true], false], ['不存在', [true, true], true], ['', [false, false], false]]) {
  handlers.input({ target: { id: 'tutorialSearch', value } });
  assert.deepEqual(cards.map(c => c.hidden), hidden);
  assert.equal(empty.hidden, !noResults);
}
assert.match(fs.readFileSync('public/styles.css', 'utf8'), /\[hidden\]\s*\{\s*display:\s*none\s*!important/);

const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
const files = walk('dist').filter(f => f.endsWith('.html'));
let sponsored = 0;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  assert.ok(!html.includes('data-defer-src'), file);
  assert.ok(!html.includes('教程教程'), file);
  assert.ok(!html.includes('不据教程中的混用名称'), file);
  assert.ok(!html.includes('article-info-stats'), file);
  assert.equal(qualifyAffiliateLinks(html), html, `${file}: all known commercial links must be qualified`);
  sponsored += (html.match(/rel="[^"]*sponsored/g) || []).length;
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    assert.ok((tag.match(/\sdecoding=/g) || []).length <= 1, file);
    if (/src="\/_astro\//.test(tag)) {
      assert.match(tag, /\swidth="\d+"/, file);
      assert.match(tag, /\sheight="\d+"/, file);
    }
  }
}
const article = fs.readFileSync('dist/blog/claude-opus-5-5-guide/index.html','utf8');
assert.match(article, /<img[^>]*loading="eager"[^>]*fetchpriority="high"/);
assert.ok(!article.includes('价格砍半'));
console.log(`Audit fixes passed: search match/empty/reset, affiliate classification, schema and ${files.length} HTML pages (${sponsored} sponsored links).`);
