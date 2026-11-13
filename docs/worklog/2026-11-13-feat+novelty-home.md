# feat/novelty-home - 2026-11-13

**As of:** 0bcd5b7 (stacked on feat/harness-page)

## What this branch is doing
Ports the novelty mock (`.impeccable/mocks/novelty/`) to the real site: new zero-chroma tokens with a dark scheme, and a home rebuilt around three novelties (teardown hero, exploded client work, living offers).

## Done on this branch
- app/globals.css: mock tokens light and dark; legacy names alias them; new `--panel/--on-panel` so feature panels stay dark in both schemes; `--pine-2` now `--tint-ink` (was a 14% alpha line, unreadable as text); ink-3 0.53 (mock 0.56 failed AA at 4.48:1)
- app/styles/{about,case,home,sections}.css: panels use `--panel`; CTA text follows `--on-panel`
- app/styles/harness.css: selected-part and hover selectors shared with the home hero (`.td-stage`)
- app/styles/novelty.css: home layout, hero, exploded stack, offer scenes, quotes, closing row
- components/home/*: TeardownHero (spring, drag, slider, auto-open), ExplodedWork, LivingOffers, AucklandClock
- content/home-novelty.ts: hero, plate and scene copy
- components/ui/button.tsx: 10px radius, press 0.97, inverse variant on panels
- CLAUDE.md, DESIGN.md, .impeccable/design.json: tokens, motion, file list

## Next on this branch
Draft PR open against feat/harness-page; Ray reviews the home in light and dark.

## Decisions made here
- Feature panels dark in both schemes, not flipped with ink (a white slab in dark looked broken) (local)
- Offers play one pass, then rest (WCAG 2.2.2, no endless loop) (local)
- Hero piece facts stay pointer-only on home; the idle card points to How I build for the full list (local)

## Gotchas hit
- A global `.lede` and `footer` rule leaked into the home; scoped resets in novelty.css
- Synthetic pointerdown in DevTools throws on setPointerCapture; guarded with try/catch
- Contrast scan via same-origin iframes caught legacy alpha tokens used as text colours

## Constraints stated
- Use the mock's styles and colours plus the Jakub skills
- Wanted the teardown, exploded and live demo novelties on the real home
- No em dashes, no monospace, no et-cetera in lists; motion only under no-preference
