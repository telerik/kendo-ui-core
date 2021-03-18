---
title: Toggle the grid's editable mode on and off
description: An example demonstrating how to toggle the editable mode of the Kendo UI Grid using a ToolBar button
type: how-to
page_title: Toggle Grid's editable mode | Kendo UI Grid for jQuery
slug: grid-toggle-editable-mode
tags: grid, toolbar, editable, toggle, edit
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2021.1.119</td>
 </tr>
</table>

## Description

How can I toggle the editable mode of the Grid using a button in the ToolBar?

## Solution

The Kendo UI Grid's options can be modified through the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method.

1. Create a custom button in the grid's toolbar.
1. Inside the grid's `dataBound` event obtain a reference to the button.
1. Use the `setOptions` method to set the editable mode of the grid when the button is clicked.
1. Change the text of the button to reflect the current state of the grid.
1. (Optional) If the grid has a command column, disable all of the commands when editable is false.

```
// Choose the edit mode. Options: inline, incell, popup.
let editMode = "inline";
```

```
toolbar: [{
                template: '<a class="k-button k-grid-toggleEditable" href="\\#">Toggle Readonly</a>'
            }]
```

```
    dataBound: function (ev) {
        let grid = this,
            commands = grid.content.find(".k-command-cell").children("a"),
            editable = grid.options.editable,
            toggleButton = $(".k-grid-toggleEditable");
        toggleButton.click(function (e) {
            e.preventDefault();
            if (editable) {
                // Disable edit mode if the grid is currently editable.
                grid.setOptions({ editable: false });
            } else {
                // Enable editing. 
                grid.setOptions({ editable: editMode });
            }
        });
        // Change the text of the button depending on the grid state.
        editable ? toggleButton.text("Toggle Readonly") : toggleButton.text("Toggle Editable");
        // If the grid is not editable disable the column commands.
        commands && !editable ? commands.addClass("k-state-disabled") : commands.removeClass("k-state-disabled");
    }
```

```dojo
<div id="example">
    <div id="grid"></div>
    <script>
        $(document).ready(function () {
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
                            }
                        }
                    }
                });

            // Choose the edit mode. Options: inline, incell, popup.
            let editMode = "inline";

            $("#grid").kendoGrid({
                dataSource: dataSource,
                pageable: true,
                height: 550,
                toolbar: [{
                    template: '<a class="k-button k-grid-toggleEditable" href="\\#">Toggle Readonly</a>'
                }],
                columns: [
                    { field: "ProductName", title: "Product Name", width: "200px" },
                    { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                    { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
                    { field: "Discontinued", width: "120px" },
                    { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }
                ],
                editable: editMode,
                dataBound: function (ev) {
                    let grid = this,
                        commands = grid.content.find(".k-command-cell"),
                        editable = grid.options.editable,
                        toggleButton = $(".k-grid-toggleEditable");
                    toggleButton.click(function (e) {
                        e.preventDefault();
                        if (editable) {
                            // Disable edit mode if the grid is currently editable.
                            grid.setOptions({ editable: false });
                        } else {
                            // Enable editing.
                            grid.setOptions({ editable: editMode });
                        }
                    });
                    // Change the text of the button depending on the grid state.
                    editable ? toggleButton.text("Toggle Readonly") : toggleButton.text("Toggle Editable");
                    // If the grid is not editable disable the column commands.
                    commands && !editable ? commands.children("a").addClass("k-state-disabled") : commands.children("a").removeClass("k-state-disabled");
                }
            });
        });
    </script>
</div>
```