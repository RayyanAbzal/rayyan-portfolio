# feat/harness-page - 2026-11-12

**As of:** 16fe737 (no PR yet; base is feat/home-open-grid, draft PR #2)

## What this branch is doing
Adds /harness: a teardown drawing of my AI harness (exploded/assembled, clickable layers), numbers, dated change log, principles, plus a home teaser.

## Done on this branch
- content/harness.ts: copy, 8 layers, 4 stats, 10 dated changes, 4 principles
- tools/teardown/ (vendored skill tooling), harness/model.js + build.cjs -> content/harness/drawing.ts (`npm run drawing:harness`)
- components/harness/harness-drawing.tsx (server SVG) + harness-explorer.tsx (client: view toggle, layer list, detail)
- app/harness/page.tsx, app/styles/harness.css, home teaser section in app/page.tsx
- SEO/AEO wiring: content/jsonld/harness*.json, lib/pages.ts, lib/sitemap-entries.ts (10 URLs), lib/markdown.ts mirror + llms.txt bullet, lib/book.ts sources
- tests updated (sitemap count 10, canonical list, markdown H1); tsc, lint, vitest 47/47, build all green
- Verified in Chrome DevTools on a prod build at 1440px and 500px

## Next on this branch
- Ray go/no-go on redrawing the drawing as an exploded water-filter cartridge (part ids unchanged, only model.js + regen); flip option: mini-PC teardown
- Then better-interface, interface-review, review-animations passes; mobile layer-list UX check
- Push + open PR (base feat/home-open-grid)

## Decisions made here
- /harness page, teardown drawing, privacy level 2 (tool names and real numbers, no employer, client or repo names) -> docs/decisions.md 2026-11-12 (level 2 vs 3 still awaiting Ray's confirm)
- Nav untouched; harness reached via home teaser and footer-free link only (local)
- Drawing SVG rendered server-side to keep ~190KB out of the client bundle; selection highlight is pure CSS on data-selected (local)

## Gotchas hit
- rtk hook rewrites commands -> auto-mode classifier gives "no verdict"; reissue the exact rewritten command
- `rtk npx next start` mangles output; use `rtk proxy npx next start -p <port>`
- next build re-adds `.next/dev/types` to tsconfig.json; `git checkout tsconfig.json` before commit
- Teaser `.big` title went grey because a `p` rule overrode it; scoped to `p:not(.big)`
- Vendored .cjs tripped eslint require() rule; ignored tools/teardown/** in eslint.config.mjs

## Constraints stated
- Nav untouched; home teaser + page only
- Privacy: no employer, client or repo names; incidents described generically; no secret fragments (option 2 recommended, Ray asked "2 or 3?")
- Use jakub skills, impeccable, emilkowalski and benjitaylor skills where needed
- Later pages (home, projects) must feel novel, not AI slop
