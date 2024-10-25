---
title: Show Scheduler Events in a Kendo UI Tooltip
page_title: Show Scheduler Events in a Kendo UI Tooltip
description: "Learn how to show the events of a Kendo UI for jQuery Scheduler in a Kendo UI Tooltip."
previous_url: /controls/scheduling/scheduler/how-to/show-events-in-a-tooltip, /controls/scheduling/scheduler/how-to/appearance/show-events-in-a-tooltip
slug: howto_show_events_in_a_kendo_ui_tooltip_scheduler
tags: telerik, kendo, jquery, scheduler, show, events, in, a, tooltip 
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
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I show the events of a Kendo UI Scheduler widget in a Kendo UI Tooltip?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
<div id="example">
	<div id="scheduler"></div>
</div>
<script>
$(function() {
$("#scheduler").kendoScheduler({
    date: new Date("2022/6/13"),
    startTime: new Date("2022/6/13 07:00 AM"),
    height: 600,
    views: [
        { type: "month", selected: true }
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
});

$("#scheduler").kendoTooltip({
filter: "td",
width: 300,
content: function(e){
  var scheduler = $("#scheduler").getKendoScheduler();
  var slot = scheduler.slotByElement(e.target);
  var events = scheduler.occurrencesInRange(slot.startDate, slot.endDate);
  var content = "";
  for(var i=0; i<events.length; i++){
    content = content + "<div>" + events[i].title + "</div>";
  }
  return content == "" ? "No events" : content;
}
});

});
</script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
