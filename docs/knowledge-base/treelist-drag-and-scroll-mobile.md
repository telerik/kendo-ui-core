---
title: Scroll and Drag and Drop on Mobile Devices
description: An example on how to provide scrolling and the drag-and-drop functionality at the same time in the Kendo UI TreeList on mobile devices.
type: how-to
page_title: Drag and Drop on Mobile Devices | Kendo UI TreeList
slug: treelist-drag-and-scroll-mobile
tags: treelist, android, ios, mobile, drag, drop, scroll
ticketid: 1179396
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.2.620</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>TreeList for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I use the Drag-and-Drop functionality of the Kendo UI TreeList on mobile devices?

## Solution

To overcome the interference of the device scrolling and the drag-and-drop:

1. Add an additional column for dragging.
1. Stop the propagation of the `touchstart` event for all other cells.

> Test the following code on a mobile device.

```dojo
<div id="example">

	<div id="treelist"></div>
	<script>
	$(document).ready(function() {
		var service = "https://demos.telerik.com/kendo-ui/service";

		$("#treelist").kendoTreeList({
		dataSource: {
			transport: {
			read: {
				url: service + "/EmployeeDirectory/All",
				dataType: "jsonp"
			}
			},
			schema: {
			model: {
				id: "EmployeeID",
				parentId: "ReportsTo",
				fields: {
				ReportsTo: { field: "ReportsTo",  nullable: true },
				EmployeeID: { field: "EmployeeId", type: "number" },
				Extension: { field: "Extension", type: "number" }
				},
				expanded: true
			}
			}
		},
		height: 540,
		editable: {
			move: true
		},
		columns: [
			{
			field: "FirstName",
			title: "First Name"
			},
			{
			template: "<span class='k-icon k-i-handler-drag'></span>",
			width: 35
			}
		]
		});
		$("#treelist").on("touchstart", "td:not(:last-child)", function(e){
		e.stopPropagation();
		});
	});
	</script>
</div>
```
