---
title: Customize Font Family and Font Size in Grid When Exporting to Excel
description: An example on how to set a custom font for the Excel export of the Kendo UI Grid.
type: how-to
page_title: Set Custom Font Family and Font Size When Exporting to Excel | Kendo UI Grid for jQuery
slug: grid-excel-export-custom-font
tags: excel, export, grid, font, font-family, row, font-size
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

How can I change the font size and font family of the Excel export in the Grid?

## Solution

1. Loop over the Grid cells and set each of them.
1. Add a handler to the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event of the Grid to loop over the workbook.
1. If the font size becomes too large for the row, increase the row [`height`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.height). Note that [`fontSize`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.fontsize) is measured in pixels.
1. To change the font name, utilize the [`fontName`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.fontname) property of the sheet row cells.

```
excelExport: function(e) {
 var sheet = e.workbook.sheets[0];
 for (var i = 0; i < sheet.rows.length; i++) {
   sheet.rows[i].height = 30;
   for (var ci = 0; ci < sheet.rows[i].cells.length; ci++) {
     sheet.rows[i].cells[ci].fontSize = 30;
   }
 }
}
```

```dojo
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>


    <div id="grid" ></div>

    <script>
      $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
          allPages: true
        },
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
          },
          pageSize: 7
        },
        excelExport: function(e) {
          var sheet = e.workbook.sheets[0];
          for (var i = 0; i < sheet.rows.length; i++) {
            sheet.rows[i].height = 40;
            for (var ci = 0; ci < sheet.rows[i].cells.length; ci++) {
              sheet.rows[i].cells[ci].fontSize = 30;
            }
          }
        },
        pageable: true,
        columns: [
          { width: 300, field: "ProductName", title: "Product Name" },
          { field: "UnitsOnOrder", title: "Units On Order" },
          { field: "UnitsInStock", title: "Units In Stock" }
        ]
      });
    </script>
```
