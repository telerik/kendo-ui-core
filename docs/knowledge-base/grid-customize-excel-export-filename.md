---
title: Customize the Excel Export Filename of the Grid by Adding Current Date and Time
description: An example on how to customize the Excel export filename of the Grid by adding the current date and time of generation.
type: how-to
page_title: Add the Current Date and Time to the Excel Export Filename | Kendo UI Grid
slug: grid-customize-excel-export-filename
tags: grid, excel, export, datetime, customize, customize
ticketid: 1130491
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

How can I add the current date and time to the Excel export filename of the Grid?

## Solution

1. Use the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event which has the workbook in its event data to rename it.

1. With the help of the [`kendo.toString()`](https://docs.telerik.com/kendo-ui/framework/globalization/dateformatting) method or another way to format the date, concatenate the date to the filename:

    ```
    excelExport: function(e) {
      e.workbook.fileName = kendo.toString(new Date, "d") + " Grid.xlsx";
    }
    ```

```dojo
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      excelExport: function(e) {
        e.workbook.fileName = kendo.toString(new Date, "dd/MM/yyyy HH:mm") + " Grid.xlsx";
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsExcel();
    </script>
```
