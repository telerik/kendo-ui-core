---
title: Create Custom Month Views with Event Count in the Show More Button
page_title: Create Custom Month Views with Event Count in the Show More Button | Kendo UI Scheduler
description: "Learn how to inherit some of the built-in views and implement specific custom logic in a Kendo UI Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/custom-month-view-with-event-count-in-show-more-button
slug: howto_create_custom_monthview_eventcount_showmore_button_scheduler
position: 3
---

# Create Custom Month Views with Event Count in the Show More Button

The following example demonstrates how to inherit the built-in Month view and implement showing the hidden events count when the **Show More** button is rendered.

```dojo
    <div id="scheduler"></div>
    <script>
        var MORE_BUTTON_TEMPLATE = kendo.template(
            '<div style="width:#=width#px;left:#=left#px;top:#=top#px"' +
            'class="k-more-events k-button"><span style="font-size:8pt; margin-top: 0;">' +
            '#=getEventCountForRange(startSlot, endSlot, rowsCount)# more events..</span></div>');

        function getEventCountForRange(startSlot, endSlot, rowsCount) {
            var scheduler = $(startSlot.element).closest("[data-role=scheduler]").getKendoScheduler();
            var currentTimezoneOffset = kendo.date.MS_PER_MINUTE * new Date().getTimezoneOffset();
            var rangeStart = new Date(startSlot.start + currentTimezoneOffset);
            var rangeEnd = new Date(endSlot.end + currentTimezoneOffset);

            return scheduler.occurrencesInRange(rangeStart, rangeEnd).length - rowsCount + 1;
        }

        var CustomMonthView = kendo.ui.MonthView.extend({
            options: {
                name: "CustomMonthView",
                title: "Month Week"
            },
            name: "CustomMonthView",
            _positionEvent: function(slotRange, element, group) {
                var eventHeight = this.options.eventHeight;
                var startSlot = slotRange.start;

                if (slotRange.start.offsetLeft > slotRange.end.offsetLeft) {
                    startSlot = slotRange.end;
                }

                var startIndex = slotRange.start.index;
                var endIndex = slotRange.end.index;
                var eventCount = startSlot.eventCount;
                var events = kendo.ui.SchedulerView.collidingEvents(slotRange.events(), startIndex, endIndex);
                var rightOffset = startIndex !== endIndex ? 5 : 4;

                events.push({
                    element: element,
                    start: startIndex,
                    end: endIndex
                });

                var rows = kendo.ui.SchedulerView.createRows(events);

                for (var idx = 0, length = Math.min(rows.length, eventCount); idx < length; idx++) {
                    var rowEvents = rows[idx].events;
                    var eventTop = startSlot.offsetTop + startSlot.firstChildHeight + idx * eventHeight + 3 * idx + "px";

                    for (var j = 0, eventLength = rowEvents.length; j < eventLength; j++) {
                        rowEvents[j].element[0].style.top = eventTop;
                    }
                }

                if (rows.length > eventCount) {
                    for (var slotIndex = startIndex; slotIndex <= endIndex; slotIndex++) {
                        var collection = slotRange.collection;

                        var slot = collection.at(slotIndex);

                        if (slot.more) {
                            return;
                        }

                        slot.more = $(MORE_BUTTON_TEMPLATE({
                            startSlot: slotRange.start,
                            endSlot: slotRange.end,
                            rowsCount: rows.length,
                            ns: kendo.ns,
                            start: slotIndex,
                            end: slotIndex,
                            width: slot.clientWidth - 2,
                            left: slot.offsetLeft + 2,
                            top: slot.offsetTop + slot.firstChildHeight + eventCount * eventHeight + 3 * eventCount
                        }));

                        this.content[0].appendChild(slot.more[0]);
                    }

                } else {
                    slotRange.addEvent({
                        element: element,
                        start: startIndex,
                        end: endIndex,
                        groupIndex: startSlot.groupIndex
                    });

                    element[0].style.width = slotRange.innerWidth() - rightOffset + "px";
                    element[0].style.left = startSlot.offsetLeft + 2 + "px";
                    element[0].style.height = eventHeight + "px";

                    group._continuousEvents.push({
                        element: element,
                        uid: element.attr(kendo.attr("uid")),
                        start: slotRange.start,
                        end: slotRange.end
                    });

                    element.appendTo(this.content);
                }
            },
        });

        $(function() {
            var scheduler = $("#scheduler").kendoScheduler({
                date: new Date("2013/6/13"),
                startTime: new Date("2013/6/13 07:00 AM"),
                height: 600,
                views: [
                    { type: "CustomMonthView", selected: true },
                    "day"
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
                                return {
                                    models: kendo.stringify(options.models)
                                };
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
                    }
                }
            }).data("kendoScheduler");
        });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
