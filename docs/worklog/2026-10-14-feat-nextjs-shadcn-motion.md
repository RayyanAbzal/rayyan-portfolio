# 2026-10-14 feat/nextjs-shadcn: motion pass

Immutable record. Commits: 0b0b1d7 (hero, grids, view transitions, tests), 11de97a (button, hover durations, sticky CTA, runner and pulse), 51fede8 (FAQ).

## Measured (Chrome headless via a throwaway Playwright script, not committed)

- Hero, per-frame sampling from the first frame with all three elements present: opacity 0 at frame 0; h1 and lede reach 1 by about 414ms, actions by about 606ms (headless frame timing is coarse; the CSS timeline is 300 + 200ms delay). Sequence ends under 700ms.
- Grid on /work: children start at opacity 0 and blur(4px); transition-delay 0s, 0.1s, 0.2s; duration 0.3s; properties opacity, transform, filter; will-change drops to auto when the grid is `.done`.
- Reduced motion emulated: no `.js` class, opacity 1 on hero and grid children, no running animations, transition duration 0s. JavaScript disabled: hero and grid opacity 1.
- FAQ: aria-expanded true on the first item at load; Enter and Space toggle; height samples go 71, 72, 94, 110, 120, 122px over about 200ms opening and the reverse closing, with visibility hidden only after collapse.
- Lighthouse (mobile preset, local `next start`): LCP 2.8s, FCP 1.7s, CLS 0, performance 0.95. No before-run was taken, so there is no LCP delta to report.

## Notes

- `@keyframes enter` collided with tw-animate-css, so the computed opacity stayed at 1 until the keyframe was renamed `site-enter`; found by sampling, not by reading CSS.
- Radix leaves `transition-duration: 0s` inline on the accordion content through the first toggle, so the FAQ transition is `!important`.
- tailwind v4 uses the individual `translate` and `scale` properties, so the button transitions those, not `transform`.

## Unverified

- Visual feel (Ray's QA), Safari behaviour of `filter` transitions and grid-template-rows transitions, view-transition behaviour on real navigation.
