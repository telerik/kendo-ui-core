(function() {
   var SchedulerEvent = kendo.data.SchedulerEvent,
        occurrences = kendo.recurrence.expand,
        expandAll = kendo.recurrence.expandAll,
        timezone = kendo.timezone;

    module("Cloning scheduler event");

    test("Expand method create occurrence from original event", function() {
        var schedulerEvent = new SchedulerEvent({
            id: 1,
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 11, 17)),
            event = events[1];

        equal(events.length, 2);
        notEqual(event.uid, schedulerEvent.uid);
        equal(event.title, schedulerEvent.title);
        equal(event.recurrenceRule, undefined);
        equal(event.recurrenceId, schedulerEvent.id);
        equal(event.start.getTime(), +new Date(2000, 10, 11, 16, 30));
        equal(event.end.getTime(), +new Date(2000, 10, 11, 17, 0));
    });

    module("HOURLY Occurrences");

    test("HOURLY occurrences method repeat event in one hour", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 0),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=HOURLY"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 10, 18));

        equal(events.length, 3);

        deepEqual(events[0].start, new Date(2000, 10, 10, 16, 0));
        equal(events[0]._startTime, kendo.date.toUtcTime(events[0].start));

        equal(events[1].start.getTime(), +new Date(2000, 10, 10, 17, 0));
        equal(events[1].end.getTime(), +new Date(2000, 10, 10, 18, 0));

        equal(events[2].start.getTime(), +new Date(2000, 10, 10, 18, 0));
        equal(events[2].end.getTime(), +new Date(2000, 10, 10, 19, 0));
    });

    test("HOURLY occurrences method repeat event every 2 hours", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2014, 2, 20, 8),
            end: new Date(2014, 2, 20, 9),
            recurrenceRule: "FREQ=HOURLY;INTERVAL=2"
        });

        var events = occurrences(schedulerEvent, new Date(2014, 2, 20), new Date(2014, 2, 21, 0));

        deepEqual(events[0].start, new Date(2014, 2, 20, 8));
        deepEqual(events[0].end, new Date(2014, 2, 20, 9));

        deepEqual(events[1].start, new Date(2014, 2, 20, 10));
        deepEqual(events[1].end, new Date(2014, 2, 20, 11));
    });

    test("HOURLY occurrences method repeat event every 3 hours", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 0),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=HOURLY;INTERVAL=3"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 10, 20));

        equal(events.length, 2);
        deepEqual(events[1].start, new Date(2000, 10, 10, 19, 0));
        deepEqual(events[1].end, new Date(2000, 10, 10, 20, 0));
    });

    test("HOURLY method limits BYHOUR", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 0),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=HOURLY;BYHOUR=10,19"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 10, 20));

        equal(events.length, 1);
        equal(events[0].start.getTime(), +new Date(2000, 10, 10, 19, 0));
        equal(events[0].end.getTime(), +new Date(2000, 10, 10, 20, 0));
    });

    test("HOURLY method limits BYHOUR and expands BYMINUTE", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 10, 0),
            end: new Date(2000, 10, 10, 11, 0),
            recurrenceRule: "FREQ=HOURLY;BYHOUR=10;BYMINUTE=20,40"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 10, 20));

        equal(events.length, 2);
        equal(events[0].start.getTime(), +new Date(2000, 10, 10, 10, 20));
        equal(events[0].end.getTime(), +new Date(2000, 10, 10, 11, 20));

        equal(events[1].start.getTime(), +new Date(2000, 10, 10, 10, 40));
        equal(events[1].end.getTime(), +new Date(2000, 10, 10, 11, 40));
    });

    test("HOURLY method limits BYHOUR and expands BYSECOND", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 10, 0),
            end: new Date(2000, 10, 10, 11, 0),
            recurrenceRule: "FREQ=HOURLY;BYHOUR=10;BYMINUTE=20,40;BYSECOND=30"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 10, 20));

        equal(events.length, 2);
        equal(events[0].start.getTime(), +new Date(2000, 10, 10, 10, 20, 30));
        equal(events[0].end.getTime(), +new Date(2000, 10, 10, 11, 20, 30));

        equal(events[1].start.getTime(), +new Date(2000, 10, 10, 10, 40, 30));
        equal(events[1].end.getTime(), +new Date(2000, 10, 10, 11, 40, 30));
    });

    test("HOURLY method limits BYDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 10, 10, 0),
            end: new Date(2013, 4, 10, 11, 0),
            recurrenceRule: "FREQ=HOURLY;BYDAY=WE"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 10, 0, 0), new Date(2013, 4, 15, 1, 30));

        equal(events.length, 2);
        equal(events[0].start.getTime(), +new Date(2013, 4, 15));
        equal(events[0].end.getTime(), +new Date(2013, 4, 15, 1));

        equal(events[1].start.getTime(), +new Date(2013, 4, 15, 1));
        equal(events[1].end.getTime(), +new Date(2013, 4, 15, 2));
    });

    test("HOURLY method limits BYDAY and expands BYHOUR", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 10, 10, 0),
            end: new Date(2013, 4, 10, 11, 0),
            recurrenceRule: "FREQ=HOURLY;BYDAY=WE;BYHOUR=8,10"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 10, 0, 0), new Date(2013, 4, 15, 10, 0));

        equal(events.length, 2);
        equal(events[0].start.getTime(), +new Date(2013, 4, 15, 8));
        equal(events[0].end.getTime(), +new Date(2013, 4, 15, 9));

        equal(events[1].start.getTime(), +new Date(2013, 4, 15, 10));
        equal(events[1].end.getTime(), +new Date(2013, 4, 15, 11));
    });

    test("HOURLY method limits BYMONTHDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 10, 10, 0),
            end: new Date(2013, 4, 10, 11, 0),
            recurrenceRule: "FREQ=HOURLY;BYMONTHDAY=15"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 10, 0, 0), new Date(2013, 4, 15));

        equal(events.length, 1);
        equal(events[0].start.getTime(), +new Date(2013, 4, 15, 0));
        equal(events[0].end.getTime(), +new Date(2013, 4, 15, 1));
    });

    test("HOURLY method limits BYMONTHDAY and expands BYHOUR", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 10, 10, 0),
            end: new Date(2013, 4, 10, 11, 0),
            recurrenceRule: "FREQ=HOURLY;BYMONTHDAY=15;BYHOUR=8,10"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 10, 0, 0), new Date(2013, 4, 15, 10, 0));

        equal(events.length, 2);
        equal(events[0].start.getTime(), +new Date(2013, 4, 15, 8));
        equal(events[0].end.getTime(), +new Date(2013, 4, 15, 9));

        equal(events[1].start.getTime(), +new Date(2013, 4, 15, 10));
        equal(events[1].end.getTime(), +new Date(2013, 4, 15, 11));
    });

    test("HOURLY method limits BYMONTH", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 10, 10, 0),
            end: new Date(2013, 4, 10, 11, 0),
            recurrenceRule: "FREQ=HOURLY;BYMONTH=6"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 10, 0, 0), new Date(2013, 5, 1, 0, 30));

        equal(events.length, 1);
        equal(events[0].start.getTime(), +new Date(2013, 5, 1));
        equal(events[0].end.getTime(), +new Date(2013, 5, 1, 1));
    });

    test("HOURLY method limits BYYEARDAY and expands BYHOUR", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 10, 10, 0),
            end: new Date(2013, 4, 10, 11, 0),
            recurrenceRule: "FREQ=HOURLY;BYYEARDAY=135;BYHOUR=8,10"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 10, 0, 0), new Date(2013, 4, 15, 10, 0));

        equal(events.length, 2);
        equal(events[0].start.getTime(), +new Date(2013, 4, 15, 8));
        equal(events[0].end.getTime(), +new Date(2013, 4, 15, 9));

        equal(events[1].start.getTime(), +new Date(2013, 4, 15, 10));
        equal(events[1].end.getTime(), +new Date(2013, 4, 15, 11));
    });

    test("HOURLY method honours DST", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 2, 31, 2, 0),
            end: new Date(2013, 2, 31, 2, 30),
            recurrenceRule: "FREQ=HOURLY;COUNT=3"
        }),
        afterDstDate = new Date(2013, 2, 31, 3);

        var events = occurrences(schedulerEvent, new Date(2013, 2, 31), new Date(2013, 3, 1));
        var event = events[1];

        equal(event.start.getHours(), afterDstDate.getHours());
        equal(event.start.getMinutes(), 0);
        equal(event.end.getHours(), afterDstDate.getHours());
        equal(event.end.getMinutes(), 30);

        var startTime = kendo.date.toUtcTime(kendo.date.getDate(event.start)) + (3 * kendo.date.MS_PER_HOUR);
        var endTime = startTime + (30 * kendo.date.MS_PER_MINUTE);

        equal(events[1]._startTime, startTime);
        equal(events[1]._endTime, endTime);

        equal(events[2].start.getHours(), 4);
        equal(events[2].start.getMinutes(), 0);
        equal(events[2].end.getHours(), 4);
        equal(events[2].end.getMinutes(), 30);
    });

    test("HOURLY method honours DST when INTERVAL rule is used", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2014, 2, 30, 2),
            end: new Date(2014, 2, 30, 2),
            recurrenceRule: "FREQ=HOURLY;INTERVAL=5"
        });

        var events = occurrences(schedulerEvent, new Date(2014, 2, 30), new Date(2014, 2, 30, 12));

        equal(events.length, 3);

        deepEqual(events[0].start, new Date(2014, 2, 30, 2));
        deepEqual(events[1].start, new Date(2014, 2, 30, 7));
        deepEqual(events[2].start, new Date(2014, 2, 30, 12));
    });

    tzTest("Brazil", "Hourly method honours DST", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 9, 19, 0, 0),
            end: new Date(2013, 9, 19, 1, 0),
            recurrenceRule: "FREQ=HOURLY;BYHOUR=0"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 9, 19, 10), new Date(2013, 9, 20, 3));

        equal(events[0].start.getHours(), 1);
        equal(events[0].end.getHours(), 2);
    });

    module("DAILY Occurrences");
    test("DAILY occurrences method returns one occurrence (FREQ: DAILY)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 11, 17));

        equal(events.length, 2);
        equal(events[1].start.getTime(), +new Date(2000, 10, 11, 16, 30));
        equal(events[1].end.getTime(), +new Date(2000, 10, 11, 17, 0));
    });
    test("DAILY occurrences method returns multiple occurrences (FREQ: DAILY)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 16, 17));

        equal(events.length, 7);
        equal(events[1].start.getTime(), +new Date(2000, 10, 11, 16, 30));
        equal(events[1].end.getTime(), +new Date(2000, 10, 11, 17, 0));

        equal(events[6].start.getTime(), +new Date(2000, 10, 16, 16, 30));
        equal(events[6].end.getTime(), +new Date(2000, 10, 16, 17, 0));
    });

    test("DAILY occurrences method expands a date in DST with INTERVAL rule", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2014, 2, 30),
            end: new Date(2014, 2, 30),
            isAllDay: true,
            recurrenceRule: "FREQ=DAILY;INTERVAL=3"
        });

        var events = occurrences(schedulerEvent, new Date(2014, 2, 30), new Date(2014, 3, 6));

        equal(events.length, 3);

        deepEqual(events[1].start, new Date(2014, 3, 2));
        deepEqual(events[2].start, new Date(2014, 3, 5));
    });

    test("DAILY occurrences method expands a date in DST with INTERVAL rule (before 1970)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(1960, 2, 27),
            end: new Date(1960, 2, 27),
            isAllDay: true,
            recurrenceRule: "FREQ=DAILY;INTERVAL=3"
        });

        var events = occurrences(schedulerEvent, new Date(1960, 2, 27), new Date(1960, 3, 6));

        deepEqual(events[1].start, new Date(1960, 2, 30));
        deepEqual(events[2].start, new Date(1960, 3, 2));
    });

    test("DAILY occurrences method honours interval recurrence (FREQ: DAILY)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;INTERVAL=2"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 16, 17));

        equal(events.length, 4);

        equal(events[1].start.getTime(), +new Date(2000, 10, 12, 16, 30));
        equal(events[1].end.getTime(), +new Date(2000, 10, 12, 17, 0));

        equal(events[3].start.getTime(), +new Date(2000, 10, 16, 16, 30));
        equal(events[3].end.getTime(), +new Date(2000, 10, 16, 17, 0));
    });

    test("DAILY occurrences method honours COUNT", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;COUNT=2"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 16));

        equal(events.length, 2);

        equal(events[1].start.getTime(), +new Date(2000, 10, 11, 16, 30));
        equal(events[1].end.getTime(), +new Date(2000, 10, 11, 17, 0));
    });

    test("DAILY occurrences with COUNT return empty array", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;COUNT=2"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 14), new Date(2000, 10, 16));

        equal(events.length, 0);
    });

    test("DAILY occurrences method honours UNTIL", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 9, 16, 30),
            end: new Date(2000, 10, 9, 17, 0),
            recurrenceRule: "FREQ=DAILY;UNTIL=20001111T090000"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 16));

        equal(events.length, 1);

        equal(events[0].start.getTime(), +new Date(2000, 10, 10, 16, 30));
        equal(events[0].end.getTime(), +new Date(2000, 10, 10, 17, 0));
    });

    test("DAILY occurrences method returns only the event if not valid recurrence", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "UNTIL=20001111T090000"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 16));

        equal(events.length, 1);
    });

    test("DAILY occurrences method returns and empty array if range is before the event", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;UNTIL=20001111T090000"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 9, 12), new Date(2000, 9, 16));

        equal(events.length, 0);
    });

    test("DAILY occurrences method limits BYMONTH", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYMONTH=11"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 30), new Date(2000, 11, 1, 17));

        equal(events.length, 1);
        equal(events[0].start.getTime(), +new Date(2000, 10, 30, 16, 30));
        equal(events[0].end.getTime(), +new Date(2000, 10, 30, 17, 0));
    });

    test("DAILY occurrences method limits BYMONTHDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYMONTHDAY=10,13,15"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 16));

        equal(events.length, 3);

        equal(events[1].start.getTime(), +new Date(2000, 10, 13, 16, 30));
        equal(events[1].end.getTime(), +new Date(2000, 10, 13, 17, 0));

        equal(events[2].start.getTime(), +new Date(2000, 10, 15, 16, 30));
        equal(events[2].end.getTime(), +new Date(2000, 10, 15, 17, 0));
    });

    test("DAILY occurrences method limits BYMONTHDAY (-3, 10)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 10, 16, 30),
            end: new Date(2013, 4, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYMONTHDAY=-3,10"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 1), new Date(2013, 4, 30));

        equal(events.length, 2);

        equal(events[1].start.getTime(), +new Date(2013, 4, 27, 16, 30));
        equal(events[1].end.getTime(), +new Date(2013, 4, 27, 17, 0));
    });

    test("DAILY occurrences method limits BYDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYDAY=SU, MO"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 13, 17));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2000, 10, 12, 16, 30));
        equal(events[0].end.getTime(), +new Date(2000, 10, 12, 17, 0));

        equal(events[1].start.getTime(), +new Date(2000, 10, 13, 16, 30));
        equal(events[1].end.getTime(), +new Date(2000, 10, 13, 17, 0));
    });

    test("DAILY occurrences method limits BYDAY (3FR)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYDAY=3FR"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 13));

        equal(events.length, 0);
    });

    test("DAILY occurrences method limits BYDAY (3TH)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 10, 16, 30),
            end: new Date(2013, 4, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYDAY=3TH"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 10), new Date(2013, 4, 17));

        equal(events.length, 1);
        equal(events[0].start.getTime(), +new Date(2013, 4, 16, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 4, 16, 17, 0));
    });

    test("DAILY occurrences method limits BYDAY (-3FR)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 10, 16, 30),
            end: new Date(2013, 4, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYDAY=-3FR"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 10), new Date(2013, 4, 24));

        equal(events.length, 1);

        equal(events[0].start.getTime(), +new Date(2013, 4, 17, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 4, 17, 17, 0));
    });

    test("DAILY occurrences method returns empty array if no such day", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 10, 16, 30),
            end: new Date(2013, 4, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYDAY=5FR"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 10), new Date(2013, 4, 24));

        equal(events.length, 0);
    });

    test("DAILY occurrences method honours INTERVAL=2", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 10, 16, 30),
            end: new Date(2013, 4, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;INTERVAL=2"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 10), new Date(2013, 4, 17));
        equal(events.length, 4);
    });

    test("DAILY occurrences method honours BYDAY and INTERVAL", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 4, 17, 16, 30),
            end: new Date(2013, 4, 17, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYDAY=TU,TH;INTERVAL=2;"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 17), new Date(2013, 5, 8));
        equal(events.length, 4);

        equal(events[0].start.getTime(), +new Date(2013, 4, 21, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 4, 21, 17, 0));

        equal(events[1].start.getTime(), +new Date(2013, 4, 23, 16, 30));
        equal(events[1].end.getTime(), +new Date(2013, 4, 23, 17, 0));

        equal(events[2].start.getTime(), +new Date(2013, 5, 4, 16, 30));
        equal(events[2].end.getTime(), +new Date(2013, 5, 4, 17, 0));

        equal(events[3].start.getTime(), +new Date(2013, 5, 6, 16, 30));
        equal(events[3].end.getTime(), +new Date(2013, 5, 6, 17, 0));
    });

    test("DAILY occurrences with INTERVAL starts recurring from event.start", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;INTERVAL=6"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 12), new Date(2000, 10, 18));

        equal(events.length, 1);
        equal(events[0].start.getTime(), new Date(2000, 10, 16, 16, 30).getTime());
    });

    test("DAILY limit by BYMONTH and BYDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYMONTH=6;BYDAY=TU,TH"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 24), new Date(2013, 6, 10, 17));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 5, 25, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 5, 25, 17, 0));

        equal(events[1].start.getTime(), +new Date(2013, 5, 27, 16, 30));
        equal(events[1].end.getTime(), +new Date(2013, 5, 27, 17, 0));
    });

    test("DAILY expands BYHOUR", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYHOUR=8,18"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 5, 11, 17));

        equal(events.length, 3);

        equal(events[0].start.getTime(), +new Date(2013, 5, 10, 8, 30));
        equal(events[0].end.getTime(), +new Date(2013, 5, 10, 9, 0));

        equal(events[1].start.getTime(), +new Date(2013, 5, 10, 18, 30));
        equal(events[1].end.getTime(), +new Date(2013, 5, 10, 19, 0));

        equal(events[2].start.getTime(), +new Date(2013, 5, 11, 8, 30));
        equal(events[2].end.getTime(), +new Date(2013, 5, 11, 9, 0));
    });

    test("DAILY expands BYHOUR and BYMINUTE", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYHOUR=8;BYMINUTE=15,45"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 5, 11, 17));

        equal(events.length, 4);

        equal(events[0].start.getTime(), +new Date(2013, 5, 10, 8, 15));
        equal(events[0].end.getTime(), +new Date(2013, 5, 10, 8, 45));

        equal(events[1].start.getTime(), +new Date(2013, 5, 10, 8, 45));
        equal(events[1].end.getTime(), +new Date(2013, 5, 10, 9, 15));

        equal(events[2].start.getTime(), +new Date(2013, 5, 11, 8, 15));
        equal(events[2].end.getTime(), +new Date(2013, 5, 11, 8, 45));

        equal(events[3].start.getTime(), +new Date(2013, 5, 11, 8, 45));
        equal(events[3].end.getTime(), +new Date(2013, 5, 11, 9, 15));
    });

    test("DAILY expands BYHOUR and BYMINUTE (honours start hours and minutes)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYHOUR=16;BYMINUTE=15,45"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 5, 10, 17));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 5, 10, 16, 15));
        equal(events[0].end.getTime(), +new Date(2013, 5, 10, 16, 45));

        equal(events[1].start.getTime(), +new Date(2013, 5, 10, 16, 45));
        equal(events[1].end.getTime(), +new Date(2013, 5, 10, 17, 15));
    });

    test("DAILY expands BYHOUR and BYMINUTE (BYHOUR === current hour and minute < current minute)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYHOUR=16;BYMINUTE=15"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 5, 11, 17));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 5, 10, 16, 15));
        equal(events[0].end.getTime(), +new Date(2013, 5, 10, 16, 45));

        equal(events[1].start.getTime(), +new Date(2013, 5, 11, 16, 15));
        equal(events[1].end.getTime(), +new Date(2013, 5, 11, 16, 45));
    });

    test("DAILY expands BYMINUTE", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYMINUTE=15"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 5, 10), new Date(2000, 5, 10, 19));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2000, 5, 10, 17, 15));
        equal(events[0].end.getTime(), +new Date(2000, 5, 10, 17, 45));

        equal(events[1].start.getTime(), +new Date(2000, 5, 10, 18, 15));
        equal(events[1].end.getTime(), +new Date(2000, 5, 10, 18, 45));
    });

    test("DAILY expands BYHOUR and BYMINUTE (two minute rules)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYHOUR=17;BYMINUTE=20,40"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 5, 10, 17, 50));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 5, 10, 17, 20));
        equal(events[0].end.getTime(), +new Date(2013, 5, 10, 17, 50));

        equal(events[1].start.getTime(), +new Date(2013, 5, 10, 17, 40));
        equal(events[1].end.getTime(), +new Date(2013, 5, 10, 18, 10));
    });

    test("DAILY expands BYSECONDS", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYSECOND=20,40"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 5, 10, 16, 31));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 5, 10, 16, 30, 20));
        equal(events[0].end.getTime(), +new Date(2013, 5, 10, 17, 0, 20));

        equal(events[1].start.getTime(), +new Date(2013, 5, 10, 16, 30, 40));
        equal(events[1].end.getTime(), +new Date(2013, 5, 10, 17, 0, 40));
    });

    test("DAILY expands BYMINUTE and BYSECOND", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30, 40),
            end: new Date(2000, 5, 10, 17, 0, 40),
            recurrenceRule: "FREQ=DAILY;BYMINUTE=40;BYSECOND=40"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 5, 10, 16, 50));

        equal(events.length, 1);

        equal(events[0].start.getTime(), +new Date(2013, 5, 10, 16, 40, 40));
        equal(events[0].end.getTime(), +new Date(2013, 5, 10, 17, 10, 40));
    });

    test("DAILY expands BYMINUTE and BYSECOND (two second rules)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30, 40),
            end: new Date(2000, 5, 10, 17, 0, 40),
            recurrenceRule: "FREQ=DAILY;BYMINUTE=40;BYSECOND=20,40"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 5, 10, 16, 50));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 5, 10, 16, 40, 20));
        equal(events[0].end.getTime(), +new Date(2013, 5, 10, 17, 10, 20));

        equal(events[1].start.getTime(), +new Date(2013, 5, 10, 16, 40, 40));
        equal(events[1].end.getTime(), +new Date(2013, 5, 10, 17, 10, 40));
    });

    test("DAILY expands BYDAY and BYHOUR", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=DAILY;BYDAY=TU;BYHOUR=10, 12"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 5, 11, 16, 50));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 5, 11, 10, 30));
        equal(events[0].end.getTime(), +new Date(2013, 5, 11, 11));

        equal(events[1].start.getTime(), +new Date(2013, 5, 11, 12, 30));
        equal(events[1].end.getTime(), +new Date(2013, 5, 11, 13));
    });

    test("DAILY honours BYSETPOS", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 10, 30),
            end: new Date(2000, 5, 10, 11, 0),
            recurrenceRule: "FREQ=DAILY;BYHOUR=10,12,16,18,20;BYSETPOS=1,3,5"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 5, 10, 23));

        equal(events.length, 3);

        deepEqual(events[0].start, new Date(2013, 5, 10, 10, 30));
        deepEqual(events[0].end, new Date(2013, 5, 10, 11));

        deepEqual(events[1].start, new Date(2013, 5, 10, 16, 30));
        deepEqual(events[1].end, new Date(2013, 5, 10, 17));

        deepEqual(events[2].start, new Date(2013, 5, 10, 20, 30));
        deepEqual(events[2].end, new Date(2013, 5, 10, 21));
    });

    test("DAILY starts from event start", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 3, 16, 30),
            end: new Date(2013, 0, 3, 17, 0),
            recurrenceRule: "FREQ=DAILY"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 0, 1), new Date(2013, 0, 4, 17));

        equal(events.length, 2);
    });

    test("DAILY occurrences honours DST", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 2, 30, 16, 30),
            end: new Date(2013, 2, 30, 17, 0),
            recurrenceRule: "FREQ=DAILY"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 2, 30), new Date(2013, 3, 1, 17));

        equal(events.length, 3);

        equal(events[1].start.getTime(), +new Date(2013, 2, 31, 16, 30));
        equal(events[1].end.getTime(), +new Date(2013, 2, 31, 17, 0));

        equal(events[2].start.getTime(), +new Date(2013, 3, 1, 16, 30));
        equal(events[2].end.getTime(), +new Date(2013, 3, 1, 17, 0));
    });

    test("DAILY occurrences creates date when it is not possible", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 2, 29, 3, 0),
            end: new Date(2013, 2, 29, 4, 0),
            recurrenceRule: "FREQ=DAILY"
        }),
        afterDstDate = new Date(2013, 2, 31, 3);

        var events = occurrences(schedulerEvent, new Date(2013, 2, 29), new Date(2013, 3, 1, 17));

        equal(events[1].start.getHours(), 3);
        equal(events[1]._startTime, kendo.date.toUtcTime(events[1].start));

        equal(events[2].start.getHours(), afterDstDate.getHours());

        var startTime = kendo.date.toUtcTime(kendo.date.getDate(events[2].start)) + (3 * kendo.date.MS_PER_HOUR);
        equal(events[2]._startTime, startTime);

        equal(events[3].start.getHours(), 3);
        equal(events[3]._startTime, kendo.date.toUtcTime(events[3].start));
    });

    test("DAILY method honours EEST when calculate duration", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 9, 27, 0, 0),
            end: new Date(2013, 9, 27, 10, 0),
            recurrenceRule: "FREQ=DAILY"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 9, 27), new Date(2013, 9, 28, 17));
        var startTime = kendo.date.toUtcTime(kendo.date.getDate(events[0].start));

        equal(events[0].start.getHours(), 0);
        equal(events[0]._startTime, startTime);

        equal(events[0].end.getHours(), 10);
        equal(events[0]._endTime, startTime + (10 * kendo.date.MS_PER_HOUR));
    });

    test("DAILY method honours EST when calculate duration", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 2, 31, 0, 0),
            end: new Date(2013, 2, 31, 10, 0),
            recurrenceRule: "FREQ=DAILY"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 2, 29), new Date(2013, 3, 1, 17));
        var startTime = kendo.date.toUtcTime(kendo.date.getDate(events[0].start));

        equal(events[0].start.getHours(), 0);
        equal(events[0]._startTime, startTime);

        equal(events[0].end.getHours(), 10);
        equal(events[0]._endTime, startTime + (10 * kendo.date.MS_PER_HOUR));
    });

    test("DAILY method honours DTSTART", function() {
        var date = new Date(2013, 2, 31, 8, 0);

        date = kendo.timezone.convert(date, date.getTimezoneOffset(), "Etc/UTC");

        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 2, 31, 0, 0),
            end: new Date(2013, 2, 31, 10, 0),
            recurrenceRule: "DTSTART:" + kendo.toString(date, "yyyyMMddTHHmmssZ") + " RRULE:FREQ=DAILY"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 2, 29), new Date(2013, 3, 1, 17));
        var startTime = kendo.date.toUtcTime(events[0].start);

        equal(events[0].start.getHours(), 8);
        equal(events[0]._startTime, startTime);

        equal(events[0].end.getHours(), 10);
        equal(events[0]._endTime, startTime + (2 * kendo.date.MS_PER_HOUR));
    });

    test("DAILY method honours DTEND", function() {
        var date = new Date(2013, 2, 31, 8, 0);

        date = kendo.timezone.convert(date, date.getTimezoneOffset(), "Etc/UTC");

        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 2, 31, 0, 0),
            end: new Date(2013, 2, 31, 10, 0),
            recurrenceRule: "DTEND:" + kendo.toString(date, "yyyyMMddTHHmmssZ") + " RRULE:FREQ=DAILY"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 2, 29), new Date(2013, 3, 1, 17));
        var startTime = kendo.date.toUtcTime(kendo.date.getDate(events[0].start));

        equal(events[0].start.getHours(), 0);
        equal(events[0]._startTime, startTime);

        equal(events[0].end.getHours(), 8);
        equal(events[0]._endTime, startTime + (8 * kendo.date.MS_PER_HOUR));
    });

    test("DAILY occurrences method honours", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "DTSTART;VALUE=DATE:20001010T070000Z DTEND;VALUE=DATE:20001010T080000Z FREQ=DAILY"
        });

        var events = schedulerEvent.expand(new Date(2000, 10, 11), new Date(2000, 10, 11, 17), "Etc/UTC");

        deepEqual(events[0].start, new Date(2000, 10, 11, 7));
        deepEqual(events[0].end, new Date(2000, 10, 11, 8));
    });

    tzTest("Brazil", "DAILY method honours DST", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 9, 19, 0, 0),
            end: new Date(2013, 9, 19, 1, 0),
            recurrenceRule: "FREQ=DAILY"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 9, 10), new Date(2013, 9, 21, 17));

        var startTime = kendo.date.toUtcTime(kendo.date.getDate(events[0].start));

        equal(events[0].start.getHours(), 0);
        equal(events[0]._startTime, startTime);

        equal(events[0].end.getHours(), 1);
        equal(events[0]._endTime, startTime + kendo.date.MS_PER_HOUR);

        startTime = kendo.date.toUtcTime(kendo.date.getDate(events[1].start));

        equal(events[1].start.getHours(), 1);
        equal(events[1]._startTime, startTime);

        equal(events[1].end.getHours(), 2);
        equal(events[1]._endTime, startTime + kendo.date.MS_PER_HOUR);
    });

    tzTest("Brazil", "DAILY method honours DST when use BYMONTHDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 9, 19, 0, 0),
            end: new Date(2013, 9, 19, 1, 0),
            recurrenceRule: "FREQ=DAILY;BYMONTHDAY=20"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 9, 10), new Date(2013, 10, 21, 17));

        var startTime = kendo.date.toUtcTime(kendo.date.getDate(events[0].start));

        equal(events[0].start.getHours(), 1);
        equal(events[0]._startTime, startTime);

        equal(events[0].end.getHours(), 2);
        equal(events[0]._endTime, startTime + kendo.date.MS_PER_HOUR);

        startTime = kendo.date.toUtcTime(kendo.date.getDate(events[1].start));

        equal(events[1].start.getHours(), 0);
        equal(events[1]._startTime, startTime);

        equal(events[1].end.getHours(), 1);
        equal(events[1]._endTime, startTime + kendo.date.MS_PER_HOUR);
    });

    module("WEEKLY Occurrences");
    test("WEEKLY occurrences method returns one event for each new week", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 11, 10));

        equal(events.length, 5);

        equal(events[1].start.getTime(), +new Date(2000, 10, 17, 16, 30));
        equal(events[1].end.getTime(), +new Date(2000, 10, 17, 17, 0));

        equal(events[2].start.getTime(), +new Date(2000, 10, 24, 16, 30));
        equal(events[2].end.getTime(), +new Date(2000, 10, 24, 17, 0));

        equal(events[3].start.getTime(), +new Date(2000, 11, 1, 16, 30));
        equal(events[3].end.getTime(), +new Date(2000, 11, 1, 17, 0));

        equal(events[4].start.getTime(), +new Date(2000, 11, 8, 16, 30));
        equal(events[4].end.getTime(), +new Date(2000, 11, 8, 17, 0));
    });

    test("WEEKLY occurrences method retrieves correct BYDAY if there is no one", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 8, 10, 16, 30),
            end: new Date(2013, 8, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 8, 16), new Date(2013, 8, 20));

        equal(events.length, 1);

        equal(events[0].start.getTime(), +new Date(2013, 8, 17, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 8, 17, 17, 0));
    });

    test("WEEKLY occurrences method honours BYDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 10, 10, 16, 30),
            end: new Date(2000, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=SU,MO"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 10, 10), new Date(2000, 10, 25));

        equal(events.length, 4);
        equal(events[0].start.getTime(), +new Date(2000, 10, 12, 16, 30));
        equal(events[0].end.getTime(), +new Date(2000, 10, 12, 17, 0));

        equal(events[1].start.getTime(), +new Date(2000, 10, 13, 16, 30));
        equal(events[1].end.getTime(), +new Date(2000, 10, 13, 17, 0));

        equal(events[2].start.getTime(), +new Date(2000, 10, 19, 16, 30));
        equal(events[2].end.getTime(), +new Date(2000, 10, 19, 17, 0));

        equal(events[3].start.getTime(), +new Date(2000, 10, 20, 16, 30));
        equal(events[3].end.getTime(), +new Date(2000, 10, 20, 17, 0));
    });

    test("WEEKLY freq with WKST=1 returns empty array if BYDAY is not satisfied ", function() {
        kendo.culture("nb-NO");

        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 05, 16, 8, 30),
            end: new Date(2013, 05, 16, 9, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;WKST=1"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 05, 16), new Date(2013, 05, 16, 23, 59, 59));

        equal(events.length, 0);

        kendo.culture("en-US");
    });

    test("WEEKLY occurrences method honours INTERVAL", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 10, 16, 30),
            end: new Date(2013, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=TU,FR;INTERVAL=2"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 10), new Date(2013, 10, 27));

        equal(events.length, 3);
        equal(events[0].start.getTime(), +new Date(2013, 10, 12, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 10, 12, 17, 0));

        equal(events[1].start.getTime(), +new Date(2013, 10, 15, 16, 30));
        equal(events[1].end.getTime(), +new Date(2013, 10, 15, 17, 0));

        equal(events[2].start.getTime(), +new Date(2013, 10, 26, 16, 30));
        equal(events[2].end.getTime(), +new Date(2013, 10, 26, 17, 0));
    });

    test("WEEKLY occurrences method honours INTERVAL=3", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 10, 16, 30),
            end: new Date(2013, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=TU,FR;INTERVAL=3"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 10), new Date(2013, 10, 27));
        equal(events.length, 2);
    });

    test("WEEKLY occurrences method honours COUNT=1", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 10, 16, 30),
            end: new Date(2013, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=TU,FR;INTERVAL=2;COUNT=1"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 10), new Date(2013, 10, 27));

        equal(events.length, 1);
        equal(events[0].start.getTime(), +new Date(2013, 10, 12, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 10, 12, 17, 0));
    });

    test("WEEKLY occurrences method honours COUNT=5", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 10, 16, 30),
            end: new Date(2013, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=TU,FR;INTERVAL=2;COUNT=5"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 10), new Date(2014, 10, 27));

        equal(events.length, 5);
    });

    test("WEEKLY occurrences method honours UNTIL", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 10, 16, 30),
            end: new Date(2013, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=TU,FR;INTERVAL=2;UNTIL=20131126T000000"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 10), new Date(2013, 10, 27));

        equal(events.length, 2);
    });

    test("WEEKLY occurrences method returns ", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 10, 16, 30),
            end: new Date(2013, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=TU,FR;INTERVAL=2"
        });

        var events = occurrences(schedulerEvent, new Date(2010, 10, 10), new Date(2010, 10, 27));

        equal(events.length, 0);
    });

    test("WEEKLY occurrences method starts from second day of BYDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 25, 16, 30),
            end: new Date(2013, 10, 25, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=TU,FR"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 27), new Date(2013, 10, 30));

        equal(events.length, 1);
        equal(events[0].start.getTime(), +new Date(2013, 10, 29, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 10, 29, 17, 0));
    });

    test("WEEKLY occurrence method limits by BYMONTH=12 and INTERVAL=2", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 25, 16, 30),
            end: new Date(2013, 10, 25, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=TU,FR;BYMONTH=12;INTERVAL=2"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 27), new Date(2014, 0, 1));

        equal(events.length, 4);
        deepEqual(events[0].start, new Date(2013, 11, 10, 16, 30));
        deepEqual(events[1].start, new Date(2013, 11, 13, 16, 30));
        deepEqual(events[2].start, new Date(2013, 11, 24, 16, 30));
        deepEqual(events[3].start, new Date(2013, 11, 27, 16, 30));
    });

    test("WEEKLY occurrence method limits by BYMONTH=11,12", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 25, 16, 30),
            end: new Date(2013, 10, 25, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=FR;BYMONTH=11, 12"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 27), new Date(2014, 0, 1));

        equal(events.length, 5);
    });

    test("WEEKLY occurrences method honours BYDAY=5FR,-3TU", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 10, 16, 30),
            end: new Date(2013, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=5FR,-3TU;WKST=SU"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 10), new Date(2013, 11, 1));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 10, 12, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 10, 12, 17, 0));

        equal(events[1].start.getTime(), +new Date(2013, 10, 29, 16, 30));
        equal(events[1].end.getTime(), +new Date(2013, 10, 29, 17, 0));
    });

    test("WEEKLY method expands by BYDAY and offset (future period)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 6, 7, 16, 30),
            end: new Date(2013, 6, 7, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=2SU;WKST=SU"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 7, 4), new Date(2013, 7, 11));

        equal(events.length, 0);
    });

    test("WEEKLY method expands when the first wednesday is in the second week", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 5, 5, 16, 30),
            end: new Date(2013, 5, 5, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=1WE;WKST=SU"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 5), new Date(2013, 5, 6));

        equal(events.length, 1);
    });

    test("WEEKLY occurrences expand BYHOUR", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 10, 16, 30),
            end: new Date(2013, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=FR;BYHOUR=12,14"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 10), new Date(2013, 10, 16));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 10, 15, 12, 30));
        equal(events[0].end.getTime(), +new Date(2013, 10, 15, 13, 0));

        equal(events[1].start.getTime(), +new Date(2013, 10, 15, 14, 30));
        equal(events[1].end.getTime(), +new Date(2013, 10, 15, 15, 0));
    });

    test("WEEKLY occurrences expand BYHOUR and BYMINUTE", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 10, 16, 30),
            end: new Date(2013, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=FR;BYHOUR=12,14;BYMINUTE=20"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 10), new Date(2013, 10, 16));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 10, 15, 12, 20));
        equal(events[0].end.getTime(), +new Date(2013, 10, 15, 12, 50));

        equal(events[1].start.getTime(), +new Date(2013, 10, 15, 14, 20));
        equal(events[1].end.getTime(), +new Date(2013, 10, 15, 14, 50));
    });

    test("WEEKLY occurrences expand BYHOUR and BYMINUTE and BYSECOND", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 10, 16, 30),
            end: new Date(2013, 10, 10, 17, 0),
            recurrenceRule: "FREQ=WEEKLY;BYDAY=FR;BYHOUR=12,14;BYMINUTE=20;BYSECOND=30"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 10), new Date(2013, 10, 16));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 10, 15, 12, 20, 30));
        equal(events[0].end.getTime(), +new Date(2013, 10, 15, 12, 50, 30));

        equal(events[1].start.getTime(), +new Date(2013, 10, 15, 14, 20, 30));
        equal(events[1].end.getTime(), +new Date(2013, 10, 15, 14, 50, 30));
    });

    tzTest("Sofia", "WEEKLY occurrence sets startTime correctly", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 2, 24, 3, 0),
            end: new Date(2013, 2, 24, 4, 0),
            recurrenceRule: "FREQ=WEEKLY"
        }),
        afterDstDate = new Date(2013, 2, 31, 3),
        endHour = afterDstDate.getHours() < 3 ? 2 : 5;

        var events = occurrences(schedulerEvent, new Date(2013, 2, 20), new Date(2013, 3, 10));

        var startTime = kendo.date.toUtcTime(kendo.date.getDate(events[1].start)) + (3 * kendo.date.MS_PER_HOUR);

        equal(events[1].start.getHours(), afterDstDate.getHours());
        equal(events[1]._startTime, startTime);

        equal(events[1].end.getHours(), endHour);
        equal(events[1]._endTime, startTime + kendo.date.MS_PER_HOUR);

        startTime = kendo.date.toUtcTime(kendo.date.getDate(events[2].start)) + (3 * kendo.date.MS_PER_HOUR);

        equal(events[2].start.getHours(), 3);
        equal(events[2]._startTime, startTime);

        equal(events[2].end.getHours(), 4);
        equal(events[2]._endTime, startTime + kendo.date.MS_PER_HOUR);
    });

    test("WEEKLY occurrence expands correctly when period is between event length", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date("2013/6/13 17:00"),
            end: new Date("2013/6/15 18:30"),
            recurrenceRule: "FREQ=WEEKLY"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 14), new Date(2013, 5, 15));

        equal(events.length, 1);
    });

    test("WEEKLY expands correctly with interval and MO wkst option", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date("1997/8/5 09:00"),
            end: new Date("1997/8/5 09:30"),
            recurrenceRule: "FREQ=WEEKLY;INTERVAL=2;COUNT=4;BYDAY=TU,SU;WKST=MO"
        });

        var events = occurrences(schedulerEvent, new Date(1997, 7, 5), new Date(1997, 8, 5));

        deepEqual(events[0].start, new Date(1997, 7, 5, 9));
        deepEqual(events[1].start, new Date(1997, 7, 10, 9));
        deepEqual(events[2].start, new Date(1997, 7, 19, 9));
        deepEqual(events[3].start, new Date(1997, 7, 24, 9));
    });

    test("WEEKLY expands correctly with interval and SU wkst option", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date("1997/8/5 09:00"),
            end: new Date("1997/8/5 09:30"),
            recurrenceRule: "FREQ=WEEKLY;INTERVAL=2;COUNT=4;BYDAY=TU,SU;WKST=SU"
        });

        var events = occurrences(schedulerEvent, new Date(1997, 7, 5), new Date(1997, 8, 5));

        deepEqual(events[0].start, new Date(1997, 7, 5, 9));
        deepEqual(events[1].start, new Date(1997, 7, 17, 9));
        deepEqual(events[2].start, new Date(1997, 7, 19, 9));
        deepEqual(events[3].start, new Date(1997, 7, 31, 9));
    });

    test("WEEKLY expands correctly with interval with one year interval", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date("2013/8/5 09:00"),
            end: new Date("2013/8/5 09:30"),
            recurrenceRule: "FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,FR;WKST=MO"
        });

        var events = occurrences(schedulerEvent, new Date(2014, 7, 1), new Date(2014, 8, 1));

        deepEqual(events[0].start, new Date(2014, 7, 5, 9));
        deepEqual(events[1].start, new Date(2014, 7, 8, 9));
        deepEqual(events[2].start, new Date(2014, 7, 19, 9));
        deepEqual(events[3].start, new Date(2014, 7, 22, 9));
    });

    test("WEEKLY expands correctly with interval with two year interval", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date("2013/8/5 09:00"),
            end: new Date("2013/8/5 09:30"),
            recurrenceRule: "FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,FR;WKST=MO"
        });

        var events = occurrences(schedulerEvent, new Date(2015, 7, 1), new Date(2015, 8, 1));

        deepEqual(events[0].start, new Date(2015, 7, 4, 9));
        deepEqual(events[1].start, new Date(2015, 7, 7, 9));
        deepEqual(events[2].start, new Date(2015, 7, 18, 9));
        deepEqual(events[3].start, new Date(2015, 7, 21, 9));
    });

    module("MONTHLY Occurrences");
    test("MONTHLY method returns one event for each new month", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=MONTHLY"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 5, 10), new Date(2000, 9, 10, 17));

        equal(events.length, 5);

        equal(events[1].start.getTime(), +new Date(2000, 6, 10, 16, 30));
        equal(events[1].end.getTime(), +new Date(2000, 6, 10, 17, 0));

        equal(events[2].start.getTime(), +new Date(2000, 7, 10, 16, 30));
        equal(events[2].end.getTime(), +new Date(2000, 7, 10, 17, 0));

        equal(events[3].start.getTime(), +new Date(2000, 8, 10, 16, 30));
        equal(events[3].end.getTime(), +new Date(2000, 8, 10, 17, 0));

        equal(events[4].start.getTime(), +new Date(2000, 9, 10, 16, 30));
        equal(events[4].end.getTime(), +new Date(2000, 9, 10, 17, 0));
    });

    test("MONTHLY occurrence sets date to event.start if NO BYMONTHDAYS and BYDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 0, 31, 16, 30),
            end: new Date(2000, 0, 31, 17, 0),
            recurrenceRule: "FREQ=MONTHLY"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 0, 10), new Date(2000, 5, 10, 17));

        equal(events.length, 3);
        equal(events[1].start.getDate(), 31);
        equal(events[1].start.getMonth(), 2);
        equal(events[2].start.getDate(), 31);
        equal(events[2].start.getMonth(), 4);
    });

    test("MONTHLY method returns only if date is available in current month", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 0, 31, 16, 30),
            end: new Date(2000, 0, 31, 17, 0),
            recurrenceRule: "FREQ=MONTHLY"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 0, 10), new Date(2000, 5, 10, 17));

        equal(events.length, 3);
        equal(events[1].start.getMonth(), 2);
        equal(events[2].start.getMonth(), 4);
    });

    test("MONTHLY method limits by month", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=MONTHLY;BYMONTH=6,8,10"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 5, 10), new Date(2000, 9, 10, 17));

        equal(events.length, 3);

        equal(events[1].start.getTime(), +new Date(2000, 7, 10, 16, 30));
        equal(events[1].end.getTime(), +new Date(2000, 7, 10, 17, 0));

        equal(events[2].start.getTime(), +new Date(2000, 9, 10, 16, 30));
        equal(events[2].end.getTime(), +new Date(2000, 9, 10, 17, 0));
    });

    test("MONTHLY method limits by month and return empty array", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=MONTHLY;BYMONTH=12"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 5, 10), new Date(2000, 9, 10, 17));
        equal(events.length, 0);
    });

    test("MONTHLY method expands by BYMONTHDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=MONTHLY;BYMONTHDAY=6,10"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 5, 10), new Date(2000, 6, 10, 17));

        equal(events.length, 3);

        equal(events[1].start.getTime(), +new Date(2000, 6, 6, 16, 30));
        equal(events[1].end.getTime(), +new Date(2000, 6, 6, 17, 0));

        equal(events[2].start.getTime(), +new Date(2000, 6, 10, 16, 30));
        equal(events[2].end.getTime(), +new Date(2000, 6, 10, 17, 0));
    });

    test("MONTHLY method expands by BYDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=MONTHLY;BYDAY=MO,WE"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 6, 10, 17));

        equal(events.length, 10);

        equal(events[0].start.getTime(), +new Date(2013, 5, 10, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 5, 10, 17, 0));

        equal(events[4].start.getTime(), +new Date(2013, 5, 24, 16, 30));
        equal(events[4].end.getTime(), +new Date(2013, 5, 24, 17, 0));

        equal(events[9].start.getTime(), +new Date(2013, 6, 10, 16, 30));
        equal(events[9].end.getTime(), +new Date(2013, 6, 10, 17, 0));
    });

    test("MONTHLY method expands by BYDAY and offset", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 6, 7, 16, 30),
            end: new Date(2013, 6, 7, 17, 0),
            recurrenceRule: "FREQ=MONTHLY;BYDAY=2SU;WKST=SU"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 6, 1), new Date(2013, 6, 31));

        equal(events.length, 1);

        equal(events[0].start.getTime(), +new Date(2013, 6, 14, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 6, 14, 17, 0));
    });

    test("MONTHLY method with BYDAY=1WE", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 6, 4, 16, 30),
            end: new Date(2012, 6, 4, 17, 0),
            recurrenceRule: "FREQ=MONTHLY;BYDAY=1WE;WKST=SU"
        });

        var events = occurrences(schedulerEvent, new Date(2012, 6, 29), new Date(2012, 7, 31));

        equal(events.length, 1);

        deepEqual(events[0].start, new Date(2012, 7, 1, 16, 30));
        deepEqual(events[0].end, new Date(2012, 7, 1, 17, 0));
    });

    test("MONTHLY method expands by BYDAY and offset (WKST=MO)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 6, 7, 16, 30),
            end: new Date(2013, 6, 7, 17, 0),
            recurrenceRule: "FREQ=MONTHLY;BYDAY=2SU;WKST=MO"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 6, 1), new Date(2013, 6, 31));

        equal(events.length, 1);

        deepEqual(events[0].start, new Date(2013, 6, 14, 16, 30));
        deepEqual(events[0].end, new Date(2013, 6, 14, 17, 0));
    });

    test("MONTHLY method expands by BYDAY and offset (WKST=SA)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 6, 7, 16, 30),
            end: new Date(2013, 6, 7, 17, 0),
            recurrenceRule: "FREQ=MONTHLY;BYDAY=2SU;WKST=SA"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 6, 1), new Date(2013, 6, 31));

        equal(events.length, 1);

        deepEqual(events[0].start, new Date(2013, 6, 14, 16, 30));
        deepEqual(events[0].end, new Date(2013, 6, 14, 17, 0));
    });

    test("MONTHLY expand by BYMONTHDAY and limit by BYDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=MONTHLY;BYMONTHDAY=13,23,25;BYDAY=TU,TH"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 10), new Date(2013, 6, 10, 17));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 5, 13, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 5, 13, 17, 0));

        equal(events[1].start.getTime(), +new Date(2013, 5, 25, 16, 30));
        equal(events[1].end.getTime(), +new Date(2013, 5, 25, 17, 0));
    });

    test("MONTHLY expand by BYMONTH and limit by BYDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=MONTHLY;BYMONTH=6;BYDAY=TU,TH"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 5, 24), new Date(2013, 6, 10, 17));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 5, 25, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 5, 25, 17, 0));

        equal(events[1].start.getTime(), +new Date(2013, 5, 27, 16, 30));
        equal(events[1].end.getTime(), +new Date(2013, 5, 27, 17, 0));
    });

    test("MONTHLY occurrences expand BYHOUR and BYMINUTE and BYSECOND", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 10, 10, 16, 30),
            end: new Date(2013, 10, 10, 17, 0),
            recurrenceRule: "FREQ=MONTHLY;BYDAY=FR;BYHOUR=12,14;BYMINUTE=20;BYSECOND=30"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 10, 10), new Date(2013, 10, 16));

        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 10, 15, 12, 20, 30));
        equal(events[0].end.getTime(), +new Date(2013, 10, 15, 12, 50, 30));

        equal(events[1].start.getTime(), +new Date(2013, 10, 15, 14, 20, 30));
        equal(events[1].end.getTime(), +new Date(2013, 10, 15, 14, 50, 30));
    });

    tzTest("Sofia", "MONTHLY occurrence sets startTime correctly", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 31, 3, 0),
            end: new Date(2013, 0, 31, 4, 0),
            recurrenceRule: "FREQ=MONTHLY"
        }),
        afterDstDate = new Date(2013, 2, 31, 3),
        endHour = afterDstDate.getHours() < 3 ? 2 : 5;



        var events = occurrences(schedulerEvent, new Date(2013, 0, 1), new Date(2013, 5, 10));

        var startTime = kendo.date.toUtcTime(kendo.date.getDate(events[1].start)) + (3 * kendo.date.MS_PER_HOUR);

        equal(events[1].start.getHours(), afterDstDate.getHours());
        equal(events[1]._startTime, startTime);

        equal(events[1].end.getHours(), endHour);
        equal(events[1]._endTime, startTime + kendo.date.MS_PER_HOUR);

        startTime = kendo.date.toUtcTime(kendo.date.getDate(events[2].start)) + (3 * kendo.date.MS_PER_HOUR);

        equal(events[2].start.getHours(), 3);
        equal(events[2]._startTime, startTime);

        equal(events[2].end.getHours(), 4);
        equal(events[2]._endTime, startTime + kendo.date.MS_PER_HOUR);
    });

    test("MONTHLY occurrence method supports bysetpos rule", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(1997, 8, 4, 9, 0),
            end: new Date(1997, 8, 4, 10, 0),
            recurrenceRule: "RRULE:FREQ=MONTHLY;COUNT=3;BYDAY=TU,WE,TH;BYSETPOS=3"
        });

        var events = occurrences(schedulerEvent, new Date(1997, 8, 1), new Date(1997, 11, 1));

        equal(events.length, 3);

        deepEqual(events[0].start, new Date(1997, 8, 4, 9));
        deepEqual(events[1].start, new Date(1997, 9, 7, 9));
        deepEqual(events[2].start, new Date(1997, 10, 6, 9));
    });

    test("MONTHLY occurrence uses event start when limit by occurrence position", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 9, 15, 9, 0),
            end: new Date(2013, 9, 15, 10, 0),
            recurrenceRule: "FREQ=MONTHLY;COUNT=2;BYDAY=SU,MO,TU,WE,TH,FR,SA;BYSETPOS=-1"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 9, 15), new Date(2013, 11, 1));

        equal(events.length, 2);

        deepEqual(events[0].start, new Date(2013, 9, 31, 9));
        deepEqual(events[1].start, new Date(2013, 10, 30, 9));
    });

    test("MONTHLY occurrence method supports negative bysetpos rule", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(1997, 8, 29, 9, 0),
            end: new Date(1997, 8, 29, 10, 0),
            recurrenceRule: "RRULE:FREQ=MONTHLY;COUNT=3;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=-2"
        });

        var events = occurrences(schedulerEvent, new Date(1997, 8, 1), new Date(1997, 11, 1));

        equal(events.length, 3);

        deepEqual(events[0].start, new Date(1997, 8, 29, 9));
        deepEqual(events[1].start, new Date(1997, 9, 30, 9));
        deepEqual(events[2].start, new Date(1997, 10, 27, 9));
    });

    tzTest("Sofia", "MONTHLY occurrence supports bysetpos rule and no timezone", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 11, 12, 6, 0),
            end: new Date(2013, 11, 12, 7, 0),
            recurrenceRule: "FREQ=MONTHLY;UNTIL=20140701T000000Z;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=1"
        });

        var events = occurrences(schedulerEvent, new Date(2014, 5, 29), new Date(2014, 6, 5));
        var event = events[events.length - 1];

        deepEqual(event.start, new Date(2014, 6, 1, 6));
    });

    test("MONHTLY expands correctly with interval and BYDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date("1997/9/2 09:00"),
            end: new Date("1997/9/2 09:30"),
            recurrenceRule: "FREQ=MONTHLY;INTERVAL=2;BYDAY=TU"
        });

        var events = occurrences(schedulerEvent, new Date(1997, 8, 1), new Date(1998, 0, 15));

        equal(events.length, 11);
        deepEqual(events[4].start, new Date(1997, 8, 30, 9));
        deepEqual(events[8].start, new Date(1997, 10, 25, 9));
        deepEqual(events[10].start, new Date(1998, 0, 13, 9));
    });

    test("MONHTLY expands correctly with interval", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date("1997/9/2 09:00"),
            end: new Date("1997/9/2 09:30"),
            recurrenceRule: "FREQ=MONTHLY;INTERVAL=3"
        });

        var events = occurrences(schedulerEvent, new Date(1998, 1, 22), new Date(1998, 2, 8));

        equal(events.length, 1);
        deepEqual(events[0].start, new Date(1998, 2, 2, 9));
    });

    module("YEARLY Occurrences");
    test("YEARLY method returns one event for each new year", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=YEARLY"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 5, 10), new Date(2002, 9, 10, 17));

        equal(events.length, 3);

        equal(events[1].start.getTime(), +new Date(2001, 5, 10, 16, 30));
        equal(events[1].end.getTime(), +new Date(2001, 5, 10, 17, 0));

        equal(events[2].start.getTime(), +new Date(2002, 5, 10, 16, 30));
        equal(events[2].end.getTime(), +new Date(2002, 5, 10, 17, 0));
    });

    test("YEARLY method expands BYMONTH", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2000, 5, 10, 16, 30),
            end: new Date(2000, 5, 10, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYMONTH=12"
        });

        var events = occurrences(schedulerEvent, new Date(2000, 5, 10), new Date(2002, 11, 10, 17));

        equal(events.length, 3);

        equal(events[0].start.getTime(), +new Date(2000, 11, 10, 16, 30));
        equal(events[0].end.getTime(), +new Date(2000, 11, 10, 17, 0));

        equal(events[1].start.getTime(), +new Date(2001, 11, 10, 16, 30));
        equal(events[1].end.getTime(), +new Date(2001, 11, 10, 17, 0));

        equal(events[2].start.getTime(), +new Date(2002, 11, 10, 16, 30));
        equal(events[2].end.getTime(), +new Date(2002, 11, 10, 17, 0));
    });

    test("YEARLY method expands BYWEEKNO", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 10, 16, 30),
            end: new Date(2013, 0, 10, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYWEEKNO=10;WKST=MO"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 0, 10), new Date(2013, 11, 10, 17));
        equal(events.length, 7); //04 - 10 March

        equal(events[0].start.getTime(), +new Date(2013, 2, 4, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 2, 4, 17, 0));

        equal(events[6].start.getTime(), +new Date(2013, 2, 10, 16, 30));
        equal(events[6].end.getTime(), +new Date(2013, 2, 10, 17, 0));
    });

    test("YEARLY method expands BYYEARDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 16, 30),
            end: new Date(2013, 0, 1, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYYEARDAY=10,100,200"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 0, 1), new Date(2013, 11, 31, 17));
        equal(events.length, 3);

        equal(events[0].start.getTime(), +new Date(2013, 0, 10, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 0, 10, 17, 0));

        equal(events[1].start.getTime(), +new Date(2013, 3, 10, 16, 30));
        equal(events[1].end.getTime(), +new Date(2013, 3, 10, 17, 0));

        equal(events[2].start.getTime(), +new Date(2013, 6, 19, 16, 30));
        equal(events[2].end.getTime(), +new Date(2013, 6, 19, 17, 0));
    });

    test("YEARLY method expands negative BYYEARDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 16, 30),
            end: new Date(2013, 0, 1, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYYEARDAY=10, -100"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 0, 1), new Date(2013, 11, 31, 17));
        equal(events.length, 2);

        equal(events[0].start.getTime(), +new Date(2013, 0, 10, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 0, 10, 17, 0));

        equal(events[1].start.getTime(), +new Date(2013, 8, 22, 16, 30));
        equal(events[1].end.getTime(), +new Date(2013, 8, 22, 17, 0));
    });

    test("YEARLY method expands BYMONTHDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 16, 30),
            end: new Date(2013, 0, 1, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYMONTHDAY=31"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 0, 1), new Date(2013, 11, 31, 17));
        equal(events.length, 7);

        equal(events[0].start.getTime(), +new Date(2013, 0, 31, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 0, 31, 17, 0));

        equal(events[6].start.getTime(), +new Date(2013, 11, 31, 16, 30));
        equal(events[6].end.getTime(), +new Date(2013, 11, 31, 17, 0));
    });

    test("YEARLY method expands BYDAY", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 16, 30),
            end: new Date(2013, 0, 1, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYDAY=TH"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 4, 1), new Date(2013, 4, 31, 17));
        equal(events.length, 5);

        equal(events[0].start.getTime(), +new Date(2013, 4, 2, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 4, 2, 17, 0));

        equal(events[4].start.getTime(), +new Date(2013, 4, 30, 16, 30));
        equal(events[4].end.getTime(), +new Date(2013, 4, 30, 17, 0));
    });

    test("YEARLY method expands negative BYWEEKNO", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 16, 30),
            end: new Date(2013, 0, 1, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYWEEKNO=-10;WKST=MO"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 0, 1), new Date(2013, 11, 31, 17));
        equal(events.length, 7); //21 - 27 October

        equal(events[0].start.getTime(), +new Date(2013, 9, 21, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 9, 21, 17, 0));

        equal(events[6].start.getTime(), +new Date(2013, 9, 27, 16, 30));
        equal(events[6].end.getTime(), +new Date(2013, 9, 27, 17, 0));
    });

    test("YEARLY method expands BYMONTH and limit by BYWEEKNO", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 16, 30),
            end: new Date(2013, 0, 1, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYMONTH=3;BYWEEKNO=10;WKST=MO"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 0, 1), new Date(2013, 4, 31, 17));
        equal(events.length, 7); //04 - 10 March

        equal(events[0].start.getTime(), +new Date(2013, 2, 4, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 2, 4, 17, 0));

        equal(events[6].start.getTime(), +new Date(2013, 2, 10, 16, 30));
        equal(events[6].end.getTime(), +new Date(2013, 2, 10, 17, 0));
    });

    test("YEARLY method expands BYMONTH and limit by BYYEARDAY (returns 0)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 16, 30),
            end: new Date(2013, 0, 1, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYMONTH=3;BYYEARDAY=200"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 0, 1), new Date(2013, 4, 31, 17));
        equal(events.length, 0);
    });

    test("YEARLY method expands BYMONTH and limit by BYYEARDAY (returns 1)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 0, 1, 16, 30),
            end: new Date(2012, 0, 1, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYMONTH=2;BYYEARDAY=60"
        });

        var events = occurrences(schedulerEvent, new Date(2012, 0, 1), new Date(2012, 4, 31, 17));
        equal(events.length, 1);

        equal(events[0].start.getTime(), +new Date(2012, 1, 29, 16, 30));
        equal(events[0].end.getTime(), +new Date(2012, 1, 29, 17, 0));
    });

    test("YEARLY method expands BYMONTH and limit by BYMONTHDAY (returns 1)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 0, 1, 16, 30),
            end: new Date(2012, 0, 1, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=1,29"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 0, 1), new Date(2013, 4, 31, 17));

        equal(events.length, 1);
        deepEqual(events[0].start, new Date(2013, 1, 1, 16, 30));
        deepEqual(events[0].end, new Date(2013, 1, 1, 17, 0));
    });

    test("YEARLY method expands BYMONTH and limit by BYDAY (returns 4)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 16, 30),
            end: new Date(2013, 0, 1, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYMONTH=2;BYDAY=WE"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 0, 1), new Date(2013, 4, 31, 17));

        equal(events.length, 4);
        equal(events[0].start.getTime(), +new Date(2013, 1, 6, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 1, 6, 17, 0));

        equal(events[3].start.getTime(), +new Date(2013, 1, 27, 16, 30));
        equal(events[3].end.getTime(), +new Date(2013, 1, 27, 17, 0));
    });

    test("YEARLY method expands BYMONTH, BYHOUR, BYMINUTE and limit by BYMONTHDAY (returns 2)", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 0, 1, 16, 30),
            end: new Date(2012, 0, 1, 17, 0),
            recurrenceRule: "FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=1,29;BYHOUR=17,18;BYMINUTE=40"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 0, 1), new Date(2013, 4, 31, 17));

        equal(events.length, 2);
        equal(events[0].start.getTime(), +new Date(2013, 1, 1, 17, 40));
        equal(events[0].end.getTime(), +new Date(2013, 1, 1, 18, 10));

        equal(events[1].start.getTime(), +new Date(2013, 1, 1, 18, 40));
        equal(events[1].end.getTime(), +new Date(2013, 1, 1, 19, 10));
    });

    test("YEARLY method expands BYMONTH and limit by negative offset BYDAY (week start Monday)", function() {
        var schedulerEvent = new SchedulerEvent({
            id: 1,
            title: "Title",
            isAllDay: true,
            start: new Date(2014, 1, 28),
            end: new Date(2014, 1, 28),
            recurrenceRule: "FREQ=YEARLY;COUNT=2;BYMONTH=3;BYDAY=-1SU;WKST=MO"
        });

        var events = occurrences(schedulerEvent, new Date(2014, 1, 28), new Date(2114, 1, 28));

        equal(events.length, 2);
        deepEqual(events[0].start, new Date(2014, 2, 30));
        deepEqual(events[1].start, new Date(2015, 2, 29));
    });

    tzTest("Sofia", "YEARLY occurrence sets startTime correctly", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 2, 31, 3, 0),
            end: new Date(2012, 2, 31, 4, 0),
            recurrenceRule: "FREQ=YEARLY"
        }),
        afterDstDate = new Date(2013, 2, 31, 3),
        endHour = afterDstDate.getHours() < 3 ? 2 : 5;

        var events = occurrences(schedulerEvent, new Date(2012, 0, 1), new Date(2014, 5, 10));

        var startTime = kendo.date.toUtcTime(kendo.date.getDate(events[1].start));

        equal(events[1].start.getHours(), afterDstDate.getHours());
        equal(events[1]._startTime, startTime + (3 * kendo.date.MS_PER_HOUR));

        equal(events[1].end.getHours(), endHour);
        equal(events[1]._endTime, startTime + (4 * kendo.date.MS_PER_HOUR));

        startTime = kendo.date.toUtcTime(kendo.date.getDate(events[2].start));

        equal(events[2].start.getHours(), 3);
        equal(events[2]._startTime, startTime + (3 * kendo.date.MS_PER_HOUR));

        equal(events[2].end.getHours(), 4);
        equal(events[2]._endTime, startTime + (4 * kendo.date.MS_PER_HOUR));
    });

    tzTest("Brazil", "YEARLY occurrence honours DST when BYYEARDAY is defined", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0),
            recurrenceRule: "FREQ=YEARLY;BYYEARDAY=293" //2013-10-20
        });

        var events = occurrences(schedulerEvent, new Date(2012, 0, 1), new Date(2014, 10, 10));

        var startTime = kendo.date.toUtcTime(kendo.date.getDate(events[1].start));

        equal(events[1].start.getHours(), 1);
        equal(events[1]._startTime, startTime);

        equal(events[1].end.getHours(), 2);
        equal(events[1]._endTime, startTime + kendo.date.MS_PER_HOUR);

        startTime = kendo.date.toUtcTime(kendo.date.getDate(events[2].start));

        equal(events[2].start.getHours(), 0);
        equal(events[2]._startTime, startTime);

        equal(events[2].end.getHours(), 1);
        equal(events[2]._endTime, startTime + kendo.date.MS_PER_HOUR);
    });

    test("YEARLY occurrences method starts expand from event start", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2013, 8, 10, 16, 30),
            end: new Date(2013, 8, 10, 17, 0),
            recurrenceRule: "FREQ=YEARLY"
        });

        var events = occurrences(schedulerEvent, new Date(2013, 8, 16), new Date(2013, 8, 20));

        equal(events.length, 0);

        var events = occurrences(schedulerEvent, new Date(2014, 8, 10), new Date(2014, 8, 20));

        equal(events.length, 1);
    });

    test("YEARLY expands correctly with interval", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date("1997/3/10 09:00"),
            end: new Date("1997/3/10 09:30"),
            recurrenceRule: "FREQ=YEARLY;INTERVAL=2;COUNT=10;BYMONTH=1,2,3"
        });

        var events = occurrences(schedulerEvent, new Date(1997, 0, 1), new Date(2013, 0, 15));

        deepEqual(events[0].start, new Date(1997, 2, 10, 9));
        deepEqual(events[1].start, new Date(1999, 0, 10, 9));
        deepEqual(events[2].start, new Date(1999, 1, 10, 9));
        deepEqual(events[3].start, new Date(1999, 2, 10, 9));
        deepEqual(events[4].start, new Date(2001, 0, 10, 9));
        deepEqual(events[5].start, new Date(2001, 1, 10, 9));
        deepEqual(events[6].start, new Date(2001, 2, 10, 9));
        deepEqual(events[7].start, new Date(2003, 0, 10, 9));
        deepEqual(events[8].start, new Date(2003, 1, 10, 9));
        deepEqual(events[9].start, new Date(2003, 2, 10, 9));
    });

    module("Exception recurring dates");

    test("expand method should return the event if no recurrenceRule", function() {
        var schedulerEvent = new SchedulerEvent({
            id: 1,
            uid: "id",
            title: "Title",
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0)
        });

        var events = occurrences(schedulerEvent, new Date(2012, 0, 1), new Date(2014, 10, 10));

        equal(events.length, 1);
        equal(events[0].id, schedulerEvent.id);
    });

    test("Remove event which exist in RecurrenceException", function() {
        var expDate1 = new Date(2013, 0, 1, 10, 30),
            expDate2 = new Date(2013, 0, 3, 10, 30);

        expDate1 = timezone.apply(expDate1, 0);
        expDate2 = timezone.apply(expDate2, 0);

        var exception = kendo.toString(expDate1, "yyyyMMddTHHmmssZ") + ";" +
                        kendo.toString(expDate2, "yyyyMMddTHHmmssZ") + ";";

        var events = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 0, 1, 10, 30),
            end: new Date(2012, 0, 1, 11, 30),
            recurrenceRule: "FREQ=DAILY",
            recurrenceException: exception
        });

        var events = occurrences(events, new Date(2013, 0, 1), new Date(2013, 0, 5, 17));

        equal(events.length, 3);
        equal(events[0].start.getTime(), +new Date(2013, 0, 2, 10, 30));
        equal(events[0].end.getTime(), +new Date(2013, 0, 2, 11, 30));

        equal(events[1].start.getTime(), +new Date(2013, 0, 4, 10, 30));
        equal(events[1].end.getTime(), +new Date(2013, 0, 4, 11, 30));

        equal(events[2].start.getTime(), +new Date(2013, 0, 5, 10, 30));
        equal(events[2].end.getTime(), +new Date(2013, 0, 5, 11, 30));
    });

    test("Update recurrence exception field if EXDATE is specified", function() {
        var expDate1 = new Date(2013, 0, 1, 10, 30),
            expDate2 = new Date(2013, 0, 3, 10, 30);

        expDate1 = timezone.apply(expDate1, 0);
        expDate2 = timezone.apply(expDate2, 0);

        var exception = kendo.toString(expDate1, "yyyyMMddTHHmmssZ") + "," +
                        kendo.toString(expDate2, "yyyyMMddTHHmmssZ");

        var event = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 0, 1, 10, 30),
            end: new Date(2012, 0, 1, 11, 30),
            recurrenceRule: "EXDATE:" + exception + " FREQ=DAILY"
        });

        exception = exception.replace(",", ";");
        event.expand();

        equal(event.recurrenceException, exception + ";");
    });

    test("Remove event which exist in EXDATE rule", function() {
        var expDate1 = new Date(2013, 0, 1, 10, 30),
            expDate2 = new Date(2013, 0, 3, 10, 30);

        expDate1 = timezone.apply(expDate1, 0);
        expDate2 = timezone.apply(expDate2, 0);

        var exception = kendo.toString(expDate1, "yyyyMMddTHHmmssZ") + "," +
                        kendo.toString(expDate2, "yyyyMMddTHHmmssZ") + " ";

        var events = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 0, 1, 10, 30),
            end: new Date(2012, 0, 1, 11, 30),
            recurrenceRule: "EXDATE:" + exception + "FREQ=DAILY"
        });

        var events = occurrences(events, new Date(2013, 0, 1), new Date(2013, 0, 5, 17));

        equal(events.length, 3);
        equal(events[0].start.getTime(), +new Date(2013, 0, 2, 10, 30));
        equal(events[0].end.getTime(), +new Date(2013, 0, 2, 11, 30));

        equal(events[1].start.getTime(), +new Date(2013, 0, 4, 10, 30));
        equal(events[1].end.getTime(), +new Date(2013, 0, 4, 11, 30));

        equal(events[2].start.getTime(), +new Date(2013, 0, 5, 10, 30));
        equal(events[2].end.getTime(), +new Date(2013, 0, 5, 11, 30));
    });

    test("expand method returns event directly when if it satisfies recurrence rule", function() {
        var start = new Date(2010, 10, 10);
        var event = new SchedulerEvent({
            id: 1,
            recurrenceRule: "FREQ=DAILY",
            recurrenceException: "20001111T090000",
            start: start,
            end: start
        });

        var occurrence = event.expand(start, kendo.date.addDays(start, 2))[0];

        ok(!occurrence.recurrenceId);
        equal(occurrence.uid, event.uid);
        deepEqual(occurrence.start, start);

        equal(occurrence.id, event.id);
        equal(occurrence.recurrenceRule, event.recurrenceRule);
        equal(occurrence.recurrenceException, event.recurrenceException);
    });
})();
