---
title: Filter resource using combo box in kendo scheduler control
description: An example on how to flter resource using combo box in Kndo Sheduler control
type: how-to
page_title: Implement filtering of resoucres in Scheduler, using ComboBox | Kendo UI Scheduler
slug: scheduler-filter-resources-dropdown
position: 
tags: kendo, kendoui, combobox, scheduler, filter, resources, 
ticketid: 1138727
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress® Kendo UI®</td>
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

How can I filter the events by resources in kendo Scheduler, using ComboBox or DropDown.

## Solution

In order to achieve this scenario, you should make sure that the following steps the followed:
1. You would need to have a separate ComboBox/DropDown widget on the page.
1. his widget should be supplied with data, identical to the resources used for the Scheduler.
1. Subscribe to the Change event of the widget.
1. Filter the data source of the Scheduler, using the selection of the ComboBox/DropDown

The following implementation of the change even of the ComboBox/DropDown demonstrates the above suggestion:

```html
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

Here is a runnable example on the matter:

http://dojo.telerik.com/@nenchef/ipuzUN/2
