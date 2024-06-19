---
title: Prevent Editing while Grid Is in Edit Mode
description: Learn how to prevent editing while the Kendo UI Grid is in edit mode.
type: how-to
page_title: Prevent Adding New Records and Editing while in Edit Mode - Kendo UI for jQuery Data Grid
slug: grid-prevent-editing-when-editing
tags: grid, editing, prevent
ticketid: 1168745
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.2.516</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Grid for jQuery</td>
	</tr>
</table>

## Description

How can I disable the adding and editing of records in a Grid in inline edit mode while the user is actually adding or creating a record?

>note This solution is custom and might lead to unexpected side effects. You will need to adjust it according to your Grid configuration and use-case.

## Solution

1. Handle the [`mousedown`](https://api.jquery.com/mousedown/) event of the Grid for all buttons that do not have the `.k-grid-cancel-command` and `.k-grid-save-command` classes.
1. In the `mousedown` event handler, check if a `.k-grid-edit-row` class exists in the Grid. Based on the result, prevent the default behavior.

```dojo
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
            pageable: true,
            height: 550,
            toolbar: ["create"],
            sortable: true,
            filterable: true,
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
                    command: ["edit", "destroy"],
                    title: "&nbsp;",
                    width: "250px"
                }
            ],
            editable: "inline"
        });

        $(".k-grid").on("mousedown", ".k-button:not('.k-grid-cancel-command,.k-grid-save-command')", function(e) {
            var grid = $(this).closest(".k-grid");
            var editRow = grid.find(".k-grid-edit-row");

            if (editRow.length > 0) {
                alert("Please complete the editing operation before editing another row");
                e.preventDefault();
            }
        });
    });
</script>
```
