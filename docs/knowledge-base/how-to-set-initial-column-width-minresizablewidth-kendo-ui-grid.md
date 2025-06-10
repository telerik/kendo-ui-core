---
title: Setting Initial Column Width to minResizableWidth in Kendo UI Grid
description: Learn how to ensure the initial column width in the Kendo UI Grid matches the minResizableWidth setting.
type: how-to
page_title: How to Set Initial Column Width as minResizableWidth in Kendo UI Grid
slug: how-to-set-initial-column-width-minresizablewidth-kendo-ui-grid
tags: kendo-ui, grid, column, width, minresizablewidth
res_type: kb
ticketid: 1668462
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Grid for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.1015</td>
</tr>
</tbody>
</table>

## Description

When working with the Kendo UI [Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/), I noticed the columns' initial width does not match the [`minResizableWidth`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.minresizablewidth) setting. I want the initial column width to be set according to the `minResizableWidth` value.

This KB article also answers the following questions:
- How to dynamically adjust the Kendo UI Grid column width to the minimum resizable width on initialization?

## Solution

The [`minResizableWidth`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.minresizablewidth) option in the Kendo UI Grid configures the minimum width that a column can be resized to, not its initial width. To set a column's initial width to its `minResizableWidth`, apply the [`width`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.width) configuration option or adjust the width programmatically after the Grid initialization.

To adjust the width of the first column to its `minResizableWidth`, use the following approach:

- Handle the [`dataBound`[(https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event of the Grid.
- Retrieves the Grid instance and check the configured `minResizableWidth`.
- Use the [`resizeColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/resizecolumn) to apply the width.

```javascript
dataBound: function(e){
              let grid = e.sender;     
              grid.resizeColumn(grid.columns[0], grid.columns[0].minResizableWidth);
            },
```
Below is a runnable example where the width of the first column is changed:

```dojo
<div id="grid"></div>

      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              transport: {
                read: "https://demos.telerik.com/service/v2/core/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    ShipCountry: { type: "string" },
                    ShipCity: { type: "string" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShippedDate: { type: "date" }
                  }
                }
              },
              pageSize: 15
            },
            height: 550,
            sortable: true,
            resizable: true,
            pageable: true,
            dataBound: function(e){
              let grid = e.sender;     
              grid.resizeColumn(grid.columns[0], grid.columns[0].minResizableWidth);
            },
            columns: [
              {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:MM/dd/yyyy}",
                minResizableWidth: 200
              },
              {
                field: "ShipCountry",
                title: "Ship Country",

              },             
              {
                field: "ShipName",
                title: "Ship Name"
              },
              {
                field: "ShippedDate",
                title: "Shipped Date",
                format: "{0:MM/dd/yyyy}"                
              },
              {
                field: "OrderID",
                title: "ID"               
              }
            ]
          });

        });
      </script>
```


For changing the width of all columns to their respective `minResizableWidth`, iterate over the columns array using the same method:

```javascript
let grid = $("#grid").data('kendoGrid');
$.each(grid.columns, function(index) {
    grid.resizeColumn(grid.columns[index], grid.columns[index].minResizableWidth);
});
```


## See Also

- [Grid Configuration - Columns.minResizableWidth](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.minresizablewidth)
- [Grid Configuration - Columns.width](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.width)
- [Kendo UI Grid Overview](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
