import "@/app/styles/refs/brightman.css";
import "@/app/styles/refs/brightman-pages.css";

import { BrightmanAbout } from "./brightman-about";
import { BrightmanCase } from "./brightman-case";
import { BrightmanContact } from "./brightman-contact";
import { BrightmanProjects } from "./brightman-projects";
import type { DirectionPages } from "./types";

// TEMPORARY: the brightman direction's inner pages (home is components/refs/brightman.tsx).
export const PAGES: DirectionPages = {
  projects: () => <BrightmanProjects />,
  about: () => <BrightmanAbout />,
  contact: () => <BrightmanContact />,
  caseStudy: ({ slug }) => <BrightmanCase slug={slug} />,
};
