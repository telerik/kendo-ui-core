---
title: Set slot background color using slot templates
page_title: Set slot background color using slot templates
description: Set slot background color using slot templates
---

# Set slot background color using slot templates

The example below demonstrates how to set the slot (cell) background color using `slotTemplate` and `allDaySlotTemplate` based on the slot date.

#### Example:

```html
    <div id="scheduler"></div>
    <style>
      /* Remove the padding of scheduler slots */
      .k-scheduler-table td, .k-scheduler-table th 
      {
        padding: 0;
      }
    </style>
    <script>
      function getColorBasedOnHour(date) {
        var difference = date.getTime() - kendo.date.getDate(date);
        var hours = difference / kendo.date.MS_PER_HOUR;
    
        if (hours >= 8 && hours < 12) {
          return "#CC66FF";
        } else if (hours >= 13 && hours < 17) {
          return "#CC0099";
        } else {
          return "#33CCFF";
        }
      }
    
      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          allDaySlotTemplate: "<div style='background:\\#A2A2AA; height: 100%;width: 100%;'></div>",
          slotTemplate: "<div style='background:#=getColorBasedOnHour(date)#; height: 100%;width: 100%;'></div>",
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
                { text: "Alex", value: 1},
                { text: "Bob", value: 2},
                { text: "Charlie", value: 3}
              ]
            }
          ]
        });
      });
    </script>
```
