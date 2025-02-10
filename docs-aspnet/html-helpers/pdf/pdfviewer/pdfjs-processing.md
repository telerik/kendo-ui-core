---
title: PDFjs Processing
page_title: PDFjs Processing
description: "Learn how to use PDF.js processing in the Telerik UI PDFViewer component for {{ site.framework }}."
previous_url: /helpers/pdf/pdfviewer/pdfjs-processing
slug: htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore
position: 2
---

# PDFjs Processing

By default, if no processing configuration is defined, the PDFViewer uses the PDF.js library.

[PDF.js](https://mozilla.github.io/pdf.js/) is an open-source project that is developed by Mozilla.

## Requirements

The following table showcases the compatibility between {{ site.product }} and the PDF.js library. Versions before {% if site.core %}[2024.4.1112 (2024 Q4)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/telerik-ui-for-asp-net-core-2024-4-1112-(2024-q4)){% else%}[2024.4.1112 (2024 Q4)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/telerik-ui-for-asp-net-mvc-2024-4-1112-(2024-q4)){% endif %} are not compatible with PDF.js 4.x.

{% if site.core %}
| Major Releases												                                             | Compatible PDF.JS Versions |
| :---															                                             | :---			             |
| [{{ site.product }} 2025.1.211 (2025 Q1)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/telerik-ui-for-asp-net-core-2025-1-211-(2025-q1))  | 4.6.82   |
| [{{ site.product }} 2024.4.1112 (2024 Q4)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/telerik-ui-for-asp-net-core-2024-4-1112-(2024-q4))| 4.3.136  |
| [{{ site.product }} 2024.3.1015](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/telerik-ui-for-asp-net-core-2024-3-1015)  | 3.x, 2.x |
{% else %}
| Major Releases												                                             | Compatible PDF.JS Versions |
| :---															                                             | :---			             |
| [{{ site.product }} 2025.1.211 (2025 Q1)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/telerik-ui-for-asp-net-mvc-2025-1-211-(2025-q1))  | 4.6.82   |
| [{{ site.product }} 2024.4.1112 (2024 Q4)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/telerik-ui-for-asp-net-mvc-2024-4-1112-(2024-q4))| 4.3.136  |
| [{{ site.product }} 2024.3.1015](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/telerik-ui-for-asp-net-mvc-2024-3-1015)  | 3.x, 2.x |
{% endif %}

## Configuring with {{ site.product }} 2024 Q4 and Later

Starting with version 2024.4.1112 (2024 Q4), the PDFViewer requires PDF.js version 4.x.x or later.

Since PDF.js 4 (versions 4.x.x) uses <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank">ECMAScript modules</a>, the [required Kendo UI scripts]({% slug copyclientresources_aspnetmvc6_aspnetmvc%}) must be included as modules. Also, enable the `RenderAsModule` option, which will add `type="module"` to the initialization scripts of all Telerik UI components in the application.

The following example demonstrates how to configure the PDFViewer to use PDF.js processing with PDF.js 4.

{% if site.core %}
```Program.cs
    builder.Services.AddKendo(x => x.RenderAsModule = true);
```
{% else %}
```Global.asax
    KendoMvc.Setup(options =>
    {
        options.RenderAsModule = true;
    });
```
{% endif %}
```_Layout
    <link href="https://kendo.cdn.telerik.com/themes/10.0.1/default/default-ocean-blue.css" rel="stylesheet" type="text/css" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.mjs" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.mjs" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.all.min.js" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.aspnetmvc.min.js" type="module"></script>
```
```HtmlHelper
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
        .PdfjsProcessing(pdf => pdf.File("~/shared/web/pdfViewer/sample.pdf"))
        .Height(800)
    )

    <script type="module">
        $(document).ready(() => {
            var pdfviewer = $('#pdfviewer').data('kendoPdfViewer');
            console.log(pdfviewer);
        })  
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-pdfviewer name="pdfviewer" height="800">
        <pdfjs-processing file="@Url.Content(~/shared/web/pdfViewer/sample.pdf"")" />
    </kendo-pdfviewer>

    <script type="module">
        $(document).ready(() => {
            var pdfviewer = $('#pdfviewer').data('kendoPdfViewer');
            console.log(pdfviewer);
        })
    </script>
```
{% endif %}

## Configuring with {{ site.product }} Before Version 2024 Q4

The {{ site.product }} versions before 2024.4.1112 are not compatible with PDF.js version 4.x. You must use either PDF.js version 2.x or 3.x. 

The following example demonstrates how to configure the PDFViewer to use PDF.js processing with PDF.js version 2.2.2.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <kendo-pdfviewer name="pdfviewer" height="1200">
        <pdfjs-processing file="@Url.Content("~/Content/web/pdfViewer/sample.pdf")"/>
    </kendo-pdfviewer>
```
{% endif %}

## See Also

* [Server-Side API](/api/pdfviewer)
* [Using PDFViewer with PDF.js Version 4.x.x or Later](https://docs.telerik.com/{{ site.platform }}/knowledge-base/pdfviewer-pdfjs-script-workarounds)
