---
title: Select the First Event in Agenda View
page_title: Select the First Event in Agenda View | Kendo UI Scheduler
description: "Select the first event in the agenda view of a Kendo UI Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/select-the-first-event-in-agenda-view
slug: howto_select_the_first_event_in_agenda_view_scheduler
---

# Select the First Event in Agenda View

The following example demonstrates how to select the first event in the Agenda view of the Kendo UI Scheduler widget.

```dojo
    <div id="example" class="k-content">
    <div id="scheduler"></div>
    <script>
        $(function () {
            $("#scheduler").kendoScheduler({
                date: new Date("2013/6/13"),
                startTime: new Date("2013/6/13 07:00 AM"),
                height: 600,
                selectable: true,
                views: [
                  	"day",
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
                ],
                dataBound: function(e) {
                  var view = this.view();
                  var content = view.element.find(".k-scheduler-content");

                  if (view.name === "day") {
                    var event = content.find(".k-event:first");

                  } else if (view.name === "agenda") {
                    var firstEventCell = content.find("tr:first").find("td:last");

                    var selectionInfo = view.selectionByElement(firstEventCell);

                    var uid = selectionInfo.uid;

                    alert(uid);

                    view.select(selectionInfo);
                  }
                }
            });
        });
    </script>

</div>

```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
