---
title: Insert New Column When Exporting Grid to Excel
page_title: Insert New Column When Exporting Grid to Excel - Kendo UI for jQuery Grid
description: "Learn how to insert new column when exporting Kendo UI Grid for jQuery to Excel."
slug: grid_insert_new_column_with_excel_export
tags: grid, new, column, excel, export
component: grid
type: how-to
ticketid: 1604782
res_type: kb
---

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
</table>

## Description

How can I implement a functionality for inserting a new column when exporting the Grid to Excel?

## Solution

* In the [`excelExport`](/api/javascript/ui/grid/events/excelexport) event handler, you can use the JavaScript `splice()` method for inserting rows/columns to the exported Grid data:

```js
excelExport: function(e) {
    var sheet = e.workbook.sheets[0];
    sheet.columns.splice(1, 0, {width: 10, autoWidth: true})  //add a new column

    for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
        var row = sheet.rows[rowIndex]; 
        row.cells.splice(1, 0, {value: ''}) //add cells to the new column
    }

    for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
        var row = sheet.rows[rowIndex];

        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex ++) {

            var isHeaderCellColor = rowIndex == 0 ? '#545454' : "#efefef" //set different background to the header cells
            row.cells[cellIndex].background = isHeaderCellColor;  
            var vvalue = String(row.cells[cellIndex].value)
            var test = vvalue.includes('<')

            if(test){
                row.cells[cellIndex].value = simpleHtmlDecode(row.cells[cellIndex].value);
            }  
        }
    }
}
```

The following example demonstrates a full implementation of the described approach:

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
                row.cells.splice(1, 0, {value: ''})
            }

            for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {           
                var row = sheet.rows[rowIndex];     

                for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex ++) {

                    var isHeaderCellColor = rowIndex == 0 ? '#545454' : "#efefef"
                    row.cells[cellIndex].background = isHeaderCellColor;  
                    var vvalue = String(row.cells[cellIndex].value)
                    var test = vvalue.includes('<')               

                    if(test){
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
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [JavaScript API Reference of the Workbook](/api/javascript/ooxml/workbook)


