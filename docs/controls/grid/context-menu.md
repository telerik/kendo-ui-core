---
title: Context Menu
page_title: jQuery Grid Documentation - Context Menu
description: "Get started with the jQuery Grid by Kendo UI and learn how to enable the ContextMenu."
components: ["grid"]
slug: context_menu_kendoui_grid
position: 17
---

# Context Menu

Starting with the 2023 R3 release the Grid component allows you to display built-in ContextMenu.

For a runnable example, refer to the [demo on ContextMenu in the Grid](https://demos.telerik.com/kendo-ui/grid/context-menu).

## Getting Started

To enable the ContextMenu functionality, set the [`contextmenu`](/api/javascript/ui/grid/configuration/contextmenu) property to `true`.

```
     $("#grid").kendoGrid({
        contextMenu: true,
        // Other configuration.
     });
```

## Predefined Tools

The Grid component allows you to choose between a predefined list of commands that will be included in the ContextMenu. You can add the needed tools in the [`contextmenu.body`](/api/javascript/ui/grid/configuration/contextmenu.body) configuration option.
The valid predefined tools are: *"separator", "create", "edit", "destroy", "select", "copySelection",."copySelectionNoHeaders", "reorderRow", "exportPDF", "exportExcel", "sortAsc", "sortDesc".*
In the example below all predefined commands are included in a customized order.

```dojo
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    <div id="example">
    	<div id="grid"></div>

    	<script>
    		$(document).ready(function () {
    			var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
    				dataSource = new kendo.data.DataSource({
    					transport: {
    						read: {
    							url: crudServiceBaseUrl + "/Products"
    						},
    						update: {
    							url: crudServiceBaseUrl + "/Products/Update",
    							type: "POST",
          						contentType: "application/json"
    						},
    						destroy: {
    							url: crudServiceBaseUrl + "/Products/Destroy",
    							type: "POST",
          						contentType: "application/json"
    						},
    						create: {
    							url: crudServiceBaseUrl + "/Products/Create",
    							type: "POST",
          						contentType: "application/json"
    						},
    						parameterMap: function (options, operation) {
    							if (operation !== "read" && options.models) {
    								return kendo.stringify(options.models);
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
    							}
    						}
    					}
    				});

    			$("#grid").kendoGrid({
    				contextMenu: {
    					body: [
    						"create",
    						"edit",
    						"destroy",
    						"separator",
    						"select", "copySelection", "copySelectionNoHeaders",
    						"separator",
    						"reorderRow",
    						"separator",
    						"exportPDF", "exportExcel",
    						"separator",
    						"sortAsc", "sortDesc"
    					]
    				},
    				excel: {
    					fileName: "Kendo UI Grid Export.xlsx",
    					allPages: true
    				},
    				persistSelection: true,
    				dataSource: dataSource,
    				selectable: "multiple, rows",
    				sortable: true,
    				reorderable: {
    					rows: true
    				},
    				pdf: {
    					allPages: true,
    					paperSize: "A4",
    					landscape: true
    				},
    				pageable: true,
    				height: 550,
    				columns: [
    					{ field: "ProductName", title: "Product Name" },
    					{ field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
    					{ field: "UnitsInStock", title: "Units In Stock", width: "120px" },
    					{ field: "Discontinued", width: "120px" }],
    				editable: true
    			});
    		});
    	</script>
    </div>
```

## Custom Command

You can add a custom command to the ContextMenu and implement the desired behavior. 
The example below demonstrates how the pages in the Grid can be changed using custom commands in the ContextMenu.

```dojo
    <div id="grid"></div>

	<script>
		$(document).ready(function () {
			var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
				dataSource = new kendo.data.DataSource({
					transport: {
						read: {
							url: crudServiceBaseUrl + "/Products"
						},
						update: {
							url: crudServiceBaseUrl + "/Products/Update",
							type: "POST",
          					contentType: "application/json"
						},
						destroy: {
							url: crudServiceBaseUrl + "/Products/Destroy",
							type: "POST",
          					contentType: "application/json"
						},
						create: {
							url: crudServiceBaseUrl + "/Products/Create",
							type: "POST",
          					contentType: "application/json"
						},
						parameterMap: function (options, operation) {
							if (operation !== "read" && options.models) {
								return kendo.stringify(options.models);
							}
						}
					},
					batch: true,
					pageSize: 10,
					schema: {
						model: {
							id: "ProductID",
							fields: {
								ProductID: { editable: false, nullable: true },
								ProductName: { validation: { required: true } },
								UnitPrice: { type: "number", validation: { required: true, min: 1 } },
								Discontinued: { type: "boolean" },
								UnitsInStock: { type: "number", validation: { min: 0, required: true } }
							}
						}
					}
				});

			$("#grid").kendoGrid({
				contextMenu: {
					body: [
						{ name: "MyCustomPrevPage", text: "My Custom Previous Page", icon: "caret-alt-left", command: "CustomPrevCommand" },
						{ name: "MyCustomNextPage", text: "My Custom Next Page", icon: "caret-alt-right", command: "CustomNextCommand" }						
					]
				},
				editable: false,
				pageable: true,
				dataSource: dataSource,
			});

			kendo.ui.grid.commands["CustomNextCommand"] = kendo.ui.grid.GridCommand.extend({
				exec: function () {
					var that = this,
						grid = that.grid;
						var nextPage = grid.dataSource.page() + 1;
					if (nextPage <= grid.dataSource.totalPages()){
						grid.dataSource.page(nextPage)
					}
				}
			});

			kendo.ui.grid.commands["CustomPrevCommand"] = kendo.ui.grid.GridCommand.extend({
				exec: function () {
					var that = this,
						grid = that.grid;
					var prevPage = grid.dataSource.page() - 1;
					if (prevPage >= 1) {
						grid.dataSource.page(prevPage)
					}
				}
			});
		});
	</script>

```

## See Also

* [Context Menu in the Kendo UI for jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/context-menu)
* [JavaScript API Reference of the Kendo UI for jQuery Grid](/api/javascript/ui/grid)
