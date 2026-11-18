import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { BookLink } from "@/components/book-link";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { AriaSchematic, FiosSchematic, JobFinderSchematic } from "@/components/schematics/personal-schematics";
import { CLIENT_DEMOS, PERSONAL_DEMOS } from "@/components/stageshow/demos/registry";
import { ABOUT } from "@/content/about";
import type { Rich } from "@/content/rich";
import type { CaseSlug } from "@/lib/book";
import { EMAIL, LINKEDIN_URL, SITE_NAME } from "@/lib/site";

import { SynWave } from "../synapse-client";

const BASE = "/designs/synapse";

/** Maps a real-site path to the same page inside this direction. */
export function dirHref(href: string): string {
  if (href === "/work") return `${BASE}/projects`;
  if (href.startsWith("/work/")) return `${BASE}/case/${href.slice("/work/".length)}`;
  if (href === "/about" || href === "/contact") return `${BASE}${href}`;
  return href;
}

export function Mark() {
  return (
    <span className="syn-mark" aria-hidden="true">
      <i />
    </span>
  );
}

/** Inline copy runs (plain, highlight, mark, strong, links) with links kept inside this direction. */
export function SynRich({ value }: { value: Rich }) {
  return (
    <>
      {value.map((part, i) => {
        if (typeof part === "string") return <Fragment key={i}>{part}</Fragment>;
        if ("hi" in part) return <span key={i} className="syn-hi">{part.hi}</span>;
        if ("mark" in part) return <span key={i} className="syn-hi">{part.mark}</span>;
        if ("nowrap" in part) return <span key={i} className="syn-nowrap">{part.nowrap}</span>;
        if ("link" in part) {
          return part.href.startsWith("/") ? (
            <Link key={i} className="syn-link" href={dirHref(part.href)}>{part.link}</Link>
          ) : (
            <a key={i} className="syn-link" href={part.href} target="_blank" rel="noopener noreferrer">{part.link}</a>
          );
        }
        return <strong key={i}>{part.strong}</strong>;
      })}
    </>
  );
}

export function richToPlain(rich: Rich): string {
  return rich
    .map((p) => {
      if (typeof p === "string") return p;
      if ("mark" in p) return p.mark;
      if ("nowrap" in p) return p.nowrap;
      if ("hi" in p) return p.hi;
      if ("strong" in p) return p.strong;
      return p.link;
    })
    .join("");
}

const NAV: readonly { label: string; href: string; key: string }[] = [
  { key: "projects", label: "Projects", href: `${BASE}/projects` },
  { key: "about", label: "About", href: `${BASE}/about` },
  { key: "contact", label: "Contact", href: `${BASE}/contact` },
  { key: "harness", label: "How I build", href: "/harness" },
];

/** Brand, links and the booking pill. Used inside the home hero and every inner-page hero. */
export function SynHeader({ current }: { current?: string }) {
  return (
    <header className="syn-nav">
      <Link href={BASE} className="syn-brand">
        <Mark />
        <span>{SITE_NAME}</span>
      </Link>
      <nav aria-label="Primary" className="syn-nav-links">
        {NAV.map((n) => (
          <Link key={n.key} href={n.href} aria-current={current === n.key ? "page" : undefined}>{n.label}</Link>
        ))}
      </nav>
      <BookLink source="design_preview" className="syn-pill syn-pill-line">
        Book a call <span className="syn-plus-chip" aria-hidden="true">+</span>
      </BookLink>
    </header>
  );
}

export function SynFooter() {
  return (
    <footer className="syn-panel syn-foot">
      <Link href={BASE} className="syn-brand">
        <Mark />
        <span>{SITE_NAME}</span>
      </Link>
      <p className="syn-foot-tag">{ABOUT.role}</p>
      <nav aria-label="Footer" className="syn-foot-links">
        <Link href={`${BASE}/projects`}>Projects</Link>
        <Link href={`${BASE}/about`}>About</Link>
        <Link href={`${BASE}/contact`}>Contact</Link>
        <Link href="/harness">How I build</Link>
        <a href={LINKEDIN_URL} rel="noopener noreferrer">LinkedIn</a>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </nav>
    </footer>
  );
}

interface PageHeroProps {
  current: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  id?: string;
}

/** Dark wave hero of an inner page: nav on top, title and lede at the bottom. */
export function SynPageHero({ current, eyebrow, title, lede, children, id = "syn-page-h1" }: PageHeroProps) {
  return (
    <section className="syn-panel syn-hero syn-page-hero" aria-labelledby={id}>
      <SynWave />
      <SynHeader current={current} />
      <div className="syn-page-hero-body">
        <p className="syn-eyebrow">{eyebrow}</p>
        <h1 id={id} className="syn-page-h">{title}</h1>
        {lede ? <p className="syn-page-lede">{lede}</p> : null}
        {children}
      </div>
    </section>
  );
}

const SCHEMATICS: Record<CaseSlug, () => React.JSX.Element> = {
  influence: InfluenceSchematic,
  feedhack: FeedhackSchematic,
  pumpdat: PumpdatSchematic,
  "influence-v2": InfluenceV2Schematic,
};

const PERSONAL_SCHEMATICS: Record<string, () => React.JSX.Element> = {
  FIOS: FiosSchematic,
  ARIA: AriaSchematic,
  "NZ Job Finder": JobFinderSchematic,
};

type VisualFor = { slug: CaseSlug } | { personal: string };

/** The live demo of a project if the registry has one, else its schematic. */
export function SynVisual(props: VisualFor) {
  if ("slug" in props) {
    const Demo = CLIENT_DEMOS[props.slug];
    if (Demo) return <Demo />;
    const Schematic = SCHEMATICS[props.slug];
    return (
      <div className="card-visual">
        <div className="vis-frame"><Schematic /></div>
      </div>
    );
  }
  const Demo = PERSONAL_DEMOS[props.personal];
  if (Demo) return <Demo />;
  const Schematic = PERSONAL_SCHEMATICS[props.personal];
  return Schematic ? (
    <div className="card-visual">
      <div className="vis-frame"><Schematic /></div>
    </div>
  ) : null;
}

export function hasDemo(props: VisualFor): boolean {
  return "slug" in props ? Boolean(CLIENT_DEMOS[props.slug]) : Boolean(PERSONAL_DEMOS[props.personal]);
}

/** A fixed-ratio box for a card: the visual is inert, hidden from assistive tech and cannot take the pointer. */
export function SynCardVisual(props: VisualFor) {
  return (
    <div className="syn-vis" aria-hidden="true" inert>
      <SynVisual {...props} />
    </div>
  );
}
