---
title: Customize Confirmation Window
page_title: Customize Confirmation Window | Kendo UI Grid
description: "Learn how to customize a confirmation dialog in the Kendo UI Grid widget."
previous_url: /web/grid/how-to/Editing/grid-custom-delete-confirmation-window
slug: howto_customize_delete_confirmation_dialog_grid
---

# Customize Confirmation Window

The example below demonstrates how to customize the default **Delete** confirmation alert box by using Kendo UI templates, the Window widget, and the `remove` dataSource method of Kendo UI Grid.

###### Example

```html
<div id="grid"></div>
<div id="window"></div>

<script type="text/x-kendo-template" id="windowTemplate">
    Delete <strong>#= ProductName #</strong> ? </p>
    We have #= UnitsInStock # units in stock. </p>
    <button class="k-button" id="yesButton">Yes</button>
    <button class="k-button" id="noButton"> No</button>
</script>

<script>
    $(document).ready(function () {
        var windowTemplate = kendo.template($("#windowTemplate").html());
        var crudServiceBaseUrl = "http://demos.kendoui.com/service",
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
            }
        });

        var window = $("#window").kendoWindow({
            title: "Are you sure you want to delete this record?",
            visible: false, //the window will not appear before its .open method is called
            width: "400px",
            height: "200px",
        }).data("kendoWindow");


        var grid = $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 430,
            toolbar: ["create"],
            columns: [
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}"},
            { field: "UnitsInStock", title:"Units In Stock"},
            { field: "Discontinued"},
            { command: [
                {name: "edit"},
                {name: "Delete",  
                    click: function(e){  //add a click event listener on the delete button
                        var tr = $(e.target).closest("tr"); //get the row for deletion
                        var data = this.dataItem(tr); //get the row data so it can be referred later
                        window.content(windowTemplate(data)); //send the row data object to the template and render it
                        window.open().center();  

                        $("#yesButton").click(function(){
                            grid.dataSource.remove(data)  //prepare a "destroy" request
                            grid.dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
                            window.close();
                        })
                        $("#noButton").click(function(){
                            window.close();
                        })
                    }                              
                }
                ]}],
            editable: {
                mode: "inline"
            }
        }).data("kendoGrid");
    });
</script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Delete Multiple Rows Selected with Checkboxes]({% slug howto_delete_rows_selectedwith_checkboxes_grid %})
* [How to Edit Records in Child Grids]({% slug howto_edit_recordsin_children_grid %})
* [How to Edit Records Using External Forms]({% slug howto_edit_records_using_external_forms_grid %})
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
