---
title: Scroll to Specific Time Slot
page_title: Scroll to Specific Time Slot | Kendo UI Scheduler
description: "Learn how to scroll to a given time slot by using JavaScript in a Kendo UI Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/scroll_to_given_time_slot
slug: scroll_to_given_time_slot
---

# Scroll to Specific Time Slot

The following example demonstrates how to scroll to a given time slot by using JavaScript in a Kendo UI Scheduler.

```dojo
    <div style="width: 50%; margin-left: auto; margin-right: auto;">
      <div id="scheduler"></div>
      <h3>Scroll the scheduler content to given hour:</h3>
      <button class="k-button" onclick="scrollToHour(10)">Scroll to 10 AM</button>
      <button class="k-button" onclick="scrollToHour(22)">Scroll to 10 PM</button>
    </div>
    <script>

      function scrollToHour(hour) {
        var time = new Date();
        time.setHours(hour);
        time.setMinutes(0);
        time.setSeconds(0);
        time.setMilliseconds(0);

        var scheduler = $("#scheduler").data("kendoScheduler");
        var contentDiv = scheduler.element.find("div.k-scheduler-content");
        var rows = contentDiv.find("tr");

        for (var i = 0; i < rows.length; i++) {
          var element = $(rows[i]);
          var slot = scheduler.slotByElement(element);

          var slotTime = kendo.toString(slot.startDate, "HH:mm");
          var targetTime = kendo.toString(time, "HH:mm");

          if (targetTime === slotTime) {
            contentDiv.scrollTop(0);

            var elementTop = element.offset().top;
            var containerTop = contentDiv.offset().top;

            contentDiv.scrollTop( elementTop - containerTop );
          }
        };
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
          timezone: "Etc/UTC",
          dataSource: {
            batch: true,
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks",
                dataType: "jsonp"
              },
              update: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                dataType: "jsonp"
              },
              create: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                dataType: "jsonp"
              },
              destroy: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
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

    <style scoped>
      body {
        font-family: verdana;
        font-size: 0.8em;
      }
    </style>

```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
