# WORKLOG

**Updated:** 2026-06-16

## Active task

SEO audit (/seo) of rayyanabzal.com + applied mechanical fixes. Committed, not yet deployed.

## Phase

reviewing

## Files changed this session

- `index.html` - Google Fonts link switched to `rel=preload` + `onload` swap + `<noscript>` fallback (removes one render-blocking request)
- `work/influence.html` - same font async change; title/og:title/twitter:title trimmed to "Influence CRM Case Study | Rayyan Abzal" (39 chars)
- `work/influence-v2.html` - font async; titles to "Influence v2 Dashboard Case Study | Rayyan Abzal" (48)
- `work/feedhack.html` - font async; titles to "FeedHack Discord Automation Case Study | Rayyan Abzal" (53)
- `work/pumpdat.html` - font async; titles to "pumpdat Token Launchpad Case Study | Rayyan Abzal" (49)
- `sitemap.xml` - bumped homepage lastmod to 06-15 then REVERTED to 06-13 (no net change, see decisions)

## Next step

Decide deploy path: merge `chore/seo-mechanical-fixes` to `main` + `git push` (Vercel auto-deploys), or open a PR. After deploy, eyeball font load on Vercel preview for FOUT (design-led check).

## Open questions

- Deploy now (merge to main) or PR first? User's call.
- Off-page (no code, user's call): create Google Business Profile (biggest "AI consultant Auckland" lever); add GitHub/X to `Person.sameAs` (currently LinkedIn only)

## Key decisions

- Commit `f6b6862` on branch `chore/seo-mechanical-fixes`: font async (5 pages) + 4 case-title rewrites. Staged exact 5 paths only; WORKLOG.md left pre-dirty, sitemap not staged.
- Audit verdict: on-page technical SEO essentially complete. Homepage (only real search target) already excellent: title 54 chars, desc 159, clean H1, ProfessionalService+Person+FAQPage schema all valid. Ceiling is off-page now.
- Case titles: dropped redundant "AI Consultant NZ/Auckland" location tail (was truncating in SERP); kept the descriptor (Discord automation, token launchpad) which carries the long-tail value. Homepage owns the brand keyword.
- Sitemap lastmod: REVERTED my bump. Advisor caught it: b169c17 (06-15) only relocates the mobile-CTA div (presentation, not content). Under the content-change rule (correct, non-spam), homepage's last real content change was 06-13, so the original value was already right. Lesson: sitemap lastmod tracks content changes, not file mtime; font/layout tweaks do not bump it.
- Did NOT add Article/CreativeWork schema to case pages: portfolio cases are not editorial Articles, ~zero search demand, and Article needs datePublished/author/image to validate. Low value, skipped.
- FAQPage markup is valid but inert for rich results (Google restricted FAQ rich results to gov/health since Aug 2023). Keep it; do not count as a ranking win.
