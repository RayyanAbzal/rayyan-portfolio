import type { CaseStudy } from "./types";

export const feedhack: CaseStudy = {
  slug: "feedhack",
  title: "FeedHack",
  metaTitle: "FeedHack Discord Automation Case Study | Rayyan Abzal",
  description:
    "An end-to-end automation system for creator submissions, validation, and monthly payouts on a Discord-first platform.",
  summary: [
    "An ",
    { strong: "end-to-end automation system" },
    " for creator submissions, validation, and monthly payouts. Discord in front, dashboard behind.",
  ],
  facts: ["Creator clip platform", "Bot + dashboard build", "About 8 weeks", "Live, automated"],
  preview: {
    kind: "bot",
    appName: "FeedHack Bot",
    appSub: "· #submissions-live",
    badge: "running",
    messages: [
      {
        command: "/submit @creator_918 · clip_id: 1204",
        checks: ["format MP4", "duration 0:52", "brand pass"],
        result: { tier: "tier_2", payout: "$24.00", badge: "approved" },
      },
      {
        command: "/submit @creator_445 · clip_id: 1205",
        failure: { text: "brand fail: overlay missing", badge: "rejected" },
      },
    ],
    footer: "1,204 clips processed this month · auto-payout batch runs Nov 30 · representative data",
  },
  problem: {
    heading: ["Discord at scale, ", { hi: "broken" }, "."],
    paragraphs: [
      ["A creator clip submission platform was managing submissions, quality checks, and monthly payouts manually through Discord. As creator volume grew, the process broke down: inconsistent validation, missed payments, and hours of admin every month."],
    ],
  },
  built: {
    heading: ["Bot in front, dashboard behind."],
    paragraphs: [
      ["An end-to-end automation system. A Discord bot handles the full creator experience: account linking, clip submission, stats, and wallet registration. Every clip is automatically validated against brand and quality standards."],
      ["A rank-tier system tracks creator performance and calculates payouts automatically. A web dashboard gives the FeedHack team full control over campaigns, budgets, creator management, and payout exports."],
    ],
  },
  outcome: {
    heading: ["Manual hours → zero."],
    paragraphs: [
      [
        "Submissions, validation, and payouts now run ",
        { mark: "without manual intervention" },
        ". The team manages everything through a dashboard instead of Discord messages.",
      ],
    ],
  },
  stack: ["Node.js 22", "TypeScript", "discord.js", "BullMQ", "Redis", "Supabase", "Next.js 15", "Railway", "Docker"],
  ctaSource: "case_feedhack",
  prev: { label: "Previous", target: "Influence v2", href: "/work/influence-v2" },
  next: { label: "Next", target: "pumpdat", href: "/work/pumpdat" },
};
