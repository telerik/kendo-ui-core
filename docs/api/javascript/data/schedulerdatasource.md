---
title: SchedulerDataSource
page_title: API Reference for Kendo UI SchedulerDataSource
description: Learn more about the configuration of Kendo UI SchedulerDataSource, methods and events.
res_type: api
---

# kendo.data.SchedulerDataSource

The data source used by the [kendo.ui.Scheduler](/api/javascript/ui/scheduler) widget.
Inherits from [kendo.data.DataSource](/api/framework/datasource). The SchedulerDataSource contains instances of the
[kendo.data.SchedulerEvent](/api/framework/schedulerevent) class.



## Configuration

See the [DataSource configuration](/api/framework/datasource#configuration) for all inherited configuration options.

### schema `Object`

The schema configuration of the SchedulerDataSource.


<div class="meta-api-description">
How do I configure the event data structure for my Kendo UI Scheduler with a custom schema? Configure event data structure and parsing rules for scheduling systems by defining data models, field mappings, unique identifiers, date and string types, custom parse functions, and handling nested or complex event objects to control how events are loaded, validated, and interpreted within calendar or scheduler components. Enable precise control over event data format, validation methods, data transformation, and field correspondence for accurate schedule rendering and interaction by setting up mapping schemas that dictate how raw event input is converted into structured and typed scheduling items, supporting diverse input formats and ensuring consistent event handling.
</div>

#### Example

    <script>
    var dataSource = new kendo.data.SchedulerDataSource({
        transport: {
            read: {
                url: "https://demos.telerik.com/service/v2/core/tasks"
            }
        },
        schema: {
            timezone: "Europe/Sofia",
            model: {
                id: "taskId",
                fields: {
                    taskId: { from: "TaskID", type: "number" },
                    title: { from: "Title", validation: { required: true } },
                    start: { type: "date", from: "Start" },
                    end: { type: "date", from: "End" },
                    description: { from: "Description" },
                    isAllDay: { type: "boolean", from: "IsAllDay" }
                }
            }
        }
    });
    </script>

### schema.model `Object`

The model configuration of the SchedulerDataSource. See [SchedulerEvent](/api/framework/schedulerevent#configuration) for more info.


<div class="meta-api-description">
How do I customize the event model schema in Kendo UI Scheduler's data source? Define and customize the structure and mapping of event records in the Scheduler’s data source by setting the event model schema, including specifying field names, types, default values, unique identifiers, and mapping fields like start time, end time, title, and recurrence. Control how event data is parsed, converted, and synchronized for accurate reading and writing within the Scheduler, enabling configuration, customization, or adjustment of event record formats, field bindings, and data transformations to fit diverse scheduling data models and user requirements.
</div>

#### Example - configure the data source model schema

    <script>
    var dataSource = new kendo.data.SchedulerDataSource({
        batch: true,
        transport: {
            read: {
                url: "https://demos.telerik.com/service/v2/core/tasks"
            },
            update: {
                url: "https://demos.telerik.com/service/v2/core/tasks/update",
                type: "POST",
                contentType: "application/json"
            },
            create: {
                url: "https://demos.telerik.com/service/v2/core/tasks/create",
                type: "POST",
                contentType: "application/json"
            },
            destroy: {
                url: "https://demos.telerik.com/service/v2/core/tasks/destroy",
                type: "POST",
                contentType: "application/json"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                }
            }
        },
        schema: {
            model: {
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
            }
        }
    });
    dataSource.fetch(function() {
        var event = this.at(0);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(event.title); // outputs "Bowling tournament"
    });
    </script>

### schema.timezone `String`

The timezone which the data source will use to convert the scheduler event dates. By default the current system timezone is used.
If the data source is initialized by the scheduler, its [timezone](/api/javascript/ui/scheduler/configuration/timezone) option will be used.

The complete list of the supported timezones is available in the [List of IANA time zones](https://en.wikipedia.org/wiki/List_of_IANA_time_zones) Wikipedia page.


<div class="meta-api-description">
How to configure time zone handling for scheduling data in Kendo UI Scheduler? Configure and control how event start and end dates are interpreted, converted, and normalized across different time zones by setting the data source timezone or overriding the default system or scheduler time zone settings. Manage time zone handling for scheduling data, adjust for global user locations, handle conversions between event local times and UTC, and ensure consistent date and time calculations regardless of the server or client environment. Enable specifying or changing the time zone context for calendar events, support IANA time zone identifiers for accurate international time management, and customize how scheduling data aligns with various geographical and daylight saving time rules.
</div>

#### Example - configure the data source model

    <script>
    // include kendo.timezones.js
    var version = kendo.version;

    $('<script/>', { 
        type:'text/javascript', 
        src:'https://kendo.cdn.telerik.com/'+version+'/js/kendo.timezones.min.js'
    }).appendTo('head');
    
    var dataSource = new kendo.data.SchedulerDataSource({
        batch: true,
        transport: {
            read: {
                url: "https://demos.telerik.com/service/v2/core/tasks"
            },
            update: {
                url: "https://demos.telerik.com/service/v2/core/tasks/update",
                type: "POST",
                contentType: "application/json"
            },
            create: {
                url: "https://demos.telerik.com/service/v2/core/tasks/create",
                type: "POST",
                contentType: "application/json"
            },
            destroy: {
                url: "https://demos.telerik.com/service/v2/core/tasks/destroy",
                type: "POST",
                contentType: "application/json"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                }
            }
        },
        schema: {
            timezone: "Europe/London", // Use the London timezone
            model: {
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
            }
        }
    });
    dataSource.fetch(function() {
        var event = this.at(0);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(event.start); // outputs converted date based on defined timezone
    });
    </script>

## Methods

See the [DataSource methods](/api/framework/datasource#methods) for all inherited methods.

### expand

Expands all recurring events in the data and returns a list of events for a specific period.


<div class="meta-api-description">
How can I expand recurring events in Kendo UI Scheduler for a specific date range? Generate individual event occurrences from recurring schedules within a specified date range by expanding recurrence patterns into concrete event instances; configure, retrieve, or filter all expanded events for specific time intervals, fully unfolding recurring rules into a collection of discrete occurrences to facilitate rendering, processing, querying, or binding only the events active during a desired period.
</div>

#### Parameters

##### start `Date`

The start date of the period.

##### end `Date`

The end date of the period.

#### Returns

`Array` the expanded list of scheduler events filtered by the specified start/end period.

#### Example - get all occurrences for a specific period

    <script>
        var dataSource = new kendo.data.SchedulerDataSource({
            data: [
                new kendo.data.SchedulerEvent({
                    id: 1,
                    title: "Event1",
                    start: new Date("2013/4/4 12:00"),
                    end: new Date("2013/4/4 14:00")
                }),
                new kendo.data.SchedulerEvent({
                    id: 2,
                    title: "Recurring event",
                    start: new Date("2013/4/4 15:00"),
                    end: new Date("2013/4/4 17:00"),
                    recurrenceRule: "FREQ=DAILY"
                })
            ]
        });

        dataSource.fetch();

        //returns list of expanded occurrences
        var occurrences = dataSource.expand(new Date("2013/4/1"), new Date("2013/5/1"));
    </script>
