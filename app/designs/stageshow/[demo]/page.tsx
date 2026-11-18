import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

import "@/components/stageshow/gallery.css";

// Rehearsal route: one demo alone on the page, so a film of it loads only that
// demo's styles and scripts. Same noindex, same temporary status as the gallery.

export const metadata: Metadata = {
  title: "Product demo | Rayyan Abzal",
  robots: { index: false, follow: false },
};

const LOADERS: Record<string, () => Promise<{ default: ComponentType }>> = {
  feedhack: () => import("@/components/stageshow/demos/feedhack-payout"),
  influence: () => import("@/components/stageshow/demos/influence"),
  "influence-v2": () => import("@/components/stageshow/demos/influence-cpa"),
  pumpdat: () => import("@/components/stageshow/demos/pumpdat"),
  aria: () => import("@/components/stageshow/demos/aria-chat"),
};

export function generateStaticParams() {
  return Object.keys(LOADERS).map((demo) => ({ demo }));
}

export default async function StageshowDemo({ params }: { params: Promise<{ demo: string }> }) {
  const { demo } = await params;
  const load = LOADERS[demo];
  if (!load) notFound();
  const { default: Demo } = await load();
  return (
    <main id="top" className="wrap section ssg">
      <section id={demo} className="ssg-item">
        <Demo />
      </section>
    </main>
  );
}
