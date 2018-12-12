---
title: Set Different Colors to Every Child Grid Header
description: An example on how to change the color of every child Grid header in a hierarchical Kendo UI Grid.
type: how-to
page_title: Change Header Colors of Child Grids | Kendo UI Grid
slug: change-header-color-child-grids
tags: kendo ui, mvc, grid, hierarchy, child grids, header colors
ticketid: 1101311
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
   <td>Tested up to version 2017.2 504</td>
  </tr>
</table>

## Description

How can I distinguish between the child grids of a master Kendo UI Grid by setting different colors to the headers of each child grid?

## Solution

Conditionally change the background color of the header cells in the `dataBound` event handler of every child grid.

```dojo
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
        $("<div id='grid_" + e.data.EmployeeID + "'/>").appendTo(e.detailCell).kendoGrid({
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
            dataBound: childGridDataBound,
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
    };

    function childGridDataBound(e) {
        var colors = ["red", "yellow", "blue"];
        var ID = e.sender.element[0].id;
        var row = $("#" + ID).find(".k-grid-header tr");
        var cells = row.children();

        cells.css("background-color", colors[ID.slice(-1) % 3]);
    };
</script>
```
