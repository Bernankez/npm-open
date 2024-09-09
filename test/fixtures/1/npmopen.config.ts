import { defineConfig } from "../../../src";

export default defineConfig({
  npm: true,
  registry: [
    {
      name: "test",
      url: "test",
      website: pkg => pkg,
    },
  ],
});
