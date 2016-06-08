---
title: Nest Editors inside Event Templates
page_title: Nest Editors inside Event Templates | Kendo UI Scheduler
description: "Learn how to nest editors inside event templates and update the underlying model in a Kendo UI Scheduler widget."
slug: howto_nest_editorsinside_event_templates_scheduler
---

# Nest Editors inside Event Templates

The example below demonstrates how to nest editors inside event templates and update the underlying model in a Kendo UI Scheduler widget.

###### Example

```html
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
        var scheduler =  checkbox.closest('[data-role=scheduler]').data("kendoScheduler");

        checkbox = $(checkbox);

        var uid = checkbox.closest("[data-uid]").data("uid");

        //get event instance using scheduler API:
        var event = scheduler.occurrenceByUid(uid);

        //update the underlying model:
        event.set("cancelled", checkbox.is(":checked"));
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

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_kendouicontextmenu_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
