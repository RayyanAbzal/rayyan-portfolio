# rayyan-portfolio

Static HTML/CSS/JS portfolio site. No framework, no build step.

## Stack

- Plain HTML + CSS + JS — no bundler, no Node
- Hosting: Vercel (static)
- Analytics: Vercel Analytics (`/_vercel/insights/script.js`)
- Fonts: Inter Tight + JetBrains Mono via Google Fonts
- Booking: Calendly popup widget

## Files

```
index.html             main single-scroll page
404.html               branded not-found page (Vercel serves it automatically)
styles.css             shared stylesheet (all pages)
styles-case.css        case study chrome (work/* pages)
js/motion.js           reveal engine, counters, scrollspy, progress bar
js/site.js             bookCall helper, FAQ accordion, sticky mobile CTA
work/influence.html    Influence CRM case study
work/influence-v2.html Influence v2 dashboard case study
work/feedhack.html     FeedHack automation case study
work/pumpdat.html      pumpdat token launchpad case study
sitemap.xml            5 URLs, update lastmod on content changes
robots.txt             allow all, blocks /logo-exports/, points at sitemap
.vercelignore          keeps CLAUDE.md, WORKLOG.md, docs/, logo sources out of deploys
favicon-16.png         browser tab small
favicon-32.png         browser tab standard
favicon-180.png        apple-touch-icon
og.png                 OG/Twitter share image (1200x630)
logo-exports/          raw Claude Design export, source only (never deployed)
docs/                  specs, plans, client drafts (never deployed)
```

## Motion conventions (js/motion.js + styles.css)

- `.js` class gates all hiding; no-JS and reduced-motion visitors get the full static page.
- Reveal lifecycle: `.in` starts the transition, ~1.4s later the element drops `.reveal`/`.in` and gains permanent `.done`. Hidden states live under `.js .reveal`, persistent end-states key on `:is(.in, .done)`.
- Parents with `data-stagger="80"` cascade direct children 80ms apart.
- Every booking CTA is a real Calendly href plus `onclick="return bookCall('source')"`; sources feed Vercel Analytics events.

## Design system

| Token      | Value     | Use                        |
|------------|-----------|----------------------------|
| cream      | `#f5f1e8` | background                 |
| pine       | `#2f5e3e` | primary accent             |
| ink        | `#1a1a1a` | body text                  |
| font-head  | Inter Tight | headings                 |
| font-mono  | JetBrains Mono | labels, numbers, code snippets |

Aesthetic: "Builder / Paper & Pine" — warm, technical, grounded. Not corporate.

## Rules

- Plain-language copy; mono font for small labels and numbers only; no code syntax in visible copy
- Copy is outcome-first — lead with result, not process
- No frameworks or build tooling unless explicitly requested
- No em dashes in copy
- Keep each page under 800 lines

## Domain + OG

`og:image` hardcoded to `https://rayyanabzal.com/og.png` on all pages.
After domain is live and pointed at Vercel, verify OG preview with LinkedIn Post Inspector.

## Deployment

Push to GitHub → connect repo in Vercel dashboard → auto-deploys on push to `main`.
Enable Vercel Analytics in project settings after first deploy (free on hobby plan).

## Open

- Google Business Profile: create (service-area business, Auckland), link site, collect client reviews there. Biggest "AI consultant Auckland" lever.
- Verify Vercel Analytics custom events (book_click) appear on the hobby plan; if not, note plan limitation and keep pageview funnels.
- Testimonial attribution: permission messages drafted (docs/clients/testimonial-permission-messages.md); swap real names in when clients approve.
- OG preview: re-check LinkedIn Post Inspector after deploy (case pages now have full OG sets).
- Submit sitemap.xml in Google Search Console (create the property if none exists).
