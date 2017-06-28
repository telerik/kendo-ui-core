---
title: Set Different Color to Every Child Grid Header
description: How to change the color of every child Grid header in a hierarchical Kendo UI Grid.
type: how-to
page_title: Set Different Color to Every Child Grid Header
slug: change_header_color_child_grids
position: 0
tags: kendo ui, mvc, grid, hierarchy, child grids, header colors
teampulseid:
ticketid: 1101311
pitsid:
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
   <td>Progress® Kendo UI® version</td>
   <td>Tested up to version 2017.2 504</td>
  </tr>
</table>

## Description

Your project might require you to set different header colors to the child grids of a hierarchical Kendo UI Grid.

## Possible Solution

Conditionally change the background color of the cells in the header in the `dataBound` event handler of every child grid.

```html
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
