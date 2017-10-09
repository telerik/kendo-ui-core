---
title: How to prevent the scrolling of the parent containers when we reach the last record of the Grid
description: Preventing the scrolling of wrapping containers
type: troubleshooting
page_title: Need to prevent the propagation of the Grid scrolling 
slug: grid-prevent-scrolling-for-parent-containers
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

When I have scrollable Grid and that Grid is placed within scrollable containers, once I reach at the bottom or top position of the Grid`s scrollbar, the parent elements start to scroll.

## Solution

The easiest way for preventing the propagation of the scroll event is to handle that event for the scrollable container of the Grid and conditionally prevent the scrolling when the scroll position is either at the top or at the bottom

#### Example
````html
<div id="example">
		<div id="parentScrollableElement" style="overflow: auto; width: 600px; height: 600px;">
			<div style="height: 1000px">
				<div id="grid"></div>
			</div>
		</div>
		<script>
			$(document).ready(function () {
				$("#grid").kendoGrid({
					dataSource: {
						type: "odata",
						transport: {
							read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
						},
						pageSize: 20
					},
					height: 550,
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

				$("#grid").find(".k-grid-content").on('mousewheel', function (e) {
					var event = e.originalEvent;
					var	d = event.wheelDelta || -event.detail;
					this.scrollTop += ( d < 0 ? 1 : -1 ) * 50;
					e.preventDefault();
				});
			});
		</script>
	</div>
````
