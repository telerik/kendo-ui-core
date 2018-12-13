---
title: Count the Hidden Rows after Filtering in Spreadsheet
description: An example on how to count the number of the hidden rows after filtering the Kendo UI Spreadsheet.
type: how-to
page_title: Count the Number of Hidden Rows | Kendo UI Spreadsheet
slug: spreadsheet-hidden-rows-count-on-filtering
tags: spreadsheet
ticketid: 1083716  
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
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
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I count the number of hidden rows after filtering in the Spreadsheet?

## Solution

1. Check the total rows count.
1. For every row, check if it is hidden.

```dojo
<div id="spreadsheet" style="width: 100%"></div>
<script>
    kendo.spreadsheet.Controller.fn.onCommandRequest = function (e) {
        if (e.command) {
          this._execute(e);
        } else {
          this._workbook.undoRedoStack[e.action]();
        }		
        if (e.command === "ApplyFilterCommand") {
            var totalCount = this.view._sheet.toJSON().rows.length;
            var hiddenRows = 0
			// decrease by one due to filter header
            alert(totalCount-1);
            for (var i = 0; i < this.view._sheet.toJSON().rows.length; i++) {
              if (this.view._sheet.isHiddenRow(i)) {
                totalCount--;
                hiddenRows++
              }
            }                  
            alert('hidden: ' + hiddenRows);
        }
    }    


    $(function() {
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                filter: {
                  ref: "A1:C8",
                  columns:[]
                },
                rows: [{
                  cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                  cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                  cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }, {                 
                  cells: [{ value: "7" }, { value: "8" }, { value: "9" }]
                }, {
                  cells: [{ value: "10" }, { value: "21" }, { value: "34" }]
                }, {
                  cells: [{ value: "81" }, { value: "27" }, { value: "36" }]
                }, {
                  cells: [{ value: "14" }, { value: "29" }, { value: "73" }]
                }, {                   
                  cells: [{ value: "Lorem ipsum" },
                          { value: "sed do eiusmod" },
                          { value: "Ut enim ad minim" }]
                }]
            }]
        });
    });
</script>
```
