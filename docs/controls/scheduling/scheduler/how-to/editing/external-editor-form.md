---
title: Create External Editor Forms
page_title: Create External Editor Forms | Kendo UI Scheduler
description: "Learn how to create an external editor form in a Kendo UI Scheduler widget."
previous_url: /asp-mvc/controls/scheduling/scheduler/how-to/external-editor-form, /controls/scheduling/scheduler/how-to/external-editor-form
slug: howto_create_external_editor_form_scheduler
---

# Create External Editor Forms

The following example demonstrates how create an external editor form in the Scheduler.

```dojo
    <div id="scheduler"></div>
    <div id="editor"></div>

    <script id="editor-template" type="text/kendo-x-tmpl">
 		<label>
      Title:
      <input data-bind="value: title" />
      </label>
 		<label>
      Start:
      <input data-role="datetimepicker" data-bind="value: start" />
      </label>
 		<label>
      End:
      <input data-role="datetimepicker" data-bind="value: end" />
      </label>
    <button id="save">Save</button>
    <button id="cancel">Cancel</button>
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
            confirmation: false
          },
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
          ],
          edit: function(e) {
            e.preventDefault(); // Prevent the popup editing.
            var dataSource = this.dataSource;
            var event = e.event;

            if (event.isNew()) {
              setTimeout(function() {
                dataSource.add(event);
                editEvent(event);
              });
            } else {
              editEvent(event);
            }
          }
        });

        var editor = $("#editor");
        var template = kendo.template($("#editor-template").html());
        var scheduler = $("#scheduler").data("kendoScheduler");

        function destroyEditor() {
          kendo.destroy(editor);
          editor.find("button").off();
          editor.html("");
        }

        var currentEvent;

        function editEvent(event) {
            destroyEditor();

            editor.html(template({}));
            kendo.bind(editor, event); // Bind the editor container (uses MVVM).

            editor.find("#save").click(function() {
                scheduler.dataSource.sync();
                destroyEditor();
            });

            editor.find("#cancel").click(function() {
                scheduler.dataSource.cancelChanges(currentEvent);
                destroyEditor();
            });
        }
      });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
