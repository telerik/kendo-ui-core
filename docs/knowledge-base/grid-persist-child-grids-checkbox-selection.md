---
title: Persist Checkbox Selection in Child Grids
description: An example on how to persist the checkbox selection in the child Grids of the Kendo UI Grid.
type: how-to
page_title: Save Selected Rows During Paging in Child Grids | Kendo UI Grid for jQuery
slug: grid-persist-child-grids-checkbox-selection
tags: grid, checkbox, selection, hierarchy, child, persist
ticketid: 1150871
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

How can I persist the selected rows of the child Grids when I change the page of the master Kendo UI Grid?

## Solution

1. Handle the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change) event of the child Grids.
1. In the `change` event handler, use the internal `_selectedIds` property to save the selected IDs in a global array.
1. Handle the [`detailInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailinit) event of the master Grids.
1. In the `detailInit` event handler, assign the recorded data from the global array to the `_selectedIds` property of the relevant child Grid.

```dojo
<div id="example">
	<div id="grid"></div>

	<script>
		var selectedID = [];

		$(document).ready(function() {
			var element = $("#grid").kendoGrid({
				dataSource: {
					type: "odata",
					transport: {
						read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
					},
					pageSize: 6,
					serverPaging: true,
					serverSorting: true,
					schema: {
						model: {
							id: "EmployeeID"
						}
					}
				},
				height: 600,
				sortable: true,
				persistSelection: true,
				pageable: true,
				detailInit: detailInit,
				dataBound: function() {
					this.expandRow(this.tbody.find("tr.k-master-row").first());
				},
				columns: [{
						selectable: true,
						width: "50px"
					},
					{
						field: "FirstName",
						title: "First Name",
						width: "110px"
					},
					{
						field: "LastName",
						title: "Last Name",
						width: "110px"
					},
					{
						field: "Country",
						width: "110px"
					},
					{
						field: "City",
						width: "110px"
					},
					{
						field: "Title"
					}
				]
			});
		});

		function detailInit(e) {
			var childGrid = $("<div id=childGrid" + e.data.EmployeeID + "/>").appendTo(e.detailCell).kendoGrid({
				dataSource: {
					type: "odata",
					transport: {
						read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
					},
					serverPaging: true,
					serverSorting: true,
					serverFiltering: true,
					pageSize: 10,
					filter: {
						field: "EmployeeID",
						operator: "eq",
						value: e.data.EmployeeID
					},
					schema: {
						model: {
							id: "OrderID"
						}
					}
				},
				scrollable: false,
				persistSelection: true,
				change: function(e) {
					var gridID = e.sender.element[0].id;
					var selectedIds = e.sender._selectedIds;

					selectedID[gridID] = selectedIds;
				},
				sortable: true,
				pageable: true,
				columns: [{
						selectable: true,
						width: "50px"
					},
					{
						field: "OrderID",
						width: "110px"
					},
					{
						field: "ShipCountry",
						title: "Ship Country",
						width: "110px"
					},
					{
						field: "ShipAddress",
						title: "Ship Address"
					},
					{
						field: "ShipName",
						title: "Ship Name",
						width: "300px"
					}
				]
			}).data("kendoGrid");
			var selIDs = selectedID["childGrid" + e.data.EmployeeID];
			if (selIDs) {
				childGrid._selectedIds = selIDs;
			}
		}
	</script>
</div>
```
