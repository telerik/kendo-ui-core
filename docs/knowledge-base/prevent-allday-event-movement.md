---
title: Prevent Moving All-Day Scheduler Events outside the All-Day Header
page_title: Prevent Moving All-Day Scheduler Events outside the All-Day Header
description: "Learn how to prevent event movement if users try to drop it outside the AllDay header of a Kendo UI for jQuery Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/prevent-allday-event-movement, /controls/scheduling/scheduler/how-to/editing/prevent-allday-event-movement
slug: howto_preventmovingalldayevents_fromalldayheader_scheduler
tags: telerik, kendo, jquery, scheduler, prevent, moving, allday, events, outside, the, header 
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

How can I prevent the movement of events if users try to drop it outside the **All Day** header of the Scheduler?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
<div id="scheduler"></div>
<script>
$(function() {
    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 07:00 AM"),
        height: 600,
        moveEnd: function(e) {
          var slot = e.slot;
          if ((slot.end - slot.start) < kendo.date.MS_PER_DAY) {
            alert("cannot drag AllDay event outside!");
            e.preventDefault();
          }
        },
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
                    { text: "Alex", value: 1, color: "#f8a398" },
                    { text: "Bob", value: 2, color: "#51a0ed" },
                    { text: "Charlie", value: 3, color: "#56ca85" }
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
