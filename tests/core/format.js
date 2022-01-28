(function() {

    var format = kendo.format;

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

    });
}());
