---
title: Expand One Grid Row Only at a Time
description: An example on how to have only a single row expanded at a time in the Kendo UI Grid.
type: how-to
page_title: Collapse Other Rows on Row Expand | Kendo UI Grid for jQuery
slug: grid-collapse-rows-on-expand
tags: grid, hierarchy, collapse, expand
ticketid: 1141804
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

How can I force the other rows to collapse when I expand a row in the Kendo UI Grid?

## Solution

1. Handle the [`detailExpand`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailexpand) event of the Grid.
1. In the event handler, use the [`collapseRow`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/collapserow) method for every master row.

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
                detailExpand: function(e) {
                    var grid = e.sender;
                    var rows = grid.element.find(".k-master-row").not(e.masterRow);

                    rows.each(function(e) {
                        grid.collapseRow(this);
                    });
                },
                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
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
