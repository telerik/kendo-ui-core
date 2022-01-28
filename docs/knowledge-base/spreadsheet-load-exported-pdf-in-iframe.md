---
title: Create an Inline PDF from the Spreadsheet and Embed It in an iFrame
description: An example on how to generate a PDF from the Kendo UI Spreadsheet and load the PDF in an iframe element.
type: how-to
page_title: Export Spreadsheet to PDF and Load the File in iFrame | Kendo UI Spreadsheet for jQuery
slug: spreadsheet-load-exported-pdf-in-iframe
tags: kendo, kendoui, spreadsheet, pdf, iframe, base64, embed
ticketid: 1138153
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

How can I generate a PDF from a Kendo UI Spreadsheet and display the PDF in a separate `<iframe>`?

## Solution

Load the generated base64 PDF data in the `<iframe>` element. To do that, use the `draw()` method of the Spreadsheet `Sheet` object. To properly load the data in the `<iframe>`, opne the following example in the [full screen mode of the Dojo](https://runner.telerik.io/fullscreen/UVAyu/3).

```dojo
<input type="button" id="btn" value="PDF export Spreadsheet" />
<div id="spreadsheet" style="width: 100%;"></div>
<div id="pdf_preview" style="height:400px; width:400px"></div>

<script>
  $(function() {
    $('#btn').on('click', function () {
      var spread = $('#spreadsheet').getKendoSpreadsheet();
      var activeSheet = spread.activeSheet();
      activeSheet.range('B1').value('B1-TEST');
      $('#pdf_preview').html(`<iframe id="embedded-pdf" name="invoice.pdf" type="application/pdf" width="100%" height="100%"></iframe>`);
      activeSheet.draw(function (group) {
        kendo.drawing.exportPDF(group)
          .done(function (data) {
          $('#embedded-pdf').attr('src', data);
        });
      });
    });

    $("#spreadsheet").kendoSpreadsheet({
      excel: {
        proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
      },
      pdf: {
        proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
      },
      sheets: [{
        name: "Food Order"
      }]
    });
  });
</script>
```

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [`sheet`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet)
