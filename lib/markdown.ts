import {
  ABOUT,
  ABOUT_SIDE_CARDS,
  FAQ_ITEMS,
  PRINCIPLES,
  PROCESS_STEPS,
  TESTIMONIALS,
} from "@/content/about";
import { AGENT_GUIDANCE } from "@/content/agent-guidance";
import { CONTACT } from "@/content/contact";
import { CASE_STUDIES } from "@/content/case-studies";
import type { CaseBlock, CaseStudy } from "@/content/case-studies/types";
import { PRIVACY } from "@/content/privacy";
import { DATA_NOTE, HOME, HOME_SIDE_CARDS, OFFERS } from "@/content/home";
import { CLIENT_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";
import type { Rich } from "@/content/rich";
import { WORK } from "@/content/work";
import { CASE_SLUGS, PAGE_PATHS, markdownPath } from "@/lib/pages";
import { CALENDLY_URL, EMAIL, LINKEDIN_URL, SITE_NAME, absoluteUrl } from "@/lib/site";


/** Absolute markdown url for an internal href (fragments dropped), else the href as is. */
function mirrorUrl(href: string): string {
  if (!href.startsWith("/")) return href;
  const [path = "/"] = href.split("#");
  return absoluteUrl(markdownPath(path));
}

function richToMarkdown(value: Rich): string {
  return value
    .map((part) => {
      if (typeof part === "string") return part;
      if ("hi" in part) return part.hi;
      if ("mark" in part) return part.mark;
      if ("strong" in part) return `**${part.strong}**`;
      return `[${part.link}](${mirrorUrl(part.href)})`;
    })
    .join("");
}

function richToText(value: Rich): string {
  return value
    .map((part) => {
      if (typeof part === "string") return part;
      if ("hi" in part) return part.hi;
      if ("mark" in part) return part.mark;
      if ("strong" in part) return part.strong;
      return part.link;
    })
    .join("");
}

function contactBlock(buttonLabel: string): string {
  return [
    `[${buttonLabel}](${CALENDLY_URL})`,
    `Email: [${EMAIL}](mailto:${EMAIL})`,
    `LinkedIn: ${LINKEDIN_URL}`,
  ].join("\n\n");
}

function join(sections: readonly string[]): string {
  return `${sections.join("\n\n")}\n`;
}

function bullet(text: string): string {
  return `- ${text}`;
}

function homeMarkdown(): string {
  const offers = OFFERS.map((offer) =>
    bullet(
      `**${offer.title}** (${offer.duration}, ${offer.price}): ${offer.body} [${offer.linkLabel}](${mirrorUrl(offer.linkHref)})`,
    ),
  );
  const projects = CLIENT_PROJECTS.map((project) =>
    bullet(
      `[${project.title}](${mirrorUrl(`/work/${project.slug}`)}) (${project.name}): ${project.blurb} ${project.outcome}`,
    ),
  );
  return join([
    `# ${richToText(HOME.heroHeadline)}`,
    HOME.heroLede,
    `## ${HOME.workTitle}`,
    HOME.workLede,
    projects.join("\n"),
    DATA_NOTE,
    `[${HOME.workLink}](${mirrorUrl("/work")})`,
    `## ${HOME.servicesTitle}`,
    HOME.servicesLede,
    offers.join("\n"),
    `## ${SITE_NAME}`,
    HOME.aboutRole,
    HOME.aboutBig,
    ...HOME.aboutParagraphs,
    `[${HOME.aboutLink}](${mirrorUrl("/about")})`,
    HOME_SIDE_CARDS.map((card) => bullet(`**${card.title}**: ${richToMarkdown(card.body)}`)).join("\n"),
    `> ${richToText(HOME.quote)} (${HOME.quoteRole}, ${HOME.quoteProject})`,
    `## ${HOME.ctaTitle}`,
    HOME.ctaBody,
    contactBlock(HOME.ctaButton),
  ]);
}

function workMarkdown(): string {
  const clients = CLIENT_PROJECTS.map((project) =>
    bullet(
      `[${project.title}](${mirrorUrl(`/work/${project.slug}`)}) (${project.name}): ${project.blurb} ${project.outcome}`,
    ),
  );
  const personal = PERSONAL_PROJECTS.map((project) =>
    bullet(`**${project.title}**: ${project.blurb} Stack: ${project.stack}.`),
  );
  return join([
    `# ${WORK.h1}`,
    WORK.lede,
    `## ${WORK.clientHeading}`,
    clients.join("\n"),
    DATA_NOTE,
    `## ${WORK.personalHeading}`,
    WORK.personalLede,
    personal.join("\n"),
    `## ${WORK.ctaTitle}`,
    WORK.ctaBody,
    contactBlock(WORK.ctaButton),
  ]);
}

function aboutMarkdown(): string {
  const principles = PRINCIPLES.flatMap((p) => [`### ${p.title}`, p.body]);
  const steps = PROCESS_STEPS.map((step, i) => `${i + 1}. **${step.title}** (${step.when}): ${step.body}`);
  const quotes = TESTIMONIALS.map(
    (t) => `> ${t.quote}\n>\n> ${t.role}, ${t.project} ([case study](${mirrorUrl(t.linkHref)}))`,
  );
  const faq = FAQ_ITEMS.flatMap((item) => [`### ${item.question}`, item.answer]);
  return join([
    `# ${ABOUT.h1}`,
    ABOUT.role,
    ABOUT.big,
    ...ABOUT.paragraphs.map(richToMarkdown),
    ABOUT_SIDE_CARDS.map((card) => bullet(`**${card.title}**: ${richToMarkdown(card.body)}`)).join("\n"),
    `## ${ABOUT.principlesHeading}`,
    ABOUT.principlesIntro,
    ...principles,
    `## ${ABOUT.processHeading}`,
    ABOUT.processLede,
    steps.join("\n"),
    `## ${ABOUT.testimonialsHeading}`,
    ...quotes,
    `## ${ABOUT.faqHeading}`,
    ...faq,
    `## ${ABOUT.ctaTitle}`,
    ABOUT.ctaBody,
    contactBlock(ABOUT.ctaButton),
  ]);
}

function contactMarkdown(): string {
  return join([
    `# ${CONTACT.h1}`,
    CONTACT.lede,
    `## ${CONTACT.waysHeading}`,
    [
      bullet(`[${CONTACT.bookLabel}](${CALENDLY_URL}): ${CONTACT.bookNote}`),
      bullet(`${CONTACT.emailLabel}: [${EMAIL}](mailto:${EMAIL})`),
      bullet(`${CONTACT.linkedinLabel}: ${LINKEDIN_URL}`),
    ].join("\n"),
    `## ${CONTACT.locationHeading}`,
    CONTACT.location,
    `## ${CONTACT.firstMessageHeading}`,
    CONTACT.firstMessageIntro,
    CONTACT.firstMessageItems.map(bullet).join("\n"),
    `## ${CONTACT.nextHeading}`,
    ...CONTACT.next,
  ]);
}

function privacyMarkdown(): string {
  const sections = PRIVACY.sections.flatMap((section) => [
    `## ${section.heading}`,
    ...section.paragraphs.map(richToMarkdown),
  ]);
  return join([`# ${PRIVACY.h1}`, PRIVACY.lede, PRIVACY.updatedLabel, ...sections, PRIVACY.contactNote]);
}

function blockMarkdown(block: CaseBlock): string[] {
  return [`## ${richToText(block.heading)}`, ...block.paragraphs.map(richToMarkdown)];
}

function caseMarkdown(study: CaseStudy): string {
  const quote = study.quote
    ? [`> ${richToText(study.quote.text)} (${study.quote.role}, ${study.quote.project})`]
    : [];
  return join([
    `# ${study.title}`,
    richToMarkdown(study.summary),
    study.facts.map(bullet).join("\n"),
    ...blockMarkdown(study.problem),
    ...blockMarkdown(study.built),
    ...blockMarkdown(study.outcome),
    `## Built with`,
    study.stack.join(", "),
    ...quote,
    "## Have a similar bottleneck?",
    "Free 30-minute intro call. Written proposal with a fixed price within 48 hours.",
    contactBlock("Book a free intro call"),
    `${study.prev.label}: [${study.prev.target}](${mirrorUrl(study.prev.href)})`,
    `${study.next.label}: [${study.next.target}](${mirrorUrl(study.next.href)})`,
  ]);
}

export interface MarkdownPage {
  /** Clean HTML path this page mirrors. */
  path: string;
  markdown: string;
}

/** Every page with a markdown mirror, rendered from the typed content. */
export function markdownPages(): readonly MarkdownPage[] {
  const fixed: Record<string, () => string> = {
    "/": homeMarkdown,
    "/work": workMarkdown,
    "/about": aboutMarkdown,
    "/contact": contactMarkdown,
    "/privacy": privacyMarkdown,
  };
  return PAGE_PATHS.map((path) => {
    const render = fixed[path];
    if (render) return { path, markdown: render() };
    const slug = CASE_SLUGS.find((candidate) => `/work/${candidate}` === path);
    return { path, markdown: slug ? caseMarkdown(CASE_STUDIES[slug]) : "" };
  });
}

export function findMarkdownPage(path: string): MarkdownPage | undefined {
  return markdownPages().find((page) => page.path === path);
}

function firstSentence(text: string): string {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

/** llms.txt: a lean index of services, work and about, linking the markdown mirrors. */
export function llmsTxt(): string {
  const services = OFFERS.map((offer) =>
    bullet(
      `[${offer.title}](${absoluteUrl(markdownPath("/"))}): ${firstSentence(offer.body)} ${offer.duration}, ${offer.price.toLowerCase()}.`,
    ),
  );
  const jobs = AGENT_GUIDANCE.jobs.map((job) => bullet(`${job.title} (${job.detail})`));
  const work = CLIENT_PROJECTS.map((project) =>
    bullet(
      `[${project.name}](${absoluteUrl(markdownPath(`/work/${project.slug}`))}): ${project.title}. ${project.outcome}`,
    ),
  );
  const about = [
    bullet(`[About](${absoluteUrl(markdownPath("/about"))}): ${ABOUT.big}`),
    bullet(`[Projects](${absoluteUrl(markdownPath("/work"))}): ${WORK.lede}`),
    bullet(`[Contact](${absoluteUrl(markdownPath("/contact"))}): ${CONTACT.lede}`),
    bullet(`[Privacy](${absoluteUrl(markdownPath("/privacy"))}): ${PRIVACY.lede}`),
    bullet(`[Sitemap](${absoluteUrl("/sitemap.xml")}): every public page.`),
  ];
  return join([
    `# ${SITE_NAME}, AI consultant and engineer, Auckland, New Zealand`,
    `> ${HOME.description}`,
    `Site: ${absoluteUrl("/")}\nContact: ${EMAIL}\nBooking: ${CALENDLY_URL}\nLinkedIn: ${LINKEDIN_URL}`,
    `## ${AGENT_GUIDANCE.whenToUseHeading}`,
    AGENT_GUIDANCE.audience,
    jobs.join("\n"),
    `## ${AGENT_GUIDANCE.engageHeading}`,
    `Booking: ${CALENDLY_URL}\nEmail: ${EMAIL}\n\n${AGENT_GUIDANCE.engage.map(bullet).join("\n")}`,
    `## ${AGENT_GUIDANCE.whenNotToUseHeading}`,
    AGENT_GUIDANCE.whenNotToUse,
    "## Services",
    services.join("\n"),
    "## Work",
    work.join("\n"),
    "## About",
    about.join("\n"),
  ]);
}

/** Body for a markdown request that matches no page: explains the error and points at the discovery files. */
export function markdownNotFound(): string {
  return join([
    "# Page not found",
    "No page exists at this address, so the server answered 404. Every public page is listed in the files below.",
    [
      bullet(`[llms.txt](${absoluteUrl("/llms.txt")}): index of the site for agents.`),
      bullet(`[sitemap.xml](${absoluteUrl("/sitemap.xml")}): every public page.`),
      bullet(`[Home](${absoluteUrl("/")}) ([markdown](${absoluteUrl(markdownPath("/"))})): ${HOME.description}`),
    ].join("\n"),
  ]);
}
