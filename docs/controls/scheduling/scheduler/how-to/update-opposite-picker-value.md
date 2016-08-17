---
title: Update Opposite Picker Value on model Change
page_title: Update Opposite Picker Value on model Change | Kendo UI Scheduler
description: "Learn how to update the opposite start/end picker value on model change in a Kendo UI Scheduler widget."
slug: howto_updateoppositepickervalue_onmodelchange_scheduler
---

# Update Opposite Picker Value on model Change

The example below demonstrates how to update the opposite start/end picker value on model change in a Kendo UI Scheduler widget.

###### Example

```html
<div id="scheduler"></div>
<script>
    var proxy;

    var changeHandler = function(e) {
        var editContainer = $(".k-scheduler-edit-form");
        var uid = editContainer.attr("data-uid");

        var event = this.occurrenceByUid(uid);

        var startInputs = editContainer.find("[data-container-for=start]").find("input");
        var endInputs = editContainer.find("[data-container-for=end]").find("input");

        /*
			//Update model using last widgets values
			if (e.field === "start" || e.field === "end") {
				startInputs.add(endInputs).each(function() {
					var element = $(this);
					var widgetType = element.is("[data-role=datepicker]") ? "kendoDatePicker" : "kendoDateTimePicker";

					element.data(widgetType).trigger("change");
			});
			}
		 */

        //Move end date on start update
        if (e.field === "start") {
            var date = new Date(event.start);
            date.setMinutes(date.getMinutes() + 30);

            endInputs.each(function() {
                var element = $(this);
                var widgetType = element.is("[data-role=datepicker]") ? "kendoDatePicker" : "kendoDateTimePicker";

                element.data(widgetType).value(date);
                element.data(widgetType).trigger("change");
            });
        };
    }

    $(function() {
        $("#scheduler").kendoScheduler({
            edit: function(e) {
                proxy = $.proxy(changeHandler, this);
                e.event.bind("change", proxy);
            },
            cancel: function(e) {
                e.event.unbind("change", proxy);
            },
            save: function(e) {
                e.event.unbind("change", proxy);
            },
            date: new Date("2013/6/13"),
            startTime: new Date("2013/6/13 07:00 AM"),
            height: 600,
            views: [
                "day", {
                    type: "workWeek",
                    selected: true
                },
                "week",
                "month",
                "agenda", {
                    type: "timeline",
                    eventHeight: 50
                }
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
                            return {
                                models: kendo.stringify(options.models)
                            };
                        }
                    }
                },
                schema: {
                    model: {
                        id: "taskId",
                        fields: {
                            taskId: {
                                from: "TaskID",
                                type: "number"
                            },
                            title: {
                                from: "Title",
                                defaultValue: "No title",
                                validation: {
                                    required: true
                                }
                            },
                            start: {
                                type: "date",
                                from: "Start"
                            },
                            end: {
                                type: "date",
                                from: "End"
                            },
                            startTimezone: {
                                from: "StartTimezone"
                            },
                            endTimezone: {
                                from: "EndTimezone"
                            },
                            description: {
                                from: "Description"
                            },
                            recurrenceId: {
                                from: "RecurrenceID"
                            },
                            recurrenceRule: {
                                from: "RecurrenceRule"
                            },
                            recurrenceException: {
                                from: "RecurrenceException"
                            },
                            ownerId: {
                                from: "OwnerID",
                                defaultValue: 1
                            },
                            isAllDay: {
                                type: "boolean",
                                from: "IsAllDay"
                            }
                        }
                    }
                }
            },
            resources: [{
                field: "ownerId",
                title: "Owner",
                dataSource: [{
                    text: "Alex",
                    value: 1,
                    color: "#f8a398"
                }, {
                    text: "Bob",
                    value: 2,
                    color: "#51a0ed"
                }, {
                    text: "Charlie",
                    value: 3,
                    color: "#56ca85"
                }]
            }]
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
* [How to Show Only All-Day Events]({% slug howto_showonlyalldayevents_scheduler %})
* [How to Set Slot Background Color Using Slot Templates]({% slug howto_setslotbackgroundcolor_usingslottemplates_scheduler %})
* [How to Show Tooltip with Additional Information over Scheduler Events]({% slug howto_showtooltipwith_additionalinformation_overevents_scheduler %})
* [How to Use Different Date Formats]({% slug howto_usedifferentdateformats_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})
* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
