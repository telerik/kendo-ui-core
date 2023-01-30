---
title: Vertically Tab Cells in an Editable Grid
description: Learn how to vertically tab through the columns of the Kendo UI for jQuery Data Grid component.
type: how-to
page_title: Tab through Columns Vertically - Kendo UI Grid for jQuery
slug: grid-tab-vertically
tags: kendo, jquery, grid, tab, editing, vertical
ticketid: 1140359
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery Grid</td>
 </tr>
</table>

## Description

How can I vertically navigate down through the columns when I use the `Tab` key in the Kendo UI Grid?

## Solution

To achieve the desired scenario:

1. Handle the [`keydown`](https://api.jquery.com/keydown/) table event.
1. If the key is `Tab`, prevent the default behavior.
1. Calculate the next cell based on the current position.
1. Use the [`editCell`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/editcell) method of the Grid to change the cell.

```dojo
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        columns: [{
                field: "name"
            },
            {
                field: "gender"
            },
            {
                field: "city"
            }
        ],
        dataSource: {
            data: [{
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
                var nextCellRow = row;
                var nextCellCol = col;

                if (e.shiftKey) {
                    if (nextCellRow - 1 < 0) {
                        nextCellRow = currentNumberOfItems - 1;
                        nextCellCol--;
                    } else {
                        nextCellRow--;
                    }
                } else {
                    if (nextCellRow + 1 >= currentNumberOfItems) {
                        nextCellRow = 0;
                        nextCellCol++;
                    } else {
                        nextCellRow++;
                    }
                }

                if (nextCellCol >= grid.columns.length || nextCellCol < 0) {
                    return;
                }

                // Wait for the cell to close and for the Grid to rebind when the changes have been made.s
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
* [Vertically Tab Cells in Editable and Grouped Grids](/knowledge-base/grid-tab-vertically-grouping)
* [Skip Non-Editable Cells When Tabbing](/knowledge-base/skip-non-editable-cells-when-tabbing)
