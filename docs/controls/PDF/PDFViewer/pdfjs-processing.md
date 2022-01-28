---
title: PDFjs Processing
page_title: jQuery PDFViewer Documentation | PDFjs Processing
description: "Get started with the jQuery PDFViewer by Kendo UI and use PDF.JS processing in the Kendo UI PDFViewer widget"
slug: pdfjs_processing_pdfviewer_widget
position: 2
---

# PDFjs Processing

By default, if no processing configuration is defined, the PDFViewer uses the PDF.js library.

[PDF.js](https://mozilla.github.io/pdf.js/) is an open-source project that is developed by Mozilla.

## Requirements

Add the PDF.js library scripts to the page.

## Basic Configuration

The following example demonstrates how to configure the PDFViewer to use PDF.js processing.

    <div id="pdfviewer"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>
    <script>
        $("#pdfviewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: ""
            }
        });
    </script>

## Browser Support

PDF.js processing is only supported in Internet Explorer 11.    

<script>
    // Specify the workerSrc property for Internet Explorer support.
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
</script>

## See Also

* [Basic Usage of the Kendo UI for jQuery PDFViewer (Demo)](https://demos.telerik.com/kendo-ui/pdfviewer/index)
* [JavaScript API Reference of the PDFViewer](/api/javascript/ui/pdfviewer)
