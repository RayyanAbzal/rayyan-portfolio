# Portfolio Showcase Redesign: Design Spec

Date: 2026-06-12
Status: approved decisions locked via grill-me pass; spec pending Ray's review
Sources: 4-lens ideation workflow (motion, conversion, SEO, QA audit lenses), grill-me Q&A

## Goal

Make rayyanabzal.com win clients. Three levers:
1. Full-showcase animation and interactivity that proves "this person ships polished software" without saying it.
2. Conversion restructure so a visiting founder always has a booking path in reach.
3. NZ-local SEO so "AI consultant Auckland" searches find the site.

Constraints: keep Paper & Pine colour scheme, keep terminal aesthetic, no build step, no frameworks, each HTML page under 800 lines (external .js/.css files are the pressure valve), Calendly popup stays, no em dashes in copy, first-person voice.

## Decisions locked (grill-me)

| Decision | Outcome |
|---|---|
| Animation level | Full showcase |
| Scope | All 5 pages |
| Libraries | None. GSAP dropped; pure CSS + vanilla JS everywhere |
| Hero typing | Plays every load, full sequence under 1 second |
| Guest terminal | Hybrid: typed input plus 3 clickable command chips, all commands resolve to conversion actions, easter eggs kept, built last |
| Cmd+K palette | Yes, all pages, native dialog |
| Influence v2 status | Flip to shipped everywhere; card becomes a link to its case page |
| Brand | "Rayyan Abzal" in titles, og tags, JSON-LD. Footer reads "Rayyan Abzal · AI consulting practice". Nav prompt hostname `rayyan-consulting@auckland` stays |
| Services section | Rebuild as 3 problem-led offer cards (manual process / AI in existing product / whole tool), each with proof case and book CTA |
| Testimonials | Move directly under work section; Influence v2 (repeat client) quote first; "repeat client" badge on v2 card |
| Case KPI stat rows | Skipped for now (no measured numbers yet) |
| Attribution | Site ships with anonymous attribution; I draft forwardable permission messages for both clients as a deliverable |
| Extras | Sticky mobile CTA bar only. No fit-check quiz, no payback calculator, no FAQ pricing range |
| SERP title | `AI Consultant & Automation, Auckland NZ | Rayyan Abzal` |
| Fonts | Trim unused weights from Google Fonts URL only; no self-hosting |
| Hero status `current` row | "open for next build ▸ booking now" once v2 flips shipped |

## Architecture

New files:

```
js/motion.js      animation engine, all pages: reveal IO, typing helper, counters,
                  scrollspy, scroll progress bar, boot sequences
js/site.js        conversion utilities, all pages: bookCall(source) helper with
                  Calendly guard + analytics event, sticky mobile CTA, FAQ accordion
js/palette.js     Cmd+K command palette, all pages
js/terminal.js    guest terminal, index only
404.html          terminal-styled not-found page (absolute asset paths, noindex)
sitemap.xml       5 URLs
robots.txt        allow all, disallow /logo-exports/, sitemap pointer
.vercelignore     CLAUDE.md, WORKLOG.md, docs/, logo-exports/, "logo designs_.zip"
```

Modified: `index.html`, `styles.css`, `styles-case.css`, all 4 `work/*.html`, project `CLAUDE.md` (file list at the end).

All HTML inline scripts move to the external js files. Scripts load with `defer`. First tag in every `<head>`: `<script>document.documentElement.classList.add('js')</script>` so `.reveal` hiding is gated on `.js` and the page renders fully without JavaScript.

Motion rules (enforced in code review):
- Animate only `transform`, `opacity`, `clip-path`, `background-size`.
- Every IntersectionObserver effect fires once, then unobserves.
- One `prefers-reduced-motion` gate: `MOTION_OK` constant in JS plus one CSS media block forcing final states. Reduced-motion visitors get an instant, complete page.
- Failsafe timeout forces final state if any sequence stalls (mirrors existing pattern).
- Global `:focus-visible` pine outline.

## Workstreams

### W1: Deploy hygiene (first commit, urgent)
`https://rayyanabzal.com/CLAUDE.md` serves 200 today: internal instructions are public. Add `.vercelignore`, push, then verify CLAUDE.md, WORKLOG.md, and the zip return 404 in production. If `.vercelignore` proves insufficient on the git-integration deploy, fall back to a `vercel.json` rule or move the files; verification is part of this workstream, not optional.

### W2: Bug and consistency fixes (28 audit findings)
Highlights: broken FAQ sentence (index.html:487), comma splice in FAQ 04, Influence v2 contradiction (status, card copy vs case page scope), stale counts ("3 shipped · 1 shipping" becomes "4 shipped"), broken case-nav chain (feedhack prev must point to influence-v2), case-nav label standardisation ("← prev case" / "← back" only for All work), title brand split, em dash in title tags, Calendly CTAs get real href fallback with onclick guard, `--ink-3` darkened to pass WCAG AA on both cream and panel, undefined `--font-head` defined, dead CSS removed (.back-bar, .term-label), inline styles moved to classes, duplicate data-screen-label renumbered, dev comment at index.html:558 deleted, FAQ aria-controls/ids added, case-block h3 promoted to h2 (with CSS selector update so visuals are identical).

### W3: SEO (NZ local)
- Homepage title/description rewrite per locked SERP title; og/twitter mirrors.
- Case page titles rewritten with NZ keyword suffix, brand "Rayyan Abzal".
- Full OG set (og:title, og:description, og:type, og:url) plus twitter tags on all case pages; canonical + og:url on all 5 pages; og:site_name, og:locale en_NZ; `lang="en-NZ"`.
- JSON-LD: ProfessionalService + Person @graph on homepage, FAQPage (answers copied verbatim from visible text), BreadcrumbList per case page. Explicitly NO Review/AggregateRating markup (self-serving reviews are ineligible and risk manual action).
- "New Zealand" added to body copy in 3 natural placements (currently appears zero times site-wide). 7th FAQ: "Do you only work with Auckland businesses?" targeting NZ long-tail.
- New sitemap.xml, robots.txt, 404.html.
- Perf: Calendly CSS becomes async preload pattern with noscript fallback, Calendly preconnect added, font weights trimmed to those styles.css actually uses.
- Off-code follow-up for Ray (not in this build): Google Business Profile, collect client reviews there.

### W4: Conversion restructure
- Services section rebuilt: 3 offer cards using the locked framing, panel chrome consistent with existing card patterns, each ends in a book CTA.
- Testimonials section moves directly after work; v2 quote leads; "repeat client" tag on the Influence v2 work card.
- Slim inline CTA bars after work grid and after testimonials (`$ ./book_call` prompt line + button + "free, 30 min, no pitch").
- Case pages: Calendly assets load, nav `book` opens popup directly, `.case-cta` panel before case-nav on all 4 pages.
- Mobile: hero CTA ordered above the status card under 880px with "free · 30 min · no pitch" microcopy; sticky bottom CTA bar under 920px appears after #work, hides at #contact.
- All booking clicks route through `bookCall(source)` which fires a named Vercel Analytics event then opens Calendly. Note: custom events may need a paid Vercel plan; va() stub no-ops harmlessly either way. Verify on deploy; if events do not appear, keep the helper (it still centralises the popup) and note the limitation.
- Hero status row updates: `current: open for next build ▸ booking now`.

### W5: Homepage motion
Hero: `whoami` types (~400ms, 6ch reserved width so no layout shift), h1 boots in as command output, sub/status/CTA stagger; total under 1s; h1 never hidden pre-JS. Status panel boot: rows print with per-row delay, `[ok]` flash per key; same pattern on the about card. Shipping log: count-up on 48/30 with tabular-nums, "1-3wk" slides in, `$ tail -f shipping.log` types in header. Section markers site-wide: tag types via steps() width animation (data-ch set by JS), rule draws scaleX, meta fades. Principles: 80ms cascade, pine spine grows scaleY, `[01]` flicker. Work cards hover: blinking block cursor after slug, status dot sonar ping, chip cascade. Process pipeline: vanilla scroll-in version, SVG/dashed line draws via stroke-dashoffset transition as section enters, steps light up in sequence with stagger (no scroll-scrubbing, GSAP dropped). Testimonials: `$ cat` types before filename, quote body clip-path wipe, pull-quote lands last. Nav: scrollspy updates prompt path (`~/about`, `~/work`) with cursor blink on change, active link prefix turns pine; 2px scroll progress bar under nav. `.hl` keywords get one-time selection-sweep. Buttons: `./` flips to `▸` on hover, active-state depress, ghost button pine edge slide. FAQ: replace max-height tween with grid-template-rows 0fr/1fr animation (also fixes the 360px clip bug). Cross-document View Transitions: 250ms crossfade index <-> case pages, path text morph where supported; non-supporting browsers get normal navigation.

### W6: Interactive showcase
Palette (all pages): Cmd/Ctrl+K or `/` opens native `<dialog>`; entries for sections, case studies, actions (book call, email, copy email, LinkedIn); arrow keys + Enter; pine `>` selector; kbd chip in nav advertises it; case pages use ../index.html#anchor paths. Terminal (index, contact section, built last): prompt `guest@rayyanabzal.com:~$`, hidden input captures keys, 3 visible command chips (./book_call, ./show_work, ./help) for non-typers, commands: help, work, stack, principles, contact, whoami, book, ls, cat, clear, easter eggs including `sudo hire-rayyan`; book and sudo open Calendly; output capped ~30 lines; arrow-key history.

### W7: Case page motion
motion.js loads on case pages; reveal classes added to blocks. Title stamps in with stepped clip-path wipe plus cursor that blinks twice; meta cells stagger 60ms; case-block filenames type on scroll-in; `.mark` highlights sweep left to right; quote card same treatment as homepage.

### W8: Verification
- `prefers-reduced-motion: reduce` run-through: every page complete and static.
- JS disabled: every page fully readable (the .js gate).
- Keyboard-only pass: focus visible everywhere, palette and FAQ operable, terminal skippable.
- Mobile (390px) and desktop visual QA via browser-qa skill after deploy.
- Rich Results Test on homepage (ProfessionalService, FAQPage) and one case page (BreadcrumbList); social share preview check on one case page.
- Lighthouse: performance and SEO not worse than pre-redesign baseline (capture baseline first).
- Post-deploy: CLAUDE.md/WORKLOG.md return 404; sitemap.xml and robots.txt reachable; 404.html renders styled at a junk URL.
- Each page still under 800 lines.

## Sequencing

Branch `feat/showcase-redesign` off main. Commit order: W1 (pushed immediately so the leak closes today) then W2, W3, W4, W5, W6, W7 as separate commits, W8 gates the final merge + push. Vercel deploys on push to main, so only W1 and the final merge get pushed.

## Deliverables outside the site

1. Two forwardable testimonial-permission messages (Influence director, pumpdat founder), plain English, for Ray to paste.
2. Note in CLAUDE.md "Open" section: Google Business Profile as the main "AI consultant Auckland" lever.

## Out of scope

Fit-check quiz, payback calculator, FAQ pricing range, case KPI stat rows, font self-hosting, blog/content marketing, Google Business Profile setup itself, case study screenshots.
