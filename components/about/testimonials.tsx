import Link from "next/link";

import { ABOUT, LEAD_QUOTE_MARK, TESTIMONIALS, type Testimonial } from "@/content/about";

function Attribution({ item }: { item: Testimonial }) {
  return (
    <figcaption className="attrib">
      <span><strong>{item.role}</strong>, {item.project}</span>
      <Link className="link link-arrow" href={item.linkHref} aria-label={`Case study: ${item.linkLabel}`}>
        Case study
      </Link>
    </figcaption>
  );
}

function LeadQuote({ item }: { item: Testimonial }) {
  const at = item.quote.indexOf(LEAD_QUOTE_MARK);
  const before = at === -1 ? item.quote : item.quote.slice(0, at);
  const after = at === -1 ? "" : item.quote.slice(at + LEAD_QUOTE_MARK.length);
  return (
    <figure className="lead-quote">
      <blockquote>
        {before}
        {at !== -1 && <span className="mark">{LEAD_QUOTE_MARK}</span>}
        {after}
      </blockquote>
      <Attribution item={item} />
    </figure>
  );
}

/** One lead quote set large, two quiet quotes divided by hairlines. */
export function AboutTestimonials() {
  const [lead, ...rest] = TESTIMONIALS;
  return (
    <section id="testimonials" className="wrap has-rule">
      <h2 className="display about-section-title">{ABOUT.testimonialsHeading}</h2>
      {lead && <LeadQuote item={lead} />}
      <div className="quiet-quotes">
        {rest.map((item) => (
          <figure key={item.project} className="quiet-quote">
            <blockquote>{item.quote}</blockquote>
            <Attribution item={item} />
          </figure>
        ))}
      </div>
    </section>
  );
}
