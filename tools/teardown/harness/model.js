// Concept drawing of the agent harness as a water-filter cartridge, standing on z.
// Work enters at the inlet cap and passes down through every stage to the sediment bowl.
// Runs in the teardown worker (self.DrawingModels) and in Node via vm (build.cjs).
self.DrawingModels ??= {};
self.DrawingModels.harness = (parameters, options) => {
  const G = TechnicalGeometry;
  const R = 30;                       // cartridge radius, concept millimetres
  const LIFT = 0.04;                  // feature lines sit just proud of their surface
  const STEP = Number.isFinite(parameters.step) ? parameters.step : 30;
  const camera = {azimuth: -118, elevation: 22, roll: 0};
  const az = camera.azimuth * Math.PI / 180;
  const right = [-Math.sin(az), Math.cos(az), 0];       // camera right, for side modules
  const toward = [Math.cos(az), Math.sin(az), 0];       // horizontal direction of the viewer
  const scale = (v, k) => v.map(n => n * k);
  const turn = (z, angle, r) => [r * Math.cos(angle), r * Math.sin(angle), z];

  // Turned body on the world z axis through (cx, cy).
  const zLathe = (part, profile, {at = [0, 0, 0], ...o} = {}) => G.lathe(part, profile, {axis: 'z', at, creaseAngle: 20, ...o});
  const zRing = (part, z, r, role = 'detail', c = [0, 0]) => G.circle(part, [c[0], c[1], z], r, [0, 0, 1], {role});

  const parts = [];
  const add = (id, name, build, explosion) => {
    const part = G.part(id, name);
    build(part);
    part.explosion = explosion;
    parts.push(part);
    return part;
  };

  // Stacking order, bottom to top. Each level lifts by STEP on top of the gap it needs.
  const lift = level => [0, 0, level * STEP];

  // 1. Sediment bowl (Memory): a cup open to the top that keeps what the stages caught.
  add('memory', 'Memory', p => {
    zLathe(p, [[0, 0], [0, 24], [3, 28.5], [8, R], [24, R], [24, R - 2], [8, R - 2.4], [4.5, 24], [4.5, 0]]);
    const nub = G.piece();
    zLathe(nub, [[-4, 0], [-4, 4], [0.3, 4], [0.3, 0]]);
    G.merge(p, nub);
    for (const z of [11, 14, 17, 20]) zRing(p, z, R + LIFT, 'texture');
    zRing(p, 13, R - 2.4 - LIFT, 'detail');           // fill line inside the bowl
  }, lift(0));

  // 2. Pleated media (Reviewers): many folds, each one a separate pass over the same water.
  const PLEATS = 44;
  add('reviewers', 'Reviewers', p => {
    const z0 = 26, z1 = 58;
    const star = z => Array.from({length: PLEATS * 2}, (_, i) => turn(z, i * Math.PI / PLEATS, i % 2 ? R - 5.5 : R - 2.5));
    G.loft(p, [star(z0 + 2), star(z1 - 2)], {lines: 'none'});
    for (let i = 0; i < PLEATS * 2; i += 2) G.line(p, turn(z0 + 2, i * Math.PI / PLEATS, R - 2.5 + LIFT), turn(z1 - 2, i * Math.PI / PLEATS, R - 2.5 + LIFT), 'detail');
    for (const [a, b] of [[z0, z0 + 2], [z1 - 2, z1]]) {
      const cap = G.piece();
      zLathe(cap, [[a, 12], [a, R - 1.5], [b, R - 1.5], [b, 12]]);
      G.merge(p, cap);
    }
  }, lift(1));

  // 3. Core tube (Model): the perforated spine in three hole sizes, one per model tier.
  //    Pulled out sideways so it clears the media it sits inside.
  add('model', 'Model', p => {
    zLathe(p, [[24, 6.5], [24, 9], [60, 9], [60, 6.5]]);
    const bands = [[30, 1.5], [41, 1.1], [52, 0.75]];
    for (const [z, r] of bands) for (let row = 0; row < 3; row++) for (let k = 0; k < 12; k++) {
      const a = (k + row * 0.5) * Math.PI / 6;
      G.circle(p, turn(z + row * 3, a, 9 + LIFT), r, [Math.cos(a), Math.sin(a), 0], {role: 'detail', segments: 24});
    }
  }, [...scale(right, -50).slice(0, 2), STEP]);

  // 4. Carbon block (Second opinion): a different medium, docked beside the pleats.
  add('second', 'Second opinion', p => {
    const c = scale(right, R + 11.5);
    zLathe(p, [[30, 3], [30, 10.5], [32, 10.5], [32, 9.5], [52, 9.5], [52, 10.5], [54, 10.5], [54, 3]], {at: [c[0], c[1], 0]});
    for (let z = 35; z < 51; z += 3) zRing(p, z, 9.5 + LIFT, 'texture', c);
  }, [...scale(right, 34).slice(0, 2), STEP]);

  // 5. Insert sleeves (Skills): three swappable collars, one per job.
  add('skills', 'Skills', p => {
    for (const z of [59, 62, 65]) {
      const sleeve = G.piece();
      zLathe(sleeve, [[z, 20], [z, R - 1.5], [z + 2, R - 1.5], [z + 2, 20]]);
      G.merge(p, sleeve);
      for (let k = 0; k < 8; k++) {
        const a = (k + 0.5) * Math.PI / 4;
        G.line(p, turn(z + 2 + LIFT, a, 21.5), turn(z + 2 + LIFT, a, R - 3), 'texture');
      }
    }
  }, lift(2));

  // 6. Mesh pre-filter (Rules): the first screen everything passes through.
  add('rules', 'Rules', p => {
    const z0 = 68, z1 = 70;
    zLathe(p, [[z0, 0], [z0, R - 1.5], [z1, R - 1.5], [z1, 0]]);
    const top = z1 + LIFT, r = R - 4;
    zRing(p, top, r, 'detail');
    for (let s = -r + 3; s < r; s += 3.5) {
      const h = Math.sqrt(r * r - s * s);
      G.line(p, [s, -h, top], [s, h, top], 'texture');
      G.line(p, [-h, s, top], [h, s, top], 'texture');
    }
  }, lift(3));

  // 7. Inlet cap (Goal runner): where work enters, threaded port on top.
  const capTop = 82;
  add('runner', 'Goal runner', p => {
    zLathe(p, [[70.4, 0], [70.4, R + 0.5], [78, R + 0.5], [80, 27], [82, 15], [capTop, 8.5], [94, 8.5], [94, 6], [capTop - 1, 6], [capTop - 1, 0]]);
    const thread = G.piece();
    G.helix(thread, {x0: capTop + 1, x1: 93, radius: 8.5 + LIFT, pitch: 2.2});
    G.transform(thread, {origin: [0, 0, 0], ...G.along('z')});
    G.merge(p, thread);
    for (let k = 0; k < 36; k++) {
      const a = k * Math.PI / 18;
      G.line(p, turn(71.5, a, R + 0.5 + LIFT), turn(77, a, R + 0.5 + LIFT), 'texture');
    }
  }, lift(4));

  // 8. Pressure-relief valve (Guardrails): sits on the cap and vents before anything bursts.
  // Left of the port in view, so the assembled valve never overlaps the threaded port.
  const valveAt = [...scale(right, -19).slice(0, 2), 81];
  add('hooks', 'Guardrails', p => {
    zLathe(p, [[-1.5, 0], [-1.5, 4], [2.5, 4], [2.5, 6.5, 'h'], [6, 6.5, 'h'], [6, 4.2], [10, 4.2], [10, 2.6], [14, 2.6], [14, 0]], {at: valveAt, segments: 144});
  }, [0, 0, 4 * STEP + 26]);

  const result = TechnicalProjection.render(parts, {...options, camera});
  // Extra fields for the site build: it animates assembly by moving whole part groups.
  return {...result, camera, explosions: Object.fromEntries(parts.map(p => [p.id, p.explosion]))};
};
