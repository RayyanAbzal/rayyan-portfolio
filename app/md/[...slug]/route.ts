import { findMarkdownPage, markdownNotFound, markdownPages } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site";

interface MarkdownRouteContext {
  params: Promise<{ slug: string[] }>;
}

/** `/md/index`, `/md/work`, `/md/work/<slug>`: targets of the `.md` and Accept rewrites. */
export function generateStaticParams(): { slug: string[] }[] {
  return markdownPages().map((page) => ({
    slug: page.path === "/" ? ["index"] : page.path.slice(1).split("/"),
  }));
}

const BASE_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
};

export async function GET(_request: Request, context: MarkdownRouteContext): Promise<Response> {
  const { slug } = await context.params;
  const path = slug.length === 1 && slug[0] === "index" ? "/" : `/${slug.join("/")}`;
  const page = findMarkdownPage(path);
  if (!page) {
    // Real 404 status, but a body an agent can read and act on.
    return new Response(markdownNotFound(), { status: 404, headers: BASE_HEADERS });
  }
  return new Response(page.markdown, {
    headers: { ...BASE_HEADERS, Link: `<${SITE_URL}${page.path}>; rel="canonical"` },
  });
}
