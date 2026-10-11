import type { CaseStudy } from "./types";

export const influenceV2: CaseStudy = {
  slug: "influence-v2",
  title: "Influence v2",
  metaTitle: "Influence v2 Dashboard Case Study | Rayyan Abzal",
  description:
    "A direct conversation dashboard built inside the existing Influence CRM, giving the team full visibility into live partner performance.",
  summary: [
    "A direct conversation dashboard built inside the existing Influence CRM, giving the team full visibility into ",
    { strong: "live partner performance" },
    ".",
  ],
  facts: ["Influencer agency, Malta", "Full-stack build", "About 4 weeks", "Live, in daily use"],
  preview: {
    kind: "roster",
    appName: "Current Roster",
    appSub: "· Week 24 · CSV synced 3m ago",
    cards: [
      { value: "312", label: "total creators" },
      { value: "4.7%", label: "avg eng rate" },
      { value: "€41.2K", label: "pipeline value", hi: true },
      { value: "€34.20", label: "avg CPA" },
      { value: "23", label: "deals MTD" },
      { value: "€8,400", label: "flat fees tracked" },
    ],
    progressLabel: "FTD progress vs target",
    progressValue: "847 / 1,200",
    progressPercent: 71,
    footer: "next contact reminders: 6 due today · next payout export in 6 days · representative data",
  },
  problem: {
    heading: ["The gap ", { hi: "after v1" }, "."],
    paragraphs: [
      ["V1 handled creator discovery and outreach well. But once an influencer moved into direct conversation and became a live partner, the team had no structured place to manage that relationship. Monthly KPIs came from affiliate platform exports, contact details lived in chat threads, and there was no view of FTD progress, CPA, or flat fee spend across the whole roster."],
    ],
  },
  built: {
    heading: ["A second module, ", { hi: "not a second app" }, "."],
    paragraphs: [
      ["A Current Roster tab built inside the existing platform. Each staff member gets a structured space for their live influencers: monthly KPI data via CSV upload, a speedometer tracking FTD progress against target, auto-calculated CPA, flat fee tracking, deliverables, contact details, and Telegram reminders for next contact dates."],
      ["An admin layer surfaces a full-team overview with folder navigation from all staff down to individual influencer profiles."],
    ],
  },
  outcome: {
    heading: ["One dashboard, ", { hi: "no more chat threads" }, "."],
    paragraphs: [
      [
        "All live partner management moved out of spreadsheets and into the platform. Staff upload a CSV, the platform does the math. FTD progress, CPA, and flat fee spend are visible in ",
        { mark: "real time" },
        ". Hours reclaimed every week.",
      ],
    ],
  },
  stack: ["Next.js 15", "Supabase", "Tailwind v4", "Vercel", "Telegram Bot API"],
  quote: {
    text: [
      "We liked the V1 tool so much we brought Rayyan back to build a full performance dashboard on top of it. What he built blew us away. Everything we track as a team is now in one place, beautifully laid out, with the exact design language we asked for. The scope kept evolving and he handled every change without complaint, always asking the right questions before building. It saved us hours every week. ",
      { mark: "Genuinely one of the best decisions we made for the business." },
    ],
    role: "Agency Director",
    project: "Influence v2, Malta",
  },
  ctaSource: "case_influence_v2",
  prev: { label: "Previous", target: "Influence v1", href: "/work/influence" },
  next: { label: "Next", target: "FeedHack", href: "/work/feedhack" },
};
