---
title: Overview
page_title: PDFViewer | Telerik UI for ASP.NET MVC HTML Helpers
description: "Get started with the server-side wrapper for the Kendo UI PDFViewer widget for ASP.NET MVC."
slug: overview_pdfviewerhelper_aspnetmvc
position: 1
---

# PDFViewer HtmlHelper Overview

The PDFViewer HtmlHelper extension is a server-side wrapper for the [Kendo UI PDFViewer](http://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer) widget.

The [Kendo UI PDFViewer](https://demos.telerik.com/aspnet-mvc/pdfviewer) displays PDF files in the browser. It provides flexibility to choose the PDF library to be used for processing the file:

* [PDF.JS Processing](https://demos.telerik.com/aspnet-mvc/pdfviewer)
* [Telerik DPL Processing](https://demos.telerik.com/aspnet-mvc/pdfviewer/dpl-processing)

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

```Razor
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer") // The name of the PDFViewer is mandatory. It specifies the "id" attribute of the widget.
        .PdfjsProcessing(pdf => pdf
            .File(Url.Content("~/Content/web/pdfViewer/sample.pdf"))
        )
        .Height(1200)
    )
```
```ASPX
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <%: Html.Kendo().PDFViewer()
        .Name("pdfviewer") // The name of the PDFViewer is mandatory. It specifies the "id" attribute of the widget.
        .PdfjsProcessing(pdf => pdf
            .File(Url.Content("~/Content/web/pdfViewer/sample.pdf"))
        )
        .Height(1200)
    %>
```

or using the [Telerik Document Processing library](https://docs.telerik.com/devtools/document-processing/introduction):

```Razor
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer") // The name of the PDFViewer is mandatory. It specifies the "id" attribute of the widget.
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
```ASPX
    <%: Html.Kendo().PDFViewer()
        .Name("pdfviewer") // The name of the PDFViewer is mandatory. It specifies the "id" attribute of the widget.
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
    %>
```

## See also

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI PDFViewerBuilder Widget](http://docs.telerik.com/kendo-ui/controls/PDF/PDFViewer/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})