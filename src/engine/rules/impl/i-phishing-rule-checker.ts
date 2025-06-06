import { PhishingRuleType } from "../../../model/phishing-rule-type";
import { PhishingRule } from "../../../model/phishing-rule";

export interface IPhishingRuleChecker {
  type: () => PhishingRuleType;
  isApplicable: (rule: PhishingRule, url: string) => boolean;
}
