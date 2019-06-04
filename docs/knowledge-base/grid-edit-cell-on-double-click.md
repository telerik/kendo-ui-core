---
title: Edit Cells on Double-Click in Grid
description: An example on how to edit cells in the batch edit mode of the Kendo UI Grid on double-click.
type: how-to
page_title: Implement Double-Click Batch Editing in Selectable Grids | Kendo UI Grid for jQuery
slug: grid-edit-cell-on-double-click
tags: grid, batch, incell, double-click
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

How can I edit cells on double-click in an editable Grid when selection is enabled?

## Solution

1. Disable the built-in editing mechanism of the Grid.
1. Use the `editCell` and `closeCell` methods within the `dblclick` event of the `td` elements.

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

      $("#grid tbody").on("dblclick", "td", function(e) {
          var cellElement = this;
          var cell = $(cellElement);
          var grid = $("#grid").getKendoGrid();
          grid.editCell(cell);
      });

      $("#grid tbody").on("blur", "td", function(e) {
        var cellElement = this;
        var cell = $(cellElement);
        var grid = $("#grid").getKendoGrid();
				grid.closeCell(cell);
   	 });

    });
</script>
```
