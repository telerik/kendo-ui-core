---
title: Overview
page_title: jQuery PDFViewer Documentation | PDFViewer Overview
description: "Get started with the jQuery PDFViewer by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_pdfviewer_widget
position: 1
---

# PDFViewer Overview

The PDFViewer displays PDF files in the browser and consists of a toolbar and a scrollable container that wraps the page elements.

The default tools collection includes the `pager`, `open`, and `download` tools. For processing files, it supports the PDF.JS Processing and Telerik DPL Processing libraries. Among the key features the PDFViewer provides are the selection of a PDF processing library, a built-in paging mechanism, virtualization capabilities, a built-in default toolbar collection, and responsive capabilities and page scaling.

* [Demo page for the PDFViewer](https://demos.telerik.com/kendo-ui/pdfviewer/index)

## Initializing the PDFViewer

1. Add a `<div>` element that will be used to initialize the PDFViewer.
1. Choose the PDF processing library and configure its settings.

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

## Functionality and Features

* [PDFjs Processing]({% slug pdfjs_processing_pdfviewer_widget %})
* [DPL processing]({% slug dpl_processing_pdfviewer_widget %})
* [Toolbar and tools]({% slug dpl_processing_pdfviewer_widget %})

## See Also

* [Basic Usage of the PDFViewer (Demo)](https://demos.telerik.com/kendo-ui/pdfviewer/index)
* [Using the API of the PDFViewer (Demo)](https://demos.telerik.com/kendo-ui/pdfviewer/api)
* [JavaScript API Reference of the PDFViewer](/api/javascript/ui/pdfviewer)
