import { LeanMarquee } from "@/components/refs/brightman-client";
import { CLIENT_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";
import { WORK } from "@/content/work";

import { BASE, BmCta, BmPage, BmProjectCard } from "./brightman-shared";

export function BrightmanProjects() {
  return (
    <BmPage current="projects">
      <section className="bm-hero bm-page-hero" aria-labelledby="bm-h1">
        <div className="bm-headline">
          <h1 id="bm-h1" className="bm-h1 bm-h1-page" data-rv>{WORK.h1}</h1>
        </div>
        <div className="bm-intro">
          <p className="bm-intro-text">{WORK.lede}</p>
        </div>
      </section>

      <LeanMarquee text={WORK.clientHeading} />

      <section className="bm-section" aria-labelledby="bm-client-h">
        <h2 id="bm-client-h" className="bm-sr">{WORK.clientHeading}</h2>
        <div className="bm-pgrid">
          {CLIENT_PROJECTS.map((p, i) => (
            <BmProjectCard
              key={p.slug}
              id={`bm-card-${p.slug}`}
              n={i + 1}
              source={{ slug: p.slug }}
              name={p.name}
              title={p.title}
              blurb={p.blurb}
              outcome={p.outcome}
              href={`${BASE}/case/${p.slug}`}
              className={`bm-pcard-${i % 2 === 0 ? "a" : "b"}`}
            />
          ))}
        </div>
      </section>

      <section className="bm-section bm-personal" aria-labelledby="bm-personal-h">
        <div className="bm-personal-head" data-rv>
          <h2 id="bm-personal-h" className="bm-big-h bm-big-h-md">{WORK.personalHeading}</h2>
          <p>{WORK.personalLede}</p>
        </div>
        <div className="bm-pgrid bm-pgrid-3">
          {PERSONAL_PROJECTS.map((p, i) => (
            <BmProjectCard
              key={p.title}
              id={`bm-personal-${i}`}
              n={i + 1}
              source={{ personal: p.title }}
              title={p.title}
              blurb={p.blurb}
              stack={p.stack}
              className="bm-pcard-plain"
            />
          ))}
        </div>
      </section>

      <BmCta title={WORK.ctaTitle} body={WORK.ctaBody} source="work_contact" />
    </BmPage>
  );
}
