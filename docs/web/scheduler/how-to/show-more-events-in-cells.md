---
title: Show more events in the view cells
page_title: Show more events in the view cells
description: Show more events in the view cells
---

# Show more events in the view cells

The example below demonstrates how to increase the height of the cells to show more events

#### Example:

```html
    <style>
        /*increase the height of the cells in day, work week and week views*/
        .k-scheduler-table td, .k-scheduler-table th
        {
          height: 5.5em;
        }

        /*increase the height of the month view cells*/
        .k-scheduler-monthview .k-scheduler-table td
        {
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
                {type: "month", selected: true},
              "agenda"
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
    </script>
```
