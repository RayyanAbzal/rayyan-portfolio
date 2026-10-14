# 2026-10-12 feat/nextjs-shadcn: AI-readable site

Follow-up to 2026-10-12-feat-nextjs-shadcn.md, after Ray asked for the site to be readable by AI agents (Vercel guide "make your site readable by AI agents"). Immutable record.

## Done

- 9019672 refactor: home, work and about copy moved into `content/home.ts`, `content/work.ts`, `content/about.ts`; `Rich` gained a link part. Rendered text of all seven pages checked identical before and after.
- 68d3267 `lib/markdown.ts` renders the seven mirrors and llms.txt from that content; `app/md/[...slug]/route.ts` serves them; `app/llms.txt/route.ts` replaces `public/llms.txt`; `lib/pages.ts` is the import-free page registry.
- cf4a735 `next.config.ts`: rewrites (beforeFiles) for `<path>.md` and `Accept: text/markdown`, per-page `Link` alternate header and `Vary: Accept`; `lib/seo.ts` emits `<link rel="alternate">` for the mirror and llms.txt.
- 0be6b41 `tests/markdown.test.ts`: mirror per page, h1 and booking link, rewrite and header config, metadata, llms.txt shape.

## Checks against the guide

1. Answers in initial HTML: yes (curl with a Claude-User agent returns 200 with the h1; FAQ answers force-mounted).
2. llms.txt: `# name`, `> summary`, Services, Work, About, entries link the `.md` mirrors; facts come from the same content as the pages.
3. Mirror advertised in head and `Link` header on every page.
4. `Accept: text/markdown` returns `text/markdown; charset=utf-8` with `Vary: Accept` on all seven pages.
5. Real 404 for `/nope`, `/work/zzz`, `/work/zzz.md`.
6. No middleware or bot rules; no 403 paths.
7. llms.txt linked from head metadata; sitemap from robots.txt.
8. All seven canonical pages are in sitemap.xml (test asserts it matches the page registry).
9. JSON-LD unchanged.

## Not achieved

- Plain HTML responses do not carry `Vary: Accept` when served by `next start`: Next overwrites Vary on prerendered pages (a proxy.ts append was tried and removed). Not verified on Vercel.
- `llms.txt` has no `title` attribute on its `<link>` (Next metadata does not support it).
