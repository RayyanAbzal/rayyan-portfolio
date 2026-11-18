import "@/app/styles/refs/synapse.css";
import "@/app/styles/refs/synapse-pages.css";

import Link from "next/link";

import { BookLink } from "@/components/book-link";
import { SynCardVisual, SynFooter, SynHeader, SynRich, dirHref, richToPlain } from "@/components/refs/pages/synapse-shell";
import { TESTIMONIALS } from "@/content/about";
import { HARNESS, HARNESS_LAYERS } from "@/content/harness";
import { HOME, OFFERS } from "@/content/home";
import { CLIENT_PROJECTS } from "@/content/projects";

import { SynAccordion, SynBadge, SynCalculator, SynCarousel, SynEffects, SynWave } from "./synapse-client";

function firstSentences(text: string, count: number): string {
  const parts = text.match(/[^.]+\./g) ?? [text];
  return parts.slice(0, count).join("").trim();
}

const CORNER_NODES = ["rules", "memory", "hooks", "reviewers"] as const;
const HOME_PROJECTS = CLIENT_PROJECTS.slice(0, 3);
const LEAD_QUOTE = TESTIMONIALS[0];

export function DesignSynapse() {
  const nodes = CORNER_NODES.map((id) => HARNESS_LAYERS.find((l) => l.id === id)).filter(
    (l): l is (typeof HARNESS_LAYERS)[number] => Boolean(l),
  );
  const model = HARNESS_LAYERS[0];

  return (
    <main id="top" className="ref-root ref-synapse">
      <SynEffects />
      {/* 1. Hero */}
      <section className="syn-panel syn-hero" aria-labelledby="syn-h1">
        <SynWave />
        <SynHeader />
        <div className="syn-hero-body">
          <h1 id="syn-h1" className="syn-hero-h">{richToPlain(HOME.heroHeadline)}</h1>
          <BookLink source="design_preview" className="syn-pill syn-pill-live">
            {HOME.heroCta} <span className="syn-plus-chip" aria-hidden="true">+</span>
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

      {/* 3. Offers */}
      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-way">
        <div className="syn-two">
          <div className="syn-copy">
            <p className="syn-eyebrow">What I build</p>
            <h2 id="syn-h-way" className="syn-h">{HOME.servicesTitle}</h2>
            <p className="syn-small">{HOME.servicesLede}</p>
          </div>
          <SynAccordion items={OFFERS.map((o) => ({ title: o.title, sub: o.duration, body: o.body }))} variant="offers" />
        </div>
      </section>

      {/* 4. Case carousel: the top three, each card plays its live demo */}
      <section data-syn-reveal className="syn-panel syn-pad syn-cases" aria-labelledby="syn-h-work">
        <div className="syn-head-row">
          <div className="syn-copy">
            <p className="syn-eyebrow">Client work</p>
            <h2 id="syn-h-work" className="syn-h">{HOME.workTitle}</h2>
          </div>
          <Link href="/designs/synapse/projects" className="syn-pill syn-pill-line">
            All projects <span className="syn-plus-chip" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <SynCarousel prevLabel="Previous project" nextLabel="Next project" regionLabel="Client projects, scroll sideways">
          {HOME_PROJECTS.map((p) => (
            <article key={p.slug} className="syn-case">
              <div className="syn-case-card">
                <p className="syn-case-name">{p.name}</p>
                <SynCardVisual slug={p.slug} />
                <h3 className="syn-case-title">
                  <Link href={`/designs/synapse/case/${p.slug}`}>{p.title}</Link>
                </h3>
              </div>
              <p className="syn-case-cap">{p.outcome}</p>
            </article>
          ))}
        </SynCarousel>
      </section>

      {/* 5. Light calculator card, stacked over the dark */}
      <section data-syn-reveal className="syn-light" aria-labelledby="syn-h-calc">
        <div className="syn-calc-left">
          <p className="syn-eyebrow syn-eyebrow-ink">Do the sum</p>
          <h2 id="syn-h-calc" className="syn-h syn-h-ink">How many hours could come back in a year?</h2>
          <p className="syn-small syn-small-ink">Enter the hours your team spends on one manual task each week.</p>
        </div>
        <SynCalculator
          label="Hours of manual work per week"
          unit="hours"
          resultLabel="If a build removes this work: hours back per year"
          note="Arithmetic on your number: hours per week times 52 weeks. It is not a forecast."
        />
      </section>

      {/* 6. One client quote; the other two live on About */}
      <section data-syn-reveal className="syn-panel syn-pad" aria-label="Client quote">
        <figure className="syn-quote">
          <figcaption className="syn-eyebrow">{LEAD_QUOTE.role}, {LEAD_QUOTE.project}</figcaption>
          <blockquote>{LEAD_QUOTE.quote}</blockquote>
          <Link href={dirHref(LEAD_QUOTE.linkHref)} className="syn-link">Read the {LEAD_QUOTE.linkLabel} case</Link>
        </figure>
      </section>

      {/* 7. Solid green CTA */}
      <section data-syn-reveal className="syn-cta" aria-labelledby="syn-h-cta">
        <div className="syn-cta-copy">
          <p className="syn-caps syn-caps-dark">{HOME.ctaButton}</p>
          <h2 id="syn-h-cta" className="syn-cta-h"><SynRich value={HOME.ctaTitle} /></h2>
          <p className="syn-cta-p">{HOME.ctaBody}</p>
        </div>
        <SynBadge>Let&rsquo;s talk</SynBadge>
      </section>

      <SynFooter />
    </main>
  );
}
