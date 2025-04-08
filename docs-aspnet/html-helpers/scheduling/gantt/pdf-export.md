---
title: PDF Export
page_title: PDF Export
description: "Export the Telerik UI Gantt for {{ site.framework }} to PDF."
slug: htmlhelpers_gantt_pdf_export_aspnetcore
position: 5
---

# PDF Export

The Telerik {{ site.product_short }} Gantt component provides a built-in PDF export functionality.

For a runnable example, refer to the [demo on exporting the Gantt to PDF](https://demos.telerik.com/{{ site.platform }}/gantt/pdf-export).

## Getting Started

To enable PDF export:

1. Include the corresponding toolbar command and set the export settings.
    * [Toolbar configuration](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/ganttbuilder#toolbarsystemaction)
    * [PDF export configuration](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/ganttbuilder#pdfsystemaction)
1. Include the `Pako Deflate` library in the page to enable compression.

The following example demonstrates how to enable the PDF export functionality of the Gantt.

{% if site.core %}
```HtmlHelper
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Toolbar(tb =>
        {
            tb.Pdf();
        })
        .Pdf(pdf => pdf
            .FileName("Gantt Export.pdf")
        )
        //...additional Gantt configuration...
    )
```
```TagHelper
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>
    
    <kendo-gantt name="gantt">
        <toolbars>
            <toolbar name="pdf">
            </toolbar>
        </toolbars>
        <pdf file-name="Gantt Export.pdf">
	    </pdf>
        <!--  ...additional Gantt configuration...  -->
    </kendo-gantt>
```
{% else %}
```HtmlHelper
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Toolbar(tb =>
        {
            tb.Add().Name("pdf");
        })
        .Pdf(pdf => pdf
            .FileName("Gantt Export.pdf")
        )
        //...additional Gantt configuration...
    )
```
{% endif %}

## Saving Files on the Server

To send the generated file to a remote endpoint, use the `ProxyURL()` and `ForceProxy()` methods.

{% if site.core %}
```HtmlHelper
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Toolbar(tb =>
        {
            tb.Pdf();
        })
        .Pdf(pdf => pdf
            .FileName("Gantt Export.pdf")
            .ForceProxy(true)
            .ProxyURL(Url.Action("PdfExportSave", "Home"))
        )
        //...additional Gantt configuration...
    )
```
```TagHelper
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>
    
    <kendo-gantt name="gantt">
        <toolbars>
            <toolbar name="pdf">
            </toolbar>
        </toolbars>
        <pdf file-name="Gantt Export.pdf" 
             force-proxy="true" 
             proxy-url="@Url.Action("PdfExportSave", "Home")">
        </pdf>
    </kendo-gantt>
```
{% else %}
```HtmlHelper
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Toolbar(tb =>
        {
            tb.Add().Name("pdf");
        })
        .Pdf(pdf => pdf
            .FileName("Gantt Export.pdf")
            .ForceProxy(true)
            .ProxyURL(Url.Action("PdfExportSave", "Home"))
        )
        //...additional Gantt configuration...
    )
```
{% endif %}

```C# ServerProxy
    [HttpPost]
    public ActionResult PdfExportSave(string contentType, string base64, string fileName)
    {
        var fileContents = Convert.FromBase64String(base64);
        return File(fileContents, contentType, fileName);
    }
```

## Embedding Unicode Characters

The default fonts in PDF files do not provide Unicode support. To support international characters, you have to embed an external font. For more information on the supported [Deja Vu font family](https://dejavu-fonts.github.io) as part of the Kendo UI distributions and other fonts, refer to the Kendo UI for jQuery article on [custom fonts and PDF](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/embedded-fonts).

The following example demonstrates how to handle custom fonts.

```CSS Style
    <style>
        /*
            Use the DejaVu Sans font for display and embedding in the PDF file.
            The standard PDF fonts have no support for Unicode characters.
        */
        .k-gantt {
            font-family: "DejaVu Sans", "Arial", sans-serif;
        }

        /* Hide the Gantt toolbar during export */
        .k-pdf-export .k-gantt-toolbar {
            display: none;
        }
    </style>
```

## Further Reading

* [PDF output by the Kendo UI Drawing library](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/overview)
* [Drawing DOM elements with the Kendo UI Drawing library](https://docs.telerik.com/kendo-ui/framework/drawing/dom-elements/overview)
* [Saving files with Kendo UI](https://docs.telerik.com/kendo-ui/framework/saving-files)

## See Also

* [Server-Side API](/api/gantt)
* [PDF Export of the Telerik UI Gantt for {{ site.framework }} Demo](https://demos.telerik.com/{{ site.platform }}/gantt/pdf-export)