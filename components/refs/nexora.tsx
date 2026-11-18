import Link from "next/link";

import "@/app/styles/refs/nexora.css";
import { BookLink } from "@/components/book-link";
import { NexoraCount, NexoraFeatures, NexoraFx } from "@/components/refs/nexora-client";
import { NxClientRow } from "@/components/refs/pages/nexora-rows";
import { caseHref, NX, NxFooter, NxNav, NxSplit } from "@/components/refs/pages/nexora-shell";
import { TESTIMONIALS } from "@/content/about";
import { HARNESS, HARNESS_STATS } from "@/content/harness";
import { HOME, OFFERS } from "@/content/home";
import { SECTION_LABELS } from "@/content/home-novelty";
import { CLIENT_PROJECTS } from "@/content/projects";

const HERO_TEXT = HOME.heroHeadline.map((part) => (typeof part === "string" ? part : "mark" in part ? part.mark : "")).join("");
const CTA_TEXT = HOME.ctaTitle.map((part) => (typeof part === "string" ? part : "nowrap" in part ? part.nowrap : "")).join("");

/** The three client builds the home teaches; every card lives on the projects page. */
const TOP_PROJECTS = CLIENT_PROJECTS.slice(0, 3);

interface Feature {
  title: string;
  body: string;
  href: string;
  label: string;
}

const FEATURES: readonly Feature[] = [
  ...OFFERS.map((o) => ({ title: o.title, body: o.body, href: caseHref(o.linkHref), label: o.linkLabel })),
  { title: HARNESS.drawingHeading, body: HARNESS.description, href: "/harness", label: "How I build" },
];

export function DesignNexora() {
  const [lead, ...rest] = HOME.aboutBig.split(". ");
  return (
    <main id="top" className="ref-root ref-nexora">
      <NexoraFx />
      <section className="nx-hero" aria-labelledby="nx-h1" data-nx-aurora>
        <NxNav current="home" />
        <div className="nx-hero-copy">
          <p className="nx-chip">AI consultant, Auckland</p>
          <h1 id="nx-h1">{HERO_TEXT}</h1>
          <p className="nx-lede">{HOME.heroLede}</p>
          <div className="nx-actions">
            <BookLink source="design_preview" className="nx-pill nx-pill-solid">Book a call</BookLink>
            <Link href={`${NX}/projects`} className="nx-pill nx-pill-ghost">See the work</Link>
          </div>
        </div>
        <div className="nx-built">
          <p>Built for</p>
          <div className="nx-track">
            <ul className="nx-marquee">
              {[0, 1].map((copy) => (
                <li key={copy} aria-hidden={copy === 1 ? true : undefined} className="nx-marquee-set">
                  <ul>
                    {CLIENT_PROJECTS.map((p) => (
                      <li key={p.slug}>{p.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="nx-statement" aria-label="In numbers">
        <h2 data-nx-sharpen>
          <span>{lead}.</span> <em>{rest.join(". ")}</em>
        </h2>
        <ul className="nx-stats">
          {HARNESS_STATS.slice(0, 3).map((s) => (
            <li key={s.value}>
              <NexoraCount value={s.value} />
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
        <p className="nx-statement-p" data-nx-sharpen>{HOME.aboutParagraphs[0]}</p>
      </section>

      <section className="nx-section" aria-labelledby="nx-services">
        <NxSplit id="nx-services" tag="What I build" title={HOME.servicesTitle} body={HOME.servicesLede} />
        <NexoraFeatures items={FEATURES} />
      </section>

      <section className="nx-section" aria-labelledby="nx-work">
        <NxSplit id="nx-work" tag="Client work" title="Selected client builds." body={HOME.workLede} />
        <ul className="nx-rows">
          {TOP_PROJECTS.map((p) => (
            <NxClientRow key={p.slug} project={p} />
          ))}
        </ul>
        <p className="nx-more">
          <Link href={`${NX}/projects`} className="nx-pill nx-pill-ink">All projects</Link>
        </p>
      </section>

      <section className="nx-section" aria-labelledby="nx-words">
        <NxSplit id="nx-words" tag={SECTION_LABELS.words} title="What clients say." />
        <figure className="nx-quote-big" data-nx-sharpen>
          <blockquote>
            <p>{TESTIMONIALS[0].quote}</p>
          </blockquote>
          <figcaption className="nx-who"><strong>{TESTIMONIALS[0].role}</strong><span>{TESTIMONIALS[0].project}</span></figcaption>
        </figure>
      </section>

      <section className="nx-cta" aria-labelledby="nx-cta-h" data-nx-aurora>
        <h2 id="nx-cta-h">{CTA_TEXT}</h2>
        <p>{HOME.ctaBody}</p>
        <div className="nx-actions">
          <BookLink source="design_preview" className="nx-pill nx-pill-solid">{HOME.ctaButton}</BookLink>
          <Link href={`${NX}/contact`} className="nx-pill nx-pill-ghost">Contact</Link>
        </div>
      </section>

      <NxFooter />
    </main>
  );
}
