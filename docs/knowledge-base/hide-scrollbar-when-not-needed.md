---
title: Hide the Vertical Scrollbar
page_title:  Hide the Vertical Scrollbar | Kendo UI Grid for jQuery
description: "An example on how to hide the vertical scrollbar when you do not need it in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Layout/hide-scrollbar-when-not-needed
slug: howto_hide_vertical_scrollbar_grid
tags: grid, hide, vertical, scrollbar, when, not, needed
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

How can I hide the vertical scrollbar when you do not need it in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to conditionally hide the vertical scrollbar of the Kendo UI Grid, when the total height of all table rows is less than the Grid height.

```dojo
<style>
.no-scrollbar .k-grid-header
{
padding: 0 !important;
}

.no-scrollbar .k-grid-content
{
overflow-y: visible;
}
</style>

<p>Use the Grid pager to go to the last page and see the scrollbar being hidden programmatically.</p>
<div id="grid"></div>

<script>

$(function () {
    function toggleScrollbar(e) {
        var gridWrapper = e.sender.wrapper;
        var gridDataTable = e.sender.table;
        var gridDataArea = gridDataTable.closest(".k-grid-content");

        gridWrapper.toggleClass("no-scrollbar", gridDataTable[0].offsetHeight < gridDataArea[0].offsetHeight);
    }

    $("#grid").kendoGrid({
        dataSource: {
            type: "odata",
            transport: {
                read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            schema: {
                model: {
                    fields: {
                        OrderID: { type: "number" },
                        Freight: { type: "number" },
                        ShipName: { type: "string" },
                        OrderDate: { type: "date" },
                        ShipCity: { type: "string" }
                    }
                }
            },
            pageSize: 20,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        },
        height: 700,
        dataBound: toggleScrollbar,
        filterable: true,
        sortable: true,
        pageable: true,
        columns: [{
            field: "OrderID",
            filterable: false
        },
                    "Freight",
                    {
                        field: "OrderDate",
                        title: "Order Date",
                        format: "{0:MM/dd/yyyy}"
                    }, {
                        field: "ShipName",
                        title: "Ship Name"
                    }, {
                        field: "ShipCity",
                        title: "Ship City"
                    }
        ]
    });
});

</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
