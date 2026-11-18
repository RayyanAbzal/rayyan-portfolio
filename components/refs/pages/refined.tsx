import { RefinedAbout } from "./refined-about";
import { RefinedCase } from "./refined-case";
import { RefinedContact } from "./refined-contact";
import { RefinedProjects } from "./refined-projects";
import type { DirectionPages } from "./types";

// TEMPORARY: the refined direction's inner pages. Shared chrome and tokens
// live in refined-chrome.tsx and app/styles/refs/refined-pages.css.
export const PAGES: DirectionPages = {
  projects: () => <RefinedProjects />,
  about: () => <RefinedAbout />,
  contact: () => <RefinedContact />,
  caseStudy: ({ slug }) => <RefinedCase slug={slug} />,
};
