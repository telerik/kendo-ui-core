---
title: Get the UID of Events on Hover
page_title: Get the UID of Events on Hover | Kendo UI Scheduler
description: "Learn how to get the UID of events on hover in the Kendo UI Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/get-event-uid-on-hover
slug: howto_get_the_uid_of_an_event_on_hover_scheduler
---

# Get the UID of Events on Hover

The following example demonstrates how to get the UID of a Kendo UI Scheduler event on hover.

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
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 07:00 AM"),
        height: 600,
        views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month",
            "agenda"
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

    $("#scheduler").on("mouseenter mouseleave", ".k-event", function(e) {
      var target = $(e.currentTarget);
      var uid = target.data("uid");

      if (e.type === "mouseenter") {
        alert("mouserenter, uid: " + uid);
      } else {
        alert("mouseleave, uid: " + uid);
      }
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
