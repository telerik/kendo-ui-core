---
title: Expand Scheduler to 100% Width and Height
page_title: Expand Scheduler to 100% Width and Height | Kendo UI Scheduler
description: "Learn how to expand a Kendo UI Scheduler widget to a width and height of 100%."
previous_url: /controls/scheduling/scheduler/how-to/expand-scheduler-to-100-height-and-width
slug: howto_expand_scheduler_to100percent_widthandheight_scheduler
---

# Expand Scheduler to 100% Width and Height

The Scheduler automatically expands horizontally and you do not need to explicitly set a 100%-width style.

When you handle the height of the Scheduler, note that:

* Elements with a percentage height require you to explicitly set a height to their parent. This rule applies recursively until either an element with a pixel height or the `<html>` element is reached.
* 100% high elements cannot have borders, paddings, margins, or visible siblings.
* When the page content expands to the full browser window height and uses its own internal scrollbar, remove the default page scrollbar.

The following example demonstrates how to expand the Scheduler to 100% height and width.

```dojo

<style>
html
{
    font: 12px sans-serif;
    overflow: hidden;
}

html,
body,
#example,
#scheduler
{
    margin: 0;
    padding: 0;
    height: 100%;
    border-width: 0;
}
</style>

<div id="example" class="k-content">
    <div id="scheduler"></div>
</div>

<script>
$(function() {
    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 07:00 AM"),
        views: [
            "day",
            { type: "week", selected: true },
            "month",
            "agenda",
            "timeline"
        ],
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/meetings",
                    dataType: "jsonp"
                },
                update: {
                    url: "https://demos.telerik.com/kendo-ui/service/meetings/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "https://demos.telerik.com/kendo-ui/service/meetings/create",
                    dataType: "jsonp"
                },
                destroy: {
                    url: "https://demos.telerik.com/kendo-ui/service/meetings/destroy",
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
                    id: "meetingID",
                    fields: {
                        meetingID: { from: "MeetingID", type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        startTimezone: { from: "StartTimezone" },
                        endTimezone: { from: "EndTimezone" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        roomId: { from: "RoomID", nullable: true },
                        attendees: { from: "Attendees", nullable: true },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            }
        },
        resources: [
            {
                field: "roomId",
                dataSource: [
                    { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                    { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                ],
                title: "Room"
            },
            {
                field: "attendees",
                dataSource: [
                    { text: "Alex", value: 1, color: "#f8a398" },
                    { text: "Bob", value: 2, color: "#51a0ed" },
                    { text: "Charlie", value: 3, color: "#56ca85" }
                ],
                multiple: true,
                title: "Attendees"
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
