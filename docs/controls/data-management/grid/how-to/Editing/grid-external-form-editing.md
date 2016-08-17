---
title: Edit Records Using External Forms
page_title: Edit Records Using External Forms | Kendo UI Grid
description: "Learn how to edit records in Kendo UI Grid by using an external form."
slug: howto_edit_records_using_external_forms_grid
---

# Edit Records Using External Forms

The example below demonstrates how to configure editing by using a custom UI form, create editors for the `string`, `number`, and `boolean` fields, and add validation.

###### Example

```html
<div id="grid"></div>
<div id="editForm">
    <h2>Edit Form</h2>
    <ul>
        <li>
            <label for="ProductName">ProductName</label>
            <input type="text" class="k-textbox" name="ProductName" data-bind="value: selected.ProductName" required />
        </li>
        <li>
            <label for="UnitPrice">UnitPrice</label>
            <input data-role="numerictextbox" name="UnitPrice" data-bind="value: selected.UnitPrice" required min="1" />
            <span class="k-invalid-msg" data-for="UnitPrice"></span>
        </li>
        <li>
            <label for="UnitsInStock">UnitsInStock</label>
            <input data-role="numerictextbox" name="UnitsInStock" data-bind="value: selected.UnitsInStock" required min="0" />
            <span class="k-invalid-msg" data-for="UnitsInStock"></span>
        </li>
        <li>
            <label for="Discontinued"></label>
            <input type="checkbox" name="Discontinued" data-bind="checked: selected.Discontinued" />
            <span>Items is discontinued</span>
        </li>
        <li class="buttons">
            <button class="k-button btnSave" data-bind="events: { click: sync }">Save</button>
            <button class="k-button btnCancel" data-bind="events: { click: cancel }">Cancel</button>
        </li>
    </ul>
</div>
<script>
    var crudServiceBaseUrl = "http://demos.kendoui.com/service";
    var validator;
    var viewModel = kendo.observable({
        dataSource: new kendo.data.DataSource({
            transport: {
                read:  {
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
                        return {models: kendo.stringify(options.models)};
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
                        UnitPrice: { type: "number", validation: { required: true, min: 1} },
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                }
            },
            change: function () {
                viewModel.set("hasChanges", this.hasChanges());
            }
        }),
        selected: {},
        hasChanges: false,
        sync: function () {
            if(validator.validate()) {
                this.dataSource.sync();
            }
        },
        cancel: function () {
            this.dataSource.cancelChanges();
            validator.hideMessages();
        }
    });

    kendo.bind($("#editForm"), viewModel);
    validator = $("#editForm").kendoValidator().data("kendoValidator");

    var grid = $("#grid").kendoGrid({
        dataSource: viewModel.dataSource,
        pageable: true,
        height: 430,
        columns: [
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 110 },
            { field: "UnitsInStock", title: "Units In Stock", width: 110 },
            { field: "Discontinued", width: 110 }
        ],
        selectable: true,
        dataBound: function(e) {
            var row = this.tbody.find(">tr[data-uid=" + viewModel.selected.uid + "]");
            if(row) {
                this.select(row);
            }
        },
        change: function (e) {
            var model = this.dataItem(this.select());
            validator.hideMessages();
            viewModel.set("selected", model);
        }
    }).data("kendoGrid");

    $("#grid").data("kendoGrid").one("dataBound", function (e) {
        this.select(this.tbody.find(">tr:first"));
    });

</script>

<style scoped>
    #grid {
        width: 700px;
        float: left;
    }
    #editForm {
        width: 600px;
        margin: 20px;
        padding: 20px;
        float: left;
        border: 1px solid #c5c5c5;
        border-radius: 10px;
        font-size: 80%;
    }
    #editForm h2 {
        border-bottom: 1px solid #ccc;
        font-size: 1.4em;
        font-weight: normal;
        padding: 0;
        margin: 0;
    }
    #editForm ul {
        list-style-type: none;
    }
    #editForm ul li {
        margin: 10px;
    }
    #editForm ul label {
        font-weight: bold;
        display: inline-block;
        width: 90px;
        text-align: right;
    }
    #editForm label {
        display: block;
        margin-bottom: 10px;
    }
    #editForm .buttons {
        margin-top: 25px;
    }
    #editForm .k-button {
        width: 100px;
    }
</style>
```

## See Also

* [Observable Object](http://docs.telerik.com/kendo-ui/framework/mvvm/observableobject)
* [MVVM Value Binding](http://docs.telerik.com/kendo-ui/framework/mvvm/bindings/value)
* [Kendo UI Validator](http://docs.telerik.com/kendo-ui/framework/validator/overview)
* [Data Source Methods](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods)

Other articles on the Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Customize the Delete Confirmation Dialog]({% slug howto_customize_delete_confirmation_dialog_grid %})
* [How to Delete Multiple Rows Selected with Checkboxes]({% slug howto_delete_rows_selectedwith_checkboxes_grid %})
* [How to Edit Records in Child Grids]({% slug howto_edit_recordsin_children_grid %})
* [How to Increase Popup Edit Form and Textbox Width]({% slug howto_increase_popup_edit_formand_textbox_grid %})
* [How to Preserve Dirty Indicator in Incell Editing and Client Operations]({% slug howto_preserve_dirty_indicator_incell_editing_client_operations_grid %})
* [How to Render Grid Editor in Column Template]({% slug howto_render_editor_column_template_grid %})
* [How to Show Custom Editor Using the Selected Item outside the Grid]({% slug howto_use_show_custom_editor_selected_item_outside_grid %})
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
