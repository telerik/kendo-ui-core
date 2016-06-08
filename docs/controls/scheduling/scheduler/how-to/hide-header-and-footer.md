---
title: Hide Header and Footer in Adaptive Rendering
page_title: Hide Header and Footer in Adaptive Rendering | Kendo UI Scheduler
description: "Learn how to hide the header and the footer of a Kendo UI Scheduler widget when it is in the adaptive rendering mode."
slug: howto_hideheaderandfooter_inadaptiverebdering_scheduler
---

# Hide Header and Footer in Adaptive Rendering

The example below demonstrates how to hide header and footer when the Kendo UI Scheduler is used in the adaptive rendering mode.

###### Example

```html
    <div data-role="view" data-init="initScheduler">
      <header data-role="header"></header>
      <div id="scheduler"></div>
    </div>
    <script>
      function initScheduler() {
        $("#scheduler").kendoScheduler({
          footer: false,
          date: new Date("2013/6/26"),
          startTime: new Date("2013/6/26 07:00 AM"),
          height: kendo.support.mobileOS.wp ? "28em" : 600,
          views: [
            "day"
          ],
          mobile: "phone",
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
        var scheduler = $("#scheduler").data("kendoScheduler");
        scheduler.wrapper.children("div").hide();
        var scroller = scheduler.wrapper.find(".k-scheduler-content").data("kendoMobileScroller");
      }
    </script>
    <script>
      var app = new kendo.mobile.Application(document.body);
    </script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Create Recurrence Editor Using Mobile Editor]({% slug howto_createrecurrenceeditor_byusingmobileeditor_scheduler %})
* [How to Export to iCal]({% slug howto_exportto_ical_scheduler %})
* [How to Hide Time Headers]({% slug howto_hide_time_headers_scheduler %})
* [How to Modify Editor Template upon New Events]({% slug howto_modifyeditortemplate_wheneventisnew_scheduler %})
* [How to Modify Event Styling on databound]({% slug howto_modifyeventstyling_ondatabound_scheduler %})
* [How to Persist Resource Values on move]({% slug howto_persistresourcevalues_onamoveevent_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
