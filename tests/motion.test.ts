import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = new URL("../", import.meta.url).pathname;
const read = (path: string): string => readFileSync(join(root, path), "utf8");

function files(dir: string, ext: RegExp): string[] {
  return readdirSync(join(root, dir)).flatMap((name) => {
    const rel = `${dir}/${name}`;
    return statSync(join(root, rel)).isDirectory() ? files(rel, ext) : ext.test(name) ? [rel] : [];
  });
}

describe("motion rules", () => {
  const sources = [
    ...files("app/styles", /\.css$/),
    "app/globals.css",
    ...files("components", /\.tsx$/),
  ];

  it("never transitions `all`", () => {
    for (const path of sources) {
      const text = read(path);
      expect(text, path).not.toMatch(/transition:\s*all\b/);
      expect(text, path).not.toMatch(/transition-all\b/);
    }
  });

  it("hero rules do not depend on the .js gate", () => {
    const css = read("app/styles/motion.css");
    const heroRules = css.split("\n").filter((line) => line.includes(".hero-panel"));
    expect(heroRules.length).toBeGreaterThan(0);
    for (const line of heroRules) expect(line).not.toContain(".js");
  });

  it("declares the hero animation only under no-preference and clears it under reduce", () => {
    const css = read("app/styles/motion.css");
    const noPref = css.indexOf("@media (prefers-reduced-motion: no-preference)");
    const reduce = css.indexOf("@media (prefers-reduced-motion: reduce)");
    expect(noPref).toBeGreaterThanOrEqual(0);
    expect(css.indexOf("animation: site-enter 300ms")).toBeGreaterThan(noPref);
    expect(css.indexOf("animation: site-enter 300ms")).toBeLessThan(reduce);
    const reduceBlock = css.slice(reduce);
    for (const name of [".hero-panel h1", "[data-stagger].reveal > *", ".vis-live i", ".vis-runner", "accordion-content", "[data-slot=\"button\"]"]) {
      expect(reduceBlock, name).toContain(name);
    }
  });

  it("uses 300ms entrances with a 100ms stagger and named properties", () => {
    const css = read("app/styles/motion.css");
    expect(css).toContain("transform: translateY(12px)");
    expect(css).toContain("filter: blur(4px)");
    expect(css).toContain("--stagger, 100ms");
    expect(css).toMatch(/transition:\s*\n\s*opacity 300ms[\s\S]*transform 300ms[\s\S]*filter 300ms/);
    expect(read("components/reveal.tsx")).toContain("const SETTLE_MS = 700;");
  });

  it("gives the button a 0.96 press scale that skips disabled controls, at 150ms", () => {
    const button = read("components/ui/button.tsx");
    expect(button).toContain("active:scale-[0.96]");
    expect(button).toContain(":not(:disabled):not([aria-disabled=true])");
    expect(button).toContain("duration-150");
    expect(button).not.toContain("duration-[350ms]");
  });

  it("does not re-trigger the runner on hover and pulses twice", () => {
    const cards = read("app/styles/cards.css");
    expect(cards).not.toContain("vis-run-again");
    expect(cards).toMatch(/pulse-soft 1\.8s ease-in-out 2;/);
  });

  it("keeps nav and footer out of the root view transition", () => {
    const css = read("app/styles/motion.css");
    expect(css).toContain("view-transition-name: site-nav");
    expect(css).toContain("::view-transition-group(site-nav)");
    expect(css).toContain("animation-duration: 150ms");
  });
});
