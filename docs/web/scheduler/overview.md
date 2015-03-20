---
title: Overview
page_title: Overview of the Kendo UI Scheduler widget
description: Quick steps to help you create a Kendo UI Scheduler.
---

# Scheduler Overview

The Kendo UI Scheduler widget displays a set of events (a.k.a. appointments or tasks). It can display the scheduler events in different views - a single day, a whole week or month and as a list of tasks which need to be accomplished.



## Getting Started

The first steps are to include the Kendo UI JavaScript and CSS files. Those steps are described in detail in the [introduction](/introduction#kendo-ui-web) help topic so we won't repeat them here.
The next thing a Kendo UI Scheduler needs is a data source to be bound to. The scheduler uses a special type of Kendo UI DataSource - the [kendo.data.SchedulerDataSource](/api/framework/schedulerdatasource).
The `SchedulerDataSource` contains instances of a custom Kendo UI model - [kendo.data.SchedulerEvent](/api/framework/schedulerevent) - which represent the scheduler event data items.

## Binding to local JavaScript array

Let's bind the Kendo UI Scheduler widget. The easiest thing to do is provide the scheduler events as an array of JavaScript objects. Here is a minimal working example:

### Example - binding to array of JavaScript objects

    <!-- HTML element in which the Kendo UI Scheduler will initialize -->
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"), // The current date of the scheduler
      dataSource: [ // The kendo.data.SchedulerDataSource configuration
        // First scheduler event
        {
          id: 1, // Unique identifier. Needed for editing.
          start: new Date("2013/6/6 08:00 AM"), // Start of the event
          end: new Date("2013/6/6 09:00 AM"), // End of the event
          title: "Breakfast" // Title of the event
        },
        // Second scheduler event
        {
          id: 2,
          start: new Date("2013/6/6 10:15 AM"),
          end: new Date("2013/6/6 12:30 PM"),
          title: "Job Interview"
        }
      ]
    });
    </script>

This example initializes a scheduler widget with two events in it. You can switch from "day" to "week" view, edit the events, create new events and delete existing ones. Any changes however will be kept in-memory and will
be lost when the user refreshes the page. This is why a scheduler will most likely be bound to a remote service which will persist the scheduler events.

## Binding to remote service

In most cases the Kendo UI Scheduler widget would be bound to a remote service which will return, update or delete scheduler events. The Kendo UI [online demos](http://demos.telerik.com/kendo-ui/web/scheduler/) use
a demo remote service which returns sample scheduler events. That service uses [JSONP](http://en.wikipedia.org/wiki/JSONP) in order to support cross-domain requests.

> The demo service uses JSONP in order to be accessible cross-domain. If your own service lives in the same domain as the web site you don't need to use JSONP - you can use JSON instead. More information
about cross-domain requests can be found [here](/howto/use-cors-with-all-modern-browsers).

### Example - binding to remote service

    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/13"),
        timezone: "Etc/UTC", // Setting the timezone is recommended when binding to a remote service.
        dataSource: {
            batch: true, // Enable batch updates
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/tasks",
                    dataType: "jsonp"
                },
                update: {
                    url: "http://demos.telerik.com/kendo-ui/service/tasks/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "http://demos.telerik.com/kendo-ui/service/tasks/create",
                    dataType: "jsonp"
                },
                destroy: {
                    url: "http://demos.telerik.com/kendo-ui/service/tasks/destroy",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            schema: {
                model: {
                    id: "taskId", // The "id" of the event is the "taskId" field
                    fields: {
                        // Describe the scheduler event fields and map them to the fields returned by the remote service
                        taskId: {
                            from: "TaskID", // The 'TaskID' server-side field is mapped to the 'taskId' client-side field
                            type: "number"
                        },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            }
        }
    });

It is important to note how the fields of the scheduler event are configured (in the `schema.model` section) and mapped to the fields returned by the remote service using the `from` option.

When binding to a remote service the following are recommended (but not mandatory):

1. Set the [timezone](/api/web/scheduler#configuration-timezone) option of the scheduler. It is used to tell the scheduler in what timezone the scheduler events are created and stored on the server. If the timezone is not
set the scheduler will use the current timezone. This means that users with different timezone settings will see different start and end times. Setting the timezone of the scheduler would make it display the same
start and end times regardless of the current user timezone.
1. Send the scheduler event date fields (start and end) in [UTC](http://en.wikipedia.org/wiki/Coordinated_Universal_Time) to the remote service. The `parameterMap` option from the previous example does the same:

        parameterMap: function(options, operation) {
            if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
            }
        }
1. Store the scheduler event date fields (start and end) in UTC format as well. This would allow easier migration of your data between servers in different timezone.

## The fields of kendo.data.SchedulerEvent

The `kendo.data.SchedulerEvent` object has the following fields:

* description `String` - the text description of the scheduler event.
* end `Date` - the date at which the event ends.
* id `Number` - the unique identifier of the scheduler event. Events whose `id` is not set are considered as "new".
* isAllDay `Boolean` - if the event is "all day" or not.
* recurrenceException `String` - the recurrence exceptions.
* recurrenceId `String|Number|Object` - the `id` of the recurrence parent. If set the current event is a recurrence exception.
* recurrenceRule `String` - the recurrence rule which describes the repetition pattern of the event. Follows the [rfc5545](http://tools.ietf.org/html/rfc5545) specification.
* start `Date` - the date at which the event starts.
* title `String` - the title of the event which is displayed in the scheduler views.

If your remote service stores and returns the scheduler events in a different format use the `schema.model.fields` and `schema.model.id` options of the data source to describe them.
The "remote service binding" example shown above shows how to map remote service fields to client-side scheduler event fields:

        schema: {
            model: {
                id: "taskId", // The "id" of the event is the "taskId" field. Mandatory.
                fields: {
                    // Describe the scheduler event fields and map them to the fields returned by the remote service
                    taskId: {
                        from: "TaskID", // The 'TaskID' server-side field is mapped to the 'taskId' client-side field
                        type: "number"
                    },
                    title: {
                        from: "Title", // The 'Title' server-side field is mapped to the 'title' client-side field
                        defaultValue: "No title",
                        validation: { required: true }
                    },
                    start: {
                        type: "date",
                        from: "Start" // The 'Start' server-side field is mapped to the 'start' client-side field
                    },
                    end: {
                        type: "date",
                        from: "End" // The 'End' server-side field is mapped to the 'end' client-side field
                    },
                    description: {
                        from: "Description"
                    },
                    recurrenceId: { from: "RecurrenceID" },
                    recurrenceRule: { from: "RecurrenceRule" },
                    recurrenceException: { from: "RecurrenceException" },
                    isAllDay: { type: "boolean", from: "IsAllDay" }
                }
            }
        }

> All `kendo.data.SchedulerEvent` fields must be listed when using `schema.model.fields`. The fields which represents the `id` of the event must also be set via `schema.model.id`.

## Views

Kendo UI Scheduler can display its events in different "views". The following views are supported:

- day - displays the events in single day.
- week - displays the events in a whole week.
- workWeek - displays the events in a work week.
- month - display the events in single month.
- agenda - display the events from the current date till next week (7 days).

The "day" and "week" views are enabled by default. To enable other views or configure them use the [views](/api/web/scheduler#configuration-views) option:

### Example - enable all scheduler views

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        "day", // a view configuration can be a string (the view type) or an object (the view configuration)
        { type: "week", selected: true }, // the "week" view will appear as initially selected
        "month",
        "agenda"
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        },
        {
          id: 2,
          start: new Date("2013/6/6 10:15 AM"),
          end: new Date("2013/6/6 12:30 PM"),
          title: "Job Interview"
        }
      ]
    });
    </script>

## Getting reference to a Kendo UI Scheduler

To get a reference to a Kendo UI Scheduler instance, use the jQuery `data` and pass "kendoScheduler" as argument:

### Example - get reference to a Kendo UI Scheduler

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ]
    });
    // Get reference to the kendo.ui.Scheduler instance
    var scheduler = $("#scheduler").data("kendoScheduler");
    </script>

## Using the API of Kendo UI Scheduler

The scheduler widget exposes a set of [methods](/api/web/scheduler#methods) and [fields](/api/web/scheduler#fields) which the developer can use.

### Example - using the API of Kendo UI Scheduler

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ]
    });
    // Get reference to the kendo.ui.Scheduler instance
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.view("week"); // Go to week view
    </script>

## Subscribing to the events of Kendo UI Scheduler

The scheduler widget supports a set of [events](/api/web/scheduler#events) which the developer can subscribe to. There are two ways to handle events:

* Specify the JavaScript function which will handle the event during widget initialization.
* Use the `bind` method of the widget.

The event handler is the JavaScript function invoked when the event is fired. The argument of the event handler is a JavaScript object which contains event specific data.
You can get a reference of the widget which fired the event via the `sender` field of the event argument.
The function context of the event handler (available via the `this` keyword) is set to the instance of the widget which fired the event.

### Example - subscribe to a scheduler event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ],
      edit: function(e) {
        console.log("edit");
      }
    });
    </script>

### Example - subscribe to a scheduler event using the bind method

    <div id="scheduler"></div>
    <script>
    function scheduler_edit(e) {
        console.log("edit");
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("edit", scheduler_edit);
    </script>

## Printing

The Scheduler may be scrollable when displayed on a web page, but it should not be scrollable during printing.
The following CSS code will ensure that the widget expands and displays all events in the current view during printing:

	@media print {
	   .k-scheduler,
	   .k-scheduler-content,
	   .k-scheduler-times
	   {
		  height: auto !important;
	   }

	   .k-scheduler-content
	   {
		  overflow-y: scroll !important;
	   }
	}

The above will work in Internet Explorer and Google Chrome. Firefox will ignore the `overflow-y` style, that's why it needs a different approach:

    @media print {
        /* the same rules as above... */
        
        .k-ff .k-scheduler-content
        {
            margin-right: 17px !important;
        }
    }

`17px` is a hard-coded value, which should match the scrollbar width. It can be calculated and set with Javascript before printing, if desired.

In addition, the Scheduler needs a fixed pixel width for itself or some of its ancestors, otherwise it may resize during printing,
which will cause the displayed absolutely positioned events to become misaligned.
If the widget is part of a fluid layout, a fixed width can be set only for the printing task, and then removed:

    <button id="printPage" type="button">Print</button>

    <div id="scheduler"></div>

    <script>

        $("#printPage").click(function(e){
            var schedulerElement = $("#scheduler")
            schedulerElement.width(900);
            // readjust events' positions
            schedulerElement.data("kendoScheduler").resize();
            window.print();
            // restore previous Scheduler layout
            schedulerElement.width("");
            schedulerElement.data("kendoScheduler").resize();
        });

        $("#scheduler").kendoScheduler({
            // ...
        });

    </script>
    
>Due to an Internet Explorer bug related to absolutely positioned elements inside tables, the Scheduler events will be printed over their correct time slots only if the widget fits on one page!