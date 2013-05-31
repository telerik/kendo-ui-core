kendo_module({
    id: "scheduler.recurrence",
    name: "Recurrence",
    category: "web",
    depends: [ "scheduler" ],
    hidden: true
});

(function($, undefined) {
    var kendo = window.kendo,
        daysInLeapYear = [0,31,60,91,121,152,182,213,244,274,305,335,366], //TODO: UPPERCASE
        daysInYear = [0,31,59,90,120,151,181,212,243,273,304,334,365], //TODO: UPPERCASE
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
                        instance.weeks = parseArray(value, { start: -53, end: 53 });
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

        expand: function(event, period) {
            var rule = recurrence.parseRule(event.rule),
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


            //TODO: if event.start is in the same day as start then set hour
            start.setHours(event.start.getHours());
            start.setMinutes(event.start.getMinutes());
            start.setSeconds(event.start.getSeconds());
            start.setMilliseconds(event.start.getMilliseconds());

            if (freq.setup) {
                freq.setup(rule, start, event.start);
            }

            freq.limit(start, end, rule);

            while (+start <= end) {
                events.push(cloneEvent(event, start, durationMS));
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
        },

        frequency: {
            //TODO: FREQ: SECONDLY
            //TODO: FREQ: MINUTELY
            hourly: {
                next: function(start, rule) {
                    if (rule.seconds) {
                        start.setSeconds(start.getSeconds() + 1);
                    } else if (rule.minutes) {
                        start.setMinutes(start.getMinutes() + 1);
                    } else {
                        start.setHours(start.getHours() + rule.interval);
                    }
                },

                normalize: function(options) {
                    if (options.idx === 4) {
                        //TODO: DST (brasil)
                        options.date.setHours(0);
                    }
                },

                limit: function(date, end, rule) {
                    var ruleNames = ["months", "weeks", "yearDays", "monthDays", "weekDays", "hours", "minutes", "seconds"],
                        ruleName, limited, modified,
                        idx, day;

                    while (date <= end) {
                        modified = limited = undefined;
                        day = date.getDate();

                        for (idx = 0; idx < 8; idx++) {
                            ruleName = ruleNames[idx];
                            if (rule[ruleName]) {
                                modified = recurrence["_" + ruleName](date, end, rule);

                                //check if hours/minutes/seconds and limited is still undefined - do not break
                                if (limited !== undefined && modified) {
                                    break;
                                } else {
                                    limited = modified;
                                }
                            }

                            if (modified) {
                                this.normalize({
                                    date: date,
                                    rule: rule,
                                    day: day,
                                    idx: idx
                                });
                            }
                        }

                        if (idx === 8) {
                            break;
                        }
                    }
                }
            },
            daily: {
                next: function(start, rule) {
                    if (rule.seconds) {
                        start.setSeconds(start.getSeconds() + 1);
                    } else if (rule.minutes) {
                        start.setMinutes(start.getMinutes() + 1);
                    } else if (rule.hours) {
                        start.setHours(start.getHours() + rule.interval);
                    } else {
                        start.setDate(start.getDate() + rule.interval);
                    }
                },

                normalize: function(options) {
                    if (options.idx === 4 && options.rule.hours) {
                        //TODO: DST (brasil)
                        options.date.setHours(0);
                    }
                },

                limit: function(date, end, rule) {
                    var ruleNames = ["months", "weeks", "yearDays", "monthDays", "weekDays", "hours", "minutes", "seconds"],
                        ruleName, limited, modified,
                        idx, day;

                    while (date <= end) {
                        modified = limited = undefined;
                        day = date.getDate();

                        for (idx = 0; idx < 8; idx++) {
                            ruleName = ruleNames[idx];
                            if (rule[ruleName]) {
                                modified = recurrence["_" + ruleName](date, end, rule);

                                //check if hours/minutes/seconds and limited is still undefined - do not break
                                if (limited !== undefined && modified) {
                                    break;
                                } else {
                                    limited = modified;
                                }
                            }

                            if (modified) {
                                this.normalize({
                                    date: date,
                                    rule: rule,
                                    day: day,
                                    idx: idx
                                });
                            }
                        }

                        if (idx === 8) {
                            break;
                        }
                    }
                }
            },
            weekly: {
                next: function(start, rule) {
                    if (rule.seconds) {
                        start.setSeconds(start.getSeconds() + 1);
                    } else if (rule.minutes) {
                        start.setMinutes(start.getMinutes() + 1);
                    } else if (rule.hours) {
                        start.setHours(start.getHours() + rule.interval);
                    } else {
                        start.setDate(start.getDate() + 1);
                    }
                },

                normalize: function(options) {
                    if (options.idx === 4 && options.rule.hours) {
                        //TODO: DST (brasil)
                        options.date.setHours(0);
                    }
                },

                setup: function(rule, start) {
                    if (!rule.weekDays) {
                        rule.weekDays = [{
                            day: start.getDay(),
                            offset: 0
                        }];
                    }
                },

                limit: function(date, end, rule) {
                    var ruleNames = ["months", "weeks", "yearDays", "monthDays", "weekDays", "hours", "minutes", "seconds"],
                        ruleName, limited, modified,
                        idx, day;

                    while (date <= end) {
                        modified = limited = undefined;
                        day = date.getDate();

                        for (idx = 0; idx < 8; idx++) {
                            ruleName = ruleNames[idx];
                            if (rule[ruleName]) {
                                modified = recurrence["_" + ruleName](date, end, rule);

                                //check if hours/minutes/seconds and limited is still undefined - do not break
                                if (limited !== undefined && modified) {
                                    break;
                                } else {
                                    limited = modified;
                                }
                            }

                            if (modified) {
                                this.normalize({
                                    date: date,
                                    rule: rule,
                                    day: day,
                                    idx: idx
                                });
                            }
                        }

                        if (idx === 8) {
                            break;
                        }
                    }
                }
            },
            monthly: {
                setup: function(rule, start, eventStart) {
                    if (!rule.monthDays && !rule.weekDays) {
                        start.setDate(eventStart.getDate());
                    }
                },
                next: function(start, rule) {
                    if (rule.seconds) {
                        start.setSeconds(start.getSeconds() + 1);
                    } else if (rule.minutes) {
                        start.setMinutes(start.getMinutes() + 1);
                    } else if (rule.hours) {
                        start.setHours(start.getHours() + rule.interval);
                    } else if (rule.monthDays || rule.weekDays || rule.yearDays || rule.weeks) {
                        start.setDate(start.getDate() + 1);
                    } else {
                        //loop till find month with such day
                        var day = start.getDate();
                        start.setMonth(start.getMonth() + 1);

                        while(start.getDate() !== day) {
                            start.setDate(day);
                        }
                    }
                },

                normalize: function(options) {
                    var date = options.date,
                        rule = options.rule,
                        idx = options.idx;

                    if (idx === 0 && !rule.monthDays && !rule.weekDays) {
                        date.setDate(options.day);
                    } else if (idx === 4 && rule.hours) {
                        //TODO: DST (brasil)
                        date.setHours(0);
                    }
                },

                limit: function(date, end, rule) {
                    var ruleNames = ["months", "weeks", "yearDays", "monthDays", "weekDays", "hours", "minutes", "seconds"],
                        ruleName, limited, modified,
                        idx, day;

                    while (date <= end) {
                        modified = limited = undefined;
                        day = date.getDate();

                        for (idx = 0; idx < 8; idx++) {
                            ruleName = ruleNames[idx];
                            if (rule[ruleName]) {
                                modified = recurrence["_" + ruleName](date, end, rule);

                                //check if hours/minutes/seconds and limited is still undefined - do not break
                                if (limited !== undefined && modified) {
                                    break;
                                } else {
                                    limited = modified;
                                }
                            }

                            if (modified) {
                                this.normalize({
                                    date: date,
                                    rule: rule,
                                    day: day,
                                    idx: idx
                                });
                            }

                        }

                        if (idx === 8) {
                            break;
                        }
                    }
                }
            },
            yearly: {
                next: function(start, rule) {
                    if (rule.seconds) {
                        start.setSeconds(start.getSeconds() + 1);
                    } else if (rule.minutes) {
                        start.setMinutes(start.getMinutes() + 1);
                    } else if (rule.hours) {
                        start.setHours(start.getHours() + rule.interval);
                    } else if (rule.monthDays || rule.weekDays || rule.yearDays || rule.weeks) {
                        start.setDate(start.getDate() + 1);
                    } else if (rule.months) {
                        //loop till find month with such day
                        var day = start.getDate();
                        start.setMonth(start.getMonth() + 1);

                        while(start.getDate() !== day) {
                            start.setDate(day);
                        }
                    } else {
                        start.setFullYear(start.getFullYear() + 1);
                    }
                },

                normalize: function(options) {
                    var date = options.date,
                        rule = options.rule,
                        idx = options.idx;

                    if (idx === 0 && !rule.monthDays && !rule.weekDays) {
                        date.setDate(options.day);
                    } else if (idx === 4 && rule.hours) {
                        //TODO: DST (brasil)
                        date.setHours(0);
                    }
                },

                limit: function(date, end, rule) {
                    var ruleNames = ["months", "weeks", "yearDays", "monthDays", "weekDays", "hours", "minutes", "seconds"],
                        ruleName, limited, modified,
                        idx, day;

                    while (date <= end) {
                        modified = limited = undefined;
                        day = date.getDate();

                        for (idx = 0; idx < 8; idx++) {
                            ruleName = ruleNames[idx];
                            if (rule[ruleName]) {
                                modified = recurrence["_" + ruleName](date, end, rule);

                                //check if hours/minutes/seconds and limited is still undefined - do not break
                                if (limited !== undefined && modified) {
                                    break;
                                } else {
                                    limited = modified;
                                }
                            }

                            if (modified) {
                                this.normalize({
                                    date: date,
                                    rule: rule,
                                    day: day,
                                    idx: idx
                                });
                            }
                        }

                        if (idx === 8) {
                            break;
                        }
                    }
                }
            }
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
                recurrence.weekDay(date, weekStart, -1);
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
            return recurrence.weekInMonth(date, weekStart) === recurrence.offsetWeek(date, offset, weekStart);
        },

        offsetWeek: function(date, offset, weekStart) {
            if (offset < 0) {
                offset = recurrence.numberOfWeeks(date, weekStart) + (offset + 1);
            }
            return offset;
        },

        //TODO: Rename to something more readable name!
        weekDay: function(date, dayOfWeek, offset) {
            offset = offset || 1;

            while(date.getDay() !== dayOfWeek) {
                date.setDate(date.getDate() + offset);
            }
        },

        _months: function(date, end, rule) {
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

        _monthDays: function(date, end, rule) {
            var monthLength, month, days,
                changed = false;

            while (date < end) { //TODO: check date <= end
                month = date.getMonth();
                monthLength = getMonthLength(date);
                days = ruleValues(rule.monthDays, date.getDate(), function(monthDay) {
                    if (monthDay < 0) {
                        monthDay = monthLength + monthDay;
                    }
                    return monthDay;
                });

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

        _yearDays: function(date, end, rule) {
            var year, day, yearDays,
                changed = false;

            while (date < end) { //TODO: check date <= end
                year = leapYear(date) ? 366 : 365;
                yearDays = ruleValues(rule.yearDays, recurrence.dayInYear(date), function(yearDay) {
                    if (yearDay < 0) {
                        yearDay = year + yearDay;
                    }
                    return yearDay;
                });

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

        _weeks: function(date, end, rule) {
            var weekStart = rule.weekStart,
                year, weeks, day,
                changed = false;

            while (date < end) { //TODO: check date <= end
                weeks = ruleValues(rule.weeks, recurrence.weekInYear(date, weekStart), function(week) {
                    if (week < 0) {
                        week = 53 + week;
                    }
                    return week;
                });

                if (weeks === null) {
                    return changed;
                }

                changed = true;
                year = date.getFullYear();

                if (weeks.length) {
                    day = (weeks.sort(numberSortPredicate)[0] * 7) - 1;
                    date.setFullYear(year, 0, day);
                    recurrence.weekDay(date, weekStart, -1);
                    break;
                } else {
                    date.setFullYear(year + 1, 0, 1);
                }
            }

            return changed;
        },

        _weekDays: function(date, end, rule) {
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
                recurrence.weekDay(date, weekStart);

                if (rule._weekDayFound && interval > 1) {
                    date.setDate(date.getDate() + ((interval - 1) * 7));
                }
            }

            day = weekDayRule.day;
            offset = weekDayRule.offset;
            rule._weekDayFound = true;

            if (offset) {
                while (date <= end && !recurrence.isInWeek(date, offset, weekStart)) {
                    date.setDate(date.getDate() + 7);
                    recurrence.weekDay(date, weekStart, -1);
                }
            }

            if (date.getDay() !== day) {
                recurrence.weekDay(date, day);
            }

            return true;
        },

        _hours: function(date, end, rule) {
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

        _minutes: function(date, end, rule) {
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

        _seconds: function(date, end, rule) {
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
    };

    //helper method for freq
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
            weekNumber = recurrence.weekInMonth(date, weekStart);
            offset = offset ? recurrence.offsetWeek(date, offset, weekStart) : weekNumber;

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
