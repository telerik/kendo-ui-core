---
title: Exporting to Excel - auto row height for wrapped cells
description: An example on how to adjust the row height in Excel when the cells are wrapped
type: how-to
page_title: Auto Row Height for Wrapped Cells - Excel Export | Kendo ooxml Workbook for jQuery
slug: excel-export-set-row-height-to-auto
tags: workbook, excel, export, rows, wrapped, cells, auto, adjust
ticketid: 1142435
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Workbook for Progress® Kendo UI®</td>
 </tr>
</table>

## Description

How do I set the row height for wrapped cells?  The rows are keeping their default height of 35. The wrapped text is not showing unless the row height is changed by hand. How can I set the row height to automatically adjust for the wrapped text?

## Solution

The Kendo UI OOXML Workbook rows cannot be set to use automatic height. Unless height is provided as a number, the default [row height](/api/javascript/ooxml/workbook/configuration/sheets.rows.height) will be used.

If you wish to have rows of different heights, you would need to calculate the row height of that particular row before pushing it to the rows array.

Here is some example logic that can be used:

1. Compare `data[i].Subject` and `data[i].Comments` by their characters length and take the one which is longer for the following dynamic calculation
1. Check how many characters on average there are per row in the exported Excel. For the DejaVu font, I can count approximately 27 characters with the 200 pixels width columns that are set in the provided code snippet.
1. To get the number of rows, we can divide the column with the longest content by 27 and multiply the result by the default 20-pixel height. If the content is less than 27 characters, then with this ternary operator, we can still use the default row height of 20

```
    var rowHeight = contentToWrap.length > 27 ? Math.ceil(contentToWrap.length/27) * 20 : 20;

    rows.push({
        cells: rowCells,
        height: rowHeight
    });
```

```dojo
    <script>
	    var data = [{"ProductID":1,"ProductName":"Lorem ipsum dolor sit amet, consectetur   adipisicing elit. Totam ipsam blanditiis quo perspiciatis iste ad atque enim, sed expedita    sint dolor ea, inventore non, cum quae nam quos! Porro, nostrum.","UnitPrice":18,  "UnitsInStock":39,"Discontinued":false,"OrderDate":"1996-07-03T21:00:00.000Z"},   {"ProductID":2,"ProductName":"Chang","UnitPrice":19,"UnitsInStock":17,"Discontinued":false,    "OrderDate":"1996-07-04T21:00:00.000Z"},{"ProductID":3,"ProductName":"Aniseed Syrup",   "UnitPrice":10,"UnitsInStock":13,"Discontinued":false,"OrderDate":"1996-07-01T21:00:00.000Z"}  ,{"ProductID":4,"ProductName":"Chef Anton's Cajun SeasoningLsint dolor ea, inventore non,     cum quae nam quos! Porro, nostrum","UnitPrice":22,"UnitsInStock":53,"Discontinued":false,   "OrderDate":"1996-07-01T21:00:00.000Z"}];

        generateSource(data);

        function generateSource(data) {
          var modelProps = generateModel(data);
          var columns = modelProps.map(function(name){
            return { value: name };
          });

          var rows = [{
            cells: columns
          }];

          for (var i = 0; i < data.length; i++){
            var rowCells = [];
            var contentToWrap="";

            for(var j=0;j < modelProps.length;j++){
              var cellValue = data[i][modelProps[j]];

              if(modelProps[j] === "ProductName"){
                contentToWrap = cellValue;
                rowCells.push({value: cellValue, wrap:true});
             } else {
                rowCells.push({value: cellValue});
             }

            }

            var rowHeight = contentToWrap.length > 27 ? Math.ceil(contentToWrap.length/27) * 20 :     20

            rows.push({
              cells: rowCells,
              height: rowHeight
            });
          }

          var columnSettings =  modelProps.map(function(){
            return { width: 200 };
          });

          var workbook = new kendo.ooxml.Workbook({
            sheets: [{
              columns:columnSettings,
              title: "Orders",
              rows: rows
            }]
          });
          kendo.saveAs({dataURI: workbook.toDataURL(), fileName: "Test.xlsx"});
        }

        function generateModel(data) {
          var sampleDataItem = data[0];

          var model = Object.keys(sampleDataItem);      
          return model;
        }
    </script>
```
