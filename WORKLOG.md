# WORKLOG

**Updated:** 2026-06-16

## Active task

SEO audit (/seo) of rayyanabzal.com + mechanical fixes. Shipped to main, deployed, verified live.

## Phase

done

## Files changed this session

- `index.html` - Google Fonts link switched to `rel=preload` + `onload` swap + `<noscript>` fallback (removes one render-blocking request)
- `work/influence.html` - same font async change; title/og:title/twitter:title trimmed to "Influence CRM Case Study | Rayyan Abzal" (39 chars)
- `work/influence-v2.html` - font async; titles to "Influence v2 Dashboard Case Study | Rayyan Abzal" (48)
- `work/feedhack.html` - font async; titles to "FeedHack Discord Automation Case Study | Rayyan Abzal" (53)
- `work/pumpdat.html` - font async; titles to "pumpdat Token Launchpad Case Study | Rayyan Abzal" (49)
- `WORKLOG.md` - session state
- `sitemap.xml` - bumped homepage lastmod to 06-15 then REVERTED to 06-13 (no net change shipped, see decisions)

## Next step

Nothing in-code. Remaining work is off-page and user-owned (see open questions). Optional: eyeball font load (FOUT) on the live site once.

## Open questions

- Off-page (no code, user's call): create Google Business Profile (biggest "AI consultant Auckland" lever); add GitHub/X to `Person.sameAs` (currently LinkedIn only)

## Key decisions

- Shipped: `main` at `5c7ee4d` (commits `f6b6862` font async + 4 case titles, `5c7ee4d` worklog). FF-merged from `chore/seo-mechanical-fixes` (now deleted), pushed origin/main, Vercel auto-deployed. Verified live: all 5 pages show `rel=preload` font + tightened titles.
- Audit verdict: on-page technical SEO essentially complete. Homepage (only real search target) already excellent: title 54 chars, desc 159, clean H1, ProfessionalService+Person+FAQPage schema all valid. Ceiling is off-page now.
- Case titles: benefit is SERP DISPLAY/brand visibility, not ranking (Google ranks on full title regardless of length). Dropped the redundant "AI Consultant NZ/Auckland" tail that was truncating at ~580px; tradeoff is losing that keyword co-occurrence, negligible since these pages have ~zero search demand and the homepage owns the term.
- Font async: benefit is one fewer render-blocking request, NOT a measured LCP win (LCP is H1 text, paints in fallback either way). Cost: more visible FOUT + small CLS risk. Roughly lateral. Hence the eyeball-on-live check.
- Sitemap lastmod: net-zero (bumped then reverted). Advisor caught that b169c17 (06-15) only relocates the mobile-CTA div (presentation, not content); under the content-change rule the original 06-13 was already correct. Lesson: sitemap lastmod tracks content changes, not file mtime; font/layout tweaks do not bump it.
- Did NOT add Article/CreativeWork schema to case pages: portfolio cases are not editorial Articles, ~zero search demand, and Article needs datePublished/author/image to validate. Low value, skipped.
- FAQPage markup is valid but inert for rich results (Google restricted FAQ rich results to gov/health since Aug 2023). Keep it; do not count as a ranking win.
