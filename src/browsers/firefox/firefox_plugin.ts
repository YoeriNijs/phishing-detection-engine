import { DEFAULT_RULES } from "../../rules/default";
import { Engine } from "../../engine/engine";

class FirefoxPlugin {
  constructor() {
    this.checkPhishing();
  }

  private checkPhishing() {
    const rules = DEFAULT_RULES; // Might be presets eventually?
    const threshold = 0.9; // Might be customizable?
    const engine = new Engine(rules, threshold);
    const detectionResult = engine.detect(window.location.href);
    if (detectionResult.isPhishing) {
      alert("Phishing attempt detected!");
    } else {
      alert("No phishing!");
    }
  }
}

// Run the plugin
new FirefoxPlugin();
