---
title: Editing
page_title: Editing | Kendo UI TreeList
description: "Learn how to configure Kendo UI TreeList widget for enabling CRUD operations."
slug: editing_kendoui_treelist_widget
position: 2
---

# TreeList Editing

The [Kendo UI TreeList widget](http://demos.telerik.com/kendo-ui/treelist/index) provides build-in editing functionality in three different edit modes: PopUp, InLine, InCell(Batch) and features Drag and Drop.

## Prerequisite

### Model

All CRUD operations of the Kendo UI TreeList require a model with `id` and `parentId` fields and those models must be configured in the DataSource of the TreeList. The Kendo UI TreeList distinguishes the root items based on the `parentId` field. If the `schema.model.fields.[parentIdField]` is nullable, root items with be items whose `parentId` field values are `null`. If the `schema.model.fields.[parentIdField]` is *not* nullable, root items will be items which have a default value for their data type.

###### Example

	var dataSource = new kendo.data.TreeListDataSource({
        schema: {
            model: {
                id: "IdField",
                parentId: "ParentIdField",
                ...


### Transport configuration

Once the schema is configured, you need to configure the `transport` actions for `update`, `destroy`, and `create`.

###### Example

	var dataSource = new kendo.data.TreeListDataSource({
        transport: {
            read: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                dataType: "jsonp"
            },
            update: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                dataType: "jsonp"
            },
            destroy: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Destroy",
                dataType: "jsonp"
            },
            create: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                }
            }
        },

An important part of the CRUD operations is the response from the service, which needs to return the manipulated records, so that the TreeList can apply the changes to the DataSource accordingly. The new records should also contain the newly assigned within the service `id` value.

### Popup and Inline Editing

To enable the popup and inline edit modes you need to configure the "toolbar", so it could display "Add new record" button and you will also have to define a command column for the "Update", "Delete" and **Add child** buttons:

###### Example

    $("#treelist").kendoTreeList({
        toolbar: [ "create" ],
        editable: "popup", //or "inline"
        columns: [
            { field: "FirstName", expandable: true, title: "First Name", width: 250 },
            { field: "LastName", title: "Last Name" },
            { field: "Position" },
            { field: "Phone", title: "Phone" },
            { field: "Extension", title: "Ext", format: "{0:#}" },
            { command: [{name: "createchild", text: "Add child"},"edit", "destroy" ], width: 300 }
        ],
      ...
    });

The only difference between the inline and popup edit modes is the position of the rendered editors. With the popup editing, the editors are rendered in a modal window and with the inline edit mode, the editors are rendered in the TR element of the edited record.

### In-Cell Editing

The in-cell edit mode renders editor per field when the user clicks on a particular cell of the record. It allows multiple edits before the **Save changes** button is clicked, which can then send all changes to the service.

###### Example

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

With in-cell (Batch) edit mode you do not need to use the command buttons for update, because editing is initiated on cell click. Another difference from the other two edit modes are the commands in the toolbar, which include the "Save changes" and "Cancel changes" buttons for saving or canceling all changes with a single click.

Due to the specifics of the TreeList, creating child node for a new record is not supported, because in order for a child to be created, the parent node must have an assigned `id`. However, since the `id` is assigned within the service on the `create` action, when the new record is not saved, it will not have `id`. The code within the `dataBound` event ensures that the **Create child** button is removed for all new records.

### Drag and Drop

> Currently, the dragging and dropping of items (`editable.move = true`) is not supported with the in-cell edit mode of the TreeList because the draggable functionality prevents the `mousedown` event. As a result, the `change` event of the editor input does not fire, which in turn prevents the MVVM binding from saving the updated value. To work around this problem, refer to [this GitHub issue](https://github.com/telerik/kendo-ui-core/issues/4673).

When the [`editable.move`](/api/javascript/ui/treelist/configuration/editable#editable.move) option is set to `true` the rows can be dragged and dropped. The Kendo UI TreeList internally updates the `parentId` field. To persist the new hierarchy, configure the treelist data source for CRUD operations ***(transport.update as a minimum)***.

###### Example - TreeList with a batch data source and editable move configuration

```dojo
    <div id="treelist"></div>

    <script>
        $(document).ready(function () {
            var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

            var dataSource = new kendo.data.TreeListDataSource({
                    transport: {
                        read:  {
                            url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                            dataType: "jsonp"
                        },
                        update: {
                            url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                            dataType: "jsonp"
                        },
                        parameterMap: function(options, operation) {
                            if (operation !== "read" && options.models) {
                                return {models: kendo.stringify(options.models)};
                            }
                        }
                    },
                    batch: true,
                    schema: {
                        model: {
                            id: "EmployeeId",
                            parentId: "ReportsTo",
                            fields: {
                                EmployeeId: { type: "number", editable: false, nullable: false },
                                ReportsTo: { nullable: true, type: "number" },
                                FirstName: { validation: { required: true } },
                                LastName: { validation: { required: true } },
                                HireDate: { type: "date" },
                                Phone: { type: "string" },
                                HireDate: { type: "date" },
                                BirthDate: { type: "date" },
                                Extension: { type: "number", validation: { min: 0, required: true } },
                                Position: { type: "string" }
                            },
                            expanded: true
                        }
                    }
                });

            $("#treelist").kendoTreeList({
                dataSource: dataSource,
                toolbar: [ "save" ],
                editable: {
                    move: true
                },
                height: 540,
                columns: [
                    { field: "FirstName", expandable: true, title: "First Name", width: 220 },
                    { field: "LastName", title: "Last Name", width: 100 },
                    { field: "Position" },
                    { field: "HireDate", title: "Hire Date", format: "{0:MMMM d, yyyy}" },
                    { field: "Phone", title: "Phone" },
                    { field: "Extension", title: "Ext", format: "{0:#}" }
                ]
            });
        });
    </script>
```

## See Also

* [JavaScript API Reference](/api/javascript/ui/treelist)
