---
title: Overview
page_title: PDFViewer | Telerik UI for ASP.NET Core HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI PDFViewer HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_pdfviewer_aspnetcore
position: 1
---

# PDFViewer HtmlHelper Overview

The [Kendo UI PDFViewer](https://demos.telerik.com/aspnet-core/pdfviewer/index) displays PDF files in the browser.

It provides flexibility to choose the PDF library to be used for processing the file:

* [PDF.JS Processing](https://demos.telerik.com/aspnet-core/pdfviewer/index)
* [Telerik DPL Processing](https://demos.telerik.com/aspnet-core/pdfviewer/dpl-processing)

The PDFViewer consists of a toolbar and a scrollable container that wraps the page elements. Default tools collection includes `pager`, `open` and `download` tool.

The PDFViewer provides the following key features:
* Selection of PDF processing library.
* A built-in paging mechanism.
* Virtualization capabilities.
* A built-in default toolbar collection.
* Responsive capabilities and page scaling.

The PDFViewer HtmlHelper extension is a server-side wrapper for the [Kendo UI PDFViewer](http://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer) widget. For more information on the PDFViewer HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/pdfviewer/overview).

## Initializing the PDFViewer

You can initialize the PDFViewer from HTML either by [using PDF.JS](#using-pdfjs) or [with the Telerik Document Processing library](#using-telerik-document-processing).

### Using PDF.JS

The following example demonstrates how to initialize the PDFViewer by using [PDF.JS](https://mozilla.github.io/pdf.js/).

```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer") //The name of the PDFViewer is mandatory. It specifies the "id" attribute of the widget.
        .PdfjsProcessing(pdf => pdf
            .File(Url.Content("~/Content/web/pdfViewer/sample.pdf"))
        )
        .Height(1200)
    )
```

### Using Telerik Document Processing

The following example demonstrates how to initialize the PDFViewer by using the [Telerik Document Processing library](https://docs.telerik.com/devtools/document-processing/introduction):

```
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer") //The name of the PDFViewer is mandatory. It specifies the "id" attribute of the widget.
        .DplProcessing(dpl => {
            dpl.Read(r => r.Url(Url.Action("GetInitialPdf", "PdfViewer")));
            dpl.Upload(upload => upload.Url(Url.Action("GetPdf", "PdfViewer")).SaveField("file"));
            dpl.LoadOnDemand(true);
        })
        .Toolbar(toolbar =>
            toolbar.Items(items =>
            {
                items.Add().Command("PageChangeCommand").Type("pager").Name("pager");
                items.Add().Name("spacer").Type("spacer");
                items.Add().Command("OpenCommand").Type("button").Name("open").Icon("folder-open");
            })
        )
        .Height(1200)
    )
```

## Functionality and Features

* [PDF.js processing]({% slug htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore %})
* [DPL processing]({% slug htmlhelpers_pdfviewer_dpl_processing_aspnetcore %})

## Events

For a complete example on basic PDFViewer events, refer to the [demo on using the events of the PDFViewer](https://demos.telerik.com/aspnet-core/pdfviewer/events).

## See Also

* [Basic Usage of the PDFViewer HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pdfviewer/index)
* [Using the API of the PDFViewer HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pdfviewer/api)
* [JavaScript API Reference of the PDFViewer](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer)
