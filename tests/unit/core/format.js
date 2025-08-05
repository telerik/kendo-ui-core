import '@progress/kendo-ui/src/kendo.core.js';

let format = kendo.format;

kendo.cultures["custom"] = {
    name: "custom",
    numberFormat: {
        pattern: ["-n"],
        decimals: 2,
        ",": ",",
        ".": ".",
        groupSize: [3],
        percent: {
            pattern: ["-n %", "n %"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            symbol: "%"
        },
        currency: {
            pattern: ["($n)", "$n"],
            decimals: 4,
            ",": "",
            ".": ",",
            groupSize: [3],
            symbol: "!"
        }
    }
};

describe("format", function() {

    it("format replaces the placeholder with the specified value", function() {
        assert.equal(format("foo {0}", "bar"), "foo bar");
    });

    it("format replaces all instances of the placeholder", function() {
        assert.equal(format("foo {0} {0}", "bar"), "foo bar bar");
    });

    it("format replaces multiple placeholders", function() {
        assert.equal(format("foo {0} {1}", "bar", "baz"), "foo bar baz");
    });

    it("format replaces multiple placeholders when there are missing arguments", function() {
        assert.equal(format("foo {0} {1}", "bar"), "foo bar ");
    });

    it("format with null arguments", function() {
        assert.equal(format("{0}", null), "null");
    });

    it("format with reverse order of placeholders", function() {
        assert.equal(format("{1} {0}", "foo", "bar"), "bar foo");
    });

    it("format with nonnumeric placeholders", function() {
        assert.equal(format("{NaN}foo", 1), "{NaN}foo");
    });

    it("format ignores invalid numeric placeholders", function() {
        assert.equal(format("{1}foo", 1), "foo");
    });

    // New tests for the spreadsheet validation message fix
    it("fixes malformed spreadsheet validation messages for number criteria", function() {
        const result = format("Please enter a valid {0} value {1}.", "any", "greater than 10,,10,,number,reject,greaterThan");
        assert.equal(result, "Please enter a valid number value greater than 10.");
    });

    it("fixes malformed spreadsheet validation messages for text criteria", function() {
        const result = format("Please enter a valid {0} value {1}.", "any", "containing hello,,test,,text,reject,contains");
        assert.equal(result, "Please enter a valid text value containing hello.");
    });

    it("fixes malformed spreadsheet validation messages for date criteria", function() {
        const result = format("Please enter a valid {0} value {1}.", "any", "after 2024-01-01,,2024-01-01,,date,reject,greaterThan");
        assert.equal(result, "Please enter a valid date value after 2024-01-01.");
    });

    it("fixes malformed spreadsheet validation messages for custom criteria", function() {
        const result = format("Please enter a valid {0} value {1}.", "any", "that satisfies formula,,x > 0,,custom,reject,custom");
        assert.equal(result, "Please enter a valid custom value that satisfies formula.");
    });

    it("does not modify normal format calls with commas in arguments", function() {
        const result = format("Items: {0}, Count: {1}", "apple,banana,cherry", "3");
        assert.equal(result, "Items: apple,banana,cherry, Count: 3");
    });

    it("does not modify normal validation messages", function() {
        const result = format("Please enter a valid {0} value {1}.", "number", "greater than 10");
        assert.equal(result, "Please enter a valid number value greater than 10.");
    });

    it("does not modify format calls that don't match the malformed pattern", function() {
        const result = format("Test {0} {1}", "arg1", "arg2,,with,,commas,,but,,not,,validation");
        assert.equal(result, "Test arg1 arg2,,with,,commas,,but,,not,,validation");
    });

});
