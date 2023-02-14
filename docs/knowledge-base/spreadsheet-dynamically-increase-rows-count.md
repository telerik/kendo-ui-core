---
title: Dynamically Increase the Row Count in the Spreadsheet
description: Learn how to allow the user to increase the row count in the Kendo UI for jQuery Spreadsheet.
type: how-to
page_title: Dynamically increase the rows count in Spreadsheet
slug: spreadsheet-dynamically-increase-rows-count
tags: spreadsheet, dynamically, rows, add, count
ticketid: 1553835
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Spreadsheet for jQuery</td>
	</tr>
</table>

## Description

I want to insert a new row in the Spreadsheet. Currently, the Kendo UI Spreadsheet does not allow inserting a new row if there is content entered in the last row. How can I allow the user to insert a new row in the Spreadsheet and exceed the default maximum?

## Solution

1. Hide a part of the rows initially using the [`hideRow`](/api/javascript/spreadsheet/sheet/methods/hiderow) method.
1. Handle the [`insertRow`](/api/javascript/ui/spreadsheet/events/insertrow) event and check the count of the currently visible rows and the total count of rows.
1. Utilize the [`fromJSON`](/api/javascript/ui/spreadsheet/methods/fromjson) and  [`toJSON`](/api/javascript/ui/spreadsheet/methods/tojson) methods to accommodate all the records.
1. Use the [`batch`](/api/javascript/spreadsheet/sheet/methods/batch) method for better performance.


```dojo
	<div id="spreadsheet" style="width: 100%;"></div>
    <script>
      function hideRows(startIndex) {
      	let spr = $("#spreadsheet").data("kendoSpreadsheet");
        let sheet = spr.activeSheet();
        let totalRows = sheet._rows._count;

        sheet.batch(function() {
          for(let i = startIndex; i < totalRows; i++) {
            sheet.hideRow(i);
          }
        });
      }

      $("#spreadsheet").kendoSpreadsheet({
        rows: 10,
        insertRow: function(e) {
          let spreadsheet = e.sender;
          let numberOfVisibleRows = spreadsheet.element.find(".k-spreadsheet-row-header>div").length;
          let numberOfTotalRows = e.sheet._rows._count;

          if (numberOfVisibleRows + 5 >= numberOfTotalRows) {
            setTimeout(() => {
              let workbook = spreadsheet.toJSON();

              workbook.rows = spreadsheet._workbook.options.rows * 2;
              spreadsheet.fromJSON(workbook);

              hideRows(numberOfVisibleRows + 5);
            }, 1000);
          }
        }
      });

      hideRows(5);
	</script>
```
