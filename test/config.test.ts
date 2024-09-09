import { describe, expect, it } from "vitest";
import { loadConfig } from "../src/config";

describe("config", () => {
  it("should load npmopen.config.ts file", async () => {
    const config = await loadConfig("./test/fixtures/1");
    expect(config.npm).toBe(true);
  });
});
