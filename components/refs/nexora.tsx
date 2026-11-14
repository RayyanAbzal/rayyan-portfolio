import Link from "next/link";

import "@/app/styles/refs/nexora.css";
import { BookLink } from "@/components/book-link";
import { NexoraCount, NexoraFaq, NexoraFeatures, NexoraFx, NexoraProject } from "@/components/refs/nexora-client";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { FAQ_ITEMS, TESTIMONIALS } from "@/content/about";
import { HARNESS, HARNESS_STATS } from "@/content/harness";
import { HOME, OFFERS } from "@/content/home";
import { SECTION_LABELS } from "@/content/home-novelty";
import { CLIENT_PROJECTS } from "@/content/projects";
import { EMAIL } from "@/lib/site";

const HERO_TEXT = HOME.heroHeadline.map((part) => (typeof part === "string" ? part : "mark" in part ? part.mark : "")).join("");
const CTA_TEXT = HOME.ctaTitle.map((part) => (typeof part === "string" ? part : "nowrap" in part ? part.nowrap : "")).join("");

const SCHEMATICS: Record<string, () => React.JSX.Element> = {
  influence: InfluenceSchematic,
  feedhack: FeedhackSchematic,
  pumpdat: PumpdatSchematic,
  "influence-v2": InfluenceV2Schematic,
};

interface Feature {
  title: string;
  body: string;
  href: string;
  label: string;
}

const FEATURES: readonly Feature[] = [
  ...OFFERS.map((o) => ({ title: o.title, body: o.body, href: o.linkHref, label: o.linkLabel })),
  { title: HARNESS.drawingHeading, body: HARNESS.description, href: "/harness", label: "How I build" },
];

const NAV = [
  { label: "Projects", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Harness", href: "/harness" },
] as const;

function Split({ tag, title, body, id }: { tag: string; title: string; body: string; id: string }) {
  return (
    <div className="nx-split" data-nx-sharpen>
      <div>
        <p className="nx-tag"><span aria-hidden="true" />{tag}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <p className="nx-split-body">{body}</p>
    </div>
  );
}

export function DesignNexora() {
  const [lead, ...rest] = HOME.aboutBig.split(". ");
  return (
    <main id="top" className="ref-root ref-nexora">
      <NexoraFx />
      <section className="nx-hero" aria-labelledby="nx-h1" data-nx-aurora>
        <header className="nx-nav">
          <Link href="/" className="nx-name">Rayyan Abzal</Link>
          <nav aria-label="Primary">
            <ul>
              {NAV.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
            </ul>
          </nav>
          <BookLink source="design_preview" className="nx-pill nx-pill-solid nx-nav-book">Book a call</BookLink>
        </header>
        <div className="nx-hero-copy">
          <p className="nx-chip">AI consultant, Auckland</p>
          <h1 id="nx-h1">{HERO_TEXT}</h1>
          <p className="nx-lede">{HOME.heroLede}</p>
          <div className="nx-actions">
            <BookLink source="design_preview" className="nx-pill nx-pill-solid">Book a call</BookLink>
            <Link href="/work" className="nx-pill nx-pill-ghost">See the work</Link>
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
        <Split id="nx-services" tag="What I build" title={HOME.servicesTitle} body={HOME.servicesLede} />
        <NexoraFeatures items={FEATURES} />
      </section>

      <section className="nx-section" aria-labelledby="nx-work">
        <Split id="nx-work" tag="Client work" title={HOME.workTitle} body={HOME.workLede} />
        <ul className="nx-work">
          {CLIENT_PROJECTS.map((p) => {
            const Schematic = SCHEMATICS[p.slug];
            return (
              <NexoraProject key={p.slug}>
                <div className="card-visual" aria-hidden="true">
                  <div className="vis-frame">{Schematic ? <Schematic /> : null}</div>
                </div>
                <div className="nx-proj-body">
                  <p className="nx-proj-name">{p.name}</p>
                  <h3><Link href={`/work/${p.slug}`}>{p.title}</Link></h3>
                  <p>{p.blurb}</p>
                  <p className="nx-outcome">{p.outcome}</p>
                </div>
              </NexoraProject>
            );
          })}
        </ul>
      </section>

      <section className="nx-section" aria-labelledby="nx-words">
        <Split id="nx-words" tag={SECTION_LABELS.words} title="What clients say." body={SECTION_LABELS.offersNote} />
        <ul className="nx-quotes" data-nx-sharpen>
          {TESTIMONIALS.map((t) => (
            <li key={t.project}>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <p className="nx-who"><strong>{t.role}</strong><span>{t.project}</span></p>
            </li>
          ))}
        </ul>
      </section>

      <section className="nx-section nx-faq" aria-labelledby="nx-faq-h" data-nx-sharpen>
        <div>
          <p className="nx-tag"><span aria-hidden="true" />FAQ</p>
          <h2 id="nx-faq-h">Common questions.</h2>
        </div>
        <NexoraFaq items={FAQ_ITEMS} />
      </section>

      <section className="nx-cta" aria-labelledby="nx-cta-h" data-nx-aurora>
        <h2 id="nx-cta-h">{CTA_TEXT}</h2>
        <p>{HOME.ctaBody}</p>
        <div className="nx-actions">
          <BookLink source="design_preview" className="nx-pill nx-pill-solid">{HOME.ctaButton}</BookLink>
          <a href={`mailto:${EMAIL}`} className="nx-pill nx-pill-ghost">Email me</a>
        </div>
      </section>

      <footer className="nx-footer">
        <Link href="/" className="nx-name">Rayyan Abzal</Link>
        <ul>
          {NAV.map((n) => (
            <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
          ))}
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/privacy">Privacy</Link></li>
        </ul>
      </footer>
    </main>
  );
}
