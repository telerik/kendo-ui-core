---
title: Scroll Views Horizontally
page_title: Scroll Views Horizontally | Kendo UI Scheduler
description: "Learn how to scroll the Kendo UI Scheduler views horizontally."
previous_url: /controls/scheduling/scheduler/how-to/scroll-views-horizontally
slug: howto_scroll_views_horizontally_scheduler
---

# Scroll Scheduler Views Horizontally

The Kendo UI Scheduler views are normally 100% wide and depend on the width of the widget.

The following example demonstrates how to expand them and utilize a horizontal scrollbar inside the Scheduler.

```dojo
    <style>
      .k-scheduler-layout:not(.k-scheduler-agendaview) {
        table-layout: fixed;
      }

      .k-scheduler-layout:not(.k-scheduler-agendaview) > tbody > tr > td:first-child {
        width: 80px;
      }

      .k-scheduler-layout:not(.k-scheduler-agendaview) .k-scheduler-content .k-scheduler-table,
      .k-scheduler-layout:not(.k-scheduler-agendaview) .k-scheduler-header .k-scheduler-table {
        width: 6000px
      }
    </style>

    <div id="example" class="k-content">
      <div id="scheduler"></div>
    </div>
    <script>
      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 400,
          views: [
            "day",
            { type: "week", selected: true },
            "month",
            "agenda"
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
          },
          group: {
            resources: ["Rooms", "Attendees"]
          },
          resources: [
            {
              field: "roomId",
              name: "Rooms",
              dataSource: [
                { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
              ],
              title: "Room"
            },
            {
              field: "attendees",
              name: "Attendees",
              dataSource: [
                { text: "Alex", value: 1, color: "#f8a398" },
                { text: "Bob", value: 2, color: "#51a0ed" },
                { text: "Charlie", value: 3, color: "#56ca85" }
              ],
              multiple: true,
              title: "Attendees"
            }
          ]
        });
      });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
