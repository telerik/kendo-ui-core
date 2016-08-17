---
title: Prevent Editing for Boolean Based Records
page_title: Prevent Editing for Boolean Based Records | Kendo UI Grid
description: "Learn how to prevent editing for records based on Boolean values in the Kendo UI Grid widget."
slug: howto_prevent_editingfor_boolean_based_records_grid
---

# Prevent Editing for Boolean Based Records

The example below demonstrates how to prevent editing for a record based on a Boolean field in the data item.

###### Example

```html
    <h3>You are allowed to edit only products that are not discontinued</h3>
    <div id="grid"></div>

    <script>
      $(document).ready(function () {
        var dataSource1 = new kendo.data.DataSource({
          data: [
            {
              ProductName: "Product1",
              Discontinued: false
            },
            {
              ProductName: "Product2",
              Discontinued: true
            }
          ],
          schema: {
            model: {
              fields: {
                ProductName: { validation :{ required: true}, type: "string" },
                Discontinued: { type: "boolean" }
              }}
          },
          pageSize: 20
        });  
        var grid = $("#grid").kendoGrid({
          dataSource: dataSource1,
          pageable: true,
          height: 500,
          toolbar: ["create"],
          columns: [
            { field: "ProductName", title: "Product Name", width: "200px",
             editor: CustomEditor
            },
            { field: "Discontinued", width: "100px" }],
          editable: "incell",
        }).data("kendoGrid");

        function CustomEditor(container, options) {
          if(!options.model.Discontinued){
            var input = $('<input required validationMessage="This field is required" data-text-field="'
                          + options.field +'" data-value-field="'
                          + options.field +'" data-bind="value:'
                          + options.field +'"/>');
            $(container).append(input);
          }
          else{
            var input = kendo.toString(options.model[options.field]);
            $(container).text(input);
            $(container).toggleClass("k-edit-cell");
          }
        };
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
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
