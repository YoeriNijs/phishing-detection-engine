import { describe, expect } from "@jest/globals";
import { PhishingRuleContains } from "../phishing-rule-contains";
import { createContainsRule } from "../../../../testing";

describe("Phishing Rule contains tests", () => {
  it("should init", () => {
    const rule = new PhishingRuleContains();
    expect(rule).toBeDefined();
  });

  it.each([
    { url: "www.google.com", value: "www" },
    { url: "www.google.com", value: "google" },
    { url: "www.google.com", value: "com" },
  ])("should return true when url contains value", (scenario) => {
    const implementation = new PhishingRuleContains();
    const containsRule = createContainsRule({ value: scenario.value });
    expect(implementation.isApplicable(containsRule, scenario.url)).toBe(true);
  });

  it.each([
    { url: "www.google.com", value: "" },
    { url: "www.google.com", value: undefined },
    { url: "www.google.com", value: "something else" },
  ])("should return false when url does not contain value", (scenario) => {
    const implementation = new PhishingRuleContains();
    const containsRule = createContainsRule({ value: scenario.value });
    expect(implementation.isApplicable(containsRule, scenario.url)).toBe(false);
  });
});
