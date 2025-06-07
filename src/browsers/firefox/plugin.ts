import {DEFAULT_RULES} from "../../rules/default";
import {Engine} from "../../engine/engine";

const detectPhishing = (url: string) => {
    const rules = DEFAULT_RULES; // Might be presets eventually?
    const threshold = 0.9; // Might be customizable?
    const engine = new Engine(rules, threshold);
    return engine.detect(url);
}

// @ts-ignore
browser.webRequest.onBeforeRequest.addListener(details => {
        const currentUrl = details.url;
        const detectionResult = detectPhishing(currentUrl);
        if (detectionResult.isPhishing) {
            return {cancel: true}; // Block the request
        }
    },
    {urls: ["<all_urls>"]}, // Apply to all URLs
    ["blocking"] // Enable blocking
);