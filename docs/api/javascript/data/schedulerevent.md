---
title: SchedulerEvent
page_title: API Reference for Kendo Data SchedulerEvent
description: Documentation how to get started with the SchedulerEvent.
---

# kendo.data.SchedulerEvent

The `kendo.data.SchedulerEvent` class represents a data item from the [kendo.data.SchedulerDataSource](/api/framework/schedulerdatasource). Inherits from [kendo.data.Model](/api/framework/model).



## Configuration

### description `String` *(default: "")*

The optional event description.

#### Example - set the description of an event

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00"),
        description: "Lunch with Harry and Steve"
    });
    </script>

### end `Date`

The date at which the scheduler event ends. The `end` date is mandatory.

#### Example - set the end date of an event

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
    </script>

### endTimezone `String` *(default: undefined)*

The timezone of the `end` date. If not specified the [timezone](/api/javascript/ui/scheduler#configuration-timezone) will be used.

The complete list of the supported timezones is available in the [List of IANA time zones](http://en.wikipedia.org/wiki/List_of_IANA_time_zones) Wikipedia page.

#### Example - set the end timezone of an event

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00"),
        endTimezone: "Europe/Sofia"
    });
    </script>

### id `String|Number|Object`

The mandatory unique identifier of the event.

#### Example - set the identifier of an event

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
    </script>

### isAllDay `Boolean` *(default: false)*

If set to `true` the event is "all day". By default events are not all day.

> **Important**: When `isAllDay` is set to `true` the `start` and `end` fields must be set to the same date.

#### Example - create all day event

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Birthday",
        start: new Date("2013/4/4 00:00"),
        end: new Date("2013/4/4 00:00"),
        isAllDay: true
    });
    </script>

### recurrenceException `String` *(default: undefined)*

The recurrence exceptions. A list of semi-colon separated dates formatted using the `yyyyMMddTHHmmssZ` format string.

> **Important**: The dates should be encoded in UTC.

#### Example - set recurrence exceptions

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        start: new Date("2013/9/2 12:00"),
        end: new Date("2013/9/2 12:30"),
        title: "Lunch",
        recurrenceRule: "FREQ=DAILY",
        recurrenceException: new Date("2013/9/3 12:00").toISOString()
    });
    var exception =  new kendo.data.SchedulerEvent({
        id: 2,
        start: new Date("2013/9/3 12:30"),
        end: new Date("2013/9/3 13:00"),
        title: "Lunch",
        recurrenceId: 1
    });
    </script>

### recurrenceId `String|Number|Object` *(default: undefined)*

The `id` of the recurrence parent event. Required for events that are recurrence exceptions.

#### Example - set recurrence exceptions

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        start: new Date("2013/9/2 12:00"),
        end: new Date("2013/9/2 12:30"),
        title: "Lunch",
        recurrenceRule: "FREQ=DAILY",
        recurrenceException: new Date("2013/9/3 12:00").toISOString()
    });
    var exception =  new kendo.data.SchedulerEvent({
        id: 2,
        start: new Date("2013/9/3 12:30"),
        end: new Date("2013/9/3 13:00"),
        title: "Lunch",
        recurrenceId: 1
    });
    </script>

### recurrenceRule `String` *(default: undefined)*

The recurrence rule describing the recurring pattern of the event. The format follows the [iCal specification](http://tools.ietf.org/html/rfc5545).

#### Example - set the recurrence rule
    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        start: new Date("2013/9/2 12:00"),
        end: new Date("2013/9/2 12:30"),
        title: "Lunch",
        recurrenceRule: "FREQ=DAILY"
    });
    </script>

### start `Date`

The date at which the scheduler event starts. The `start` date is mandatory.

#### Example - set the start date of an event

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
    </script>

### startTimezone `String` *(default: undefined)*

The timezone of the `start` date. If not specified the [timezone](/api/javascript/ui/scheduler#configuration-timezone) will be used.

The complete list of the supported timezones is available in the [List of IANA time zones](http://en.wikipedia.org/wiki/List_of_IANA_time_zones) Wikipedia page.

#### Example - set the end timezone of an event

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        startTimezone: "Europe/Sofia",
        end: new Date("2013/4/4 13:00")
    });
    </script>

### title `String` *(default: "")*

The title of the event which is displayed by the scheduler widget.

#### Example - set the title of an event

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
    </script>

## Fields

### description `String`

The optional event description.

#### Example - get the event description

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00"),
        description: "Lunch with Harry and Steve"
    });
    console.log(event.description); // outputs "Lunch with Harry and Steve"
    </script>

### end `Date`

The date at which the scheduler event ends.

#### Example - get the event end date

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
    console.log(event.end); // outputs the end date
    </script>

### endTimezone `String`

The timezone of the `end` date.

#### Example - get the event end timezone

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00"),
        endTimezone: "Europe/Sofia"
    });
    console.log(event.endTimezone); // outputs "Europe/Sofia"
    </script>

### id `String|Number|Object`

The unique identifier of the event.

#### Example - get the event id

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
    console.log(event.id); // outputs "1"
    </script>

### isAllDay `Boolean`

If set to `true` the event is "all day".

#### Example - get the event isAllDay field
    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Birthday",
        start: new Date("2013/4/4 00:00"),
        end: new Date("2013/4/4 00:00"),
        isAllDay: true
    });
    console.log(event.isAllDay); // outputs "true"
    </script>

### recurrenceException `String`

The recurrence exceptions. A list of semi-colon separated dates formatted using the `yyyyMMddTHHmmssZ` format string.

#### Example - get the event recurrence exception field
    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        start: new Date("2013/9/2 12:00"),
        end: new Date("2013/9/2 12:30"),
        title: "Lunch",
        recurrenceRule: "FREQ=DAILY",
        recurrenceException: new Date("2013/9/3 12:00").toISOString()
    });
    console.log(event.recurrenceException); // outputs the recurrence exception
    </script>

### recurrenceId `String|Number|Object`

The `id` of the recurrence parent event.

#### Example - get the event recurrence parent id
    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        start: new Date("2013/9/2 12:00"),
        end: new Date("2013/9/2 12:30"),
        title: "Lunch",
        recurrenceRule: "FREQ=DAILY",
        recurrenceException: new Date("2013/9/3 12:00").toISOString()
    });
    var exception =  new kendo.data.SchedulerEvent({
        id: 2,
        start: new Date("2013/9/3 12:30"),
        end: new Date("2013/9/3 13:00"),
        title: "Lunch",
        recurrenceId: 1
    });
    console.log(exception.recurrenceId); // outputs "1"
    </script>

### recurrenceRule `String`

The recurrence rule describing the recurring pattern of the event.

#### Example - get the event recurrence rule

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        start: new Date("2013/9/2 12:00"),
        end: new Date("2013/9/2 12:30"),
        title: "Lunch",
        recurrenceRule: "FREQ=DAILY"
    });
    console.log(event.recurrenceRule); // outputs "FREQ=DAILY"
    </script>

### start `Date`

The date at which the scheduler event starts.

#### Example - get the event start date
    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
    console.log(event.start); // outputs the end date
    </script>

### startTimezone `String`

The timezone of the `start` date.

#### Example - get the event start timezone

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        startTimezone: "Europe/Sofia"
        end: new Date("2013/4/4 13:00")
    });
    console.log(event.startTimezone); // outputs "Europe/Sofia"
    </script>

### title `String`

The title of the event which is displayed by the scheduler widget.

#### Example - get the event title

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
    console.log(event.title); // outputs "Lunch"
    </script>

## Methods

See the [Model methods](/api/framework/model#methods) for all inherited methods.

### SchedulerEvent.define

Defines a new `SchedulerEvent` type using the provided options.

#### Parameters

##### options `Object`

Describes the configuration options of the new scheduler event class.

##### options.id `String`

The name of the field which acts as an identifier of the scheduler event.
The identifier is used to determine if a model instance is new or existing one.
If the value of the field specified is equal to the default value (specified through the `fields` configuration) the model is considered as new.

##### options.fields `Object`

A set of key/value pairs the configure the model fields. The key specifies the name of the field.
Quote the key if it contains spaces or other symbols which are not valid for a JavaScript identifier.

##### options.fields.fieldName.defaultValue

Specifies the which will be used for the field when a new model instance is created. Default settings depend on the type of the field. Default for "string" is `""`,
for "number" is `0` and for "date" is `new Date()` (today).

##### options.fields.fieldName.editable `Boolean`

Specifies if the field is editable or not. The default value is `true`.

##### options.fields.fieldName.nullable `Boolean`

Specifies if the `defaultValue` setting should be used. The default is `false`.

##### options.fields.fieldName.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

##### options.fields.fieldName.type `String`

Specifies the the type of the field. The available options are `"string"`, `"number"`, `"boolean"`, `"date`". The default is `"string"`.

##### options.fields.fieldName.validation `Object`

Specifies the validation options which will be used by [Kendo Validator](/api/framework/validator).

#### Example - define custom scheduler event

    var Task = kendo.data.SchedulerEvent.define({
        id: "taskId",
        fields: {
            taskId: { from: "TaskID", type: "number" },
            title: { from: "Title", defaultValue: "No title", validation: { required: true } },
            start: { type: "date", from: "Start" },
            end: { type: "date", from: "End" },
            startTimezone: { from: "StartTimezone" },
            endTimezone: { from: "EndTimezone" },
            description: { from: "Description" },
            recurrenceId: { from: "RecurrenceID" },
            recurrenceRule: { from: "RecurrenceRule" },
            recurrenceException: { from: "RecurrenceException" },
            ownerId: { from: "OwnerID", defaultValue: 1 },
            isAllDay: { type: "boolean", from: "IsAllDay" }
        }
    });

### clone

Clones the scheduler event.

#### Parameters

##### options `Object`

Additional options passed to the SchedulerEvent constructor.

##### updateUid `Boolean`*(default: false)*

If you pass `true` the `uid` of the event will be **updated**.

#### Returns

`kendo.data.SchedulerEvent` the cloned scheduler event.

#### Example - clone the scheduler event

    <script>
        var event = new kendo.data.SchedulerEvent({
            id: 1,
            title: "Task1",
            start: new Date(2013, 10, 11, 12),
            end: new Date(2013, 10, 11, 14)
        });

        var clone = event.clone();
    </script>

#### Example - override start and end dates of the event

    <script>
        var event = new kendo.data.SchedulerEvent({
            id: 1,
            title: "Task1",
            start: new Date("2013/4/4 12:00"),
            end: new Date("2013/4/4 14:00")
        });

        var clone = event.clone({
            start: new Date("2013/4/4 2:00"),
            end: new Date("2013/4/4 4:00")
        });
    </script>

### duration

Returns the scheduler event length in milliseconds.

#### Returns

`Number` the length of the event.

#### Example - get length of the event

    <script>
        var event = new kendo.data.SchedulerEvent({
            id: 1,
            title: "Task1",
            start: new Date("2013/4/4 12:00"),
            end: new Date("2013/4/4 14:00")
        });

        console.log(event.duration());
    </script>

### expand

Expands the event for a specific period based on the `recurrenceRule` option.

#### Parameters

##### start `Date`

The start date of the occurrence period.

##### end `Date`

The end date of the occurrence period.

##### timeZoneId `String`

The time zone ID used to convert the recurrence rule dates.

#### Returns

`Array` list of occurrences.

#### Example - get the occurrences

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00"),
        recurrenceRule: "FREQ=DAILY"
    });

    var occurrences = event.expand(new Date("2013/4/4"), new Date("2013/5/4"), "Etc/UTC");
    </script>

### update

Updates the scheduler event.

#### Parameters

##### eventInfo `Object`

The new values, which will be used to update the event.

#### Example - update the scheduler event

    <script>
        var event = new kendo.data.SchedulerEvent({
            id: 1,
            title: "Task1",
            start: new Date("2013/4/4 12:00"),
            end: new Date("2013/4/4 14:00")
        });

        event.update({
            start: new Date("2013/4/4 2:00"),
            end: new Date("2013/4/4 4:00")
        });
    </script>

### isMultiDay

Checks whether the event is equal to or longer then twenty four hours.

#### Returns

`Boolean` return `true` if event is equal to or longer then 24 hours.

#### Example - check whether an event is a multi-day event

    <script>
        var event = new kendo.data.SchedulerEvent({
            id: 1,
            title: "Task1",
            start: new Date("2013/4/4"),
            end: new Date("2013/4/7")
        });

        console.log(event.isMultiDay()); //logs 'true'
    </script>

### isException

Checks whether the event is a recurrence exception.

#### Returns

`Boolean` return `true` if event is a recurrence exception.

#### Example - check whether an event is an exception

    <script>
        var event = new kendo.data.SchedulerEvent({
            id: 2,
            recurrenceId: 1, //id of the recurrence head event
            title: "Task1",
            start: new Date("2013/4/4"),
            end: new Date("2013/4/4")
        });

        console.log(event.isException()); //logs 'true'
    </script>

### isOccurrence

Checks whether the event is an occurrence part of a recurring series.

#### Returns

`Boolean` return `true` if event is an occurrence.

#### Example - check whether an event is an occurrence

    <script>
        var event = new kendo.data.SchedulerEvent({
            id: 0, //event has a default id
            recurrenceId: 1, //id of the recurrence head event
            title: "Task1",
            start: new Date("2013/4/4"),
            end: new Date("2013/4/4")
        });

        console.log(event.isOccurrence()); //logs 'true'
    </script>

### isRecurring

Checks whether the event is part of a recurring series.

#### Returns

`Boolean` return `true` if event is recurring.

#### Example - check whether an event is an occurrence

    <script>
        var event = new kendo.data.SchedulerEvent({
            id: 0,
            recurrenceId: 1, //id of the recurrence head event
            title: "Task1",
            start: new Date("2013/4/4"),
            end: new Date("2013/4/4")
        });

        var event2 = new kendo.data.SchedulerEvent({
            id: 1,
            title: "Task1",
            start: new Date("2013/4/4"),
            end: new Date("2013/4/4"),
            recurrenceRule: "FREQ=DAILY"
        });

        console.log(event.isRecurring()); //logs 'true'
        console.log(event2.isRecurring()); //logs 'true'
    </script>

### isRecurrenceHead

Checks whether the event is the head of a recurring series.

#### Returns

`Boolean` return `true` if event is a recurrence head.

#### Example - check whether an event is a recurrence head

    <script>
        var event = new kendo.data.SchedulerEvent({
            id: 1,
            title: "Task1",
            start: new Date("2013/4/4"),
            end: new Date("2013/4/4"),
            recurrenceRule: "FREQ=DAILY"
        });

        console.log(event.isRecurrenceHead()); //logs 'true'
    </script>

### toOccurrence

Converts the scheduler event to a event occurrence. Method will remove `recurrenceRule`, `recurrenceException` options, will add a `recurrenceId` field and will set `id` to the default one.

#### Parameters

##### options `Object`

Additional options passed to the SchedulerEvent constructor.

> `uid` property of the event will be preserved.

#### Returns

`kendo.data.SchedulerEvent` the occurrence.

#### Example - create occurrence from a scheduler event

    <script>
        var event = new kendo.data.SchedulerEvent({
            id: 1,
            title: "Task1",
            start: new Date(2013, 10, 11, 12),
            end: new Date(2013, 10, 11, 14),
            recurrenceRule: "FREQ=DAILY"
        });

        var occurrence = event.toOccurrence();

        console.log(occurrence.id); //logs default id
        console.log(occurrence.recurrenceId); //logs id of the head. In this case '1'
        console.log(occurrence.recurrenceRule); //logs 'null'
    </script>

## Events

See the [Model events](/api/framework/model#events) for all inherited events.
