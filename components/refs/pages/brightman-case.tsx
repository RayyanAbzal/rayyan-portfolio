import Link from "next/link";

import { TiltCard } from "@/components/refs/brightman-client";
import { CASE_STUDIES } from "@/content/case-studies";
import { CLIENT_PROJECTS } from "@/content/projects";
import { WORK } from "@/content/work";
import type { CaseSlug } from "@/lib/book";

import { BASE, BmCta, BmPage, BmVisual, idx, localHref, plainRich, renderRich, visualNote } from "./brightman-shared";

const FACT_LABELS = ["Client", "Build", "Timeline", "Status"] as const;

function isHome(href: string): boolean {
  return href === "/#work";
}

export function BrightmanCase({ slug }: { slug: CaseSlug }) {
  const study = CASE_STUDIES[slug];
  const project = CLIENT_PROJECTS.find((p) => p.slug === slug);
  const source = { slug } as const;
  const blocks = [study.problem, study.built, study.outcome];
  const labels = ["The problem", "What I built", "The outcome"];

  return (
    <BmPage current="projects">
      <section className="bm-hero bm-page-hero" aria-labelledby="bm-h1">
        <Link href={`${BASE}/projects`} className="bm-back">
          <span aria-hidden="true">&larr;</span> All projects
        </Link>
        <div className="bm-headline">
          <p className="bm-case-name" data-rv>{project?.name ?? study.title}</p>
          <h1 id="bm-h1" className="bm-h1 bm-h1-page" data-rv>{project?.title ?? study.title}</h1>
        </div>
        <div className="bm-intro">
          <p className="bm-intro-text">{renderRich(study.summary)}</p>
        </div>
      </section>

      <figure className="bm-hero-visual" data-rv>
        <BmVisual source={source} hero />
        <figcaption>{visualNote(source)}</figcaption>
      </figure>

      <section className="bm-stats bm-facts" data-rv aria-label="At a glance">
        <ul>
          {study.facts.map((f, i) => (
            <li key={f} data-rv>
              <span className="bm-fact-label">{FACT_LABELS[i]}</span>
              <span className="bm-fact-value">{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bm-section" aria-label="The story">
        <div className="bm-bento bm-bento-case">
          {blocks.map((b, i) => (
            <TiltCard key={labels[i]} className={`bm-card bm-card-${i} bm-case-card`}>
              <span className="bm-index">{idx(i + 1)} {labels[i]}</span>
              <h2>{renderRich(b.heading)}</h2>
              {b.paragraphs.map((p) => (
                <p key={plainRich(p)}>{renderRich(p)}</p>
              ))}
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="bm-section bm-stack-section" aria-labelledby="bm-stack-h">
        <h2 id="bm-stack-h" className="bm-eyebrow" data-rv>Built with</h2>
        <ul className="bm-tags bm-tags-lg" data-rv>
          {study.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {study.quote ? (
        <section className="bm-blob-section bm-blob-short" aria-label="Client words">
          <div className="bm-blob" aria-hidden="true" />
          <figure className="bm-blob-copy bm-quote-fig" data-rv>
            <blockquote>
              <p className="bm-blob-text bm-blob-quote">{renderRich(study.quote.text)}</p>
            </blockquote>
            <figcaption className="bm-quote-by">
              <strong>{study.quote.role}</strong>
              <span>{study.quote.project}</span>
            </figcaption>
          </figure>
        </section>
      ) : null}

      <nav className="bm-casenav" aria-label="More projects" data-rv>
        {[study.prev, study.next].map((l, i) => (
          <Link key={l.target} href={localHref(l.href)} className="bm-casenav-link">
            <span className="bm-casenav-label">{isHome(l.href) ? "Back to" : i === 0 ? "Previous" : "Next"}</span>
            <span className="bm-casenav-target">{l.target}</span>
          </Link>
        ))}
      </nav>

      <BmCta title={WORK.ctaTitle} body={WORK.ctaBody} source={study.ctaSource} />
    </BmPage>
  );
}
