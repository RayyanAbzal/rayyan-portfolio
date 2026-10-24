# feat/home-open-grid - 2026-10-23

**As of:** a794314 + uncommitted work, committed at end of session; PR #2 (draft)

## What this branch is doing
Home redesign: Chalk OKLCH palette, flat table layout (supersedes the N4 granite split).

## Done on this branch
- app/globals.css: Chalk palette in OKLCH (neutrals hue 95, accent hue 160), shadcn mapping, pine focus ring
- app/page.tsx + app/styles/home.css: headline/lede hero, ruled builds and offers tables, flat about, deep closing band
- components/ui/button.tsx: default pine fill, `gold` variant is the inverse for deep bands
- layout/about/cards/case/sections css, badge: retuned for light tokens
- Removed HomeMotion, AucklandTime, Lenis/GSAP usage; CSS-only hero entrance kept
- docs/decisions.md entry; CLAUDE.md home line and bg token
- Checked: tsc, lint, vitest 47/47, build; headless-Chrome screenshots of /, /work/feedhack, /about at 1440 and 390 look right

## Next on this branch
Draft PR open. Remaining: DESIGN.md documenter pass, better-interface pass, FAQ keyboard walk, iOS Safari and forced-colors, pine-hover gamut measure, review of /contact and /privacy on light tokens.

## Decisions made here
- Chalk (option A) chosen over granite, midnight, clay, fog -> D 2026-10-23 in docs/decisions.md
- Lenis, GSAP, HomeMotion dropped -> D 2026-10-23 in docs/decisions.md
- Leave `.claude/`, `skills-lock.json`, `.impeccable/build`, `.impeccable/mocks` uncommitted (local)

## Gotchas hit
- Headless Chrome clamps window width to about 500px; use a 390px iframe in a local HTML file for mobile shots.
- Mid-animation screenshots show the hero faded; use --virtual-time-budget.

## Constraints stated
- No quotes on the home page (read as AI slop)
- Inter Tight only, no photo, no Three.js
- Use the jakub better-* skills and OKLCH while designing; UI skills fire automatically
- Do not invent copy (no "you own the code", "48 hours" on home, FeedHack figures)
