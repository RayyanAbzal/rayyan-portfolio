import Link from "next/link";
import type { ReactNode } from "react";

import { CLIENT_DEMOS, PERSONAL_DEMOS } from "@/components/stageshow/demos/registry";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { AriaSchematic, FiosSchematic, JobFinderSchematic } from "@/components/schematics/personal-schematics";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import type { ClientProject, PersonalProject } from "@/content/projects";
import type { CaseSlug } from "@/lib/book";

import { NX } from "./nexora-shell";

export const CLIENT_SCHEMATICS: Record<CaseSlug, () => ReactNode> = {
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

/** The live demo when the registry has one, else the schematic. Decorative: the card is the link. */
function Visual({ demo, schematic }: { demo?: () => ReactNode; schematic?: () => ReactNode }) {
  const Demo = demo;
  return (
    <div className="nx-row-visual" aria-hidden="true" inert>
      <div className="nx-vbox">
        {Demo ? (
          <Demo />
        ) : (
          <div className="card-visual">
            <div className="vis-frame">{schematic?.()}</div>
          </div>
        )}
      </div>
    </div>
  );
}

interface RowProps {
  visual: ReactNode;
  name: string;
  title: string;
  blurb: string;
  chip: string;
  href?: string;
  /** Heading level id for the stretched link's description. */
  id: string;
}

function Row({ visual, name, title, blurb, chip, href, id }: RowProps) {
  return (
    <li className="nx-row" data-linked={href ? "true" : undefined} data-nx-sharpen>
      {visual}
      <div className="nx-row-body">
        <p className="nx-proj-name">{name}</p>
        <h3 id={`${id}-t`}>
          {href ? (
            <Link href={href} aria-labelledby={`${id}-t`} aria-describedby={`${id}-d`}>{title}</Link>
          ) : (
            title
          )}
        </h3>
        <p id={`${id}-d`} className="nx-row-blurb">{blurb}</p>
        <p className="nx-outcome">{chip}</p>
      </div>
      {href ? <span className="nx-arrow" aria-hidden="true">&#8599;</span> : null}
    </li>
  );
}

export function NxClientRow({ project }: { project: ClientProject }) {
  const Demo = CLIENT_DEMOS[project.slug];
  return (
    <Row
      id={`nx-c-${project.slug}`}
      visual={<Visual demo={Demo ? () => <Demo /> : undefined} schematic={CLIENT_SCHEMATICS[project.slug]} />}
      name={project.name}
      title={project.title}
      blurb={project.blurb}
      chip={project.outcome}
      href={`${NX}/case/${project.slug}`}
    />
  );
}

export function NxPersonalRow({ project }: { project: PersonalProject }) {
  const Demo = PERSONAL_DEMOS[project.title];
  return (
    <Row
      id={`nx-p-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      visual={<Visual demo={Demo ? () => <Demo /> : undefined} schematic={PERSONAL_SCHEMATICS[project.title]} />}
      name="Personal build"
      title={project.title}
      blurb={project.blurb}
      chip={project.stack}
    />
  );
}
