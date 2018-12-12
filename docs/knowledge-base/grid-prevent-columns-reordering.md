---
title: Prevent Specific Column Reordering in Grid
description: An example on how to prevent the reordering of specific columns in the Kendo UI Grid.
type: how-to
page_title: Prevent Column Reordering | Kendo UI Grid
slug: grid-prevent-columns-reordering
tags: grid, columns, reorder
ticketid: 1138136
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I prevent a specific column to be reordered in the Kendo UI Grid?

## Suggested Workaround

The Kendo UI Grid does not provide a built-in solution for achieving this behavior. However, you can still work around the issue.

1. In the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event handler, save the column in a global variable.
1. In the [`columnReorder`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnreorder) event handler, use the [`reorderColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/reordercolumn) method to position the column in the desired spot.

```dojo
<div id="grid"></div>
<script>
	var nonReordableColumn;

	$("#grid").kendoGrid({
	  columns: [
	    { field: "fname" },
	    { field: "lname" },
	    { field: "age" }
	  ],
	  dataSource: [
	    { fname: "Jane", lname: "Doe", age: 30 },
	    { fname: "John", lname: "Doe", age: 33 }
	  ],
	  dataBound: function(e){
	    nonReordableColumn = e.sender.columns[0];
	  },
	  reorderable: true,
	  columnReorder: function(e) {
	    var grid = e.sender;

	    setTimeout(function (e) {
	        grid.reorderColumn(0, nonReordableColumn);
	    }, 1)
	  }
	});
</script>
```
