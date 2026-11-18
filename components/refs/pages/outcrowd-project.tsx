import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

import { CLIENT_DEMOS, PERSONAL_DEMOS } from "@/components/stageshow/demos/registry";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { AriaSchematic, FiosSchematic, JobFinderSchematic } from "@/components/schematics/personal-schematics";
import type { ClientProject, PersonalProject } from "@/content/projects";
import type { CaseSlug } from "@/lib/book";

import { OC } from "./outcrowd-shell";

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

function Visual({ Demo, fallback, ratio }: { Demo?: ComponentType; fallback?: () => ReactNode; ratio?: string }) {
  return (
    <div className="oc-vis" aria-hidden="true" data-ss-fill="" {...{ inert: true }} style={ratio ? { aspectRatio: ratio } : undefined}>
      {Demo ? <Demo /> : fallback?.()}
    </div>
  );
}

/** The live demo for a client build, else its schematic. Decorative: the text beside it says the same. */
export function OcClientVisual({ slug, ratio }: { slug: CaseSlug; ratio?: string }) {
  const Demo = CLIENT_DEMOS[slug];
  return <Visual Demo={Demo} fallback={CLIENT_SCHEMATICS[slug]} ratio={Demo ? ratio : "16 / 9"} />;
}

/** A client build card. The whole card is one link, named by the title. */
export function OcProjectCard({ project, wide = false, level = 3 }: { project: ClientProject; wide?: boolean; level?: 2 | 3 }) {
  const blurbId = `oc-pc-${project.slug}-blurb`;
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <article className={wide ? "oc-b oc-pc oc-pc-wide" : "oc-b oc-pc"}>
      <OcClientVisual slug={project.slug} />
      <div className="oc-pc-body">
        <p className="oc-pc-name">{project.name}</p>
        <Heading>
          <Link href={`${OC}/case/${project.slug}`} className="oc-pc-link" aria-describedby={blurbId}>{project.title}</Link>
        </Heading>
        <p id={blurbId}>{project.blurb}</p>
        <p className="oc-meta">{project.outcome}</p>
      </div>
    </article>
  );
}

/** A personal build. No case study, so the card is not a link. */
export function OcPersonalCard({ project }: { project: PersonalProject }) {
  return (
    <article className="oc-b oc-pc oc-pc-personal">
      <Visual Demo={PERSONAL_DEMOS[project.title]} fallback={PERSONAL_SCHEMATICS[project.title]} />
      <div className="oc-pc-body">
        <h3>{project.title}</h3>
        <p>{project.blurb}</p>
        <p className="oc-meta">{project.stack}</p>
      </div>
    </article>
  );
}
