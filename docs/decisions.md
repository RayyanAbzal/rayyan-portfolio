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
