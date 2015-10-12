---
title: Retrieve view's date range
page_title: Retrieve view's date range
description: Retrieve view's date range
---

# Retrieve view's date range

The example below demonstrates how to retrieve the date range of the current Scheduler view

#### Example:

```html
<div id="example">
    <div id="scheduler"></div>
    <div class="box wide">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>
</div>
<script>
$(function() {
    function scheduler_view_range(e) {
        var view = this.view();

        //view has:
        //startDate method, which returns the start date of the view
        //endDate method, which returns the end date of the view

        kendoConsole.log(kendo.format("view:: start: {0:d}; end: {1:d};", view.startDate(), view.endDate()));
    }

    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 7:00"),
        height: 400,
        timezone: "Etc/UTC",
        views: [
            "day",
            { type: "week", selected: true },
            "month",
            "agenda",
            "timeline"
        ],
        navigate: scheduler_view_range,
        dataBound: scheduler_view_range,
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks",
                    dataType: "jsonp"
                },
                update: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks/create",
                    dataType: "jsonp"
                },
                destroy: {
                    url: "//demos.telerik.com/kendo-ui/service/tasks/destroy",
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
                    id: "taskID",
                    fields: {
                        taskID: { from: "TaskID", type: "number" },
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
        }
    });
});
</script>
```
