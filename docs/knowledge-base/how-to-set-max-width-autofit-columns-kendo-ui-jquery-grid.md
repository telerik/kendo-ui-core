---
title: Setting Maximum Width for AutoFit Columns in Kendo UI for jQuery Grid
description: Learn how to manually set a maximum width for columns using the autoFitColumn method in Kendo UI for jQuery Grid.
type: how-to
page_title: How to Set a Max Width for AutoFit Columns in Kendo UI for jQuery Grid
slug: how-to-set-max-width-autofit-columns-kendo-ui-jquery-grid
tags: kendo, grid, autofitcolumn, maxwidth, resizecolumn
res_type: kb
ticketid: 1674987
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
</tbody>
</table>

## Description

I need to set a maximum width for columns in the Kendo UI for jQuery Grid that are using the autoFitColumn feature. How can I achieve this since the Grid does not directly support setting a maximum width for autofit columns?

This knowledge base article also answers the following questions:
- How can I limit the width of autofit columns in Kendo UI for jQuery Grid?
- Can I enforce a maximum column width constraint when using autoFitColumn in Kendo UI for jQuery Grid?

## Solution

To set a maximum width for columns using the [`autoFitColumn`](/api/javascript/ui/grid/methods/autofitcolumn) feature in Kendo UI for jQuery Grid, you can manually check and adjust the column widths after the Grid has autofitted the columns. Although the Grid component does not provide a built-in API for setting a maximum width on autofit columns, you can achieve the desired functionality by utilizing the `autoFitColumn` method in conjunction with the [`resizeColumn`](/api/javascript/ui/grid/methods/resizecolumn) method.

Follow these steps to implement the solution:

1. Use the Grid's [`dataBound`](/api/javascript/ui/grid/events/databound) event to trigger the column resizing logic after the Grid has been rendered and its data has been bound.

2. Iterate through the Grid's columns and for each column, call the  [`autoFitColumn`](/api/javascript/ui/grid/methods/autofitcolumn) method to autofit its width.

3. After autofitting, check if the column's width exceeds your maximum desired width. If it does, use the [`resizeColumn`](/api/javascript/ui/grid/methods/resizecolumn) method to set the column's width to the maximum desired width.

Here is a runnable example demonstrating how to manually resize columns after autofitting:

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "fname", title: "First name"},
          { field: "lname", title: "Last name"},
          {
            field: "age"
          }
        ],
        dataSource: [
          { fname: "Jane", lname: "Smith some very very very long name", age: 30 },
          { fname: "John", lname: "Stevens", age: 33 }
        ],
        dataBound: onDataBound
      });

      function onDataBound(e) {
        //resizeGrid();
        resizeColumns(e);
      }

      function resizeColumns(e) {
        var grid = e.sender,
            gridOptions = grid.getOptions();

        for (var i = 0; i < grid.columns.length; i++) {
          grid.autoFitColumn(i);
         
          if (grid.columns[i].width > 200) { 
            grid.resizeColumn(grid.columns[i], 200);
          }
        };
      }
    </script>
```

## See Also

- [Kendo UI for jQuery Grid - API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [Kendo UI for jQuery Grid Documentation](https://docs.telerik.com/kendo-ui/controls/grid/overview)
- [Resizing of Columns Feature in Kendo UI for jQuery Grid](https://docs.telerik.com/kendo-ui/controls/grid/columns/resizing)
