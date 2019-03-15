---
title: PDF Export
page_title: jQuery Grid Documentation | PDF Export | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to set the PDF export functionality."
previous_url: /pdf-export
slug: exporting_pdf_kendoui_grid_widget
position: 2
---

# PDF Export

As of the [Kendo UI Q3 2014 (2014.3.1119) release](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-q3-2014), the Grid widget provides a built-in PDF export functionality.

For a runnable example, refer to the [demo on exporting the Grid to PDF](https://demos.telerik.com/kendo-ui/grid/pdf-export).

## Getting Started

To enable PDF export:

1. Include the corresponding toolbar command and set the export settings.
    * [Toolbar configuration](/api/javascript/ui/grid/configuration/toolbar)
    * [PDF export configuration](/api/javascript/ui/grid/configuration/pdf)
1. Include the Pako Deflate library in the page to enable compression.

To initiate PDF export through code, call the [`saveAsPdf`](/api/javascript/ui/grid/methods/saveaspdf) method.

> * By default, Kendo UI Grid exports the current page of the data with sorting, filtering, grouping, and aggregates applied.
> * The Grid uses the current column order, visibility, and dimensions to generate the PDF file.

The following example demonstrates how to enable the PDF export functionality of the Grid.

###### Example

```dojo
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["pdf"],
            pdf: {
                fileName: "Kendo UI Grid Export.pdf"
            },
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 7
            },
            sortable: true,
            pageable: true,
            columns: [
                { width: 300, field: "ProductName", title: "Product Name" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>
```

## Configuration

With regard to its PDF export, the Grid enables you to:
* [Export all its data to PDF](#exporting-all-pages)
* [Fit content to paper size](#fitting-content-to-paper-size)
* [Specify page templates](#specifying-page-templates)
* [Use server proxy](#using-server-proxy)
* [Save files on the server](#saving-files-on-the-server)
* [Embed Unicode characters](#embedding-unicode-characters)

### Exporting All Pages

By default, the Kendo UI Grid exports only the current page of data. To export all pages, set the [`allPages`](/api/javascript/ui/grid/configuration/pdf.allpages) option to `true`.

> When the `allPages` option is set to `true` and `serverPaging` is enabled, the Grid will make a `"read"` request for all data. If the data items are too many, the browser may become unresponsive. In such cases, use server-side export.

###### Example

```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["pdf"],
            pdf: {
                allPages: true
            },
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 7
            },
            pageable: true,
            columns: [
                { width: 300, field: "ProductName", title: "Product Name" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>
```

### Fitting Content to Paper Size

By default, the [paper size](/api/javascript/ui/grid/configuration/pdf.papersize) of the exported document is determined by the size of the Grid on the screen. This implies that the document can contain pages with different dimensions if the size of the Grid is not uniform for each data page. For detailed information on the conversion from screen to document units, refer to the article on [dimensions and CSS units]({% slug drawingofhtmlelements_drawingapi %}#dimensions-and-css-units#).

As of the Kendo UI 2016.2 release, you can specify a paper size that will be applied to the whole document. The content will be scaled to fit the specified paper size. The automatic scale factor can be overridden, for example, to make room for additional page elements. To use all available space, the Grid will:
- Adjust the column widths to fill the page. Avoid setting width on all columns.
- Vary the number of rows for each page, placing page breaks where appropriate.
- Omit the toolbar and pager.

> * To fit its content to the paper size, all records have to be rendered at once.
> * The exact maximum number of exportable rows will vary depending on the browser, system resources, template complexity, and other factors.
> * A good practice is to verify your own worst-case scenarios in each browser you intend to support.

###### Example

```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["pdf"],
            pdf: {
                allPages: true,
                paperSize: "A4",
                landscape: true,
                scale: 0.75
            },
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 7
            },
            pageable: true,
            columns: [
                { width: 300, field: "ProductName", title: "Product Name" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>
```

### Specifying Page Templates

As of the Kendo UI 2016.2 release, the Grid allows you to specify a page template and use the template to position the content, add headers, footers, and other elements. The styling of the exported document is done by using CSS. During the PDF export, the template is positioned in a container with the specified paper size. The supported page template variables are:
* `pageNumber`
* `totalPages`

> To use a page template, you have to set the paper size. For more information, refer to the section on [page templates](#page-templates).

###### Example

```dojo
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

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            toolbar: ["pdf"],
            pdf: {
                allPages: true,
                paperSize: "A4",
                margin: { top: "3cm", right: "1cm", bottom: "1cm", left: "1cm" },
                landscape: true,
                template: $("#page-template").html()
            },
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 7
            },
            pageable: true,
            columns: [
                { width: 300, field: "ProductName", title: "Product Name" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>
```

### Using Server Proxy

Internet Explorer 9 and Safari do not support the option for saving a file and require the implementation of a [server proxy]({% slug overview_savingfiles_kendoui %}#browser-support). To specify the server proxy URL, set the [`proxyURL`](/api/javascript/ui/grid/configuration/pdf.proxyurl) option.

###### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["pdf"],
            pdf: {
                fileName: "Kendo UI Grid Export.pdf",
                proxyURL: "/proxy"
            },
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 7
            },
            sortable: true,
            pageable: true,
            columns: [
                { width: 300, field: "ProductName", title: "Product Name" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>


### Saving Files on the Server

To send the generated file to a remote service, set a `proxyUrl` and `forceProxy` to `true`. If the proxy returns `204 No Content`, no **Save As...** dialog will appear on the client.

###### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["pdf"],
            pdf: {
                forceProxy: true,
                proxyURL: "/proxy"
            },
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 7
            },
            pageable: true,
            columns: [
                { width: 300, field: "ProductName", title: "Product Name" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>

### Embedding Unicode Characters

The default fonts in PDF files do not provide Unicode support. To support international characters, you have to embed an external font. For more information on the supported [Deja Vu font family](https://dejavu-fonts.github.io) as part of the Kendo UI distributions and other fonts, refer to the article on [custom fonts and PDF]({% slug drawingofhtmlelements_drawingapi %}#configuration-Custom).

The following example demonstrates how to handle custom fonts.

###### Example

```dojo
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
        // Import DejaVu Sans font for embedding

        // NOTE: Only required if the Kendo UI stylesheets are loaded
        // from a different origin, e.g. kendo.cdn.telerik.com
        kendo.pdf.defineFont({
            "DejaVu Sans"             : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });
    </script>

    <!-- Load Pako ZLIB library to enable PDF compression -->
    <script src="//kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["pdf"],
            pdf: {
                allPages: true
            },
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 7
            },
            pageable: true,
            columns: [
                { width: 300, field: "ProductName", title: "Product Name" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>
```

## Known Limitations

* All [known limitations]({% slug drawingofhtmlelements_drawingapi %}#known-limitations) of the HTML Drawing module apply.
* Right-to-left text is not supported.
* Exporting a hierarchical Grid is not supported.
* PDF export is not supported when the Grid has a locked (frozen) column enabled. If the algorithm decides to move a node to the next page, all DOM nodes that follow it will be also moved although there might be enough space for part of them on the current page.
* Images that are hosted on different domains might not be rendered unless permissive [Cross-Origin HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) are provided by the server. Similarly, fonts might not be possible to load cross-domain. Even with the proper CORS headers, IE9 will not be able to load images or fonts from another domain, and may raise an uncatchable security exception. If your project requires IE9 support, host images and fonts on the same domain as the application.
* The maximum document size is limited to 5080x5080mm (200x200 inches) by the PDF 1.5 specification. Larger files might not open in all viewers.
* Older browsers, such as Internet Explorer 9 and Safari, require the implementation of a server proxy. For more information, refer to [the `proxyUrl` configuration section](/api/javascript/ui/grid/configuration/pdf.proxyurl).

## Further Reading

* [Drawing HTML]({% slug drawingofhtmlelements_drawingapi %})
* [Exporting MVC Grid to PDF](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/pdf-export-server-side)
* [Exporting MVC Grid to CSV](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/csv-export-server-side)
* [Saving Files with Kendo UI]({% slug overview_savingfiles_kendoui %})

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Editing Functionality of the Grid]({% slug editing_kendoui_grid_widget %})
* [Rendering and Dimensions of the Grid]({% slug width_kendoui_grid_widget %})
* [Localization of Messages in the Grid]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export of the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Printing of the Grid]({% slug exporting_pdf_kendoui_grid_widget %})
* [Knowledge Base Section](/knowledge-base)
