---
title: Show Tooltip with Additional Information over Scheduler Events
page_title: Show Tooltip with Additional Information over Scheduler Events | Kendo UI Scheduler
description: "Learn how to use the Kendo UI Tooltip to show additional information over Scheduler events."
previous_url: /controls/scheduling/scheduler/how-to/show-tooltip-with-additional-information-over-events
slug: howto_showtooltipwith_additionalinformation_overevents_scheduler
---

# Show Tooltip with Additional Information over Scheduler Events

The following example demonstrates how to use the Kendo UI Tooltip to show additional information over Kendo UI Scheduler events.

```dojo
<div id="scheduler"></div>
<script>
  $(function() {
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/13"),
      startTime: new Date("2013/6/13 07:00 AM"),
      height: 600,
      views: [
        "day",
        { type: "workWeek", selected: true },
        "week",
        "month",
        "agenda",
        { type: "timeline", eventHeight: 50}
      ],
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
    });

    $("#scheduler").kendoTooltip({
      filter: ".k-event:not(.k-event-drag-hint) > div, .k-task",
      position: "top",
      width: 250,
      content: kendo.template($('#template').html())
    });
  });
</script>
<script id="template" type="text/x-kendo-template">
  #var element = target.is(".k-task") ? target : target.parent();#
  #var uid = element.attr("data-uid");#
  #var scheduler = target.closest("[data-role=scheduler]").data("kendoScheduler");#
  #var model = scheduler.occurrenceByUid(uid);#

  #if(model) {#
      <strong>event start:</strong> #=kendo.format('{0:d}',model.start)#<br />
      <strong>event end:</strong> #=kendo.format('{0:d}',model.end)#<br />
      <strong>event description:</strong> #=model.description#<br />
  #} else {#
      <strong>No event data is available</strong>
  #}#
</script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
