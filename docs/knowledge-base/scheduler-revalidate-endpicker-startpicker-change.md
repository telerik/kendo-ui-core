---
title: Re-validate End DatePicker OnStart DatePicker Change
description: Learn how to revalidate the end DatePicker when the date in the start DatePicker is changed in the Kendo UI Scheduler.
type: how-to
page_title: Re-validate End Picker On Start Picker Change - Kendo UI Scheduler for jQuery
slug: scheduler-revalidate-endpicker-startpicker-change
tags: kendo, kendoui, scheduler, validate, datetimepicker, start, end
ticketid: 1419532
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
</table>


## Description

How can I validate again the end date in the Scheduler editor, when the start date of the event has been changed?

## Solution

1. Subscribe to the Scheduler [`edit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/edit) event.
1. Get reference to the start DatePicker and DateTimePicker and bind their change event.
1. In the change event handler take reference to the respective End pickers. Set their value to the value entered in their input elements and trigger End picker change events to update the End field value.

````dojo
	<input type="button" value="Select All" onclick="SelectAll()" />
    <div id="example">
      <div id="scheduler"></div>
    </div>
    <script>
      $(function() {

        function updateEndDateTimePicker() {
          var endDateTimePicker =  $("[data-container-for=end] input[data-role=datetimepicker]").data("kendoDateTimePicker");
          endDateTimePicker.value(kendo.parseDate(endDateTimePicker.element.val()));
          endDateTimePicker.trigger("change");
        }

        function updateEndDatePicker() {
          var endDatePicker =  $("[data-container-for=end] input[data-role=datepicker]").data("kendoDatePicker");
          endDatePicker.value(kendo.parseDate(endDatePicker.element.val()));
          endDatePicker.trigger("change");
        }

        function schedulerEdit(e) {
          var startDateTimePicker =  $("[data-container-for=start] input[data-role=datetimepicker]").data("kendoDateTimePicker");
          startDateTimePicker.bind("change", updateEndDateTimePicker);

          var startDatePicker =  $("[data-container-for=start] input[data-role=datepicker]").data("kendoDatePicker");
          startDatePicker.bind("change", updateEndDatePicker);

        }

        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          selectable: true,
          edit: schedulerEdit,
          editable: {
            resize: false
          },
          views: [
            "day",
            { type: "week", selected: true },
            "month",
            "timeline"
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
                  isAllDay: { type: "boolean", from: "IsAllDay" }
                }
              }
            }
          }
        });
      });

      function SelectAll() {
        var scheduler = $("#scheduler").data("kendoScheduler");
        var allEvents = scheduler.data().map(function(val, i) { return val.uid; });
        scheduler.select(allEvents);
      }

    </script>
````

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
