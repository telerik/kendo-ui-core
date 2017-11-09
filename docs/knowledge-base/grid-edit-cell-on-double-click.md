---
title: Editing Cells on Double-Click in Kendo UI Grid
description: An example for editing cells in Batch edit mode on double-click.
type: how-to
page_title: Implement Double-Click Batch Editing with Selecatble Grid
slug: grid-edit-cell-on-double-click
tags: grid, batch, incell, double-click
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

How can I edit cells on double-click in editable Grid with enabled selection?

## Solution

For achieving the desired behavior you will have to disable the built-in editing mechanism of the Grid and use the __editCell__ and __closeCell__ methods within the double-click event of the TD elements
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
