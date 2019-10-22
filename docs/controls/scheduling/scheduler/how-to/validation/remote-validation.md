---
title: Use Remote Validation
page_title: Use Remote Validation | Kendo UI Scheduler
description: "Learn how to use a remote validation in a Kendo UI Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/remote-validation
slug: howto_useremotevalidation_scheduler
---

# Use Remote Validation

The following example demonstrates how to use remote validation during event editing in a Kendo UI Scheduler.

```dojo
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
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month",
            "agenda"
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
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            schema: {
                model: {
                    id: "taskId",
                    fields: {
                        taskId: { from: "TaskID", type: "number" },
                        title: {
                          from: "Title",
                          defaultValue: "No title",
                          validation: {
                            required: true,
                            custom: function(input) {
                              if (input.prop("name") === "title") {
                                if (!remoteValidator.initiated) {
                                  remoteValidator.check(input, this);

                                  input.attr("data-custom-msg", "checking...");

                                  return false;
                                }

                                input.attr("data-custom-msg", "Not valid!");

                                return remoteValidator.valid;
                              }

                              return true;
                            }
                          }
                        },
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

    var remoteValidator = {
      valid: false,
      initiated: false,
      check: function(element, validator) {
        remoteValidator.initiated = true;

        // Simulate Ajax.

        setTimeout(function() {
            // TODO: set to true if valid
            // remoteValidator.valid = true;

            validator.validateInput(element);

            remoteValidator.initiated = false;
        }, 1000);
      }
    };
});
</script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
