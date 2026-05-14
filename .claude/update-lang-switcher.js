// One-shot script: apply gap-12, dropdown flag prefixes, and flag/code header button.
// Run with: node .claude/update-lang-switcher.js
const fs = require('fs');
const path = require('path');

const flags = { pt: '\u{1F1E7}\u{1F1F7}', en: '\u{1F1EC}\u{1F1E7}', es: '\u{1F1EA}\u{1F1F8}' };
const codes = { pt: 'PT', en: 'ENG', es: 'ES' };
const arias = { pt: 'Idioma', en: 'Language', es: 'Idioma' };

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const files = walk('site');
let cnt = 0;
for (const f of files) {
  const rel = f.replace(/\\/g, '/');
  const loc = rel.includes('/en/') ? 'en' : rel.includes('/es/') ? 'es' : 'pt';
  let s = fs.readFileSync(f, 'utf8');
  const orig = s;

  s = s.replace(
    'flex items-center max-w-7xl mx-auto px-4 md:px-8 h-20 gap-16',
    'flex items-center max-w-7xl mx-auto px-4 md:px-8 h-20 gap-12'
  );

  s = s.replace(
    /(<a role="menuitem" data-lang="pt"[^>]*>)Português/g,
    `$1<span class="lang-flag">${flags.pt}</span>Português`
  );
  s = s.replace(
    /(<a role="menuitem" data-lang="en"[^>]*>)English/g,
    `$1<span class="lang-flag">${flags.en}</span>English`
  );
  s = s.replace(
    /(<a role="menuitem" data-lang="es"[^>]*>)Español/g,
    `$1<span class="lang-flag">${flags.es}</span>Español`
  );

  const newBtn = `<button type="button" class="lang-switcher-btn" aria-haspopup="menu" aria-expanded="false" aria-label="${arias[loc]}"><span class="lang-flag" aria-hidden="true">${flags[loc]}</span><span class="lang-current-code">${codes[loc]}</span></button>`;
  s = s.replace(
    /<button type="button" class="lang-switcher-btn"[^>]*>[\s\S]*?<\/button>/,
    newBtn
  );

  if (s !== orig) {
    fs.writeFileSync(f, s);
    cnt++;
  }
}
console.log('Changed', cnt, 'files');
