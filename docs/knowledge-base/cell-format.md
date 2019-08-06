---
title: Format Cell Values in the Grid
page_title: Format Cell Values | Kendo UI Grid for jQuery
description: "An example on how to format the cell values of the Kendo UI Grid during Excel export."
previous_url: /controls/data-management/grid/how-to/excel/cell-format
slug: howto_format_cell_values_grid
tags: grid, cell, values
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

How can I format the cell values of the Kendo UI Grid?

## Solution

Set the [`format`](/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.format) option of the cells. For more information on the formats that are supported by Excel, refer to the page on [creating a custom number format](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4).

The following example demonstrates how to format cell values of the Grid while exporting it to Excel.

```dojo
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excelExport: function(e) {
          var sheet = e.workbook.sheets[0];

          for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
            var row = sheet.rows[rowIndex];
            for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex ++) {
              row.cells[cellIndex].format = "[Blue]#,##0.0_);[Red](#,##0.0);0.0;"
            }
          }
        },
        dataSource: {
          data: [
            { text: "Positive", value: 10.5 },
            { text: "Negative", value: -10.5 },
            { text: "Zero", value: 0 }
          ]
        }
    });
</script>
```

The following example demonstrates how to set a custom format for `date` values.

```dojo
<div id="grid"></div>
<script>
  $("#grid").kendoGrid({
    toolbar: ["excel"],
    excelExport: function(e) {
      var sheet = e.workbook.sheets[0];

      for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
        var row = sheet.rows[rowIndex];
        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex ++) {
          row.cells[cellIndex].format = "yy-MM-dd hh:mm:ss"
        }
      }
    },
    columns: [
      { field: "name" },
      { field: "age" },
      { field: "date" }
    ],
    dataSource: {
      data: [
        { name: "Jane Doe", age: 30, date: new Date() },
        { name: "John Doe", age: 33, date: new Date() }
      ],
      schema: {
        model : {
          fields: {
            date: { type: "date" },
            name: { type: "string" },
            age: { type: "number" }
          }
        }
      }
    }
  });
  $("#export").click(function(e) {
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsExcel();
  });
</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
