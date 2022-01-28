---
title: Copy Cell Content in Grid by Using Context Menu
description: An example on how to use context menu for copying cell content in Kendo Grid.
type: how-to
page_title: Copy Text in Cells with Context Menu | Kendo UI Grid for jQuery
slug: grid-copy-text-context-menu
tags: kendoui, kendo, grid, column, content, copy, menu, selection
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

I have a Kendo UI Grid with its selection features enabled and I cannot select the text over a mouse-drag action.  

How can I use the context menu to copy the contents of a Grid cell?

## Solution

1. Reference the third-party [clipboard.js library](https://clipboardjs.com/).
1. Add the Kendo UI ContextMenu that targets the Grid component.
1. Handle the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu/events/select) events of the ContextMenu and push the cell content to the clipboard.

```dojo
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js"></script>

<div id="grid"></div>
<ul id="context-menu">
    <li id="copyText">Copy Text</li>
</ul>

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
            selectable: "multiple",
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
            select: function (e) {
                var cell = e.target;
                var row = $(cell).parent()[0];
                var grid = $("#grid").data("kendoGrid");
                var itemId = e.item.id;

                var cellText = cell.innerText;

                if (itemId === 'copyText') {
                    new Clipboard('#copyText', {
                        text: function (trigger) {
                            return cellText;
                        }
                    });
                };
            }
        });

        $(document).on("mousedown", "td", function (e) {
            setTimeout(function () {
                $("#grid").data("kendoGrid").saveRow();
            })
        });
    });
</script>
```
