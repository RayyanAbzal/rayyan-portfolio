import type { Metadata } from "next";

import { DemoFrame } from "@/components/stageshow/demo-frame";
import AriaChat from "@/components/stageshow/demos/aria-chat";
import FeedhackPayout from "@/components/stageshow/demos/feedhack-payout";
import Influence from "@/components/stageshow/demos/influence";
import InfluenceCpa from "@/components/stageshow/demos/influence-cpa";
import Pumpdat from "@/components/stageshow/demos/pumpdat";
import "@/components/stageshow/gallery.css";

// TEMPORARY: product demos of real projects with made-up data, for Ray to judge
// before any of them goes on a card or case page. Not in the sitemap, noindex.

export const metadata: Metadata = {
  title: "Product demos | Rayyan Abzal",
  robots: { index: false, follow: false },
};

const DEMOS = [
  {
    id: "feedhack",
    name: "FeedHack",
    caption: "A creator's clip is checked and paid out automatically.",
    demo: <FeedhackPayout />,
  },
  {
    id: "influence",
    name: "Influence",
    caption: "A creator export is imported, scored, matched to a campaign and moved into outreach.",
    demo: <Influence />,
  },
  {
    id: "influence-v2",
    name: "Influence v2",
    caption: "A monthly KPI upload refreshes every partner's FTD progress and CPA.",
    demo: <InfluenceCpa />,
  },
  {
    id: "pumpdat",
    name: "pumpdat",
    caption: "A token is launched from a wallet confirmation and its first trades stream in.",
    demo: <Pumpdat />,
  },
  {
    id: "aria",
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
        <section key={d.name} id={d.id} className="ssg-item">
          <h2>{d.name}</h2>
          <p>{d.caption}</p>
          <DemoFrame>{d.demo}</DemoFrame>
        </section>
      ))}
    </main>
  );
}
