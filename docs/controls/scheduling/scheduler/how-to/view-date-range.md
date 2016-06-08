---
title: Retrieve Current View Date Range
page_title: Retrieve Current View Date Range | Kendo UI Scheduler
description: "Learn how to retrieve the date range of the current Kendo UI Scheduler view."
slug: howto_retrievecurrent_viewdaterange_scheduler
---

# Retrieve Current View Date Range

The example below demonstrates how to retrieve the date range of the current Kendo UI Scheduler view.

###### Example

```html
<div id="example">
    <div id="scheduler"></div>
    <div class="box wide">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>
</div>
<script>
$(function() {
    function scheduler_view_range(e) {
        var view = this.view();

        //view has:
        //startDate method, which returns the start date of the view
        //endDate method, which returns the end date of the view

        kendoConsole.log(kendo.format("view:: start: {0:d}; end: {1:d};", view.startDate(), view.endDate()));
    }

    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 7:00"),
        height: 400,
        timezone: "Etc/UTC",
        views: [
            "day",
            { type: "week", selected: true },
            "month",
            "agenda",
            "timeline"
        ],
        navigate: scheduler_view_range,
        dataBound: scheduler_view_range,
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
                    id: "taskID",
                    fields: {
                        taskID: { from: "TaskID", type: "number" },
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

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Create Recurrence Editor Using Mobile Editor]({% slug howto_createrecurrenceeditor_byusingmobileeditor_scheduler %})
* [How to Export to iCal]({% slug howto_exportto_ical_scheduler %})
* [How to Hide Header and Footer in Adaptive Rendering]({% slug howto_hideheaderandfooter_inadaptiverebdering_scheduler %})
* [How to Implement Custom timeline View with Dynamic Length]({% slug howto_implementcustomtimeline_withdynamiclength_scheduler %})
* [How to Modify Editor Template upon New Events]({% slug howto_modifyeditortemplate_wheneventisnew_scheduler %})
* [How to Modify Event Styling on databound]({% slug howto_modifyeventstyling_ondatabound_scheduler %})
* [How to Show Tooltip with Additional Information over Scheduler Events]({% slug howto_showtooltipwith_additionalinformation_overevents_scheduler %})
* [How to Update Opposite Picker Value on model Change]({% slug howto_updateoppositepickervalue_onmodelchange_scheduler %})
* [How to Use Different Date Formats]({% slug howto_usedifferentdateformats_scheduler %})
* [How to Use Local observable Data Object]({% slug howto_uselocalobservable_dataobject_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
