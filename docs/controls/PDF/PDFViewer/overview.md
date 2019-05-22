---
title: Overview
page_title: Overview | Kendo UI PDFViewer
description: "Learn how to initialize the Kendo UI PDFViewer widget and apply its options."
slug: overview_kendoui_pdfviewer_widget
position: 1
---

# PDFViewer Overview

The [Kendo UI PDFViewer widget](https://demos.telerik.com/kendo-ui/pdfviewer/index) displays PDF files in the browser. It provides flexibility to choose the PDF library to be used for processing the file:

* [PDF.JS Processing]({% slug pdfjs_processing_pdfviewer_widget %})
* [DPL Processing]({% slug dpl_processing_pdfviewer_widget %})

The PDFViewer consists of a toolbar and a scrollable container that wraps the page elements. Default tools collection includes `pager`, `open` and `download` tool.

**Key Features**

* Allows you to choose the PDF processing lib
* Provides built-in paging mechanism
* Has virtualization capabilities
* Provides built-in default toolbar collection
* Has responsive capabilities and page scaling

## Getting Started

### Initialization

1. Add a `<div>` element used to initialize the PDFViewer
1. Choose PDF processing library and setup its settings

#### Example

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


## See also

* [Basic Usage demo](https://demos.telerik.com/kendo-ui/pdfviewer/index)
* [API Reference](/api/javascript/ui/pdfviewer)