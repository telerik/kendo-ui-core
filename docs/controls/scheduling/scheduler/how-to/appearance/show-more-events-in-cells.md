---
title: Show More Events in View Cells
page_title: Show More Events in View Cells | Kendo UI Scheduler
description: "Learn how to show more events in view cells in a Kendo UI Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/show-more-events-in-cells
slug: howto_showmoreevents_inviewcells_scheduler
---

# Show More Events in View Cells

Starting with 2020 R1, developers can now use the [views.eventsPerDay](/api/javascript/ui/scheduler/configuration/views.eventsperday) option, to set the number of events in the `month` view.
For versions of Kendo UI prior to 2020 R1, where the `eventsPerDay` property is not available, increasing the number of events in the `month` view cells must be achieved by using CSS.

Your project might require you to show more events in the Scheduler. The following example demonstrates how to achieve this by increasing the height of the cells.

```dojo
    <style>
        /* increase the height of the cells in day, work week and week views */
        .k-scheduler-table td,
        .k-scheduler-table th {
            height: 5.5em;
        }

        /* The following styles will work only with Kendo UI versions before 2020 R1 */
        /* increase the height of the month view cells */
        .k-scheduler-monthview .k-scheduler-table td {
            height: 15.5em;
        }
    </style>
    <div id="scheduler"></div>
    <script>
        $("#scheduler").kendoScheduler({
            date: new Date("2013/6/13"),
            startTime: new Date("2013/6/13 07:00 AM"),
            height: 600,
            views: [
                "day",
                { type: "workWeek" },
                "week",
                // eventsPerDay is available with 2020 R1 and later version
                { type: "month", selected: true, eventsPerDay: 10 },
                "agenda"
            ],
            timezone: "Etc/UTC",
            dataSource: {
                batch: true,
                transport: {
                    read: {
                        url: "https://demos.telerik.com/kendo-ui/service/tasks",
                        dataType: "jsonp"
                    },
                    update: {
                        url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                        dataType: "jsonp"
                    },
                    create: {
                        url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
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
            },
            resources: [
                {
                    field: "ownerId",
                    title: "Owner",
                    dataSource: [
                        { text: "Alex", value: 1, color: "#f8a398" },
                        { text: "Bob", value: 2, color: "#51a0ed" },
                        { text: "Charlie", value: 3, color: "#56ca85" }
                    ]
                }
            ]
        });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
