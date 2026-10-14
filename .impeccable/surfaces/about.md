# About surface brief

Mode: Read, with a Persuade close. A founder deciding whether this one person is the right fit.

## Why the current page fails ("too generic AI", Ray, 2026-10-13)

- Every section is the same move: big h2, small lede, a row of paper cards. Rhythm is uniform, nothing leads.
- Five side cards, four numbered step cards with pale numerals, three equal testimonial cards, a carded FAQ: the stock SaaS About template.
- The five principles are same-weight h3s in one long column, so the page's actual argument reads as filler.
- Nothing feels like one person wrote it.

## Direction

A quiet editorial page. Fewer containers, more type and hairlines, the home page's offer-list language reused (hairline rows, text left, fact right). Palette, type and radius unchanged: stone ground, paper only where a surface earns it, pine as the single dark moment, gold as the one marker.

Product truth and copy stay verbatim. No photo exists, none is faked. No new claims.

## Sections, in order

1. Opening. Existing h1. Under it, the "person who scopes your project..." sentence set large as the page's lead statement (display-adjacent, not a lede), the name/role line small above it. The three prose paragraphs follow in one calm column.
2. Facts strip. Replace the five side cards with one plain definition list on hairlines (Practice, Day job, Stack, Work, Capacity, Location), laid out as a horizontal strip on desktop and stacked rows on mobile. No card chrome.
3. Principles. One pine panel, the single dark surface on the page. Heading "AI is a tool, not a deliverable". Four principles as hairline-separated rows: principle title large on the left, its paragraph on the right (stacked on mobile). No icons, no numerals.
4. Process. One horizontal line with four stops (stacked vertical line on mobile). Each stop: step name, one sentence, the timing label ("Free", "Within 48 hours", "1 to 8 weeks", "30 days included"). No cards, no giant pale numerals.
5. Testimonials. The Influence v2 quote set large as the lead, in the gold-marked style already used on home (one `.mark` max). The other two as a pair of smaller quotes divided by hairlines, no card boxes. Attribution stays role-only.
6. FAQ. Hairline list with no outer card. Question left, answer right on desktop (accordion on mobile, first open). Same seven questions, same answers.
7. Close. Existing CTA panel unchanged.

## Constraints

- One h1, headings never skip a level, skip link target intact.
- Reveal motion only where the project rule allows (hero panel, card grids). This page has none of those after the redesign, so no reveal.
- All copy comes from content/about.ts; markdown mirror, llms.txt and JSON-LD must still match the visible text.
- Section spacing uses the new rhythm tokens from the layout pass, not ad hoc values.
- 320px: no horizontal overflow; facts strip and process line stack cleanly.
- Never use monospace. Never use side-stripe borders, gradient text, or glass.
