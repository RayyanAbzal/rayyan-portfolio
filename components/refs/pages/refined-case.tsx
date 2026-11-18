import Link from "next/link";

import { CASE_STUDIES } from "@/content/case-studies";
import type { CaseBlock } from "@/content/case-studies/types";
import { HOME } from "@/content/home";
import { CLIENT_PROJECTS } from "@/content/projects";
import type { CaseSlug } from "@/lib/book";

import {
  Arrow,
  BASE,
  ClientVisual,
  RefinedCta,
  RefinedRich,
  RefinedShell,
  SectionHead,
  plain,
  toDirection,
} from "./refined-chrome";

function Block({ n, block }: { n: string; block: CaseBlock }) {
  return (
    <section className="rf-sec rf-block" aria-label={plain(block.heading)}>
      <span className="rf-chip rf-block-n" aria-hidden="true">{n}</span>
      <div className="rf-block-body">
        <h2>
          <RefinedRich value={block.heading} />
        </h2>
        {block.paragraphs.map((p, i) => (
          <p key={i}>
            <RefinedRich value={p} />
          </p>
        ))}
      </div>
    </section>
  );
}

export function RefinedCase({ slug }: { slug: CaseSlug }) {
  const study = CASE_STUDIES[slug];
  const project = CLIENT_PROJECTS.find((p) => p.slug === slug);

  return (
    <RefinedShell current="projects">
      <section className="rf-hero rf-page-hero rf-case-hero" aria-labelledby="rf-h1">
        <Link href={`${BASE}/projects`} className="rf-back">
          <span className="rf-back-arrow" aria-hidden="true"><Arrow /></span>
          Projects
        </Link>
        <h1 id="rf-h1">
          <span className="rf-dim">{project?.name ?? study.title}</span>
          <span>{project?.title ?? plain(study.summary)}</span>
        </h1>
        <p>
          <RefinedRich value={study.summary} />
        </p>
        <ul className="rf-facts-row" aria-label="Project facts">
          {study.facts.map((f) => (
            <li key={f} className="rf-tag">{f}</li>
          ))}
        </ul>
      </section>

      <div className="rf-case-visual">
        <ClientVisual slug={slug} interactive />
      </div>

      <Block n="01" block={study.problem} />
      <Block n="02" block={study.built} />
      <Block n="03" block={study.outcome} />

      <section className="rf-sec" aria-labelledby="rf-stack">
        <SectionHead id="rf-stack" title="Built with" count={study.stack.length} />
        <ul className="rf-stack">
          {study.stack.map((s) => (
            <li key={s} className="rf-tag">{s}</li>
          ))}
        </ul>
      </section>

      {study.quote ? (
        <section className="rf-sec" aria-label="Client quote">
          <figure className="rf-quote rf-quote-lead">
            <blockquote>
              <RefinedRich value={study.quote.text} />
            </blockquote>
            <figcaption className="rf-who">
              <strong>{study.quote.role}</strong>
              <span>{study.quote.project}</span>
            </figcaption>
          </figure>
        </section>
      ) : null}

      <nav className="rf-sec rf-pager" aria-label="More projects">
        {[study.prev, study.next].map((l, i) => (
          <Link key={l.href} href={toDirection(l.href)} className="rf-pager-link" data-dir={i === 0 ? "prev" : "next"}>
            <span className="rf-pager-label">{l.label}</span>
            <span className="rf-pager-target">{l.target}</span>
          </Link>
        ))}
      </nav>

      <RefinedCta
        title="Want something like this?"
        body={HOME.ctaBody}
        button={HOME.ctaButton}
        source={study.ctaSource}
      />
    </RefinedShell>
  );
}
