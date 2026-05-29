import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

const projectRoot = dirname(new URL(import.meta.url).pathname);
const targetPath = join(projectRoot, "..", "node_modules", "jiti", "lib", "jiti-register.mjs");

const patchedContents = `// https://nodejs.org/api/module.html#moduleregisterspecifier-parenturl-options
import { register, registerHooks } from "node:module";

// Node.js v26+ deprecates \`module.register()\` in favor of \`module.registerHooks()\`.
// Keep backward-compat with older Node versions.
if (typeof registerHooks === "function") {
  const hooks = await import(new URL("./jiti-hooks.mjs", import.meta.url));
  if (typeof hooks.initialize === "function") {
    await hooks.initialize();
  }
  registerHooks({
    resolve: hooks.resolve,
    load: hooks.load,
  });
} else {
  register("./jiti-hooks.mjs", import.meta.url, {});
}
`;

if (!existsSync(targetPath)) {
  process.exit(0);
}

const current = await readFile(targetPath, "utf8");
if (current === patchedContents) {
  process.exit(0);
}

// Only patch when the file looks like the known jiti v2.x register shim.
const looksLikeJitiRegister =
  current.includes('import { register } from "node:module";') &&
  current.includes('register("./jiti-hooks.mjs", import.meta.url, {});');

if (!looksLikeJitiRegister) {
  process.exit(0);
}

await writeFile(targetPath, patchedContents, "utf8");
