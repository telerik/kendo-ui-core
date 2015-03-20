---
title: Show only all day events
page_title: Show only all day events
description: Show only all day events
---

# Show only all day events

The example below demonstrates how to show only all day events in the Scheduler.

#### Example:

```html
    <div id="example" class="k-content">
        <div id="scheduler"></div>
    </div>
    <script>
        $(function() {
            var date = new Date();
            var addDays = kendo.date.addDays;
            $("#scheduler").kendoScheduler({
                eventHeight: 40,
                //set major tick to full day
                //and leave the default startTime/endTime
                majorTick: 1440,
                //show only one minor tick
                minorTickCount: 1,
                majorTimeHeaderTemplate: "",
                views: [
                    "timelineWeek",
                    "timelineWorkWeek",
                    "timeline"
                ],
                timezone: "Etc/UTC",
                dataBound: function(e) {
                    //hide the times row from the date/time header:
                    var view = this.view();
                    view.datesHeader.find("tr:last").prev().hide();
                    view.timesHeader.find("tr:last").prev().hide();
                },
                resources: [{
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [{
                        text: "Meeting Room 101",
                        value: 1,
                        color: "#6eb3fa"
                    }, {
                        text: "Meeting Room 201",
                        value: 2,
                        color: "#f58a8a"
                    }],
                    title: "Room"
                }, {
                    field: "attendees",
                    name: "Attendees",
                    dataSource: [{
                        text: "Alex",
                        value: 1,
                        color: "#f8a398"
                    }, {
                        text: "Bob",
                        value: 2,
                        color: "#51a0ed"
                    }, {
                        text: "Charlie",
                        value: 3,
                        color: "#56ca85"
                    }],
                    multiple: true,
                    title: "Attendees"
                }],
                dataSource: {
                    batch: true,
                    data: [
                        //sample data:
                        {
                            Start: date,
                            End: date,
                            Title: "Team building",
                            IsAllDay: true,
                            RoomID: 1,
                            Attendees: [1, 2, 3]
                        }, {
                            Start: addDays(date, 1),
                            End: addDays(date, 1),
                            Title: "Meeting with Alex",
                            IsAllDay: true,
                            RoomID: 2,
                            Attendees: [1]
                        }, {
                            Start: addDays(date, 2),
                            End: addDays(date, 2),
                            Title: "Meeting with Charlie",
                            IsAllDay: true,
                            RoomID: 2,
                            Attendees: [3]
                        }
                    ],
                    schema: {
                        model: {
                            id: "meetingID",
                            fields: {
                                meetingID: {
                                    from: "MeetingID",
                                    type: "number"
                                },
                                title: {
                                    from: "Title",
                                    defaultValue: "No title",
                                    validation: {
                                        required: true
                                    }
                                },
                                start: {
                                    type: "date",
                                    from: "Start"
                                },
                                end: {
                                    type: "date",
                                    from: "End"
                                },
                                startTimezone: {
                                    from: "StartTimezone"
                                },
                                endTimezone: {
                                    from: "EndTimezone"
                                },
                                description: {
                                    from: "Description"
                                },
                                recurrenceId: {
                                    from: "RecurrenceID"
                                },
                                recurrenceRule: {
                                    from: "RecurrenceRule"
                                },
                                recurrenceException: {
                                    from: "RecurrenceException"
                                },
                                roomId: {
                                    from: "RoomID",
                                    nullable: true
                                },
                                attendees: {
                                    from: "Attendees",
                                    nullable: true
                                },
                                isAllDay: {
                                    type: "boolean",
                                    from: "IsAllDay"
                                }
                            }
                        }
                    }
                }
            });
        });
    </script>
```
