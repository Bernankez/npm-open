import { describe, expect, it } from "vitest";
import { loadConfig } from "../src/config";

describe("config", () => {
  it("should load npmopen.config.ts file", async () => {
    // how to pass custom config file
    const config = await loadConfig();
    expect(config).toBeDefined();
  });
});
