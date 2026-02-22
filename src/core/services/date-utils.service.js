import { DATE_FIELD_MAP, NAME_TYPES } from "../models/date-utils";
/**
 * Service providing date utility functions
 * Extracted from kendo.date namespace
 */
export class DateUtilsService {
    constructor(cultureService, formatterService) {
        this.cultureService = cultureService;
        this.formatterService = formatterService;
        this.MS_PER_MINUTE = 60000;
        this.MS_PER_HOUR = 60 * 60000;
        this.MS_PER_DAY = 86400000;
    }
    /**
     * Adjust date for DST changes
     */
    adjustDST(date, hours) {
        if (hours === 0 && date.getHours() === 23) {
            date.setHours(date.getHours() + 2);
            return true;
        }
        return false;
    }
    /**
     * Set the day of week on a date (mutates the date)
     */
    setDayOfWeek(date, day, dir = 1) {
        const hours = date.getHours();
        day = ((day - date.getDay()) + (7 * dir)) % 7;
        date.setDate(date.getDate() + day);
        this.adjustDST(date, hours);
    }
    /**
     * Get a new date set to the specified day of week
     */
    dayOfWeek(date, day, dir) {
        date = new Date(date);
        this.setDayOfWeek(date, day, dir);
        return date;
    }
    /**
     * Get the first day of the month
     */
    firstDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    /**
     * Get the last day of the month
     */
    lastDayOfMonth(date) {
        const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const first = this.firstDayOfMonth(date);
        const timeOffset = Math.abs(last.getTimezoneOffset() - first.getTimezoneOffset());
        if (timeOffset) {
            last.setHours(first.getHours() + (timeOffset / 60));
        }
        return last;
    }
    /**
     * Get the first day of the year
     */
    firstDayOfYear(date) {
        return new Date(date.getFullYear(), 0, 1);
    }
    /**
     * Get the last day of the year
     */
    lastDayOfYear(date) {
        return new Date(date.getFullYear(), 11, 31);
    }
    /**
     * Move date to week start for week calculation
     */
    moveDateToWeekStart(date, weekStartDay) {
        if (weekStartDay !== 1) {
            return this.addDays(this.dayOfWeek(date, weekStartDay, -1), 4);
        }
        return this.addDays(date, (4 - (date.getDay() || 7)));
    }
    /**
     * Calculate week number in year
     */
    calcWeekInYear(date, weekStartDay) {
        const firstWeekInYear = new Date(date.getFullYear(), 0, 1, -6);
        const newDate = this.moveDateToWeekStart(date, weekStartDay);
        const diffInMS = newDate.getTime() - firstWeekInYear.getTime();
        const days = Math.floor(diffInMS / this.MS_PER_DAY);
        return 1 + Math.floor(days / 7);
    }
    /**
     * Get the week number in the year
     */
    weekInYear(date, weekStartDay) {
        if (weekStartDay === undefined) {
            weekStartDay = this.cultureService.culture().calendar.firstDay;
        }
        const prevWeekDate = this.addDays(date, -7);
        const nextWeekDate = this.addDays(date, 7);
        const weekNumber = this.calcWeekInYear(date, weekStartDay);
        if (weekNumber === 0) {
            return this.calcWeekInYear(prevWeekDate, weekStartDay) + 1;
        }
        if (weekNumber === 53 && this.calcWeekInYear(nextWeekDate, weekStartDay) > 1) {
            return 1;
        }
        return weekNumber;
    }
    /**
     * Get a date with time set to midnight
     */
    getDate(date) {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        this.adjustDST(date, 0);
        return date;
    }
    /**
     * Convert date to UTC time
     */
    toUtcTime(date) {
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }
    /**
     * Get milliseconds from midnight
     */
    getMilliseconds(date) {
        return this.toInvariantTime(date).getTime() - this.getDate(this.toInvariantTime(date)).getTime();
    }
    /**
     * Check if a time value is within a range
     */
    isInTimeRange(value, min, max) {
        let msMin = this.getMilliseconds(min);
        let msMax = this.getMilliseconds(max);
        if (!value || msMin === msMax) {
            return true;
        }
        if (min >= max) {
            msMax += this.MS_PER_DAY;
        }
        let msValue = this.getMilliseconds(value);
        if (msMin > msValue) {
            msValue += this.MS_PER_DAY;
        }
        if (msMax < msMin) {
            msMax += this.MS_PER_DAY;
        }
        return msValue >= msMin && msValue <= msMax;
    }
    /**
     * Check if a date value is within a range
     */
    isInDateRange(value, min, max) {
        let msMin = min.getTime();
        let msMax = max.getTime();
        if (msMin >= msMax) {
            msMax += this.MS_PER_DAY;
        }
        const msValue = value.getTime();
        return msValue >= msMin && msValue <= msMax;
    }
    /**
     * Add days to a date
     */
    addDays(date, offset) {
        const hours = date.getHours();
        date = new Date(date);
        this.setTime(date, offset * this.MS_PER_DAY);
        this.adjustDST(date, hours);
        return date;
    }
    /**
     * Set time on a date (mutates the date)
     */
    setTime(date, milliseconds, ignoreDST) {
        const offset = date.getTimezoneOffset();
        date.setTime(date.getTime() + milliseconds);
        if (!ignoreDST) {
            const difference = date.getTimezoneOffset() - offset;
            date.setTime(date.getTime() + difference * this.MS_PER_MINUTE);
        }
    }
    /**
     * Set hours from another date/time
     */
    setHours(date, time) {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
        this.adjustDST(date, time.getHours());
        return date;
    }
    /**
     * Get today's date (midnight)
     */
    today() {
        return this.getDate(new Date());
    }
    /**
     * Check if a date is today
     */
    isToday(date) {
        return this.getDate(date).getTime() === this.today().getTime();
    }
    /**
     * Convert date to invariant time (fixed date, preserves time)
     */
    toInvariantTime(date) {
        const staticDate = new Date(1980, 1, 1, 0, 0, 0);
        if (date) {
            staticDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        }
        return staticDate;
    }
    /**
     * Add years to a date
     */
    addYear(date, offset) {
        const currentDate = new Date(date);
        return new Date(currentDate.setFullYear(currentDate.getFullYear() + offset));
    }
    /**
     * Get the next day
     */
    nextDay(date) {
        return this.addDays(date, 1);
    }
    /**
     * Get the previous day
     */
    previousDay(date) {
        return this.addDays(date, -1);
    }
    /**
     * Get the next year
     */
    nextYear(date) {
        return this.addYear(date, 1);
    }
    /**
     * Get the previous year
     */
    previousYear(date) {
        return this.addYear(date, -1);
    }
    /**
     * Add literal part to date format parts array
     */
    addLiteral(parts, value) {
        const lastPart = parts[parts.length - 1];
        if (lastPart && lastPart.type === "LITERAL") {
            lastPart.pattern += value;
        }
        else {
            parts.push({
                type: "literal",
                pattern: value
            });
        }
    }
    /**
     * Check if hour pattern is 12-hour format
     */
    isHour12(pattern) {
        return pattern === "h" || pattern === "K";
    }
    /**
     * Get date name type based on format length
     */
    dateNameType(formatLength) {
        if (formatLength <= 3) {
            return "abbreviated";
        }
        else if (formatLength === 4) {
            return "wide";
        }
        else if (formatLength === 5) {
            return "narrow";
        }
        return undefined;
    }
    /**
     * Check if text starts with search string
     */
    startsWith(text, searchString, position = 0) {
        return text.indexOf(searchString, position) === position;
    }
    /**
     * Get date pattern from format
     */
    datePattern(format, info) {
        const calendar = info.calendar;
        let result;
        if (typeof format === "string") {
            if (calendar.patterns[format]) {
                result = calendar.patterns[format];
            }
            else {
                result = format;
            }
        }
        if (!result) {
            result = calendar.patterns.d;
        }
        return result;
    }
    /**
     * Split a date format string into parts
     */
    splitDateFormat(format) {
        const info = this.cultureService.culture();
        const pattern = this.datePattern(format, info)
            .replaceAll("dddd", "EEEE")
            .replaceAll("ddd", "EEE")
            .replace("tt", "aa");
        const parts = [];
        const dateFormatRegExp = /d{1,2}|E{1,6}|e{1,6}|c{3,6}|c{1}|M{1,5}|L{1,5}|y{1,4}|H{1,2}|h{1,2}|k{1,2}|K{1,2}|m{1,2}|a{1,5}|s{1,2}|S{1,3}|t{1,2}|z{1,4}|Z{1,5}|x{1,5}|X{1,5}|G{1,5}|q{1,5}|Q{1,5}|"[^"]*"|'[^']*'/g;
        let lastIndex = dateFormatRegExp.lastIndex = 0;
        let match = dateFormatRegExp.exec(pattern);
        while (match) {
            const value = match[0];
            if (lastIndex < match.index) {
                this.addLiteral(parts, pattern.substring(lastIndex, match.index));
            }
            if (this.startsWith(value, '"') || this.startsWith(value, "'")) {
                this.addLiteral(parts, value);
            }
            else {
                const specifier = value[0];
                const type = DATE_FIELD_MAP[specifier];
                const part = {
                    type: type,
                    pattern: value
                };
                if (type === "hour") {
                    part.hour12 = this.isHour12(value);
                }
                const names = NAME_TYPES[type];
                if (names) {
                    const minLength = typeof names.minLength === "number"
                        ? names.minLength
                        : names.minLength[specifier];
                    const patternLength = value.length;
                    if (patternLength >= minLength && value !== "aa") {
                        part.names = {
                            type: names.type,
                            nameType: this.dateNameType(patternLength) || "abbreviated",
                            standAlone: names.standAlone === specifier
                        };
                    }
                }
                parts.push(part);
            }
            lastIndex = dateFormatRegExp.lastIndex;
            match = dateFormatRegExp.exec(pattern);
        }
        if (lastIndex < pattern.length) {
            this.addLiteral(parts, pattern.substring(lastIndex));
        }
        return parts;
    }
    /**
     * Get date format names (month names, day names, etc.)
     */
    dateFormatNames(options) {
        var _a, _b;
        let { type, nameType } = options;
        const info = this.cultureService.culture();
        if (nameType === "wide") {
            nameType = "names";
        }
        if (nameType === "abbreviated") {
            nameType = "namesAbbr";
        }
        if (nameType === "narrow") {
            nameType = "namesShort";
        }
        let result = (_a = info.calendar[type]) === null || _a === void 0 ? void 0 : _a[nameType];
        if (!result) {
            result = (_b = info.calendar[type]) === null || _b === void 0 ? void 0 : _b["name"];
        }
        return result || [];
    }
    /**
     * Get date field name
     */
    dateFieldName(options) {
        const info = this.cultureService.culture();
        const dateFields = info.calendar.dateFields;
        const fieldNameInfo = (dateFields === null || dateFields === void 0 ? void 0 : dateFields[options.type]) || {};
        return fieldNameInfo[options.nameType];
    }
    /**
     * Generates a relative date string (Today, Yesterday, Last Wednesday, etc.)
     * @param date - The date to compare against
     * @param currentDate - The current date (defaults to new Date())
     * @returns Relative date string
     */
    getRelativeDateString(date, currentDate = new Date()) {
        if (!date) {
            return '';
        }
        const today = new Date(currentDate);
        today.setHours(0, 0, 0, 0);
        const dateObj = new Date(date);
        dateObj.setHours(0, 0, 0, 0);
        const diffTime = today.getTime() - dateObj.getTime();
        const diffDays = Math.floor(diffTime / this.MS_PER_DAY);
        if (diffDays === 0) {
            return 'Today';
        }
        else if (diffDays === 1) {
            return 'Yesterday';
        }
        else if (diffDays <= 6) {
            return `Last ${this.formatterService.toString(dateObj, 'dddd')}`;
        }
        else {
            // For older dates, show formatted date
            return String(this.formatterService.toString(dateObj, 'dddd, MMMM dd, yyyy'));
        }
    }
}
