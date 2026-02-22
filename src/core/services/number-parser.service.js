const DOT = ".";
const COMMA = ",";
const SPACE = " ";
const MINUS = "-";
const EXPONENT_REGEX = /[eE][\-+]?[0-9]+/;
const NON_BREAKING_SPACE_REGEX = /\u00A0/g;
const WHITESPACE_REGEX = /\s/g;
export class NumberParserService {
    constructor(cultureService) {
        this.cultureService = cultureService;
    }
    /**
     * Parse a string value as an integer according to culture settings
     */
    parseInt(value, culture) {
        const result = this.parseFloat(value, culture);
        if (result) {
            return result | 0;
        }
        return result;
    }
    /**
     * Parse a string value as a float according to culture settings
     */
    parseFloat(value, culture, format) {
        if (!value && value !== 0) {
            return null;
        }
        if (typeof value === "number") {
            return value;
        }
        let strValue = value.toString();
        const resolvedCulture = this.cultureService.getCulture(culture);
        let numberFormat = resolvedCulture.numberFormat;
        const percent = numberFormat.percent;
        const currency = numberFormat.currency;
        const percentSymbol = percent.symbol;
        let symbol = currency.symbol;
        let negative = strValue.indexOf(MINUS);
        let parts;
        let isPercent = false;
        // Handle exponential number
        if (EXPONENT_REGEX.test(strValue)) {
            const parsed = parseFloat(strValue.replace(numberFormat[DOT], DOT));
            if (isNaN(parsed)) {
                return null;
            }
            return parsed;
        }
        if (negative > 0) {
            return null;
        }
        else {
            negative = negative > -1 ? 1 : 0;
        }
        if (strValue.indexOf(symbol) > -1 || (format && format.toLowerCase().indexOf("c") > -1)) {
            numberFormat = currency;
            parts = numberFormat.pattern[0].replace("$", symbol).split("n");
            if (strValue.indexOf(parts[0]) > -1 && strValue.indexOf(parts[1]) > -1) {
                strValue = strValue.replace(parts[0], "").replace(parts[1], "");
                negative = 1;
            }
        }
        else if (strValue.indexOf(percentSymbol) > -1) {
            isPercent = true;
            numberFormat = percent;
            symbol = percentSymbol;
        }
        strValue = strValue
            .replace(MINUS, "")
            .replace(symbol, "")
            .replace(NON_BREAKING_SPACE_REGEX, SPACE)
            .split(numberFormat[COMMA].replace(NON_BREAKING_SPACE_REGEX, SPACE)).join("")
            .replace(WHITESPACE_REGEX, "")
            .replace(numberFormat[DOT], DOT);
        let result = parseFloat(strValue);
        if (isNaN(result)) {
            result = null;
        }
        else if (negative) {
            result *= -1;
        }
        if (result && isPercent) {
            result /= 100;
        }
        return result;
    }
}
