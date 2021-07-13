---
title: PDF Export
page_title: PDF Export
description: "Export the Telerik UI Grid for {{ site.framework }} to PDF."
slug: pdfexport_gridhelper_aspnetcore
position: 3
---
{% if site.core %}
    {% assign pdfbuilder = "GridPdfSettingsBuilder" %}
{% else %}
    {% assign pdfbuilder = "PDFSettingsBuilder" %}
{% endif %}

# PDF Export

The {{ site.product_short }} Grid HtmlHelper provides a built-in PDF export functionality.

For a runnable example, refer to the [demo on exporting the Grid to PDF](https://demos.telerik.com/{{ site.platform }}/grid/pdf-export).

With regard to its PDF export, the Grid enables you to:
* [Export all its data to PDF](#exporting-all-pages)
* [Fit content to paper size](#fitting-content-to-paper-size)
* [Specify page templates](#specifying-page-templates)
* [Use server proxy](#using-server-proxy)
* [Save files on the server](#saving-files-on-the-server)
* [Embed Unicode characters](#embedding-unicode-characters)

## Getting Started

To enable PDF export:

1. Include the corresponding toolbar command and set the export settings.
    * [Toolbar configuration](/api/Kendo.Mvc.UI.Fluent/GridToolBarCommandFactory#pdf)
    * [PDF export configuration](/api/Kendo.Mvc.UI.Fluent/{{ pdfbuilder }})
1. Include the Pako Deflate library in the page to enable compression.

To initiate PDF export, press the **Toolbar** button or use the [Grid client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid) and call the [`saveAsPdf`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/saveaspdf) method.

> * By default, the Grid exports the current page of the data with sorting, filtering, grouping, and aggregates applied.
> * The Grid uses the current column order, visibility, and dimensions to generate the PDF file.

The following example demonstrates how to enable the PDF export functionality of the Grid.

        <!-- Load Pako Deflate library to enable PDF compression -->
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/pako_deflate.min.js"></script>

        @(Html.Kendo().Grid<.ProductViewModel>()
            .Name("grid")
            .ToolBar(tools => tools.Pdf())
            .Pdf(pdf => pdf
                .FileName("Kendo UI Grid Export.pdf")
            )
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

## Exporting All Pages

By default, the Grid exports only the current page of data. To export all pages, use the [`AllPages()`](/api/Kendo.Mvc.UI.Fluent/{{ pdfbuilder }}#allpagessystemboolean) method.

> When the `AllPages()` method is used with and server paging (Ajax binding default), the Grid will make a `"read"` request for all data. If the data items are too many, the browser may become unresponsive. In such cases, use server-side export.

        @(Html.Kendo().Grid<.ProductViewModel>()
            .Name("grid")
            .ToolBar(tools => tools.Pdf())
            .Pdf(pdf => pdf
                .AllPages()
            )
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

## Fitting Content to Paper Size

By default, the paper size of the exported document is determined by the size of the Grid on the screen. This implies that the document can contain pages with different dimensions if the size of the Grid is not uniform for each data page. For detailed information on the conversion from screen to document units, refer to the Kendo UI for jQuery article on [dimensions and CSS units](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/dimensions-css-units).

You can specify a paper size that will be applied to the whole document. The content will be scaled to fit the specified paper size. The automatic scale factor can be overridden, for example, to make room for additional page elements. To use all available space, the Grid will:
- Adjust the column widths to fill the page so try to avoid setting width on all columns.
- Vary the number of rows for each page, placing page breaks where appropriate.
- Omit the toolbar and the pager.

> * To fit the Grid content to the paper size, all records have to be rendered at once.
> * The exact maximum number of exportable rows will vary depending on the browser, system resources, template complexity, and other factors.
> * A good practice is to verify your own worst-case scenarios in each browser you intend to support.

        @(Html.Kendo().Grid<.ProductViewModel>()
            .Name("grid")
            .ToolBar(tools => tools.Pdf())
            .Pdf(pdf => pdf
                .AllPages()
                .Landscape()
                .PaperSize("A4")
                .Scale(0.75)
            )
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

## Specifying Page Templates

The Grid allows you to specify a page [`TemplateId`](/api/Kendo.Mvc.UI.Fluent/{{ pdfbuilder }}#templateidsystemstring) and use the template to position the content, add headers, footers, and other elements. The styling of the exported document is done by using CSS. During the PDF export, the template is positioned in a container with the specified paper size.

> To use a page template, you have to set the paper size.

The Grid supports the following page template variables:
* `pageNumber`
* `totalPages`

        <style>
            body {
                font-family: "DejaVu Serif";
                font-size: 12px;
            }

            .page-template {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }

            .page-template .header {
                position: absolute;
                top: 30px;
                left: 30px;
                right: 30px;

                border-bottom: 1px solid #888;

                text-align: center;
                font-size: 18px;
            }

            .page-template .footer {
                position: absolute;
                bottom: 30px;
                left: 30px;
                right: 30px;
            }
        </style>

        <script type="x/kendo-template" id="page-template">
            <div class="page-template">
                <div class="header">
                    Acme Inc.
                </div>
                <div class="footer">
                    <div style="float: right">Page #: pageNum # of #: totalPages #</div>
                </div>
            </div>
        </script>

        @(Html.Kendo().Grid<.ProductViewModel>()
            .Name("grid")
            .ToolBar(tools => tools.Pdf())
            .Pdf(pdf => pdf
                .AllPages()
                .PaperSize("A4")
                .Margin("2cm", "1cm", "1cm", "1cm")
                .Landscape()
                .RepeatHeaders()
                .Scale(0.75)
                .TemplateId("page-template")
            )
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

## Using Server Proxy

Internet Explorer 9 and Safari do not support the option for saving a file and require the implementation of a [server proxy](https://docs.telerik.com/kendo-ui/framework/saving-files). To specify the server proxy URL, use the [`ProxyURL()`](/api/Kendo.Mvc.UI.Fluent/{{ pdfbuilder }}#proxyurlsystemstring) method.

        @(Html.Kendo().Grid<.ProductViewModel>()
            .Name("grid")
            .ToolBar(tools => tools.Pdf())
            .Pdf(pdf => pdf
                .AllPages()
                .ProxyURL("/MyProxy")
                .Landscape()
                .PaperSize("A4")
                .Scale(0.75)
            )
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

## Saving Files on the Server

To send the generated file to a remote service, use the `ProxyURL()` and `ForceProxy()` methods. If the proxy returns `204 No Content`, no **Save As...** dialog will appear on the client.

```Razor
    @(Html.Kendo().Grid<.ProductViewModel>()
        .Name("grid")
        .ToolBar(tools => tools.Pdf())
        .Pdf(pdf => pdf
            .ForceProxy(true)
            .ProxyURL("/Pdf_Export_Save")
        )
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )
```
```SampleProxy
    [HttpPost]
    public ActionResult Pdf_Export_Save(string contentType, string base64, string fileName)
    {
        var fileContents = Convert.FromBase64String(base64);
        return File(fileContents, contentType, fileName);
    }
```

## Embedding Unicode Characters

The default fonts in PDF files do not provide Unicode support. To support international characters, you have to embed an external font. For more information on the supported [Deja Vu font family](https://dejavu-fonts.github.io) as part of the Kendo UI distributions and other fonts, refer to the Kendo UI for jQuery article on [custom fonts and PDF](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/embedded-fonts).

The following example demonstrates how to handle custom fonts.

        <style>
            /*
                Use the DejaVu Sans font for display and embedding in the PDF file.
                The standard PDF fonts have no support for Unicode characters.
            */
            .k-grid {
                font-family: "DejaVu Sans", "Arial", sans-serif;
            }
        </style>
    
        <script>
            // Import the DejaVu Sans font for embedding.
    
            // NOTE: Only required if the Kendo UI stylesheets are loaded
            // from a different origin, for example, kendo.cdn.telerik.com.
            kendo.pdf.defineFont({
                "DejaVu Sans"             : "https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}    /styles/fonts/DejaVu/DejaVuSans.ttf",
                "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}    /styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
                "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}    /styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
                "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}    /styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
            });
        </script>
    
        <!-- Load Pako ZLIB library to enable PDF compression -->
        <script src="//kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/pako_deflate.min.js"></script>
    
        @(Html.Kendo().Grid<.ProductViewModel>()
            .Name("grid")
            .ToolBar(tools => tools.Pdf())
            .Pdf(pdf => pdf
                .AllPages()
            )
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

## Exclude Column From Exporting

In some scenarios, you might want to hide given column or multiple columns from being exported. This can be achieved using the [Exportable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.exportable) setting.

```Razor
columns.Bound(p => p.ProductName).Exportable(false);
```

It can also be set in a detailed fashion containing different values for Excel and PDF exporting modes, providing separate options for each:

```Razor
columns.Bound(p => p.ProductName).Exportable(x=> x.Pdf(true).Excel(false));
```

## Known Limitations

* All [known limitations](https://docs.telerik.com/kendo-ui/framework/drawing/limitations-browser-support) of the Kendo UI for jQuery HTML Drawing module apply.
* Exporting a hierarchical Grid is not supported.
* PDF export is not supported when the Grid has a locked (frozen) column enabled. If the algorithm decides to move a node to the next page, all DOM nodes that follow it will be also moved although there might be enough space for part of them on the current page.
* The built-in PDF export option of the Kendo UI Grid exports as many columns as it can fit on a page with a defined page size. If the columns do not fit, they will be cropped. If you need to support more columns that can be fit on a page, use the Kendo UI for jQuery [side-to-side PDF export](https://docs.telerik.com/kendo-ui/framework/pdf/pdf-tabular-data) approach instead.

## Further Reading

* [Export tabular data as PDF in Kendo UI](https://docs.telerik.com/kendo-ui/framework/pdf/pdf-tabular-data)
* [PDF output by the Kendo UI Drawing library](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/overview)
* [Drawing DOM elements with the Kendo UI Drawing library](https://docs.telerik.com/kendo-ui/framework/drawing/dom-elements/overview)
* [Saving files with Kendo UI](https://docs.telerik.com/kendo-ui/framework/saving-files)

## See Also

* [Server-Side API](/api/grid)
* [Rendering and Dimensions of the Grid HtmlHelper for {{ site.framework }}]({% slug width_grid_aspnetcore %})
* [Adaptive Rendering of the Grid HtmlHelper for {{ site.framework }}]({% slug adaptive_rendering_gridhelper_aspnetcore %})
