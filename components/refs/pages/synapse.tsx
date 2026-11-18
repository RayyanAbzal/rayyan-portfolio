import type { DirectionPages } from "./types";
import { SynapseAbout } from "./synapse-about";
import { SynapseCase } from "./synapse-case";
import { SynapseContact } from "./synapse-contact";
import { SynapseProjects } from "./synapse-projects";

import "@/app/styles/refs/synapse.css";
import "@/app/styles/refs/synapse-pages.css";

// TEMPORARY: the synapse direction's inner pages (dark panels, wave hero, stair steps).
export const PAGES: DirectionPages = {
  projects: () => <SynapseProjects />,
  about: () => <SynapseAbout />,
  contact: () => <SynapseContact />,
  caseStudy: ({ slug }) => <SynapseCase slug={slug} />,
};
