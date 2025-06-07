"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = require("../../rules/default");
var engine_1 = require("../../engine/engine");
var detectPhishing = function (url) {
    var rules = default_1.DEFAULT_RULES; // Might be presets eventually?
    var threshold = 0.9; // Might be customizable?
    var engine = new engine_1.Engine(rules, threshold);
    return engine.detect(url);
};
// @ts-ignore
browser.webRequest.onBeforeRequest.addListener(function (details) {
    var currentUrl = details.url;
    var detectionResult = detectPhishing(currentUrl);
    if (detectionResult.isPhishing) {
        return { cancel: true }; // Block the request
    }
}, { urls: ["<all_urls>"] }, // Apply to all URLs
["blocking"] // Enable blocking
);
