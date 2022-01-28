---
title: Persist Expanded Rows after Refresh
page_title: Persist Expanded Rows | Kendo UI Grid for jQuery
description: "An example on how to persist the expanded rows of the Kendo UI Grid for jQuery after refresh."
previous_url: /controls/data-management/grid/how-to/persist-expanded-rows, /controls/data-management/grid/how-to/state/persist-expanded-rows
slug: howto_persist_expanded_rows_afetrrefresh_grid
tags: persist, expanded, rows, grid, after, refresh
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I persist the expanded rows of the Kendo UI Grid for jQuery after refresh?

## Solution

The following example demonstrates how to persist the expanded rows in a Grid after a refresh.

```dojo
<div id="example">
    <div id="grid"></div>
    <button id="refresh">Refresh</button>

    <script>
        $(document).ready(function() {
          $("#refresh").click(function() {
                var grid = $("#grid").data("kendoGrid");
                var expanded = $.map(grid.tbody.children(":has(> .k-hierarchy-cell .k-i-collapse)"), function (row) {
                    return $(row).data("uid");
                });

                grid.one("dataBound", function () {
                    grid.expandRow(grid.tbody.children().filter(function (idx, row) {
                        return $.inArray($(row).data("uid"), expanded) >= 0;
                    }));
                });
                grid.refresh();

          });

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
                columns: [
                    {
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
                    filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "OrderID", width: "70px" },
                    { field: "ShipCountry", title:"Ship Country", width: "110px" },
                    { field: "ShipAddress", title:"Ship Address" },
                    { field: "ShipName", title: "Ship Name", width: "300px" }
                ]
            });
        }
    </script>
</div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
