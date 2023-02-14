---
title: Set the Slot Background Color by Using Slot Templates in the Scheduler
page_title: Set the Slot Background Color by Using Slot Templates in the Scheduler
description: "Learn how to set the cell background color by using slotTemplate and allDaySlotTemplate, based on the slot date, in a Kendo UI for jQuery Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/set-slot-background-color-using-slot-templates, /controls/scheduling/scheduler/how-to/appearance/set-slot-background-color-using-slot-templates
slug: howto_setslotbackgroundcolor_usingslottemplates_scheduler
tags: telerik, kendo, jquery, scheduler, set, the, slot, color, using, templates
component: scheduler
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
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

How can I set the cell background color based on the slot date in the Kendo UI for jQuery Scheduler?

## Solution

The following example demonstrates how to achieve the desired behavior by using the `slotTemplate` and `allDaySlotTemplate` configuration options. Note that the `slotTemplate` is supported when `views.type` is set to `day`, `week`, `workWeek`, or `timeline` views. The `allDaySlotTemplate` is supported only for the `day`, `week`, and `workWeek` views.

```dojo
    <div id="scheduler"></div>
    <style>
      /* Remove the padding of scheduler slots */
      .k-scheduler-table td, .k-scheduler-table th
      {
        padding: 0;
      }
    </style>
    <script>
      function getColorBasedOnHour(date) {
        var difference = date.getTime() - kendo.date.getDate(date);
        var hours = difference / kendo.date.MS_PER_HOUR;

        if (hours >= 8 && hours < 12) {
          return "#CC66FF";
        } else if (hours >= 13 && hours < 17) {
          return "#CC0099";
        } else {
          return "#33CCFF";
        }
      }

      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          allDaySlotTemplate: "<div style='background:\\#A2A2AA; height: 100%;width: 100%;'></div>",
          slotTemplate: "<div style='background:#=getColorBasedOnHour(date)#; height: 100%;width: 100%;'></div>",
          views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month",
            "agenda",
            { type: "timeline", eventHeight: 50}
          ],
          timezone: "Etc/UTC",
          dataSource: {
            batch: true,
            transport: {
              read: {
                url: "//demos.telerik.com/kendo-ui/service/tasks",
                dataType: "jsonp"
              },
              update: {
                url: "//demos.telerik.com/kendo-ui/service/tasks/update",
                dataType: "jsonp"
              },
              create: {
                url: "//demos.telerik.com/kendo-ui/service/tasks/create",
                dataType: "jsonp"
              },
              destroy: {
                url: "//demos.telerik.com/kendo-ui/service/tasks/destroy",
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
                { text: "Alex", value: 1},
                { text: "Bob", value: 2},
                { text: "Charlie", value: 3}
              ]
            }
          ]
        });
      });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
