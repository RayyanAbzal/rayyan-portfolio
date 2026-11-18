import Link from "next/link";

import { BookLink } from "@/components/book-link";
import { SES_BASE, SesFrame, SesRich } from "@/components/refs/pages/ses-chrome";
import { SesSheet, type SheetRow } from "@/components/refs/pages/ses-sheet";
import { SesClientVisual } from "@/components/refs/pages/ses-visual";
import { CASE_STUDIES } from "@/content/case-studies";
import type { CaseBlock } from "@/content/case-studies/types";
import { CLIENT_PROJECTS } from "@/content/projects";
import { WORK } from "@/content/work";
import type { CaseSlug } from "@/lib/pages";

const FACT_LABELS = ["Client", "Scope", "Timeline", "Status"] as const;

function slugOf(href: string): string {
  return href.split("/").pop() ?? "";
}

export function SesCase({ slug }: { slug: CaseSlug }) {
  const study = CASE_STUDIES[slug];
  const project = CLIENT_PROJECTS.find((p) => p.slug === slug);
  const rows: SheetRow[] = [
    ...study.facts.slice(0, FACT_LABELS.length).map((fact, i) => ({
      key: FACT_LABELS[i] ?? String(i),
      label: FACT_LABELS[i] ?? "",
      value: fact,
    })),
    { key: "stack", label: "Stack", value: study.stack.join(", ") },
  ];
  const steps: { label: string; block: CaseBlock }[] = [
    { label: "The problem", block: study.problem },
    { label: "What I built", block: study.built },
    { label: "The outcome", block: study.outcome },
  ];

  return (
    <SesFrame current="projects">
      <section className="pg-hero wrap" aria-labelledby="case-h1">
        <nav aria-label="Breadcrumb">
          <ol className="crumb">
            <li>
              <Link href={`${SES_BASE}/projects`}>Projects</Link>
            </li>
            <li aria-current="page">{study.title}</li>
          </ol>
        </nav>
        <h1 id="case-h1" className="pg-h">
          {project?.title ?? study.title}
        </h1>
        <p className="pg-lede">
          <SesRich value={study.summary} />
        </p>
        <figure className="case-fig">
          <div className="case-stage">
            <SesClientVisual slug={slug} inert={false} />
          </div>
          <figcaption>Product visual with made-up data, not a client screenshot.</figcaption>
        </figure>
      </section>

      <section className="wrap" data-sharp aria-labelledby="case-facts">
        <h2 id="case-facts" className="sr-only">
          {study.title} facts
        </h2>
        <SesSheet rows={rows} className="case-sheet" />
      </section>

      <section className="flow wrap" data-sharp aria-labelledby="case-story">
        <p className="ses-eyebrow">The story</p>
        <h2 id="case-story" className="sec-h">
          From problem to outcome.
        </h2>
        <ol className="pipe pipe-3">
          {steps.map((step, i) => (
            <li key={step.label} className="pipe-step">
              <div className="pipe-node">
                <span className="pipe-label">{step.label}</span>
                <span className="diamond" aria-hidden="true" />
                <span className="drop" aria-hidden="true" />
              </div>
              <div className="pipe-card">
                <span className="pipe-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="pipe-title">
                  <SesRich value={step.block.heading} />
                </h3>
                {step.block.paragraphs.map((para, j) => (
                  <p key={j} className="pipe-body">
                    <SesRich value={para} />
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {study.quote ? (
        <section className="band-wrap wrap" data-sharp aria-labelledby="case-quote">
          <h2 id="case-quote" className="sr-only">
            Client words
          </h2>
          <figure className="band case-quote">
            <blockquote>
              <p className="band-text">
                <SesRich value={study.quote.text} />
              </p>
            </blockquote>
            <figcaption>
              {study.quote.role}, {study.quote.project}
            </figcaption>
          </figure>
        </section>
      ) : null}

      <section className="wrap" data-sharp aria-label="More projects">
        <div className="hop">
          <Link href={`${SES_BASE}/case/${slugOf(study.prev.href)}`}>
            <span className="hop-k">{study.prev.label}</span>
            <span className="hop-t">{study.prev.target}</span>
          </Link>
          <Link href={`${SES_BASE}/case/${slugOf(study.next.href)}`}>
            <span className="hop-k">{study.next.label}</span>
            <span className="hop-t">{study.next.target}</span>
          </Link>
        </div>
      </section>

      <section className="close wrap" data-sharp aria-labelledby="case-cta">
        <h2 id="case-cta" className="close-h">
          {WORK.ctaTitle}
        </h2>
        <BookLink source={study.ctaSource} className="sp sp-ink sp-lg">
          {WORK.ctaButton}
        </BookLink>
      </section>
    </SesFrame>
  );
}
