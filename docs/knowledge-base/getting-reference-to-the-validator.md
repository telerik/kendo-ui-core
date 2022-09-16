---
title: Get a Reference to the Built-In Scheduler Validator
page_title: Get a Reference to the Built-In Scheduler Validator
description: "Learn how to get a reference to the built-in Kendo UI Validator by using the edit event of the Kendo UI Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/getting-reference-to-the-validator, /controls/scheduling/scheduler/how-to/validation/getting-reference-to-the-validator
slug: howto_get_referencetothe_builtin_validator_scheduler
tags: telerik, kendo, jquery, scheduler, get, a, reference, to, the, builtin, validator 
component: scheduler
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler for jQuery</td>
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

How can I get a reference to the built-in Kendo UI Validator by using the `edit` event of the Scheduler?

## Solution

The following example demonstrates how to acieve the desired scenario.

```dojo
    <div id="scheduler"></div>
    <script>
      $(function() {
        function scheduler_edit(e) {
          var editable = e.container.data("kendoEditable");
          var validator = e.container.data("kendoValidator");
        }       

        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 7:00"),
          height: 400,
          timezone: "Etc/UTC",
          views: [
            "day",
            { type: "week", selected: true },
            "month",
            "agenda"
          ],
          selectable: true,
          edit: scheduler_edit,
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
                id: "taskID",
                fields: {
                  taskID: { from: "TaskID", type: "number" },
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
        });
      });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
