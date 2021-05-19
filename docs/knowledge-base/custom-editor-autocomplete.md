---
title: Use AutoComplete as Custom Column Editor
page_title: AutoComplete as Column Editor | Kendo UI Grid for jQuery
description: "An example on how to use the Kendo UI AutoComplete as a custom column editor for the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/custom-editor-autocomplete
slug: howto_use_autocompleteas_custom_column_editor_grid
tags: grid, autocomplete, custom, column, editor
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I use the Kendo UI AutoComplete as a custom column editor for the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to use the AutoComplete as a custom column editor of the Grid.

> The AutoComplete works with a single data item field. This means that the selected value is directly set to the `model` field. If you want to work with `<value,text>` pairs, use the ComboBox, DropDownList, or MultiSelect.

```dojo
<div id="grid"></div>
<h4>Change = <span id="grid-change"></span></h4>
<script>
$(document).ready(function () {

    var traderListDataSource = new kendo.data.DataSource({
        data: [{
            userName: "Fred",
            userUrl: "user.webapi.url/Fred"
        }, {
            userName: "Bert",
            userUrl: "user.webapi.url/Bert"
        }, {
            userName: "Frank",
            userUrl: "user.webapi.url/Frank"
        }, {
            userName: "Ginger",
            userUrl: "user.webapi.url/Ginger"
        }],
        schema: {
            model: {
                id: "url",
                fields: {
                    url: {
                        type: "string"
                    },
                    userName: {
                        type: "string"
                    }
                }
            }
        }
    });

    function userNameComboBoxEditor(container, options) {
        $('<input required data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                dataSource: traderListDataSource,
                dataTextField: "userName",
                dataValueField: "userUrl"
            });
    }

    function userNameAutoCompleteEditor(container, options) {
        $('<input required data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoAutoComplete({
            dataSource: traderListDataSource,
            dataTextField: "userName",
            filter: "contains",
            minLength: 1
        });
    }

    var gridDataSource = new kendo.data.DataSource({
        data: [{
            user: {
                userName: "Fred",
                userUrl: "user.webapi.url/Fred"
            },
            productName: "ProductA",
            productUrl: "product.webapi.url/ProductA",
            amount: 123
        }, {
            user: {
                userName: "Bert",
                userUrl: "user.webapi.url/Bert"
            },
            productName: "ProductB",
            productUrl: "product.webapi.url/ProductB",
            amount: 456
        }, {
            user: {
                userName: "Bing",
                userUrl: "user.webapi.url/Bing"
            },
            productName: "ProductC",
            productUrl: "product.webapi.url/ProductC",
            amount: 456
        }],
        schema: {
            model: {
                fields: {
                    productName: {
                        type: "string"
                    },
                    amount: {
                        type: "number"
                    }
                }
            }
        },
        change: function (e) {
            var message = "userName " + e.items[0].user.userName + " userUrl " + e.items[0].user.userUrl;
            $("#grid-change").html(message);
        }
    });

    var grid = $("#grid").kendoGrid({
        editable: true,
        dataSource: gridDataSource,
        columns: [{
            field: "user",
            template: "#:user.userName#",
            title: "User Name",
            //editor: userNameComboBoxEditor
            editor: userNameAutoCompleteEditor
        }, {
            field: "productName",
            title: "Product Name"
        }, {
            field: "amount"
        }]
    }).data("kendoGrid");
});
</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
