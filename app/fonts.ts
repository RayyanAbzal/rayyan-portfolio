import localFont from "next/font/local";

// Open Runde, self-hosted (OFL 1.1, see fonts/OpenRunde-LICENSE.txt): a softly
// rounded Inter. Four static weights, each subset to latin plus latin-ext A and
// the Vietnamese/macron block (te reo Maori macrons), about 45 KB per file.
const openRunde = localFont({
  src: [
    { path: "./fonts/open-runde-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/open-runde-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/open-runde-semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/open-runde-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-runde",
  display: "swap",
  preload: true,
  fallback: ["Inter", "system-ui", "-apple-system", "Helvetica Neue", "Arial", "sans-serif"],
});

export const fontVariables = openRunde.variable;
