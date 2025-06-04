import {PhishingRule} from "../model/phishing-rule";

export const createContainsRule = (rule: Partial<PhishingRule>): PhishingRule => {
    return Object.assign({
        name: 'phishing_rule',
        description: 'phishing_rule_description',
        phishingRuleType: 'contains',
        value: 'contains-value',
        weight: 1
    }, rule);
}
