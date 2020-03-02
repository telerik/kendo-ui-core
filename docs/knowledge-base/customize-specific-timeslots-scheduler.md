---
title: Disable and Style Timeslots for Specific Days
description: An example on how to customize specific days and style them
type: how-to
page_title: Customize and Style Specific Days | Kendo UI Scheduler for jQuery
slug: customize-specific-timeslots-scheduler
tags: kendoui, kendo, scheduler, customize, style, disable
ticketid: 1119501
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 7 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I disable timeslots for a specific day and style them?

## Solution

1. To style the slots for a specific day, use the `slotTemplate` configuration.
1. To check the date of the event which is about to be added, handle the `add` event of the Scheduler. If the event you want to add is for the day during which all events will be restricted, cancel the propagation and raise a descriptive alert.

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
        var myDate = new Date("Thu Jun 13 2013 08:30:00 GMT+0300");

  			if(date.getDay() == myDate.getDay())
       	 return "#A9A9A9"
      }

      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          add: function(e) {

              var myDate = new Date("Thu Jun 13 2013 08:30:00 GMT+0300");
         			if(e.event.start.getDay() == myDate.getDay())
              {
                  setTimeout(function() {
                    alert("This person is not available in this time period.");
                }, 0);
								e.preventDefault();
            		return false;
              }
        	},
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          slotTemplate: "<div class='myClass' style='background:#=getColorBasedOnHour(date)#; height: 100%;width: 100%;'></div>",
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

## Notes

For more information on modifying the appearance of slots, refer to [this example](https://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/how-to/appearance/set-slot-background-color-using-slot-templates).

The functionality that the example demonstrates is not applicable to `MonthView` because [`slotTemplate` is not supported](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/views.slottemplate).
