import { PhishingRule } from "../../model/phishing-rule";

export const createContainsRule = (
  rule: Partial<PhishingRule>,
): PhishingRule => {
  return Object.assign(
    {
      name: "phishing_rule",
      description: "phishing_rule_description",
      phishingRuleType: "contains",
      value: "contains-value",
      weight: 1,
    },
    rule,
  );
};

export const createEndsWithRule = (
  rule: Partial<PhishingRule>,
): PhishingRule => {
  return Object.assign(
    {
      name: "phishing_rule",
      description: "phishing_rule_description",
      phishingRuleType: "endswith",
      value: "endswith-value",
      weight: 1,
    },
    rule,
  );
};

export const createStartWithRule = (
  rule: Partial<PhishingRule>,
): PhishingRule => {
  return Object.assign(
    {
      name: "phishing_rule",
      description: "phishing_rule_description",
      phishingRuleType: "startswith",
      value: "startswith-value",
      weight: 1,
    },
    rule,
  );
};
