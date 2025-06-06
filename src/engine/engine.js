"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
var phishing_rule_factory_1 = require("./rules/phishing-rule-factory");
var NO_PHISHING_RESULT = {
  isPhishing: false,
  phishingProbability: 0,
};
var Engine = /** @class */ (function () {
  function Engine(_rules, _threshold) {
    if (_threshold === void 0) {
      _threshold = 0.9;
    }
    this._rules = _rules;
    this._threshold = _threshold;
  }
  Engine.prototype.detect = function (url) {
    // When we have no rules, then just mark the url as safe
    if (!this._rules.include && !this._rules.exclude) {
      return NO_PHISHING_RESULT;
    }
    var containsProbability = this.runType("contains", url);
    var startsWithProbability = this.runType("startswith", url);
    var endsWithProbability = this.runType("endswith", url);
    var engineResult = this.calculateResult([
      containsProbability,
      startsWithProbability,
      endsWithProbability,
    ]);
    return {
      isPhishing: engineResult.isPhishing,
      phishingProbability: engineResult.phishingProbability,
    };
  };
  Engine.prototype.runType = function (type, url) {
    var _a, _b;
    var totalWeight = 0;
    var nRules =
      (((_a = this._rules.include) === null || _a === void 0
        ? void 0
        : _a.filter(function (r) {
            return r.phishingRuleType === type;
          }).length) || 0) +
      (((_b = this._rules.exclude) === null || _b === void 0
        ? void 0
        : _b.filter(function (r) {
            return r.phishingRuleType === type;
          }).length) || 0);
    var phishingRuleFactory = new phishing_rule_factory_1.PhishingRuleFactory();
    var phishingRuleImpl = phishingRuleFactory.getPhishingRuleImpl(type);
    if (this._rules.include) {
      // The weight is going up when the include rule exists
      this._rules.include
        .filter(function (r) {
          return r.phishingRuleType === type;
        })
        .filter(function (r) {
          return phishingRuleImpl.isApplicable(r, url);
        })
        .map(function (r) {
          return r.weight;
        })
        .forEach(function (weight) {
          return (totalWeight += weight);
        });
    }
    if (this._rules.exclude) {
      // The weight is going down when the exclude rule exists
      this._rules.exclude
        .filter(function (r) {
          return r.phishingRuleType === type;
        })
        .filter(function (r) {
          return phishingRuleImpl.isApplicable(r, url);
        })
        .map(function (r) {
          return r.weight;
        })
        .forEach(function (weight) {
          return (totalWeight -= weight);
        });
    }
    return totalWeight === 0 ? 0 : totalWeight / nRules;
  };
  Engine.prototype.calculateResult = function (numbers) {
    var filteredNumbers = numbers.filter(function (n) {
      return n !== 0;
    });
    if (filteredNumbers.length === 0) {
      return NO_PHISHING_RESULT;
    }
    var totalNumbers = filteredNumbers.reduce(function (acc, number) {
      return acc + number;
    }, 0);
    var probability = totalNumbers / filteredNumbers.length;
    return {
      isPhishing: probability > this._threshold,
      phishingProbability: probability,
    };
  };
  return Engine;
})();
exports.Engine = Engine;
