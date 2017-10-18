---
title: Deselect row on click
description: Example on how to deselect rows in Kendo Grid
type: how-to
page_title: Deselect row on click | Kendo UI Grid
slug: grid-deselect-row-click
tags: grid, selection, remove, deselect, unselect, select, row, click
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2017.3.913</td>
 </tr>
</table>

## Description

I enabled selection in the Grid and would like to remove the selection from a row when clicking on it second time.

## Solution

When selection is enabled in the Grid component the built-in option for deselecting a row is Ctrl+click. 

In order to deselect a row by just clicking, without holding the Ctrl key you can use the approach below:


```html
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