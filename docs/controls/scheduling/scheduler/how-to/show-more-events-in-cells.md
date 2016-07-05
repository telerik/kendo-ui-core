---
title: Show More Events in View Cells
page_title: Show More Events in View Cells | Kendo UI Scheduler
description: "Learn how to use a remote validation in a Kendo UI Scheduler widget."
slug: howto_showmoreevents_inviewcells_scheduler
---

# Show More Events in View Cells

The example below demonstrates how to increase the height of the cells to show more events in a Kendo UI Scheduler widget.

###### Example

```html
    <style>
        /*increase the height of the cells in day, work week and week views*/
        .k-scheduler-table td, .k-scheduler-table th
        {
          height: 5.5em;
        }

        /*increase the height of the month view cells*/
        .k-scheduler-monthview .k-scheduler-table td
        {
          height: 15.5em;
        }
    </style>
    <div id="scheduler"></div>
    <script>
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
              "day",
              { type: "workWeek" },
              "week",
                {type: "month", selected: true},
              "agenda"
          ],
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
    </script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Create Recurrence Editor Using Mobile Editor]({% slug howto_createrecurrenceeditor_byusingmobileeditor_scheduler %})
* [How to Export to iCal]({% slug howto_exportto_ical_scheduler %})
* [How to Prevent Moving AllDay Events outside the AllDay Header]({% slug howto_preventmovingalldayevents_fromalldayheader_scheduler %})
* [How to Retrieve Current View Date Range]({% slug howto_retrievecurrent_viewdaterange_scheduler %})
* [How to Set Different Start Weekday]({% slug howto_setdifferent_startweekday_scheduler %})
* [How to Set Event Color in the Template]({% slug howto_seteventcolorinthetemplate_scheduler %})
* [How to Show Only All-Day Events]({% slug howto_showonlyalldayevents_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
