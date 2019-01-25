---
title: Change DatePicker Value from Another DatePicker
page_title: jQuery Grid Documentation | Change DatePicker Value | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to change a DatePicker value from another DatePicker in the Grid."
slug: howto_change_datepicker_value_from_another_datepicker_grid
---

# Change DatePicker Value from Another DatePicker

The following example demonstrates how to change a DatePicker value based on the modified value of another DatePicker by using the inline edit mode of the Grid.

When the user selects a date from the first DatePicker, the following date is programmatically set to the second DatePicker.

###### Example

```dojo

  <div id="grid"></div>

  <script>

    $("#grid").kendoGrid({  
      dataSource: {
        data: [
          { Date1: '2017-8-5', Date2: '2017-8-6' }
        ],
        schema: {
          model: {
            fields: {
              Date1: { type: "date" },
              Date2: { type: "date" }
            }
          }
        }
      },
      columns: [{
        field: "Date1",
        format: "{0: yyyy-MM-dd}"
      },{
        field: "Date2",
        title: "Date1 + 1 day",
        format: "{0: yyyy-MM-dd}",
      },{
        command: ["edit", "destroy"],
        title: "&nbsp;",
        width: "250px"
      }],  
      editable: "inline",
      edit: onEdit
    });
    function onEdit(e){
      var dp1 = e.container.find("[name='Date1']").data("kendoDatePicker");
      var dp2 = e.container.find("[name='Date2']").data("kendoDatePicker");

      dp1.bind("change", function(e){
        var nextDay = new Date(dp1.value());               
        nextDay.setDate(nextDay.getDate()+1);      
        dp2.value(nextDay);
        dp2.trigger("change");
      })
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
* [How to Preserve Dirty Indicator in Incell Editing and Client Operations]({% slug howto_preserve_dirty_indicator_incell_editing_client_operations_grid %})
* [How to Render Grid Editor in Column Template]({% slug howto_render_editor_column_template_grid %})
* [How to Show Custom Editor Using the Selected Item outside the Grid]({% slug howto_use_show_custom_editor_selected_item_outside_grid %})
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
