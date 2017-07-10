---
title: Implement a More-Events Button for the Scheduler's Week View 
description: How to implement a more-events button in the Scheduler's week view similar to the one available in month view.
type: how-to
page_title: Show more events button in Scheduler's week view
slug: implement-more-events-button-in-week-view
position: 
tags: implement,show,more,events,button,scheduler,month,week,view
ticketid: 1117416
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress® Kendo UI®</td>
 </tr>
</table>

## Description
In the Scheduler's `month` view when a day slot contains multiple events, due to the limited size of the slot only some of the events are visible and a `more-events` button is displayed at the bottom of the slot. On click it navigates to `day` view, which allows you to see all the events on that particular day. This functionality is not available out-of-the-box for the `week` view.

## Solution
No verified solution available. Check the [suggested workarounds](#suggested-workarounds) instead.

## Suggested Workarounds
You can create a custom view, which will simulate `week` view's layout and implement a `more-events` button similar to that in `month` view, which will link to `day` view.

```html
<div id="scheduler"></div>
<script>
    var MyWeekView = kendo.ui.MultiDayView.extend({
        options: {
            name: "MyWeekView",
            title: "Week",
            selectedDateFormat: "{0:D} - {1:D}",
            selectedShortDateFormat: "{0:d} - {1:d}"
        },
        name: "my-week",
        calculateDateRange: function () {
            var selectedDate = this.options.date,
                start = kendo.date.dayOfWeek(selectedDate, this.calendarInfo().firstDay, -1),
                idx, length,
                dates = [];

            for (idx = 0, length = 7; idx < length; idx++) {
                dates.push(start);
                start = kendo.date.nextDay(start);
            }
            this._render(dates);
        },
        MORE_BUTTON_TEMPLATE: kendo.template(
              '<div style="width:#=width#px;left:#=left#px;top:#=top#px" class="k-more-events k-button"><span>...</span></div>'
          ),
        _positionEvent: function (event, element, slotRange) {
            kendo.ui.MultiDayView.fn._positionEvent.call(this, event, element, slotRange)

            var startIndex = slotRange.start.index;
            var endIndex = slotRange.end.index;
            var events = slotRange.events();

            if (events.length > 2) {

                for (var slotIndex = startIndex; slotIndex <= endIndex; slotIndex++) {
                    var collection = slotRange.collection;

                    var slot = collection.at(slotIndex);

                    var more = $(this.MORE_BUTTON_TEMPLATE({
                        ns: kendo.ns,
                        start: slotIndex,
                        end: slotIndex,
                        width: slot.clientWidth - 4,
                        left: slot.offsetLeft + 2,
                        top: slot.offsetTop + slot.offsetHeight - 12
                    }));

                    this.content[0].appendChild(more[0]);
                }
            }

        },
        render: function (events) {
            var that = this;
            kendo.ui.MultiDayView.fn.render.call(that, events);

            this.content.on("click", ".k-more-events", function (e) {
                var offset = $(e.currentTarget).offset();
                if (offset.left != 0 && offset.top != 0) {
                    var slot = that._slotByPosition(offset.left, offset.top);
                    e.preventDefault();
                    that.trigger("navigate", { view: "day", date: slot.startDate() });
                }
            });
        }
    });

    $(function () {
        $("#scheduler").kendoScheduler({
            date: new Date("2013/6/13"),
            startTime: new Date("2013/6/13 07:00 AM"),
            height: 600,
            views: [
            "day",
                { type: "week" },
                // "custom week",
                { type: MyWeekView, title: "my week view", selected: true }
            ],
            timezone: "Etc/UTC",
            dataSource: {
                batch: true,
                transport: {
                    read: {
                        url: "http://demos.telerik.com/kendo-ui/service/tasks",
                        dataType: "jsonp"
                    },
                    update: {
                        url: "http://demos.telerik.com/kendo-ui/service/tasks/update",
                        dataType: "jsonp"
                    },
                    create: {
                        url: "http://demos.telerik.com/kendo-ui/service/tasks/create",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: "http://demos.telerik.com/kendo-ui/service/tasks/destroy",
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
    });
</script>
```
