---
title: Remove Double Left Border from the Grid
description: An example on how to remove the double left border when hiding the first column in the Kendo UI Grid.
type: how-to
page_title: Remove Faulty Left Border after Hiding the First Column | Kendo UI Grid
slug: grid-remove-double-left-border
tags: grid, columns, border
ticketid: 1347080
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2018.3.911</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I remove the double left border when hiding the first column in the Kendo UI Grid?

## Solution

1. Handle the [`columnHide`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnhide) and [`columnShow`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnshow) events of the Grid.
1. In the event handler of `columnHide` and `columnShow`, find the first visible column and apply a class that will remove its left border.

```dojo
<style>
	.k-filter-row>th.first-visible-column,
	.k-grid tbody td.first-visible-column,
	.k-grid tfoot td.first-visible-column,
	.k-grid-header th.k-header.first-visible-column {
		border-left-width: 0;
	}
</style>

<div id="grid"></div>

<script>
	function onColumnChange(e){
		var columns = e.sender.columns;
		var firstVisibleColumn = null;
		var colIndex = null;

		$(".first-visible-column").removeClass("first-visible-column");

		for(var i = 0; i < columns.length; i++){
			if(columns[i].hidden !== true) {
				firstVisibleColumn = columns[i];
				colIndex = i + 1;
				break;
			}
		}

		if(firstVisibleColumn){
			e.sender.element.find("k-filter-row>th:nth-child("+colIndex+")").addClass("first-visible-column");
			e.sender.element.find("tbody td:nth-child("+colIndex+")").addClass("first-visible-column");
			e.sender.element.find("tfoot td:nth-child("+colIndex+")").addClass("first-visible-column");
			e.sender.element.find(".k-grid-header th.k-header:nth-child("+colIndex+")").addClass("first-visible-column");
		}
	};

	$(document).ready(function() {
		$("#grid").kendoGrid({
			dataSource: [
				{ id: 1, name: "Jane Doe", age: 31, city: "Boston" },
				{ id: 2, name: "John Doe", age: 55, city: "New York" }
			],
			columnMenu: true,
			columnHide: onColumnChange,
			columnShow: onColumnChange
		});
	});
</script>
```