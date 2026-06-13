# WORKLOG

**Updated:** 2026-06-13

## Active task

Section spacing fix + pipeline card visibility bug on `feat/section-clarity`.

## Phase

debugging

## Files changed this session

- `index.html` - FAQ: removed Q/A prefix labels, removed numbered spans, replaced + SVG toggle with chevron-down SVG
- `styles.css` - FAQ: simplified grid to 1fr/auto, stripped toggle box border, chevron rotates 180deg on open (spring easing), answer gets pine left-border accent, removed Q/A ::before pseudo-elements; section spacing increased; `.wrap` changed from `padding: 0 var(--pad)` to longhand horizontal-only so `section { padding-bottom }` is no longer overridden by the higher-specificity class selector
- `js/motion.js` - Pre-registered `.pipeline` hook in the first IIFE before the reveals loop to fix a race condition where scroll restoration could put the pipeline in the initial viewport, causing `revealEl` to fire synchronously with empty `revealHooks` and `.run` never being added (steps permanently invisible)

## Next step

Ray reviews: (1) section spacing between all sections looks correct, (2) Process pipeline cards are visible on load/refresh. If both good: `git checkout main && git merge feat/section-clarity && git push origin main`

## Open questions

- None blocking

## Key decisions

- `.wrap { padding: 0 var(--pad) }` was silently zeroing section `padding-bottom` - split to longhand to unblock the section spacing rule
- motion.js race condition: `defer`-loaded scripts + browser scroll restoration can put elements in the initial viewport before the second IIFE registers hooks; fix is pre-registration before the reveals loop
- FAQ redesign: Option A (clean, no labels, no numbers, pine chevron, pine left-border on open answer)
