import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/cli.ts",
  ],
  shims: true,
  inject: ["cjs-shims.ts"],
});
