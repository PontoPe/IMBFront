// Move px-4 md:px-8 from <section> tag to its inner max-w-7xl wrapper, so section
// content aligns with the header (which already applies padding inside max-w-7xl).
// Affected: landing-page sections in index.html (root + en + es).
const fs = require('fs');
const path = require('path');

const files = [
  'site/index.html',
  'site/en/index.html',
  'site/es/index.html',
];

// Section pattern: <section[ id="..."]? class="py-16 md:py-24 bg-surface px-4 md:px-8">
// Followed (next line, optional whitespace) by: <div class="max-w-7xl mx-auto[ ...]">
const sectionRx = /<section(\s+id="[^"]+")?\s+class="(py-16 md:py-24 bg-surface) px-4 md:px-8">(\s*\n\s*<div class="max-w-7xl mx-auto)([^"]*)"/g;

let total = 0;
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  const o = s;
  s = s.replace(sectionRx, (m, idAttr, sectClasses, divPrefix, divRest) => {
    // Insert ' px-4 md:px-8' into the inner wrapper class list right after 'mx-auto'.
    // Keep any existing inner classes (grid, etc.) intact.
    return `<section${idAttr || ''} class="${sectClasses}">${divPrefix} px-4 md:px-8${divRest}"`;
  });
  if (s !== o) {
    fs.writeFileSync(f, s);
    const hits = (o.match(sectionRx) || []).length;
    total += hits;
    console.log(f, '→ moved padding on', hits, 'section(s)');
  }
}
console.log('Done. Total:', total, 'sections normalized.');
