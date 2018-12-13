---
title: Manually Export All Sheets in a Single PDF
description: An example on how to manually export all Kendo UI Spreadsheet sheets in a single PDF.
type: how-to
page_title: Save Sheets on Separate Pages in the same PDF | Kendo UI Spreadsheet
slug: spreadsheet-manually-export-all-sheets-in-a-pdf
tags: spreadsheet,pdf,drawing,single-pdf
ticketid: 1143046
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
  <td>Progress Kendo UI PDF Export</td>
 </tr>
</table>

## Description

How can I manually export the contents of all sheets in a Kendo UI Spreadsheet into the same PDF file, so that I can retain each sheet on a separate page?

## Solution

Use the `Spreadsheet.Sheet.draw()` method which is internally used by the Spreadsheet PDF Export.

```dojo
<input type="button" id="btn" value="Export"/>
<div id="spreadsheet" style="width: 100%;"></div>

<script>
  $(function() {
    $("#spreadsheet").kendoSpreadsheet({
      sheets: [{
        name: "Food Order",
        columns: [{
          width: 500,
          index: 0
        }],
        rows: [{
          height: 70,
          cells: [{
            index: 0,
            value: "Test",
            fontSize: 32,
            background: "rgb(96,181,255)",
            textAlign: "center",
            color: "white"
          }]
        }]
      },{
        name: "Test",
        columns: [{
          width: 500,
          index: 0
        }],
        rows: [{
          height: 70,
          cells: [{
            index: 0,
            value: "Another",
            fontSize: 32,
            background: "rgb(96,181,255)",
            textAlign: "center",
            color: "white"
          }]
        }]
      },{
        name: "Another",
        columns: [{
          width: 500,
          index: 0
        }],
        rows: [{
          height: 70,
          cells: [{
            index: 0,
            value: "Invoice #52 - 06/23/2015",
            fontSize: 32,
            background: "rgb(96,181,255)",
            textAlign: "center",
            color: "white"
          }]
        }]
      }]
    });

    $('#btn').on('click', function() {
      var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

      if (null != spreadsheet) {
        var sheets = spreadsheet.sheets();
        var sheetPdfs = [];
		var group = new kendo.drawing.Group();

        sheets.forEach(function(sheet) {
          sheet.draw({ paperSize: 'A4' }, function(sheetPdf) {
            sheetPdfs.push(sheetPdf)
          })
        })

        for (var i = 0; i < sheets.length; i++) {
          var currentSheetChildren = sheetPdfs[i].children;

          for (var j = currentSheetChildren.length; j > 0; j --) {
            group.append(currentSheetChildren[0]);
          }
        }
        kendo.drawing.exportPDF(group, {  
          margin: {
          	top: 10,
            left: 10
          },
          multiPage: true,
          paperSize: 'A4',
          landscape: false
        }).done(function(data) {
          kendo.saveAs({
            dataURI: data,
            fileName: "Invoices"
          });
        });
      }
    });
  });
</script>
```

## See Also

* [API Reference of the Spreadsheet](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [API Reference of the Drawing Group](https://docs.telerik.com/kendo-ui/api/javascript/drawing/group)
* [API Reference of the Drawing](https://docs.telerik.com/kendo-ui/api/javascript/drawing)
