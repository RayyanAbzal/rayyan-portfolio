import type { Metadata } from "next";

import { DemoFrame } from "@/components/stageshow/demo-frame";
import AriaChat from "@/components/stageshow/demos/aria-chat";
import FeedhackPayout from "@/components/stageshow/demos/feedhack-payout";
import InfluenceCpa from "@/components/stageshow/demos/influence-cpa";
import "@/components/stageshow/gallery.css";

// TEMPORARY: product demos of real projects with made-up data, for Ray to judge
// before any of them goes on a card or case page. Not in the sitemap, noindex.

export const metadata: Metadata = {
  title: "Product demos | Rayyan Abzal",
  robots: { index: false, follow: false },
};

const DEMOS = [
  {
    name: "FeedHack",
    caption: "A creator's clip is checked and paid out automatically.",
    demo: <FeedhackPayout />,
  },
  {
    name: "Influence v2",
    caption: "A partner's sign-ups update, and cost per sign-up follows.",
    demo: <InfluenceCpa />,
  },
  {
    name: "ARIA",
    caption: "An outfit photo gets feedback for the occasion and the weather.",
    demo: <AriaChat />,
  },
];

export default function StageshowGallery() {
  return (
    <main id="top" className="wrap section ssg">
      <h1>Product demos</h1>
      <p className="lede">Each one plays once as it scrolls into view. Names and numbers are made up.</p>
      {DEMOS.map((d) => (
        <section key={d.name} className="ssg-item">
          <h2>{d.name}</h2>
          <p>{d.caption}</p>
          <DemoFrame>{d.demo}</DemoFrame>
        </section>
      ))}
    </main>
  );
}
