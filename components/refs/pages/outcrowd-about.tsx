import { ABOUT, ABOUT_SIDE_CARDS, FAQ_ITEMS, PRINCIPLES, PROCESS_STEPS, TESTIMONIALS } from "@/content/about";

import { OcCta, OcPage, OcPageHero, OcRich } from "./outcrowd-shell";

const THREAD_CARDS = ABOUT_SIDE_CARDS.filter((c) => c.label !== "Work");

export function OcAbout() {
  return (
    <OcPage current="about">
      <OcPageHero id="oc-about-h" title={ABOUT.h1} lede={ABOUT.big}>
        <p className="oc-role">{ABOUT.role}</p>
      </OcPageHero>

      <section className="oc-wide oc-wide-tall oc-reveal" aria-label="The story">
        <div className="oc-wide-copy oc-story">
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i}><OcRich rich={p} /></p>
          ))}
        </div>
        <ul className="oc-threads oc-threads-facts" aria-label="Quick facts">
          {THREAD_CARDS.map((c) => (
            <li key={c.label}>
              <span>
                <small>{c.label}</small>
                {c.title}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="oc-section oc-reveal" aria-labelledby="oc-principles-h">
        <h2 id="oc-principles-h" className="oc-h2">{ABOUT.principlesHeading}</h2>
        <p className="oc-sub">{ABOUT.principlesIntro}</p>
        <ul className="oc-tiles oc-tiles-long">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} tabIndex={0} className={i === 1 ? "oc-tile oc-tile-solid" : "oc-tile"}>
              <span className="oc-icon" aria-hidden="true">{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="oc-section oc-reveal" aria-labelledby="oc-process-h">
        <h2 id="oc-process-h" className="oc-h2">{ABOUT.processHeading}</h2>
        <p className="oc-sub">{ABOUT.processLede}</p>
        <ol className="oc-steps">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="oc-step-n" aria-hidden="true">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <p className="oc-chip-tag">{s.when}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="oc-section oc-reveal" aria-labelledby="oc-says-h">
        <h2 id="oc-says-h" className="oc-h2">{ABOUT.testimonialsHeading}</h2>
        <div className="oc-quotes">
          {TESTIMONIALS.map((t) => (
            <figure key={t.project} className="oc-b oc-b-chat">
              <blockquote className="oc-bubble">{t.quote}</blockquote>
              <figcaption>{t.role}, {t.project}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="oc-section oc-reveal" aria-labelledby="oc-faq-h">
        <h2 id="oc-faq-h" className="oc-h2">{ABOUT.faqHeading}</h2>
        <div className="oc-faq">
          {FAQ_ITEMS.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <OcCta id="oc-about-cta" title={ABOUT.ctaTitle} body={ABOUT.ctaBody} label={ABOUT.ctaButton} />
    </OcPage>
  );
}
