---
title: PDF Export
page_title: PDF Export | Kendo UI Grid
description: "Learn how to set the PDF export functionality of the Kendo UI Grid widget."
slug: exporting_pdf_kendoui_grid_widget
position: 9
---

# PDF Export

As of the [Kendo UI Q3 2014 (2014.3.1119) release](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q3-2014) the Grid widget provides a built-in PDF export functionality.

## Set Up

To enable PDF export, include the corresponding toolbar command and configure the export settings.

* [Toolbar Configuration](/api/javascript/ui/grid#configuration-toolbar)
* [PDF Export Configuration](/api/javascript/ui/grid#configuration-pdf)
* [Online Demo](http://demos.telerik.com/kendo-ui/grid/pdf-export)

It is highly recommended that you include the Pako Deflate library in the page to enable compression.

The example below demonstrates how to enable the PDF export functionality of a Kendo UI Grid.

###### Example

```html
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
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

To initiate PDF export via code, call the [`saveAsPdf`](/api/javascript/ui/grid.html#methods-saveAsPdf) method.

> **Important**
> * By default, Kendo UI Grid exports the current page of the data with sorting, filtering, grouping, and aggregates applied.
> * The Grid uses the current column order, visibility, and dimensions to generate the PDF file.

## Features

### Export of All Pages

By default, the Kendo UI Grid exports only the current page of data. To export all pages set the [`allPages`](/api/javascript/ui/grid#configuration-pdf.allPages) option to `true`.

> **Important**
>
> When the `allPages` option is set to `true` and `serverPaging` is enabled, the Grid will make a `"read"` request for all data. If the data items are too many, the browser may become unresponsive. Consider implementing server-side export for such cases.

The example below demonstrates how to export all the pages of a Kendo UI Grid in PDF.

###### Example

```html
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
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

### Fit to Paper Size

By default, the [paper size](/api/javascript/ui/grid#configuration-pdf.paperSize) of the exported document is determined by the size of the Grid on the screen. For detailed information on the conversion from screen to document units, refer to the article on [dimensions and CSS units]({% slug drawingofhtmlelements_drawingapi %}#dimensions-and-css-units#).

This implies that the document can contain pages with different dimensions if the size of the Grid is not uniform for each data page.

Starting with the Kendo UI 2016.2 release, you will be able to specify a paper size that is going to be used for the whole document. The content will be scaled to fit the specified paper size. The automatic scale factor can be overridden&mdash;for example, to make room for additional page elements.

To make use of all the available space, the Grid will be enabled to:
- Adjust the column widths to fill the page. Avoid setting width on all columns.
- Vary the number of rows for each page, placing page breaks where appropriate.
- Omit the toolbar and pager.

> **Important**
> * This feature requires that all records are rendered at once albeit off-screen.
> * The exact maximum number of exportable rows will vary depending on the browser, system resources, template complexity, and other factors.
> * It is advisable to verify your own worst-case scenarios in each browser you intend to support.

The example below demonstrates how to export the Grid with a fixed paper size.

###### Example

```html
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
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

### Page Template

Starting from the 2016.2 release, the Grid allows you to specify a page template.
The template can be used to position the content, add headers, footers and other elements.
Styling is done using CSS. The template will be positioned in a container with the specified
paper size during export.

Available template variables include:
* pageNumber
* totalPages

> **Important**
>
> Using a template requires setting paper size. See above.

###### Example - Export With Page Template
```html
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
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

### Server Proxy

Internet Explorer 9 and Safari do not support the option for saving a file and require the implementation of a [server proxy]({% slug overview_savingfiles_kendoui %}#browser-support). Set the [`proxyURL`](/api/javascript/ui/grid#configuration-pdf.proxyURL) option to specify the server proxy URL, as shown below.

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
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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


### File Saving on Server

In some cases it is useful to send the generated file to a remote service. Do this by setting a `proxyUrl` and `forceProxy` to `true`.

If the proxy returns `204 No Content`, no "Save As..." dialog will appear on the client.

The example below demonstrates how to post files to the server.

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
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

### Custom Fonts Embedding: Unicode Support

The default fonts in PDF files do not support Unicode. To support international characters we need to embed an external font.

Kendo UI ships the [Deja Vu font family](http://dejavu-fonts.org/wiki/Main_Page) as part of its distributions. For more details on this, see the article on [custom fonts and PDF]({% slug drawingofhtmlelements_drawingapi %}#configuration-Custom).

The example below demonstrates how to handle custom fonts.

###### Example

```html
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
            "DejaVu Sans"             : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
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
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

All [known limitations]({% slug drawingofhtmlelements_drawingapi %}#known-limitations) of the HTML Drawing module apply. Most importantly:

* Right-to-left text is not supported.
* Images hosted on different domains might not be rendered, unless permissive [Cross-Origin HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) are provided by the server. Similarly, fonts might not be possible to load cross-domain.

Note that even with the proper CORS headers, IE9 will not be able to load images or fonts from another domain, and could raise an uncatchable security exception. If you need to support IE9, make sure you host images and fonts on the same domain as the application.

* The maximum document size is limited to 5080x5080mm (200x200 inches) by the PDF 1.5 specification. Larger files might not open in all viewers.
* Older browsers, such as Internet Explorer 9 and Safari, require the implementation of a server proxy. For more information on this, refer to [the `proxyUrl` configuration section](/api/javascript/ui/grid#configuration-pdf.proxyURL).
* PDF export is not supported in Internet Explorer 8 and older.

## Further Reading

* [Drawing HTML]({% slug drawingofhtmlelements_drawingapi %})
* [Export MVC Grid to PDF](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/pdf-export-server-side)
* [Export MVC Grid to CSV](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/csv-export-server-side)
* [Save Files with Kendo UI]({% slug overview_savingfiles_kendoui %})

## See Also

Other articles on the Kendo UI Grid:

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Remote Data Binding]({% slug remote_data_binding_grid %})
* [Localization of Messages]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Print the Grid]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
