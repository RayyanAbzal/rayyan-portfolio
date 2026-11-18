import Link from "next/link";
import type { ReactNode } from "react";

import { BookLink } from "@/components/book-link";
import { RefinedFx } from "@/components/refs/refined-client";
import {
  Arrow,
  BASE,
  ClientVisual,
  RefinedFooter,
  RefinedNav,
  RefinedRich,
  SectionHead,
  plain,
  toDirection,
} from "@/components/refs/pages/refined-chrome";
import { HARNESS } from "@/content/harness";
import { HOME, OFFERS } from "@/content/home";
import { CLIENT_PROJECTS } from "@/content/projects";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

const ICONS: readonly ReactNode[] = [
  <svg key="a" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7h10M4 12h16M4 17h8" /><circle cx="18" cy="7" r="2" /></svg>,
  <svg key="b" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3" /><path d="M9 12l2 2 4-4" /></svg>,
  <svg key="c" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4l8 4-8 4-8-4 8-4z" /><path d="M4 12l8 4 8-4M4 16l8 4 8-4" /></svg>,
  <svg key="d" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3" /></svg>,
];

/** The three projects the home teases; the rest live on the projects page. */
const TOP_SLUGS = ["feedhack", "influence-v2", "influence"] as const;

export function DesignRefined() {
  const headline = plain(HOME.heroHeadline);
  const cut = headline.indexOf(" that ");
  const line1 = cut > 0 ? headline.slice(0, cut) : headline;
  const line2 = cut > 0 ? headline.slice(cut + 1) : "";
  const ctaTitle = plain(HOME.ctaTitle);
  const top = TOP_SLUGS.map((slug) => CLIENT_PROJECTS.find((p) => p.slug === slug)).filter(
    (p): p is (typeof CLIENT_PROJECTS)[number] => p !== undefined,
  );
  const solutions = [
    ...OFFERS.map((o) => ({ title: o.title, body: o.body, href: toDirection(o.linkHref) })),
    { title: HARNESS.teaserTitle, body: HARNESS.teaserBody, href: "/harness" },
  ];

  return (
    <main id="top" className="ref-root ref-refined">
      <RefinedFx />
      <RefinedNav current="home" />

      <div className="rf-col">
        <section className="rf-hero" aria-labelledby="rf-h1">
          <h1 id="rf-h1">
            <span className="rf-dim">{line1}</span>
            <span>{line2}</span>
          </h1>
          <p>{HOME.heroLede}</p>
          <div className="rf-actions">
            <BookLink source="design_preview" className="rf-btn rf-glow">
              {HOME.heroCta}
            </BookLink>
            <Link href={`${BASE}/projects`} className="rf-btn rf-ghost">
              {HOME.heroSecondary}
            </Link>
          </div>
        </section>

        <section className="rf-sec" aria-labelledby="rf-projects">
          <SectionHead id="rf-projects" title="Projects" count={CLIENT_PROJECTS.length} href={`${BASE}/projects`} hrefLabel="See all" />
          <ul className="rf-showcase">
            {top.map((p) => (
              <li key={p.slug}>
                <Link href={`${BASE}/case/${p.slug}`} className="rf-show" aria-labelledby={`rf-show-${p.slug}`}>
                  <ClientVisual slug={p.slug} />
                  <div className="rf-show-text">
                    <p>{p.name}</p>
                    <h3 id={`rf-show-${p.slug}`}>{p.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rf-sec" aria-labelledby="rf-solutions">
          <SectionHead id="rf-solutions" title="Solutions" count={solutions.length} />
          <ul className="rf-solutions">
            {solutions.map((s, i) => (
              <li key={s.title} className="rf-double">
                <Link href={s.href} className="rf-sol">
                  <span className="rf-num">{String(i + 1).padStart(2, "0")}.</span>
                  <span className="rf-chip" aria-hidden="true">{ICONS[i]}</span>
                  <span className="rf-sol-text">
                    <strong>{s.title}</strong>
                    <span>{s.body}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rf-sec" aria-label="Client quote">
          <figure className="rf-quote rf-quote-lead">
            <blockquote>
              <RefinedRich value={HOME.quote} />
            </blockquote>
            <figcaption className="rf-who">
              <strong>{HOME.quoteRole}</strong>
              <span>{HOME.quoteProject}</span>
            </figcaption>
            <Link href={`${BASE}/about`} className="rf-inline rf-quote-link">
              {HOME.quoteLink}
            </Link>
          </figure>
        </section>

        <section className="rf-sec rf-contact" aria-label="Get in touch">
          <div className="rf-card rf-ask">
            <span className="rf-badge">Work together</span>
            <h2>{ctaTitle}</h2>
            <p>{HOME.ctaBody}</p>
          </div>
          <div className="rf-card rf-reach">
            <BookLink source="design_preview" className="rf-btn rf-glow rf-full">
              {HOME.ctaButton}
            </BookLink>
            <a href={`mailto:${EMAIL}`} className="rf-bar">
              <span>{EMAIL}</span>
              <Arrow />
            </a>
            <a href={LINKEDIN_URL} className="rf-bar" rel="noopener noreferrer" target="_blank">
              <span>LinkedIn</span>
              <Arrow />
            </a>
          </div>
        </section>
      </div>

      <RefinedFooter />
    </main>
  );
}
