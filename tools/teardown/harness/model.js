// Concept drawing of the agent harness: the model is a core, and every other layer is
// a ring around it, innermost first. Assembled, the rings step down from the core like
// a tiered cake. Exploded, each piece lifts just clear of the one outside it.
// Runs in the teardown worker (self.DrawingModels) and in Node via vm (build.cjs).
self.DrawingModels ??= {};
self.DrawingModels.harness = (parameters, options) => {
  const G = TechnicalGeometry;
  const CORE = 12, WALL = 4.5, GAP = 1;
  // Air between exploded pieces.
  const CLEAR = Number.isFinite(parameters.clear) ? parameters.clear : 4;

  // A hole turned half a segment off its ring keeps the bridged cap triangulation clean.
  const disc = (r, turn = 0, n = 72) => Array.from({length: n}, (_, i) => {
    const angle = (i + turn) * 2 * Math.PI / n;
    return [r * Math.cos(angle), r * Math.sin(angle)];
  });

  // Inside out, core first. Each step is shorter than the one inside it.
  const pieces = [
    ['model', 'Model', 22],
    ['memory', 'Memory', 19],
    ['rules', 'Rules', 16],
    ['skills', 'Skills', 13],
    ['hooks', 'Guardrails', 10],
    ['reviewers', 'Reviewers', 7],
    ['second', 'Second opinion', 4.5],
    ['runner', 'Goal runner', 2.5],
  ];

  const parts = pieces.map(([id, name, height], index) => {
    const part = G.part(id, name);
    const solid = G.piece();
    if (index === 0) {
      G.extrude(solid, disc(CORE), {depth: height});
    } else {
      const inner = CORE + GAP + (index - 1) * (WALL + GAP);
      G.extrude(solid, disc(inner + WALL), {depth: height, holes: [disc(inner, 0.5)]});
    }
    G.merge(part, solid);
    part.height = height;
    return part;
  });

  // Outermost stays on the ground; each piece inside sits just above the one outside it.
  let lift = 0;
  for (let index = parts.length - 1; index >= 0; index--) {
    parts[index].explosion = [0, 0, lift];
    lift += parts[index].height + CLEAR;
  }

  const camera = {azimuth: -122, elevation: 20, roll: 0};
  const result = TechnicalProjection.render(parts, {...options, camera});
  // Extra fields for the site build: it slides whole part groups between the two states.
  return {...result, camera, explosions: Object.fromEntries(parts.map(p => [p.id, p.explosion]))};
};
