---
title: Set Grid Auto Width When Exporting to Excel
description: An example on how to set the auto width of the Kendo UI Grid when exporting it to Excel.
type: how-to
page_title: Auto-fit Columns in Excel | Kendo UI Grid
slug: grid-excel-export-autofit-columns
tags: excel, export, grid, autofit, autowidth, columns, kendo
ticketid: 1137653
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

When I try to export the Grid to Excel, the data is not wrapped.

How can I auto-fit the Grid data in the exported Excel?

## Solution

Set the column width of the Kendo UI Workbook to [`autoWidth`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.columns.autowidth) by adding a handler to the [`excelexport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event of the Grid. Loop over the columns and set `autoWidth` to `true`.

```
excelExport: function(e) {
  var columns = e.workbook.sheets[0].columns;
  columns.forEach(function(column){
    // also delete the width if it is set
    delete column.width;
    column.autoWidth = true;
  });
}
```

```dojo
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      columns: [
        { field: "name", width:20 }
      ],
      dataSource: [
        { name: "doloremque velit iure dolore"},
        { name: "Lorem ipsum dolor sit amet"}
      ],
      excelExport: function(e) {
        var columns = e.workbook.sheets[0].columns;
        columns.forEach(function(column){
          delete column.width;
          column.autoWidth = true;
        });
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsExcel();
    </script>
```
