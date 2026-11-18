import Link from "next/link";

import {
  ABOUT,
  ABOUT_SIDE_CARDS,
  FAQ_ITEMS,
  PRINCIPLES,
  PROCESS_STEPS,
  TESTIMONIALS,
} from "@/content/about";

import { Arrow, AsClosing, AsRich, AsShell, dirHref } from "./astapable-shell";

export function AstapableAbout() {
  const [lead, ...rest] = TESTIMONIALS;
  return (
    <AsShell current="about">
      <section className="as-pagehead" aria-labelledby="as-about-h1">
        <p className="as-eyebrow as-sharp">{ABOUT.role}</p>
        <h1 id="as-about-h1" className="as-sharp">
          {ABOUT.h1}
        </h1>
        <p className="as-lede as-sharp">{ABOUT.big}</p>
      </section>

      <section className="as-story" aria-label="Who I am">
        <div className="as-story-copy as-sharp">
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i}>
              <AsRich value={p} />
            </p>
          ))}
        </div>
        <ul className="as-facts">
          {ABOUT_SIDE_CARDS.map((c) => (
            <li key={c.label} className="as-fact as-sharp">
              <span className="as-fact-label">{c.label}</span>
              <h3>{c.title}</h3>
              <p>
                <AsRich value={c.body} />
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="as-principles" className="as-section">
        <h2 id="as-principles" className="as-title as-sharp">
          {ABOUT.principlesHeading}
        </h2>
        <p className="as-title-sub as-sharp">{ABOUT.principlesIntro}</p>
        <ul className="as-apps as-principles">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="as-app as-sharp">
              <span className="as-tile" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="as-process" className="as-section">
        <h2 id="as-process" className="as-title as-sharp">
          {ABOUT.processHeading}
        </h2>
        <p className="as-title-sub as-sharp">{ABOUT.processLede}</p>
        <ol className="as-steps">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="as-step as-sharp">
              <span className="as-step-n" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
              <span className="as-when">{s.when}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="as-words" className="as-section">
        <h2 id="as-words" className="as-title as-sharp">
          {ABOUT.testimonialsHeading}
        </h2>
        <figure className="as-quote as-sharp">
          <blockquote>
            <p>{lead.quote}</p>
          </blockquote>
          <figcaption>
            {lead.role}, {lead.project}. <Link href={dirHref(lead.linkHref)}>Read the {lead.linkLabel} case</Link>
          </figcaption>
        </figure>
        <ul className="as-quotes">
          {rest.map((t) => (
            <li key={t.project} className="as-sharp">
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <p className="as-quote-by">
                {t.role}, {t.project}
              </p>
              <Link className="as-go" href={dirHref(t.linkHref)} aria-label={`Read the ${t.linkLabel} case`}>
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="as-faq" className="as-section as-faq-wrap">
        <h2 id="as-faq" className="as-title as-sharp">
          {ABOUT.faqHeading}
        </h2>
        <div className="as-faq as-sharp">
          {FAQ_ITEMS.map((f) => (
            <details key={f.question} className="as-q">
              <summary>
                <span>{f.question}</span>
                <span className="as-q-mark" aria-hidden="true" />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <AsClosing id="as-about-cta" title={ABOUT.ctaTitle} body={ABOUT.ctaBody} source="about_contact" />
    </AsShell>
  );
}
