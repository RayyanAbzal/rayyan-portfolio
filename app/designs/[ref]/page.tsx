import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import "@/app/styles/refs/shell.css";
import { DirectionSwitcher } from "@/components/refs/switcher";
import { DesignAstapable } from "@/components/refs/astapable";
import { DesignBrightman } from "@/components/refs/brightman";
import { DesignNexora } from "@/components/refs/nexora";
import { DesignOutcrowd } from "@/components/refs/outcrowd";
import { DesignRefined } from "@/components/refs/refined";
import { DesignSes } from "@/components/refs/ses";
import { DesignSynapse } from "@/components/refs/synapse";
import { DESIGN_REFS, findDesign, type DesignSlug } from "@/content/designs";

// TEMPORARY: reference-led design previews for Ray. Not in the sitemap, noindex.

interface DesignPageProps {
  params: Promise<{ ref: string }>;
}

const DESIGNS: Record<DesignSlug, () => ReactNode> = {
  refined: DesignRefined,
  astapable: DesignAstapable,
  brightman: DesignBrightman,
  ses: DesignSes,
  nexora: DesignNexora,
  outcrowd: DesignOutcrowd,
  synapse: DesignSynapse,
};

export const dynamicParams = false;

export function generateStaticParams(): { ref: string }[] {
  return DESIGN_REFS.map((d) => ({ ref: d.slug }));
}

export async function generateMetadata({ params }: DesignPageProps): Promise<Metadata> {
  const { ref } = await params;
  const design = findDesign(ref);
  return {
    title: `${design?.name ?? "Design"} direction | Rayyan Abzal`,
    robots: { index: false, follow: false },
  };
}

export default async function DesignPage({ params }: DesignPageProps) {
  const { ref } = await params;
  const design = findDesign(ref);
  if (!design) notFound();
  const Design = DESIGNS[design.slug];
  return (
    <>
      <Design />
      <DirectionSwitcher design={design} at="" />
    </>
  );
}
