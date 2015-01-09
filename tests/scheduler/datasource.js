(function() {
   var SchedulerDataSource = kendo.data.SchedulerDataSource,
        SchedulerDataReader = kendo.data.SchedulerDataReader,
        SchedulerEvent = kendo.data.SchedulerEvent;

    module("SchedulerDataSource initialization", { });

    test("wraps the reader if no schema configuration is set", function() {
        var dataSource = new SchedulerDataSource();

        ok(dataSource.reader instanceof SchedulerDataReader);
    });

    test("wraps the reader if schema configuration is set", function() {
        var dataSource = new SchedulerDataSource({
            schema: {
                data: "data"
            }
        });

        ok(dataSource.reader instanceof SchedulerDataReader);
    });

    test("setting isAllDay to true of an all day event doesn't change start and end", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 12:00 AM"),
            end: new Date("2013/6/6 12:00 AM"),
            isAllDay: true
        });

        event.set("isAllDay", true);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
    });

    test("_defaultId field is not serialized", function() {
        var event = new SchedulerEvent();

        ok(!("_defaultId" in event.toJSON()));
    });

    test("setting isAllDay to false of a single day event doesn't change start and end", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 10:00 AM"),
            end: new Date("2013/6/6 11:00 AM")
        });

        event.set("isAllDay", false);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 10:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/6 11:00");
    });

    test("setting isAllDay of a multi day event to true sets start and end to 12:00 AM", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 8:30"),
            end: new Date("2013/6/7 10:30")
        });

        event.set("isAllDay", true);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/7 12:00");
    });

    test("setting isAllDay of a single day event to true sets start and end to 12:00 AM", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 8:30"),
            end: new Date("2013/6/6 10:30")
        });

        event.set("isAllDay", true);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
    });

    test("setting isAllDay of a multi day event to false preserves the interval", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 12:00 AM"),
            end: new Date("2013/6/7 12:00 AM"),
            isAllDay: true
        });

        event.set("isAllDay", false);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/8 12:00");
    });

    test("setting isAllDay of a single day event to false preserves the interval", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 12:00 AM"),
            end: new Date("2013/6/6 12:00 AM"),
            isAllDay: true
        });

        event.set("isAllDay", false);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/7 12:00");
    });

    test("toggling isAllDay of a multi day all day event returns to original hours", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 12:00 AM"),
            end: new Date("2013/6/7 12:00 AM"),
            isAllDay: true
        });

        event.set("isAllDay", false);
        event.set("isAllDay", true);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/7 12:00");
    });

    test("toggling isAllDay of a multi day event returns to original hours", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 10:00 AM"),
            end: new Date("2013/6/7 11:00 AM")
        });

        event.set("isAllDay", true);
        event.set("isAllDay", false);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/8 12:00");
    });

    test("toggling isAllDay of a multi day event which starts and ends at 12:00 AMreturns to original hours", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 12:00 AM"),
            end: new Date("2013/6/7 12:00 AM")
        });

        event.set("isAllDay", true);
        event.set("isAllDay", false);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/7 12:00");
    });

    test("toggling isAllDay of a single day all day event returns to original hours", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 12:00 AM"),
            end: new Date("2013/6/6 12:00 AM"),
            isAllDay: true
        });

        event.set("isAllDay", false);
        event.set("isAllDay", true);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
    });

    test("setting isAllDay of a single day event to true", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 12:00 AM"),
            end: new Date("2013/6/6 12:00 AM")
        });

        event.set("isAllDay", true);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
    });

    test("toggling isAllDay of a single day event returns to original hours", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 10:00 AM"),
            end: new Date("2013/6/6 11:00 AM")
        });

        event.set("isAllDay", true);
        event.set("isAllDay", false);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/7 12:00");
    });

    test("toggling isAllDay of a single day event which starts and ends at 12:00 AM returns to original hours", function() {
        var event = new SchedulerEvent({
            start: new Date("2013/6/6 12:00 AM"),
            end: new Date("2013/6/6 12:00 AM")
        });

        event.set("isAllDay", true);
        event.set("isAllDay", false);

        equal(kendo.toString(event.start, "yyyy/M/d hh:mm"), "2013/6/6 12:00");
        equal(kendo.toString(event.end, "yyyy/M/d hh:mm"), "2013/6/7 12:00");
    });

    test("update method updates the model properties", function() {
        var event = new SchedulerEvent({
            id: 1,
            start: new Date(2000, 10, 10),
            end: new Date(2000, 10, 11)
        });

        var date = new Date();
        event.update({
            id: 1,
            start: date,
            end: date
        });

        ok(event.dirty);
        equal(event.id, 1);
        deepEqual(event.start, date);
        deepEqual(event.end, date);
    });

    test("clone method creates new instance of SchedulerEvent", function() {
        var event = new SchedulerEvent({
            id: 1,
            start: new Date(2000, 10, 10),
            end: new Date(2000, 10, 11)
        });

        var occurrence = event.clone();

        equal(occurrence.uid, event.uid);
        notStrictEqual(occurrence, event);
        deepEqual(occurrence.start, event.start);
        deepEqual(occurrence.end, event.end);
    });

    test("clone method extends event properties with passed options", function() {
        var event = new SchedulerEvent({
            id: 1,
            start: new Date(2000, 10, 10),
            end: new Date(2000, 10, 11)
        });

        var occurrence = event.clone({
            id: 2
        });

        equal(occurrence.id, 2);
    });

    test("toOccurrence creates new SchedulerEvent occurrence object", function() {
        var event = new SchedulerEvent({
            id: 1,
            recurrenceRule: "FREQ=DAILY",
            recurrenceException: "20001111T090000",
            start: new Date(2000, 10, 10)
        });

        var start = new Date(2010, 10, 10);
        var occurrence = event.toOccurrence({
            start: start
        });

        ok(occurrence instanceof SchedulerEvent);
        equal(occurrence.recurrenceId, event.id);
        notEqual(occurrence.uid, event.uid);
        deepEqual(occurrence.start, start);

        ok(!occurrence.id);
        ok(!occurrence.recurrenceRule);
        ok(!occurrence.recurrenceException);
    });

    test("toOccurrence creates new SchedulerEvent with same field definition (custom id)", function() {
        var event = new SchedulerEvent.define({
            id: "foo",
            fields: {
                foo: { type: "string" },
                test: "test"
            }
        });

        var base = new event({
            start: new Date(2000, 10, 10)
        });

        var occurrence = base.toOccurrence({
            start: new Date(2000, 11, 10)
        });

        equal(occurrence.idField, base.idField);
        equal(occurrence.fields.foo.type, "string");
        ok(occurrence.fields.test);

        ok(occurrence.isNew());
    });

    test("toOccurrence creates new SchedulerEvent with same field definition (id as string)", function() {
        var event = new SchedulerEvent.define({
            fields: {
                id: { type: "string" },
                test: "test"
            }
        });

        var base = new event({
            start: new Date(2000, 10, 10)
        });

        var occurrence = base.toOccurrence({
            start: new Date(2000, 11, 10)
        });

        ok(occurrence.isNew());
    });

    test("toOccurrence creates new SchedulerEvent with same field definition (id as number)", function() {
        var event = new SchedulerEvent.define({
            fields: {
                id: { type: "number" },
                test: "test"
            }
        });

        var base = new event({
            start: new Date(2000, 10, 10)
        });

        var occurrence = base.toOccurrence({
            start: new Date(2000, 11, 10)
        });

        ok(occurrence.isNew());
    });

    test("isRecurring method returns true if recurringId is defined", function() {
        var schedulerEvent = new SchedulerEvent({
            recurrenceId: 1,
            title: "Title",
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0),
        });

        ok(schedulerEvent.isRecurring());
    });

    test("isRecurring method returns true if recurrenceRule is defined", function() {
        var schedulerEvent = new SchedulerEvent({
            title: "Title",
            recurrenceRule: "FREQ:DAILY",
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0),
        });

        ok(schedulerEvent.isRecurring());
    });

    test("isException method returns true if recurrenceId and id fields are defined", function() {
        var schedulerEvent = new SchedulerEvent({
            id: 3,
            title: "Title",
            recurrenceId: 2,
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0),
        });

        ok(schedulerEvent.isException());
    });

    test("isException method behaves correctly when id is guid", function() {
        var event = new SchedulerEvent.define({
            id: "foo",
            fields: {
                foo: { type: "string", defaultValue: "0000-0000-0000" },
                test: "test"
            }
        });

        var schedulerEvent = new event({
            title: "Title",
            recurrenceId: 2,
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0)
        });

        ok(!schedulerEvent.isException());
        ok(schedulerEvent.isOccurrence());
    });

    test("isOccurrence method returns true if the model isNew and has recurrenceId", function() {
        var schedulerEvent = new SchedulerEvent({
            id: 0,
            title: "Title",
            recurrenceId: 2,
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0),
        });

        ok(schedulerEvent.isOccurrence());
    });


    test("isRecurrenceHead method returns true if id and recurrenceRule are defined", function() {
        var schedulerEvent = new SchedulerEvent({
            id: 3,
            title: "Title",
            recurrenceRule: "FREQ=DAILY",
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0)
        });

        ok(schedulerEvent.isRecurrenceHead());
    });

    test("SchedulerEvent duration method returns event duration in milliseconds", function() {
        var schedulerEvent = new SchedulerEvent({
            title: "Title",
            recurrenceRule: "FREQ=DAILY",
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0)
        });

        equal(schedulerEvent.duration(), 60 * kendo.date.MS_PER_MINUTE);
    });

    test("SchedulerEvent duration method honours DST", function() {
        var schedulerEvent = new SchedulerEvent({
            title: "Title",
            recurrenceRule: "FREQ=DAILY",
            start: new Date(2013, 2, 31, 0, 0),
            end: new Date(2013, 2, 31, 5, 0)
        });

        equal(schedulerEvent.duration(), 5 * 60 * kendo.date.MS_PER_MINUTE);
    });

    test("SchedulerEvent expand method should return a clone of the head event", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0)
        });

        var events = schedulerEvent.expand(new Date(2012, 0, 1), new Date(2014, 10, 10));

        equal(events[0].uid, schedulerEvent.uid);
    });

    test("SchedulerEvent expand method should return a clone of the head event", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0)
        });

        var events = schedulerEvent.expand(new Date(2012, 0, 1), new Date(2014, 10, 10));

        equal(events[0].uid, schedulerEvent.uid);
    });

    test("SchedulerEvent adds _startTime and _endTime properties", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0),
            recurrenceRule: "freq=daily"
        });

        var events = schedulerEvent.expand(new Date(2012, 2, 31), new Date(2012, 3, 2));

        var event0 = events[0];
        var event1 = events[1];

        ok(event0._startTime);
        ok(event0._endTime);
        ok(event1._startTime);
        ok(event1._endTime);
    });

    test("SchedulerEvent updates _startTime and _endTime properties", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0),
            recurrenceRule: "freq=daily"
        });

        var events = schedulerEvent.expand(new Date(2012, 2, 31), new Date(2012, 3, 2));

        var event0 = events[0];
        var startTime = event0._startTime;
        var endTime = event0._endTime;

        event0.update({
            start: new Date(2014, 2, 31),
            end: new Date(2014, 3, 31)
        });

        notEqual(event0._startTime, startTime);
        notEqual(event0._endTime, endTime);
    });

    test("SchedulerEvent strips the _startTime and _endTime properties", function() {
        var schedulerEvent = new SchedulerEvent({
            uid: "id",
            title: "Title",
            start: new Date(2012, 2, 31, 0, 0),
            end: new Date(2012, 2, 31, 1, 0),
            recurrenceRule: "freq=daily"
        });

        var events = schedulerEvent.expand(new Date(2012, 2, 31), new Date(2012, 3, 2));

        var event0 = events[0].toJSON();
        var event1 = events[1].toJSON();

        ok(!event0._startTime);
        ok(!event0._endTime);
        ok(!event1._startTime);
        ok(!event1._endTime);
    });

    test("SchedulerEvent reports model as new even when default type is changed", function() {
        var dataSource = new kendo.data.SchedulerDataSource({
            schema: {
                model: {
                    id: "taskId",
                    fields: {
                        taskId: { type: "string" }
                    }
                }
            }
        });

        var model = new dataSource.reader.model();

        ok(model.isNew());
    });

    test("create instantiate a SchedulerDataSource", function() {
        var dataSource = SchedulerDataSource.create();

        ok(dataSource instanceof SchedulerDataSource);
    });

    test("returns the same instance if SchedulerDataSource is provided", function() {
        var originalDataSource = new SchedulerDataSource();
        var dataSource = SchedulerDataSource.create(originalDataSource);

        ok(dataSource instanceof SchedulerDataSource);
        deepEqual(dataSource, originalDataSource);
    });

    test("throws if non SchedulerDataSource instance is provided", function() {
        var originalDataSource = new kendo.data.DataSource();

        throws(function() {
            SchedulerDataSource.create(originalDataSource);
        });
    });

    test("DataSource model is wrapped as SchedulerEvent", function() {
        var dataSource = new kendo.data.SchedulerDataSource({
            data: [{ start: new Date(), end: new Date() }]
        });

        dataSource.read();

        ok(dataSource.at(0) instanceof SchedulerEvent);
    });

    test("Existing SchedulerEvent instances are not re-wrapped", function() {
        var event = new SchedulerEvent({ start: new Date(), end: new Date() });

        var dataSource = new kendo.data.SchedulerDataSource({
            data: [event]
        });

        dataSource.read();

        deepEqual(event, dataSource.at(0));
    });

    test("start and end date are converted automatically", function() {
        var dataSource = new kendo.data.SchedulerDataSource({
            schema: {
            },
            transport: {
                read: function(options) {
                    options.success([ { start: "2013-02-03 00:00:00", end: "2013-02-03 00:00:00" } ]);
                }
            }
        });

        dataSource.read();

        ok(dataSource.data()[0].start.getTime);
    });


    var timezoneApply,
        timezoneRemove;

    module("SchedulerDataReader initialization", {
        setup: function() {
            timezoneApply = kendo.timezone.apply;
            timezoneRemove = kendo.timezone.remove;
        },
        teardown: function() {
            kendo.timezone.apply = timezoneApply;
            kendo.timezone.remove = timezoneRemove;
        }
    });

    test("wraps the reader instance", function() {
        var originalReader = new kendo.data.DataReader();

        var dataReader = new SchedulerDataReader({}, originalReader);

        deepEqual(dataReader.reader, originalReader);
    });

    test("proxy error function to the original reader instance", 1, function() {
        var response = {};

        var originalReader = new kendo.data.DataReader({
            errors: function() {
               deepEqual(arguments[0], response);
            }
        });

        var dataReader = new SchedulerDataReader({}, originalReader);

        dataReader.errors(response);
    });

    test("proxy total function to the original reader instance", 1, function() {
        var response = {};

        var originalReader = new kendo.data.DataReader({
            total: function() {
               deepEqual(arguments[0], response);
            }
        });

        var dataReader = new SchedulerDataReader({}, originalReader);

        dataReader.total(response);
    });

    test("proxy groups function to the original reader instance", 1, function() {
        var response = {};

        var originalReader = new kendo.data.DataReader({
            groups: function() {
               deepEqual(arguments[0], response);
            }
        });

        var dataReader = new SchedulerDataReader({}, originalReader);

        dataReader.groups(response);
    });

    test("proxy parse function to the original reader instance", 1, function() {
        var response = {};

        var originalReader = new kendo.data.DataReader({
            parse: function() {
               deepEqual(arguments[0], response);
            }
        });

        var dataReader = new SchedulerDataReader({}, originalReader);

        dataReader.parse(response);
    });

    test("aggregates parse function to the original reader instance", 1, function() {
        var response = {};

        var originalReader = new kendo.data.DataReader({
            aggregates: function() {
               deepEqual(arguments[0], response);
            }
        });

        var dataReader = new SchedulerDataReader({}, originalReader);

        dataReader.aggregates(response);
    });

    test("calls data function of the original reader instance", 1, function() {
        var originalReader = new kendo.data.DataReader({
            data: function() {
                ok(true);
            }
        });

        var dataReader = new SchedulerDataReader({}, originalReader);

        dataReader.data();
    });

    test("calls serialize function of the original reader instance", 1, function() {
        var originalReader = new kendo.data.DataReader({
            serialize: function() {
                ok(true);
            }
        });

        var dataReader = new SchedulerDataReader({}, originalReader);

        dataReader.serialize();
    });

    test("serialize removes uid", 1, function() {
        var originalReader = new kendo.data.DataReader({ });
        var dataReader = new SchedulerDataReader({ timezone: "" }, originalReader);

        var result = dataReader.serialize([{ uid: "uid", start: new Date(), end: new Date()}]);

        ok(!("uid" in result[0]));
    });

    test("timezone conversion is not executed if no timezone is provided", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({}, originalReader);
        var apply = stub(kendo.timezone, "apply");
        var start = new Date(2013, 1, 1);
        var end = new Date(2013, 1, 1);

        dataReader.data([ { start: start, end: end } ]);

        equal(apply.calls("apply"), 0);
    });

    test("start and end time is converted to the given timezone", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({ timezone: "Europe/London" }, originalReader);

        var start = new Date(Date.UTC(2013,5,6,10,0,0));
        var end = new Date(Date.UTC(2013,5,6,11,0,0));

        var result = dataReader.data([ { start: start, end: end } ]);

        equal(kendo.toString(result[0].start, "MMM dd yyyy HH:mm:ss"), "Jun 06 2013 11:00:00");
        equal(kendo.toString(result[0].end, "MMM dd yyyy HH:mm:ss"), "Jun 06 2013 12:00:00");
    });

    test("start and end time is converted to the start timezone if timezone is not defined", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({}, originalReader);

        var start = new Date(Date.UTC(2013,5,6,10,0,0));
        var end = new Date(Date.UTC(2013,5,6,11,0,0));

        var result = dataReader.data([ { start: start, end: end, startTimezone: "Asia/Yerevan" } ]);

        equal(kendo.toString(result[0].start, "MMM dd yyyy HH:mm:ss"), "Jun 06 2013 14:00:00");
        equal(kendo.toString(result[0].end, "MMM dd yyyy HH:mm:ss"), "Jun 06 2013 15:00:00");
    });

    test("start and end time is converted to the timezone if event startTimezone is set", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({ timezone: "Europe/London" }, originalReader);

        var start = new Date(Date.UTC(2013,5,6,10,0,0));
        var end = new Date(Date.UTC(2013,5,6,11,0,0));

        var result = dataReader.data([ { start: start, end: end, startTimezone: "Asia/Yerevan" } ]);

        equal(kendo.toString(result[0].start, "MMM dd yyyy HH:mm:ss"), "Jun 06 2013 11:00:00");
        equal(kendo.toString(result[0].end, "MMM dd yyyy HH:mm:ss"), "Jun 06 2013 12:00:00");
    });

    test("start and end are serialized to UTC based on timezone", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({ timezone: "Asia/Yerevan" }, originalReader);
        var start = kendo.timezone.apply(new Date(Date.UTC(2013,5,6,10,0,0)), "Asia/Yerevan");
        var end = kendo.timezone.apply(new Date(Date.UTC(2013,5,6,11,0,0)), "Asia/Yerevan");

        var result = dataReader.serialize([ { start: start, end: end } ]);

        equal(kendo.stringify(result[0].start), "\"2013-06-06T10:00:00.000Z\"");
        equal(kendo.stringify(result[0].end), "\"2013-06-06T11:00:00.000Z\"");
    });

    test("start and end are serialized to UTC based on event's startTimezone", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({ timezone: "Asia/Yerevan" }, originalReader);
        var start = new Date(Date.UTC(2013,5,6,10,0,0));
        var end = new Date(Date.UTC(2013,5,6,11,0,0));

        var result = dataReader.data([ { start: start, end: end, startTimezone: "Europe/London" } ]);

        result = dataReader.serialize(result);

        equal(kendo.stringify(result[0].start), "\"2013-06-06T13:00:00.000Z\"");
        equal(kendo.stringify(result[0].end), "\"2013-06-06T14:00:00.000Z\"");
    });

    test("data pass start and end dates through the timezone conversion", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({ timezone: "Etc/UTC" }, originalReader);
        var apply = stub(kendo.timezone, "apply");
        var start = new Date(2013, 1, 1);
        var end = new Date(2013, 1, 1);

        dataReader.data([ { start: start, end: end } ]);

        equal(apply.calls("apply"), 2);
        equal(apply.args("apply", 0)[0], start);
        equal(apply.args("apply", 1)[0], end);
    });

    test("data pass start and end data through the timezone conversion with custom field mapping", function() {
        var schema = {
            timezone: "UTC/Etc",
            model: {
                fields: {
                    start: "Start",
                    end: "End"
                }
            }
        };

        var originalReader = new kendo.data.DataReader(schema);
        var dataReader = new SchedulerDataReader(schema, originalReader);
        var apply = stub(kendo.timezone, "apply");

        var start = new Date(2013, 1, 1);
        var end = new Date(2013, 1, 1);

        dataReader.data([ { Start: start, End: end } ]);

        equal(apply.calls("apply"), 2);
        equal(apply.args("apply", 0)[0], start);
        equal(apply.args("apply", 1)[0], end);
    });

    test("data timezone is passed", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({
            timezone: "my timezone"
        }, originalReader);

        var apply = stub(kendo.timezone, "apply");

        dataReader.data([ { start: new Date(2013, 1, 1), end: new Date(2013, 1, 1) } ]);

        equal(apply.args("apply")[1], "my timezone");
    });

    test("event timezone field is used if set", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({ }, originalReader);

        var apply = stub(kendo.timezone, "apply");

        dataReader.data([ { start: new Date(2013, 1, 1), startTimezone: "event zone", end: new Date(2013, 1, 1), endTimezone: "event zone" } ]);

        equal(apply.args("apply")[1], "event zone");
    });

    test("event startTimezone field is used for both start and end if it is the only one set", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({ }, originalReader);

        var apply = stub(kendo.timezone, "apply");

        dataReader.data([ { start: new Date(2013, 1, 1), startTimezone: "event zone", end: new Date(2013, 1, 1) } ]);

        equal(apply.args("apply")[1], "event zone");
    });

    test("serialize timezone if passed", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({
            timezone: "my timezone"
        }, originalReader);

        var remove = stub(kendo.timezone, "remove");

        dataReader.serialize([ { start: new Date(2013, 1, 1), end: new Date(2013, 1, 1) } ]);

        equal(remove.args("remove")[1], "my timezone");
    });

    test("serialize pass start and end data through the timezone conversion", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({ timezone: "UTC/Etc" }, originalReader);
        var remove = stub(kendo.timezone, "remove");
        var start = new Date(2013, 1, 1);
        var end = new Date(2013, 1, 1);

        dataReader.serialize([ { start: start, end: end } ]);

        equal(remove.calls("remove"), 2);
        equal(remove.args("remove", 0)[0], start);
        equal(remove.args("remove", 1)[0], end);
    });

    test("serialize pass start and end data through the timezone conversion with custom field mapping", function() {
        var schema = {
            timezone: "UTC/Etc",
            model: {
                fields: {
                    start: "Start",
                    end: "End"
                }
            }
        };

        var originalReader = new kendo.data.DataReader(schema);
        var dataReader = new SchedulerDataReader(schema, originalReader);
        var remove = stub(kendo.timezone, "remove");

        var start = new Date(2013, 1, 1);
        var end = new Date(2013, 1, 1);

        var result = dataReader.serialize([ { start: start, end: end } ]);

        equal(remove.calls("remove"), 2);
        equal(remove.args("remove", 0)[0], start);
        equal(remove.args("remove", 1)[0], end);
    });

    test("serialize custom field name mapping", function() {
        var schema = {
            model: {
                fields: {
                    start: "Start",
                    end: "End"
                }
            }
        };

        var originalReader = new kendo.data.DataReader(schema);
        var dataReader = new SchedulerDataReader(schema, originalReader);

        var start = new Date(2013, 1, 1);
        var end = new Date(2013, 1, 1);

        var result = dataReader.serialize([ { start: start, end: end } ]);

        ok("Start" in result[0]);
        ok("End" in result[0]);
    });

    test("serialize event timezone field is used if set", function() {
        var originalReader = new kendo.data.DataReader({ });

        var dataReader = new SchedulerDataReader({ }, originalReader);

        var remove = stub(kendo.timezone, "remove");

        dataReader.serialize([ { start: new Date(2013, 1, 1), startTimezone: "event zone", endTimezone: "event zone", end: new Date(2013, 1, 1) } ]);

        equal(remove.args("remove")[1], "event zone");
    });

    test("SchedulerDataReader exposes timezone option", function() {
        var originalReader = new kendo.data.DataReader({ });
        var dataReader = new SchedulerDataReader({
            timezone: "my timezone"
        }, originalReader);

        equal(dataReader.timezone, "my timezone");
    });

    module("SchedulerDataSource expand events", { });

    function createDataSource(data) {
        var dataSource = new SchedulerDataSource({
            data: data
        });

        dataSource.fetch();

        return dataSource;
    }

    test("Scheduler expands recurring events in view", function() {
        var dataSource = createDataSource([
            new SchedulerEvent({
                id: 1,
                title: "Title",
                start: new Date(2013, 0, 1, 16, 30),
                end: new Date(2013, 0, 1, 17, 0),
                recurrenceRule: "FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=1,29;BYHOUR=17,18;BYMINUTE=40"
            }),
            new SchedulerEvent({
                id: 2,
                title: "Title",
                start: new Date(2013, 0, 1, 10, 30),
                end: new Date(2013, 0, 1, 11, 30),
                recurrenceRule: "FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=1,29;"
            })
        ]);

        var events = dataSource.expand(new Date(2013, 0, 1), new Date(2013, 4, 31, 17));

        equal(events.length, 3);

        equal(events[0].start.getTime(), +new Date(2013, 1, 1, 17, 40));
        equal(events[0].end.getTime(), +new Date(2013, 1, 1, 18, 10));

        equal(events[1].start.getTime(), +new Date(2013, 1, 1, 18, 40));
        equal(events[1].end.getTime(), +new Date(2013, 1, 1, 19, 10));

        equal(events[2].start.getTime(), +new Date(2013, 1, 1, 10, 30));
        equal(events[2].end.getTime(), +new Date(2013, 1, 1, 11, 30));
    });

    test("Scheduler expands recurring events (origin event satisfies recurring rule)", function() {
        var dataSource = createDataSource([
            new SchedulerEvent({
                id: "id1",
                title: "Title",
                start: new Date(2013, 0, 1, 16, 30),
                end: new Date(2013, 0, 1, 17, 0),
                recurrenceRule: "FREQ=YEARLY;BYMONTH=1,2;BYMONTHDAY=1, 29"
            })
        ]);

        var events = dataSource.expand(new Date(2013, 0, 1), new Date(2013, 4, 31, 17));

        equal(events.length, 3);

        equal(events[0].start.getTime(), +new Date(2013, 0, 1, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 0, 1, 17, 00));

        equal(events[1].start.getTime(), +new Date(2013, 0, 29, 16, 30));
        equal(events[1].end.getTime(), +new Date(2013, 0, 29, 17, 00));

        equal(events[2].start.getTime(), +new Date(2013, 1, 1, 16, 30));
        equal(events[2].end.getTime(), +new Date(2013, 1, 1, 17, 00));
    });

    test("Expand recurring events which are outside of period", function() {
        var dataSource = createDataSource([new SchedulerEvent({
                id: 1,
                title: "Title",
                start: new Date(2012, 0, 1, 16, 30),
                end: new Date(2012, 0, 1, 17, 0),
                recurrenceRule: "FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=1,29;BYHOUR=17,18;BYMINUTE=40"
            }),
            new SchedulerEvent({
                id: 2,
                title: "Title",
                start: new Date(2012, 0, 1, 10, 30),
                end: new Date(2012, 0, 1, 11, 30),
                recurrenceRule: "FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=1,29;"
            })]);

        var events = dataSource.expand(new Date(2013, 0, 1), new Date(2013, 4, 31, 17));

        equal(events.length, 3);
        equal(events[0].recurrenceId, 1);
        equal(events[1].recurrenceId, 1);
        equal(events[2].recurrenceId, 2);

        equal(events[0].start.getTime(), +new Date(2013, 1, 1, 17, 40));
        equal(events[0].end.getTime(), +new Date(2013, 1, 1, 18, 10));

        equal(events[1].start.getTime(), +new Date(2013, 1, 1, 18, 40));
        equal(events[1].end.getTime(), +new Date(2013, 1, 1, 19, 10));

        equal(events[2].start.getTime(), +new Date(2013, 1, 1, 10, 30));
        equal(events[2].end.getTime(), +new Date(2013, 1, 1, 11, 30));
    });

    test("Scheduler expand method does not modify data if no recurring events", function() {
        var dataSource = createDataSource([{
            title: "Title",
            start: new Date(2013, 0, 1, 16, 30),
            end: new Date(2013, 0, 1, 17, 0)
        },
        {
            title: "Title",
            start: new Date(2013, 0, 1, 10, 30),
            end: new Date(2013, 0, 1, 11, 30)
        }]);

        var events = dataSource.expand(new Date(2013, 0, 1), new Date(2013, 4, 31, 17));

        equal(events.length, 2);
        ok(!events[0].recurrenceId);
        ok(!events[1].recurrenceId);

        equal(events[0].start.getTime(), +new Date(2013, 0, 1, 16, 30));
        equal(events[0].end.getTime(), +new Date(2013, 0, 1, 17, 0));

        equal(events[1].start.getTime(), +new Date(2013, 0, 1, 10, 30));
        equal(events[1].end.getTime(), +new Date(2013, 0, 1, 11, 30));
    });

    test("Scheduler expand method returns recurring events which are outside of period", function() {
        var dataSource = createDataSource([{
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 16, 30),
            end: new Date(2013, 0, 1, 17, 0)
        },
        {
            uid: "id",
            title: "Title",
            start: new Date(2012, 0, 1, 10, 30),
            end: new Date(2012, 0, 1, 11, 30),
            recurrenceRule: "FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=1,29;"
        },
        {
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 3, 16, 30),
            end: new Date(2013, 0, 3, 17, 0)
        }]);

        var events = dataSource.expand(new Date(2013, 0, 1), new Date(2013, 4, 31, 17));

        equal(events.length, 3);
        deepEqual(events[0].start, new Date(2013, 0, 1, 16, 30));
        deepEqual(events[0].end, new Date(2013, 0, 1, 17, 0));

        deepEqual(events[1].start, new Date(2013, 1, 1, 10, 30));
        deepEqual(events[1].end, new Date(2013, 1, 1, 11, 30));

        deepEqual(events[2].start, new Date(2013, 0, 3, 16, 30));
        deepEqual(events[2].end, new Date(2013, 0, 3, 17, 0));
    });

    test("Scheduler expand method removes original event from series if it is part of exception", function() {
        var expDate1 = new Date(2013, 0, 1, 10, 30),
            expDate2 = new Date(2013, 0, 2, 10, 30);

        expDate1 = kendo.timezone.apply(expDate1, 0);
        expDate2 = kendo.timezone.apply(expDate2, 0);

        var exception = kendo.toString(expDate1, "yyyyMMddTHHmmssZ") + ";" +
                        kendo.toString(expDate2, "yyyyMMddTHHmmssZ") + ";";

        var dataSource = createDataSource([{
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 10, 30),
            end: new Date(2013, 0, 1, 11, 30),
            recurrenceRule: "FREQ=DAILY",
            recurrenceException: exception
        }]);

        events = dataSource.expand(new Date(2013, 0, 1), new Date(2013, 0, 3));

        equal(events.length, 1);
        equal(events[0].start.getTime(), +new Date(2013, 0, 3, 10, 30));
        equal(events[0].end.getTime(), +new Date(2013, 0, 3, 11, 30));
    });

    test("Scheduler expand method doesn't remove original event if exception is not equal to start date", function() {
        var expDate1 = new Date(2013, 0, 2, 10, 30);
        expDate1 = kendo.timezone.apply(expDate1, 0);

        var exception = kendo.toString(expDate1, "yyyyMMddTHHmmssZ") + ";";

        var dataSource = createDataSource([{
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 10, 30),
            end: new Date(2013, 0, 1, 11, 30),
            recurrenceRule: "FREQ=DAILY",
            recurrenceException: exception
        }]);

        var events = dataSource.expand(new Date(2013, 0, 1), new Date(2013, 0, 3));

        equal(events.length, 2);
        equal(events[0].start.getTime(), +new Date(2013, 0, 1, 10, 30));
        equal(events[0].end.getTime(), +new Date(2013, 0, 1, 11, 30));

        equal(events[1].start.getTime(), +new Date(2013, 0, 3, 10, 30));
        equal(events[1].end.getTime(), +new Date(2013, 0, 3, 11, 30));
    });

    test("Scheduler expands an event with recurrence exception in America/Los_Angeles timezone", function() {
        var start = new Date(2013, 0, 1, 0, 0), //"America/Los_Angeles"
            end = new Date(2013, 0, 2, 22, 0); //"America/Los_Angeles"

        var expDate1 = kendo.timezone.convert(new Date(2013, 0, 2, 10, 30), "America/Los_Angeles", "Etc/UTC"); //make it UTC
        var exception = kendo.toString(expDate1, "yyyyMMddTHHmmssZ") + ";";

        var dataSource = createDataSource([{
            uid: "id",
            title: "Title",
            start: new Date(2013, 0, 1, 10, 30), //"America/Los_Angeles"
            end: new Date(2013, 0, 1, 11, 30), //"America/Los_Angeles"
            recurrenceRule: "FREQ=DAILY;COUNT=2",
            recurrenceException: exception
        }]);

        dataSource.reader.timezone = "America/Los_Angeles";

        equal(dataSource.expand(start, end).length, 1);
    });

    test("Scheduler expand method does not add recurring event outside of the period (no recurring)", function() {
        var dataSource = createDataSource([new SchedulerEvent({
                id: 1,
                title: "Title",
                start: new Date(2013, 0, 1, 16, 30),
                end: new Date(2013, 0, 1, 17, 0)
            })]);

        var events = dataSource.expand(new Date(2013, 0, 1), new Date(2013, 4, 31));

        equal(events.length, 1);
    });

    test("Scheduler expand method does not add recurring event outside of the period", function() {
        var dataSource = createDataSource([new SchedulerEvent({
                id: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 3, 17, 0),
                isAllDay: true,
                recurrenceRule: "FREQ=MONTHLY"
            })]);

        var data = dataSource.expand(new Date(2013, 1, 4), new Date(2013, 4, 31));
        var view = dataSource.view();

        deepEqual(data[0].start, new Date(2013, 2, 1, 16, 30));
        deepEqual(data[0].end, new Date(2013, 2, 3, 17, 0));
    });

    test("SchedulerDataSource insert method returns undefined if model is not passed", function() {
        var dataSource = createDataSource();

        equal(dataSource.insert(), undefined);
    });

    test("SchedulerDataSource insert method creates SchedulerEvent from plain object", function() {
        var dataSource = createDataSource(),
            date = new Date();

        var event = dataSource.insert(0, { start: date, end: date });

        ok(event);
        ok(event instanceof SchedulerEvent);
        deepEqual(event.start, date);
        deepEqual(event.end, date);
    });

    test("SchedulerDataSource insert exception event from recurrence head", function() {
        var dataSource = createDataSource([new SchedulerEvent({
                id: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 3, 17, 0),
                isAllDay: true,
                recurrenceRule: "FREQ=MONTHLY"
            })]);

        var event = dataSource.insert(1, dataSource.data()[0]);

        ok(event.isNew());
        ok(event.recurrenceId, 1);
    });

    test("SchedulerDataSource insert exception event from occurrence", function() {
        var dataSource = createDataSource([new SchedulerEvent({
                id: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 3, 17, 0),
                isAllDay: true,
                recurrenceRule: "FREQ=MONTHLY"
            })]);

        var occurrence = dataSource.data()[0].toOccurrence();

        var event = dataSource.insert(1, occurrence);

        ok(event.isNew());
        ok(event.recurrenceId, 1);
    });

    test("SchedulerDataSource insert method updates recurrenceException property of the head", function() {
        var dataSource = createDataSource([new SchedulerEvent({
                id: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 3, 17, 0),
                isAllDay: true,
                recurrenceRule: "FREQ=MONTHLY"
            })]);

        var event = dataSource.insert(1, dataSource.data()[0]);
        var head = dataSource.data()[0];

        equal(head.recurrenceException, kendo.toString(kendo.timezone.apply(event.start, 0), "yyyyMMddTHHmmssZ") + ";");
    });

    test("SchedulerDataSource remove method removes recurrence head and its exceptions", function() {
        var dataSource = createDataSource([
            new SchedulerEvent({
                id: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 3, 17, 0),
                isAllDay: true,
                recurrenceRule: "FREQ=MONTHLY"
            }),
            new SchedulerEvent({
                id: 2,
                recurrenceId: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 3, 17, 0),
                isAllDay: true
            })
        ]);

        var event = dataSource.remove(dataSource.data()[0]);

        equal(dataSource.data().length, 0);
    });

    test("SchedulerDataSource remove method updates recurrenceException when removing occurrence", function() {
        var dataSource = createDataSource([
            new SchedulerEvent({
                id: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 3, 17, 0),
                isAllDay: true,
                recurrenceRule: "FREQ=DAILY"
            })
        ]);

        var head = dataSource.data()[0];
        var occurrence = head.toOccurrence();

        var event = dataSource.remove(occurrence);

        ok(head.recurrenceException);
        equal(dataSource.data().length, 1);
    });

    test("SchedulerDataSource remove method removes exception event and preserves recurrenceException", function() {
        var date = new Date(2013, 1, 1, 16, 30);
        var recurrenceException = kendo.toString(kendo.timezone.apply(date, "Etc/UTC"), "yyyyMMddTHHmmssZ") + ";";
        var dataSource = createDataSource([
            new SchedulerEvent({
                id: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 3, 17, 0),
                isAllDay: true,
                recurrenceRule: "FREQ=MONTHLY",
                recurrenceException: recurrenceException
            }),
            new SchedulerEvent({
                id: 2,
                recurrenceId: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 3, 17, 0),
                isAllDay: true
            })
        ]);

        var head = dataSource.data()[0];
        var exception = dataSource.data()[1];

        var event = dataSource.remove(exception);

        equal(head.recurrenceException, recurrenceException);
        equal(dataSource.data().length, 1);
        equal(dataSource.data()[0], head);
    });

    test("SchedulerDataSource remove method removes event", function() {
        var dataSource = createDataSource([
            new SchedulerEvent({
                id: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 3, 17, 0),
                isAllDay: true
            })
        ]);

        var event = dataSource.data()[0];
        dataSource.remove(event);

        equal(dataSource.data().length, 0);
    });

    test("SchedulerDataSource cancelChanges method reverts event modifications", function() {
        var dataSource = createDataSource([
            {
                id: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 3, 17, 0),
                isAllDay: true
            }
        ]);

        var event = dataSource.data()[0];

        event.set("title", "test");

        dataSource.cancelChanges(event);

        equal(dataSource.data()[0].title, "Title");
    });

    test("SchedulerDataSource cancelChanges method update recurrenceException field of the head", function() {
        var date = new Date(2013, 1, 2, 16, 30);
        var recurrenceException = kendo.toString(kendo.timezone.apply(date, "Etc/UTC"), "yyyyMMddTHHmmssZ") + ";";
        var dataSource = createDataSource([
            {
                id: 1,
                title: "Title",
                start: new Date(2013, 1, 1, 16, 30),
                end: new Date(2013, 1, 1, 17, 0),
                recurrenceRule: "FREQ=DAILY",
                recurrenceException: recurrenceException
            },
            {
                id: 2,
                recurrenceId: 1,
                title: "Title",
                start: date,
                end: new Date(2013, 1, 2, 17, 0)
            }
        ]);

        var head = dataSource.data()[0];

        dataSource.add(head.toOccurrence());

        dataSource.cancelChanges(dataSource.data()[2]);

        equal(head.recurrenceException, recurrenceException);
    });

    test("SchedulerDataSource cancelChanges method does not throw javascript exception if called without model", function() {
        var dataSource = createDataSource();

        dataSource.cancelChanges();

        ok(true);
    });

    test("SchedulerDataSource pushState method does not create exception from recurrence head", function() {
        var event = {
            id: 1,
            title: "Title",
            start: new Date(2013, 1, 1, 16, 30),
            end: new Date(2013, 1, 3, 17, 0),
            isAllDay: true,
            recurrenceRule: "FREQ=MONTHLY"
        };

        var dataSource = createDataSource([]);

        var event = dataSource.pushCreate(event);
        var data = dataSource.data();

        equal(data.length, 1);
    });

    test("SchedulerDataSource pushState method updates recurrence head if an occurrence is added", function() {
        var date = new Date(2013, 1, 1, 16, 30);
        var recurrenceException = kendo.toString(kendo.timezone.apply(date, "Etc/UTC"), "yyyyMMddTHHmmssZ") + ";";
        var dataSource = createDataSource([
            {
                id: 1,
                title: "Head",
                start: date,
                end: new Date(2013, 1, 1, 17, 0),
                recurrenceRule: "FREQ=MONTHLY"
            }
        ]);

        var head = dataSource.data()[0];

        var occurrence = head.toOccurrence();
        occurrence.id = 2;

        dataSource.pushCreate(occurrence);

        var data = dataSource.data();

        equal(data.length, 2);
        equal(data[0].title, head.title);
        equal(data[0].recurrenceException, recurrenceException);

        equal(data[1].id, occurrence.id);
        equal(data[1].recurrenceId, occurrence.recurrenceId);
    });
})();
