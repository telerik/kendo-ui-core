---
title: Expand and Collapse Group of Columns on Button Click
description: An example on how to expand and collapse a group of columns on a button click in the Kendo UI Grid.
type: how-to
page_title: Expand and Collapse Column Groups with Header Button | Kendo UI Grid
slug: grid-expand-collapse-columns-group-button-click
tags: grid, multi-column, headers, expand, collapse, columns
ticketid: 1158853
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

How can I expand and collapse a group of columns with a button when I am using multi-column headers in the Kendo UI Grid?

## Solution

1. Use [`headerTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.headertemplate) to add a button to the desired column header.
1. In the `click` event handler of the button and based on a condition, pass the desired columns as parameters to the [`hideColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn) or the [`showColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn) methods.

```dojo
<div id="example">
	<div id="grid"></div>

	<script>
	$(document).ready(function () {
		$("#grid").kendoGrid({
		dataSource: {
			type: "odata",
			transport: {
			read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
			},
			pageSize: 20
		},
		height: 550,
		pageable: true,
		columns: [
			{
			title: "Contact Info",
			headerTemplate: 'Contact Info <button class="k-button" style="float: right;" onclick="onExpColClick(this)"><span class="k-icon k-i-minus"></span></button>',
			columns: [{
				field: "ContactTitle",
				title: "Contact Title",
				width: 200
			},{
				field: "ContactName",
				title: "Contact Name",
				width: 200
			},{
				field: "Phone",
				title: "Phone"
			}]
			},{
			title: "Location",
			columns: [ {
				field: "Country",
				width: 200
			},{
				field: "City"
			}]
			}]
		});
	});

	function onExpColClick(button){
		var span = $(button).find("span");
		var grid = $("#grid").data("kendoGrid");

		if(span.hasClass("k-i-minus")){
		span.removeClass("k-i-minus");
		span.addClass("k-i-plus");

		grid.hideColumn("ContactName");
		grid.hideColumn("Phone");

		}else{
		span.removeClass("k-i-plus");
		span.addClass("k-i-minus");

		grid.showColumn("ContactName");
		grid.showColumn("Phone");
		}
	}
	</script>
</div>
```
