---
title: Recurrence editor using mobile editor
page_title: Recurrence editor using mobile editor
description: Recurrence editor using mobile editor
---

# Recurrence editor using mobile editor

The example below demonstrates how create a recurrence editor using mobile editor approach.

#### Example:

```html
     <div class="calendar"></div>
    <div class="adaptive-scheduler-wrapper">
      <div id="scheduler"></div>
    </div>
    <div class="calendar"></div>
    <script id="template" type="text/kendo-x-template">
  <div data-bind="value:recurrenceRule" id="recurrenceEditor" name="recurrenceRule"></div>
    </script>
    <script>
      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/26"),
          startTime: new Date("2013/6/26 07:00 AM"),
					views: [
            { type: "day", selected: true },
            { type: "week", selectedDateFormat: "{0:ddd,MMM dd,yyyy} - {1:ddd,MMM dd,yyyy}" },
            "month",
            { type: "agenda", selectedDateFormat: "{0:ddd, M/dd/yyyy} - {1:ddd, M/dd/yyyy}" },
          ],
          mobile: "tablet",
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
          editable: {
            template: $("#template").html()
          },
          edit: function(e) {
            var event = e.event;
            var container = e.container;
            var pane = container.parent(".km-pane").data("kendoMobilePane");
            var recurrenceEditor = container.find("#recurrenceEditor");

            recurrenceEditor.kendoMobileRecurrenceEditor({
              start: new Date(e.event.start),
              timezone: this.options.timezone,
              messages: this.options.messages.recurrenceEditor,
              pane: pane,
              change: function() {
                event.set("recurrenceRule", this.value());
              }
            });
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

        $("#scheduler").parentsUntil(".km-pane-wrapper").addClass("dynamic-height");

      });
    </script>
    <style>
      .dynamic-height 
      {
        height: 100%;
      }

      @media only screen and (min-device-width:768px) and (max-device-height:1024px) and (orientation: landscape)
      {
        .adaptive-scheduler-wrapper
        {
          position: relative;
          height: 400px;
        }

      }
      @media only screen and (min-device-width:768px) and (max-device-height:1024px) and (orientation: portrait) 
      {
        .adaptive-scheduler-wrapper
        {
          position: relative;
          height: 600px;
          width: 740px;
        }
      }
    </style>
```
