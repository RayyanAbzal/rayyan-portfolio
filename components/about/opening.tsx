import { RichText } from "@/components/case/rich-text";
import { ABOUT } from "@/content/about";

/** Opening: h1, the name and role line, the lead statement, then the prose. */
export function AboutOpening() {
  return (
    <section className="wrap about-opening">
      <h1 className="display about-h1">{ABOUT.h1}</h1>
      <p className="about-role">
        <strong>Rayyan Abzal</strong>
        <span>{ABOUT.role}</span>
      </p>
      <p className="about-lead">{ABOUT.big}</p>
      <div className="about-prose">
        {ABOUT.paragraphs.map((paragraph, index) => (
          <p key={index}><RichText value={paragraph} /></p>
        ))}
      </div>
    </section>
  );
}
