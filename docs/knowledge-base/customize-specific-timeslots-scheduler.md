---
title: Disable Timeslots for Specific Days and Style Them
description: An example on how to customize specific days and style them
type: HowTo
page_title: Customize Specific Days and Style Them  Kendo UI Scheduler
slug: customize-specific-timeslots-scheduler
position: 0
tags: kendoui, kendo, scheduler, customize, style, disable
teampulseid:
ticketid: 1119501
pitsid:
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress® Kendo UI®</td>
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

 How can I disable timeslots for specific day and style them?

## Solution

Use the slotTemplate, in order to style the slots for a specific day in a preferable manner. Also, handle the **add** event of the Scheduler, in order to check the date of the event which is about to be added. If it is about to be added for the day that all events are restricted - cancel the propagation and raise a descriptive alert.

```html 

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
Example of further modification of the slots appearances: http://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/how-to/appearance/set-slot-background-color-using-slot-templates

The functionality used in this example is not applicable for MonthView, because slotTemplate is not supported:
http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#configuration-views.slotTemplate