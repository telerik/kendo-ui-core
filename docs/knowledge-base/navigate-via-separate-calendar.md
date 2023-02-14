---
title: Navigate the Scheduler by Using a Separate Calendar
page_title: Navigate the Scheduler by Using a Separate Calendar
description: "Navigate the Kendo UI for jQuery Scheduler widget with a separate calendar."
previous_url: /controls/scheduling/scheduler/how-to/navigate-via-separate-calendar, /controls/scheduling/scheduler/how-to/interaction/navigate-via-separate-calendar
slug: howto_navigate_the_scheduler_via_separate_calendar_scheduler
tags: telerik, kendo, jquery, scheduler, navigate, in, the, with, a, separate, calendar 
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

How can I navigate the Kendo UI Scheduler by using a separate calendar?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="example" class="k-content">
    <div id="calendar"></div>
    <div id="scheduler"></div>
    <script>
        $(function () {
            var scheduler = $("#scheduler").kendoScheduler({
                date: new Date("2013/6/13"),
                startTime: new Date("2013/6/13 07:00 AM"),
                height: 600,
                selectable: true,
                views: [
                    "day",
                    { type: "week", selected: true },
                    "month",
                    "agenda"
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
                        parameterMap: function (options, operation) {
                            if (operation !== "read" && options.models) {
                                return { models: kendo.stringify(options.models) };
                            }
                        }
                    },
                    schema: {
                        model: {
                            id: "meetingID",
                            fields: {
                                meetingID: { from: "MeetingID", type: "number" },
                                title: { from: "Title", defaultValue: "No title", validation: { required: true} },
                                start: { type: "date", from: "Start" },
                                end: { type: "date", from: "End" },
                                startTimezone: { from: "StartTimezone" },
                                endTimezone: { from: "EndTimezone" },
                                description: { from: "Description" },
                                recurrenceId: { from: "RecurrenceID" },
                                recurrenceRule: { from: "RecurrenceRule" },
                                recurrenceException: { from: "RecurrenceException" },
                                roomId: { from: "RoomID", nullable: true },
                                atendees: { from: "Atendees", nullable: true },
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
                        field: "atendees",
                        dataSource: [
                            { text: "Alex", value: 1, color: "#f8a398" },
                            { text: "Bob", value: 2, color: "#51a0ed" },
                            { text: "Charlie", value: 3, color: "#56ca85" }
                        ],
                        multiple: true,
                        title: "Atendees"
                    }
                ]
            }).data("kendoScheduler");

          	scheduler.wrapper.find(".k-nav-current").hide();

          	$("#calendar").kendoCalendar({
              value: scheduler.date(),
              change: function() {
                scheduler.date(this.value());
              }
            })

        });
    </script>
</div>

```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
