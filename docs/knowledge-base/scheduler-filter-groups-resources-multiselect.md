---
title: Dynamically Filter Resources Groups using MultiSelect in Kendo Scheduler
description: An example on how to filter the groups of resources in Kendo Scheduler
type: how-to
page_title: Implement resources groups filtering in Scheduler using MultiSelect | Kendo UI Scheduler
slug: scheduler-filter-groups-resources-multiselect
position: 0
tags: kendo, kendoui, scheduler, resources, groping, show, hide, filter, multiselect
ticketid: 1138727
pitsid:
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

I want to show only selected resources groups in scheduler control. I want to use kendo MultiSelect to perform this operation.

## Solution

In order to achieve the desired functionality, you would need to have your MultiSelect bound to the resources data source, which the Scheduler uses.
Then follow the next steps for implementation:

1. Subscribe to the change event of the MultiSelect
1. Store the dataItems, which represent the selected resources, in an array
1. Update the resources of the Scheduler, base on the selection on the MultiSelect, by passing the array to the data method of the Scheduler DataSource object
1. Reset the selected view of the Scheduler, in order to refresh the layout

```html

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
