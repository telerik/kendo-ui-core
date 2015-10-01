---
title: Custom Timeline view with a dynamic length
page_title: Custom Timeline view with a dynamic length
description: Custom Timeline view with a dynamic length
---

# Custom Timeline view with a dynamic length

The example below demonstrates how to implement custom Timeline view which allows to change its length dynamically.

#### Example:

```html
    Number of shown days: <select id="days">
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
            //create the required number of days

            var start = this.options.date,
                //  start = kendo.date.dayOfWeek(selectedDate, this.calendarInfo().firstDay, -1),
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
            },
            filter: {
              logic: "or",
              filters: [
                { field: "ownerId", operator: "eq", value: 1 },
                { field: "ownerId", operator: "eq", value: 2 }
              ]
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
        }).data("kendoScheduler");

        $("#days").change(function() {
          //change the number of days option of the view
          scheduler.setOptions({
            numberOfDays: parseInt($(this).val())
          });
          //reload the view
          scheduler.view(scheduler.view().name);
        });
      });
    </script>

```
