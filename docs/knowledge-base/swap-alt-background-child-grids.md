---
title: Swap Alternate and Background Colors on Every Second Child Grid
description: An example on how to change the background and the alternate color for child grids in the Kendo UI Grid.
type: how-to
page_title: Change the Alt and Background Colors in Hierarchy Grids | Kendo UI Grid for jQuery
slug: swap-alt-background-child-grids
tags: kendo ui, mvc, grid, hierarchy, child grids, alt color
ticketid: 1114254
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

I have a multi-level, hierarchy Grid. The headers of the child grids are hidden. When I expand a row, all grids display the same color in a sequence. Can I swap the background color on every second child grid?

## Solution

1. In the `dataBound` event of the master Grid, get the background and the alternate color of the widget and save them in global variables.

1. In the `dataBound` event handler of every child grid, conditionally swap the background and the alternate colors.

```dojo
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
