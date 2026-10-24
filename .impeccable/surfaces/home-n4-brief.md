# Home: art-direction brief N4 "Open grid" (awwwards-skill phase 1, draft)

Sources: MengTo/Skills `build-awwwards-quality-sites` (phases), `agency-grid-layout-minimal` (grammar), `editorial-portfolio-chapters` (work before studio, motion timings). Read as reference only, not installed. Ray picked N4 on 2026-10-21 (mock: `.impeccable/mocks/round5-references.html`).

## Visual thesis
A quiet, expensive page that treats the work as the content. One very large plain headline across most of a 12-column grid, a narrow side column of small copy, and a lower off-white block that overlaps the hero and holds the four client builds as ruled columns. No cards, no slogan, no imagery. Open space is left open.

## Extra references (Ray, 2026-10-21; shadcnblocks pages read as text only, rendering unseen)
- portfolio-page3: borrow numbered project rows, a live Auckland local-time label in the side column (a true detail only this site can claim), and a faded oversized wordmark in the footer. Skip the photo panel and tools-percentage grid (no photo, invented usage figures).
- feature387 (project wheel): skip. Needs a square image per project (none exist), is a Pro block (licence), and spinning gimmick fights the calm brief. Revisit only if Ray supplies real project images.

## Hero focal asset
Authored type only. The headline is a plain description of the job, not a slogan (Ray rejected "I build AI that runs your business." as slop). Candidate, to confirm with Ray: "Software that takes manual work off small teams." Side column: location label plus one factual sentence from `content/home.ts` (one person, end to end, from Auckland). The headline is the LCP element and paints at full opacity on first frame with no JS, no motion, no WebGL. It is never masked or delayed.

## Type hierarchy
Inter Tight only (DESIGN.md unchanged; no second face needed). Display: 500 weight, tracking about -0.055em, clamp(2.6rem, 7vw, 6.4rem), deliberate line breaks. Labels: 12px uppercase, 0.12em tracking, sans (no monospace anywhere). Body: 16 to 17px, calm. Tabular numerals for any figure.

## Colour system
Existing tokens, no new hue. Ground `--bg #f5f3ee` (the mock's cooler grey is dropped). Lower overlap block `--paper #fffdf9`, 1px `--line` separators. Ink `#17150f`. Pine `#1f3d2b` for the single CTA fill. Gold stays the one `.mark` per page, used once in the hero headline or the quote, not both. The sage hero panel is retired on home.

## Section sequence
1. Hero: desktop (>=1024px) headline across cols 1 to 9, side column cols 10 to 12, nav above. Tablet: headline cols 1 to 12, side copy below in 2 columns. Mobile: single column, headline then side copy then overlap block.
2. Overlap block: the four `CLIENT_PROJECTS` (verified: exactly four, each with slug and title) as ruled columns: four-up desktop, two-up tablet, stacked mobile. Name, title, link to `/work/<slug>`. No invented durations; use only facts in `content/`.
3. What I build: three service rows from `OFFERS`, one row per entry (title, body, `duration`: "1 to 3 weeks", "2 to 4 weeks", "4 to 8 weeks"; `price`: "Fixed price" as a separate small label), tiny labels, strong titles, hover shift.
4. The one client quote (Agency Director, Influence v2, Malta), set large, white space around it.
5. Who builds it: aboutBig sentence plus link.
6. Book: one pine `#1f3d2b` button (existing Button component), small uppercase label. The skill's gradient-border shell is dropped: it needs unspecified colours and risks a second hue.

## Motion narrative
GSAP + ScrollTrigger (Ray: full stack; npm packages, not CDN). Hero is CSS-only so nothing waits on hydration: headline static; side copy and the overlap block enter with the existing `site-enter` keyframe (opacity, 12px rise, 300ms); column rules draw left to right in CSS. GSAP never touches hero nodes, so nothing animates twice. Masked line-then-word reveals (60ms stagger, 500 to 700ms) apply to below-fold section headings and the quote only, split once, with `CustomEase.create("site", ".22,.61,.36,1")` (GSAP does not accept a CSS cubic-bezier string). Service rows rule in on scroll, 45 to 70ms stagger. Quote lines reveal once. Hover: 160 to 220ms, rows shift 4px. Parallax under 5% if used at all. No scroll hijack. Controls stay under 220ms.

Pinned scrub: none in this direction. N4 is calm; pinning would fight it. Ray can ask for it later.

## Smooth-scroll engine
Skill requires exactly one engine at a time. Choice (Ray, 2026-10-21): Lenis on fine-pointer desktop only, low lerp; native scroll under `prefers-reduced-motion` and on touch (no second engine runs there). Lenis drives ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)` and `gsap.ticker.add`. Anchor links and the skip link go through `lenis.scrollTo` and still move focus. Keyboard walk is a pre-PR gate. I advised against smooth-scroll; it ships behind one flag so it can be dropped without touching the rest.

## Three.js decision
Skip. Nothing in N4 needs it. Skill calls ornamental shaders an anti-pattern.

## Asset provenance
No raster assets. No photo (none confirmed), no client screenshots, no CSS-drawn fake dashboards on the hero. Existing `components/schematics` stay on `/work` cards only. og.png unchanged.

## Accessibility and fallback rules
Complete static first frame without JS. Reduced motion renders final states immediately (no transition, no stagger). Split text keeps one accessible name (aria-label on the heading, split spans aria-hidden). ScrollTrigger and Lenis cleaned up on unmount. Skip link, `aria-current`, focus rings unchanged. One h1.

## Validation checklist (before PR)
Production build; desktop and mobile; keyboard walk; reduced-motion; one scroll engine only; no leftover placeholders or unsupported claims; Lighthouse LCP not worse than current (hero entrance must not wait on hydration, so masked reveal starts from CSS and GSAP only enhances); never claim "award-winning".

## Conflicts with repo rules (need logging in docs/decisions.md at build start)
- CLAUDE.md "Add no further frameworks or heavy dependencies without asking": GSAP, ScrollTrigger, Lenis. Ray approved "full skill stack" on 2026-10-21.
- CLAUDE.md "Reveal (JS) motion only on the card grids; everything else static": this brief reveals hero, rows and quote. Needs the rule rewritten.
- DESIGN.md describes the sage panel and old home; update via documenter after build.

## Open before build
- Hero headline wording (candidate above) and side sentence: Ray to confirm.
- "you own the code", "48 hours", FeedHack figures: not used in this brief; add only if Ray confirms.
- Project years/durations: not used.
- Decided in this brief: offers, quote and about stay separate sections in the order above.

## Cross-review (xmodel docs-review, grok-4.7-high, 2026-10-21)
Nine findings. Eight confirmed against the brief and fixed above (hero first-frame and LCP contradiction, no mobile layout, OFFERS durations misquoted, gradient shell, GSAP ease, Lenis vs no-hijack and single-engine rule, Lenis approval wording, offers/about IA contradiction). One refuted: overlap block assumed an uncertain project count; `content/projects.ts` has exactly four `CLIENT_PROJECTS`.
