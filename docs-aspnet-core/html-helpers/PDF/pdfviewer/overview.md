---
title: Overview
page_title: PDFViewer | Telerik UI for ASP.NET Core HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI PDFViewer HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_pdfviewer_aspnetcore
position: 1
---

# PDFViewer HtmlHelper Overview

The PDFViewer HtmlHelper extension is a server-side wrapper for the [Kendo UI PDFViewer](http://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer) widget.

The [Kendo UI PDFViewer](https://demos.telerik.com/aspnet-core/pdfviewer/index) displays PDF files in the browser. It provides flexibility to choose the PDF library to be used for processing the file:

* [PDF.JS Processing](https://demos.telerik.com/aspnet-core/pdfviewer/index)
* [Telerik DPL Processing](https://demos.telerik.com/aspnet-core/pdfviewer/dpl-processing)

The PDFViewer consists of a toolbar and a scrollable container that wraps the page elements. Default tools collection includes `pager`, `open` and `download` tool.

**Key Features**

* Allows you to choose the PDF processing lib
* Provides built-in paging mechanism
* Has virtualization capabilities
* Provides built-in default toolbar collection
* Has responsive capabilities and page scaling

## Getting Started

### Initialization

While initializing the widget using the HTML helper, choose the PDF processing library and setup its settings. You could initialize the widgets using [PDF.JS](https://mozilla.github.io/pdf.js/):

###### Example

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

or using the [Telerik Document Processing library](https://docs.telerik.com/devtools/document-processing/introduction):

###### Example

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

## See also

* [PDFViewer Official Demos](https://demos.telerik.com/aspnet-core/pdfviewer/index)
* [PDFViewer PDFJS Processing]({% slug htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore %})
* [PDFViewer DPL Processing]({% slug htmlhelpers_pdfviewer_dpl_processing_aspnetcore %})
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
