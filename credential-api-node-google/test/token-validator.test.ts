import { describe, expect, it } from "vitest";
import { extractBearerToken } from "../src/idp/token-validator.js";

describe("extractBearerToken", () => {
  it("returns the bearer token", () => {
    expect(extractBearerToken("Bearer abc.def.ghi")).toBe("abc.def.ghi");
  });

  it("rejects invalid authorization scheme", () => {
    expect(() => extractBearerToken("Basic token")).toThrow("Bearer");
  });
});
