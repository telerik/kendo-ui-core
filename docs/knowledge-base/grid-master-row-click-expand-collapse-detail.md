---
title: Expand and Collapse Details on Master Row Click in Grid
description: An example on how to expand and collapse the detail rows by clicking the master rows in the Kendo UI Grid.
type: how-to
page_title: Click the Master and Expand and Collapse the Detail Row | Kendo UI Grid for jQuery
slug: grid-master-row-click-expand-collapse-detail
tags: grid, hierarchy, click, expand, collapse
ticketid: 1141805
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I expand and collapse the details by clicking the relevant master row in the Kendo UI Grid?

## Solution

1. Attach a [`click`](https://api.jquery.com/click/) handler to the master rows.
1. In the `click` event handler and based on the `k-i-expand` icon, use the [`expandRow`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/expandrow) or the [`collapseRow`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/collapserow) methods of the Grid.

```dojo
<div id="example">
    <div id="grid"></div>

    <script>
        $(document).ready(function() {
            var element = $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                    },
                    pageSize: 6,
                    serverPaging: true,
                    serverSorting: true
                },
                height: 600,
                sortable: true,
                pageable: true,
                detailInit: detailInit,
                dataBound: function(e) {
                    var grid = e.sender;

                    grid.tbody.find("tr.k-master-row").click(function(e) {
                        var target = $(e.target);
                        if ((target.hasClass("k-i-expand")) || (target.hasClass("k-i-collapse"))) {
                            return;
                        }

                        var row = target.closest("tr.k-master-row");
                        var icon = row.find(".k-i-expand");

                        if (icon.length) {
                            grid.expandRow(row);
                        } else {
                            grid.collapseRow(row);
                        }
                    })

                },
                columns: [{
                        field: "FirstName",
                        title: "First Name",
                        width: "110px"
                    },
                    {
                        field: "LastName",
                        title: "Last Name",
                        width: "110px"
                    },
                    {
                        field: "Country",
                        width: "110px"
                    },
                    {
                        field: "City",
                        width: "110px"
                    },
                    {
                        field: "Title"
                    }
                ]
            });
        });

        function detailInit(e) {
            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 10,
                    filter: {
                        field: "EmployeeID",
                        operator: "eq",
                        value: e.data.EmployeeID
                    }
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [{
                        field: "OrderID",
                        width: "110px"
                    },
                    {
                        field: "ShipCountry",
                        title: "Ship Country",
                        width: "110px"
                    },
                    {
                        field: "ShipAddress",
                        title: "Ship Address"
                    },
                    {
                        field: "ShipName",
                        title: "Ship Name",
                        width: "300px"
                    }
                ]
            });
        }
    </script>
</div>
```

## See Also

* [Expand and Collapse Group on Group Row Click in Grid]({% slug grid-group-row-click-expand-collapse %})