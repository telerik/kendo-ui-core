---
title: Include Grid's Hidden Columns in Exported Excel File
description: An example demonstrating how to include hidden columns when exporting the contents of a Grid to Excel
type: how-to
page_title: Include Specific Hidden Columns when Exporting to Excel | Kendo UI Grid
slug: grid-include-hidden-columns-in-excel-export
tags: grid, include, hidden, columns, export, excel, visible, hidden
ticketid: 1160554
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.516</td>
 </tr>
</table>

## Description

I'm working on an application that uses the Kendo UI Grid with hidden columns and would like to show some of them in the exported file when exporting to Excel.

## Solution

In order to implement the functionality described functionality, the [hideColumn](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn)/[showColumn](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn) methods can be used in order to change the visibility of columns before and after the export by taking advantage of the [excelExport event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport).

The following code snippet demonstrates how the approach described above can be implemented:

```
var exportFlag = false;
$("#grid").data("kendoGrid").bind("excelExport", function (e) {
    if (!exportFlag) {
        e.sender.hideColumn(1);
        e.preventDefault();
        exportFlag = true;
        setTimeout(function () {
            e.sender.saveAsExcel();
        });
    } else {
        e.sender.showColumn(1);
        exportFlag = false;
    }
});
```

## See Also

* [Include Hidden Columns in PDF Export.](https://docs.telerik.com/kendo-ui/knowledge-base/grid-include-hidden-columns-to-exported-pdf)
* [showColumn method API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn)
* [hideColumn method API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn)
* [excelExportevent API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport)
