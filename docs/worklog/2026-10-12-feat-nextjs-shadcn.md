# 2026-10-12 feat/nextjs-shadcn

Session: static site to Next.js + Tailwind v4 + shadcn/ui (approved by Ray, docs/decisions.md). Immutable record; current state lives in WORKLOG.md and `gh pr list`.

## Done

1. Scaffold: legacy files moved to `legacy-static/`, Next 16 app router, Tailwind via `@tailwindcss/postcss`, shadcn init (radix), Inter Tight through `next/font/local`, 301 redirect map, ignore files.
2. Theme: tokens into `:root` + `@theme inline` + shadcn variables; rem font sizes; review fixes in CSS.
3. shadcn button, accordion, card, badge, separator; shell, booking link, sticky CTA, Calendly loader, Reveal.
4. Home page and schematics. 5. Work, about, not-found. 6. Case studies via `[slug]`.
7. Motion lives in `components/reveal.tsx` and `app/styles/motion.css`.
8. Review fixes landed inside steps 2 to 6; checked at 320, 390 and 1280 px with a throwaway Playwright script (no horizontal overflow, nav pills one line, anchor heading below nav).
9. sitemap, robots, llms.txt, vitest. A security review fix (`fix(book): encode utm_content`) was added mid-session.
10. Docs: CLAUDE.md, DESIGN.md, PRODUCT.md, WORKLOG.md, decisions.md.
11. Text diff of rendered pages against legacy HTML, then `legacy-static/` removed.

## Decisions on judgment

- Disabled the scaffold's `cacheComponents` and `partialPrefetching` (no benefit for a static site; they change route-config rules and use Activity).
- Reveal limited to hero and card grids per the project rule (legacy also revealed steps, quotes, side cards, case blocks).
- Closed FAQ answers are force-mounted so the text stays in the HTML.
- Hidden legacy-only text (case block labels, title dot) not ported.
