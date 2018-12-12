---
title: Animate the resize Method
description: An example on how to animate the resize method of the Kendo UI Grid.
type: how-to
page_title: Change Height with Animation | Kendo UI Grid
slug: grid-animate-resize-method
tags: grid, animation, resize, height
ticketid: 1151627
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

How can I animate the height resizing of the Kendo UI Grid?

## Solution

1. Use two simultaneous animations&mdash;the first one for the HTML element of the Grid and the second one for the `.k-grid-content` HTML element.
2. When the animations are complete, invoke the [`resize`](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/resize) method of the Grid.

```dojo
<div id="example">
	<div id="grid"></div>
	<script>
		$(document).ready(function() {
			$("#grid").kendoGrid({
				dataSource: {
					type: "odata",
					transport: {
						read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
					},
					pageSize: 20
				},
				height: 250,
				groupable: true,
				sortable: true,
				pageable: {
					refresh: true,
					pageSizes: true,
					buttonCount: 5
				},
				columns: [{
					field: "ContactName",
					title: "Contact Name",
					width: 240
				}, {
					field: "ContactTitle",
					title: "Contact Title"
				}, {
					field: "CompanyName",
					title: "Company Name"
				}, {
					field: "Country",
					width: 150
				}]
			});
		});

		setTimeout(function(e) {
			var contentHeight = $("#grid").height() - $(".k-grid-content").height();
			var newHeight = 500;

			$("#grid").animate({
				height: newHeight,
			});

			$(".k-grid-content").animate({
				height: newHeight - contentHeight,
			}, function(e) {
				$("#grid").data("kendoGrid").resize();
			});

		}, 1000);
	</script>
</div>
```
