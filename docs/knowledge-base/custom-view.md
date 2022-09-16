---
title: Create Custom Scheduler Views by Inheriting Built-In Views
page_title: Create Custom Scheduler Views by Inheriting Built-In Views 
description: "Learn how to inherit some of the built-in views and implement specific custom logic in a Kendo UI for jQuery Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/custom-view, /controls/scheduling/scheduler/how-to/custom-views/custom-view
slug: howto_create_custom_view_inheriting_builtinview_scheduler
tags: telerik, kendo, jquery, scheduler, create, custom, views, inheriting, builtin 
component: scheduler
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I inherit some of the built-in views and implement specific custom logic in the Kendo UI Scheduler widget?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
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
          // Create a range of dates that will be displayed within the view.
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
            "week",
            // "custom week",
            { type: "ThreeDayView", title: "Three day view", selected: true },
            // "custom agenda",
            { type: "CustomAgenda", title: "Custom Agenda" }
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
          }
        });
      });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
