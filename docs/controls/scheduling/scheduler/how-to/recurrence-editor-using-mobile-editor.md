---
title: Create Recurrence Editor Using Mobile Editor
page_title: Create Recurrence Editor Using Mobile Editor | Kendo UI Scheduler
description: "Learn how to create a recurrence editor by using a mobile editor approach in a Kendo UI Scheduler widget."
slug: howto_createrecurrenceeditor_byusingmobileeditor_scheduler
---

# Create Recurrence Editor Using Mobile Editor

The example below demonstrates how create a recurrence editor using a mobile editor approach in a Kendo UI Scheduler widget.

###### Example

```html
     <div class="calendar"></div>
    <div class="adaptive-scheduler-wrapper">
      <div id="scheduler"></div>
    </div>
    <div class="calendar"></div>
    <script id="template" type="text/kendo-x-template">
  <div data-bind="value:recurrenceRule" id="recurrenceEditor" name="recurrenceRule"></div>
    </script>
    <script>
      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/26"),
          startTime: new Date("2013/6/26 07:00 AM"),
					views: [
            { type: "day", selected: true },
            { type: "week", selectedDateFormat: "{0:ddd,MMM dd,yyyy} - {1:ddd,MMM dd,yyyy}" },
            "month",
            { type: "agenda", selectedDateFormat: "{0:ddd, M/dd/yyyy} - {1:ddd, M/dd/yyyy}" },
          ],
          mobile: "tablet",
          timezone: "Etc/UTC",
          dataSource: {
            batch: true,
            transport: {
              read: {
                url: "http://demos.telerik.com/kendo-ui/service/meetings",
                dataType: "jsonp"
              },
              update: {
                url: "http://demos.telerik.com/kendo-ui/service/meetings/update",
                dataType: "jsonp"
              },
              create: {
                url: "http://demos.telerik.com/kendo-ui/service/meetings/create",
                dataType: "jsonp"
              },
              destroy: {
                url: "http://demos.telerik.com/kendo-ui/service/meetings/destroy",
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
                id: "meetingID",
                fields: {
                  meetingID: { from: "MeetingID", type: "number" },
                  title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                  start: { type: "date", from: "Start" },
                  end: { type: "date", from: "End" },
                  startTimezone: { from: "StartTimezone" },
                  endTimezone: { from: "EndTimezone" },
                  description: { from: "Description" },
                  recurrenceId: { from: "RecurrenceID" },
                  recurrenceRule: { from: "RecurrenceRule" },
                  recurrenceException: { from: "RecurrenceException" },
                  roomId: { from: "RoomID", nullable: true },
                  atendees: { from: "Atendees", nullable: true },
                  isAllDay: { type: "boolean", from: "IsAllDay" }
                }
              }
            }
          },
          editable: {
            template: $("#template").html()
          },
          edit: function(e) {
            var event = e.event;
            var container = e.container;
            var pane = container.parent(".km-pane").data("kendoMobilePane");
            var recurrenceEditor = container.find("#recurrenceEditor");

            recurrenceEditor.kendoMobileRecurrenceEditor({
              start: new Date(e.event.start),
              timezone: this.options.timezone,
              messages: this.options.messages.recurrenceEditor,
              pane: pane,
              change: function() {
                event.set("recurrenceRule", this.value());
              }
            });
          },
          resources: [
            {
              field: "roomId",
              dataSource: [
                { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
              ],
              title: "Room"
            },
            {
              field: "atendees",
              dataSource: [
                { text: "Alex", value: 1, color: "#f8a398" },
                { text: "Bob", value: 2, color: "#51a0ed" },
                { text: "Charlie", value: 3, color: "#56ca85" }
              ],
              multiple: true,
              title: "Atendees"
            }
          ]
        });

        $("#scheduler").parentsUntil(".km-pane-wrapper").addClass("dynamic-height");

      });
    </script>
    <style>
      .dynamic-height
      {
        height: 100%;
      }

      @media only screen and (min-device-width:768px) and (max-device-height:1024px) and (orientation: landscape)
      {
        .adaptive-scheduler-wrapper
        {
          position: relative;
          height: 400px;
        }

      }
      @media only screen and (min-device-width:768px) and (max-device-height:1024px) and (orientation: portrait)
      {
        .adaptive-scheduler-wrapper
        {
          position: relative;
          height: 600px;
          width: 740px;
        }
      }
    </style>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Export to iCal]({% slug howto_exportto_ical_scheduler %})
* [How to Hide Header and Footer in Adaptive Rendering]({% slug howto_hideheaderandfooter_inadaptiverebdering_scheduler %})
* [How to Hide Time Headers]({% slug howto_hide_time_headers_scheduler %})
* [How to Modify Editor Template upon New Events]({% slug howto_modifyeditortemplate_wheneventisnew_scheduler %})
* [How to Modify Event Styling on databound]({% slug howto_modifyeventstyling_ondatabound_scheduler %})
* [How to Persist Resource Values on move]({% slug howto_persistresourcevalues_onamoveevent_scheduler %})
* [How to Prevent Moving AllDay Events outside the AllDay Header]({% slug howto_preventmovingalldayevents_fromalldayheader_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
