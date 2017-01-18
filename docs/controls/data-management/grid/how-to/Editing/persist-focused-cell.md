---
title: Persist Focused Grid Cells After Rebind
page_title: Persist Focused Grid Cells After Rebind | Kendo UI Grid
description: "Learn how to persist a focused Kendo UI Grid cell after rebind."
slug: howto_persist_focused_grid_cell_grid
---

# Persist Focused Grid Cells After Rebind

The following example demonstrates how to persist a focused Grid cell after rebind. The example implies the usage of in-cell editing, the built-in keyboard navigation, and the [`autoSync:true`](/api/javascript/data/datasource#configuration-autoSync) configuration for the Kendo UI Grid [DataSource instance](/api/javascript/data/datasource).

The functionality relies on the following milestones:

* The [`navigatable`](/api/javascript/ui/grid#configuration-navigatable) option is set to `true`.
* The [`editable`](/api/javascript/ui/grid#configuration-editable) option is set to `true`, or the [`editable.mode`](/api/javascript/ui/grid#configuration-editable.mode) option is set to `"incell"`.
* The [`dataBinding`](/api/javascript/ui/grid#events-dataBinding) event handler of the Grid is used to obtain the [`current`](/api/javascript/ui/grid#methods-current) Grid cell and its corresponding row and cell indexes.
* The saved row and cell indexes are applied through the [`current()`](/api/javascript/ui/grid#methods-current) method in the [`dataBound`](/api/javascript/ui/grid#events-dataBound) event handler.
* The [`table`](/api/javascript/ui/grid#fields-table) option of the Grid can be focused explicitly if the user has clicked on the **Save Changes** button&mdash;this requires you to set a flag in the [`saveChanges`](/api/javascript/ui/grid#events-saveChanges) event handler.

Generally, it is uncommon to enable the [`autoSync`](/api/javascript/data/datasource#configuration-autoSync) option for the in-cell editing, as this will greatly increase the amount of update-related remote requests. Nevertheless, it is possible that you use such an approach if required.

###### Example

```html
<div id="grid"></div>

<script>
  $(function () {
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
          autoSync: true,
          pageSize: 5,
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

    var rowIndex = null;
    var cellIndex = null;
    var saveButtonClicked = false;

    $("#grid").kendoGrid({
      dataSource: dataSource,
      navigatable: true,
      pageable: true,
      height: 300,
      toolbar: ["create", "save", "cancel"],
      columns: [
        "ProductName",
        { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
        { field: "UnitsInStock", title: "Units In Stock", width: 120 },
        { field: "Discontinued", width: 120 },
        { command: "destroy", title: "&nbsp;", width: 150 }],
      editable: true,
      saveChanges: function(e) {
        saveButtonClicked = true;
      },
      dataBinding: function(e) {
        var current = e.sender.current() || [];
        if (current[0]) {
          cellIndex = current.index();
          rowIndex = current.parent().index();
        }
      },
      dataBound: function(e) {
        if (!isNaN(cellIndex)) {
          e.sender.current(e.sender.tbody.children().eq(rowIndex).children().eq(cellIndex));
          rowIndex = cellIndex = null;

          // The code below is needed only when the user clicks on the "Save Changes" button.
          // Otherwise, focusing the table explicitly and unconditionally can steal the page focus.
          if (saveButtonClicked) {
            e.sender.table.focus();
            saveButtonClicked = false;
          }
        }
      }
    });
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
