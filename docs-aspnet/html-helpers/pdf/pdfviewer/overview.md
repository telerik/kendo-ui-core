---
title: Overview
page_title: Overview
description: "Learn more about the Telerik UI PDFViewer component for {{ site.framework }}, and discover its built-in features like the toolbar and the supported events."
previous_url: /helpers/pdf/pdfviewer/overview
slug: htmlhelpers_pdfviewer_aspnetcore
position: 0
---

# {{ site.framework }} PDFViewer Overview

{% if site.core %}
The Telerik UI PDFViewer TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI PDFViewer widget.
{% else %}
The Telerik UI PDFViewer HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PDFViewer widget.
{% endif %}

The PDFViewer displays PDF files in the browser and consists of a toolbar and a scrollable container that wraps the page elements. The default tools collection includes the `pager`, `open`, and `download` tools. For processing files, it supports the PDF.JS Processing and Telerik DPL Processing libraries. Among the key features the PDFViewer provides are the selection of a PDF processing library, a built-in paging mechanism, virtualization capabilities, a built-in default toolbar collection, and responsive capabilities and page scaling.

* [Demo page for the PDFViewer](https://demos.telerik.com/{{ site.platform }}/pdfviewer/index)

## Initializing the PDFViewer

You can initialize the PDFViewer from HTML either by using [PDF.JS](#using-pdfjs) or [the Telerik Document Processing library](#using-telerik-document-processing).

### Using PDF.JS

The following example demonstrates how to initialize the PDFViewer by using [PDF.JS](https://mozilla.github.io/pdf.js/).

{% if site.core %}
```C# Program.cs
    builder.Services.AddKendo(x => x.RenderAsModule = true);
```
{% else %}
```C# Global.asax
    KendoMvc.Setup(options =>
    {
        options.RenderAsModule = true;
    });
```
{% endif %}
```HtmlHelper
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.mjs" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs" type="module"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.all.min.js" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.aspnetmvc.min.js" type="module"></script>

    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer") // The name of the PDFViewer is mandatory. It specifies the "id" attribute of the component.
        .PdfjsProcessing(pdf => pdf
            .File(Url.Content("~/Content/web/pdfViewer/sample.pdf"))
        )
        .Height(1200)
    )
```
{% if site.core %}
```TagHelper
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.mjs" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs" type="module"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.all.min.js" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.aspnetmvc.min.js" type="module"></script>

    <kendo-pdfviewer name="pdfviewer" height="1200">
        <pdfjs-processing file="@Url.Content("~/Content/web/pdfViewer/sample.pdf")"/>
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

* [PDF.js Processing]({% slug htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore %})&mdash;You can configure the PDFViewer to use the PDF.js library for PDF processing and visualization. 
* [DPL Processing]({% slug htmlhelpers_pdfviewer_dpl_processing_aspnetcore %})&mdash;The component can use the Telerik Document Processing library to process and visualize a PDF document.
* [Toolbar and Tools]({% slug htmlhelpers_pdfviewer_toolbar_aspnetcore %})&mdash;The PDFViewer offers diverse tools and commands.
* [Annotations]({% slug annotations_pdfviewer_aspnetcore %})&mdash;You can highlight important text areas with different colors or add free text notes in the document.
* [Form Filling]({% slug form_filling_pdfviewer_core %})&mdash;You can import files containing PDF forms and fill in the input elements.
* [Events]({% slug events_pdfviewer_aspnetcore %})&mdash;To control the behavior of the component upon user interaction, you can use the events that the component emits.
* [Accessibility]({% slug htmlhelpers_pdfviewer_accessibility %})&mdash;The PDFViewer is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_aspnetcore_pdfviewer %}) for faster navigation.

## Next Steps

* [Getting Started with the PDFViewer]({% slug aspnetcore_pdfviewer_getting_started %})
* [Basic Usage of the PDFViewer HtmlHelper and TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer)
* [Using the PDFViewer with the Telerik Document Processing library (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/dpl-processing)

## See Also

* [Basic Usage of the PDFViewer for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/index)
{% if site.core %}
* [PDFViewer in Razor Pages]({% slug htmlhelpers_pdfviewer_aspnetcore_razor_page %})
{% endif %}
* [Using the API of the PDFViewer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/api)
* [Knowledge Base Section](/knowledge-base)
