---
title: Vertically Tab Cells in an Editable and Grouped Grid
description: Learn how to vertically tab through the columns of a grouped Kendo UI for jQuery Data Grid component.
type: how-to
page_title: Tab through Columns Vertically - Kendo UI Grid for jQuery
slug: grid-tab-vertically-grouping
tags: kendo, jquery, grid, tab, editing, vertical, grouping
ticketid: 1587893
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
</table>

## Description

How can I vertically navigate down through the columns when I use the `Tab` key in a grouped Kendo UI Grid?

## Solution

To achieve the desired scenario:

1. Handle the [`keydown`](https://api.jquery.com/keydown/) table event.
1. If the key is `Tab`, prevent the default behavior.
1. Calculate the next cell based on the current position and the grouping rows.
1. Use the [`editCell`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/editcell) method of the Grid to change the cell.

```dojo
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
            {
              id: 1,
              name: "Jane Doe",
              gender: "female",
              city: "Sofia"
            },
            {
              id: 2,
              name: "John Smith",
              gender: "male",
              city: "London"
            },
            {
              id: 3,
              name: "James Jones",
              gender: "male",
              city: "New York"
            },
            {
              id: 4,
              name: "Mary Johnson",
              gender: "female",
              city: "Paris"
            },
            {
              id: 5,
              name: "Robert Lee",
              gender: "male",
              city: "Berlin"
            }
          ],
          schema: {
            model: {
              id: "id",
            }
          },
          group: { field: "name" }
        },
        editable: { mode: "incell" }
      });

      var grid = $('#grid').data('kendoGrid');

      grid.table.on('keydown', function(e) {
        if (e.keyCode === kendo.keys.TAB && $($(e.target).closest('.k-edit-cell'))[0]) {
          e.preventDefault();
          let items = 0;
          $(grid.dataSource.view()).each(function(x, el) {
            items = items + el.items.length;
          })

          let currentNumberOfItems = items + $(".k-grouping-row").length,
              row = $(e.target).closest('tr').index(),
              nextRow = $(e.target).closest('tr').next(),
              col = grid.cellIndex($(e.target).closest('td'));

          let dataItem = grid.dataItem($(e.target).closest('tr')),
              field = grid.columns[col].field,
              value = $(e.target).val();
          dataItem.set(field, value);


          if (row >= 0 && row < currentNumberOfItems && col >= 0 && col < grid.columns.length) {
            let nextCellRow = row,
                nextCellCol = col;

            if (e.shiftKey) {
              if (nextCellRow - 1 < 0) {
                nextCellRow = currentNumberOfItems - 1;
                nextCellCol--;
              } else {
                nextCellRow--;
              }
            } else {
              if (nextCellRow + 1 >= currentNumberOfItems) {
                nextCellRow = 1;
                nextCellCol = nextCellCol+2;
              } else {
                if($(nextRow).hasClass("k-grouping-row")) {
                  nextCellRow = nextCellRow+2;
                  nextCellCol++
                } else {
                  nextCellRow++;
                  nextCellCol++;
                }

              }
            }

            if (nextCellCol >= grid.columns.length+1 || nextCellCol < 0) {
              return;
            }

            // Wait for the cell to close and for the Grid to rebind when the changes have been made.
            setTimeout(function() {
              grid.editCell(grid.tbody.find("tr:eq(" + nextCellRow + ") td:eq(" + nextCellCol + ")"));
            });
          }
        }
      });
    </script>
```

## See Also

* [JavaScript API Reference of the jQuery Grid](/api/javascript/ui/grid)
* [jQuery Grid Overview Demo](https://demos.telerik.com/kendo-ui/grid/index)
* [Vertically Tab Cells in Editable Grids](/knowledge-base/grid-tab-vertically)
* [Skip Non-Editable Cells When Tabbing](/knowledge-base/skip-non-editable-cells-when-tabbing)
