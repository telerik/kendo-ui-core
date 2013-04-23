kendo_module({
    id: "scheduler",
    name: "Scheduler",
    category: "web",
    description: "The Scheduler is a event calendar.",
    depends: [ "core" ]
});


(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Class = kendo.Class,
        Widget = ui.Widget;

    var Scheduler = Widget.extend({
        init: function(element, options) {
            var that = this, value, id;

            Widget.fn.init.call(that, element, options);
        },

        options: {
            name: "Scheduler",
        },

        events: []
    });

    var RRule = Class.extend({
        init: function(options) {
        }
    });

    var FREQUENCY = {
        "SECONDLY": 0,
        "MINUTELY": 1,
        "HOURLY": 2,
        "DAILY": 3,
        "WEEKLY": 4,
        "MONTHLY": 5,
        "YEARLY": 6
    }

    var WEEK_DAYS = {
        "SU": 0,
        "MO": 1,
        "TU": 2,
        "WE": 3,
        "TH": 4,
        "FR": 5,
        "SA": 6
    }

    var DATE_FORMATS = [
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

    function parseArray(list, range) {
        var idx = 0,
            length = list.length,
            value;

        for (; idx < length; idx++) {
            value = parseInt(list[idx], 10);
            if (isNaN(value) || value < range.start || value > range.end) {
                return null;
            }

            list[idx] = value;
        }

        return list;
    }

    function parseWeekDayList(list) {
        var idx = 0, length = list.length,
            value, valueLength;

        for (; idx < length; idx++) {
            value = list[idx];
            valueLength = value.length;

            list[idx] = {
                offset: parseInt(value.substring(0, valueLength - 2), 10) || 1,
                day: value.substring(valueLength - 2, valueLength).toUpperCase()
            };

            if (WEEK_DAYS[list[idx].day] === undefined) {
                return null;
            }
        }
        return list;
    }

    var rrule_parser = function(rrule) {
        var result = {},
            property,
            splits, value,
            idx = 0, length;

        rrule = rrule.split(";");
        length = rrule.length;

        for (; idx < length; idx++) {
            property = rrule[idx];
            splits = property.split("=");
            value = $.trim(splits[1]).split(",");

            switch (splits[0].toUpperCase()) {
                case "FREQ" : {
                    result.freq = value[0].toUpperCase();
                    break;
                }
                case "UNTIL" : {
                    result.until = kendo.parseDate(value[0], DATE_FORMATS);
                    break;
                }
                case "COUNT" : {
                    result.count = parseInt(value[0], 10);
                    break;
                }
                case "INTERVAL" : {
                    result.interval = parseInt(value[0], 10);
                    break;
                }
                case "BYSECOND" : {
                    result.seconds = parseArray(value, { start: 0, end: 60 });
                    break;
                }
                case "BYMINUTE" : {
                    result.minutes = parseArray(value, { start: 0, end: 59 });
                    break;
                }
                case "BYHOUR" : {
                    result.hours = parseArray(value, { start: 0, end: 23 });
                    break;
                }
                case "BYMONTHDAY" : {
                    result.monthDays = parseArray(value, { start: 1, end: 31 });
                    break;
                }
                case "BYYEARDAY" : {
                    result.yearDays = parseArray(value, { start: 1, end: 366 });
                    break;
                }
                case "BYMONTH" : {
                    result.months = parseArray(value, { start: 1, end: 12 });
                    break;
                }
                case "BYDAY" : {
                    result.weekDays = parseWeekDayList(value);
                    break;
                }
                //parse bysetpos
                //parse wkst
                //by week number
            }
        }

        return result;
    }

    kendo.rrule_parser = rrule_parser;

    ui.plugin(Scheduler);

})(window.kendo.jQuery);
