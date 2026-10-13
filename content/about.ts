import type { Rich } from "@/content/rich";

const GROWLAB_URL = "https://www.growlab.co.nz/about";

export const STACK_TITLE = "TypeScript, Node.js, Python";
export const STACK_NOTE = "Plus whatever the problem needs.";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Principle {
  title: string;
  body: string;
}

export interface ProcessStep {
  title: string;
  body: string;
  when: string;
}

export interface Testimonial {
  quote: string;
  role: string;
  project: string;
  linkHref: string;
  linkLabel: string;
}

export const PRINCIPLES: readonly Principle[] = [
  {
    title: "Replace work, don’t add it",
    body: "If implementing AI means more tools to learn, more dashboards to check, or more processes to follow, it is the wrong implementation. Good AI is invisible to the people whose work it replaces.",
  },
  {
    title: "Start with the bottleneck, not the technology",
    body: "“We should use LLMs” is not a project. “This manual process eats 20 hours a week” is. Find the real bottleneck, then choose the lightest tool that solves it. Sometimes an LLM, often just well-built automation.",
  },
  {
    title: "Build for the team, not the demo",
    body: "AI tools are only valuable if non-technical people use them every day. I ship simple interfaces a team adopts in an afternoon, not impressive demos that gather dust in a Notion doc.",
  },
  {
    title: "Measure in hours saved, not features shipped",
    body: "The only metric that matters is whether the business runs faster after the build. Every proposal names the manual hours we expect to remove, and we measure against that at handover.",
  },
];

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    title: "We talk",
    body: "A 30-minute call about the problem, the goals, and the constraints. You leave knowing whether I can help.",
    when: "Free",
  },
  {
    title: "You get a plan",
    body: "Fixed scope, fixed price, fixed timeline, plus a visual process map in plain language.",
    when: "Within 48 hours",
  },
  {
    title: "I build",
    body: "Weekly updates and a live staging link from day one. Working software at every milestone.",
    when: "1 to 8 weeks",
  },
  {
    title: "You own it",
    body: "Full documentation, a walkthrough for the team, and 30 days of post-launch support.",
    when: "30 days included",
  },
];

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "We liked the V1 tool so much we brought Rayyan back to build a full performance dashboard on top of it. Everything we track as a team is now in one place, beautifully laid out, in the exact design language we asked for. The scope kept evolving and he handled every change without complaint. It saved us hours every week.",
    role: "Agency Director",
    project: "Influence v2, Malta",
    linkHref: "/work/influence-v2",
    linkLabel: "Influence v2",
  },
  {
    quote:
      "We needed a tool to manage our influencer scouting and outreach, and Rayyan delivered something that genuinely surprised us. It’s polished, it’s fast, and it fits exactly how our team works. Our team picked it up immediately, no training needed.",
    role: "Agency Director",
    project: "Influence v1, Malta",
    linkHref: "/work/influence",
    linkLabel: "Influence",
  },
  {
    quote:
      "Rayyan delivered flawless, high-quality work, faster and better than I imagined possible. He came up with smart solutions to problems before I even had to ask. I’d hire him again without hesitation.",
    role: "Founder",
    project: "pumpdat",
    linkHref: "/work/pumpdat",
    linkLabel: "pumpdat",
  },
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "What’s your pricing model?",
    answer:
      "Fixed-price by scope, not hourly. You know the number upfront and there are no surprise invoices. After the intro call you receive a written proposal with a single price and timeline.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A focused automation tool or AI integration typically takes 1 to 3 weeks. Larger full-stack platforms can run 6 to 8. You get a clear timeline in the proposal before anything starts.",
  },
  {
    question: "How do you decide if AI is the right tool?",
    answer:
      "I start with the problem, not the technology. If the bottleneck is a manual process that needs judgement and ingests text, images, or data, AI is usually a fit. If it is a deterministic workflow, normal automation is faster, cheaper, and more reliable. The intro call sorts this out.",
  },
  {
    question: "Do you work with non-technical founders?",
    answer:
      "Yes. Most of my clients are. I handle the technical side and explain things in plain language. The proposal includes a visual process map so you can see the plan without a computer science degree.",
  },
  {
    question: "Can you integrate AI into an existing system?",
    answer:
      "Yes. I work with existing codebases to add AI features: LLM workflows, agents, automation pipelines. No rebuild required. Most engagements are additive.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Happy to. Send yours, or I have a mutual NDA I can share before the intro call if needed.",
  },
  {
    question: "Do you only work with Auckland businesses?",
    answer:
      "No. I am based in Auckland and work with businesses across New Zealand as well as clients in Europe and the US. Everything runs remotely: the intro call, weekly updates, a live staging link, and handover. NZ clients get same-timezone communication, which most overseas agencies cannot offer.",
  },
];

export interface AboutSideCard {
  /** Short term shown above the value in the facts strip. */
  label: string;
  title: string;
  body: Rich;
}

export const ABOUT = {
  title: "About Rayyan Abzal | AI Consultant, Auckland NZ",
  description:
    "How I work: a solo AI engineering practice in Auckland, plus AI engineering at Growlab. Four principles, client testimonials, and founder FAQs.",
  socialDescription:
    "How I work: a solo AI engineering practice in Auckland. Four principles, client testimonials, and answers to the questions founders ask before booking a call.",
  h1: "I scope it, build it, and ship it myself.",
  role: "AI engineer. Own practice, plus Growlab. Auckland, New Zealand",
  big: "The person who scopes your project is the person who writes the code, deploys it, and answers when something breaks.",
  paragraphs: [
    ["I am Rayyan Abzal, an AI consultant and engineer in Auckland, New Zealand, running a solo practice. I have shipped production systems across creator-economy CRMs, payout automation, and on-chain platforms, for clients in New Zealand, Malta, and the US. Different domains, same engine: find the manual bottleneck, replace it with the lightest system that solves it."],
    ["Solo by design, so there is no accounts team and no junior developer getting handed the actual build. You talk to me, I write the system, you get the outcome."],
    [
      "Alongside the practice I work as a Full Stack Developer and AI Engineer at ",
      { link: "Growlab", href: GROWLAB_URL },
      ", an AI transformation consultancy in Parnell, Auckland, building custom AI systems for infrastructure and engineering firms. Same discipline there as here: production systems that a real team runs every day.",
    ],
  ] as readonly Rich[],
  principlesHeading: "AI is a tool, not a deliverable",
  principlesIntro: "Four principles shape every engagement.",
  processHeading: "How every engagement runs.",
  processLede: "Every engagement runs the same way. You always know what stage we are at.",
  testimonialsHeading: "What clients say.",
  faqHeading: "Common questions.",
  ctaTitle: "Bring the rest to the call.",
  ctaBody:
    "Free, 30 minutes, no pitch. You describe how your business runs, I tell you honestly whether AI can help.",
  ctaButton: "Book a free intro call",
} as const;

export const ABOUT_SIDE_CARDS: readonly AboutSideCard[] = [
  {
    label: "Day job",
    title: "AI engineer at Growlab",
    body: [
      "Full-stack and AI work for an Auckland AI transformation consultancy, alongside this practice. ",
      { link: "growlab.co.nz", href: GROWLAB_URL },
    ],
  },
  { label: "Stack", title: STACK_TITLE, body: [STACK_NOTE] },
  {
    label: "Work",
    title: "Four client builds, all live",
    body: ["Plus three personal builds. ", { link: "See the projects", href: "/work" }, "."],
  },
  { label: "Capacity", title: "Two active projects, maximum", body: ["Depth over breadth. Currently open for the next one."] },
  {
    label: "Location",
    title: "Auckland, New Zealand (UTC+12)",
    body: ["Everything runs remotely: the call, weekly updates, a live staging link, handover."],
  },
];

/** The run of the lead testimonial that gets the single gold marker. */
export const LEAD_QUOTE_MARK = "It saved us hours every week.";
