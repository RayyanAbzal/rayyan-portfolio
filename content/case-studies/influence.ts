import type { CaseStudy } from "./types";

export const influence: CaseStudy = {
  slug: "influence",
  title: "Influence",
  metaTitle: "Influence CRM Case Study | Rayyan Abzal",
  description:
    "An internal CRM that replaced spreadsheets, manual outreach, and gut-feel creator valuation for an influencer marketing agency.",
  summary: [
    "An internal CRM that replaced spreadsheets, manual outreach, and gut-feel creator valuation for an ",
    { strong: "influencer marketing agency" },
    ".",
  ],
  facts: ["Influencer agency, Malta", "Full-stack build", "About 6 weeks", "Live, in daily use"],
  preview: {
    kind: "crm",
    appName: "Influence CRM",
    appSub: "· Creator Pipeline",
    badge: "12 matched",
    rows: [
      { handle: "@luxe.travel_", handleTone: "hi", platform: "IG", engagement: "4.2%", score: "9.1", scoreHi: true, stage: "deal closed", stageTone: "green" },
      { handle: "@fitnesswithsam", handleTone: "text", platform: "IG", engagement: "6.8%", score: "8.4", stage: "in outreach", stageTone: "amber" },
      { handle: "@techreviews.ae", handleTone: "text", platform: "YT", engagement: "2.9%", score: "7.6", stage: "in outreach", stageTone: "amber" },
      { handle: "@noor.arabic_", handleTone: "text", platform: "TT", engagement: "8.1%", score: "7.2", stage: "scouted", stageTone: "dim" },
    ],
    footer: "value score combines engagement, reach, and audience location · representative data",
  },
  problem: {
    heading: ["Manual ", { hi: "everything" }, "."],
    paragraphs: [
      ["The team was managing their entire creator pipeline by hand, scouting through Modash, calculating value on spreadsheets, and tracking outreach with no shared system. Nothing was automated, nothing was consistent, and the agency’s growth was capped by how many tabs one person could keep open."],
    ],
  },
  built: {
    heading: ["One platform, end to end."],
    paragraphs: [
      ["A full internal web platform that ingests Modash PDF exports, runs a custom value formula across engagement rate, story reach, and audience geography, and matches creators to campaigns automatically."],
      ["The team tracks every creator through a CRM dashboard with colour-coded outreach stages, Telegram follow-up reminders, and multi-user access with role-based permissions."],
    ],
  },
  outcome: {
    heading: ["Spreadsheets → system."],
    paragraphs: [
      [
        "The team went from spreadsheets to a ",
        { mark: "purpose-built platform" },
        ". Creator evaluation, campaign matching, and outreach tracking now run through one system, live and in daily use by the whole agency.",
      ],
    ],
  },
  stack: ["Next.js 15", "Supabase", "Tailwind v4", "Vercel", "Telegram Bot API"],
  quote: {
    text: [
      "We needed a tool to manage our influencer scouting and outreach, and Rayyan delivered something that genuinely surprised us. It’s polished, it’s fast, and it fits exactly how our team works. He took our rough Canva mockups and turned them into something that looks and feels professional. Our team picked it up immediately, no training needed. ",
      { mark: "Really impressed with the attention to detail and how easy he was to work with." },
    ],
    role: "Agency Director",
    project: "Influence v1, Malta",
  },
  ctaSource: "case_influence",
  prev: { label: "← back", target: "All work", href: "/#work" },
  next: { label: "Next", target: "Influence v2", href: "/work/influence-v2" },
};
