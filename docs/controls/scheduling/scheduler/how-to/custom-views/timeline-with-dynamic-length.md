---
title: Implement Custom Timeline View with Dynamic Length
page_title: Implement Custom Timeline View with Dynamic Length | Kendo UI Scheduler
description: "Learn how to implement a custom `timeline` view in a Kendo UI Scheduler widget, which allows to change its length dynamically."
previous_url: /controls/scheduling/scheduler/how-to/timeline-with-dynamic-length
slug: howto_implementcustomtimeline_withdynamiclength_scheduler
position: 5
---

# Implement Custom Timeline View with Dynamic Length

The following example demonstrates how to implement a custom Timeline view in a Kendo UI Scheduler which allows to change its length dynamically.

```dojo
    Number of shown days:
    <select id="days">
      <option>6</option>
      <option selected>7</option>
      <option>8</option>
    </select>

    <div id="scheduler"></div>

    <script>
        var MyCustomTimelistView = kendo.ui.TimelineMonthView.extend({
          options: {
            name: "MyCustomTimelistView",
            title: "Timeline Week",
            selectedDateFormat: "{0:D} - {1:D}",
            selectedShortDateFormat: "{0:d} - {1:d}",
            majorTick: 1440,
            numberOfDays: 7
          },
          name: "MyCustomTimelistView",
          calculateDateRange: function() {
            // Create the required number of days.
            var start = this.options.date,
              // start = kendo.date.dayOfWeek(selectedDate, this.calendarInfo().firstDay, -1),
              idx, length,
              dates = [];

            for (idx = 0, length = this.options.numberOfDays; idx < length; idx++) {
              dates.push(start);
              start = kendo.date.nextDay(start);
            }

            this._render(dates);
          },
          previousDate: function() {
            var date = new Date(this.startDate());
            date.setDate(date.getDate() - this.options.numberOfDays);

            return date
          }
        });

      $(function() {
        var scheduler = $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [{
            type: "MyCustomTimelistView",
            selected: true,
            dateHeaderTemplate: "<span class='k-link k-nav-day'>#=kendo.toString(date, ' dd/M ddd')#</span>"
          }],
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
          }
        }).data("kendoScheduler");

        $("#days").change(function() {
          // Change the number of the days option of the view.
          scheduler.setOptions({
            numberOfDays: parseInt($(this).val())
          });
          // Reload the view.
          scheduler.view(scheduler.view().name);
        });
      });
    </script>

```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
