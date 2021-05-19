(function(){

var parseF = kendo.parseFloat;
var customCulture = {
    name: "bg-BG",
    numberFormat: {
        pattern: ["-n"],
        decimals: 2,
        ",": "�",
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

describe("number parsing", function () {
    beforeEach(function() {
        kendo.cultures["custom"] = customCulture;
    });

it("Parse zero returns zero", function() {
    var value = 0;

    assert.equal(parseF(value), value);
});

it("Parse number and return number", function() {
    var value = 12.12;

    assert.equal(parseF(value), 12.12);
});

it("Parse string and return number", function() {
    var value = "12.12";

    assert.equal(parseF(value), 12.12);
});

it("Return null if incorrect value", function() {
    var value = {};

    assert.equal(parseF(value), null);
});

it("Return null no value", function() {
    assert.equal(parseF(), null);
});

it("Return null if incorrect number", function() {
    var value = "not a number";

    assert.equal(parseF(value), null);
});

it("parse globalized float number", function() {
    var value = "12,13",
        cultureSelector = "bg-BG";

    assert.equal(parseF(value, cultureSelector), 12.13);
});

it("parse globalized number with group separators", function() {
    var value = "1 123 112,13",
        cultureSelector = "bg-BG";

    assert.equal(parseF("1,123.12", "en-US"), 1123.12);
    assert.equal(parseF(value, cultureSelector), 1123112.13);
});

it("parse should parse currency number", function() {
    var value = "$ 12";

    assert.equal(parseF(value, "en-US"), 12);
});

it("parse should parse percent number", function() {
    var value = "% 12";

    assert.equal(parseF(value, "en-US"), 0.12);
});

it("parseFloat should use decimal separator from currency object", function() {
    var currency = customCulture.numberFormat.currency,
        value = "lv 1" + currency[","] + "123" + currency["."] + "12",
        expected = 1123.12;

    assert.equal(parseF(value, "custom"), expected);
});

it("parse should use decimal separator from percent object", function() {
    var percent = customCulture.numberFormat.percent,
        value = "% 1" + percent[","] + "123" + percent["."] + "12",
        expected = 11.2312;

    assert.equal(parseF(value, "custom"), expected);
});

it("parseF should parse negative number", function() {
    var value = "-12,123.322";

    assert.equal(parseF(value), -12123.322);
});

it("parseF should parse negative currency number", function() {
    var value = kendo.culture().numberFormat.currency.pattern[0].replace("n", "1,123.23");

    assert.equal(parseF(value), -1123.23);
});

it("parseF should parse negative currency number (not en-US) ", function() {
    var value = kendo.culture().numberFormat.currency.pattern[0].replace("n", "1.123,23");

    value = value.replace("$", customCulture.numberFormat.currency.symbol);

    assert.equal(parseF(value, "custom"), -1123.23);
});

it("parseF should parse negative percent number", function() {
    var value = kendo.culture().numberFormat.percent.pattern[0].replace("n", "1,123.23");

    assert.equal(parseF(value), -11.2323);
});

it("parse exponential number", function() {
    var value = "1.23432e+5";

    assert.equal(parseF(value), 123432);
});

it("parse negative exponential number", function() {
    var value = "-1.23432e-1";

    assert.equal(parseF(value), -0.123432);
});

it("parse exponential number (capital case)", function() {
    assert.equal(parseF("1e-7"), 0.0000001);
    assert.equal(parseF("1E-7"), 0.0000001);
});

it("parse localized exponential number", function() {
    kendo.culture("bg-BG");

    var value = "1,23432e+5";

    assert.equal(parseF(value), 123432);

    kendo.culture("en-US");
});

it("parseInt should return int number", function() {

    var value = "1,232.12";

    assert.equal(kendo.parseInt(value), 1232);
});

it("parse Bulgarian number", function() {
    kendo.culture("bg-BG");

    var value = 10000.12,
        formatted = kendo.toString(value, "c");

    assert.equal(kendo.parseFloat(formatted), value);

    kendo.culture("en-US");
});

it("parse en-ZA currency number", function() {
    kendo.culture("en-ZA");

    assert.equal(kendo.parseFloat("12,345", kendo.culture(), "c"), 12.345);

    kendo.culture("en-US");
});

it("parse method returns null if negative sign is not in the begining", function() {
    var value = "23-12";

    assert.equal(parseF(value), null);
});

    });
}());
