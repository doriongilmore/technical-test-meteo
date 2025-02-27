import { sumNumbersInJson } from "./jsonSum";

describe("sumNumbersInJson", () => {
    it("should sum all numbers in a nested JSON object", () => {
        const input = {
            a: 5,
            b: {
                c: 3,
                d: {
                    e: 8,
                    f: "hello world!",
                },
            },
            g: [1, 2, { h: 4 }],
        };

        expect(sumNumbersInJson(input)).toBe(23);
    });

    it("should handle empty objects", () => {
        expect(sumNumbersInJson({})).toBe(0);
    });

    it("should handle arrays", () => {
        expect(sumNumbersInJson([1, 2, 3])).toBe(6);
    });

    it("should ignore non-numeric values", () => {
        expect(
            sumNumbersInJson({
                a: "string",
                b: true,
                c: null,
                d: 5,
            }),
        ).toBe(5);
    });

    it("should parse stringified numeric values", () => {
        expect(
            sumNumbersInJson({
                a: "5",
                b: true,
                c: null,
                d: 5,
            }),
        ).toBe(10);
    });

    it("should handle deeply nested structures", () => {
        const input = {
            a: [1, { b: [2, { c: 3 }] }],
            d: { e: { f: 4 } },
        };
        expect(sumNumbersInJson(input)).toBe(10);
    });
});
