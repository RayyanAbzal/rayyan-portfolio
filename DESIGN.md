---
name: rayyanabzal.com
description: A quiet room with one loud sentence. Near-white warm ground, white cards on a hairline, pine buttons, one gold marker.
colors:
  stone: "#f5f3ee"
  stone-deep: "#ebe8e1"
  paper: "#fffdf9"
  paper-deep: "#f6f4ef"
  well: "#e6ebe3"
  sage: "#dde7da"
  sage-deep: "#c9d8c5"
  ink: "#17150f"
  ink-soft: "#45413a"
  ink-muted: "#5c574f"
  line: "rgba(23, 21, 15, 0.1)"
  line-strong: "rgba(23, 21, 15, 0.18)"
  pine: "#1f3d2b"
  pine-bright: "#2f5e3e"
  pine-tint: "rgba(47, 94, 62, 0.12)"
  gold: "#f3c94a"
  gold-deep: "#e0b12e"
typography:
  display:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(44px, 7.2vw, 96px)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  display-case:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(48px, 9vw, 124px)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(34px, 4.6vw, 56px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline-block:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(26px, 3.2vw, 38px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  lede:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(18px, 1.6vw, 21px)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  body-small:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  value:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    letterSpacing: "-0.015em"
  note:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
  data:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.3
rounded:
  pill: "999px"
  panel: "32px"
  surface: "24px"
  surface-sm: "20px"
  cell: "18px"
  frame: "12px"
  focus: "6px"
spacing:
  gutter: "clamp(20px, 3vw, 24px)"
  section: "clamp(64px, 8vw, 112px)"
  section-tight: "clamp(24px, 3vw, 40px)"
  section-head: "clamp(32px, 4vw, 48px)"
  grid-gap: "24px"
  card-body: "26px 28px 28px"
  surface-pad: "30px"
  panel-pad: "clamp(40px, 7vw, 96px) clamp(24px, 6vw, 88px)"
  nav-height: "70px"
  max-width: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
    typography: "{typography.body-small}"
  button-primary-hover:
    backgroundColor: "{colors.pine-bright}"
    textColor: "{colors.paper}"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-gold-hover:
    backgroundColor: "{colors.gold-deep}"
    textColor: "{colors.ink}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-nav:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "{spacing.card-body}"
  offer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "{spacing.surface-pad}"
  side-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface-sm}"
    padding: "22px 24px"
  hero-panel:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
  cta-panel:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.paper}"
    rounded: "{rounded.panel}"
    padding: "clamp(40px, 6vw, 80px) clamp(24px, 6vw, 88px)"
  chip:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
    typography: "{typography.note}"
  mobile-nav-pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  mobile-nav-pill-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
---

# Design System: rayyanabzal.com

## Overview

**Creative North Star: "A Quiet Room with One Loud Sentence"**

The site is a single-person AI engineering practice in Auckland, and the visual system is built so that one headline does the talking and everything else stays out of its way. The page ground is a near-white warm stone, every content block is a large rounded white surface on a hairline border set on that ground, and the only colour that ever raises its voice is a kowhai gold marker drawn behind a few words. Buttons are pine-dark pills. Type is one family, Inter Tight, set tight and heavy for headlines and plain for everything else, and the same face carries the synthetic product data with tabular numerals. There are few elements per view, and each view is meant to be read in one glance before the eye moves down.

This world deliberately refuses the "terminal dashboard" arrangement the old site used: no monospace anywhere, no grid texture, no status pills, no at-a-glance tables. Where product needs to be shown, it is drawn as a CSS schematic with representative data, disclosed on the page as such, never as a client screenshot. The one dark surface on the whole site is the case-study preview panel, and it exists only to hold that synthetic product data.

The structure follows the calm, image-led rhythm of the pinned reference (bencium.io) in Rayyan's own materials. The hero panel is the memorable moment: one giant tight headline on a soft sage field with a single pine pill, then the four project schematics peeking under the fold.

**Key Characteristics:**
- Near-white warm ground with white surfaces at 24px radius on a 1px hairline; the hero panel is the only sage field, the schematic well is a sage-grey step below it
- Pine pill buttons everywhere, gold pill only on a pine field
- Gold appears as a marker highlight behind at most one phrase per page, a link underline, and the CTA pill on pine; never as a fill for a surface and never as a glow
- One typeface at four weights; display type at -0.035em, body at 17px
- A hairline and a faint 1px shadow at rest; hover darkens the hairline and shows the title arrow, nothing lifts
- No monospace; schematic and preview data is the body face at 12.5px with tabular numerals
- No eyebrows, kickers, or uppercase tracked labels in the UI chrome

## Colors

A warm neutral ground with two greens (a dark pine for action, a soft sage for the hero) and a single kowhai gold as the accent.

### Primary
- **Pine** (`pine`): the action colour. Every pill button, the closing CTA panel, the case-study booking panel, the initials mark on the About page, and the signature dot beside the name in the nav. Pine is the brand's surviving accent from the previous site.
- **Pine Bright** (`pine-bright`): button hover state, the highlighted word in a case-study title, live indicators and progress bars inside schematics.
- **Pine Tint** (`pine-tint`): a 12% pine wash for the highlighted row in a schematic table and the area fill under the schematic chart. Never used outside schematics.

### Secondary
- **Kowhai Gold** (`gold`): the one loud colour. Drawn behind a few words as a marker (`.mark`), the underline on every text link, the underline on the current nav item, text selection, and the `.btn-gold` pill that sits on pine fields. It also appears as a soft radial glow bleeding into the corner of the hero panel and the CTA panel at 22 to 28% opacity.
- **Gold Deep** (`gold-deep`): gold button hover, the focus ring, and the moving runner dot in the flow schematic.

### Tertiary
- **Well** (`well`): the sage-grey bed behind every card schematic, one clear step darker than the ground so the card frame reads as a window, not as page.
- **Sage** (`sage`): the hero panel field, the only sage surface on the site. Also the scrollbar thumb through `sage-deep`.
- **Sage Deep** (`sage-deep`): the large step numbers in the process block, where a big numeral needs to sit back from the text.

### Neutral
- **Stone** (`stone`): the near-white page ground on every page and the nav background at 84% with a 14px blur.
- **Stone Deep** (`stone-deep`): chip fill on the case stack list and the mobile nav pill border ground.
- **Paper** (`paper`): warm near-white, every content surface (cards, offers, steps, quotes, FAQ, side cards, case blocks, case nav) and the text colour on pine.
- **Paper Deep** (`paper-deep`): flow nodes inside schematics.
- **Ink** (`ink`): headline and body text, the current mobile nav pill, the schematic toast, and the case preview panel ground.
- **Ink Soft** (`ink-soft`): ledes, card copy, prose paragraphs, nav links, quote attribution.
- **Ink Muted** (`ink-muted`): the quietest legible text (data notes, footer, side labels, case nav labels, stat labels). Set to 5c574f so it clears 4.5:1 on both stone and white. It is only ever used on those two surfaces.
- **Line** (`line`) and **Line Strong** (`line-strong`): hairline dividers (FAQ rows, stat separators, nav bottom border), the 1px border on every white surface and on the schematic frame, and the border on `.btn-light` and schematic nodes.

### Named Rules
**The One Loud Colour Rule.** Gold is a marker, an underline, and a glow. It is never the background of a card, panel, or section. The only gold-filled shape is a pill button, and that pill exists only on a pine field.

**The Pine Pill Rule.** Every pill button is pine (`.btn`). On a pine field (the CTA panel, the case CTA) the pill switches to gold (`.btn-gold`) for contrast. `.btn-light` (paper with a hairline border) is the secondary choice beside a pine pill, used on the 404 page.

**The One Sage Field Rule.** The hero panel is the only sage surface. Sections sit directly on the stone ground; there is no full-bleed tint band.

**The Coloured Surface Rule.** On pine or ink, text is paper or paper at reduced opacity (78%, 75%, 70%). Grey text (`ink-muted`, `ink-soft`) never sits on a coloured surface.

## Typography

**Display Font:** Inter Tight (with Helvetica Neue, Arial, system-ui)
**Body Font:** Inter Tight (same family)
**Data Font:** Inter Tight with tabular numerals (schematics and case preview)

**Character:** One neutral, tightly spaced grotesque doing every job, with `cv11` and `ss03` on for the single-storey a and the open shapes. Headlines are heavy and pulled tight so they read as one object; body copy is the same face at 400, sized generously at 17px so the site never feels small. The family is self-hosted from `fonts/` as two variable WOFF2 files (latin, latin-ext; OFL) at weights 400 to 700, no optical size axis, with `font-display: swap`, the latin file preloaded on every page.

### Hierarchy
- **Display** (700, `clamp(44px, 7.2vw, 96px)`, line-height 0.96, -0.035em): the hero headline on Home, capped at 13ch so it breaks into two lines. Balanced wrapping.
- **Display, case** (700, `clamp(48px, 9vw, 124px)`, line-height 0.96, -0.035em): the case-study title, capped at 12ch, one word coloured pine-bright.
- **Headline** (700, `clamp(34px, 4.6vw, 56px)`, line-height 1.02, -0.035em): section headings on every page and the CTA panel heading. Usually four to six words, sometimes with one gold-marked phrase.
- **Headline, block** (700, `clamp(26px, 3.2vw, 38px)`, line-height 1.05, -0.03em): case-study block headings in the left column of a case block.
- **Title** (700, 24px, line-height 1.1, -0.025em): card and offer headings, prose subheads on About. Steps use 20px at the same weight; case nav targets use 21px.
- **Lede** (400, `clamp(18px, 1.6vw, 21px)`, line-height 1.5, ink-soft, max 58ch): the paragraph under every display or headline. The case summary is the larger cousin at `clamp(19px, 2vw, 25px)` and 52ch.
- **Body** (400, 17px, line-height 1.55): the base size. About prose runs `clamp(17px, 1.35vw, 19px)` at 1.6 and 62ch; card and offer copy drops to 16px; FAQ answers 16.5px at 65ch.
- **Outcome** (600, 15px, pine-deep): the one-line result at the bottom of a project card, real numbers from the case study. The card title grows a small arrow on hover; there is no "read more" link.
- **Value** (700, 17px, -0.015em): the bold opening line of a side card. The case facts line uses 600 at 16px with middle-dot separators. This is the only "label" the chrome has: a bold value, then a plain sentence beneath it.
- **Note** (400, 14px, ink-muted): data disclosures, stat labels, footer, and the small labels above case nav targets (13.5px, 500).
- **Quote** (500, `clamp(19px, 1.8vw, 24px)`, line-height 1.4, -0.015em): testimonial body, with one phrase in a gold mark at 600. In a three-up row the quote drops to 17.5px.
- **Data** (400, 12.5px, line-height 1.3, tabular numerals): synthetic product data inside `.card-visual`. Inside `.case-preview` it runs 13.5px at 1.6. Column headers in both may be uppercase and tracked, because that is what the drawn products look like.

### Named Rules
**The No Kicker Rule.** No eyebrow, kicker, overline, or uppercase tracked label above any heading in the UI chrome. A section opens on its headline. A side card opens on a bold value line; a case page states its facts in one bold line. The only uppercase tracked text on the site is column headers inside a drawn schematic or the case preview, where it is product data.

**The Data Face Rule.** There is no monospace on the site. Synthetic product data inside `.card-visual` and `.case-preview` is the body face with `font-variant-numeric: tabular-nums`, so columns align without reading as a terminal.

**The One Mark Rule.** A page carries at most one gold-marked phrase: the hero "AI" on Home, one phrase in the Home quote. Page titles, CTA panels, and the About quotes are plain ink.

## Layout

A single centred column, max width 1200px, with a fluid gutter of `clamp(20px, 3vw, 24px)`. Sections stack vertically with `clamp(64px, 8vw, 112px)` of padding top and bottom, so at desktop widths roughly 112px separates one section from the next. Two exceptions to that rhythm are deliberate:

- The hero-to-"Outcomes" gap is tight on purpose. The hero section carries only 12px of bottom padding and the section after it only 12px of top padding, with its section head compressed to a 24px margin. This puts the first two project cards under a 900px fold, per the contract's first viewport.
- `section.tight` (the single testimonial on Home) reduces top padding to `clamp(24px, 3vw, 40px)`.

Inside a section, the section head is a column with an 18px gap between headline and lede, and `clamp(32px, 4vw, 48px)` below it. The head row can carry a text link on the right, aligned to the baseline of the headline.

Grids are simple: two columns for project cards, three for offers and testimonials, four for process steps. Every grid gap is 24px (steps use 32px inside their shared paper block). At 860px and below, two- and three-column grids collapse to one column; the steps grid goes to two columns at 860px and one at 520px; the testimonial row goes to one column at 960px. The About page splits 1.3fr / 0.9fr (prose left, side cards right) with a `clamp(32px, 5vw, 72px)` gap, collapsing at 860px.

The nav is a sticky 70px bar (62px on mobile) on a three-column grid: name left, three links centred, pine pill right. At 640px and below the centre links vanish and a row of paper pills (`.mobile-nav`) appears beneath the bar instead. A sticky mobile CTA, a full-width pine pill inset 16px from the viewport edges, slides up once the visitor has scrolled past a chosen section and hides while the closing CTA is in view. It is a direct child of `body`, positioned with `translate3d`, which is what keeps `position: fixed` stable on iOS Safari.

Case pages follow the same column: back link, giant title, summary, one bold facts line (client, role, window, status separated by middle dots), then a stack of paper case blocks with a 20px gap, the dark preview panel first so the page shows its picture before its prose. Each case block body is a 1fr / 1.4fr grid with the heading left and prose right, no row gap so consecutive paragraphs keep their 14px spacing, collapsing at 820px. The closing CTA and prev/next nav sit `clamp(48px, 7vw, 80px)` below.

## Elevation & Depth

Depth is tonal first and shadowed second. Surfaces are paper on stone, and that value step is what separates a card from the page; at rest nothing casts a shadow except a one-pixel hairline under a pill button (`0 1px 0 rgba(23,21,15,0.04)`) and the drawn device frame inside a schematic. Shadows appear as a response to hover, always paired with a small upward translate, and always soft: large blur, large negative spread, so they read as ambient lift rather than a hard drop.

### Shadow Vocabulary
- **Button lift** (`box-shadow: 0 14px 28px -16px rgba(31,61,43,0.6)`): pine pill on hover, with `translateY(-2px)`. Gold pills use the same shape in gold (`rgba(224,177,46,0.6)`); light pills use ink at 0.35 with -18px spread.
- **Card lift** (`box-shadow: 0 30px 50px -30px rgba(23,21,15,0.35)`): project card on hover, with `translateY(-4px)`. Case nav cards use `0 24px 40px -26px` at the same colour with `translateY(-3px)`.
- **Device frame** (`box-shadow: 0 20px 44px -22px rgba(23,21,15,0.45)`): the paper frame inside a card schematic, at rest. This is the one resting shadow, and it is inside the drawn product, not on the chrome. On card hover the frame rises a further 6px.
- **Floating CTA** (`box-shadow: 0 16px 32px -14px rgba(31,61,43,0.7)`): the sticky mobile pill, which needs to separate from whatever scrolls beneath it.
- **Toast** (`box-shadow: 0 10px 22px -8px rgba(23,21,15,0.5)`): the ink toast that fades in inside a schematic on hover.

The nav gains depth by translucency instead: stone at 82% with a 14px backdrop blur and a hairline bottom border.

### Named Rules
**The Flat-At-Rest Rule.** Chrome surfaces cast no shadow at rest. A shadow is a hover response, paired with a translate, and it is removed entirely under `prefers-reduced-motion`.

**The Soft Lift Rule.** Every shadow uses a large blur and a negative spread at least half the blur, tinted with ink or pine, never black. No hard offset shadows anywhere.

## Shapes

Everything is rounded, and the radius scales with the size of the thing. The two panels that hold a whole message (hero, closing CTA) use 32px. Content surfaces (cards, offers, steps, quotes, FAQ, case blocks, case CTA) use the base 24px. Smaller surfaces step down: side cards and case nav 20px, the initials mark 16px, the schematic device frame 12px on its top corners only (it runs off the bottom of the card). Buttons, chips, nav pills, and schematic tags are full pills at 999px. The focus ring is a 3px gold-deep outline offset 3px with a 6px radius.

Borders are rare. `.btn-light` carries a hairline `line-strong` border; schematic nodes carry the same. Cards, panels, and blocks have no border; the paper-on-stone value step is the edge. Dividers inside a surface (FAQ rows, outcome stats, nav bottom) are 1px `line` hairlines.

Recurring geometry: the gold marker behind text is a rounded highlight (0.22em radius, cloned across line breaks) with slight horizontal bleed; the signature dot beside the name in the nav is a 10px pine circle; the FAQ disclosure indicator is a 12px chevron drawn from two 2px ink borders, rotating 180 degrees on open; the radial gold glow is a circle at 55 to 60% of the panel width, bleeding off the corner.

## Components

### Buttons
Confident and quiet: a solid pill that lifts on hover and settles on press.
- **Shape:** full pill (999px)
- **Primary (`.btn`):** pine fill, paper text, 600 weight at 16px, 15px 26px padding, 10px gap to an optional 16px inline SVG icon. In the nav it shrinks to 12px 20px and 15px text.
- **Hover / Focus:** pine-bright fill, `translateY(-2px)`, button-lift shadow, over 0.35s on the site ease. Active returns to `translateY(0)` in 80ms. Focus-visible gets the 3px gold-deep outline.
- **Gold (`.btn-gold`):** gold fill, ink text, gold-deep on hover. Used only on pine fields (CTA panel, case CTA).
- **Light (`.btn-light`):** paper fill, ink text, hairline `line-strong` border, no resting shadow, white on hover. The secondary button beside a primary.

### Text links
- **Style:** 600 weight, 2px gold underline offset 5px; underline turns ink on hover. `.link-arrow` appends a right arrow glyph. Card link rows run at 15px with a 22px gap.

### Chips
- **Style (`.case-stack-list .chip`):** stone fill on paper, ink-soft text, 14px, 6px 12px padding, full pill, no border. Read-only; used for a technology list prefixed by the words "Built with".
- **Mobile nav pill:** paper fill, ink-soft text, 14px at 500; the current page pill inverts to ink fill and paper text.

### Cards / Containers
Big paper surfaces that lift as one object.
- **Corner Style:** 24px
- **Background:** paper on stone
- **Shadow Strategy:** none at rest, card-lift on hover with `translateY(-4px)` over 0.45s (see Elevation)
- **Border:** none
- **Internal Padding:** card body 26px 28px 28px with a 12px column gap; offers 30px 30px 28px with a 14px gap; steps block `clamp(24px, 3vw, 40px)`; quotes `clamp(28px, 4vw, 44px)`; side cards 22px 24px; case blocks `clamp(28px, 4vw, 44px)` all round.
- **Variants:** the project card is a whole-card link with a schematic on top and body below; the offer is a heading, a paragraph, and a proof link; the side card opens on a bold value line then one plain sentence; the quote is a blockquote at 500 with one gold-marked phrase and a role-only attribution row (strong name-slot in ink, rest ink-soft); the FAQ is a single paper block of native `details` rows separated by hairlines, 19px 600 summaries with a chevron.

### Navigation
- **Style:** sticky, stone at 82% with 14px blur, hairline bottom border, 70px tall. Name in 700 at 17px with a 10px pine dot before it. Links 500 at 15.5px in ink-soft, 28px apart, each with a 2px gold underline that scales in from the left on hover and stays in for `aria-current="page"` (which also sets the link to ink). Pine pill "Book a call" on the right.
- **Mobile (640px and below):** 62px bar, links hidden, replaced by a row of paper pills under the bar with the current page in ink.
- **Case pages:** a back link with a left arrow glyph above the title, and a two-card prev/next nav at the bottom (paper, 20px radius, small muted label over a 21px bold target; the next card right-aligned).

### Hero panel (signature)
The memorable moment. A full-column sage field at 32px radius with `clamp(40px, 7vw, 96px)` top padding, holding the display headline top-left (max 13ch, one gold-marked word), the lede `clamp(24px, 3vw, 36px)` below it, then a row with one pine pill and one arrowed text link at a 22px gap. A gold radial glow at 28% bleeds off the top-right corner. The panel ends 12px above the next section so the project cards peek under the fold. On load, the headline, lede, and actions fade up in sequence at 0.05s, 0.25s, and 0.4s delays.

### CTA panel (signature)
The closing statement, and the counterpart to the hero: a pine field at the same 32px radius, paper headline with one gold-marked phrase, paper copy at 78% opacity capped at 48ch, and a gold pill with a small underlined alternative link beneath it. Laid out 1.4fr / 1fr, headline left, actions right, collapsing at 860px. A gold radial glow at 22% bleeds off the bottom-left corner. The case-study version (`.case-cta`) is the same field at 24px radius in a single row.

### Product schematic (signature)
How product gets shown without screenshots. A 16:10 stone-deep frame (4:3 at 480px and below) holds a paper device at 12px top radius with the device-frame shadow, running off the bottom of the card. Inside, synthetic product data in the data face at 12px: a title bar with a pulsing live dot, table rows with a pine-tint highlighted row, flow nodes with a runner that crosses on hover, a chart with pine-bright line and pine-tint area, progress bars. On hover the device rises 6px and an ink toast fades in at the bottom-right. The section carries a visible `.data-note` disclosing that the visuals are drawn schematics with representative data.

### Case preview (signature)
The one dark surface. An ink panel inside a case block, data face at 13px and 1.6 line height, paper text at 70% with gold for highlighted values and the app name, and small pill badges (green, amber, dim) for status. Column headers here are uppercase and tracked because that is what the product looked like. Scrolls horizontally on narrow screens rather than wrapping.

### Motion
One fade-up per `.reveal`: 16px translate and opacity, 0.8s on the site ease `cubic-bezier(0.2, 0.8, 0.2, 1)`. A parent with `data-stagger="80"` (cards and steps use 80 to 90) cascades its direct children that many milliseconds apart. About 1.4s after starting, the element drops `.reveal`/`.in` and gains a permanent `.done`, so hover transforms keep working. The `.js` class gates all hiding; no-JS visitors, `prefers-reduced-motion` visitors, and any browser without IntersectionObserver get the complete static page, and a 1.5s failsafe reveals everything regardless. Page-to-page navigation uses a 220ms root view transition. One idle moment exists: the FeedHack schematic runner dot crosses its pipeline once, 1.1s after the card grid reveals, and again on hover. No sweeps, scan lines, or decorative animation on panels.

## Do's and Don'ts

### Do:
- **Do** set every content surface as white on the near-white ground at 24px radius, with a 1px `line` border and a faint 1px resting shadow.
- **Do** make every pill button pine; switch to the gold pill only when the button sits on a pine field.
- **Do** use gold as a marker behind at most one phrase per page, as the 2px link underline, and as the CTA pill on pine.
- **Do** open a side card on a bold value line (700 at 17px) followed by one plain sentence; state case facts in one bold 16px line.
- **Do** leave `clamp(64px, 7vw, 96px)` between the hero panel and the first section; the hero is a room of its own.
- **Do** use `ink-muted` (5c574f) for the quietest text, and only on stone or paper.
- **Do** show product as a drawn schematic with representative data inside `.card-visual` (on the `well` bed) or `.case-preview`, and disclose it in a visible `.data-note`.
- **Do** attribute testimonials by role and project until clients approve names.
- **Do** give a linked card exactly one hover signal: the hairline darkens to `ink-muted` and the title arrow appears. No translate, no shadow bloom.
- **Do** mark the current nav item with `aria-current="page"` so the gold underline and the ink mobile pill follow.

### Don't:
- **Don't** add an eyebrow, kicker, overline, or uppercase tracked label above a heading anywhere in the chrome.
- **Don't** use monospace anywhere; tabular numerals in the body face do the data job.
- **Don't** place a second sage field or a full-bleed tint band; the hero panel is the only sage surface, and the schematic `well` is the only other tinted bed.
- **Don't** fill a card, panel, or section with gold; gold is a marker, an underline, a glow, and one pill on pine.
- **Don't** put grey text (`ink-soft`, `ink-muted`) on pine or ink; use paper at reduced opacity.
- **Don't** use client screenshots, a stock photo, or a placeholder portrait; the world runs without imagery.
- **Don't** add hard offset shadows, a border heavier than the 1px hairline, or a second dark surface beyond the case preview.
- **Don't** add sweep, scan-line, or looping decorative motion on panels; the only looping animation is the pulsing live dot inside a schematic.
- **Don't** introduce a second typeface or a system display face; Inter Tight at 400 to 700 is the whole ramp.

## Round 5 additions (2026-09-12, de-slop pass)

- **Nav:** name left; Projects, About, and a pine text link "Book a call" right. No centred link group, no pill in the nav, no blur. Mobile row adds a small pine "Book a call" pill at the right end. A skip link sits before the nav.
- **Offers:** a hairline list (`.offer-list` > `.offer`), three rows on a 1.1fr / 1.5fr / 0.7fr grid: plain-verb heading, one paragraph plus proof link, then a bold duration with "Fixed price" beneath. On mobile the duration moves above the heading. Never three equal cards.
- **Card titles:** a 14px `card-name` line (product name) above an outcome-first h3, so a stranger reads what the build did before what it was called.
- **Motion:** two entrances only, the hero panel and the card grids. Section heads, prose, quotes, FAQ, and CTA panels are static.
- **Copy:** section heads are plain statements ("What I build.", "Common questions."). Straight quotes are curly. Case titles are one colour.
