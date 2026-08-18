const assert = require("node:assert/strict");
const path = require("node:path");

const { localTarget, remainingReferencesInText, replaceReferencesInText } = require("../scripts/optimize-images.cjs");

const root = path.resolve(__dirname, "..");
const referenceFile = path.join(root, "src", "assets", "Fixture.astro");
const source = path.join(root, "src", "assets", "images", "fixture", "hero image.png");
const output = path.join(root, "src", "assets", "images", "fixture", "hero image.webp");
const replacements = new Map([[source, [source, output]]]);

const sample = [
  '<img src="images/fixture/hero%20image.png?width=800">',
  'import hero from "@/assets/images/fixture/hero image.png";',
  '![Hero](images/fixture/hero image.png)',
  'const unrelated = "notimages/fixture/hero image.png";',
].join("\n");
const replaced = replaceReferencesInText(sample, referenceFile, replacements);

assert.equal(replaced.count, 3, "all supported source reference forms should be migrated");
assert.ok(replaced.text.includes("images/fixture/hero%20image.webp?width=800"), "encoded paths should retain query strings");
assert.ok(replaced.text.includes("@/assets/images/fixture/hero image.webp"), "source aliases should be migrated");
assert.ok(replaced.text.includes("![Hero](images/fixture/hero image.webp)"), "bare relative Markdown paths should be migrated");
assert.ok(replaced.text.includes("notimages/fixture/hero image.png"), "similar but unrelated paths should not be rewritten");
assert.deepEqual(remainingReferencesInText(replaced.text, referenceFile, replacements), [], "all real source references should be cleared before deletion");
assert.ok(remainingReferencesInText(sample, referenceFile, replacements).length > 0, "old source references should block deletion");

const malformed = localTarget(path.join(root, "src", "content", "posts", "fixture.md"), "../../assets/images/bad%ZZ.png");
assert.equal(malformed.file, null, "malformed encoded paths should not resolve");
assert.match(malformed.error, /Invalid encoded image path/, "malformed encoded paths should become validation errors");

const external = localTarget(referenceFile, "https://example.com/image.png");
assert.deepEqual(external, { file: null, error: null }, "external image URLs should be ignored");

console.log("image optimizer regression assertions passed");
