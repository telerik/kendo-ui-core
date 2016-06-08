---
title: Implement Custom timeline View with Dynamic Length
page_title: Implement Custom timeline View with Dynamic Length | Kendo UI Scheduler
description: "Learn how to implement a custom `timeline` view in a Kendo UI Scheduler widget, which allows to change its length dynamically."
slug: howto_implementcustomtimeline_withdynamiclength_scheduler
---

# Implement Custom timeline View with Dynamic Length

The example below demonstrates how to implement a custom `timeline` view in a Kendo UI Scheduler widget, which allows to change its length dynamically.

###### Example

```html
    Number of shown days: <select id="days">
                            <option>6</option>
                            <option selected>7</option>
                            <option>8</option>
                          </select>
    <div id="scheduler"></div>
    <script>
        var MyCustomTimelistView = kendo.ui.TimelineMonthView.extend({
          options: {
            name: "MyCustomTimelistView",
            title: "Timeline Week",
            selectedDateFormat: "{0:D} - {1:D}",
            selectedShortDateFormat: "{0:d} - {1:d}",
            majorTick: 1440,
            numberOfDays: 7
          },
          name: "MyCustomTimelistView",
          calculateDateRange: function() {
            //create the required number of days

            var start = this.options.date,
                //  start = kendo.date.dayOfWeek(selectedDate, this.calendarInfo().firstDay, -1),
                idx, length,
                dates = [];

            for (idx = 0, length = this.options.numberOfDays; idx < length; idx++) {
              dates.push(start);
              start = kendo.date.nextDay(start);
            }
            this._render(dates);
          },
          previousDate: function() {
            var date = new Date(this.startDate());

            date.setDate(date.getDate() - this.options.numberOfDays);

            return date
          }
        });

      $(function() {
        var scheduler = $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [{
             type: "MyCustomTimelistView",
             selected: true,
             dateHeaderTemplate: "<span class='k-link k-nav-day'>#=kendo.toString(date, ' dd/M ddd')#</span>"
          }],
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
          ]
        }).data("kendoScheduler");

        $("#days").change(function() {
          //change the number of days option of the view
          scheduler.setOptions({
            numberOfDays: parseInt($(this).val())
          });
          //reload the view
          scheduler.view(scheduler.view().name);
        });
      });
    </script>

```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Modify Editor Template upon New Events]({% slug howto_modifyeditortemplate_wheneventisnew_scheduler %})
* [How to Prevent Moving AllDay Events outside the AllDay Header]({% slug howto_preventmovingalldayevents_fromalldayheader_scheduler %})
* [How to Retrieve Current View Date Range]({% slug howto_retrievecurrent_viewdaterange_scheduler %})
* [How to Set Slot Background Color Using Slot Templates]({% slug howto_setslotbackgroundcolor_usingslottemplates_scheduler %})
* [How to Show Tooltip with Additional Information over Scheduler Events]({% slug howto_showtooltipwith_additionalinformation_overevents_scheduler %})
* [How to Update Opposite Picker Value on `model` Change]({% slug howto_updateoppositepickervalue_onmodelchange_scheduler %})
* [How to Use Different Date Formats]({% slug howto_usedifferentdateformats_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
