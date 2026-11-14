import Link from "next/link";
import type { ReactNode } from "react";

import "@/app/styles/refs/refined.css";
import { BookLink } from "@/components/book-link";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import {
  AriaSchematic,
  FiosSchematic,
  JobFinderSchematic,
} from "@/components/schematics/personal-schematics";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { RefinedFaq, RefinedFx } from "@/components/refs/refined-client";
import { FAQ_ITEMS, PROCESS_STEPS, TESTIMONIALS } from "@/content/about";
import { HARNESS, HARNESS_CHANGES } from "@/content/harness";
import { HOME, OFFERS } from "@/content/home";
import { SECTION_LABELS } from "@/content/home-novelty";
import { CLIENT_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";
import type { Rich } from "@/content/rich";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

const SCHEMATICS: Record<string, () => ReactNode> = {
  influence: () => <InfluenceSchematic />,
  feedhack: () => <FeedhackSchematic />,
  pumpdat: () => <PumpdatSchematic />,
  "influence-v2": () => <InfluenceV2Schematic />,
};

const PERSONAL_SCHEMATICS: readonly (() => ReactNode)[] = [
  () => <FiosSchematic />,
  () => <AriaSchematic />,
  () => <JobFinderSchematic />,
];

function plain(rich: Rich): string {
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

function SectionHead({
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
        {count !== undefined ? (
          <sup aria-label={`${count} items`}>({count})</sup>
        ) : null}
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

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8h9M8.5 4l4 4-4 4" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.2 8.2l1.9 1.9 3.7-3.9" />
    </svg>
  );
}

const ICONS: readonly ReactNode[] = [
  <svg key="a" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7h10M4 12h16M4 17h8" /><circle cx="18" cy="7" r="2" /></svg>,
  <svg key="b" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3" /><path d="M9 12l2 2 4-4" /></svg>,
  <svg key="c" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4l8 4-8 4-8-4 8-4z" /><path d="M4 12l8 4 8-4M4 16l8 4 8-4" /></svg>,
  <svg key="d" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3" /></svg>,
];

export function DesignRefined() {
  const headline = plain(HOME.heroHeadline);
  const cut = headline.indexOf(" that ");
  const line1 = cut > 0 ? headline.slice(0, cut) : headline;
  const line2 = cut > 0 ? headline.slice(cut + 1) : "";
  const ctaTitle = plain(HOME.ctaTitle);
  const ctaCut = ctaTitle.indexOf(" ", ctaTitle.indexOf(" ") + 1);
  const ctaA = ctaTitle.slice(0, ctaCut);
  const ctaB = ctaTitle.slice(ctaCut + 1);
  const changes = HARNESS_CHANGES.slice(-5).reverse();
  const solutions = [
    ...OFFERS.map((o) => ({ title: o.title, body: o.body, href: o.linkHref })),
    { title: HARNESS.teaserTitle, body: HARNESS.teaserBody, href: "/harness" },
  ];
  const process3 = [PROCESS_STEPS[0], PROCESS_STEPS[1], PROCESS_STEPS[3]];

  return (
    <main id="top" className="ref-root ref-refined">
      <RefinedFx />
      <header className="rf-nav-wrap">
        <nav className="rf-nav" aria-label="Main">
          <Link href="/" className="rf-name">
            Rayyan Abzal
          </Link>
          <ul>
            <li><Link href="/work">Projects</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/harness">How I build</Link></li>
          </ul>
          <BookLink source="design_preview" className="rf-nav-book">
            Book a call
          </BookLink>
        </nav>
      </header>

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
            <Link href="/work" className="rf-btn rf-ghost">
              {HOME.heroSecondary}
            </Link>
          </div>
        </section>

        <section className="rf-sec" aria-labelledby="rf-projects">
          <SectionHead id="rf-projects" title="Projects" count={CLIENT_PROJECTS.length} href="/work" hrefLabel="See all" />
          <ul className="rf-showcase">
            {CLIENT_PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="rf-show">
                  <div className="rf-stage card-visual" aria-hidden="true">
                    <div className="vis-frame">{SCHEMATICS[p.slug]()}</div>
                  </div>
                  <div className="rf-show-text">
                    <h3>{p.name}</h3>
                    <p>{p.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rf-sec" aria-labelledby="rf-solutions">
          <SectionHead id="rf-solutions" title="Solutions" count={3} />
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

        <section className="rf-sec" aria-labelledby="rf-personal">
          <SectionHead id="rf-personal" title="Personal builds" count={PERSONAL_PROJECTS.length} />
          <ul className="rf-builds">
            {PERSONAL_PROJECTS.map((p, i) => (
              <li key={p.title} className="rf-build">
                <div className="rf-build-stage card-visual" aria-hidden="true">
                  <div className="vis-frame">{PERSONAL_SCHEMATICS[i]()}</div>
                </div>
                <div className="rf-build-row">
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.stack}</p>
                  </div>
                  <span className="rf-tag">Personal</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rf-words" aria-label="Client builds">
          <ul>
            {CLIENT_PROJECTS.map((p) => (
              <li key={p.slug}>{p.name}</li>
            ))}
          </ul>
        </section>

        <section className="rf-sec" aria-labelledby="rf-changes">
          <SectionHead id="rf-changes" title="What changed lately" count={changes.length} href="/harness" hrefLabel="See all" />
          <ul className="rf-list">
            {changes.map((c) => (
              <li key={c.date + c.title}>
                <Link href="/harness" className="rf-row">
                  <span className="rf-row-text">
                    <strong>{c.title}</strong>
                    <span>{c.label}</span>
                  </span>
                  <span className="rf-round" aria-hidden="true"><Arrow /></span>
                  <span className="rf-sr">Read on the harness page</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rf-sec" aria-labelledby="rf-clients">
          <SectionHead id="rf-clients" title="What clients say" count={TESTIMONIALS.length} />
          <ul className="rf-masonry">
            {TESTIMONIALS.map((t) => (
              <li key={t.project} className="rf-quote">
                <blockquote>{t.quote}</blockquote>
                <p className="rf-who">
                  <strong>{t.role}</strong>
                  <span>{t.project}</span>
                </p>
              </li>
            ))}
          </ul>
          <div className="rf-marquee" aria-hidden="true">
            {[0, 1].map((col) => (
              <div key={col} className="rf-track" data-col={col}>
                {[0, 1].map((rep) =>
                  (col === 0 ? TESTIMONIALS : [...TESTIMONIALS].reverse()).map((t) => (
                    <div key={`${rep}-${t.project}`} className="rf-quote">
                <blockquote>{t.quote}</blockquote>
                <p className="rf-who">
                  <strong>{t.role}</strong>
                  <span>{t.project}</span>
                </p>
              </div>
                  )),
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="rf-sec" aria-labelledby="rf-together">
          <SectionHead id="rf-together" title="How we work together" />
          <div className="rf-pair">
            <article className="rf-plan">
              <h3>Fixed price project</h3>
              <p>{SECTION_LABELS.offersNote}</p>
              <BookLink source="design_preview" className="rf-btn rf-glow rf-full">
                Book a call
              </BookLink>
              <ul>
                {OFFERS.map((o) => (
                  <li key={o.title}>
                    <Check />
                    <span>{o.title}: {o.duration}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rf-plan">
              <h3>How it runs</h3>
              <p>{PROCESS_STEPS[0].body}</p>
              <BookLink source="design_preview" className="rf-btn rf-glow rf-full">
                Book a call
              </BookLink>
              <ul>
                {process3.map((s) => (
                  <li key={s.title}>
                    <Check />
                    <span>{s.title}: {s.when}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="rf-sec" aria-labelledby="rf-faq">
          <SectionHead id="rf-faq" title="Most asked questions" count={FAQ_ITEMS.length} />
          <RefinedFaq items={FAQ_ITEMS} />
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

      <footer className="rf-foot">
        <p className="rf-sign" aria-hidden="true">
          <span className="rf-dim">{ctaA}</span>
          <span>{ctaB}</span>
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
              <li><Link href="/">Home</Link></li>
              <li><Link href="/work">Projects</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/harness">How I build</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
          <nav aria-label="Work">
            <h2>Work</h2>
            <ul>
              {CLIENT_PROJECTS.map((p) => (
                <li key={p.slug}><Link href={`/work/${p.slug}`}>{p.name}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Elsewhere">
            <h2>Elsewhere</h2>
            <ul>
              <li><a href={LINKEDIN_URL} rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
              <li><a href={`mailto:${EMAIL}`}>Email</a></li>
              <li><Link href="/privacy">Privacy</Link></li>
            </ul>
          </nav>
        </div>
        <div className="rf-bottom">
          <span>&copy; 2026 Rayyan Abzal</span>
          <span>Auckland, New Zealand</span>
        </div>
      </footer>
    </main>
  );
}
