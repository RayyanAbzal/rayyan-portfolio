import { WORK } from "@/content/work";

import { AstapableAbout } from "./astapable-about";
import { AstapableCase } from "./astapable-case";
import { ClientGrid, PersonalGrid } from "./astapable-cards";
import { AstapableContact } from "./astapable-contact";
import { AsClosing, AsShell } from "./astapable-shell";
import type { DirectionPages } from "./types";

// The astapable direction's inner pages. Tokens and layout: app/styles/refs/astapable-pages.css.

function Projects() {
  return (
    <AsShell current="projects">
      <section className="as-pagehead" aria-labelledby="as-projects-h1">
        <h1 id="as-projects-h1" className="as-sharp">
          {WORK.h1}
        </h1>
        <p className="as-lede as-sharp">{WORK.lede}</p>
      </section>

      <section aria-labelledby="as-clients" className="as-section">
        <h2 id="as-clients" className="as-title as-sharp">
          {WORK.clientHeading}
        </h2>
        <ClientGrid />
      </section>

      <section aria-labelledby="as-personal" className="as-section">
        <h2 id="as-personal" className="as-title as-sharp">
          {WORK.personalHeading}
        </h2>
        <p className="as-title-sub as-sharp">{WORK.personalLede}</p>
        <PersonalGrid />
      </section>

      <AsClosing id="as-projects-cta" title={WORK.ctaTitle} body={WORK.ctaBody} source="work_contact" />
    </AsShell>
  );
}

export const PAGES: DirectionPages = {
  projects: () => <Projects />,
  about: () => <AstapableAbout />,
  contact: () => <AstapableContact />,
  caseStudy: ({ slug }) => <AstapableCase slug={slug} />,
};
