---
title: Use Kendo UI TreeView for editor in Grid
page_title: Use Kendo UI TreeView for editor in Grid
description: Use Kendo UI TreeView for editor in Grid
---

# Use Kendo UI TreeView for editor in Grid

The following runnable sample demonstrates how to use Kendo UI TreeView for batch editing in Kendo UI Grid

#### Example:
```html
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
						if (dummyInput) {
							var treeView = $(e.container).find(".treeViewEditor").data("kendoTreeView");
							var originalItem = treeView.findByText(dummyInput.val());
							if (originalItem != null) {
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
```
