---
title: Retrieving Selected Rows Data on Toolbar Button Click in Kendo UI for jQuery Grid
description: Learn how to get selected rows data using checkboxes in Kendo UI for jQuery Grid when clicking a custom toolbar button.
type: how-to
page_title: Get Data of Selected Rows in Kendo UI for jQuery Grid
meta_title: Get Data of Selected Rows in Kendo UI for jQuery Grid
slug: get-selected-rows-data-kendo-jquery-grid-toolbar
tags: grid, kendo-ui-for-jquery, selectable, toolbar, selected-rows
res_type: kb
ticketid: 1694348
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<tr>
<td> Version </td>
<td>2025.2.702</td>
</tr>
</tbody>
</table>

## Description

I want to retrieve the data of multiple rows selected via checkboxes in a [Kendo UI for jQuery Grid](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview) upon clicking a custom toolbar button. The selected rows should be accessed programmatically to perform further actions.

This knowledge base article also answers the following questions:
- How to get selected rows' data in Kendo UI for jQuery Grid?
- How to use a toolbar button to retrieve selected rows in Kendo UI for jQuery Grid?
- How to enable multiple row selection in Kendo UI for jQuery Grid?

## Solution

To retrieve the data of selected rows:
 
1. Configure the Grid for multiple selection with checkboxes and add a custom toolbar button.

```javascript
$("#grid").kendoGrid({
    dataSource: dataSource, // dataSource configuration
    selectable: "multiple, row", // enable multiple row selection
    toolbar: [
        { name: "selectedRows", text: "Get Selected Rows" } // custom toolbar button
    ],
    columns: [
        { selectable: true, width: "50px" }, // checkbox column
        // other columns here
    ]
});
```

2. Handle the custom toolbar button click to retrieve data of the selected rows.

```javascript
$(document).on("click", ".k-grid-selectedRows", function() {
    var grid = $("#grid").data("kendoGrid"); // access the grid instance
    var selectedRows = grid.select(); // get selected rows
    var selectedDataItems = [];

    selectedRows.each(function() {
        var dataItem = grid.dataItem(this); // get data item for each selected row
        selectedDataItems.push(dataItem);
    });

    console.log(selectedDataItems); // use or process selected data items
});
```


## See Also

- [Kendo UI for jQuery Grid Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
- [Kendo UI for jQuery Grid API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
