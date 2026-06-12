# WORKLOG

**Updated:** 2026-06-12

## Active task
Portfolio animation polish + case study preview redesign complete; ready for QA and merge

## Phase
reviewing

## Files changed this session
- `styles.css` - spring easing on all reveals, hero boot spring animations, lateral drift on hs-rows, header file path wipe, tag-entrance animation, muted sub-text two-stage reveal, panel-activate glow, reduced-motion + motion-failed fallbacks; removed status-scan sweep line
- `styles-case.css` - full preview panel CSS rewrite: app bar, CRM grid, KPI cards, progress bar, message blocks, trade grid, responsive at 640px
- `work/influence.html` - preview replaced: CRM table with app bar, 5-col grid (creator/platform/eng-rate/v-score/stage), responsive 3-col mobile
- `work/influence-v2.html` - preview replaced: 6 KPI cards grid + FTD progress bar (71%)
- `work/feedhack.html` - preview replaced: Discord bot message blocks with [ok] checks and [err] rejection
- `work/pumpdat.html` - preview replaced: token table + live trade feed (BUY/SELL rows) via websocket section

## Next step
Browser QA pass across index + all 4 case pages (desktop + mobile 390px). Then:
`git checkout main && git merge feat/showcase-redesign && git push origin main`

## Open questions
None blocking.

## Key decisions
- All animations fire once on load/reveal only, no looping decorative animations
- Spring easing `cubic-bezier(0.16, 1, 0.3, 1)` on all reveals
- Status-scan sweep line removed (user request)
- Preview panels look like real app UIs: CRM table, dashboard cards, Discord bot log, trade feed
- Grid classes per layout: `.pr-g-crm` (5-col), `.pr-g-token` (5-col), `.pr-g-trade` (4-col) collapse to 3-col at 640px via `.pr-sm-hide`
- Progress bars use named CSS class `.pr-prog-71`, no inline styles
