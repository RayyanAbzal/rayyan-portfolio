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
index.html          main single-scroll page
styles.css          shared stylesheet (all pages)
styles-case.css     case study chrome (work/* pages)
work/influence.html Influence CRM case study
work/feedhack.html  FeedHack automation case study
work/pumpdat.html   pumpdat token launchpad case study
favicon-16.png      browser tab small
favicon-32.png      browser tab standard
favicon-180.png     apple-touch-icon
og.png              OG/Twitter share image (1200x630)
logo-exports/       raw Claude Design export — do not serve, source only
```

## Design system

| Token      | Value     | Use                        |
|------------|-----------|----------------------------|
| cream      | `#f5f1e8` | background                 |
| pine       | `#2f5e3e` | primary accent             |
| ink        | `#1a1a1a` | body text                  |
| font-head  | Inter Tight | headings                 |
| font-mono  | JetBrains Mono | code, terminal, labels |

Aesthetic: "Builder / Paper & Pine" — warm, technical, grounded. Not corporate.

## Rules

- Match terminal/mono aesthetic on all edits
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

- Analytics: enable in Vercel dashboard post-deploy
- Domain: buy + add in Vercel project settings → Domains
