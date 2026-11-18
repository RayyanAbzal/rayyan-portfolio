import Link from "next/link";
import type { ReactNode } from "react";

import { BookLink } from "@/components/book-link";
import { Magnetic, RevealRoot, TiltCard } from "@/components/refs/brightman-client";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { AriaSchematic, FiosSchematic, JobFinderSchematic } from "@/components/schematics/personal-schematics";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { CLIENT_DEMOS, PERSONAL_DEMOS } from "@/components/stageshow/demos/registry";
import { DATA_NOTE } from "@/content/home";
import type { Rich } from "@/content/rich";
import type { CaseSlug } from "@/lib/book";
import { EMAIL, LINKEDIN_URL, SITE_NAME } from "@/lib/site";

export const BASE = "/designs/brightman";

export const idx = (n: number) => `[${String(n).padStart(2, "0")}]`;

/** Old-site paths from content/ map to this direction's pages. */
export function localHref(href: string): string {
  if (href === "/work" || href === "/#work") return `${BASE}/projects`;
  if (href.startsWith("/work/")) return `${BASE}/case/${href.slice("/work/".length)}`;
  return href;
}

export function renderRich(parts: Rich): ReactNode[] {
  return parts.map((p, i) => {
    if (typeof p === "string") return p;
    if ("mark" in p) return <span key={i} className="bm-accent">{p.mark}</span>;
    if ("nowrap" in p) return <span key={i} className="bm-nowrap">{p.nowrap}</span>;
    if ("hi" in p) return p.hi;
    if ("strong" in p) return <strong key={i}>{p.strong}</strong>;
    const external = p.href.startsWith("http");
    return external ? (
      <a key={i} href={p.href} className="bm-inline-link" target="_blank" rel="noopener noreferrer">{p.link}</a>
    ) : (
      <Link key={i} href={localHref(p.href)} className="bm-inline-link">{p.link}</Link>
    );
  });
}

export function plainRich(parts: Rich): string {
  return parts
    .map((p) => (typeof p === "string" ? p : "mark" in p ? p.mark : "nowrap" in p ? p.nowrap : "hi" in p ? p.hi : "strong" in p ? p.strong : p.link))
    .join("");
}

const NAV = [
  { href: `${BASE}/projects`, label: "Projects", key: "projects" },
  { href: `${BASE}/about`, label: "About", key: "about" },
  { href: `${BASE}/contact`, label: "Contact", key: "contact" },
] as const;

export type NavKey = (typeof NAV)[number]["key"];

/** Shared header: logo home, three pages, booking button. */
export function BmHeader({ current }: { current?: NavKey }) {
  return (
    <header className="bm-header">
      <Link href={BASE} className="bm-logo" aria-label={`${SITE_NAME}, home`}>
        <span className="bm-logo-dot" aria-hidden="true" />
        {SITE_NAME}
      </Link>
      <nav className="bm-nav" aria-label="Main">
        <ul>
          {NAV.map((n) => (
            <li key={n.key}>
              <Link href={n.href} aria-current={current === n.key ? "page" : undefined}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="bm-header-right">
        <Magnetic strength={0.25}><BookLink source="design_preview" className="bm-btn-sm">Book a call</BookLink></Magnetic>
      </div>
    </header>
  );
}

export function BmFooter() {
  return (
    <footer className="bm-footer">
      <p className="bm-footer-line">
        {SITE_NAME}, <span>AI engineer and consultant.</span>
      </p>
      <dl className="bm-footer-cols">
        <div>
          <dt>Email</dt>
          <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
        </div>
        <div>
          <dt>LinkedIn</dt>
          <dd><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">Rayyan Abzal</a></dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>Auckland, New Zealand</dd>
        </div>
      </dl>
      <p className="bm-copy">&copy; {SITE_NAME}</p>
    </footer>
  );
}

/** Page frame shared by every inner page. */
export function BmPage({ current, children }: { current?: NavKey; children: ReactNode }) {
  return (
    <main id="top" className="ref-root ref-brightman">
      <RevealRoot />
      <div className="bm-wide">
        <BmHeader current={current} />
        {children}
        <BmFooter />
      </div>
    </main>
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

export type VisualSource = { slug: CaseSlug } | { personal: string };

export function hasDemo(source: VisualSource): boolean {
  return "slug" in source ? Boolean(CLIENT_DEMOS[source.slug]) : Boolean(PERSONAL_DEMOS[source.personal]);
}

/** The live demo when the registry has one, else the drawn schematic. */
function visualNode(source: VisualSource): ReactNode {
  if ("slug" in source) {
    const Demo = CLIENT_DEMOS[source.slug];
    return Demo ? <Demo /> : CLIENT_SCHEMATICS[source.slug]();
  }
  const Demo = PERSONAL_DEMOS[source.personal];
  return Demo ? <Demo /> : PERSONAL_SCHEMATICS[source.personal]?.();
}

/** Card visual: fixed aspect box, hidden from assistive tech, inert so the card stays one link. */
export function BmVisual({ source, hero }: { source: VisualSource; hero?: boolean }) {
  return (
    <div className={`bm-visual${hero ? " bm-visual-hero" : ""}`} aria-hidden="true" inert>
      <div className="bm-visual-in">{visualNode(source)}</div>
    </div>
  );
}

export function visualNote(source: VisualSource): string {
  return hasDemo(source) ? "A live demo. Names and numbers are made up." : DATA_NOTE;
}

interface ProjectCardProps {
  n: number;
  source: VisualSource;
  name?: string;
  title: string;
  blurb?: string;
  outcome?: string;
  stack?: string;
  href?: string;
  className?: string;
  id: string;
}

/** One project card. With an href the whole card is a single stretched link named by the title. */
export function BmProjectCard({ n, source, name, title, blurb, outcome, stack, href, className = "", id }: ProjectCardProps) {
  const blurbId = `${id}-blurb`;
  return (
    <TiltCard className={`bm-card bm-pcard ${className}`}>
      <BmVisual source={source} />
      <div className="bm-pcard-body">
        <span className="bm-index">{idx(n)}</span>
        {name ? <span className="bm-pname">{name}</span> : null}
        <h3 id={id}>
          {href ? (
            <Link href={href} className="bm-pcard-link" aria-labelledby={id} aria-describedby={blurb ? blurbId : undefined}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        {blurb ? <p id={blurbId}>{blurb}</p> : null}
        {outcome ? <p className="bm-pout">{outcome}</p> : null}
        {stack ? <p className="bm-stack">{stack}</p> : null}
      </div>
      {href ? (
        <span className="bm-pcard-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18L18 6M8 6h10v10" /></svg>
        </span>
      ) : null}
    </TiltCard>
  );
}

/** Dark closing band with one booking button. */
export function BmCta({ title, body, source }: { title: string; body: string; source: Parameters<typeof BookLink>[0]["source"] }) {
  return (
    <section className="bm-cta" aria-labelledby="bm-cta-h" data-rv>
      <h2 id="bm-cta-h" className="bm-cta-title">{title}</h2>
      <p className="bm-cta-body">{body}</p>
      <div className="bm-cta-actions">
        <Magnetic>
          <BookLink source={source} className="pill pill-solid">
            Book a free call <span className="pill-plus" aria-hidden="true">+</span>
          </BookLink>
        </Magnetic>
      </div>
    </section>
  );
}
