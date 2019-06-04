---
title: Dynamically Change the Displayed Grouping in Scheduler
description: An example on how to change the groups in a Kendo UI Scheduler to reflect the selected resource values.
type: how-to
page_title: Dynamically Change Grouping Resources | Kendo UI Scheduler for jQuery
slug: scheduler-dynamically-change-grouping-options
tags: kendo, kendoui, scheduler, grouping, resources, dynamic, change
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

How can I change the displayed groups in a Kendo UI Scheduler to reflect the selected resource values?

## Solution

1. Attach an event handler for the `change` event of the resource values checkboxes.
1. Alter the `grouping` configuration of the Scheduler according to the selected (checked) values.
1. Reload the current Scheduler view.

```dojo
<div id="example">
  <h3>Check a checkbox to display the respective Group and events</h3>
  <div id="team-schedule">
    <div id="people">
      <input type="checkbox" id="alex" value="1">
      <input type="checkbox" id="bob" value="2">
      <input type="checkbox" id="charlie" value="3">
    </div>
  </div>
  <div id="scheduler"></div>
</div>

<script>
  $(function() {
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/13"),
      startTime: new Date("2013/6/13 07:00 AM"),
      height: 600,
      views: [
        "day",
        { type: "month", selected: true },
        "week",
        "workWeek",
        "agenda",
        { type: "timeline", eventHeight: 50}
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
        }
      },
      resources: [
        {
          field: "ownerId",
          title: "Owner",
          name: "Owners",
          dataSource: []
        }
      ]
    });

    $("#people :checkbox").change(function(e) {
      var availableOwners = {
        "1": { text: "Alex", value: 1, color: "#f8a398" },
        "2": { text: "Bob", value: 2, color: "#51a0ed" },
        "3": { text: "Charlie", value: 3, color: "#56ca85" }
      };

      var checked = $.map($("#people :checked"), function(checkbox) {
        return availableOwners[$(checkbox).val()];
      });

      var scheduler = $("#scheduler").data("kendoScheduler");

      if (!checked.length) {
        delete scheduler.options.group;
      } else {
        scheduler.options.group = {
          resources: ["Owners"],
          orientation: "horizontal"
        };
      }

      scheduler.resources[0].dataSource.data(checked);
      scheduler.view(scheduler.view().name);
    });
  });
</script>
<style scoped>
  .k-nav-current > .k-link span + span {
    max-width: 200px;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: top;
  }
  #team-schedule {
    background: url('https://demos.telerik.com/kendo-ui/content/web/scheduler/team-schedule.png') transparent no-repeat;
    height: 115px;
    position: relative;
  }
  #people {
    background: url('https://demos.telerik.com/kendo-ui/content/web/scheduler/scheduler-people.png') no-repeat;
    width: 345px;
    height: 115px;
    position: absolute;
    right: 0;
  }
  #alex {
    position: absolute;
    left: 4px;
    top: 81px;
  }
  #bob {
    position: absolute;
    left: 119px;
    top: 81px;
  }
  #charlie {
    position: absolute;
    left: 234px;
    top: 81px;
  }
</style>
```

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler).
