(function ($, undefined) {
    var kendo = window.kendo,
        extend = $.extend;

    extend(true, kendo.data, {
        transports: {
            "scheduler-aspnetmvc": kendo.data.transports["aspnetmvc-ajax"]
        }
    });


    extend(true, kendo.data, {
        readers: {
            "scheduler-aspnetmvc": kendo.data.readers["json"]
        }
    });

    extend(true, kendo.data, {
        schemas: {
            "scheduler-aspnetmvc": {
                model: {
                    fields: {
                        title: {
                            defaultValue: "No title",
                            field: "Title",
                            validation: {
                                required: true
                            }
                        },
                        start: {
                            type: "date",
                            field: "Start"
                        },
                        end: {
                            type: "date",
                            field: "End"
                        },
                        description: {
                            field: "Description"
                        },
                        isAllDay: {
                            type: "boolean",
                            field: "IsAllDay"
                        },
						recurrenceId: {
							field: "RecurrenceId"
						},
						recurrenceRule: {
							field: "RecurrenceRule"
						},
						recurrenceException: {
							field: "RecurrenceException"
						}
                    }
                }
            }
        }
    });
})(window.kendo.jQuery);