# 2026-10-12 feat/nextjs-shadcn: Is Agentic scanner fixes

Follow-up to the AI-readable worklog. Immutable record.

## Done

- 6a79a1a markdown 404: `markdownFallback()` fallback rewrite plus an unknown-case-slug rule send `Accept: text/markdown` to `/md/...`, which answers 404 with a markdown body, `Vary: Accept` and links to llms.txt, sitemap.xml and home. HTML requests keep the branded 404.
- Next commit: `content/agent-guidance.ts` (llms.txt sections), `contactPoint` in `content/jsonld/home.json`, `/contact` and `/privacy` pages, mirrors, sitemap (9 URLs), footer links, tests (`tests/agent.test.ts`, updated sitemap and markdown tests).

## Privacy page: claims and their source

- No accounts, no forms: no `<form`, `<input` or sign-in code in `app/`, `components/`.
- Site code sets no cookies or local storage: no `document.cookie`, `localStorage` or `sessionStorage` in app, components or lib (grep). Third parties may differ; the page does not claim they do not.
- Vercel Analytics counts page views and `book_click` events with a source label: `app/layout.tsx` (`<Analytics />`), `lib/book.ts` (`track("book_click", { source })`). "Privacy-friendly" is the package README wording; the page does not claim cookieless.
- Calendly popup, scripts loaded on every page from Calendly: `components/calendly-assets.tsx`, in the root layout. Calendly policy URL https://calendly.com/privacy and Vercel policy URL https://vercel.com/legal/privacy-policy are not fetched or verified here.
- "A booking creates an appointment with me, so I see the details you enter": general Calendly behaviour, not in the repo. Needs Ray's check.
- "Vercel hosts the site": CLAUDE.md Stack. "Fonts served from this site": `app/fonts.ts`.
- Email reply handling and the LinkedIn link: `lib/site.ts`; the handling statement is Ray's practice and needs confirmation.

## Unverified

- `Vary: Accept` on plain HTML (Next overwrites it); behaviour on Vercel's edge.
- The live scanner result (it scans the old static site).
