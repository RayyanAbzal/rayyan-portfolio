import "@/app/styles/refs/synapse.css";

import Link from "next/link";

import { BookLink } from "@/components/book-link";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { ABOUT, PRINCIPLES, PROCESS_STEPS } from "@/content/about";
import { HARNESS, HARNESS_LAYERS } from "@/content/harness";
import { HOME, OFFERS } from "@/content/home";
import { CLIENT_PROJECTS } from "@/content/projects";
import type { Rich } from "@/content/rich";
import { EMAIL, LINKEDIN_URL, NAV_ITEMS, SITE_NAME } from "@/lib/site";

import { SynAccordion, SynBadge, SynCalculator, SynCarousel, SynEffects, SynOffersRoadmap, SynWave } from "./synapse-client";

function plain(rich: Rich): string {
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

const SCHEMATICS: Record<string, () => React.JSX.Element> = {
  influence: InfluenceSchematic,
  feedhack: FeedhackSchematic,
  pumpdat: PumpdatSchematic,
  "influence-v2": InfluenceV2Schematic,
};

function Mark() {
  return (
    <span className="syn-mark" aria-hidden="true">
      <i />
    </span>
  );
}

function firstSentences(text: string, count: number): string {
  const parts = text.match(/[^.]+\./g) ?? [text];
  return parts.slice(0, count).join("").trim();
}

const CORNER_NODES = ["rules", "memory", "hooks", "reviewers"] as const;

export function DesignSynapse() {
  const nodes = CORNER_NODES.map((id) => HARNESS_LAYERS.find((l) => l.id === id)).filter(
    (l): l is (typeof HARNESS_LAYERS)[number] => Boolean(l),
  );
  const model = HARNESS_LAYERS[0];
  const [offerCta] = [HOME.heroCta];

  return (
    <main id="top" className="ref-root ref-synapse">
      <SynEffects />
      {/* 1. Hero */}
      <section className="syn-panel syn-hero" aria-labelledby="syn-h1">
        <SynWave />
        <header className="syn-nav">
          <Link href="/" className="syn-brand">
            <Mark />
            <span>{SITE_NAME}</span>
          </Link>
          <nav aria-label="Primary" className="syn-nav-links">
            {NAV_ITEMS.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
            <Link href="/harness">How I build</Link>
          </nav>
          <BookLink source="design_preview" className="syn-pill syn-pill-line">
            Book a call <span className="syn-plus-chip" aria-hidden="true">+</span>
          </BookLink>
        </header>
        <div className="syn-hero-body">
          <h1 id="syn-h1" className="syn-hero-h">{plain(HOME.heroHeadline)}</h1>
          <BookLink source="design_preview" className="syn-pill syn-pill-live">
            {offerCta} <span className="syn-plus-chip" aria-hidden="true">+</span>
          </BookLink>
        </div>
        <div className="syn-hero-foot">
          <p className="syn-caps">AI consultant, Auckland NZ</p>
          <p className="syn-caps">Scroll</p>
        </div>
      </section>

      {/* 2. Connected diagram */}
      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-connect">
        <div className="syn-two">
          <div className="syn-copy">
            <p className="syn-eyebrow">How I build</p>
            <h2 id="syn-h-connect" className="syn-h">{HARNESS.h1}</h2>
            <p className="syn-small">{HARNESS.teaserBody}</p>
          </div>
          <div className="syn-right">
            <div className="syn-card syn-diagram">
              <p className="syn-eyebrow">{HARNESS.layersHeading}</p>
              <div className="syn-map">
                <svg viewBox="0 0 400 220" aria-hidden="true" focusable="false" preserveAspectRatio="none">
                  <path d="M60 40 L200 110 M340 40 L200 110 M60 180 L200 110 M340 180 L200 110" />
                </svg>
                <div className="syn-node-c">
                  <span className="syn-bar" aria-hidden="true" />
                  <span className="syn-node-c-l">{model.name}</span>
                </div>
                {nodes.map((n, i) => (
                  <span key={n.id} className={`syn-node syn-node-${i + 1}`}>{n.name}</span>
                ))}
              </div>
            </div>
            <p className="syn-small syn-below">
              {firstSentences(HARNESS.lede, 2)}{" "}
              <Link href="/harness" className="syn-link">{HARNESS.teaserLink}</Link>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Offers and roadmap */}
      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-way">
        <div className="syn-two syn-head">
          <div className="syn-copy">
            <p className="syn-eyebrow">{HOME.servicesTitle}</p>
            <h2 id="syn-h-way" className="syn-h">{ABOUT.processHeading}</h2>
          </div>
          <p className="syn-small syn-head-r">{HOME.servicesLede}</p>
        </div>
        <SynOffersRoadmap
          offers={OFFERS.map((o) => ({ title: o.title, sub: o.duration, body: o.body }))}
          steps={PROCESS_STEPS.map((s) => ({ title: s.title, when: s.when }))}
          roadmapLabel="How every engagement runs"
        />
      </section>

      {/* 4. Case carousel */}
      <section data-syn-reveal className="syn-panel syn-pad syn-cases" aria-labelledby="syn-h-work">
        <div className="syn-head-row">
          <div className="syn-copy">
            <p className="syn-eyebrow">Client work</p>
            <h2 id="syn-h-work" className="syn-h">{HOME.workTitle}</h2>
          </div>
        </div>
        <SynCarousel prevLabel="Previous project" nextLabel="Next project" regionLabel="Client projects, scroll sideways">
          {CLIENT_PROJECTS.map((p) => {
            const Visual = SCHEMATICS[p.slug];
            return (
              <article key={p.slug} className="syn-case">
                <div className="syn-case-card">
                  <p className="syn-case-name">{p.name}</p>
                  <div className="card-visual" aria-hidden="true">
                    <div className="vis-frame">{Visual ? <Visual /> : null}</div>
                  </div>
                  <h3 className="syn-case-title">
                    <Link href={`/work/${p.slug}`}>{p.title}</Link>
                  </h3>
                </div>
                <p className="syn-case-cap">{p.outcome}</p>
              </article>
            );
          })}
        </SynCarousel>
      </section>

      {/* 5. Light calculator card, stacked over the dark */}
      <section data-syn-reveal className="syn-light" aria-labelledby="syn-h-calc">
        <div className="syn-calc-left">
          <p className="syn-eyebrow syn-eyebrow-ink">Do the sum</p>
          <h2 id="syn-h-calc" className="syn-h syn-h-ink">{PRINCIPLES[3].title}</h2>
          <p className="syn-small syn-small-ink">{PRINCIPLES[3].body}</p>
        </div>
        <SynCalculator
          label="Hours of manual work per week"
          unit="hours"
          resultLabel="If a build removes this work: hours back per year"
          note="Arithmetic on your number: hours per week times 52 weeks. It is not a forecast."
        />
      </section>

      {/* 6. Principles accordion */}
      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-prin">
        <div className="syn-two">
          <div className="syn-copy">
            <p className="syn-eyebrow">How I work</p>
            <h2 id="syn-h-prin" className="syn-h">{ABOUT.principlesHeading}</h2>
            <p className="syn-small">{ABOUT.principlesIntro}</p>
          </div>
          <SynAccordion items={PRINCIPLES.slice(0, 3).map((p) => ({ title: p.title, body: p.body }))} variant="plain" />
        </div>
      </section>

      {/* 7. Solid green CTA */}
      <section data-syn-reveal className="syn-cta" aria-labelledby="syn-h-cta">
        <div className="syn-cta-copy">
          <p className="syn-caps syn-caps-dark">{HOME.ctaButton}</p>
          <h2 id="syn-h-cta" className="syn-cta-h">{plain(HOME.ctaTitle)}</h2>
          <p className="syn-cta-p">{HOME.ctaBody}</p>
        </div>
        <SynBadge>Let&rsquo;s talk</SynBadge>
      </section>

      {/* 8. Footer */}
      <footer className="syn-panel syn-foot">
        <Link href="/" className="syn-brand">
          <Mark />
          <span>{SITE_NAME}</span>
        </Link>
        <p className="syn-foot-tag">{ABOUT.role}</p>
        <nav aria-label="Footer" className="syn-foot-links">
          <Link href="/work">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/harness">How I build</Link>
          <a href={LINKEDIN_URL} rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </nav>
      </footer>
    </main>
  );
}
