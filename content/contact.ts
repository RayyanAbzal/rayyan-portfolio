import type { Rich } from "@/content/rich";

export const CONTACT = {
  title: "Contact Rayyan Abzal | AI Consultant, Auckland NZ",
  description:
    "How to contact Rayyan Abzal: book a free 30-minute intro call, email, or LinkedIn. Based in Auckland, New Zealand, working remotely with clients in NZ, Europe, and the US.",
  h1: "Get in touch.",
  lede: "The quickest way to start is a free 30-minute intro call. You describe how your business runs, and I tell you honestly whether AI can help, what I would build, and what it would cost.",
  waysHeading: "Ways to reach me",
  bookLabel: "Book a free intro call",
  bookNote: "Free, 30 minutes, no pitch. You pick a time in the booking popup.",
  emailLabel: "Email",
  linkedinLabel: "LinkedIn",
  locationHeading: "Where I work",
  location:
    "I am based in Auckland, New Zealand (UTC+12). Everything runs remotely: the call, weekly updates, a live staging link, handover. I work with businesses across New Zealand as well as clients in Europe and the US.",
  firstMessageHeading: "What to include in a first message",
  firstMessageIntro:
    "A short message is enough. These details let me tell you quickly whether I can help:",
  firstMessageItems: [
    "What your business does and how the work runs today.",
    "The manual process or bottleneck you want gone, and roughly how much time it takes.",
    "Whether you want a manual process automated, AI added to a product you already have, or a whole tool built.",
    "Any deadline or constraint, and the tools your team already uses.",
    "Whether you want an NDA signed before you share details.",
  ],
  nextHeading: "What happens next",
  next: [
    "After the intro call you receive a written proposal within 48 hours: fixed scope, fixed price, fixed timeline, plus a visual process map in plain language.",
    "I am a solo practice with two active projects at most, so the person who replies is the person who scopes and builds the work.",
  ],
  sideCards: [
    { title: "Auckland, New Zealand (UTC+12)", body: ["Everything runs remotely: the call, weekly updates, a live staging link, handover."] },
    { title: "Two active projects, maximum", body: ["Depth over breadth. Currently open for the next one."] },
    { title: "Fixed price", body: ["One number in the proposal, no surprise invoices."] },
  ] as readonly { title: string; body: Rich }[],
} as const;
