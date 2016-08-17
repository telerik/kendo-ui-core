---
title: Scroll to Specific Time Slot
page_title: Scroll to Specific Time Slot | Kendo UI Scheduler
description: "Learn how to scroll to a given time slot with JavaScript in a Kendo UI Scheduler."
slug: scroll_to_given_time_slot
---

# Scroll to Specific Time Slot

The example below demonstrates how to scroll  to a given time slot with JavaScript in a Kendo UI Scheduler.

###### Example

```html
    <div style="width: 50%; margin-left: auto; margin-right: auto;">
      <div id="scheduler"></div>
      <h3>Scroll the scheduler content to given hour:</h3>
      <button class="k-button" onclick="scrollToHour(10)">Scroll to 10 AM</button>
      <button class="k-button" onclick="scrollToHour(22)">Scroll to 10 PM</button>
    </div>
    <script>

      function scrollToHour(hour) {
        var time = new Date();
        time.setHours(hour);
        time.setMinutes(0);
        time.setSeconds(0);
        time.setMilliseconds(0);

        var scheduler = $("#scheduler").data("kendoScheduler");
        var contentDiv = scheduler.element.find("div.k-scheduler-content");
        var rows = contentDiv.find("tr");

        for (var i = 0; i < rows.length; i++) {
          var slot = scheduler.slotByElement(rows[i]);

          var slotTime = kendo.toString(slot.startDate, "HH:mm");
          var targetTime = kendo.toString(time, "HH:mm");

          if (targetTime === slotTime) {
            scheduler.view()._scrollTo($(rows[i]).find("td:first")[0], contentDiv[0]);
          }
        };
      }

      $(function() {
        $("#scheduler").kendoScheduler({
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

    <style scoped>
      body {
        font-family: verdana;
        font-size: 0.8em;
      }
    </style>

```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically]({% slug howto_calculate_scheduler_height_dunamically_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Implement Custom Editing in agenda View]({% slug howto_implement_custom_editing_inagenda_view_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})
* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
