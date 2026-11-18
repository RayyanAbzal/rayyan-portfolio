import type { DirectionPages } from "./types";

// TEMPORARY: the ses direction's inner pages. Placeholder until designed.
function Pending({ page }: { page: string }) {
  return (
    <main id="top" className="ref-root" style={{ padding: "120px 24px", textAlign: "center" }}>
      <p>The ses {page} page is being designed.</p>
    </main>
  );
}

export const PAGES: DirectionPages = {
  projects: () => <Pending page="projects" />,
  about: () => <Pending page="about" />,
  contact: () => <Pending page="contact" />,
  caseStudy: () => <Pending page="case study" />,
};
