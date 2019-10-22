---
title: Add Time to the End Date of Recurring Events
page_title: Add Time to the End Date of Recurring Events | Kendo UI Scheduler
description: "Add the time to the end date of a recurrent event in a Kendo UI Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/add-time-to-the-end-date-in-recurrence-editor
slug: howto_add_time_to_the_end_date_of_a_recurring_event_scheduler
---

# Add Time to the End Date of Recurring Events

The following example demonstrates how to format the end date of a recurring event in a Kendo UI Scheduler.

```dojo
  <div id="example" class="k-content">
    <div id="people">
        <input checked type="checkbox" id="alex" value="1">
        <input checked type="checkbox" id="bob" value="2">
        <input type="checkbox" id="charlie" value="3">
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
        ],
        edit: function(e) {
          var event = e.event;
          var container = e.container;
          var recurrenceEditor = container.find("[data-role=recurrenceeditor]")
          								  .data("kendoRecurrenceEditor");

          var updateUntilPicker = function() {
            // Modify the private variables at your own risk. 

            recurrenceEditor._until.setOptions({
              format: "MM/dd/yyyy hh:mm tt"
            });

            recurrenceEditor._until.wrapper.width(300);
          }

          if (event.recurrenceRule) {
            updateUntilPicker();
          } else {
            recurrenceEditor.one("change", function() {
              updateUntilPicker();
            });
          }
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

#people {
    background: url('../../content/web/scheduler/team-schedule.png') transparent no-repeat;
    height: 115px;
    position: relative;
}
#alex {
    position: absolute;
    left: 630px;
    top: 81px;
}
#bob {
    position: absolute;
    left: 745px;
    top: 81px;
}
#charlie {
    position: absolute;
    left: 860px;
    top: 81px;
}
</style>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
