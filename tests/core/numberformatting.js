(function(){

var toString = kendo.toString;

describe("number formatting", function () {
    beforeEach(function() {

    });
    afterEach(function(){
        kendo.culture("en-US");
        var nf = kendo.cultures.current.numberFormat;
        nf.currency.symbol = "$";
        nf.percent.symbol = "%";
        nf[","] = ",";
        nf["."] = ".";
    });

it("toString should return empty string if no number", function() {
    assert.equal(toString(), "");
});

it("if not toString should return number.toString()", function() {
    assert.equal(toString(10.1), "10.1");
});

it("custom and standard formatting should match", function() {
    assert.equal(toString(-1.5, '0'), "-1");
    assert.equal(toString(-1.5, 'n0'), "-1");
});

//positive custom toString
it("replace toString with whole part of the number", function() {
    assert.equal(toString(10.9, "$ #"), "$ 11");
});

it("replace # after 0 with 0", function() {
    assert.equal(toString(10.1, "$ #0####"), "$ 00010");
});

it("remove # from toString after replace", function() {
    assert.equal(toString(10.1, "$ ####"), "$ 10");
});

it("apply thousand separator if ','", function() {
    assert.equal(toString(1000.1, "$ ##,##"), "$ 1,000"); //use globalization thousand separator count
});

it("do not apply thousand separator if no enough digits", function() {
    assert.equal(toString(10, "$ ##,##"), "$ 10"); //use globalization thousand separator count
});

it("apply thousand separator to a longer than format number", function() {
    assert.equal(toString(1000000.1, "$ #,###"), "$ 1,000,000"); //use globalization thousand separator count
});

it("replace number in decimal part", function() {
    assert.equal(toString(10.1, "####.#"), "10.1");
});

it("replace # before 0 with 0 in decimal part", function() {
    assert.equal(toString(10.1, "####.####0#"), "10.10000");
});

it("replace # from decimal part", function() {
    assert.equal(toString(10.1, "####.####"), "10.1");
});

it("replace # correctly when exponential number", function() {
    assert.equal(toString(0.0000001, "#.#######"), "0.0000001");
});

it("integer if no 0 in decimal part of the toString", function() {
    assert.equal(toString(10, "####.#"), "10");
});

it("negative integer if no 0 in decimal part of the toString", function() {
    assert.equal(toString(-10, "####.#"), "-10");
});

it("negative integer with thousands and custom format", function() {
    assert.equal(toString(-18000, "#,##0"), "-18,000");
});

it("decimal if 0 in the decimal part of toString", function() {
    assert.equal(toString(10, "####.#0#"), "10.00");
});

it("decimal does not round number to the last 0 if # follows", function() {
    assert.equal(toString(10.12345, "0.000#####"), "10.12345");
});

it("one digit after decimal point", function() {
    assert.equal(toString(10, "####.0"), "10.0");
});

it("round number if last sigh in the toString is 0", function() {
    assert.equal(toString(10.99, "####.0"), "11.0");
});

it("toString decimal number 0.001", function() {
    assert.equal(toString(0.001, "####.#0#"), "0.001");
});

it("toString decimal number -0.001", function() {
    assert.equal(toString(-0.001, "####.#0#"), "-0.001");
});

it("custom toString with literals", function() {
    assert.equal(toString(10.1, "'EFD' #"), "EFD 10");
});

it("toString with '# %'", function() {
    assert.equal(toString(10.1, "# %"), "1010 %");
});

it("toString with percent symbol as literal", function() {
    assert.equal(toString(10, "# '%'"), "10 %");
});

it("toString with escaped percent symbol", function() {
    assert.equal(toString(10, "# \\%"), "10 %");
});

it("toString with quote as literal", function() {
    assert.equal(toString(10, "# \"%\""), "10 %");
});

it("toString with escaped ' ", function() {
    assert.equal(toString(10, "# %\\'"), "1000 %'");
});

it("toString does not crash when number placeholder is in literal", function() {
    assert.equal(toString(10.12, "#.# '# y.0'"), "10.1 # y.0");
});

it("toString does not throw exception when format integer with 0.## format", function() {
    assert.equal(toString(4, "0.##"), "4");
});

it("toString formats correctly big integer using custom format", function() {
    assert.equal(toString(4000, "0,000.##########"), "4,000");
});

it("toString adds leading zero if number is shorter than format with group separator ", function() {
    assert.equal(toString(300, "0,000.##########"), "0,300");
});

it("toString adds group separator to a leading zeros number", function() {
    assert.equal(toString(300, "0,000,000.##########"), "0,000,300");
});

it("toString adds [3,2] group separators when custom format is used", function() {
    kendo.cultures["custom"] = {
        calendars: { standard: {}},
        numberFormat: {
            decimals: 2,
            pattern: ["-n"],
            ",": ",",
            ".": ".",
            groupSize: [3,2]
        }
    };

    assert.equal(toString(33111110, "#,##,##,##,###.00", "custom"), "3,31,11,110.00");
});

it("toString method rounds the number if custom format", function() {
    assert.equal(toString(3.235555, "0.##"), "3.24");
    assert.equal(toString(3.235555, "0.#0"), "3.24");
});

it("toString method removes decimal part if no number placeholder", function() {
    assert.equal(toString(3.235555, "0."), "3");
    assert.equal(toString(3.235555, "0."), "3");
});

it("toString method rounded removes trailing zeros", function() {
    assert.equal(toString(3.499, "#.##"), "3.5");
});

it("toString method rounded removes trailing zeros up to last zero formatter", function() {
    assert.equal(toString(3.4999, "#.#0#"), "3.50");
});

it("toString method rounded to whole number removes trailing zeros and decimal", function() {
    assert.equal(toString(3.999, "#.##"), "4");
});

it("toString method rounded to whole number removes trailing zeros up to last zero formatter", function() {
    assert.equal(toString(3.999, "#.0"), "4.0");
});

it("toString method formats correctly negative number", function() {
    assert.equal(toString(-1, "0##"), "-001");
});

//negative custom toString
it("toString decimal number -0.001 with negative format", function() {
    assert.equal(toString(-0.001, "####;-(#.###)"), "-(0.001)");
});

it("toString decimal number -0.001 with negative format rounds number", function() {
    assert.equal(toString(-0.001, "####;-(#.0)"), "-(0.0)");
});

it("toString decimal number -1000 with negative format", function() {
    assert.equal(toString(-1000, "#,##0;(#,##0);-"), "(1,000)");
});

it("toString decimal number -123", function() {
    assert.equal(toString(-123, "####;-(#.00)"), "-(123.00)");
});

it("toString method clears negative sign if rounded number is positive", function() {
    assert.equal(toString(-0.00001, "#.#0"), "0.00");
});

//zero custom toString
it("toString decimal number 0", function() {
    assert.equal(toString(0, "####;-(#.#);ZERO"), "ZERO");
});

it("toString with #.00 zero number", function() {
    assert.equal(toString(0, "####;-(#.00);#.00"), "0.00");
});

it("toString 0 with unsupported format", function() {
    assert.equal(toString(0, "ZERO"), "0");
});

//exponential
it("toString number with 'e' toString", function() {
    var number = 123;
    assert.equal(toString(number, "e"), number.toExponential());
});

it("toString number with 'e10' toString", function() {
    var number = 123;
    assert.equal(toString(number, "e10"), number.toExponential(10));
});

it("toString 123.123 with 'e' toString", function() {
    var number = 123;
    assert.equal(toString(number, "e10"), number.toExponential(10));
});

it("toString one digit number with 'e' toString", function() {
    var number = 1;
    assert.equal(toString(number, "e"), number.toExponential());
});

it("toString 0 with 'e' toString", function() {
    var number = 0;
    assert.equal(toString(number, "e"), number.toExponential());
});

it("toString 0.001 with 'e' toString", function() {
    var number = 0.001;
    assert.equal(toString(number, "e"), number.toExponential());
});

it("toString 0.0012 with 'e' toString", function() {
    var number = 0.0012;
    assert.equal(toString(number, "e"), number.toExponential());
});

it("toString 0.01243 with 'e' toString", function() {
    var number = 0.01243;
    assert.equal(toString(number, "e"), number.toExponential());
});

it("toString 0.01243 with 'e5' toString", function() {
    var number = 0.01243;
    assert.equal(toString(number, "e5"), number.toExponential(5));
});

it("toString 0.010043 with 'e5' toString", function() {
    var number = 0.010043;
    assert.equal(toString(number, "e5"), number.toExponential(5));
});

//standard formats
it("N toString big positive integer", function() {
    var number = 10000;
    assert.equal(toString(number, "N"), "10,000.00");
});

it("N toString big negative integer", function() {
    var number = -10000;
    assert.equal(toString(number, "N"), "-10,000.00");
});

it("N toString small positive integer", function() {
    var number = 10;
    assert.equal(toString(number, "N"), "10.00");
});

it("N toString small negative integer", function() {
    var number = -10;
    assert.equal(toString(number, "N"), "-10.00");
});

it("N3 toString", function() {
    var number = 10.3337;
    assert.equal(toString(number, "N3"), "10.334");
});

it("N0 toString", function() {
    var number = 10.3337;
    assert.equal(toString(number, "N0"), "10");
});

it("toString method clears sign if rounded number is zero", function() {
    assert.equal(toString(-0.00001, "n2"), "0.00");
});

it("C toString", function() {
    var number = 10.3337;
    assert.equal(toString(number, "C"), "$10.33");
});

it("C0 toString", function() {
    var number = 10.3337;
    assert.equal(toString(number, "C0"), "$10");
});

it("C3 negative toString", function() {
    var number = -10.3337;
    assert.equal(toString(number, "C3"), "($10.334)");
});

it("C7 negative exponential toString", function() {
    assert.equal(toString(0.0000001, "c7"), "$0.0000001");
});

it("group separators are not applied to numbers with less digits", function() {
    assert.equal(toString(123, "C"), "$123.00");
});

it("group separators applied every n digits", function() {
    assert.equal(toString(123456789, "C"), "$123,456,789.00");
});

it("group separators if more then one are applied to the number", function() {
    kendo.cultures["custom"] = {
        calendars: { standard: {}},
        numberFormat: {
            decimals: 2,
            pattern: ["-n"],
            ",": ",",
            ".": ".",
            groupSize: [3,2]
        }
    };

    assert.equal(toString(33111110, "n", "custom"), "3,31,11,110.00");
});

it("group separators with '0' length are applied correctly", function() {
    kendo.cultures["custom"] = {
        calendars: { standard: {}},
        numberFormat: {
            decimals: 2,
            pattern: ["-n"],
            ",": ",",
            ".": ".",
            groupSize: [3,0]
        }
    };

    assert.equal(toString(33111110, "n", "custom"), "33111,110.00");
});

it("group separators with '0' length are applied correctly when integer is a multiple of group", function() {
    kendo.cultures["custom"] = {
        calendars: { standard: {}},
        numberFormat: {
            decimals: 2,
            pattern: ["-n"],
            ",": ",",
            ".": ".",
            groupSize: [3,0]
        }
    };

    assert.equal(toString(331, "n", "custom"), "331.00");
});

it("'0' group separator does not group integer", function() {
    kendo.cultures["custom"] = {
        calendars: { standard: {}},
        numberFormat: {
            decimals: 2,
            pattern: ["-n"],
            ",": ",",
            ".": ".",
            groupSize: [0]
        }
    };

    assert.equal(toString(33111110, "n", "custom"), "33111110.00");
    assert.equal(toString(0, "n", "custom"), "0.00");
});

it("P toString", function() {
    var number = 0.00099;
    assert.equal(toString(number, "P"), "0.10 %");
});

it("P0 toString", function() {
    var number = 0.1;
    assert.equal(toString(number, "P0"), "10 %");
});

it("P3 negative toString", function() {
    var number = -1.30;
    assert.equal(toString(number, "P3"), "-130.000 %");
});

//globalized
it("apply globalized currency symbol", function() {
    kendo.cultures.current.numberFormat.currency.symbol = "lv";
    assert.equal(toString(10.1, "$ #### $"), "lv 10 lv");
});

it("toString with escaped currency symbol", function() {
    kendo.cultures.current.numberFormat.currency.symbol = "lv";

    assert.equal(toString(10, "# \\$"), "10 $");
});

it("apply globalized percent symbol", function() {
    kendo.cultures.current.numberFormat.percent.symbol = "percent";
    assert.equal(toString(10.1, "% #0## %"), "percent 1010 percent");
});

it("globalized number", function() {
    kendo.cultures.current.numberFormat[","] = " ";
    kendo.cultures.current.numberFormat["."] = ",";
    assert.equal(toString(1000010.1, " 0000#0#,#.00 "), " 01 000 010,10 ");
});

it("globalized exponential number", function() {
    kendo.cultures.current.numberFormat["."] = ",";

    assert.equal(toString(1234, "e"), "1,234e+3");
});

it("format number using specific culture", function() {
    kendo.cultures["custom"] = {
        calendars: { standard: {}},
        numberFormat: {
            decimals: 4,
            pattern: ["-n"],
            ",": " ",
            ".": ",",
            groupSize: [3]
        }
    };

    assert.equal(toString(1110.1, "n", "custom"), "1 110,1000");
});

it("toString removes incorrect decimal separators", function() {
    assert.equal(toString(10, "# y. test"), "10 y test");
});

it("toString rounds up correctly", function() {
    assert.equal(toString(1.23125, "C4"), "$1.2313");
});

it("toString formats correctly big integer", function() {
    assert.equal(toString(5285654313, "#.########0"), "5285654313.000000000");
});

it("toString rounds 17.115 correcly", function() {
    assert.equal(toString(17.115, "#.##"), "17.12");
});

it("toString rounds really big numbers without crashing", function() {
    var bigNumber = 5.4654647884512e+96;

    assert.equal(toString(bigNumber, "#,#.00"), bigNumber);
});

    });
}());
