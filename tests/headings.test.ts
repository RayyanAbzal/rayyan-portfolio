import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// contact and privacy have one h1 and flat sections, so a bare h3 would skip a level
describe("flat pages keep a gapless heading outline", () => {
  for (const path of ["app/contact/page.tsx", "app/privacy/page.tsx"]) {
    it(`${path} uses h2 for its sections, never h3`, () => {
      const source = readFileSync(path, "utf8");
      expect(source).toMatch(/<h1/);
      expect(source).toMatch(/<h2/);
      expect(source).not.toMatch(/<h3/);
    });
  }
});
