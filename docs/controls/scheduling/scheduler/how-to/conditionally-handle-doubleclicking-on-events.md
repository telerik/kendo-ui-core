---
title: Handle Double-Clicking on Events Conditionally Based On the View Name
page_title: Handle Double-Clicking on Events Conditionally Based On the View Name | Kendo UI Scheduler
description: "Learn how to handle double-clicking on events conditionally based on the view name in a Kendo UI Scheduler widget."
slug: howto_conditionally_handle_doubleclicking_events_scheduler
---

# Handle Double-Clicking on Events Conditionally Based On the View Name

The example below demonstrates how to handle double-clicking on events conditionally based on the view name in a Kendo UI Scheduler widget.

###### Example

```html
<div id="example" class="k-content">
      <div id="scheduler"></div>
    </div>
    <script>
      $(function() {
        $("#scheduler").kendoScheduler({
          editable: false,
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
            "day",
            { type: "week", selected: true },
            "month",
            "agenda"
          ],
          timezone: "Etc/UTC",
          dataSource: {
            batch: true,

            transport: {
              read: {
                url: "http://demos.kendoui.com/service/tasks",
                dataType: "jsonp"
              },
              update: {
                url: "http://demos.kendoui.com/service/tasks/update",
                dataType: "jsonp"
              },
              create: {
                url: "http://demos.kendoui.com/service/tasks/create",
                dataType: "jsonp"
              },
              destroy: {
                url: "http://demos.kendoui.com/service/tasks/destroy",
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

        $("#scheduler").on("dblclick", ".k-event", function(e){
          var scheduler = $("#scheduler").getKendoScheduler();
          var event = scheduler.occurrenceByUid($(this).data("uid"));
          if(scheduler.viewName() == "month"){
            scheduler.editEvent(event);
          }else{
            alert(event.title);
          }        
        });

      });
    </script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically]({% slug howto_calculate_scheduler_height_dunamically_scheduler %})
* [How to Calculate Scheduler Height Dynamically on Mobile]({% slug howto_calculate_scheduler_height_dunamically_onmobile_scheduler %})
* [How to Create External Editor Form]({% slug howto_create_external_editor_form_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_kendouicontextmenu_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
