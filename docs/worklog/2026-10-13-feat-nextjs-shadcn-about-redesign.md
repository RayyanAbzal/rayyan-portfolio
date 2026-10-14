# 2026-10-13 feat/nextjs-shadcn: layout rhythm and About redesign

Immutable record.

## Layout pass (non-about items)

- Commit 92a59e6. `--section-y: clamp(56px, 6vw, 80px)` for every section; `.has-rule::before` draws a hairline at the section boundary (negative top margin into the padding, so the gap above and below is equal) on home services, about, quote and contact. The quote section dropped `.tight`. Home about teaser got h2 "Who builds it" (`content/home.ts`, also `## Who builds it` in /index.md, replacing the old `## Rayyan Abzal` mirror heading). The CTA "30-minute" is a `{ nowrap }` Rich run, so it never splits at the hyphen; it is two lines at 320, 390 and 1280.
- Ray cancelled the 2x2 principle cards and sticky side cards (items 4 and 5 of that brief) before they were built.

## About redesign (direction: .impeccable/surfaces/about.md)

- Opening: h1, name and role line, lead statement, prose. Facts strip: five terms (Day job, Stack, Work, Capacity, Location). The label words are the only new text, taken from the brief; values are the old side cards. Principles: one pine panel. Process: horizontal line, vertical under 860px. Testimonials: lead quote with the single `.mark` (`LEAD_QUOTE_MARK` in content/about.ts) plus two quiet quotes. FAQ: hairline accordion, answer right of question at 761px and up.
- The old `.steps`, `.quote-row` and carded `.faq` CSS were removed; `.about-split`, `.side-card` and `.prose` stay (Contact page uses them).
- Mirror: facts bullets carry the label; process steps are level-3 headings; section order matches the page.

## Checked

- Chrome at 320, 390, 1280: no horizontal overflow, one h1, one `.mark`, FAQ first item open, answer right of the question at 1280 (question ends 564px, answer starts 616px), panel is pine.
- vitest 38 passed; tsc and lint clean; `npm run build` ok.

## Not checked

- Visual QA at 390 (screenshot looked at for 1280 only), keyboard walk of the accordion, contrast of cream text on pine beyond the token values already used on the CTA panel.
