"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhishingRuleFactory = void 0;
var phishing_rule_contains_1 = require("./impl/phishing-rule-contains");
var phishing_rule_startswith_1 = require("./impl/phishing-rule-startswith");
var phishing_rule_endswith_1 = require("./impl/phishing-rule-endswith");
var PhishingRuleFactory = /** @class */ (function () {
  function PhishingRuleFactory() {}
  PhishingRuleFactory.prototype.getPhishingRuleImpl = function (type) {
    switch (type) {
      case "contains":
        return new phishing_rule_contains_1.PhishingRuleContains();
      case "startswith":
        return new phishing_rule_startswith_1.PhishingRuleStartsWith();
      case "endswith":
        return new phishing_rule_endswith_1.PhishingRuleEndsWith();
      default:
        throw new Error(
          "Phishing rule type ".concat(type, " is not supported"),
        );
    }
  };
  return PhishingRuleFactory;
})();
exports.PhishingRuleFactory = PhishingRuleFactory;
