---
title: PDFJS Processing
page_title: PDFViewer PDFJS Processing | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to use PDF.JS processing in the Kendo UI PDFViewer HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore
position: 2
---

# PDFJS Processing

The PDFViewer uses the `pdf.js` library by default, if no processing configuration is defined. [PDF.JS](https://mozilla.github.io/pdf.js/) is an open-source project developed by Mozilla.

## Basic Configuration

PDF.JS Processing requires pdfjs lib scripts added to the page.

An example of a PDFViewer widget configured to use PDF.JS Processing.

###### Example

```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
        .PdfjsProcessing(pdf => pdf
            .File(Url.Content("~/Content/web/pdfViewer/sample.pdf"))
        )
        .Height(1200)
    )
```

## Troubleshooting

> **Important**
>
> PDF.JS Processing is not supported in IE9

PDF.JS requires additional configuration, to work properly in IE. 

###### Example
    <script>
        // The workerSrc property should be specified for IE support
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>


## See Also

* [PDFViewer Overview]({% slug htmlhelpers_pdfviewer_aspnetcore %})
* [DPL Processing]({% slug htmlhelpers_pdfviewer_dpl_processing_aspnetcore %})

For runnable examples on Kendo UI PDFViewer, refer to the [Telerik UI for ASP.NET Core Demos site](http://demos.telerik.com/aspnet-core/pdfviewer/index).
