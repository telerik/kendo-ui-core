---
title: Refresh Particular Rows without Rendering the Entire Grid
description: An example on how to render the content of a particular Kendo UI Grid row when manually changing its values and without refreshing the entire Grid.
type: how-to
page_title: Refresh the Content of a Row Only | Kendo UI Grid for jQuery
slug: grid-update-particular-row-without-refresh
tags: grid, row, update, render
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
  <td>2017.3.913</td>
 </tr>
</table>

## Description

How can I refresh the HTML of Grid record to apply the manual changes but avoid refreshing the entire Grid?

## Solution

If you apply changes to the `dataItem` without using its `set` method, although the item will contain the new values, these values will not be applied to the HTML. To apply the changes, traverse all cells and manually populate the new content.

```dojo
<input type='button' value='Change first cell value' onclick='changeFirstCellValue()' />
<div id="grid"></div>
<script>
  function changeFirstCellValue(){
    var grid = $("#grid").getKendoGrid();
    var firstRow = grid.items().first();
    var dataItem = grid.dataItem(firstRow);
    dataItem["productName"] = "changed value";
    dataItem.dirty = true;
    kendoFastReDrawRow(grid, firstRow);
  }

$("#grid").kendoGrid({
    selectable: "multiple cell",
    allowCopy: true,
    columns: [
        { field: "productName", template: "ProductName template: #=productName#" },
        { field: "category" }
    ],
    dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
    ]
});

  function kendoFastReDrawRow(grid, row) {
    var dataItem = grid.dataItem(row);

    var rowChildren = $(row).children('td[role="gridcell"]');

    for (var i = 0; i < grid.columns.length; i++) {

        var column = grid.columns[i];
        var template = column.template;
        var cell = rowChildren.eq(i);

        if (template !== undefined) {
            var kendoTemplate = kendo.template(template);

            // Render using template
            cell.html(kendoTemplate(dataItem));
        } else {
            var fieldValue = dataItem[column.field];

            var format = column.format;
            var values = column.values;

            if (values !== undefined && values != null) {
                // use the text value mappings (for enums)
                for (var j = 0; j < values.length; j++) {
                    var value = values[j];
                    if (value.value == fieldValue) {
                        cell.html(value.text);
                        break;
                    }
                }
            } else if (format !== undefined) {
                // use the format
                cell.html(kendo.format(format, fieldValue));
            } else {
                // Just dump the plain old value
                cell.html(fieldValue);
            }
        }
    }
}
</script>
```

## Notes

This example is based on a [post by Adam Yaxley](https://stackoverflow.com/a/23959005) on Stack Overflow.
