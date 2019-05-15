---
title: DPL Processing
page_title: PDFViewer DPL Processing | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to use DPL processing in the Kendo UI PDFViewer HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_pdfviewer_dpl_processing_aspnetcore
position: 3
---

# DPL Processing

The PDFViewer can be configured to use [Telerik Document Processing library](https://docs.telerik.com/devtools/document-processing/introduction) for PDF processing.

> **Important**
>
> DPL Processing is BETA version and has the following limitations:
> * Clipping elements and Gradients are currently not supported.
> * SVG or encoded images in other formats might not render correctly.

## Basic Configuration

**Requirements**

* DPL Processing depends on the `Telerik.Web.PDF` assembly.
* To use DPL Processing in a project, it must target 4.6.2 .NET Framework. 
* The `Read.Url` option is mandatory, the `Open` and `Download` options are mandatory if the respective tools are displayed in the toolbar.

An example of a PDFViewer widget configured to use DPL Processing.

###### Example

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

* [PDFViewer Overview]({% slug htmlhelpers_pdfviewer_aspnetcore %})
* [PDF.JS Processing]({% slug htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore %})

For runnable examples on Kendo UI PDFViewer, refer to the [Telerik UI for ASP.NET Core Demos site](http://demos.telerik.com/aspnet-core/pdfviewer/index).
