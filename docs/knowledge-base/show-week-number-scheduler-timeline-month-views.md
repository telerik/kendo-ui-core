---
title: Displaying Week Numbers in Kendo UI for jQuery Scheduler Timeline and Month Views
description: Learn how to show week numbers in Kendo UI for jQuery Scheduler Timeline and Month views using custom logic.
type: how-to
page_title: Add Week Numbers to Scheduler Timeline and Month Views in Kendo UI for jQuery
meta_title: Add Week Numbers to Scheduler Timeline and Month Views in Kendo UI for jQuery
slug: show-week-number-scheduler-timeline-month-views
tags: scheduler, kendo-ui-for-jquery, timeline-view, month-view, week-number, customization
res_type: kb
components: ["scheduler"]
ticketid: 990097
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Scheduler
</td>
</tr>
<tr>
<td> Version </td>
<td>
2025.4.1111
</td>
</tr>
</tbody>
</table>

## Description

I want to display week numbers in the header of the Kendo UI for jQuery [Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler) Timeline and Month views. This is not a built-in feature, but I need to calculate and show the week numbers dynamically.

This knowledge base article also answers the following questions:
- How to add week numbers in Kendo UI Scheduler header?
- How to calculate and display week numbers in Scheduler Timeline view?
- How to customize Scheduler Month view to show week numbers?

## Solution

To display week numbers in the Scheduler Timeline and Month views, use custom logic and modify the Scheduler's calendar options.

### Steps

1. Initialize the Scheduler.
2. Access the Scheduler's internal calendar.
3. Set the [`weekNumber`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/calendar/configuration/weeknumber) option of the calendar to `true`.

Here is the implementation:

```javascript
$(document).ready(function() {
  var scheduler = $("#scheduler").data("kendoScheduler");
  
  // Display the Scheduler's calendar
  scheduler._showCalendar();
  
  // Hide the animation container to prevent visual interference
  $('.k-animation-container').css('display', 'none');
  
  // Close the popup to finalize the changes
  scheduler.popup.close();
  
  // Update the calendar's options to include week numbers
  var calendar = scheduler.calendar;
  calendar.setOptions({ weekNumber: true });
});
```

### Demo

You can see a live demonstration of the solution here:

```dojo

<div id="example">
      <div id="team-schedule">
        <div id="people">
          <input
            checked
            type="checkbox"
            id="alex"
            aria-label="Alex"
            value="1"
          />
          <input checked type="checkbox" id="bob" aria-label="Bob" value="2" />
          <input type="checkbox" id="charlie" aria-label="Charlie" value="3" />
        </div>
      </div>
      <div id="scheduler"></div>
    </div>
    <script>
      $(function () {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month",
            "year",
            "agenda",
            { type: "timeline", eventHeight: 50 },
          ],
          timezone: "Etc/UTC",
          dataSource: {
            batch: true,
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks",
                dataType: "jsonp",
              },
              update: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                dataType: "jsonp",
              },
              create: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                dataType: "jsonp",
              },
              destroy: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                dataType: "jsonp",
              },
              parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                  return { models: kendo.stringify(options.models) };
                }
              },
            },
            schema: {
              model: {
                id: "taskId",
                fields: {
                  taskId: { from: "TaskID", type: "number" },
                  title: {
                    from: "Title",
                    defaultValue: "No title",
                    validation: { required: true },
                  },
                  start: { type: "date", from: "Start" },
                  end: { type: "date", from: "End" },
                  startTimezone: { from: "StartTimezone" },
                  endTimezone: { from: "EndTimezone" },
                  description: { from: "Description" },
                  recurrenceId: { from: "RecurrenceID" },
                  recurrenceRule: { from: "RecurrenceRule" },
                  recurrenceException: { from: "RecurrenceException" },
                  ownerId: { from: "OwnerID", defaultValue: 1 },
                  isAllDay: { type: "boolean", from: "IsAllDay" },
                },
              },
            },
            filter: {
              logic: "or",
              filters: [
                { field: "ownerId", operator: "eq", value: 1 },
                { field: "ownerId", operator: "eq", value: 2 },
              ],
            },
          },
          resources: [
            {
              field: "ownerId",
              title: "Owner",
              dataSource: [
                { text: "Alex", value: 1, color: "#f8a398" },
                { text: "Bob", value: 2, color: "#2572c0" },
                { text: "Charlie", value: 3, color: "#118640" },
              ],
            },
          ],
        });

        $("#people :checkbox").change(function (e) {
          var checked = $.map($("#people :checked"), function (checkbox) {
            return parseInt($(checkbox).val());
          });

          var scheduler = $("#scheduler").data("kendoScheduler");

          scheduler.dataSource.filter({
            operator: function (task) {
              return $.inArray(task.ownerId, checked) >= 0;
            },
          });
        });
      });

      $(document).ready(function () {
        var scheduler = $("#scheduler").data("kendoScheduler");
        scheduler._showCalendar();
        $(".k-animation-container").css("display", "none");
        scheduler.popup.close();
        var calendar = scheduler.calendar;
        calendar.setOptions({ weekNumber: true });
      });
    </script>
    <style>
      #team-schedule {
        background: url("../content/web/scheduler/team-schedule.png")
          transparent no-repeat;
        height: 115px;
        position: relative;
      }
      #people {
        background: url("../content/web/scheduler/scheduler-people.png")
          no-repeat;
        width: 345px;
        height: 115px;
        position: absolute;
        right: 0;
      }

      #alex {
        position: absolute;
        left: 4px;
        top: 81px;
      }

      #bob {
        position: absolute;
        left: 119px;
        top: 81px;
      }

      #charlie {
        position: absolute;
        left: 234px;
        top: 81px;
      }
    </style>
  
```

## See Also

- [Scheduler Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/scheduler/overview)
- [Custom Views in Scheduler](https://www.telerik.com/kendo-jquery-ui/documentation/controls/scheduler/views#custom-views)
- [Create Custom Scheduler Views by Inheriting Built-In Views](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/custom-view)
- [Kendo UI Scheduler API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/scheduler)
- [Kendo UI Calendar API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/calendar)
