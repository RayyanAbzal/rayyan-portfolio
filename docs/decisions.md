# Decisions

## 2026-10-12: migrate to Next.js + Tailwind v4 + shadcn/ui

**Decision.** The portfolio moves from static HTML/CSS/JS to Next.js (App Router), Tailwind v4 and shadcn/ui. Ray approved this explicitly, overriding the earlier rule "No frameworks or build tooling unless explicitly requested".

**Why.**
- Reuse components (button, accordion, card, badge, shared nav, footer and booking link) instead of repeating markup on eight pages.
- Ship the better-interface review fixes once, in shared components (focus ring, reduced motion, skip link target, card link names).
- Leave room for app-like features later without another rewrite.

**What stays.** Copy, design tokens, schematics, JSON-LD, SEO and the no-monospace rule are ported verbatim. Reveal motion stays limited to the hero panel and card grids.

**URL redirect decision.** Pages move from `/work.html` style URLs to clean paths (`/work`, `/about`, `/work/:slug`). Every old URL answers with an explicit 301 (`statusCode: 301`, not `permanent`, which would send 308) so search engines transfer ranking. Canonicals, og:url, JSON-LD, sitemap and llms.txt use the clean paths.

**Consequences.**
- Vercel project must use the Next.js framework preset (it was created as a static project). Check before merging to `main`.
- `robots.ts` cannot emit the comments the old robots.txt had; the rules are identical.
- `legacy-static/` existed only until the text diff against the rendered pages passed.

## 2026-10-12: agent readiness (Is Agentic scanner findings)

**Decision.** Fix the scanner findings on the Next.js branch: markdown 404 for `Accept: text/markdown` (status stays 404, HTML keeps the branded page), when-to-use guidance in the generated llms.txt, a ContactPoint on the ProfessionalService node, and trust pages `/contact` and `/privacy` linked from the footer only (top nav and visual design unchanged).

**Why.** The scanner reads the live site, which is still the old static build; these are the gaps it can check mechanically. All guidance, schema and page copy restates existing site copy or states repo facts, so llms.txt, mirrors and pages stay in one typed source (`content/`).

**Open.** `/privacy` is draft text that describes what the code does; Ray reviews before merge. `Vary: Accept` on plain HTML responses is not guaranteed (Next overwrites it on prerendered pages).

## 2026-10-12: privacy wording and reveal failsafe

**Privacy.** /privacy keeps "a booking creates an appointment with me, so I see the details you enter" and "if you email me I receive your message and address and use them to reply". Hosting wording is "my hosting provider, Vercel, may process request data such as IP addresses". Policy links are https://calendly.com/legal/privacy-notice and https://vercel.com/legal/privacy-notice (Ray verified both return 200). The page does not claim Vercel Analytics is cookieless.

**Reveal.** The blanket 1.5s reveal-everything failsafe is replaced by one that reveals only elements within one viewport height; below-the-fold cards animate on scroll. `html.motion-failed` (3s) stays for a failed hydration.

## 2026-10-14: motion pass

Hero entrance is CSS-only (no `.js` gate, no hydration dependency) so the LCP element paints at first frame; the sage panel no longer fades or scales. Grid reveals are 300ms / 12px / blur 4px with a 100ms stagger and a failsafe limited to near-viewport elements. Hover feedback is 150ms or less with a 0.96 press scale on buttons. Nav and footer have view-transition names so they do not flicker on navigation. The FAQ animates open and close through grid-template-rows. The decorative runner no longer re-fires on hover and the status pulse stops after two cycles.

## 2026-10-21: home redesign "Open grid" (N4), animation stack

**Decision.** Rebuild the home page on the N4 direction (large plain headline across a 12-column grid, overlapping paper block with the four client builds, no imagery). Brief: `.impeccable/surfaces/home-n4-brief.md`. Ray chose N4 from `.impeccable/mocks/round5-references.html` and approved the "full skill stack" for motion: GSAP, ScrollTrigger and Lenis (desktop fine-pointer only), installed from npm.

**Overrides.** Lifts CLAUDE.md "no further frameworks or heavy dependencies without asking" for these three packages only, and relaxes "Reveal motion only on card grids; everything else static" to allow masked heading reveals, row rule-ins and the quote reveal below the fold. The hero stays CSS-only, with the headline painted at full opacity on first frame.

**Why.** The previous big-tagline hero read as generic. MengTo/Skills (read as reference, not installed) supplies the grammar and the awwwards build phases.

**Guards.** Reduced motion and touch get native scroll and final states with no animation. No Three.js. No new typeface (Inter Tight only). One gold `.mark` per page. Copy limited to facts already in `content/`.

## 2026-10-23: home "Chalk" palette and flat layout; Lenis, GSAP and HomeMotion dropped

**Decision.** Ray disliked the dark granite look and chose Chalk (option A of `.impeccable/mocks/round7-oklch.html`): light paper ground, deep green accent, a large left headline with lede and CTA on the right, ruled tables for the four builds and three offers, a flat about section and one rounded deep closing band. Tokens in `app/globals.css` are now OKLCH, one hue per ramp (neutrals 95, accent 160). Measured WCAG pairs: ink 16.7:1, ink-2 7.8:1, ink-3 5.5:1, on-fill on pine 7.7:1, pine 7.5:1, gold on deep 12.2:1.

**Reverses.** The 2026-10-21 N4 entry: GSAP, ScrollTrigger, Lenis and `HomeMotion` are removed (`npm uninstall gsap lenis`), so the "no heavy dependencies" rule applies again. `AucklandTime` is removed. Motion is the CSS-only hero entrance plus a hover nudge on build rows. The home quote stays off the page (Ray: quotes read as AI slop); `/about` testimonials are unchanged.

**Why.** Less JS on the LCP path, fewer moving parts for a one-page-per-purpose site, and the table layout reads faster than the overlapping paper block.

**Open.** `--gold` is now a soft green kept under the legacy name, so a rename is a later cleanup. DESIGN.md still describes the older palette and needs a documenter pass.

## 2026-10-24: Interfere dark palette site-wide; home becomes the "Index" layout

**Decision.** Ray picked the Index layout from three variants (Index, Editorial, Ledger) and asked for the dark-mode colour scheme of design.interfere.com. The home page is now a type-only head (up to 7.25rem), a four-column numbered work table, a three-column numbered services table, a two-column about, and one deep band. Tokens in `app/globals.css` keep their legacy names but now hold the Interfere dark neutrals (`#111` ground, `#191919`/`#222`/`#2a2a2a` surfaces, `#eee` ink) and its blue ramp (`pine` `#2870bd`, `pine-2` `#70b8ff`, `deep` `#0d2847`). `color-scheme: dark`; no light theme. Big panels (about principles, CTA panel, case CTA, home close) share `--deep`. Fonts unchanged: Inter Tight only, no monospace.

**Reverses.** The 2026-10-23 Chalk light palette and ruled-row home layout. Home side cards and the secondary hero link are no longer rendered (copy stays in `content/`, so the markdown mirrors and JSON-LD are unchanged).

**Why.** Ray's explicit request in chat. Index reads like a table of contents and fits the "few elements per view" aim.

**Open.** `--gold` is now sky blue (`#70b8ff`) under the legacy name; `.mark` is dark text on it. DESIGN.md and `.impeccable/surfaces/index-html.md` still describe Chalk and need a documenter pass. `public/og.png` is still the light card. Brand fill `pine` is white-on-`#2870bd` (about 5:1); Interfere's own `#0090ff` fails 4.5:1 with white, so the 9 step is not used as a fill.

## 2026-10-24: Interfere dark palette reversed; Index layout stays

**Decision.** Ray reversed the dark palette the same day ("let's stick with our original colour scheme"). Tokens, panel backgrounds and focus rings return to the Chalk values from c2b7385; `color-scheme: light`. The Index home layout (type-only head, numbered work and service columns, two-column about) stays, in Chalk colours. The dark-palette decision entry above is superseded for colour only.

**Why.** Ray's explicit request in chat.

**Open.** None added; the earlier Chalk open items (DESIGN.md, og.png) are unchanged and no longer stale on colour.
