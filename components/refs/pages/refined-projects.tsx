import Link from "next/link";

import { HOME } from "@/content/home";
import { CLIENT_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";

import {
  BASE,
  ClientVisual,
  PageHero,
  PersonalVisual,
  RefinedCta,
  RefinedShell,
  SectionHead,
} from "./refined-chrome";

const NUMBERS = ["01.", "02.", "03.", "04."];

export function RefinedProjects() {
  return (
    <RefinedShell current="projects" wide>
      <PageHero lead="Four client builds, all live." tail="Three more of my own.">
        <p>Each one replaced a manual process with a system the team still uses every day. Open a card for the full story.</p>
      </PageHero>

      <section className="rf-sec" aria-labelledby="rf-client">
        <SectionHead id="rf-client" title="Client work" count={CLIENT_PROJECTS.length} />
        <ul className="rf-proj-grid">
          {CLIENT_PROJECTS.map((p, i) => (
            <li key={p.slug} className="rf-double">
              <article className="rf-proj">
                <ClientVisual slug={p.slug} />
                <div className="rf-proj-text">
                  <span className="rf-num">{NUMBERS[i]}</span>
                  <p className="rf-proj-name">{p.name}</p>
                  <h3>
                    <Link href={`${BASE}/case/${p.slug}`} className="rf-stretch">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="rf-proj-blurb">{p.blurb}</p>
                  <p className="rf-proj-out">{p.outcome}</p>
                </div>
                <span className="rf-round rf-proj-go" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8h9M8.5 4l4 4-4 4" /></svg>
                </span>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="rf-sec" aria-labelledby="rf-personal">
        <SectionHead id="rf-personal" title="Personal builds" count={PERSONAL_PROJECTS.length} />
        <ul className="rf-builds">
          {PERSONAL_PROJECTS.map((p) => (
            <li key={p.title} className="rf-build">
              <PersonalVisual title={p.title} />
              <div className="rf-build-row">
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.stack}</p>
                </div>
                <span className="rf-tag">Personal</span>
              </div>
              <p className="rf-build-blurb">{p.blurb}</p>
            </li>
          ))}
        </ul>
      </section>

      <RefinedCta
        title="Have a process like these?"
        body={HOME.ctaBody}
        button={HOME.ctaButton}
      />
    </RefinedShell>
  );
}
