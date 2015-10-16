---
title: Use AutoComplete widget as a custom column editor
page_title: Use AutoComplete widget as a custom column editor
description: Use AutoComplete widget as a custom column editor
---

# Use AutoComplete widget as a custom column editor

The following example demonstrates how to use AutoComplete widget as a custom column editor.

Note that AutoComplete works with single data item field, which means that the selected value will be directly set to the model's field.
If you would like to work with <value,text> pairs, you will need to use ComboBox, DropDownList or MultiSelect widgets.

#### Example:

```html
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
