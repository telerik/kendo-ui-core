---
title: Hide header and footer (adaptive rendering)
page_title: Hide header and footer (adaptive rendering)
description: Hide header and footer (adaptive rendering)
---

# Hide header and footer (adaptive rendering)

The example below demonstrates how to hide header and footer when Scheduler is used in adaptive rendering

#### Example:

```html
    <div data-role="view" data-init="initScheduler">
      <header data-role="header"></header>
      <div id="scheduler"></div>
    </div>
    <script>
      function initScheduler() {
        $("#scheduler").kendoScheduler({
          footer: false,
          date: new Date("2013/6/26"),
          startTime: new Date("2013/6/26 07:00 AM"),
          height: kendo.support.mobileOS.wp ? "28em" : 600,
          views: [
            "day"
          ],
          mobile: "phone",
          timezone: "Etc/UTC",
          dataSource: {
            batch: true,
            transport: {
              read: {
                url: "http://demos.telerik.com/kendo-ui/service/meetings",
                dataType: "jsonp"
              },
              update: {
                url: "http://demos.telerik.com/kendo-ui/service/meetings/update",
                dataType: "jsonp"
              },
              create: {
                url: "http://demos.telerik.com/kendo-ui/service/meetings/create",
                dataType: "jsonp"
              },
              destroy: {
                url: "http://demos.telerik.com/kendo-ui/service/meetings/destroy",
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
                  atendees: { from: "Atendees", nullable: true },
                  isAllDay: { type: "boolean", from: "IsAllDay" }
                }
              }
            }
          },
          resources: [
            {
              field: "roomId",
              dataSource: [
                { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
              ],
              title: "Room"
            },
            {
              field: "atendees",
              dataSource: [
                { text: "Alex", value: 1, color: "#f8a398" },
                { text: "Bob", value: 2, color: "#51a0ed" },
                { text: "Charlie", value: 3, color: "#56ca85" }
              ],
              multiple: true,
              title: "Atendees"
            }
          ]
        });
        var scheduler = $("#scheduler").data("kendoScheduler");
        scheduler.wrapper.children("div").hide();
        var scroller = scheduler.wrapper.find(".k-scheduler-content").data("kendoMobileScroller");
      }
    </script>
    <script>
      var app = new kendo.mobile.Application(document.body);
    </script>
```
