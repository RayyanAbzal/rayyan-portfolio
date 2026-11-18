import { BookBadge } from "@/components/book-badge";
import { LeanMarquee, Magnetic, TiltCard } from "@/components/refs/brightman-client";
import { ABOUT, ABOUT_SIDE_CARDS, FAQ_ITEMS, PRINCIPLES, PROCESS_STEPS, TESTIMONIALS } from "@/content/about";

import { BmCta, BmPage, idx, localHref, renderRich } from "./brightman-shared";
import Link from "next/link";

export function BrightmanAbout() {
  return (
    <BmPage current="about">
      <section className="bm-hero bm-page-hero" aria-labelledby="bm-h1">
        <div className="bm-headline">
          <h1 id="bm-h1" className="bm-h1 bm-h1-page" data-rv>{ABOUT.h1}</h1>
        </div>
        <div className="bm-intro bm-intro-copy">
          <div className="bm-intro-stack">
            <p className="bm-role">{ABOUT.role}</p>
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="bm-intro-para">{renderRich(p)}</p>
            ))}
          </div>
          <Magnetic strength={0.4}><BookBadge source="contact_badge" label="Book a free call" /></Magnetic>
        </div>
      </section>

      <section className="bm-stats bm-facts" data-rv aria-label="At a glance">
        <ul>
          {ABOUT_SIDE_CARDS.map((c) => (
            <li key={c.label} data-rv>
              <span className="bm-fact-label">{c.label}</span>
              <span className="bm-fact-value">{c.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bm-blob-section bm-blob-short" aria-label="In short">
        <div className="bm-blob" aria-hidden="true" />
        <div className="bm-blob-copy" data-rv>
          <p className="bm-blob-text">{ABOUT.big}</p>
        </div>
      </section>

      <section className="bm-section" aria-labelledby="bm-principles">
        <div className="bm-sec-head" data-rv>
          <h2 id="bm-principles" className="bm-big-h bm-big-h-md">{ABOUT.principlesHeading}</h2>
          <p>{ABOUT.principlesIntro}</p>
        </div>
        <div className="bm-bento bm-bento-principles">
          {PRINCIPLES.map((p, i) => (
            <TiltCard key={p.title} className={`bm-card bm-card-${i} bm-principle`}>
              <span className="bm-index">{idx(i + 1)}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      <LeanMarquee text="How I work" small />

      <section className="bm-section" aria-labelledby="bm-process">
        <div className="bm-sec-head" data-rv>
          <h2 id="bm-process" className="bm-big-h bm-big-h-md">{ABOUT.processHeading}</h2>
          <p>{ABOUT.processLede}</p>
        </div>
        <ol className="bm-steps">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="bm-step" data-rv>
              <span className="bm-index">{idx(i + 1)}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="bm-when">{s.when}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bm-section bm-quotes-section" aria-labelledby="bm-quotes">
        <h2 id="bm-quotes" className="bm-big-h bm-big-h-md" data-rv>{ABOUT.testimonialsHeading}</h2>
        <ul className="bm-quotes">
          {TESTIMONIALS.map((t) => (
            <li key={t.project} className="bm-quote" data-rv>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <p className="bm-quote-by">
                <strong>{t.role}</strong>
                <span>{t.project}</span>
              </p>
              <Link href={localHref(t.linkHref)} className="bm-quote-link">Read the {t.linkLabel} case study</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bm-section" aria-labelledby="bm-faq">
        <h2 id="bm-faq" className="bm-big-h bm-big-h-md" data-rv>{ABOUT.faqHeading}</h2>
        <div className="bm-faq" data-rv>
          {FAQ_ITEMS.map((f) => (
            <details key={f.question} className="bm-faq-item">
              <summary>
                <span>{f.question}</span>
                <span className="bm-faq-plus" aria-hidden="true" />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <BmCta title={ABOUT.ctaTitle} body={ABOUT.ctaBody} source="about_contact" />
    </BmPage>
  );
}
