kendo_module({
    id: "scheduler.recurrence",
    name: "Recurrence",
    category: "web",
    depends: [ "scheduler" ],
    hidden: true
});

(function($, undefined) {
    var kendo = window.kendo,
        timezone = kendo.timezone,
        template = kendo.template,
        date = kendo.date,
        setDayOfWeek = date.setDayOfWeek,
        Class = kendo.Class,
        ui = kendo.ui,
        Widget = ui.Widget,
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
                    normalize = function(monthDay) {
                        if (monthDay < 0) {
                            monthDay = monthLength + monthDay;
                        }
                        return monthDay;
                    };

                while (date < end) { //TODO: check date <= end
                    month = date.getMonth();
                    monthLength = getMonthLength(date);
                    days = ruleValues(rule.monthDays, date.getDate(), normalize);

                    if (days === null) {
                        return changed;
                    }

                    changed = true;

                    if (days.length) {
                        date.setMonth(month, days.sort(numberSortPredicate)[0]);

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
                    normalize = function(yearDay) {
                        if (yearDay < 0) {
                            yearDay = year + yearDay;
                        }
                        return yearDay;
                    };

                while (date < end) { //TODO: check date <= end
                    year = leapYear(date) ? 366 : 365;
                    yearDays = ruleValues(rule.yearDays, dayInYear(date), normalize);

                    if (yearDays === null) {
                        return changed;
                    }

                    changed = true;
                    year = date.getFullYear();

                    if (yearDays.length) {
                        date.setFullYear(year, 0, yearDays.sort(numberSortPredicate)[0]);
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
                    normalize = function(week) {
                        if (week < 0) {
                            week = 53 + week;
                        }
                        return week;
                    };

                while (date < end) { //TODO: check date <= end
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
                    weekDayRule, day, offset;

                if (weekDayRules === null) {
                    return false;
                }

                weekDayRule = weekDayRules[0];
                if (!weekDayRule) {
                    weekDayRule = weekDays[0];
                    setDayOfWeek(date, weekStart);

                    if (rule._weekDayFound && interval > 1) {
                        date.setDate(date.getDate() + ((interval - 1) * 7));
                    }
                }

                day = weekDayRule.day;
                offset = weekDayRule.offset;
                rule._weekDayFound = true;

                if (offset) {
                    while (date <= end && !isInWeek(date, offset, weekStart)) {
                        date.setDate(date.getDate() + 7);
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
                    currentHours = date.getHours(),
                    hours = ruleValues(hourRules, currentHours),
                    changed = false;

                if (hours !== null) {
                    changed = true;

                    //TODO: DST CHECK
                    if (hours.length) {
                        date.setHours(hours[0]);
                    } else {
                        date.setDate(date.getDate() + 1);
                        date.setHours(hourRules[0]);
                    }

                    if (rule.minutes) {
                        date.setMinutes(0);
                    }
                }

                return changed;
            },

            minutes: function(date, end, rule) {
                var minuteRules = rule.minutes,
                    currentMinutes = date.getMinutes(),
                    minutes = ruleValues(minuteRules, currentMinutes),
                    changed = false;

                if (minutes !== null) {
                    changed = true;

                    //TODO: DST CHECK
                    if (minutes.length) {
                        date.setMinutes(minutes[0]);
                    } else {
                        date.setHours(date.getHours() + 1, minuteRules[0]);
                    }

                    if (rule.seconds) {
                        date.setSeconds(0);
                    }
                }

                return changed;
            },

            seconds: function(date, end, rule) {
                var secondRules = rule.seconds,
                    currentSeconds = date.getSeconds(),
                    seconds = ruleValues(secondRules, currentSeconds),
                    changed = false;

                if (seconds !== null) {
                    changed = true;

                    //TODO: DST CHECK
                    if (seconds.length) {
                        date.setSeconds(seconds[0]);
                    } else {
                        date.setMinutes(date.getMinutes() + 1, secondRules[0]);
                    }
                }

                return changed;
            }
        },
        BaseFrequency = Class.extend({
            next: function(date, rule) {
                if (rule.seconds) {
                    date.setSeconds(date.getSeconds() + 1);
                } else if (rule.minutes) {
                    date.setMinutes(date.getMinutes() + 1);
                } else {
                    return false;
                }

                return true;
            },

            normalize: function(options) {
                if (options.idx === 4 && options.rule.hours) {
                    //TODO: DST (brasil)
                    options.date.setHours(0);
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
            }
        }),
        HourlyFrequency = BaseFrequency.extend({
            next: function(date, rule) {
                if (!BaseFrequency.fn.next(date, rule)) {
                    date.setHours(date.getHours() + rule.interval);
                }
            },

            normalize: function(options) {
                if (options.idx === 4) {
                    //TODO: DST (brasil)
                    options.date.setHours(0);
                }
            }
        }),
        DailyFrequency = BaseFrequency.extend({
            next: function(date, rule) {
                if (!BaseFrequency.fn.next(date, rule)) {
                    if (rule.hours) {
                        date.setHours(date.getHours() + 1);
                    } else {
                        date.setDate(date.getDate() + rule.interval);
                    }
                }
            }
        }),
        WeeklyFrequency = BaseFrequency.extend({
            next: function(date, rule) {
                if (!BaseFrequency.fn.next(date, rule)) {
                    if (rule.hours) {
                        date.setHours(date.getHours() + 1);
                    } else {
                        date.setDate(date.getDate() + 1);
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
                var day;
                if (!BaseFrequency.fn.next(date, rule)) {
                    if (rule.hours) {
                        date.setHours(date.getHours() + 1);
                    } else if (rule.monthDays || rule.weekDays || rule.yearDays || rule.weeks) {
                        date.setDate(date.getDate() + 1);
                    } else {
                        day = date.getDate();
                        date.setMonth(date.getMonth() + 1);
                        while(date.getDate() !== day) {
                            date.setDate(day);
                        }
                    }
                }
            },
            normalize: function(options) {
                var rule = options.rule;
                if (options.idx === 0 && !rule.monthDays && !rule.weekDays) {
                    options.date.setDate(options.day);
                } else {
                    BaseFrequency.fn.normalize(options);
                }
            },
            setup: function(rule, date, eventStartDate) {
                if (!rule.monthDays && !rule.weekDays) {
                    date.setDate(eventStartDate.getDate()); //TODO: what about when eventStart's day is before start's day ???
                }
            }
        }),
        YearlyFrequency = MonthlyFrequency.extend({
            next: function(date, rule) {
                var day;
                if (!BaseFrequency.fn.next(date, rule)) {
                    if (rule.hours) {
                        date.setHours(date.getHours() + rule.interval);
                    } else if (rule.monthDays || rule.weekDays || rule.yearDays || rule.weeks) {
                        date.setDate(date.getDate() + 1);
                    } else if (rule.months) {
                        day = date.getDate();
                        date.setMonth(date.getMonth() + 1);

                        while(date.getDate() !== day) {
                            date.setDate(day);
                        }
                    } else {
                        date.setFullYear(date.getFullYear() + 1);
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
        year = date.getFullYear();

        if (weekStart !== undefined) {
            setDayOfWeek(date, weekStart, -1);
            date.setDate(date.getDate() + 4);
        } else {
            date.setDate(date.getDate() + (4 - (date.getDay() || 7)));
        }

        days = Math.floor((date.getTime() - new Date(year, 0, 1, -6)) / 86400000);

        return 1 + Math.floor(days / 7);
    }

    function weekInMonth(date, weekStart) {
        var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        if (weekStart > firstWeekday) {
            weekStart *= -1;
        }

        firstWeekday = firstWeekday - weekStart;

        return Math.floor((date.getDate() + firstWeekday - 1) / 7) + 1;
    }

    function offsetWeek(date, offset, weekStart) {
        if (offset < 0) {
            offset = numberOfWeeks(date, weekStart) + (offset + 1);
        }
        return offset;
    }

    function numberOfWeeks(date, weekStart) {
        return weekInMonth(new Date(date.getFullYear(), date.getMonth() + 1, 0), weekStart);
    }

    function isInWeek(date, offset, weekStart) {
        return weekInMonth(date, weekStart) === offsetWeek(date, offset, weekStart);
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

            //TODO: check for performance issues
            weekNumber = weekInMonth(date, weekStart);
            offset = offset ? offsetWeek(date, offset, weekStart) : weekNumber;

            if (weekNumber < offset) {
                result.push(weekDay);
            } else if (weekNumber === offset) {
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

    function insertAt(origin, list, idx, skip) {
        return origin.slice(0, skip ? idx - 1 : idx).concat(list).concat(origin.slice(idx));
    }

    function expand(event, start, end) {//, tzid) {
        var rule = parseRule(event.recurrence),
            eventStartMS = +event.start,
            durationMS = event.end - eventStartMS,
            current = 1,
            events = [],
            eventEnd,
            first,
            count,
            freq;

        //event = event.toJSON();

        //convert start from tzid to UTC

        start = new Date(start);
        end = new Date(end);

        if (!rule || event.start > end) {
            return events;
        }

        freq = frequencies[rule.freq];
        count = rule.count;

        if (rule.until && rule.until < end) {
            end = new Date(rule.until);
        }

        if (start < event.start) {
            start = new Date(event.start);
        } else {
            //TODO: if event.start is in the same day as start then set hour
            start.setHours(event.start.getHours());
            start.setMinutes(event.start.getMinutes());
            start.setSeconds(event.start.getSeconds());
            start.setMilliseconds(event.start.getMilliseconds());
        }

        if (freq.setup) {
            freq.setup(rule, start, event.start);
        }

        freq.limit(start, end, rule);

        while (start <= end) {
            //TODO: DST check
            eventEnd = new Date(start.getTime() + durationMS);
            events.push($.extend({}, event, {
                recurrenceID: event.uid,
                start: new Date(start),
                end: eventEnd
            }));

            if (count && count === current) {
                break;
            }

            current++;
            freq.next(start, rule);
            freq.limit(start, end, rule);
        }

        first = events[0];
        if (first && first.start.getTime() === eventStartMS) {
            events = events.slice(1);
        }

        if (rule.setPositions) {
            events = eventsByPosition(events, rule.setPositions);
        }

        return events;
    }

    function expandAll(events, start, end) {
        var length = events.length,
            idx = 0, event, result,
            resultLength, skip;

        for (; idx < length; idx++) {
            event = events[idx];
            result = expand(event, start, end);
            resultLength = result.length;
            skip = false;

            if (resultLength) {
                if (event.start < start) {
                    resultLength -= 1;
                    skip = true;
                }

                events = insertAt(events, result, idx + 1, skip);
                length += resultLength;
                idx += resultLength;
            }
        }

        return events;
    }

    function parseRule(rule) {
        var instance = {},
            property, until,
            splits, value,
            idx = 0, length,
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
                    until = kendo.parseDate(value[0], DATE_FORMATS); //TODO: test this
                    if (until) {
                        until = timezone.convert(until, until.getTimezoneOffset(), 0);
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

    function serialize(rule) {
        var weekStart = rule.weekStart,
            ruleString = "FREQ=" + rule.freq.toUpperCase();

        if (rule.interval > 1) {
            ruleString += ";INTERVAL=" + rule.interval;
        }

        if (rule.count) {
            ruleString += ";COUNT=" + rule.count;
        }

        if (rule.until) {
            ruleString += ";UNTIL=" + kendo.toString(rule.until, "yyyyMMddTHHmmssZ");
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
        expandAll: expandAll,
        dayInYear: dayInYear,
        weekInYear: weekInYear,
        weekInMonth: weekInMonth,
        numberOfWeeks: numberOfWeeks
    };

    var intervalInput = '<input class="k-recur-interval" />';
    var END_COUNT = '{0}<input class="k-recur-count" />{1}';
    var END_UNTIL = '{0}<input class="k-recur-until" />{1}';
    var END_HTML = '<div class="k-edit-label">{0}</div>' +
    '<div class="k-edit-field"><input class="k-recur-end-never" type="radio" name="end" value="never" />{1}</div>' +
    '<div class="k-edit-label"></div>' +
    '<div class="k-edit-field"><input class="k-recur-end-count" type="radio" name="end" value="count" />{2}</div>' +
    '<div class="k-edit-label"></div>' +
    '<div class="k-edit-field"><input class="k-recur-end-until" type="radio" name="end" value="until" />{3}</div>';

    var RecurrenceEditor = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.wrapper = that.element;

            if (!that.options.start) {
                that.options.start = date.today();
            }

            that._frequencyChooser();

            that._container();

            that._views();

            that._value = {};
        },
        options: {
            name: "RecurrenceEditor",
            frequencies: ["never", "daily", "weekly", "monthly", "yearly"],
            eventStart: null,
            messages: {
                frequencies: {
                    never: "Never",
                    daily: "Daily",
                    weekly: "Weekly",
                    monthly: "Monthly",
                    yearly: "Yearly"
                },
                daily: {
                    interval: "Repeat every: {0} days(s)",
                    intervalRepeat: "Repeat every: ",
                    intervalDays: " days(s)",
                    endLabel: "End:",
                    endNever: "Never",
                    endCountAfter: "After",
                    endCountOccurrence: " occurrence(s)",
                    endUntilOn: "On "
                },
                monthly: {
                    interval: "Repeat every: {0} week(s)",
                    day: "On"
                }
            }
        },
        events: [ "change" ],
        value: function(value) {
            var that = this;

            if (value === undefined) {
                if (!that._value.freq) {
                    return "";
                }

                return serialize(that._value);
            }

            that._value = parseRule(value) || {};

            that.ddlFrequency.value(that._value.freq || "");
            that.setView(that.ddlFrequency.value());
        },

        setView: function(frequency) {
            var that = this,
                container = this.container,
                template = this["_" + frequency],
                html = template ? template({}) : "",
                rule = that._value;

            kendo.destroy(container);
            container.html(html);

            if (!html) {
                that._value = {};
                return;
            }

            rule.freq = frequency;

            that._interval();
            that._count();
            that._until();

            that._end();
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
                rule = that._value;

            that.untilDatePicker = input.kendoDatePicker({
                value: rule.until || start,
                //TODO: SET MIN
                change: function() {
                    rule.until = this.value(); //TODO: GET UTC DATE. Serialize does this
                    that.trigger("change");
                }
            }).data("kendoDatePicker");
        },

        _end: function() {
            var that = this,
                rule = that._value,
                container = that.container,
                click = function() {
                    that._toggleEndRule(this.value);
                };

            that.radioButtonNever = container.find(".k-recur-end-never").on("click", click);
            that.radioButtonCount = container.find(".k-recur-end-count").on("click", click);
            that.radioButtonUntil = container.find(".k-recur-end-until").on("click", click);

            if (rule.count) {
                that._toggleEndRule("count");
            } else if (rule.until) {
                that._toggleEndRule("until");
            } else {
                that._toggleEndRule();
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

        //rendering
        _container: function() {
            var container = $('<div class="k-recur-view" />');
            this.element.append(container);
            this.container = container;
        },

        _frequencyChooser: function() {
            var that = this,
                options = that.options,
                frequencies = options.frequencies,
                messages = options.messages.frequencies,
                ddl = $('<input name="freq" />'),
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
                    that.setView(that.ddlFrequency.value());
                    that.trigger("change");
                }
            });
        },

        _views: function() {
            var that = this,
                messages = that.options.messages,
                daily = messages.daily,
                until = kendo.format(END_UNTIL, daily.endUntilOn),
                count = kendo.format(END_COUNT, daily.endCountAfter, daily.endCountOccurrence),
                end = kendo.format(END_HTML, daily.endLabel, daily.endNever, count, until);

            that._daily = template(kendo.format(daily.interval, intervalInput) + end);
        }
    });

    ui.plugin(RecurrenceEditor);

})(window.kendo.jQuery);
