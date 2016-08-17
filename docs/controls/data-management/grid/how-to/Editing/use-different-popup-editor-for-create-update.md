---
title: Use Different Popup Editors for Create and Update Operations
page_title: Use Different Popup Editors for Create and Update Operations | Kendo UI Grid
description: "Learn how to use different popup editors for create and update operations in the Kendo UI Grid widget."
slug: howto_use_different_poup_editors_for_create_update_operations
---

# Use Different Popup Editors for Create and Update Operations

The example below demonstrates how to use different popup editors in a Kendo UI Grid for the Create and Update operations.

###### Example

```html
     <script src="http://demos.kendoui.com/content/shared/js/products.js"></script>
    <div id="grid"></div>
    <script>  
      $(document).ready(function(){
        var dataSource = new kendo.data.DataSource({
          pageSize: 5,
          data: products,
          autoSync: true,
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages"} }
              }
            }
          }
        });

        $("#grid").kendoGrid({
          editable: {
            mode:"popup",
            template: $("#template").html()
          },
          dataSource: dataSource,
          pageable: true,      
          edit:function(e){
            $('#categories').kendoDropDownList({
              optionLabel: "Select category...",
              dataTextField: "CategoryName",
              dataValueField: "CategoryID",
              change: function(){
                e.model.Category.CategoryName=this.text();
              },
              dataSource: {
                type: "odata",
                serverFiltering: true,
                transport: {
                  read: "http://demos.kendoui.com/service/Northwind.svc/Categories"
                }
              }
            });
            $("#products").kendoDropDownList({
              autoBind: false,
              cascadeFrom: "categories",
              optionLabel: "Select product...",
              dataTextField: "ProductName",
              dataValueField: "ProductID",
              change: function(){
                e.model.ProductName = this.text();
              },
              dataSource: {
                type: "odata",
                serverFiltering: true,
                transport: {
                  read: "http://demos.kendoui.com/service/Northwind.svc/Products"
                }
              }
            });
          },
          toolbar: ["create"],
          columns: [
            { field:"ProductName",title:"Product Name" },
            { field: "Category", title: "Category", width: "160px", template: "#=Category.CategoryName#" },
            { command: ["edit", "destroy"], title: "&nbsp;", width: "160px" }]

        });
      })
    </script>  
    <script type="text/x-kendo-template" id="template">    
    #if(data.isNew()) {#
        #var createTemp = kendo.template($("\#createTemplate").html());#
        #=createTemp(data)#
    #} else {#
        #var createTemp = kendo.template($("\#editTemplate").html());#
        #=createTemp(data)#
    #}#
    </script>
    <script type="text/x-kendo-template" id="createTemplate">    
    <input id="categories" style="margin-left:10px">
    </script>
    <script type="text/x-kendo-template" id="editTemplate">    
    <input id="products" style="margin-left:10px">
    </script>
    <script>

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
