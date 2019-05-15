---
title: DPL Processing
page_title: DPL Processing | Kendo UI PDFViewer
description: "Learn how to use DPL processing in the Kendo UI PDFViewer widget"
slug: dpl_processing_pdfviewer_widget
position: 3
---

# DPL Processing

The [Kendo UI PDFViewer widget](https://demos.telerik.com/kendo-ui/pdfviewer/index) can be configured to use [Telerik Document Processing library](https://docs.telerik.com/devtools/document-processing/introduction) for PDF processing.

> **Important**
>
> DPL Processing is BETA version and has the following limitations:
> * Clipping elements and Gradients are currently not supported.
> * SVG or encoded images in other formats might not render correctly.

## Basic Configuration

**Requirements**

* DPL Processing depends on the `Telerik.Web.PDF` assembly.
* To use DPL Processing in a project, it must target 4.6.2 .NET Framework. 
* The `read.url` option is mandatory, the `open` and `download` options are mandatory if the respective tools are displayed in the toolbar.

An example of a PDFViewer widget configured to use DPL Processing.

##### Example

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

* [PDFViewer Overview]({% slug overview_kendoui_pdfviewer_widget %})
* [PDF.JS Processing]({% slug pdfjs_processing_pdfviewer_widget %})

For runnable examples on Kendo UI PDFViewer, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/pdfviewer/index).
