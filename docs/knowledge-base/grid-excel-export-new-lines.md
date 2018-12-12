---
title: Export Grid to Excel with New Lines in the Data
description: An example on how to export new lines to Excel within the data of a Kendo UI Grid.
type: how-to
page_title: Export Data with Line Breaks to Excel | Kendo UI Grid
slug: grid-excel-export-new-lines
tags: grid, excel, export, new liens
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

I have new lines in the header titles of my Grid. How can I keep the line breaks in the exported Excel file?

## Solution

The line breaks in the HTML cannot be handled by Excel as new lines. That is why you have to replace the break line tag by using an `\n` within the `excelExport` event of the Grid.

```dojo
<div id="example">
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["excel"],
            excel: {
                fileName: "Kendo UI Grid Export.xlsx",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                filterable: true
            },
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                schema:{
                    model: {
                        fields: {
                            UnitsInStock: { type: "number" },
                            ProductName: { type: "string" },
                            UnitPrice: { type: "number" },
                            UnitsOnOrder: { type: "number" },
                            UnitsInStock: { type: "number" }
                        }
                    }
                },
                pageSize: 7,
                group: {
                    field: "UnitsInStock", aggregates: [
                        { field: "ProductName", aggregate: "count" },
                        { field: "UnitPrice", aggregate: "sum"},
                        { field: "UnitsOnOrder", aggregate: "average" },
                        { field: "UnitsInStock", aggregate: "count" }
                    ]
                },
                aggregate: [
                    { field: "ProductName", aggregate: "count" },
                    { field: "UnitPrice", aggregate: "sum" },
                    { field: "UnitsOnOrder", aggregate: "average" },
                    { field: "UnitsInStock", aggregate: "min" },
                    { field: "UnitsInStock", aggregate: "max" }
                ]
            },
            sortable: true,
            pageable: true,
            groupable: true,
            filterable: true,
            columnMenu: true,
            reorderable: true,
            excelExport: function(e) {
                var sheet = e.workbook.sheets[0];
                for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
                  var row = sheet.rows[rowIndex];
                  for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex ++) {              
                    var cell =row.cells[cellIndex];
                    if(cell.value && cell.value.toString().indexOf("<br />") >= 0){
                      cell.value = cell.value.replace("<br />", "\n");   
                      cell.wrap = true;
                    }
                  }
                }
            },
            resizable: true,
            columns: [
                { field: "ProductName", title: "Product <br />Name", aggregates: ["count"], footerTemplate: "Total Count: #=count#", groupFooterTemplate: "Count: #=count#" },
                { field: "UnitPrice", title: "Unit Price", aggregates: ["sum"] },
                { field: "UnitsOnOrder", title: "Units On Order", aggregates: ["average"], footerTemplate: "Average: #=average#",
                    groupFooterTemplate: "Average: #=average#" },
                { field: "UnitsInStock", title: "Units In Stock", aggregates: ["min", "max", "count"], footerTemplate: "Min: #= min # Max: #= max #",
                groupHeaderTemplate: "Units In Stock: #= value # (Count: #= count#)" }
            ]
        });

    </script>
</div>
```
