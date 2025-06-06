import { PhishingRule } from "./phishing-rule";

export interface PhishingRules {
  include?: PhishingRule[];
  exclude?: PhishingRule[];
}
