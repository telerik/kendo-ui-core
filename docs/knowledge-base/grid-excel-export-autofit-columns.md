---
title: Kendo UI Grid Excel Export auto width
description: Set auto with in excel export Kendo UI Grid
type: how-to
page_title: Autofit columns in Excel - Kendo UI Grid 
slug: grid-excel-export-autofit-columns
position:
tags: excel, export, grid, autofit, autowidth, columns, kendo
teampulseid:
ticketid: 1137653
pitsid:
res_type: kb

component: grid
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
</table>


## Description

I have a grid with excel export. Everything works fine except the data in Excel is not getting wrapped. How can I auto fit the data in the exported Excel?

## Solution

To set the Kendo UI Workbook [`columns width to autoWidth`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook#configuration-sheets.columns.autoWidth), you can add a handler to the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-excelExport) event of the Kendo UI Grid, loop over the columns and set autoWidth to true

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

```html
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
