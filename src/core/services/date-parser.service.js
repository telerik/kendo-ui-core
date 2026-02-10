const DATE_OBJECT = "[object Date]";
const objectToString = {}.toString;
const SHORT_TIMEZONE_REGEX = /[+|\-]\d{1,2}/;
const LONG_TIMEZONE_REGEX = /[+|\-]\d{1,2}:?\d{2}/;
const MICROSOFT_DATE_REGEX = /^\/Date\((.*?)\)\/$/;
const OFFSET_REGEX = /[+-]\d*/;
const FORMATS_SEQUENCE = [[], ["G", "g", "F"], ["D", "d", "y", "m", "T", "t"]];
const STANDARD_FORMATS = [
    [
        "yyyy-MM-ddTHH:mm:ss.fffffffzzz",
        "yyyy-MM-ddTHH:mm:ss.fffffff",
        "yyyy-MM-ddTHH:mm:ss.fffzzz",
        "yyyy-MM-ddTHH:mm:ss.fff",
        "ddd MMM dd yyyy HH:mm:ss",
        "yyyy-MM-ddTHH:mm:sszzz",
        "yyyy-MM-ddTHH:mmzzz",
        "yyyy-MM-ddTHH:mmzz",
        "yyyy-MM-ddTHH:mm:ss",
        "yyyy-MM-dd HH:mm:ss",
        "yyyy/MM/dd HH:mm:ss"
    ],
    [
        "yyyy-MM-ddTHH:mm",
        "yyyy-MM-dd HH:mm",
        "yyyy/MM/dd HH:mm"
    ],
    [
        "yyyy/MM/dd",
        "yyyy-MM-dd",
        "HH:mm:ss",
        "HH:mm"
    ]
];
const NUMBER_REGEX = {
    2: /^\d{1,2}/,
    3: /^\d{1,3}/,
    4: /^\d{4}/,
    exact3: /^\d{3}/
};
export class DateParserService {
    constructor(cultureService, roundFn) {
        this.cultureService = cultureService;
        this.roundFn = roundFn;
        this.timezoneService = null;
    }
    /**
     * Set the timezone service (injected later due to circular dependency)
     */
    setTimezoneService(timezoneService) {
        this.timezoneService = timezoneService;
    }
    /**
     * Parse a date string according to specified formats and culture
     */
    parseDate(value, formats, culture, shouldUnpadZeros) {
        return this.internalParseDate(value, formats, culture, false, shouldUnpadZeros);
    }
    /**
     * Parse a date string using exact format matching
     */
    parseExactDate(value, formats, culture) {
        return this.internalParseDate(value, formats, culture, true);
    }
    internalParseDate(value, formats, culture, strict, shouldUnpadZeros) {
        if (objectToString.call(value) === DATE_OBJECT) {
            return value;
        }
        if (!value) {
            return null;
        }
        const strValue = String(value);
        let date = null;
        let tzoffset;
        // Handle Microsoft JSON date format: /Date(milliseconds)/
        if (strValue.indexOf("/D") === 0) {
            const dateMatch = MICROSOFT_DATE_REGEX.exec(strValue);
            if (dateMatch) {
                let dateStr = dateMatch[1];
                tzoffset = OFFSET_REGEX.exec(dateStr.substring(1));
                date = new Date(parseInt(dateStr, 10));
                if (tzoffset && this.timezoneService) {
                    const offset = this.parseMicrosoftFormatOffset(tzoffset[0]);
                    date = this.timezoneService.apply(date, 0);
                    date = this.timezoneService.convert(date, 0, -1 * offset);
                }
                return date;
            }
        }
        const resolvedCulture = this.cultureService.getCulture(culture);
        let formatArray;
        if (!formats) {
            formatArray = this.getDefaultFormats(resolvedCulture);
        }
        else {
            formatArray = Array.isArray(formats) ? formats : [formats];
        }
        for (let idx = 0; idx < formatArray.length; idx++) {
            date = this.parseExact(strValue, formatArray[idx], resolvedCulture, strict, shouldUnpadZeros);
            if (date) {
                return date;
            }
        }
        return date;
    }
    parseExact(value, format, culture, strict, shouldUnpadZeros) {
        if (!value) {
            return null;
        }
        const calendar = culture.calendars.standard;
        let idx = 0;
        let valueIdx = 0;
        const lookAhead = (match) => {
            let i = 0;
            while (format[idx] === match) {
                i++;
                idx++;
            }
            if (i > 0) {
                idx -= 1;
            }
            return i;
        };
        const getNumber = (size) => {
            let part = "";
            if (size === 2) {
                for (let i = 0; i <= size; i++) {
                    part += value[valueIdx + i] || "";
                }
            }
            // If the value comes in the form of 021, 022, 023 we must trim the leading zero
            if (shouldUnpadZeros && part.match(NUMBER_REGEX.exact3) && Number.isInteger(Number(part)) && Number(part) > 0) {
                part = this.unpadZero(part);
            }
            else {
                part = value.substr(valueIdx, size);
            }
            const rg = NUMBER_REGEX[size] || new RegExp('^\\d{1,' + size + '}');
            const match = part.match(rg);
            if (match) {
                const matchStr = match[0];
                valueIdx += matchStr.length;
                return parseInt(matchStr, 10);
            }
            return null;
        };
        const getIndexByName = (names, lower, subLength) => {
            let matchLength = 0;
            let matchIdx = 0;
            for (let i = 0; i < names.length; i++) {
                const name = names[i];
                const nameLength = name.length;
                let subValue = value.substr(valueIdx, subLength || nameLength);
                if (lower) {
                    subValue = subValue.toLowerCase();
                }
                if (subValue === name && nameLength > matchLength) {
                    matchLength = nameLength;
                    matchIdx = i;
                }
            }
            if (matchLength) {
                valueIdx += matchLength;
                return matchIdx + 1;
            }
            return null;
        };
        const checkLiteral = () => {
            if (value.charAt(valueIdx) === format[idx]) {
                valueIdx++;
                return true;
            }
            return false;
        };
        let year = null;
        let month = null;
        let day = null;
        let hours = null;
        let minutes = null;
        let seconds = null;
        let milliseconds = null;
        let literal = false;
        const date = new Date();
        const twoDigitYearMax = calendar.twoDigitYearMax || 2029;
        const defaultYear = date.getFullYear();
        let pmHour = null;
        let UTC;
        let hoursOffset = null;
        let minutesOffset = null;
        if (!format) {
            format = "d";
        }
        // If format is part of the patterns get real format
        const pattern = calendar.patterns[format];
        if (pattern) {
            format = pattern;
        }
        const formatChars = format.split("");
        const length = formatChars.length;
        // Ensure lower case versions exist
        if (!calendar._lowerDays) {
            calendar._lowerDays = this.lowerLocalInfo(calendar.days);
        }
        if (!calendar._lowerMonths) {
            calendar._lowerMonths = this.lowerLocalInfo(calendar.months);
        }
        for (; idx < length; idx++) {
            const ch = formatChars[idx];
            if (literal) {
                if (ch === "'") {
                    literal = false;
                }
                else {
                    checkLiteral();
                }
            }
            else {
                if (ch === "d") {
                    const count = lookAhead("d");
                    if (day !== null && count > 2) {
                        continue;
                    }
                    day = count < 3
                        ? getNumber(2)
                        : getIndexByName(calendar._lowerDays[count === 3 ? "namesAbbr" : "names"], true);
                    if (day === null || this.outOfRange(day, 1, 31)) {
                        return null;
                    }
                }
                else if (ch === "M") {
                    const count = lookAhead("M");
                    month = count < 3
                        ? getNumber(2)
                        : getIndexByName(calendar._lowerMonths[count === 3 ? "namesAbbr" : "names"], true);
                    if (month === null || this.outOfRange(month, 1, 12)) {
                        return null;
                    }
                    month -= 1; // Month is zero based
                }
                else if (ch === "y") {
                    const count = lookAhead("y");
                    year = getNumber(count);
                    if (year === null) {
                        return null;
                    }
                    if (count === 2) {
                        let maxYear = twoDigitYearMax;
                        if (typeof maxYear === "string") {
                            maxYear = defaultYear + parseInt(maxYear, 10);
                        }
                        year = (defaultYear - defaultYear % 100) + year;
                        if (year > maxYear) {
                            year -= 100;
                        }
                    }
                }
                else if (ch === "h") {
                    lookAhead("h");
                    hours = getNumber(2);
                    if (hours === 12) {
                        hours = 0;
                    }
                    if (hours === null || this.outOfRange(hours, 0, 11)) {
                        return null;
                    }
                }
                else if (ch === "H") {
                    lookAhead("H");
                    hours = getNumber(2);
                    if (hours === null || this.outOfRange(hours, 0, 23)) {
                        return null;
                    }
                }
                else if (ch === "m") {
                    lookAhead("m");
                    minutes = getNumber(2);
                    if (minutes === null || this.outOfRange(minutes, 0, 59)) {
                        return null;
                    }
                }
                else if (ch === "s") {
                    lookAhead("s");
                    seconds = getNumber(2);
                    if (seconds === null || this.outOfRange(seconds, 0, 59)) {
                        return null;
                    }
                }
                else if (ch === "f") {
                    const count = lookAhead("f");
                    const match = value.substr(valueIdx, count).match(NUMBER_REGEX[3]);
                    milliseconds = getNumber(count);
                    if (milliseconds !== null && match) {
                        let ms = parseFloat("0." + match[0]);
                        ms = parseFloat(this.roundFn(ms, 3));
                        milliseconds = ms * 1000;
                    }
                    if (milliseconds === null || this.outOfRange(milliseconds, 0, 999)) {
                        return null;
                    }
                }
                else if (ch === "t") {
                    const count = lookAhead("t");
                    let amDesignators = calendar.AM;
                    let pmDesignators = calendar.PM;
                    if (count === 1) {
                        amDesignators = this.mapDesignators(amDesignators);
                        pmDesignators = this.mapDesignators(pmDesignators);
                    }
                    pmHour = getIndexByName(pmDesignators, false, this.longestStringLength(pmDesignators));
                    if (!pmHour && !getIndexByName(amDesignators, false, this.longestStringLength(amDesignators))) {
                        return null;
                    }
                }
                else if (ch === "z") {
                    UTC = true;
                    const count = lookAhead("z");
                    if (value.substr(valueIdx, 1) === "Z") {
                        checkLiteral();
                        continue;
                    }
                    const matches = value.substr(valueIdx, 6).match(count > 2 ? LONG_TIMEZONE_REGEX : SHORT_TIMEZONE_REGEX);
                    if (!matches) {
                        return null;
                    }
                    const matchParts = matches[0].split(":");
                    let hoursOffsetStr = matchParts[0];
                    let minutesOffsetStr = matchParts[1];
                    if (!minutesOffsetStr && hoursOffsetStr.length > 3) {
                        valueIdx = hoursOffsetStr.length - 2;
                        minutesOffsetStr = hoursOffsetStr.substring(valueIdx);
                        hoursOffsetStr = hoursOffsetStr.substring(0, valueIdx);
                    }
                    hoursOffset = parseInt(hoursOffsetStr, 10);
                    if (this.outOfRange(hoursOffset, -12, 13)) {
                        return null;
                    }
                    if (count > 2) {
                        minutesOffsetStr = matchParts[0][0] + minutesOffsetStr;
                        minutesOffset = parseInt(minutesOffsetStr, 10);
                        if (isNaN(minutesOffset) || this.outOfRange(minutesOffset, -59, 59)) {
                            return null;
                        }
                    }
                }
                else if (ch === "'") {
                    literal = true;
                    checkLiteral();
                }
                else if (!checkLiteral()) {
                    return null;
                }
            }
        }
        // If more characters follow, assume wrong format (strict mode)
        if (strict && !/^\s*$/.test(value.substr(valueIdx))) {
            return null;
        }
        const hasTime = hours !== null || minutes !== null || seconds !== null;
        if (year === null && month === null && day === null && hasTime) {
            year = defaultYear;
            month = date.getMonth();
            day = date.getDate();
        }
        else {
            if (year === null) {
                year = defaultYear;
            }
            if (day === null) {
                day = 1;
            }
        }
        if (pmHour && hours !== null && hours < 12) {
            hours += 12;
        }
        let result;
        if (UTC) {
            if (hoursOffset && hours !== null) {
                hours += -hoursOffset;
            }
            if (minutesOffset && minutes !== null) {
                minutes += -minutesOffset;
            }
            result = new Date(Date.UTC(year, month !== null && month !== void 0 ? month : 0, day, hours !== null && hours !== void 0 ? hours : 0, minutes !== null && minutes !== void 0 ? minutes : 0, seconds !== null && seconds !== void 0 ? seconds : 0, milliseconds !== null && milliseconds !== void 0 ? milliseconds : 0));
        }
        else {
            result = new Date(year, month !== null && month !== void 0 ? month : 0, day, hours !== null && hours !== void 0 ? hours : 0, minutes !== null && minutes !== void 0 ? minutes : 0, seconds !== null && seconds !== void 0 ? seconds : 0, milliseconds !== null && milliseconds !== void 0 ? milliseconds : 0);
            this.adjustDST(result, hours);
        }
        if (year < 100) {
            result.setFullYear(year);
        }
        if (result.getDate() !== day && UTC === undefined) {
            return null;
        }
        return result;
    }
    parseMicrosoftFormatOffset(offset) {
        const sign = offset.substr(0, 1) === "-" ? -1 : 1;
        offset = offset.substring(1);
        const result = (parseInt(offset.substr(0, 2), 10) * 60) + parseInt(offset.substring(2), 10);
        return sign * result;
    }
    getDefaultFormats(culture) {
        const length = Math.max(FORMATS_SEQUENCE.length, STANDARD_FORMATS.length);
        const calendar = culture.calendar || culture.calendars.standard;
        const patterns = calendar.patterns;
        const formats = [];
        for (let idx = 0; idx < length; idx++) {
            const cultureFormats = FORMATS_SEQUENCE[idx] || [];
            for (let formatIdx = 0; formatIdx < cultureFormats.length; formatIdx++) {
                formats.push(patterns[cultureFormats[formatIdx]]);
            }
            formats.push(...(STANDARD_FORMATS[idx] || []));
        }
        return formats;
    }
    outOfRange(value, start, end) {
        return !(value >= start && value <= end);
    }
    adjustDST(date, hours) {
        if (!hours && date.getHours() === 23) {
            date.setHours(date.getHours() + 2);
        }
    }
    lowerLocalInfo(data) {
        return {
            names: data.names.map(s => s.toLowerCase()),
            namesAbbr: data.namesAbbr.map(s => s.toLowerCase())
        };
    }
    unpadZero(value) {
        return value.replace(/^0*/, '');
    }
    mapDesignators(designators) {
        return designators.map(d => d.charAt(0));
    }
    longestStringLength(strings) {
        return strings.reduce((max, s) => Math.max(max, s.length), 0);
    }
}
