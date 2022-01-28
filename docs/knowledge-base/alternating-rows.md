---
title: Configure Color for Alternating Rows
page_title: Configure Color for Alternating Rows | Kendo UI Grid for jQuery
description: "An example on how to configure the background color for alternating rows in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/excel/alternating-rows
slug: howto_configure_color_alternating_rows_grid
tags: grid, color, alternating, rows
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I customize the Excel document that the Grid generates during exporting?

## Solution

To set the background color of the alternating rows, the demo uses the [`background`](/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.background) option of the cell. For more information on how Excel documents work, refer to the [introductory help topic on Excel](/framework/excel/introduction#create-excel-document).

The following example demonstrates how to customize the Excel document that the Grid generates during exporting.

```dojo
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
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
