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
