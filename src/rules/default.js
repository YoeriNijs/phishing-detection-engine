"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_RULES = void 0;
exports.DEFAULT_RULES = {
  include: [
    {
      name: "bank_include_rule_1",
      description: "Default phishing detection rule for banks",
      value: "bank",
      weight: 0.5,
      phishingRuleType: "contains",
    },
    {
      name: "bank_include_rule_2",
      description: "Default phishing detection rule for banks",
      value: "internetbankieren",
      weight: 0.5,
      phishingRuleType: "contains",
    },
  ],
  exclude: [
    {
      name: "bank_exclude_rule_1",
      description: "Default phishing detection rule for banks",
      value: "rabobank.nl",
      weight: 0.5,
      phishingRuleType: "contains",
    },
    {
      name: "bank_exclude_rule_2",
      description: "Default phishing detection rule for banks",
      value: "ing.nl",
      weight: 0.5,
      phishingRuleType: "contains",
    },
    {
      name: "bank_exclude_rule_3",
      description: "Default phishing detection rule for banks",
      value: "bunq.nl",
      weight: 0.5,
      phishingRuleType: "contains",
    },
    {
      name: "bank_exclude_rule_4",
      description: "Default phishing detection rule for banks",
      value: "abnamro.nl",
      weight: 0.5,
      phishingRuleType: "contains",
    },
  ],
};
