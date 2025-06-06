"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhishingRuleStartsWith = void 0;
var PhishingRuleStartsWith = /** @class */ (function () {
  function PhishingRuleStartsWith() {}
  PhishingRuleStartsWith.prototype.type = function () {
    return "startswith";
  };
  PhishingRuleStartsWith.prototype.isApplicable = function (rule, url) {
    return url.startsWith(rule.value.toLowerCase());
  };
  return PhishingRuleStartsWith;
})();
exports.PhishingRuleStartsWith = PhishingRuleStartsWith;
