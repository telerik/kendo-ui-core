---
title: PDF Export
page_title: jQuery Grid Documentation - PDF Export
description: "Get started with the jQuery Grid by Kendo UI and learn how to set the PDF export functionality."
previous_url: /controls/grid/pdf-export 
slug: exporting_pdf_kendoui_grid_widget
position: 2
---

# PDF Export

The Grid component provides a built-in PDF export functionality.

For a runnable example, refer to the [demo on exporting the Grid to PDF](https://demos.telerik.com/kendo-ui/grid/pdf-export).

## Getting Started

To enable PDF export:

1. Include the corresponding toolbar command and set the export settings.
    * [Toolbar configuration](/api/javascript/ui/grid/configuration/toolbar)
    * [PDF export configuration](/api/javascript/ui/grid/configuration/pdf)
1. Include the Pako Deflate library in the page to enable compression.

> Starting with v2023.3.1115 the Pako library is no longer distributed with the rest of the Kendo UI for jQuery scripts. You must use one of the official distribution channels such as `unpkg` instead.

To initiate PDF export through code, call the [`saveAsPdf`](/api/javascript/ui/grid/methods/saveaspdf) method.

> * By default, Kendo UI Grid exports the current page of the data with sorting, filtering, grouping, and aggregates applied.
> * The Grid uses the current column order, visibility, and dimensions to generate the PDF file.
> * When the Grid is exported to PDF, the [`dataBound`](/api/javascript/ui/grid/events/databound) event is fired. This is needed as the Grid has to page itself in order to allow the drawing mechanism to copy the content. This also allows modifying the content of the Grid before it is exported to PDF.

The following example demonstrates how to enable the PDF export functionality of the Grid.

```dojo
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

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

> When the `allPages` option is set to `true` and `serverPaging` is enabled, the Grid will make multiple `"read"` requests for all data. There will be a request for each page with data. If the data items are too many, the browser may become unresponsive. In such cases, use server-side export.

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

By default, the [paper size](/api/javascript/ui/grid/configuration/pdf.papersize) of the exported document is determined by the size of the Grid on the screen. This implies that the document can contain pages with different dimensions if the size of the Grid is not uniform for each data page. For detailed information on the conversion from screen to document units, refer to the article on [dimensions and CSS units]({% slug dimensionscssunits_drawing %}).

You can specify a paper size that will be applied to the whole document. The content will be scaled to fit the specified paper size. The automatic scale factor can be overridden, for example, to make room for additional page elements. To use all available space, the Grid will:
- Adjust the column widths to fill the page so try to avoid setting width on all columns.
- Vary the number of rows for each page, placing page breaks where appropriate.
- Omit the toolbar and the pager.

> * To fit its content to the paper size, all records have to be rendered at once.
> * The exact maximum number of exportable rows will vary depending on the browser, system resources, template complexity, and other factors.
> * A good practice is to verify your own worst-case scenarios in each browser you intend to support.

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

The Grid allows you to specify a page template and use the template to position the content, add headers, footers, and other elements. The styling of the exported document is done by using CSS. During the PDF export, the template is positioned in a container with the specified paper size. The supported page template variables are:
* `pageNumber`
* `totalPages`

> To use a page template, you have to set the paper size.

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

```dojo
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
```

### Saving Files on the Server

To send the generated file to a remote service, set a `proxyUrl` and `forceProxy` to `true`. If the proxy returns `204 No Content`, no **Save As...** dialog will appear on the client.

```dojo
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
```

### Embedding Unicode Characters

The default fonts in PDF files do not provide Unicode support. To support international characters, you have to embed an external font. For more information on the supported [Deja Vu font family](https://dejavu-fonts.github.io) as part of the Kendo UI distributions and other fonts, refer to the article on [custom fonts and PDF]({% slug embeddedfonts_drawing %}).

The following example demonstrates how to handle custom fonts.

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
            "DejaVu Sans"             : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });
    </script>

    <!-- Load Pako ZLIB library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

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

## Exclude Column From Exporting

In some scenarios, you might want to hide given column or multiple columns from being exported. This can be achieved using the [Exportable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.exportable) setting.

It can also be set to an Object containing different values for Excel and PDF exporting modes, providing separate options for each:

```javascript
columns: [
   { 
       field: 'ContactTitle',
       exportable: { pdf: true, excel: false }
   }
]
```

## Known Limitations

* All [known limitations]({% slug supportedbrowsers_drawingapi %}) of the HTML Drawing module apply.
* Exporting a hierarchical Grid is not supported.
* PDF export is not supported when the Grid has a locked (frozen) column enabled. If the algorithm decides to move a node to the next page, all DOM nodes that follow it will be also moved although there might be enough space for part of them on the current page.
* The built-in PDF export option of the Kendo UI Grid exports as many columns as it can fit on a page with a defined page size. If the columns do not fit, they will be cropped. If you need to support more columns that can be fit on a page, use the [side-to-side PDF export]({% slug tabulardata_drawingapi %}) approach instead.

## Further Reading

* [Export tabular data as PDF]({% slug tabulardata_drawingapi %})
* [Change the columns widths during PDF export]({% slug grid-pdf-export-change-column-widths %})
* [Exclude columns from the PDF exported file]({% slug grid-exclude-columns-from-exported-pdf %})
* [PDF output]({% slug pdfderawingexport_drawingapi %})
* [Drawing HTML]({% slug drawingofhtmlelements_drawingapi %})
* [Saving files with Kendo UI]({% slug overview_savingfiles_kendoui %})

## KB Articles on PDF Export

* [Exporting the Full Page Content]({% slug howto_export_allpagesand_full_page_content_pdf_grid %})
* [Exporting All Pages]({% slug howto_export_all_pagesto_pdf_grid %})
* [Exporting Multiple Pages with Variable Row Height]({% slug howto_export_multiple_pageswith_variable_rowheight_pdf_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Editing Functionality of the Grid]({% slug editing_kendoui_grid_widget %})
* [Rendering and Dimensions of the Grid]({% slug width_kendoui_grid_widget %})
* [Localization of Messages in the Grid]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export of the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Printing of the Grid]({% slug exporting_pdf_kendoui_grid_widget %})
