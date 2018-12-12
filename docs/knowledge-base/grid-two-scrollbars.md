---
title: Place Vertical Scrollbars at the Top of Grids
description: An example on how to synchronize an external vertical scrollbar with the inner scrollbar of the Grid.
type: how-to
page_title: Render a Second Vertical Scrollbar | Kendo UI Grid
slug: grid-two-scrollbars
tags: grid, scroll, scrollbar, vertical
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

How can I implement a second vertical scrollbar at the top of the Grid which is synced with the built-in scrollbar?

## Solution

1. Create a scrollable container outside the Grid.
1. Make sure that its width matches the width of the data container of the Grid.
1. Sync both scrollbars within their `scroll` event accordingly.

The following example attaches the event handlers within the `dataBound` event of the Grid.

```dojo
	<div id="example">
		<div id="dummyScrollWrapper" style="overflow-x: scroll; margin-right:17px; margin-left:2px;">
			<div id="dummyScroll" style="height: 20px;">
			</div>
		</div>

		<div id="grid"></div>

		<script>
			$(document).ready(function () {
				$("#grid").kendoGrid({
					dataSource: {
						type: "odata",
						transport: {
							read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
						},
						schema: {
							model: {
								fields: {
									OrderID: { type: "number" },
									ShipCountry: { type: "string" },
									ShipName: { type: "string" },
									ShipCity: { type: "string" },
									ShipAddress: { type: "string" }
								}
							}
						},
						pageSize: 30
					},
					height: 540,
					sortable: true,
					reorderable: true,
					groupable: true,
					resizable: true,
					filterable: true,
					columnMenu: true,
					pageable: true,
					dataBound: function (e) {
						var dataElement = $(e.sender.element).find(".k-grid-content");
						var fakeScroll = document.getElementById("dummyScroll");
						fakeScroll.style.width = dataElement.children(0).width() + "px";

						dataElement.scroll(function () {
							$("#dummyScrollWrapper").scrollLeft(dataElement.scrollLeft());
						});
						$("#dummyScrollWrapper").scroll(function () {
							dataElement.scrollLeft($("#dummyScrollWrapper").scrollLeft());
						});
					},
					columns: [{
						field: "OrderID",
						title: "Order ID",
						width: 150
					}, {
						field: "ShipCountry",
						title: "Ship Country",
						width: 300
					}, {
						field: "ShipCity",
						title: "Ship City",
						width: 300
					}, {
						field: "ShipName",
						title: "Ship Name",
						width: 300
					}, {
						field: "ShipAddress",
						width: 400
					}
					]
				});
			});
		</script>
	</div>
```
