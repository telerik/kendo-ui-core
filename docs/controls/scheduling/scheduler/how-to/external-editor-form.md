---
title: Create External Editor Form
page_title: Create External Editor Form | Kendo UI Scheduler
description: "Learn how to create an external editor form in a Kendo UI Scheduler widget."
slug: howto_create_external_editor_form_scheduler
---

# Create External Editor Form

The example below demonstrates how create an external editor form in the Kendo UI Scheduler widget.

###### Example

```html
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
                url: "http://demos.telerik.com/kendo-ui/service/tasks",
                dataType: "jsonp"
              },
              update: {
                url: "http://demos.telerik.com/kendo-ui/service/tasks/update",
                dataType: "jsonp"
              },
              create: {
                url: "http://demos.telerik.com/kendo-ui/service/tasks/create",
                dataType: "jsonp"
              },
              destroy: {
                url: "http://demos.telerik.com/kendo-ui/service/tasks/destroy",
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
            e.preventDefault(); //prevent popup editing
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
            kendo.bind(editor, event); //Bind the editor container (uses MVVM)

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

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically]({% slug howto_calculate_scheduler_height_dunamically_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
