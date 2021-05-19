---
title: Use Context Menu to Perform Actions on Grid Rows
description: An example on how to add, edit, and delete rows by using the ContextMenu in the Kendo UI Grid.
type: how-to
page_title: Add, Edit, or Remove Rows with the ContextMenu | Kendo UI Grid for jQuery
slug: grid-contextmenu-add-edit-delete-rows
tags: grid, add, edit, delete, contextmenu
ticketid: 1142072
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>


## Description

How can I use the Kendo UI ContextMenu to add, edit, and delete rows in the Kendo UI Grid?

## Solution

1. Create a Kendo UI ContextMenu that will have the desired actions.
1. Set the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu/configuration/filter) of the ContextMenu to `td`.
1. In the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu/events/select) event handler of the ContextMenu:
	1. Get the row of the `target`.
	1. Based on the selection and in a `switch/case`, invoke the relevant method of the Grid.

```dojo
<div id="example">
    <div id="grid"></div>
    <ul id="context-menu">
        <li id="addRow">Add Row</li>
        <li id="editRow">Edit Row</li>
        <li id="removeRow">Remove Row</li>
    </ul>

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
                pageable: true,
                height: 550,
                columns: [
                    "ProductName",
                    {
                        field: "UnitPrice",
                        title: "Unit Price",
                        format: "{0:c}",
                        width: "120px"
                    },
                    {
                        field: "UnitsInStock",
                        title: "Units In Stock",
                        width: "120px"
                    },
                    {
                        field: "Discontinued",
                        width: "120px"
                    }
                ],
                editable: "inline"
            });

            $("#context-menu").kendoContextMenu({
                target: "#grid",
                filter: "td",
                select: function(e) {
                    var row = $(e.target).parent()[0];
                    var grid = $("#grid").data("kendoGrid");
                    var item = e.item.id;

                    switch (item) {
                        case "addRow":
                            grid.addRow();
                            break;
                        case "editRow":
                            grid.editRow(row);
                            break;
                        case "removeRow":
                            grid.removeRow(row);
                            break;
                        default:
                            break;
                    };
                }
            });

            $(document).on("mousedown", "td", function(e) {
                setTimeout(function() {
                    $("#grid").data("kendoGrid").saveRow();
                })
            });
        });
    </script>
</div>
```
