# feat/nextjs-shadcn - 2026-10-21

**As of:** a794314 + PR #1 (open, MERGEABLE, not merged). No code changed this session; only uncommitted mocks.

## What this branch is doing
Exploring a home-page redesign (less "AI slop", more premium) through static mocks only. Nothing built, no brief written, `build-phase.mjs start` not run.

## Done on this branch
- `.impeccable/mocks/directions.html`, `directions-e.html`, `graphite.html`, `g3-variants.html`: earlier direction rounds (signboard, docket, wayfinding, envelope, standard, graphite G1-G4, V1-V4). Uncommitted.
- `.impeccable/mocks/hero-alternatives.html`: H1-H4 (work index, question, client quote, plain note). Uncommitted.
- `.impeccable/mocks/hero-alternatives-2.html`: J1-J6 light layouts (editorial letter, fixed-price quote, before/after, four numbers, week bars, conversation). Uncommitted.
- `.impeccable/mocks/graphite-round3.html`: K1-K6 in graphite world (datasheet, contents list, cropped name, three columns, case-file tabs, numbers plus quote). Uncommitted.
- `.impeccable/mocks/round4.html`: M1-M6 (signed note with photo, bento with one big cell, project-as-hero, strip across grid, serif numerals, four colour fields). Uncommitted.
- Research: web sweep on avoiding AI-generated look; MengTo/Skills repo read as reference only (editorial-portfolio-chapters, editorial-tech, product-proof-saas, number-details, editorial-service-booking, audit-reference-originality). Not installed.

## Next on this branch
Ray picks one mock or a mix (picks I suggested: M3 and M1, or K2/K5, or J4/J5). Then: write the home surface brief in `.impeccable/surfaces/`, run `build-phase.mjs start --direction ef8c64fb --kind <...>` (concept-seed key ef8c64fb, assigned index 7), build on a new branch off feat/nextjs-shadcn as PR #2.

## Decisions made here
- Do not install MengTo/Skills (176 skills, mostly WebGL/games, adds a third design lane, bloats skill listing); use as read-only reference. (local)
- Single big one-liner headline ("I build AI that runs your business.") rejected by Ray as slop; replace with proof-led or structural hero. (local)

## Gotchas hit
- Web search returned listicles and directories, not good example sites; exemplars named by sources are unverified.
- Mocks use placeholder boxes for photo and build screens; M5 serif is a system stand-in.

## Constraints stated
- "No go back to the previous designs and colour schemes just give me more options etc and different more novel designs/professional and not ai slop" (graphite world, novel, professional).
- "We need premium animations as well and don't want it looking ai generated/ai slop."
- Earlier: show visuals of every choice; Ray decides after seeing all.
- Unanswered, blocking build: photo available?; real build screenshots (personal vs redacted client; overrides "no client screenshots"); second typeface (overrides Inter Tight-only in DESIGN.md); relax CLAUDE.md "Reveal only on card grids" motion rule (log in docs/decisions.md); confirm invented copy (FeedHack "0 admin hours", "3 still live", "you own the code", "48 hours", project years, 4-step process).
- Carry-over blocked on Ray: Vercel Framework Preset to Next.js, merge of PR #1, /privacy review.
