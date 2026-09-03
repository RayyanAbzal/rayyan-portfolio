# WORKLOG

**Updated:** 2026-09-04

## Active task

Work section redesign: image-led client cards (bencium.io/projects reference) using CSS-drawn product schematics instead of screenshots. Built, inspected desktop + mobile, committed on `feat/work-schematic-cards`.

## Phase

built, awaiting Ray's review + merge

## Files changed this session

- `index.html` - 4 client cards in `#work` rebuilt: `.card-visual` schematic block on top (CRM table / Discord payout pipeline / bonding curve + trade feed / partner roster with FTD bars), meta row moved into body, stack chips removed from home cards (case pages still list the stack). `.path` kept for cross-document view transitions.
- `styles.css` - `.card-head` + `.card-stack` + chip hover stagger removed; `.card-meta-row` + `.card-visual` / `.vis-*` schematic styles added before `/* Personal */`; mobile (<480) collapses to 3 columns, hides 5th CRM row, 4/3 aspect; reduced-motion disables runner/pulse/lift.

## Next step

Ray eyeballs `#work` locally (`python3 -m http.server`), then `git checkout main && git merge --ff-only feat/work-schematic-cards && git push origin main` (Vercel auto-deploys).

## Open questions

- Personal Builds cards untouched (still text-only). Give them mini schematics too, or leave them lighter to keep hierarchy? Ray's call.
- Schematic data is invented placeholder (handles, amounts, partner_a..d). Fine for client privacy, but confirm nothing reads as a real client claim.
- Should `/work` become its own page like bencium once >6 items? Not yet.

## Key decisions

- Full-site restyle toward bencium rejected: the real gap was imagery, not layout or palette. Kept cream/pine/mono system, lifted only the Work cards.
- No client screenshots (Ray, 2026-09-04): each card gets a CSS/SVG abstract of what the product does, one authored hover moment per card (frame lift + toast, or pipeline runner dot).
- Impeccable detector (regex fallback, undercount): 3 findings, all pre-existing and out of scope (aphoristic copy cadence x6, `.principle` 4px side-tab, body grid background). Logged, not fixed.
