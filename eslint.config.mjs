import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "legacy-static/**",
    ".claude/**",
    // Vendored teardown skill tooling (CommonJS build scripts), not app code.
    "tools/teardown/**",
    ".superpowers/**",
    "docs/**",
    ".impeccable/**",
  ]),
]);

export default eslintConfig;
