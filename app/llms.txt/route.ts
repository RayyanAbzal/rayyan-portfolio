import { llmsTxt } from "@/lib/markdown";

/** Generated from the same typed content as the pages, so it cannot drift. */
export function GET(): Response {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
