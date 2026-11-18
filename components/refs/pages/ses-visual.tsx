import type { ReactNode } from "react";

import { CLIENT_DEMOS, PERSONAL_DEMOS } from "@/components/stageshow/demos/registry";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { AriaSchematic, FiosSchematic, JobFinderSchematic } from "@/components/schematics/personal-schematics";
import type { CaseSlug } from "@/lib/pages";

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

interface VisualProps {
  /** Card use: decorative, not focusable, so the card stays one clean link. */
  inert?: boolean;
}

/** A client project's live demo from the registry, else its drawn schematic. */
export function SesClientVisual({ slug, inert = true }: VisualProps & { slug: CaseSlug }) {
  const Demo = CLIENT_DEMOS[slug];
  return (
    <div className="ses-vis" data-kind={Demo ? "demo" : "schematic"} {...(inert ? { "aria-hidden": true, inert: true } : {})}>
      {Demo ? <Demo /> : CLIENT_SCHEMATICS[slug]()}
    </div>
  );
}

/** A personal build's demo, keyed by title, else its schematic. */
export function SesPersonalVisual({ title, inert = true }: VisualProps & { title: string }) {
  const Demo = PERSONAL_DEMOS[title];
  return (
    <div className="ses-vis" data-kind={Demo ? "demo" : "schematic"} {...(inert ? { "aria-hidden": true, inert: true } : {})}>
      {Demo ? <Demo /> : PERSONAL_SCHEMATICS[title]?.()}
    </div>
  );
}
