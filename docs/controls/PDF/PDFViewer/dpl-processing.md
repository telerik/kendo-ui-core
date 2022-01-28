---
title: DPL Processing
page_title: jQuery PDFViewer Documentation | DPL Processing
description: "Get started with the jQuery PDFViewer by Kendo UI and use the Telerik Document Processing library."
slug: dpl_processing_pdfviewer_widget
position: 3
---

# DPL Processing

You can configure the PDFViewer to use the [Telerik Document Processing library](https://docs.telerik.com/devtools/document-processing/introduction) for PDF processing.

> DPL Processing is in its beta version and has the following limitations:
> * The clipping of elements and gradients is currently not supported.
> * SVG or encoded images in other formats might not render correctly.

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

## See Also

* [Basic Usage of the PDFViewer (Demo)](https://demos.telerik.com/kendo-ui/pdfviewer/index)
* [JavaScript API Reference of the PDFViewer](/api/javascript/ui/pdfviewer)
