import { describe, expect, it } from "vitest";
import { defineConfig } from "../src";

describe("index", () => {
  it("should export defineConfig function", () => {
    expect(typeof defineConfig).toBe("function");
  });
});
