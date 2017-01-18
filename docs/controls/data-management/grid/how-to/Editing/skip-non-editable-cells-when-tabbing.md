---
title: Skip Non-Editable Cells When Tabbing
page_title:  Skip Non-Editable Cells When Tabbing | Kendo UI Grid Widget
description: "Learn how to skip non-editable cells in the Kendo UI Grid When tabbing"
slug: howto_skip_noneditable_cells_when_tabbing_grid
---

# Skip Non-Editable Cells When Tabbing

Normally, tabbing in an editable Grid steps on each cell, no matter if it is editable or not.

The following examples demonstrate how to skip non-editable cells of a Kendo UI Grid during tabbing in two different scenarios:

* Skip all cells from a specific column.
* Skip specific cells from different columns and rows, based on custom criteria.

> **Important**
>
> Both examples work only if [`navigatable`](/api/javascript/ui/grid#configuration-navigatable) is _disabled_ and locked (frozen) columns are not used.

## Skip Specific Columns

The example below demonstrates how to skip all cells from a given column.

###### Example

```html
  <p>The "gender" column is not editable and is skipped during tabbing:</p>
  <div id="grid"></div>
  <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "gender" },
        { field: "city" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", gender: "female", city: "Sofia" },
          { id: 2, name: "John Smith", gender: "male", city: "London" },
          { id: 3, name: "James Jones", gender: "male", city: "New York" },
          { id: 4, name: "Mary Johnson", gender: "female", city: "Paris" },
          { id: 5, name: "Robert Lee", gender: "male", city: "Berlin" }
        ],
        schema: {
          model: {
            id: "id",
            fields: {
              gender: {
                editable: false
              }
            }
          }
        }
      },
      editable: {
        mode: "incell"
      }
    });

    var grid = $('#grid').data('kendoGrid');

    grid.table.on('keydown', function(e) {
      if (e.keyCode === kendo.keys.TAB && $($(e.target).closest('.k-edit-cell'))[0]) {
        e.preventDefault();
        var currentNumberOfItems = grid.dataSource.view().length;    
        var row = $(e.target).closest('tr').index();
        var col = grid.cellIndex($(e.target).closest('td'));

        var dataItem = grid.dataItem($(e.target).closest('tr'));
        var field = grid.columns[col].field;
        var value = $(e.target).val();
        dataItem.set(field, value);

        if (row >= 0 && row < currentNumberOfItems && col >= 0 && col < grid.columns.length) {
          var nextCellRow;
          var nextCellCol = col === 0 ? 2 : 0;
          if(e.shiftKey){
            nextCellRow = nextCellCol === 0 ? row : row - 1;
          } else {
            nextCellRow = nextCellCol === 0 ? row + 1 : row;
          }

          if(nextCellRow >= currentNumberOfItems || nextCellRow < 0){
            return;
          }

          // wait for cell to close and Grid to rebind when changes have been made
          setTimeout(function() {                  
            grid.editCell(grid.tbody.find("tr:eq(" + nextCellRow + ") td:eq(" + nextCellCol + ")"));
          });            
        }
      }
    });
  </script>
```

## Skip Specific Cells

The example below demonstrates how to skip cells from different columns and rows, based on custom criteria.

###### Example

```html
    <style>
      .noneditable {
        border: 1px solid red !important;
        opacity: 0.6;
      }
    </style>

    <p>The marked cells are not editable and are skipped during tabbing:</p>

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "gender" },
          { field: "city" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", gender: "female", city: "Sofia" },
            { id: 2, name: "John Smith", gender: "male", city: "London" },
            { id: 3, name: "James Jones", gender: "male", city: "New York" },
            { id: 4, name: "Mary Johnson", gender: "female", city: "Paris" },
            { id: 5, name: "Robert Lee", gender: "male", city: "Berlin" }
          ],
          schema: {
            model: {
              id: "id",
            }
          }
        },
        editable: {
          mode: "incell"
        },
        dataBound: function(e){
          var cells = e.sender.tbody.find('td');
          cells.each(function(idx, item){
            if(!((idx + 1)%4)){
              $(item).addClass('noneditable');
            }
          });
        }
      });

      var grid = $('#grid').data('kendoGrid');

      grid.table.on('click', function(ev){
        if($(ev.target).is('.noneditable')){
          ev.preventDefault();
          ev.stopImmediatePropagation();
        }
      });

      grid.table.on('keydown', function moveToNext(e) {
        if (e.keyCode === kendo.keys.TAB && $($(e.target).closest('.k-edit-cell'))[0]) {
          e.preventDefault();
          var currentNumberOfItems = grid.dataSource.view().length;
          var row = $(e.target).closest('tr').index();
          var col = grid.cellIndex($(e.target).closest('td'));

          var dataItem = grid.dataItem($(e.target).closest('tr'));
             var field = grid.columns[col].field;
             var value = $(e.target).val();
             dataItem.set(field, value);

          if (row >= 0 && row < currentNumberOfItems && col >= 0 && col < grid.columns.length) {
            var nextCellRow;
            var nextCellCol;

            if(!e.shiftKey){
              nextCellCol = (col + 1) === grid.columns.length ? 0 : col + 1;
            } else {
              nextCellCol = (col - 1) === -1 ?  grid.columns.length - 1: col - 1;
            }

            if(!e.shiftKey){
              nextCellRow = nextCellCol === 0 ? row + 1 : row;
            } else {
              nextCellRow = nextCellCol === grid.columns.length - 1 ? row - 1 : row;
            }

            if(nextCellRow >= currentNumberOfItems || nextCellRow < 0){
              return;
            }

            // wait for cell to close and Grid to rebind when changes have been made
            if(!grid.tbody.find("tr:eq(" + nextCellRow + ") td:eq(" + nextCellCol + ")").is('.noneditable')){
              setTimeout(function() {
                grid.editCell(grid.tbody.find("tr:eq(" + nextCellRow + ") td:eq(" + nextCellCol + ")"));
              });
            } else {
              while(grid.tbody.find("tr:eq(" + nextCellRow + ") td:eq(" + nextCellCol + ")").is('.noneditable')){
                !e.shiftKey ? nextCellCol++ : nextCellCol--;

                if(nextCellCol === grid.columns.length){
                  nextCellCol = 0;

                  nextCellRow++;
                }

                if(nextCellCol === -1){
                  nextCellCol = grid.columns.length - 1;

                  nextCellRow--;
                }

                if(nextCellRow >= currentNumberOfItems || nextCellRow < 0){
                  return;
                }
              }
              grid.editCell(grid.tbody.find("tr:eq(" + nextCellRow + ") td:eq(" + nextCellCol + ")"));
            }

          }
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
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
