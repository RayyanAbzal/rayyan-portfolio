# 2026-10-12 feat/nextjs-shadcn: pre-merge decisions

Immutable record. Ray's five settled items:

1. Card lines: `.card .card-outcome` (pine-2, computed rgb(47, 94, 62), 15px) and `.card .card-stackline` (ink-3) now beat `.card p`. The stylesheet intended ink-3 for the stack line; only the outcome line is pine-2.
2. Reveal failsafe limited to within one viewport height (`components/reveal.tsx`). Checked with Chrome: /work personal grid (2076px down) stays `reveal` after 2s and becomes `in` after scrolling to it; the home card grid, already near the viewport, is `done`.
3. FAQPage JSON-LD built by `lib/jsonld.ts` from `FAQ_ITEMS`; `content/jsonld/about-faq.json` deleted; test asserts answers equal the visible text.
4. llms.txt gained `## Stack` and `## FAQ` (generated). `/about.md` already carried both.
5. /privacy wording and policy URLs updated.

Unverified: visual QA, the Reveal failsafe on slow devices, policy URLs beyond Ray's check.
