---
title: Update Opposite Picker Value on Model Change
page_title: Update Opposite Picker Value on Model Change | Kendo UI Scheduler
description: "Learn how to update the opposite start or end picker value on model change in the Kendo UI Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/update-opposite-picker-value
slug: howto_updateoppositepickervalue_onmodelchange_scheduler
---

# Update Opposite Picker Value on Model Change

The following example demonstrates how to update the opposite start/end picker value on model change in a Kendo UI Scheduler widget.

```dojo
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
			// Update the model by using the last values of the widget.
			if (e.field === "start" || e.field === "end") {
				startInputs.add(endInputs).each(function() {
					var element = $(this);
					var widgetType = element.is("[data-role=datepicker]") ? "kendoDatePicker" : "kendoDateTimePicker";

					element.data(widgetType).trigger("change");
			});
			}
		 */

        // Move the end date on start update.
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
                        url: "https://demos.telerik.com/kendo-ui/service/tasks",
                        dataType: "jsonp"
                    },
                    update: {
                        url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                        dataType: "jsonp"
                    },
                    create: {
                        url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
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

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
