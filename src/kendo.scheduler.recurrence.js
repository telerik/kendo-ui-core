kendo_module({
    id: "scheduler.recurrence",
    name: "Recurrence",
    category: "web",
    depends: [ "scheduler" ],
    hidden: true
});

(function($, undefined) {
    var kendo = window.kendo,
        daysInLeapYear = [0,31,60,91,121,152,182,213,244,274,305,335,366],
        daysInYear = [0,31,59,90,120,151,181,212,243,273,304,334,365],
        MONTHS = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31],
        WEEK_DAYS = {
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
        ];

    var recurrence = {
        expand: function(event, period) {
            var rule = recurrence.expandEvent(event),
                durationMS = event.end - event.start,
                start = new Date(period.start),
                end = new Date(period.end),
                current = 1,
                events = [],
                count,
                freq;

            if (!rule || +event.start > +end) {
                return events;
            }

            freq = recurrence.frequency[rule.freq];
            count = rule.count;

            if (rule.until && +rule.until < +end) {
                end = new Date(rule.until);
            }

            freq.setup(rule, start, event.start);

            //TODO: if event.start is in the same day as start then set hour
            start.setHours(event.start.getHours());
            start.setMinutes(event.start.getMinutes());
            start.setSeconds(event.start.getSeconds());
            start.setMilliseconds(event.start.getMilliseconds());

            start = freq.limit(start, end, rule);

            while (+start <= end) {
                events.push(cloneEvent(event, start, durationMS));
                if (count && count === current) {
                    break;
                }

                current++;

                start = freq.next(start, rule);
                start = freq.limit(start, end, rule);
            }

            if (rule.setPositions) {
                events = eventsByPosition(events, rule.setPositions);
            }

            return events;
        },

        frequency: {
            //TODO: FREQ: SECONDLY
            //TODO: FREQ: MINUTELY
            hourly: {
                next: function(start, rule) {
                    if (!rule.hours && !rule.minutes && !rule.seconds) {
                        start = new Date(start);
                        start.setHours(start.getHours() + rule.interval);
                    }
                    return start;
                },

                setup: function(rule, start) {
                    if (rule.weekDays) {
                        rule._weekDayRules = filterWeekDays(rule.weekDays, start.getDay(), rule.weekStart).slice(0);
                    }

                    if (rule.hours) {
                        rule._hourRules = rule.hours.slice();
                    }

                    if (rule.minutes) {
                        rule._minuteRules = rule.minutes.slice();
                    }

                    if (rule.seconds) {
                        rule._secondRules = rule.seconds.slice();
                    }
                },
                limit: function(date, end, rule) {
                    //TODO: check days not milliseconds. DO IT for all!!
                    var dateMS, monthDay, day, month,
                        allow = allowExpand(rule);

                    while (+date <= end) {
                        dateMS = +date;

                        if (rule.months && allow) {
                            date = recurrence._month(date, end, rule);
                            month = date.getMonth();
                            if (+date !== dateMS) {
                                date.setHours(0);
                            }
                        }

                        if (allow && rule.yearDays && $.inArray(recurrence.dayInYear(date), rule.yearDays) === -1) { //TODO: Sort yearDays
                            //TODO: optimize - find closest year day and set date.
                            //TODO: support for negative year days!!!!!!!!
                            while ((+date <= end) && $.inArray(recurrence.dayInYear(date), rule.yearDays) === -1) {
                                date.setDate(date.getDate() + 1);
                            }
                        }

                        if (rule.monthDays && allow) {
                            date = recurrence._monthDay(date, end, rule);
                            monthDay = date.getDate();

                            if (+date !== dateMS) {
                                date.setHours(0);
                            }
                        }

                        if (rule.weekDays && allow) {
                            date = recurrence._weekDay(date, end, rule);

                            if (+date !== dateMS) {
                                date.setHours(0);
                            }
                        }

                        day = date.getDate();

                        //TODO: if (month, monthDay, weekDay changes, do not call hours, minutes, seconds
                        if (rule.hours || rule.minutes || rule.seconds) {
                            if (dateMS !== +date) {
                                if (rule.hours) {
                                    date.setHours(0);
                                }
                                if (rule.minutes) {
                                    date.setMinutes(0);
                                }
                                if (rule.seconds) {
                                    date.setSeconds(0);
                                }
                            }
                            date = recurrence._time(date, end, rule);
                        }

                        if ((month !== undefined && month !== date.getMonth()) ||
                            (monthDay && monthDay !== day)) {

                            date.setDate(date.getDate() + 1);
                        } else if (+date <= end) {
                            break;
                        }
                    }

                    return date;
                }
            },
            daily: {
                next: function(start, rule) {
                    if (!rule.hours && !rule.minutes && !rule.seconds) {
                        start = new Date(start);
                        start.setDate(start.getDate() + rule.interval);
                    }
                    return start;
                },

                setup: function(rule, start) {
                    if (rule.weekDays) {
                        rule._weekDayRules = filterWeekDays(rule.weekDays, start.getDay(), rule.weekStart).slice(0);
                    }

                    if (rule.hours) {
                        rule._hourRules = rule.hours.slice();
                    }

                    if (rule.minutes) {
                        rule._minuteRules = rule.minutes.slice();
                    }

                    if (rule.seconds) {
                        rule._secondRules = rule.seconds.slice();
                    }
                },

                limit: function(date, end, rule) {
                    var monthDayMS, weekDayMS, month, dateMS,
                        allow = allowExpand(rule);

                    end = +end;

                    while (+date <= end) {
                        dateMS = +date;
                        if (rule.months && allow) {
                            date = recurrence._month(date, end, rule);
                            month = date.getMonth();
                        }

                        if (rule.monthDays && allow) {
                            date = recurrence._monthDay(date, end, rule);
                            monthDayMS = +date;
                        }

                        if (rule.weekDays && allow) {
                            date = recurrence._weekDay(date, end, rule);
                        }

                        weekDayMS = +date;

                        if (rule.hours || rule.minutes || rule.seconds) {
                            if (dateMS !== +date) {
                                if (rule.hours) {
                                    date.setHours(0);
                                }
                                if (rule.minutes) {
                                    date.setMinutes(0);
                                }
                                if (rule.seconds) {
                                    date.setSeconds(0);
                                }
                            }
                            date = recurrence._time(date, end, rule);
                        }

                        if ((month !== undefined && month !== date.getMonth()) ||
                            (monthDayMS && monthDayMS !== weekDayMS)) {

                            date.setDate(date.getDate() + 1);
                        } else if (+date <= end) {
                            break;
                        }
                    }
                    return date;
                }
            },
            weekly: {
                next: function(start, rule) {
                    if (!rule.hours) {
                        start.setDate(start.getDate() + 1);
                    }
                    return start;
                },

                setup: function(rule, start) {
                    if (!rule.weekDays) {
                        rule.weekDays = [{
                            day: start.getDay(),
                            offset: 0
                        }];
                    }

                    if (rule.weekDays) {
                        rule._weekDayRules = filterWeekDays(rule.weekDays, start.getDay(), rule.weekStart).slice(0);
                    }

                    if (rule.hours) {
                        rule._hourRules = rule.hours.slice();
                    }

                    if (rule.minutes) {
                        rule._minuteRules = rule.minutes.slice();
                    }

                    if (rule.seconds) {
                        rule._secondRules = rule.seconds.slice();
                    }
                },

                limit: function(date, end, rule) {
                    var dateMS = +date,
                        allow = allowExpand(rule);

                    if (rule.months && allow) {
                        date = recurrence._month(date, end, rule);
                    }

                    if (rule.weekDays && allow) {
                        date = recurrence._weekDay(date, end, rule);
                    }

                    if (rule.hours || rule.minutes || rule.seconds) {
                        if (dateMS !== +date) {
                            if (rule.hours) {
                                date.setHours(0);
                            }
                            if (rule.minutes) {
                                date.setMinutes(0);
                            }
                            if (rule.seconds) {
                                date.setSeconds(0);
                            }
                        }
                        date = recurrence._time(date, end, rule);
                    }

                    return date;
                }
            },
            monthly: {
                next: function(start, rule) {
                    var day;

                    if (!rule.monthDays && !rule.weekDays) {
                        day = start.getDate();
                        start.setMonth(start.getMonth() + 1);

                        while(start.getDate() !== day) {
                            start.setDate(day);
                        }
                    } else if (!rule.hours && !rule.minutes && !rule.seconds) {
                        start.setDate(start.getDate() + 1);
                    }
                    return start;
                },
                limit: function(date, end, rule) {
                    var day, month, dateMS,
                        allow = allowExpand(rule);

                    end = +end;
                    while (+date <= end) {
                        dateMS = +date;
                        if (rule.months && allow) {
                            day = date.getDate();
                            date = recurrence._month(date, end, rule);
                            month = date.getMonth();

                            if (!rule.monthDays && !rule.weekDays) {
                                date.setDate(day);
                            }
                        }

                        if (rule.monthDays && allow) {
                            date = recurrence._monthDay(date, end, rule);
                        }

                        if (rule.weekDays && allow) {
                            date = recurrence._weekDay(date, end, rule);
                        }

                        if (rule.hours || rule.minutes || rule.seconds) {
                            if (dateMS !== +date) {
                                if (rule.hours) {
                                    date.setHours(0);
                                }
                                if (rule.minutes) {
                                    date.setMinutes(0);
                                }
                                if (rule.seconds) {
                                    date.setSeconds(0);
                                }
                            }
                            date = recurrence._time(date, end, rule);
                        }

                        if (month !== undefined && month !== date.getMonth()) {
                            date.setDate(date.getDate() + 1);
                        } else if (+date <= end) {
                            break;
                        }
                    }

                    return date;
                },
                setup: function(rule, start, eventStart) {
                    if (!rule.monthDays && !rule.weekDays) {
                        start.setDate(eventStart.getDate());
                    }

                    if (rule.weekDays && rule._weekDayRules === undefined) {
                        rule._weekDayRules = filterWeekDays(rule.weekDays, start.getDay(), rule.weekStart).slice(0);
                    }

                    if (rule.hours) {
                        rule._hourRules = rule.hours.slice();
                    }

                    if (rule.minutes) {
                        rule._minuteRules = rule.minutes.slice();
                    }

                    if (rule.seconds) {
                        rule._secondRules = rule.seconds.slice();
                    }
                }
            },
            yearly: {
                next: function(start, rule) {
                    var day;

                    if (!rule.hours && !rule.minutes && !rule.seconds) {
                        if (!rule.months && !rule.monthDays && !rule.weekDays && !rule.yearDays && !rule.weeks) {
                            start.setFullYear(start.getFullYear() + 1);
                        } else if (rule.monthDays || rule.weekDays || rule.yearDays || rule.weeks) {
                            start.setDate(start.getDate() + 1);
                        } else {
                            day = start.getDate();
                            start.setMonth(start.getMonth() + 1);

                            while(start.getDate() !== day) {
                                start.setDate(day);
                            }
                        }
                    }

                    return start;
                },

                limit: function(date, end, rule) {
                    var day, month, dateMS,
                        allow = allowExpand(rule),
                        weekStart = rule.weekStart,
                        modified;

                    end = +end;

                    while (+date <= end) {
                        dateMS = +date;
                        modified = false;

                        if (allow && rule.months) {
                            day = date.getDate();
                            date = recurrence._month(date, end, rule);
                            month = date.getMonth();

                            if (!rule.monthDays && !rule.weekDays) {
                                date.setDate(day);
                            }
                        }

                        if (allow && rule.weeks && $.inArray(recurrence.weekInYear(date, weekStart), rule.weeks) === -1) { //TODO: Sort weeks
                            while ((+date <= end) && $.inArray(recurrence.weekInYear(date, weekStart), rule.weeks) === -1) {
                                date.setDate(date.getDate() + 7);
                            }

                            //TODO: test this logic when while ends because date > end and we move backward!!!
                            date = recurrence.weekDay(date, weekStart, -1); //TODO: implement prevWeekDay
                        }

                        if (allow && rule.yearDays && $.inArray(recurrence.dayInYear(date), rule.yearDays) === -1) { //TODO: Sort yearDays
                            while ((+date <= end) && $.inArray(recurrence.dayInYear(date), rule.yearDays) === -1) {
                                date.setDate(date.getDate() + 1);
                            }
                        }

                        if (allow && rule.monthDays) {
                            date = recurrence._monthDay(date, end, rule);
                        }

                        if (allow && rule.weekDays) {
                            date = recurrence._weekDay(date, end, rule);
                        }

                        if (rule.hours || rule.minutes || rule.seconds) {
                            if (dateMS !== +date) {
                                if (rule.hours) {
                                    date.setHours(0);
                                }
                                if (rule.minutes) {
                                    date.setMinutes(0);
                                }
                                if (rule.seconds) {
                                    date.setSeconds(0);
                                }
                            }

                            day = date.getDate();
                            date = recurrence._time(date, end, rule);
                            modified = day !== date.getDate();
                        }

                        if (month !== undefined && month !== date.getMonth()) {
                            date.setDate(date.getDate() + 1);
                        } else if (!modified && +date <= end) {
                            break;
                        }
                    }

                    return date;
                },
                setup: function(rule, start) {
                    if (rule.weekDays && rule._weekDayRules === undefined) {
                        rule._weekDayRules = filterWeekDays(rule.weekDays, start.getDay(), rule.weekStart).slice(0);
                    }

                    if (rule.hours) {
                        rule._hourRules = rule.hours.slice();
                    }

                    if (rule.minutes) {
                        rule._minuteRules = rule.minutes.slice();
                    }

                    if (rule.seconds) {
                        rule._secondRules = rule.seconds.slice();
                    }
                }
            }
        },
        expandEvent: function(e) {
            var instance = e.ruleInstance;

            if (!instance && e.rule) {
                e.ruleInstance = instance = recurrence.parseRule(e.rule);
            }

            return instance;
        },
        parseRule: function (rule) {
            var instance = {},
                property,
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
                        instance.until = kendo.parseDate(value[0], DATE_FORMATS);
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
                        instance.weeks = parseArray(value, { start: 1, end: 53 });
                        break;
                    case "WKST":
                        instance.weekStart = weekStart = WEEK_DAYS[value[0]];
                        break;
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
            }

            return instance;
        },

        dayInYear: function(date) {
            var month = date.getMonth(),
            days = leapYear(date) ? daysInLeapYear[month] : daysInYear[month];

            return days + date.getDate();
        },

        weekInYear: function(date, weekStart){
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var year = date.getFullYear(),
                days;

            if (weekStart !== undefined) {
                date = recurrence.weekDay(date, weekStart, -1);
                date.setDate(date.getDate() + 4);
            } else {
                date.setDate(date.getDate() + (4 - (date.getDay() || 7)));
            }

            days = Math.floor((date.getTime() - new Date(year, 0, 1, -6)) / 86400000);

            return 1 + Math.floor(days / 7);
        },

        weekInMonth: function(date, weekStart) {
            var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

            if (weekStart > firstWeekday) {
                weekStart *= -1;
            }

            firstWeekday = firstWeekday - weekStart;

            return Math.floor((date.getDate() + firstWeekday - 1) / 7) + 1;
        },

        numberOfWeeks: function(date, weekStart) {
            return recurrence.weekInMonth(new Date(date.getFullYear(), date.getMonth() + 1, 0), weekStart);
        },

        isInWeek: function(date, offset, weekStart) {
            var weekInMonth = recurrence.weekInMonth(date, weekStart);
            if (offset > 0) {
                if (offset === weekInMonth) {
                    return true;
                }
            } else {
                if ((recurrence.numberOfWeeks(date, weekStart) + (offset + 1)) === weekInMonth) {
                    return true;
                }
            }
        },

        weekDay: function(date, dayOfWeek, offset) {
            date = new Date(date);
            offset = offset || 1;

            while(date.getDay() !== dayOfWeek) {
                date.setDate(date.getDate() + offset);
            }

            return date;
        },

        _month: function(date, end, rule) {
            var monthNumber = date.getMonth() + 1,
                weekDays = rule.weekDays,
                months = rule.months,
                update;

            end = +end;

            while ($.inArray(monthNumber, months) === -1) {
                date.setFullYear(date.getFullYear(), monthNumber, 1);
                monthNumber = date.getMonth() + 1;
                update = true;

                if (+date > end) {
                    return date;
                }
            }

            //TODO: place code in different place ???
            if (update && weekDays) {
                rule._weekDayRules = filterWeekDays(weekDays, date.getDay(), rule.weekStart).slice(0);
            }

            return date;
        },

        _monthDay: function(date, end, rule) {
            var weekDays = rule.weekDays,
                days = rule.monthDays,
                update;

            while (!inMonthDaysList(date, days)) {
                date.setDate(date.getDate() + 1);
                update = true;
            }

            //TODO: place code in different place ???
            if (update && weekDays) {
                rule._weekDayRules = filterWeekDays(weekDays, date.getDay(), rule.weekStart).slice(0);
            }

            return date;
        },

        _weekDay: function(date, end, rule) {
            var weekDayRule = rule._weekDayRules.shift(),
                weekStart = rule.weekStart,
                day, offset;

            if (!weekDayRule) {
                date = recurrence.weekDay(date, weekStart);
                rule._weekDayRules = rule.weekDays.slice(0);
                weekDayRule = rule._weekDayRules.shift();

                if (rule.interval > 1) {
                    date.setDate(date.getDate() + ((rule.interval - 1) * 7));
                }
            }

            day = weekDayRule.day;
            offset = weekDayRule.offset;

            if (offset) {
                while (!recurrence.isInWeek(date, offset, weekStart)) {
                    if (date.getDay() === weekStart) {
                        date.setDate(date.getDate() + 1);
                    }

                    date = recurrence.weekDay(date, weekStart);

                    if (+date > +end) {
                        break;
                    }
                }
            }

            if (date.getDay() !== day) {
                date = recurrence.weekDay(date, day);
            }

            return date;
        },

        //TODO: refactor
        _time: function(date, end, rule) {
            var hours = date.getHours(),
                minutes, seconds,
                hourRules = rule._hourRules,
                minuteRules = rule._minuteRules,
                secondRules = rule._secondRules,
                hourRule, minuteRule, secondRule,
                ruleChanged,
                modified;

            while (+date <= +end) {
                modified = false;

                if (hourRules && allowTimeExpand(minuteRules, rule.minutes)) {
                    hourRule = hourRules.shift();

                    while (hourRule && hourRule < hours) {
                        hourRule = rule._hourRules.shift();
                    }

                    if (!hourRule) {
                        rule._hourRules = rule.hours.slice(0);
                        hourRule = rule._hourRules.shift();

                        date.setDate(date.getDate() + 1);
                        date.setHours(0); //TODO: DST CHECK
                    }

                    if (minuteRules && hourRule !== hours) {
                        date.setMinutes(0);
                    }

                    date.setHours(hourRule);
                }

                if (minuteRules && allowTimeExpand(secondRules, rule.seconds)) {
                    minutes = date.getMinutes();
                    minuteRule = minuteRules.shift();

                    while (minuteRule && minuteRule < minutes) {
                        minuteRule = rule._minuteRules.shift();
                        ruleChanged = true;
                    }

                    if (!minuteRule) {
                        if (!hourRule || ruleChanged) {
                            date.setHours(date.getHours() + 1); //TODO: DST CHECK
                            ruleChanged = false;
                            modified = !!hourRule;
                        }

                        date.setMinutes(0);

                        rule._minuteRules = rule.minutes.slice(0);
                        minuteRule = rule._minuteRules.shift();
                    }

                    if (secondRules && minuteRule !== minutes) {
                        date.setSeconds(0);
                    }

                    date.setMinutes(minuteRule);
                }

                if (secondRules) {
                    seconds = date.getSeconds();
                    secondRule = secondRules.shift();

                    while (secondRule && secondRule < seconds) {
                        secondRule = secondRules.shift();
                        ruleChanged = true;
                    }

                    if (!secondRule) {
                        if (!minuteRule || ruleChanged) {
                            date.setMinutes(date.getMinutes() + 1); //TODO: DST CHECK
                            ruleChanged = false;
                            modified = !!minuteRule;
                        }

                        date.setSeconds(0);

                        rule._secondRules = rule.seconds.slice(0);
                        secondRule = rule._secondRules.shift();
                    }

                    date.setSeconds(secondRule);
                }

                if (!modified) {
                    break;
                }
            }

            return date;
        }
    };

    function allowTimeExpand(currentRules, timeRules) {
        return !currentRules || currentRules.length === 0 || currentRules.length === timeRules.length;
    }

    function allowExpand(rule) {
        return allowTimeExpand(rule._hourRules, rule.hours) &&
            allowTimeExpand(rule._minuteRules, rule.minutes) &&
            allowTimeExpand(rule._secondRules, rule.seconds);
    }

    function cloneEvent(event, start, durationMS) {
        var end = new Date(start.getTime() + durationMS);

        //TODO: DST check

        return $.extend({}, event, {
           recurrenceID: event.uid,
           start: new Date(start),
           end: end,
           uid: "" //generate uid ???
        });
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

    function numberSortPredicate(a, b) {
        return a - b;
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

            day = WEEK_DAYS[day];
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

    function filterWeekDays(weekDays, currentDay, weekStart) {
        var idx = 0,
            length = weekDays.length,
            result = [],
            weekDay, day;

        if (currentDay < weekStart) {
            currentDay += weekStart;
        }

        for (;idx < length; idx++) {
            weekDay = weekDays[idx];
            day = weekDay.day;

            if (day < weekStart) {
                day += weekStart;
            }

            if (currentDay <= day) {
                result.push(weekDay);
            }
        }

        return result[0] ? result : weekDays;
    }

    function inMonthDaysList(date, monthDays) {
        var month = getMonthLength(date),
            length = monthDays.length,
            day = date.getDate(),
            monthDay,
            idx = 0;

        for (; idx < length; idx++) {
            monthDay = monthDays[idx];
            if (monthDay < 0) {
                monthDay = month + monthDay;
            }

            if (day === monthDay) {
                return true;
            }
        }

        return false;
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

    kendo.recurrence = {
        rule: {
            parse: recurrence.parseRule
            //tostring
        },
        expand: recurrence.expand,
        dayInYear: recurrence.dayInYear,
        weekInYear: recurrence.weekInYear,
        weekInMonth: recurrence.weekInMonth,
        numberOfWeeks: recurrence.numberOfWeeks
    };
})(window.kendo.jQuery);
