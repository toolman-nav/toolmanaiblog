const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const imagesDir = path.join(root, "src", "assets", "images");
const postsDir = path.join(root, "src", "content", "posts");
const sourcePattern = /\.(?:png|jpe?g)$/i;
const markdownPattern = /\.md$/i;
const referenceExtensions = new Set([".astro", ".cjs", ".css", ".html", ".js", ".jsx", ".md", ".mdx", ".mjs", ".scss", ".ts", ".tsx"]);
const checkOnly = process.argv.includes("--check");
const keepOriginals = process.argv.includes("--keep-originals");
const force = process.argv.includes("--force");
const qualityArg = process.argv.find((value) => value.startsWith("--quality="));
const quality = qualityArg ? Number(qualityArg.split("=")[1]) : 82;

if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
  console.error("--quality must be an integer between 1 and 100");
  process.exit(1);
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function normalized(file) {
  const absolute = path.resolve(file);
  return process.platform === "win32" ? absolute.toLowerCase() : absolute;
}

async function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  }));
  return nested.flat();
}

function localTarget(markdownFile, target) {
  const clean = target.split(/[?#]/, 1)[0];
  if (!clean || /^(?:[a-z]+:|\/|#)/i.test(clean)) return { file: null, error: null };
  try {
    return { file: path.resolve(path.dirname(markdownFile), decodeURIComponent(clean)), error: null };
  } catch (error) {
    return { file: null, error: `Invalid encoded image path: ${target} (${error.message})` };
  }
}

function referencePairs(referenceFile, source, output) {
  const pairs = new Map();
  const add = (from, to) => {
    if (!from || from === to) return;
    pairs.set(from.split(path.sep).join("/"), to.split(path.sep).join("/"));
  };
  const sourceRelative = path.relative(path.dirname(referenceFile), source);
  const outputRelative = path.relative(path.dirname(referenceFile), output);
  add(sourceRelative, outputRelative);
  if (!sourceRelative.startsWith(".")) add(`./${sourceRelative}`, `./${outputRelative}`);

  const sourceFromRoot = path.relative(root, source);
  const outputFromRoot = path.relative(root, output);
  add(sourceFromRoot, outputFromRoot);
  add(`/${sourceFromRoot}`, `/${outputFromRoot}`);

  const srcDir = path.join(root, "src");
  if (normalized(source).startsWith(`${normalized(srcDir)}${path.sep}`)) {
    add(`@/${path.relative(srcDir, source)}`, `@/${path.relative(srcDir, output)}`);
  }

  for (const [from, to] of [...pairs]) add(encodeURI(from), encodeURI(to));
  return [...pairs];
}

function referencePattern(reference) {
  const escaped = reference.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^A-Za-z0-9_.-])${escaped}(?=$|[^A-Za-z0-9_.-])`, process.platform === "win32" ? "gi" : "g");
}

function replaceReferencesInText(text, referenceFile, replacements) {
  let updated = text;
  let count = 0;
  for (const [source, output] of replacements.values()) {
    for (const [from, to] of referencePairs(referenceFile, source, output)) {
      const pattern = referencePattern(from);
      updated = updated.replace(pattern, (_match, prefix) => {
        count += 1;
        return `${prefix}${to}`;
      });
    }
  }
  return { text: updated, count };
}

function remainingReferencesInText(text, referenceFile, replacements) {
  const remaining = [];
  for (const [source, output] of replacements.values()) {
    for (const [candidate] of referencePairs(referenceFile, source, output)) {
      if (referencePattern(candidate).test(text)) remaining.push(candidate);
    }
  }
  return [...new Set(remaining)];
}

async function referenceFiles() {
  const files = await walk(path.join(root, "src"));
  const rootFiles = [path.join(root, "astro.config.mjs")];
  return [...files, ...rootFiles].filter((file) => referenceExtensions.has(path.extname(file).toLowerCase()) && fs.existsSync(file));
}

async function inspectMarkdown() {
  const markdownFiles = (await walk(postsDir)).filter((file) => markdownPattern.test(file));
  const missingImages = [];
  const missingAlt = [];
  const placeholderAlt = [];
  const invalidImagePaths = [];

  for (const file of markdownFiles) {
    const source = await fsp.readFile(file, "utf8");
    const imagePattern = /!\[([^\]]*)]\(([^)\s]+)(?:\s+["'][^)]*["'])?\)/g;
    for (const match of source.matchAll(imagePattern)) {
      const alt = match[1].trim();
      const resolved = localTarget(file, match[2]);
      if (!alt) missingAlt.push(`${relative(file)}: ${match[0]}`);
      if (alt === "这是图片描述") placeholderAlt.push(`${relative(file)}: ${match[2]}`);
      if (resolved.error) invalidImagePaths.push(`${relative(file)} -> ${resolved.error}`);
      if (resolved.file && !fs.existsSync(resolved.file)) missingImages.push(`${relative(file)} -> ${match[2]}`);
    }

    const frontmatterImagePattern = /^image:\s*["']([^"']+)["']/gm;
    for (const match of source.matchAll(frontmatterImagePattern)) {
      const resolved = localTarget(file, match[1]);
      if (resolved.error) invalidImagePaths.push(`${relative(file)} -> ${resolved.error}`);
      if (resolved.file && !fs.existsSync(resolved.file)) missingImages.push(`${relative(file)} -> ${match[1]}`);
    }
  }

  return { markdownFiles, missingImages, missingAlt, placeholderAlt, invalidImagePaths };
}

async function validate({ failOnUnoptimized = true } = {}) {
  const imageFiles = await walk(imagesDir);
  const unoptimized = imageFiles.filter((file) => sourcePattern.test(file));
  const markdown = await inspectMarkdown();
  const errors = [];

  if (failOnUnoptimized && unoptimized.length) {
    errors.push(...unoptimized.map((file) => `Unoptimized image: ${relative(file)}`));
  }
  errors.push(...markdown.missingImages.map((item) => `Missing image: ${item}`));
  errors.push(...markdown.missingAlt.map((item) => `Missing alt: ${item}`));
  errors.push(...markdown.invalidImagePaths.map((item) => `Invalid image path: ${item}`));

  return { ...markdown, unoptimized, errors };
}

async function updateSourceReferences(replacements) {
  const files = await referenceFiles();
  let updatedFiles = 0;
  let updatedReferences = 0;

  for (const file of files) {
    const before = await fsp.readFile(file, "utf8");
    const result = replaceReferencesInText(before, file, replacements);
    const after = result.text;
    updatedReferences += result.count;
    if (after !== before) {
      await fsp.writeFile(file, after, "utf8");
      updatedFiles += 1;
    }
  }

  return { updatedFiles, updatedReferences };
}

async function findRemainingReferences(replacements) {
  const files = await referenceFiles();
  const remaining = [];
  for (const file of files) {
    const sourceText = await fsp.readFile(file, "utf8");
    remaining.push(...remainingReferencesInText(sourceText, file, replacements).map((candidate) => `${relative(file)} -> ${candidate}`));
  }
  return [...new Set(remaining)];
}

async function optimize() {
  const sharp = require("sharp");
  const sources = (await walk(imagesDir)).filter((file) => sourcePattern.test(file)).sort();
  const outputs = new Map();

  for (const source of sources) {
    const output = source.replace(sourcePattern, ".webp");
    const key = normalized(output);
    if (outputs.has(key)) {
      throw new Error(`Image output collision: ${relative(source)} and ${relative(outputs.get(key))}`);
    }
    outputs.set(key, source);
  }

  let converted = 0;
  let skipped = 0;
  let beforeBytes = 0;
  let afterBytes = 0;
  const replacements = new Map();

  for (const source of sources) {
    const output = source.replace(sourcePattern, ".webp");
    const sourceStat = await fsp.stat(source);
    beforeBytes += sourceStat.size;
    replacements.set(normalized(source), [source, output]);

    let shouldConvert = force || !fs.existsSync(output);
    if (!shouldConvert) {
      const outputStat = await fsp.stat(output);
      shouldConvert = outputStat.mtimeMs < sourceStat.mtimeMs;
    }

    if (shouldConvert) {
      const temporary = `${output}.tmp-${process.pid}`;
      await sharp(source).rotate().webp({ quality, effort: 6 }).toFile(temporary);
      if (fs.existsSync(output)) await fsp.rm(output);
      await fsp.rename(temporary, output);
      converted += 1;
    } else {
      skipped += 1;
    }
    afterBytes += (await fsp.stat(output)).size;
  }

  const references = await updateSourceReferences(replacements);
  const preDelete = await validate({ failOnUnoptimized: false });
  if (preDelete.errors.length) throw new Error(preDelete.errors.join("\n"));

  const remainingReferences = await findRemainingReferences(replacements);
  if (remainingReferences.length) {
    throw new Error(`Original image references remain; originals were not deleted:\n${remainingReferences.join("\n")}`);
  }

  if (!keepOriginals) {
    await Promise.all(sources.map((file) => fsp.rm(file)));
  }

  const result = await validate({ failOnUnoptimized: !keepOriginals });
  if (result.errors.length) throw new Error(result.errors.join("\n"));

  const savedBytes = beforeBytes - afterBytes;
  const savedPercent = beforeBytes ? (savedBytes / beforeBytes) * 100 : 0;
  console.log("Image optimization complete");
  console.log(`Converted: ${converted}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Markdown files updated: ${references.updatedFiles}`);
  console.log(`Markdown references updated: ${references.updatedReferences}`);
  console.log(`Before: ${(beforeBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`After: ${(afterBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${savedPercent.toFixed(1)}%`);
  console.log(`Missing images: ${result.missingImages.length}`);
  console.log(`Missing alt: ${result.missingAlt.length}`);
  if (result.placeholderAlt.length) {
    console.warn(`Placeholder alt warnings: ${result.placeholderAlt.length}`);
  }
  if (keepOriginals) console.log("Originals kept (--keep-originals)");
}

async function check() {
  const result = await validate();
  if (result.placeholderAlt.length) {
    console.warn(`Placeholder alt warnings: ${result.placeholderAlt.length}`);
  }
  if (result.errors.length) {
    console.error(result.errors.join("\n"));
    console.error("Run: pnpm images:optimize");
    process.exit(1);
  }
  console.log(`Image checks passed (${result.markdownFiles.length} posts, ${result.unoptimized.length} unoptimized images)`);
}

if (require.main === module) {
  (checkOnly ? check() : optimize()).catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
}

module.exports = { localTarget, referencePairs, remainingReferencesInText, replaceReferencesInText };
