#!/usr/bin/env node
/**
 * Convierte los sprites PNG del kit (pixel art dibujado a mano) a SVG:
 * rejilla FIJA (celda = ladoMayor/grid), muestreo 3×3 por celda, cuantiza a
 * 3 tonos y emite rects fusionados por filas (RLE).
 *   tono 1 (oscuro) → currentColor · tono 2 → var(--pa-2) · tono 3 → var(--pa-3)
 * Uso: node scripts/pixel-svg.mjs entrada.png salida.svg [grid=36]
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const [, , input, output, gridArg] = process.argv;
if (!input || !output) {
  console.error('Uso: node scripts/pixel-svg.mjs entrada.png salida.svg [grid]');
  process.exit(1);
}
const GRID = Number(gridArg ?? 36);

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

const cell = Math.max(W, H) / GRID;
const GW = Math.round(W / cell);
const GH = Math.round(H / cell);

function sample(gx, gy) {
  const cx = (gx + 0.5) * cell;
  const cy = (gy + 0.5) * cell;
  let v = 0,
    a = 0,
    n = 0;
  for (let dy = -1; dy <= 1; dy++)
    for (let dx = -1; dx <= 1; dx++) {
      const x = Math.min(W - 1, Math.max(0, Math.round(cx + (dx * cell) / 4)));
      const y = Math.min(H - 1, Math.max(0, Math.round(cy + (dy * cell) / 4)));
      const i = (y * W + x) * C;
      v += (data[i] + data[i + 1] + data[i + 2]) / 3;
      a += data[i + 3];
      n++;
    }
  return { v: v / n, a: a / n };
}

const tone = (p) => {
  if (p.a <= 128 || p.v >= 232) return 0;
  if (p.v < 76) return 1;
  if (p.v < 168) return 2;
  return 3;
};

const grid = [];
for (let gy = 0; gy < GH; gy++) {
  const row = [];
  for (let gx = 0; gx < GW; gx++) row.push(tone(sample(gx, gy)));
  grid.push(row);
}

let minX = GW,
  minY = GH,
  maxX = -1,
  maxY = -1;
grid.forEach((row, y) =>
  row.forEach((t, x) => {
    if (t) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }),
);
if (maxX < 0) {
  console.error(`${input}: sin contenido`);
  process.exit(1);
}
const vw = maxX - minX + 1,
  vh = maxY - minY + 1;

const fills = { 1: 'currentColor', 2: 'var(--pa-2)', 3: 'var(--pa-3)' };
const rects = { 1: [], 2: [], 3: [] };
for (let y = minY; y <= maxY; y++) {
  let x = minX;
  while (x <= maxX) {
    const t = grid[y][x];
    if (!t) {
      x++;
      continue;
    }
    let x2 = x;
    while (x2 + 1 <= maxX && grid[y][x2 + 1] === t) x2++;
    rects[t].push(`<rect x="${x - minX}" y="${y - minY}" width="${x2 - x + 1}" height="1"/>`);
    x = x2 + 1;
  }
}
const groups = [1, 2, 3]
  .filter((t) => rects[t].length)
  .map((t) => `<g fill="${fills[t]}">${rects[t].join('')}</g>`)
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" shape-rendering="crispEdges" aria-hidden="true">${groups}</svg>\n`;
writeFileSync(output, svg);
console.log(
  `${output} · rejilla ${GW}×${GH} · caja ${vw}×${vh} · ${rects[1].length + rects[2].length + rects[3].length} rects`,
);
