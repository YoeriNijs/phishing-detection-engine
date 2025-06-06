import { DetectionResult } from "../model/detection-result";
import { PhishingRules } from "../model/phishing-rules";
import { PhishingRuleType } from "../model/phishing-rule-type";
import { PhishingRuleFactory } from "./rules/phishing-rule-factory";

interface EngineResult {
  isPhishing: boolean;
  phishingProbability: number;
}

const NO_PHISHING_RESULT: DetectionResult = {
  isPhishing: false,
  phishingProbability: 0,
};

export class Engine {
  constructor(
    private readonly _rules: PhishingRules,
    private readonly _threshold = 0.9,
  ) {}

  detect(url: string): DetectionResult {
    // When we have no rules, then just mark the url as safe
    if (!this._rules.include && !this._rules.exclude) {
      return NO_PHISHING_RESULT;
    }

    const containsProbability = this.runType("contains", url);
    const startsWithProbability = this.runType("startswith", url);
    const endsWithProbability = this.runType("endswith", url);
    const engineResult = this.calculateResult([
      containsProbability,
      startsWithProbability,
      endsWithProbability,
    ]);
    return {
      isPhishing: engineResult.isPhishing,
      phishingProbability: engineResult.phishingProbability,
    };
  }

  private runType(type: PhishingRuleType, url: string): number {
    let totalWeight = 0;
    let nRules: number =
      (this._rules.include?.filter((r) => r.phishingRuleType === type).length ||
        0) +
      (this._rules.exclude?.filter((r) => r.phishingRuleType === type).length ||
        0);

    const phishingRuleFactory = new PhishingRuleFactory();
    const phishingRuleImpl = phishingRuleFactory.getPhishingRuleImpl(type);
    if (this._rules.include) {
      // The weight is going up when the include rule exists
      this._rules.include
        .filter((r) => r.phishingRuleType === type)
        .filter((r) => phishingRuleImpl.isApplicable(r, url))
        .map((r) => r.weight)
        .forEach((weight) => (totalWeight += weight));
    }

    if (this._rules.exclude) {
      // The weight is going down when the exclude rule exists
      this._rules.exclude
        .filter((r) => r.phishingRuleType === type)
        .filter((r) => phishingRuleImpl.isApplicable(r, url))
        .map((r) => r.weight)
        .forEach((weight) => (totalWeight -= weight));
    }

    return totalWeight === 0 ? 0 : totalWeight / nRules;
  }

  private calculateResult(numbers: number[]): EngineResult {
    const filteredNumbers = numbers.filter((n) => n !== 0);
    if (filteredNumbers.length === 0) {
      return NO_PHISHING_RESULT;
    }

    const totalNumbers = filteredNumbers.reduce(
      (acc, number) => acc + number,
      0,
    );
    const probability = totalNumbers / filteredNumbers.length;
    return {
      isPhishing: probability > this._threshold,
      phishingProbability: probability,
    };
  }
}
