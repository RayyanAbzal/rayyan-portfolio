// Concept drawing of the agent harness: one thin plate per layer, stacked on z.
// Runs in the teardown worker (self.DrawingModels) and in Node via vm (scripts/build-harness-drawing.cjs).
self.DrawingModels ??= {};
self.DrawingModels.harness = (parameters, options) => {
  const G = TechnicalGeometry;
  const W = 120, D = 80, R = 8, GAP = 0.4, LIFT = 0.06;
  const STEP = Number.isFinite(parameters.step) ? parameters.step : 34;

  const rect = (w, d, r, cx = 0, cy = 0) => G.roundedRectangle(w, d, r, {center: [cx, cy]});
  const disc = (cx, cy, r, n = 64) => Array.from({length: n}, (_, i) => [cx + r * Math.cos(i * 2 * Math.PI / n), cy + r * Math.sin(i * 2 * Math.PI / n)]);
  const outline = (part, points, z, role = 'detail') => G.polyline(part, points.map(([x, y]) => [x, y, z]), {closed: true, role});

  // Plate with optional holes, placed so its bottom sits at z0.
  const plate = (part, profile, z0, t, holes = []) => {
    const p = G.piece();
    G.extrude(p, profile, {depth: t, holes});
    G.transform(p, {origin: [0, 0, z0]});
    G.merge(part, p);
    return z0 + t;
  };

  const parts = [];
  let z = 0, level = 0;
  const next = (id, name, t, build) => {
    const part = G.part(id, name);
    const top = build(part, z, t);
    part.explosion = [0, 0, level * STEP];
    parts.push(part);
    z = top + GAP;
    level += 1;
    return part;
  };

  // 1. Model: thick base, an inset bay holding three model tiers.
  next('model', 'Model', 9, (p, z0, t) => {
    const top = plate(p, rect(W, D, R), z0, t);
    outline(p, rect(78, 40, 6), top + LIFT);
    for (const [i, r] of [7.5, 6, 4.5].entries()) {
      G.circle(p, [-24 + i * 24, 0, top + LIFT], r, [0, 0, 1], {role: 'detail'});
    }
    return top;
  });

  // 2. Memory: a grid of index cards.
  next('memory', 'Memory', 3, (p, z0, t) => {
    const top = plate(p, rect(W, D, R), z0, t);
    for (let c = 0; c < 5; c++) for (let r = 0; r < 3; r++) {
      outline(p, rect(17, 16, 2.5, -42 + c * 21, -20 + r * 20), top + LIFT);
    }
    return top;
  });

  // 3. Rules: a ruled sheet with a margin line.
  next('rules', 'Rules', 3, (p, z0, t) => {
    const top = plate(p, rect(W, D, R), z0, t);
    for (let i = 0; i < 7; i++) {
      const y = -27 + i * 9;
      G.line(p, [-44, y, top + LIFT], [50, y, top + LIFT], 'detail');
    }
    G.line(p, [-50, -32, top + LIFT], [-50, 32, top + LIFT], 'detail');
    return top;
  });

  // 4. Skills: module slots cut through the plate.
  next('skills', 'Skills', 3, (p, z0, t) => {
    const slots = [];
    for (let c = 0; c < 4; c++) for (let r = 0; r < 2; r++) slots.push(rect(20, 22, 3, -39 + c * 26, -14 + r * 28));
    return plate(p, rect(W, D, R), z0, t, slots);
  });

  // 5. Guardrails: a frame with an open window and four gate posts.
  next('hooks', 'Guardrails', 3, (p, z0, t) => {
    const posts = [[-50, -30], [50, -30], [-50, 30], [50, 30]].map(([x, y]) => disc(x, y, 3.2, 48));
    return plate(p, rect(W, D, R), z0, t, [rect(84, 44, 6), ...posts]);
  });

  // 6. Reviewers: three lenses.
  const reviewersLevel = level;
  next('reviewers', 'Reviewers', 3, (p, z0, t) => {
    const lenses = [-34, 0, 34].map(x => disc(x, 0, 12, 72));
    const top = plate(p, rect(W, D, R), z0, t, lenses);
    for (const x of [-34, 0, 34]) G.circle(p, [x, 0, top + LIFT], 15, [0, 0, 1], {role: 'detail'});
    return top;
  });

  // 7. Goal runner: a loop track on the top plate.
  next('runner', 'Goal runner', 3, (p, z0, t) => {
    const top = plate(p, rect(W, D, R), z0, t, [disc(-30, -18, 3.5, 48)]);
    outline(p, rect(92, 52, 24), top + LIFT);
    outline(p, rect(76, 36, 16), top + LIFT);
    return top;
  });

  // Second opinion: a separate module docked beside the reviewer plate,
  // pulled out sideways because it is a different model family.
  const reviewers = parts.find(p => p.id === 'reviewers');
  const second = G.part('second', 'Second opinion');
  const z0 = reviewers.vertices.reduce((m, v) => Math.min(m, v[2]), Infinity);
  const top = plate(second, rect(36, D, R, W / 2 + 4 + 18, 0), z0, 3, [disc(W / 2 + 22, 0, 10, 72)]);
  G.circle(second, [W / 2 + 22, 0, top + LIFT], 13, [0, 0, 1], {role: 'detail'});
  // Slide it sideways along the camera's right vector so it stays level with the reviewers on the page.
  const az = -122 * Math.PI / 180, side = 34;
  second.explosion = [-Math.sin(az) * side, Math.cos(az) * side, reviewersLevel * STEP];
  parts.push(second);

  const camera = {azimuth: -122, elevation: 24, roll: 0};
  const result = TechnicalProjection.render(parts, {...options, camera});
  // Extra fields for the site build: it animates assembly by moving whole part groups.
  return {...result, camera, explosions: Object.fromEntries(parts.map(p => [p.id, p.explosion]))};
};
