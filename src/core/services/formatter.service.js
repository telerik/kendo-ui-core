import { NumberFormatterService } from "./number-formatter.service";
const DATE_OBJECT = "[object Date]";
const FORMAT_REGEX = /\{(\d+)(:[^\}]+)?\}/g;
const objectToString = {}.toString;
export class FormatterService {
    constructor(numberFormatter, dateFormatter) {
        this.numberFormatter = numberFormatter;
        this.dateFormatter = dateFormatter;
    }
    /**
     * Format a value to string, or return it as-is if no format specified.
     * The loose return type matches original kendo.toString behavior where
     * unformatted values pass through (e.g., null stays null for jQuery .val())
     */
    toString(value, format, culture) {
        if (format) {
            if (objectToString.call(value) === DATE_OBJECT) {
                return this.dateFormatter.format(value, format, culture);
            }
            else if (typeof value === "number") {
                return this.numberFormatter.format(value, format, culture);
            }
        }
        // Match original behavior: return value as-is (not String(value))
        // This allows jQuery .val(null) to work correctly (clears input)
        return value !== undefined ? value : "";
    }
    format(fmt, ...values) {
        return fmt.replace(FORMAT_REGEX, (_, index, placeholderFormat) => {
            const value = values[parseInt(index, 10)];
            const result = this.toString(value, placeholderFormat ? placeholderFormat.substring(1) : "");
            // Let JS coerce to string (null becomes "null", undefined becomes "undefined")
            // This matches original behavior where String.replace does implicit coercion
            return String(result);
        });
    }
    extractFormat(format) {
        if (format.slice(0, 3) === "{0:") {
            format = format.slice(3, format.length - 1);
        }
        return format;
    }
    /**
     * Get the number formatter instance (for direct access)
     */
    getNumberFormatter() {
        return this.numberFormatter;
    }
    /**
     * Get the date formatter instance (for direct access)
     */
    getDateFormatter() {
        return this.dateFormatter;
    }
    /**
     * Static round method exposed for external use (matches kendo._round)
     */
    static round(value, precision, negative) {
        return NumberFormatterService.round(value, precision, negative);
    }
}
