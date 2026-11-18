import Link from "next/link";

import { RefinedFaq } from "@/components/refs/refined-client";
import {
  ABOUT,
  ABOUT_SIDE_CARDS,
  FAQ_ITEMS,
  PRINCIPLES,
  PROCESS_STEPS,
  TESTIMONIALS,
} from "@/content/about";

import {
  PageHero,
  RefinedCta,
  RefinedRich,
  RefinedShell,
  SectionHead,
  toDirection,
} from "./refined-chrome";

const ICONS = [
  <path key="a" d="M4 7h10M4 12h16M4 17h8" />,
  <path key="b" d="M12 4v16M4 12h16M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  <path key="c" d="M5 19V9l7-5 7 5v10zM10 19v-5h4v5" />,
  <path key="d" d="M5 12.5l4.5 4.5L19 7.5" />,
];

function trim(text: string): string {
  return text.replace(/\.$/, "");
}

export function RefinedAbout() {
  const cut = ABOUT.h1.indexOf(", and ");
  const lead = cut > 0 ? ABOUT.h1.slice(0, cut + 1) : ABOUT.h1;
  const tail = cut > 0 ? ABOUT.h1.slice(cut + 2) : "";

  return (
    <RefinedShell current="about">
      <PageHero lead={lead} tail={tail} eyebrow={<span className="rf-badge">{ABOUT.role}</span>}>
        <p className="rf-big">{ABOUT.big}</p>
      </PageHero>

      <section className="rf-story" aria-label="My story">
        {ABOUT.paragraphs.map((p, i) => (
          <p key={i}>
            <RefinedRich value={p} />
          </p>
        ))}
      </section>

      <section className="rf-sec" aria-labelledby="rf-facts">
        <SectionHead id="rf-facts" title="At a glance" count={ABOUT_SIDE_CARDS.length} />
        <ul className="rf-list rf-facts">
          {ABOUT_SIDE_CARDS.map((c) => (
            <li key={c.label} className="rf-fact">
              <span className="rf-fact-label">{c.label}</span>
              <span className="rf-fact-text">
                <strong>{c.title}</strong>
                <span>
                  <RefinedRich value={c.body} />
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rf-sec" aria-labelledby="rf-principles">
        <SectionHead id="rf-principles" title={ABOUT.principlesHeading} count={PRINCIPLES.length} />
        <ul className="rf-solutions">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="rf-double">
              <div className="rf-sol rf-principle">
                <span className="rf-num">{String(i + 1).padStart(2, "0")}.</span>
                <span className="rf-chip" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONS[i]}</svg>
                </span>
                <span className="rf-sol-text">
                  <strong>{p.title}</strong>
                  <span>{p.body}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rf-sec" aria-labelledby="rf-process">
        <SectionHead id="rf-process" title={trim(ABOUT.processHeading)} count={PROCESS_STEPS.length} />
        <ol className="rf-steps">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="rf-step">
              <span className="rf-step-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="rf-step-text">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
              <span className="rf-tag">{s.when}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="rf-sec" aria-labelledby="rf-clients">
        <SectionHead id="rf-clients" title={trim(ABOUT.testimonialsHeading)} count={TESTIMONIALS.length - 1} />
        <ul className="rf-quotes">
          {TESTIMONIALS.slice(1).map((t) => (
            <li key={t.project} className="rf-quote">
              <blockquote>{t.quote}</blockquote>
              <p className="rf-who">
                <strong>{t.role}</strong>
                <span>{t.project}</span>
              </p>
              <Link href={toDirection(t.linkHref)} className="rf-inline rf-quote-link">
                Read the {t.linkLabel} case
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rf-sec" aria-labelledby="rf-faq">
        <SectionHead id="rf-faq" title={trim(ABOUT.faqHeading)} count={FAQ_ITEMS.length} />
        <RefinedFaq items={FAQ_ITEMS} />
      </section>

      <RefinedCta title={ABOUT.ctaTitle} body={ABOUT.ctaBody} button={ABOUT.ctaButton} source="about_contact" />
    </RefinedShell>
  );
}
