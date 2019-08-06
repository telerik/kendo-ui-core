---
title: Display Grid as Triangular Matrix
page_title:  Display Grid as Triangular Matrix | Kendo UI Grid for jQuery
description: "An example on how to change its default data layout to a Triangular matrix in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Layout/display-grid-as-triangular-matrix
slug: howto_display_grid_as_triangular_matrix_grid
tags: grid, show, triangular, matrix
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I change the default data layout of the Kendo UI Grid to a triangular matrix?

## Solution

The following example demonstrates how to change the default data layout of the Grid to a [Triangular matrix](https://en.wikipedia.org/wiki/Triangular_matrix).

To achieve this behavior:

1. Disable editing.
1. Change the background color of the cells in the main diagonal of the Grid.
1. Remove the cells in the upper right triangular of the Grid.

> This is a custom solution which removes some of the table cells. As a result, the approach might not pass markup validation.

```dojo
	<style>
      .k-grid-content table{
        background-color: aliceblue;
      }
      #grid .k-grid-content table tbody > tr {
        background-color: white;
      }
      .mainDiagonal{
        background-color: gray;
      }
    </style>

    <div id="grid"></div>

    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "Attribute" },
          { field: "Column1" },
          { field: "Column2" },
          { field: "Column3" }
        ],
        dataSource: {
          data: [
            { Attribute: "Row 1", Column1: 10, Column2: 20, Column3: 30},
            { Attribute: "Row 2", Column1: 40, Column2: 50, Column3: 60},
            { Attribute: "Row 3", Column1: 70, Column2: 80, Column3: 90 }
          ],
          schema: {
            model: {
              fields: {
                "Attribute": {editable: false},
              }
            }
          }
        },
        editable: true,
        edit: function(e) {
          var className = e.container[0].className;

          if(className.indexOf("mainDiagonal") != -1){
            e.sender.closeCell();
          }
        },
        dataBound: function (e) {
          // Get all the rows and rowLength in the grid.
          var rows = e.sender.tbody.children();
          var rowLength = rows.length;

          for (i = rowLength; i > 0; i--) {
            // Get the current row.
            var row = $(rows[i - 1]);
            var cells = row.children().length;
            // Get the number of cells to remove.
            var nCellsToRemove = rowLength - i + 1;
            var first = true;
            for (nCellsToRemove; nCellsToRemove > 0; nCellsToRemove--) {
              // Get the cell to remove and push it to the removable cells array.
              var idx = cells - nCellsToRemove;
              var cell = $(row.children()[idx])[0];

              // Determine iteration and add classes accordingly.
              if (first){
                // Add mainDiagonal class and set the first flag to false.
                $(cell).addClass('mainDiagonal');
                first = false;
              } else {
                // Add the upperTriangular class.
                $(cell).addClass('upperTriangular');
              }
            }
          }

          // Remove all <td> elements with the upperTriangular class.
          $('.upperTriangular').remove();

          // Format the background of the table rows.
          $('#grid .k-grid-content table tbody').find('tr').css('background-color','white');
        }
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
