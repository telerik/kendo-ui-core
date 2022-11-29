---
title: Make the Weekly Recurrence Option Mandatory in the Scheduler
description: "An example on how to make the weekly recurrence option in the Kendo UI for jQuery  Scheduler mandatory."
type: how-to
page_title: Make the Weekly Recurrence Option Mandatory in the Hierarchy Scheduler
slug: scheduler-weekly-recurrence-mandatory
tags: kendo, jquery, scheduler, recurrence rule, editor, mandatory
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI for jQuery Scheduler</td>
 </tr>
</table>


## Description

How can I prevent users from saving an event if they have not selected a day from the weekly recurrence editor in the Kendo UI for jQuery Scheduler?

## Solution

To achieve the desired scenario, refer to the following implememtation:

```dojo
    <div id="example">

      <div id="scheduler"></div>
    </div>
    <script>$(function() {
        $("#scheduler").kendoScheduler({
          edit:function(e){
            var scheduler = e.sender;
            var shouldDisplayMessage = true;

            $(".k-scheduler-update").click(function(e){
              if(!$('[aria-label="RepeatNever"]').hasClass("k-active")){
                e.preventDefault();
                e.stopPropagation();
                var buttons = $('.k-recur-weekday-buttons').children();
                for(let button of buttons){
                  if($(button).hasClass("k-active")){
                    scheduler.saveEvent();
                    shouldDisplayMessage = false;
                  } 
                }
                if(shouldDisplayMessage){
                  $("<div id='valMessage' style='color:red;'>Please select an option</div>").insertAfter($(".k-recur-weekday-buttons"));
                  shouldDisplayMessage=false;
                }
              }
            })
          },
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month",
            "year",
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
        });

        $("#people :checkbox").change(function(e) {
          var checked = $.map($("#people :checked"), function(checkbox) {
            return parseInt($(checkbox).val());
          });

          var scheduler = $("#scheduler").data("kendoScheduler");

          scheduler.dataSource.filter({
            operator: function(task) {
              return $.inArray(task.ownerId, checked) >= 0;
            }
          });
        });
      });
    </script>
```

## See Also

* [Kendo UI for jQuery Scheduler API Reference](/api/javascript/ui/scheduler)
* [Common Issues in Kendo UI for jQuery]({% slug troubleshooting_common_issues_kendoui %})