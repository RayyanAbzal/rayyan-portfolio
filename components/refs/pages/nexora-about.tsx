import { RichText } from "@/components/case/rich-text";
import { NexoraFaq } from "@/components/refs/nexora-client";
import {
  ABOUT,
  ABOUT_SIDE_CARDS,
  FAQ_ITEMS,
  PRINCIPLES,
  PROCESS_STEPS,
  TESTIMONIALS,
} from "@/content/about";
import Link from "next/link";

import { caseHref, NxCta, NxPage, NxPageHero, NxSplit } from "./nexora-shell";

// The projects page already carries the work, so that fact card is left out.
const FACTS = ABOUT_SIDE_CARDS.filter((c) => c.label !== "Work");

export function NxAbout() {
  return (
    <NxPage>
      <NxPageHero current="about" chip="About" title={ABOUT.h1} lede={ABOUT.big} />

      <section className="nx-section nx-story" aria-labelledby="nx-story-h">
        <div className="nx-story-copy" data-nx-sharpen>
          <p className="nx-tag"><span aria-hidden="true" />Story</p>
          <h2 id="nx-story-h" className="nx-h2-sm">Who you work with.</h2>
          <p className="nx-role">{ABOUT.role}</p>
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i}><RichText value={p} /></p>
          ))}
        </div>
        <ul className="nx-facts" data-nx-sharpen>
          {FACTS.map((f) => (
            <li key={f.label}>
              <span>{f.label}</span>
              <strong>{f.title}</strong>
              <p><RichText value={f.body} /></p>
            </li>
          ))}
        </ul>
      </section>

      <section className="nx-section" aria-labelledby="nx-prin-h">
        <NxSplit id="nx-prin-h" tag="Principles" title={ABOUT.principlesHeading} body={ABOUT.principlesIntro} />
        <ul className="nx-prin-list">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="nx-prin">
              <span className="nx-prin-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="nx-section" aria-labelledby="nx-proc-h">
        <NxSplit id="nx-proc-h" tag="Process" title={ABOUT.processHeading} body={ABOUT.processLede} />
        <ol className="nx-steps" data-nx-sharpen>
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="nx-step-n" aria-hidden="true">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="nx-when">{s.when}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="nx-section" aria-labelledby="nx-words-h">
        <NxSplit id="nx-words-h" tag="Client words" title={ABOUT.testimonialsHeading} />
        <ul className="nx-quotes" data-nx-sharpen>
          {TESTIMONIALS.slice(1).map((t) => (
            <li key={t.project}>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <p className="nx-who">
                <strong>{t.role}</strong>
                <span>{t.project}</span>
                <Link href={caseHref(t.linkHref)} className="nx-text-link">Read the case: {t.linkLabel}</Link>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="nx-section nx-faq" aria-labelledby="nx-faq-h" data-nx-sharpen>
        <div>
          <p className="nx-tag"><span aria-hidden="true" />FAQ</p>
          <h2 id="nx-faq-h">{ABOUT.faqHeading}</h2>
        </div>
        <NexoraFaq items={FAQ_ITEMS} />
      </section>

      <NxCta id="nx-cta-h" title={ABOUT.ctaTitle} body={ABOUT.ctaBody} button={ABOUT.ctaButton} source="about_contact" />
    </NxPage>
  );
}
