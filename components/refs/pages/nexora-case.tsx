import Link from "next/link";
import type { ReactNode } from "react";

import "@/components/stageshow/gallery.css";
import { RichText } from "@/components/case/rich-text";
import { DemoFrame } from "@/components/stageshow/demo-frame";
import { CLIENT_DEMOS } from "@/components/stageshow/demos/registry";
import { CASE_STUDIES } from "@/content/case-studies";
import type { CaseBlock } from "@/content/case-studies/types";
import type { CaseSlug } from "@/lib/pages";

import { CLIENT_SCHEMATICS } from "./nexora-rows";
import { caseHref, NxCta, NxPage, NxPageHero, NX } from "./nexora-shell";

function Block({ tag, block }: { tag: string; block: CaseBlock }) {
  return (
    <section className="nx-case-block" aria-label={tag}>
      <div className="nx-case-head" data-nx-sharpen>
        <p className="nx-tag"><span aria-hidden="true" />{tag}</p>
        <h2 className="nx-h2-sm"><RichText value={block.heading} /></h2>
      </div>
      <div className="nx-case-copy" data-nx-sharpen>
        {block.paragraphs.map((p, i) => (
          <p key={i}><RichText value={p} /></p>
        ))}
      </div>
    </section>
  );
}

function NavLink({ side, label, target, href }: { side: "prev" | "next"; label: string; target: string; href: string }) {
  return (
    <Link href={caseHref(href)} className={`nx-case-link nx-case-${side}`}>
      <span>{label}</span>
      <strong>{target}</strong>
    </Link>
  );
}

export function NxCase({ slug }: { slug: CaseSlug }) {
  const study = CASE_STUDIES[slug];
  const Demo = CLIENT_DEMOS[slug];
  const hero: ReactNode = Demo ? (
    <div className="nx-case-demo" data-ss-fill>
      <DemoFrame>
        <Demo />
      </DemoFrame>
    </div>
  ) : (
    <div className="nx-case-demo nx-case-schematic" aria-hidden="true">
      <div className="card-visual">
        <div className="vis-frame">{CLIENT_SCHEMATICS[slug]()}</div>
      </div>
    </div>
  );
  const quote = study.quote;

  return (
    <NxPage>
      <NxPageHero
        current="case"
        chip="Client build"
        title={study.title}
        lede={<RichText value={study.summary} />}
      >
        <ul className="nx-facts-row">
          {study.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <Link href={`${NX}/projects`} className="nx-pill nx-pill-ghost">All projects</Link>
      </NxPageHero>

      <section className="nx-section nx-case-visual" aria-label={`${study.title} demo`}>
        {hero}
      </section>

      <div className="nx-case">
        <Block tag="The problem" block={study.problem} />
        <Block tag="What I built" block={study.built} />
        <Block tag="The outcome" block={study.outcome} />
      </div>

      <section className="nx-section nx-stack" aria-labelledby="nx-stack-h">
        <h2 id="nx-stack-h" className="nx-tag nx-stack-h"><span aria-hidden="true" />Stack</h2>
        <ul>
          {study.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {quote ? (
        <section className="nx-section" aria-label="Client quote">
          <figure className="nx-quote-big" data-nx-sharpen>
            <blockquote>
              <p><RichText value={quote.text} /></p>
            </blockquote>
            <figcaption className="nx-who"><strong>{quote.role}</strong><span>{quote.project}</span></figcaption>
          </figure>
        </section>
      ) : null}

      <nav className="nx-case-nav" aria-label="More case studies">
        <NavLink side="prev" {...study.prev} />
        <NavLink side="next" {...study.next} />
      </nav>

      <NxCta
        id="nx-cta-h"
        title="Have a similar bottleneck?"
        body="Free 30-minute intro call. Written proposal with a fixed price within 48 hours."
        button="Book a free intro call"
        source={study.ctaSource}
      />
    </NxPage>
  );
}
