---
title: Persist Resource Values on move
page_title: Persist Resource Values on move | Kendo UI Scheduler
description: "Learn how to persist resource values on a move event in a Kendo UI Scheduler widget."
slug: howto_persistresourcevalues_onamoveevent_scheduler
---

# Persist Resource Values on move

The example below demonstrates how to persist the event resouces on `move` in a Kendo UI Scheduler.

###### Example

```html
<div id="example">
    <div id="scheduler"></div>
</div>
<script>
$(function() {
    $("#scheduler").kendoScheduler({
        date: new Date("2015/1/1"),
        startTime: new Date("2015/1/1 07:00 AM"),
        height: 600,
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
                read: function (options) {
                  options.success([{
                    "MeetingID": 101,
                    "Attendees": [1, 2, 3],
                    "Job": "Building Project 101",
                    "Title": "Site Visit for Building Project 101",
                    "Description": "Team leaders to meet with contractors and subcontractors to discuss laying of foundation.",
                    "Start":  "/Date(1420106400000)/",
                    "End": "/Date(1420110000000)/",
                    "StartTimezone": "Pacific/Auckland",
                    "EndTimezone": "Pacific/Auckland",
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                  }]);
                },
                update: function(options) {
                  var models = options.data.models;

                  console.log(models);

                  options.success(models);
                }
            },
            schema: {
                model: {
                    id: "meetingId",
                    fields: {
                        meetingId: { from: "MeetingID", type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        startTimezone: { from: "StartTimezone" },
                        endTimezone: { from: "EndTimezone" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        isAllDay: { type: "boolean", from: "IsAllDay" },
                        attendees: { from: "Attendees" }
                    }
                }
            }
        },
        group: {
            resources: ["Attendees"],
            orientation: "vertical"
        },
        resources: [
            {
                field: "attendees",
                title: "Attendees",
                name: "Attendees",
                dataSource: [
                    { text: "John", value: 1, color: "#f8a398" },
                    { text: "Jane", value: 2, color: "#51a0ed" },
                    { text: "Bob", value: 3, color: "#56ca85" }
                ],
                multiple: true
            }
        ],
        moveEnd: function(e) {
          var oldAttendees = e.event.attendees;
          var attendees = e.resources.attendees;

          attendees.splice(0, attendees.length); //empty resources;

          for (var idx = 0; idx < oldAttendees.length; idx++) {
            attendees.push(oldAttendees[idx]);
          }
        }
    });
});
</script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Create Recurrence Editor Using Mobile Editor]({% slug howto_createrecurrenceeditor_byusingmobileeditor_scheduler %})
* [How to Export to iCal]({% slug howto_exportto_ical_scheduler %})
* [How to Hide Header and Footer in Adaptive Rendering]({% slug howto_hideheaderandfooter_inadaptiverebdering_scheduler %})
* [How to Hide Time Headers]({% slug howto_hide_time_headers_scheduler %})
* [How to Modify Editor Template upon New Events]({% slug howto_modifyeditortemplate_wheneventisnew_scheduler %})
* [How to Modify Event Styling on databound]({% slug howto_modifyeventstyling_ondatabound_scheduler %})
* [How to Prevent Moving AllDay Events outside the AllDay Header]({% slug howto_preventmovingalldayevents_fromalldayheader_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})
* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
