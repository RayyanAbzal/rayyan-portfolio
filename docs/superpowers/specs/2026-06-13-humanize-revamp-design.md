# Humanize Revamp (Direction B) - Design

Date: 2026-06-13
Status: approved by Ray (brainstorm session, visual companion)

## Goal

A non-technical visitor never sees code syntax anywhere on the site. The builder identity survives through the palette, mono accents, and craft details, not through the terminal costume. The site's own pitch ("I explain things in plain language", "most of my clients are non-technical founders") finally matches its packaging.

## Direction chosen

Three options were mocked up (A: translate commands only, B: warm professional, C: full humanize). Ray chose B: kill the terminal metaphor entirely, keep the paper-and-pine design system and JetBrains Mono for small labels and numbers only.

## Scope

All 5 pages: index.html plus the 4 case studies (work/influence.html, work/influence-v2.html, work/feedhack.html, work/pumpdat.html). 404.html gets the same pass if it contains terminal chrome.

## Removals (terminal language)

| Current | Replacement |
|---|---|
| Nav `rayyan-consulting@auckland:~$` + cursor | "Rayyan Abzal" wordmark with mono "AI consulting" suffix |
| `$ whoami` hero prompt line | removed; hero starts at the h1 |
| `~/status.json` / `~/whoami.txt` card headers + window dots | mono small-caps card label ("At a glance"), no dots |
| `~/shipping.log` header | mono small-caps label, no fake filename |
| `// about`, `// principles`, other section markers | mono small-caps section labels ("About", "Principles") |
| `[01] // replace, don't add` principle numbers | "01 · Replace, don't add" |
| `./discovery`, `./book_call` inline mono references | plain English ("the intro call is free") |
| `~/work/influence`, `~/lab/fios` card paths | project name + plain meta ("client project · shipped", "personal build") |
| `$ seen the work?`, `$ want the same result?` inline CTA prompts | same sentence without the `$` prompt styling |
| `discovery_call`, `proposal + process_map`, `build_phase`, `handover` step names | "We talk", "You get a plan", "I build", "You own it" |
| `$ ./book_call --type=discovery` contact prompt | removed; contact h2 becomes "Let's figure out what's eating your week" |
| Guest terminal widget (contact section) | deleted entirely; strong plain CTA block instead |
| Cmd+K command palette | deleted entirely |
| `~/email`, `~/linkedin` footer links | "Email", "LinkedIn" |
| Blinking cursors (`.cursor`, `.cursor-end`) | removed |
| snake_case and path-style strings in any visible copy | plain English |

Case pages get the same translation wherever styles-case.css chrome uses these patterns.

## What stays

- Cream (#f5f1e8) / pine (#2f5e3e) palette, Inter Tight + JetBrains Mono, section banding.
- Full motion system: reveal lifecycle, stagger, counters, scrollspy, progress bar. No-JS and reduced-motion fallbacks unchanged.
- Mono font for: section labels, card keys, tags, numbers, footer "built in Auckland, NZ".
- Tech chips on work cards (next.js, supabase, and the rest). Factual stack names, useful for technical evaluators.
- All Calendly CTAs and `bookCall()` analytics sources, unchanged event names.
- SEO surface: titles, meta descriptions, JSON-LD, sitemap URLs. Copy edits only where visible text changes; structured data updated to match new visible wording where they overlap.

## Copy tone rules

- Plain language, outcome-first, first person.
- Visible copy says "free intro call"; the Calendly URL (calendly.com/rayyanabzal/discovery) stays as-is.
- No code metaphors in new copy. No em dashes. No list fillers; every list ends explicitly.

## Files

Touched: index.html, work/influence.html, work/influence-v2.html, work/feedhack.html, work/pumpdat.html, 404.html (if chrome present), styles.css, styles-case.css (prune dead terminal styles), js/site.js (remove terminal references if any), js/motion.js (remove cursor/boot references).

Deleted: js/terminal.js, js/palette.js (and their script tags on every page).

Updated: CLAUDE.md file map, sitemap.xml lastmod, WORKLOG.md.

## Testing

Post-build browser pass (browser-qa skill):

- Every booking CTA opens Calendly and fires its analytics source.
- FAQ accordion works.
- Motion reveals run; no element stuck hidden after terminal/palette script removal.
- Zero console errors (especially from removed script tags).
- Mobile sticky CTA appears and hides at the right scroll points.
- Reduced-motion and no-JS visitors get the full static page.
- Case pages render correctly with pruned styles-case.css.

## Out of scope

- Any visual redesign beyond the removals above. If the site still feels too "developer" after this ships, a Claude Design full-redesign pass is a separate future project.
- New sections, new content, pricing changes.
