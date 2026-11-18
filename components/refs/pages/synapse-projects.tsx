import Link from "next/link";

import { SynBadge, SynEffects } from "@/components/refs/synapse-client";
import { CLIENT_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";
import { WORK } from "@/content/work";

import { SynCardVisual, SynFooter, SynPageHero } from "./synapse-shell";

export function SynapseProjects() {
  return (
    <main id="top" className="ref-root ref-synapse">
      <SynEffects />
      <SynPageHero current="projects" eyebrow="Projects" title={WORK.h1} lede={WORK.lede} />

      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-client">
        <h2 id="syn-h-client" className="syn-h syn-h-sm">{WORK.clientHeading}</h2>
        <ul className="syn-grid">
          {CLIENT_PROJECTS.map((p) => {
            const titleId = `syn-card-${p.slug}`;
            return (
              <li key={p.slug} className="syn-pcard">
                <p className="syn-case-name">{p.name}</p>
                <SynCardVisual slug={p.slug} />
                <h3 id={titleId} className="syn-pcard-title">
                  <Link href={`/designs/synapse/case/${p.slug}`} className="syn-stretch" aria-labelledby={titleId}>
                    {p.title}
                  </Link>
                </h3>
                <p className="syn-pcard-blurb">{p.blurb}</p>
                <p className="syn-pcard-outcome">{p.outcome}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-personal">
        <div className="syn-two syn-head">
          <div className="syn-copy">
            <h2 id="syn-h-personal" className="syn-h syn-h-sm">{WORK.personalHeading}</h2>
          </div>
          <p className="syn-small syn-head-r">{WORK.personalLede}</p>
        </div>
        <ul className="syn-grid syn-grid-3">
          {PERSONAL_PROJECTS.map((p) => (
            <li key={p.title} className="syn-pcard syn-pcard-plain">
              <SynCardVisual personal={p.title} />
              <h3 className="syn-pcard-title">{p.title}</h3>
              <p className="syn-pcard-blurb">{p.blurb}</p>
              <p className="syn-pcard-stack">{p.stack}</p>
            </li>
          ))}
        </ul>
      </section>

      <section data-syn-reveal className="syn-cta" aria-labelledby="syn-h-cta">
        <div className="syn-cta-copy">
          <p className="syn-caps syn-caps-dark">{WORK.ctaButton}</p>
          <h2 id="syn-h-cta" className="syn-cta-h">{WORK.ctaTitle}</h2>
          <p className="syn-cta-p">{WORK.ctaBody}</p>
        </div>
        <SynBadge>Let&rsquo;s talk</SynBadge>
      </section>

      <SynFooter />
    </main>
  );
}
