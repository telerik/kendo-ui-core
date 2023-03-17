---
title: PDF Export
page_title: PDF Export
description: "Export the Telerik UI TreeList for {{ site.framework }} to PDF."
slug: htmlhelpers_treelist_aspnetcore_pdfexport
position: 3
---

# PDF Export

The {{ site.product_short }} TreeList component provides a built-in PDF export functionality.

For a runnable example, refer to the [demo on exporting the TreeList to PDF](https://demos.telerik.com/{{ site.platform }}/treelist/pdf-export).

## Getting Started

To enable PDF export:

1. Include the corresponding toolbar command and set the export settings.
    * [Toolbar configuration](/api/Kendo.Mvc.UI.Fluent/TreeListToolbarFactory#pdf)
    * [PDF export configuration](/api/Kendo.Mvc.UI.Fluent/TreeListBuilder#pdfsystemactionkendomvcuifluenttreelistpdfsettingsbuildert)
1. Include the Pako Deflate library in the page to enable compression.

To initiate the PDF export, press the **Toolbar** button or use the [TreeList client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist) and call the [`saveAsPDF`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/methods/saveaspdf) method.

The following example demonstrates how to enable the PDF export functionality of the TreeList.

```HtmlHelper

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/pako_deflate.min.js"></script>

    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .Toolbar(tools => tools.Pdf())
        .Pdf(pdf => pdf
            .FileName("Kendo UI TreeList Export.pdf")
            .ProxyURL(Url.Action("Pdf_Export_Save"))
        )
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("All", "EmployeeDirectory"))
        )
    )

```
{% if site.core %}
```TagHelper

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/pako_deflate.min.js"></script>

    <kendo-treelist name="treelist">
        <toolbar>
            <treelist-toolbar-button name="pdf"/>
        </toolbar>
        <pdf file-name="Kendo UI TreeList Export.pdf" proxy-url="@Url.Action("Pdf_Export_Save","TreeList")"/>
        <treelist-datasource>
            <transport>
                <read url="@Url.Action("All","EmployeeDirectory")"/>
            </transport>
            ...
        </treelist-datasource>
        <!-- Other configuration. -->
    </kendo-treelist>

```
{% endif %}


## Embedding Unicode Characters

The default fonts in PDF files do not provide Unicode support. To support international characters, you have to embed an external font. For more information on the supported [Deja Vu font family](https://dejavu-fonts.github.io) as part of the Kendo UI distributions and other fonts, refer to the Kendo UI for jQuery article on [custom fonts and PDF](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/embedded-fonts).

The following example demonstrates how to handle custom fonts.

```HtmlHelper
    <style>
        /*
            Use the DejaVu Sans font for display and embedding in the PDF file.
            The standard PDF fonts have no support for Unicode characters.
        */
        .k-treelist {
            font-family: "DejaVu Sans", "Arial", sans-serif;
        }
    </style>

    <script>
        // Import the DejaVu Sans font for embedding.
        // NOTE: Only required if the Kendo UI stylesheets are loaded
        // from a different origin, for example, kendo.cdn.telerik.com.
        kendo.pdf.defineFont({
            "DejaVu Sans"             : "https://kendo.cdn.telerik.com/2022.3.1109/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com/2022.3.1109/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com/2022.3.1109/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/2022.3.1109/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });
    </script>

    <!-- Load Pako ZLIB library to enable PDF compression -->
    <script src="//kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/pako_deflate.min.js"></script>

    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .Toolbar(tools => tools.Pdf())
        .Pdf(pdf => pdf
            .FileName("Kendo UI TreeList Export.pdf")
        )
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("All", "EmployeeDirectory"))
        )
    )
```
{% if site.core %}
```TagHelper
    <style>
        /*
            Use the DejaVu Sans font for display and embedding in the PDF file.
            The standard PDF fonts have no support for Unicode characters.
        */
        .k-treelist {
            font-family: "DejaVu Sans", "Arial", sans-serif;
        }
    </style>

    <script>
        // Import the DejaVu Sans font for embedding.
        // NOTE: Only required if the Kendo UI stylesheets are loaded
        // from a different origin, for example, kendo.cdn.telerik.com.
        kendo.pdf.defineFont({
            "DejaVu Sans"             : "https://kendo.cdn.telerik.com/2022.3.1109/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com/2022.3.1109/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com/2022.3.1109/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/2022.3.1109/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });
    </script>

    <!-- Load Pako ZLIB library to enable PDF compression -->
    <script src="//kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/pako_deflate.min.js"></script>

    <kendo-treelist name="treelist">
        <toolbar>
            <treelist-toolbar-button name="pdf"/>
        </toolbar>
        <pdf file-name="Kendo UI TreeList Export.pdf"/>
        <treelist-datasource>
            <transport>
                <read url="@Url.Action("All","EmployeeDirectory")"/>
            </transport>
            ...
        </treelist-datasource>
        <!-- Other configuration. -->
    </kendo-treelist>

```
{% endif %}

## See Also

* [PDF Export by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/pdf-export)
* [Server-Side API](/api/treelist)
