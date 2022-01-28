---
title: Incell
page_title: jQuery TreeList Documentation | Incell Editing
description: "Get started with the jQuery TreeList by Kendo UI and enable incell edit mode and batch updates."
slug: batcheditmode_kendoui_treelist
position: 3
---

# Incell Editing

The TreeList enables you to implement cell editing and make and save batch updates.

The incell (batch) edit mode renders an editor for each clicked cell and allows multiple edits. The user confirms the changes by clicking the **Save changes** button which sends the changes to the service. For a runnable example, refer to the [demo on incell editing of the TreeList](https://demos.telerik.com/kendo-ui/treelist/editing-incell).

With incell edit mode you do not need to use the command buttons for update because editing is initiated on cell click. Also, the commands in the toolbar include the **Save changes** and **Cancel changes** buttons which save or respectively cancel all changes with a single click.

Due to the specifics of the TreeList, the widget does not support the creation of a child node for a new record&mdash;in order for a child to be created, the parent node must have an assigned `id`. However, since the `id` is assigned within the service on the `create` action, when the new record is not saved, it will not have `id`. The code within the `dataBound` event ensures that the **Create child** button is removed for all new records.

The following example demonstrates how to implement the incell edit mode in the TreeList.

	$("#treelist").kendoTreeList({
		toolbar: [ "create", "save", "cancel" ],
		editable: "incell",
		dataBound: function (e) {
			var items = e.sender.items();
			for (var i = 0; i < items.length; i++) {
				var dataItem = e.sender.dataItem(items[i]);
				var row = $(items[i]);
				if (dataItem.isNew()) {
					row.find("[data-command='createchild']").hide();
				}
				else {
					row.find("[data-command='createchild']").show();
				}
			}
		},
		...
		columns: [
			...
			{ command: [{name: "createchild", text: "Add child"},"destroy" ], width: 240 }
		]
	});

## See Also

* [Incell Editing in the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/editing-incell)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
