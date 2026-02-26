import { cultureService } from "./culture.service";
const DATE_FORMAT_REGEX = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|aa|ss|s|zzz|zz|z|EEEE|"[^"]*"|'[^']*'/g;
/**
 * Pad a number with leading zeros
 */
function pad(value, length = 2) {
    let str = String(value);
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}
class DateFormatterService {
    format(date, format, culture) {
        const resolvedCulture = culture
            ? cultureService.getCulture(culture)
            : cultureService.culture();
        const calendar = resolvedCulture.calendars.standard;
        const days = calendar.days;
        const months = calendar.months;
        const resolvedFormat = format.pattern || calendar.patterns[format] || format;
        return resolvedFormat.replace(DATE_FORMAT_REGEX, (match) => {
            return this.formatMatch(match, date, calendar, days, months);
        });
    }
    formatMatch(match, date, calendar, days, months) {
        let result;
        let minutes;
        let sign;
        if (match === "d") {
            result = date.getDate();
        }
        else if (match === "dd") {
            result = pad(date.getDate());
        }
        else if (match === "ddd") {
            result = days.namesAbbr[date.getDay()];
        }
        else if (match === "dddd" || match === "EEEE") {
            result = days.names[date.getDay()];
        }
        else if (match === "M") {
            result = date.getMonth() + 1;
        }
        else if (match === "MM") {
            result = pad(date.getMonth() + 1);
        }
        else if (match === "MMM") {
            result = months.namesAbbr[date.getMonth()];
        }
        else if (match === "MMMM") {
            result = months.names[date.getMonth()];
        }
        else if (match === "yy") {
            result = pad(date.getFullYear() % 100);
        }
        else if (match === "yyyy") {
            result = pad(date.getFullYear(), 4);
        }
        else if (match === "h") {
            result = date.getHours() % 12 || 12;
        }
        else if (match === "hh") {
            result = pad(date.getHours() % 12 || 12);
        }
        else if (match === "H") {
            result = date.getHours();
        }
        else if (match === "HH") {
            result = pad(date.getHours());
        }
        else if (match === "m") {
            result = date.getMinutes();
        }
        else if (match === "mm") {
            result = pad(date.getMinutes());
        }
        else if (match === "s") {
            result = date.getSeconds();
        }
        else if (match === "ss") {
            result = pad(date.getSeconds());
        }
        else if (match === "f") {
            result = Math.floor(date.getMilliseconds() / 100);
        }
        else if (match === "ff") {
            let ms = date.getMilliseconds();
            if (ms > 99) {
                ms = Math.floor(ms / 10);
            }
            result = pad(ms);
        }
        else if (match === "fff") {
            result = pad(date.getMilliseconds(), 3);
        }
        else if (match === "tt" || match === "aa") {
            result = date.getHours() < 12 ? calendar.AM[0] : calendar.PM[0];
        }
        else if (match === "zzz") {
            minutes = date.getTimezoneOffset();
            sign = minutes < 0;
            let hours = Math.abs(minutes / 60).toString().split(".")[0];
            minutes = Math.abs(minutes) - (parseInt(hours, 10) * 60);
            result = (sign ? "+" : "-") + pad(parseInt(hours, 10));
            result += ":" + pad(minutes);
        }
        else if (match === "zz" || match === "z") {
            let hours = date.getTimezoneOffset() / 60;
            sign = hours < 0;
            const absHours = Math.abs(hours).toString().split(".")[0];
            result = (sign ? "+" : "-") + (match === "zz" ? pad(parseInt(absHours, 10)) : absHours);
        }
        return result !== undefined ? result : match.slice(1, match.length - 1);
    }
}
export const dateFormatterService = new DateFormatterService();
