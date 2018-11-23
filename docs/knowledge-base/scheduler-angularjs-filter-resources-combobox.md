---
title: How do I Filer the Scheduler Using a ComBox with AngularJS
description: An example of how to filter the grouped resources in the Scheduler using a ComboBox in AngularJS scenario
type: how-to
page_title: Filter Grouped Scheduler in AngularJS with ComboBox | Kendo UI Scheduler
slug: scheduler-angularjs-filter-resources-combobox
tags: kendo, kendo-ui, scheduler, resources, combobox, angularjs
ticketid: 1158749
res_type: kb
---

## Environment
<table>
    <tr>
        <td>Product</td>
        <td>Scheduler for Progress® Kendo UI®</td>
    </tr>
</table>


## Description
I am trying to add filter for the Scheduler in AngularJS. How can I do that?

## Solution
Here are the steps that would allow you to achieve the desired:

* In order to attach the Scheduler (and any other Kendo widget) instance to the controller scope, you will need the following syntax:

```
<div kendo-scheduler="$ctrl.scheduler" k-options="$ctrl.schedulerOptions"></div>
```

Note that instead of the `id` attribute, the name of the Scheduler is attached to the `kendo-scheduler` directive attribute. Note also, that the name of the `options` field and the Scheduler itself should differ as they belong to the same scope.

* If you are using Grouping in the Scheduler, you may want to filter the rendered groups. That is why the ComboBox `change` event handler needs to filter the resource DataSource instead of the Scheduler DataSource:

```js
change: function(e) {
  var value = this.value();
  if (value) {
    $ctrl.scheduler.resources[1].dataSource.filter({
        field: "value", operator: "eq", value: Number(value)
    });

    $ctrl.scheduler.view($ctrl.scheduler.view().name);
  } else
    $ctrl.scheduler.resources[1].dataSource.filter([]);
      $ctrl.scheduler.view($ctrl.scheduler.view().name);
}
```

Note the `$ctrl.scheduler.view($ctrl.scheduler.view().name);` call, which will redraw the Scheduler, so that the the Grouping will be re-applied.

Here you will find a small sample demonstrating the above approach:

```html
<div id="example" ng-app="KendoDemos">
  <div ng-controller="MyCtrl as $ctrl">
    <input type="text" kendo-combo-box="$ctrl.comboBox" name="comboBox"  k-options="$ctrl.comboboxOptions"/>
    <br />
    <div kendo-scheduler="$ctrl.scheduler" k-options="$ctrl.schedulerOptions"></div>
  </div>
</div>

<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){
    var $ctrl = this;

    this.schedulerOptions = {
      date: new Date("2013/6/13"),
      startTime: new Date("2013/6/13 07:00 AM"),
      eventHeight: 50,
      majorTick: 60,
      views: [ "timeline", "timelineWeek", "timelineWorkWeek", {
        type: "timelineMonth",
        startTime: new Date("2013/6/13 00:00 AM"),
        majorTick: 1440
      }],
      view:"Day",
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
              title: { from: "Title", defaultValue: "No title", validation: { required: true } },
              start: { type: "date", from: "Start" },
              end: { type: "date", from: "End" },
              startTimezone: { from: "StartTimezone" },
              endTimezone: { from: "EndTimezone" },
              description: { from: "Description" },
              recurrenceId: { from: "RecurrenceID" },
              recurrenceRule: { from: "RecurrenceRule" },
              recurrenceException: { from: "RecurrenceException" },
              roomId: { from: "RoomID", nullable: true },
              attendees: { from: "Attendees", nullable: true },
              isAllDay: { type: "boolean", from: "IsAllDay" }
            }
          }
        }
      },
      group: {
        resources: ["Rooms", "Attendees"],
        orientation: "vertical"
      },
      resources: [{
        field: "roomId",
        name: "Rooms",
        dataSource: [
          { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
          { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
        ],
        title: "Room"
      },{
        field: "attendees",
        name: "Attendees",
        dataSource: [
          { text: "Alex", value: 1, color: "#f8a398" },
          { text: "Bob", value: 2, color: "#51a0ed" },
          { text: "Charlie", value: 3, color: "#56ca85" }
        ],
        multiple: true,
        title: "Attendees"
      }]
    }

    this.comboboxOptions = {
      dataTextField: "text",
      dataValueField: "value",
      change: function(e) {
        var value = this.value();
        if (value) {
          $ctrl.scheduler.resources[1].dataSource.filter({
            field: "value", operator: "eq", value: Number(value)
          });

          $ctrl.scheduler.view($ctrl.scheduler.view().name);
        } else
          $ctrl.scheduler.resources[1].dataSource.filter([])
      },
      dataSource: {
        data: [{
          text: "Alex",
          value: 1,
          color: "#f8a398"
        },{
          text: "Bob",
          value: 2,
          color: "#51a0ed"
        },{
          text: "Charlie",
          value: 3,
          color: "#56ca85"
        }]
      }
    }
  })
</script>
```

## See Also

* [API Reference of the Scheduler](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
