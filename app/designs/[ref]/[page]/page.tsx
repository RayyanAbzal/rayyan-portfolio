import type { Metadata } from "next";
import { notFound } from "next/navigation";

import "@/app/styles/refs/shell.css";
import { DIRECTION_PAGES } from "@/components/refs/pages/registry";
import { DirectionSwitcher } from "@/components/refs/switcher";
import { DESIGN_PAGES, DESIGN_REFS, findDesign, isDesignPage } from "@/content/designs";

// TEMPORARY: one direction's inner page (projects, about, contact). Noindex.

interface DirectionPageProps {
  params: Promise<{ ref: string; page: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): { ref: string; page: string }[] {
  return DESIGN_REFS.flatMap((d) => DESIGN_PAGES.map((p) => ({ ref: d.slug, page: p.slug })));
}

export async function generateMetadata({ params }: DirectionPageProps): Promise<Metadata> {
  const { ref, page } = await params;
  const design = findDesign(ref);
  const name = DESIGN_PAGES.find((p) => p.slug === page)?.name ?? "Page";
  return {
    title: `${name}, ${design?.name ?? "Design"} direction | Rayyan Abzal`,
    robots: { index: false, follow: false },
  };
}

export default async function DirectionPage({ params }: DirectionPageProps) {
  const { ref, page } = await params;
  const design = findDesign(ref);
  if (!design || !isDesignPage(page)) notFound();
  const Page = DIRECTION_PAGES[design.slug][page];
  return (
    <>
      <Page />
      <DirectionSwitcher design={design} at={`/${page}`} />
    </>
  );
}
