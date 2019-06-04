---
title: Include Hidden Grid Columns in Exported Excel Files
description: An example on how to include hidden columns when you export the contents of a Kendo UI Grid to Excel.
type: how-to
page_title: Include Hidden Columns When Exporting to Excel | Kendo UI Grid for jQuery
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

How can I show some of the hidden columns of the Grid in the exported Excel file?

## Solution

Use the [`hideColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn) or [`showColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn) methods to change the visibility of the columns before and after the export and utilize the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event.

The following code snippet demonstrates the implementation of the suggested approach.

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

* [Exporting Hidden Columns to PDF](https://docs.telerik.com/kendo-ui/knowledge-base/grid-include-hidden-columns-to-exported-pdf)
* [API Reference of the showColumn Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn)
* [API Reference of the hideColumn Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn)
* [API Reference of the excelExportevent Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport)
