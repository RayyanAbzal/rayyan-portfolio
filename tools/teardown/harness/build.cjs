#!/usr/bin/env node
// Renders the harness drawing (a horse in harness) and writes two files:
//   content/harness/drawing.ts: the labelled exploded state (each part slides home along its
//     (dx, dy)), the ink of every part that never moves, and gallop frame 0.
//   public/harness/gallop.json: gallop frames 1 to FRAMES-1, fetched on the first hover.
// Every frame is its own hidden-line pass in the exploded state's paper space (a fixed frame,
// so nothing jitters and still parts ink identically). A frame stores every fill, since fills
// layer back to front, but only the ink of the parts that move (legs, tail, reins, spokes, flag).
// Run: node tools/teardown/harness/build.cjs
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const here = __dirname, assets = path.resolve(here, '../assets');
const out = path.resolve(here, '../../../content/harness/drawing.ts');
const config = JSON.parse(fs.readFileSync(path.join(here, 'drawing.json'), 'utf8'));
const drawing = config.drawings[0];
const FRAMES = 8;

const context = {console, structuredClone};
context.self = context;
vm.createContext(context);
for (const file of ['sheet.js', 'geometry.js', 'projection.js'].map(f => path.join(assets, f)).concat(path.join(here, 'model.js'))) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, {filename: file});
}
const {project} = context.TechnicalProjection;
const round = n => Math.round(n * 10) / 10;
// Labels must read at page size: the drawing is about 410 units across a 700px column.
context.TechnicalProjection.SHEET.labelSize = 5.2;
const NUMBER_PAIR = /(-?\d*\.?\d+(?:e-?\d+)?)[ ,](-?\d*\.?\d+(?:e-?\d+)?)/g;

// The renderer paints every fill back to front, then all the ink on top. Keep that order.
function partMarkup(result) {
  const fills = new Map();
  for (const [, id, rest] of result.markup.matchAll(/<path data-fill="([^"]+)"([^>]*)\/>/g)) {
    fills.set(id, (fills.get(id) ?? '') + /\sd="([^"]+)"/.exec(rest)[1]);
  }
  const parts = new Map();
  for (const [, id, body] of result.markup.matchAll(/<g id="[^"]+" data-item="([^"]+)"[^>]*>([\s\S]*?)<\/g>/g)) {
    parts.set(id, {fill: fills.get(id) ?? '', ink: body.replace(/<title>[\s\S]*?<\/title>/, '')});
  }
  return {parts, fillOrder: [...fills.keys()]};
}
const tidy = d => d.replace(NUMBER_PAIR, (_, x, y) => `${round(Number(x))} ${round(Number(y))}`);
const tidyInk = ink => ink.replace(/\sd="([^"]+)"/g, (_, d) => ` d="${tidy(d)}"`);

// Fills sit under the ink, so they only need to be close: drop near-collinear points and
// slivers. The renderer emits straight-edged subpaths, M x y L x y ... Z.
function rdp(points, eps) {
  if (points.length < 3) return points;
  const a = points[0], b = points[points.length - 1], length = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1e-9;
  let index = -1, max = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = Math.abs((b[1] - a[1]) * points[i][0] - (b[0] - a[0]) * points[i][1] + b[0] * a[1] - b[1] * a[0]) / length;
    if (d > max) { max = d; index = i; }
  }
  return max <= eps ? [a, b] : rdp(points.slice(0, index + 1), eps).slice(0, -1).concat(rdp(points.slice(index), eps));
}
const area = p => Math.abs(p.reduce((sum, q, i) => { const n = p[(i + 1) % p.length]; return sum + q[0] * n[1] - n[0] * q[1]; }, 0)) / 2;
const simplifyFill = d => d.split('M').filter(Boolean).map(sub => {
  const points = rdp(sub.replace(/Z/g, '').split('L').map(t => t.trim().split(/\s+/).map(Number)), 0.15);
  return points.length < 3 || area(points) < 0.05 ? '' : `M${points.map(([x, y]) => `${round(x)} ${round(y)}`).join('L')}Z`;
}).join('');

// Exploded: labelled, no ground. Its fit covers the assembled pose too, so both share a frame.
const exploded = context.DrawingModels.harness({t: 0, ground: false}, {explosion: 1, fitExplosion: 0, isolated: null, fill: true, annotate: true});
const e = partMarkup(exploded);
const labelGroup = /<g data-annotations="">([\s\S]*)<\/g>$/.exec(exploded.markup);
if (!labelGroup) throw Error('The exploded pass drew no labels');
const labels = tidyInk(labelGroup[1]).replace(/\s(x|y|cx|cy)="(-?[\d.e-]+)"/g, (_, k, v) => ` ${k}="${round(Number(v))}"`);

const origin = project([0, 0, 0], exploded.camera);
const parts = drawing.parts.map(meta => {
  const markup = e.parts.get(meta.id);
  if (!markup) throw Error(`Part ${meta.id} missing from the exploded pass`);
  if (!e.fillOrder.includes(meta.id)) throw Error(`Part ${meta.id} has no fill`);
  const moved = project(exploded.explosions[meta.id], exploded.camera);
  return {
    id: meta.id, name: meta.name,
    dx: round((moved[0] - origin[0]) * exploded.scale), dy: round((moved[1] - origin[1]) * exploded.scale),
    exploded: {fill: simplifyFill(markup.fill), ink: tidyInk(markup.ink)},
  };
});
// Back to front, so the exploded fills layer as the renderer painted them.
parts.sort((p, q) => e.fillOrder.indexOf(p.id) - e.fillOrder.indexOf(q.id));
if (parts.length !== e.parts.size) throw Error(`drawing.json lists ${parts.length} parts, the model drew ${e.parts.size}`);

const frame = {scale: exploded.scale, offset: exploded.offset, bounds: exploded.bounds};
const frames = [];
let fillOrder = null;
for (let k = 0; k < FRAMES; k++) {
  const a = partMarkup(context.DrawingModels.harness({t: k / FRAMES}, {explosion: 0, frame, isolated: null, fill: true, annotate: false}));
  if (fillOrder && fillOrder.join() !== a.fillOrder.join()) throw Error(`Frame ${k} paints fills in a different order`);
  fillOrder = a.fillOrder;
  frames.push(new Map([...a.parts].map(([id, s]) => [id, {fill: simplifyFill(s.fill), ink: tidyInk(s.ink)}])));
}
const ids = [...frames[0].keys()];
const moving = ids.filter(id => frames.some(f => f.get(id).ink !== frames[0].get(id).ink));
const still = Object.fromEntries(ids.filter(id => !moving.includes(id)).map(id => [id, frames[0].get(id).ink]));
const pick = (f, list, key) => Object.fromEntries(list.map(id => [id, f.get(id)[key]]));
const gallop = frames.map(f => ({fills: pick(f, fillOrder, 'fill'), ink: pick(f, moving, 'ink')}));

// Crop to every state's ink plus the label text, which runs outward from its column.
const box = [Infinity, Infinity, -Infinity, -Infinity];
const grow = (x, y) => { box[0] = Math.min(box[0], x); box[1] = Math.min(box[1], y); box[2] = Math.max(box[2], x); box[3] = Math.max(box[3], y); };
const paths = [...parts.flatMap(p => [p.exploded.fill, p.exploded.ink]), ...frames.flatMap(f => [...f.values()].flatMap(s => [s.fill, s.ink]))];
for (const markup of paths) for (const [, x, y] of markup.matchAll(NUMBER_PAIR)) grow(Number(x), Number(y));
for (const [, x, y, size, anchor, text] of labels.matchAll(/<text[^>]*x="([^"]+)" y="([^"]+)" font-size="([^"]+)" text-anchor="([^"]+)">([^<]*)<\/text>/g)) {
  const width = text.length * Number(size) * 0.66;
  grow(anchor === 'end' ? Number(x) - width : Number(x) + width, Number(y) - Number(size));
  grow(Number(x), Number(y) + 1);
}
const PAD = 4;
const viewBox = [box[0] - PAD, box[1] - PAD, box[2] - box[0] + PAD * 2, box[3] - box[1] + PAD * 2].map(round);
const GALLOP_SRC = '/harness/gallop.json';

// The assembled pose is far smaller than the exploded spread, so it gets its own fit: a zoom
// (paper-space translate, then scale) that fills the viewBox with every gallop frame, ground
// left out. The page applies it while the horse is in harness and eases it off when taken apart.
const fit = [Infinity, Infinity, -Infinity, -Infinity];
for (const f of frames) for (const [id, st] of f) {
  if (id === 'ground') continue;
  for (const markup of [st.fill, st.ink]) for (const [, x, y] of markup.matchAll(NUMBER_PAIR)) {
    fit[0] = Math.min(fit[0], Number(x)); fit[1] = Math.min(fit[1], Number(y));
    fit[2] = Math.max(fit[2], Number(x)); fit[3] = Math.max(fit[3], Number(y));
  }
}
const zs = 0.94 * Math.min(viewBox[2] / (fit[2] - fit[0]), viewBox[3] / (fit[3] - fit[1]));
const zoom = {
  x: round(viewBox[0] + viewBox[2] / 2 - zs * (fit[0] + fit[2]) / 2),
  y: round(viewBox[1] + viewBox[3] / 2 - zs * (fit[1] + fit[3]) / 2),
  s: Math.round(zs * 1000) / 1000,
};

const body = `// Generated by tools/teardown/harness/build.cjs. Do not edit by hand.
// Concept drawing: the model is a horse, each piece of tack one layer of the harness.

export interface HarnessDrawingState {
  /** Path data for the part's fill. */
  fill: string;
  /** Hidden-line ink, as SVG markup. */
  ink: string;
}

export interface HarnessDrawingPart {
  id: string;
  name: string;
  /** Paper-space shift from assembled to exploded, in viewBox units. */
  dx: number;
  dy: number;
  exploded: HarnessDrawingState;
}

/** One gallop frame: every fill (they layer back to front) and the ink of the moving parts. */
export interface HarnessGallopFrame {
  fills: Record<string, string>;
  ink: Record<string, string>;
}

export const HARNESS_DRAWING = {
  viewBox: ${JSON.stringify(viewBox.join(' '))},
  /** Assembled-view zoom: translate (x, y) in viewBox units, then scale s. */
  zoom: ${JSON.stringify(zoom)},
  /** Part ids back to front in the assembled frames (the ground is first). */
  fillOrder: ${JSON.stringify(fillOrder)},
  /** Exploded-view labels: leader lines, dots and part names, as SVG markup. */
  labels: ${JSON.stringify(labels)},
  parts: ${JSON.stringify(parts)} satisfies HarnessDrawingPart[],
  /** Ink of the parts that look the same in every gallop frame. */
  still: ${JSON.stringify(still)} as Record<string, string>,
  /** Gallop frame 0; frames 1 to ${FRAMES - 1} live at gallop.src. */
  gallop: {
    frames: ${FRAMES},
    src: ${JSON.stringify(GALLOP_SRC)},
    first: ${JSON.stringify(gallop[0])} satisfies HarnessGallopFrame,
  },
} as const;
`;
const json = JSON.stringify(gallop.slice(1));
fs.mkdirSync(path.dirname(out), {recursive: true});
fs.writeFileSync(out, body);
const jsonOut = path.resolve(here, '../../../public', GALLOP_SRC.slice(1));
fs.mkdirSync(path.dirname(jsonOut), {recursive: true});
fs.writeFileSync(jsonOut, json);
console.log(`Wrote ${path.relative(process.cwd(), out)} (${Math.round(body.length / 1024)} KB) and ${path.relative(process.cwd(), jsonOut)} (${Math.round(json.length / 1024)} KB): ${parts.length} parts, ${FRAMES} frames, moving ${moving.join(' ')}, viewBox ${viewBox.join(' ')}, zoom ${JSON.stringify(zoom)}`);
