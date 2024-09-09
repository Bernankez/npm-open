import { describe, expect, it } from "vitest";
import { defineConfig, resolvePackage } from "../src";

describe("index", () => {
  it("should export defineConfig function", () => {
    expect(typeof defineConfig).toBe("function");
  });

  it("should export resolvePackage function", () => {
    expect(typeof resolvePackage).toBe("function");
  });
});
