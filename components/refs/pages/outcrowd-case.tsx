import Link from "next/link";

import { CASE_STUDIES } from "@/content/case-studies";
import type { CaseBlock } from "@/content/case-studies/types";
import { WORK } from "@/content/work";
import type { CaseSlug } from "@/lib/book";

import { OcClientVisual } from "./outcrowd-project";
import { OC, OcCta, OcPage, OcRich, ocHref } from "./outcrowd-shell";

const BLOCKS: readonly { key: "problem" | "built" | "outcome"; label: string }[] = [
  { key: "problem", label: "The problem" },
  { key: "built", label: "What I built" },
  { key: "outcome", label: "The result" },
];

function Block({ label, block, tone }: { label: string; block: CaseBlock; tone: string }) {
  return (
    <article className={`oc-b oc-case-block ${tone}`}>
      <p className="oc-pc-name">{label}</p>
      <h2><OcRich rich={block.heading} /></h2>
      {block.paragraphs.map((p, i) => (
        <p key={i}><OcRich rich={p} /></p>
      ))}
    </article>
  );
}

export function OcCase({ slug }: { slug: CaseSlug }) {
  const study = CASE_STUDIES[slug];
  return (
    <OcPage current="projects">
      <section className="oc-hero oc-page-hero oc-case-hero" aria-labelledby="oc-case-h">
        <div className="oc-beam" aria-hidden="true" />
        <div className="oc-hero-copy">
          <Link href={`${OC}/projects`} className="oc-back">All projects</Link>
          <h1 id="oc-case-h" className="oc-h1"><span className="oc-green">{study.title}</span></h1>
          <p className="oc-lede"><OcRich rich={study.summary} /></p>
          <ul className="oc-facts" aria-label="At a glance">
            {study.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div className="oc-case-visual">
          <OcClientVisual slug={slug} ratio="3 / 2" />
        </div>
      </section>

      <section className="oc-section oc-reveal" aria-label="The story">
        <div className="oc-case-grid">
          <Block label={BLOCKS[0].label} block={study.problem} tone="" />
          <Block label={BLOCKS[1].label} block={study.built} tone="" />
          <Block label={BLOCKS[2].label} block={study.outcome} tone="oc-b-green" />
        </div>
      </section>

      <section className="oc-section oc-reveal" aria-labelledby="oc-stack-h">
        <h2 id="oc-stack-h" className="oc-h2">Built with</h2>
        <ul className="oc-stack">
          {study.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {study.quote ? (
        <section className="oc-section oc-reveal" aria-label="Client words">
          <figure className="oc-b oc-b-chat oc-case-quote">
            <blockquote className="oc-bubble"><OcRich rich={study.quote.text} /></blockquote>
            <figcaption>{study.quote.role}, {study.quote.project}</figcaption>
          </figure>
        </section>
      ) : null}

      <nav className="oc-pn" aria-label="More case studies">
        <Link href={ocHref(study.prev.href.startsWith("/work/") ? study.prev.href : "/work")}>
          <span>Previous</span>
          {study.prev.href.startsWith("/work/") ? study.prev.target : "All projects"}
        </Link>
        <Link href={ocHref(study.next.href)}>
          <span>Next</span>
          {study.next.target}
        </Link>
      </nav>

      <OcCta id="oc-case-cta" title={WORK.ctaTitle} body={WORK.ctaBody} label={WORK.ctaButton} source={study.ctaSource} />
    </OcPage>
  );
}
