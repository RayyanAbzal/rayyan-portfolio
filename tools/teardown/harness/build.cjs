#!/usr/bin/env node
// Renders the harness drawing once, exploded, and writes content/harness/drawing.ts.
// The site shows the assembled state by translating each part group back along its
// projected explosion vector, so one hidden-line pass serves both views.
// Run: node tools/teardown/harness/build.cjs
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const here = __dirname, assets = path.resolve(here, '../assets');
const out = path.resolve(here, '../../../content/harness/drawing.ts');
const config = JSON.parse(fs.readFileSync(path.join(here, 'drawing.json'), 'utf8'));
const drawing = config.drawings[0];

const context = {console, structuredClone};
context.self = context;
vm.createContext(context);
for (const file of ['sheet.js', 'geometry.js', 'projection.js'].map(f => path.join(assets, f)).concat(path.join(here, 'model.js'))) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, {filename: file});
}

const result = context.DrawingModels.harness({}, {explosion: 1, fitExplosion: 1, isolated: null, fill: true, annotate: false});
const {project} = context.TechnicalProjection;
const round = n => Math.round(n * 1000) / 1000;

// Fill paths come in one group behind every part; move each into its own part so it travels with it.
const fills = new Map();
for (const [, id, rest] of result.markup.matchAll(/<path data-fill="([^"]+)"([^>]*)\/>/g)) {
  const d = /\sd="([^"]+)"/.exec(rest)[1];
  fills.set(id, (fills.get(id) ?? '') + `<path data-fill="" d="${d}"/>`);
}

const origin = project([0, 0, 0], result.camera);
const parts = [];
for (const [, id, body] of result.markup.matchAll(/<g id="[^"]+" data-item="([^"]+)"[^>]*>([\s\S]*?)<\/g>/g)) {
  const meta = drawing.parts.find(p => p.id === id);
  if (!meta) throw Error(`Part ${id} missing from drawing.json`);
  const ink = body.replace(/<title>[\s\S]*?<\/title>/, '');
  const moved = project(result.explosions[id], result.camera);
  const dx = round((moved[0] - origin[0]) * result.scale), dy = round((moved[1] - origin[1]) * result.scale);
  parts.push({id, name: meta.name, dx, dy, markup: (fills.get(id) ?? '') + ink});
}
if (parts.length !== drawing.parts.length) throw Error(`Expected ${drawing.parts.length} parts, rendered ${parts.length}`);

// Crop to the union of the exploded and assembled ink, plus padding.
const box = [Infinity, Infinity, -Infinity, -Infinity];
const together = [Infinity, Infinity, -Infinity, -Infinity];   // assembled ink only
for (const part of parts) {
  for (const [, d] of part.markup.matchAll(/\sd="([^"]+)"/g)) {
    const nums = d.split(/[MLCZ\s]+/).filter(Boolean).map(Number);
    for (let i = 0; i + 1 < nums.length; i += 2) {
      for (const [x, y] of [[nums[i], nums[i + 1]], [nums[i] - part.dx, nums[i + 1] - part.dy]]) {
        box[0] = Math.min(box[0], x); box[1] = Math.min(box[1], y);
        box[2] = Math.max(box[2], x); box[3] = Math.max(box[3], y);
      }
      const [ax, ay] = [nums[i] - part.dx, nums[i + 1] - part.dy];
      together[0] = Math.min(together[0], ax); together[1] = Math.min(together[1], ay);
      together[2] = Math.max(together[2], ax); together[3] = Math.max(together[3], ay);
    }
  }
}
// Exploded ink per part: every point, plus its bbox.
const ink = new Map(parts.map(part => {
  const points = [];
  for (const [, d] of part.markup.matchAll(/\sd="([^"]+)"/g)) {
    const nums = d.split(/[MLCZ\s]+/).filter(Boolean).map(Number);
    for (let i = 0; i + 1 < nums.length; i += 2) points.push([nums[i], nums[i + 1]]);
  }
  const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
  return [part.id, {points, bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]}];
}));

// Leader-line labels for the exploded view, in two margin columns. `region` picks which
// slice of the part the leader lands on (top keeps the pleats' leader clear of the carbon block).
const FONT = 5.6, LINE = FONT * 1.3, GAP = 7;
const LABELS = {
  hooks: {side: 'right'}, runner: {side: 'right'}, rules: {side: 'right'}, skills: {side: 'right'},
  reviewers: {side: 'right', region: [0, 0.3]}, second: {side: 'right'}, memory: {side: 'right'},
  model: {side: 'left'},
};
const labelWidth = text => text.length * FONT * 0.56;
// The page renders the copy from content/harness.ts; read it here only to size the columns.
const copy = fs.readFileSync(path.resolve(here, '../../../content/harness.ts'), 'utf8');
const labelText = Object.fromEntries([...copy.matchAll(/id: "(\w+)",\s*name: "([^"]+)",\s*part: "([^"]+)"/g)].map(([, id, name, part]) => [id, [name, part]]));
for (const id of Object.keys(LABELS)) if (!labelText[id]) throw Error(`No copy for label ${id} in content/harness.ts`);
const columns = {right: box[2] + GAP * 2.2, left: box[0] - GAP * 2.2};
const labels = [];
for (const [id, {side, region = [0, 1]}] of Object.entries(LABELS)) {
  const {points, bbox} = ink.get(id);
  const h = bbox[3] - bbox[1];
  const inBand = points.filter(([, y]) => y >= bbox[1] + region[0] * h && y <= bbox[1] + region[1] * h);
  const pick = inBand.reduce((best, p) => (side === 'right' ? p[0] > best[0] : p[0] < best[0]) ? p : best);
  labels.push({id, side, anchor: pick.map(round), y: pick[1]});
}
// Spread each column so no two labels overlap (two lines each).
const SPACING = LINE * 2 + 3;
for (const side of ['left', 'right']) {
  const column = labels.filter(l => l.side === side).sort((a, b) => a.y - b.y);
  for (let pass = 0; pass < 20; pass++) {
    for (let i = 1; i < column.length; i++) {
      const overlap = SPACING - (column[i].y - column[i - 1].y);
      if (overlap > 0) { column[i - 1].y -= overlap / 2; column[i].y += overlap / 2; }
    }
  }
}
for (const label of labels) label.at = [round(columns[label.side]), round(label.y)];
const labelBox = [...box];
for (const label of labels) {
  const width = Math.max(...labelText[label.id].map(labelWidth));
  labelBox[0] = Math.min(labelBox[0], label.side === 'left' ? label.at[0] - width : label.at[0]);
  labelBox[2] = Math.max(labelBox[2], label.side === 'right' ? label.at[0] + width : label.at[0]);
  labelBox[1] = Math.min(labelBox[1], label.at[1] - LINE);
  labelBox[3] = Math.max(labelBox[3], label.at[1] + LINE * 1.4);
}

// Water path for the flow animation: down the stack's axis, port top to the bowl floor.
// Each part ticks as the drop reaches it (t = 0 at the port, 1 at the bowl).
const stack = ink.get('memory').bbox, port = ink.get('runner').bbox;
const flow = {x: round((stack[0] + stack[2]) / 2), y0: round(port[1] + 2), y1: round(stack[1] + (stack[3] - stack[1]) * 0.6)};
const tOf = id => { const b = ink.get(id).bbox; return round(Math.min(1, Math.max(0, ((b[1] + b[3]) / 2 - flow.y0) / (flow.y1 - flow.y0)))); };
const flowAt = {hooks: tOf('runner'), model: tOf('reviewers'), second: tOf('reviewers')};
for (const part of parts) part.t = flowAt[part.id] ?? tOf(part.id);

const PAD = 4;
const viewBox = [labelBox[0] - PAD, labelBox[1] - PAD, labelBox[2] - labelBox[0] + PAD * 2, labelBox[3] - labelBox[1] + PAD * 2].map(round);
// The assembled object is much shorter than the exploded stack; this shift centres it in the same box.
const centre = [round((labelBox[0] + labelBox[2] - together[0] - together[2]) / 2), round((box[1] + box[3] - together[1] - together[3]) / 2)];
// Without labels (home teaser, narrow screens) the drawing crops to the ink, and centres there.
const inkBox = [box[0] - PAD, box[0] + (box[2] - box[0]) + PAD].map(round);
const centreInk = round((box[0] + box[2] - together[0] - together[2]) / 2);
const strokes = context.TechnicalSheet.linework.technical;

const body = `// Generated by tools/teardown/harness/build.cjs. Do not edit by hand.
// Concept drawing: a water-filter cartridge, one part per layer of the harness.

export interface HarnessDrawingPart {
  id: string;
  name: string;
  /** Paper-space shift from assembled to exploded, in viewBox units. */
  dx: number;
  dy: number;
  /** When the flow drop reaches this part, 0 (port) to 1 (bowl). */
  t: number;
  markup: string;
}

export interface HarnessDrawingLabel {
  /** Part id; the text comes from content/harness.ts. */
  id: string;
  side: "left" | "right";
  /** Where the leader touches the part, and where the text starts. */
  anchor: readonly [number, number];
  at: readonly [number, number];
}

export const HARNESS_DRAWING = {
  viewBox: ${JSON.stringify(viewBox.join(' '))},
  /** Shift that centres the assembled view in the viewBox. */
  centre: ${JSON.stringify(centre)},
  /** Left and right edge of the ink alone, and the assembled shift that centres it there. */
  ink: ${JSON.stringify(inkBox)},
  centreInk: ${centreInk},
  /** Label type size and line height, in viewBox units. */
  labelFont: ${round(FONT)},
  labelLine: ${round(LINE)},
  labels: ${JSON.stringify(labels.map(({id, side, anchor, at}) => ({id, side, anchor, at})), null, 2)} satisfies HarnessDrawingLabel[],
  /** The drop's path down the stack axis. */
  flow: ${JSON.stringify(flow)},
  strokes: ${JSON.stringify(strokes)},
  parts: ${JSON.stringify(parts, null, 2)} satisfies HarnessDrawingPart[],
} as const;
`;
fs.mkdirSync(path.dirname(out), {recursive: true});
fs.writeFileSync(out, body);
console.log(`Wrote ${path.relative(process.cwd(), out)}: ${parts.length} parts, viewBox ${viewBox.join(' ')}, ${Math.round(body.length / 1024)} KB`);
