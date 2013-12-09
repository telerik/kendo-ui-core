(function(){

var parseF = kendo.parseFloat;
var customCulture = {
    name: "bg-BG",
    numberFormat: {
        pattern: ["-n"],
        decimals: 2,
        ",": " ",
        ".": ",",
        groupSize: [3],
        percent: {
            pattern: ["-n %","n %"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            symbol: "%"
        },
        currency: {
            pattern: ["($n)","n $"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            symbol: "lv"
        }
    }
};

module("number parsing", {
    setup: function() {
        kendo.cultures["custom"] = customCulture;
    }
});

test("Parse zero returns zero", function() {
    var value = 0;

    equal(parseF(value), value);
});

test("Parse number and return number", function() {
    var value = 12.12;

    equal(parseF(value), 12.12);
});

test("Parse string and return number", function() {
    var value = "12.12";

    equal(parseF(value), 12.12);
});

test("Return null if incorrect value", function() {
    var value = {};

    equal(parseF(value), null);
});

test("Return null no value", function() {
    equal(parseF(), null);
});

test("Return null if incorrect number", function() {
    var value = "not a number";

    equal(parseF(value), null);
});

test("parse globalized float number", function() {
    var value = "12,13",
        cultureSelector = "bg-BG";

    equal(parseF(value, cultureSelector), 12.13);
});

test("parse globalized number with group separators", function() {
    var value = "1 123 112,13",
        cultureSelector = "bg-BG";

    equal(parseF("1,123.12", "en-US"), 1123.12);
    equal(parseF(value, cultureSelector), 1123112.13);
});

test("parse should parse currency number", function() {
    var value = "$ 12";

    equal(parseF(value, "en-US"), 12);
});

test("parse should parse percent number", function() {
    var value = "% 12";

    equal(parseF(value, "en-US"), 0.12);
});

test("parseFloat should use decimal separator from currency object", function() {
    var currency = customCulture.numberFormat.currency,
        value = "lv 1" + currency[","] + "123" + currency["."] + "12",
        expected = 1123.12;

    equal(parseF(value, "custom"), expected);
});

test("parse should use decimal separator from percent object", function() {
    var percent = customCulture.numberFormat.percent,
        value = "% 1" + percent[","] + "123" + percent["."] + "12",
        expected = 11.2312;

    equal(parseF(value, "custom"), expected);
});

test("parseF should parse negative number", function() {
    var value = "-12,123.322";

    equal(parseF(value), -12123.322);
});

test("parseF should parse negative currency number", function() {
    var value = kendo.culture().numberFormat.currency.pattern[0].replace("n", "1,123.23");

    equal(parseF(value), -1123.23);
});

test("parseF should parse negative currency number (not en-US) ", function() {
    var value = kendo.culture().numberFormat.currency.pattern[0].replace("n", "1.123,23");

    value = value.replace("$", customCulture.numberFormat.currency.symbol);

    equal(parseF(value, "custom"), -1123.23);
});

test("parseF should parse negative percent number", function() {
    var value = kendo.culture().numberFormat.percent.pattern[0].replace("n", "1,123.23");

    equal(parseF(value), -11.2323);
});

test("parse exponential number", function() {
    var value = "1.23432e+5";

    equal(parseF(value), 123432);
});

test("parse negative exponential number", function() {
    var value = "-1.23432e-1";

    equal(parseF(value), -0.123432);
});

test("parse exponential number (capital case)", function() {
    equal(parseF("1e-7"), 0.0000001);
    equal(parseF("1E-7"), 0.0000001);
});

test("parse localized exponential number", function() {
    kendo.culture("bg-BG");

    var value = "1,23432e+5";

    equal(parseF(value), 123432);

    kendo.culture("en-US");
});

test("parseInt should return int number", function() {

    var value = "1,232.12";

    equal(kendo.parseInt(value), 1232);
});

test("parse Bulgarian number", function() {
    kendo.culture("bg-BG");

    var value = 10000.12,
        formatted = kendo.toString(value, "c");

    equal(kendo.parseFloat(formatted), value);

    kendo.culture("en-US");
});

test("parse en-ZA currency number", function() {
    kendo.culture("en-ZA");

    equal(kendo.parseFloat("12,345", kendo.culture(), "c"), 12.345);

    kendo.culture("en-US");
});

test("parse method returns null if negative sign is not in the begining", function() {
    var value = "23-12";

    equal(parseF(value), null);
});

}());
