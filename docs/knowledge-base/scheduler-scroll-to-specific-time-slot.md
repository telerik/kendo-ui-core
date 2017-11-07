---
title: AngularJS - Scroll to specific time slot in Scheduler
description: An example on how to scroll to specific time slot in Kendo UI Scheduler in AngularJS application.
type: how-to
page_title: Scroll to specific time slot in AngularJS | Kendo UI Scheduler
slug: scheduler-scroll-to-specific-time-slot
tags: scroll, time, slot, specific, scheduler, angular, angularjs
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
</table>

## Description

How to scroll to a specific time slot in Scheduler? How to implement the above in AngularJS app?

## Solution

Create a `scrollToHour` method that:
* Accepts the desired hour as a parameter.
* Traverses the current scheduler view rows and checks for the desired time slot.
* Uses the view `_scrollTo` method to navigate to the desired slot.

```html
<div id="example" ng-app="KendoDemos">
    <div ng-controller="MyCtrl">
        <button class="k-button" ng-click="scrollToHour(22)">Scroll to 10 PM</button>
        <div kendo-scheduler k-options="schedulerOptions">
            <span k-event-template class='custom-event'>{{dataItem.title}}</span>
            <div k-all-day-event-template class='custom-all-day-event'>{{dataItem.title}}</div>
        </div>
    </div>
</div>

<script>
    angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){
        $scope.scrollToHour = function (hour) {
            var time = new Date();
            time.setHours(hour);
            time.setMinutes(0);

            var scheduler = $("[data-role=scheduler]").data("kendoScheduler");
            var contentDiv = scheduler.element.find("div.k-scheduler-content");
            var rows = contentDiv.find("tr");

            for (var i = 0; i < rows.length; i++) {
                var slot = scheduler.slotByElement(rows[i]);

                var slotTime = kendo.toString(slot.startDate, "HH:mm");
                var targetTime = kendo.toString(time, "HH:mm");

                if (targetTime === slotTime) {
                    scheduler.view()._scrollTo($(rows[i]).find("td:first")[0], contentDiv[0]);
                }
            };
        },
        $scope.schedulerOptions = {
            id: "scheduler",
            date: new Date("2013/6/13"),
            startTime: new Date("2013/6/13 07:00 AM"),
            height: 600,
            views: [
                "day",
                { type: "workWeek", selected: true },
                "week",
                "month",
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
        };
    })
</script>

```
