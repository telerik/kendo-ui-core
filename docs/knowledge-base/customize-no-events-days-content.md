---
title: Customize the Content of No-Events Scheduler Days
page_title: Customize the Content of No-Events Scheduler Days
description: "Learn how to customize the content of days with no events in a Kendo UI for jQuery Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/customize-no-events-days-content, /controls/scheduling/scheduler/how-to/various/customize-no-events-days-content
slug: howto_customize_no_events_days_content_scheduler
tags: telerik, kendo, jquery, scheduler, customize, the, content, of, noevents, days 
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

How can I customize the content of days with no events in a Kendo UI Scheduler?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="example">
    <div id="team-schedule">
        <div id="people">
            <input checked type="checkbox" id="alex" value="1">
            <input checked type="checkbox" id="bob" value="2">
            <input type="checkbox" id="charlie" value="3">
        </div>
    </div>
    <div id="scheduler"></div>
</div>
<script>
$(function() {
    $("#scheduler").kendoScheduler({
        date: new Date("2025/6/13"),
        startTime: new Date("2025/6/13 07:00 AM"),
        height: 600,
      dayTemplate: '#= getTemplate(date, resources) #',
        views: [
            "month"
        ],
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/tasks"
                },
                update: {
                    url: "https://demos.telerik.com/service/v2/core/tasks/update",
                    type: "POST",
                    contentType: "application/json"
                },
                create: {
                    url: "https://demos.telerik.com/service/v2/core/tasks/create",
                    type: "POST",
                    contentType: "application/json"
                },
                destroy: {
                    url: "https://demos.telerik.com/service/v2/core/tasks/destroy",
                    type: "POST",
                    contentType: "application/json"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return kendo.stringify(options.models);
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

    $("#people :checkbox").change(function(e) {
        var checked = $.map($("#people :checked"), function(checkbox) {
            return parseInt($(checkbox).val());
        });

        var scheduler = $("#scheduler").data("kendoScheduler");

        scheduler.dataSource.filter({
            operator: function(task) {
                return $.inArray(task.ownerId, checked) >= 0;
            }
        });
    });
});


  function getTemplate(date, resources) {
    var scheduler = $("#scheduler").data("kendoScheduler");
    var start = kendo.date.getDate(date);
    var end = kendo.date.getDate(date);
    kendo.date.addDays(end,1);
    var events = scheduler.dataSource.expand(start,end);
    if (events.length === 0) {
    	return "NO EVENTS";
    } else {
      return kendo.format('{0:dd}', start);
    }
  }
</script>
<style scoped>

.k-nav-current > .k-link span + span {
    max-width: 200px;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: top;
}

#team-schedule {
    background: url('https://demos.telerik.com/kendo-ui/content/web/scheduler/team-schedule.png') transparent no-repeat;
    height: 115px;
    position: relative;
}

#people {
    background: url('https://demos.telerik.com/kendo-ui/content/web/scheduler/scheduler-people.png') no-repeat;
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

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
