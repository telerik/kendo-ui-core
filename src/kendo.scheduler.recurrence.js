kendo_module({
    id: "scheduler.recurrence",
    name: "Recurrence",
    category: "web",
    depends: [ "dropdownlist", "datepicker", "numerictextbox" ],
    hidden: true
});

(function($, undefined) {
    var kendo = window.kendo,
        timezone = kendo.timezone,
        Class = kendo.Class,
        ui = kendo.ui,
        Widget = ui.Widget,
        date = kendo.date,
        setTime = date.setTime,
        setDayOfWeek = date.setDayOfWeek,
        adjustDST = date.adjustDST,
        firstDayOfMonth = date.firstDayOfMonth,
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
        limitation = {
            months: function(date, end, rule) {
                var monthRules = rule.months,
                    months = ruleValues(monthRules, date.getMonth() + 1),
                    changed = false;

                if (months !== null) {
                    if (months.length) {
                        date.setMonth(months[0] - 1, 1);
                    } else {
                        date.setFullYear(date.getFullYear() + 1, monthRules[0], 1);
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
                var weekDays = rule.weekDays,
                    weekStart = rule.weekStart,
                    weekDayRules = ruleWeekValues(weekDays, date, weekStart),
                    interval = rule.interval,
                    hours = date.getHours(),
                    weekDayRule, day;

                if (weekDayRules === null) {
                    return false;
                }

                weekDayRule = weekDayRules[0];
                if (!weekDayRule) {
                    weekDayRule = weekDays[0];
                    setDayOfWeek(date, weekStart);

                    if (rule._weekDayFound && interval > 1) {
                        date.setDate(date.getDate() + ((interval - 1) * 7));
                        adjustDST(date, hours);
                    }
                }

                day = weekDayRule.day;
                rule._weekDayFound = true;

                if (weekDayRule.offset) {
                    while (date <= end && !isInWeek(date, weekDayRule, weekStart)) {
                        date.setDate(date.getDate() + 7);
                        adjustDST(date, hours);

                        setDayOfWeek(date, weekStart, -1);
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
                var ruleName, firstRule, modified,
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

                    if (idx === RULE_NAMES_LENGTH) {
                        break;
                    }
                }
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
                    this._hour(date, rule, rule.interval);
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
                    if (rule.hours) {
                        this._hour(date, rule, 1);
                    } else {
                        this._date(date, rule, rule.interval);
                    }
                }
            }
        }),
        WeeklyFrequency = BaseFrequency.extend({
            next: function(date, rule) {
                if (!BaseFrequency.fn.next(date, rule)) {
                    if (rule.hours) {
                        this._hour(date, rule, 1);
                    } else {
                        this._date(date, rule, 1);
                    }
                }
            },
            setup: function(rule, date) {
                if (!rule.weekDays) {
                    rule.weekDays = [{
                        day: date.getDay(),
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
            setup: function(rule, date, eventStartDate) {
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
            setup: function() {} //TODO: check if I need to call Monthly normalize method here too ???
        }),
        frequencies = {
            "hourly" : new HourlyFrequency(),
            "daily" : new DailyFrequency(),
            "weekly" : new WeeklyFrequency(),
            "monthly" : new MonthlyFrequency(),
            "yearly" : new YearlyFrequency()
        };

    function dayInYear(date) {
        var month = date.getMonth(),
        days = leapYear(date) ? DAYS_IN_LEAPYEAR[month] : DAYS_IN_YEAR[month];

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
        var firstWeekday = firstDayOfMonth(date).getDay(),
            firstWeekLength = Math.abs(7 - (firstWeekday + 7 - (weekStart || 7))) || 7;

        return Math.ceil((date.getDate() - firstWeekLength) / 7) + 1;
    }

    function normalizeOffset(date, offset, weekStart) {
        if (offset < 0) {
            offset = numberOfWeeks(date, weekStart) + (offset + 1);
        }
        return offset;
    }

    function numberOfWeeks(date, weekStart) {
        return weekInMonth(new Date(date.getFullYear(), date.getMonth() + 1, 0), weekStart);
    }

    function isInWeek(date, weekDayRule, weekStart) {
        var offset = weekDayRule.offset,
            weekNumber = weekInMonth(date, weekStart);

        if (!allowFirstWeek(date, weekDayRule, weekStart)) {
            weekNumber -= 1;
        }

        return weekNumber === normalizeOffset(date, offset, weekStart);
    }

    function allowFirstWeek(date, weekDayRule, weekStart) {
        var day = weekDayRule.day,
            offset = weekDayRule.offset,
            firstDay, allow;

        if (!offset) {
            return true;
        }

        firstDay = firstDayOfMonth(date).getDay();
        if (firstDay < weekStart) {
            firstDay += weekStart;
        }

        if (day < weekStart) {
            day += weekStart;
        }

        allow = day >= firstDay;
        if (!allow && offset < 0 && normalizeOffset(date, offset, weekStart) !== 1) {
            allow = true;
        }

        return allow;
    }

    function ruleWeekValues(weekDays, date, weekStart) {
        var currentDay = date.getDay(),
            length = weekDays.length,
            weekDay, day, offset,
            weekNumber,
            result = [],
            idx = 0;

        if (currentDay < weekStart) {
            currentDay += weekStart;
        }

        for (;idx < length; idx++) {
            weekDay = weekDays[idx];
            offset = weekDay.offset;
            day = weekDay.day;

            if (day < weekStart) {
                day += weekStart;
            }

            weekNumber = weekInMonth(date, weekStart);
            offset = offset ? normalizeOffset(date, offset, weekStart) : weekNumber;

            if (weekNumber < offset) {
                result.push(weekDay);
            } else if (weekNumber === offset && allowFirstWeek(date, weekDay, weekStart)) {
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

    function eventsByPosition(events, positions) {
        var result = [],
            length = positions.length,
            idx = 0, event;

        for (;idx < length; idx++) {
            event = events[positions[idx] - 1];

            if (event) {
                result.push(event);
            }
        }

        return result;
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
                date = kendo.parseDate(exceptions[idx], DATE_FORMATS);

                if (date) {
                    if (zone) {
                        date = timezone.convert(date, date.getTimezoneOffset(), zone);
                    }

                    dates.push(date);
                }
            }
        }

        return dates;
    }

    function isException(exceptions, date, zone) {
        var dates = $.isArray(exceptions) ? exceptions : parseExceptions(exceptions, zone),
            idx = 0, length = dates.length;

        for (; idx < length; idx++) {
            if (dates[idx].getTime() === date.getTime()) {
                return true;
            }
        }

        return false;
    }

    function expand(event, start, end, zone) {
        var eventEnd = event.end,
            eventStart = event.start,
            eventStartMS = eventStart.getTime(),
            rule = parseRule(event.recurrenceRule),
            startTime, endTime, endDate,
            hours, minutes, seconds,
            durationMS, startPeriod,
            exceptionDates,
            count, freq,
            current = 1,
            events = [],
            offset;

        exceptionDates = parseExceptions(event.recurrenceException, zone);
        startPeriod = start = new Date(start);
        end = new Date(end);

        if (!rule) {
            return [event];
        }

        freq = frequencies[rule.freq];
        count = rule.count;

        if (rule.until && rule.until < end) {
            end = new Date(rule.until);
        }

        if (start < eventStartMS || count || rule.interval > 1) {
            start = new Date(eventStartMS);
            hours = start.getHours();
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

        rule._startTime = startTime = new Date(1980, 0, 1, hours, start.getMinutes(), start.getSeconds(), start.getMilliseconds());
        offset = (eventEnd.getTimezoneOffset() - eventStart.getTimezoneOffset()) * date.MS_PER_MINUTE;
        durationMS = eventEnd - eventStartMS - offset;

        if (freq.setup) {
            freq.setup(rule, start, eventStart);
        }

        freq.limit(start, end, rule);

        while (start <= end) {
            if (start >= startPeriod && !isException(exceptionDates, start, zone)) {
                endDate = new Date(start);
                setTime(endDate, durationMS);

                endTime = new Date(rule._startTime);
                setTime(endTime, durationMS);

                events.push(event.toOccurrence({
                    start: new Date(start),
                    startTime: new Date(startTime),
                    end: endDate,
                    endTime: endTime
                }));
            }

            if (count && count === current) {
                break;
            }

            current++;
            freq.next(start, rule);
            freq.limit(start, end, rule);
        }

        if (rule.setPositions) {
            events = eventsByPosition(events, rule.setPositions);
        }

        return events;
    }



    function parseRule(rule, zone) {
        var instance = {},
            idx = 0, length,
            splits, value,
            property, until,
            weekStart,
            weekDays,
            predicate = function(a, b) {
                var day1 = a.day,
                    day2 = b.day;

                if (day1 < weekStart) {
                   day1 += weekStart;
                }

                if (day2 < weekStart) {
                    day2 += weekStart;
                }

                return day1 - day2;
            };

        if (!rule) {
            return null;
        }

        if (rule.substring(0, 6) === "RRULE:") {
            rule = rule.substring(6);
        }

        rule = rule.split(";");
        length = rule.length;

        for (; idx < length; idx++) {
            property = rule[idx];
            splits = property.split("=");
            value = $.trim(splits[1]).split(",");

            switch ($.trim(splits[0]).toUpperCase()) {
                case "FREQ":
                    instance.freq = value[0].toLowerCase();
                    break;
                case "UNTIL":
                    until = kendo.parseDate(value[0], DATE_FORMATS); //Parse UTC to local time
                    if (until && zone) {
                        until = timezone.convert(until, until.getTimezoneOffset(), zone);
                    }
                    instance.until = until;
                    break;
                case "COUNT":
                    instance.count = parseInt(value[0], 10);
                    break;
                case "INTERVAL":
                    instance.interval = parseInt(value[0], 10);
                    break;
                case "BYSECOND":
                    instance.seconds = parseArray(value, { start: 0, end: 60 });
                    break;
                case "BYMINUTE":
                    instance.minutes = parseArray(value, { start: 0, end: 59 });
                    break;
                case "BYHOUR":
                    instance.hours = parseArray(value, { start: 0, end: 23 });
                    break;
                case "BYMONTHDAY":
                    instance.monthDays = parseArray(value, { start: -31, end: 31 });
                    break;
                case "BYYEARDAY":
                    instance.yearDays = parseArray(value, { start: -366, end: 366 });
                    break;
                case "BYMONTH":
                    instance.months = parseArray(value, { start: 1, end: 12 });
                    break;
                case "BYDAY":
                    instance.weekDays = weekDays = parseWeekDayList(value);
                    break;
                case "BYSETPOS":
                    //TODO: rename to positions
                    instance.setPositions = parseArray(value, { start: 1, end: 366 });
                    break;
                case "BYWEEKNO":
                    instance.weeks = parseArray(value, { start: -53, end: 53 });
                    break;
                case "WKST":
                    instance.weekStart = weekStart = WEEK_DAYS_IDX[value[0]];
                    break;
            }

            if (instance.freq === undefined || (instance.count !== undefined && instance.until)) {
                return null;
            }

            if (!instance.interval) {
                instance.interval = 1;
            }

            if (weekStart === undefined) {
                //TODO: According ISO starndard the default day is MO, not the one defined by the current culture
                instance.weekStart = weekStart = kendo.culture().calendar.firstDay;
            }

            if (weekDays) {
                instance.weekDays = weekDays.sort(predicate);
            }
        }

        return instance;
    }

    function serialize(rule, zone) {
        var weekStart = rule.weekStart,
            ruleString = "FREQ=" + rule.freq.toUpperCase(),
            until = rule.until;

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

        if (rule.setPositions) {
            ruleString += ";BYSETPOS=" + rule.setPositions;
        }

        if (weekStart !== undefined) {
            ruleString += ";WKST=" + WEEK_DAYS[weekStart];
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
        isException: isException
    };

    //TODO: REFACTOR Recurrence Widget
    var INTERVAL = '<div class="k-edit-label"><label>{0}</label></div><div class="k-edit-field"><input class="k-recur-interval" />{1}</div>';
    var END_COUNT = '<input class="k-recur-count" />{0}';
    var END_UNTIL = '<input class="k-recur-until" />';
    var END_HTML = '<div class="k-edit-label"><label>{0}</label></div>' +
                   '<div class="k-edit-field">' +
                   '<ul class="k-reset">' +
                       '<li><label><input class="k-recur-end-never" type="radio" name="end" value="never" />{1}</label></li>' +
                       '<li><label><input class="k-recur-end-count" type="radio" name="end" value="count" />{2}</label>{3}</li>' +
                       '<li><label><input class="k-recur-end-until" type="radio" name="end" value="until" />{4}</label>{5}</li>' +
                   '</ul></div>';

    var ROW_HTML = '<div class="k-edit-label"><label>{0}</label></div>' +
                      '<div class="k-edit-field">{1}</div>';

    var UL_RESET_HTML = '<ul class="k-reset">{0}</ul>';

    var MONTHDAY_HTML = '<li>' +
                            '<label><input class="k-recur-month-radio" type="radio" name="month" value="monthday" />{0}</label>' +
                            '<input class="k-recur-monthday" />' +
                        '</li>';

    var WEEKDAY_HTML = '<li>' +
                            '<input class="k-recur-month-radio" type="radio" name="month" value="weekday" />' +
                            '<input class="k-recur-offset" /><input class="k-recur-weekday" />' +
                       '</li>';

    var MONTH_HTML = '<li>' +
                         '<input class="k-recur-year-radio" type="radio" name="year" value="monthday" />' +
                         '<input class="k-recur-month" /><input class="k-recur-monthday" />' +
                     '</li>';

    var WEEKDAY_WITH_MONTH_HTML = '<li>' +
                                      '<input class="k-recur-year-radio" type="radio" name="year" value="weekday" />' +
                                      '<input class="k-recur-offset" /><input class="k-recur-weekday" />{0}<input class="k-recur-month" />' +
                                  '</li>';

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
            result += '<label><input class="k-recur-weekday-checkbox" type="checkbox" value="' + values[idx] + '" /> ' + shortNames[idx] + "</label>";
        }

        return result;
    };

    var ns = ".kendoRecurrenceEditor",
        CLICK = "click" + ns;

    var RecurrenceEditor = Widget.extend({
        init: function(element, options) {
            var that = this,
                start;

            Widget.fn.init.call(that, element, options);

            that.wrapper = that.element;

            options = that.options;
            options.start = start = options.start || date.today();

            if (typeof start === "string") {
                options.start = kendo.parseDate(start, "yyyyMMddTHHmmss");
            }

            if (options.firstWeekDay === null) {
                options.firstWeekDay = kendo.culture().calendar.firstDay;
            }

            that._frequencyChooser();

            that._container();

            that._views();

            that._value = {};

            that.value(options.value);
        },
        options: {
            name: "RecurrenceEditor",
            frequencies: ["never", "daily", "weekly", "monthly", "yearly"],
            firstWeekDay: null,
            timezone: "",
            start: "",
            value: "",
            //TODO: simplify messages
            messages: {
                frequencies: {
                    never: "Never",
                    daily: "Daily",
                    weekly: "Weekly",
                    monthly: "Monthly",
                    yearly: "Yearly"
                },
                end: {
                    endLabel: "End:",
                    endNever: "Never",
                    endCountAfter: "After ",
                    endCountOccurrence: " occurrence(s)",
                    endUntilOn: "On "
                },
                offsetPositions: {
                    first: "first",
                    second: "second",
                    third: "third",
                    fourth: "fourth",
                    last: "last"
                },
                daily: {
                    repeatEvery: "Repeat every: ",
                    days: " days(s)"
                },
                weekly: {
                    weeks: " week(s)",
                    repeatEvery: "Repeat every: ",
                    repeatOn: "Repeat on: "
                },
                monthly: {
                    repeatEvery: "Repeat every: ",
                    repeatOn: "Repeat on: ",
                    months: " month(s)",
                    day: "Day "
                },
                yearly: {
                    repeatEvery: "Repeat every: ",
                    repeatOn: "Repeat on: ",
                    years: " year(s)",
                    of: " of "
                }
            }
        },
        events: [ "change" ],

        destroy: function() {
            this.ddlFrequency.destroy();
            this.container.find("input[type=radio],input[type=checkbox]").off(CLICK);

            kendo.destroy(this.container);

            Widget.fn.destroy.call(this);
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

            that.ddlFrequency.value(that._value.freq || "");
            that.setView(that.ddlFrequency.value());
        },

        setView: function(frequency) {
            var that = this,
                container = this.container,
                html = this["_" + frequency] || "",
                rule = that._value;

            kendo.destroy(container);
            container.html(html);

            if (!html) {
                that._value = {};
                return;
            }

            rule.freq = frequency;

            that._interval();

            if (frequency === "weekly") {
                if (!rule.weekDays) {
                    rule.weekDays = [{
                        day: this.options.start.getDay(),
                        offset: 0
                    }];
                }
                that._weekDays();
            } else if (frequency === "monthly") {
                that._monthDay();
                that._weekDay();
                that._setMonthRule();
            } else if (frequency === "yearly") {
                that._month();
                that._monthDay();
                that._weekDay();
                that._setYearRule();
            }

            that._count();
            that._until();
            that._setEndRule();
        },

        _interval: function() {
            var that = this,
                input = that.container.find(".k-recur-interval"),
                rule = that._value;

            input.kendoNumericTextBox({
                value: rule.interval || 1,
                decimals: 0,
                format: "#",
                min: 1,
                change: function() {
                    rule.interval = this.value();
                    that.trigger("change");
                }
            });
        },

        _weekDay: function() {
            var that = this,
                offsetMessage = that.options.messages.offsetPositions,
                offsetInput = that.container.find(".k-recur-offset"),
                weekDayInput = that.container.find(".k-recur-weekday"),
                rule = that._value,
                weekDay = rule.weekDays,
                offsetDDL, weekDayDDL,
                dayNames;

            if (weekDayInput[0]) {
                that.weekDayOffsetDDL = offsetDDL = new kendo.ui.DropDownList(offsetInput, {
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: [
                        { text: offsetMessage.first, value: "1" },
                        { text: offsetMessage.second, value: "2" },
                        { text: offsetMessage.third, value: "3" },
                        { text: offsetMessage.fourth, value: "4" },
                        { text: offsetMessage.last, value: "-1" }
                    ],
                    change: function() {
                        rule.weekDays = [{
                            offset: Number(offsetDDL.value()),
                            day: Number(weekDayDDL.value())
                        }];
                        that.trigger("change");
                    }
                });

                dayNames = $.map(kendo.culture().calendar.days.names, function(dayName, idx) {
                    return {
                        text: dayName,
                        value: idx
                    };
                });

                that.weekDayNameDDL = weekDayDDL = new kendo.ui.DropDownList(weekDayInput, {
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: dayNames,
                    change: function() {
                        rule.weekDays = [{
                            offset: Number(offsetDDL.value()),
                            day: Number(weekDayDDL.value())
                        }];
                        that.trigger("change");
                    }
                });

                if (weekDay) {
                    weekDay = weekDay[0];

                    offsetDDL.value(weekDay.offset || "");
                    weekDayDDL.value(weekDay.day);
                }
            }
        },

        _weekDays: function() {
            var that = this,
                rule = that._value,
                weekDays = that.container.find(".k-recur-weekday-checkbox");

            if (weekDays[0]) {
                weekDays.on(CLICK, function() {
                    rule.weekDays = $.map(weekDays.filter(":checked"), function(checkbox) {
                        return {
                            day: Number(checkbox.value),
                            offset: 0
                        };
                    });

                    that.trigger("change");
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

        _monthDay: function() {
            var that = this,
                rule = that._value,
                monthDayInput = that.container.find(".k-recur-monthday");

            if (monthDayInput[0]) {
                that.monthDayNumericTextBox = new kendo.ui.NumericTextBox(monthDayInput, {
                    min: 1,
                    max: 31,
                    decimals: 0,
                    format: "#",
                    value: rule.monthDays ? rule.monthDays[0] : that.options.start.getDate(),
                    change: function() {
                        var value = this.value();

                        if (value) {
                            value = [value];
                        }

                        rule.monthDays = value;
                        that.trigger("change");
                    }
                });
            }
        },

        _month: function() {
            var that = this,
                rule = that._value,
                start = that.options.start,
                month = rule.months || [start.getMonth() + 1],
                monthInputs = that.container.find(".k-recur-month"),
                monthNames, monthDDL1, monthDDL2;

            if (monthInputs[0]) {
                monthNames = $.map(kendo.culture().calendar.months.names, function(monthName, idx) {
                    return {
                        text: monthName,
                        value: idx + 1
                    };
                });

                that.monthDDL1 = monthDDL1 = new kendo.ui.DropDownList(monthInputs[0], {
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: monthNames,
                    change: function() {
                        rule.months = [Number(this.value())];
                        that.trigger("change");
                    }
                });

                that.monthDDL2 = monthDDL2 = new kendo.ui.DropDownList(monthInputs[1], {
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: monthNames,
                    change: function() {
                        rule.months = [Number(this.value())];
                        that.trigger("change");
                    }
                });

                if (month) {
                    month = month[0];
                    monthDDL1.value(month);
                    monthDDL2.value(month);
                }
            }

        },

        _count: function() {
            var that = this,
                input = that.container.find(".k-recur-count"),
                rule = that._value;

            that.countNumericTextBox = input.kendoNumericTextBox({
                value: rule.count || 1,
                decimals: 0,
                format: "#",
                min: 1,
                change: function() {
                    rule.count = this.value();
                    that.trigger("change");
                }
            }).data("kendoNumericTextBox");
        },

        _until: function() {
            var that = this,
                input = that.container.find(".k-recur-until"),
                start = that.options.start,
                rule = that._value,
                until = rule.until;

            that.untilDatePicker = input.kendoDatePicker({
                min: until && until < start ? until : start,
                value: until || start,
                change: function() {
                    rule.until = this.value();
                    that.trigger("change");
                }
            }).data("kendoDatePicker");
        },

        _setEndRule: function() {
            var that = this,
                rule = that._value,
                container = that.container,
                click = function(e) {
                    that._toggleEndRule(e.currentTarget.value);
                    that.trigger("change");
                };

            that.radioButtonNever = container.find(".k-recur-end-never").on(CLICK, click);
            that.radioButtonCount = container.find(".k-recur-end-count").on(CLICK, click);
            that.radioButtonUntil = container.find(".k-recur-end-until").on(CLICK, click);

            if (rule.count) {
                that._toggleEndRule("count");
            } else if (rule.until) {
                that._toggleEndRule("until");
            } else {
                that._toggleEndRule();
            }
        },

        _setMonthRule: function() {
            var that = this,
                rule = that._value,
                click = function(e) {
                    that._toggleMonthDayRule(e.currentTarget.value);
                    that.trigger("change");
                },
                radioButtons = that.container.find(".k-recur-month-radio").on(CLICK, click);

            that.radioButtonMonthDay = radioButtons.eq(0);
            that.radioButtonWeekDay = radioButtons.eq(1);

            if (rule.weekDays) {
                that._toggleMonthDayRule("weekday");
            } else {
                that._toggleMonthDayRule("monthday");
            }
        },

        _setYearRule: function() {
            var that = this,
                rule = that._value,
                click = function(e) {
                    that._toggleYearRule(e.currentTarget.value);
                    that.trigger("change");
                },
                radioButtons = that.container.find(".k-recur-year-radio").on(CLICK, click);

            that.radioButtonMonthDay = radioButtons.eq(0);
            that.radioButtonWeekDay = radioButtons.eq(1);

            if (rule.weekDays) {
                that._toggleYearRule("weekday");
            } else {
                that._toggleYearRule("monthday");
            }
        },

        _toggleEndRule: function(endRule) {
            var that = this,
                rule = that._value;

            if (endRule === "count") {
                that.radioButtonCount.prop("checked", true);

                that.untilDatePicker.enable(false);
                that.countNumericTextBox.enable(true);

                rule.count = that.countNumericTextBox.value();
                rule.until = null;
            } else if (endRule === "until") {
                that.radioButtonUntil.prop("checked", true);

                that.untilDatePicker.enable(true);
                that.countNumericTextBox.enable(false);

                rule.count = null;
                rule.until = that.untilDatePicker.value();
            } else {
                that.radioButtonNever.prop("checked", true);

                that.untilDatePicker.enable(false);
                that.countNumericTextBox.enable(false);

                rule.count = null;
                rule.until = null;
            }
        },

        _toggleMonthDayRule: function(monthRule) {
            var that = this,
                rule = that._value;

            if (monthRule === "monthday") {
                that.radioButtonMonthDay.prop("checked", true);

                that.monthDayNumericTextBox.enable(true);
                that.weekDayNameDDL.enable(false);
                that.weekDayOffsetDDL.enable(false);

                rule.weekDays = null;
                rule.monthDays = [that.monthDayNumericTextBox.value()];

            } else {
                that.radioButtonWeekDay.prop("checked", true);

                that.monthDayNumericTextBox.enable(false);
                that.weekDayOffsetDDL.enable(true);
                that.weekDayNameDDL.enable(true);

                rule.monthDays = null;
                rule.weekDays = [{
                    offset: Number(that.weekDayOffsetDDL.value()),
                    day: Number(that.weekDayNameDDL.value())
                }];
            }
        },

        _toggleYearRule: function(yearRule) {
            var that = this,
                month;

            if (yearRule === "monthday") {
                that.monthDDL1.enable(true);
                that.monthDDL2.enable(false);

                month = that.monthDDL1.value();
            } else {
                that.monthDDL1.enable(false);
                that.monthDDL2.enable(true);

                month = that.monthDDL2.value();
            }
            that._value.months = [month];
            that._toggleMonthDayRule(yearRule);
        },

        _container: function() {
            var element = this.element,
                container = $('<div class="k-recur-view" />'),
                editContainer = element.parent(".k-edit-field");

            if (editContainer[0]) {
                container.insertAfter(editContainer);
            } else {
                element.append(container);
            }

            this.container = container;
        },

        _frequencyChooser: function() {
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
            that.ddlFrequency = new kendo.ui.DropDownList(ddl, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: frequencies,
                change: function() {
                    that._value = {};
                    that.setView(that.ddlFrequency.value());
                    that.trigger("change");
                }
            });
        },

        _views: function() {
            var that = this,
                options = that.options,
                messages = options.messages,
                end = messages.end,
                daily = messages.daily,
                weekly = messages.weekly,
                monthly = messages.monthly,
                yearly = messages.yearly,
                count = kendo.format(END_COUNT, end.endCountOccurrence),
                endHtml = kendo.format(END_HTML, end.endLabel, end.endNever, end.endCountAfter, count, end.endUntilOn, END_UNTIL),
                weekHtml = kendo.format(ROW_HTML, weekly.repeatOn, weekDayCheckBoxes(options.firstWeekDay)),
                monthHtml = kendo.format(ROW_HTML, monthly.repeatOn, kendo.format(UL_RESET_HTML, kendo.format(MONTHDAY_HTML, monthly.day) + WEEKDAY_HTML)),
                yearHtml = kendo.format(ROW_HTML, yearly.repeatOn, kendo.format(UL_RESET_HTML, MONTH_HTML + kendo.format(WEEKDAY_WITH_MONTH_HTML, yearly.of)));

            that._daily = kendo.format(INTERVAL, daily.repeatEvery, daily.days) + endHtml;
            that._weekly = kendo.format(INTERVAL, weekly.repeatEvery, weekly.weeks) + weekHtml + endHtml;
            that._monthly = kendo.format(INTERVAL, monthly.repeatEvery, monthly.months) + monthHtml + endHtml;
            that._yearly = kendo.format(INTERVAL, yearly.repeatEvery, yearly.years) + yearHtml + endHtml;
        }
    });

    ui.plugin(RecurrenceEditor);

})(window.kendo.jQuery);
