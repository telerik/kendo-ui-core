---
title: DPL Processing
page_title: jQuery PDFViewer Documentation - DPL Processing
description: "Get started with the jQuery PDFViewer by Kendo UI and use the Telerik Document Processing library."
components: ["pdfviewer"]
slug: dpl_processing_pdfviewer_widget
position: 3
---

# DPL Processing

You can configure the PDFViewer to use the [Telerik Document Processing library](https://docs.telerik.com/devtools/document-processing/introduction) for PDF processing.

## Requirements

* DPL Processing depends on the `Telerik.Web.PDF` assembly.
* To use DPL Processing in a project, it must target 4.6.2 .NET Framework.
* The `Read.Url` option is mandatory, the `open` and `download` options are mandatory if the respective tools are displayed in the toolbar.

## Basic Configuration

The following example demonstrates how to configure the PDFViewer to use DPL Processing.

    <div id="pdfviewer"></div>
    <script>
        $("#pdfviewer").kendoPDFViewer({
            dplProcessing: {
                read: {
                    url: ""
                },
                download: {
                    url: ""
                },
                upload: {
                    url: ""
                }
            },
            toolbar: {
                items: [
                    "pager", "spacer", "open", "download"
                ]
            }
        });
    </script>

## Known Limitations

When using DPL Processing in the PdfViewer, the following limitations may be observed:

 * Element clipping and gradient clipping are not supported.
 * SVG images or images encoded in certain formats may not render correctly.

## See Also

* [Basic Usage of the PDFViewer (Demo)](https://demos.telerik.com/kendo-ui/pdfviewer/index)
* [JavaScript API Reference of the PDFViewer](/api/javascript/ui/pdfviewer)
