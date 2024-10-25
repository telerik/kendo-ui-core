---
title: Clone Scheduler Events on Ctrl+move
page_title: Clone Scheduler Events on Ctrl+move
description: "Learn how to clone events on Ctrl + move in the Kendo UI for jQuery Scheduler component."
previous_url: /controls/scheduling/scheduler/how-to/clone-events-on-ctrl-and-click, /controls/scheduling/scheduler/how-to/editing/clone-events-on-ctrl-and-click
slug: howto_clone_eventson_ctrlplus_move_scheduler
tags: telerik, kendo, jquery, scheduler, clone, copy, events, on, ctrl, and, plus, move 
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

How can I clone events in the Scheduler on `Ctrl`+`Move`?

## Solution

The following example demonstrates how to achieve the desired scenario. To see the result, open the example in Dojo in the Full-screen mode. 

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
    var ctrlKey = false;
    var scheduler = $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month",
            "agenda"
        ],
        moveEnd: function(e) {
          if (ctrlKey) {
            e.preventDefault();

            //https://docs.telerik.com/kendo-ui/api/javascript/data/schedulerevent/methods/clone
            var newEvent = e.event.clone({
              start: e.start,
              end: e.end
            });

            this.dataSource.add(newEvent);
            this.dataSource.sync();
          }
        },
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
    }).data("kendoScheduler");

   $(document)
     .on("keydown", function(e) {
       ctrlKey = e.ctrlKey;
     })
     .on("keyup", function(e) {
       ctrlKey = e.ctrlKey;
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
    background: url('../content/web/scheduler/team-schedule.png') transparent no-repeat;
    height: 115px;
    position: relative;
}

#people {
    background: url('../content/web/scheduler/scheduler-people.png') no-repeat;
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
