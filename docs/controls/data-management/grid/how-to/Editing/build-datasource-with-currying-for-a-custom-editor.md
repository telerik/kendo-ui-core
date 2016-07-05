---
title: Build Custom dataSource for Custom Editor
page_title: Build Custom dataSource for Custom Editor | Kendo UI Grid
description: "Learn how to build custom dataSource with currying for a custom editor in the Kendo UI Grid widget."
slug: howto_build_custom_datasourcefor_custom_editor_grid
---

# Build Custom dataSource for Custom Editor

The example below demonstrates how to create a custom dataSource based on the data in a custom editor.

###### Example

```html
    <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <div id="example">
        <div id="grid"></div>
      <script>
        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: products,
            autoSync: true,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages"} },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} }
                }
              }
            }
          });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            columns: [
              { field:"ProductName",title:"Product Name" },
              { field: "Category", title: "Category", width: "180px", editor: categoryDropDownEditor, template: "#=Category.CategoryName#" },
              { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "130px" },
              { command: "destroy", title: " ", width: "120px" }],
            editable: true
          });
        });

        function categoryDropDownEditor(container, options) {
          $('<input required data-text-field="CategoryName" data-value-field="CategoryID" data-bind="value:' + options.field + '"/>')
          .appendTo(container)
          .kendoDropDownList({
            autoBind: false,
            dataSource: createDataSource(options.field)
          });
        }

        function createDataSource(id) {
          return new kendo.data.DataSource({
            type: "odata",
            transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
            },
            change: function() {
              alert(id);
            }
          });
        }
      </script>
    </div>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
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
