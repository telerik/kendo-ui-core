---
title: Conditionally Make the DropDownList Editor Readonly
description: An example on how to make the custom DropDownList editor readonly in the Kendo UI Grid.
type: how-to
page_title: Disable the DropDownList Editor| Kendo UI Grid
slug: grid-dropdown-editor-readonly
tags: grid, dropdownlist, readonly, editor
ticketid: 1133104
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.913 version</td>
 </tr>
</table>

## Description

How can I make the drop-down editor readonly based on a condition in the Kendo UI Grid?

## Solution

1. Handle the [`edit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/edit) event of the Grid.
2. In  the event handler and based on a condition, use the [`readonly`](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/methods/readonly) method.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js" type="text/javascript"></script>
<div id="example">
    <div id="grid"></div>

    <script>
        var categories = [{
            "value": 1,
            "text": "Beverages"
        }, {
            "value": 2,
            "text": "Condiments"
        }, {
            "value": 3,
            "text": "Confections"
        }, {
            "value": 4,
            "text": "Dairy Products"
        }, {
            "value": 5,
            "text": "Grains/Cereals"
        }, {
            "value": 6,
            "text": "Meat/Poultry"
        }, {
            "value": 7,
            "text": "Produce"
        }, {
            "value": 8,
            "text": "Seafood"
        }];

        $(document).ready(function() {
            var dataSource = new kendo.data.DataSource({
                pageSize: 20,
                data: products,
                autoSync: true,
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
                            CategoryID: {
                                field: "CategoryID",
                                type: "number",
                                defaultValue: 1
                            },
                            UnitPrice: {
                                type: "number",
                                validation: {
                                    required: true,
                                    min: 1
                                }
                            }
                        }
                    }
                }
            });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                pageable: true,
                edit: function(e) {
                    var price = e.model.UnitPrice;
                    var dropDown = e.container.find("[data-role='dropdownlist']").data("kendoDropDownList");
                    if (dropDown && price > 25) {
                        dropDown.readonly();
                    }
                },
                height: 540,
                toolbar: ["create"],
                columns: [{
                        field: "ProductName",
                        title: "Product Name"
                    },
                    {
                        field: "CategoryID",
                        width: "200px",
                        values: categories,
                        title: "Category"
                    },
                    {
                        field: "UnitPrice",
                        title: "Unit Price",
                        format: "{0:c}",
                        width: "200px"
                    },
                    {
                        command: "destroy",
                        title: " ",
                        width: "150px"
                    }
                ],
                editable: true
            });
        });
    </script>
</div>
```
