---
title: Paste Only Values in a Spreadsheet
description: An example on how to paste only values in the Kendo UI Spreadsheet.
type: how-to
page_title: Paste Only Values | Kendo UI Spreadsheet
slug: spreadsheet-paste-only-values
tags: spreadsheet, kendo, values-only, paste
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
</table>


## Description

How can I paste only the copied values in the Spreadsheet widget?

## Solution

To paste only values in the Spreadsheet, you will have to handle the `paste` event of the widget. In that event you could prevent the default execution. Then you could get the clipboad data from the `clipboardContent` field of the vent arguments object:

```dojo
<div id="example">
    <div id="spreadsheet"></div>
</div>

<script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets:[{
            name: 'test',
            rows: [{
                cells: [{
                    value: 12.39,
                    format: "$#,##0.00",
                    background: "rgb(255,255,255)",
                    color: "rgb(0,62,117)"
                }]
            }]
        }],
        paste: function(e) {
            e.preventDefault()

            var currentRange = e.range;
            var fullData = e.clipboardContent.data;
            var mergedCells = e.clipboardContent.mergedCells;
            var topLeft = currentRange.topLeft();
            var initialRow = topLeft.row;
            var initialCol = topLeft.col;
            var origRef = e.clipboardContent.origRef;
            var numberOfRows = origRef.bottomRight.row - origRef.topLeft.row + 1;
            var numberOfCols = origRef.bottomRight.col - origRef.topLeft.col + 1;
            var spread = e.sender;
            var sheet = spread.activeSheet();
            var rangeToPaste =  sheet.range(initialRow, initialCol, numberOfRows, numberOfCols);

            sheet.batch(function() {
                for(var i = 0; i < fullData.length; i += 1) {
                    var currentFullData = fullData[i];

                    for(var j = 0; j < currentFullData.length; j += 1 ) {
                        var range = sheet.range(initialRow + i, initialCol + j);
                        var value = currentFullData[j].value;

                        if (value !== null) {
                            range.input(value);
                            range.format(null);
                        }
                    }
                }
            });

            sheet.select(rangeToPaste);

            for(var i = 0; i < mergedCells.length; i += 1) {
                var initialMergedRange = sheet.range(mergedCells[i]);
                var mergeTopLeft = initialMergedRange.topLeft();
                var mergeInitialRow = mergeTopLeft.row + initialRow;
                var mergedInitialCol = mergeTopLeft.col + initialCol;
                var mergedNumberOfRows = initialMergedRange.values.length;
                var mergedNumberOfCols = initialMergedRange.values()[0].length;

                sheet.range(mergeInitialRow, mergedInitialCol, mergedNumberOfRows, mergedNumberOfCols).merge();
            }
        }
    });
</script>
```

## See Also

* [API Reference of the Spreadsheet](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
