# feat/novelty-home - 2026-11-13 (second session)

**As of:** d978bbc + PR #4

## What this branch is doing
Restyles the site after the astapable reference (grotesk direction) and rebuilds the home landing around a large, annotated harness drawing.

## Done on this branch
- app/page.tsx: hero is one column: status chip, big headline, soft lede, CTAs, then the teardown drawing full width
- app/styles/novelty.css: hero headline 600 at up to 64px, -0.035em; drawing on a sunken 24px plate, labels shown, edge to edge below 760px; home rows single column with pale centred titles; 4px chips; bigger quotes and closing title
- components/sharpen.tsx + app/layout.tsx + app/styles/motion.css: section titles and home rows sharpen from a blur on first scroll-in; clears the motion failsafe
- app/globals.css: bg 0.988, `.display` weight 600
- CLAUDE.md, DESIGN.md: type, motion and home description updated

## Next on this branch
Ray reviews PR #4; better-interface and web-design-guidelines pass on the new hero still to run.

## Decisions made here
- Grotesk (astapable) direction over serif (refined); no font change (local)
- Landing structure: Stacked, picked over Split (labels shrink to about 7px), Centred (generic) and Drawing first (pushes the call below the fold) (local)
- Blur-in motion now on every `main h2`, an exception to the old "Reveal only on card grids" rule (local, recorded in CLAUDE.md)

## Gotchas hit
- next/font/google in a client component imported by app/page.tsx breaks vitest collection ("Halant is not a function")
- harness.css hides exploded labels with opacity 0 outside the /harness explorer; the home override needs `g[data-state="exploded"] .harness-labels { opacity: 1 }`
- Setting a font-size on SVG label text scales in viewBox units, not px

## Constraints stated
- No em dashes, no monospace, no et-cetera in lists, plain outcome-first copy
- Ask before replacing factual copy or adding claims
- No employer, client or repo names on /harness
- Never push or merge to main
