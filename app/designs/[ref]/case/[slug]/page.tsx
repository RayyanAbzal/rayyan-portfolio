import type { Metadata } from "next";
import { notFound } from "next/navigation";

import "@/app/styles/refs/shell.css";
import { DIRECTION_PAGES } from "@/components/refs/pages/registry";
import { DirectionSwitcher } from "@/components/refs/switcher";
import { CASE_STUDIES } from "@/content/case-studies";
import { DESIGN_REFS, findDesign } from "@/content/designs";
import { CASE_SLUGS, type CaseSlug } from "@/lib/pages";

// TEMPORARY: one direction's case study page. Noindex.

interface DirectionCaseProps {
  params: Promise<{ ref: string; slug: string }>;
}

function isCaseSlug(slug: string): slug is CaseSlug {
  return (CASE_SLUGS as readonly string[]).includes(slug);
}

export const dynamicParams = false;

export function generateStaticParams(): { ref: string; slug: string }[] {
  return DESIGN_REFS.flatMap((d) => CASE_SLUGS.map((slug) => ({ ref: d.slug, slug })));
}

export async function generateMetadata({ params }: DirectionCaseProps): Promise<Metadata> {
  const { ref, slug } = await params;
  const design = findDesign(ref);
  const study = isCaseSlug(slug) ? CASE_STUDIES[slug] : undefined;
  return {
    title: `${study?.title ?? "Case study"}, ${design?.name ?? "Design"} direction | Rayyan Abzal`,
    robots: { index: false, follow: false },
  };
}

export default async function DirectionCase({ params }: DirectionCaseProps) {
  const { ref, slug } = await params;
  const design = findDesign(ref);
  if (!design || !isCaseSlug(slug)) notFound();
  const Case = DIRECTION_PAGES[design.slug].caseStudy;
  return (
    <>
      <Case slug={slug} />
      <DirectionSwitcher design={design} at={`/case/${slug}`} />
    </>
  );
}
