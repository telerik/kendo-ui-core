---
title: Prevent invalid start/end date values in the Scheduler popup editor.
description: Learn how to prevent the user from entering invalid start/end date values in the Kendo jQuery Scheduler popup editor.
type: how-to
page_title: Prevent invalid start/end date values in the Scheduler popup editor - Kendo UI Scheduler for jQuery
slug: scheduler-start-end-invalid-input
tags: scheduler, start, end, inputs, readonly, datepickers
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
 <tr>
  <td>Kendo UI for jQuery</td>
  <td>2021.2.511</td>
 </tr>
</table>

## Description

How can I prevent invalid start/end date values in the Scheduler popup editor, like typing irrelevant text in the inputs?

## Solution #1

Handle the [edit event](api/javascript/ui/scheduler/events/edit) and add "readonly" property to the start and end inputs.

```dojo
    <div id="example">
        <div id="scheduler"></div>
    </div>
    <script>
    $(function() {
        function scheduler_edit(e) {
            // Make Start and End DateTimePickers INPUTS readonly, allowing date selection only through dropdowns

            $("[name='start']").prop("readonly", true);
            $("[name='end']").prop("readonly", true);
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
                "agenda",
                "timeline"
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

## Solution #2

Handle the edit event and force the Start/End DatePickers to reject invalid dates format and preserve the last valid date entered

```dojo
    <div id="example">
      <div id="scheduler"></div>
    </div>
    <script>      
      $(function() {

        function eventEdit() {
          var startPicker =  $("[data-container-for=start] input[name=start]").data("kendoDateTimePicker");
          var startValue = startPicker.value();

          startPicker.setOptions({
            change: function(e) {
              var date = startPicker.value();
              if (!date) {
                startPicker.value(startValue);
              }
            }
          })

          var endPicker =  $("[data-container-for=end] input[name=end]").data("kendoDateTimePicker");
          var endValue = endPicker.value();

          endPicker.setOptions({
            change: function(e) {
              var date = endPicker.value();
              if (!date) {
                endPicker.value(endValue);
              }
            }
          })

        }

        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 7:00"),
          height: 400,
          timezone: "Etc/UTC",
          edit: eventEdit,
          views: [
            "day",
            { type: "week", selected: true },
            "month",
            "agenda",
            "timeline"
          ],
          selectable: true,
          change: function (e) {
            console.log('change', e)
          },
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
              parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                  return { models: kendo.stringify(options.models) };
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
