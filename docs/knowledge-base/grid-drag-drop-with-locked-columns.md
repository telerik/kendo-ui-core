---
title: Drag and drop rows in a grid with locked columns
description: An example on how to make the locked part of the grid sortable and use the frozen columns to drag drop and reorder rows in the Kendo UI Grid.
type: how-to
page_title: Reorder rows in a grid with frozen columns | Kendo UI Grid for jQuery
slug: grid-drag-drop-with-locked-columns
tags: grid, drag, drop, locked, sortable, reorder, frozen
ticketid: 1413617
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Created with Progress Kendo UI version</td>
  <td>Created with the 2019.2.619 version</td>
 </tr>
</table>

## Description

I have a grid that uses frozen/locked columns and has drag and drop functionality. The problem is that I can only drag and drop a row on the side where columns are unlocked and this is not what I want. I would like to be able to grab a row from the locked side and drag and drop.

## Solution

The Kendo UI Grid with [locked columns]({% slug locked_columns_kendoui_grid_widget %}) creates two tables. To initialize the drag and drop over the locked table, we need to use the lockedTable element.

1. Initialize the sortable over the [`lockedTable`](/api/javascript/ui/grid/fields/lockedtable) element.
2. Get the corresponding cells from the unlocked content table by looking for the row with the same data-uid to show the full row as the hint.

    ```
        grid.lockedTable.kendoSortable({
        filter: ">tbody >tr",
        hint: function(element) {
          var unlockedPortion = grid.table.find("tr[data-uid=" + element.data("uid") + "]").children();

          let table = $('<table style="width: 600px;" class="k-grid k-widget"></table>'),
            hint;

          table.append(element.clone().append(unlockedPortion));
          table.css("opacity", 0.7);

          return table;
        },
    ```

```dojo
     <div id="grid"></div>
    <style>
      .k-grid tbody tr {
        cursor: move;
      }

      .placeholder {
        outline-style: dashed;
        outline-width: 1px;
        outline-color: red;
      }

      #grid {
        width: 600px;
      }
    </style>
    <script>
      $(document).ready(() => {
        $.when(LoadGrid()).then(EnableDragAndDropForGrid());
      });

      let ds = [{
        id: 1,
        name: "Jane",
        lastname: "Doe",
        age: 25,
        gender: "female",
        city: "London"
      },{
        id: 2,
        name: "John",
        lastname: "Doe",
        age: 26,
        gender: "male",
        city: "London"
      },{
        id: 3,
        name: "James",
        lastname: "Jones",
        age: 30,
        gender: "male",
        city: "New York"
      },{
        id: 4,
        name: "Mary",
        lastname: "Johnson",
        age: 23,
        gender: "female",
        city: "Paris"
      },{
        id: 5,
        name: "Robert",
        lastname: "Lee",
        age: 44,
        gender: "male",
        city: "Berlin"
      }];

      function LoadGrid() {
        $("#grid").kendoGrid({
          schema: {
            model: {
              fields: {
                id: {
                  type: "number"
                },
                name: {
                  type: "string"
                },
                lastname: {
                  type: "string"
                },
                age: {
                  type: "number"
                },
                gender: {
                  type: "string"
                },
                city: {
                  type: "string"
                }
              }
            }
          },
          columns: [{
            title: "id",
            field: "id",
            width: 100,
            locked: true
          },{
            title: "First",
            field: "name",
            locked: true,
            width: 150
          },{
            title: "Last",
            field: "lastname",
            locked: true,
            width: 150
          },{
            title: "Age",
            field: "age",
            width: 100
          },{
            title: "Gender",
            field: "gender",
            width: 100
          },{
            title: "City",
            field: "city",
            width: 100
          }],
          dataSource: {
            data: ds
          },
          sortable: true
        });
      }

      function EnableDragAndDropForGrid() {
        let grid = $('#grid').data('kendoGrid');
        console.log(grid)
        grid.lockedTable.kendoSortable({
          filter: ">tbody >tr",
          hint: function(element) {
            var unlockedPortion = grid.table.find("tr[data-uid=" + element.data("uid") + "]").children();

            let table = $('<table style="width: 600px;" class="k-grid k-widget"></table>'),
                hint;

            table.append(element.clone().append(unlockedPortion));
            table.css("opacity", 0.7);

            return table;
          },
          cursor: "move",
          placeholder: function(element) {
            return $('<tr colspan="4" class="placeholder"></tr>');
          },
          change: function(e) {
            let skip = grid.dataSource.skip(),
                oldIndex = e.oldIndex + skip,
                newIndex = e.newIndex + skip,
                data = grid.dataSource.data(),
                dataItem = grid.dataSource.getByUid(e.item.data("uid"));

            grid.dataSource.remove(dataItem);
            grid.dataSource.insert(newIndex, dataItem);

          }
        });
      }
    </script>
```
