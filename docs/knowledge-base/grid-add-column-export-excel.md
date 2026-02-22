---
title: How To Add а Column While Exporting Grid to Excel
description: Learn how to add а column when exporting to Excel Kendo UI Grid
type: how-to
page_title: Add а Column While Exporting Grid to Excel - Kendo UI PanelBar for jQuery
slug: grid-add-column-export-excel
tags: grid, column, excel
ticketid: 1604782 
res_type: kb
components: ["grid"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
</table>

## Description

When export the Grid to Excel I would like to add an empty column on a specific position. How can I do that?

## Solution

1. In the [`excelExport`](/api/javascript/ui/grid/events/excelexport) event handler you can use the JavaScript `splice` method to add rows/columns to the exported data.

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        toolbar: ["excel"],
        excelExport: function(e) {
          var sheet = e.workbook.sheets[0];
          sheet.columns.splice(1, 0, {width: 10, autoWidth: true})          

          for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {          		
            var row = sheet.rows[rowIndex]; 
            //add a column on specific position
            row.cells.splice(1, 0, {value: ''})
          }

          for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {

            var row = sheet.rows[rowIndex];             
            for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex ++) {

              var isHeaderCellColor = rowIndex == 0 ? '#545454' : "#efefef"
              //change the color if the cell is part of the header
              row.cells[cellIndex].background = isHeaderCellColor;  
              var vvalue = String(row.cells[cellIndex].value)
              //decode content if it is html
              var cellV = vvalue.includes('<')               

              if(cellV){
                row.cells[cellIndex].value = simpleHtmlDecode(row.cells[cellIndex].value);
              }  
            }
          }
        },
        dataSource: [
          {"ProductName": "<span class='encode-class'><i>Milk</i></span>", UnitsInStock: 18},
          {"ProductName": "<span class='encode-class'><b>Strawberry</b></span>", UnitsInStock: 15},
          {"ProductName": "Sugar", UnitsInStock: 25}
        ],
        pageable: true,
        columns: [
          { width: 300, field: "ProductName", title: "Product Name", encoded: false },
          { field: "UnitsInStock", title: "Units" }
        ]
      });

      function simpleHtmlDecode(encodedStr) {        
        return $(encodedStr).text();
      }
    </script>
```

## See Also

* [Grid API Reference](/api/javascript/ui/grid)
