(function(f, define){
    define([ "./kendo.dropdownlist", "./kendo.datepicker", "./kendo.numerictextbox" ], f);
})(function(){

var __meta__ = {
    id: "scheduler.recurrence",
    name: "Recurrence",
    category: "web",
    depends: [ "dropdownlist", "datepicker", "numerictextbox" ],
    hidden: true
};

(function($, undefined) {
    var kendo = window.kendo,
        timezone = kendo.timezone,
        Class = kendo.Class,
        ui = kendo.ui,
        Widget = ui.Widget,
        DropDownList = ui.DropDownList,
        kendoDate = kendo.date,
        setTime = kendoDate.setTime,
        setDayOfWeek = kendoDate.setDayOfWeek,
        adjustDST = kendoDate.adjustDST,
        firstDayOfMonth = kendoDate.firstDayOfMonth,
        getMilliseconds = kendoDate.getMilliseconds,
        DAYS_IN_LEAPYEAR = [0,31,60,91,121,152,182,213,244,274,305,335,366],
        DAYS_IN_YEAR = [0,31,59,90,120,151,181,212,243,273,304,334,365],
        MONTHS = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31],
        WEEK_DAYS = {
            0: "SU",
            1: "MO",
            2: "TU",
            3: "WE",
            4: "TH",
            5: "FR",
            6: "SA"
        },
        WEEK_DAYS_IDX = {
            "SU": 0,
            "MO": 1,
            "TU": 2,
            "WE": 3,
            "TH": 4,
            "FR": 5,
            "SA": 6
        },
        DATE_FORMATS = [
            "yyyy-MM-ddTHH:mm:ss.fffzzz",
            "yyyy-MM-ddTHH:mm:sszzz",
            "yyyy-MM-ddTHH:mm:ss",
            "yyyy-MM-ddTHH:mm",
            "yyyy-MM-ddTHH",
            "yyyy-MM-dd",
            "yyyyMMddTHHmmssfffzzz",
            "yyyyMMddTHHmmsszzz",
            "yyyyMMddTHHmmss",
            "yyyyMMddTHHmm",
            "yyyyMMddTHH",
            "yyyyMMdd"
        ],
        RULE_NAMES = ["months", "weeks", "yearDays", "monthDays", "weekDays", "hours", "minutes", "seconds"],
        RULE_NAMES_LENGTH = RULE_NAMES.length,
        RECURRENCE_DATE_FORMAT = "yyyyMMddTHHmmssZ",
        limitation = {
            months: function(date, end, rule) {
                var monthRules = rule.months,
                    months = ruleValues(monthRules, date.getMonth() + 1),
                    changed = false;

                if (months !== null) {
                    if (months.length) {
                        date.setMonth(months[0] - 1, 1);
                    } else {
                        date.setFullYear(date.getFullYear() + 1, monthRules[0] - 1, 1);
                    }

                    changed = true;
                }

                return changed;
            },

            monthDays: function(date, end, rule) {
                var monthLength, month, days,
                    changed = false,
                    hours = date.getHours(),
                    normalize = function(monthDay) {
                        if (monthDay < 0) {
                            monthDay = monthLength + monthDay;
                        }
                        return monthDay;
                    };

                while (date <= end) {
                    month = date.getMonth();
                    monthLength = getMonthLength(date);
                    days = ruleValues(rule.monthDays, date.getDate(), normalize);

                    if (days === null) {
                        return changed;
                    }

                    changed = true;

                    if (days.length) {
                        date.setMonth(month, days.sort(numberSortPredicate)[0]);
                        adjustDST(date, hours);

                        if (month === date.getMonth()) {
                            break;
                        }
                    } else {
                        date.setMonth(month + 1, 1);
                    }
                }

                return changed;
            },

            yearDays: function(date, end, rule) {
                var year, yearDays,
                    changed = false,
                    hours = date.getHours(),
                    normalize = function(yearDay) {
                        if (yearDay < 0) {
                            yearDay = year + yearDay;
                        }
                        return yearDay;
                    };

                while (date < end) {
                    year = leapYear(date) ? 366 : 365;
                    yearDays = ruleValues(rule.yearDays, dayInYear(date), normalize);

                    if (yearDays === null) {
                        return changed;
                    }

                    changed = true;
                    year = date.getFullYear();

                    if (yearDays.length) {
                        date.setFullYear(year, 0, yearDays.sort(numberSortPredicate)[0]);
                        adjustDST(date, hours);
                        break;
                    } else {
                        date.setFullYear(year + 1, 0, 1);
                    }
                }

                return changed;
            },

            weeks: function(date, end, rule) {
                var weekStart = rule.weekStart,
                    year, weeks, day,
                    changed = false,
                    hours = date.getHours(),
                    normalize = function(week) {
                        if (week < 0) {
                            week = 53 + week;
                        }
                        return week;
                    };

                while (date < end) {
                    weeks = ruleValues(rule.weeks, weekInYear(date, weekStart), normalize);

                    if (weeks === null) {
                        return changed;
                    }

                    changed = true;
                    year = date.getFullYear();

                    if (weeks.length) {
                        day = (weeks.sort(numberSortPredicate)[0] * 7) - 1;

                        date.setFullYear(year, 0, day);
                        setDayOfWeek(date, weekStart, -1);

                        adjustDST(date, hours);
                        break;
                    } else {
                        date.setFullYear(year + 1, 0, 1);
                    }
                }

                return changed;
            },

            weekDays: function(date, end, rule) {
                var weekDays = rule.weekDays;
                var weekStart = rule.weekStart;
                var weekDayRules = ruleWeekValues(weekDays, date, weekStart);
                var hours = date.getHours();
                var weekDayRule, day;

                if (weekDayRules === null) {
                    return false;
                }

                weekDayRule = weekDayRules[0];
                if (!weekDayRule) {
                    weekDayRule = weekDays[0];
                    setDayOfWeek(date, weekStart);
                }

                day = weekDayRule.day;

                if (weekDayRule.offset) {
                    while (date <= end && !isInWeek(date, weekDayRule, weekStart)) {
                        if (weekInMonth(date, weekStart) === numberOfWeeks(date, weekStart)) {
                            date.setMonth(date.getMonth() + 1, 1);
                            adjustDST(date, hours);
                        } else {
                            date.setDate(date.getDate() + 7);
                            adjustDST(date, hours);

                            setDayOfWeek(date, weekStart, -1);
                        }
                    }
                }

                if (date.getDay() !== day) {
                    setDayOfWeek(date, day);
                }

                return true;
            },

            hours: function(date, end, rule) {
                var hourRules = rule.hours,
                    startTime = rule._startTime,
                    startHours = startTime.getHours(),
                    hours = ruleValues(hourRules, startHours),
                    changed = false;

                if (hours !== null) {
                    changed = true;

                    date.setHours(startHours);
                    adjustDST(date, startHours);

                    if (hours.length) {
                        hours = hours[0];
                        date.setHours(hours);
                    } else {
                        hours = date.getHours();
                        date.setDate(date.getDate() + 1);
                        adjustDST(date, hours);

                        hours = hourRules[0];
                        date.setHours(hours);
                        adjustDST(date, hours);
                    }

                    if (rule.minutes) {
                        date.setMinutes(0);
                    }

                    startTime.setHours(hours, date.getMinutes());
                }

                return changed;
            },

            minutes: function(date, end, rule) {
                var minuteRules = rule.minutes,
                    currentMinutes = date.getMinutes(),
                    minutes = ruleValues(minuteRules, currentMinutes),
                    hours = rule._startTime.getHours(),
                    changed = false;

                if (minutes !== null) {
                    changed = true;

                    if (minutes.length) {
                        minutes = minutes[0];
                    } else {
                        hours += 1;
                        minutes = minuteRules[0];
                    }

                    if (rule.seconds) {
                        date.setSeconds(0);
                    }

                    date.setHours(hours, minutes);

                    hours = hours % 24;
                    adjustDST(date, hours);
                    rule._startTime.setHours(hours, minutes, date.getSeconds());
                }

                return changed;
            },

            seconds: function(date, end, rule) {
                var secondRules = rule.seconds,
                    hours = rule._startTime.getHours(),
                    seconds = ruleValues(secondRules, date.getSeconds()),
                    minutes = date.getMinutes(),
                    changed = false;

                if (seconds !== null) {
                    changed = true;

                    if (seconds.length) {
                        date.setSeconds(seconds[0]);
                    } else {
                        minutes += 1;
                        date.setMinutes(minutes, secondRules[0]);

                        if (minutes > 59) {
                            minutes = minutes % 60;
                            hours = (hours + 1) % 24;
                        }
                    }

                    rule._startTime.setHours(hours, minutes, date.getSeconds());
                }

                return changed;
            }
        },
        BaseFrequency = Class.extend({
            next: function(date, rule) {
                var startTime = rule._startTime,
                    day = startTime.getDate(),
                    minutes, seconds;

                if (rule.seconds) {
                    seconds = date.getSeconds() + 1;

                    date.setSeconds(seconds);
                    startTime.setSeconds(seconds);
                    startTime.setDate(day);

                } else if (rule.minutes) {
                    minutes = date.getMinutes() + 1;

                    date.setMinutes(minutes);
                    startTime.setMinutes(minutes);
                    startTime.setDate(day);
                } else {
                    return false;
                }

                return true;
            },

            normalize: function(options) {
                var rule = options.rule;

                if (options.idx === 4 && rule.hours) {
                    rule._startTime.setHours(0);
                    this._hour(options.date, rule);
                }
            },

            limit: function(date, end, rule) {
                var interval = rule.interval,
                    ruleName, firstRule,
                    modified,
                    idx, day;

                while (date <= end) {
                    modified = firstRule = undefined;
                    day = date.getDate();

                    for (idx = 0; idx < RULE_NAMES_LENGTH; idx++) {
                        ruleName = RULE_NAMES[idx];

                        if (rule[ruleName]) {
                            modified = limitation[ruleName](date, end, rule);
                            if (firstRule !== undefined && modified) {
                                break;
                            } else {
                                firstRule = modified;
                            }
                        }

                        if (modified) {
                            this.normalize({ date: date, rule: rule, day: day, idx: idx });
                        }
                    }

                    if ((interval === 1 || !this.interval(rule, date)) && idx === RULE_NAMES_LENGTH) {
                        break;
                    }
                }
            },

            interval: function (rule, current) {
                var start = new Date(rule._startPeriod);
                var date = new Date(current);
                var hours = current.getHours();
                var weekStart = rule.weekStart;
                var interval = rule.interval;
                var frequency = rule.freq;
                var modified = false;
                var excess = 0;
                var month = 0;
                var day = 1;
                var diff;

                var startTimeHours;

                if (frequency === "hourly") {
                    diff = date.getTimezoneOffset() - start.getTimezoneOffset();
                    startTimeHours = rule._startTime.getHours();

                    date = date.getTime();
                    if (hours !== startTimeHours) {
                        date += (startTimeHours - hours) * kendoDate.MS_PER_HOUR;
                    }
                    date -= start;

                    if (diff) {
                        date -= diff * kendoDate.MS_PER_MINUTE;
                    }

                    diff = Math.floor(date / kendoDate.MS_PER_HOUR);
                    excess = intervalExcess(diff, interval);

                    if (excess !== 0) {
                        this._hour(current, rule, excess);
                        modified = true;
                    }
                } else if (frequency === "daily") {
                    kendoDate.setTime(date, -start);

                    diff = Math.floor(date / kendoDate.MS_PER_DAY);
                    excess = intervalExcess(diff, interval);

                    if (excess !== 0) {
                        this._date(current, rule, excess);
                        modified = true;
                    }

                } else if (frequency === "weekly") {
                    diff = (current.getFullYear() - start.getFullYear()) * 52;

                    excess = weekInYear(current, weekStart) - weekInYear(start, weekStart) + diff;
                    excess = intervalExcess(excess, interval);

                    if (excess !== 0) {
                        kendoDate.setDayOfWeek(current, rule.weekStart, -1);

                        current.setDate(current.getDate() + (excess * 7));
                        adjustDST(current, hours);

                        modified = true;
                    }
                } else if (frequency === "monthly") {
                    diff = current.getFullYear() - start.getFullYear();
                    diff = current.getMonth() - start.getMonth() + (diff * 12);

                    excess = intervalExcess(diff, interval);

                    if (excess !== 0) {
                        day = rule._hasRuleValue ? 1 : current.getDate();

                        current.setFullYear(current.getFullYear(), current.getMonth() + excess, day);
                        adjustDST(current, hours);

                        modified = true;
                    }
                } else if (frequency === "yearly") {
                    diff = current.getFullYear() - start.getFullYear();
                    excess = intervalExcess(diff, interval);

                    if (!rule.months) {
                        month = current.getMonth();
                    }

                    if (!rule.yearDays && !rule.monthDays && !rule.weekDays) {
                        day = current.getDate();
                    }

                    if (excess !== 0) {
                        current.setFullYear(current.getFullYear() + excess, month, day);
                        adjustDST(current, hours);

                        modified = true;
                    }
                }

                return modified;
            },

            _hour: function(date, rule, interval) {
                var startTime = rule._startTime,
                    hours = startTime.getHours();

                if (interval) {
                    hours += interval;
                }

                date.setHours(hours);

                hours = hours % 24;
                startTime.setHours(hours);
                adjustDST(date, hours);
            },

            _date: function(date, rule, interval) {
                var hours = date.getHours();

                date.setDate(date.getDate() + interval);
                if (!adjustDST(date, hours)) {
                    this._hour(date, rule);
                }
            }
        }),
        HourlyFrequency = BaseFrequency.extend({
            next: function(date, rule) {
                if (!BaseFrequency.fn.next(date, rule)) {
                    this._hour(date, rule, 1);
                }
            },

            normalize: function(options) {
                var rule = options.rule;

                if (options.idx === 4) {
                    rule._startTime.setHours(0);
                    this._hour(options.date, rule);
                }
            }
        }),
        DailyFrequency = BaseFrequency.extend({
            next: function(date, rule) {
                if (!BaseFrequency.fn.next(date, rule)) {
                    this[rule.hours ? "_hour" : "_date"](date, rule, 1);
                }
            }
        }),
        WeeklyFrequency = DailyFrequency.extend({
            setup: function(rule, eventStartDate) {
                if (!rule.weekDays) {
                    rule.weekDays = [{
                        day: eventStartDate.getDay(),
                        offset: 0
                    }];
                }
            }
        }),
        MonthlyFrequency = BaseFrequency.extend({
            next: function(date, rule) {
                var day, hours;
                if (!BaseFrequency.fn.next(date, rule)) {
                    if (rule.hours) {
                        this._hour(date, rule, 1);
                    } else if (rule.monthDays || rule.weekDays || rule.yearDays || rule.weeks) {
                        this._date(date, rule, 1);
                    } else {
                        day = date.getDate();
                        hours = date.getHours();

                        date.setMonth(date.getMonth() + 1);
                        adjustDST(date, hours);

                        while(date.getDate() !== day) {
                            date.setDate(day);
                            adjustDST(date, hours);
                        }

                        this._hour(date, rule);
                    }
                }
            },
            normalize: function(options) {
                var rule = options.rule,
                    date = options.date,
                    hours = date.getHours();

                if (options.idx === 0 && !rule.monthDays && !rule.weekDays) {
                    date.setDate(options.day);
                    adjustDST(date, hours);
                } else {
                    BaseFrequency.fn.normalize(options);
                }
            },
            setup: function(rule, eventStartDate, date) {
                if (!rule.monthDays && !rule.weekDays) {
                    date.setDate(eventStartDate.getDate());
                }
            }
        }),
        YearlyFrequency = MonthlyFrequency.extend({
            next: function(date, rule) {
                var day,
                    hours = date.getHours();

                if (!BaseFrequency.fn.next(date, rule)) {
                    if (rule.hours) {
                        this._hour(date, rule, 1);
                    } else if (rule.monthDays || rule.weekDays || rule.yearDays || rule.weeks) {
                        this._date(date, rule, 1);
                    } else if (rule.months) {
                        day = date.getDate();

                        date.setMonth(date.getMonth() + 1);
                        adjustDST(date, hours);

                        while(date.getDate() !== day) {
                            date.setDate(day);
                            adjustDST(date, hours);
                        }

                        this._hour(date, rule);
                    } else {
                        date.setFullYear(date.getFullYear() + 1);
                        adjustDST(date, hours);

                        this._hour(date, rule);
                    }
                }
            },
            setup: function() {}
        }),
        frequencies = {
            "hourly" : new HourlyFrequency(),
            "daily" : new DailyFrequency(),
            "weekly" : new WeeklyFrequency(),
            "monthly" : new MonthlyFrequency(),
            "yearly" : new YearlyFrequency()
        },
        CLICK = "click";

    function intervalExcess(diff, interval) {
        var excess;
        if (diff !== 0 && diff < interval) {
            excess = interval - diff;
        } else {
            excess = diff % interval;
            if (excess) {
                excess = interval - excess;
            }
        }

        return excess;
    }

    function dayInYear(date) {
        var month = date.getMonth();
        var days = leapYear(date) ? DAYS_IN_LEAPYEAR[month] : DAYS_IN_YEAR[month];

        return days + date.getDate();
    }

    function weekInYear(date, weekStart){
        var year, days;

        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        adjustDST(date, 0);

        year = date.getFullYear();

        if (weekStart !== undefined) {
            setDayOfWeek(date, weekStart, -1);
            date.setDate(date.getDate() + 4);
        } else {
            date.setDate(date.getDate() + (4 - (date.getDay() || 7)));
        }

        adjustDST(date, 0);
        days = Math.floor((date.getTime() - new Date(year, 0, 1, -6)) / 86400000);

        return 1 + Math.floor(days / 7);
    }

    function weekInMonth(date, weekStart) {
        var firstWeekDay = firstDayOfMonth(date).getDay();
        var firstWeekLength = 7 - (firstWeekDay + 7 - (weekStart || 7)) || 7;

        if (firstWeekLength < 0) {
            firstWeekLength += 7;
        }

        return Math.ceil((date.getDate() - firstWeekLength) / 7) + 1;
    }

    function normalizeDayIndex(weekDay, weekStart) {
        return weekDay + (weekDay < weekStart ? 7 : 0);
    }

    function normalizeOffset(date, rule, weekStart) {
        var offset = rule.offset;

        if (!offset) {
            return weekInMonth(date, weekStart);
        }

        var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var weeksInMonth = weekInMonth(lastDate, weekStart);

        var day = normalizeDayIndex(rule.day, weekStart);

        var skipFirst = day < normalizeDayIndex(new Date(date.getFullYear(), date.getMonth(), 1).getDay(), weekStart);
        var skipLast = day > normalizeDayIndex(lastDate.getDay(), weekStart);

        if (offset < 0) {
            offset = weeksInMonth + (offset + 1 - (skipLast ? 1 : 0));
        } else if (skipFirst) {
            offset += 1;
        }

        weeksInMonth -= (skipLast ? 1 : 0);

        if (offset < (skipFirst ? 1 : 0) || offset > weeksInMonth) {
            return null;
        }

        return offset;
    }

    function numberOfWeeks(date, weekStart) {
        return weekInMonth(new Date(date.getFullYear(), date.getMonth() + 1, 0), weekStart);
    }

    function isInWeek(date, rule, weekStart) {
        return weekInMonth(date, weekStart) === normalizeOffset(date, rule, weekStart);
    }

    function ruleWeekValues(weekDays, date, weekStart) {
        var currentDay = normalizeDayIndex(date.getDay(), weekStart);
        var length = weekDays.length;
        var ruleWeekOffset;
        var weekDay, day;
        var weekNumber;
        var result = [];
        var idx = 0;

        for (;idx < length; idx++) {
            weekDay = weekDays[idx];

            weekNumber = weekInMonth(date, weekStart);
            ruleWeekOffset = normalizeOffset(date, weekDay, weekStart);

            if (ruleWeekOffset === null) {
                continue;
            }

            if (weekNumber < ruleWeekOffset) {
                result.push(weekDay);
            } else if (weekNumber === ruleWeekOffset) {
                day = normalizeDayIndex(weekDay.day, weekStart);

                if (currentDay < day) {
                    result.push(weekDay);
                } else if (currentDay === day) {
                    return null;
                }
            }
        }

        return result;
    }

    function ruleValues(rules, value, normalize) {
        var idx = 0,
            length = rules.length,
            availableRules = [],
            ruleValue;

        for (; idx < length; idx++) {
            ruleValue = rules[idx];

            if (normalize) {
                ruleValue = normalize(ruleValue);
            }

            if (value === ruleValue) {
                return null;
            }  else if (value < ruleValue) {
                availableRules.push(ruleValue);
            }
        }

        return availableRules;
    }

    function parseArray(list, range) {
        var idx = 0,
            length = list.length,
            value;

        for (; idx < length; idx++) {
            value = parseInt(list[idx], 10);
            if (isNaN(value) || value < range.start || value > range.end || (value === 0 && range.start < 0)) {
                return null;
            }

            list[idx] = value;
        }

        return list.sort(numberSortPredicate);
    }

    function parseWeekDayList(list) {
        var idx = 0, length = list.length,
            value, valueLength, day;

        for (; idx < length; idx++) {
            value = list[idx];
            valueLength = value.length;
            day = value.substring(valueLength - 2).toUpperCase();

            day = WEEK_DAYS_IDX[day];
            if (day === undefined) {
                return null;
            }

            list[idx] = {
                offset: parseInt(value.substring(0, valueLength - 2), 10) || 0,
                day: day
            };
        }
        return list;
    }

    function serializeWeekDayList(list) {
        var idx = 0, length = list.length,
            value, valueString, result = [];

        for (; idx < length; idx++) {
            value = list[idx];
            if (typeof value === "string") {
                valueString = value;
            } else {
                valueString = "" + WEEK_DAYS[value.day];

                if (value.offset) {
                    valueString = value.offset + valueString;
                }
            }

            result.push(valueString);
        }
        return result.toString();
    }

    function getMonthLength(date) {
        var month = date.getMonth();

        if (month === 1) {
            if (new Date(date.getFullYear(), 1, 29).getMonth() === 1) {
                return 29;
            }
            return 28;
        }
        return MONTHS[month];
    }

    function leapYear(year) {
        year = year.getFullYear();
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }

    function numberSortPredicate(a, b) {
        return a - b;
    }

    function parseExceptions(exceptions, zone) {
        var idx = 0, length, date,
            dates = [];

        if (exceptions) {
            exceptions = exceptions.split(";");
            length = exceptions.length;

            for (; idx < length; idx++) {
                date = parseUTCDate(exceptions[idx], zone);

                if (date) {
                    dates.push(date);
                }
            }
        }

        return dates;
    }

    function isException(exceptions, date, zone) {
        var dates = $.isArray(exceptions) ? exceptions : parseExceptions(exceptions, zone),
            dateTime = date.getTime() - date.getMilliseconds(),
            idx = 0, length = dates.length;

        for (; idx < length; idx++) {
            if (dates[idx].getTime() === dateTime) {
                return true;
            }
        }

        return false;
    }

    function toExceptionString(dates, zone) {
        var idx = 0;
        var length;
        var date;
        var result = [].concat(dates);

        for (length = result.length; idx < length; idx++) {
            date = result[idx];
            date = kendo.timezone.convert(date, zone || date.getTimezoneOffset(), "Etc/UTC");
            result[idx] = kendo.toString(date, RECURRENCE_DATE_FORMAT);
        }

        return result.join(";") + ";";
    }

    function startPeriodByFreq(start, rule) {
        var date = new Date(start);

        switch (rule.freq) {
            case "yearly":
                date.setFullYear(date.getFullYear(), 0, 1);
                break;

            case "monthly":
                date.setFullYear(date.getFullYear(), date.getMonth(), 1);
                break;

            case "weekly":
                setDayOfWeek(date, rule.weekStart, -1);
                break;

            default:
                break;
        }

        if (rule.hours) {
            date.setHours(0);
        }

        if (rule.minutes) {
            date.setMinutes(0);
        }

        if (rule.seconds) {
            date.setSeconds(0);
        }

        return date;
    }

    function endPeriodByFreq(start, rule) {
        var date = new Date(start);

        switch (rule.freq) {
            case "yearly":
                date.setFullYear(date.getFullYear(), 11, 31);
                break;

            case "monthly":
                date.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);
                break;

            case "weekly":
                setDayOfWeek(date, rule.weekStart, -1);
                date.setDate(date.getDate() + 6);
                break;

            default:
                break;
        }

        if (rule.hours) {
            date.setHours(23);
        }

        if (rule.minutes) {
            date.setMinutes(59);
        }

        if (rule.seconds) {
            date.setSeconds(59);
        }

        return date;
    }

    function normalizeEventsByPosition(events, start, rule) {
        var periodEvents = events.slice(rule._startIdx);
        var periodEventsLength = periodEvents.length;
        var positions = rule.positions;
        var list = [];
        var position;
        var event;

        for (var idx = 0, length = positions.length; idx < length; idx++) {
            position = positions[idx];

            if (position < 0) {
                position = periodEventsLength + position;
            } else {
                position -= 1; //convert to zero based index
            }

            event = periodEvents[position];

            if (event && event.start >= start) {
                list.push(event);
            }
        }

        events = events.slice(0, rule._startIdx).concat(list);

        rule._startIdx = events.length;

        return events;
    }

    function expand(event, start, end, zone) {
        var rule = parseRule(event.recurrenceRule, zone),
            startTime, endTime, endDate,
            hours, minutes, seconds,
            durationMS, startPeriod, inPeriod,
            ruleStart, ruleEnd,
            useEventStart, freqName,
            exceptionDates,
            eventStartTime,
            eventStartMS,
            eventStart,
            count, freq,
            positions,
            current,
            events = [];

        if (!rule) {
            return [event];
        }

        positions = rule.positions;
        current = positions ? 0 : 1;

        ruleStart = rule.start;
        ruleEnd = rule.end;

        if (ruleStart || ruleEnd) {
            event = event.clone({
                start: ruleStart ? new Date(ruleStart.value[0]) : undefined,
                end: ruleEnd ? new Date(ruleEnd.value[0]) : undefined
            });
        }

        eventStart = event.start;
        eventStartMS = eventStart.getTime();
        eventStartTime = getMilliseconds(eventStart);

        exceptionDates = parseExceptions(event.recurrenceException, zone);

        if (!exceptionDates[0] && rule.exdates) {
            exceptionDates = rule.exdates.value;
            event.set("recurrenceException", toExceptionString(exceptionDates, zone));
        }

        startPeriod = start = new Date(start);
        end = new Date(end);

        freqName = rule.freq;
        freq = frequencies[freqName];
        count = rule.count;

        if (rule.until && rule.until < end) {
            end = new Date(rule.until);
        }

        useEventStart = freqName === "yearly" || freqName === "monthly" || freqName === "weekly";

        if (start < eventStartMS || count || rule.interval > 1 || useEventStart) {
            start = new Date(eventStartMS);
        } else {
            hours = start.getHours();
            minutes = start.getMinutes();
            seconds = start.getSeconds();

            if (!rule.hours) {
                hours = eventStart.getHours();
            }

            if (!rule.minutes) {
                minutes = eventStart.getMinutes();
            }

            if (!rule.seconds) {
                seconds = eventStart.getSeconds();
            }

            start.setHours(hours, minutes, seconds, eventStart.getMilliseconds());
        }

        rule._startPeriod = new Date(start);

        if (positions) {
            start = startPeriodByFreq(start, rule);
            end = endPeriodByFreq(end, rule);

            var diff = getMilliseconds(end) - getMilliseconds(start);
            if (diff < 0) {
                hours = start.getHours();
                end.setHours(hours, start.getMinutes(), start.getSeconds(), start.getMilliseconds());
                kendoDate.adjustDST(end, hours);
            }

            rule._startPeriod = new Date(start);
            rule._endPeriod = endPeriodByFreq(start, rule);
            rule._startIdx = 0;
        }

        durationMS = event.duration();
        rule._startTime = startTime = kendoDate.toInvariantTime(start);

        if (freq.setup) {
            freq.setup(rule, eventStart, start);
        }

        freq.limit(start, end, rule);

        while (start <= end) {
            endDate = new Date(start);
            setTime(endDate, durationMS);

            inPeriod = start >= startPeriod || endDate > startPeriod;

            if (inPeriod && !isException(exceptionDates, start, zone) || positions) {
                startTime = kendoDate.toUtcTime(kendoDate.getDate(start)) + getMilliseconds(rule._startTime);
                endTime = startTime + durationMS;

                if (eventStartMS !== start.getTime() || eventStartTime !== getMilliseconds(rule._startTime)) {
                    events.push(event.toOccurrence({
                        start: new Date(start),
                        end: endDate,
                        _startTime: startTime,
                        _endTime: endTime
                    }));
                } else {
                    event._startTime = startTime;
                    event._endTime = endTime;
                    events.push(event);
                }
            }

            if (positions) {
                freq.next(start, rule);
                freq.limit(start, end, rule);

                if (start > rule._endPeriod) {
                    events = normalizeEventsByPosition(events, eventStart, rule);

                    rule._endPeriod = endPeriodByFreq(start, rule);

                    current = events.length;
                }

                if (count && count === current) {
                    break;
                }

            } else {
                if (count && count === current) {
                    break;
                }

                current++;
                freq.next(start, rule);
                freq.limit(start, end, rule);
            }
        }

        return events;
    }

    function parseUTCDate(value, zone) {
        value = kendo.parseDate(value, DATE_FORMATS); //Parse UTC to local time

        if (value && zone) {
            value = timezone.convert(value, value.getTimezoneOffset(), zone);
        }

        return value;
    }

    function parseDateRule(dateRule, zone) {
        var pairs = dateRule.split(";");
        var pair;
        var property;
        var value;
        var tzid;
        var valueIdx, valueLength;

        for (var idx = 0, length = pairs.length; idx < length; idx++) {
            pair = pairs[idx].split(":");
            property = pair[0];
            value = pair[1];

            if (property.indexOf("TZID") !== -1) {
                tzid = property.substring(property.indexOf("TZID")).split("=")[1];
            }

            if (value) {
                value = value.split(",");

                for (valueIdx = 0, valueLength = value.length; valueIdx < valueLength; valueIdx++) {
                    value[valueIdx] = parseUTCDate(value[valueIdx], tzid || zone);
                }
            }
        }

        if (value) {
            return {
                value: value,
                tzid: tzid
            };
        }
    }

    function parseRule(recur, zone) {
        var instance = {};
        var splits, value;
        var idx = 0, length;
        var ruleValue = false;
        var rule, part, parts;
        var property, weekStart, weekDays;
        var predicate = function(a, b) {
            var day1 = a.day,
                day2 = b.day;

            if (day1 < weekStart) {
               day1 += 7;
            }

            if (day2 < weekStart) {
                day2 += 7;
            }

            return day1 - day2;
        };

        if (!recur) {
            return null;
        }

        parts = recur.split("\n");

        if (!parts[1] && (recur.indexOf("DTSTART") !== -1 || recur.indexOf("DTEND") !== -1 || recur.indexOf("EXDATE") !== -1)) {
            parts = recur.split(" ");
        }

        for (idx = 0, length = parts.length; idx < length; idx++) {
            part = $.trim(parts[idx]);

            if (part.indexOf("DTSTART") !== -1) {
                instance.start = parseDateRule(part, zone);
            } else if (part.indexOf("DTEND") !== -1) {
                instance.end = parseDateRule(part, zone);
            } else if (part.indexOf("EXDATE") !== -1) {
                instance.exdates = parseDateRule(part, zone);
            } else if (part.indexOf("RRULE") !== -1) {
                rule = part.substring(6);
            } else if ($.trim(part)) {
                rule = part;
            }
        }

        rule = rule.split(";");

        for (idx = 0, length = rule.length; idx < length; idx++) {
            property = rule[idx];
            splits = property.split("=");
            value = $.trim(splits[1]).split(",");

            switch ($.trim(splits[0]).toUpperCase()) {
                case "FREQ":
                    instance.freq = value[0].toLowerCase();
                    break;
                case "UNTIL":
                    instance.until = parseUTCDate(value[0], zone);
                    break;
                case "COUNT":
                    instance.count = parseInt(value[0], 10);
                    break;
                case "INTERVAL":
                    instance.interval = parseInt(value[0], 10);
                    break;
                case "BYSECOND":
                    instance.seconds = parseArray(value, { start: 0, end: 60 });
                    ruleValue = true;
                    break;
                case "BYMINUTE":
                    instance.minutes = parseArray(value, { start: 0, end: 59 });
                    ruleValue = true;
                    break;
                case "BYHOUR":
                    instance.hours = parseArray(value, { start: 0, end: 23 });
                    ruleValue = true;
                    break;
                case "BYMONTHDAY":
                    instance.monthDays = parseArray(value, { start: -31, end: 31 });
                    ruleValue = true;
                    break;
                case "BYYEARDAY":
                    instance.yearDays = parseArray(value, { start: -366, end: 366 });
                    ruleValue = true;
                    break;
                case "BYMONTH":
                    instance.months = parseArray(value, { start: 1, end: 12 });
                    ruleValue = true;
                    break;
                case "BYDAY":
                    instance.weekDays = weekDays = parseWeekDayList(value);
                    ruleValue = true;
                    break;
                case "BYWEEKNO":
                    instance.weeks = parseArray(value, { start: -53, end: 53 });
                    ruleValue = true;
                    break;
                case "BYSETPOS":
                    instance.positions = parseArray(value, { start: -366, end: 366 });
                    break;
                case "WKST":
                    instance.weekStart = weekStart = WEEK_DAYS_IDX[value[0]];
                    break;
            }
        }

        if (instance.freq === undefined || (instance.count !== undefined && instance.until)) {
            return null;
        }

        if (!instance.interval) {
            instance.interval = 1;
        }

        if (weekStart === undefined) {
            instance.weekStart = weekStart = kendo.culture().calendar.firstDay;
        }

        if (weekDays) {
            instance.weekDays = weekDays.sort(predicate);
        }

        if (instance.positions && !ruleValue) {
            instance.positions = null;
        }

        instance._hasRuleValue = ruleValue;

        return instance;
    }

    function serializeDateRule(dateRule, zone) {
        var value = dateRule.value;
        var tzid = dateRule.tzid || "";
        var length = value.length;
        var idx = 0;
        var val;

        for (; idx < length; idx++) {
            val = value[idx];
            val = timezone.convert(val, tzid || zone || val.getTimezoneOffset(), "Etc/UTC");
            value[idx] = kendo.toString(val, "yyyyMMddTHHmmssZ");
        }

        if (tzid) {
            tzid = ";TZID=" + tzid;
        }

        return tzid + ":" + value.join(",") + " ";
    }

    function serialize(rule, zone) {
        var weekStart = rule.weekStart;
        var ruleString = "FREQ=" + rule.freq.toUpperCase();
        var exdates = rule.exdates || "";
        var start = rule.start || "";
        var end = rule.end || "";
        var until = rule.until;

        if (rule.interval > 1) {
            ruleString += ";INTERVAL=" + rule.interval;
        }

        if (rule.count) {
            ruleString += ";COUNT=" + rule.count;
        }

        if (until) {
            until = timezone.convert(until, zone || until.getTimezoneOffset(), "Etc/UTC");
            ruleString += ";UNTIL=" + kendo.toString(until, "yyyyMMddTHHmmssZ");
        }

        if (rule.months) {
            ruleString += ";BYMONTH=" + rule.months;
        }

        if (rule.weeks) {
            ruleString += ";BYWEEKNO=" + rule.weeks;
        }

        if (rule.yearDays) {
            ruleString += ";BYYEARDAY=" + rule.yearDays;
        }

        if (rule.monthDays) {
            ruleString += ";BYMONTHDAY=" + rule.monthDays;
        }

        if (rule.weekDays) {
            ruleString += ";BYDAY=" + serializeWeekDayList(rule.weekDays);
        }

        if (rule.hours) {
            ruleString += ";BYHOUR=" + rule.hours;
        }

        if (rule.minutes) {
            ruleString += ";BYMINUTE=" + rule.minutes;
        }

        if (rule.seconds) {
            ruleString += ";BYSECOND=" + rule.seconds;
        }

        if (rule.positions) {
            ruleString += ";BYSETPOS=" + rule.positions;
        }

        if (weekStart !== undefined) {
            ruleString += ";WKST=" + WEEK_DAYS[weekStart];
        }

        if (start) {
            start = "DTSTART" + serializeDateRule(start, zone);
        }

        if (end) {
            end = "DTEND" + serializeDateRule(end, zone);
        }

        if (exdates) {
            exdates = "EXDATE" + serializeDateRule(exdates, zone);
        }

        if (start || end || exdates) {
            ruleString = start + end + exdates + "RRULE:" + ruleString;
        }

        return ruleString;
    }

    kendo.recurrence = {
        rule: {
            parse: parseRule,
            serialize: serialize
        },
        expand: expand,
        dayInYear: dayInYear,
        weekInYear: weekInYear,
        weekInMonth: weekInMonth,
        numberOfWeeks: numberOfWeeks,
        isException: isException,
        toExceptionString: toExceptionString
    };

    var weekDayCheckBoxes = function(firstDay) {
        var shortNames = kendo.culture().calendar.days.namesShort,
            length = shortNames.length,
            result = "",
            idx = 0,
            values = [];

        for (; idx < length; idx++) {
            values.push(idx);
        }

        shortNames = shortNames.slice(firstDay).concat(shortNames.slice(0, firstDay));
        values = values.slice(firstDay).concat(values.slice(0, firstDay));

        for (idx = 0; idx < length; idx++) {
            result += '<label class="k-check"><input class="k-recur-weekday-checkbox" type="checkbox" value="' + values[idx] + '" /> ' + shortNames[idx] + "</label>";
        }

        return result;
    };

    var RECURRENCE_VIEW_TEMPLATE = kendo.template(
       '# if (frequency !== "never") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatEvery#</label></div>' +
           '<div class="k-edit-field"><input class="k-recur-interval"/>#:messages.interval#</div>' +
       '# } #' +
       '# if (frequency === "weekly") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatOn#</label></div>' +
           '<div class="k-edit-field">#=weekDayCheckBoxes(firstWeekDay)#</div>' +
       '# } else if (frequency === "monthly") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatOn#</label></div>' +
           '<div class="k-edit-field">' +
               '<ul class="k-reset">' +
                   '<li>' +
                       '<label><input class="k-recur-month-radio" type="radio" name="month" value="monthday" />#:messages.day#</label>' +
                       '<input class="k-recur-monthday" />' +
                   '</li>' +
                   '<li>' +
                        '<input class="k-recur-month-radio" type="radio" name="month" value="weekday" />' +
                        '<input class="k-recur-weekday-offset" /><input class="k-recur-weekday" />' +
                   '</li>' +
               '</ul>' +
           '</div>' +
       '# } else if (frequency === "yearly") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatOn#</label></div>' +
           '<div class="k-edit-field">' +
               '<ul class="k-reset">' +
                   '<li>' +
                       '<input class="k-recur-year-radio" type="radio" name="year" value="monthday" />' +
                       '<input class="k-recur-month" /><input class="k-recur-monthday" />' +
                   '</li>' +
                   '<li>' +
                       '<input class="k-recur-year-radio" type="radio" name="year" value="weekday" />' +
                       '<input class="k-recur-weekday-offset" /><input class="k-recur-weekday" />#:messages.of#<input class="k-recur-month" />' +
                   '</li>' +
               '</ul>' +
           '</div>' +
       '# } #' +
       '# if (frequency !== "never") { #' +
           '<div class="k-edit-label"><label>#:end.label#</label></div>' +
           '<div class="k-edit-field">' +
               '<ul class="k-reset">' +
                   '<li>' +
                       '<label><input class="k-recur-end-never" type="radio" name="end" value="never" />#:end.never#</label>' +
                   '</li>' +
                   '<li>' +
                       '<label><input class="k-recur-end-count" type="radio" name="end" value="count" />#:end.after#</label>' +
                       '<input class="k-recur-count" />#:end.occurrence#' +
                   '</li>' +
                   '<li>' +
                       '<label><input class="k-recur-end-until" type="radio" name="end" value="until" />#:end.on#</label>' +
                       '<input class="k-recur-until" />' +
                   '</li>' +
               '</ul>' +
           '</div>' +
       '# } #'
    );

    var DAY_RULE = [
        { day: 0, offset: 0 },
        { day: 1, offset: 0 },
        { day: 2, offset: 0 },
        { day: 3, offset: 0 },
        { day: 4, offset: 0 },
        { day: 5, offset: 0 },
        { day: 6, offset: 0 }
    ];

    var WEEKDAY_RULE = [
        { day: 1, offset: 0 },
        { day: 2, offset: 0 },
        { day: 3, offset: 0 },
        { day: 4, offset: 0 },
        { day: 5, offset: 0 }
    ];

    var WEEKEND_RULE = [
        { day: 0, offset: 0 },
        { day: 6, offset: 0 }
    ];

    var BaseRecurrenceEditor = Widget.extend({
        init: function(element, options) {
            var start;
            var that = this;
            var frequencies = options && options.frequencies;

            Widget.fn.init.call(that, element, options);

            that.wrapper = that.element;

            options = that.options;
            options.start = start = options.start || kendoDate.today();

            if (frequencies) {
                options.frequencies = frequencies;
            }

            if (typeof start === "string") {
                options.start = kendo.parseDate(start, "yyyyMMddTHHmmss");
            }

            if (options.firstWeekDay === null) {
                options.firstWeekDay = kendo.culture().calendar.firstDay;
            }

            that._namespace = "." + options.name;
        },

        options: {
            value: "",
            start: "",
            timezone: "",
            spinners: true,
            firstWeekDay: null,
            frequencies: [
                "never",
                "daily",
                "weekly",
                "monthly",
                "yearly"
            ],
            mobile: false,
            messages: {
                frequencies: {
                    never: "Never",
                    hourly: "Hourly",
                    daily: "Daily",
                    weekly: "Weekly",
                    monthly: "Monthly",
                    yearly: "Yearly"
                },
                hourly: {
                    repeatEvery: "Repeat every: ",
                    interval: " hour(s)"
                },
                daily: {
                    repeatEvery: "Repeat every: ",
                    interval: " day(s)"
                },
                weekly: {
                    interval: " week(s)",
                    repeatEvery: "Repeat every: ",
                    repeatOn: "Repeat on: "
                },
                monthly: {
                    repeatEvery: "Repeat every: ",
                    repeatOn: "Repeat on: ",
                    interval: " month(s)",
                    day: "Day "
                },
                yearly: {
                    repeatEvery: "Repeat every: ",
                    repeatOn: "Repeat on: ",
                    interval: " year(s)",
                    of: " of "
                },
                end: {
                    label: "End:",
                    mobileLabel: "Ends",
                    never: "Never",
                    after: "After ",
                    occurrence: " occurrence(s)",
                    on: "On "
                },
                offsetPositions: {
                    first: "first",
                    second: "second",
                    third: "third",
                    fourth: "fourth",
                    last: "last"
                },
                weekdays: {
                    day: "day",
                    weekday: "weekday",
                    weekend: "weekend day"
                }
            }
        },

        events: ["change"],

        _initInterval: function() {
            var that = this;
            var rule = that._value;

            that._container
                .find(".k-recur-interval")
                .kendoNumericTextBox({
                    spinners: that.options.spinners,
                    value: rule.interval || 1,
                    decimals: 0,
                    format: "#",
                    min: 1,
                    change: function() {
                        rule.interval = this.value();
                        that._trigger();
                    }
                });
        },

        _weekDayRule: function(clear) {
            var that = this;
            var weekday = (that._weekDay.element || that._weekDay).val();
            var offset = Number((that._weekDayOffset.element || that._weekDayOffset).val());
            var weekDays = null;
            var positions = null;

            if (!clear) {
                if (weekday === "day") {
                    weekDays = DAY_RULE;
                    positions = offset;
                } else if (weekday === "weekday") {
                    weekDays = WEEKDAY_RULE;
                    positions = offset;
                } else if (weekday === "weekend") {
                    weekDays = WEEKEND_RULE;
                    positions = offset;
                } else {
                    weekDays = [{
                        offset: offset,
                        day: Number(weekday)
                    }];
                }
            }

            that._value.weekDays = weekDays;
            that._value.positions = positions;
        },

        _weekDayView: function() {
            var that = this;
            var weekDays = that._value.weekDays;
            var positions = that._value.positions;
            var weekDayOffsetWidget = that._weekDayOffset;
            var weekDayOffset;
            var weekDayValue;
            var length;
            var method;

            if (weekDays) {
                length = weekDays.length;

                if (positions) {
                    if (length === 7) {
                        weekDayValue = "day";
                        weekDayOffset = positions;
                    } else if (length === 5) {
                        weekDayValue = "weekday";
                        weekDayOffset = positions;
                    } else if (length === 2) {
                        weekDayValue = "weekend";
                        weekDayOffset = positions;
                    }
                }

                if (!weekDayValue) {
                    weekDays = weekDays[0];
                    weekDayValue = weekDays.day;
                    weekDayOffset = weekDays.offset || "";
                }

                method = weekDayOffsetWidget.value ? "value" : "val";

                weekDayOffsetWidget[method](weekDayOffset);
                that._weekDay[method](weekDayValue);
            }
        },

        _initWeekDay: function() {
            var that = this, data;

            var weekdayMessage = that.options.messages.weekdays;
            var offsetMessage = that.options.messages.offsetPositions;

            var weekDayInput = that._container.find(".k-recur-weekday");

            var change = function() {
                that._weekDayRule();
                that._trigger();
            };

            if (weekDayInput[0]) {
                that._weekDayOffset = new DropDownList(that._container.find(".k-recur-weekday-offset"), {
                    change: change,
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: [
                        { text: offsetMessage.first, value: "1" },
                        { text: offsetMessage.second, value: "2" },
                        { text: offsetMessage.third, value: "3" },
                        { text: offsetMessage.fourth, value: "4" },
                        { text: offsetMessage.last, value: "-1" }
                    ]
                });

                data = [
                    { text: weekdayMessage.day, value: "day" },
                    { text: weekdayMessage.weekday, value: "weekday" },
                    { text: weekdayMessage.weekend, value: "weekend" }
                ];

                that._weekDay = new DropDownList(weekDayInput, {
                    value: that.options.start.getDay(),
                    change: change,
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: data.concat($.map(kendo.culture().calendar.days.names, function(dayName, idx) {
                        return {
                            text: dayName,
                            value: idx
                        };
                    }))
                });

                that._weekDayView();
            }
        },

        _initWeekDays: function() {
            var that = this;
            var rule = that._value;
            var weekDays = that._container.find(".k-recur-weekday-checkbox");

            if (weekDays[0]) {
                weekDays.on(CLICK + that._namespace, function() {
                    rule.weekDays = $.map(weekDays.filter(":checked"), function(checkbox) {
                        return {
                            day: Number(checkbox.value),
                            offset: 0
                        };
                    });

                    if (!that.options.mobile) {
                        that._trigger();
                    }
                });

                if (rule.weekDays) {
                    var idx, weekDay;
                    var i = 0, l = weekDays.length;
                    var length = rule.weekDays.length;

                    for (; i < l; i++) {
                        weekDay = weekDays[i];
                        for (idx = 0; idx < length; idx ++) {
                            if (weekDay.value == rule.weekDays[idx].day) {
                                weekDay.checked = true;
                            }
                        }
                    }
                }
            }
        },

        _initMonthDay: function() {
            var that = this;
            var rule = that._value;
            var monthDayInput = that._container.find(".k-recur-monthday");

            if (monthDayInput[0]) {
                that._monthDay = new kendo.ui.NumericTextBox(monthDayInput, {
                    spinners: that.options.spinners,
                    min: 1,
                    max: 31,
                    decimals: 0,
                    format: "#",
                    value: rule.monthDays ? rule.monthDays[0] : that.options.start.getDate(),
                    change: function() {
                        var value = this.value();

                        rule.monthDays = value ? [value] : value;
                        that._trigger();
                    }
                });
            }
        },

        _initCount: function() {
            var that = this,
                input = that._container.find(".k-recur-count"),
                rule = that._value;

            that._count = input.kendoNumericTextBox({
                spinners: that.options.spinners,
                value: rule.count || 1,
                decimals: 0,
                format: "#",
                min: 1,
                change: function() {
                    rule.count = this.value();
                    that._trigger();
                }
            }).data("kendoNumericTextBox");
        },

        _initUntil: function() {
            var that = this,
                input = that._container.find(".k-recur-until"),
                start = that.options.start,
                rule = that._value,
                until = rule.until;

            that._until = input.kendoDatePicker({
                min: until && until < start ? until : start,
                value: until || start,
                change: function() {
                    rule.until = this.value();
                    that._trigger();
                }
            }).data("kendoDatePicker");
        },

        _trigger: function() {
            if (!this.options.mobile) {
                this.trigger("change");
            }
        }
    });

    var RecurrenceEditor = BaseRecurrenceEditor.extend({
        init: function(element, options) {
            var that = this;

            BaseRecurrenceEditor.fn.init.call(that, element, options);

            that._initFrequency();

            that._initContainer();

            that.value(that.options.value);
        },

        options: {
            name: "RecurrenceEditor"
        },

        events: [ "change" ],

        destroy: function() {
            var that = this;

            that._frequency.destroy();
            that._container.find("input[type=radio],input[type=checkbox]").off(CLICK + that._namespace);

            kendo.destroy(that._container);

            BaseRecurrenceEditor.fn.destroy.call(that);
        },

        value: function(value) {
            var that = this,
                timezone = that.options.timezone;

            if (value === undefined) {
                if (!that._value.freq) {
                    return "";
                }

                return serialize(that._value, timezone);
            }

            that._value = parseRule(value, timezone) || {};

            that._frequency.value(that._value.freq || "");
            that._initView(that._frequency.value());
        },

        _initContainer: function() {
            var element = this.element,
                container = $('<div class="k-recur-view" />'),
                editContainer = element.parent(".k-edit-field");

            if (editContainer[0]) {
                container.insertAfter(editContainer);
            } else {
                element.append(container);
            }

            this._container = container;
        },

        _initFrequency: function() {
            var that = this,
                options = that.options,
                frequencies = options.frequencies,
                messages = options.messages.frequencies,
                ddl = $('<input />'),
                frequency;

            frequencies = $.map(frequencies, function(frequency) {
                return {
                    text: messages[frequency],
                    value: frequency
                };
            });

            frequency = frequencies[0];
            if (frequency && frequency.value === "never") {
                frequency.value = "";
            }

            that.element.append(ddl);
            that._frequency = new DropDownList(ddl, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: frequencies,
                change: function() {
                    that._value = {};
                    that._initView(that._frequency.value());
                    that.trigger("change");
                }
            });
        },

        _initView: function(frequency) {
            var that = this;
            var rule = that._value;
            var options = that.options;

            var data = {
                 frequency: frequency || "never",
                 weekDayCheckBoxes: weekDayCheckBoxes,
                 firstWeekDay: options.firstWeekDay,
                 messages: options.messages[frequency],
                 end: options.messages.end
            };

            kendo.destroy(that._container);
            that._container.html(RECURRENCE_VIEW_TEMPLATE(data));

            if (!frequency) {
                that._value = {};
                return;
            }

            rule.freq = frequency;

            if (frequency === "weekly" && !rule.weekDays) {
                rule.weekDays = [{
                    day: options.start.getDay(),
                    offset: 0
                }];
            }

            that._initInterval();
            that._initWeekDays();
            that._initMonthDay();
            that._initWeekDay();
            that._initMonth();
            that._initCount();
            that._initUntil();

            that._period();
            that._end();
        },

        _initMonth: function() {
            var that = this;
            var rule = that._value;
            var month = rule.months || [that.options.start.getMonth() + 1];
            var monthInputs = that._container.find(".k-recur-month");
            var options;

            if (monthInputs[0]) {
                options = {
                    change:  function() {
                        rule.months = [Number(this.value())];
                        that.trigger("change");
                    },
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: $.map(kendo.culture().calendar.months.names, function(monthName, idx) {
                        return {
                            text: monthName,
                            value: idx + 1
                        };
                    })
                };

                that._month1 = new DropDownList(monthInputs[0], options);
                that._month2 = new DropDownList(monthInputs[1], options);

                if (month) {
                    month = month[0];
                    that._month1.value(month);
                    that._month2.value(month);
                }
            }

        },

        _end: function() {
            var that = this;
            var rule = that._value;
            var container = that._container;
            var namespace = that._namespace;
            var click = function(e) {
                that._toggleEnd(e.currentTarget.value);
                that.trigger("change");
            };
            var endRule;

            that._buttonNever = container.find(".k-recur-end-never").on(CLICK + namespace, click);
            that._buttonCount = container.find(".k-recur-end-count").on(CLICK + namespace, click);
            that._buttonUntil = container.find(".k-recur-end-until").on(CLICK + namespace, click);

            if (rule.count) {
                endRule = "count";
            } else if (rule.until) {
                endRule = "until";
            }

            that._toggleEnd(endRule);
        },

        _period: function() {
            var that = this;
            var rule = that._value;
            var monthly = rule.freq === "monthly";

            var toggleRule = monthly ? that._toggleMonthDay : that._toggleYear;

            var selector = ".k-recur-" + (monthly ? "month" : "year") + "-radio";
            var radioButtons = that._container.find(selector);

            if (!monthly && rule.freq !== "yearly") {
                return;
            }

            radioButtons.on(CLICK + that._namespace, function(e) {
                toggleRule.call(that, e.currentTarget.value);
                that.trigger("change");
            });

            that._buttonMonthDay = radioButtons.eq(0);
            that._buttonWeekDay = radioButtons.eq(1);

            toggleRule.call(that, rule.weekDays ? "weekday" : "monthday");
        },

        _toggleEnd: function(endRule) {
            var that = this;
            var count, until;
            var enableCount, enableUntil;

            if (endRule === "count") {
                that._buttonCount.prop("checked", true);

                enableCount = true;
                enableUntil = false;

                count = that._count.value();
                until = null;
            } else if (endRule === "until") {
                that._buttonUntil.prop("checked", true);

                enableCount = false;
                enableUntil = true;

                count = null;
                until = that._until.value();
            } else {
                that._buttonNever.prop("checked", true);

                enableCount = enableUntil = false;
                count = until = null;
            }

            that._count.enable(enableCount);
            that._until.enable(enableUntil);

            that._value.count = count;
            that._value.until = until;
        },

        _toggleMonthDay: function(monthRule) {
            var that = this;
            var enableMonthDay = false;
            var enableWeekDay = true;
            var clear = false;
            var monthDays;

            if (monthRule === "monthday") {
                that._buttonMonthDay.prop("checked", true);

                monthDays = [that._monthDay.value()];

                enableMonthDay = true;
                enableWeekDay = false;
                clear = true;
            } else {
                that._buttonWeekDay.prop("checked", true);
                monthDays = null;
            }

            that._weekDay.enable(enableWeekDay);
            that._weekDayOffset.enable(enableWeekDay);
            that._monthDay.enable(enableMonthDay);

            that._value.monthDays = monthDays;

            that._weekDayRule(clear);
        },

        _toggleYear: function(yearRule) {
            var that = this;
            var enableMonth1 = false;
            var enableMonth2 = true;
            var month;

            if (yearRule === "monthday") {
                enableMonth1 = true;
                enableMonth2 = false;

                month = that._month1.value();
            } else {
                month = that._month2.value();
            }

            that._month1.enable(enableMonth1);
            that._month2.enable(enableMonth2);

            that._value.months = [month];
            that._toggleMonthDay(yearRule);
        }
    });

    ui.plugin(RecurrenceEditor);


    var RECURRENCE_HEADER_TEMPLATE = kendo.template('<div class="k-edit-label"><label>#:headerTitle#</label></div>' +
      '<div class="k-edit-field k-recur-pattern k-scheduler-toolbar"></div>' +
      '<div class="k-recur-view"></div>'
    );

    var RECURRENCE_REPEAT_PATTERN_TEMPLATE = kendo.template(
       '# if (frequency !== "never") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatEvery#</label></div>' +
           '<div class="k-edit-field"><input class="k-recur-interval" pattern="\\\\d*"/>#:messages.interval#</div>' +
       '# } #' +
       '# if (frequency === "weekly") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatOn#</label></div>' +
           '<div class="k-edit-field">#=weekDayCheckBoxes(firstWeekDay)#</div>' +
       '# } else if (frequency === "monthly") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatBy#</label></div>' +
           '<div class="k-edit-field k-scheduler-toolbar k-repeat-rule"></div>' +
           '<div class="k-monthday-view" style="display:none">' +
               '<div class="k-edit-label"><label>#:messages.day#</label></div>' +
               '<div class="k-edit-field"><input class="k-recur-monthday" pattern="\\\\d*"/></div>' +
           '</div>' +
           '<div class="k-weekday-view" style="display:none">' +
               '<div class="k-edit-label"><label>#:messages.every#</label></div>' +
               '<div class="k-edit-field"><select class="k-recur-weekday-offset"></select></div>' +
               '<div class="k-edit-label"><label>#:messages.day#</label></div>' +
               '<div class="k-edit-field"><select class="k-recur-weekday"></select></div>' +
           '</div>' +
       '# } else if (frequency === "yearly") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatBy#</label></div>' +
           '<div class="k-edit-field k-scheduler-toolbar k-repeat-rule"></div>' +
           '<div class="k-monthday-view" style="display:none">' +
               '<div class="k-edit-label"><label>#:messages.day#</label></div>' +
               '<div class="k-edit-field"><input class="k-recur-monthday" pattern="\\\\d*"/></div>' +
           '</div>' +
           '<div class="k-weekday-view" style="display:none">' +
               '<div class="k-edit-label"><label>#:messages.every#</label></div>' +
               '<div class="k-edit-field"><select class="k-recur-weekday-offset"></select></div>' +
               '<div class="k-edit-label"><label>#:messages.day#</label></div>' +
               '<div class="k-edit-field"><select class="k-recur-weekday"></select></div>' +
           '</div>' +
           '<div class="k-edit-label"><label>#:messages.month#</label></div>' +
           '<div class="k-edit-field"><select class="k-recur-month"></select></div>' +
       '# } #'
    );

    var RECURRENCE_END_PATTERN_TEMPLATE = kendo.template(
        '# if (endPattern === "count") { #' +
           '<div class="k-edit-label"><label>#:messages.after#</label></div>' +
           '<div class="k-edit-field"><input class="k-recur-count" pattern="\\\\d*" /></div>' +
        '# } else if (endPattern === "until") { #' +
           '<div class="k-edit-label"><label>#:messages.on#</label></div>' +
           '<div class="k-edit-field"><input type="date" class="k-recur-until" /></div>' +
        '# } #'
    );

    var RECURRENCE_GROUP_BUTTON_TEMPLATE = kendo.template(
        '<ul class="k-reset k-header k-scheduler-navigation">' +
            '#for (var i = 0, length = dataSource.length; i < length; i++) {#' +
                '<li class="k-state-default #= value === dataSource[i].value ? \"k-state-selected\" : \"\" #">' +
                    '<a role="button" href="\\#" class="k-link" data-#=ns#value="#=dataSource[i].value#">#:dataSource[i].text#</a>' +
                '</li>' +
            '#}#'  +
        '</ul>'
    );

    var MobileRecurrenceEditor = BaseRecurrenceEditor.extend({
        init: function(element, options) {
            var that = this;

            BaseRecurrenceEditor.fn.init.call(that, element, options);

            options = that.options;

            that._optionTemplate = kendo.template('<option value="#:value#">#:text#</option>');

            that.value(options.value);

            that._pane = options.pane;

            that._initRepeatButton();

            that._initRepeatEnd();

            that._defaultValue = that._value;
        },

        options: {
            name: "MobileRecurrenceEditor",
            animations: {
                left: "slide",
                right: "slide:right"
            },
            mobile: true,
            messages: {
                cancel: "Cancel",
                update: "Save",
                endTitle: "Repeat ends",
                repeatTitle: "Repeat pattern",
                headerTitle: "Repeat event",
                end: {
                    patterns: {
                        never: "Never",
                        after: "After...",
                        on: "On..."
                    },
                    never: "Never",
                    after: "End repeat after",
                    on: "End repeat on"
                },
                daily: {
                    interval: ""
                },
                hourly: {
                    interval: ""
                },
                weekly: {
                    interval: ""
                },
                monthly: {
                    interval: "",
                    repeatBy: "Repeat by: ",
                    dayOfMonth: "Day of the month",
                    dayOfWeek: "Day of the week",
                    repeatEvery: "Repeat every",
                    every: "Every",
                    day: "Day "
                },
                yearly: {
                    interval: "",
                    repeatBy: "Repeat by: ",
                    dayOfMonth: "Day of the month",
                    dayOfWeek: "Day of the week",
                    repeatEvery: "Repeat every: ",
                    every: "Every",
                    month: "Month",
                    day: "Day"
                }
            }
        },

        events: [ "change" ],

        value: function(value) {
            var that = this;
            var timezone = that.options.timezone;

            if (value === undefined) {
                if (!that._value.freq) {
                    return "";
                }

                return serialize(that._value, timezone);
            }

            that._value = parseRule(value, timezone) || {};
        },

        destroy: function() {
            this._destroyView();

            kendo.destroy(this._endFields);

            this._repeatButton.off(CLICK + this._namespace);

            BaseRecurrenceEditor.fn.destroy.call(this);
        },

        _initRepeatButton: function() {
            var that = this;
            var freq = that.options.messages.frequencies[this._value.freq || "never"];

            that._repeatButton = $('<a href="#" class="k-button k-scheduler-recur">' + freq + '</a>')
                                    .on(CLICK + that._namespace, function(e) {
                                        e.preventDefault();
                                        that._createView("repeat");
                                        that._pane.navigate("recurrence", that.options.animations.left);
                                    });

            that.element.append(that._repeatButton);
        },

        _initRepeatEnd: function() {
            var that = this;

            var endLabelField = $('<div class="k-edit-label"><label>' + that.options.messages.end.mobileLabel + '</label></div>').insertAfter(that.element.parent(".k-edit-field"));

            var endEditField = $('<div class="k-edit-field"><a href="#" class="k-button k-scheduler-recur-end"></a></div>')
                .on(CLICK + that._namespace, function(e) {
                    e.preventDefault();

                    if (!that._value.freq) {
                        return;
                    }

                    that._createView("end");
                    that._pane.navigate("recurrence", that.options.animations.left);
                })
                .insertAfter(endLabelField);

            that._endFields = endLabelField.add(endEditField).toggleClass("k-state-disabled", !that._value.freq);
            that._endButton = endEditField.find(".k-scheduler-recur-end").text(that._endText());
        },

        _endText: function() {
            var rule = this._value;
            var messages = this.options.messages.end;

            var text = messages.never;

            if (rule.count) {
                text = kendo.format("{0} {1}", messages.after, rule.count);
            } else if (rule.until) {
                text = kendo.format("{0} {1:d}", messages.on, rule.until);
            }

            return text;
        },

        _initFrequency: function() {
            var that = this;
            var frequencyMessages = that.options.messages.frequencies;

            var html = RECURRENCE_GROUP_BUTTON_TEMPLATE({
                dataSource: $.map(this.options.frequencies, function(frequency) {
                    return {
                        text: frequencyMessages[frequency],
                        value: frequency !== "never" ? frequency : ""
                    };
                }),
                value: that._value.freq || "",
                ns: kendo.ns
            });

            that._view.element
                .find(".k-recur-pattern")
                .append(html)
                .on(CLICK + that._namespace, ".k-scheduler-navigation li", function(e) {
                    var li = $(this);

                    e.preventDefault();

                    li.addClass("k-state-selected")
                      .siblings().removeClass("k-state-selected");

                    that._value = { freq: li.children("a").attr(kendo.attr("value")) };

                    that._initRepeatView();
                });
        },

        _initEndNavigation: function() {
            var that = this;
            var endMessages = that.options.messages.end.patterns;
            var rule = that._value;
            var value = "";

            if (rule.count) {
                value = "count";
            } else if (rule.until) {
                value = "until";
            }

            var html = RECURRENCE_GROUP_BUTTON_TEMPLATE({
                dataSource: [
                    { text: endMessages.never, value: "" },
                    { text: endMessages.after, value: "count" },
                    { text: endMessages.on, value: "until" }
                ],
                value: value,
                ns: kendo.ns
            });

            that._view.element
                .find(".k-recur-pattern")
                .append(html)
                .on(CLICK + that._namespace, ".k-scheduler-navigation li", function(e) {
                    var li = $(this);
                    var count = null;
                    var until = null;

                    e.preventDefault();

                    li.addClass("k-state-selected")
                      .siblings().removeClass("k-state-selected");

                    that._initEndView(li.children("a").attr(kendo.attr("value")));

                    if (that._count) {
                        count = that._count.value();
                        until = null;
                    } else if (that._until) {
                        count = null;
                        until = that._until.val ? kendo.parseDate(that._until.val(), "yyyy-MM-dd") : that._until.value();
                    }

                    rule.count = count;
                    rule.until = until;
                });
        },

        _createView: function(viewType) {
            var that = this;
            var options = that.options;
            var messages = options.messages;
            var headerTitle = messages[viewType === "repeat" ? "repeatTitle" : "endTitle"];

            var html = '<div data-role="view" class="k-popup-edit-form k-scheduler-edit-form k-mobile-list" id="recurrence">' +
                       '<div data-role="header" class="k-header">' +
                           '<a href="#" class="k-button k-scheduler-cancel">' + messages.cancel + '</a>' +
                               messages.headerTitle +
                           '<a href="#" class="k-button k-scheduler-update">' + messages.update + '</a>' +
                       '</div>';

            var returnViewId = that._pane.view().id;

            that._view = that._pane.append(html + RECURRENCE_HEADER_TEMPLATE({ headerTitle: headerTitle }));

            that._view.element.on(CLICK + that._namespace, "a.k-scheduler-cancel, a.k-scheduler-update", function(e) {
                e.preventDefault();
                e.stopPropagation();

                if ($(this).hasClass("k-scheduler-update")) {
                    that.trigger("change");
                    that._defaultValue = $.extend({}, that._value);
                } else {
                    that._value = that._defaultValue;
                }

                var frequency = that._value.freq;

                that._endButton.text(that._endText());
                that._endFields.toggleClass("k-state-disabled", !frequency);
                that._repeatButton.text(messages.frequencies[frequency || "never"]);

                that._pane.one("viewShow", function() {
                    that._destroyView();
                });

                that._pane.navigate(returnViewId, that.options.animations.right);
            });

            that._container = that._view.element.find(".k-recur-view");

            if (viewType === "repeat") {
                that._initFrequency();
                that._initRepeatView();
            } else {
                that._initEndNavigation();
                that._initEndView();
            }
        },

        _destroyView: function() {
            if (this._view) {
                this._view.destroy();
                this._view.element.remove();
            }

            this._view = null;
        },

        _initRepeatView: function() {
            var that = this;
            var frequency = that._value.freq || "never";

            var data = {
                 frequency: frequency,
                 weekDayCheckBoxes: weekDayCheckBoxes,
                 firstWeekDay: that.options.firstWeekDay,
                 messages: that.options.messages[frequency]
            };

            var html = RECURRENCE_REPEAT_PATTERN_TEMPLATE(data);
            var container = that._container;
            var rule = that._value;

            kendo.destroy(container);
            container.html(html);

            if (!html) {
                that._value = {};
                return;
            }

            if (frequency === "weekly" && !rule.weekDays) {
                 rule.weekDays = [{
                    day: that.options.start.getDay(),
                    offset: 0
                 }];
            }

            that._initInterval();
            that._initMonthDay();
            that._initWeekDays();
            that._initWeekDay();
            that._initMonth();

            that._period();
        },

        _initEndView: function (endPattern) {
            var that = this;
            var rule = that._value;

            if (endPattern === undefined) {
                if (rule.count) {
                    endPattern = "count";
                } else if (rule.until) {
                    endPattern = "until";
                }
            }

            var data = {
                 endPattern: endPattern,
                 messages: that.options.messages.end
            };

            kendo.destroy(that._container);
            that._container.html(RECURRENCE_END_PATTERN_TEMPLATE(data));

            that._initCount();
            that._initUntil();
        },

        _initWeekDay: function() {
            var that = this, data;

            var weekdayMessage = that.options.messages.weekdays;
            var offsetMessage = that.options.messages.offsetPositions;

            var weekDaySelect = that._container.find(".k-recur-weekday");

            var change = function() {
                that._weekDayRule();
                that.trigger("change");
            };

            if (weekDaySelect[0]) {
                that._weekDayOffset = that._container.find(".k-recur-weekday-offset")
                                          .html(that._options([
                                            { text: offsetMessage.first, value: "1" },
                                            { text: offsetMessage.second, value: "2" },
                                            { text: offsetMessage.third, value: "3" },
                                            { text: offsetMessage.fourth, value: "4" },
                                            { text: offsetMessage.last, value: "-1" }
                                          ]))
                                          .change(change);

                data = [
                    { text: weekdayMessage.day, value: "day" },
                    { text: weekdayMessage.weekday, value: "weekday" },
                    { text: weekdayMessage.weekend, value: "weekend" }
                ];

                data = data.concat($.map(kendo.culture().calendar.days.names, function(dayName, idx) {
                    return {
                        text: dayName,
                        value: idx
                    };
                }));

                that._weekDay = weekDaySelect.html(that._options(data))
                                             .change(change)
                                             .val(that.options.start.getDay());

                that._weekDayView();
            }
        },

        _initMonth: function() {
            var that = this;
            var rule = that._value;
            var start = that.options.start;
            var month = rule.months || [start.getMonth() + 1];
            var monthSelect = that._container.find(".k-recur-month");
            var monthNames = kendo.culture().calendar.months.names;

            if (monthSelect[0]) {
                var data = $.map(monthNames, function(monthName, idx) {
                    return {
                        text: monthName,
                        value: idx + 1
                    };
                });

                monthSelect.html(that._options(data))
                           .change(function() {
                               rule.months = [Number(this.value)];
                           });

                that._monthSelect = monthSelect;

                if (month) {
                    monthSelect.val(month[0]);
                }
            }

        },

        _period: function() {
            var that = this;
            var rule = that._value;
            var container = that._container;
            var messages = that.options.messages[rule.freq];
            var repeatRuleGroupButton = container.find(".k-repeat-rule");
            var weekDayView = container.find(".k-weekday-view");
            var monthDayView = container.find(".k-monthday-view");

            if (repeatRuleGroupButton[0]) {
                var currentValue = rule.weekDays ? "weekday" : "monthday";

                var html = RECURRENCE_GROUP_BUTTON_TEMPLATE({
                    value : currentValue,
                    dataSource: [
                        { text: messages.dayOfMonth, value: "monthday" },
                        { text: messages.dayOfWeek, value: "weekday" }
                    ],
                    ns: kendo.ns
                });

                var init = function(val) {
                    var weekDayName = that._weekDay.val();
                    var weekDayOffset = that._weekDayOffset.val();
                    var monthDay = that._monthDay.value();
                    var month = that._monthSelect ? that._monthSelect.val() : null;

                    if (val === "monthday") {
                        rule.weekDays = null;
                        rule.monthDays = monthDay ? [monthDay] : monthDay;
                        rule.months = month ? [Number(month)] : month;

                        weekDayView.hide();
                        monthDayView.show();
                    } else {
                        rule.monthDays = null;
                        rule.months = month ? [Number(month)] : month;

                        rule.weekDays = [{
                            offset: Number(weekDayOffset),
                            day: Number(weekDayName)
                        }];

                        weekDayView.show();
                        monthDayView.hide();
                    }
                };

                repeatRuleGroupButton
                    .append(html)
                    .on(CLICK + that._namespace, ".k-scheduler-navigation li", function(e) {
                        var li = $(this).addClass("k-state-selected");

                        e.preventDefault();

                        li.siblings().removeClass("k-state-selected");

                        var value = li.children("a").attr(kendo.attr("value"));

                        init(value);
                    });

                init(currentValue);
            }
        },

        _initUntil: function() {
            var that = this;
            var input = that._container.find(".k-recur-until");
            var start = that.options.start;
            var rule = that._value;
            var until = rule.until;
            var min = until && until < start ? until : start;

            if (kendo.support.input.date) {
                that._until = input.attr("min", kendo.toString(min, "yyyy-MM-dd"))
                                   .val(kendo.toString(until || start, "yyyy-MM-dd"))
                                   .on("change", function() {
                                       rule.until = kendo.parseDate(this.value, "yyyy-MM-dd");
                                   });
            } else {
                that._until = input.kendoDatePicker({
                    min: min,
                    value: until || start,
                    change: function() {
                        rule.until = this.value();
                    }
                }).data("kendoDatePicker");
            }
        },

        _options: function(data, optionLabel) {
            var idx = 0;
            var html = "";
            var length = data.length;
            var template = this._optionTemplate;

            if (optionLabel) {
                html += template({ value: "", text: optionLabel });
            }

            for (; idx < length; idx++) {
                html += template(data[idx]);
            }

            return html;
        }
    });

    ui.plugin(MobileRecurrenceEditor);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
