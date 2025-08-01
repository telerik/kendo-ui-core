---
title: Include a Column with Formulas When Exporting Grid to Excel
description: Learn how to create an excel file that features formulas.
type: how-to
page_title: Exporting to Excel with Formulas - Kendo UI for jQuery Data Grid
slug: grid-excel-export-formulas
tags: excel, export, grid, formula, formulas, column, create, include, calculate, add, sum, total
ticketid: 1433998
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
  <tr>
  <td>Created with version</td>
  <td>2019.3.917</td>
 </tr>
</table>


## Description

I have a requirement to export an Excel sheet with tabular data and equations within. Is it possible to add formulas or equations which would be calculated in Excel when opening?

## Solution

You can alter the generated workbook to include a column with formulas by following the steps below:

1. Add an [`excelExport`](/api/javascript/ui/grid/events/excelexport) event handler function to loop over the workbook.
1. Add a header cell for the formula column.
1. Generate the formula for all the next cells and add it as the [`sheets.rows.cells.formula`](/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.formula).

```
    excelExport: function(e) {
        var workbook = e.workbook;
        var sheet = workbook.sheets[0];
        sheet.rows[0].cells.push({
          value: "Sum",
          background:"#60b5ff",
          color:"#ffffff"

        });
        
        for (var i = 1; i < sheet.rows.length; i++) {
          var formula = kendo.format("=SUM(B{0}:C{1})", i+1, i+1);
          sheet.rows[i].cells.push({ formula: formula });
        }
    }
```

```dojo
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    <div id="grid" ></div>
    <script>
      $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
          allPages: true
        },
        dataSource: {
          transport: {
            read: "https://demos.telerik.com/service/v2/core/Products"
          },
          pageSize: 7
        },
        excelExport: function(e) {
          var workbook = e.workbook;
          var sheet = workbook.sheets[0];
          sheet.rows[0].cells.push({
            value: "Sum",
            background:"#60b5ff",
            color:"#ffffff"

          })
          for (var i = 1; i < sheet.rows.length; i++) {
            var formula = kendo.format("=SUM(B{0}:C{1})", i+1, i+1);
            sheet.rows[i].cells.push({ formula: formula });
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
