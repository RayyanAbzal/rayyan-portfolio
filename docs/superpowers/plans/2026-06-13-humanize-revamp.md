# Humanize Revamp (Direction B) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all terminal/code language from the portfolio site so non-technical clients never see command syntax, while keeping the paper-and-pine design system and motion engine.

**Architecture:** Static HTML/CSS/JS, no build step. Edits are exact string replacements across 6 HTML pages, a prune pass on 2 stylesheets, a rework of js/motion.js (boot sequence, scrollspy, typing effects), and deletion of js/terminal.js and js/palette.js. No test framework exists; verification is grep sweeps plus a final browser QA pass.

**Tech Stack:** Plain HTML, CSS, vanilla JS. Hosting: Vercel static.

**Spec:** docs/superpowers/specs/2026-06-13-humanize-revamp-design.md

**Branch:** feat/section-clarity (already checked out).

**Important conventions for the implementer:**
- This repo has NO tests and NO build. "Verify" steps are grep commands and expected output.
- Old strings containing en dashes are referenced by line number and surrounding context, never retyped here. Read the target lines before editing.
- All new copy: plain language, first person, no code metaphors, no em or en dashes (use "to" or hyphen), no list fillers.
- Line numbers reference the files as of commit aa7bb02. Read each file before editing; numbers may drift as earlier tasks land.

---

### Task 1: Nav and footer on all 5 pages

**Files:**
- Modify: `index.html:41-62, 637-645`
- Modify: `work/influence.html:39-61, 245-253`
- Modify: `work/influence-v2.html` (same regions)
- Modify: `work/feedhack.html` (same regions)
- Modify: `work/pumpdat.html` (same regions)

- [ ] **Step 1: Replace the index.html nav brand (lines 43-45)**

Old (index.html:43-45):
```html
    <a href="#top" class="nav-name">
      <span class="prompt">rayyan-consulting@auckland</span>:<span class="accent">~</span>$<span class="cursor"></span>
    </a>
```

New:
```html
    <a href="#top" class="nav-name">
      <strong>Rayyan Abzal</strong><span class="nav-sub">AI consulting</span>
    </a>
```

- [ ] **Step 2: Replace the nav brand on each case page**

Each case page has the same block at lines 41-43 with a per-page path span and a `view-transition-name` style. Replace the whole `<a class="nav-name">` element on all 4 pages with:

```html
    <a href="../index.html" class="nav-name">
      <strong>Rayyan Abzal</strong><span class="nav-sub">AI consulting</span>
    </a>
```

The `view-transition-name` styles are dropped deliberately; they existed for the terminal path animation.

- [ ] **Step 3: Remove the Cmd+K button from each case page**

Each case page line 57 has:
```html
      <button class="nav-kbd" type="button" aria-label="open command palette">⌘K</button>
```
Delete the line (match the line plus its own trailing newline). index.html has no such button.

- [ ] **Step 4: Replace footer links on all 5 pages**

Old (identical on all pages):
```html
      <a href="mailto:rayyanabzal@gmail.com">~/email</a>
      <a href="https://www.linkedin.com/in/rayyan-a-832a20213" target="_blank" rel="noopener">~/linkedin</a>
```

New:
```html
      <a href="mailto:rayyanabzal@gmail.com">Email</a>
      <a href="https://www.linkedin.com/in/rayyan-a-832a20213" target="_blank" rel="noopener">LinkedIn</a>
```

- [ ] **Step 5: Verify**

```bash
grep -rn 'rayyan-consulting@auckland\|nav-kbd\|~/email\|~/linkedin' index.html work/*.html
```
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add index.html work/influence.html work/influence-v2.html work/feedhack.html work/pumpdat.html
git commit -m "feat(copy): plain-language nav wordmark and footer links"
```

---

### Task 2: index.html hero, status card, shipping log

**Files:**
- Modify: `index.html:66-134`

- [ ] **Step 1: Delete the hero prompt block (lines 68-70)**

Delete entirely:
```html
  <div class="hero-prompt">
    <span class="p">$</span> <span class="com">whoami</span>
  </div>
```

- [ ] **Step 2: Remove the h1 cursor**

In the h1 (line 71-74), remove `<span class="cursor-end"></span>` so the h1 ends at `your business`.

- [ ] **Step 3: Replace the status card header (lines 82-85)**

Old:
```html
      <div class="hero-status-head">
        <span class="dots"><span></span><span></span><span></span></span>
        <span class="file">~/status.json</span>
      </div>
```

New:
```html
      <div class="hero-status-head">
        <span class="file">At a glance</span>
      </div>
```

- [ ] **Step 4: Humanize the status rows (lines 86-101)**

Read the four `hs-row` blocks first (the engagement row contains an en dash). Replace the four rows with:

```html
      <div class="hs-row">
        <span class="hs-key">Availability</span>
        <span class="hs-val">Open for the next project <span class="tag">▸ booking now</span><span class="muted">free intro call</span></span>
      </div>
      <div class="hs-row">
        <span class="hs-key">Last shipped</span>
        <span class="hs-val">Influence v2 <span class="tag">▸ live</span><span class="muted">repeat client · platform build</span></span>
      </div>
      <div class="hs-row">
        <span class="hs-key">Typical project</span>
        <span class="hs-val">1 to 8 weeks · fixed price <span class="tag">▸ proposal in 48h</span></span>
      </div>
      <div class="hs-row">
        <span class="hs-key">Based in</span>
        <span class="hs-val">Auckland, NZ <span class="muted">working with clients globally</span></span>
      </div>
```

- [ ] **Step 5: Replace the shipping log header (lines 115-118)**

Old:
```html
    <div class="shiplog-head">
      <span>~/shipping.log</span>
      <span class="live"><span class="dot"></span>live</span>
    </div>
```

New:
```html
    <div class="shiplog-head">
      <span>By the numbers</span>
      <span class="live"><span class="dot"></span>live</span>
    </div>
```

- [ ] **Step 6: Verify**

```bash
grep -n 'whoami\|status.json\|shipping.log\|cursor-end' index.html
```
Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat(copy): humanize hero, status card, shipping log"
```

---

### Task 3: index.html section markers, principles, services, work cards, CTAs, process

**Files:**
- Modify: `index.html` (sections about through process)

- [ ] **Step 1: Replace all section marker tags**

Seven `sm-tag` spans. Replacements:

| Line (approx) | Old | New |
|---|---|---|
| 139 | `<span class="sm-tag">// about</span>` | `<span class="sm-tag">About</span>` |
| 186 | `<span class="sm-tag">// principles</span>` | `<span class="sm-tag">Principles</span>` |
| 218 | `<span class="sm-tag">// services</span>` | `<span class="sm-tag">Services</span>` |
| 263 | `<span class="sm-tag">// work</span>` | `<span class="sm-tag">Work</span>` |
| 407 | `<span class="sm-tag">// testimonials</span>` | `<span class="sm-tag">Testimonials</span>` |
| 486 | `<span class="sm-tag">// process</span>` | `<span class="sm-tag">Process</span>` |
| 533 | `<span class="sm-tag">// faq</span>` | `<span class="sm-tag">FAQ</span>` |

- [ ] **Step 2: Replace the about card header (lines 155-158)**

Old:
```html
      <div class="hero-status-head">
        <span class="dots"><span></span><span></span><span></span></span>
        <span class="file">~/whoami.txt</span>
      </div>
```

New:
```html
      <div class="hero-status-head">
        <span class="file">The short version</span>
      </div>
```

- [ ] **Step 3: Humanize the about card rows (lines 159-178)**

Replace the five rows with (keep the same hs-row structure):

```html
      <div class="hs-row">
        <span class="hs-key">Based in</span>
        <span class="hs-val">Auckland, NZ <span class="muted">UTC+12 · clients worldwide</span></span>
      </div>
      <div class="hs-row">
        <span class="hs-key">Focus</span>
        <span class="hs-val">AI integration · automation <span class="muted">plus full-stack when it ships faster</span></span>
      </div>
      <div class="hs-row">
        <span class="hs-key">Tools</span>
        <span class="hs-val">TypeScript · Node.js · Python <span class="muted">plus whatever the problem needs</span></span>
      </div>
      <div class="hs-row">
        <span class="hs-key">Track record</span>
        <span class="hs-val">4 client builds <span class="tag">▸ all live</span><span class="muted">plus 3 personal builds</span></span>
      </div>
      <div class="hs-row">
        <span class="hs-key">Capacity</span>
        <span class="hs-val">2 active projects max <span class="muted">depth over breadth</span></span>
      </div>
```

- [ ] **Step 4: Replace the principle numbers (lines 193, 198, 203, 208)**

| Old | New |
|---|---|
| `[<span class="key">01</span>] // replace, don't add` | `<span class="key">01</span> · Replace, don't add` |
| `[<span class="key">02</span>] // problem first` | `<span class="key">02</span> · Problem first` |
| `[<span class="key">03</span>] // for the team` | `<span class="key">03</span> · For the team` |
| `[<span class="key">04</span>] // hours saved` | `<span class="key">04</span> · Hours saved` |

- [ ] **Step 5: Replace the services note (line 223)**

Old:
```html
    <p class="sh-note reveal">Not sure if your problem is a fit? The <span class="mono">./discovery</span> call is free. We'll figure it out together.</p>
```

New:
```html
    <p class="sh-note reveal">Not sure if your problem is a fit? The intro call is free. We'll figure it out together.</p>
```

- [ ] **Step 6: Replace work card path headers (lines 278, 297, 316, 335)**

All four client cards:

| Old | New |
|---|---|
| `<span class="path">~/work/<span class="slug">influence</span></span>` | `<span class="path"><span class="slug">client project</span></span>` |
| `<span class="path">~/work/<span class="slug">feedhack</span></span>` | `<span class="path"><span class="slug">client project</span></span>` |
| `<span class="path">~/work/<span class="slug">pumpdat</span></span>` | `<span class="path"><span class="slug">client project</span></span>` |
| `<span class="path">~/work/<span class="slug">influence-v2</span></span>` | `<span class="path"><span class="slug">client project</span></span>` |

The h3 inside each card already carries the project name; the header carries the category.

- [ ] **Step 7: Replace personal build card headers (lines 360-363, 371-374, 382-385)**

Old pattern (three cards: `~/lab/fios`, `~/lab/aria`, `~/lab/nz-jobs`):
```html
        <div class="p-card-head">
          <span>~/lab/fios</span>
          <span class="self">self</span>
        </div>
```

New (same for all three, drop the redundant self badge):
```html
        <div class="p-card-head">
          <span>personal build</span>
        </div>
```

- [ ] **Step 8: Replace the two inline CTA prompts (lines 398, 477)**

Old:
```html
    <span class="ic-prompt"><span class="p">$</span> seen the work? next step is a call</span>
```
New:
```html
    <span class="ic-prompt">Seen the work? The next step is a call.</span>
```

Old:
```html
    <span class="ic-prompt"><span class="p">$</span> want the same result for your business?</span>
```
New:
```html
    <span class="ic-prompt">Want the same result for your business?</span>
```

- [ ] **Step 9: Replace the process section marker meta and step names**

Line 487 `sm-meta` currently shows the pipeline with arrows. Replace:
```html
    <span class="sm-meta">from first call to handover</span>
```

Step h3 replacements (lines 500, 508, 516, 524):

| Old | New |
|---|---|
| `<h3>discovery_call</h3>` | `<h3>We talk</h3>` |
| `<h3>proposal + process_map</h3>` | `<h3>You get a plan</h3>` |
| `<h3>build_phase</h3>` | `<h3>I build</h3>` |
| `<h3>handover</h3>` | `<h3>You own it</h3>` |

- [ ] **Step 10: Verify**

```bash
grep -n '// \|~/work/\|~/lab/\|_call\|_phase\|process_map\|./discovery' index.html | grep -v 'http\|json\|script'
```
Expected: only hits inside the contact section (guest terminal block and the `// or email` line); those are removed in Task 4. No hits elsewhere.

- [ ] **Step 11: Commit**

```bash
git add index.html
git commit -m "feat(copy): plain-language sections, cards, process steps"
```

---

### Task 4: index.html contact rewrite, terminal and palette removal

**Files:**
- Modify: `index.html:600-633, 649-652`
- Delete: `js/terminal.js`
- Delete: `js/palette.js`
- Modify: `work/*.html` (palette script tag, 4 pages)

- [ ] **Step 1: Rewrite the contact section (lines 600-629)**

Replace the whole `<section id="contact">` content with:

```html
<!-- CONTACT -->
<section id="contact" class="wrap contact" data-screen-label="10 Contact">
  <h2 class="reveal">Let's figure out what's <span class="accent">eating your week</span></h2>
  <p class="subline reveal">Free 30-minute intro call. No pitch, no jargon. You describe how your business runs; I tell you honestly whether AI can help.</p>
  <div class="contact-actions reveal">
    <div class="contact-row">
      <a class="btn btn-primary" href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('contact')">Book a free intro call</a>
      <a class="btn btn-ghost" href="https://www.linkedin.com/in/rayyan-a-832a20213" target="_blank" rel="noopener">Connect on LinkedIn</a>
    </div>
    <p class="or-line">or email <a href="mailto:rayyanabzal@gmail.com">rayyanabzal@gmail.com</a></p>
  </div>
</section>
```

This removes: the `prompt-line` div, the `cursor-end` span, the `//` prefix on the email line, and the entire `#guest-terminal` block.

- [ ] **Step 2: Remove the terminal and palette script tags from index.html (lines 651-652)**

Delete:
```html
<script defer src="js/palette.js"></script>
<script defer src="js/terminal.js"></script>
```

- [ ] **Step 3: Remove the palette script tag from each case page (line 258)**

Delete on all 4 case pages:
```html
<script defer src="../js/palette.js"></script>
```

- [ ] **Step 4: Delete the JS files**

```bash
git rm js/terminal.js js/palette.js
```

- [ ] **Step 5: Verify**

```bash
grep -rn 'terminal\|palette' index.html work/*.html
ls js/
```
Expected: no grep output; `ls js/` shows only `motion.js` and `site.js`.

- [ ] **Step 6: Commit**

```bash
git add index.html work/influence.html work/influence-v2.html work/feedhack.html work/pumpdat.html
git commit -m "feat(contact): plain CTA replaces guest terminal, drop cmd+k palette"
```

---

### Task 5: js/motion.js rework

**Files:**
- Modify: `js/motion.js`

The motion engine keeps: reveal lifecycle, stagger, counters, pipeline run, scroll progress bar, nav link scrollspy. It loses: typing effects, the hero boot typewriter, the `~/section` nav path update.

- [ ] **Step 1: Remove the typing helper**

Delete the `typeInto` function (lines 62-72) and remove it from the export (line 75). New export line:

```js
  window.__motion = { ok: MOTION_OK, hook: function (sel, fn) { revealHooks.push({ sel: sel, fn: fn }); } };
```

- [ ] **Step 2: Remove the typing hooks, keep the counters**

In the scroll moments IIFE (lines 99-110), replace the `.shiplog` hook body and delete the `.section-marker` hook entirely. Result:

```js
  m.hook(".shiplog", function (el) {
    el.querySelectorAll(".cnt[data-count]").forEach(count);
  });

  m.hook(".pipeline", function (el) { el.classList.add("run"); });
```

- [ ] **Step 3: Rework the scrollspy (lines 116-131)**

The old code updates `.nav-name .accent` text to `~/<id>`; that element no longer exists. Keep the link highlighting only:

```js
  var links = document.querySelectorAll('.nav-mid a[href^="#"]');
  var sections = document.querySelectorAll("main section[id]");
  if (links.length > 0 && sections.length > 0 && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        var id = e.target.id;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }
```

Remove the now-unused `var path = ...` line.

- [ ] **Step 4: Replace the hero boot sequence (lines 152-171)**

The status card rows animate when `.hero` gains `hero-booted` (CSS dependency, see Task 6). The typewriter is gone, so add the class on load:

```js
/* Hero status reveal (index only) */
(function () {
  "use strict";
  var hero = document.querySelector(".hero");
  if (!hero) { return; }
  setTimeout(function () { hero.classList.add("hero-booted"); }, 300);
})();
```

- [ ] **Step 5: Verify**

```bash
grep -n 'typeInto\|hero-prompt\|\.com\b\|path.textContent' js/motion.js
node --check js/motion.js
```
Expected: no grep output; node exits 0.

- [ ] **Step 6: Commit**

```bash
git add js/motion.js
git commit -m "refactor(motion): drop typing effects and boot typewriter, keep reveals"
```

---

### Task 6: styles.css prune and restyle

**Files:**
- Modify: `styles.css`

Read each region before deleting. When deleting a CSS block, match the full rule including its own trailing newline. After each deletion, re-check the neighbouring rules did not merge.

- [ ] **Step 1: Add the nav-sub style and remove nav prompt/cursor styles**

Remove `.nav-name .prompt` (line 179) and `.nav-name .cursor` (block at line 180). Add in their place:

```css
.nav-name strong { font-weight: 600; letter-spacing: -0.01em; }
.nav-name .nav-sub {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--ink-3);
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
```

- [ ] **Step 2: Remove hero prompt and cursor styles**

Delete blocks: `.hero-prompt` (line 245), `.hero-prompt .p`, `.hero-prompt .com`, `.hero-prompt .arg`, `.hero-prompt .cursor` (lines 254-257 region), `.hero h1 .cursor-end` (line 274), the mobile rule `.hero .hero-prompt { order: 0; }` (line 369), and `.hero-prompt .com { display: inline-block; min-width: 6ch; }` (line 1298).

- [ ] **Step 3: Remove window dots styles, restyle the card label**

Delete the `.hero-status-head .dots` rules (lines 329-341, includes the three nth-child colour rules). Update `.hero-status-head .file` to read as a small-caps label:

```css
.hero-status-head .file {
  color: var(--ink-2);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 10px;
}
```

- [ ] **Step 4: Remove the [ok] suffix animation**

Delete `.js .hs-key::after` (line 1324) and the paired `.js :is(.hero.hero-booted, ...) .hs-key::after` rule (line 1325 region). Keep the `.hs-row` boot-gated opacity rules (lines 1311-1321); they now fire off the Task 5 `hero-booted` timeout.

- [ ] **Step 5: Remove guest terminal styles**

Delete every `.term`-prefixed rule (lines 1155-1196 region): `.term`, `.term-out` and children, `.term-chips`, `.term-chip`, `.term-chip:hover`, `.term-line`, `.term-ps`, `.term-in`.

- [ ] **Step 6: Remove palette and nav-kbd styles**

```bash
grep -n 'palette\|nav-kbd\|pal-' styles.css
```
Delete every matching rule block.

- [ ] **Step 7: Style the section markers for plain words**

`.section-marker .sm-tag` (line 117): add uppercase treatment so single words read as labels, not sentence fragments:

```css
text-transform: uppercase;
letter-spacing: 0.14em;
```
(Keep its existing font, size, and colour declarations.)

- [ ] **Step 8: Remove contact prompt-line styles**

Delete `.contact .prompt-line` (line 1100), `.contact .prompt-line .p` (line 1106), and `.contact h2 .cursor-end` (line 1115). Check line 1292 region for boot-related `.file` clip-path rules referencing `.hero-prompt`; keep `.js .hero .hero-status .hero-status-head .file { clip-path: none; }` only if the `.file` clip reveal animation rule it pairs with survives, otherwise delete both.

- [ ] **Step 9: Verify**

```bash
grep -n 'prompt\|cursor\|\.term\|palette\|nav-kbd\|dots' styles.css
```
Expected: no output (inspect any survivor; `.cursor-default` style utilities do not exist in this file).

Open index.html in a browser (file:// is fine):
```bash
open index.html
```
Expected: hero status rows animate in after load, no unstyled artifacts, no leftover empty boxes in the contact section.

- [ ] **Step 10: Commit**

```bash
git add styles.css
git commit -m "feat(design): prune terminal chrome styles, label-style card headers"
```

---

### Task 7: Case pages chrome and copy (4 pages)

**Files:**
- Modify: `work/influence.html`
- Modify: `work/influence-v2.html`
- Modify: `work/feedhack.html`
- Modify: `work/pumpdat.html`

- [ ] **Step 1: Replace the case section markers (line 68-69 on each page)**

| Page | New sm-tag | New sm-meta |
|---|---|---|
| influence.html | `<span class="sm-tag">Case study 01</span>` | `<span class="sm-meta">platform build · client project</span>` |
| influence-v2.html | `<span class="sm-tag">Case study 02</span>` | `<span class="sm-meta">platform build · repeat client</span>` |
| feedhack.html | `<span class="sm-tag">Case study 03</span>` | `<span class="sm-meta">automation · client project</span>` |
| pumpdat.html | `<span class="sm-tag">Case study 04</span>` | `<span class="sm-meta">blockchain · client project</span>` |

- [ ] **Step 2: Replace the case block headers on every page**

Each page has 5 `case-block-head` blocks. Old pattern:
```html
        <span class="path">~/01_the_problem<span class="slug">.md</span></span>
        <span class="num">[<span class="key">01</span>]</span>
```

New per block (same on all 4 pages):

| Block | New path span | New num span |
|---|---|---|
| 1 | `<span class="path">The problem</span>` | `<span class="num"><span class="key">01</span></span>` |
| 2 | `<span class="path">What I built</span>` | `<span class="num"><span class="key">02</span></span>` |
| preview | `<span class="path">Interface preview</span>` | `<span class="num"><span class="key">preview</span></span>` |
| 3 | `<span class="path">The outcome</span>` | `<span class="num"><span class="key">03</span></span>` |
| 4 | `<span class="path">The stack</span>` | `<span class="num"><span class="key">04</span></span>` |

- [ ] **Step 3: Humanize preview panel labels (influence.html only, lines 140-168)**

The CRM preview uses snake_case stage badges and a formula footer. Replace:

| Old | New |
|---|---|
| `deal_closed` | `deal closed` |
| `in_outreach` (2 occurrences) | `in outreach` |
| pr-footer text starting `v-score = ` | `value score combines engagement, reach, and audience location · representative data` |

Check the other 3 case pages' preview panels for snake_case strings the same way:
```bash
grep -n '_' work/influence-v2.html work/feedhack.html work/pumpdat.html | grep -v 'href\|class\|data-\|utm\|og:\|twitter\|json\|\.js\|font'
```
Humanize any visible snake_case hits the same way (underscores to spaces).

- [ ] **Step 4: Verify**

```bash
grep -rn '~/\|// case' work/*.html
```
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add work/influence.html work/influence-v2.html work/feedhack.html work/pumpdat.html
git commit -m "feat(copy): plain-language case study chrome and preview labels"
```

---

### Task 8: styles-case.css check

**Files:**
- Modify: `styles-case.css` (only if needed)

- [ ] **Step 1: Inspect for terminal-specific styling**

```bash
grep -n 'slug\|path\|prompt\|cursor\|::before\|::after' styles-case.css
```

The `.case-block-head .path .slug` rule (if present) styled the fake file extension; the markup no longer has a `.slug` inside `.path`. Delete orphaned `.slug` rules inside case-block-head scope. Keep `.path` itself (it now styles the plain English label). If any `::before`/`::after` injects `$`, `~`, or bracket characters, delete it.

- [ ] **Step 2: Visual check**

```bash
open work/influence.html
```
Expected: block headers read "The problem 01" style, no stray brackets or dollar signs anywhere.

- [ ] **Step 3: Commit (skip if no changes)**

```bash
git add styles-case.css
git commit -m "chore(design): drop orphaned case chrome styles"
```

---

### Task 9: 404 page

**Files:**
- Modify: `404.html:15-23`

- [ ] **Step 1: Replace the body copy**

Old (lines 15-23): `$ cat ./this-page` prompt, `cat: ./this-page: No such file or directory` line, `cd ~` and `ls ~/work` buttons.

New main block:
```html
<main class="wrap contact" style="text-align:left; padding-top: clamp(96px, 13vw, 160px);">
  <h2 style="font-size: clamp(40px, 7vw, 80px); letter-spacing: -0.04em; margin: 16px 0 12px;">404<span class="accent">.</span></h2>
  <p style="color: var(--ink-2); margin-bottom: 32px;">This page doesn't exist. The rest of the site does.</p>
  <div class="contact-row" style="justify-content:flex-start;">
    <a class="btn btn-primary" href="/">Back home</a>
    <a class="btn btn-ghost" href="/#work">See my work</a>
  </div>
</main>
```

- [ ] **Step 2: Verify**

```bash
grep -n 'cat\|cd ~\|ls ~' 404.html
```
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add 404.html
git commit -m "feat(copy): plain-language 404 page"
```

---

### Task 10: "discovery call" to "intro call" sweep

**Files:**
- Modify: `index.html` (visible copy, FAQ answers, FAQPage JSON-LD, meta descriptions)
- Modify: `work/*.html` (case CTA blocks, meta descriptions if they mention it)

The Calendly URL `calendly.com/rayyanabzal/discovery` stays unchanged everywhere.

- [ ] **Step 1: Find all occurrences**

```bash
grep -rn 'discovery call\|discovery_call\|Discovery' index.html work/*.html | grep -v 'calendly.com'
```

- [ ] **Step 2: Replace each visible occurrence**

Replace "discovery call" with "intro call" in: hero CTA notes, FAQ answers (all 7, both the visible `faq-a-inner` divs AND the FAQPage JSON-LD block at index.html line 33, keeping the two in sync), process step 1 description, meta descriptions ("Free discovery call." becomes "Free intro call."), case page CTA blocks ("Free 30-minute discovery call." becomes "Free 30-minute intro call."), and button labels ("Book a free discovery call" becomes "Book a free intro call").

- [ ] **Step 3: Verify**

```bash
grep -rn 'discovery' index.html work/*.html | grep -v 'calendly.com'
```
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add index.html work/influence.html work/influence-v2.html work/feedhack.html work/pumpdat.html
git commit -m "feat(copy): rename discovery call to intro call in visible copy"
```

---

### Task 11: Docs and metadata

**Files:**
- Modify: `CLAUDE.md`
- Modify: `sitemap.xml`
- Modify: `WORKLOG.md`

- [ ] **Step 1: Update CLAUDE.md**

In the Files map: remove the `js/palette.js` and `js/terminal.js` lines. Update the `index.html` description if it mentions the terminal. In Rules: replace "Match terminal/mono aesthetic on all edits" with "Plain-language copy; mono font for small labels and numbers only; no code syntax in visible copy".

- [ ] **Step 2: Update sitemap.xml lastmod**

Set `lastmod` to `2026-06-13` for all 5 URLs.

- [ ] **Step 3: Update WORKLOG.md**

Note: humanize revamp shipped on feat/section-clarity; terminal chrome removed sitewide; js/terminal.js and js/palette.js deleted; next step browser QA + merge.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md sitemap.xml WORKLOG.md
git commit -m "docs: update file map, rules, sitemap for humanize revamp"
```

---

### Task 12: Full verification sweep

- [ ] **Step 1: Grep sweep for any surviving terminal language**

```bash
grep -rn '~/' index.html work/*.html 404.html | grep -v 'http'
grep -rn '\$ \|\$<\|>\$' index.html work/*.html 404.html
grep -rn '// ' index.html work/*.html 404.html | grep -v 'http'
grep -rn 'class="prompt"\|class="cursor"\|hero-prompt\|prompt-line\|term-\|nav-kbd' index.html work/*.html 404.html
```
Expected: no output from any of the four.

- [ ] **Step 2: JS sanity**

```bash
node --check js/motion.js && node --check js/site.js
```
Expected: both exit 0.

- [ ] **Step 3: Browser QA (browser-qa skill)**

Run the browser-qa skill against the local files. Checklist:
- Hero status rows animate in; nothing stays hidden after load.
- Every booking CTA opens Calendly (or follows the href) and the onclick source names are unchanged.
- FAQ accordion opens and closes.
- Scrollspy highlights nav links while scrolling; scroll progress bar moves.
- No console errors on index.html and all 4 case pages (especially no 404s for removed scripts).
- Mobile width (390px): sticky CTA appears after work section, hides at contact.
- Case pages: block headers and preview panels render cleanly.
- 404.html renders with the new copy.

- [ ] **Step 4: Final commit if QA produced fixes, then done**

Stop here. Merging feat/section-clarity to main and pushing is a separate decision for Ray (Vercel auto-deploys main).
