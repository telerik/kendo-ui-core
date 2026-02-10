const DOT = ".";
const COMMA = ",";
const SHARP = "#";
const ZERO = "0";
const PLACEHOLDER = "??";
const EMPTY = "";
const STANDARD_FORMAT_REGEX = /^(n|c|p|e)(\d*)$/i;
const LITERAL_REGEX = /(\\.)|(googol)|(['][^']*[']?)|(["][^"]*["]?)/g;
const COMMA_REGEX = /\,/g;
export class NumberFormatterService {
    constructor(cultureService) {
        this.cultureService = cultureService;
    }
    format(number, format, culture) {
        const resolvedCulture = culture
            ? this.cultureService.getCulture(culture)
            : this.cultureService.culture();
        let numberFormat = resolvedCulture.numberFormat;
        let decimal = numberFormat[DOT];
        let precision = numberFormat.decimals;
        let pattern = numberFormat.pattern[0];
        const literals = [];
        let symbol;
        let isCurrency;
        let isPercent;
        let customPrecision;
        let formatAndPrecision;
        let negative = number < 0;
        let integer;
        let fraction;
        let integerLength;
        let value = EMPTY;
        let length;
        let hasGroup;
        let hasNegativeFormat;
        let decimalIndex;
        let zeroIndex;
        let start = -1;
        let end;
        // Return empty string if no number
        if (number === undefined) {
            return EMPTY;
        }
        if (!isFinite(number)) {
            return String(number);
        }
        // If no format then return number.toString() or number.toLocaleString() if culture.name is not defined
        if (!format) {
            return resolvedCulture.name.length ? number.toLocaleString() : number.toString();
        }
        formatAndPrecision = STANDARD_FORMAT_REGEX.exec(format);
        // Standard formatting
        if (formatAndPrecision) {
            format = formatAndPrecision[1].toLowerCase();
            isCurrency = format === "c";
            isPercent = format === "p";
            if (isCurrency || isPercent) {
                // Get specific number format information if format is currency or percent
                numberFormat = isCurrency ? numberFormat.currency : numberFormat.percent;
                decimal = numberFormat[DOT];
                precision = numberFormat.decimals;
                symbol = numberFormat.symbol;
                pattern = numberFormat.pattern[negative ? 0 : 1];
            }
            customPrecision = formatAndPrecision[2];
            if (customPrecision) {
                precision = +customPrecision;
            }
            // Return number in exponential format
            if (format === "e") {
                const exp = customPrecision ? number.toExponential(precision) : number.toExponential();
                return exp.replace(DOT, numberFormat[DOT]);
            }
            // Multiply if format is percent
            if (isPercent) {
                number *= 100;
            }
            const rounded = this.round(number, precision);
            negative = parseFloat(rounded) < 0;
            const parts = rounded.split(DOT);
            integer = parts[0];
            fraction = parts[1];
            // Exclude "-" if number is negative
            if (negative) {
                integer = integer.substring(1);
            }
            value = this.groupInteger(integer, 0, integer.length, numberFormat);
            if (fraction) {
                value += decimal + fraction;
            }
            if (format === "n" && !negative) {
                return value;
            }
            let result = EMPTY;
            for (let idx = 0, len = pattern.length; idx < len; idx++) {
                const ch = pattern.charAt(idx);
                if (ch === "n") {
                    result += value;
                }
                else if (ch === "$" || ch === "%") {
                    result += symbol;
                }
                else {
                    result += ch;
                }
            }
            return result;
        }
        // Custom formatting
        // Separate format by sections
        format = this.extractLiterals(format, literals);
        const formatSections = format.split(";");
        const formatSectionResult = this.selectFormatSection(formatSections, negative, number);
        format = formatSectionResult.format;
        hasNegativeFormat = formatSectionResult.hasNegativeFormat;
        if (formatSectionResult.isZeroFormat) {
            return format;
        }
        let percentIndex = format.indexOf("%");
        let currencyIndex = format.indexOf("$");
        isPercent = percentIndex !== -1;
        isCurrency = currencyIndex !== -1;
        // Multiply number if the format has percent
        if (isPercent) {
            number *= 100;
        }
        if (isCurrency && format[currencyIndex - 1] === "\\") {
            format = format.split("\\").join("");
            isCurrency = false;
        }
        if (isCurrency || isPercent) {
            // Get specific number format information if format is currency or percent
            numberFormat = isCurrency ? numberFormat.currency : numberFormat.percent;
            decimal = numberFormat[DOT];
            precision = numberFormat.decimals;
            symbol = numberFormat.symbol;
        }
        hasGroup = format.indexOf(COMMA) > -1;
        if (hasGroup) {
            format = format.replace(COMMA_REGEX, EMPTY);
        }
        const decimalResult = this.calculateDecimalPrecision(format, number, negative);
        format = decimalResult.format;
        decimalIndex = decimalResult.decimalIndex;
        length = decimalResult.length;
        const roundedNumber = decimalResult.number;
        const positionResult = this.findPlaceholderPositions(format);
        start = positionResult.start;
        end = positionResult.end;
        zeroIndex = positionResult.zeroIndex;
        if (start === length) {
            end = start;
        }
        if (start !== -1) {
            const valueParts = roundedNumber.toString().split(DOT);
            integer = valueParts[0];
            fraction = valueParts[1] || EMPTY;
            integerLength = integer.length;
            if (negative && (parseFloat(roundedNumber) * -1) >= 0) {
                negative = false;
            }
            let result = this.applyPatternToNumber(format, start, end, length, negative, hasNegativeFormat, decimalIndex, integer, fraction, decimal, zeroIndex);
            if (hasGroup) {
                result = this.groupInteger(result, start + (negative && !hasNegativeFormat ? 1 : 0), Math.max(end, (integerLength + start)), numberFormat);
            }
            if (end >= start) {
                result += format.substring(end + 1);
            }
            if (isCurrency || isPercent) {
                result = this.replaceSymbols(result, symbol);
            }
            if (literals.length) {
                result = this.replaceLiterals(result, literals);
            }
            return result;
        }
        return String(roundedNumber);
    }
    replaceSymbols(number, symbol) {
        let value = EMPTY;
        for (let idx = 0, len = number.length; idx < len; idx++) {
            const ch = number.charAt(idx);
            value += (ch === "$" || ch === "%") ? symbol : ch;
        }
        return value;
    }
    replaceLiterals(number, literals) {
        for (let idx = 0; idx < literals.length; idx++) {
            number = number.replace(PLACEHOLDER, literals[idx]);
        }
        return number;
    }
    applyPatternToNumber(format, start, end, length, negative, hasNegativeFormat, decimalIndex, integer, fraction, decimal, zeroIndex) {
        let number = format.substring(0, start);
        let replacement = EMPTY;
        const integerLength = integer.length;
        if (negative && !hasNegativeFormat) {
            number += "-";
        }
        let idx = start;
        while (idx < length) {
            const ch = format.charAt(idx);
            if (decimalIndex === -1) {
                if (end - idx < integerLength) {
                    number += integer;
                    break;
                }
            }
            else {
                if (zeroIndex !== -1 && zeroIndex < idx) {
                    replacement = EMPTY;
                }
                if ((decimalIndex - idx) <= integerLength && decimalIndex - idx > -1) {
                    number += integer;
                    idx = decimalIndex;
                }
                if (decimalIndex === idx) {
                    number += (fraction ? decimal : EMPTY) + fraction;
                    idx += end - decimalIndex + 1;
                    continue;
                }
            }
            if (ch === ZERO) {
                number += ch;
                replacement = ch;
            }
            else if (ch === SHARP) {
                number += replacement;
            }
            idx++;
        }
        return number;
    }
    selectFormatSection(formatSections, negative, number) {
        let format;
        let hasNegativeFormat = false;
        let isZeroFormat = false;
        if (negative && formatSections[1]) {
            format = formatSections[1];
            hasNegativeFormat = true;
        }
        else if (number === 0 && formatSections[2]) {
            format = formatSections[2];
            if (format.indexOf(SHARP) === -1 && format.indexOf(ZERO) === -1) {
                isZeroFormat = true;
            }
        }
        else {
            format = formatSections[0];
        }
        return { format, hasNegativeFormat, isZeroFormat };
    }
    calculateDecimalPrecision(format, number, negative) {
        let decimalIndex = format.indexOf(DOT);
        let idx = 0;
        let length = format.length;
        let fraction;
        let zeroIndex;
        let sharpIndex;
        let hasZero;
        let hasSharp;
        let rounded;
        if (decimalIndex !== -1) {
            const expParts = number.toString().split("e");
            if (expParts[1]) {
                fraction = this.round(number, Math.abs(parseInt(expParts[1], 10)));
            }
            else {
                fraction = expParts[0];
            }
            fraction = fraction.split(DOT)[1] || EMPTY;
            zeroIndex = format.lastIndexOf(ZERO) - decimalIndex;
            sharpIndex = format.lastIndexOf(SHARP) - decimalIndex;
            hasZero = zeroIndex > -1;
            hasSharp = sharpIndex > -1;
            idx = fraction.length;
            if (!hasZero && !hasSharp) {
                format = format.substring(0, decimalIndex) + format.substring(decimalIndex + 1);
                length = format.length;
                decimalIndex = -1;
                idx = 0;
            }
            if (hasZero && zeroIndex > sharpIndex) {
                idx = zeroIndex;
            }
            else if (sharpIndex > zeroIndex) {
                if (hasSharp && idx > sharpIndex) {
                    rounded = this.round(number, sharpIndex, negative);
                    while (rounded.charAt(rounded.length - 1) === ZERO && sharpIndex > 0 && sharpIndex > zeroIndex) {
                        sharpIndex--;
                        rounded = this.round(number, sharpIndex, negative);
                    }
                    idx = sharpIndex;
                }
                else if (hasZero && idx < zeroIndex) {
                    idx = zeroIndex;
                }
            }
        }
        const resultNumber = this.round(number, idx, negative);
        return { format, decimalIndex, length, number: resultNumber };
    }
    findPlaceholderPositions(format) {
        let sharpIndex = format.indexOf(SHARP);
        const startZeroIndex = format.indexOf(ZERO);
        let start;
        let end;
        let zeroIndex;
        if (sharpIndex === -1 && startZeroIndex !== -1) {
            start = startZeroIndex;
        }
        else if (sharpIndex !== -1 && startZeroIndex === -1) {
            start = sharpIndex;
        }
        else {
            start = sharpIndex > startZeroIndex ? startZeroIndex : sharpIndex;
        }
        sharpIndex = format.lastIndexOf(SHARP);
        zeroIndex = format.lastIndexOf(ZERO);
        if (sharpIndex === -1 && zeroIndex !== -1) {
            end = zeroIndex;
        }
        else if (sharpIndex !== -1 && zeroIndex === -1) {
            end = sharpIndex;
        }
        else {
            end = sharpIndex > zeroIndex ? sharpIndex : zeroIndex;
        }
        return { start, end, zeroIndex };
    }
    extractLiterals(format, literals) {
        if (format.indexOf("'") > -1 || format.indexOf('"') > -1 || format.indexOf("\\") > -1) {
            format = format.replace(LITERAL_REGEX, (match) => {
                const quoteChar = match.charAt(0).replace("\\", "");
                const literal = match.slice(1).replace(quoteChar, "");
                literals.push(literal);
                return PLACEHOLDER;
            });
        }
        return format;
    }
    groupInteger(number, start, end, numberFormat) {
        const decimalIndex = number.indexOf(numberFormat[DOT]);
        const groupSizes = numberFormat.groupSize.slice();
        let groupSize = groupSizes.shift();
        let integer;
        let integerLength;
        let idx;
        let parts;
        let value;
        let newGroupSize;
        end = decimalIndex !== -1 ? decimalIndex : end + 1;
        integer = number.substring(start, end);
        integerLength = integer.length;
        if (integerLength >= groupSize) {
            idx = integerLength;
            parts = [];
            while (idx > -1) {
                value = integer.substring(idx - groupSize, idx);
                if (value) {
                    parts.push(value);
                }
                idx -= groupSize;
                newGroupSize = groupSizes.shift();
                groupSize = newGroupSize !== undefined ? newGroupSize : groupSize;
                if (groupSize === 0) {
                    if (idx > 0) {
                        parts.push(integer.substring(0, idx));
                    }
                    break;
                }
            }
            integer = parts.reverse().join(numberFormat[COMMA]);
            number = number.substring(0, start) + integer + number.substring(end);
        }
        return number;
    }
    /**
     * Round a number to specified precision
     */
    round(value, precision, negative) {
        return NumberFormatterService.round(value, precision, negative);
    }
    /**
     * Static method for rounding numbers (used externally by other components)
     */
    static round(value, precision, negative) {
        precision = precision || 0;
        let parts = value.toString().split('e');
        let rounded = Math.round(+(parts[0] + 'e' + (parts[1] ? (+parts[1] + precision) : precision)));
        if (negative) {
            rounded = -rounded;
        }
        parts = rounded.toString().split('e');
        const result = +(parts[0] + 'e' + (parts[1] ? (+parts[1] - precision) : -precision));
        return result.toFixed(Math.min(precision, 20));
    }
}
