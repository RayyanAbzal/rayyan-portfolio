# WORKLOG

**Updated:** 2026-09-04

## Active task

Full redesign toward bencium.io's calm, image-led world in Ray's own colours. Single-scroll page split into Home + Projects + About. Built with the impeccable skill (init, direction contract, build, two inspection rounds, finish review, DESIGN.md). On `feat/work-schematic-cards`.

## Phase

built, finish review shipped (3 rounds: 8 material fixes, all resolved), awaiting Ray's eyeball + merge

## Files changed this session

- `index.html` rewritten: nav (Home / Projects / About / Book a call), sage hero panel with one big sentence, 4 client cards with CSS schematics, 3 offers, about teaser + side cards, 4 process steps, one quote, pine CTA panel. Principles and FAQ cut. FAQPage JSON-LD moved to about.
- `work.html` new: 4 client cards + 3 personal builds (text only), CTA.
- `about.html` new: prose with 4 principles, 5 side cards, 3 testimonials, FAQ as native `<details>`, CTA. FAQPage + BreadcrumbList JSON-LD.
- `styles.css` full rewrite: new tokens (stone bg, paper, sage, ink, pine, gold), Bricolage Grotesque, pill buttons, `.hero-panel` (the only sage field), cards + schematics, offers, steps, about split, quotes, FAQ, CTA panel, footer, mobile CTA, reveal motion.
- `styles-case.css` rewrite: paper blocks on stone, big pine-highlight title, 4-cell meta strip, two-column block bodies, chip stack list, dark preview panel rethemed, pine CTA, paper prev/next cards.
- `work/*.html`: new font link, nav, footer, breadcrumb, quote figures; content untouched.
- `js/motion.js` simplified to reveal engine + failsafe. `js/site.js` down to bookCall + sticky CTA (FAQ accordion gone).
- `404.html` rebuilt in new world. `sitemap.xml` now 7 URLs.
- `PRODUCT.md`, `.impeccable/surfaces/index-html.md`, `DESIGN.md` added. `.gitignore` ignores `.impeccable/review/`; `.vercelignore` keeps the impeccable files out of deploys.
- `CLAUDE.md` updated for the new file list, tokens, motion rules.

## Next step

Ray eyeballs all three pages plus one case page locally (`python3 -m http.server`), then `git checkout main && git merge --ff-only feat/work-schematic-cards && git push origin main` (Vercel auto-deploys). Then regenerate `og.png` in the new world.

## Open questions

- Schematic and preview data is invented (handles, amounts, partner names). Confirm nothing reads as a real client claim.
- Testimonials carry role + project only. Swap in names once clients approve (docs/clients/testimonial-permission-messages.md).
- Personal builds on work.html are text-only cards. Give them small visuals later or leave lighter?
- Old `#principles` / `#faq` anchors on the home page are gone. Any external links pointing at them now land on the home top; FAQ lives at about.html#faq.
- `og.png` still shows the old cream/pine look.

## Finish review (impeccable, 2026-09-04)

Round 1 disposition "fix", 8 material items: kickers above headings, uppercase side-card and case-meta labels, hero headline over 6rem wrapping to 3 lines, second sage band, `--ink-3` contrast, no visible synthetic-data disclosure, repeated sentence in offer 2, third element in the hero action row. All applied in one batch; round 2 partial (about capture stale, cards not peeking under a 900px fold); round 3 "ship". Ceiling notes left as observations, not open findings: element density still above bencium's, one uniform reveal motion, dark case preview reads as a terminal.

## Fable pass (2026-09-04, after the ship verdict)

Own review of all four page types at 1440 and 390. Fixed: sticky mobile CTA peeked 7px above the fold when hidden (translate now clears the bar plus its shadow); hero lede cut from 3 desktop / 7 mobile lines to 2 / 5; schematic frames 16/10 to 16/9 so the drawn data fills the window; case block bodies had a 48px grid row gap between consecutive paragraphs (row-gap 0); case meta cells (4 paper boxes with a bare value each) replaced by one bold facts line with middle dots, stacked on mobile; hero panel gets its own entrance (slight scale) so the one authored moment differs from the generic fade-up; on mobile the "All projects" link now sits below the section lede. DESIGN.md and the sidecar updated to match.

## SEO + AEO pass (2026-09-04)

Self-hosted Bricolage Grotesque (two WOFF2 files, preload per page, Google Fonts links removed on all 8 pages). og.png regenerated in the new world from docs/og-source.html. Structured data expanded: WebSite + ProfessionalService (offer catalog, service types, areas) + Person (knowsAbout) + WebPage on home; CollectionPage + ItemList on work; AboutPage + Person on about; Article on each case page with article:modified_time. Robots meta on every page. robots.txt names AI crawlers explicitly. llms.txt added. About prose opens with an entity sentence. Sitemap lastmod bumped. Testimonial names still blocked on client permission.

## Round 3 (2026-09-09, Ray: "do everything else" except portrait and names)

Project cards: "Read the case study" link replaced by one bold outcome line per card sourced from the case pages (weeks, live status, repeat client); title grows an arrow on hover. Case pages: the dark preview panel now sits first in the case body, mobile CTA waits for the second block. Personal builds got small drawn schematics (FIOS key/value response, ARIA chat, NZ Job Finder scored list) at 16/11 in the three-column grid. FeedHack runner dot fires once after the card grid reveals. Process steps moved from home to about.html (home is now six sections). CLAUDE.md, DESIGN.md, llms.txt synced.

## Key decisions

- Bencium's world (calm ground, big rounded surfaces, one accent, grotesque sans, few elements per view) with Ray's own palette: warm stone + paper + sage, pine for buttons, gold as the one accent. Not bencium's colours.
- 3 pages instead of one long scroll, so each page holds few elements per view. Case study URLs unchanged for SEO.
- Principles and FAQ cut from home (Ray, 2026-09-04); both live on about.html.
- No client screenshots (Ray, 2026-09-04): CSS-drawn schematics with synthetic data stand in for product imagery.
- Monospace is reserved for schematic and preview data. Everything else is Bricolage.
- Calendly / Vercel scripts stay without SRI (auto-updating third-party, pre-existing).
