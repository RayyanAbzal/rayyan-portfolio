---
name: rayyanabzal.com
description: A quiet room with one loud sentence. Zero-chroma neutrals in light and dark, one green hue for live and selected, blue only for focus. Home shows the work moving; inner pages stay calm.
colors:
  bg: "oklch(0.985 0 0)"
  bg-dark: "oklch(0.17 0 0)"
  surface: "oklch(1 0 0)"
  surface-dark: "oklch(0.21 0 0)"
  sunken: "oklch(0.965 0 0)"
  sunken-dark: "oklch(0.235 0 0)"
  ink: "oklch(0.2 0 0)"
  ink-dark: "oklch(0.95 0 0)"
  ink-2: "oklch(0.47 0 0)"
  ink-2-dark: "oklch(0.74 0 0)"
  ink-3: "oklch(0.53 0 0)"
  ink-3-dark: "oklch(0.66 0 0)"
  line: "oklch(0 0 0 / 0.08)"
  line-2: "oklch(0 0 0 / 0.14)"
  panel: "oklch(0.2 0 0)"
  panel-dark: "oklch(0.25 0 0)"
  on-panel: "oklch(0.985 0 0)"
  on-panel-dark: "oklch(0.95 0 0)"
  live: "oklch(0.62 0.15 150)"
  tint: "oklch(0.93 0.06 150)"
  tint-dark: "oklch(0.36 0.07 150)"
  tint-ink: "oklch(0.38 0.09 150)"
  tint-ink-dark: "oklch(0.86 0.1 150)"
  focus: "oklch(0.55 0.15 250)"
  focus-dark: "oklch(0.7 0.13 250)"
  warn: "oklch(0.5 0.12 55)"
typography:
  display:
    fontFamily: "Open Runde, Inter, system-ui, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(34px, 4.6vw, 56px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  hero-sentence:
    fontFamily: "Open Runde, Inter, system-ui, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "-0.012em"
  lede:
    fontFamily: "Open Runde, Inter, system-ui, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(18px, 1.6vw, 21px)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Open Runde, Inter, system-ui, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  body-home:
    fontFamily: "Open Runde, Inter, system-ui, Helvetica Neue, Arial, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.6
  row-label:
    fontFamily: "Open Runde, Inter, system-ui, Helvetica Neue, Arial, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.6
  note:
    fontFamily: "Open Runde, Inter, system-ui, Helvetica Neue, Arial, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
  data:
    fontFamily: "Open Runde, Inter, system-ui, Helvetica Neue, Arial, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.35
rounded:
  surface: "24px"
  plate: "14px"
  stage: "16px"
  panel: "12px"
  control: "10px"
  step: "10px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 3vw, 24px)"
  section-y: "clamp(56px, 6vw, 80px)"
  row-y: "40px"
  row-label-col: "132px"
  home-gap: "48px"
  max-width: "1200px"
components:
  button-default:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "40px"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "40px"
  button-inverse:
    backgroundColor: "{colors.on-panel}"
    textColor: "{colors.panel}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "40px"
  mini-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
  teardown-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "14px 16px"
  offer-stage:
    backgroundColor: "{colors.sunken}"
    textColor: "{colors.ink}"
    rounded: "{rounded.stage}"
  work-plate:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "14px"
  feature-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.on-panel}"
    rounded: "{rounded.surface}"
---

# Design System: rayyanabzal.com

## Overview

**Creative North Star: "A Quiet Room with One Loud Sentence"**

A single-person AI engineering practice in Auckland. The ground is zero-chroma grey, after jakub.kr: near-white in light, near-black in dark, switched by `prefers-color-scheme` with no toggle. Chroma is spent in two places only. One green hue (150) marks live state and the selected tint. One blue marks keyboard focus. Everything else, including the primary button, is ink.

The home page shows the work moving. A teardown hero puts a draggable exploded drawing of the AI harness beside one plain sentence. The client builds are an exploded stack of three plates (data, logic, interface) that tilts and swaps per project. The offers are living scenes that play a short loop on select. Inner pages (work, case, about, contact, privacy) stay calm: static, hairline-ruled, no entrance motion beyond the card grids.

This replaces the earlier warm stone, pine-green and kowhai-gold world. None of those values survive in the build; the legacy token names (`pine`, `pine-2`, `gold`, `sage`, `well`) are kept as aliases so older CSS still resolves, and they now point at the neutrals and the green tint.

**Key Characteristics:**
- Zero-chroma ground, surface and sunken steps; text in three inks (ink, ink-2, ink-3)
- Hairline edges (`--line`, `--line-2`) instead of borders; a soft two-layer shadow only on drawn product
- One green hue (150) for live dots, selected tint and the mark; blue (250) only for focus
- Fills are ink-coloured and flip with the scheme; feature panels are dark in both schemes
- One typeface, Open Runde, 400 to 700; the same face with tabular numerals carries all drawn data
- Press feedback is scale only (0.96 to 0.97); hover is opacity or a sunken wash

## Colors

Neutral by construction. All values are in `app/globals.css` `:root`; the dark block overrides only the values that must change.

### Neutral
- **Bg** (`--bg`, `oklch(0.985 0 0)`; dark `0.17`): page ground, nav ground, the on-fill text colour.
- **Bg 2** (`--bg-2`, `0.965`; dark `0.2`): muted fill.
- **Surface** (`--surface`, `oklch(1 0 0)`; dark `0.21`): cards, mini panels, plates, steps, tooltips. Aliased as `paper`.
- **Sunken** (`--sunken`, `0.965`; dark `0.235`): the bed behind drawn product, the active list row, the offer stage. Aliased as `well`, `sage`, `paper-2`.
- **Ink** (`--ink`, `0.2`; dark `0.95`): headlines, body, filled buttons (`--pine` aliases ink).
- **Ink 2** (`--ink-2`, `0.47`; dark `0.74`): ledes, card copy, quote attribution.
- **Ink 3** (`--ink-3`, `0.53`; dark `0.66`): the quietest legible text (row labels, hints, notes). Held at 0.53 because 0.56 measured 4.48:1 on the ground, just under AA.
- **Line** (`--line`, `oklch(0 0 0 / 0.08)`) and **Line 2** (`0.14`; dark uses white at 0.08 and 0.15): hairline rules between rows, inset edges on surfaces, resting fill of bars and meters.

### Green (hue 150)
- **Live** (`--live`, `oklch(0.62 0.15 150)`): the status dot (7px with an 18% halo) and the underline of a pressed offer pick. Never a fill for a surface.
- **Tint** (`--tint`, `0.93 0.06 150`; dark `0.36 0.07 150`): highlighted table rows and suggested rows at 45 to 55% mix; the selected drawing part.
- **Tint ink** (`--tint-ink`, `0.38 0.09 150`; dark `0.86 0.1 150`): text on tint. Aliased as `pine-2`.
- **Gold** (legacy name, `oklch(0.86 0.1 150)`) and **Gold 2** (`0.8 0.1 150`): a soft green, kept for `.mark`, text selection and the focus ring on dark bands. Not yellow.

### Blue (hue 250)
- **Focus** (`--focus`, `oklch(0.55 0.15 250)`; dark `0.7 0.13 250`): the only blue. 2px outline, 2px offset, 6px radius on every `:focus-visible`; inside dark bands the ring switches to the green gold.

### Panels
- **Panel** (`--panel`, `oklch(0.2 0 0)`; dark `0.25`) and **On panel** (`oklch(0.985 0 0)`; dark `0.95`): the feature panels (principles, closing bands). Dark in both schemes so a weighted block never turns into a white slab in dark mode.
- **Deep** (`--deep`, `oklch(0.2 0.03 160)`; dark `0.23`): the case-preview ground, a faintly green near-black. Text on it uses `--cream` (250 250 250); status colours on it are `--ok-on-dark` and `--warn-on-dark`.
- **Warn** (`--warn`, `oklch(0.5 0.12 55)`): destructive and caution text. Rare.

### Named Rules
**The Two Hues Rule.** Green (150) means live or selected. Blue (250) means focus. No other hue is introduced, and neither is used as a decorative fill.

**The Ink Fill Rule.** The primary button and every solid control is ink on bg and flips with the scheme. Colour is never the signal that something is clickable.

**The Panel Text Rule.** On `--panel` or `--deep`, text is `--on-panel` or `--cream` at reduced opacity. Grey ink tokens never sit on a dark panel.

## Typography

**Family:** Open Runde (OFL 1.1), self-hosted static WOFF2 in `app/fonts/` through `next/font/local`, weights 400, 500, 600, 700, subset to latin, latin-ext A and macrons. Fallbacks: Inter, system-ui, Helvetica Neue, Arial. `cv11` and `ss03` on. Data uses the same face (`--data: var(--font)`) with `font-variant-numeric: tabular-nums`.

### Hierarchy
- **Display** (700, `clamp(34px, 4.6vw, 56px)`, 1.02, -0.03em): `h2.display` section headings on inner pages and the closing band.
- **Hero sentence** (500, 22px, 1.45, -0.012em, max 30ch): the home h1. Headline words in ink, the rest in `.soft` (ink-2). It is a sentence, not a display headline; the loudness comes from the room around it.
- **Lede** (400, `clamp(18px, 1.6vw, 21px)`, 1.5, ink-2, max 58ch): inner-page intros.
- **Body** (400, 17px, 1.55): base on inner pages. Home scopes `.home-n` down to 15.5px at 1.6.
- **Row label** (400, 14.5px, ink-3): the quiet left-column heading of each home row. Sentence case, no tracking.
- **Name and value** (500): project names, step labels, `b` lines in cards. 600 is for links and inner-page headings; 700 for display only.
- **Note** (400, 13.5px, ink-3): hints and disclosures. Footer text on the home closing row is 14.5px.
- **Data** (400, 12.5px, 1.35, tabular): drawn product inside `.panel`, 11.5px for headers, 10.5px inside the exploded interface plate.

### Named Rules
**The Weight Ladder Rule.** Four weights exist (400, 500, 600, 700). There are no in-between weights and no weight is synthesised.

**The No Kicker Rule.** No eyebrow, kicker or overline above a heading. A section opens on its row label or its headline.

**The Data Face Rule.** Drawn product is the body face with tabular numerals. No second family for data.

## Layout

One centred column, max 1200px, fluid gutter `clamp(20px, 3vw, 24px)`. Inner pages stack sections at `--section-y` (`clamp(56px, 6vw, 80px)`) with `.has-rule` hairlines.

Home is a stack of rows. Each `section.row` is a 132px label column plus content, 24px gap, 40px vertical padding, a 1px `--line` rule on top; below 640px the label stacks above the content at a 14px gap. The hero is the exception: lede left, drawing right at `minmax(0, 420px)`, 56px gap, 72px top and 56px bottom padding, and the copy column drops 120px so the sentence sits level with the middle of the drawing. At 860px the hero stacks and the offset is removed.

Home grids: exploded work is 1fr / 1.15fr at 48px; offers are 1fr / 380px at 48px (the scene moves above the list at 860px). Below 1100px the work legend becomes a wrapped row under the stage; at 860px the stage moves above the list.

Nav is name (home), Projects, About, Book a call as text links with `aria-current="page"` on the current page. A skip link is first in the body. A sticky mobile book bar is a direct child of the page, shown after `#services` and hidden at `#contact`.

## Elevation & Depth

Tonal first. Surface on ground, sunken inside surface. Two shadow tokens only:
- **Shadow** (`0 1px 2px oklch(0 0 0 / 0.05), 0 4px 16px -4px oklch(0 0 0 / 0.07)`): default buttons, mini panels, the teardown card. Dark: stronger black at 0.4 and 0.5.
- **Shadow large** (`0 2px 4px oklch(0 0 0 / 0.04), 0 16px 40px -12px oklch(0 0 0 / 0.16)`): the "automated" card in the offers scene and the device frame in case previews. Dark: 0.3 and 0.7.
- **Plate edge** (`0 30px 40px -24px oklch(0 0 0 / 0.25)` plus a 1px `--line-2` inset): the exploded work plates, which need to separate from each other in depth.

Edges are drawn with `inset 0 0 0 1px var(--line)` so they cost no layout.

### Named Rules
**The Soft Shadow Rule.** Large blur, negative spread, never black at full strength. No hard offset shadows.

**The Hairline Rule.** Edges are 1px `--line` or `--line-2`. No heavier border.

## Shapes

Radius scales with the thing. Content surfaces use `--r` 24px. Drawn product steps down: stage 16px, exploded plates 14px, mini panels and the teardown card 12px, steps and nodes 8 to 10px, checkbox 4px. Buttons are 10px (not pills) and 40px tall. Status dots, meters and the mobile pill are fully round. The focus ring radius is 6px.

## Components

### Button
- **Default:** ink fill, bg text, 10px radius, `min-h-10`, 10px 16px padding, 15px at 500, one line (wraps centred below 360px). Hover is opacity 0.88; press is scale 0.97 over 150ms on `cubic-bezier(0.23, 1, 0.32, 1)`; disabled and `aria-disabled` do not press. A transparent 1px border keeps an edge in forced-colors.
- **Outline:** surface fill, ink text, `--line-2` border, hover to `paper-2`. The secondary beside a default button.
- **Gold (variant name kept):** the inverse button on dark panels: `on-panel` fill, `panel` text. Not gold in colour.

### Text links
600 weight, 2px `--line-2` underline at 5px offset. `.link-arrow` appends an arrow. In the closing row the email link uses a 3px offset.

### Teardown hero (home signature)
The server-rendered harness drawing sits in `.td-stage` with its own labels hidden. The canvas is draggable (`touch-action: pan-y`, grab cursor) and a range input scrubs the same exploded state (accent ink). Hovering or selecting a part fills it with the tint; the teardown card below (12px radius, shadow, min-height 92px) names the piece in 500 with the layer in ink-3 and a plain sentence in ink-2. A "more" link goes to /harness.

### Exploded work (home signature)
A list of the four client builds on the left (name 500, tabular detail in ink-3, one-line result; active and hover rows on `sunken`, 10px radius). On the right a rig tilted `rotateX(52deg) rotateZ(-38deg)` holds three plates (data, logic, interface) spaced by `--z` times `--open`. Each plate is a 14px surface with a `--line-2` edge; the data plate sits on sunken. A legend tags each plate with a 22px leader line. Selecting a project blurs and swaps plate contents. Below 860px the rig shrinks (`--zk: 0.55`) and moves above the list. The hover hint is hidden on touch.

### Living offers (home signature)
A hairline list of offers (name, tabular duration in ink-3, one paragraph, proof link) and a 300px sunken stage with three scenes: a checklist that ticks and collapses into one automated card, a query that types and fills suggested rows in tint, and blocks that fly in and assemble with a sparkline. A pick is a text button; pressed state turns its underline live-green. A 3px meter per scene runs under the stage; it is hidden under reduced motion, which shows each scene in its settled state.

### Mini panel
`.home-n .panel`: surface, 12px radius, shadow plus 1px inset line, 12.5px data with tabular numerals, header bar with a 500 title and ink-3 small text, hairline-separated rows, highlighted row in tint, right-aligned numeric column.

### Quotes and closing row
Quotes are plain blockquotes at body size with a role and project footer in ink-3; no card, no mark. The closing row has a 500 18px title, one paragraph at 46ch in ink-2, a default button and an "or email" alternative in ink-2.

### Inner pages
Offers as a three-column hairline list, numbered build columns, about as an editorial layout (principles panel on `--panel`), FAQ as native disclosure rows with a grid-rows height transition, case pages with a back link, a facts line, and the dark `.case-preview` on `--deep` holding synthetic data. Client screenshots are never used; product is drawn.

### Motion
Defined in `app/styles/motion.css`, `novelty.css` and CLAUDE.md. Everything animates only inside `prefers-reduced-motion: no-preference`. Entrances 300ms on `cubic-bezier(0.2, 0, 0, 1)`; hover 150ms or less; exploded plates 700ms on `--ease-out` staggered 50ms, legend tags fade 300ms after 200ms plus 60ms per tag; scene crossfade 260ms; blocks assemble over 900ms staggered 70ms; drawing toggle uses `--ease-io` at 480ms. Animate opacity, transform and filter by name, never `all`. Reduced motion shows the complete static page.

## Do's and Don'ts

### Do:
- **Do** use tokens (`--ink`, `--surface`, `--sunken`, `--live`, `--tint`, `--focus`) and let the dark block do the theming; check both schemes.
- **Do** keep text on `--ink-3` at or above 0.53 lightness in light and 0.66 in dark.
- **Do** draw product as synthetic data in the body face with tabular numerals and disclose it.
- **Do** make every animation work with `prefers-reduced-motion` off the page's content: nothing is hidden behind motion.
- **Do** keep hover-only styling inside `@media (hover: hover)` and hide hover hints on `(hover: none)`.
- **Do** mark the current nav item with `aria-current="page"`.
- **Do** use a plain-sentence row label, sentence case, no tracking.

### Don't:
- **Don't** reintroduce pine green, kowhai yellow or warm stone values; legacy token names are aliases, not a palette.
- **Don't** add a hue beyond green 150 and blue 250.
- **Don't** use blue for anything but focus, or green as a surface fill.
- **Don't** put grey ink tokens on `--panel` or `--deep`.
- **Don't** use monospace, a second typeface or a system display face.
- **Don't** add looping decorative motion; the only continuous motion is the gallop on /harness started by the visitor and the scene loops on home.
- **Don't** add hard offset shadows or borders heavier than 1px.
- **Don't** use client screenshots or stock imagery.

## Not canonized

Recorded as defects the build carries, not rules for new surfaces:
- `app/styles/home.css` `.sec-head h2` is uppercase, tracked and 600. That is a kicker-style label and the home rows deliberately replaced it with a sentence-case row label. Do not copy it.
- `--font-mono` is mapped to the body face in `@theme inline` only so shadcn utilities resolve; monospace is not part of the system.
- `--pine-rgb` (12 92 60) in `:root` is a leftover of the old green world and should be removed when its last reader is.
- Legacy aliases (`pine`, `pine-2`, `pine-tint`, `gold`, `gold-2`, `sage`, `well`) exist for compatibility; new code uses the neutral names.
