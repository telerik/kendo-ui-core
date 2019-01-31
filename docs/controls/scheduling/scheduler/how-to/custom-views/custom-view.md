---
title: Create Custom Views by Inheriting Built-In Views
page_title: Create Custom Views by Inheriting Built-In Views | Kendo UI Scheduler
description: "Learn how to inherit some of the built-in views and implement specific custom logic in a Kendo UI Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/custom-view
slug: howto_create_custom_view_inheriting_builtinview_scheduler
position: 2
---

# Create Custom Views by Inheriting Built-In Views

The following example demonstrates how to inherit some of the built-in views and implement specific custom logic in the Kendo UI Scheduler widget.

###### Example

```dojo
    <div id="scheduler"></div>
    <script>
      var CustomAgenda = kendo.ui.AgendaView.extend({
        endDate: function() {
          var date = kendo.ui.AgendaView.fn.endDate.call(this);
          return kendo.date.addDays(date, 31);
        }
      });

      var ThreeDayView = kendo.ui.MultiDayView.extend({
        nextDate: function () {
          return kendo.date.nextDay(this.startDate());
        },
        options: {
          selectedDateFormat: "{0:D} - {1:D}"
        },
        name: "ThreeDayView",
        calculateDateRange: function () {
          //create a range of dates to be shown within the view
          var start = this.options.date,
            idx, length,
            dates = [];

          for (idx = 0, length = 3; idx < length; idx++) {
            dates.push(start);
            start = kendo.date.nextDay(start);
          }

          this._render(dates);
        }
      });

      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
            "day",
            "week",
            // "custom week",
            { type: "ThreeDayView", title: "Three day view", selected: true },
            // "custom agenda",
            { type: "CustomAgenda", title: "Custom Agenda" }
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
            }
          }
        });
      });
    </script>
```

## See Also

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically]({% slug howto_calculate_scheduler_height_dunamically_scheduler %})
* [How to Calculate Scheduler Height Dynamically on Mobile]({% slug howto_calculate_scheduler_height_dunamically_onmobile_scheduler %})
* [How to Create Custom Restrictions]({% slug howto_create_custom_restrivtions_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_customize_editand_events_templates_angularjs_scheduler %}).
