---
title: SchedulerEvent
page_title: API Reference for Kendo Data SchedulerEvent
description: Documentation how to get started with the SchedulerEvent.
res_type: api
---

# kendo.data.SchedulerEvent

The `kendo.data.SchedulerEvent` class represents a data item from the [kendo.data.SchedulerDataSource](/api/framework/schedulerdatasource). Inherits from [kendo.data.Model](/api/framework/model).



## Configuration

### description `String` *(default: "")*

The optional event description.


<div class="meta-api-description">
How can I add notes to a scheduling event in Kendo UI for jQuery? Add or set detailed text notes, descriptions, agendas, contextual information, or annotations for scheduling events to enhance event clarity, improve searchability, support filtering, tooltips, display in editors, provide extra metadata, enable exporting with richer content, and facilitate quick identification or retrieval of events based on descriptive text, keywords, or human-readable summaries.
</div>

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


<div class="meta-api-description">
How do I specify the end date of an event in Kendo UI for jQuery Scheduler? Specify or configure the event's finishing time, end date, or completion timestamp to define when the scheduled activity or appointment concludes, enabling accurate calculation of duration, rendering of time slots, setting of event boundaries, and proper display within calendars or scheduling interfaces. This finishing point is essential for managing event timing, duration computation, slot allocation, end time adjustments, and handling scheduling periods, ensuring precise control over event lifecycles, including start-to-end intervals and time-based planning.
</div>

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

The timezone of the `end` date. If not specified the [timezone](/api/javascript/ui/scheduler/configuration/timezone) will be used.

The complete list of the supported timezones is available in the [List of IANA time zones](https://en.wikipedia.org/wiki/List_of_IANA_time_zones) Wikipedia page.


<div class="meta-api-description">
How to set timezone for event end time in Kendo UI Scheduler? Set or configure the timezone for the ending time of scheduled events to ensure accurate time display and conversion across different regions, handle scenarios where event end times cross multiple timezones, override default timezone settings for event conclusions, specify any standard IANA timezone identifier for precise localization, control how event ending moments are interpreted and rendered in calendar or scheduling applications, manage timezone offsets for event finish times, adapt event end timestamps for users in diverse geographic areas, support correct time calculations when events stretch across global time boundaries, and enable fine-tuning of event completion times for better scheduling accuracy and clarity.
</div>

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


<div class="meta-api-description">
How to assign a unique ID to each event in the Kendo UI Scheduler? Assign a unique identifier to each scheduled event to enable precise referencing, retrieval, updating, or deletion of specific tasks while ensuring no duplicate events occur within the scheduling system; configure and control event identities to manage, track, or manipulate individual scheduler entries reliably through distinct, mandatory IDs that prevent conflicts and facilitate event management workflows.
</div>

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


<div class="meta-api-description">
How do I make Kendo UI Scheduler events span an entire day? Configure events to span an entire day by enabling all-day scheduling, setting appointments or calendar entries to occupy the full 24-hour period without specific start or end times. Control or mark events as whole-day occurrences, ensuring that the date range covers a single day rather than specific hours, useful for vacations, holidays, or full-day tasks. Set or toggle boolean flags to indicate all-day status, affecting how events display and interact with time ranges. Manage calendar entries to appear as all-day without time increments, handling cases where start and end times align on the same date to signal full-day duration. Adjust scheduling logic for events that require no hourly detail but need to block out a full calendar day.
</div>

#### Example - create all day event

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Birthday",
        start: new Date("2013/4/4 00:00"),
        end: new Date("2013/4/4 00:00"),
        isAllDay: true
    });
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(event.isAllDay); // outputs "true"
    </script>

### recurrenceException `String` *(default: undefined)*

The recurrence exceptions. A list of comma separated dates formatted using the `yyyyMMddTHHmmssZ` format string.

> **Important**: The dates should be encoded in UTC.


<div class="meta-api-description">
How can I exclude specific instances from a recurring calendar event in Kendo UI Scheduler? Exclude or skip specific instances from a repeating or recurring calendar event by defining exception dates in a standardized UTC timestamp format. Control which occurrences are omitted from a series by setting a list of date-time strings in the international ISO-like format for precise exclusion of single or multiple events. Customize and manage exceptions to repetitive schedules by specifying one or more exact occurrence dates to be ignored, enabling refined control over which repeated events appear or do not show up in a scheduling or calendar application. Use comma-separated date parameters formatted as year-month-day and time in coordinated universal time (UTC) to precisely configure event recurrence exceptions and prevent certain repetitions.
</div>

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


<div class="meta-api-description">
How do I link an exception event to its original recurring event in a Kendo UI Scheduler? Identify or reference the original recurring event when managing exceptions in a repeating schedule by linking an exception instance to its parent event using a unique identifier, enabling developer control over modifications, updates, or overrides of specific occurrences within a recurring series, configuring exception relationships, tracking changes to repeated events, and ensuring correct event correlation in calendar scheduling or event management systems.
</div>

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

The recurrence rule describing the recurring pattern of the event. The format follows the [iCal specification](https://tools.ietf.org/html/rfc5545). You can find the recurrenceRule information under [section 3.3.10](https://datatracker.ietf.org/doc/html/rfc5545#section-3.3.10).


<div class="meta-api-description">
How to set up recurring events in Kendo UI Scheduler using iCalendar RRULE strings? Set up repeating event schedules by configuring recurrence patterns using standard iCalendar RRULE strings compliant with RFC 5545, enabling control over daily, weekly, monthly, or custom repeating intervals, frequencies, and exceptions within the calendar events. Support for defining complex repeating rules like every nth day, specific weekdays, end dates, counts, or infinite recurrences, useful for automating event repetition without manual entry. Ideal for developers needing to enable, customize, and manage event recurrence systematically using widely supported recurrence syntax for scheduling, calendar integrations, and time-based automation workflows.
</div>

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


<div class="meta-api-description">
How do I set the start date of an event in a Kendo UI Scheduler? Define, configure, or retrieve the starting date and time that marks the beginning of an event within a scheduling system, enabling event timing control, sorting by start times, binding date values for dynamic updates, calculating event durations, detecting conflicts or overlaps between events, synchronizing schedules, and setting precise starting points for calendar entries or appointments.
</div>

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

The timezone of the `start` date. If not specified the [timezone](/api/javascript/ui/scheduler/configuration/timezone) will be used.

The complete list of the supported timezones is available in the [List of IANA time zones](https://en.wikipedia.org/wiki/List_of_IANA_time_zones) Wikipedia page.


<div class="meta-api-description">
How to set the timezone for an event's start date in Kendo UI Scheduler? Configure or specify the timezone for an event’s start date or time, enabling precise control over when an event begins regardless of the global or default calendar timezone settings. Adjust the start date’s timezone using IANA timezone identifiers to ensure accurate scheduling, conversions, or display of start times across different regions or user locales. Set or override event start time context to match particular time zones for events that may span multiple timezones or require exact time localization independently from the system or component-wide timezone configuration. Enable scheduling of events with distinct start time zones, handling scenarios like meetings across timezones, recurring events with local start times, or timezone-aware start time calculations. Control and manage event start time offsets, align start timestamps to specific geographic or regional time zones, and support timezone-sensitive scheduling logic using well-known international timezone codes.
</div>

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


<div class="meta-api-description">
How do I set the title of an event in a Kendo UI Scheduler? Configure or set the text label, display name, subject, or caption for calendar events and appointments in scheduling views, enabling editing, binding, or updating of event titles, labels, or names programmatically or through data models to control how event information is shown within calendar or scheduler interfaces.
</div>

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


<div class="meta-api-description">
How to add notes or descriptions to events in Kendo UI Scheduler? Add or set a customizable text summary, detailed notes, or descriptive information to scheduled events to provide context, explanations, or metadata that can be shown in event views, tooltips, popups, search filtering, exports, or integrated within custom event handling and user interfaces.
</div>

#### Example - get the event description

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00"),
        description: "Lunch with Harry and Steve"
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(event.description); // outputs "Lunch with Harry and Steve"
    </script>

### end `Date`

The date at which the scheduler event ends.


<div class="meta-api-description">
How to set the end time of an event in a Kendo Scheduler? Control or retrieve the ending date and time of a scheduled event, set or update the finish timestamp to define event duration, manage event timing, perform sorting or filtering of events based on their completion, calculate how long events last, display end times in scheduling interfaces, and handle overlapping or conflicting appointments by adjusting or reading event conclusion details.
</div>

#### Example - get the event end date

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(event.end); // outputs the end date
    </script>

### endTimezone `String`

The timezone of the `end` date.


<div class="meta-api-description">
How do I set the timezone for an event's end time in the Kendo UI Scheduler? Specify or configure the timezone for an event’s ending moment to control how the scheduler displays or calculates the event’s finish time across different time zones, allowing adjustments for localization, daylight saving offsets, or cross-regional scheduling; set or manage the timezone context tied to the event’s end timestamp for accurate interpretation, conversion, comparison, or display in calendar views, ensuring events ending in one region reflect the correct time in another, and enabling precise alignment of end times when users query, filter, or manipulate scheduled tasks considering varied geographic or system time zones.
</div>

#### Example - get the event end timezone

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00"),
        endTimezone: "Europe/Sofia"
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(event.endTimezone); // outputs "Europe/Sofia"
    </script>

### id `String|Number|Object`

The unique identifier of the event.


<div class="meta-api-description">
How do I uniquely identify events in my Kendo UI Scheduler? Access and manage unique event identifiers within a scheduler system to retrieve, match, update, delete, or synchronize individual scheduled items; configure or query events by their distinct keys to ensure precise control over event handling, integration with backend systems, and maintaining consistent data models, enabling developers to accurately reference specific calendar entries, tasks, or appointments through a unique event ID field for efficient event tracking and manipulation.
</div>

#### Example - get the event id

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(event.id); // outputs "1"
    </script>

### isAllDay `Boolean`

If set to `true` the event is "all day".


<div class="meta-api-description">
How to determine if a Kendo UI Scheduler event spans the entire day? Control or detect whether a calendar event spans the full day by setting or checking a flag that designates it as an all-day appointment, enabling scheduling systems to differentiate between timed events and those occupying an entire day slot, which influences display rendering, availability calculations, and event filtering for full-day versus timed meetings or tasks.
</div>

#### Example - get the event isAllDay field
    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Birthday",
        start: new Date("2013/4/4 00:00"),
        end: new Date("2013/4/4 00:00"),
        isAllDay: true
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(event.isAllDay); // outputs "true"
    </script>

### recurrenceException `String`

The recurrence exceptions. A list of comma separated dates formatted using the `yyyyMMddTHHmmssZ` format string.


<div class="meta-api-description">
How do I exclude specific dates from recurring events in a Kendo UI Scheduler? Configure or modify excluded dates for recurring calendar events by managing exception dates in the recurrence pattern, specifying individual dates or times to skip within a repeating series, handling exceptions in UTC date-time format to omit specific occurrences from scheduled repeats, setting or updating a list of excluded dates in recurring event schedules, managing date exceptions for repeated events to control which instances do not appear, excluding certain instances in a series of calendar events through formatted date strings, adjusting recurring event patterns by defining skip dates in standardized UTC timestamp formats, controlling exceptions in event recurrence rules to precisely customize which repeated events are omitted or ignored.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(event.recurrenceException); // outputs the recurrence exception
    </script>

### recurrenceId `String|Number|Object`

The `id` of the recurrence parent event.


<div class="meta-api-description">
How do I link recurring event instances to their parent event in a Kendo UI Scheduler? Link individual event instances to their original recurring series by storing the parent event identifier, enabling control over recurring schedules, managing exceptions, updating or deleting single occurrences without affecting the entire repeating event, tracking and referencing parent events, associating occurrences with series, configuring recurrence exceptions, and handling updates specific to one instance within a recurring pattern.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(exception.recurrenceId); // outputs "1"
    </script>

### recurrenceRule `String`

The recurrence rule describing the recurring pattern of the event.


<div class="meta-api-description">
How do I set up recurring events with specific repeat rules in Kendo UI Scheduler? Set, configure, or modify repeating event schedules using a recurrence pattern string based on the iCalendar RRULE standard, enabling control over event frequency, intervals, specific days, months, counts, or end dates for repeated occurrences; this supports creating, updating, serializing, and managing recurring events with customizable repeat rules and handling exceptions separately.
</div>

#### Example - get the event recurrence rule

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        start: new Date("2013/9/2 12:00"),
        end: new Date("2013/9/2 12:30"),
        title: "Lunch",
        recurrenceRule: "FREQ=DAILY"
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(event.recurrenceRule); // outputs "FREQ=DAILY"
    </script>

### start `Date`

The date at which the scheduler event starts.


<div class="meta-api-description">
How do I set the start time of an event in Kendo UI Scheduler? Control or retrieve the starting date and time of a scheduling event to define when the event begins, enabling sorting, filtering, or repositioning of events based on their start timestamp; configure or access the event's commencement moment to manage timelines, adjust schedules, set event durations, or synchronize with calendars by manipulating the initial time marker that determines event placement and sequencing within scheduling systems.
</div>

#### Example - get the event start date
    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(event.start); // outputs the end date
    </script>

### startTimezone `String`

The timezone of the `start` date.


<div class="meta-api-description">
How do I set the timezone for a scheduled event in Kendo UI Scheduler? Set or retrieve the timezone designation associated with the beginning time of a scheduled event to control how start times are interpreted, displayed, converted between zones, compared across different time contexts, serialized for data exchange, and managed during rendering or conflict resolution. Enable configuring the start date’s time zone setting for accurate time calculation, cross-timezone synchronization, event overlap detection, calendar display adjustment, and proper communication with external systems handling event timestamps. Adjust or query the start period’s time zone info to support correct scheduling in multi-region scenarios, time conversions for user interface updates, consistency in date comparisons, and precision when exporting or importing event details.
</div>

#### Example - get the event start timezone

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        startTimezone: "Europe/Sofia",
        end: new Date("2013/4/4 13:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(event.startTimezone); // outputs "Europe/Sofia"
    </script>

### title `String`

The title of the event which is displayed by the scheduler widget.


<div class="meta-api-description">
How do I set the title of an event in a Kendo UI Scheduler? Set, get, or update the human-readable label or name for scheduled events, event titles, or calendar entries, enabling display, editing, and binding of event names, captions, or text labels within scheduling, calendar, or timeline views to control how events appear visually across different interfaces and UI components.
</div>

#### Example - get the event title

    <script>
    var event = new kendo.data.SchedulerEvent({
        id: 1,
        title: "Lunch",
        start: new Date("2013/4/4 12:00"),
        end: new Date("2013/4/4 13:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(event.title); // outputs "Lunch"
    </script>

## Methods

See the [Model methods](/api/framework/model#methods) for all inherited methods.

### define

Defines a new `SchedulerEvent` type using the provided options.


<div class="meta-api-description">
How do I define custom event types for Kendo UI Scheduler? Add or create custom event types for a scheduling system by defining new event schemas, registering event categories, configuring custom event fields, setting default values, mapping event data structures, extending or customizing the event model at runtime or initialization, enabling tailored event definitions, and controlling event type behavior for calendar, timeline, or resource scheduling applications.
</div>

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

Specifies the type of the field. The available options are `"string"`, `"number"`, `"boolean"`, `"date`". The default is `"string"`.

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


<div class="meta-api-description">
How do I clone an event in the Kendo UI Scheduler to create a copy with all its details? Create an exact duplicate of a calendar or scheduling event object to replicate all its details without affecting the original, enabling safe modifications, editing copies, cloning events for temporary changes, generating new events from existing ones, copying event data for updates, or making backup instances before saving changes. This process helps in scenarios like event duplication, event copying for adjustments, creating altered versions without overwriting, and managing multiple similar scheduled entries by cloning their properties efficiently.
</div>

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


<div class="meta-api-description">
How do I get the total duration of an event in milliseconds using Kendo UI Scheduler? Retrieve the length or length of time an event spans in milliseconds using a method that calculates the total duration of a calendar or schedule event, useful for measuring event length, computing time intervals, comparing event spans, summarizing durations, controlling UI elements based on event length, determining elapsed milliseconds, or extracting precise event time spans from scheduling data.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(event.duration());
    </script>

### expand

Expands the event for a specific period based on the `recurrenceRule` option.


<div class="meta-api-description">
How to expand recurring events in Kendo UI Scheduler within a specific date range? Generate or retrieve all individual instances or occurrences of a repeating calendar or scheduling event within a specified date range or timeframe by expanding the recurring pattern based on recurrence rules, allowing you to enumerate, list, render, edit, or manage each occurrence separately for display or manipulation, enabling queries to extract expanded event instances, handle recurrence expansions, and support event iteration, occurrence extraction, recurrence expansion, and scheduling visualization for repeating events within defined start and end boundaries.
</div>

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


<div class="meta-api-description">
How do I dynamically update an existing event in Kendo UI Scheduler after initialization? Modify or change existing calendar or Scheduler event details dynamically by applying updates to event properties, refreshing the event display, and synchronizing changes with the underlying data source and change tracking system. This functionality enables programmatic editing, altering event fields, triggering automatic re-rendering, updating event models post-initialization, and ensuring the Scheduler or calendar interface reflects the latest event information with full data-binding and event change notifications.
</div>

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


<div class="meta-api-description">
How do I determine if an event in my Kendo UI Scheduler lasts more than one day? Check if a scheduled event spans multiple days, lasts 24 hours or more, or extends beyond a single day by using methods to detect multi-day durations; determine event length to apply conditional logic for rendering extended event styles, headers, multi-day labels, or scheduling adjustments based on whether an event is full-day or covers consecutive days, useful for filtering, displaying, or managing overlapping events and planning calendar views that require distinguishing between single-day and multi-day occurrences.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(event.isMultiDay()); //logs 'true'
    </script>

### isException

Checks whether the event is a recurrence exception.


<div class="meta-api-description">
How do I check if a recurring event in Kendo UI for jQuery Scheduler is an exception to its original recurrence pattern? Check if a calendar or scheduler event is an exception to a recurring series by detecting whether it is an edited, modified, skipped, or deleted occurrence that deviates from its original recurrence pattern. This helps identify altered or overridden instances within repeating events for filtering, conditional rendering, special handling, synchronization, exporting, or skipping specific dates that break from the main schedule. Determine if events break the recurrence rule, represent changes to repeating occurrences, or need unique processing compared to regular recurring entries by using methods to evaluate exception status, override states, or recurrence discrepancies, returning a true or false result.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(event.isException()); //logs 'true'
    </script>

### isOccurrence

Checks whether the event is an occurrence part of a recurring series.


<div class="meta-api-description">
How can I tell if an event in my Kendo UI Scheduler is a single occurrence or part of a recurring series? Determine whether an event instance belongs to a single occurrence within a recurring pattern or if it represents a master event or standalone item by checking its recurrence status, useful for distinguishing individual repeated appointments from full series in scheduling, filtering events based on repetition, managing edits or deletions of specific occurrences versus entire recurring sets, identifying recurrence exceptions, controlling display or logic for occurrences versus series masters, verifying event repetition state, and handling recurring event elements programmatically across scheduling applications.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(event.isOccurrence()); //logs 'true'
    </script>

### isRecurring

Checks whether the event is part of a recurring series.


<div class="meta-api-description">
How can I check if a scheduled event is recurring in Kendo UI for jQuery Scheduler? Check if a scheduled event repeats regularly or is part of a recurring sequence to enable conditional rendering, editing, or deleting of individual occurrences versus the entire series, manage exceptions within repeating events, and distinguish between master events and single instances for accurate updates and display logic. This functionality helps detect recurring patterns, control recurrence rules, identify series membership, and implement logic for repeat event handling, series exception management, and event recurrence verification in calendar or scheduling applications.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(event.isRecurring()); //logs 'true'
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(event2.isRecurring()); //logs 'true'
    </script>

### isRecurrenceHead

Checks whether the event is the head of a recurring series.


<div class="meta-api-description">
How to check if a recurring Kendo UI Scheduler event is the main instance in a series? Check if a calendar or scheduling event is the primary or main instance of a recurring pattern, identify the master occurrence in a series to distinguish between the initial event and its repetitions, determine whether an event triggers updates or deletions for the whole recurring series versus just one occurrence or an exception, enable differentiation between the original repeated meeting and its exceptions, configure logic to handle recurring event heads, detect if an event controls the entire series for modifications, find out whether the event is the starting point in repeated event chains, decide on editing rules for single or multiple occurrences, and manage recurring schedules by confirming if an event serves as the anchor or primary event in a recurrence sequence.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(event.isRecurrenceHead()); //logs 'true'
    </script>

### toOccurrence

Converts the scheduler event to a event occurrence. Method will remove `recurrenceRule`, `recurrenceException` options, will add a `recurrenceId` field and will set `id` to the default one.


<div class="meta-api-description">
How to convert recurring events into individual instances in Kendo UI Scheduler? Convert recurring calendar events into individual single event instances for editing, updating, saving, or sending by extracting a specific occurrence from a repeating series. Enable transforming complex recurring events into standalone occurrences with unique identifiers, removing recurrence rules and exceptions while preserving a reference to the original series, allowing developers to manage exceptions, customize single event edits, serialize occurrences independently, and handle updates without affecting the whole recurring pattern. Control and manipulate individual event instances derived from multi-occurrence schedules for flexible calendar event modification, binding, or persistence in scheduling applications.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(occurrence.id); //logs default id
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(occurrence.recurrenceId); //logs id of the head. In this case '1'
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(occurrence.recurrenceRule); //logs 'null'
    </script>

## Events

See the [Model events](/api/framework/model#events) for all inherited events.
