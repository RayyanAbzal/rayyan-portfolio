import Link from "next/link";
import type { ReactNode } from "react";

import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { AriaSchematic, FiosSchematic, JobFinderSchematic } from "@/components/schematics/personal-schematics";
import { CLIENT_DEMOS, PERSONAL_DEMOS } from "@/components/stageshow/demos/registry";
import { CASE_STUDIES } from "@/content/case-studies";
import { CLIENT_PROJECTS, PERSONAL_PROJECTS, type ClientProject, type PersonalProject } from "@/content/projects";
import type { CaseSlug } from "@/lib/book";

import { Arrow, BASE } from "./astapable-shell";

const CLIENT_SCHEMATICS: Record<CaseSlug, () => ReactNode> = {
  influence: () => <InfluenceSchematic />,
  feedhack: () => <FeedhackSchematic />,
  pumpdat: () => <PumpdatSchematic />,
  "influence-v2": () => <InfluenceV2Schematic />,
};

const PERSONAL_SCHEMATICS: Record<string, () => ReactNode> = {
  FIOS: () => <FiosSchematic />,
  ARIA: () => <AriaSchematic />,
  "NZ Job Finder": () => <JobFinderSchematic />,
};

/** The live demo when the registry has one, else the card schematic. Inert and hidden from assistive tech. */
export function ClientVisual({ slug }: { slug: CaseSlug }) {
  const Demo = CLIENT_DEMOS[slug];
  return (
    <div className="as-demo" aria-hidden="true" inert>
      {Demo ? <Demo /> : CLIENT_SCHEMATICS[slug]()}
    </div>
  );
}

export function PersonalVisual({ title }: { title: string }) {
  const Demo = PERSONAL_DEMOS[title];
  return (
    <div className="as-demo" aria-hidden="true" inert>
      {Demo ? <Demo /> : PERSONAL_SCHEMATICS[title]?.()}
    </div>
  );
}

function Tags({ items }: { items: readonly string[] }) {
  return (
    <ul className="as-tags" aria-label="Built with">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** Whole card is one link to the case study; the h3 link is stretched over it. */
export function ClientCard({ project, tone }: { project: ClientProject; tone: number }) {
  const blurbId = `as-card-${project.slug}`;
  return (
    <li className="as-feature" data-tone={tone % 3}>
      <div className="as-stage">
        <ClientVisual slug={project.slug} />
        <span className="as-chipgo" aria-hidden="true">
          <Arrow />
        </span>
      </div>
      <div className="as-cap as-sharp">
        <Tags items={CASE_STUDIES[project.slug].stack.slice(0, 3)} />
        <div className="as-text">
          <h3>
            <Link href={`${BASE}/case/${project.slug}`} className="as-cover" aria-describedby={blurbId}>
              {project.name}
            </Link>
          </h3>
          <p id={blurbId}>{project.title}</p>
        </div>
      </div>
    </li>
  );
}

/** Personal builds have no case page, so the card is not a link. */
export function PersonalCard({ project, tone }: { project: PersonalProject; tone: number }) {
  return (
    <li className="as-feature as-feature-still" data-tone={tone % 3}>
      <div className="as-stage">
        <PersonalVisual title={project.title} />
      </div>
      <div className="as-cap as-sharp">
        <Tags items={project.stack.split(", ")} />
        <div className="as-text">
          <h3>{project.title}</h3>
          <p>{project.blurb}</p>
        </div>
      </div>
    </li>
  );
}

export function ClientGrid({ slugs }: { slugs?: readonly CaseSlug[] }) {
  const projects = slugs ? CLIENT_PROJECTS.filter((p) => slugs.includes(p.slug)) : CLIENT_PROJECTS;
  return (
    <ul className="as-grid">
      {projects.map((p, i) => (
        <ClientCard key={p.slug} project={p} tone={i} />
      ))}
    </ul>
  );
}

export function PersonalGrid() {
  return (
    <ul className="as-grid as-grid-3">
      {PERSONAL_PROJECTS.map((p, i) => (
        <PersonalCard key={p.title} project={p} tone={i} />
      ))}
    </ul>
  );
}
