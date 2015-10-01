---
title: Create custom view inheriting a built-in view
page_title: Create custom view inheriting a built-in view
description: Create custom view inheriting a built-in view
---

# Create custom view inheriting a built-in view

The example below demonstrates how to inherit some of the built-in views and implement specific custom logic.

#### Example:

```html
    <div id="scheduler"></div>
    <script>
        var CustomAgenda = kendo.ui.AgendaView.extend({
            endDate: function() {
              var date = kendo.ui.AgendaView.fn.endDate.call(this);
              return kendo.date.addDays(date, 31);
            }
        });

        var ThreeDayView = kendo.ui.MultiDayView.extend({
              nextDate: function () {
                  return kendo.date.nextDay(this.startDate());
              },

              options: {
                  selectedDateFormat: "{0:D} - {1:D}"
              },

              name: "ThreeDayView",

              calculateDateRange: function () {
                  //create a range of dates to be shown within the view
                  var start = this.options.date,
                      idx, length,
                      dates = [];

                  for (idx = 0, length = 3; idx < length; idx++) {
                      dates.push(start);
                      start = kendo.date.nextDay(start);
                  }

                  this._render(dates);
              }
        });

      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
          "day",
              { type: "week", selected: true },
              // "custom week",
              { type: ThreeDayView, title: "Three day view" },
              // "custom agenda",
              { type: CustomAgenda, title: "Custom Agenda" }
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
          ],
          edit: function(e) {
                var container = e.container;

                /* ACTION: ADD custom button */
                var newButton = $('<a class="k-button" href="#">New button</a>');

                //wire its click event
                newButton.click(function(e) { alert("Clicked"); });

                //add the button to the container
                var buttonsContainer = container.find(".k-edit-buttons");
                buttonsContainer.append(newButton);

                /* ACTION: Accessing dropdownlist widget */
                container.find("[data-container-for=ownerId]")
                .find("[data-role=dropdownlist]")
                .data("kendoDropDownList")
                .wrapper.width("400px");
          }
        });

        $("#people :checkbox").change(function(e) {
          var checked = $.map($("#people :checked"), function(checkbox) {
            return parseInt($(checkbox).val());
          });

          var scheduler = $("#scheduler").data("kendoScheduler");

          scheduler.dataSource.filter({
            operator: function(task) {
              return $.inArray(task.ownerId, checked) >= 0;
            }
          });
        });
      });
    </script>
```
