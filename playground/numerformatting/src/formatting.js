var patterns = {     // * - placeholder for the symbol; n - placeholder for the number
    numeric: ["n", "-n"],
    currency: ["*n", "(*n)"],
    percent: {
        positive: ['n *', 'n*', '*n'],
        negative: ['-n *', '-n*', '-*n']
    }
};

function zeroPad(match) {
    var result = "",
        i = isNaN(match) ? match.length : match;

    while (i > 0) {
        i--;
        result += 0;
    }
    return result;
}

function replace(result, reg) {
    return result.replace(reg, zeroPad).replace(digitPlaceholderRegExp, EMPTY);
}

var EMPTY = "",
    POINT = ".",
    COMMA = ",",
    standardFormatRegExp = /^[n|N|c|C]\d*/,
    customFormatRegExp = /([#0,]+)/,
    digitPlaceholderRegExp = /#+/,
    leftMostZeroRegExp = /(0+#+)+/,
    rigtMostZeroRegExp = /(#+0+)+/,
    expRegExp = /^([e|E][-|+]*[\d]*)/,
    digitsRegExp = /\d+/;

window.numberFormat = function(number, format) {
    var groupSize = 3,
        groupSeparator = ",",
        decimal = ".",
        decimalDigits = 2,
        symbol = "$";

    if (number === undefined) {
        return EMPTY;
    }

    if (!format) {
        return number.toString();
    }

    //exponential -- start
    var exponent = expRegExp.exec(format);
    if (exponent) {
        exponent = exponent.join("");
        var digits = digitsRegExp.exec(exponent);
        if(digits) {
            digits = Number(digits[0]);
        }

        if (digits !== null) {
            return number.toExponential(digits);
        } else {
            return number.toExponential();
        }
    }
    //exponential -- end

    format = format.split(";");
    if (number < 0 && format[1]) {
        number = Math.abs(number);
        format = format[1];
    } else if (number === 0) {
        format = format[2] || format[0];
    } else {
        format = format[0];
    }

    //standard patterns
    if (standardFormatRegExp.test(format)) {
        format = format.replace(standardFormatRegExp, function (match) {
            var digits = digitsRegExp.exec(match);
            digits = digits !== null ? parseInt(digits) : decimalDigits;

            if (match.toLowerCase().indexOf("n") !== -1) {
                var customFormat = "#,#";
                if (digits > 0) {
                    customFormat += "." + zeroPad(digits);
                }
                match = patterns["numeric"][number < 0 ? 1 : 0].replace("n", customFormat);
                number = Math.abs(number);
            } else if (match.toLowerCase().indexOf("c") !== -1) {
                var customFormat = "#,#"; //same as number, just pattern is diff!!!
                if (digits > 0) {
                    customFormat += "." + zeroPad(digits);
                }
                match = patterns["currency"][number < 0 ? 1 : 0].replace("n", customFormat).replace("*", symbol);
                number = Math.abs(number);
            }
            return match;
        });
    }
    // end

    if (format.indexOf("%") !== -1) {
        number *= 100;
    }
    number = number.toString().split(POINT);

    format = format.split(POINT);

    //awful code!!!
    if (format[1] && /0$/.test(format[1])) {
        number = parseFloat(number[0] + "." + number[1]).toFixed(format[1].length).toString().split(".");
    }

    //if(format[1]) {
    //    var found = customFormatRegExp.exec(format[1]);
    //    if (found && /0$/.test(found[0])) {
    //        number = parseFloat(number[0] + (number[1] ? "." + number[1] : "")).toFixed(format[1].length - 1).toString().split(".");
    //    }
    //}

    var matchedLength,
        result = number[0],
        length = result.length,
        numerator = format[0],
        nominative = format[1],
        hasGroupSeparator = numerator.indexOf(COMMA) !== -1,
        groupSeparatorRegExp = new RegExp('(-?[0-9]+)([0-9]{' + groupSize + '})');

    numerator = numerator.replace(customFormatRegExp, function(match) {
        matchedLength = match.length;
        if (matchedLength > length) {
            result = match.slice(0, matchedLength - length) + result;
        }

        result = replace(result, leftMostZeroRegExp);

        if (hasGroupSeparator) {
            result = result.replace(COMMA, EMPTY);
            if (groupSeparator && groupSize != 0) {
                while (groupSeparatorRegExp.test(result)) {
                    result = result.replace(groupSeparatorRegExp, '$1' + groupSeparator + '$2');
                }
            }
        }

        return result;
    });

    if (nominative) {
        nominative = nominative.replace(customFormatRegExp, function(match) {
            matchedLength = match.length;
            result = number[1] !== undefined ? number[1] : EMPTY;
            length = result.length;

            if (matchedLength > length) {
                result = result + match.slice(length);
            }

            result = replace(result, rigtMostZeroRegExp);

            if (result.length) {
                numerator += decimal;
            }

            return result;
        });

        numerator += nominative;
    }

    return numerator;
}
