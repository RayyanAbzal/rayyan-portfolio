import type { ReactNode } from "react";

import { BookLink } from "@/components/book-link";
import { CONTACT } from "@/content/contact";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

import { Arrow, AsShell, IconLinkedIn, IconMail } from "./astapable-shell";

function Way({ note, icon, children }: { note?: string; icon: ReactNode; children: ReactNode }) {
  return (
    <li className="as-way as-sharp">
      <span className="as-way-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <h3>{children}</h3>
        {note ? <p>{note}</p> : null}
      </div>
      <span className="as-go" aria-hidden="true">
        <Arrow />
      </span>
    </li>
  );
}

export function AstapableContact() {
  return (
    <AsShell current="contact">
      <section className="as-pagehead" aria-labelledby="as-contact-h1">
        <h1 id="as-contact-h1" className="as-sharp">
          {CONTACT.h1}
        </h1>
        <p className="as-lede as-sharp">{CONTACT.lede}</p>
      </section>

      <section aria-labelledby="as-ways" className="as-section as-narrow">
        <h2 id="as-ways" className="as-title as-sharp">
          {CONTACT.waysHeading}
        </h2>
        <ul className="as-ways">
          <Way note={CONTACT.bookNote} icon={<Arrow size={18} />}>
            <BookLink source="contact_page" className="as-cover">
              {CONTACT.bookLabel}
            </BookLink>
          </Way>
          <Way note={EMAIL} icon={<IconMail />}>
            <a href={`mailto:${EMAIL}`} className="as-cover">
              {CONTACT.emailLabel}
            </a>
          </Way>
          <Way icon={<IconLinkedIn />}>
            <a href={LINKEDIN_URL} className="as-cover" rel="noopener">
              {CONTACT.linkedinLabel}
            </a>
          </Way>
        </ul>
      </section>

      <section aria-labelledby="as-first" className="as-section as-narrow">
        <h2 id="as-first" className="as-title as-sharp">
          {CONTACT.firstMessageHeading}
        </h2>
        <p className="as-title-sub as-sharp">{CONTACT.firstMessageIntro}</p>
        <ol className="as-checklist as-sharp">
          {CONTACT.firstMessageItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="as-section as-narrow as-two" aria-label="Location and next steps">
        <div className="as-sharp">
          <h2 className="as-sub">{CONTACT.locationHeading}</h2>
          <p>{CONTACT.location}</p>
        </div>
        <div className="as-sharp">
          <h2 className="as-sub">{CONTACT.nextHeading}</h2>
          {CONTACT.next.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
    </AsShell>
  );
}
