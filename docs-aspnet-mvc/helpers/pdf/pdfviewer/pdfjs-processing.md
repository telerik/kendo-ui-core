---
title: PDFJS Processing
page_title: PDFJS Processing | Kendo UI PDFViewer HtmlHelper for ASP.NET MVC
description: "Learn how to use PDF.JS processing in the Kendo UI PDFViewer HtmlHelper for ASP.NET MVC."
slug: pdfjsprocessing_pdfviewerhelper_aspnetmvc
position: 2
---

# PDFJS Processing

The PDFViewer uses the `pdf.js` library by default, if no processing configuration is defined. [PDF.JS](https://mozilla.github.io/pdf.js/) is an open-source project developed by Mozilla.

## Basic Configuration

PDF.JS Processing requires pdfjs lib scripts added to the page.

An example of a PDFViewer widget configured to use PDF.JS Processing.

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

> PDF.JS Processing is not supported in IE9

PDF.JS requires additional configuration, to work properly in IE. 

    <script>
        // The workerSrc property should be specified for IE support
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>


## See Also

* [PDFViewer Overview]({% slug overview_pdfviewerhelper_aspnetmvc %})
* [DPL Processing]({% slug dplprocessing_pdfviewerhelper_aspnetmvc %})

For runnable examples on Kendo UI PDFViewer, refer to the [Telerik UI for ASP.NET MVC Demos site](http://demos.telerik.com/aspnet-mvc/pdfviewer/index).
