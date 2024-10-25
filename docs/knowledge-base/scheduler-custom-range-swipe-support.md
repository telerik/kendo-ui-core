---
title: Scheduler Custom Range View with Swipe Support
description: Learn how to implement swipe support with custom range view for the Scheduler component.
type: how-to
page_title: Scheduler Custom Range View and Swipe Support - Kendo UI Scheduler for jQuery
slug: scheduler-custom-range-swipe
tags: scheduler, custom, view, kendo, swipe, mobile
res_type: kb
---
## Environment
| Product | Version |
|-----------|----------------|
| Scheduler for Progress® Kendo UI®  | 2024.1.319 |

## Description

You can implement custom view for the Scheduler with option for setting the date range and enabling "swipe" navigation support.

## Solution

The following example will show you how you can create a custom view in the Scheduler, and how to implement `swipe` navigation.

```dojo
    <div>
      Number of days: <input type="number" value="3" id="numberOfDays" />
      Turn on swipe to change date range: <input type="checkbox" checked id="swipe" />
      <button onclick="initScheduler();">Init</button>
    </div>
    <div id="scheduler"></div>
    <script>
      (function ($, undefined) {
        var kendo = window.kendo,
            ui = kendo.ui,
            extend = $.extend;

        //extend the base MultiDayView
        var CustomDateRangeView = ui.MultiDayView.extend({
          init: function(element, options) {
            ui.MultiDayView.fn.init.call(this, element, options); //call the base init method
            if(options.swipe) {
              this._bindSwipe(); //bind the swipe event
            }
          },
          options: { //set default values of the options
            numberOfDays: 5,
            swipe: true
          },
          calculateDateRange: function() {
            var selectedDate = this.options.date,
                numberOfDays = Math.abs(this.options.numberOfDays),
                start = selectedDate,
                idx, length,
                dates = [];

            for (idx = 0, length = numberOfDays; idx < length; idx++) {
              dates.push(start);
              start = kendo.date.nextDay(start);
            }
            this._render(dates);
          },
          nextDate: function() {
            return kendo.date.nextDay(this.endDate());
          },
          previousDate: function() {
            var daysToSubstract = -Math.abs(this.options.numberOfDays); //get the negative value of numberOfDays
            var startDate = kendo.date.addDays(this.startDate(), daysToSubstract); //substract the dates
            return startDate;
          },
          _bindSwipe: function() { //bind the swipe event
            var that = this;
            var scheduler = that.element.closest("[data-role=scheduler]").data("kendoScheduler"); //get reference to the scheduler
            that.content.kendoTouch({ //initialize Kendo Touch on the View's content
              enableSwipe: true,
              swipe: function(e) {
                var action,
                    date;

                if(e.direction === "left") {
                  action = "next";
                  date = that.nextDate();
                } else if (e.direction === "right") {
                  action = "previous";
                  date = that.previousDate();
                }

                //navigate with the scheduler
                if (!scheduler.trigger("navigate", { view: scheduler._selectedViewName, action: action, date: date })) {
                  scheduler.date(date);
                }
              }
            });
          }
        });

        //extend UI
        extend(true, ui, {
          CustomDateRangeView: CustomDateRangeView
        });

      })(window.kendo.jQuery);

      function initScheduler() {
        var numberOfDays = $("#numberOfDays").val(),
            swipe = $("#swipe").is(":checked"),
            schedulerElement = $("#scheduler");

        if(schedulerElement.data("kendoScheduler")) { //destroy the widget if it already exists
          schedulerElement.data("kendoScheduler").destroy();
          schedulerElement.empty();
        }

        $("#scheduler").kendoScheduler({
          height: 600,
          views: [
            //configure the CustomDateRangeView
            { type: "kendo.ui.CustomDateRangeView", title: "Custom View", selected: true, numberOfDays: numberOfDays, swipe: swipe }
          ],
          mobile: "phone", //turn on the mobile rendering
          timezone: "Etc/UTC",
          dataSource: {
            batch: true,
            transport: {
              read: {
                url: "https://demos.kendoui.com/service/tasks",
                dataType: "jsonp"
              },
              update: {
                url: "https://demos.kendoui.com/service/tasks/update",
                dataType: "jsonp"
              },
              create: {
                url: "https://demos.kendoui.com/service/tasks/create",
                dataType: "jsonp"
              },
              destroy: {
                url: "https://demos.kendoui.com/service/tasks/destroy",
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
        });
      }

    </script>
```

## See Also

* [Scheduler API Reference](/api/javascript/ui/scheduler)
* [DataSource API Reference)](/api/javascript/data/datasource)