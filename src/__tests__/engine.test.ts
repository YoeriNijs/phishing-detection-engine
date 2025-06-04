import {describe, expect} from '@jest/globals';
import {Engine} from "../engine";
import {createContainsRule} from "./detection-rule.fixture";

describe('Engine tests', () => {

    it('should init', () => {
        expect(new Engine({include: []})).toBeDefined();
    });

    it('should run isPhishing false and probability 1 when no rules set', () => {
       const engine = new Engine({});
       expect(engine.detect("https://some_evil_domain.com")).toEqual({
           isPhishing: false,
           probability: 1,
       })
    });

    describe('# include', () => {
        it('Should return isPhishing true when includes', () => {
            const rule = createContainsRule({value: "google.com"});
            const engine = new Engine({include: [rule]})
            const result = engine.detect("https://www.google.com");
            expect(result.isPhishing).toBe(true);
        });

        it('Should return isPhishing false when not includes', () => {
            const rule = createContainsRule({value: "google.nl"});
            const engine = new Engine({include: [rule]})
            const result = engine.detect("https://www.google.com");
            expect(result.isPhishing).toBe(false);
        });

        it('Should return valid probability when matching', () => {
            const rule = createContainsRule({value: "google.com", weight: 1});
            const engine = new Engine({include: [rule]})
            const result = engine.detect("https://www.google.com");
            expect(result.probability).toBe(1);
        });

        it('Should return valid probability when not matching', () => {
            const rule = createContainsRule({value: "google.nl", weight: 1});
            const engine = new Engine({include: [rule]})
            const result = engine.detect("https://www.google.com");
            expect(result.probability).toBe(0);
        });
    });
})