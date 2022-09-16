---
title: Use Radio Buttons as Custom Grid Editor
description: An example on how to use radio buttons as a custom editor in the Kendo UI Grid.
type: how-to
page_title: Use Radio Buttons as Custom Editor | Kendo UI Grid for jQuery
slug: radio-buttons-custom-editor
tags: radio buttons, grid, editor
ticketid: 1117548
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
  <td>Tested up to version 2017.2 621</td>
 </tr>
</table>

## Description

How can I use radio buttons as a custom editor in the Kendo UI Grid?

## Solution

To create an editor with radio buttons:

1. Configure a [`columns.editable`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.editable) function that will always return `false`.
1. Configure a [`columns.template`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template)  function.
    1. Get the current value based on the [`dataItem`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem).
    1. Add a radio button for every value in an array.
    1. Based on the current value, select the relevant radio button.
1. Subscribe to the `click` event of the buttons.
1. In the `click` event handler, [`set`](https://docs.telerik.com/kendo-ui/api/javascript/data/model/methods/set) the new value of the `dataItem`.

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
                                editable: true,
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
                filterable: true,
                groupable: true,
                pageable: true,
                height: 540,
                toolbar: ["create"],
                columns: [{
                        field: "ProductName",
                        title: "Product Name"
                    },
                    {
                        field: "CategoryID",
                        width: "200px",
                        title: "Category",
                        template: templateFunction,
                        editable: function() {
                            return false
                        }
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

        function templateFunction(dataItem) {
            var cell = "";
            var category = dataItem.CategoryID - 1;

            for (var i = 0; i < categories.length; i++) {
                var item = "";

                item += "<label>"
                 if (category === i) {
                    item += "<input type='radio' class='k-radio k-radio-md' name='" + dataItem.uid + "' onclick='setDataItem(this);' checked=checked />";
                } else {
                    item += "<input type='radio' class='k-radio k-radio-md' name='" + dataItem.uid + "' onclick='setDataItem(this);'/>";
                }
                item += categories[i].text;
                item += "</label>"
                item += "</br>";

                cell += item;
            }
            return cell;
        };

        function setDataItem(item) {
            var grid = $("#grid").data("kendoGrid");
            var row = $(item).closest("tr");
            var dataItem = grid.dataItem(row);
            var category = $(item)[0].labels[0].innerText;
            var ID;

            for (var i = 0; i < categories.length; i++) {
                if (categories[i].text === category) {
                    ID = i;
                    break;
                }
            };

            dataItem.set("CategoryID", ID + 1);
        };
    </script>
</div>
```

## See Also

* [Demo on Custom Editing in the Grid](https://demos.telerik.com/kendo-ui/grid/editing-custom)
