---
title: How to Get Screen Readers to Read Both Date and Time of Appointment Slots
description: An example of how to configure the Scheduler widget, so the screen readers announce both date and time of the selected slot
type: how-to
page_title: Announce Date and Time of Appointment Slot | Kendo UI Scheduler
slug: scheduler-screen-readers-announce-date-and-time
tags: kendo-ui, kendo, scheduler, screen-reader, slot
ticketid: 1159317
res_type: kb
---

## Environment
<table>
    <tr>
        <td>Product</td>
        <td>Scheduler for Progress® Kendo UI®</td>
    </tr>
</table>


## Description
I'm currently trying to get the Kendo UI Scheduler usable for blind users with screen readers. Currently when selecting an open time slot, the screen reader will read the time frame of the slot (Selected from 8:30AM to 9:00AM).  This is great, but it doesn't let the user know what date they are on. Is there a way to generate the aria-label so that it reads: Selected from 8:30AM to 9:00AM on 3/23/2018?

## Solution
You could easily modify the `aria-label` attribute of the currently selected Scheduler slot by handling the [change event](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/change) of the widget:

```js
change: function(e) {
  if (e.slots && e.slots.length > 0) {
    var slots = e.slots;

    for(var i = 0; i < slots.length; i++) {
      var slot = slots[i];
      var element = $(slot.element);
      var label = element.attr('aria-label');
      var date = e.start.toDateString();
      element.attr('aria-label',label + ' on ' +  date);
    }
  }
}
```

Here is a small sample implementing the above suggestion:

```html
<div id="scheduler" ></div>

<script>
  $(function() {
    $("#scheduler").kendoScheduler({
      change: function(e) {
        if (e.slots && e.slots.length > 0) {
          var slots = e.slots;

          for(var i = 0; i < slots.length; i++) {
            var slot = slots[i];
            var element = $(slot.element);
            var label = element.attr('aria-label');
            var date = e.start.toDateString();
            element.attr('aria-label',label + ' on ' +  date);
          }
        }
      },
      selectable: true,
      date: new Date("2013/6/13"),
      startTime: new Date("2013/6/13 07:00 AM"),
      height: 600,
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

* [API Reference of the Scheduler](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
