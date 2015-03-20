---
title: iCal export
page_title: iCal export
description: iCal export
---

# iCal export

The example below demonstrates how to extract Scheduler events to .ical file

#### Example:

```html
    <script src="https://rawgit.com/nwcell/ics.js/master/ics.js"></script>
    <div id="scheduler"></div>
    <br />
    Select events before export -
    <button id="export">Log selected events</div>
    <script>
      $(function () {
        var selectedEvents = [];

        $("#export").click(function() {
          var cal = ics();
          var event;

          for (var idx = 0, length = selectedEvents.length; idx < length; idx++) {
            event = selectedEvents[idx];
            cal.addEvent(event.title, event.description, "", event.start, event.end);
          }

          var icalEvents = cal.events();

          console.log(icalEvents);
        });

        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          selectable: true,
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
              parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                  return { models: kendo.stringify(options.models) };
                }
              }
            },
            schema: {
              model: {
                id: "meetingID",
                fields: {
                  meetingID: { from: "MeetingID", type: "number" },
                  title: { from: "Title", defaultValue: "No title", validation: { required: true} },
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
          ],
          change: function(e) {
            selectedEvents = e.events;
          }
        });
      });
    </script>
```
