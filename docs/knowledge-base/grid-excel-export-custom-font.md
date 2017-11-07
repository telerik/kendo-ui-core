---
title: Kendo UI Grid Excel Export customize font family and font size
description: Custom font for the excel export of the Kendo UI Grid
type: how-to
page_title: Set custom font family and font size - excel export Kendo UI Grid 
slug: grid-excel-export-custom-font
position:
tags: excel, export, grid, font, font-family, row, font-size
teampulseid:
ticketid: 1137653
pitsid:
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
</table>


## Description

I need to change the font size and font family of the excel export in the Kendo UI Grid 

## Solution

To change the font size of the cells, you need to loop over them and set each one. You can add a handler to the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-excelExport) event of the Kendo UI Grid to loop over the workbook.
If the font size becomes too large for the row, you will need to also increase the [`row height`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook#configuration-sheets.rows.height).
Finally, to change the font name, utilize the sheet rows cells [`fontName`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.fontName) property.

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

```html
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