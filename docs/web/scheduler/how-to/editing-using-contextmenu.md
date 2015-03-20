---
title: Editing using ContextMenu
page_title: Editing using ContextMenu
description: Editing using ContextMenu
---

# Editing using ContextMenu

The example below demonstrates how to edit Scheduler event using ContextMenu

#### Example:

```html
<div id="example">
    <div id="scheduler"></div>
    <ul id="contextMenu"></ul>
</div>

<script>
  $(function() {
    var selectState = null;

    var scheduler = $("#scheduler").kendoScheduler({
      date: new Date("2013/6/13"),
      startTime: new Date("2013/6/13 07:00 AM"),
      height: 600,
                views: [
        "day",
        { type: "workWeek", selected: true },
        "week",
        "month",
      ],
      selectable: true,
      change: function(e) {
        selectState = e;
      },
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
    }).data("kendoScheduler");

    $("#contextMenu").kendoContextMenu({
        filter: ".k-event, .k-scheduler-table",
        showOn: "click",
        select: function() {
          if (selectState.events.length) {
            scheduler.editEvent(selectState.events[0]);
          } else {
            scheduler.addEvent({
              start: selectState.start,
              end: selectState.end
            });
          }
        },
        open: function(e) {
          var menu = e.sender;
          var text = $(e.target).hasClass("k-event") ? "Edit event" : "Add Event";

          menu.remove(".myClass");
          menu.append([{text: text, cssClass: "myClass" }]);
        }
    });
  });
</script>
```
