---
title: Preview Export API in PDFViewer
description: An example on how to preview the generated PDF from the Kendo UI Drawing API in the Kendo UI PDFViewer for jQuery.
type: how-to
page_title: Use PDFViewer with PDF Export API | Kendo UI PDFViewer for jQuery
slug: preview-pdf-export-api-in-viewer
tags: pdf,viewer,export,preview,api,generate,download
ticketid: 1412617
res_type: kb
---

## Environment

<table>
    <tbody>
	    <tr>
	    	<td>Product Version</td>
	    	<td>2019.2.619</td>
	    </tr>
	    <tr>
	    	<td>Product</td>
	    	<td>PDFViewer for Progress® Kendo UI®</td>
	    </tr>
    </tbody>
</table>


## Description

Instead of enabling your users to download the PDF that the [Kendo UI Drawing library](https://demos.telerik.com/kendo-ui/pdf-export/index) will generate, your project may require you only to show it to them.

## Solution

Combine the Drawing API with the [Kendo UI PDFViewer component](https://demos.telerik.com/kendo-ui/pdfviewer/index).

1. Generate the PDF as usual through the ` kendo.drawing.drawDOM()` method.
1. When the promise is resolved, in the `done` method, use the [`fromFile` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer/methods/fromfile) of the PDFViewer component instead of `kendo.saveAs`.

```dojo
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
<script>
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
</script>

  <div class="content-wrapper">
    <input type="text" placeholder="Type your name" />
    <input type="text" placeholder="Type your comment" />    
  </div>
  <br/>
  <button id="export-pdf">make the pdf</button>
  <br/>
  <br/>

  <div id="pdfViewer">
  </div>

<script>
    var viewer = $("#pdfViewer").kendoPDFViewer({
      pdfjsProcessing: {
        file: ""
      },
      width: "100%",
      height: 500
    }).getKendoPDFViewer();

    $("#export-pdf").click(function() {
        // Convert the DOM element to a drawing by using kendo.drawing.drawDOM.
        kendo.drawing.drawDOM($(".content-wrapper"))
        .then(function(group) {
            // Render the result as a PDF file.
            return kendo.drawing.exportPDF(group, {
                paperSize: "auto",
                margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
            });
        })
        .done(function(data) {
           viewer.fromFile({ data: data.split(',')[1] }) // For versions prior to R2 2019 SP1, use window.atob(data.split(',')[1])
        });
    });
</script>
```
