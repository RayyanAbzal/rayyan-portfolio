import { RichText } from "@/components/case/rich-text";
import { ABOUT_SIDE_CARDS } from "@/content/about";

/** Facts strip: one plain definition list on hairlines, no card chrome. */
export function AboutFacts() {
  return (
    <section className="wrap has-rule about-facts-section">
      <dl className="about-facts">
        {ABOUT_SIDE_CARDS.map((fact) => (
          <div key={fact.label} className="about-fact">
            <dt>{fact.label}</dt>
            <dd>
              <span className="about-fact-title">{fact.title}</span>
              <span className="about-fact-note"><RichText value={fact.body} /></span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
