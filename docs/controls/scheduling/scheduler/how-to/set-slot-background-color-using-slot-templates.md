---
title: Set Slot Background Color Using Slot Templates
page_title: Set Slot Background Color Using Slot Templates | Kendo UI Scheduler Widget
description: "Learn how to set the cell background color by using slotTemplate and allDaySlotTemplate, based on the slot date, in a Kendo UI Scheduler widget."
slug: howto_setslotbackgroundcolor_usingslottemplates_scheduler
---

# Set Slot Background Color Using Slot Templates

The example below demonstrates how to set the slot (cell) background color by using `slotTemplate` and `allDaySlotTemplate`, based on the slot date, in a Kendo UI Scheduler widget.

###### Example

```html
    <div id="scheduler"></div>
    <style>
      /* Remove the padding of scheduler slots */
      .k-scheduler-table td, .k-scheduler-table th 
      {
        padding: 0;
      }
    </style>
    <script>
      function getColorBasedOnHour(date) {
        var difference = date.getTime() - kendo.date.getDate(date);
        var hours = difference / kendo.date.MS_PER_HOUR;
    
        if (hours >= 8 && hours < 12) {
          return "#CC66FF";
        } else if (hours >= 13 && hours < 17) {
          return "#CC0099";
        } else {
          return "#33CCFF";
        }
      }
    
      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          allDaySlotTemplate: "<div style='background:\\#A2A2AA; height: 100%;width: 100%;'></div>",
          slotTemplate: "<div style='background:#=getColorBasedOnHour(date)#; height: 100%;width: 100%;'></div>",
          views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month",
            "agenda",
            { type: "timeline", eventHeight: 50}
          ],
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
                { text: "Alex", value: 1},
                { text: "Bob", value: 2},
                { text: "Charlie", value: 3}
              ]
            }
          ]
        });
      });
    </script>
```

## See Also 

Other articles and how-to examples on Kendo UI Scheduler:

* [JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Create Recurrence Editor Using Mobile Editor]({% slug howto_createrecurrenceeditor_byusingmobileeditor_scheduler %})
* [How to Export to iCal]({% slug howto_exportto_ical_scheduler %})
* [How to Hide Header and Footer in Adaptive Rendering]({% slug howto_hideheaderandfooter_inadaptiverebdering_scheduler %})
* [How to Hide Time Headers]({% slug howto_hide_time_headers_scheduler %})
* [How to Implement Custom `timeline` View with Dynamic Length]({% slug howto_implementcustomtimeline_withdynamiclength_scheduler %})
* [How to Modify Editor Template upon New Events]({% slug howto_modifyeditortemplate_wheneventisnew_scheduler %})
* [How to Modify Event Styling on `databound`]({% slug howto_modifyeventstyling_ondatabound_scheduler %})
* [How to Persist Resource Values on `move`]({% slug howto_persistresourcevalues_onamoveevent_scheduler %})
* [How to Prevent Moving AllDay Events outside the AllDay Header]({% slug howto_preventmovingalldayevents_fromalldayheader_scheduler %})
* [How to Retrieve Current View Date Range]({% slug howto_retrievecurrent_viewdaterange_scheduler %})
* [How to Set Different Start Weekday]({% slug howto_setdifferent_startweekday_scheduler %})
* [How to Set Event Color in the Template]({% slug howto_seteventcolorinthetemplate_scheduler %})
* [How to Show More Events in View Cells]({% slug howto_showmoreevents_inviewcells_scheduler %})
* [How to Show Only All-Day Events]({% slug howto_showonlyalldayevents_scheduler %})
* [How to Show Tooltip with Additional Information over Scheduler Events]({% slug howto_showtooltipwith_additionalinformation_overevents_scheduler %})
* [How to Update Opposite Picker Value on `model` Change]({% slug howto_updateoppositepickervalue_onmodelchange_scheduler %})
* [How to Use Different Date Formats]({% slug howto_usedifferentdateformats_scheduler %})
* [How to Use Local `observable` Data Object]({% slug howto_uselocalobservable_dataobject_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})

How-to examples on Kendo UI Scheduler in AngularJS:

* [How to Create and Set `ObservableArray` Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})
* [How to Show Тooltip on `hover`]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For additional runnable examples on Kendo UI Scheduler, browse the [Scheduler **How To** documentation folder](http://docs.telerik.com/kendo-ui/web/scheduler/how-to).