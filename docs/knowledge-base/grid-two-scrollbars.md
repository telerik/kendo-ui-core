---
title: How to place vertical scrollbar at the top of the Kendo UI Grid
description: Sync external vertical scrollbar over the Grid with the inner scrollbar
type: troubleshooting
page_title: How to render second vertical scrollbar for the Grid
slug: grid-two-scrollbars
tags: grid, scroll, scrollbar, vertical
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
  <td>2017.3.913</td>
 </tr>
</table>

## Description

I want to have second vertical scrollbar at the top of the Grid, synced with the built-in scrollbar.

## Solution

You could create a scrollable container outside of the Grid and ensure that its width matches the width of the Grid`s data container. Then, within the __scroll__ event of both scrollbars we can sync them accordingly. The event handlers in the following example are attached within the __dataBound__ event of the Grid.

#### Example
````html
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
							read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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
````
