---
title: Sort Scheduler Events in Descending Order
description: An example on how to sort events in a descending order for the Kendo UI Scheduler AgendaView.
type: how-to
page_title: Sort Events in Descending Order | Kendo UI Scheduler for jQuery
slug: scheduler-agenda-view-sort-events-descending
tags: kendo, kendo-ui, scheduler, agenda, sort, events, descending
ticketid: 1153690
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1.117</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Scheduler for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

How can I sort the events in the Scheduler agenda view in a descending order?

## Solution

Extend the **Agenda** view of the Scheduler and implement a custom render function to require the events in a descending order.

```dojo
<div id="scheduler"></div>

<script>
    var CustomAgenda = kendo.ui.AgendaView.extend({
        _renderLayout: function(date) {
            this._startDate = kendo.date.addDays(date, -5);
            this._endDate = date;
            this.createLayout(this._layout());
            this.table.addClass("k-scheduler-agenda");
        },
        nextDate: function() {
            return kendo.date.previousDay(this.startDate());
        },
        previousDate: function() {
            return kendo.date.nextDay(this.startDate());
        },
        render: function(events) {
            var table = this.content.find("table").empty();
            var groups = [];
            var flattenGroup = function (groups) {
                var items = [].concat(groups),
                    item = items.shift(),
                    result = [],
                    push = [].push;
                while (item) {
                    if (item.groups) {
                        push.apply(items, item.groups);
                    } else if (item.items) {
                        push.apply(items, item.items);
                    } else {
                        push.call(result, item);
                    }

                    item = items.shift();
                }

                return result;
            }

            var flattenTaskGroups = function (groups) {
                var idx = 0,
                    length = groups.length,
                    item,
                    result = [];

                for ( ; idx < length; idx ++) {
                    item = groups[idx];
                    if (item.groups) {
                        item = flattenGroup(item.groups);
                        result = result.concat(item);
                    } else {
                        result = result.concat(flattenGroup(item.items));
                    }
                }

                return result;
            }

            if (events.length > 0) {
                var resources = this.groupedResources;

                if (resources.length) {
                    groups = this._createGroupConfiguration(events, resources, null);
                    this._groupsByDate = [];
                    this._renderGroups(groups, table, []);
                    this._groupedView._renderDates(table);
                } else {
                    groups = this._tasks(events).reverse();
                    table.append(this._renderTaskGroups(groups, []));
                }
            }

            var items = this._eventsList = flattenTaskGroups(groups);
            this._angularItems(table, items);

            this.refreshLayout();
            this.trigger("activate");
        }
    });

    $(function() {
        $("#scheduler").kendoScheduler({
            date: new Date("2018/1/13"),
            startTime: new Date("2018/1/13 07:00 AM"),
            height: 600,
            views: [
                { type: "CustomAgenda", title: "Custom Agenda" }
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
    });
</script>
```

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
