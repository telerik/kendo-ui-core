---
title: Update End Time of Events on Click
page_title: Update End Time of Events on Click | Kendo UI Scheduler
description: "Learn how to update the end time of an event on click in a Kendo UI Scheduler widget."
slug: howto_update_event_end_time_on_click_scheduler
---

# Update End Time of Events on Click

The example below demonstrates how to update the end time of an event on click in a Kendo UI Scheduler widget.

###### Example

```html
<style>html { font-size: 12px; font-family: Arial, Helvetica, sans-serif; }</style>
<div id="example">
    <div id="scheduler"></div>
    <script>
        $(function () {
            $("#scheduler").kendoScheduler({
                date: new Date("2013/6/13"),
                startTime: new Date("2013/6/13 07:00 AM"),
                height: 600,
                selectable: true,
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
                        parameterMap: function (options, operation) {
                            if (operation !== "read" && options.models) {
                                return { models: kendo.stringify(options.models) };
                            }
                        }
                    },
                    schema: {
                        model: {
                            id: "meetingID",
                            fields: {
                                meetingID: { from: "MeetingID", type: "number" },
                                title: { from: "Title", defaultValue: "No title", validation: { required: true} },
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

            scheduler.wrapper.on("click", ".k-event", function(e) {
							var uid = $(this).data("uid");
              //http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#methods-occurrenceByUid
              var event = scheduler.occurrenceByUid(uid);
              var end = new Date(event.end);

              end.setHours(end.getHours() + 2); //update end

              event.set("end", end); //end needs to be Date!
            });
        });
    </script>
</div>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically]({% slug howto_calculate_scheduler_height_dunamically_scheduler %})
* [How to Create Custom Restrictions]({% slug howto_create_custom_restrivtions_scheduler %})
* [How to Customize Edit and Events Templates]({% slug howto_customize_editand_event_templates_scheduler %})
* [How to Create External Editor Form]({% slug howto_create_external_editor_form_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
