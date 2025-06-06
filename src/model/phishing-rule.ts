import { PhishingRuleType } from "./phishing-rule-type";

export interface PhishingRule {
  name: string;
  description: string;
  phishingRuleType: PhishingRuleType;
  value: string;
  weight: number;
}
