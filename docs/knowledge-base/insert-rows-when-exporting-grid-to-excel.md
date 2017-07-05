---
title: Insert rows when exporting Kendo Grid to excel
description: How to intercept the exporting to excel and add rows to the workbook
type: how-to
page_title: Insert rows when exporting Kendo Grid to excel.
slug: insert-rows-when-exporting-grid-to-excel
position: 0
tags: grid, excel, export, add, rows
teampulseid:
ticketid: 1116551
pitsid:
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress® Kendo UI® version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description

You might want to intercept the exporting of the Kendo Grid to excel in order to add some data to the exported file.

## Possible Solution

When the [excelExport](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-excelExport) event is fired, in the property e.workbook you can access the Excel workbook configuration object and therefore add rows to its sheets.

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

