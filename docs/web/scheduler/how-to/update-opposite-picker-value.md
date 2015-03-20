---
title: Update the opposite picker value on model change
page_title: Update the opposite picker value on model change
description: Update the opposite start/end picker value on model change
---

# Update the opposite picker value on model change

The example below demonstrates how to update the opposite start/end picker value on model change

#### Example:

```html
<div id="scheduler"></div>
<script>
$(function() {
    $("#scheduler").kendoScheduler({
        edit: function(e) {
          var scheduler_event = e.event;
          var startInputs = e.container.find("[data-container-for=start]").find("input");
          var endInputs = e.container.find("[data-container-for=end]").find("input");

          scheduler_event.bind("change", function(e) {
            /*
            //Update model using last widgets values
            if (e.field === "start" || e.field === "end") {
                startInputs.add(endInputs).each(function() {
                var element = $(this);
                var widgetType = element.is("[data-role=datepicker]") ? "kendoDatePicker" : "kendoDateTimePicker";

                element.data(widgetType).trigger("change");
              });
            }
            */

            //Move end date on start update
            if (e.field === "start") {
              var date = new Date(scheduler_event.start);
              date.setMinutes(date.getMinutes() + 30);

                endInputs.each(function() {
                var element = $(this);
                var widgetType = element.is("[data-role=datepicker]") ? "kendoDatePicker" : "kendoDateTimePicker";

                element.data(widgetType).value(date);
                element.data(widgetType).trigger("change");
              });
            }
          });
        },
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 07:00 AM"),
        height: 600,
        views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month",
            "agenda",
            { type: "timeline", eventHeight: 50}
        ],
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
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
});
</script>
```
