import { CLIENT_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";
import { WORK } from "@/content/work";

import { OcPersonalCard, OcProjectCard } from "./outcrowd-project";
import { OcCta, OcPage, OcPageHero } from "./outcrowd-shell";

export function OcProjects() {
  return (
    <OcPage current="projects">
      <OcPageHero id="oc-projects-h" title={WORK.h1} lede={WORK.lede} />

      <section className="oc-section oc-reveal" aria-labelledby="oc-clients-h">
        <h2 id="oc-clients-h" className="oc-h2">{WORK.clientHeading}</h2>
        <div className="oc-grid-cards">
          {CLIENT_PROJECTS.map((p, i) => (
            <OcProjectCard key={p.slug} project={p} wide={i === 0} />
          ))}
        </div>
      </section>

      <section className="oc-section oc-reveal" aria-labelledby="oc-personal-h">
        <h2 id="oc-personal-h" className="oc-h2">{WORK.personalHeading}</h2>
        <p className="oc-sub">{WORK.personalLede}</p>
        <div className="oc-grid-personal">
          {PERSONAL_PROJECTS.map((p) => (
            <OcPersonalCard key={p.title} project={p} />
          ))}
        </div>
      </section>

      <OcCta id="oc-projects-cta" title={WORK.ctaTitle} body={WORK.ctaBody} label={WORK.ctaButton} />
    </OcPage>
  );
}
