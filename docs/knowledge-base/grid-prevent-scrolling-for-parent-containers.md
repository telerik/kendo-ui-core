---
title: Parent Containers Continue to Scroll When the Last Grid Record Is Reached
description: When the last Grid record is reached, the parent container continues to scroll.
type: troubleshooting
page_title: Cannot Prevent the Propagation of Scrolling | Kendo UI Grid
slug: grid-prevent-scrolling-for-parent-containers
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

I have a scrollable Grid which is placed within a scrollable container. When I reach the top or bottom position of the Grid scrollbar, the scrolling is not prevented and the parent element starts to scroll.

## Solution

1. Handle the `scroll` event of the scrollable container of the Grid.

1. Conditionally prevent the scrolling when the scroll position is either at the top or at the bottom of the Grid.

```dojo
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
```
