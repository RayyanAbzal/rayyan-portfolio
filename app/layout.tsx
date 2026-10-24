import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import { fontVariables } from "./fonts";
import { CalendlyAssets } from "@/components/calendly-assets";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon-180.png", sizes: "180x180" }],
  },
};

// Adds `.js` (hidden reveal states) only when motion is allowed, and arms a
// 3s failsafe that reveals everything if hydration never runs.
const MOTION_GATE = `(function(){var d=document.documentElement;if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("js");window.__mfail=window.setTimeout(function(){d.classList.add("motion-failed")},3000)}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_GATE }} />
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="" />
      </head>
      <body>
        <a className="skip" href="#top">
          Skip to content
        </a>
        <SiteNav />
        {children}
        <SiteFooter />
        <CalendlyAssets />
        <Analytics />
      </body>
    </html>
  );
}
