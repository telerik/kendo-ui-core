---
title: DPL Processing
page_title: DPL Processing | Telerik UI PDFViewer HtmlHelper for ASP.NET MVC
description: "Learn how to use DPL processing in the Telerik UI PDFViewer HtmlHelper for ASP.NET MVC."
slug: dplprocessing_pdfviewerhelper_aspnetmvc
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
* The `Read.Url` option is mandatory, the `Open` and `Download` options are mandatory if the respective tools are displayed in the toolbar.

## Basic Configuration

The following example demonstrates how to configure the PDFViewer to use DPL Processing.

```
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
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

## See Also

* [DPL Processing by the PDFViewer HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/pdfviewer/dpl-processing)
* [Server-Side API](/api/pdfviewer)
