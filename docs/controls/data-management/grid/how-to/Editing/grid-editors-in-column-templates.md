---
title: Render Grid Editor in Column Template
page_title: Render Grid Editor in Column Template | Kendo UI Grid
description: "Learn how to edit the Kendo UI Grid widget by using a column template."
slug: howto_render_editor_column_template_grid
---

# Render Grid Editor in Column Template

The example below demonstrates how to render an input editor in a column template and provide the editing functionality.

###### Example

```html
    <div id="grid"></div>
    <script>
      function onDataBound(e) {
        editAll();   
      }

      function editAll() {
        var theGrid = $("#grid").data("kendoGrid");
        $("#grid tbody").find('tr').each(function () {
          var model =  theGrid.dataItem(this);
          kendo.bind(this,model);
        });
        $("#grid").focus();
      }

      $(document).ready(function () {
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
              pageSize: 10,
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

        $("#grid").kendoGrid({
          dataSource: dataSource,

          pageable: true,
          height: 430,
          toolbar: ["create", "save", "cancel"],
          columns: [

            { template: "<input data-bind='value:ProductName' />", title: "Product Name", width: 110 },
            { template: "<input data-bind='value:UnitsInStock' />", title: "Units In Stock", width: 110 },
            { field: "Discontinued", width: 110 },
            { command: "destroy", title: "&nbsp;", width: 90 }],
          editable: true,
          dataBound: onDataBound
        });
      });
    </script>
```

## See Also

Other articles on Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Access Editor Controls in Edit Events]({% slug howto_access_editor_controlsin_edit_events_grid %})
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Customize the Delete Confirmation Dialog]({% slug howto_customize_delete_confirmation_dialog_grid %})
* [How to Delete Multiple Rows Selected with Checkboxes]({% slug howto_delete_rows_selectedwith_checkboxes_grid %})
* [How to Edit Records in Child Grids]({% slug howto_edit_recordsin_children_grid %})
* [How to Edit Records Using External Forms]({% slug howto_edit_records_using_external_forms_grid %})
* [How to Increase Popup Edit Form and Textbox Width]({% slug howto_increase_popup_edit_formand_textbox_grid %})
* [How to Preserve Dirty Indicator in Incell Editing and Client Operations]({% slug howto_preserve_dirty_indicator_incell_editing_client_operations_grid %})
* [How to Prevent Editing for Boolean Based Records]({% slug howto_prevent_editingfor_boolean_based_records_grid %})
* [How to Prevent Page Navigation in Edit Mode]({% slug howto_prevent_page_navigation_inedit_mode_grid %})
* [How to Show Custom Editor Using the Selected Item outside the Grid]({% slug howto_use_show_custom_editor_selected_item_outside_grid %})
* [How to Show Edit Buttons for Editable Records Only]({% slug howto_show_editfor_editable_records_only_grid %})
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use ASMX Service with CRUD Operations]({% slug howto_crud_web_service_grid %})
* [How to Use WCF with CRUD Operations]({% slug howto_use_wcf_service_crud_operations_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use CRUD Operations When Grid Is Bound to ASP.NET MVC Action Methods]({% slug howto_use_crud_operationswith_apsnet_action_methods_bound_grid %})
* [How to Use CRUD Operations when Grid Is Bound to Web Methods]({% slug howto_use_crud_boundto_web_methods_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use MultiSelect as CSV Editor]({% slug howto_usethe_multiselect_aseditor_commaseparated_stringfields_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on Kendo UI Grid, browse the [how-to section of articles]({% slug howto_create_custom_editors_grid %}).
