---
title: DPL Processing
page_title: DPL Processing
description: "Learn how to use the Telerik Document Processing library in the Telerik UI PDFViewer component for {{ site.framework }}."
previous_url: /helpers/pdf/pdfviewer/dpl-processing
slug: htmlhelpers_pdfviewer_dpl_processing_aspnetcore
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

```HtmlHelper
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

## See Also

* [DPL Processing by the PDFViewer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/dpl-processing)
* [Server-Side API](/api/pdfviewer)
