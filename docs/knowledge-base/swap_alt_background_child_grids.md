---
title: Alternate the Background Color of Child Grid Headers
description: How to change the background and alternate color on every second child Grid in Kendo UI.
type: how-to
page_title: Alternate the Background Color of Child Grid Headers
slug: swap_alt_bacground_child_grids
position: 0
tags: kendo ui, mvc, grid, hierarchy, child grids, alt color
teampulseid:
ticketid: 1114254
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

By default, the headers of the child grids in a multi-level, hierarchy Kendo UI Grid are hidden. When you expand a row, all child grids display the same color in a sequence.

## Possible Solution

To swap the background color of every second child Grid header:

1. In the `dataBound` event of the master Kendo UI Grid, get the background and the alternate color of the widget and save them in global variables.

1. In the dataBound event handler of every child grid, conditionally swap the background and the alternate colors.

```html
<div id="grid"></div>

<script>
    var bgColor = "";
    var altColor = "";

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
            dataBound: mainGridDataBound,
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

    function mainGridDataBound(e) {
        bgColor = $("#grid").css("background-color");
        altColor = $(".k-alt").css("background-color");

        this.expandRow(this.tbody.find("tr.k-master-row").first());
    };

    function childGridDataBound(e) {
        var gridID = e.sender.element[0].id;
        var id = gridID.slice(-1);

        if (id % 2 === 0) {
            $("#" + gridID).find(".k-alt").css("background-color", bgColor);
            $("#" + gridID).css("background-color", altColor);
        };
    };
</script>
```
