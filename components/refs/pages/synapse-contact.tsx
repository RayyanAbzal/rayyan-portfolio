import { BookLink } from "@/components/book-link";
import { SynEffects } from "@/components/refs/synapse-client";
import { CONTACT } from "@/content/contact";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

import { SynFooter, SynPageHero, SynRich } from "./synapse-shell";

export function SynapseContact() {
  return (
    <main id="top" className="ref-root ref-synapse">
      <SynEffects />
      <SynPageHero current="contact" eyebrow="Contact" title={CONTACT.h1} lede={CONTACT.lede} />

      <section data-syn-reveal className="syn-cta syn-cta-book" aria-labelledby="syn-h-book">
        <div className="syn-cta-copy">
          <p className="syn-caps syn-caps-dark">{CONTACT.waysHeading}</p>
          <h2 id="syn-h-book" className="syn-cta-h syn-cta-h-sm">{CONTACT.bookLabel}</h2>
          <p className="syn-cta-p">{CONTACT.bookNote}</p>
        </div>
        <BookLink source="contact_page" className="syn-pill syn-pill-ink">
          {CONTACT.bookLabel} <span className="syn-plus-chip" aria-hidden="true">+</span>
        </BookLink>
      </section>

      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-ways">
        <div className="syn-two">
          <div className="syn-copy">
            <p className="syn-eyebrow">Or write</p>
            <h2 id="syn-h-ways" className="syn-h syn-h-sm">{CONTACT.emailLabel} or {CONTACT.linkedinLabel}</h2>
          </div>
          <ul className="syn-ways">
            <li>
              <a href={`mailto:${EMAIL}`} className="syn-way">
                <span className="syn-eyebrow">{CONTACT.emailLabel}</span>
                <span className="syn-way-v">{EMAIL}</span>
              </a>
            </li>
            <li>
              <a href={LINKEDIN_URL} rel="noopener noreferrer" className="syn-way">
                <span className="syn-eyebrow">{CONTACT.linkedinLabel}</span>
                <span className="syn-way-v">{LINKEDIN_URL.replace(/^https?:\/\/(www\.)?/, "")}</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-first">
        <div className="syn-two">
          <div className="syn-copy">
            <p className="syn-eyebrow">First message</p>
            <h2 id="syn-h-first" className="syn-h syn-h-sm">{CONTACT.firstMessageHeading}</h2>
            <p className="syn-small">{CONTACT.firstMessageIntro}</p>
          </div>
          <ol className="syn-stairs syn-stairs-flat">
            {CONTACT.firstMessageItems.map((item, i) => (
              <li key={item} className="syn-stair">
                <span className="syn-step-n" aria-hidden="true">{i + 1}</span>
                <div className="syn-stair-main"><p className="syn-stair-b">{item}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-syn-reveal className="syn-panel syn-pad" aria-labelledby="syn-h-where">
        <div className="syn-two">
          <div className="syn-copy">
            <p className="syn-eyebrow">{CONTACT.locationHeading}</p>
            <h2 id="syn-h-where" className="syn-h syn-h-sm">{CONTACT.nextHeading}</h2>
            <p className="syn-small">{CONTACT.location}</p>
          </div>
          <div className="syn-prose">
            {CONTACT.next.map((para) => (
              <p key={para}>{para}</p>
            ))}
            <ul className="syn-facts syn-facts-2" aria-label="Terms">
              {CONTACT.sideCards.slice(1).map((c) => (
                <li key={c.title} className="syn-fact">
                  <p className="syn-fact-t">{c.title}</p>
                  <p className="syn-fact-b"><SynRich value={c.body} /></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SynFooter />
    </main>
  );
}
