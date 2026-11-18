import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DESIGN_REFS } from "@/content/designs";
import "./board.css";

// TEMPORARY: one board with the design system the site runs on, live previews of
// every page and the seven reference directions, for Ray to judge. Noindex.

export const metadata: Metadata = {
  title: "Design board | Rayyan Abzal",
  robots: { index: false, follow: false },
};

interface Swatch {
  name: string;
  token: string;
  light: string;
  dark: string;
  use: string;
  contrast?: string;
}

const SWATCHES: Swatch[] = [
  { name: "Ground", token: "--bg", light: "0.988 0 0", dark: "0.17 0 0", use: "Page background" },
  { name: "Surface", token: "--surface", light: "1 0 0", dark: "0.21 0 0", use: "Cards and blocks, on a 1px hairline" },
  { name: "Sunken", token: "--sunken", light: "0.965 0 0", dark: "0.235 0 0", use: "Bed behind schematics, toggle track, chips" },
  { name: "Ink", token: "--ink", light: "0.2 0 0", dark: "0.95 0 0", use: "Headings, body, filled buttons", contrast: "17.5 / 16.5 on ground" },
  { name: "Ink 2", token: "--ink-2", light: "0.47 0 0", dark: "0.74 0 0", use: "Lede and secondary text", contrast: "6.6 / 8.3" },
  { name: "Ink 3", token: "--ink-3", light: "0.53 0 0", dark: "0.66 0 0", use: "Smallest text, captions", contrast: "5.1 / 6.1" },
  { name: "Panel", token: "--panel", light: "0.2 0 0", dark: "0.25 0 0", use: "Principles and closing bands, dark in both", contrast: "17.3 / 13.8 with its text" },
  { name: "Tint", token: "--tint", light: "0.93 0.06 150", dark: "0.36 0.07 150", use: "Selected row or part", contrast: "8.0 / 7.1 with tint ink" },
  { name: "Live", token: "--live", light: "0.62 0.15 150", dark: "0.62 0.15 150", use: "Live dots only, never text", contrast: "3.3, a graphic, not text" },
  { name: "Soft green", token: "--gold", light: "0.86 0.1 150", dark: "0.86 0.1 150", use: "The one highlighter mark per page" },
  { name: "Focus", token: "--focus", light: "0.55 0.15 250", dark: "0.7 0.13 250", use: "Focus ring only", contrast: "4.7 / 7.2" },
];

const TYPE = [
  { label: "Display, 600, tracking -3.5%", cls: "bd-t-display", text: "Discord clip payouts on autopilot" },
  { label: "Section title, 600, tracking -3%", cls: "bd-t-h2", text: "Client work" },
  { label: "Card title, 600", cls: "bd-t-h3", text: "Discord clip payouts on autopilot" },
  { label: "Lede, 400, ink 2", cls: "lede", text: "Lede sample: secondary text sits here at a readable measure, never wider than 58 characters per line." },
  { label: "Body, 17px / 1.55", cls: "bd-t-body", text: "Plain words, outcome first. One idea per sentence, no jargon a client would have to look up." },
  { label: "Small, 13px, ink 3", cls: "bd-t-small", text: "Caption sample for small supporting text." },
];

const PAGES = [
  { href: "/", name: "Home" },
  { href: "/work", name: "Projects" },
  { href: "/work/feedhack", name: "Case study" },
  { href: "/about", name: "About" },
  { href: "/harness", name: "How I build" },
  { href: "/contact", name: "Contact" },
];

const MOTION = [
  "Every animation sits inside prefers-reduced-motion: no-preference. Reduced motion and no-JS get the full static page.",
  "Only opacity, transform and filter animate, named one by one, never all.",
  "Entrances 300ms on cubic-bezier(0.2, 0, 0, 1). Hover feedback 150ms or less. Press scale 0.97.",
  "Section titles sharpen from a 6px blur the first time they are 15% on screen.",
  "Home: the harness drawing springs apart, work rows explode into plates on hover, offers play one short scene each.",
];

function Frame({ href, name, scale }: { href: string; name: string; scale: "page" | "thumb" }) {
  return (
    <figure className={`bd-frame bd-frame-${scale}`}>
      <div className="bd-viewport">
        <iframe src={href} title={`${name} preview`} loading="lazy" tabIndex={-1} aria-hidden="true" />
      </div>
      <figcaption>
        <Link href={href} className="link">{name}</Link>
      </figcaption>
    </figure>
  );
}

export default function DesignBoard() {
  return (
    <main id="top" className="wrap section bd">
      <header className="bd-head">
        <h1 className="display bd-t-display">Design board</h1>
        <p className="lede">
          The system the new site runs on, every page live, and the seven reference directions side by side.
        </p>
        <nav className="bd-toc" aria-label="On this board">
          <a href="#direction">Direction</a>
          <a href="#colour">Colour</a>
          <a href="#type">Type</a>
          <a href="#components">Components</a>
          <a href="#motion">Motion</a>
          <a href="#pages">Pages</a>
          <a href="#directions">Seven directions</a>
          <a href="#demos">Product demos</a>
        </nav>
      </header>

      <section id="direction" className="bd-sec">
        <h2>Direction: a quiet room with one loud sentence</h2>
        <div className="bd-pick">
          <div>
            <p className="bd-kicker">Recommended</p>
            <p>
              Near-white ground, white surfaces on a hairline, zero-chroma greys in light and dark. One green hue
              for live and selected, blue only for focus. Open Runde throughout, set tight and heavy for headlines.
              The home is where the work moves: the harness drawing, the exploded work stack, offers that play a
              short scene. Every other page stays calm and readable.
            </p>
          </div>
          <div>
            <p className="bd-kicker">Why</p>
            <p>
              Visitors are founders and operators, mostly non-technical, deciding whether to book a call. A calm page reads as competent;
              the moving pieces on the home prove I build working systems without showing client screens.
            </p>
            <p className="bd-kicker">Flip to a darker direction if</p>
            <p>You want the site to feel like a product launch rather than a consultancy. Refined and Synapse below show that version.</p>
          </div>
        </div>
      </section>

      <section id="colour" className="bd-sec">
        <h2>Colour</h2>
        <p className="bd-note">Swatches render the live tokens, so they flip with your system theme. Values are oklch, light then dark. Contrast is WCAG ratio against the ground unless noted.</p>
        <ul className="bd-swatches">
          {SWATCHES.map((s) => (
            <li key={s.token}>
              <span className="bd-chip" style={{ background: `var(${s.token})` }} />
              <strong>{s.name}</strong>
              <span>{s.use}</span>
              <span className="bd-val">{s.light} / {s.dark}</span>
              {s.contrast ? <span className="bd-val">Contrast {s.contrast}</span> : null}
            </li>
          ))}
        </ul>
      </section>

      <section id="type" className="bd-sec">
        <h2>Type: Open Runde</h2>
        <p className="bd-note">One rounded grotesk at 400, 500, 600 and 700, self-hosted. No serif, no monospace.</p>
        <ul className="bd-type">
          {TYPE.map((t) => (
            <li key={t.label}>
              <span className="bd-val">{t.label}</span>
              <p className={t.cls}>{t.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="components" className="bd-sec">
        <h2>Components</h2>
        <div className="bd-comp">
          <div className="bd-card">
            <span className="bd-val">Buttons, 10px radius</span>
            <div className="bd-row">
              <Button>Book a call</Button>
              <Button variant="outline">See the work</Button>
            </div>
            <div className="bd-panel bd-row">
              <Button variant="gold">Book a call</Button>
            </div>
          </div>
          <div className="bd-card">
            <span className="bd-val">Pill nav</span>
            <div className="bd-pillnav" aria-hidden="true">
              <span>Rayyan Abzal</span>
              <span data-on>Projects</span>
              <span>About</span>
              <span>Book a call</span>
            </div>
            <span className="bd-val">Tags and status</span>
            <div className="bd-row">
              <span className="bd-tag">Automation</span>
              <span className="bd-tag">AI agents</span>
              <span className="bd-status"><i />Open for the next project</span>
            </div>
          </div>
          <div className="bd-card bd-card-wide">
            <span className="bd-val">Project card: outcome first, name above, schematic on a sunken bed</span>
            <div className="bd-proj">
              <div className="bd-proj-vis" aria-hidden="true">
                <span style={{ width: "72%" }} /><span style={{ width: "48%" }} /><span style={{ width: "86%" }} data-on /><span style={{ width: "40%" }} />
              </div>
              <div>
                <p className="bd-t-small">FeedHack</p>
                <p className="bd-t-h3">Discord clip payouts on autopilot</p>
                <p className="bd-t-small">Manual admin hours to zero. About 8 weeks, fully automated.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="motion" className="bd-sec">
        <h2>Motion</h2>
        <ul className="bd-list">
          {MOTION.map((m) => <li key={m}>{m}</li>)}
        </ul>
      </section>

      <section id="pages" className="bd-sec">
        <h2>Every page, live</h2>
        <p className="bd-note">These are the real pages at desktop width, scaled down. Open one for the full thing.</p>
        <div className="bd-grid">
          {PAGES.map((p) => <Frame key={p.href} href={p.href} name={p.name} scale="page" />)}
        </div>
      </section>

      <section id="directions" className="bd-sec">
        <h2>Seven reference directions</h2>
        <p className="bd-note">Each is a full site after one reference, on our copy. Pick one, or keep the direction above.</p>
        <div className="bd-grid">
          {DESIGN_REFS.map((d) => (
            <div key={d.slug} className="bd-dir">
              <Frame href={`/designs/${d.slug}`} name={d.name} scale="thumb" />
              <p className="bd-t-small">After {d.credit}. {d.borrows}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="demos" className="bd-sec">
        <h2>Product demos</h2>
        <p className="bd-note">
          Animated product scenes with made-up data, for the project cards and case pages.{" "}
          <Link href="/designs/stageshow" className="link">Open the demos</Link>
        </p>
      </section>
    </main>
  );
}
