---
title: Dynamically Filter Resource Groups by Using MultiSelect in Scheduler
description: An example on how to filter the groups of the resources in the Kendo UI Scheduler.
type: how-to
page_title: Implement Resource Group Filtering by Using MultiSelect | Kendo UI Scheduler
slug: scheduler-filter-groups-resources-multiselect
tags: kendo, kendoui, scheduler, resources, groping, show, hide, filter, multiselect
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

How can I show only the selected resource groups in the Scheduler and use the Kendo UI MultiSelect to perform this operation?

## Solution

1. Bind the MultiSelect to the data source with the resources which the Scheduler uses.
1. Subscribe to the `change` event of the MultiSelect.
1. Store the dataItems, which represent the selected resources, in an array.
1. Update the resources of the Scheduler, based on the selection on the MultiSelect, by passing the array to the `data` method of the DataSource object in the Scheduler.
1. Refresh the layout by resetting the selected view of the Scheduler.

```dojo
<body>
    <input type="text" id="comboBox" name="comboBox" />
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
                    "month",
                    "week",
                    "workWeek",
                    {
                        type: "agenda",
                        selected: true
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
                    name: "Owners",
                    dataSource: []
                }]
            });

            $("#comboBox").kendoMultiSelect({
                dataTextField: "text",
                dataValueField: "value",
                change: function(e) {
                    var scheduler = $("#scheduler").data("kendoScheduler");
                    var dataItems = this.dataItems();

                    var checked = new Array()

                    if (dataItems.length == 0) {
                        delete scheduler.options.group;
                    } else {
                        scheduler.options.group = {
                            resources: ["Owners"],
                            orientation: "horizontal"
                        };
                    }

                    dataItems.forEach(function(item, index) {
                        var itemToAdd = {
                            text: item.text,
                            value: item.value,
                            color: item.color
                        };
                        checked.push(itemToAdd)
                    })


                    scheduler.resources[0].dataSource.data(checked);
                    scheduler.view(scheduler.view().name);
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
</body>
```
