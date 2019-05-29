---
title: Navigate Virtual Scrolling in Grid with Up and Down Arrows
description: An example on how to use the Up and Down arrow buttons to navigate a Kendo UI Grid with its virtual scrolling enabled.
type: how-to
page_title: Use Up and Down Arrows to Navigate virtual Scrollbar | Kendo UI Grid for jQuery
slug: grid-navigate-virtual-scrolling-up-down-arrows
tags: grid, virtual, scrolling, arrows, keyboard, navigate
ticketid: 1156118
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

How can I navigate the virtual scrolling of the Kendo UI Grid with the **Up** and **Down** keyboard arrows?

## Solution

1. In the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event handler, add `tabindex` to the child `div` of the `.k-scrollbar-vertical` container.
1. Handle the [`click`](https://api.jquery.com/click/) event of the table of the Grid.
1. In the `click` event handler, [`focus`](https://api.jquery.com/focus/) the child `div` of the `.k-scrollbar-vertical` container.

```dojo
<style>
	.k-scrollbar-vertical div {
		outline: none;
	}
</style>

<div id="example">
	<div id="grid"></div>
	<script>
		$(document).ready(function() {
			$("#grid").kendoGrid({
				dataSource: {
					type: "odata",
					serverPaging: true,
					serverSorting: true,
					pageSize: 100,
					transport: {
						read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
					}
				},
				height: 543,
				scrollable: {
					virtual: true
				},
				sortable: true,
				columns: [{
						field: "OrderID",
						title: "Order ID",
						width: 110
					},
					{
						field: "CustomerID",
						title: "Customer ID",
						width: 130
					},
					{
						field: "ShipName",
						title: "Ship Name",
						width: 280
					},
					{
						field: "ShipAddress",
						title: "Ship Address"
					},
					{
						field: "ShipCity",
						title: "Ship City",
						width: 160
					},
					{
						field: "ShipCountry",
						title: "Ship Country",
						width: 160
					}
				],
				dataBound: function(e) {
					setTimeout(function() {
						$(".k-scrollbar-vertical div").attr("tabindex", "-1");
						$(".k-scrollbar-vertical div")[0].focus();
					})
				}
			});
			$(".k-virtual-scrollable-wrap").bind("click", function() {
				$(".k-scrollbar-vertical div")[0].focus();
			});
		});
	</script>
	<style>
		#grid table {
			min-width: 1190px;
		}
	</style>
</div>
```
