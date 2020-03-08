---
title: Copy Columns from Excel and Paste Them on Selected Grid Columns
description: An example on how to paste columns from Excel to the selected columns of the Kendo UI Grid.
type: how-to
page_title: Paste Columns from Excel to Selected Columns | Kendo UI Grid for jQuery
slug: grid-copy-columns-from-excel-paste-on-selected-columns
tags: grid, copy, paste, excel, columns
ticketid: 1158270
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1 221</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I copy Excel columns and paste them on the selected columns in the Kendo UI Grid?

## Solution

Handle the [`keydown`](https://api.jquery.com/keydown/) event of the Grid&mdash;in the event handler and if the user is pasting:

1. Programmatically [`focus`](https://api.jquery.com/focus/) an invisible text-area to paste the content on it.
1. Use the value of the text-area to create an array of single cell values.
1. Get the selected cells of the Grid.
1. For every selected cell, [`shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) a value from the array.

```dojo
<div id="grid"></div>
<textarea id="ta" style="opacity: 0"></textarea>
<script>
$("#grid").kendoGrid({
	selectable: "multiple cell",
	allowCopy: true,
	columns: [
	{ field: "productName0" },
	{ field: "productName1" },
	{ field: "productName2" },
	{ field: "productName3" },
	{ field: "productName4" }
	],
	dataSource: [
	{ productName0: "Tea", productName1: "Tea", productName2: "Tea", productName3: "Tea", productName4: "Tea" },
	{ productName0: "Coffee", productName1: "Coffee", productName2: "Coffee", productName3: "Coffee", productName4: "Coffee"},
	{ productName0: "Ham", productName1: "Ham", productName2: "Ham", productName3: "Ham", productName4: "Ham"},
	{ productName0: "Bread", productName1: "Bread", productName2: "Bread", productName3: "Bread", productName4: "Bread"}
	]
});

var grid = $('#grid').data('kendoGrid');

grid.element.on('keydown', function(e) {
	if(e.keyCode===86 && e.ctrlKey===true){
	var textarea = $("#ta");
	textarea.val("");
	textarea.focus();

	setTimeout(function(e){
		var value = $.trim(textarea.val());
		var grid = $("#grid").data("kendoGrid");
		var rows = value.split('\n');
		var data = [];

		for (var i = 0; i < rows.length; i++) {
		var cells = rows[i].split('\t');
		for (var j = 0; j < cells.length; j++) {
			data.push(cells[j]);
		}
		};
		var select = grid.select();
		select.each(function(i, e){
		var cell = $(this);
		var row = cell.closest("tr");
		var dataItem = grid.dataItem(row);
		var dataField = $(grid.thead.find("th")[cell[0].cellIndex]).attr("data-field");

		dataItem[dataField] = data.shift()
		});
		grid.refresh();

	},1)
	}
})
</script>
```
