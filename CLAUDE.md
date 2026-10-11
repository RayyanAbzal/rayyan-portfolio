# rayyan-portfolio

Next.js (App Router) portfolio site with Tailwind v4 and shadcn/ui. Migrated from a static HTML/CSS/JS site on 2026-10-12 (Ray approved, see docs/decisions.md).

## Stack

- Next.js App Router, TypeScript strict, Tailwind v4 (CSS-first, `@tailwindcss/postcss`), shadcn/ui (radix, CSS variables)
- Hosting: Vercel. Auto-deploys on push to `main`. Confirm the Vercel project framework preset is Next.js (it was created for a static site).
- Analytics: `@vercel/analytics`; `lib/book.ts` fires the `book_click` event
- Font: Inter Tight, self-hosted variable WOFF2 in `app/fonts/` via `next/font/local` (weights 400-700, latin file preloaded). No monospace anywhere.
- Booking: Calendly popup widget, loaded after interactive by `components/calendly-assets.tsx`
- Tests: Vitest (`npm test`): redirect map, sitemap, robots, canonical on every page module
- Commands: `npm run dev`, `npm run build`, `npm start`, `npm run lint`, `npx tsc --noEmit`

## Files

```
app/layout.tsx          shell: skip link, sticky nav, footer, Calendly, Analytics, motion gate script
app/page.tsx            home: hero panel, 4 client cards, offer list, about teaser, one quote, CTA
app/work/page.tsx       projects: 4 client cards + 3 personal builds
app/work/[slug]/page.tsx  case studies (generateStaticParams over content/case-studies)
app/about/page.tsx      about: prose, principles, side cards, 4 steps, 3 testimonials, FAQ accordion
app/not-found.tsx       branded 404 (noindex)
app/sitemap.ts, robots.ts  7 URLs, update lastmod in lib/sitemap-entries.ts; robots rules as the legacy file
app/globals.css         tokens (:root), @theme inline, base, type
app/styles/*.css        layout, cards (schematics), sections, case, motion
app/fonts.ts, app/fonts/  Inter Tight
components/ui/          shadcn: button, accordion, card, badge, separator
components/             book-link, sticky-book-cta, reveal, site-nav, site-footer, project-card, json-ld, calendly-assets
components/schematics/  CSS-drawn card visuals (synthetic data, aria-hidden)
components/case/        case preview panels and rich text
content/                typed copy (home, work, about, projects, case-studies) and content/jsonld/*.json (verbatim JSON-LD). Pages and markdown mirrors both read it.
lib/                    site constants, seo helper (pageMetadata), booking, sitemap entries, pages.ts (page registry, no imports), markdown.ts (mirrors + llms.txt renderer)
app/md/[...slug]/route.ts  serves the markdown mirrors (text/markdown, Vary: Accept)
app/llms.txt/route.ts   generated llms.txt (services, work, about; links the .md mirrors)
public/                 favicons, og.png
next.config.ts          301 redirects: /index.html, /work.html, /about.html, /work/:slug.html to clean paths; rewrites <path>.md and Accept: text/markdown to the mirror; Link rel=alternate header per page
tests/                  vitest
(legacy-static/ was deleted after the text diff passed; see git history)
PRODUCT.md, DESIGN.md   impeccable product truth and design system record (never deployed)
.impeccable/            surface briefs (committed), review captures (gitignored)
.vercelignore           keeps CLAUDE.md, AGENTS.md, WORKLOG.md, PRODUCT.md, DESIGN.md, docs/, .impeccable/, logo sources out of deploys
logo-exports/           raw Claude Design export, source only (never deployed)
docs/                   specs, plans, decisions, worklog, client drafts (never deployed)
```

## Motion conventions (components/reveal.tsx + app/styles/motion.css)

- `html.js` gates all hiding. An inline script in the layout adds it only when `prefers-reduced-motion` is not reduce; no-JS and reduced-motion visitors get the full static page.
- `Reveal` toggles `.in` (start the transition) then `.done` (~1.4s later); a `stagger` prop (ms) cascades direct children. Failsafe: reveals after 1.5s, and `.motion-failed` (3s, set by the inline script) shows everything if hydration never runs.
- Reveal only on `.hero-panel` and the card grids. Everything else is static.
- Reduced motion also neutralises the sticky CTA slide, card arrow, accordion chevron, nav underline, hover lifts, smooth scroll and view transitions. Hover-only styling lives in `@media (hover: hover)`.
- Sticky mobile CTA (`StickyBookCta`) is a direct child of the page, not inside a transformed ancestor; `showAfter` / `hideAt` are selector props.
- Every booking CTA is `BookLink` (real Calendly href, popup when loaded) with a typed `BookingSource`; sources feed Vercel Analytics events.

## Design system

Full record: DESIGN.md. Direction contract: `.impeccable/surfaces/index-html.md`.

Tokens live in `app/globals.css` (`:root`, legacy names, mapped to shadcn variables and `@theme inline`).

| Token   | Value     | Use                              |
|---------|-----------|----------------------------------|
| bg      | `#f5f3ee` | page ground (near-white stone)   |
| paper   | `#fffdf9` | cards, blocks; 1px `--line`      |
| well    | `#e6ebe3` | bed behind card schematics       |
| sage    | `#dde7da` | hero panel only                  |
| ink     | `#17150f` | text, dark preview panel         |
| pine    | `#1f3d2b` | buttons, CTA panels              |
| gold    | `#f3c94a` | `.mark` highlight, links, CTA    |
| radius  | `24px`    | every rounded surface            |

Aesthetic: a quiet room with one loud sentence. Near-white warm ground, big rounded white surfaces on a hairline, few elements per view, gold as the only accent. Bencium-style calm, own colours.

Product visuals: no client screenshots. Cards use CSS-drawn schematics (`components/schematics`, `.card-visual` > `.vis-frame`) with synthetic data; case pages use the dark `.case-preview` panel (low-alpha text stays at .55 or above for contrast). `--data` resolves to the body face; schematic and preview data use tabular numerals, never monospace.

## Rules

- Plain-language copy; no monospace anywhere; no code syntax in visible copy
- Copy is outcome-first, lead with result, not process; no aphoristic one-liners
- Next.js + Tailwind + shadcn is the approved stack (Ray, 2026-10-12, docs/decisions.md). Add no further frameworks or heavy dependencies without asking.
- No em dashes in copy
- Keep each file under 800 lines
- Nav is name (home) / Projects / About / Book a call text link; mark the current page with `aria-current="page"`. Skip link first in body.
- Reveal motion only on `.hero-panel` and the card grids. Everything else is static.
- One gold `.mark` per page at most (home hero, home quote). Card h3 is outcome-first with a `.card-name` line above.

## SEO + AEO

Every page: canonical, robots meta (`max-image-preview:large`), OG/Twitter set, JSON-LD. Home carries the `@graph` (WebSite, ProfessionalService with offer catalog, Person, WebPage); work.html a CollectionPage + ItemList; about.html AboutPage + Person + FAQPage; case pages Article + BreadcrumbList. Entity IDs: `/#website`, `/#business`, `/#person`. Keep JSON-LD (`content/jsonld`) and visible copy saying the same thing. llms.txt and the markdown mirrors are generated from `content/`, so edit copy there only. AI readability: answers in initial HTML, `/<path>.md` mirrors (home is `/index.md`) advertised by `<link rel="alternate" type="text/markdown">` and a `Link` header, `Accept: text/markdown` negotiation, real 404s, no bot blocking. Page metadata goes through `lib/seo.ts` (a page-level openGraph replaces the layout one, so the helper emits the full set).

## Domain + OG

`og:image` hardcoded to `https://rayyanabzal.com/og.png` on all pages.
After domain is live and pointed at Vercel, verify OG preview with LinkedIn Post Inspector.

## Deployment

Push to GitHub, repo connected in Vercel, auto-deploys on push to `main`. Old `*.html` URLs 301 to the clean paths via `next.config.ts`.

## Open

- Google Business Profile: create (service-area business, Auckland), link site, collect client reviews there. Biggest "AI consultant Auckland" lever.
- Verify Vercel Analytics custom events (book_click) appear on the hobby plan; if not, note plan limitation and keep pageview funnels.
- Testimonial attribution: permission messages drafted (docs/clients/testimonial-permission-messages.md); swap real names in when clients approve.
- OG preview: re-check LinkedIn Post Inspector after deploy (og.png regenerated 2026-09-04 in the new world).
- Submit sitemap.xml in Google Search Console (create the property if none exists).
