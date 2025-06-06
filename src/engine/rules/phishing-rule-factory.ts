import { IPhishingRuleChecker } from "./impl/i-phishing-rule-checker";
import { PhishingRuleType } from "../../model/phishing-rule-type";
import { PhishingRuleContains } from "./impl/phishing-rule-contains";
import { PhishingRuleStartsWith } from "./impl/phishing-rule-startswith";
import { PhishingRuleEndsWith } from "./impl/phishing-rule-endswith";

export class PhishingRuleFactory {
  getPhishingRuleImpl(type: PhishingRuleType): IPhishingRuleChecker {
    switch (type) {
      case "contains":
        return new PhishingRuleContains();
      case "startswith":
        return new PhishingRuleStartsWith();
      case "endswith":
        return new PhishingRuleEndsWith();
      default:
        throw new Error(`Phishing rule type ${type} is not supported`);
    }
  }
}
