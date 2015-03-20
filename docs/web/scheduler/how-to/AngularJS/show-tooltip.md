---
title: Show a tooltip upon event hover
page_title: Show a tooltip upon event hover
description: Show a tooltip upon event hover
---

# Show a tooltip upon event hover

The example below demonstrates how to add a tooltip that opens on event hover and shows additional metadata.

#### Example:

```html
<div id="example" ng-app="KendoDemos">
    <div ng-controller="MyCtrl">
        <div kendo-tooltip k-content="theContent" k-filter="'.k-event'" class="k-group">
          <div kendo-scheduler k-options="schedulerOptions">
              <span k-event-template class='custom-event'>{{dataItem.title}}</span>
              <div k-all-day-event-template class='custom-all-day-event'>{{dataItem.title}}</div>
          </div>
        </div>
    </div>
</div>

<script id="template" type="text/x-kendo-template">
    #var uid = target.attr("data-uid");#
    #var scheduler = target.closest("[data-role=scheduler]").data("kendoScheduler");#
    #if (scheduler) {#
      #var model = scheduler.occurrenceByUid(uid);#

      #if(model) {#
          <strong>event start:</strong> #=kendo.format('{0:d}',model.start)#<br />
          <strong>event end:</strong> #=kendo.format('{0:d}',model.end)#<br />
          <strong>event description:</strong> #=model.description#<br />
      #} else {#
          <strong>No event data is available</strong>
      #}#
    #}#
</script>
<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){
            $scope.theContent = kendo.template($("#template").html());
        $scope.schedulerOptions = {
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
