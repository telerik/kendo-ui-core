---
title: Programmatically Changing the Width of a Grid Column
description: Learn how to programmatically adjust the width of columns in a Kendo UI Grid.
type: how-to
page_title: How to Adjust Column Widths Programmatically in Kendo UI Grid
slug: how-to-programmatically-change-grid-column-width-kendo-ui
tags: grid, kendo ui, column width, setoptions, javascript
res_type: kb
ticketid: 1666957
---

## Description

When working with the [Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid) for Progress® Kendo UI®, you might need to programmatically change the width of one or more columns. This article demonstrates how to adjust column widths dynamically. This KB article also answers the following questions:
- How to set column widths dynamically in a Kendo UI Grid?
- Can I update Grid column settings after initialization?
- How to use `setOptions()` method to modify Grid properties?

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

## Solution

To programmatically change the width of Grid columns, use the [`setOptions()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method. This approach allows you to update the Grid's column widths after it has been initialized. Follow these steps:

1. Define a list with the desired widths for each column.

```javascript
const list_of_columns_width = [500, 110, 120, 130, 50, 60];
```

2. Obtain a reference to the Grid instance.

```javascript
let grid = $("#grid").data("kendoGrid");
```

3. Iterate over the Grid columns and apply the widths from `list_of_columns_width`.

```javascript
let gridColumns = grid.columns;

for (var i = 0; i < grid.columns.length; i++) {
  if (i < list_of_columns_width.length) {
    const any_column_width = list_of_columns_width[i];
    gridColumns[i].width = any_column_width;
  }
}
```

4. Update the Grid's options with the modified columns.

```javascript
grid.setOptions({
  columns: gridColumns
});
```

Note: Use the `setOptions()` method with caution and avoid calling it inside event handlers like [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) to prevent endless loops.

When updating the Grid's columns using `setOptions()`, all other Grid options remain as initially defined. Only the specified options (in this case, column widths) are updated.

Explore a live example in the following Dojo demo: 

```dojo
<div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          const list_of_columns_width = [500, 110, 120, 130 ,50, 60];
          $("#grid").kendoGrid({
            dataSource: {
              transport: {
                read: "https://demos.telerik.com/service/v2/core/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: {
                      type: "number"
                    },
                    ShipCountry: {
                      type: "string"
                    },
                    ShipCity: {
                      type: "string"
                    },
                    ShipName: {
                      type: "string"
                    },
                    OrderDate: {
                      type: "date"
                    },
                    ShippedDate: {
                      type: "date"
                    }
                  }
                }
              },
              pageSize: 15
            },
            height: 550,
            sortable: true,
            resizable: true,
            pageable: true,
            dataBound: function() {
              for (var i = 0; i < this.columns.length; i++) {
                if (i < list_of_columns_width.length) {
                  const any_column = this.columns[i];
                  const any_column_width = list_of_columns_width[i];
                  any_column.width = any_column_width
                }
              }
            },
            columns: [
              {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:MM/dd/yyyy}"
              },
              {
                field: "ShipCountry",
                title: "Ship Country"
              },
              {
                field: "ShipCity",
                title: "Ship City"
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

          let grid = $("#grid").data("kendoGrid");
          let gridColumns = grid.columns;

          for (var i = 0; i < grid.columns.length; i++) {
            if (i < list_of_columns_width.length) {

              const any_column_width = list_of_columns_width[i];
              gridColumns[i].width = any_column_width;
            }
          }
          grid.setOptions({
            columns: gridColumns
          });
        });
      </script>
    </div>
```

## See Also

- [Grid Overview](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [Grid setOptions() Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions)
- [Grid DataBound Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
