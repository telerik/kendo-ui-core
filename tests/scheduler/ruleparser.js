(function() {
    module("RRule parser");

    var parse = kendo.recurrence.rule.parse;

    test("Remove RRULE if present", function() {
        var rrule = parse("RRULE:FREQ=DaILY ");

        equal(rrule.freq, "daily");
    });

    test("Parse DTSTART property (line breaks separator)", function() {
        var rrule = parse("DTSTART:19730429T070000Z\nRRULE:FREQ=DAILY", "Etc/UTC");

        deepEqual(rrule.start.value[0], new Date(1973, 3, 29, 7));
    });

    test("Parse DTSTART property (line breaks separator in the end too)", function() {
        var rrule = parse("DTSTART:19730429T070000Z\n\rRRULE:FREQ=DAILY\n\r", "Etc/UTC");

        deepEqual(rrule.start.value[0], new Date(1973, 3, 29, 7));
        equal(rrule.freq, "daily");
    });

    test("Parse DTSTART property (space separator)", function() {
        var rrule = parse("DTSTART:19730429T070000Z RRULE:FREQ=DAILY", "Etc/UTC");

        deepEqual(rrule.start.value[0], new Date(1973, 3, 29, 7));
    });

    test("Parse DTSTART property with VALUE", function() {
        var rrule = parse("DTSTART;VALUE=DATE:19730429T070000Z\nRRULE:FREQ=DAILY", "Etc/UTC");

        deepEqual(rrule.start.value[0], new Date(1973, 3, 29, 7));
    });

    test("Parse DTSTART property with TZID", function() {
        var rrule = parse("DTSTART;TZID=Etc/UTC:19730429T070000Z\nRRULE:FREQ=DAILY");

        deepEqual(rrule.start.value[0], new Date(1973, 3, 29, 7));
        equal(rrule.start.tzid, "Etc/UTC");
    });

    test("Parse DTSTART property with TZID and VALUE", function() {
        var rrule = parse("DTSTART;TZID=Etc/UTC;VALUE=DATE:19730429T070000Z\nRRULE:FREQ=DAILY");

        deepEqual(rrule.start.value[0], new Date(1973, 3, 29, 7));
        equal(rrule.start.tzid, "Etc/UTC");
    });

    test("Parse DTEND property (line breaks separator)", function() {
        var rrule = parse("DTEND:19730429T070000Z\nRRULE:FREQ=DAILY", "Etc/UTC");

        deepEqual(rrule.end.value[0], new Date(1973, 3, 29, 7));
    });

    test("Parse DTEND property (space separator)", function() {
        var rrule = parse("DTEND:19730429T070000Z RRULE:FREQ=DAILY", "Etc/UTC");

        deepEqual(rrule.end.value[0], new Date(1973, 3, 29, 7));
    });

    test("Parse DTEND property with VALUE", function() {
        var rrule = parse("DTEND;VALUE=DATE:19730429T070000Z\nRRULE:FREQ=DAILY", "Etc/UTC");

        deepEqual(rrule.end.value[0], new Date(1973, 3, 29, 7));
    });

    test("Parse DTEND property with TZID", function() {
        var rrule = parse("DTEND;TZID=Etc/UTC:19730429T070000Z\nRRULE:FREQ=DAILY");

        deepEqual(rrule.end.value[0], new Date(1973, 3, 29, 7));
        equal(rrule.end.tzid, "Etc/UTC");
    });

    test("Parse DTEND property with TZID and VALUE", function() {
        var rrule = parse("DTEND;TZID=Etc/UTC;VALUE=DATE:19730429T070000Z\nRRULE:FREQ=DAILY");

        deepEqual(rrule.end.value[0], new Date(1973, 3, 29, 7));
        equal(rrule.end.tzid, "Etc/UTC");
    });

    test("Parse EXDATE value", function() {
        var rrule = parse("EXDATE:19730429T070000Z\nRRULE:FREQ=DAILY");

        deepEqual(rrule.exdates.value[0], kendo.parseDate("1973-04-29T07:00:00Z"));
    });

    test("Parse multiple EXDATE values", function() {
        var rrule = parse("EXDATE:19730429T070000Z,19730429T070000Z,19730429T070000Z\nRRULE:FREQ=DAILY");

        deepEqual(rrule.exdates.value[0], kendo.parseDate("1973-04-29T07:00:00Z"));
    });

    test("Parse FREQ property", function() {
        var rrule = parse("FREQ=daily");

        equal(rrule.freq, "daily");
    });

    test("Parse UNTIL property without timezone", function() {
        var date = new Date(1973, 3, 29, 10),
            rrule = parse("FREQ=DaILY;UNTIL=" + kendo.toString(kendo.timezone.apply(date, "Etc/UTC"), "yyyyMMddTHHmmssZ"));

        equal(rrule.until.getTime(), date.getTime());
    });

    test("Parse UNTIL property with UTC timezone", function() {
        var rrule = parse("FREQ=DaILY;UNTIL=19730429T070000Z", "Etc/UTC");

        equal(+rrule.until, new Date(1973, 3, 29, 7).getTime());
    });

    test("Parse UNTIL property with America/Los_Angeles timezone", function() {
        var rrule = parse("FREQ=DaILY;UNTIL=19730429T070000Z", "America/Los_Angeles"),
            result = kendo.parseDate("19730429T070000Z", "yyyyMMddTHHmmsszz");

        result = kendo.timezone.convert(result, result.getTimezoneOffset(), "America/Los_Angeles");

        equal(rrule.until.getTime(), result.getTime());
    });

    test("Parse COUNT property", function() {
        var rrule = parse("FREQ=DaILY;COUNT=10");

        equal(rrule.count, 10);
    });

    test("Parse INTERVAL property", function() {
            var rrule = parse("FREQ=DAILY;INTERVAL=3");

        equal(rrule.interval, 3);
    });

    test("Parse BYSECOND property when value is single number", function() {
        var rrule = parse("FREQ=SECONDLY;bysecond=1");

        equal(rrule.seconds.length, 1);
        equal(rrule.seconds[0], 1);
    });

    test("Parse BYSECOND property when value is a list of numbers", function() {
        var rrule = parse("FREQ=SECONDLY;bysecond=1, 2, 3, 4");

        equal(rrule.seconds.length, 4);
        equal(rrule.seconds[0], 1);
        equal(rrule.seconds[1], 2);
        equal(rrule.seconds[2], 3);
        equal(rrule.seconds[3], 4);
    });

    test("Parse BYSECOND validates if values are not correct", function() {
        var rrule = parse("FREQ=SECONDLY;bysecond=1, 61, 3, 4");

        ok(rrule.seconds === null);
    });

    test("Parse BYMINUTE property when value is single number", function() {
        var rrule = parse("FREQ=MINUTELY;byminute=1");

        equal(rrule.minutes.length, 1);
        equal(rrule.minutes[0], 1);
    });

    test("Parse BYMINUTE property when value is a list of numbers", function() {
        var rrule = parse("FREQ=MINUTELY;byminute=1, 2, 3, 4");

        equal(rrule.minutes.length, 4);
        equal(rrule.minutes[0], 1);
        equal(rrule.minutes[1], 2);
        equal(rrule.minutes[2], 3);
        equal(rrule.minutes[3], 4);
    });

    test("Parse BYMINUTE validates if values are not correct", function() {
        var rrule = parse("FREQ=MINUTELY;byminute=1, 61, 3, 4");

        ok(rrule.minutes === null);
    });

    test("Parse BYHOUR property when value is single number", function() {
        var rrule = parse("FREQ=HOURLY;BYHOUR=1");

        equal(rrule.hours.length, 1);
        equal(rrule.hours[0], 1);
    });

    test("Parse BYHOUR property when value is a list of numbers", function() {
        var rrule = parse("FREQ=HOURLY;BYHOUR=1, 2, 3, 4");

        equal(rrule.hours.length, 4);
        equal(rrule.hours[0], 1);
        equal(rrule.hours[1], 2);
        equal(rrule.hours[2], 3);
        equal(rrule.hours[3], 4);
    });

    test("Parse BYHOUR validates if values are not correct", function() {
        var rrule = parse("FREQ=HOURLY;BYHOUR=1, 61, 3, 4");

        ok(rrule.hours === null);
    });

    test("Parse BYMONTHDAY property when value is single number", function() {
        var rrule = parse("FREQ=MONTHLY;BYMONTHDAY=1");

        equal(rrule.monthDays.length, 1);
        equal(rrule.monthDays[0], 1);
    });

    test("Parse BYMONTHDAY property when value is a list of numbers", function() {
        var rrule = parse("FREQ=MONTHLY;BYMONTHDAY=1, 2, 3, 4");

        equal(rrule.monthDays.length, 4);
        equal(rrule.monthDays[0], 1);
        equal(rrule.monthDays[1], 2);
        equal(rrule.monthDays[2], 3);
        equal(rrule.monthDays[3], 4);
    });

    test("Parse BYMONTHDAY validates if values are not correct", function() {
        var rrule = parse("FREQ=MONTHLY;BYMONTHDAY=1, 32, 3, 4");

        ok(rrule.monthDays === null);
    });

    test("Parse BYMONTHDAY allows negative number", function() {
        var rrule = parse("FREQ=MONTHLY;BYMONTHDAY=-1, -31, 3, 4");

        equal(rrule.monthDays.length, 4);
        equal(rrule.monthDays[0], -31);
        equal(rrule.monthDays[1], -1);
        equal(rrule.monthDays[2], 3);
        equal(rrule.monthDays[3], 4);
    });

    test("Parse BYMONTHDAY does not allow zeros", function() {
        var rrule = parse("FREQ=MONTHLY;BYMONTHDAY=1, 0, 3, 4");

        ok(rrule.monthDays === null);
    });

    test("Parse BYYEARDAY property when value is single number", function() {
        var rrule = parse("FREQ=MONTHLY;BYYEARDAY=1");

        equal(rrule.yearDays.length, 1);
        equal(rrule.yearDays[0], 1);
    });

    test("Parse BYYEARDAY property when value is a list of numbers", function() {
        var rrule = parse("FREQ=MONTHLY;BYYEARDAY=1, 2, 3, 4");

        equal(rrule.yearDays.length, 4);
        equal(rrule.yearDays[0], 1);
        equal(rrule.yearDays[1], 2);
        equal(rrule.yearDays[2], 3);
        equal(rrule.yearDays[3], 4);
    });

    test("Parse BYYEARDAY validates if values are not correct", function() {
        var rrule = parse("FREQ=MONTHLY;BYYEARDAY=1, 367, 3, 4");

        ok(rrule.yearDays === null);
    });

    test("Parse BYYEARDAY does not allow zero", function() {
        var rrule = parse("FREQ=MONTHLY;BYYEARDAY=0, 365, 3, 4");

        ok(rrule.yearDays === null);
    });

    test("Parse BYMONTH property when value is single number", function() {
        var rrule = parse("FREQ=YEARLY;BYMONTH=1");

        equal(rrule.months.length, 1);
        equal(rrule.months[0], 1);
    });

    test("Parse BYMONTH property when value is a list of numbers", function() {
        var rrule = parse("FREQ=YEARLY;BYMONTH=1, 2, 3, 4");

        equal(rrule.months.length, 4);
        equal(rrule.months[0], 1);
        equal(rrule.months[1], 2);
        equal(rrule.months[2], 3);
        equal(rrule.months[3], 4);
    });

    test("Parse BYMONTH validates if values are not correct", function() {
        var rrule = parse("FREQ=YEARLY;BYMONTH=1, 13, 3, 4");

        ok(rrule.months === null);
    });

    test("Parse BYDAY property when value is week day name", function() {
        var rrule = parse("FREQ=WEEKLY;BYDAY=SU");

        equal(rrule.weekDays.length, 1);
        equal(rrule.weekDays[0].day, 0);
        equal(rrule.weekDays[0].offset, 0);
    });

    test("Parse BYDAY property when value is week day name with offset", function() {
        var rrule = parse("FREQ=WEEKLY;BYDAY=-1SU");

        equal(rrule.weekDays.length, 1);
        equal(rrule.weekDays[0].day, 0);
        equal(rrule.weekDays[0].offset, -1);
    });

    test("Parse BYDAY property when value is a list of week day names", function() {
        var rrule = parse("FREQ=WEEKLY;BYDAY=SU, MO, TH");

        equal(rrule.weekDays.length, 3);
        equal(rrule.weekDays[0].day, 0);
        equal(rrule.weekDays[0].offset, 0);
        equal(rrule.weekDays[1].day, 1);
        equal(rrule.weekDays[1].offset, 0);
        equal(rrule.weekDays[2].day, 4);
        equal(rrule.weekDays[2].offset, 0);
    });

    test("Parse BYDAY property when value is a list of week day names with offsets", function() {
        var rrule = parse("FREQ=WEEKLY;BYDAY=su, -2 MO, 2TH");

        equal(rrule.weekDays.length, 3);
        equal(rrule.weekDays[0].day, 0);
        equal(rrule.weekDays[0].offset, 0);
        equal(rrule.weekDays[1].day, 1);
        equal(rrule.weekDays[1].offset, -2);
        equal(rrule.weekDays[2].day, 4);
        equal(rrule.weekDays[2].offset, 2);
    });

    test("Parse method sorts BYDAY values", function() {
        var rrule = parse("FREQ=WEEKLY;BYDAY=su, -2 MO, 2TH");

        equal(rrule.weekDays.length, 3);
        equal(rrule.weekDays[0].day, 0);
        equal(rrule.weekDays[0].offset, 0);
        equal(rrule.weekDays[1].day, 1);
        equal(rrule.weekDays[1].offset, -2);
        equal(rrule.weekDays[2].day, 4);
        equal(rrule.weekDays[2].offset, 2);
    });

    test("Validate week day of BYDAY property", function() {
        var rrule = parse("FREQ=WEEKLY;BYDAY=SU, -2 TT, 2TH");

        ok(rrule.weekDays === null);
    });

    test("Parse method sorts days in BYDAY (WKST=TH)", function() {
        var rrule = parse("FREQ=WEEKLY;BYDAY=TU, MO, TH;WKST=TH");

        equal(rrule.weekDays.length, 3);
        equal(rrule.weekDays[0].day, 4);
        equal(rrule.weekDays[1].day, 1);
        equal(rrule.weekDays[2].day, 2);
    });

    test("Parse method sorts days in BYDAY (WKST=SU)", function() {
        var rrule = parse("FREQ=WEEKLY;BYDAY=TU, SU, TH;WKST=SU");

        equal(rrule.weekDays[0].day, 0);
        equal(rrule.weekDays[1].day, 2);
    });

    test("Parse method sorts days in BYDAY (WKST=SA)", function() {
        var rrule = parse("FREQ=WEEKLY;BYDAY=TU, SA, TH;WKST=SA");

        equal(rrule.weekDays[0].day, 6);
        equal(rrule.weekDays[1].day, 2);
    });

    test("Parse BYSETPOS property when value is single number", function() {
        var rrule = parse("FREQ=MONTHLY;BYDAY=MO;BYSETPOS=1");

        equal(rrule.positions.length, 1);
        equal(rrule.positions[0], 1);
    });

    test("Parse BYSETPOS property when value is a list of numbers", function() {
        var rrule = parse("FREQ=MONTHLY;BYDAY=MO;BYSETPOS =1, 2, -4, 3");

        equal(rrule.positions.length, 4);
        equal(rrule.positions[0], -4);
        equal(rrule.positions[1], 1);
        equal(rrule.positions[2], 2);
        equal(rrule.positions[3], 3);
    });

    test("Parse BYSETPOS validates if values are not correct", function() {
        var rrule = parse("FREQ=MONTHLY;BYDAY=MO;BYSETPOS=1, 367, 3, 4");

        ok(rrule.positions === null);
    });

    test("Parse BYSETPOS validates if negative values are not correct", function() {
        var rrule = parse("FREQ=MONTHLY;BYDAY=MO;BYSETPOS=1, -367, 3, 4");

        ok(rrule.positions === null);
    });

    test("Parse BYSETPOS validates if no other BYRule is used", function() {
        var rrule = parse("FREQ=MONTHLY;BYSETPOS=1");

        ok(rrule.positions === null);
    });

    test("Parse BYWEEKNO property when value is single number", function() {
        var rrule = parse("FREQ=YEARLY;BYWEEKNO=1");

        equal(rrule.weeks.length, 1);
        equal(rrule.weeks[0], 1);
    });

    test("Parse BYWEEKNO property when value is a list of numbers", function() {
        var rrule = parse("FREQ=YEARLY;BYWEEKNO=1, 2, 3, 4");

        equal(rrule.weeks.length, 4);
        equal(rrule.weeks[0], 1);
        equal(rrule.weeks[1], 2);
        equal(rrule.weeks[2], 3);
        equal(rrule.weeks[3], 4);
    });

    test("Parse BYWEEKNO validates if values are not correct", function() {
        var rrule = parse("FREQ=YEARLY;BYWEEKNO=1, 54, 3, 4");

        ok(rrule.weeks === null);
    });

    test("Parse WKST property", function() {
        var rrule = parse("FREQ=YEARLY;WKST=WE");

        equal(rrule.weekStart, 3);
    });

    test("Parse WKST validates if value is not correct", function() {
        var rrule = parse("FREQ=YEARLY;WKST=TT");

        equal(rrule.weekStart, kendo.culture().calendar.firstDay);
    });

    test("parseRule method sets default weekStart if not defined", function() {
        var rule = parse("FREQ=YEARLY");

        equal(rule.weekStart, kendo.culture().calendar.firstDay);
    });

    test("parseRule method sets interval", function() {
        var rule = parse("FREQ=YEARLY");

        equal(rule.interval, 1);
    });

    test("parseRule method returns null if FREQ is not defined", function() {
        var rule = parse("BYDAY=SU");

        equal(rule, null);
    });

    test("parseRule method returns null COUNT and UNTIL are defined together", function() {
        var rule = parse("FREQ=WEEKLY;UNTIL=20001020T100000Z;COUNT=10");

        equal(rule, null);
    });

})();
