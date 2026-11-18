import { BookLink } from "@/components/book-link";
import { CONTACT } from "@/content/contact";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

import { OcPage, OcPageHero } from "./outcrowd-shell";

export function OcContact() {
  return (
    <OcPage current="contact">
      <OcPageHero id="oc-contact-h" title={CONTACT.h1} lede={CONTACT.lede} />

      <section className="oc-section oc-reveal" aria-labelledby="oc-ways-h">
        <h2 id="oc-ways-h" className="oc-h2">{CONTACT.waysHeading}</h2>
        <div className="oc-ways">
          <article className="oc-b oc-b-green oc-way-book">
            <h3>{CONTACT.bookLabel}</h3>
            <p>{CONTACT.bookNote}</p>
            <BookLink source="contact_page" className="oc-pill oc-pill-light">{CONTACT.bookLabel}</BookLink>
          </article>
          <article className="oc-b">
            <h3>{CONTACT.emailLabel}</h3>
            <p><a className="oc-inline" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          </article>
          <article className="oc-b">
            <h3>{CONTACT.linkedinLabel}</h3>
            <p><a className="oc-inline" href={LINKEDIN_URL}>Rayyan Abzal on LinkedIn</a></p>
          </article>
        </div>
      </section>

      <section className="oc-wide oc-wide-tall oc-reveal" aria-labelledby="oc-where-h">
        <div className="oc-wide-copy">
          <h2 id="oc-where-h" className="oc-h2-left">{CONTACT.locationHeading}</h2>
          <p>{CONTACT.location}</p>
        </div>
        <ul className="oc-threads oc-threads-facts" aria-label="Working terms">
          {CONTACT.sideCards.map((c) => (
            <li key={c.title}><span>{c.title}</span></li>
          ))}
        </ul>
      </section>

      <section className="oc-section oc-reveal" aria-labelledby="oc-first-h">
        <h2 id="oc-first-h" className="oc-h2">{CONTACT.firstMessageHeading}</h2>
        <p className="oc-sub">{CONTACT.firstMessageIntro}</p>
        <ol className="oc-checklist">
          {CONTACT.firstMessageItems.map((item, i) => (
            <li key={item}>
              <span className="oc-step-n" aria-hidden="true">{i + 1}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="oc-section oc-reveal oc-next" aria-labelledby="oc-next-h">
        <h2 id="oc-next-h" className="oc-h2">{CONTACT.nextHeading}</h2>
        <div className="oc-next-grid">
          {CONTACT.next.map((n) => (
            <p key={n} className="oc-b oc-next-card">{n}</p>
          ))}
        </div>
      </section>
    </OcPage>
  );
}
