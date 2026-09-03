---
title: PivotGridV2
page_title: Configuration, methods and events of Kendo UI PivotGridV2
description: Code examples for PivotGridV2 UI widget configuration.
res_type: api
component: pivotgridv2
---

# kendo.ui.PivotGridV2

Represents the Kendo UI PivotGridV2 widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### dataSource `Object|kendo.data.PivotDataSourceV2`

The data source of the widget which is used to display values. Can be a JavaScript object which represents a valid data source configuration or an existing [kendo.data.PivotDataSourceV2](/api/javascript/data/pivotdatasourcev2)
instance.

If the `dataSource` option is set to a JavaScript object the widget will initialize a new [kendo.data.PivotDataSourceV2](/api/javascript/data/pivotdatasourcev2) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.PivotDataSourceV2](/api/javascript/data/pivotdatasourcev2) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
How do I configure the data source for a Kendo UI PivotGridV2 widget? Configure or set the data source for a pivot grid to manage and display aggregated or summarized data by connecting to either a custom JavaScript object defining pivot data configurations or an already instantiated pivot data source object. Enable binding to dynamic or static pivot data collections, allowing control over how summarized values, aggregates, and multidimensional data are supplied, initialized, or reused for rendering pivot tables. This includes specifying, linking, or assigning data providers for pivot analysis, data aggregation, and multi-level grouping to ensure the pivot view accurately reflects the underlying data source setup or an existing dataset instance.
</div>

#### Example - set dataSource as a JavaScript object

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

#### Example - set dataSource as an existing kendo.data.PivotDataSourceV2 instance

    <div id="pivotgrid"></div>
    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
        type: "xmla",
        columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
        rows: [{ name: "[Product].[Product]" }],
        measures: ["[Measures].[Internet Sales Amount]"],
        transport: {
            connection: {
                catalog: "Adventure Works DW 2008R2",
                cube: "Adventure Works"
            },
            read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
        }
    });

    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: dataSource
    });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.


<div class="meta-api-description">
How to prevent automatic data loading in Kendo UI PivotGridV2 on initial load? Control and configure the initial data loading behavior of a pivot grid by enabling or disabling automatic data binding on initialization, allowing you to defer or prevent immediate fetch and rendering of data. Manage when the pivot grid connects to and loads data from its configured source, such as disabling auto-load to avoid redundant requests during shared data source updates or dynamic data changes triggered by events. This setting helps optimize performance and data synchronization by allowing manual or event-driven binding rather than automatic loading at startup. Adjust, toggle, or set data fetch timing, loading control, and synchronization behaviors for pivot table components to suit scenarios requiring explicit data binding control, delayed initialization, or event-based refresh of data source connections.
</div>

#### Example - disable automatic binding

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        autoBind: false,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    var dataSource = $("#pivotgrid").data("kendoPivotGridV2").dataSource;
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true` the user could navigate the component using the keyboard navigation. By default keyboard navigation is disabled.


<div class="meta-api-description">
How to enable keyboard navigation in Kendo UI PivotGridV2 control? Enable or configure keyboard navigation and focus control for navigating the PivotGridV2 component using arrow keys, tab, or other keyboard inputs, allowing users to move through cells, headers, and interactive elements without a mouse. Control whether keyboard accessibility, focus management, and navigation trapping are enabled or disabled during setup, improving usability for keyboard-only or assistive technology users. This setting supports configuring keyboard support, tab order, focus cycling, and interactive element traversal within the data grid or pivot table interface.
</div>

#### Example - enable keyboard navigation

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        excel: {
            fileName: "Sales-Report.xlsx",
            forceProxy: true
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

> Check [Keyboard navigation](https://demos.telerik.com/kendo-ui/pivotgridv2/keyboard-navigation) for a live demo.

### excel `Object`

Configures the Kendo UI PivotGridV2 Excel export settings.


<div class="meta-api-description">
How do I customize Excel file export options in Kendo UI for jQuery PivotGridV2 control? Control exporting pivot grid data to Excel files with options to set custom file names, configure workbook and worksheet properties, adjust formatting and data mapping during export, manage download methods or proxy settings, and fine-tune export behavior for generating, saving, or downloading Excel spreadsheets from grid data.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        excel: {
            fileName: "Sales-Report.xlsx",
            forceProxy: true
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### excel.fileName `String` *(default: "Export.xslx")*

Specifies the file name of the exported Excel file.


<div class="meta-api-description">
How do I customize the filename of an Excel file exported from a Kendo UI PivotGrid? Specify or customize the default name for Excel files generated during export from a PivotGrid, configure the downloaded spreadsheet filename, set or override the exported .xlsx file title, control or manage the saved Excel file name in the browser, enable custom naming for reports or data exports, define the target filename for downloaded Excel documents, adjust the export filename dynamically, and use this setting to ensure exported grids save with meaningful or specific file names for easier identification and organization.
</div>

#### Example - set the default Excel file name

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        excel: {
            fileName: "InternetSalesAmount.xlsx"
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: {
                    url: "https://demos.telerik.com/service/v2/olap/msmdpump.dll",
                    dataType: "text",
                    contentType: "text/xml",
                    type: "POST"
                }
            },
            schema: {
                type: "xmla"
            }
        }
    });
    </script>

### excel.filterable `Boolean` *(default: false)*

Enables or disables column filtering in the Excel file. Not to be mistaken with the pivotgrid's configurator filtering feature.


<div class="meta-api-description">
How to enable Excel filter dropdowns in PivotGridV2 export? Enable or disable automatic column filtering in exported Excel files by configuring whether the generated spreadsheet includes Excel AutoFilter capabilities, controlling if users can sort and filter columns directly after export. This setting determines whether the exported workbook has built-in filter dropdowns on each column header, separate from any internal grid filtering functionality. Control inclusion of Excel column filters in exported files, set filter toggle for XLSX exports, customize export output to include or exclude interactive filter options, and manage how filtering applies to exported data columns for easier post-export data analysis and sorting.
</div>

#### Example - enable filtering in the output Excel file

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        excel: {
            filterable: true
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: {
                    url: "https://demos.telerik.com/service/v2/olap/msmdpump.dll",
                    dataType: "text",
                    contentType: "text/xml",
                    type: "POST"
                }
            },
            schema: {
                type: "xmla"
            }
        }
    });
    </script>

### excel.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](/api/javascript/ui/pivotgridv2#configuration-excel.proxyURL) even if the browser supports saving files locally.


<div class="meta-api-description">
How to always route Excel file generation through a server proxy in Kendo UI PivotGridV2? Control export behavior to always route Excel file generation through a server proxy instead of direct client downloads, enabling centralized server-side processing such as logging, authentication, proxy URL configuration, bypassing browser local save limitations, handling cross-origin requests, enforcing backend file delivery, or ensuring exports comply with server policies regardless of client capabilities.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        excel: {
            fileName: "Sales-Report.xlsx",
            forceProxy: true,
            proxyURL: "/save"
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### excel.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

Such browsers are IE version 9 and lower and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with the "Content-Disposition" header set to
`attachment; filename="<fileName.xslx>"`.


<div class="meta-api-description">
How do I handle Excel file downloads in older browsers like IE9 with Kendo UI PivotGridV2? Specify the server endpoint URL used to stream or proxy Excel export files from a web component to browsers that block direct downloads, such as older versions of Internet Explorer (IE9 and below) and Safari, by configuring a server-side handler that accepts POST requests containing the file’s MIME type, base64-encoded content, and desired filename, then decodes and serves the file with correct content-disposition headers for seamless Excel file downloads through a secure or cross-origin compliant proxy mechanism.
</div>

#### Example - set the server proxy URL

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        excel: {
            proxyURL: "/save"
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: {
                    url: "https://demos.telerik.com/service/v2/olap/msmdpump.dll",
                    dataType: "text",
                    contentType: "text/xml",
                    type: "POST"
                }
            },
            schema: {
                type: "xmla"
            }
        }
    });
    </script>

### pdf `Object`

Configures the Kendo UI PivotGridV2 PDF export settings.


<div class="meta-api-description">
How to customize PDF export settings in Kendo UI PivotGridV2? Configure PDF export settings for pivot grid data to generate downloadable PDF files with options to set filename, paper dimensions, page margins, orientation like landscape or portrait, scaling factors, and export all pages or specific content ranges, including controlling server-side or proxy configurations for PDF creation, enabling flexible exporting, saving, printing, and sharing of pivot table or grid reports in portable document format.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            fileName: "Sales-Report.pdf",
            autoPrint: true,
            margin: {
                top: "2cm",
                left: "1cm",
                right: "1cm",
                bottom: "1cm"
            }
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.author `String` *(default: null)*

The author of the PDF document.


<div class="meta-api-description">
How to set author information in PDF export for PivotGridV2 control? Control or specify the author name embedded in PDF metadata during export, enabling customization of the document’s creator information for indexing, searching, or displaying in PDF viewers and document management systems; configure, set, or update the PDF author field to ensure the exported file carries accurate author attribution for tracking, identification, and metadata management.
</div>

#### Example - set the author


    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            author: "John Doe"
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.


<div class="meta-api-description">
How to enable automatic print after generating PDF in Kendo UI PivotGridV2? Automatically trigger the browser print dialog when a PDF finishes loading, enabling immediate printing without manual commands. Configure the export process to prompt users to print the generated PDF file on load or suppress this behavior to avoid automatic print dialogs after exporting. Control whether the print window appears instantly upon PDF rendering, facilitating seamless print workflows, instant print actions, or deferred printing options in PDF export and viewer integrations within data grids or reporting components. Enable or disable direct print prompt triggering after PDF creation to suit varied printing automation needs.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            fileName: "Sales-Report.pdf",
            autoPrint: true
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.

### pdf.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce actual hyperlinks in the exported PDF file.


<div class="meta-api-description">
How to prevent links from being clickable in Kendo UI PivotGridV2 PDF export? Manage PDF export settings to include or exclude active clickable hyperlinks in exported documents, controlling whether links appear as real, interactive URLs or as plain text without navigation capabilities. Configure the export process to either preserve functional links within PDF reports or suppress link embedding for a static, non-interactive PDF output. Enable or disable hyperlink generation during PDF creation to control user interaction with URLs in exported content, ensuring flexibility in how navigation and references are handled in exported pivot grid or data reports. Set options to prevent link activation for secure or simplified PDF presentations or allow fully linked PDFs for enhanced interactivity and user access to referenced sources. Adjust PDF export preferences to toggle between dynamic links and static text representations of URLs, catering to different use cases requiring clickable connections or link avoidance in generated reports.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            fileName: "Sales-Report.pdf",
            avoidLinks: true
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.


<div class="meta-api-description">
How do I customize the creator metadata in Kendo UI PivotGridV2 when exporting to PDF? Configure the PDF document creator metadata to specify or customize the origin application, authoring tool, or generation source embedded in exported PDF files from data grids or pivot tables, enabling identification of the software or system that produced the PDF, controlling metadata tags for creator attribution, setting or modifying creator fields in PDF exports, and ensuring traceability or branding information within generated reports or export outputs.
</div>

#### Example - set the creator

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            creator: "John Doe"
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.


<div class="meta-api-description">
How to set custom date for PDF export in Kendo UI PivotGridV2? Configure or specify the PDF export creation time, control or set the document generation timestamp for PDF files produced from PivotGridV2 exports, customize the metadata date field embedded in the generated PDF document, adjust or override the default current date and time used during PDF creation to reflect a specific export moment, define the PDF file’s creation date metadata to influence document properties and search indexing consistency when exporting grid data.
</div>

#### Example - set the date

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            date: new Date("2014/10/10")
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.


<div class="meta-api-description">
How to customize PDF filename when exporting pivot grid data in Kendo UI? Set or customize the name of the PDF file generated when exporting or saving data from a pivot grid or similar tabular component, controlling the download filename used during export processes, specifying the output file name for PDF export, enabling configuration of the exported document’s title in scenarios involving export, save, or download of pivot grid content to PDF format, and managing the naming of exported files to match user preferences or application requirements.
</div>

#### Example - set the default PDF file name

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            fileName: "Products.pdf"
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](/api/javascript/ui/pivotgridv2#configuration-pdf.proxyURL) even if the browser supports saving files locally.


<div class="meta-api-description">
How to force PDF export from Kendo UI PivotGridV2 through a server-side proxy? Control whether PDF exports from the pivot grid are routed through a server-side proxy instead of direct browser download, enabling forced forwarding of generated PDF content to a specified proxy URL regardless of local browser save capabilities; configure options to enable server-based handling, redirect file output, enforce proxy use for exporting PDFs, and manage routing of export data through backend services for pivot table PDF generation.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            fileName: "Sales-Report.pdf",
            forceProxy: true,
            proxyURL: "/save"
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.


<div class="meta-api-description">
How to control image quality when exporting PivotGridV2 as a PDF with JPEG compression? Adjust the export image quality in PDF generation by setting the level of JPEG compression to balance between file size and visual clarity, enabling control over the resolution and fidelity of graphics embedded within exported PDF reports. Optimize export settings to reduce PDF document size with higher compression or enhance image sharpness by increasing quality values, useful for customizing export outputs, handling large data grids, and managing storage or transmission constraints. Configure export parameters to influence rendering quality, image detail, compression ratio, and file footprint when converting data visualizations, reports, or pivot grids into PDF format with JPEG encoding options.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            fileName: "Sales-Report.pdf",
            jpegQuality: 0.5
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.


<div class="meta-api-description">
How to keep original PNG images when exporting PDF from Kendo UI PivotGridV2? Control maintaining original PNG images within exported PDF files, enabling preservation or conversion of embedded graphics during export from grid or pivot table views; configure image format retention, specify whether to retain PNG format without alteration when generating PDFs from data grids or pivot structures, manage output file image fidelity by toggling embedded image preservation settings that affect how raster images like PNGs are handled in exported documents, optimize PDF export quality by setting flags to keep or convert inline PNG images within pivot grid exports, ensuring either exact PNG retention or flexible format changes depending on export preferences.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            fileName: "Sales-Report.pdf",
            keepPNG: true
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.


<div class="meta-api-description">
How do I set custom keywords for PDF exports in Kendo UI PivotGridV2? Configure or set metadata keywords for PDF exports to enhance document indexing, searchability, and discoverability in external search engines, document management systems, or PDF viewers. Control the export process by specifying relevant keywords, tags, or descriptors tied to the PDF’s metadata to improve file organization, retrieval, and content filtering when exporting data grids or reports. Enable custom keyword embedding within the PDF metadata to support advanced search queries, content categorization, and efficient document management workflows involving exported reports or data summaries.
</div>

#### Example - set the keywords

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            keywords: "northwind products"
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.landscape `Boolean` *(default: false)*

Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.


<div class="meta-api-description">
How do I change the orientation of PDF exports in a Kendo UI PivotGridV2 to landscape? Adjust or configure PDF export orientation and page layout to switch between landscape and portrait modes, enabling wide-format output by setting or toggling page width as the primary dimension for printed or exported documents, controlling paper orientation for reports, tables, or pivot grids when generating PDFs, setting horizontal versus vertical page layout to optimize viewing and printing, enabling reversed page dimensions to display wider content, managing export or print orientation for large or detailed data grids, specifying page directionality for PDF outputs to accommodate user preferences or device requirements.
</div>

#### Example - enable landscape mode

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            landscape: true
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).


<div class="meta-api-description">
How do I set custom margins for PDF exports in a Kendo UI PivotGridV2? Set, adjust, or control printable page margins for PDF exports with customizable values allowing units such as millimeters, centimeters, inches, or points. Configure page edges, padding, or whitespace around exported PDF content from data grids or pivot tables by specifying margin sizes numerically or as strings with unit suffixes. Enable precise layout control for exported PDF documents, defining top, bottom, left, and right margins to optimize print formatting, spacing, or page fit during export operations. Manage PDF export margin settings to influence page boundary spacing and ensure content aligns with desired print layout standards for PivotGrid or tabular data visualizations.
</div>

#### Example - set the margins

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            margin: {
                left: 10,
                right: "10pt",
                top: "10mm",
                bottom: "1in"
            }
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How do I set the bottom margin when exporting data to PDF in Kendo UI PivotGridV2? Adjust or configure the bottom page margin spacing when exporting data grids to PDF formats, controlling the printable area's lower boundary to optimize page layout, spacing, or alignment in exported reports. Enable setting the bottom margin as numeric point values to customize page breaks, footer spacing, or whitespace below content when generating PDFs from pivot tables or grid data exports. Manage page formatting, margin size, and layout adjustments specifically for the lower edge of exported PDF files containing tabular or pivot grid data.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            margin: {
                bottom: "2cm"
            }
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How do I adjust the left margin in Kendo UI PivotGridV2 PDF exports? Adjust or configure the left margin spacing for PDF exports from a pivot grid, controlling the amount of blank space on the left side of the page when generating documents. This setting enables customization of left page indentation, padding, or offset in points units to optimize layout, align content, and ensure proper formatting in exported PDF files. Control the distance between the document edge and content, set left boundary in points, and fine-tune horizontal spacing for professional PDF reports from pivot grid data exports.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            margin: {
                left: "1cm"
            }
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How to adjust right margin when exporting pivot grid data to PDF? Adjust or configure the right page margin spacing when exporting grid or pivot table data to PDF, controlling the right-side page padding or whitespace for printed reports, documents, or layouts. Enable setting numeric right margin values to manage page formatting, prevent content clipping, control page breaks, and customize PDF output width on the right edge, ensuring precise layout alignment in exported PDF files from pivot grids or tabular data components.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            margin: {
                right: "1cm"
            }
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How do I adjust the top margin when exporting data to a PDF with Kendo UI PivotGridV2? Adjust or configure the vertical spacing at the top edge of a PDF page when exporting grid or table data to PDF format, set the top margin size in points to control the distance between the page's upper boundary and the content, modify or specify numeric values to customize top page padding or whitespace for exported PivotGrid or tabular data, tweak or define the upper page margin to influence layout, formatting, and visual spacing of content in generated PDF reports or documents.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            margin: {
                top: "2cm"
            }
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".


<div class="meta-api-description">
How do I set the paper size for PDF export in a Kendo UI PivotGridV2? Control and configure the PDF export page dimensions by setting the document’s paper size, specifying standard formats like A4 or A3, or custom widths and heights in points, inches, centimeters, or millimeters to precisely tailor the output page layout and scale. Enable setting fixed page sizes or rely on automatic sizing based on content dimensions, ensuring that exported PDFs from pivot grid components match desired print or digital display standards, accommodating variable page width, height, custom units, manual size overrides, and responsive scaling options for precise PDF layout control during export operations.
</div>

#### Example - set custom paper size

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            paperSize: ["20mm", "20mm"]
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser is not capable of saving files locally, for example, Internet Explorer 9 and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with the "Content-Disposition" header set to
`attachment; filename="<fileName.pdf>"`.


<div class="meta-api-description">
How to enable PDF export in Kendo UI PivotGridV2 for older browsers? Configure the server-side proxy URL for streaming generated PDF files when browsers lack local file-saving capabilities, enabling file export support for legacy browsers like Internet Explorer 9 and Safari by forwarding POST requests containing base64-encoded PDF content, MIME type, and target filename; this proxy endpoint receives encoded PDF data and must decode and serve the document with proper content-disposition headers to facilitate user downloads, helping developers control and enable seamless PDF exporting through a backend service that handles file streaming and download responses in environments without direct client-side file saving.
</div>

#### Example - set the server proxy URL

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            proxyURL: "/save"
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.


<div class="meta-api-description">
How do I control where exported PDF files from my Kendo UI PivotGridV2 open after being generated? Control or configure the location where exported PDF files open or display after export, including options to open in a new browser tab, current window, or within a designated iframe by specifying target names like _blank, _self, or custom iframe identifiers; manage PDF display behavior after export through proxy settings that handle the content disposition for inline viewing, enabling flexible output placement for generated PDF documents from pivot grid exports, supporting scenarios where you need to set, enable, or direct the exported file’s rendering destination in your web application.
</div>

#### Example - open the generated document in a new window

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            forceProxy: true,
            proxyURL: "/save",
            proxyTarget: "_blank"
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.


<div class="meta-api-description">
How to set subject metadata for PDF exports in Kendo UI PivotGridV2? Control and customize the PDF document metadata subject field to define the topic or purpose of the exported file, enabling better identification and categorization in PDF viewers, search engines, and document management systems; configure or set the subject metadata for PDF exports to enhance document indexing, retrieval, summary descriptions, and improve how the PDF's thematic content is recognized across different platforms during or after exporting data grids or reports to PDF format.
</div>

#### Example - set the subject

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            subject: "Products"
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.


<div class="meta-api-description">
How to set custom title for PDF export in Kendo UI PivotGridV2? Configure the PDF export document title to define the metadata title embedded within the generated PDF file, enabling you to label, brand, or identify the exported report or grid output clearly, control how PDF viewers and file explorers display the document name, specify custom titles for exported files, and set or customize the filename metadata for easier organization, recognition, or searching within document management systems and PDF reader applications.
</div>

#### Example - set the title

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdf: {
            title: "Internet Sales Amount"
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### columnWidth `Number`

The width of the table columns. Value is treated as pixels.

> This option defines the **minimum** width of the column. If the widget is wider then (column numbers * column width) then the columns will be wider then the defined value. This is done to occupy all available space in the widget wrapper.


<div class="meta-api-description">
How do I adjust column widths in Kendo UI PivotGridV2? Adjust and configure table column widths by setting the minimum width in pixels for each column, controlling how narrow or wide columns appear in pivot or data grid layouts, enabling fixed or flexible sizing depending on widget or container size. Set exact pixel values to define column width constraints, influence layout responsiveness, dynamically expand columns to fill available horizontal space, manage grid presentation in tabular or pivot table views, and customize visual spacing or alignment of columns for optimized data display and readability.
</div>

#### Example - set the column width as a number

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        columnWidth: 200,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### height `Number|String`

The height of the PivotGridV2. Numeric values are treated as pixels.


<div class="meta-api-description">
How do I set the height of my Kendo UI PivotGridV2 component? Set or adjust the vertical dimension, height, or overall size of a grid or pivot table component to manage visible rows, control scrolling behavior, define display area, influence layout fit, optimize UI space, and determine how many rows appear without scrolling; configure pixel-based or numeric height values to affect rendering boundaries, scrolling container size, viewport dimensions, and visual presentation within the surrounding user interface for flexible, precise vertical sizing and scroll management.
</div>

#### Example - set the height as a number

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

#### Example - set the height as a string

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: "550px",
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### columnHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the column header cell. By default it renders the *caption* of the tuple member.

The fields which can be used in the template are:

* member - the member of the corresponding column header cell
* tuple - the tuple of the corresponding column header cell

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource/configuration/schema#schemaaxes).


<div class="meta-api-description">
How to customize column header cells in Kendo UI for jQuery PivotGridV2? Customize and control the content and appearance of column header cells in a pivot grid by setting a template that supports HTML, text, or dynamic rendering using template syntax. Enable tailored column header formatting, modify default captions, insert dynamic data fields such as member details or tuple information, and configure how column headers display multi-dimensional data keys or metadata. This empowers developers to design and override standard column headings with personalized, conditional, or richly formatted content for pivot tables or cross-tab reports. Adapt column labels, inject custom HTML structures, and dynamically bind header cell properties for enhanced user interface flexibility and data presentation control in pivot or spreadsheet components.
</div>

#### Example - emphasize the title of a specific member

    <div id="pivotgrid"></div>

    <script id="columnTemplate" type="text/x-kendo-template">
        # if (member.name === "[Date].[Calendar].[Year].&[2005]") { #
            <em>#: member.caption #</em>
        # } else { #
            #: member.caption #
        # } #
    </script>

    <script>
    $("#pivotgrid").kendoPivotGridV2({
        columnHeaderTemplate: $("#columnTemplate").html(),
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true } ],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### dataCellTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the data cell. By default renders the formatted value (fmtValue) of the data item.

The fields which can be used in the template are:

* columnTuple - the tuple of the corresponding column header cell
* rowTuple - the tuple of the corresponding row header cell
* measure - the value of the data cell measure
* dataItem - the data item itself

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource/configuration/schema#schemaaxes).
About the data item structure review this [help topic](/api/javascript/data/pivotdatasource/configuration/schema#schemadata).


<div class="meta-api-description">
How to customize data cell rendering in Kendo UI PivotGridV2? Control and customize the rendering of each data cell in a pivot grid by defining a dynamic template that can format, style, or manipulate the content based on the cell's value, associated row and column tuples, or the underlying data object. Enable setting custom display logic, conditional formatting, or injecting interactive elements by accessing the measure value, row headers, column headers, or the entire data item context. Adapt how data cells show numeric values, text, or complex structures to tailor reporting views, enhance data visualization, or implement specialized formatting and rendering behaviors. Configure flexible data cell content rendering by leveraging contextual information for precision display, custom formatting, or embedding controls, ensuring relevant and accurate presentation of pivot grid results.
</div>

#### Example - bold the value for the *2010* column and use the formatted value for the other columns.

    <div id="pivotgrid"></div>

    <script id="dataCellTemplate" type="text/x-kendo-template">
        # if (columnTuple.members[0].name === "[Date].[Calendar].[Calendar Year].&[2010]") { #
        		<!-- Display the value in bold for the year 2010. -->
            <b>#: dataItem.value #</b>
        # } else { #
        		<!-- Display the formatted value for the other years. -->
            #: dataItem.fmtValue #
        # } #
    </script>

    <script>
    $("#pivotgrid").kendoPivotGridV2({
        dataCellTemplate: $("#dataCellTemplate").html(),
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true } ],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### kpiStatusTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the `KPI Status` value. By default renders "open", "hold" and "denied" status icons.

The fields which can be used in the template are:

* columnTuple - the tuple of the corresponding column header cell
* rowTuple - the tuple of the corresponding row header cell
* measure - the value of the data cell measure
* dataItem - the data item itself


<div class="meta-api-description">
How to customize the appearance of KPI status cells in a PivotGridV2 widget? Control and customize the rendering of key performance indicator (KPI) status cells within a pivot grid by defining templates that determine how status indicators like open, hold, denied, or custom icons and markup appear; configure display logic using contextual data such as the corresponding row and column tuples, the measure value, and the full data item, enabling tailored visualizations of KPI states, status cell customization, conditional formatting, icon replacement, and dynamic content injection for enhanced data insights and interactive dashboard elements.
</div>

#### Example - specify a custom template for the KPI Status measure

    <div id="pivotgrid"></div>
    
    <script>
        $("#pivotgrid").kendoPivotGridV2({
            kpiStatusTemplate:({ dataItem }) => `${dataItem.value !== 0 ? "<em>Open/Denied</em>" : "<strong>Hold</strong>"}`,
            dataSource: {
                type: "xmla",
                columns: [{ name: "[Date].[Calendar]", expand: true } ],
                rows: [{ name: "[Geography].[City]" }], 
                measures: [{ name: "[Measures].[Internet Revenue Status]", type: "status"}],
                transport: {
                    connection: {
                        catalog: "Adventure Works DW 2008R2",
                        cube: "Adventure Works"
                    },
                    read: {
                        url: "https://demos.telerik.com/service/v2/olap/msmdpump.dll",
                        dataType: "text",
                        contentType: "text/xml",
                        type: "POST"
                    }
                },
                schema: {
                    type: "xmla"
                }
            }
        });

    </script>

### kpiTrendTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the `KPI Trend` value. By default renders "increase", "decrease" and "equal" status icons.

The fields which can be used in the template are:

* columnTuple - the tuple of the corresponding column header cell
* rowTuple - the tuple of the corresponding row header cell
* measure - the value of the data cell measure
* dataItem - the data item itself


<div class="meta-api-description">
How to customize trend indicators in Kendo UI pivot grid cells? Customize and control the display of key performance indicator trend cells in pivot grids by configuring templates that render trend values with custom HTML, icons, or text, replacing default increase, decrease, or equal icons. Enable tailored visualizations of KPI trends using data context such as related column and row tuples, specific measure values, and underlying data items, supporting scenarios like dynamic icon sets, personalized styling, and descriptive status text for flexible business intelligence dashboards. This customization facilitates setting, designing, and adapting trend indicators in pivot table cells to match various data visualization needs and user interface designs.
</div>

#### Example - specify a custom template for the KPI Trend measure

    <div id="pivotgrid"></div>
    
    <script>
        $("#pivotgrid").kendoPivotGridV2({
            kpiTrendTemplate: ({ dataItem }) => `${dataItem.value !== 0 ? "<em>Increase/Decrease</em>" : "<strong>Equal</strong>"}`,
            dataSource: {
                type: "xmla",
                columns: [{ name: "[Date].[Calendar]", expand: true } ],
                rows: [{ name: "[Geography].[City]" }], 
                measures: [{ name: "[Measures].[Internet Revenue Trend]", type: "trend"}],
                transport: {
                    connection: {
                        catalog: "Adventure Works DW 2008R2",
                        cube: "Adventure Works"
                    },
                    read: {
                        url: "https://demos.telerik.com/service/v2/olap/msmdpump.dll",
                        dataType: "text",
                        contentType: "text/xml",
                        type: "POST"
                    }
                },
                schema: {
                    type: "xmla"
                }
            }
        });
    </script>

### rowHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the row header cell. By default it renders the *caption* of the tuple member.

The fields which can be used in the template are:

* member - the member of the corresponding row header cell
* tuple - the tuple of the corresponding row header cell

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource/configuration/schema#schemaaxes).


<div class="meta-api-description">
How do I customize the appearance of row headers in a Kendo UI PivotGridV2? Customize or control the appearance and content of row header cells in a pivot grid by setting a template that defines how each row header is rendered, enabling developers to replace default captions with custom layouts, formats, or components; configure dynamic rendering based on row data or tuple structures, leverage access to tuple and member information to display complex or hierarchical data, adjust display content for better readability, tailor row header styling, and enable flexible, programmable control over row labels in data pivot tables and multi-dimensional grid views.
</div>

#### Example - emphasize the title of a specific member

    <div id="pivotgrid"></div>

    <script id="rowTemplate" type="text/x-kendo-template">
        # if (member.name === "[Date].[Calendar].[Year].&[2005]") { #
            <em>#: member.caption #</em>
        # } else { #
            #: member.caption #
        # } #
    </script>

    <script>
    $("#pivotgrid").kendoPivotGridV2({
        rowHeaderTemplate: $("#rowTemplate").html(),
        dataSource: {
            type: "xmla",
            rows: [{ name: "[Date].[Calendar]", expand: true } ],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

## Fields

### dataSource `kendo.data.PivotDataSourceV2`

The [data source](/api/javascript/data/pivotdatasourcev2) of the widget. Configured via the [dataSource](/api/javascript/ui/pivotgridv2/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/pivotgridv2/methods/setdatasource) method instead.


<div class="meta-api-description">
How to access the current pivot data setup in Kendo UI for jQuery PivotGridV2? Access or retrieve the current pivot data setup, configuration, or source object for the pivot grid to inspect fields, structure, or data mappings; explore or query the grid’s dataset schema, underlying data object, or pivot configuration to understand what data is driving the component; analyze or read the existing data model, source fields, and pivot parameters without directly reassigning the data source; track live updates or changes in the data source reflected in the grid’s state, and manage or interact with the pivot data schema for reporting, filtering, or dynamic data inspection scenarios.
</div>

#### Example - get reference to the widget data source

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });

    //get reference to the widget data source
    var dataSource = $("#pivotgrid").data("kendoPivotGridV2").dataSource;
    </script>

## Methods

### cellInfo

Returns an information about a data cell at a specific column and row index.


<div class="meta-api-description">
How can I access detailed data about a specific cell in a Kendo UI for jQuery PivotGridV2? Retrieve detailed data about a specific cell in a pivot grid by specifying its row and column indexes, accessing cell values, coordinates, metadata, and rendering details for dynamic inspection, conditional styling, interactive behavior, or custom logic triggered by cell content or position within the grid structure.
</div>

#### Parameters

##### columnIndex `Number`

The index of the column cell that crosses the data cell.

##### rowIndex `Number`

The index of the row cell that crosses the data cell.

#### Returns

`Object` the data cell information.

The fields of the result object:

* columnTuple - the tuple of the corresponding column header cell
* rowTuple - the tuple of the corresponding row header cell
* dataItem - the data item itself

#### Example - get an information for a specific data cell

    <button id="get">Get info</button>
    <div id="pivotgrid"></div>
    <script>
    $(function() {
        var pivotgrid = $("#pivotgrid").kendoPivotGridV2({
            height: 550,
            dataSource: {
                type: "xmla",
                columns: [{ name: "[Date].[Calendar]", expand: true } ],
                rows: [{ name: "[Product].[Category]", expand: true }],
                measures: ["[Measures].[Internet Sales Amount]"],
                transport: {
                    connection: {
                        catalog: "Adventure Works DW 2008R2",
                        cube: "Adventure Works"
                    },
                    read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
                }
            }
        }).data("kendoPivotGridV2");

        $("#button").click(function() {
            var columnIndex = 1;
            var rowIndex = 1;

            var info = pivotgrid.cellInfo(columnIndex, rowIndex); //retrieve data cell information

	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(info);
        });
    });
    </script>

### cellInfoByElement

Returns an information about for a specific data cell element


<div class="meta-api-description">
How do I get detailed metadata for a specific cell in Kendo UI PivotGridV2? Retrieve or find detailed metadata, coordinates, data field, or displayed value for a specific rendered data cell element within a pivot grid or data table component by mapping DOM elements to their corresponding cell information; enable programmatic access to cell properties, inspect or identify cells based on their visual elements, extract data bound to a cell, and support operations like cell manipulation, event handling, or custom rendering by linking UI elements to their underlying dataset and grid coordinates.
</div>

#### Parameters

##### cell `String|Element|jQuery`

A string, DOM element or jQuery object which represents the data table cell. A string is treated as a jQuery selector.

#### Returns

`Object` the data cell information.

The fields of the result object:

* columnTuple - the tuple of the corresponding column header cell
* rowTuple - the tuple of the corresponding row header cell
* dataItem - the data item itself

#### Example - get information on element hover

    <div id="pivotgrid"></div>
    <script>
    $(function() {
        var pivotgrid = $("#pivotgrid").kendoPivotGridV2({
            height: 550,
            dataSource: {
                type: "xmla",
                columns: [{ name: "[Date].[Calendar]", expand: true } ],
                rows: [{ name: "[Product].[Category]", expand: true }],
                measures: ["[Measures].[Internet Sales Amount]"],
                transport: {
                    connection: {
                        catalog: "Adventure Works DW 2008R2",
                        cube: "Adventure Works"
                    },
                    read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
                }
            }
        }).data("kendoPivotGridV2");

        pivotgrid.wrapper.on("mouseenter", ".k-grid-content td", function(e){
            var info = pivotgrid.cellInfoByElement(e.currentTarget);

	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(info);
        });
    });
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.


<div class="meta-api-description">
How do I safely remove event handlers from a Kendo UI PivotGridV2 component? remove event handlers and listeners from a dynamic grid component, clean up resources to avoid memory leaks in UI widgets, safely teardown interactive data pivot tables, unbind events and detach listeners in pivot grid implementations, perform full cleanup on grid widgets with nested child components, clear jQuery data attributes to prevent memory retention, prepare complex UI elements for safe removal without deleting DOM elements, invoke cascading destroy operations on child UI components inside grid structures, properly dispose of event-driven pivot tables to maintain application performance, finalize and reset resources held by data visualization grids with event bindings.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.destroy();
    </script>

### refresh

Renders all content using the current data items.


<div class="meta-api-description">
How do I force Kendo UI for jQuery PivotGridV2 to reload after data update? Trigger, invoke, or execute a full refresh to re-render or update the entire pivot grid display, including layout, headers, cells, and aggregated values, ensuring the user interface synchronizes with the latest data sources and configuration changes; use this to force the pivot table, cross-tab, or summary grid to reload, redraw, or reconstruct all visible content dynamically after any data update or option modification for immediate visual consistency and accurate data reflection.
</div>

#### Example - refresh the widget

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.refresh();
    </script>

### setDataSource

Sets the data source of the widget.


<div class="meta-api-description">
How do I update the data in a Kendo UI PivotGridV2 control dynamically? Change or update the data displayed in a pivot grid dynamically by setting, swapping, or reloading its underlying data source with new arrays, data source configurations, or pre-defined data source instances; control data binding and trigger automatic re-rendering to reflect updated or different datasets at runtime, enabling flexible data management, live data updates, datasource replacement, and dataset switching in pivot table or pivot grid components.
</div>

#### Parameters

##### dataSource `kendo.data.PivotDataSourceV2`

The data source to which the widget should be bound.

#### Example - set the data source

    <div id="pivotgrid"></div>
    <script>
        $("#pivotgrid").kendoPivotGridV2({
            height: 550,
            dataSource: {
                type: "xmla",
                columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
                rows: [{ name: "[Product].[Product]" }],
                measures: ["[Measures].[Internet Sales Amount]"],
                transport: {
                    connection: {
                        catalog: "Adventure Works DW 2008R2",
                        cube: "Adventure Works"
                    },
                    read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
                }
            }
        });
        var dataSource = new kendo.data.PivotDataSourceV2({
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        });

        setTimeout(function(){
            var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
            pivotgrid.setDataSource(dataSource);
        }, 2000);
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](/api/javascript/ui/pivotgridv2/events/pdfexport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.


<div class="meta-api-description">
How do I export a Kendo UI PivotGridV2 to PDF asynchronously? Export, generate, or convert the current pivot grid view into a PDF document with an asynchronous operation that returns a promise for status tracking and completion handling. Enable saving, downloading, or printing the displayed data in portable document format while managing export events and handling browser popup blockers by triggering the export from user interactions like button clicks or UI commands. Control PDF creation from pivot table visualizations with options to initiate, track, and respond to the export process programmatically for integration in workflows needing reliable PDF output from dynamic data grids.
</div>

#### Returns
`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](/api/javascript/ui/pivotgridv2/events/pdfexport) event arguments.

#### Example - manually initiate PDF export

    <button id="export">Export to PDF</button>
    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });

    $("#export").click(function(e) {
        var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
        pivotgrid.saveAsPDF();
    });
    </script>

## Events

### dataBinding

Fired before the widget binds to its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to intercept data binding in Kendo UI for jQuery PivotGridV2 component? Capture or intercept the moment just before a data grid or pivot table binds its data source by attaching event handlers that trigger custom code execution, such as modifying data requests, inspecting or altering incoming parameters, updating interface state, logging or debugging data binding workflows, or configuring how data loads and refreshes. Enable hooking into the component’s lifecycle to run pre-loading logic, control data fetches, and manage synchronous or asynchronous operations before the grid populates. Facilitate access to the component’s internal methods and current state within the event callback to dynamically adjust behavior, validate data, or inject side effects right before the binding occurs. This mechanism supports use cases like conditional loading, transient UI feedback, or data preprocessing during pivot grid initialization steps.
</div>

#### Event Data

##### e.preventDefault `Function`

If invoked prevents the data bind action. The PivotGridV2 will remain unchanged and `dataBound` event will not fire.

##### e.sender `kendo.ui.PivotGridV2`

The widget instance which fired the event.

#### Example - subscribe to the "dataBinding" event during initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataBinding: function(e) {
            e.preventDefault(); //this will prevent the data bind action
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

#### Example - subscribe to the "dataBinding" event after initialization

    <div id="pivotgrid"></div>
    <script>
    function dataBinding(e) {
        e.preventDefault();
    }

    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.bind("dataBinding", dataBinding);
    </script>

### dataBound

Fired after the widget is bound to the data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
When does the Kendo UI for jQuery PivotGridV2 fire its dataBound event after loading new data? Trigger actions or execute custom code right after your pivot grid or data grid finishes loading and binding data from its source, perfect for refreshing user interfaces, recalculating totals or aggregates, adjusting layouts, synchronizing external application state, updating visuals or styles, applying dynamic formatting, or running any post-data-fetch logic automatically upon data load completion. This event fires when the data source is fully processed and bound, allowing immediate control over UI updates, layout adjustments, data summaries, or integration with other components after the grid refreshes or changes data sets. Developers often use this to hook into pivot table data refresh cycles, execute callbacks after data updates, or implement reactive UI behavior after binding new records to the grid structure.
</div>

#### Event Data

##### e.sender `kendo.ui.PivotGridV2`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataBound: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("data bound");
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <div id="pivotgrid"></div>
    <script>
    function dataBound(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("data bound");
    }

    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.bind("dataBound", dataBound);
    </script>

### expandMember

Fired before column or row field is expanded.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to detect when a pivot grid row or column is about to expand in Kendo UI for jQuery? Detect and react to the moment just before a row or column in a pivot grid expands by capturing the pre-expansion event to execute custom logic such as updating the interface, validating data, preloading or preparing content, controlling or intercepting expansion behavior, and dynamically adjusting settings or layout. Enable event-driven handling that triggers before hierarchical members expand, allowing developers to run code to manage the pivot grid’s state, customize user interactions, or enforce business rules immediately prior to expanding rows or columns in complex data pivots. Capture, handle, or listen for pre-expansion actions on pivot grid headers to control or modify expansion flow programmatically, facilitating dynamic UI changes, validation sequences, or data preparations tied to the expansion of grid members.
</div>

#### Event Data

##### e.preventDefault `Function`

If invoked prevents the expand and the widget will remain in its current state.

##### e.sender `kendo.ui.PivotGridV2`

The widget instance which fired the event.

##### e.axis `String`

The axis that will be expanded. Possible values `columns` or `rows`.

##### e.path `String`

The path to the field that will be expanded.

#### Example - subscribe to the "expandMember" event during initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        expandMember: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("expand member");
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

#### Example - subscribe to the "expandMember" event after initialization

    <div id="pivotgrid"></div>
    <script>
    function expandMember(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("expand member");
    }

    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.bind("expandMember", expandMember);
    </script>

### collapseMember

Fired before column or row field is collapsed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I customize the behavior when columns or rows are collapsed in a Kendo UI PivotGridV2? Intercept actions when columns or rows are collapsed in a pivot grid, enabling custom logic execution before a field is minimized or hidden; configure event listeners to trigger state persistence, UI updates, data recalculations, or conditional workflows tied to collapsing grid members, with access to the component instance context for managing related behaviors, handling user interactions, and controlling dynamic updates during collapse operations within PivotGridV2 or similar data grid environments.
</div>

#### Event Data

##### e.preventDefault `Function`

If invoked prevents the collapse and the widget will remain in its current state.

##### e.sender `kendo.ui.PivotGridV2`

The widget instance which fired the event.

##### e.axis `String`

The axis that will be collapsed. Possible values `columns` or `rows`.

##### e.path `String`

The path to the field that will be collapsed.

#### Example - subscribe to the "collapseMember" event during initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        collapseMember: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("collapse member");
        },
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

#### Example - subscribe to the "collapseMember" event after initialization

    <div id="pivotgrid"></div>
    <script>
    function collapseMember(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("collapse member");
    }

    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.bind("collapseMember", collapseMember);
    </script>

### pdfExport

Fired when the user clicks the "Export to PDF" toolbar button.


<div class="meta-api-description">
How to handle PDF export in Kendo UI PivotGridV2? trigger custom actions or logic when exporting data to PDF from a pivot grid toolbar, detect when users initiate PDF output, intercept or customize PDF export workflows, handle export button clicks, prepare or validate data before PDF generation, show progress or status indicators during export, log export events or analytics, integrate with external PDF creation tools, control or modify PDF file generation processes, manage PDF download triggers, and respond to export initiation events in pivot table or data grid interfaces.
</div>

#### Event Data

##### e.sender `kendo.ui.PivotGridV2`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked the grid will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - subscribe to the "pdfExport" event during initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        pdfExport: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("PDF export");
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.saveAsPDF();
    </script>

#### Example - subscribe to the "pdfExport" event after initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.bind("pdfExport", function(e) {
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("PDF export");
    });
    pivotgrid.saveAsPDF();
    </script>
