---
title: Persist Resource Values on move
page_title: Persist Resource Values on move | Kendo UI Scheduler
description: "Learn how to persist resource values on a move event in a Kendo UI Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/persist-resources-on-move
slug: howto_persistresourcevalues_onamoveevent_scheduler
---

# Persist Resource Values on move

The following example demonstrates how to persist the event resources on the `move` event in a Kendo UI Scheduler.

```dojo
<div id="example">
    <div id="scheduler"></div>
</div>
<script>
$(function() {
    $("#scheduler").kendoScheduler({
        date: new Date("2015/1/1"),
        startTime: new Date("2015/1/1 07:00 AM"),
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
                read: function (options) {
                  options.success([{
                    "MeetingID": 101,
                    "Attendees": [1, 2, 3],
                    "Job": "Building Project 101",
                    "Title": "Site Visit for Building Project 101",
                    "Description": "Team leaders to meet with contractors and subcontractors to discuss laying of foundation.",
                    "Start":  "/Date(1420106400000)/",
                    "End": "/Date(1420110000000)/",
                    "StartTimezone": "Pacific/Auckland",
                    "EndTimezone": "Pacific/Auckland",
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                  }]);
                },
                update: function(options) {
                  var models = options.data.models;

                  console.log(models);

                  options.success(models);
                }
            },
            schema: {
                model: {
                    id: "meetingId",
                    fields: {
                        meetingId: { from: "MeetingID", type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        startTimezone: { from: "StartTimezone" },
                        endTimezone: { from: "EndTimezone" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        isAllDay: { type: "boolean", from: "IsAllDay" },
                        attendees: { from: "Attendees" }
                    }
                }
            }
        },
        group: {
            resources: ["Attendees"],
            orientation: "vertical"
        },
        resources: [
            {
                field: "attendees",
                title: "Attendees",
                name: "Attendees",
                dataSource: [
                    { text: "John", value: 1, color: "#f8a398" },
                    { text: "Jane", value: 2, color: "#51a0ed" },
                    { text: "Bob", value: 3, color: "#56ca85" }
                ],
                multiple: true
            }
        ],
        moveEnd: function(e) {
          var oldAttendees = e.event.attendees;
          var attendees = e.resources.attendees;

          attendees.splice(0, attendees.length); //empty resources;

          for (var idx = 0; idx < oldAttendees.length; idx++) {
            attendees.push(oldAttendees[idx]);
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
