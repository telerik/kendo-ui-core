---
title: PDFjs Processing
page_title: jQuery PDFViewer Documentation - PDFjs Processing
description: "Get started with the jQuery PDFViewer by Kendo UI and use PDF.JS processing in the Kendo UI PDFViewer widget"
slug: pdfjs_processing_pdfviewer_widget
position: 2
---

# PDFjs Processing

By default, if no processing configuration is defined, the PDFViewer uses the PDF.js library.

[PDF.js](https://mozilla.github.io/pdf.js/) is an open-source project that is developed by Mozilla.

## Requirements

The following table showcases the compatibility between Kendo UI and the PDFJS library. Versions before Kendo UI 2024.4.1112 are not compatible with PDFJS 4.x.

| Major Releases												                                             | Compatible PDFJS Versions |
| :---															                                             | :---			             |
| [Kendo UI 2025.1.211 (2025 Q1)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-for-jquery-2025-1-211-(2025-q1))  | 4.6.82   |
| [Kendo UI 2024.4.1112 (2024 Q4)](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-for-jquery-2024-4-1112-(2024-q4))| 4.3.136  |
| [Kendo UI 2024.3.1015](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-for-jquery-2024-3-1015)  | 3.x, 2.x |

## Configuring with Kendo UI v2024.4.1112 and Later

Starting with v2024.4.1112(2024 Q4), the PDFViewer requires PDFJS version 4.x.x or later.

The following example demonstrates how to configure the PDFViewer to use PDF.js processing with versions starting with 4.x.x

```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.mjs" type="module"></script> <!-- Include pdf.js before the kendo scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.worker.mjs" type="module"></script> <!-- Include pdf.worker.js before the kendo scripts -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" type="module"></script>
    <script src="https://kendo.cdn.telerik.com/2025.1.211/js/kendo.all.min.js" type="module"></script>

    <div id="pdfviewer"></div>
    <script type="module">
        $("#pdfviewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: ""
            }
        });
    </script>
```

## Configuring with Kendo UI v2024.3.1015 and Earlier

Versions of Kendo UI before v2024.4.1112 are not compatible with version 4.x of PDFJS. You must use either PDFJS 2.x or 3.x.

The following example demonstrates how to configure the PDFViewer to use PDF.js processing with versions prior to 4.x.x.

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

## See Also

* [Basic Usage of the Kendo UI for jQuery PDFViewer (Demo)](https://demos.telerik.com/kendo-ui/pdfviewer/index)
* [JavaScript API Reference of the PDFViewer](/api/javascript/ui/pdfviewer)
