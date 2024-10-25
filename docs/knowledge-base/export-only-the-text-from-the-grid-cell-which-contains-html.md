---
title: Export Only the Text out of the HTML Content from Header, Footer, or Group Header Templates
description: Learn how to export only the text out of the HTML content in a Grid cell to Excel.
type: how-to
page_title: Export Only Text From Grid Cells which Contain HTML - Kendo UI for jQuery Data Grid
slug: export-only-the-text-from-the-grid-cell-which-contains-html
tags: grid, excel, export, encoded
ticketid: 1123086
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
</table>

## Description

When I style the header, footer, or group header template of the Grid by using HTML tags, the Excel files renders the whole HTML content.

How can I avoid the display of HTML content in the output Excel file and show just the data?

## Solution  

Configure the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event by setting only the text value to the cells with jQuery.

```dojo
    <style>
      .k-grouping-row{
        color:red;
        text-align: right;
      }
    </style>
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        excelExport:function(e){
          var rows = e.workbook.sheets[0].rows;

          for (var ri = 0; ri < rows.length; ri++) {
            var row = rows[ri];

            for (var ci = 0; ci < row.cells.length; ci++) {
              var cell = row.cells[ci];
              if (cell.value && ($(cell.value).text() != "")) {
                // Use jQuery.fn.text to remove the HTML and get only the text
                cell.value = $(cell.value).text();
                // Set the alignment
                cell.hAlign = "right";
              }
            }
          }
        },
        groupable:true,
        toolbar: ["excel"],
        excel: {
          filterable: false
        },
        columns: [
          { field: "name",
           groupHeaderTemplate:'<span style="float:right">#= value # kk</span>',
           footerTemplate: "<div style='float:right'>Count: #: count #</div>  "
          },
          { field: "age",
           footerTemplate: "<div>Min: #: min #</div><div>Max: #: max #</div>"
          }
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
          ],
          group:[
            {field:'name'}
          ],
          aggregate: [
            { field: "name", aggregate: "count" },
            { field: "age", aggregate: "min" },
            { field: "age", aggregate: "max" }
          ]
        }
      });
    </script>
```
