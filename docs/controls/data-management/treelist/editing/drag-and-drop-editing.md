---
title: Drag-and-Drop
page_title: jQuery TreeList Documentation | Editing by Dragging and Dropping
description: "Get started with the jQuery TreeList by Kendo UI and enable its drag-and-drop edit mode."
slug: dragdropeditmode_kendoui_treelist
position: 4
---

# Editing by Dragging and Dropping

> Currently, the dragging and dropping of items (`editable.move = true` and `editable.move.reorderable`) is not supported with the incell edit mode of the TreeList because the draggable functionality prevents the `mousedown` event. As a result, the `change` event of the editor input does not fire, which in turn prevents the MVVM binding from saving the updated value. To work around this problem, refer to [this GitHub issue](https://github.com/telerik/kendo-ui-core/issues/4673).

When the [`editable.move`](/api/javascript/ui/treelist/configuration/editable#editable.move) option is set to `true`, the user can drag and drop the rows and the TreeList internally updates the `parentId` field. Setting the [`editable.move.reorderable`](/api/javascript/ui/treelist/configuration/editable#editable.move.reorderable) property to `true` enables users not only to move items to a different level in the hierarchy but also allows users to reorder items within a particular hierarchy level.

To persist the new hierarchy, configure the TreeList data source for CRUD operations and set `transport.update` as a bare minimum. For a runnable example, refer to the [demo on editing by dragging and dropping the rows of the TreeList](https://demos.telerik.com/kendo-ui/treelist/dragdrop).

The following example demonstrates how to enable the batch data source and the editable move configuration.

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

* [Editing by Dragging and Dropping in the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/dragdrop)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
