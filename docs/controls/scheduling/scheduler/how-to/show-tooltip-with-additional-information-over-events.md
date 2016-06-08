---
title: Show Tooltip with Additional Information over Scheduler Events
page_title: Show Tooltip with Additional Information over Scheduler Events | Kendo UI Scheduler
description: "Learn how to use Kendo UI Tooltip to show additional information over Kendo UI Scheduler events."
slug: howto_showtooltipwith_additionalinformation_overevents_scheduler
---

# Show Tooltip with Additional Information over Scheduler Events

The example below demonstrates how to use Kendo UI Tooltip to show additional information over Kendo UI Scheduler events.

###### Example

```html
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

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Create Recurrence Editor Using Mobile Editor]({% slug howto_createrecurrenceeditor_byusingmobileeditor_scheduler %})
* [How to Export to iCal]({% slug howto_exportto_ical_scheduler %})
* [How to Hide Time Headers]({% slug howto_hide_time_headers_scheduler %})
* [How to Modify Editor Template upon New Events]({% slug howto_modifyeditortemplate_wheneventisnew_scheduler %})
* [How to Use Different Date Formats]({% slug howto_usedifferentdateformats_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
