---
title: Deselect Grid Rows on Click
description: An example on how to deselect rows on a click in a Kendo UI Grid.
type: how-to
page_title: Deselect Rows on Click | Kendo UI Grid
slug: grid-deselect-row-click
tags: grid, selection, remove, deselect, unselect, select, row, click
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
  <td>Created with version 2017.3.913</td>
 </tr>
</table>

## Description

How can I remove the selection functionality from a selectable Grid row when the user clicks on it a second time?

## Solution

When you enable selection, the built-in option for deselecting a row is by using the `Ctrl` + click shortcut.

The following example demonstrates how to deselect a row by clicking only, that is, without holding the `Ctrl` key.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/orders.js"></script>


<div id="grid"></div>

<script>
    $(document).ready(function () {
    $("#grid").kendoGrid({
        dataSource: {
        data: orders,
        pageSize: 6,
        schema: {
            model: {
            id: "OrderID"
            }
        }
        },
        selectable: "multiple",
        pageable: {
        buttonCount: 5
        },
        scrollable: false,
        persistSelection: true,
        navigatable: true,
        columns: [
        {
            field: "ShipCountry",
            title: "Ship Country",
            width: 300
        },
        {
            field: "Freight",
            width: 300
        },
        {
            field: "OrderDate",
            title: "Order Date",
            format: "{0:dd/MM/yyyy}"
        }
        ]
    });

    $("#grid tbody").on("click", "tr", function(e) {

        var rowElement = this;
        var $row = $(rowElement);
        var grid = $("#grid").getKendoGrid();

        if ($row.hasClass("k-state-selected")) {
        $row.removeClass("k-state-selected");
        e.stopPropagation();
        }
    });

    });
</script>
```
