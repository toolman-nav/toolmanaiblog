import { createRequire } from "node:module";

// Vite's Windows content runner evaluates dependencies as ESM; load this CommonJS package through Node explicitly.
const require = createRequire(import.meta.url);

export default require("picomatch");
