import Link from "next/link";
import type { ReactNode } from "react";

import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import {
  AriaSchematic,
  FiosSchematic,
  JobFinderSchematic,
} from "@/components/schematics/personal-schematics";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import type { CaseSlug } from "@/lib/book";
import type { ClientProject, PersonalProject } from "@/content/projects";

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

/**
 * Client build card. The whole card is one link; its accessible name is the
 * h3 text (the link sits inside the heading, a stretched ::before covers the
 * card) and the paragraphs describe it.
 */
export function ClientProjectCard({ project }: { project: ClientProject }) {
  const titleId = `card-${project.slug}-title`;
  const blurbId = `card-${project.slug}-blurb`;
  return (
    <Card>
      {CLIENT_SCHEMATICS[project.slug]()}
      <CardContent>
        <div className="card-name">{project.name}</div>
        <CardTitle id={titleId}>
          <Link
            href={`/work/${project.slug}`}
            className="card-link"
            aria-labelledby={titleId}
            aria-describedby={blurbId}
          >
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription id={blurbId}>{project.blurb}</CardDescription>
        <p className="card-outcome">{project.outcome}</p>
      </CardContent>
    </Card>
  );
}

export function PersonalProjectCard({ project }: { project: PersonalProject }) {
  return (
    <Card className="card-plain">
      {PERSONAL_SCHEMATICS[project.title]?.()}
      <CardContent>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.blurb}</CardDescription>
        <p className="card-stackline">{project.stack}</p>
      </CardContent>
    </Card>
  );
}
