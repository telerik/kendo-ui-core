---
title: Integrate Month View Scheduler with Charts in Each Date
description: An AngularJS example on how to inject a Chart into each date of the Kendo UI Scheduler month view.
type: how-to
page_title: Inject Chart in the DateTemplate of the Month View | Kendo UI Scheduler
slug: scheduler-chart-in-datetemplate-monthview
tags: kendo, kendo-ui, scheduler, chart, datetemplate, month-view, hide
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
</table>

## Description

How can I inject a Chart into each date of the Scheduler month view in AngularJS?

## Solution

Place and initialize the Chart in the [`dayTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/views.daytemplate) of the Scheduler `month` view.

```dojo
<div id="example" ng-app="KendoDemos">
  <div ng-controller="MyCtrl">
    <div kendo-scheduler k-options="schedulerOptions"></div>
    <script id="dayTemplate" type="text/x-kendo-template">
    	<div id="chart#=date.getTime()#"></div>
    </script>
  </div>
</div>

<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){

	var baseDate = new Date(2013, 4, 1).getTime();

    $scope.schedulerOptions = {
      dataBound: function(e) {
        var scheduler = e.sender;
        var element = scheduler.element;
        var days = element.find('.k-scheduler-content .k-scheduler-table td[role="gridcell"]');

		for (var i = 0; i < days.length; i++) {
          var element = $(days[i]);
          var slot = scheduler.slotByElement(element);

		  if (!slot) {
            continue;
          }

		  var dateTime = slot.startDate.getTime();
          var divided = dateTime / baseDate;

		  $("#chart" + dateTime).kendoChart({
            chartArea: {
              height: 140
            },
            seriesDefaults: {
              type: "bar"
            },
            valueAxis: {
              min: 1,
              max: 1.005,
              labels: {
                visible: false
              }
            },
            label: false,
            series: [{
              data: [divided]
            }]
          });
        }
      },
      dayTemplate: kendo.template($("#dayTemplate").html()),
      date: new Date("2013/6/13"),
      editable: false,
      height: 1000,
      views: [
        "month"
      ],
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
        }
      }
    };
  })
</script>

```

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [API Reference of the Chart](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)
