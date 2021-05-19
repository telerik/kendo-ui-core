---
title: Remove Dirty Indicator when Value Is in Original State
description: An example on how to remove the dirty indicator when the value is put back to the original state in the Kendo UI Grid.
type: how-to
page_title: Remove Dirty Flag When Cell Value Is Changed to Original | Kendo UI Grid for jQuery
slug: grid-remove-dirty-indicator-when-value-is-original-state
tags: grid, dirty, editing, batch
ticketid: 1156822
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

How can I remove the dirty indicators from the cells when the user changes the value in the Kendo UI Grid to its original state?

## Solution

To remove the dirty indicators, handle the [`save`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/save) event&mdash;in the event handler:

1. Use the internal `_pristineForModel` method to get the original values.
1. If the changed value is equal to the original value, `delete` the field from the `dirtyFields` object of the `model`.
1. If the `dirtyFields` object is empty, set the `dirty` property of the `model` to `false`.

```dojo
<div id="example">
	<div id="grid"></div>

	<script>
		$(document).ready(function() {
			var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
				dataSource = new kendo.data.DataSource({
					transport: {
						read: {
							url: crudServiceBaseUrl + "/Products",
							dataType: "jsonp"
						},
						update: {
							url: crudServiceBaseUrl + "/Products/Update",
							dataType: "jsonp"
						},
						destroy: {
							url: crudServiceBaseUrl + "/Products/Destroy",
							dataType: "jsonp"
						},
						create: {
							url: crudServiceBaseUrl + "/Products/Create",
							dataType: "jsonp"
						},
						parameterMap: function(options, operation) {
							if (operation !== "read" && options.models) {
								return {
									models: kendo.stringify(options.models)
								};
							}
						}
					},
					batch: true,
					pageSize: 20,
					schema: {
						model: {
							id: "ProductID",
							fields: {
								ProductID: {
									editable: false,
									nullable: true
								},
								ProductName: {
									validation: {
										required: true
									}
								},
								UnitPrice: {
									type: "number",
									validation: {
										required: true,
										min: 1
									}
								},
								Discontinued: {
									type: "boolean"
								},
								UnitsInStock: {
									type: "number",
									validation: {
										min: 0,
										required: true
									}
								}
							}
						}
					}
				});

			$("#grid").kendoGrid({
				dataSource: dataSource,
				navigatable: true,
				pageable: true,
				save: function(e) {
					var field = Object.keys(e.values)[0];
					var newVal = e.values[field];
					var oldModel = e.sender.dataSource._pristineForModel(e.model);

					if (oldModel[field] === newVal) {
						delete e.model.dirtyFields[field];
						if (Object.keys(e.model.dirtyFields).length === 0) {
							e.model.dirty = false;
						}
					}
				},
				height: 550,
				toolbar: ["create", "save", "cancel"],
				columns: [
					"ProductName",
					{
						field: "UnitPrice",
						title: "Unit Price",
						format: "{0:c}",
						width: 120
					},
					{
						field: "UnitsInStock",
						title: "Units In Stock",
						width: 120
					},
					{
						field: "Discontinued",
						width: 120
					},
					{
						command: "destroy",
						title: "&nbsp;",
						width: 150
					}
				],
				editable: true
			});
		});
	</script>
</div>
```
