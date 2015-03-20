---
title: Color Alternating Rows
---

# Color the Alternating Rows

This example shows how to customize the Excel document that the grid generates during exporting.

The demo uses the [background](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.background) option of the cell to set the background color of the alternating rows.

To understand how Excel documents work check the [Excel Introduction](/framework/excel/introduction#create-excel-document) help topic.

#### Example - alternating rows

```html
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excelExport: function(e) {
          var sheet = e.workbook.sheets[0];
          for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
            if (rowIndex % 2 == 0) {
              var row = sheet.rows[rowIndex];
              for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex ++) {
                row.cells[cellIndex].background = "#aabbcc";
              }
            }
          }
        },
        dataSource: {
          type: "odata",
          transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
          },
          pageSize: 7
        },
        pageable: true,
        columns: [
            { width: 300, field: "ProductName", title: "Product Name" },
            { width: 300, field: "UnitPrice", title: "Unit Price" },
            { field: "UnitsOnOrder", title: "Units On Order" },
            { field: "UnitsInStock", title: "Units In Stock" }
        ]
    });
</script>
```
