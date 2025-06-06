"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhishingRuleContains = void 0;
var PhishingRuleContains = /** @class */ (function () {
  function PhishingRuleContains() {}
  PhishingRuleContains.prototype.type = function () {
    return "contains";
  };
  PhishingRuleContains.prototype.isApplicable = function (rule, url) {
    if (!rule || !rule.value) {
      return false; // TODO: think whether we should throw an error here
    }
    if (rule.value.length < 1) {
      return false;
    }
    return url.indexOf(rule.value.toLowerCase()) !== -1;
  };
  return PhishingRuleContains;
})();
exports.PhishingRuleContains = PhishingRuleContains;
