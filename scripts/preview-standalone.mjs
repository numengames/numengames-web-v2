#!/usr/bin/env node
/**
 * Genera una vista previa autocontenida (un único .html) de la home ES
 * a partir de `dist/`: CSS, JS y fuentes latinas embebidos en base64.
 * Uso:  node scripts/preview-standalone.mjs [ruta-salida.html]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const out = process.argv[2] ?? 'preview-home-es.html';

let html = readFileSync(join(dist, 'es', 'index.html'), 'utf8');

// --- CSS -------------------------------------------------------------
const cssMatch = html.match(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)">/);
if (!cssMatch) throw new Error('No se encontró la hoja de estilos en dist/es/index.html');
let css = readFileSync(join(dist, cssMatch[1]), 'utf8');

// Fuentes: solo subconjuntos «latin» (no latin-ext); el resto queda sin
// resolver y nunca se pide gracias a unicode-range.
for (const m of css.matchAll(/\/_astro\/([^)]*-latin-[^)]*\.woff2)/g)) {
  const file = m[1];
  if (file.includes('latin-ext')) continue;
  const b64 = readFileSync(join(dist, '_astro', file)).toString('base64');
  css = css.replaceAll(`/_astro/${file}`, `data:font/woff2;base64,${b64}`);
}
html = html.replace(cssMatch[0], `<style>${css}</style>`);

// --- JS --------------------------------------------------------------
const jsMatch = html.match(/<script type="module" src="(\/_astro\/[^"]+\.js)"><\/script>/);
if (jsMatch) {
  const js = readFileSync(join(dist, jsMatch[1]), 'utf8');
  html = html.replace(jsMatch[0], `<script type="module">${js}</script>`);
}

// --- Favicon ---------------------------------------------------------
try {
  const fav = readFileSync('public/favicon.svg').toString('base64');
  html = html.replace('href="/favicon.svg"', `href="data:image/svg+xml;base64,${fav}"`);
} catch {
  /* opcional */
}

// --- Aviso para enlaces internos (la preview es un solo archivo) -----
const intercept = `<script>
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('a[href^="/"]') : null;
  if (!a) return;
  e.preventDefault();
  var n = document.getElementById('preview-note');
  if (!n) {
    n = document.createElement('div');
    n.id = 'preview-note';
    n.setAttribute('role', 'status');
    n.style.cssText =
      'position:fixed;left:50%;bottom:4.6rem;transform:translateX(-50%);z-index:99;' +
      'background:var(--surface-raised);color:var(--ink);border:3px solid var(--accent);' +
      'padding:.6rem 1rem;font-family:var(--stack-dialog);font-size:1.1rem;max-width:92vw;text-align:center';
    document.body.appendChild(n);
  }
  n.textContent =
    'Vista previa de la home · «' +
    (a.textContent || '').trim() +
    '» es otra página del repo (pnpm dev para navegarlo todo).';
  clearTimeout(n._t);
  n._t = setTimeout(function () {
    n.remove();
  }, 3800);
});
</script>
</body>`;
html = html.replace('</body>', intercept);

writeFileSync(out, html);
console.log(`${out} · ${(html.length / 1024).toFixed(0)} KB`);
