---
title: How to Create an Inline PDF from a Kendo Spreadsheet and Embed it in an iFrame?
description: Ho to generate a PDF from the Kendo Spreadsheet and load the PDF in an iframe element
type: how-to
page_title: Export Spreadsheet to PDF and Load the File in iFrame
slug: spreadsheet-load-exported-pdf-in-iframe
position: 0
tags: kendo, kendoui, spreadsheet, pdf, iframe, base64, embed
ticketid: 1138153
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Spreadsheet for Progress® Kendo UI®</td>
 </tr>
</table>


## Description

We need to generate a PDF from a Kendo spreadsheet and display the PDF in a separate `<iframe>`.

## Solution

You could load the generated base64 PDF data in the `<iframe>` element. To do that you could use the *draw()* method of the Spreadsheet Sheet object. To properly load the data in the `<iframe>` the below sample should be opened in [full screen mode of Dojo](http://runner.telerik.io/fullscreen/UVAyu/3):  

````html
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
````

## See Also

* [Kendo Spreadsheet API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Kendo Spreadsheet Sheet API Reference](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet)
