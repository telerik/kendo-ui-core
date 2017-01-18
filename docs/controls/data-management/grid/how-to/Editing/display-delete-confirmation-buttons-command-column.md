---
title: Display Delete Confirmation as Button in the Command Column
page_title: Display Delete Confirmation as Button in the Command Column | Kendo UI Grid
description: "Learn how to display the Delete confirmation as a button instead of a dialog in the command column of a Kendo UI Grid."
slug: howto_display_delete_confirmation_buttons_command_column
---

# Display Delete Confirmation as Button in the Command Column

The following example demonstrates how to render the confirmation to delete a row in a Kendo UI Grid as a button instead of a dialog in the command column.

###### Example

```html
    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service",
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

          var grid = $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
              { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
              { field: "Discontinued", width: "120px" },
              { command: ["edit", {
                name: "myDelete",
                text: "Delete"
              }], title: "&nbsp;", width: "350px" }],
            editable: {
              mode: "inline",
              confirmation: false
            },
            dataBound: function() {
              $(".k-grid-myDelete span").addClass("k-icon k-delete");
            },
            cancel: function() {
              setTimeout(function(){
                $(".k-grid-myDelete span").addClass("k-icon k-delete");
              });
            }
          }).data("kendoGrid");

          $("#grid").on("click", ".k-grid-myDelete", function(e) {
            e.preventDefault();

            var command = $(this);
            var cell = command.closest("td");

            command.remove();
            cell.append('<a class="k-button k-button-icontext k-grid-myConfirm" href="#"><span class="k-icon k-update"></span>Confirm</a>');
            cell.append('<a class="k-button k-button-icontext k-grid-myCancel" href="#"><span class="k-icon k-cancel"></span>Cancel</a>');
          });

          $("#grid").on("click", ".k-grid-myConfirm", function(e){
            e.preventDefault();
            grid.removeRow($(this).closest("tr"))
          });

          $("#grid").on("click", ".k-grid-myCancel", function(e){
            e.preventDefault();
            grid.refresh();
          })
        });
      </script>
    </div>
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
