---
title: Delete Rows Selected with Checkboxes
page_title: Delete Rows Selected with Checkboxes | Kendo UI Grid
description: "Learn how to delete multiple rows selected with checkboxes in a Kendo UI Grid widget."
slug: howto_delete_rows_selectedwith_checkboxes_grid
---

# Delete Rows Selected with Checkboxes

The example below demonstrates how to delete multiple rows selected with checkboxes in a Kendo UI Grid widget.

###### Example

```html
    <script src="http://demos.kendoui.com/content/shared/js/people.js"></script>
    <div id="example" class="k-content">
      <div id="grid"></div>

      <div id="details"></div>

      <script>

        $(document).ready(function () {
          var grid = $("#grid").kendoGrid({
            dataSource: {
              pageSize: 20,
              data: createRandomData(50)
            },
            pageable: true,
            height: 430,
            columns: [
              { field: "FirstName", title: "First Name", width: "140px" },
              { field: "LastName", title: "Last Name", width: "140px" },
              { field: "Title" },
              {
                field : "Select",
                title : "Select",
                width : "16%",
                template: "<input type='checkbox' class='sel' />"},
              { command: { text: "Delete", click: whenYourDeleteButtonIsClicked }, title: " ", width: "140px" }]
          }).data("kendoGrid");

        });

        function whenYourDeleteButtonIsClicked(){
          var grid = $("#grid").data("kendoGrid");
          $("#grid").find("input:checked").each(function(){
            grid.removeRow($(this).closest('tr'));
          })
        }
      </script>


    </div>

    <script>

    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Customize the Delete Confirmation Dialog]({% slug howto_customize_delete_confirmation_dialog_grid %})
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
