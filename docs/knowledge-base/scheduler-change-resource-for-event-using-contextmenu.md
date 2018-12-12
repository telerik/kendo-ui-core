---
title: Change Resource for and Even Using ContextMenu
description: An example of how to implement a Kendo UI ContextMenu, which allows the user to change an event resource in Kendo UI Scheduler Agenda view.
type: how-to
page_title: Change Resource for an Event with a ContextMenu | Kendo UI Scheduler
slug: scheduler-change-resource-for-event-using-contextmenu
tags: kendo, scheduler, agenda-view, contextmenu, resources
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

How to implement a Kendo ContextMenu, which allows the user to change the resource assigned to a particular event in Kendo Scheduler Agenda view?

## Solution

```dojo
  <div id="scheduler"></div>
  <ul id="contextMenu">
    <li data-value="1">Set to Alex</li>
    <li data-value="2">Set to Bob</li>
    <li data-value="3">Set to Charlie</li>
  </ul>

  <script>
    $(function() {
      var scheduler = $("#scheduler").kendoScheduler({
        date: new Date("2013/6/23"),
        startTime: new Date("2013/6/23 07:00 AM"),
        height: 600,
        views: [{ type: "agenda" }],
        timezone: "Etc/UTC",
        dataSource: {
          batch: true,
          transport: {
            read: {
              url: "//demos.telerik.com/kendo-ui/service/tasks",
              dataType: "jsonp"
            },
            update: {
              url: "//demos.telerik.com/kendo-ui/service/tasks/update",
              dataType: "jsonp"
            },
            create: {
              url: "//demos.telerik.com/kendo-ui/service/tasks/create",
              dataType: "jsonp"
            },
            destroy: {
              url: "//demos.telerik.com/kendo-ui/service/tasks/destroy",
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
            dataSource: [
              { text: "Alex", value: 1, color: "#f8a398" },
              { text: "Bob", value: 2, color: "#51a0ed" },
              { text: "Charlie", value: 3, color: "#56ca85" }
            ]
          }
        ]
      }).data("kendoScheduler");


      $("#contextMenu").kendoContextMenu({
        filter: ".k-scheduler-table td .k-task",
        target: "#scheduler",
        select: function(e) {
          var targetTask = $(e.target);
          var uid = targetTask.data("uid");
          var dataSource = scheduler.dataSource;
          var item = dataSource.getByUid(uid);
          var newOwner = Number($(e.item).attr('data-value'));
          item.set('ownerId', newOwner);
        }
      });
    });
  </script>
```

## See Also

* [Kendo Scheduler API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Kendo ContextMenu API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu)
