---
title: Set initial data manually
page_title: Set initial data manually
description: Set initial data manually
---

# Set initial data manually

The example below demonstrates how to set initial data manually using AngularJS

#### Example:

```html
    <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <div kendo-scheduler="sched" k-options="schedulerOptions"></div>
      </div>
      <style>
        .custom-event {
          text-shadow: 0 1px 1px #000;
        }
        .custom-all-day-event {
          text-align: center;
          text-transform: uppercase
        }
      </style>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ]);
        .controller("MyCtrl", function($scope){

        $scope.ds = new kendo.data.SchedulerDataSource({
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
        });

        $scope.schedulerOptions = {
          autoBind: false,
          date: new Date("2014/10/14"),
          height: 600,
          views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month",
          ],
            timezone: "Etc/UTC",
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

      var response =  [{ "TaskID": 550616, "Title": "Get groceries", "Description": "go to food store", "IsAllDay": false, "Start": "\/Date(1413230400000)\/", "End": "\/Date(1413235800000)\/", "StartTimezone": null, "EndTimezone": null, "RecurrenceRule": null, "RecurrenceException": null, "Resource": 2 }, { "TaskID": 550615, "Title": "Get hair done", "Description": "barber shop visit", "IsAllDay": false, "Start": "\/Date(1413216000000)\/", "End": "\/Date(1413217800000)\/", "StartTimezone": null, "EndTimezone": null, "RecurrenceRule": null, "RecurrenceException": null, "Resource": 2 }];

      $scope.$on("kendoWidgetCreated", function() {
        var ds = $scope.sched.dataSource;

        //set data
        ds.data(transformData(response));

        //set another DataSource using widget setDataSource if like: http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#methods-setDataSource
      });
      }

      function transformData(response) {
        var result = [];
        var event;

        for (var idx = 0, length = response.length; idx < length; idx++) {
          event = response[idx];

          result.push(new kendo.data.SchedulerEvent({
            id: event.TaskID,
            taksId: event.TaskID,
            start: kendo.parseDate(event.Start),
            end: kendo.parseDate(event.End),
            title: event.Title,
            description: event.Description,
            isAllDay: event.IsAllDay
          }));
          //add all fields you want to add
        }

        return result;
      });
    </script>
```
