---
title: Insert Rows When Exporting the Grid to Excel
description: An example on how to intercept the export of the Kendo UI Grid to excel and add rows to the workbook.
type: how-to
page_title: Intercept Excel Export and Add Rows | Kendo UI Grid
slug: insert-rows-when-exporting-grid-to-excel
tags: grid, excel, export, add, rows
ticketid: 1116551
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
  <td>Progress Kendo UI version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description

How can I intercept the Excel export of the Kendo UI Grid and add data to the exported file?

## Solution

When the [`excelExport`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event is fired, access the configuration object of the Excel workbook and add rows to its sheets in the `e.workbook` property.

```       
       function excelExport(e) {
        console.log(e.workbook.sheets[0].rows)
        e.workbook.sheets[0].rows.unshift(
            {
                cells: [
                    {
                        value: "Some content",
                        background: "#7a7a7a",
                        colSpan: 2,
                        color: "#fff",
                        rowSpan: 2
                    }
                ]
            } )
    }
```
