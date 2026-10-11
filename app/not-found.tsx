import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: { absolute: "404: Not Found | Rayyan Abzal" },
  robots: "noindex",
};

export default function NotFound() {
  return (
    <main id="top" tabIndex={-1} className="wrap pt-[clamp(64px,10vw,140px)] pb-[120px]">
      <h1 className="display text-[clamp(4rem,12vw,10rem)]">
        404<span className="mark px-[0.1em]">.</span>
      </h1>
      <p className="lede mt-6 mb-9">This page doesn’t exist. The rest of the site does.</p>
      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/work">See the projects</Link>
        </Button>
      </div>
    </main>
  );
}
