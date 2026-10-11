import { findMarkdownPage, markdownPages } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site";

interface MarkdownRouteContext {
  params: Promise<{ slug: string[] }>;
}

export const dynamicParams = false;

/** `/md/index`, `/md/work`, `/md/work/<slug>`: targets of the `.md` and Accept rewrites. */
export function generateStaticParams(): { slug: string[] }[] {
  return markdownPages().map((page) => ({
    slug: page.path === "/" ? ["index"] : page.path.slice(1).split("/"),
  }));
}

export async function GET(_request: Request, context: MarkdownRouteContext): Promise<Response> {
  const { slug } = await context.params;
  const path = slug.length === 1 && slug[0] === "index" ? "/" : `/${slug.join("/")}`;
  const page = findMarkdownPage(path);
  if (!page) {
    return new Response("Not found\n", { status: 404 });
  }
  return new Response(page.markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      Link: `<${SITE_URL}${page.path}>; rel="canonical"`,
    },
  });
}
