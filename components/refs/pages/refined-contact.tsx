import { BookLink } from "@/components/book-link";
import { CONTACT } from "@/content/contact";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

import { Arrow, PageHero, RefinedRich, RefinedShell, SectionHead } from "./refined-chrome";

export function RefinedContact() {
  const cut = CONTACT.h1.lastIndexOf(" ");
  const [capacity, fixedPrice] = [CONTACT.sideCards[1], CONTACT.sideCards[2]];

  return (
    <RefinedShell current="contact">
      <PageHero lead={CONTACT.h1.slice(0, cut)} tail={CONTACT.h1.slice(cut + 1)}>
        <p>{CONTACT.lede}</p>
      </PageHero>

      <section className="rf-sec rf-contact" aria-labelledby="rf-ways">
        <div className="rf-card rf-ask">
          <h2 id="rf-ways" className="rf-badge">{CONTACT.waysHeading}</h2>
          <p className="rf-ask-note">{CONTACT.bookNote}</p>
          <BookLink source="contact_page" className="rf-btn rf-glow rf-full">
            {CONTACT.bookLabel}
          </BookLink>
        </div>
        <div className="rf-card rf-reach">
          <a href={`mailto:${EMAIL}`} className="rf-bar">
            <span>{CONTACT.emailLabel}: {EMAIL}</span>
            <Arrow />
          </a>
          <a href={LINKEDIN_URL} className="rf-bar" rel="noopener noreferrer" target="_blank">
            <span>{CONTACT.linkedinLabel}</span>
            <Arrow />
          </a>
        </div>
      </section>

      <section className="rf-sec" aria-labelledby="rf-include">
        <SectionHead id="rf-include" title={CONTACT.firstMessageHeading} count={CONTACT.firstMessageItems.length} />
        <p className="rf-intro">{CONTACT.firstMessageIntro}</p>
        <ol className="rf-steps">
          {CONTACT.firstMessageItems.map((item, i) => (
            <li key={item} className="rf-step">
              <span className="rf-step-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="rf-step-text">
                <p>{item}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rf-sec" aria-labelledby="rf-where">
        <SectionHead id="rf-where" title={CONTACT.locationHeading} />
        <div className="rf-pair">
          <article className="rf-plan">
            <h3>{CONTACT.sideCards[0].title}</h3>
            <p>{CONTACT.location}</p>
          </article>
          <article className="rf-plan">
            <h3>{capacity.title}</h3>
            <p><RefinedRich value={capacity.body} /></p>
            <h3 className="rf-plan-sub">{fixedPrice.title}</h3>
            <p><RefinedRich value={fixedPrice.body} /></p>
          </article>
        </div>
      </section>

      <section className="rf-sec" aria-labelledby="rf-next">
        <SectionHead id="rf-next" title={CONTACT.nextHeading} count={CONTACT.next.length} />
        <ol className="rf-steps">
          {CONTACT.next.map((item, i) => (
            <li key={item} className="rf-step">
              <span className="rf-step-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="rf-step-text">
                <p>{item}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </RefinedShell>
  );
}
