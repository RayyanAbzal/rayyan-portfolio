# WORKLOG

**Updated:** 2026-05-22

## Active task
Portfolio site built and open in browser — Calendly wired, LinkedIn live, content fixes applied

## Phase
reviewing

## Files changed this session
- `index.html` — main portfolio page, implemented from Claude Design handoff bundle
- `styles.css` — full shared stylesheet (Paper & Pine theme, terminal aesthetic)
- `styles-case.css` — case study page chrome
- `work/influence.html` — Influence CRM case study
- `work/feedhack.html` — FeedHack automation case study
- `work/pumpdat.html` — pumpdat token launchpad case study

## Next step
Add favicon + OG image (needed for proper LinkedIn/Slack share previews — og:image tag is present but no image file yet)

## Open questions
- Analytics: Plausible or Vercel Analytics? Not yet added.
- Hosting: Where is this being deployed? (Vercel recommended for static)
- OG image: Need a 1200x630 image for social share previews

## Key decisions
- Static HTML/CSS/JS — no framework, no build step
- Design: "Paper & Pine" theme — warm cream bg (#f5f1e8), pine-green accent (#2f5e3e), Inter Tight + JetBrains Mono
- Booking: Calendly popup (https://calendly.com/rayyanabzal/discovery) — 3 buttons wired (nav, hero, contact)
- LinkedIn: https://www.linkedin.com/in/rayyan-a-832a20213 — live on all 4 pages
- Chips corrected to match case study stacks (openai/stripe removed, replaced with actual tools)
- About card stat: "3 shipped · 1 building" (was inconsistent with work section)
- Testimonial label: "client testimonial" (removed unverifiable "verified ✓")
- OG + Twitter meta tags added to index.html
