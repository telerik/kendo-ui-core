---
title: Allow Only One Grouped Column in Grid
description: An example on how to restrict the user from grouping more than one column in the Kendo UI Grid.
type: how-to
page_title: Group Only One Column at a Time | Kendo UI Grid
slug: grid-group-one-column-only
tags: grid, grouping, singe column
ticketid: 1135530
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1018 version</td>
 </tr>
</table>

## Description

How can I group only one column at a time in the Kendo UI Grid? How can I restrict the user from grouping more than one column in the Kendo UI Grid?

## Solution

1. Handle the [`dataBinding`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databinding) event of the Grid.
1. In the event handler and based on the number of groups, leave only the last one.

```dojo
<div id="example">
    <div id="grid"></div>

    <script>
        $(document).ready(function() {
            $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: {
                                    type: "number"
                                },
                                Freight: {
                                    type: "number"
                                },
                                ShipName: {
                                    type: "string"
                                },
                                OrderDate: {
                                    type: "date"
                                },
                                ShipCity: {
                                    type: "string"
                                }
                            }
                        }
                    },
                    pageSize: 20,
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true
                },
                height: 430,
                filterable: true,
                sortable: true,
                dataBinding: onDataBinding,
                groupable: true,
                pageable: true,
                columns: [{
                    field: "OrderID",
                    filterable: false
                }, {
                    field: "OrderDate",
                    title: "Order Date",
                    width: 120,
                    format: "{0:MM/dd/yyyy}"
                }, {
                    field: "ShipName",
                    title: "Ship Name",
                    width: 260
                }, {
                    field: "ShipCity",
                    title: "Ship City",
                    width: 150
                }]
            });
        });

        var previousGrouping = {};

        function onDataBinding(e) {
            var dataSource = this.dataSource;
            var groups = dataSource.group();

            if (groups.length > 1) {
                e.preventDefault();
                for (var i = 0; i < groups.length; i++) {
                    if (previousGrouping.length > 0 && (groups[i].field == previousGrouping[0].field)) {
                        groups.splice(i, 1);
                    };
                };
                setTimeout(function() {
                    dataSource.read();
                });
            };

            previousGrouping = groups;
        };
    </script>

</div>
```
