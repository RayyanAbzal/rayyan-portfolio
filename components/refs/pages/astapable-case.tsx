import Link from "next/link";

import { RichText } from "@/components/case/rich-text";
import { CASE_STUDIES } from "@/content/case-studies";
import type { CaseBlock } from "@/content/case-studies/types";
import { WORK } from "@/content/work";
import type { CaseSlug } from "@/lib/pages";

import { ClientVisual } from "./astapable-cards";
import { Arrow, AsClosing, AsShell, BASE, dirHref } from "./astapable-shell";

function Block({ block, label }: { block: CaseBlock; label: string }) {
  return (
    <section className="as-block" aria-label={label}>
      <h2 className="as-block-title as-sharp">
        <RichText value={block.heading} />
      </h2>
      <div className="as-block-body as-sharp">
        {block.paragraphs.map((p, i) => (
          <p key={i}>
            <RichText value={p} />
          </p>
        ))}
      </div>
    </section>
  );
}

function Neighbour({ href, label, target, dir }: { href: string; label: string; target: string; dir: "prev" | "next" }) {
  return (
    <Link href={dirHref(href)} className={`as-nb as-nb-${dir}`}>
      <span className="as-nb-label">{label}</span>
      <span className="as-nb-name">{target}</span>
      <span className="as-go" aria-hidden="true">
        <Arrow />
      </span>
    </Link>
  );
}

export function AstapableCase({ slug }: { slug: CaseSlug }) {
  const study = CASE_STUDIES[slug];
  const prevIsCase = study.prev.href.startsWith("/work/");
  return (
    <AsShell current="projects">
      <article aria-labelledby="as-case-h1">
        <section className="as-case-head">
          <Link href={`${BASE}/projects`} className="as-back">
            <span aria-hidden="true">&larr;</span> All projects
          </Link>
          <ul className="as-tags as-tags-center" aria-label="Project facts">
            {study.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <h1 id="as-case-h1" className="as-sharp">
            {study.title}
          </h1>
          <p className="as-case-sum as-sharp">
            <RichText value={study.summary} />
          </p>
        </section>

        <div className="as-case-stage" data-ss-fill="">
          <ClientVisual slug={slug} />
        </div>

        <div className="as-case-body">
          <Block block={study.problem} label="The problem" />
          <Block block={study.built} label="What I built" />
          <Block block={study.outcome} label="The outcome" />
        </div>

        {study.quote ? (
          <figure className="as-quote as-sharp">
            <blockquote>
              <p>
                <RichText value={study.quote.text} />
              </p>
            </blockquote>
            <figcaption>
              {study.quote.role}, {study.quote.project}
            </figcaption>
          </figure>
        ) : null}

        <section className="as-stackrow" aria-labelledby="as-stack-h">
          <h2 id="as-stack-h" className="as-title as-sharp">
            Built with
          </h2>
          <ul className="as-tags as-tags-center as-sharp">
            {study.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      </article>

      <nav className="as-neighbours" aria-label="More projects">
        {prevIsCase ? (
          <Neighbour dir="prev" href={study.prev.href} target={study.prev.target} label="Previous" />
        ) : (
          <Neighbour dir="prev" href="/work" target="All projects" label="Back to" />
        )}
        <Neighbour dir="next" href={study.next.href} target={study.next.target} label="Next" />
      </nav>

      <AsClosing id="as-case-cta" title={WORK.ctaTitle} body={WORK.ctaBody} source={study.ctaSource} />
    </AsShell>
  );
}
