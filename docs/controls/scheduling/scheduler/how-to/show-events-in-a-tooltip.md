---
title: Show Events in Kendo UI Tooltips
page_title: Show Events in Kendo UI Tooltips | Kendo UI Scheduler
description: "Learn how to show the  events of a Kendo UI Scheduler widget in a Kendo UI Tooltip."
slug: howto_show_events_in_a_kendo_ui_tooltip_scheduler
---

# Show Events in Kendo UI Tooltips

The example below demonstrates how to show the events of a Kendo UI Scheduler widget in a Kendo UI Tooltip.

###### Example

```html
<div id="example">
	<div id="scheduler"></div>
</div>
<script>
$(function() {
$("#scheduler").kendoScheduler({
    date: new Date("2013/6/13"),
    startTime: new Date("2013/6/13 07:00 AM"),
    height: 600,
    views: [
        { type: "month", selected: true }
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
});

$("#scheduler").kendoTooltip({
filter: "td[role='gridcell']",
width: 300,
content: function(e){
  var scheduler = $("#scheduler").getKendoScheduler();
  var slot = scheduler.slotByElement(e.target);
  var events = scheduler.occurrencesInRange(slot.startDate, slot.endDate);
  var content = "";
  for(var i=0; i<events.length; i++){
    content = content + "<div>" + events[i].title + "</div>";
  }
  return content == "" ? "No events" : content;
}
});

});
</script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically]({% slug howto_calculate_scheduler_height_dunamically_scheduler %})
* [How to Create Custom month View with Event Count in Show More Button]({% slug howto_create_custom_monthview_eventcount_showmore_button_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Get next Occurrence]({% slug howto_getthe_next_occurance_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Implement Custom Editing in agenda View]({% slug howto_implement_custom_editing_inagenda_view_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
