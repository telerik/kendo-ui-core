(function(){

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
            pattern: ["-n %","n %"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            symbol: "%"
        },
        currency: {
            pattern: ["($n)","$n"],
            decimals: 4,
            ",": "",
            ".": ",",
            groupSize: [3],
            symbol: "!"
        }
    }
};

test("format replaces the placeholder with the specified value", function() {
    equal(format("foo {0}", "bar"), "foo bar");
});

test("format replaces all instances of the placeholder", function() {
    equal(format("foo {0} {0}", "bar"), "foo bar bar");
});

test("format replaces multiple placeholders", function() {
    equal(format("foo {0} {1}", "bar", "baz"), "foo bar baz");
});

test("format replaces multiple placeholders when there are missing arguments", function() {
    equal(format("foo {0} {1}", "bar"), "foo bar ");
});

test("format with null arguments", function() {
    equal(format("{0}", null), "null");
});

test("format with reverse order of placeholders", function() {
    equal(format("{1} {0}", "foo", "bar"), "bar foo");
});

test("format with nonnumeric placeholders", function() {
    equal(format("{NaN}foo", 1), "{NaN}foo");
});

test("format ignores invalid numeric placeholders", function() {
    equal(format("{1}foo", 1), "foo");
});

}());
