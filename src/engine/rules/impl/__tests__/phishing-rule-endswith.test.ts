import { describe, expect } from "@jest/globals";
import { createEndsWithRule } from "../../../../testing";
import { PhishingRuleEndsWith } from "../phishing-rule-endswith";

describe("Phishing rule endswith tests", () => {
  it("should init", () => {
    const rule = new PhishingRuleEndsWith();
    expect(rule).toBeDefined();
  });

  it("should return true when url ends with value", () => {
    const implementation = new PhishingRuleEndsWith();
    const containsRule = createEndsWithRule({ value: "com" });
    expect(implementation.isApplicable(containsRule, "www.google.com")).toBe(
      true,
    );
  });

  it("should return false when url does not end with value", () => {
    const implementation = new PhishingRuleEndsWith();
    const containsRule = createEndsWithRule({ value: "www" });
    expect(implementation.isApplicable(containsRule, "www.google.com")).toBe(
      false,
    );
  });
});
