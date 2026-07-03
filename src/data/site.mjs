import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";

const require = createRequire(import.meta.url);
const site = require(path.join(process.cwd(), "app.js"));

export default site;
