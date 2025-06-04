import {DetectionResult} from "../model/detection-result";
import {PhishingRules} from "../model/phishing-rules";

interface EngineResult {
    isPhishing: boolean;
    isPhishingProbability: number;
}

export class Engine {
    constructor(private readonly _rules: PhishingRules,
                private readonly _threshold = 0.9) {}

    detect(url: string): DetectionResult {
        // When we have no rules, then just mark the url as safe
        if (!this._rules.include && !this._rules.exclude) {
            return {
                isPhishing: false,
                isPhishingProbability: 0
            };
        }

        const containsProbability = this.runContains(url);
        const engineResult = this.calculateResult([containsProbability])
        return {
            isPhishing: engineResult.isPhishing,
            isPhishingProbability: engineResult.isPhishingProbability
        }
    }

    private runContains(url: string): number {
        let totalWeight = 0;
        let nRules: number = (
                this._rules.include?.filter(r => r.phishingRuleType === 'contains').length || 0
        ) + (
                this._rules.exclude?.filter(r => r.phishingRuleType === 'contains').length || 0
        );

        if (this._rules.include) {
            // The weight is going up when the include rule exists
            this._rules.include
                .filter(r => r.phishingRuleType === 'contains')
                .filter(r => url.indexOf(r.value.toLowerCase()) !== -1)
                .map(r => r.weight)
                .forEach(weight => totalWeight += weight);
        }

        if (this._rules.exclude) {
            // The weight is going down when the exclude rule exists
            this._rules.exclude
                .filter(r => r.phishingRuleType === 'contains')
                .filter(r => url.indexOf(r.value.toLowerCase()) !== -1)
                .map(r => r.weight)
                .forEach(weight => totalWeight -= weight);
        }

        return totalWeight / nRules;
    }

    private calculateResult(numbers: number[]): EngineResult {
        const totalNumbers = numbers.reduce((acc, number) => acc + number, 0);
        const probability = totalNumbers / numbers.length;
        return {
            isPhishing: probability > this._threshold,
            isPhishingProbability: probability
        }
    }
}