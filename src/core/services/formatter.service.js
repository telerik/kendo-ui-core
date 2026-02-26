import { numberFormatterService } from "./number-formatter.service";
import { dateFormatterService } from "./date-formatter.service";
const DATE_OBJECT = "[object Date]";
const FORMAT_REGEX = /\{(\d+)(:[^\}]+)?\}/g;
const objectToString = {}.toString;
class FormatterService {
    /**
     * Format a value to string, or return it as-is if no format specified.
     */
    toString(value, format, culture) {
        if (format) {
            if (objectToString.call(value) === DATE_OBJECT) {
                return dateFormatterService.format(value, format, culture);
            }
            else if (typeof value === "number") {
                return numberFormatterService.format(value, format, culture);
            }
        }
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
    round(value, precision, negative) {
        return numberFormatterService.round(value, precision, negative);
    }
}
export const formatterService = new FormatterService();
