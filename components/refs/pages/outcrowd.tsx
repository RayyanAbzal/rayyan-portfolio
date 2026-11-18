import type { DirectionPages } from "./types";
import { OcAbout } from "./outcrowd-about";
import { OcCase } from "./outcrowd-case";
import { OcContact } from "./outcrowd-contact";
import { OcProjects } from "./outcrowd-projects";

export const PAGES: DirectionPages = {
  projects: () => <OcProjects />,
  about: () => <OcAbout />,
  contact: () => <OcContact />,
  caseStudy: ({ slug }) => <OcCase slug={slug} />,
};
