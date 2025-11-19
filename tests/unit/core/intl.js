import '@progress/kendo-ui/src/kendo.core.js';

describe("intl", () => {
    it("should use only the first value for single placeholder templates", () => {
        let intl = kendo.kendoCultureToIntl();
        const template = "Hello {0}";
        const result = intl.format(template, "Alice", "Bob", "Charlie");
        expect(result).toBe("Hello Alice");
    });

    it("should concatenate all values if template has multiple placeholders", () => {
        let intl = kendo.kendoCultureToIntl();

        const template = "Hello {0}, {1}, {2}";
        const result = intl.format(template, "Alice", "Bob", "Charlie");
        expect(result).toBe("Hello Alice, Bob, Charlie");
    });

    it("should return evaluated template if no values are provided", () => {
        let intl = kendo.kendoCultureToIntl();

        const template = "Hello {0}";
        const result = intl.format(template);
        expect(result).toBe("Hello ");
    });
});
