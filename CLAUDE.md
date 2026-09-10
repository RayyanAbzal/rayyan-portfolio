# rayyan-portfolio

Static HTML/CSS/JS portfolio site. No framework, no build step.

## Stack

- Plain HTML + CSS + JS, no bundler, no Node
- Hosting: Vercel (static)
- Analytics: Vercel Analytics (`/_vercel/insights/script.js`)
- Font: Inter Tight, self-hosted variable WOFF2 in `fonts/` (weights 400-700), preloaded per page. No monospace anywhere.
- Booking: Calendly popup widget

## Files

```
index.html             home: hero panel, 4 client cards, offers, about teaser, one quote, CTA
work.html              projects: 4 client cards + 3 personal builds (small schematics)
about.html             about: prose with principles, side cards, 4 process steps, 3 testimonials, FAQ (native details)
404.html               branded not-found page (Vercel serves it automatically)
styles.css             shared stylesheet (all pages)
styles-case.css        case study chrome (work/* pages)
js/motion.js           reveal engine only
js/site.js             bookCall helper, sticky mobile CTA
work/influence.html    Influence CRM case study
work/influence-v2.html Influence v2 dashboard case study
work/feedhack.html     FeedHack automation case study
work/pumpdat.html      pumpdat token launchpad case study
sitemap.xml            7 URLs, update lastmod on content changes
robots.txt             allow all incl. named AI crawlers, blocks /logo-exports/, points at sitemap
llms.txt               plain-text site summary for answer engines; update when offers, projects, or FAQ change
fonts/                 Inter Tight latin + latin-ext WOFF2 (OFL)
PRODUCT.md             impeccable product truth (never deployed)
DESIGN.md              impeccable design system record (never deployed)
.impeccable/           surface briefs (committed), review captures (gitignored)
.vercelignore          keeps CLAUDE.md, WORKLOG.md, PRODUCT.md, DESIGN.md, docs/, .impeccable/, logo sources out of deploys
favicon-16.png         browser tab small
favicon-32.png         browser tab standard
favicon-180.png        apple-touch-icon
og.png                 OG/Twitter share image (1200x630), rendered from docs/og-source.html at 1200x630
logo-exports/          raw Claude Design export, source only (never deployed)
docs/                  specs, plans, client drafts (never deployed)
```

## Motion conventions (js/motion.js + styles.css)

- `.js` class gates all hiding; no-JS and reduced-motion visitors get the full static page.
- Reveal lifecycle: `.in` starts the transition, ~1.4s later the element drops `.reveal`/`.in` and gains permanent `.done`. Hidden states live under `.js .reveal`, persistent end-states key on `:is(.in, .done)`.
- Parents with `data-stagger="80"` cascade direct children 80ms apart. `.hero-panel` children stagger via CSS delays.
- Failsafe: if IntersectionObserver is missing or motion fails, `showAll()` reveals everything.
- Sticky mobile CTA is a direct body child; `data-show-after` / `data-hide-at` selectors drive it. Set `data-show-after` to a section that sits below the first viewport on 390px.
- Every booking CTA is a real Calendly href plus `onclick="return bookCall('source')"`; sources feed Vercel Analytics events.

## Design system

Full record: DESIGN.md. Direction contract: `.impeccable/surfaces/index-html.md`.

| Token   | Value     | Use                              |
|---------|-----------|----------------------------------|
| bg      | `#f5f3ee` | page ground (near-white stone)   |
| paper   | `#ffffff` | cards, blocks, nav; 1px `--line` |
| well    | `#e6ebe3` | bed behind card schematics       |
| sage    | `#dde7da` | hero panel only                  |
| ink     | `#17150f` | text, dark preview panel         |
| pine    | `#1f3d2b` | buttons, CTA panels              |
| gold    | `#f3c94a` | `.mark` highlight, links, CTA    |
| radius  | `24px`    | every rounded surface            |

Aesthetic: a quiet room with one loud sentence. Near-white warm ground, big rounded white surfaces on a hairline, few elements per view, gold as the only accent. Bencium-style calm, own colours.

Product visuals: no client screenshots. Cards use CSS-drawn schematics (`.card-visual` > `.vis-frame`) with synthetic data; case pages use the dark `.case-preview` panel. `--data` resolves to the body face; schematic and preview data use tabular numerals, never monospace.

## Rules

- Plain-language copy; no monospace anywhere; no code syntax in visible copy
- Copy is outcome-first, lead with result, not process; no aphoristic one-liners
- No frameworks or build tooling unless explicitly requested
- No em dashes in copy
- Keep each page under 800 lines
- Nav is Home / Projects / About plus Book a call; mark the current page with `aria-current="page"`

## SEO + AEO

Every page: canonical, robots meta (`max-image-preview:large`), OG/Twitter set, JSON-LD. Home carries the `@graph` (WebSite, ProfessionalService with offer catalog, Person, WebPage); work.html a CollectionPage + ItemList; about.html AboutPage + Person + FAQPage; case pages Article + BreadcrumbList. Entity IDs: `/#website`, `/#business`, `/#person`. Keep JSON-LD, `llms.txt`, and visible copy saying the same thing.

## Domain + OG

`og:image` hardcoded to `https://rayyanabzal.com/og.png` on all pages.
After domain is live and pointed at Vercel, verify OG preview with LinkedIn Post Inspector.

## Deployment

Push to GitHub, repo connected in Vercel, auto-deploys on push to `main`.

## Open

- Google Business Profile: create (service-area business, Auckland), link site, collect client reviews there. Biggest "AI consultant Auckland" lever.
- Verify Vercel Analytics custom events (book_click) appear on the hobby plan; if not, note plan limitation and keep pageview funnels.
- Testimonial attribution: permission messages drafted (docs/clients/testimonial-permission-messages.md); swap real names in when clients approve.
- OG preview: re-check LinkedIn Post Inspector after deploy (og.png regenerated 2026-09-04 in the new world).
- Submit sitemap.xml in Google Search Console (create the property if none exists).
