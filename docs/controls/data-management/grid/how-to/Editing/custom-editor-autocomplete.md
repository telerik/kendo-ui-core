---
title: Use AutoComplete as Custom Column Editor
page_title: Use AutoComplete as Custom Column Editor | Kendo UI Grid
description: "Learn how to use AutoComplete as a custom column editor in the Kendo UI Grid widget."
slug: howto_use_autocompleteas_custom_column_editor_grid
---

# Use AutoComplete as Custom Column Editor

The example below demonstrates how to use the AutoComplete widget as a custom column editor.

> **Important**  
> Kendo UI AutoComplete works with a single data item field, which means that the selected value is directly set to the `model` field. If you want to work with `<value,text>` pairs, use the ComboBox, DropDownList, or MultiSelect widgets.

###### Example

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

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Customize the Delete Confirmation Dialog]({% slug howto_customize_delete_confirmation_dialog_grid %})
* [How to Delete Multiple Rows Selected with Checkboxes]({% slug howto_delete_rows_selectedwith_checkboxes_grid %})
* [How to Edit Records in Child Grids]({% slug howto_edit_recordsin_children_grid %})
* [How to Edit Records Using External Forms]({% slug howto_edit_records_using_external_forms_grid %})
* [How to Increase Popup Edit Form and Textbox Width]({% slug howto_increase_popup_edit_formand_textbox_grid %})
* [How to Preserve Dirty Indicator in Incell Editing and Client Operations]({% slug howto_preserve_dirty_indicator_incell_editing_client_operations_grid %})
* [How to Render Grid Editor in Column Template]({% slug howto_render_editor_column_template_grid %})
* [How to Show Custom Editor Using the Selected Item outside the Grid]({% slug howto_use_show_custom_editor_selected_item_outside_grid %})
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
