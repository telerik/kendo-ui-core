---
title: Skip Non-Editable Cells When Tabbing
page_title:  Skip Non|Editable Cells | Kendo UI Grid for jQuery
description: "An example on how to skip non-editable cells when tabbing in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/skip-non-editable-cells-when-tabbing
slug: howto_skip_noneditable_cells_when_tabbing_grid
tags: skip, noneditable, grid, cells, when, tabbing
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I skip non-editable cells when tabbing in the Kendo UI Grid for jQuery?

## Solution

Normally, tabbing in an editable Grid steps on each cell, no matter if it is editable or not.

The following examples demonstrate how to skip non-editable cells of a Grid during tabbing. They apply the following different scenarios:
* Skip all cells from a specific column.
* Skip specific cells from different columns and rows, based on custom criteria.

> Both examples work only if [`navigatable`](/api/javascript/ui/grid/configuration/navigatable) is disabled and the locked (frozen) columns are not used.

## Skipping Specific Columns

The following example demonstrates how to skip all cells from a given column.

```dojo
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

## Skipping Specific Cells

The following example demonstrates how to skip cells from different columns and rows based on custom criteria.

```dojo
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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
