---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI PDFViewer component for {{ site.framework }}."
previous_url: /helpers/pdf/pdfviewer/overview
slug: htmlhelpers_pdfviewer_aspnetcore
position: 1
---

# {{ site.framework }} PDFViewer Overview

{% if site.core %}
The Telerik UI PDFViewer TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI PDFViewer widget.
{% else %}
The Telerik UI PDFViewer HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PDFViewer widget.
{% endif %}

The PDFViewer displays PDF files in the browser and consists of a toolbar and a scrollable container that wraps the page elements. The default tools collection includes the `pager`, `open`, and `download` tools. For processing files, it supports the PDF.JS Processing and Telerik DPL Processing libraries. Among the key features the PDFViewer provides are the selection of a PDF processing library, a built-in paging mechanism, virtualization capabilities, a built-in default toolbar collection, and responsive capabilities and page scaling.

* [Demo page for the PDFViewer HtmlHelper](https://demos.telerik.com/{{ site.platform }}/pdfviewer/index)
{% if site.core %}
* [Demo page for the PDFViewer TagHelper](https://demos.telerik.com/aspnet-core/pdfviewer/tag-helper)
{% endif %}

## Initializing the PDFViewer

You can initialize the PDFViewer from HTML either by [using PDF.JS](#using-pdfjs) or [with the Telerik Document Processing library](#using-telerik-document-processing).

### Using PDF.JS

The following example demonstrates how to initialize the PDFViewer by using [PDF.JS](https://mozilla.github.io/pdf.js/).

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <kendo-pdfviewer name="pdfviewer"
                     height="1200">
        <pdfjs-processing file="@(Url.Content("~/shared/web/pdfViewer/sample.pdf"))" />
    </kendo-pdfviewer>
```
{% endif %}

### Using Telerik Document Processing

The following example demonstrates how to initialize the PDFViewer by using the [Telerik Document Processing library](https://docs.telerik.com/devtools/document-processing/introduction).

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-pdfviewer height="1200"
                     name="pdfviewer">
        <dpl-processing load-on-demand="true">
            <read url="/PdfViewer/GetInitialPdf" />
            <upload url="/PdfViewer/GetPdf" save-field="file" />
        </dpl-processing>
        <toolbar enabled="true">
            <pdfviewer-toolbar-items>
                <pdfviewer-toolbar-item command="PageChangeCommand"
                                        type="pager"
                                        name="pager">
                </pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item name="spacer"
                                        type="spacer">
                </pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item command="OpenCommand"
                                        type="button"
                                        name="open"
                                        icon="folder-open">
                </pdfviewer-toolbar-item>
            </pdfviewer-toolbar-items>
        </toolbar>
    </kendo-pdfviewer>
```
{% endif %}

## Functionality and Features

* [PDF.js processing]({% slug htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore %})
* [DPL processing]({% slug htmlhelpers_pdfviewer_dpl_processing_aspnetcore %})
* [Toolbar and tools]({% slug htmlhelpers_pdfviewer_toolbar_aspnetcore %})

## Events

For a complete example on basic PDFViewer events, refer to the [demo on using the events of the PDFViewer](https://demos.telerik.com/{{ site.platform }}/pdfviewer/events).

## See Also

* [Basic Usage of the PDFViewer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/index)
{% if site.core %}
* [Basic Usage of the PDFViewer TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pdfviewer/tag-helper)
{% endif %}
* [Using the API of the PDFViewer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/api)
* [Server-Side API](/api/pdfviewer)
