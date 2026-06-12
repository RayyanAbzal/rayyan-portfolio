# Portfolio Showcase Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the approved showcase redesign: full vanilla animation system, guest terminal + Cmd+K palette, conversion restructure, NZ-local SEO, 28 bug fixes, and close the public CLAUDE.md leak.

**Architecture:** Static HTML/CSS/JS, no build step. All JS moves to four small `defer` files (`js/motion.js`, `js/site.js`, `js/palette.js`, `js/terminal.js`). Every effect gates on `prefers-reduced-motion` and a `.js` class on `<html>` so no-JS and reduced-motion visitors get a complete static page. Animate only transform/opacity/clip-path/background-size.

**Tech Stack:** HTML, CSS, vanilla JS. No libraries. Hosting: Vercel static, auto-deploys on push to `main`.

**Spec:** `docs/superpowers/specs/2026-06-12-portfolio-showcase-redesign-design.md`. Read it first.

**Branch:** work on `feat/showcase-redesign` (exists). Task 1 is the exception: it lands on `main` and pushes immediately.

**Repo root:** `/Users/rayyanabzal/Desktop/Projects/rayyan-portfolio`. All paths below are relative to it.

**Conventions for every task:**
- No em dashes anywhere (copy, comments, commit messages). Use hyphens or middle dots.
- After editing any JS file run `node --check js/<file>.js`.
- After editing any HTML file run `wc -l <file>` and confirm under 800 lines.
- Commit messages: `<type>(<scope>): <subject>` lowercase imperative, scopes used here: `deploy`, `css`, `content`, `seo`, `conversion`, `motion`, `interactive`, `docs`, `qa`.

---

### Task 1: Deploy hygiene (lands on main TODAY, closes the leak)

`https://rayyanabzal.com/CLAUDE.md` currently returns HTTP 200. Internal instructions are public.

**Files:**
- Create: `.vercelignore`

- [ ] **Step 1: Capture Lighthouse baseline of the live site (before any change deploys)**

Run: `npx --yes lighthouse https://rayyanabzal.com --quiet --chrome-flags="--headless" --only-categories=performance,seo,accessibility --output=json --output-path=/tmp/lh-baseline.json && python3 -c "import json; d=json.load(open('/tmp/lh-baseline.json')); print({k: v['score'] for k, v in d['categories'].items()})"`

Record the three scores in the task notes. If Chrome is unavailable and the command fails, note "baseline skipped: no headless chrome" and continue; do not block the leak fix on this.

- [ ] **Step 2: Switch to main and create `.vercelignore`**

Run: `git checkout main && git status --short` (expect only `M WORKLOG.md` or clean; never reset anything).

Create `.vercelignore`:

```
CLAUDE.md
WORKLOG.md
docs/
logo-exports/
logo designs_.zip
.claude/
```

- [ ] **Step 3: Commit path-limited and push**

```bash
git add .vercelignore
git diff --cached --name-only   # expect exactly: .vercelignore
git commit .vercelignore -m "fix(deploy): stop serving internal files publicly

CLAUDE.md, WORKLOG.md, logo sources and docs were fetchable at
rayyanabzal.com. .vercelignore excludes them from the deployment.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push origin main
```

- [ ] **Step 4: Verify in production after deploy (~1 min)**

Run: `sleep 90 && for f in CLAUDE.md WORKLOG.md "logo%20designs_.zip"; do echo -n "$f: "; curl -s -o /dev/null -w "%{http_code}\n" "https://rayyanabzal.com/$f"; done`

Expected: `404` for all three. If any still returns 200 after a confirmed fresh deploy, fall back per spec: CLAUDE.md must stay at repo root for Claude Code, so moving files is not an option. Instead try a `vercel.json` rule, or flag to Ray that the Vercel project needs a root-directory restructure. Do not proceed silently; report which path was taken.

- [ ] **Step 5: Bring the fix onto the feature branch**

```bash
git checkout feat/showcase-redesign
git merge main -m "chore: merge deploy hygiene fix from main"
```

---

### Task 2: CSS foundation (tokens, dead CSS, a11y, .js gate, reduced motion)

**Files:**
- Modify: `styles.css` (header comment line 2, `:root` lines 5-31, delete lines 87-129, reveal block lines 1139-1145, plus additions at end)
- Modify: `styles-case.css` (delete line 26)
- Modify: `index.html` (font URL line 23, inline styles lines 99, 429, 449)
- Modify: `work/influence.html`, `work/influence-v2.html` (inline style line 134)

- [ ] **Step 1: Verify which font weights are actually used**

Run: `grep -oh 'font-weight: *[0-9]*' styles.css styles-case.css | sort -u`

Expected: only 400, 500, 600. If 700 appears anywhere, keep it in the font URL and skip the URL edit for that family.

- [ ] **Step 2: Edit `styles.css` foundation**

2a. Line 2 header comment contains an em dash and a wrong description ("Dark"). Replace the whole comment line content with: `Builder / Paper and Pine - terminal aesthetic on cream`.

2b. In `:root` (lines 5-31): change `--ink-3: #7a8275;` to `--ink-3: #5d665e;` (passes 4.5:1 on both `#f5f1e8` and `#ece6d7`). Add after the `--font-mono` line:

```css
  --font-head: "Inter Tight", "Inter", -apple-system, system-ui, sans-serif;
```

2c. Delete the entire `.back-bar` block (lines 87-106) and the entire `.term-label` block (lines 111-129). They are referenced by no HTML. After deleting, run `grep -rn "back-bar\|term-label" *.html work/*.html` and expect no output.

2d. Replace the reveal block at the end of the file (currently `.reveal` with opacity 0 plus `.reveal.in`) with:

```css
/* Reveal: hidden only when JS is confirmed present (.js on <html>) */
.js .reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.js .reveal.in { opacity: 1; transform: none; }
```

2e. Append at the end of `styles.css`:

```css
/* ============================================================
   Foundation: a11y + layout utility classes
   ============================================================ */
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
:focus:not(:focus-visible) { outline: none; }

.section-tight { padding-bottom: clamp(56px, 8vw, 80px); }
.quote-card + .quote-card { margin-top: 24px; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .js .reveal { opacity: 1; transform: none; }
}

/* Failsafe: if motion.js never executes (see the __mfail timer in the head
   gate script, Task 4 Step 3), force everything visible after 3s */
.motion-failed .reveal, .motion-failed .reveal[data-stagger] > *,
.motion-failed .hero h1, .motion-failed .hero .hero-sub,
.motion-failed .hero .hero-status, .motion-failed .hero .hero-cta,
.motion-failed .hs-row, .motion-failed .pipeline .step {
  opacity: 1 !important;
  transform: none !important;
  clip-path: none !important;
}
```

- [ ] **Step 3: Edit `styles-case.css`**

Delete line 26 (the unused `.case-hero .term-label` rule). Append at end:

```css
.case-hero .quote-card { margin-top: 32px; }
```

- [ ] **Step 4: Remove inline styles and trim fonts in HTML**

4a. `index.html:99`: change `<section class="wrap" data-screen-label="02 Shipping log" style="padding-bottom: clamp(56px, 8vw, 80px);">` to `<section class="wrap section-tight" data-screen-label="02 Shipping log">`.

4b. `index.html:429` and `index.html:449`: remove ` style="margin-top: 24px;"` from both `<figure class="quote-card reveal" ...>` tags (the new `.quote-card + .quote-card` rule covers it).

4c. `work/influence.html:134` and `work/influence-v2.html:134`: remove ` style="margin-top: 32px;"` from the quote-card figures (covered by the new styles-case rule; this also gives pumpdat the same spacing).

4d. Font URL on all 5 pages (`index.html:23`, line 10 of each case page): change `Inter+Tight:wght@400;500;600;700` to `Inter+Tight:wght@400;500;600` (keep JetBrains Mono weights as they are).

- [ ] **Step 5: Verify and commit**

```bash
grep -c "style=" index.html work/*.html        # expect 0 for every file (VT names come later with a documented exception)
grep -n "wght@400;500;600&" index.html         # confirm trimmed URL present
git add styles.css styles-case.css index.html work/influence.html work/influence-v2.html work/feedhack.html work/pumpdat.html
git commit -m "fix(css): a11y tokens, dead CSS removal, js-gated reveal, font trim

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: index.html content and status fixes

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Fix broken copy**

1a. Line 487 (FAQ answer 01): replace `requires judgement and ingests text, images, or data. AI is usually a fit.` with `requires judgement and ingests text, images, or data, AI is usually a fit.`

1b. Line 511 (FAQ answer 04): replace `add AI features: LLM workflows, agents, automation pipelines, without requiring a rebuild. Most engagements are additive.` with `add AI features: LLM workflows, agents, automation pipelines. No rebuild required. Most engagements are additive.`

1c. Line 558: delete the whole Calendly dev comment line (the HTML comment that says to replace the Calendly URL with itself).

- [ ] **Step 2: Flip Influence v2 to shipped**

2a. Replace the v2 card block (lines 289-306). The `div.card.card-disabled` becomes a link, status becomes shipped, copy matches the case page, repeat-client badge added:

```html
      <a class="card reveal" href="work/influence-v2.html">
        <div class="card-head">
          <span class="path">~/work/<span class="slug">influence-v2</span></span>
          <span class="card-status"><span class="dot"></span>shipped</span>
        </div>
        <div class="card-body">
          <h3>Influence v2</h3>
          <p class="card-outcome">Same client came back. Live partner management moved <strong>out of chat threads</strong> into the platform.</p>
          <p class="card-detail">A Current Roster module built inside the existing CRM: monthly KPI uploads, FTD progress tracking, auto-calculated CPA, flat fee spend, and Telegram reminders. Staff upload a CSV, the platform does the math.</p>
          <div class="card-stack">
            <span class="chip">next.js</span><span class="chip">supabase</span><span class="chip">tailwind</span><span class="chip">vercel</span><span class="chip">telegram</span>
          </div>
        </div>
        <div class="card-foot">
          <span class="case-link">read case study</span>
          <span class="card-meta"><span class="accent">repeat client</span> · platform</span>
        </div>
      </a>
```

2b. Hero status rows (lines 73-80): replace the `current` and `next_slot` rows with:

```html
      <div class="hs-row">
        <span class="hs-key">current</span>
        <span class="hs-val">open for next build <span class="tag">▸ booking now</span><span class="muted">free discovery call</span></span>
      </div>
      <div class="hs-row">
        <span class="hs-key">last_shipped</span>
        <span class="hs-val">influence-v2 <span class="tag">▸ live</span><span class="muted">repeat client · platform build</span></span>
      </div>
```

2c. Line 159 (about card `shipped` row): change value to `4 shipped <span class="tag">▸ all live</span><span class="muted">+ 3 self builds in the lab</span>`.

2d. Line 220 (work section marker meta): change `03 shipped · 01 shipping · 03 personal builds` to `04 shipped · 03 personal builds`.

- [ ] **Step 3: Renumber duplicate screen label**

Line 533: change `data-screen-label="09 Contact"` to `data-screen-label="10 Contact"` (FAQ keeps 09; testimonials/process renumbering happens in Task 9 when sections move).

- [ ] **Step 4: Verify and commit**

```bash
grep -n "data. AI is usually" index.html        # expect no output
grep -n "card-disabled" index.html               # expect no output
git add index.html
git commit -m "fix(content): flip influence-v2 to shipped, repair FAQ copy, status rows

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Homepage SEO (head, JSON-LD, NZ copy, FAQ)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Rewrite the head meta block**

Replace line 2 and the title/meta set (lines 6-13) so the head reads:

```html
<html lang="en-NZ">
```

```html
<title>AI Consultant &amp; Automation, Auckland NZ | Rayyan Abzal</title>
<meta name="description" content="AI consultant in Auckland, New Zealand. I build AI automation and custom software that replaces manual work for startups and small businesses. Free discovery call." />
<link rel="canonical" href="https://rayyanabzal.com/" />
<meta property="og:url" content="https://rayyanabzal.com/" />
<meta property="og:site_name" content="Rayyan Abzal" />
<meta property="og:locale" content="en_NZ" />
<meta property="og:title" content="AI Consultant &amp; Automation, Auckland NZ | Rayyan Abzal" />
<meta property="og:description" content="AI consultant in Auckland, New Zealand. I build AI automation and custom software that replaces manual work for startups and small businesses. Free discovery call." />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="AI Consultant &amp; Automation, Auckland NZ | Rayyan Abzal" />
<meta name="twitter:description" content="AI consultant in Auckland, New Zealand. I build AI automation and custom software that replaces manual work for startups and small businesses. Free discovery call." />
```

- [ ] **Step 2: Fix render-blocking Calendly CSS**

Replace line 20 (the blocking Calendly widget.css link) and move the replacement to sit AFTER the Google Fonts link (after current line 23):

```html
<link rel="preconnect" href="https://assets.calendly.com" crossorigin />
<link rel="preload" href="https://assets.calendly.com/assets/external/widget.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" /></noscript>
```

- [ ] **Step 3: Add the .js gate script as the FIRST element inside `<head>`**

Directly after `<head>`:

```html
<script>document.documentElement.classList.add('js');window.__mfail=setTimeout(function(){document.documentElement.classList.add('motion-failed')},3000);</script>
```

The `__mfail` timer is the script-failure failsafe: `js/motion.js` clears it on load; if motion.js never executes, the `.motion-failed` CSS (Task 2) forces everything visible after 3s instead of leaving the page hidden behind the `.js` gate.

- [ ] **Step 4: Add JSON-LD before `</head>`**

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@graph":[{"@type":"ProfessionalService","@id":"https://rayyanabzal.com/#business","name":"Rayyan Abzal · AI Consulting","url":"https://rayyanabzal.com/","image":"https://rayyanabzal.com/og.png","description":"Solo AI engineering practice in Auckland, New Zealand. AI consulting, automation, and custom software that replaces manual work for startups and small businesses.","areaServed":[{"@type":"Country","name":"New Zealand"},{"@type":"City","name":"Auckland"}],"address":{"@type":"PostalAddress","addressLocality":"Auckland","addressCountry":"NZ"},"email":"rayyanabzal@gmail.com","founder":{"@id":"https://rayyanabzal.com/#person"},"sameAs":["https://www.linkedin.com/in/rayyan-a-832a20213"]},{"@type":"Person","@id":"https://rayyanabzal.com/#person","name":"Rayyan Abzal","jobTitle":"AI Consultant","url":"https://rayyanabzal.com/","worksFor":{"@id":"https://rayyanabzal.com/#business"},"address":{"@type":"PostalAddress","addressLocality":"Auckland","addressCountry":"NZ"},"sameAs":["https://www.linkedin.com/in/rayyan-a-832a20213"]}]}
</script>
```

FAQPage JSON-LD is added in Step 6 AFTER the FAQ copy is final, so markup matches visible text verbatim.

- [ ] **Step 5: NZ copy placements (3, natural)**

5a. Line 65 hero-sub: `An <strong>AI engineering practice</strong> for startups and operators.` becomes `An <strong>AI engineering practice</strong> in Auckland, New Zealand for startups and operators.`

5b. Line 133 about: `run by Rayyan Abzal out of Auckland.` becomes `run by Rayyan Abzal out of Auckland, New Zealand.`

5c. Line 212 services-intro: `Most engagements start with finding where AI or automation can` becomes `Most engagements, in New Zealand and beyond, start with finding where AI or automation can`.

- [ ] **Step 6: FAQ: reorder, add Q7, add aria, then FAQPage JSON-LD**

6a. Reorder the six `.faq-item` blocks to: pricing (was 05), project length (was 02), AI right tool (was 01), non-technical founders (was 03), existing system (was 04), NDAs (was 06). Renumber the `faq-q-num` spans 01-06 in the new order.

6b. Append a 7th `.faq-item` after NDAs:

```html
    <div class="faq-item">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-a-7">
        <span class="faq-q-num">07</span>
        <span>Do you only work with Auckland businesses?</span>
        <span class="faq-toggle"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg></span>
      </button>
      <div class="faq-a" id="faq-a-7"><div class="faq-a-inner">No. I'm based in Auckland and work with businesses across New Zealand as well as clients in Europe and the US. Everything runs remotely: the discovery call, weekly updates, a live staging link, and handover. NZ clients get same-timezone communication, which most overseas agencies can't offer.</div></div>
    </div>
```

6c. For ALL seven items: add `id="faq-a-N"` to each `.faq-a` div, `aria-controls="faq-a-N"` to each button, and `aria-hidden="true" focusable="false"` to each toggle SVG. Update the FAQ section marker meta (line 474) to `07 common questions`.

6d. Add the FAQPage JSON-LD before `</head>`, one `Question` per visible item, `text` copied VERBATIM from each `.faq-a-inner` (including the Task 3 fixes). Template (fill all seven, in the new visible order):

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What's your pricing model?","acceptedAnswer":{"@type":"Answer","text":"<verbatim answer text>"}},{"@type":"Question","name":"How long does a project take?","acceptedAnswer":{"@type":"Answer","text":"<verbatim>"}},{"@type":"Question","name":"How do you decide if AI is the right tool?","acceptedAnswer":{"@type":"Answer","text":"<verbatim>"}},{"@type":"Question","name":"Do you work with non-technical founders?","acceptedAnswer":{"@type":"Answer","text":"<verbatim>"}},{"@type":"Question","name":"Can you integrate AI into an existing system?","acceptedAnswer":{"@type":"Answer","text":"<verbatim>"}},{"@type":"Question","name":"Do you sign NDAs?","acceptedAnswer":{"@type":"Answer","text":"<verbatim>"}},{"@type":"Question","name":"Do you only work with Auckland businesses?","acceptedAnswer":{"@type":"Answer","text":"<verbatim>"}}]}
</script>
```

- [ ] **Step 7: Validate JSON-LD, verify, commit**

```bash
python3 - <<'EOF'
import re, json
html = open('index.html').read()
blocks = re.findall(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', html, re.S)
assert len(blocks) == 2, f"expected 2 JSON-LD blocks, got {len(blocks)}"
for b in blocks: json.loads(b)
print("JSON-LD valid")
EOF
grep -c "New Zealand" index.html     # expect >= 5
wc -l index.html                     # expect < 800
git add index.html
git commit -m "feat(seo): NZ-local head meta, JSON-LD, copy placements, FAQ rework

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Case page SEO and consistency fixes (all 4 pages)

**Files:**
- Modify: `work/influence.html`, `work/influence-v2.html`, `work/feedhack.html`, `work/pumpdat.html`
- Modify: `styles-case.css:138,147`

- [ ] **Step 1: Per-page head data**

For each page: set `<html lang="en-NZ">`, add the `.js` gate script first in head (same one-liner as Task 4 Step 3), replace the title, and insert the full meta set after the existing meta description. Per-page values:

| page | title | canonical |
|---|---|---|
| influence.html | `Influence CRM Case Study \| Rayyan Abzal, AI Consultant Auckland` | `https://rayyanabzal.com/work/influence.html` |
| influence-v2.html | `Influence v2 Dashboard Case Study \| Rayyan Abzal, AI Consultant NZ` | `https://rayyanabzal.com/work/influence-v2.html` |
| feedhack.html | `FeedHack Discord Automation Case Study \| Rayyan Abzal, AI Consultant NZ` | `https://rayyanabzal.com/work/feedhack.html` |
| pumpdat.html | `pumpdat Token Launchpad Case Study \| Rayyan Abzal, AI Consultant NZ` | `https://rayyanabzal.com/work/pumpdat.html` |

Meta template per page (substitute TITLE, DESC = that page's existing meta description text, URL):

```html
<link rel="canonical" href="URL" />
<meta property="og:url" content="URL" />
<meta property="og:site_name" content="Rayyan Abzal" />
<meta property="og:locale" content="en_NZ" />
<meta property="og:type" content="article" />
<meta property="og:title" content="TITLE" />
<meta property="og:description" content="DESC" />
<meta name="twitter:title" content="TITLE" />
<meta name="twitter:description" content="DESC" />
```

(`og:image` trio and `twitter:card` already exist on every page; leave them.)

- [ ] **Step 2: BreadcrumbList JSON-LD per page (before `</head>`)**

influence.html version (swap position-3 `name` per page: `Influence v2`, `FeedHack`, `pumpdat`):

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://rayyanabzal.com/"},{"@type":"ListItem","position":2,"name":"Work","item":"https://rayyanabzal.com/#work"},{"@type":"ListItem","position":3,"name":"Influence"}]}
</script>
```

- [ ] **Step 3: Heading hierarchy h3 to h2**

On all 4 pages change every `.case-block` heading `<h3>` to `<h2>` (3 headings per page; the stack block has none). In `styles-case.css` change line 138 `.case-block h3 {` to `.case-block h2 {` and line 147 `.case-block h3 .hi` to `.case-block h2 .hi`. Visual output identical.

- [ ] **Step 4: Case-nav chain and labels**

4a. `work/feedhack.html:139-142`: prev currently points at `influence.html` with target `Influence`, skipping v2. Change to:

```html
    <a href="influence-v2.html" class="prev">
      <span class="label">← prev case</span>
      <span class="target">Influence v2</span>
    </a>
```

4b. Standardise labels: in `work/influence-v2.html:155` the label `← prev` becomes `← prev case` (target `Influence v1` stays). `work/influence.html` keeps `← back` / `All work` (correct for the All-work link) and next target `Influence v2`.

- [ ] **Step 5: Brand pass (footers)**

On all 5 pages (index + 4 case pages) change the footer line so `<strong>Rayyan Consulting</strong> · © 2026 ·` becomes `<strong>Rayyan Abzal</strong> · AI consulting practice · © 2026 ·`. Leave the nav prompt `rayyan-consulting@auckland` as is (hostname flavour, locked decision).

- [ ] **Step 6: Verify and commit**

```bash
for f in work/*.html; do echo "== $f"; grep -c "og:title" $f; grep -c "rel=\"canonical\"" $f; done   # expect 1 and 1 each
grep -n "<h3>" work/*.html    # expect no output
grep -rn "Rayyan Consulting</strong>" index.html work/*.html   # expect no output
python3 - <<'EOF'
import re, json, glob
for f in glob.glob('work/*.html'):
    for b in re.findall(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', open(f).read(), re.S):
        json.loads(b)
print("case JSON-LD valid")
EOF
git add work/ styles-case.css index.html
git commit -m "feat(seo): case page meta, breadcrumbs, heading hierarchy, brand pass

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: sitemap.xml, robots.txt, 404.html

**Files:**
- Create: `sitemap.xml`, `robots.txt`, `404.html`

- [ ] **Step 1: Create `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://rayyanabzal.com/</loc><lastmod>2026-06-12</lastmod><priority>1.0</priority></url>
  <url><loc>https://rayyanabzal.com/work/influence.html</loc><lastmod>2026-06-12</lastmod><priority>0.7</priority></url>
  <url><loc>https://rayyanabzal.com/work/influence-v2.html</loc><lastmod>2026-06-12</lastmod><priority>0.7</priority></url>
  <url><loc>https://rayyanabzal.com/work/feedhack.html</loc><lastmod>2026-06-12</lastmod><priority>0.7</priority></url>
  <url><loc>https://rayyanabzal.com/work/pumpdat.html</loc><lastmod>2026-06-12</lastmod><priority>0.7</priority></url>
</urlset>
```

- [ ] **Step 2: Create `robots.txt`**

```
User-agent: *
Allow: /
Disallow: /logo-exports/

Sitemap: https://rayyanabzal.com/sitemap.xml
```

- [ ] **Step 3: Create `404.html`** (absolute asset paths; noindex; on-brand)

```html
<!doctype html>
<html lang="en-NZ">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>404: Not Found | Rayyan Abzal</title>
<meta name="robots" content="noindex" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/styles.css" />
</head>
<body>
<main class="wrap contact" style="text-align:left; padding-top: clamp(96px, 13vw, 160px);">
  <div class="prompt-line"><span class="p" style="color:var(--accent)">$</span> <span class="mono">cat ./this-page</span></div>
  <h2 style="font-size: clamp(40px, 7vw, 80px); letter-spacing: -0.04em; margin: 16px 0 12px;">404<span class="accent">.</span></h2>
  <p class="mono" style="color: var(--ink-2); margin-bottom: 32px;">cat: ./this-page: No such file or directory</p>
  <div class="contact-row" style="justify-content:flex-start;">
    <a class="btn btn-primary" href="/">cd ~</a>
    <a class="btn btn-ghost" href="/#work">ls ~/work</a>
  </div>
</main>
</body>
</html>
```

(Inline styles acceptable here: single throwaway page, keeps it self-contained without touching styles.css.)

- [ ] **Step 4: Verify and commit**

```bash
grep -c "<loc>" sitemap.xml   # expect 5
git add sitemap.xml robots.txt 404.html
git commit -m "feat(seo): sitemap, robots.txt, branded 404

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---
### Task 7: js/site.js (bookCall helper, FAQ accordion, sticky CTA logic)

**Files:**
- Create: `js/site.js`
- Modify: `index.html` (remove inline FAQ script, rewire CTAs, load script)

- [ ] **Step 1: Create `js/site.js`**

```js
/* Site utilities: booking, FAQ accordion, sticky mobile CTA.
   Loaded with defer on every page. */
(function () {
  "use strict";

  /* Booking: fires an analytics event, opens the Calendly popup when the
     widget is loaded, otherwise lets the browser follow the real href.
     Usage: onclick="return bookCall('hero')" on an <a href=CALENDLY_URL>. */
  var CALENDLY_URL = "https://calendly.com/rayyanabzal/discovery";
  window.bookCall = function (source) {
    if (window.va) { window.va("event", { name: "book_click", data: { source: source } }); }
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL + "?utm_source=site&utm_content=" + source });
      return false;
    }
    return true;
  };

  /* FAQ accordion (moved from inline script in index.html) */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.parentElement.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* Sticky mobile CTA: shows after the element in data-show-after enters
     view once, hides while the element in data-hide-at is in view. */
  var bar = document.querySelector(".mobile-cta");
  if (bar && "IntersectionObserver" in window) {
    var showAfter = document.querySelector(bar.getAttribute("data-show-after"));
    var hideAt = document.querySelector(bar.getAttribute("data-hide-at"));
    var passed = false;
    if (showAfter) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting || e.boundingClientRect.top < 0) { passed = true; }
          bar.classList.toggle("show", passed && !bar.classList.contains("suppress"));
        });
      }).observe(showAfter);
    }
    if (hideAt) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          bar.classList.toggle("suppress", e.isIntersecting);
          bar.classList.toggle("show", passed && !e.isIntersecting);
        });
      }).observe(hideAt);
    }
  }
})();
```

- [ ] **Step 2: Wire into `index.html`**

2a. Delete the entire inline FAQ + reveal `<script>` block (currently lines 561-583). The reveal half is recreated in Task 12 by `js/motion.js`; until Task 12 lands, `.reveal` elements stay visible because nothing adds the hiding class logic, and the `.js` gate CSS hides them. NOTE: this means between Task 7 and Task 12 commits the page hides revealed content; Tasks 7-12 are committed on the branch and never deployed individually, so this is acceptable. Do NOT push to main between these tasks.

2b. Before the Vercel insights script at the bottom, add:

```html
<script defer src="js/site.js"></script>
```

2c. Rewire all three Calendly CTAs (nav line 46, hero line 93, contact line 539) from `href="#"` + raw `onclick` to the guarded pattern:

```html
<a class="nav-cta" href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('nav')">book</a>
```

```html
<a class="btn btn-primary" href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('hero')">book_call</a>
```

```html
<a class="btn btn-primary" href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('contact')">book_discovery_call</a>
```

- [ ] **Step 3: Verify and commit**

```bash
node --check js/site.js
grep -c "bookCall" index.html      # expect 3
grep -n "initPopupWidget" index.html   # expect no output (only site.js holds it now)
git add js/site.js index.html
git commit -m "feat(conversion): site.js with guarded bookCall, instrumented CTAs

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: Services section rebuild (3 problem-led offers)

**Files:**
- Modify: `index.html` (#services section, lines 202-214)
- Modify: `styles.css` (append offer card styles)

- [ ] **Step 1: Replace the services section body**

Keep the section tag, marker, and section-head. Replace the lone `services-intro` paragraph (line 212) with intro + offer grid:

```html
  <p class="services-intro reveal">Most engagements, in New Zealand and beyond, start with finding where AI or automation can <span class="hl">replace manual work</span>, then shipping the lightest system that does it. When the project needs a full product or platform, I build that end-to-end too.</p>

  <div class="offers reveal" data-stagger="80">
    <div class="offer">
      <div class="offer-head"><span class="path">~/services/<span class="slug">replace_manual_work</span>.md</span></div>
      <div class="offer-body">
        <h3>A manual process is eating your week.</h3>
        <p>I find the bottleneck, then build the automation or AI workflow that removes it. Your team keeps the tools they know; the busywork disappears.</p>
        <div class="offer-meta"><span class="tag">▸ 1-3 weeks</span><a href="work/feedhack.html">proof: FeedHack</a></div>
      </div>
      <div class="offer-foot"><a href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('services_automation')">start with the free call</a></div>
    </div>
    <div class="offer">
      <div class="offer-head"><span class="path">~/services/<span class="slug">ai_in_your_product</span>.md</span></div>
      <div class="offer-body">
        <h3>You want AI inside your existing product.</h3>
        <p>I add LLM features, agents, and pipelines to the codebase you already have. No rebuild, no rip-and-replace. Most engagements are additive.</p>
        <div class="offer-meta"><span class="tag">▸ 2-4 weeks</span><a href="work/influence-v2.html">proof: Influence v2</a></div>
      </div>
      <div class="offer-foot"><a href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('services_integrate')">start with the free call</a></div>
    </div>
    <div class="offer">
      <div class="offer-head"><span class="path">~/services/<span class="slug">full_build</span>.md</span></div>
      <div class="offer-body">
        <h3>You need the whole tool built.</h3>
        <p>Platform, dashboard, bot, or contracts: I design, build, and ship it end to end, then hand it over with docs and a team walkthrough.</p>
        <div class="offer-meta"><span class="tag">▸ 4-8 weeks</span><a href="work/influence.html">proof: Influence</a></div>
      </div>
      <div class="offer-foot"><a href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('services_full_build')">start with the free call</a></div>
    </div>
  </div>
```

Note: spec listed offer 2 proof as "FAQ Q4 territory"; Influence v2 (a module added inside an existing platform) is a stronger, linkable proof. Documented deviation, improvement.

- [ ] **Step 2: Append offer styles to `styles.css`**

```css
/* ============================================================
   Services: offer cards
   ============================================================ */
.offers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 880px) { .offers { grid-template-columns: 1fr; } }
.offer {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--r);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.offer:hover { border-color: var(--accent); transform: translateY(-3px); box-shadow: 0 0 32px var(--accent-glow); }
.offer-head {
  padding: 14px 20px;
  border-bottom: 1px solid var(--line);
  background: var(--panel-2);
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--ink-3);
}
.offer-head .slug { color: var(--accent); }
.offer-body { padding: 22px 20px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.offer-body h3 { font-size: 21px; font-weight: 600; letter-spacing: -0.022em; line-height: 1.15; }
.offer-body p { font-size: 14px; color: var(--ink-2); line-height: 1.6; }
.offer-meta {
  margin-top: auto;
  padding-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 12px;
}
.offer-meta .tag { color: var(--accent); }
.offer-meta a { color: var(--ink-3); transition: color 0.15s; }
.offer-meta a:hover { color: var(--accent); }
.offer-foot {
  padding: 14px 20px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 12.5px;
}
.offer-foot a { color: var(--accent); display: inline-flex; gap: 6px; transition: gap 0.15s; }
.offer-foot a::before { content: "→"; }
.offer-foot a:hover { gap: 10px; }
```

- [ ] **Step 3: Verify and commit**

```bash
grep -c "class=\"offer\"" index.html   # expect 3
wc -l index.html                       # expect < 800
git add index.html styles.css
git commit -m "feat(conversion): rebuild services as 3 problem-led offers

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: Testimonials move + inline CTAs

**Files:**
- Modify: `index.html` (section order, quote order, inline CTA bars)
- Modify: `styles.css` (inline-cta styles)

- [ ] **Step 1: Move and reorder testimonials**

1a. Cut the entire `#testimonials` section block and paste it directly AFTER the closing `</section>` of `#work` (before `#process`).

1b. Inside it, reorder the three `figure.quote-card` blocks to: influence-v2 first, influence-v1 second, pumpdat third.

1c. Renumber `data-screen-label` attributes to match the new flow: `06 Work`, `07 Testimonial`, `08 Process`, `09 FAQ`, `10 Contact` (about 03, principles 04, services 05 unchanged).

- [ ] **Step 2: Add two inline CTA bars**

2a. Directly after the `#work` section's closing `</section>` is now the testimonials section; place the FIRST bar between work and testimonials, and the SECOND after testimonials (before `#process`):

```html
<section class="wrap section-tight">
  <div class="inline-cta reveal">
    <span class="ic-prompt"><span class="p">$</span> ./book_call --after=seeing_the_work</span>
    <span class="ic-note">free · 30 min · no pitch</span>
    <a class="btn btn-primary" href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('after_work')">book_call</a>
  </div>
</section>
```

Second instance: identical except `--after=reading_testimonials` and `bookCall('after_testimonials')`.

2b. Append to `styles.css`:

```css
/* Inline CTA bar */
.inline-cta {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
}
.inline-cta .ic-prompt { font-family: var(--font-mono); font-size: 13px; color: var(--ink-2); }
.inline-cta .ic-prompt .p { color: var(--accent); }
.inline-cta .ic-note { font-family: var(--font-mono); font-size: 11.5px; color: var(--ink-3); margin-left: auto; }
@media (max-width: 640px) { .inline-cta .ic-note { display: none; } }
```

- [ ] **Step 3: Verify and commit**

```bash
python3 - <<'EOF'
html = open('index.html').read()
order = [html.index('id="work"'), html.index('id="testimonials"'), html.index('id="process"'), html.index('id="faq"')]
assert order == sorted(order), "section order wrong"
assert html.index('influence-v2.md') < html.index('influence-v1.md') < html.index('pumpdat.md'), "quote order wrong"
print("order ok")
EOF
grep -c "inline-cta" index.html   # expect 2 (plus 1 CSS-class mention is in styles.css, not counted here)
git add index.html styles.css
git commit -m "feat(conversion): testimonials under work, repeat client first, mid-page CTAs

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: Case page CTAs + Calendly on case pages

**Files:**
- Modify: all 4 `work/*.html`
- Modify: `styles-case.css` (case-cta styles)

- [ ] **Step 1: Load Calendly + site.js on all 4 case pages**

In each head, after the Google Fonts link (mirror Task 4 Step 2 pattern):

```html
<link rel="preconnect" href="https://assets.calendly.com" crossorigin />
<link rel="preload" href="https://assets.calendly.com/assets/external/widget.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" /></noscript>
```

Before the Vercel insights script in each body:

```html
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
<script defer src="../js/site.js"></script>
```

- [ ] **Step 2: Rewire case nav book buttons**

On each case page, the nav CTA currently points back to the homepage contact section. Change to (per-page source name: `case_nav_influence`, `case_nav_influence_v2`, `case_nav_feedhack`, `case_nav_pumpdat`):

```html
      <a class="nav-cta" href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('case_nav_influence')">book</a>
```

- [ ] **Step 3: Add `.case-cta` panel before `.case-nav` on each page**

Per-page source names: `case_influence`, `case_influence_v2`, `case_feedhack`, `case_pumpdat`.

```html
  <div class="case-cta">
    <div>
      <h3>Have a similar bottleneck?</h3>
      <p>Free 30-minute discovery call. Written proposal with a fixed price within 48 hours.</p>
    </div>
    <a class="btn btn-primary" href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('case_influence')">book_discovery_call</a>
  </div>
```

- [ ] **Step 4: Append to `styles-case.css`**

```css
/* Case page booking CTA */
.case-cta {
  margin-top: clamp(40px, 6vw, 64px);
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 26px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.case-cta h3 { font-size: 22px; font-weight: 600; letter-spacing: -0.022em; margin-bottom: 6px; }
.case-cta p { font-size: 14px; color: var(--ink-2); }
```

- [ ] **Step 5: Verify and commit**

```bash
for f in work/*.html; do echo "== $f"; grep -c "case-cta" $f; grep -c "bookCall" $f; done   # expect 1 and 2 per page
git add work/ styles-case.css
git commit -m "feat(conversion): booking CTAs on case pages

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 11: Mobile CTA order + sticky mobile CTA bar

**Files:**
- Modify: `index.html` (hero, sticky bar markup), all 4 `work/*.html` (sticky bar markup)
- Modify: `styles.css`

- [ ] **Step 1: Hero CTA above status card on mobile**

The hero DOM order is h1, .hero-body (sub + status), .hero-cta. Make .hero-cta jump above the status card on small screens with CSS only. Append to `styles.css`:

```css
/* Mobile: CTA lands before the status card */
@media (max-width: 880px) {
  .hero { display: flex; flex-direction: column; }
  .hero .hero-prompt { order: 0; }
  .hero h1 { order: 1; }
  .hero .hero-body { order: 3; }
  .hero .hero-cta { order: 2; margin-top: 28px; }
  .hero-body { grid-template-columns: 1fr; gap: 32px; }
}
.cta-note {
  display: block;
  width: 100%;
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--ink-3);
}
```

(The existing 880px `.hero-body` rule at styles.css:389-391 is replaced by this block; remove the old one to avoid duplication.)

Add the microcopy inside `.hero-cta` after the two links (`index.html`, hero):

```html
    <span class="cta-note">free · 30 min · no pitch · proposal in 48h</span>
```

- [ ] **Step 2: Sticky bar markup**

Before `</main>` on index:

```html
<div class="mobile-cta" data-show-after="#work" data-hide-at="#contact">
  <a class="btn btn-primary" href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('sticky_mobile')">book free call</a>
</div>
```

Before `</main>` on each case page (shows after the case body, never suppressed since case pages have no #contact):

```html
<div class="mobile-cta" data-show-after=".case-body" data-hide-at=".case-cta">
  <a class="btn btn-primary" href="https://calendly.com/rayyanabzal/discovery" onclick="return bookCall('sticky_mobile_case')">book free call</a>
</div>
```

- [ ] **Step 3: Sticky bar styles (append to `styles.css`)**

```css
/* Sticky mobile CTA */
.mobile-cta {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  z-index: 60;
  padding: 10px var(--pad) calc(10px + env(safe-area-inset-bottom));
  background: rgba(245, 241, 232, 0.92);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--line);
  transform: translateY(110%);
  transition: transform 0.3s ease;
  display: none;
}
.mobile-cta .btn { width: 100%; justify-content: center; }
.mobile-cta.show { transform: translateY(0); }
@media (max-width: 920px) { .mobile-cta { display: block; } }
```

- [ ] **Step 4: Verify and commit**

```bash
grep -c "mobile-cta" index.html        # expect 1
for f in work/*.html; do grep -c "mobile-cta" $f; done   # expect 1 each
git add index.html work/ styles.css
git commit -m "feat(conversion): mobile hero CTA order, sticky mobile booking bar

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 12: js/motion.js foundation (reveal engine, all pages)

**Files:**
- Create: `js/motion.js`
- Modify: `index.html`, all 4 `work/*.html` (script tag, reveal classes on case pages)

- [ ] **Step 1: Create `js/motion.js`**

```js
/* Motion engine. Everything gates on MOTION_OK; reduced-motion and no-JS
   visitors get the complete static page. Effects animate transform/opacity/
   clip-path only, and every observer fires once then unobserves.

   Reveal lifecycle: .in starts the transition; ~1.4s later the element drops
   .reveal/.in and gains a permanent .done, returning it to natural styles.
   This keeps hover transforms alive (a persistent transform:none from .in
   would override same-specificity :hover rules). CSS conventions:
   hidden states live under ".js .reveal", transitions key on ".in",
   persistent end-states key on ":is(.in, .done)".

   A parent with data-stagger="80" cascades its direct children 80ms apart. */
(function () {
  "use strict";
  if (window.__mfail) { clearTimeout(window.__mfail); }
  var MOTION_OK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealHooks = [];
  function onRevealed(el) {
    revealHooks.forEach(function (h) { if (el.matches(h.sel)) { h.fn(el); } });
  }

  function revealEl(el) {
    if (el.classList.contains("in") || el.classList.contains("done")) { return; }
    var stagger = el.getAttribute("data-stagger");
    if (stagger) {
      Array.prototype.forEach.call(el.children, function (kid, i) {
        kid.style.transitionDelay = (i * parseInt(stagger, 10)) + "ms";
      });
    }
    el.classList.add("in");
    onRevealed(el);
    setTimeout(function () {
      el.classList.add("done");
      el.classList.remove("reveal", "in");
      if (stagger) {
        Array.prototype.forEach.call(el.children, function (kid) {
          kid.style.transitionDelay = "";
        });
      }
    }, 1400);
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function showAll() { reveals.forEach(revealEl); }
  if (!("IntersectionObserver" in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { revealEl(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.01 });
    reveals.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 800) + 200) { revealEl(el); }
      else { io.observe(el); }
    });
    setTimeout(showAll, 1500); /* failsafe: nothing stays hidden */
  }

  /* --- Typing helper --- */
  function typeInto(el, text, speed, done) {
    if (!MOTION_OK) { el.textContent = text; if (done) { done(); } return; }
    var i = 0;
    el.textContent = "";
    var t = setInterval(function () {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) { clearInterval(t); if (done) { done(); } }
    }, speed || 55);
  }

  /* Export for later sections of this file */
  window.__motion = { ok: MOTION_OK, typeInto: typeInto, hook: function (sel, fn) { revealHooks.push({ sel: sel, fn: fn }); } };
})();
```

- [ ] **Step 2: Load it everywhere and class the case pages**

2a. `index.html`: add `<script defer src="js/motion.js"></script>` next to the site.js tag. Confirm the old inline reveal script is gone (removed in Task 7).

2b. Each case page: add `<script defer src="../js/motion.js"></script>` next to its site.js tag.

2c. Case pages currently have ZERO `.reveal` classes. On each of the 4 pages add `class="... reveal"` to: the `.section-marker` div, the `h1.case-title`, the `p.case-summary`, the `.case-meta` div, each `article.case-block` (4 per page), the `figure.quote-card` (where present), the `.case-cta` div, and the `nav.case-nav`.

- [ ] **Step 3: Verify and commit**

```bash
node --check js/motion.js
grep -c "reveal" work/influence.html    # expect >= 9
git add js/motion.js index.html work/
git commit -m "feat(motion): shared reveal engine with hook system, case pages join

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---
### Task 13: Hero boot sequence + status panel boot

**Files:**
- Modify: `js/motion.js` (append), `styles.css` (append), `index.html` (hero classes)

**Convention used from here on:** the reveal engine removes `.reveal`/`.in` ~1.4s after revealing and adds a permanent `.done` class. Hidden states are scoped `.js .reveal ...` (so they vanish with the class), transition targets key on `.in`, and persistent end-states key on `:is(.in, .done)`.

- [ ] **Step 1: index.html hero markup changes**

1a. Remove the `reveal` class from the five hero elements (`.hero-prompt`, `h1`, `.hero-sub`, `.hero-status`, `.hero-cta`); the boot sequence drives them instead. The about card KEEPS `reveal about-card`.

1b. No other markup changes; the `.com` span stays as is.

- [ ] **Step 2: Append hero boot to `js/motion.js`**

```js
/* Hero boot sequence (index only) */
(function () {
  "use strict";
  var m = window.__motion;
  var com = document.querySelector(".hero-prompt .com");
  var hero = document.querySelector(".hero");
  if (!com || !hero || !m) { return; }
  var done = false;
  function finish() {
    if (done) { return; }
    done = true;
    hero.classList.add("hero-booted");
  }
  if (m.ok) {
    m.typeInto(com, "whoami", 60, function () { setTimeout(finish, 150); });
    setTimeout(finish, 1200); /* failsafe */
  } else {
    finish();
  }
})();
```

- [ ] **Step 3: Append boot CSS to `styles.css`**

```css
/* ============================================================
   Hero boot sequence + status panel boot
   ============================================================ */
.hero-prompt .com { display: inline-block; min-width: 6ch; }
.js .hero h1, .js .hero .hero-sub, .js .hero .hero-status, .js .hero .hero-cta {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.js .hero.hero-booted h1 { opacity: 1; transform: none; }
.js .hero.hero-booted .hero-sub { opacity: 1; transform: none; transition-delay: 0.12s; }
.js .hero.hero-booted .hero-status { opacity: 1; transform: none; transition-delay: 0.24s; }
.js .hero.hero-booted .hero-cta { opacity: 1; transform: none; transition-delay: 0.36s; }

/* Status rows print one at a time; same pattern on the about card */
.js .hero-status .hs-row {
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-row { opacity: 1; transform: none; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-row:nth-child(2) { transition-delay: 0.35s; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-row:nth-child(3) { transition-delay: 0.47s; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-row:nth-child(4) { transition-delay: 0.59s; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-row:nth-child(5) { transition-delay: 0.71s; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-row:nth-child(6) { transition-delay: 0.83s; }

/* [ok] flash per key, then gone */
.js .hs-key::after { content: " [ok]"; color: var(--accent); opacity: 0; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-key::after {
  animation: okflash 0.9s ease forwards;
}
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-row:nth-child(2) .hs-key::after { animation-delay: 0.5s; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-row:nth-child(3) .hs-key::after { animation-delay: 0.62s; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-row:nth-child(4) .hs-key::after { animation-delay: 0.74s; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-row:nth-child(5) .hs-key::after { animation-delay: 0.86s; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hs-row:nth-child(6) .hs-key::after { animation-delay: 0.98s; }
@keyframes okflash { 0% { opacity: 0; } 25% { opacity: 1; } 70% { opacity: 1; } 100% { opacity: 0; } }

/* Traffic-light dots pop */
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hero-status-head .dots span { animation: dotpop 0.3s ease backwards; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hero-status-head .dots span:nth-child(2) { animation-delay: 0.08s; }
.js :is(.hero.hero-booted, .about-card.in, .about-card.done) .hero-status-head .dots span:nth-child(3) { animation-delay: 0.16s; }
@keyframes dotpop { from { transform: scale(0); } }
```

- [ ] **Step 4: Verify and commit**

```bash
node --check js/motion.js
git add js/motion.js styles.css index.html
git commit -m "feat(motion): hero typed boot, status panel print sequence

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 14: Scroll moments (counters, markers, principles, pipeline, testimonials, keyword sweep)

**Files:**
- Modify: `index.html` (counter spans, stagger attributes, pipeline classes)
- Modify: `js/motion.js` (append hooks), `styles.css` (append)

- [ ] **Step 1: index.html markup changes**

1a. Shipping log counters: wrap the two countable numbers (the third stat is a range and just reveals):

```html
        <div class="num"><span class="cnt" data-count="48">48</span><span class="unit">hr</span></div>
```

```html
        <div class="num"><span class="cnt" data-count="30">30</span><span class="unit">d</span></div>
```

1b. Stagger grids: on `.principles`, `.work-grid`, `.personal-grid`, and `.offers` set `class="... reveal" data-stagger="80"` on the PARENT and remove `reveal` from each child card (`.principle` x4, `.card` x4, `.p-card` x3; offers already use the parent pattern from Task 8).

1c. Pipeline: add `reveal` to the `.pipeline` div, remove `reveal` from the four `.step` divs.

- [ ] **Step 2: Append hooks to `js/motion.js`**

```js
/* Scroll moments: counters, marker typing, pipeline run */
(function () {
  "use strict";
  var m = window.__motion;
  if (!m) { return; }

  function count(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (!m.ok) { el.textContent = String(target); return; }
    var t0 = null;
    var DUR = 700;
    function frame(ts) {
      if (!t0) { t0 = ts; }
      var p = Math.min((ts - t0) / DUR, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) { requestAnimationFrame(frame); }
    }
    requestAnimationFrame(frame);
  }

  m.hook(".shiplog", function (el) {
    el.querySelectorAll(".cnt[data-count]").forEach(count);
    var file = el.querySelector(".shiplog-head span:first-child");
    if (file) { m.typeInto(file, file.textContent, 45); }
  });

  m.hook(".section-marker", function (el) {
    var tag = el.querySelector(".sm-tag");
    if (tag) { m.typeInto(tag, tag.textContent, 35); }
  });

  m.hook(".pipeline", function (el) { el.classList.add("run"); });
})();
```

- [ ] **Step 3: Append CSS to `styles.css`**

```css
/* ============================================================
   Scroll moments
   ============================================================ */
.ship-stat .num { font-variant-numeric: tabular-nums; }

/* Section markers: rule draws, meta fades (tag typing is JS) */
.js .section-marker { border-bottom-color: transparent; position: relative; }
.js .section-marker::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -1px;
  height: 1px;
  background: var(--line);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease-out 0.1s;
}
.js .section-marker:is(.in, .done)::after { transform: scaleX(1); }
.js .section-marker .sm-meta { opacity: 0; transition: opacity 0.4s ease 0.45s; }
.js .section-marker:is(.in, .done) .sm-meta { opacity: 1; }

/* Stagger parents: children inherit hidden state, engine sets per-child delay */
.js .reveal[data-stagger] > * {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.js .reveal[data-stagger].in > * { opacity: 1; transform: none; }

/* Principles: pine spine grows, number flickers */
.js .principle::before { transform: scaleY(0); transform-origin: top; transition: transform 0.5s ease 0.25s; }
.js :is(.principles.in, .principles.done) .principle::before { transform: scaleY(1); }
:is(.principles.in, .principles.done) .principle-num .key { animation: flicker 0.4s steps(2) 0.35s; }
@keyframes flicker { 0% { opacity: 0; } 50% { opacity: 1; } 75% { opacity: 0; } 100% { opacity: 1; } }

/* Pipeline: line draws, steps light in sequence */
.js .pipeline::before { transform: scaleX(0); transform-origin: left; transition: transform 1.1s ease-out 0.1s; }
.pipeline.run::before { transform: scaleX(1); }
.js .pipeline .step { opacity: 0; transform: translateY(10px); transition: opacity 0.45s ease, transform 0.45s ease; }
.pipeline.run .step { opacity: 1; transform: none; animation: step-light 0.7s ease; }
.pipeline.run .step:nth-child(1) { animation-delay: 0.15s; }
.pipeline.run .step:nth-child(2) { transition-delay: 0.25s; animation-delay: 0.4s; }
.pipeline.run .step:nth-child(3) { transition-delay: 0.5s; animation-delay: 0.65s; }
.pipeline.run .step:nth-child(4) { transition-delay: 0.75s; animation-delay: 0.9s; }
@keyframes step-light {
  40% { border-color: var(--accent); box-shadow: 0 0 18px var(--accent-glow); }
  100% { box-shadow: none; }
}

/* Testimonials: terminal cat + downward wipe */
.js .quote-card.reveal .quote-body { clip-path: inset(0 0 100% 0); }
.quote-card.in .quote-body { clip-path: inset(0 0 -2% 0); transition: clip-path 0.5s ease-out 0.15s; }
.js .quote-card .quote-head span:first-child::before {
  content: "$ cat ";
  color: var(--accent);
  opacity: 0;
  transition: opacity 0.3s ease 0.5s;
}
.quote-card:is(.in, .done) .quote-head span:first-child::before { opacity: 1; }
.js .quote-card.reveal .quote-tag { opacity: 0; }
.quote-card.in .quote-tag { opacity: 1; transition: opacity 0.4s ease 0.55s; }

/* Keyword selection sweep */
.js :is(.reveal, .done) .hl {
  background-image: linear-gradient(var(--accent-glow), var(--accent-glow));
  background-repeat: no-repeat;
  background-size: 0% 88%;
  background-position: 0 60%;
  transition: background-size 0.45s ease 0.3s;
}
.js :is(.reveal.in, .done) .hl { background-size: 100% 88%; }
```

- [ ] **Step 4: Verify and commit**

```bash
node --check js/motion.js
grep -c "data-stagger" index.html   # expect 4
grep -c "data-count" index.html     # expect 2
git add index.html js/motion.js styles.css
git commit -m "feat(motion): counters, typed markers, pipeline run, quote wipes, keyword sweep

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 15: Micro-interactions, scrollspy, progress bar, FAQ glide, view transitions

**Files:**
- Modify: `styles.css` (hover/button/FAQ/VT blocks, delete card-disabled rule, replace faq-a block, replace old 880px hero-body rule check)
- Modify: `js/motion.js` (append scrollspy + progress)
- Modify: all 4 `work/*.html` (VT name on nav path span)

- [ ] **Step 1: Hover and button CSS (append to `styles.css`)**

```css
/* ============================================================
   Micro-interactions
   ============================================================ */
.card:hover .slug::after {
  content: "";
  display: inline-block;
  width: 7px; height: 12px;
  background: var(--accent);
  margin-left: 2px;
  animation: blink 1.1s steps(1) infinite;
}
.card-status .dot { position: relative; }
.card:hover .card-status .dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.6;
  animation: ping 0.7s ease-out 1;
}
@keyframes ping { to { transform: scale(2.4); opacity: 0; } }
.card .chip { transition: transform 0.2s ease; }
.card:hover .chip { transform: translateY(-1px); }
.card:hover .chip:nth-child(2) { transition-delay: 30ms; }
.card:hover .chip:nth-child(3) { transition-delay: 60ms; }
.card:hover .chip:nth-child(4) { transition-delay: 90ms; }
.card:hover .chip:nth-child(5) { transition-delay: 120ms; }
.p-card:hover .p-card-head span:first-child::after {
  content: "";
  display: inline-block;
  width: 6px; height: 10px;
  background: var(--accent);
  margin-left: 2px;
  animation: blink 1.1s steps(1) infinite;
}

.btn-primary:hover::before { content: "▸"; }
.btn:active { transform: translateY(0) scale(0.985); transition-duration: 80ms; }
.btn-ghost { transition: transform 0.15s, background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s; }
.btn-ghost:hover { box-shadow: inset 3px 0 0 var(--accent); }

/* Nav scrollspy + progress */
.nav-mid a.active, .nav-mid a.active::before { color: var(--accent); }
.scroll-progress {
  position: absolute;
  left: 0; bottom: -1px;
  height: 2px;
  width: 100%;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
}
```

Also in this step: delete the now-unused `.card-disabled { opacity: 0.85; }` rule, and simplify `.card:not(.card-disabled):hover` to `.card:hover` (the disabled card no longer exists).

- [ ] **Step 2: Replace the FAQ max-height animation**

Replace the existing `.faq-a` and `.faq-item.open .faq-a` rules (the max-height pair) with:

```css
.faq-a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease;
}
.faq-item.open .faq-a { grid-template-rows: 1fr; }
```

And on `.faq-a-inner` add `min-height: 0; overflow: hidden;` to the existing rule. This also fixes the 360px clip bug on long answers.

- [ ] **Step 3: View transitions (append to `styles.css`)**

```css
/* Cross-document view transitions (progressive enhancement) */
@view-transition { navigation: auto; }
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 250ms; }
.card[href="work/influence.html"] .path { view-transition-name: case-influence; }
.card[href="work/influence-v2.html"] .path { view-transition-name: case-influence-v2; }
.card[href="work/feedhack.html"] .path { view-transition-name: case-feedhack; }
.card[href="work/pumpdat.html"] .path { view-transition-name: case-pumpdat; }
@media (prefers-reduced-motion: reduce) {
  @view-transition { navigation: none; }
}
```

On each case page give the nav path span the matching name. This is the ONE permitted inline style (per-page value in shared CSS is impossible without per-page stylesheets); example for influence.html:

```html
      <span class="accent" style="view-transition-name: case-influence">~/work/influence</span>
```

(Names per page: `case-influence`, `case-influence-v2`, `case-feedhack`, `case-pumpdat`.)

- [ ] **Step 4: Scrollspy + progress bar (append to `js/motion.js`)**

```js
/* Nav scrollspy (index) + scroll progress bar (all pages) */
(function () {
  "use strict";
  var path = document.querySelector(".nav-name .accent");
  var links = document.querySelectorAll('.nav-mid a[href^="#"]');
  var sections = document.querySelectorAll("main section[id]");
  if (path && sections.length > 0 && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        var id = e.target.id;
        path.textContent = "~/" + id;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  var nav = document.querySelector(".nav");
  if (nav) {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    nav.appendChild(bar);
    var ticking = false;
    var update = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ")";
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }
})();
```

- [ ] **Step 5: Verify and commit**

```bash
node --check js/motion.js
grep -c "view-transition-name" styles.css   # expect 4
for f in work/*.html; do grep -c "view-transition-name" $f; done   # expect 1 each
grep -n "max-height: 360px" styles.css      # expect no output
git add styles.css js/motion.js work/
git commit -m "feat(motion): hovers, scrollspy, progress bar, faq glide, view transitions

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 16: Case page motion

**Files:**
- Modify: `styles-case.css` (append), all 4 `work/*.html` (stagger attribute)

- [ ] **Step 1: Markup**

On each case page add `data-stagger="60"` to the `.case-meta` div (it already has `reveal` from Task 12).

- [ ] **Step 2: Append to `styles-case.css`**

```css
/* ============================================================
   Case page motion (engine + conventions from js/motion.js)
   ============================================================ */
/* Title stamps in with a stepped wipe */
.js .case-title.reveal { clip-path: inset(0 100% 0 0); transform: none; }
.js .case-title.in { clip-path: inset(0 -2% 0 0); transition: clip-path 0.5s steps(12); }

/* Block filenames wipe in like printed paths */
.js .case-block.reveal .case-block-head .path { clip-path: inset(0 100% 0 0); }
.case-block.in .case-block-head .path { clip-path: inset(0 -2% 0 0); transition: clip-path 0.45s steps(14) 0.1s; }

/* Mark highlight sweeps on reveal */
.case-block p .mark {
  background: none;
  background-image: linear-gradient(rgba(47, 94, 62, 0.10), rgba(47, 94, 62, 0.10));
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.js .case-block.reveal p .mark { background-size: 0% 100%; transition: background-size 0.5s ease 0.4s; }
.case-block:is(.in, .done) p .mark { background-size: 100% 100%; }
```

- [ ] **Step 3: Verify and commit**

```bash
for f in work/*.html; do grep -c "data-stagger" $f; done   # expect 1 each
git add work/ styles-case.css
git commit -m "feat(motion): case page title stamp, meta stagger, path wipes, mark sweep

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 17: Cmd+K command palette (all pages)

**Files:**
- Create: `js/palette.js`
- Modify: `styles.css` (palette styles), `index.html` + all 4 `work/*.html` (script tag + nav kbd chip)

- [ ] **Step 1: Create `js/palette.js`**

```js
/* Cmd+K command palette. Native <dialog>; static entries only; user input
   is used only for filtering, never rendered as HTML. */
(function () {
  "use strict";
  var IS_CASE = location.pathname.indexOf("/work/") !== -1;
  var HOME = IS_CASE ? "../index.html" : "";
  var WORK = IS_CASE ? "" : "work/";
  var ITEMS = [
    { label: "go: about", run: HOME + "#about" },
    { label: "go: services", run: HOME + "#services" },
    { label: "go: work", run: HOME + "#work" },
    { label: "go: process", run: HOME + "#process" },
    { label: "go: testimonials", run: HOME + "#testimonials" },
    { label: "go: faq", run: HOME + "#faq" },
    { label: "case: Influence CRM", run: WORK + "influence.html" },
    { label: "case: Influence v2", run: WORK + "influence-v2.html" },
    { label: "case: FeedHack", run: WORK + "feedhack.html" },
    { label: "case: pumpdat", run: WORK + "pumpdat.html" },
    { label: "do: book discovery call", run: function () {
        if (window.bookCall) { window.bookCall("palette"); }
        else { location.assign("https://calendly.com/rayyanabzal/discovery"); }
      } },
    { label: "do: email rayyanabzal@gmail.com", run: "mailto:rayyanabzal@gmail.com" },
    { label: "do: copy email address", run: function () {
        if (navigator.clipboard) { navigator.clipboard.writeText("rayyanabzal@gmail.com"); }
      } },
    { label: "do: open LinkedIn", run: "https://www.linkedin.com/in/rayyan-a-832a20213" }
  ];

  var dlg = document.createElement("dialog");
  dlg.className = "palette";
  dlg.innerHTML = '<input class="pal-in" type="text" placeholder="type a command..." aria-label="command palette" />' +
    '<ul class="pal-list"></ul>' +
    '<div class="pal-hint">↑↓ navigate · enter run · esc close</div>';
  document.body.appendChild(dlg);
  var input = dlg.querySelector(".pal-in");
  var list = dlg.querySelector(".pal-list");
  var filtered = ITEMS.slice();
  var sel = 0;

  function render() {
    list.textContent = "";
    filtered.forEach(function (item, i) {
      var li = document.createElement("li");
      li.textContent = item.label;
      if (i === sel) { li.className = "sel"; }
      li.addEventListener("click", function () { exec(item); });
      list.appendChild(li);
    });
  }
  function exec(item) {
    dlg.close();
    if (typeof item.run === "function") { item.run(); }
    else { location.assign(item.run); }
  }
  function openPal() {
    input.value = "";
    filtered = ITEMS.slice();
    sel = 0;
    render();
    if (!dlg.open) { dlg.showModal(); }
    input.focus();
  }
  input.addEventListener("input", function () {
    var q = input.value.toLowerCase();
    filtered = ITEMS.filter(function (it) { return it.label.toLowerCase().indexOf(q) !== -1; });
    sel = 0;
    render();
  });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(sel + 1, filtered.length - 1); render(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, 0); render(); }
    else if (e.key === "Enter" && filtered[sel]) { e.preventDefault(); exec(filtered[sel]); }
  });
  document.addEventListener("keydown", function (e) {
    var el = document.activeElement;
    var typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA");
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPal(); }
    else if (e.key === "/" && !typing && !dlg.open) { e.preventDefault(); openPal(); }
  });
  document.querySelectorAll(".nav-kbd").forEach(function (el) {
    el.addEventListener("click", openPal);
  });
})();
```

- [ ] **Step 2: Palette CSS (append to `styles.css`)**

```css
/* ============================================================
   Command palette
   ============================================================ */
.palette {
  width: min(520px, calc(100vw - 40px));
  border: 1px solid var(--line-strong);
  border-radius: var(--r);
  background: var(--panel);
  color: var(--ink);
  padding: 0;
  margin: 12vh auto auto;
  font-family: var(--font-mono);
}
.palette::backdrop { background: rgba(29, 42, 35, 0.25); backdrop-filter: blur(2px); }
.pal-in {
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--line);
  background: var(--panel-2);
  padding: 14px 16px;
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
  outline: none;
  box-sizing: border-box;
}
.pal-list { list-style: none; margin: 0; padding: 6px 0; max-height: 320px; overflow-y: auto; }
.pal-list li { padding: 8px 16px; font-size: 13px; color: var(--ink-2); cursor: pointer; }
.pal-list li::before { content: "  "; white-space: pre; }
.pal-list li.sel::before { content: "> "; color: var(--accent); }
.pal-list li.sel, .pal-list li:hover { background: var(--panel-2); color: var(--ink); }
.pal-hint { padding: 8px 16px; border-top: 1px solid var(--line); font-size: 11px; color: var(--ink-3); }

.nav-kbd {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ink-3);
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--r-sm);
  padding: 4px 8px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}
.nav-kbd:hover { color: var(--accent); border-color: var(--accent); }
@media (max-width: 920px) { .nav-kbd { display: none; } }
```

- [ ] **Step 3: Wire into pages**

3a. Script tag next to the other defer scripts: `<script defer src="js/palette.js"></script>` on index, `<script defer src="../js/palette.js"></script>` on the 4 case pages.

3b. In each page's `.nav-right`, before the book CTA:

```html
      <button class="nav-kbd" type="button" aria-label="open command palette">⌘K</button>
```

- [ ] **Step 4: Verify and commit**

```bash
node --check js/palette.js
grep -c "nav-kbd" index.html   # expect 1
git add js/palette.js styles.css index.html work/
git commit -m "feat(interactive): cmd+k command palette on all pages

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 18: Guest terminal (index, contact section)

**Files:**
- Create: `js/terminal.js`
- Modify: `index.html` (terminal markup + script), `styles.css` (terminal styles)

- [ ] **Step 1: Markup in the contact section, after `.contact-actions`**

```html
  <div class="term reveal" id="guest-terminal">
    <div class="hero-status-head">
      <span class="dots"><span></span><span></span><span></span></span>
      <span class="file">guest@rayyanabzal.com</span>
    </div>
    <div class="term-out" aria-live="polite"></div>
    <div class="term-chips">
      <button class="term-chip" type="button" data-cmd="./book_call">./book_call</button>
      <button class="term-chip" type="button" data-cmd="./show_work">./show_work</button>
      <button class="term-chip" type="button" data-cmd="./help">./help</button>
    </div>
    <div class="term-line">
      <span class="term-ps">guest@rayyanabzal.com:~$</span>
      <input class="term-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="terminal input" />
    </div>
  </div>
```

Add `<script defer src="js/terminal.js"></script>` next to the other defer scripts (index only).

- [ ] **Step 2: Create `js/terminal.js`**

```js
/* Guest terminal in the contact section (index only). Every command resolves
   to a real site action; user input is echoed via textContent, never HTML. */
(function () {
  "use strict";
  var root = document.getElementById("guest-terminal");
  if (!root) { return; }
  var out = root.querySelector(".term-out");
  var input = root.querySelector(".term-in");
  var MAX_LINES = 30;

  function line(text, cls) {
    var div = document.createElement("div");
    div.className = "tl" + (cls ? " " + cls : "");
    div.textContent = text;
    out.appendChild(div);
    while (out.children.length > MAX_LINES) { out.removeChild(out.firstChild); }
    out.scrollTop = out.scrollHeight;
  }
  function linkLine(label, href) {
    var div = document.createElement("div");
    div.className = "tl";
    var a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    div.appendChild(a);
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  var FILES = {
    "status.json": ["current: open for next build", "engagement: 1-8wk, fixed scope, proposal in 48h", "location: Auckland, NZ (clients worldwide)"],
    "stack.txt": ["typescript · node.js · python", "next.js · supabase · vercel", "anthropic api · telegram · discord"],
    "principles.md": ["01 replace, don't add", "02 problem first", "03 build for the team", "04 measure in hours saved"]
  };

  var CMDS = {
    help: function () {
      line("commands:", "dim");
      [
        "work        list shipped case studies",
        "stack       what I build with",
        "principles  how I think",
        "book        open the booking calendar",
        "contact     email + linkedin",
        "whoami      who you are talking to",
        "ls          list files",
        "cat <file>  read a file",
        "clear       wipe the screen"
      ].forEach(function (l) { line("  " + l); });
    },
    work: function () {
      linkLine("~/work/influence       crm platform · shipped", "work/influence.html");
      linkLine("~/work/influence-v2    roster dashboard · shipped", "work/influence-v2.html");
      linkLine("~/work/feedhack        discord automation · shipped", "work/feedhack.html");
      linkLine("~/work/pumpdat         token launchpad · shipped", "work/pumpdat.html");
    },
    stack: function () { FILES["stack.txt"].forEach(function (l) { line(l); }); },
    principles: function () { FILES["principles.md"].forEach(function (l) { line(l); }); },
    whoami: function () { line("guest. but this site belongs to Rayyan Abzal, AI consultant in Auckland, New Zealand."); },
    contact: function () {
      linkLine("rayyanabzal@gmail.com", "mailto:rayyanabzal@gmail.com");
      linkLine("linkedin.com/in/rayyan-a", "https://www.linkedin.com/in/rayyan-a-832a20213");
    },
    book: function () {
      line("opening calendar...", "ok");
      if (window.bookCall) { window.bookCall("terminal"); }
    },
    ls: function () { line("work/  status.json  stack.txt  principles.md"); },
    clear: function () { out.textContent = ""; },
    sudo: function (arg) {
      if (arg === "hire-rayyan") {
        line("permission granted. opening calendar...", "ok");
        if (window.bookCall) { window.bookCall("terminal_sudo"); }
      } else {
        line("sudo: a free discovery call requires no privileges. try: book");
      }
    },
    cat: function (arg) {
      if (FILES[arg]) { FILES[arg].forEach(function (l) { line(l); }); }
      else { line("cat: " + (arg || "") + ": No such file or directory", "err"); }
    }
  };
  CMDS["./book_call"] = CMDS.book;
  CMDS["./show_work"] = CMDS.work;
  CMDS["./help"] = CMDS.help;

  var history = [];
  var hi = 0;
  function run(raw) {
    var s = raw.trim();
    if (!s) { return; }
    line("guest@rayyanabzal.com:~$ " + s, "echo");
    history.push(s);
    hi = history.length;
    var parts = s.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    if (cmd === "rm") { line("nice try."); return; }
    var fn = CMDS[cmd];
    if (fn) { fn(parts.slice(1).join(" ")); }
    else { line(cmd + ": command not found. try: help", "err"); }
  }

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { run(input.value); input.value = ""; }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (hi > 0) { hi -= 1; input.value = history[hi] || ""; } }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (hi < history.length) { hi += 1; input.value = history[hi] || ""; } }
  });
  root.addEventListener("click", function (e) {
    if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON" && e.target.tagName !== "INPUT") { input.focus(); }
  });
  root.querySelectorAll(".term-chip").forEach(function (btn) {
    btn.addEventListener("click", function () { run(btn.getAttribute("data-cmd")); });
  });
  line("welcome. type help, or tap a command below.", "dim");
})();
```

- [ ] **Step 3: Terminal CSS (append to `styles.css`)**

```css
/* ============================================================
   Guest terminal
   ============================================================ */
.term {
  max-width: 720px;
  margin: 56px auto 0;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--r);
  overflow: hidden;
  text-align: left;
  font-family: var(--font-mono);
  font-size: 13px;
}
.term-out { padding: 16px 18px 4px; min-height: 72px; max-height: 280px; overflow-y: auto; }
.term-out .tl { color: var(--ink-2); line-height: 1.7; white-space: pre-wrap; word-break: break-word; }
.term-out .tl.echo { color: var(--ink); }
.term-out .tl.dim { color: var(--ink-3); }
.term-out .tl.ok { color: var(--accent); }
.term-out .tl.err { color: var(--warn); }
.term-out .tl a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
.term-chips { display: flex; gap: 8px; padding: 10px 18px; flex-wrap: wrap; }
.term-chip {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: var(--r-sm);
  padding: 5px 10px;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.15s;
}
.term-chip:hover { border-color: var(--accent); transform: translateY(-1px); }
.term-line { display: flex; align-items: center; gap: 8px; padding: 12px 18px 16px; border-top: 1px dashed var(--line); }
.term-ps { color: var(--accent); white-space: nowrap; }
.term-in {
  flex: 1;
  border: none;
  background: transparent;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink);
  outline: none;
  caret-color: var(--accent);
}
```

- [ ] **Step 4: Verify and commit**

```bash
node --check js/terminal.js
wc -l index.html   # expect < 800
git add js/terminal.js index.html styles.css
git commit -m "feat(interactive): guest terminal with conversion-bound commands

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 19: Docs, CLAUDE.md, client permission messages

**Files:**
- Modify: `CLAUDE.md` (project)
- Create: `docs/clients/testimonial-permission-messages.md` (docs/ is vercelignored, never deployed)

- [ ] **Step 1: Update project `CLAUDE.md`**

1a. Files block: add `js/motion.js`, `js/site.js`, `js/palette.js`, `js/terminal.js`, `sitemap.xml`, `robots.txt`, `404.html`, `.vercelignore`, `docs/` with one-line descriptions matching the existing table style.

1b. Open section: replace current items with:

```markdown
## Open

- Google Business Profile: create (service-area business, Auckland), link site, collect client reviews there. Biggest "AI consultant Auckland" lever.
- Verify Vercel Analytics custom events (book_click) appear on the hobby plan; if not, note plan limitation and keep pageview funnels.
- Testimonial attribution: permission messages sent (see docs/clients/testimonial-permission-messages.md); swap real names in when clients approve.
- OG preview: re-check LinkedIn Post Inspector after deploy (case pages now have full OG sets).
```

- [ ] **Step 2: Create `docs/clients/testimonial-permission-messages.md`**

```markdown
# Testimonial permission messages (forwardable)

## To the Influence agency director

Hey [name], quick favour. I'm refreshing my portfolio site and your testimonial
is on it, currently shown anonymously as "Agency Director, Malta". Would you be
comfortable with me adding your first name and company name to it? Happy to send
a preview of exactly how it looks before it goes live. If you'd rather keep it
anonymous, that's completely fine too.

## To the pumpdat founder

Hey [name], quick favour. I'm refreshing my portfolio site and your testimonial
is on it, currently shown anonymously as "Founder, pumpdat". Would you be
comfortable with me adding your first name (and a LinkedIn link if you're up for
it)? Happy to send a preview before it goes live. If you'd rather stay
anonymous, no problem at all.
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md docs/clients/testimonial-permission-messages.md
git commit -m "docs: update project file map, open items, permission message drafts

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 20: QA gate, merge, deploy, post-deploy verification

No commit until every check passes. SRI note: Calendly widget.js and Google Fonts CSS are dynamic third-party assets without stable hashes; SRI is deliberately not added (it would break on every upstream update). All first-party JS is same-origin.

- [ ] **Step 1: Static checks**

```bash
for f in js/*.js; do node --check $f; done
for f in index.html 404.html work/*.html; do echo "$f: $(wc -l < $f)"; done    # all < 800
python3 - <<'EOF'
import re, json, glob
for f in ['index.html'] + glob.glob('work/*.html'):
    for b in re.findall(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', open(f).read(), re.S):
        json.loads(b)
print("all JSON-LD valid")
EOF
grep -rn "style=" index.html work/*.html | grep -v "view-transition-name"   # expect no output
grep -rn "Rayyan Consulting</strong>" index.html work/*.html                # expect no output
grep -c "bookCall" index.html                                               # expect >= 8
```

- [ ] **Step 2: Local serve + page checks**

```bash
python3 -m http.server 8899 --directory . &
sleep 1
for p in "" "work/influence.html" "work/influence-v2.html" "work/feedhack.html" "work/pumpdat.html" "404.html"; do
  echo "== /$p"; curl -s "http://localhost:8899/$p" | grep -c "og:title"
done
kill %1
```

Expected: 1 per page (404.html prints 0, acceptable).

- [ ] **Step 3: Manual browser pass (use the browser-qa skill if available)**

- Normal load: hero types `whoami` then headline boots; status panel prints rows; counters count; markers type; pipeline draws; quotes wipe; card hovers show cursor + ping; Cmd+K opens palette; `/` opens palette; terminal runs `help`, `work`, `book`, `sudo hire-rayyan`; sticky bar appears on mobile width after work and hides at contact; FAQ glides open past 360px content.
- `prefers-reduced-motion: reduce` (macOS: System Settings, Accessibility, Display, Reduce motion): every page fully visible instantly, no typing, no counters, FAQ still opens.
- JS disabled: every page fully readable, Calendly links navigate to calendly.com, FAQ buttons inert (acceptable), no hidden content.
- Keyboard only: tab through nav, cards, FAQ, palette; focus ring visible everywhere; palette traps focus while open; Esc closes.
- 390px width: hero CTA above status card, sticky bar works, no horizontal scroll.
- Check the browser console on every page: zero errors.

- [ ] **Step 4: Lighthouse compare**

```bash
python3 -m http.server 8899 --directory . &
npx --yes lighthouse http://localhost:8899 --quiet --chrome-flags="--headless" --only-categories=performance,seo,accessibility --output=json --output-path=/tmp/lh-after.json
python3 -c "import json; d=json.load(open('/tmp/lh-after.json')); print({k: v['score'] for k, v in d['categories'].items()})"
kill %1
```

Compare against the Task 1 baseline. Performance and SEO must not be worse; accessibility should improve (contrast + focus + aria fixes). Investigate any regression before merging.

- [ ] **Step 5: Merge and deploy**

```bash
git status --short && git log --oneline -3      # re-snapshot before merging
git checkout main
git merge feat/showcase-redesign
git push origin main
```

- [ ] **Step 6: Post-deploy verification (~2 min after push)**

```bash
sleep 120
curl -s -o /dev/null -w "CLAUDE.md: %{http_code}\n" https://rayyanabzal.com/CLAUDE.md          # 404
curl -s -o /dev/null -w "sitemap: %{http_code}\n" https://rayyanabzal.com/sitemap.xml          # 200
curl -s -o /dev/null -w "robots: %{http_code}\n" https://rayyanabzal.com/robots.txt            # 200
curl -s -o /dev/null -w "junk url: %{http_code}\n" https://rayyanabzal.com/does-not-exist      # 404
curl -s https://rayyanabzal.com/ | grep -c "Auckland NZ | Rayyan Abzal"                        # >= 1
curl -s https://rayyanabzal.com/work/influence.html | grep -c "og:title"                       # 1
```

Then (manual, report results to Ray):
- Google Rich Results Test on `https://rayyanabzal.com/` and one case page.
- LinkedIn Post Inspector on `https://rayyanabzal.com/work/influence.html`.
- Submit `sitemap.xml` in Google Search Console (Ray's account; flag if no GSC property exists yet).
- Check Vercel Analytics for `book_click` events after a test click; note plan limitation if absent.

- [ ] **Step 7: Wrap up**

Run the `retro` skill notes if corrections occurred during execution; update `WORKLOG.md` with final state.
