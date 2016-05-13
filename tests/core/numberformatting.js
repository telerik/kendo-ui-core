(function(){

var toString = kendo.toString;

module("number formatting", {
    setup: function() {

    },
    teardown: function(){
        kendo.culture("en-US");
        var nf = kendo.cultures.current.numberFormat;
        nf.currency.symbol = "$";
        nf.percent.symbol = "%";
        nf[","] = ",";
        nf["."] = ".";
    }
});

test("toString should return empty string if no number", function() {
    equal(toString(), "");
});

test("if not toString should return number.toString()", function() {
    equal(toString(10.1), "10.1");
});

//positive custom toString
test("replace toString with whole part of the number", function() {
    equal(toString(10.9, "$ #"), "$ 11");
});

test("replace # after 0 with 0", function() {
    equal(toString(10.1, "$ #0####"), "$ 00010");
});

test("remove # from toString after replace", function() {
    equal(toString(10.1, "$ ####"), "$ 10");
});

test("apply thousand separator if ','", function() {
    equal(toString(1000.1, "$ ##,##"), "$ 1,000"); //use globalization thousand separator count
});

test("do not apply thousand separator if no enough digits", function() {
    equal(toString(10, "$ ##,##"), "$ 10"); //use globalization thousand separator count
});

test("apply thousand separator to a longer than format number", function() {
    equal(toString(1000000.1, "$ #,###"), "$ 1,000,000"); //use globalization thousand separator count
});

test("replace number in decimal part", function() {
    equal(toString(10.1, "####.#"), "10.1");
});

test("replace # before 0 with 0 in decimal part", function() {
    equal(toString(10.1, "####.####0#"), "10.10000");
});

test("replace # from decimal part", function() {
    equal(toString(10.1, "####.####"), "10.1");
});

test("replace # correctly when exponential number", function() {
    equal(toString(0.0000001, "#.#######"), "0.0000001");
});

test("integer if no 0 in decimal part of the toString", function() {
    equal(toString(10, "####.#"), "10");
});

test("negative integer if no 0 in decimal part of the toString", function() {
    equal(toString(-10, "####.#"), "-10");
});

test("negative integer with thousands and custom format", function() {
    equal(toString(-18000, "#,##0"), "-18,000");
});

test("decimal if 0 in the decimal part of toString", function() {
    equal(toString(10, "####.#0#"), "10.00");
});

test("decimal does not round number to the last 0 if # follows", function() {
    equal(toString(10.12345, "0.000#####"), "10.12345");
});

test("one digit after decimal point", function() {
    equal(toString(10, "####.0"), "10.0");
});

test("round number if last sigh in the toString is 0", function() {
    equal(toString(10.99, "####.0"), "11.0");
});

test("toString decimal number 0.001", function() {
    equal(toString(0.001, "####.#0#"), "0.001");
});

test("toString decimal number -0.001", function() {
    equal(toString(-0.001, "####.#0#"), "-0.001");
});

test("custom toString with literals", function() {
    equal(toString(10.1, "'EFD' #"), "EFD 10");
});

test("toString with '# %'", function() {
    equal(toString(10.1, "# %"), "1010 %");
});

test("toString with percent symbol as literal", function() {
    equal(toString(10, "# '%'"), "10 %");
});

test("toString with escaped percent symbol", function() {
    equal(toString(10, "# \\%"), "10 %");
});

test("toString with quote as literal", function() {
    equal(toString(10, "# \"%\""), "10 %");
});

test("toString with escaped ' ", function() {
    equal(toString(10, "# %\\'"), "1000 %'");
});

test("toString does not crash when number placeholder is in literal", function() {
    equal(toString(10.12, "#.# '# y.0'"), "10.1 # y.0");
});

test("toString does not throw exception when format integer with 0.## format", function() {
    equal(toString(4, "0.##"), "4");
});

test("toString formats correctly big integer using custom format", function() {
    equal(toString(4000, "0,000.##########"), "4,000");
});

test("toString adds leading zero if number is shorter than format with group separator ", function() {
    equal(toString(300, "0,000.##########"), "0,300");
});

test("toString adds group separator to a leading zeros number", function() {
    equal(toString(300, "0,000,000.##########"), "0,000,300");
});

test("toString adds [3,2] group separators when custom format is used", function() {
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

    equal(toString(33111110, "#,##,##,##,###.00", "custom"), "3,31,11,110.00");
});

test("toString method rounds the number if custom format", function() {
    equal(toString(3.235555, "0.##"), "3.24");
    equal(toString(3.235555, "0.#0"), "3.24");
});

test("toString method removes decimal part if no number placeholder", function() {
    equal(toString(3.235555, "0."), "3");
    equal(toString(3.235555, "0."), "3");
});

test("toString method formats correctly negative number", function() {
    equal(toString(-1, "0##"), "-001");
});

//negative custom toString
test("toString decimal number -0.001 with negative format", function() {
    equal(toString(-0.001, "####;-(#.###)"), "-(0.001)");
});

test("toString decimal number -0.001 with negative format rounds number", function() {
    equal(toString(-0.001, "####;-(#.#)"), "-(0.0)");
});

test("toString decimal number -123", function() {
    equal(toString(-123, "####;-(#.00)"), "-(123.00)");
});

test("toString method clears negative sign if rounded number is positive", function() {
    equal(toString(-0.00001, "#.##"), "0.00");
});

//zero custom toString
test("toString decimal number 0", function() {
    equal(toString(0, "####;-(#.#);ZERO"), "ZERO");
});

test("toString with #.00 zero number", function() {
    equal(toString(0, "####;-(#.00);#.00"), "0.00");
});

//exponential
test("toString number with 'e' toString", function() {
    var number = 123;
    equal(toString(number, "e"), number.toExponential());
});

test("toString number with 'e10' toString", function() {
    var number = 123;
    equal(toString(number, "e10"), number.toExponential(10));
});

test("toString 123.123 with 'e' toString", function() {
    var number = 123;
    equal(toString(number, "e10"), number.toExponential(10));
});

test("toString one digit number with 'e' toString", function() {
    var number = 1;
    equal(toString(number, "e"), number.toExponential());
});

test("toString 0 with 'e' toString", function() {
    var number = 0;
    equal(toString(number, "e"), number.toExponential());
});

test("toString 0.001 with 'e' toString", function() {
    var number = 0.001;
    equal(toString(number, "e"), number.toExponential());
});

test("toString 0.0012 with 'e' toString", function() {
    var number = 0.0012;
    equal(toString(number, "e"), number.toExponential());
});

test("toString 0.01243 with 'e' toString", function() {
    var number = 0.01243;
    equal(toString(number, "e"), number.toExponential());
});

test("toString 0.01243 with 'e5' toString", function() {
    var number = 0.01243;
    equal(toString(number, "e5"), number.toExponential(5));
});

test("toString 0.010043 with 'e5' toString", function() {
    var number = 0.010043;
    equal(toString(number, "e5"), number.toExponential(5));
});

//standard formats
test("N toString big positive integer", function() {
    var number = 10000;
    equal(toString(number, "N"), "10,000.00");
});

test("N toString big negative integer", function() {
    var number = -10000;
    equal(toString(number, "N"), "-10,000.00");
});

test("N toString small positive integer", function() {
    var number = 10;
    equal(toString(number, "N"), "10.00");
});

test("N toString small negative integer", function() {
    var number = -10;
    equal(toString(number, "N"), "-10.00");
});

test("N3 toString", function() {
    var number = 10.3337;
    equal(toString(number, "N3"), "10.334");
});

test("N0 toString", function() {
    var number = 10.3337;
    equal(toString(number, "N0"), "10");
});

test("toString method clears sign if rounded number is zero", function() {
    equal(toString(-0.00001, "n2"), "0.00");
});

test("C toString", function() {
    var number = 10.3337;
    equal(toString(number, "C"), "$10.33");
});

test("C0 toString", function() {
    var number = 10.3337;
    equal(toString(number, "C0"), "$10");
});

test("C3 negative toString", function() {
    var number = -10.3337;
    equal(toString(number, "C3"), "($10.334)");
});

test("C7 negative exponential toString", function() {
    equal(toString(0.0000001, "c7"), "$0.0000001");
});

test("group separators are not applied to numbers with less digits", function() {
    equal(toString(123, "C"), "$123.00");
});

test("group separators applied every n digits", function() {
    equal(toString(123456789, "C"), "$123,456,789.00");
});

test("group separators if more then one are applied to the number", function() {
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

    equal(toString(33111110, "n", "custom"), "3,31,11,110.00");
});

test("group separators with '0' length are applied correctly", function() {
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

    equal(toString(33111110, "n", "custom"), "33111,110.00");
});

test("'0' group separator does not group integer", function() {
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

    equal(toString(33111110, "n", "custom"), "33111110.00");
    equal(toString(0, "n", "custom"), "0.00");
});

test("P toString", function() {
    var number = 0.00099;
    equal(toString(number, "P"), "0.10 %");
});

test("P0 toString", function() {
    var number = 0.1;
    equal(toString(number, "P0"), "10 %");
});

test("P3 negative toString", function() {
    var number = -1.30;
    equal(toString(number, "P3"), "-130.000 %");
});

//globalized
test("apply globalized currency symbol", function() {
    kendo.cultures.current.numberFormat.currency.symbol = "lv";
    equal(toString(10.1, "$ #### $"), "lv 10 lv");
});

test("toString with escaped currency symbol", function() {
    kendo.cultures.current.numberFormat.currency.symbol = "lv";

    equal(toString(10, "# \\$"), "10 $");
});

test("apply globalized percent symbol", function() {
    kendo.cultures.current.numberFormat.percent.symbol = "percent";
    equal(toString(10.1, "% #0## %"), "percent 1010 percent");
});

test("globalized number", function() {
    kendo.cultures.current.numberFormat[","] = " ";
    kendo.cultures.current.numberFormat["."] = ",";
    equal(toString(1000010.1, " 0000#0#,#.00 "), " 01 000 010,10 ");
});

test("format number using specific culture", function() {
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

    equal(toString(1110.1, "n", "custom"), "1 110,1000");
});

test("toString removes incorrect decimal separators", function() {
    equal(toString(10, "# y. test"), "10 y test");
});

test("toString rounds up correctly", function() {
    equal(toString(1.23125, "C4"), "$1.2313");
});

test("toString formats correctly big integer", function() {
    equal(toString(5285654313, "#.########0"), "5285654313.000000000");
});

test("toString rounds 17.115 correcly", function() {
    equal(toString(17.115, "#.##"), "17.12");
});

}());
