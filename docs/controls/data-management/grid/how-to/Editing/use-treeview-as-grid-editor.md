---
title: Use TreeView as Custom Editor
page_title: Use TreeView as Custom Editor | Kendo UI Grid
description: "Learn how to use Kendo UI TreeView as an editor in the Kendo UI Grid widget."
slug: howto_usethe_treeview_aseditor_grid
---

# Use TreeView as Custom Editor

The example below demonstrates how to use Kendo UI TreeView for batch editing in the Kendo UI Grid widget.

###### Example

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
  </style>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Customize the Delete Confirmation Dialog]({% slug howto_customize_delete_confirmation_dialog_grid %})
* [How to Delete Multiple Rows Selected with Checkboxes]({% slug howto_delete_rows_selectedwith_checkboxes_grid %})
* [How to Edit Records in Child Grids]({% slug howto_edit_recordsin_children_grid %})
* [How to Edit Records Using External Forms]({% slug howto_edit_records_using_external_forms_grid %})
* [How to Increase Popup Edit Form and Textbox Width]({% slug howto_increase_popup_edit_formand_textbox_grid %})
* [How to Preserve Dirty Indicator in Incell Editing and Client Operations]({% slug howto_preserve_dirty_indicator_incell_editing_client_operations_grid %})
* [How to Render Grid Editor in Column Template]({% slug howto_render_editor_column_template_grid %})
* [How to Show Custom Editor Using the Selected Item outside the Grid]({% slug howto_use_show_custom_editor_selected_item_outside_grid %})
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
