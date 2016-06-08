---
title: Overview
page_title: Overview | Kendo UI Scheduler
description: "Learn how to initialize and configure the Kendo UI Scheduler widget."
slug: overview_kendoui_scheduler_widget
position: 1
---

# Scheduler Overview

The [Kendo UI Scheduler widget](http://demos.telerik.com/kendo-ui/scheduler/index) displays a set of events&mdash;appointments or tasks. It can display scheduled events in different views&mdash;a single day, a whole week, or month and as a list of tasks which need to be accomplished.

## Getting Started

### Initialize the Scheduler

1. Include the Kendo UI JavaScript and CSS files. For more information on how to add these to your project, refer to the [article on getting started with Kendo UI]({% slug getting_started_installation_kendoui %}).
2. Kendo UI Scheduler needs a data source to be bound to and uses a special type of Kendo UI DataSource: [`kendo.data.SchedulerDataSource`](/api/framework/schedulerdatasource). The `SchedulerDataSource` contains instances of a custom Kendo UI model: [`kendo.data.SchedulerEvent`](/api/framework/schedulerevent), which represents the event data items of the Scheduler.

> **Important**
>
> To enable editing of the events and working with recurring event, you must define all fields of the [`kendo.data.SchedulerEvent`](/api/framework/schedulerevent) in the dataSource [`schema.model`](/api/framework/datasource#configuration-schema.model).

### Bind to Local Array

When binding the Scheduler to a local array, you can switch from a "day" to a "week" view, edit the events, create new events, and delete existing ones. However, these changes will not be kept in-memory, which essentially means that they will be lost when the user refreshes the page.

The example below demonstrates how to initialize a Scheduler with two events and how to bind it to an array of JavaScript objects.

###### Example

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

### Bind to Remote Service

Binding a Kendo UI Scheduler widget to a remote service persists its events. This means that users are able to return, update, or delete them.

For more information on Scheduler remote data binding examples based on sample scheduler events, see [Kendo UI online demo library](http://demos.telerik.com/kendo-ui/web/scheduler/). Note that to support cross-domain requests, the remote service uses [JSONP](http://en.wikipedia.org/wiki/JSONP).

> **Important**
>
> If your own service lives in the same domain as the website, you do not need to use JSONP&mdash;use JSON instead.

For more information on cross-domain requests, see [this article](/framework/datasource/cors).

The example below demonstrates how to bind the Scheduler to a remote service.

###### Example

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


Note the way the fields of the scheduler event are configured in the `schema.model` section and mapped to the fields returned by the remote service using the `from` option.

### kendo.data.SchedulerEvent

The `kendo.data.SchedulerEvent` object has the following fields:

* description `String` - the text description of the Scheduler event.
* end `Date` - the date on which the event ends.
* id `Number` - the unique identifier of the Scheduler event. Events whose `id` is not set are considered new.
* `isAllDay Boolean` - if the event is all day or not.
* `recurrenceException String` - the recurrence exceptions.
* `recurrenceId String|Number|Object` - the `id` of the recurrence parent. If set the current event is a recurrence exception.
* `recurrenceRule String` - the recurrence rule which describes the repetition pattern of the event; follows the [rfc5545](http://tools.ietf.org/html/rfc5545) specification.
* start `Date` - the date on which the event starts.
* title `String` - the title of the event which is displayed in the scheduler views.

If your remote service stores and returns the Scheduler events in a different format, use the `schema.model.fields` and `schema.model.id` options of the data source to describe them.

The example below demonstrates how to map remote service fields to client-side scheduler event fields.

###### Example

        schema: {
            model: {
                id: "taskId", // The "id" of the event is the "taskId" field. Mandatory.
                fields: {
                    // Describe the Scheduler event fields and map them to the fields returned by the remote service
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

> **Important**
>
> When using `schema.model.fields`, make sure you list all `kendo.data.SchedulerEvent` fields. The fields which represent the `id` of the event must also be set via `schema.model.id`.

### Best Practices

When binding to a remote service, it is advisable, while not mandatory, to do the following:

1. Set the [`timezone`](/api/web/scheduler#configuration-timezone) option of the Scheduler. It is used to tell the widget in what timezone its events are created and stored on the server. If the timezone is not set, the Scheduler will use the current timezone. This means that users with different timezone settings will see different start and end times. Setting the timezone of the Scheduler will make the widget display the same start and end times regardless of the current user timezone. For more information on timezones and how Kendo UI Scheduler works with them, see the [article about timezones](/web/scheduler/timezones).

2. Send the Scheduler event date fields (start and end) to the remote service in [UTC format](http://en.wikipedia.org/wiki/Coordinated_Universal_Time). The `parameterMap` option from the previous example does the same:

        parameterMap: function(options, operation) {
            if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
            }
        }
3. Store the Scheduler event date fields (start and end) in UTC format as well. This allows for the easier migration of your data between servers in different timezones.

## Configuration

### Views

Kendo UI Scheduler supports different views to display its events. These are:

- `day` - displays the events in single day.
- `week` - displays the events in a whole week.
- `workWeek` - displays the events in a work week.
- `month` - displays the events in a single month.
- `agenda` - displays the events from the current date until the next week (7 days).

The `day` and `week` views are enabled by default. To enable other views or configure them, use the [`views`](/api/web/scheduler#configuration-views) option.

The example below demonstrates how to enable all Scheduler views.

###### Example

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

### Printing

Kendo UI Scheduler may be scrollable when displayed on a web page. However, it should not be scrollable during printing.

The example below demonstrates how to ensure that the widget expands and displays all events in the current view during printing.

###### Example

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

The code in the example above works in Internet Explorer and Google Chrome.

The example below demonstrates how to trigger the same behavior in Firefox as it ignores the `overflow-y` style.

###### Example

    @media print {
        /* the same rules as above... */

        .k-ff .k-scheduler-content
        {
            margin-right: 17px !important;
        }
    }

<!--*-->
`17px` is a hard-coded value, which should match the scrollbar width. It can be calculated and set with Javascript before printing if desired.

In addition, the Scheduler needs a fixed pixel width for itself or some of its ancestors. Otherwise, it may resize during printing, which will cause the displayed absolutely positioned events to become misaligned. If the widget is part of a fluid layout, a fixed width can be set only for the printing task and then removed, as demonstrated in the example below.

###### Example

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

> **Important**
>
> Due to an Internet Explorer bug, related to absolutely positioned elements inside tables, the Scheduler events will be printed over their correct time slots only if the widget fits on one page.

### Adaptive Rendering Mode

Kendo UI Scheduler supports adaptive enhancements like changes in styling and behavior in order to remain consistent with the specific user device experience. For instance, when editing on a mobile device, Kendo UI will slide in a new screen for the user, which is a departure from the more desktop-like popup behaviors.

To enable the adaptive rendering feature, set the [`mobile`](/api/javascript/ui/scheduler#configuration-mobile) property to `true`, `"phone"` or `"tablet"`.

Each adaptive Scheduler is rendered inside a separate Kendo UI Mobile Pane. Since the panes are absolutely positioned, they can overlap with other content on the page. To avoid this, wrap the Scheduler inside a `<div>` container that has a `position:relative` style and a set `height`. The `height` must be consistent with the Scheduler's height. Note that the absolute position is required for the transitions between the main and editing views to work correctly.

The example below demonstrates how to configure the adaptive rendering mode of the Scheduler.

###### Example

    <style>
        .adaptive-scheduler-wrapper {
            position: relative;
            height: 400px;
        }
    </style>

    <div class="adaptive-scheduler-wrapper">
        <div id="scheduler1"></div>
    </div>

## Scheduler API

### Methods and Fields

Kendo UI Scheduler exposes a set of [methods](/api/web/scheduler#methods) and [fields](/api/web/scheduler#fields) you can use.

The example below demonstrates how to apply the Scheduler API.

###### Example

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

### Events

Kendo UI Scheduler supports a set of [events](/api/web/scheduler#events) you can subscribe to.

There are two ways to handle events:

* Specify the JavaScript function which will handle the event during the initialization of the widget.
* Use the `bind` method of the widget after initialization.

The event handler is the JavaScript function invoked when the event is fired. The argument of the event handler is a JavaScript object which contains event specific data. Get a reference of the widget, which fired the event, via the `sender` field of the event argument. The function context of the event handler (available via the `this` keyword) is set to the instance of the widget which fired the event.

The example below demonstrates how to subscribe to a Scheduler event during the initialization of the widget.

###### Example

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

The example below demonstrates how to subscribe to a Scheduler event by using the `bind` method.

###### Example

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

## Reference

### Existing Instances

Make a reference to an existing Scheduler instance via `jQuery.data()` and then pass `kendoScheduler` as an argument. Once a reference has been established, you can use the API to control its behavior.

The example below demonstrates how to access an existing Scheduler instance.

###### Example

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

## Known Limitations

### Time-Frames between Two Days

The built-in views of the widget are designed to render a time-frame that ends on the day it starts. If you want to render views which start on one day and end on another, build a custom view.

For more information on how to create custom views, refer to [this how-to example]({% slug howto_create_custom_view_inheriting_builtinview_scheduler %}).

## See Also

Other articles on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [Resources]({% slug resources_kendoui_scheduler_widget %})
* [Timezones]({% slug timezones_kendoui_scheduler_widget %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Scheduler Widget](/aspnet-mvc/helpers/scheduler/mvc-scheduler-overview)
* [Overview of the Scheduler JSP Tag]({% slug overview_scheduler_uiforjsp %})
* [Overview of the Scheduler PHP Class](/php/widgets/scheduler/overview)

For how-to examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
