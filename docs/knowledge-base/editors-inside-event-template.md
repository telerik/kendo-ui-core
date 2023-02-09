---
title: Nest Editors inside the Event Templates of the Scheduler 
page_title: Nest Editors inside the Event Templates of the Scheduler 
description: "Learn how to nest editors inside event templates and update the underlying model in a Kendo UI for jQuery Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/editors-inside-event-template, /controls/scheduling/scheduler/how-to/editing/editors-inside-event-template
slug: howto_nest_editorsinside_event_templates_scheduler
tags: telerik, kendo, jquery, scheduler, nest, editors, inside, event, templates 
component: scheduler
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I nest editors inside the Scheduler event templates and update the underlying model?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="scheduler"></div>
    <script id="event-template" type="text/x-kendo-template">
        <div>
            <label style="font-size: 10pt;font-style: italic; color: \#FF3385">
                <input type="checkbox" onchange='onCheckboxChange(this)' #=data.cancelled ? checked='checked' : ''#></input>cancelled event
            </label>
        </div>
        <hr />
        <div>#=title#</div>
    </script>

    <script>
      function onCheckboxChange(checkbox) {        
        var scheduler = $(checkbox).closest('[data-role=scheduler]').data("kendoScheduler");
        var uid = $(checkbox).closest("[data-uid]").data("uid");

        // Get the event instance by using the Scheduler API.
        var event = scheduler.occurrenceByUid(uid);

        // Update the underlying model.
        event.set("cancelled", $(checkbox).is(":checked"));
      }

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
          eventTemplate: $('#event-template').html(),
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
                  isAllDay: { type: "boolean", from: "IsAllDay" },
                  cancelled: { type: "boolean", from: "Cancelled" }
                }
              }
            }
          }
        });
      });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
