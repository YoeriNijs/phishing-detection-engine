"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhishingRuleEndsWith = void 0;
var PhishingRuleEndsWith = /** @class */ (function () {
  function PhishingRuleEndsWith() {}
  PhishingRuleEndsWith.prototype.type = function () {
    return "endswith";
  };
  PhishingRuleEndsWith.prototype.isApplicable = function (rule, url) {
    return url.endsWith(rule.value.toLowerCase());
  };
  return PhishingRuleEndsWith;
})();
exports.PhishingRuleEndsWith = PhishingRuleEndsWith;
