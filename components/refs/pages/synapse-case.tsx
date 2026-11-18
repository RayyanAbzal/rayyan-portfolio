import Link from "next/link";

import { SynBadge, SynEffects } from "@/components/refs/synapse-client";
import { CASE_STUDIES } from "@/content/case-studies";
import type { CaseBlock } from "@/content/case-studies/types";
import type { CaseSlug } from "@/lib/book";

import { SynFooter, SynPageHero, SynRich, SynVisual, dirHref, hasDemo } from "./synapse-shell";

const BLOCK_LABELS = ["The problem", "What I built", "The outcome"] as const;

function Step({ n, label, block }: { n: number; label: string; block: CaseBlock }) {
  return (
    <li className="syn-case-step" style={{ marginLeft: `${(n - 1) * 5}%` }}>
      <span className="syn-step-n" aria-hidden="true">{n}</span>
      <div className="syn-case-step-main">
        <p className="syn-eyebrow">{label}</p>
        <h2 className="syn-case-step-h"><SynRich value={block.heading} /></h2>
        {block.paragraphs.map((para, i) => (
          <p key={i} className="syn-case-step-p"><SynRich value={para} /></p>
        ))}
      </div>
    </li>
  );
}

export function SynapseCase({ slug }: { slug: CaseSlug }) {
  const study = CASE_STUDIES[slug];
  const demo = hasDemo({ slug });
  return (
    <main id="top" className="ref-root ref-synapse">
      <SynEffects />
      <SynPageHero current="projects" eyebrow="Case study" title={study.title} lede={<SynRich value={study.summary} />}>
        <ul className="syn-chips" aria-label="Facts">
          {study.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <Link href="/designs/synapse/projects" className="syn-link syn-back">All projects</Link>
      </SynPageHero>

      <section data-syn-reveal className="syn-light syn-light-demo" aria-label={`${study.title} visual`}>
        <figure className="syn-demo">
          <div className="syn-demo-box">
            <SynVisual slug={slug} />
          </div>
          <figcaption>{demo ? "Live demo with made-up data." : "Schematic drawing with made-up data."}</figcaption>
        </figure>
      </section>

      <section data-syn-reveal className="syn-panel syn-pad" aria-label="The story">
        <ol className="syn-case-steps">
          <Step n={1} label={BLOCK_LABELS[0]} block={study.problem} />
          <Step n={2} label={BLOCK_LABELS[1]} block={study.built} />
          <Step n={3} label={BLOCK_LABELS[2]} block={study.outcome} />
        </ol>
        <div className="syn-stack">
          <p className="syn-eyebrow">Stack</p>
          <ul className="syn-chips">
            {study.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {study.quote ? (
        <section data-syn-reveal className="syn-panel syn-pad" aria-label="Client quote">
          <figure className="syn-quote">
            <figcaption className="syn-eyebrow">{study.quote.role}, {study.quote.project}</figcaption>
            <blockquote><SynRich value={study.quote.text} /></blockquote>
          </figure>
        </section>
      ) : null}

      <section data-syn-reveal className="syn-cta" aria-labelledby="syn-h-cta">
        <div className="syn-cta-copy">
          <p className="syn-caps syn-caps-dark">Free 30-minute intro call</p>
          <h2 id="syn-h-cta" className="syn-cta-h syn-cta-h-sm">Have a similar bottleneck?</h2>
          <p className="syn-cta-p">Written proposal with a fixed price within 48 hours.</p>
        </div>
        <SynBadge>Let&rsquo;s talk</SynBadge>
      </section>

      <nav className="syn-casenav" aria-label="More case studies">
        <Link href={dirHref(study.prev.href)} className="syn-panel syn-casenav-a">
          <span className="syn-eyebrow">{study.prev.label}</span>
          <span className="syn-casenav-t">{study.prev.target}</span>
        </Link>
        <Link href={dirHref(study.next.href)} className="syn-panel syn-casenav-a syn-casenav-next">
          <span className="syn-eyebrow">{study.next.label}</span>
          <span className="syn-casenav-t">{study.next.target}</span>
        </Link>
      </nav>

      <SynFooter />
    </main>
  );
}
