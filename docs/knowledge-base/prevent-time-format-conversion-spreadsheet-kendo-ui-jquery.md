---
title: Preventing Incorrect Time Format Conversion When Pasting Data in Kendo UI for jQuery Spreadsheet
description: Learn how to ensure data integrity when pasting values containing ":" from Excel into Kendo UI for jQuery Spreadsheet by overriding the paste event.
type: how-to
page_title: Handling Data Integrity Issues While Pasting Values Containing ":" in Kendo UI for jQuery Spreadsheet
meta_title: Handling Data Integrity Issues While Pasting Values Containing ":" in Kendo UI for jQuery Spreadsheet
slug: prevent-time-format-conversion-spreadsheet-kendo-ui-jquery
tags: spreadsheet,kendo-ui-for-jquery,paste,event,time-format,cell-formatting
res_type: kb
ticketid: 1701828
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Spreadsheet</td>
</tr>
<tr>
<td>Version</td>
<td>2025.3.1002</td>
</tr>
</tbody>
</table>

## Description

When copying data from Excel into the [Kendo UI for jQuery Spreadsheet](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/overview), values containing the ":" symbol are automatically interpreted as time formats. This leads to incorrect conversions, such as "26:66" becoming "03:06". This behavior disrupts data integrity, especially for columns that require plain text interpretation.

This knowledge base article also answers the following questions:
- How to paste text without format conversion in Kendo UI for jQuery Spreadsheet?
- How to prevent automatic time parsing in Kendo UI for jQuery Spreadsheet?
- How to override paste functionality in Kendo UI for jQuery Spreadsheet?

## Solution

To ensure that the data is pasted correctly as plain text, override the Spreadsheet's [`paste`](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/events/paste) event. Use custom logic to identify values containing ":" and explicitly format these cells as text. Follow these steps:

1. Handle the [`paste`](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/events/paste) event of the Spreadsheet.
2. Prevent the default paste behavior using `e.preventDefault()`.
3. Iterate through the pasted data and apply text formatting (`"@"`) to cells with values containing ":".
4. Insert the values into the cells manually.

Below is an example implementation:

```javascript
$("#spreadsheet").kendoSpreadsheet({
    sheets: [{
        name: "Sheet1",
        rows: [
            { cells: [{ value: "Example data" }] }
        ]
    }],
    paste: function(e) {
        e.preventDefault();

        var sheet = e.sender.activeSheet();
        var currentRange = e.range;
        var clipboardData = e.clipboardContent.data;
        var initialRow = currentRange.topLeft.row;
        var initialCol = currentRange.topLeft.col;

        sheet.batch(function() {
            for (var i = 0; i < clipboardData.length; i++) {
                var rowData = clipboardData[i];

                for (var j = 0; j < rowData.length; j++) {
                    var cell = sheet.range(initialRow + i, initialCol + j);
                    var value = rowData[j].value;

                    if (value && value.includes(":")) {
                        cell.format("@"); // Set cell format to text.
                        cell.input(value); // Insert value as is.
                    } else {
                        cell.input(value); // Insert value normally.
                    }
                }
            }
        });
    }
});
```

### Key Points:
- The `cell.format("@")` ensures that the cell interprets the value as plain text.
- The `cell.input(value)` inserts the original value without modification.

Test the solution using the example below:

```dojo

    <div id="example">
      <div id="spreadsheet"></div>
    </div>

    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [
          {
            name: "test",
            rows: [
              {
                cells: [
                  {
                    value: 12.39,
                    format: "$#,##0.00",
                    background: "rgb(255,255,255)",
                    color: "rgb(0,62,117)",
                  },
                ],
              },
            ],
          },
        ],
        paste: function (e) {
          e.preventDefault();

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
          var rangeToPaste = sheet.range(
            initialRow,
            initialCol,
            numberOfRows,
            numberOfCols,
          );

          sheet.batch(function () {
            for (var i = 0; i < fullData.length; i += 1) {
              var currentFullData = fullData[i];

              for (var j = 0; j < currentFullData.length; j += 1) {
                var range = sheet.range(initialRow + i, initialCol + j);
                var value = currentFullData[j].value;
                
                if (value && value.includes(":")) {
                  range.format("@");
                  range.input(value);
                } else {
                  range.input(value);
                }
              }
            }
          });

          sheet.select(rangeToPaste);

          for (var i = 0; i < mergedCells.length; i += 1) {
            var initialMergedRange = sheet.range(mergedCells[i]);
            var mergeTopLeft = initialMergedRange.topLeft();
            var mergeInitialRow = mergeTopLeft.row + initialRow;
            var mergedInitialCol = mergeTopLeft.col + initialCol;
            var mergedNumberOfRows = initialMergedRange.values.length;
            var mergedNumberOfCols = initialMergedRange.values()[0].length;

            sheet
              .range(
                mergeInitialRow,
                mergedInitialCol,
                mergedNumberOfRows,
                mergedNumberOfCols,
              )
              .merge();
          }
        },
      });
    </script>
```

## See Also

- [Kendo UI for jQuery Spreadsheet API](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
- [Kendo UI for jQuery Spreadsheet Cell Formatting](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/formatting)
- [Knowledge Base Article: Pasting Values Only in Kendo UI for jQuery Spreadsheet](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/spreadsheet-paste-only-values)
