---
title: Retrieve the Current View Date Range of the Scheduler 
page_title: Retrieve the Current View Date Range of the Scheduler
description: "Learn how to retrieve the date range of the current Kendo UI for jQuery Scheduler view."
previous_url: /controls/scheduling/scheduler/how-to/view-date-range, /controls/scheduling/scheduler/how-to/various/view-date-range
slug: howto_retrievecurrent_viewdaterange_scheduler
tags: telerik, kendo, jquery, scheduler, retrieve, the, current, view, date, range 
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

How can I retrieve the date range of the current Kendo UI Scheduler view?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
<div id="example">
    <div id="scheduler"></div>
    <div class="box wide">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>
</div>
<script>
$(function() {
    function scheduler_view_range(e) {
        var view = e.sender.view();

        // The view has:
        // A startDate method which returns the start date of the view.
        // An endDate method which returns the end date of the view.

        $(".console").append("<p>" + kendo.format("view:: start: {0:d}; end: {1:d};", view.startDate(), view.endDate()) + "</p>");
    }

    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 7:00"),
        height: 400,
        timezone: "Etc/UTC",
        views: [
            "day",
            { type: "week", selected: true },
            "month",
            "agenda",
            "timeline"
        ],
        navigate: function(e) {
          $(".console").append("<p><strong>Navigated from:</strong></p>");
          scheduler_view_range(e);
        },
        dataBound: function(e) {
          $(".console").append("<p><strong>Navigated to:</strong></p>");
          scheduler_view_range(e);
        },
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
                    id: "taskID",
                    fields: {
                        taskID: { from: "TaskID", type: "number" },
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
