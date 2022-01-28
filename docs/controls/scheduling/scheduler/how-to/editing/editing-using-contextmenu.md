---
title: Edit by Using ContextMenu
page_title: Edit by Using ContextMenu | Kendo UI Scheduler
description: "Learn how to edit the Kendo UI Scheduler by using the Kendo UI ContextMenu widget."
previous_url: /aspnet/web/scheduler/how-to/editing-using-contextmenu, /controls/scheduling/scheduler/how-to/editing-using-contextmenu
slug: howto_edit_using_kendouicontextmenu_scheduler
---

# Edit by Using ContextMenu

The following example demonstrates how to edit the Scheduler by using the Kendo UI ContextMenu widget.

```dojo
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
    }).data("kendoScheduler");

    $("#contextMenu").kendoContextMenu({
        filter: ".k-event, .k-scheduler-table td",
        target: "#scheduler",
        // Optionally show the menu on left mouse click:
        // showOn: "click",
        select: function(e) {
            var target = $(e.target);

            if (target.hasClass("k-event")) {
              var occurrenceByUid = scheduler.occurrenceByUid(target.data("uid"));

              scheduler.editEvent(occurrenceByUid);
            } else {
              var slot = scheduler.slotByElement(target);

              scheduler.addEvent({
                start: slot.startDate,
                end: slot.endDate
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

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
