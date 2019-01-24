---
title: Preserve Dirty Indicator in Incell Editing and Client Operations
page_title: jQuery Grid Documentation | Preserve Dirty Indicator | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to preserve dirty indicator in incell editing and client operations."
slug: howto_preserve_dirty_indicator_incell_editing_client_operations_grid
---

# Preserve Dirty Indicator in Incell Editing and Client Operations

Your project might require you to preserve the dirty indicator in in-cell editing and client operations.

The following example demonstrates how to achieve this behavior also in case new rows are added to the Grid.

> **Important**
>  
> The Kendo UI R3 2017 release provides the preservation of the dirty indicator as a built-in functionality.

###### Example

```dojo
    <div id="grid"></div>
    <script>
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
        dataSource = new kendo.data.DataSource({
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
            change: function(e){
                if(e.action == "itemchange"){
                    e.items[0].dirtyFields = e.items[0].dirtyFields || {};
                    e.items[0].dirtyFields[e.field] = true;
                }
            },
            batch: true,
            pageSize: 30,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { editable: false, nullable: true },
                        ProductName: { validation: { required: true } },
                        UnitPrice: { type: "number", validation: { required: true, min: 1, max: 10} },
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                }
            }
        });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            pageable: true,
            navigatable: true,
            height: 400,
            toolbar: ["create", "save", "cancel"],
            columns: [
                {field: "ProductName", template: "#=dirtyField(data,'ProductName')# #:ProductName#"},
                { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "150px",
                template: "#=dirtyField(data,'UnitPrice')# #:kendo.toString(UnitPrice,'c')#"},
                { field: "UnitsInStock", title: "Units In Stock", width: 150, template: "#=dirtyField(data,'UnitsInStock')# #:UnitsInStock#" },
                { field: "Discontinued", width: 100, template: "#=dirtyField(data,'Discontinued')# #:Discontinued#" },
                { command: "destroy", title: "&nbsp;", width: 110 }],
            editable: true
        });

        function dirtyField(data, fieldName){
            if(data.dirty && data.dirtyFields[fieldName]){
                return "<span class='k-dirty'></span>"
            }
            else{
                return "";
            }
        }
    </script>

```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Customize the Delete Confirmation Dialog]({% slug howto_customize_delete_confirmation_dialog_grid %})
* [How to Delete Multiple Rows Selected with Checkboxes]({% slug howto_delete_rows_selectedwith_checkboxes_grid %})
* [How to Edit Records in Child Grids]({% slug howto_edit_recordsin_children_grid %})
* [How to Edit Records Using External Forms]({% slug howto_edit_records_using_external_forms_grid %})
* [How to Increase Popup Edit Form and Textbox Width]({% slug howto_increase_popup_edit_formand_textbox_grid %})
* [How to Render Grid Editor in Column Template]({% slug howto_render_editor_column_template_grid %})
* [How to Show Custom Editor Using the Selected Item outside the Grid]({% slug howto_use_show_custom_editor_selected_item_outside_grid %})
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
