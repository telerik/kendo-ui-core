---
title: Filter Resources by Using a Kendo UI ComboBox in Scheduler
description: An example on how to filter the resource of the Kendo UI Scheduler widget by using the Kendo UI ComboBox.
type: how-to
page_title: Implement Resource Filtering by Using ComboBox | Kendo UI Scheduler
slug: scheduler-filter-resources-dropdown
tags: kendo, kendoui, combobox, scheduler, filter, resources,
ticketid: 1138727
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 8.1</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>61.0.3163.100</td>
 </tr>
</table>


## Description

How can I filter the events by resources in the Scheduler with a Kendo UI ComboBox or DropDownList?

## Solution

1. Make sure that you have a separate ComboBox or DropDownList widget on the page.
1. Supply the widget with data which is identical to the resources that are used for the Scheduler.
1. Subscribe to the `change` event of the widget.
1. Filter the data source of the Scheduler by using the selection of the ComboBox or DropDownList.

For the full implementation of the approach, refer to [this Dojo example](http://dojo.telerik.com/@nenchef/ipuzUN/2).

```dojo
<div id="example">
    <input type="text" id="comboBox" name="comboBox" />
    <br />
    <div id="scheduler"></div>
</div>
<script>
    $(function() {
        var scheduler = $("#scheduler").kendoScheduler({
            date: new Date("2013/6/13"),
            startTime: new Date("2013/6/13 07:00 AM"),
            height: 600,
            views: [
                "day",
                {
                    type: "workWeek",
                    selected: true
                },
                "week",
                "month",
                "agenda",
                {
                    type: "timeline",
                    eventHeight: 50
                }
            ],
            timezone: "Etc/UTC",
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
                },
                filter: {
                    logic: "or",
                    filters: [{
                            field: "ownerId",
                            operator: "eq",
                            value: 1
                        },
                        {
                            field: "ownerId",
                            operator: "eq",
                            value: 2
                        },
                        {
                            field: "ownerId",
                            operator: "eq",
                            value: 3
                        },
                    ]
                }
            },
            resources: [{
                field: "ownerId",
                title: "Owner",
                dataSource: [{
                        text: "Alex",
                        value: 1,
                        color: "#f8a398"
                    },
                    {
                        text: "Bob",
                        value: 2,
                        color: "#51a0ed"
                    },
                    {
                        text: "Charlie",
                        value: 3,
                        color: "#56ca85"
                    }
                ]
            }]
        }).data("kendoScheduler");

        $("#comboBox").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            change: function(e) {
                var value = this.value();
                if (value) {
                    scheduler.dataSource.filter({
                        operator: function(task) {
                            var result = false;
                            if (task.ownerId == value) {
                                result = true;
                            }
                            return result;
                        }
                    });
                } else
                    scheduler.dataSource.filter([])
            },
            dataSource: {
                data: [{
                        text: "Alex",
                        value: 1,
                        color: "#f8a398"
                    },
                    {
                        text: "Bob",
                        value: 2,
                        color: "#51a0ed"
                    },
                    {
                        text: "Charlie",
                        value: 3,
                        color: "#56ca85"
                    }
                ]
            }
        });

    });
</script>
```
