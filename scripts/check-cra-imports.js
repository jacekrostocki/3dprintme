/** Check imports in src never resolve outside src (Create React App restriction). */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
let inspected = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!/\.[jt]sx?$/.test(entry.name)) continue;
    inspected++;
    const code = fs.readFileSync(file, 'utf8');
    const imports = [
      ...code.matchAll(/\b(?:import|export)\s+(?:[^'";]*?\s+from\s+)?['"](\.[^'"]+)['"]/g),
      ...code.matchAll(/\b(?:require|import)\s*\(\s*['"](\.[^'"]+)['"]\s*\)/g),
    ];
    for (const [,spec] of imports) {
      const resolved = path.resolve(path.dirname(file), spec);
      assert.ok(resolved.startsWith(src + path.sep), `${path.relative(root,file)} imports outside src: ${spec}`);
    }
  }
}
walk(src);
assert.ok(inspected > 0, 'No TS/JS files inspected');
console.log(`PASS: ${inspected} source files checked for CRA import boundaries`);
