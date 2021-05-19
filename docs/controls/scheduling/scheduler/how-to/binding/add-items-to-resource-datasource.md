---
title: Insert New Items into Resource DataSource
page_title: Insert New Items into Resource DataSource | Kendo UI Scheduler
description: "Learn how to insert new items into a resource DataSource in a Kendo UI Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/add-items-to-resource-datasource
slug: howto_insert_items_in_resource_datasource_scheduler
---

# Insert New Items into Resource DataSource

The following example demonstrates how to insert new items into a resource DataSource in the Scheduler.

```dojo
<style>html { font-size: 12px; font-family: Arial, Helvetica, sans-serif; }</style>
    <div id="example" class="k-content">
      <button onclick="insertResources()">Insert new items in the 'rooms' DataSource</button>
      <div id="scheduler"></div>
    </div>
    <script>

      function insertResources() {
        var scheduler = $("#scheduler").data("kendoScheduler");
        var resource = scheduler.resources[0];

        resource.dataSource.add({ text: "Meeting Room 201", value: 2, color: "#ebeeee" });
        resource.dataSource.add({text: "Meeting Room 301", value: 3, color: "#ff0033" });
        resource.dataSource.add({ text: "Meeting Room 401", value: 4, color: "#33ff11" });

        scheduler.view(scheduler.view().name);
      }

      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
            "day",
            { type: "week", selected: true },
            "month",
            "agenda"
          ],
          resources: [
            {
              field: "roomId",
              dataSource: [
                { text: "Meeting Room 101", value: 1, color: "#6eb3fa" }
              ],
              title: "Room"
            },
            {
              field: "attendees",
              dataSource: [
                { text: "Alex", value: 1, color: "#f8a398" },
                { text: "Bob", value: 2, color: "#51a0ed" },
                { text: "Charlie", value: 3, color: "#56ca85" }
              ],
              multiple: true,
              title: "Attendees"
            }
          ],
          timezone: "Etc/UTC",

          dataSource: {
            batch: true,
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/meetings",
                dataType: "jsonp"
              },
              update: {
                url: "https://demos.telerik.com/kendo-ui/service/meetings/update",
                dataType: "jsonp"
              },
              create: {
                url: "https://demos.telerik.com/kendo-ui/service/meetings/create",
                dataType: "jsonp"
              },
              destroy: {
                url: "https://demos.telerik.com/kendo-ui/service/meetings/destroy",
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
                id: "meetingID",
                fields: {
                  meetingID: { from: "MeetingID", type: "number" },
                  title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                  start: { type: "date", from: "Start" },
                  end: { type: "date", from: "End" },
                  startTimezone: { from: "StartTimezone" },
                  endTimezone: { from: "EndTimezone" },
                  description: { from: "Description" },
                  recurrenceId: { from: "RecurrenceID" },
                  recurrenceRule: { from: "RecurrenceRule" },
                  recurrenceException: { from: "RecurrenceException" },
                  roomId: { from: "RoomID", nullable: true },
                  attendees: { from: "Attendees", nullable: true },
                  isAllDay: { type: "boolean", from: "IsAllDay" }
                }
              }
            }
          }
        });
      });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
