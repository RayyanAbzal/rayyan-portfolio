import Link from "next/link";
import { Fragment, type ComponentType, type ReactNode } from "react";

import "@/app/styles/refs/refined.css";
import "@/app/styles/refs/refined-pages.css";
import { BookLink } from "@/components/book-link";
import { RefinedFx } from "@/components/refs/refined-client";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import {
  AriaSchematic,
  FiosSchematic,
  JobFinderSchematic,
} from "@/components/schematics/personal-schematics";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { CLIENT_DEMOS, PERSONAL_DEMOS } from "@/components/stageshow/demos/registry";
import { HOME } from "@/content/home";
import { CLIENT_PROJECTS } from "@/content/projects";
import type { Rich } from "@/content/rich";
import type { BookingSource, CaseSlug } from "@/lib/book";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

import { ReplayFrame } from "./refined-replay";

export const BASE = "/designs/refined";

/** Maps a live-site href to the matching page of this direction. */
export function toDirection(href: string): string {
  if (href === "/work") return `${BASE}/projects`;
  if (href.startsWith("/work/")) return `${BASE}/case/${href.slice("/work/".length)}`;
  if (href === "/about" || href === "/contact") return `${BASE}${href}`;
  return href;
}

export function plain(rich: Rich): string {
  return rich
    .map((part) => {
      if (typeof part === "string") return part;
      if ("mark" in part) return part.mark;
      if ("hi" in part) return part.hi;
      if ("strong" in part) return part.strong;
      if ("nowrap" in part) return part.nowrap;
      return part.link;
    })
    .join("");
}

/** Inline copy runs: highlight and mark become soft green, links stay in this direction. */
export function RefinedRich({ value }: { value: Rich }) {
  return (
    <>
      {value.map((part, i) => {
        if (typeof part === "string") return <Fragment key={i}>{part}</Fragment>;
        if ("hi" in part) return <em key={i} className="rf-hi">{part.hi}</em>;
        if ("mark" in part) return <mark key={i} className="rf-mark">{part.mark}</mark>;
        if ("nowrap" in part) return <span key={i} className="rf-nowrap">{part.nowrap}</span>;
        if ("strong" in part) return <strong key={i}>{part.strong}</strong>;
        return part.href.startsWith("/") ? (
          <Link key={i} href={toDirection(part.href)} className="rf-inline">{part.link}</Link>
        ) : (
          <a key={i} href={part.href} className="rf-inline" target="_blank" rel="noopener noreferrer">{part.link}</a>
        );
      })}
    </>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8h9M8.5 4l4 4-4 4" />
    </svg>
  );
}

export function SectionHead({
  id,
  title,
  count,
  href,
  hrefLabel,
}: {
  id: string;
  title: string;
  count?: number;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="rf-head">
      <h2 id={id}>
        {title}
        {count !== undefined ? <sup aria-label={`${count} items`}>({count})</sup> : null}
      </h2>
      <span className="rf-rule" aria-hidden="true" />
      {href && hrefLabel ? (
        <Link href={href} className="rf-see">
          {hrefLabel}
        </Link>
      ) : null}
    </div>
  );
}

const NAV: readonly { href: string; label: string; key: string }[] = [
  { href: `${BASE}/projects`, label: "Projects", key: "projects" },
  { href: `${BASE}/about`, label: "About", key: "about" },
  { href: `${BASE}/contact`, label: "Contact", key: "contact" },
];

export function RefinedNav({ current }: { current?: string }) {
  return (
    <header className="rf-nav-wrap">
      <nav className="rf-nav" aria-label="Main">
        <Link href={BASE} className="rf-name" aria-current={current === "home" ? "page" : undefined}>
          Rayyan Abzal
        </Link>
        <ul>
          {NAV.map((n) => (
            <li key={n.key}>
              <Link href={n.href} aria-current={current === n.key ? "page" : undefined}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <BookLink source="design_preview" className="rf-nav-book">
          Book a call
        </BookLink>
      </nav>
    </header>
  );
}

export function RefinedFooter() {
  const ctaTitle = plain(HOME.ctaTitle);
  const cut = ctaTitle.indexOf(" ", ctaTitle.indexOf(" ") + 1);
  return (
    <footer className="rf-foot">
      <p className="rf-sign" aria-hidden="true">
        <span className="rf-dim">{ctaTitle.slice(0, cut)}</span>
        <span>{ctaTitle.slice(cut + 1)}</span>
      </p>
      <div className="rf-social">
        <a href={LINKEDIN_URL} aria-label="LinkedIn" rel="noopener noreferrer" target="_blank">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M5.2 8.6H2.1V21h3.1V8.6zM3.6 3a1.8 1.8 0 100 3.6A1.8 1.8 0 003.6 3zM21.9 14.2c0-3.7-2-5.8-4.8-5.8-1.5 0-2.6.8-3.1 1.7V8.6H11V21h3.1v-6.6c0-1.7.9-2.9 2.4-2.9s2 1.2 2 2.9V21h3.1l.3-6.8z" /></svg>
        </a>
        <a href={`mailto:${EMAIL}`} aria-label="Email">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M4 7l8 6 8-6" /></svg>
        </a>
      </div>
      <div className="rf-cols">
        <nav aria-label="Pages">
          <h2>Pages</h2>
          <ul>
            <li><Link href={BASE}>Home</Link></li>
            {NAV.map((n) => (
              <li key={n.key}><Link href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Work">
          <h2>Work</h2>
          <ul>
            {CLIENT_PROJECTS.map((p) => (
              <li key={p.slug}><Link href={`${BASE}/case/${p.slug}`}>{p.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Elsewhere">
          <h2>Elsewhere</h2>
          <ul>
            <li><a href={LINKEDIN_URL} rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
            <li><a href={`mailto:${EMAIL}`}>Email</a></li>
            <li><Link href="/harness">How I build</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
          </ul>
        </nav>
      </div>
      <div className="rf-bottom">
        <span>&copy; 2026 Rayyan Abzal</span>
        <span>Auckland, New Zealand</span>
      </div>
    </footer>
  );
}

/** Page shell: floating nav, one column, sign-off footer. */
export function RefinedShell({
  current,
  wide,
  children,
}: {
  current?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <main id="top" className="ref-root ref-refined">
      <RefinedFx />
      <RefinedNav current={current} />
      <div className={wide ? "rf-col rf-wide" : "rf-col"}>{children}</div>
      <RefinedFooter />
    </main>
  );
}

/** Page opening: dim first line, bright second, like the home hero. */
export function PageHero({
  lead,
  tail,
  children,
  eyebrow,
}: {
  lead: string;
  tail: string;
  children?: ReactNode;
  eyebrow?: ReactNode;
}) {
  return (
    <section className="rf-hero rf-page-hero" aria-labelledby="rf-h1">
      {eyebrow}
      <h1 id="rf-h1">
        <span className="rf-dim">{lead}</span>
        <span>{tail}</span>
      </h1>
      {children}
    </section>
  );
}

/** One closing band per page: a card with the ask and the single primary button. */
export function RefinedCta({
  title,
  body,
  button,
  source = "design_preview",
}: {
  title: string;
  body: string;
  button: string;
  source?: BookingSource;
}) {
  return (
    <section className="rf-sec" aria-labelledby="rf-cta">
      <div className="rf-cta-card">
        <span className="rf-badge">Work together</span>
        <h2 id="rf-cta">{title}</h2>
        <p>{body}</p>
        <BookLink source={source} className="rf-btn rf-glow">
          {button}
        </BookLink>
      </div>
    </section>
  );
}

const CLIENT_SCHEMATICS: Record<CaseSlug, () => ReactNode> = {
  influence: () => <InfluenceSchematic />,
  feedhack: () => <FeedhackSchematic />,
  pumpdat: () => <PumpdatSchematic />,
  "influence-v2": () => <InfluenceV2Schematic />,
};

const PERSONAL_SCHEMATICS: Record<string, () => ReactNode> = {
  FIOS: () => <FiosSchematic />,
  ARIA: () => <AriaSchematic />,
  "NZ Job Finder": () => <JobFinderSchematic />,
};

function Visual({
  Demo,
  schematic,
  interactive,
}: {
  Demo?: ComponentType;
  schematic: (() => ReactNode) | undefined;
  interactive: boolean;
}) {
  const hidden = interactive ? {} : { "aria-hidden": true as const, inert: true };
  if (Demo) {
    const demo = (
      <div className="rf-demo" {...hidden}>
        <Demo />
      </div>
    );
    return interactive ? <ReplayFrame>{demo}</ReplayFrame> : demo;
  }
  return (
    <div className="rf-stage card-visual" {...hidden}>
      <div className="vis-frame">{schematic?.()}</div>
    </div>
  );
}

/** Live demo for a client build, else its schematic. */
export function ClientVisual({ slug, interactive = false }: { slug: CaseSlug; interactive?: boolean }) {
  return <Visual Demo={CLIENT_DEMOS[slug]} schematic={CLIENT_SCHEMATICS[slug]} interactive={interactive} />;
}

export function PersonalVisual({ title }: { title: string }) {
  return <Visual Demo={PERSONAL_DEMOS[title]} schematic={PERSONAL_SCHEMATICS[title]} interactive={false} />;
}
