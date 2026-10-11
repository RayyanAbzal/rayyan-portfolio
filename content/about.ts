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
