import { SynAccordion, SynBadge, SynEffects } from "@/components/refs/synapse-client";
import {
  ABOUT,
  ABOUT_SIDE_CARDS,
  FAQ_ITEMS,
  PRINCIPLES,
  PROCESS_STEPS,
  TESTIMONIALS,
} from "@/content/about";

import { SynFooter, SynPageHero, SynRich } from "./synapse-shell";

// The lead testimonial lives on the home; About carries the other two.
const MORE_QUOTES = TESTIMONIALS.slice(1);

export function SynapseAbout() {
  return (
    <main id="top" className="ref-root ref-synapse">
      <SynEffects />
      <SynPageHero current="about" eyebrow={ABOUT.role} title={ABOUT.h1} lede={ABOUT.big} />

      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-story">
        <div className="syn-two">
          <div className="syn-copy">
            <p className="syn-eyebrow">Story</p>
            <h2 id="syn-h-story" className="syn-h syn-h-sm">Who builds it</h2>
          </div>
          <div className="syn-prose">
            {ABOUT.paragraphs.map((para, i) => (
              <p key={i}><SynRich value={para} /></p>
            ))}
          </div>
        </div>
        <ul className="syn-facts" aria-label="Facts">
          {ABOUT_SIDE_CARDS.map((c) => (
            <li key={c.label} className="syn-fact">
              <p className="syn-eyebrow">{c.label}</p>
              <p className="syn-fact-t">{c.title}</p>
              <p className="syn-fact-b"><SynRich value={c.body} /></p>
            </li>
          ))}
        </ul>
      </section>

      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-prin">
        <div className="syn-two">
          <div className="syn-copy">
            <p className="syn-eyebrow">How I work</p>
            <h2 id="syn-h-prin" className="syn-h syn-h-sm">{ABOUT.principlesHeading}</h2>
            <p className="syn-small">{ABOUT.principlesIntro}</p>
          </div>
          <SynAccordion items={PRINCIPLES.map((p) => ({ title: p.title, body: p.body }))} variant="plain" />
        </div>
      </section>

      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-process">
        <div className="syn-two syn-head">
          <div className="syn-copy">
            <p className="syn-eyebrow">Process</p>
            <h2 id="syn-h-process" className="syn-h syn-h-sm">{ABOUT.processHeading}</h2>
          </div>
          <p className="syn-small syn-head-r">{ABOUT.processLede}</p>
        </div>
        <ol className="syn-stairs">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="syn-stair" style={{ marginLeft: `${i * 6}%` }}>
              <span className="syn-step-n" aria-hidden="true">{i + 1}</span>
              <div className="syn-stair-main">
                <p className="syn-stair-t">{s.title}</p>
                <p className="syn-stair-b">{s.body}</p>
              </div>
              <span className="syn-stair-w">{s.when}</span>
            </li>
          ))}
        </ol>
      </section>

      <section data-syn-reveal className="syn-light syn-light-quotes" aria-labelledby="syn-h-say">
        <h2 id="syn-h-say" className="syn-h syn-h-ink">{ABOUT.testimonialsHeading}</h2>
        <ul className="syn-quotes">
          {MORE_QUOTES.map((t) => (
            <li key={t.project}>
              <figure className="syn-quote-light">
                <blockquote>{t.quote}</blockquote>
                <figcaption>{t.role}, {t.project}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-faq">
        <div className="syn-two">
          <div className="syn-copy">
            <p className="syn-eyebrow">FAQ</p>
            <h2 id="syn-h-faq" className="syn-h syn-h-sm">{ABOUT.faqHeading}</h2>
          </div>
          <SynAccordion items={FAQ_ITEMS.map((f) => ({ title: f.question, body: f.answer }))} variant="plain" />
        </div>
      </section>

      <section data-syn-reveal className="syn-cta" aria-labelledby="syn-h-cta">
        <div className="syn-cta-copy">
          <p className="syn-caps syn-caps-dark">{ABOUT.ctaButton}</p>
          <h2 id="syn-h-cta" className="syn-cta-h">{ABOUT.ctaTitle}</h2>
          <p className="syn-cta-p">{ABOUT.ctaBody}</p>
        </div>
        <SynBadge>Let&rsquo;s talk</SynBadge>
      </section>

      <SynFooter />
    </main>
  );
}
