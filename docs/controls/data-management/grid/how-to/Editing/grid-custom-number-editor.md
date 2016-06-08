---
title: Create Custom Number Editor Using NumericTextBox
page_title: Create Custom Number Editor Using NumericTextBox | Kendo UI Grid
description: "Learn how to create a custom number editor in kendo UI Grid widget using Kendo UI NumericTextBox."
slug: howto_create_custom_number_editor_numerictextbox_grid
---

# Create Custom Number Editor Using NumericTextBox

The example below demonstrates how to create a Kendo UI Grid widget with a custom number editor using Kendo UI NumericTextBox.

###### Example

```html
  <div>I want to change 11.11% discount to 22.22% via editing. But 22.00% is thrown back at input of 0.2222</div>
  <div id="grid"/>
  <script>
    $(document).ready(function(){
      $("#grid").kendoGrid({
        columns:[
          {
            field: "FirstName",
            title: "First Name"
          },
          {
            field: "LastName",
            title: "Last Name"
          },
          {
            field: "MyDiscount",
            title: "My Discount",
            format: "{0:p5}",
            editor: discountEditor,
          }
        ],
        dataSource: {
          data: [
            {
              FirstName: "Joe",
              LastName: "Smith",
              MyDiscount: 0.1111
            },
            {
              FirstName: "Jane",
              LastName: "Smith",
              MyDiscount: 0.1
            }
          ]
        },
        editable: true
      });

      function discountEditor (container, options) {
          $('<input data-bind="value:' + options.field + '"/>')
              .appendTo(container)
              .kendoNumericTextBox({
                decimals: 7,
                format: "p5"
              });
      }
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
