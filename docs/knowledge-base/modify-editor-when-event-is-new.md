---
title: Modify the Editor Templates of the Scheduler upon New Events
page_title: Modify the Editor Templates of the Scheduler upon New Events 
description: "Learn how to show or hide different parts of the editor template based on the event state in the Kendo UI for jQuery Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/modify-editor-when-event-is-new, /controls/scheduling/scheduler/how-to/editing/modify-editor-when-event-is-new
slug: howto_modifyeditortemplate_wheneventisnew_scheduler
tags: telerik, kendo, jquery, scheduler, modify, editor, templates, on, when, adding, new, events 
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

How can I show or hide different parts of the editor template based on the event state?

## Solution

The following example demonstrates how to achieve the desired scenario. As a result, if the event is not new, the template hides the **Title** field and displays a message.

```dojo
<div id="example">
      <div id="scheduler"></div>
    </div>
    <script id="customEditorTemplate" type="text/x-kendo-template">
<!-- notice how the Title is hidden if the event is new -->
<div data-bind="visible: isNew">
  <div class="k-edit-label"><label for="title">Title</label></div>
  <div data-container-for="title" class="k-edit-field">
      <input type="text" data-role="textbox" name="title" required="required" data-bind="value:title">
      </div>
      </div>
<div data-bind="invisible: isNew">
    <h4>The 'Title' field is hidden, because event is not new</h4>
      </div>
<div class="k-edit-label">
    <label for="start">Start</label>
      </div>
<div data-container-for="start" class="k-edit-field">
    <input type="text"
           data-role="datetimepicker"
           data-interval="15"
           data-type="date"
           data-bind="value:start,invisible:isAllDay"
           name="start"/>
    <input type="text" data-type="date" data-role="datepicker" data-bind="value:start,visible:isAllDay" name="start" />
    <span data-bind="text: startTimezone"></span>
    <span data-for="start" class="k-invalid-msg" style="display: none;"></span>
      </div>
<div class="k-edit-label"><label for="end">End</label></div>
<div data-container-for="end" class="k-edit-field">
    <input type="text" data-type="date" data-role="datetimepicker" data-bind="value:end,invisible:isAllDay" name="end" data-datecompare-msg="End date should be greater than or equal to the start date" />
    <input type="text" data-type="date" data-role="datepicker" data-bind="value:end,visible:isAllDay" name="end" data-datecompare-msg="End date should be greater than or equal to the start date" />
    <span data-bind="text: endTimezone"></span>
    <span data-bind="text: startTimezone, invisible: endTimezone"></span>
    <span data-for="end" class="k-invalid-msg" style="display: none;"></span>
      </div>
<div class="k-edit-label"><label for="isAllDay">All day event</label></div>
<div data-container-for="isAllDay" class="k-edit-field">
    <input type="checkbox" name="isAllDay" data-type="boolean" data-bind="checked:isAllDay">
      </div>
<div class="k-edit-label"><label for="recurrenceRule">Repeat</label></div>
<div data-container-for="recurrenceRule" class="k-edit-field">
    <div data-bind="value:recurrenceRule" name="recurrenceRule" data-role="recurrenceeditor"></div>
      </div>
<div class="k-edit-label"><label for="description">Description</label></div>
<div data-container-for="description" class="k-edit-field">
    <textarea name="description" data-role="textarea" data-bind="value:description"></textarea>
      </div>
<div class="k-edit-label"><label for="ownerId">Owner</label></div>
<div data-container-for="ownerId" class="k-edit-field">
    <select id="ownerId" data-bind="value:ownerId" data-role="dropdownlist"
                    data-value-field="value" data-text-field="text">
      <option value="1">Alex</option>
      <option value="2">Bob</option>
      <option value="3">Charlie</option>
      </select>
      </div>
    </script>
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
            "agenda"
          ],
          editable: {
            template: $("#customEditorTemplate").html(),
          },
          eventTemplate: $("#event-template").html(),
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
      });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
