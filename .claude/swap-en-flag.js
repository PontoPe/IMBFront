// One-shot: replace the UK flag (🇬🇧) with the US flag (🇺🇸) wherever it appears
// as the "EN" indicator in the language switcher (header button + dropdown items).
const fs = require('fs');
const path = require('path');

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const gb = '\u{1F1EC}\u{1F1E7}'; // 🇬🇧
const us = '\u{1F1FA}\u{1F1F8}'; // 🇺🇸
let cnt = 0;
for (const f of walk('site')) {
  const s = fs.readFileSync(f, 'utf8');
  if (!s.includes(gb)) continue;
  fs.writeFileSync(f, s.split(gb).join(us));
  cnt++;
}
console.log('Replaced GB→US flag in', cnt, 'files');
