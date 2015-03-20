---
title: Getting reference to the built-in Validator
page_title: Getting reference to the built-in Validator
description: Getting reference to the built-in Validator
---

# Getting reference to the built-in Validator

The example below demonstrates how to get a reference to the built-in Kendo UI Validator using the edit event of the widget.

#### Example:

```html
    <div id="scheduler"></div>
    <script>
      $(function() {
        function scheduler_edit(e) {
          var editable = e.container.data("kendoEditable");
          var validator = e.container.data("kendoValidator");
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
            "agenda"
          ],
          selectable: true,
          edit: scheduler_edit,
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
