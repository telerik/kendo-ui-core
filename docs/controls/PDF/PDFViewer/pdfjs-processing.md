---
title: PDFJS Processing
page_title: PDFJS Processing | Kendo UI PDFViewer
description: "Learn how to use PDF.JS processing in the Kendo UI PDFViewer widget"
slug: pdfjs_processing_pdfviewer_widget
position: 2
---

# PDFJS Processing

The [Kendo UI PDFViewer widget](https://demos.telerik.com/kendo-ui/pdfviewer/index) uses the `pdf.js` library by default, if no processing configuration is defined. [PDF.JS](https://mozilla.github.io/pdf.js/) is an open-source project developed by Mozilla.

## Basic Configuration

PDF.JS Processing requires pdfjs lib scripts added to the page.

An example of a PDFViewer widget configured to use PDF.JS Processing.

##### Example

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


## Troubleshooting

> **Important**
>
> PDF.JS Processing is not supported in IE9

PDF.JS requires additional configuration, to work properly in IE11. 

##### Example
    <script>
        // The workerSrc property should be specified for IE support
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>


## See Also

* [PDFViewer Overview]({% slug overview_kendoui_pdfviewer_widget %})
* [DPL Processing]({% slug dpl_processing_pdfviewer_widget %})

For runnable examples on Kendo UI PDFViewer, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/pdfviewer/index).
