import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import "@/app/styles/refs/shell.css";
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
      <nav className="ds-switch" aria-label="Design directions">
        <p>
          After {design.credit}. <a href={design.url}>Reference</a>
        </p>
        <ul>
          {DESIGN_REFS.map((d, i) => (
            <li key={d.slug}>
              <Link href={`/designs/${d.slug}`} aria-current={d.slug === design.slug ? "page" : undefined}>
                {i + 1} {d.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
