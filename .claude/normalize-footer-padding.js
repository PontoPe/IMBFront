// Footer: move px-4 md:px-8 off the <footer> element and onto the inner
// wrappers, matching how the header/nav and other sections apply padding.
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

const files = walk('site');
const footerRx = /<footer class="bg-surface-container-low border-t border-surface-container-high py-12 px-4 md:px-8">/g;
// Inner wrappers used right inside <footer>: first <div ... max-w-7xl mx-auto ...>
// and a sibling .max-w-7xl row with the copyright. Add px to both.
const innerWrapRx = /(<footer class="bg-surface-container-low border-t border-surface-container-high py-12">[\s\S]*?)(<div class="(?:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 max-w-7xl mx-auto|max-w-7xl mx-auto[^"]*?))"/g;

let cnt = 0;
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  const orig = s;
  // 1) Strip padding from <footer>.
  s = s.replace(footerRx, '<footer class="bg-surface-container-low border-t border-surface-container-high py-12">');
  // 2) Append px-4 md:px-8 to every inner .max-w-7xl that lives inside <footer>.
  //    Two such elements per footer in this codebase: the grid wrapper and the copyright row.
  s = s.replace(
    /<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 max-w-7xl mx-auto">/g,
    '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 max-w-7xl mx-auto px-4 md:px-8">'
  );
  s = s.replace(
    /<div class="max-w-7xl mx-auto mt-10 pt-8 border-t border-surface-container-high ([^"]*)">/g,
    '<div class="max-w-7xl mx-auto mt-10 pt-8 border-t border-surface-container-high $1 px-4 md:px-8">'
  );
  // En/Es centered-only footers (single line)
  s = s.replace(
    /<footer class="bg-surface-container-low border-t border-surface-container-high py-12"><div class="max-w-7xl mx-auto text-center">/g,
    '<footer class="bg-surface-container-low border-t border-surface-container-high py-12"><div class="max-w-7xl mx-auto px-4 md:px-8 text-center">'
  );
  if (s !== orig) { fs.writeFileSync(f, s); cnt++; }
}
console.log('Updated footers in', cnt, 'files');
