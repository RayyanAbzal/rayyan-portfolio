# feat/harness-page - 2026-11-13

**As of:** 80bae5e + PR #3 (draft, base feat/home-open-grid)

## What this branch is doing
/harness: a teardown drawing of my AI harness as a horse and open carriage, with layer list, numbers, change log and principles.

## Done on this branch
- tools/teardown/harness/model.js: horse, tack layers, open carriage, coachman (orchestrator, top hat, whip) holding the reins, me as passenger with a route card facing the reader; gallop phase t; cast studies removed
- tools/teardown/harness/build.cjs: renders content/harness/drawing.ts (~340 KB) and public/harness/gallop.json (1.07 MB, 294 KB gzip); computes the assembled zoom
- components/harness/harness-drawing.tsx, harness-explorer.tsx: server SVG, view toggle, run button, lazy gallop frames, sticky detail card
- app/styles/harness.css: full-width stage, 2-column panel, zoom and gallop motion, run button press scale 0.96
- content/harness.ts: copy for the passenger cast; "four tiers" removed from the Model entry
- CLAUDE.md: files table and motion notes describe the carriage drawing

## Next on this branch
Run the UI review chain on PR #3, fix or refute findings, then mark ready. Merge order: #1, #2, then #3 (Ray merges).

## Decisions made here
- Orchestrator drives, I ride as passenger: matches "I set the goal through plan to goals, the orchestrator handles it from there". Fable advised passenger over starter/gate/driver; flip to starter if the page message becomes "runs unattended" (local)
- One green figure only; my final yes lives in the copy, not a second figure at the gate (local)
- PR based on feat/home-open-grid, not main: branch is stacked on #2 and #1 (local)

## Gotchas hit
- `rtk npm run drawing:harness` prints only a stack trace; run `node tools/teardown/harness/build.cjs` directly
- geometry.js "Corner radius exceeds profile": block radius must be under half its thinnest side
- drawing.ts labels are uppercase: grep case-insensitive when checking for stale names
- next build rewrites tsconfig.json: `git checkout tsconfig.json` after

## Constraints stated
- No employer, client or repo names on /harness; high level only (no rule text, hook names, prompts, thresholds, paths, model routing)
- No em dashes, no monospace, no "etc." in lists; plain outcome-first copy
- Motion only inside prefers-reduced-motion: no-preference, transform/opacity/filter
- Never hand-edit content/harness/drawing.ts
- Use emil-design-eng where motion is involved
