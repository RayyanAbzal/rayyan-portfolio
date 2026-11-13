// Concept drawing: my AI harness as a horse in harness. The horse is the model, each piece
// of tack is one layer, I drive, and a footman on the back hands the carriage its jobs. Built per gallop
// phase t in [0, 1) so the site can flip frames. Units are loose cm, Z up, the horse faces +x.
// Only legs, tail, wheel spokes, flag and ground move with t, so every other part draws the
// same in every frame and the build stores it once.
self.DrawingModels ??= {};
self.DrawingModels.harness = (() => {
  const G = TechnicalGeometry;
  const TAU = 2 * Math.PI;
  const disc = (r, turn = 0, n = 40) => Array.from({length: n}, (_, i) => {
    const a = (i + turn) * TAU / n;
    return [r * Math.cos(a), r * Math.sin(a)];
  });
  const unit = v => { const l = Math.hypot(...v); return v.map(x => x / l); };
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const add = (a, b) => a.map((v, i) => v + b[i]);
  const scale = (a, s) => a.map(v => v * s);
  // Frame whose local x runs along `dir`.
  const frameAlong = (dir, origin) => {
    const x = unit(dir);
    const helper = Math.abs(x[2]) > 0.9 ? [0, 1, 0] : [0, 0, 1];
    const y = unit(cross(helper, x));
    return {origin, xAxis: x, yAxis: y, zAxis: cross(x, y)};
  };
  const turned = (part, dir, origin, profile, opts = {}) => {
    const p = G.piece();
    G.lathe(p, profile, {segments: 32, ...opts});
    G.merge(part, G.transform(p, frameAlong(dir, origin)));
  };
  const rod = (part, a, b, r) => {
    const len = Math.hypot(...a.map((v, i) => b[i] - v));
    turned(part, b.map((v, i) => v - a[i]), a, [[0, 0], [0, r], [len, r], [len, 0]]);
  };
  // Tapered limb with rounded ends.
  const limb = (part, a, b, r0, r1) => {
    const len = Math.hypot(...a.map((v, i) => b[i] - v));
    turned(part, b.map((v, i) => v - a[i]), a,
      [[0, 0], [0, r0 * 0.7], [r0 * 0.4, r0], [len - r1 * 0.4, r1], [len, r1 * 0.7], [len, 0]], {creaseAngle: 30});
  };
  const ball = (part, center, r) => turned(part, [0, 0, 1], add(center, [0, 0, -r]),
    Array.from({length: 11}, (_, i) => { const a = i / 10 * Math.PI; return [r - r * Math.cos(a), r * Math.sin(a)]; }), {creaseAngle: 30});
  const block = (part, a, b, radius = 0) => G.box(part, a, b, {radius});
  const down = th => [Math.sin(th), 0, -Math.cos(th)];

  // A seated or standing figure: simple turned limbs, no face.
  function person(part, {hip, seated, hands}) {
    const shoulder = add(hip, [0, 0, 19]);
    turned(part, [0, 0, 1], hip, [[0, 0], [0, 5], [10, 6], [17, 6.4], [19, 4], [19, 0]], {creaseAngle: 25});
    rod(part, add(shoulder, [0, 0, -0.5]), add(shoulder, [0, 0, 2.5]), 1.6);
    ball(part, add(shoulder, [0, 0, 6]), 3.6);
    for (const s of [-1, 1]) {
      const knee = seated ? add(hip, [10, s * 3, 0.5]) : add(hip, [0.5, s * 3, -11]);
      const foot = seated ? add(knee, [2, 0, -9]) : add(knee, [0, 0, -11]);
      limb(part, add(hip, [0, s * 3, 0]), knee, 2.6, 2);
      limb(part, knee, foot, 2, 1.6);
      block(part, add(foot, [-1, -1.4, -1.2]), add(foot, [4, 1.4, 0.4]), 0.5);
      const elbow = add(shoulder, [3, s * 6.2, -9]);
      limb(part, add(shoulder, [0, s * 5.6, -1]), elbow, 1.8, 1.5);
      limb(part, elbow, hands[s < 0 ? 0 : 1], 1.5, 1.2);
    }
  }

  return (parameters = {}, options) => {
    const t = parameters.t ?? 0;
    const withGround = parameters.ground ?? true;
    const parts = [];

    // The model: the horse. Fast and strong, and it will run anywhere.
    const horse = G.part('model', 'Horse · Model', [0, 0, 0]);
    const body = G.piece();
    G.lathe(body, [[0, 0], [1.5, 5.5], [6, 8], [22, 8.4], [28, 6.8], [32, 0]], {segments: 40, creaseAngle: 30});
    G.merge(horse, G.transform(body, frameAlong([1, 0, 0], [-16, 0, 30])));
    const n = [Math.cos(0.9), 0, Math.sin(0.9)];
    const neckBase = [12, 0, 33];
    const poll = add(neckBase, scale(n, 17));
    const face = [Math.cos(-1.0), 0, Math.sin(-1.0)];
    limb(horse, neckBase, poll, 4.6, 3.4);
    limb(horse, poll, add(poll, scale(face, 12)), 3.6, 2.2);
    for (const y of [-1.6, 1.6]) rod(horse, add(poll, [-0.6, y, 2.2]), add(poll, [-1.2, y * 1.2, 5.6]), 0.7);
    // Rotary gallop: each leg swings on its own phase; the knee folds on the forward swing.
    for (const [x, y, phase] of [[11, -4.5, 0], [11, 4.5, 0.12], [-11, -4.5, 0.55], [-11, 4.5, 0.67]]) {
      const a = TAU * (t + phase);
      const swing = 0.55 * Math.sin(a), bend = 0.9 * Math.max(0, Math.cos(a));
      const hip = [x, y, 26];
      const knee = add(hip, scale(down(swing), 12));
      const fetlock = add(knee, scale(down(swing - bend * (x > 0 ? 1 : -0.6)), 11));
      limb(horse, hip, knee, 3, 1.9);
      limb(horse, knee, fetlock, 1.6, 1.3);
      turned(horse, down(swing - bend), fetlock, [[0, 0], [0, 1.6], [2.2, 2], [2.2, 0]]);
    }
    const tailBase = [-15.5, 0, 33], tailAngle = 0.5 + 0.18 * Math.sin(TAU * t);
    const tailMid = add(tailBase, [-Math.sin(tailAngle) * 7, 0, -Math.cos(tailAngle) * 4]);
    limb(horse, tailBase, tailMid, 1.6, 2.4);
    limb(horse, tailMid, add(tailMid, [-3 - 2 * Math.sin(TAU * t), 0, -10]), 2.4, 0.8);
    parts.push(horse);

    // Skills: collar and traces, so the same horse can pull any load.
    const collar = G.part('skills', 'Collar · Skills', [0, 0, 16]);
    const ring = G.piece();
    G.lathe(ring, disc(1.6, 0, 20).map(([x, r]) => [x, r + 6.4]), {segments: 40});
    G.merge(collar, G.transform(ring, frameAlong(n, add(neckBase, scale(n, 3)))));
    for (const y of [-8.8, 8.8]) rod(collar, [14, y, 29], [-36, y, 19], 0.6);
    parts.push(collar);

    // Rules: blinkers keep its eyes on the job.
    const blinkers = G.part('rules', 'Blinkers · Rules', [0, 0, 22]);
    const eye = add(poll, scale(face, 4));
    for (const y of [-4.6, 3.8]) block(blinkers, add(eye, [-3, y, -2]), add(eye, [3, y + 0.8, 3]), 0.3);
    parts.push(blinkers);

    // Memory: the saddlebag it carries from trip to trip.
    const bag = G.part('memory', 'Saddlebag · Memory', [0, 0, 18]);
    block(bag, [-8, -10.6, 24], [4, -8.6, 33], 0.8);
    block(bag, [-8, -9, 37.6], [4, 9, 38.8], 0.5);
    parts.push(bag);

    // Guardrails: bit and reins, running back to the driver's hands on the box seat.
    const hands = [[-33, -4, 41], [-33, 4, 41]];
    const reins = G.part('hooks', 'Reins · Guardrails', [0, 0, 30]);
    const mouth = add(poll, scale(face, 10));
    rod(reins, add(mouth, [0, -3, 0]), add(mouth, [0, 3, 0]), 0.6);
    for (const [i, y] of [[0, -3], [1, 3]]) rod(reins, add(mouth, [0, y, 0]), hands[i], 0.4);
    parts.push(reins);

    // Goal runner: the carriage. The cabin carries the job and it keeps rolling until it is delivered.
    const coach = G.part('runner', 'Carriage · Goal runner', [-14, 0, 0]);
    // Cabin, roof and a window on the near side.
    block(coach, [-82, -11, 15], [-54, 11, 40], 2);
    block(coach, [-84, -12.5, 40], [-52, 12.5, 42.5], 1);
    block(coach, [-76, -11.5, 27], [-60, -11, 36], 0.2);
    // Job tickets on the door, under the window.
    for (const x of [-74, -69, -64]) block(coach, [x, -11.6, 18], [x + 3.5, -11.1, 24]);
    // Box seat up front, on its riser, with a footboard.
    block(coach, [-52, -8, 13], [-44, 8, 28], 1);
    block(coach, [-53, -9, 28], [-41, 9, 31], 1);
    block(coach, [-38, -9, 19], [-33, 9, 20.5], 0.5);
    rod(coach, [-44, 0, 20], [-37, 0, 20], 0.8);
    // Rear step for the footman, on two brackets off the cabin.
    block(coach, [-94, -9, 5.5], [-82, 9, 7.5], 0.6);
    for (const y of [-7, 7]) block(coach, [-84, y - 1, 7.5], [-82, y + 1, 16], 0.4);
    // Perch: the beam that joins the two axles.
    block(coach, [-80, -1.5, 9.5], [-40, 1.5, 12.5], 0.5);
    // Small front wheels, big rear wheels. Six spokes repeat every sixth of a turn,
    // so one stride turns each wheel that far and the loop stays seamless.
    for (const [x, r] of [[-42, 8], [-72, 11]]) {
      for (const y of [-15.5, 13.9]) {
        const wheel = G.piece();
        G.extrude(wheel, disc(r, 0, 40), {depth: 1.6, holes: [disc(r - 1.2, 0.5, 40)]});
        G.merge(coach, G.transform(wheel, {origin: [x, y, r], xAxis: [1, 0, 0], yAxis: [0, 0, 1], zAxis: [0, -1, 0]}));
        const hubY = y - 0.8;
        turned(coach, [0, 1, 0], [x, hubY - 1, r], [[0, 0], [0, 1.6], [3.6, 1.6], [3.6, 0]]);
        for (let k = 0; k < 6; k++) {
          const a = k * TAU / 6 - t * TAU / 6, dir = [Math.cos(a), 0, Math.sin(a)];
          rod(coach, add([x, hubY, r], scale(dir, 1.5)), add([x, hubY, r], scale(dir, r - 1.1)), 0.45);
        }
      }
      rod(coach, [x, -14, r], [x, 13, r], 0.9);
    }
    parts.push(coach);

    // Me: the driver on the box seat, who sets where it goes.
    const driver = G.part('me', 'Driver · Me', [-14, 0, 34]);
    person(driver, {hip: [-47, 0, 32], seated: true, hands});
    parts.push(driver);

    // The orchestrator: a footman riding the rear step with the job list.
    const footman = G.part('orchestrator', 'Footman · Orchestrator', [-16, 0, 20]);
    const board = [-88, -7, 37];
    person(footman, {hip: [-88, 0, 29.5], seated: false, hands: [add(board, [0, -3, -1]), add(board, [0, 3, -1])]});
    block(footman, add(board, [0, -4, -2]), add(board, [0.6, 4, 8]), 0.25);
    parts.push(footman);

    // Reviewers: the inspection gate every load passes under.
    const gate = G.part('reviewers', 'Gate · Reviewers', [16, 0, 0]);
    for (const y of [-20, 20]) {
      block(gate, [46, y - 1.5, 0], [49, y + 1.5, 62], 0.6);
      block(gate, [45, y - 2.5, 0], [50, y + 2.5, 2], 0.5);
    }
    block(gate, [45.5, -23, 62], [49.5, 23, 66], 0.8);
    block(gate, [46.5, -9, 66], [48.5, 9, 73], 0.6);
    parts.push(gate);

    // Second opinion: an inspector's flag from another stable, beside the gate.
    const flag = G.part('second', 'Outside flag · Second opinion', [26, 0, 22]);
    rod(flag, [60, -30, 0], [60, -30, 72], 0.7);
    turned(flag, [0, 0, 1], [60, -30, 0], [[0, 0], [0, 4], [1, 4], [1, 0]]);
    const cloth = G.piece(), wave = 0.8 * Math.sin(TAU * t);
    G.extrude(cloth, [[0, 0], [12, 1 + wave], [12, 9 + wave], [0, 8]], {depth: 0.3});
    G.merge(flag, G.transform(cloth, {origin: [60, -30, 63], xAxis: [1, 0, 0], yAxis: [0, 0, 1], zAxis: [0, -1, 0]}));
    parts.push(flag);

    // Ground: two lanes of dashes that slide back one dash period per stride.
    if (withGround) {
      const ground = G.part('ground', 'Ground', [0, 0, 0]);
      for (const y of [-26, 24]) for (let x = -120; x < 84; x += 12) {
        const x0 = x - 12 * t;
        block(ground, [x0, y, 0], [x0 + 5, y + 0.6, 0.15]);
      }
      parts.push(ground);
    }

    const camera = {azimuth: -108, elevation: 16, roll: 0};
    const result = TechnicalProjection.render(parts, {...options, camera});
    return {...result, camera, explosions: Object.fromEntries(parts.map(p => [p.id, p.explosion]))};
  };
})();
