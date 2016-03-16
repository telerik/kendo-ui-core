---
title: Add New Rows When Tabbing Out of the Last One
page_title: Add New Rows When Tabbing Out of the Last One | Kendo UI Grid
description: "Learn how to add a new row to the Kendo UI Grid widget when the user navigates out of the last one."
slug: howto_add_new_rows_when_tabbingoutof_thelast_one_grid
---

# Add New Rows When Tabbing Out of the Last One

The example below demonstrates how to add a new row when the user navigates out of the last row in the Kendo UI Grid widget.

###### Example

```html
    <div id="grid"></div>
    <script>
      var data = [
        { Id: 1, Name: "Decision 1", Position: 1 , ContractDate : new Date('1996/12/12')},
        { Id: 2, Name: "Decision 2", Position: 2 , ContractDate : new Date('2012/5/4')},
        { Id: 3, Name: "Decision 3", Position: 3 , ContractDate : new Date('1998/12/30')}
      ];

      var dataSource = new kendo.data.DataSource({
        //data: data,
        transport: {
          read: function(e) {                                
            e.success(data);
          },
          update: function(e) {                                
            e.success();
          },
          create: function(e) {
            var item = e.data;
            item.Id = data.length + 1;
            e.success(item);
          }
        },
        schema: {
          model: {
            id: "Id",
            fields: {
              Id: { type: "number" },
              Name: { type: "string" },
              Position: { type: "number" },
              ContractDate :{ type: "date"}
            }
          }
        }
      });

      var grid= $("#grid").kendoGrid({
        dataSource: dataSource,  
        scrollable: false,   
        navigatable: true,
        editable : {
          createAt : "bottom"
        },      
        navigatable: true,
        toolbar:  ["save","cancel", "create"],
        columns: ["Id", "Name", "Position", {field:"ContractDate",format:"{0:d}"}]            
      }).data("kendoGrid");     

      grid.tbody.on('keydown',function(e){
        if($(e.target).closest('td').is(':last-child') && $(e.target).closest('tr').is(':last-child')){
          grid.addRow();
        }
      })

    </script>
```

## See Also

Other articles on Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Access Editor Controls in Edit Events]({% slug howto_access_editor_controlsin_edit_events_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Customize the Delete Confirmation Dialog]({% slug howto_customize_delete_confirmation_dialog_grid %})
* [How to Delete Multiple Rows Selected with Checkboxes]({% slug howto_delete_rows_selectedwith_checkboxes_grid %})
* [How to Edit Records in Child Grids]({% slug howto_edit_recordsin_children_grid %})
* [How to Edit Records Using External Forms]({% slug howto_edit_records_using_external_forms_grid %})
* [How to Increase Popup Edit Form and Textbox Width]({% slug howto_increase_popup_edit_formand_textbox_grid %})
* [How to Preserve Dirty Indicator in Incell Editing and Client Operations]({% slug howto_preserve_dirty_indicator_incell_editing_client_operations_grid %})
* [How to Prevent Editing for Boolean Based Records]({% slug howto_prevent_editingfor_boolean_based_records_grid %})
* [How to Prevent Page Navigation in Edit Mode]({% slug howto_prevent_page_navigation_inedit_mode_grid %})
* [How to Render Grid Editor in Column Template]({% slug howto_render_editor_column_template_grid %})
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
