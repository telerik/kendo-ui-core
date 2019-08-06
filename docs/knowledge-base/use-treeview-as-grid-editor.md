---
title: Use TreeView as Custom Editor
page_title: Use TreeView as Custom Editor | Kendo UI Grid for jQuery
description: "An example on how to use TreeView as an editor in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/use-treeview-as-grid-editor
slug: howto_usethe_treeview_aseditor_grid
tags: use, treeview, custom, editor, grid
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I use the Kendo UI TreeView as an editor in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to use the TreeView for batch editing in the Grid.

```dojo
   <div id="example">
		<div id="grid"></div>

		<script>
			$(document).ready(function () {
				var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service",
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
							parameterMap: function (options, operation) {
								if (operation !== "read" && options.models) {
									return { models: kendo.stringify(options.models) };
								}
							}
						},
						batch: true,
						pageSize: 20,
						schema: {
							model: {
								id: "ProductID",
								fields: {
									ProductID: { editable: false, nullable: true },
									ProductName: { validation: { required: true } },
									UnitPrice: { type: "number", validation: { required: true, min: 1 } },
									Discontinued: { type: "boolean" },
									UnitsInStock: { type: "number", validation: { min: 0, required: true } }
								},
							}
						}
					});

				$("#grid").kendoGrid({
					dataSource: dataSource,
					edit: function (e) {
						//checking if a cell from the Test column is opened for editing
						var dummyInput = e.container.find("input[name='test']");
						if (dummyInput.length > 0) {
							var treeView = $(e.container).find(".treeViewEditor").data("kendoTreeView");
							var originalItem = treeView.findByText(dummyInput.val());
							if (originalItem != null) {
								// Select the item based on the field value
								treeView.select(originalItem);
							}
						}
					},
					navigatable: true,
					pageable: true,
					height: 550,
					toolbar: ["create", "save", "cancel"],
					columns: [
						"ProductName",
						{
							field: "test", title: "Test", width: 120,
							editor: function (container, options) {
								var input = $("<input class='tveInput'/>");
								input.attr("name", options.field);
								var tvDiv = $("<div class='treeViewEditor'></div>");
								$(tvDiv).kendoTreeView({
									animation: false,
									dataSource: [
									  {
									  	text: "foo1"
									  },
									  {
									  	text: "foo2",
									  	items: [
											{ text: "bar" },
											{ text: "bar1" },
											{ text: "bar2" }
									  	]
									  }
									]
								});
								var treeView = $(tvDiv).data("kendoTreeView");
								$(tvDiv).find(".k-in").mousedown(function (e) {
									var clickedNode = $(e.toElement).closest("[role=treeitem]");
									var dataItem = treeView.dataItem(clickedNode);
									var dummyInput = clickedNode.closest("[role=gridcell]").find("input[name='test']");
									dummyInput.val(dataItem.text);
									dummyInput.trigger("change");
								});

								tvDiv.appendTo(container);
								input.appendTo(container);
							}
						},
						{ field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
						{ field: "UnitsInStock", title: "Units In Stock", width: 120 },
						{ field: "Discontinued", width: 120 },
						{ command: "destroy", title: "&nbsp;", width: 150 }],
					editable: true
				});
			});
		</script>
	</div>

	<style>
		.tveInput {
			display: none;
		}
  </style>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
