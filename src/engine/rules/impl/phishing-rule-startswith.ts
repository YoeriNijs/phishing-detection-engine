import { IPhishingRuleChecker } from "./i-phishing-rule-checker";
import { PhishingRuleType } from "../../../model/phishing-rule-type";
import { PhishingRule } from "../../../model/phishing-rule";

export class PhishingRuleStartsWith implements IPhishingRuleChecker {
  type(): PhishingRuleType {
    return "startswith";
  }

  isApplicable(rule: PhishingRule, url: string): boolean {
    return url.startsWith(rule.value.toLowerCase());
  }
}
