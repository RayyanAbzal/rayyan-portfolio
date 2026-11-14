import Link from "next/link";
import type { ReactNode } from "react";

import "@/app/styles/refs/astapable.css";
import { AucklandClock } from "@/components/home/auckland-clock";
import { AstapableFx } from "@/components/refs/astapable-client";
import { BookLink } from "@/components/book-link";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { CASE_STUDIES } from "@/content/case-studies";
import { HOME, HOME_SIDE_CARDS } from "@/content/home";
import { HERO } from "@/content/home-novelty";
import { CLIENT_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";
import type { Rich } from "@/content/rich";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

interface FeatureCard {
  key: string;
  name: string;
  blurb: string;
  href: string;
  tags: readonly string[];
  stage: ReactNode;
  tone: number;
}

const NAV: readonly { label: string; href: string }[] = [
  { label: "Projects", href: "/work" },
  { label: "How I build", href: "/harness" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function plain(rich: Rich): string {
  return rich
    .map((part) => {
      if (typeof part === "string") return part;
      const bits = part as unknown as Record<string, unknown>;
      const value = bits.mark ?? bits.nowrap ?? "";
      return typeof value === "string" ? value : "";
    })
    .join("");
}

function firstSentence(text: string): string {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

const CLIENT_STAGES: Record<string, ReactNode> = {
  influence: <InfluenceSchematic />,
  feedhack: <FeedhackSchematic />,
  pumpdat: <PumpdatSchematic />,
  "influence-v2": <InfluenceV2Schematic />,
};

function buildFeatured(): FeatureCard[] {
  const clients: FeatureCard[] = CLIENT_PROJECTS.map((p, i) => ({
    key: p.slug,
    name: p.name,
    blurb: p.title,
    href: `/work/${p.slug}`,
    tags: CASE_STUDIES[p.slug].stack.slice(0, 3),
    stage: CLIENT_STAGES[p.slug],
    tone: i,
  }));
  return clients;
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.54h.05c.53-1 1.82-1.84 3.75-1.84 4 0 4.75 2.5 4.75 5.76V21h-4v-5.1c0-1.22-.02-2.78-1.8-2.78-1.8 0-2.07 1.34-2.07 2.69V21h-4V9.75Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** Three thin plates in isometric view: interface, logic, data. Top plate green. */
function PlateStack() {
  const ys = [92, 152, 212];
  return (
    <svg className="as-stack" viewBox="0 0 300 300" aria-hidden="true" fill="none" overflow="visible" strokeLinejoin="round" strokeLinecap="round">
      <g stroke="var(--ink-3)" strokeWidth="1" strokeDasharray="3 4">
        <path d="M50 92v60M150 142v60M250 92v60M50 152v60M250 152v60M150 202v60" />
      </g>
      {ys.map((y, i) => {
        const top = i === 0;
        return (
          <g key={y} className={`as-plate as-plate-${i}`} stroke="var(--ink)" strokeWidth="1.4">
            <path d={`M50 ${y}l100 50v10L50 ${y + 10}Z`} fill={top ? "var(--tint)" : "var(--sunken)"} />
            <path d={`M150 ${y + 50}l100-50v10l-100 50Z`} fill={top ? "var(--tint)" : "var(--sunken)"} />
            <path d={`M150 ${y - 50}l100 50-100 50L50 ${y}Z`} fill={top ? "var(--live)" : "var(--surface)"} />
            <path d={`M95 ${y + 3}l55-27 55 27`} strokeWidth="1" stroke={top ? "var(--ink)" : "var(--line-2)"} />
          </g>
        );
      })}
    </svg>
  );
}

export function DesignAstapable() {
  const featured = buildFeatured();
  const side = HOME_SIDE_CARDS;
  const cta = plain(HOME.ctaTitle).replace(/\.$/, "");
  const split = cta.indexOf("30");

  return (
    <main id="top" className="ref-root ref-astapable">
      <AstapableFx />
      <a className="as-skip" href="#as-main">
        Skip to content
      </a>
      <header className="as-bar">
        <div className="as-brand">
          <Link href="/" className="as-name">
            Rayyan Abzal
          </Link>
          <span className="as-chip">AI engineer</span>
        </div>
        <nav aria-label="Primary" className="as-links">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="as-tools">
          <a className="as-round" href={LINKEDIN_URL} aria-label="Rayyan on LinkedIn" rel="noopener">
            <IconLinkedIn />
          </a>
          <a className="as-round" href={`mailto:${EMAIL}`} aria-label="Email Rayyan">
            <IconMail />
          </a>
          <BookLink source="design_preview" className="as-btn as-btn-ink">
            Book a call
          </BookLink>
        </div>
      </header>

      <div id="as-main">
        <section className="as-hero" aria-labelledby="as-h1">
          <div className="as-hero-art">
            <PlateStack />
          </div>
          <div className="as-hero-foot">
            <div className="as-sharp">
              <h1 id="as-h1">Rayyan Abzal</h1>
              <p>{plain(side[2].body)}</p>
            </div>
            <p className="as-status">
              <i aria-hidden="true" />
              {HERO.status}
              <span className="as-sep" aria-hidden="true" />
              <AucklandClock place={HERO.place} />
            </p>
          </div>
        </section>

        <section aria-labelledby="as-work" className="as-section">
          <h2 id="as-work" className="as-title as-sharp">
            Client work
          </h2>
          <ul className="as-grid">
            {featured.map((f) => (
              <li key={f.key} className="as-feature" data-tone={f.tone % 3}>
                <div className="as-stage">
                  {f.stage}
                  <span className="as-chipgo" aria-hidden="true">
                    <Arrow />
                  </span>
                </div>
                <div className="as-cap as-sharp">
                  <ul className="as-tags" aria-label="Built with">
                    {f.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className="as-text">
                    <h3>
                      <Link href={f.href} className="as-cover">
                        {f.name}
                      </Link>
                    </h3>
                    <p>{f.blurb}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="as-apps" className="as-section">
          <h2 id="as-apps" className="as-title as-sharp">
            Personal builds
          </h2>
          <ul className="as-apps">
            {PERSONAL_PROJECTS.map((p) => (
              <li key={p.title} className="as-app as-sharp">
                <span className="as-tile" aria-hidden="true">
                  {p.title.slice(0, 1)}
                </span>
                <h3>
                  <Link href="/work" className="as-cover">
                    {p.title}
                  </Link>
                </h3>
                <p>{firstSentence(p.blurb)}</p>
                <span className="as-go" aria-hidden="true">
                  <Arrow />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="as-cta" className="as-close">
          <h2 id="as-cta" className="as-sharp">
            <span>{cta.slice(0, split).trim()}</span>
            <span className="as-nowrap">
              {cta.slice(split)} <Arrow size={56} />
            </span>
          </h2>
          <div className="as-actions as-sharp">
            <a className="as-btn as-btn-out" href={`mailto:${EMAIL}`}>
              Email me
            </a>
            <BookLink source="design_preview" className="as-btn as-btn-out">
              Book a call
            </BookLink>
          </div>
        </section>
      </div>

      <footer className="as-foot as-sharp">
        <p>Rayyan Abzal</p>
        <p>AI engineer and consultant</p>
        <p>{side[2].title}</p>
      </footer>
    </main>
  );
}
