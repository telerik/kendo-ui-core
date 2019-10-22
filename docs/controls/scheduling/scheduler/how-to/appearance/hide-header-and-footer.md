---
title: Hide Header and Footer in Adaptive Rendering
page_title: Hide Header and Footer in Adaptive Rendering | Kendo UI Scheduler
description: "Learn how to hide the header and the footer of a Kendo UI Scheduler when it is in the adaptive rendering mode."
previous_url: /controls/scheduling/scheduler/how-to/hide-header-and-footer
slug: howto_hideheaderandfooter_inadaptiverebdering_scheduler
---

# Hide Header and Footer in Adaptive Rendering

The following example demonstrates how to hide the header and the footer of the Scheduler when the widget is used in an adaptive rendering mode.

```dojo
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

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
