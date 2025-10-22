---
title: PivotGrid
page_title: Configuration, methods and events of Kendo UI PivotGrid
description: Code examples for PivotGrid UI widget configuration, learn how to use methods and which events to set once the grid UI widget detail is initialized and expanded.
res_type: api
component: pivotgrid
---

# kendo.ui.PivotGrid

Represents the Kendo UI PivotGrid widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### dataSource `Object|kendo.data.PivotDataSource`

The data source of the widget which is used to display values. Can be a JavaScript object which represents a valid data source configuration or an existing [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource)
instance.

If the `dataSource` option is set to a JavaScript object the widget will initialize a new [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
Connect or bind the pivot grid to a pivot table data source by setting or configuring the data input to display, manipulate, and analyze aggregated pivoted data; support using a raw JavaScript object with data source configuration or passing an existing pivot data source instance to enable reuse, sharing, or custom control of the underlying data provider; control data binding, link data models, configure pivot aggregations, manage data connections to dynamic or static pivot data, integrate with existing data source objects, and enable synchronization of pivot grid views with configured or shared data providers.
</div>

#### Example - set dataSource as a JavaScript object

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

#### Example - set dataSource as an existing kendo.data.PivotDataSource instance

    <div id="pivotgrid"></div>
    <script>
    var dataSource = new kendo.data.PivotDataSource({
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
    });

    $("#pivotgrid").kendoPivotGrid({
        height: 550,
        dataSource: dataSource
    });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.


<div class="meta-api-description">
Configure whether the pivot table or grid automatically connects and loads data from its assigned data source during startup or waits for manual triggering; control initial data fetching, data binding timing, and synchronization especially when multiple components share a common data source to prevent redundant remote requests and ensure efficient data loading; enable or disable automatic data fetch on initialization, defer binding until data changes occur, and manage data synchronization strategies for shared or delayed loading scenarios.
</div>

#### Example - disable automatic binding

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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
    var dataSource = $("#pivotgrid").data("kendoPivotGrid").dataSource;
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### reorderable `Boolean` *(default: true)*

If set to `false` the user will not be able to add/close/reorder current fields for columns/rows/measures.


<div class="meta-api-description">
Control the ability to enable or disable user interaction with the pivot grid layout, including the options to add, remove, drag, reorder, or rearrange fields such as columns, rows, and measures. Configure whether users can modify the structure dynamically by dragging and dropping fields, customizing the arrangement of data dimensions and metrics, locking the layout to prevent changes, or allowing flexible reorganization and adjustment of pivot grid elements. Set permissions to restrict or allow editing of the grid's organization during runtime or initialization, ensuring fixed structures or interactive pivot customization as needed.
</div>

#### Example - disable fields reordering

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        height: 550,
        reorderable: false,
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

### excel `Object`

Configures the Kendo UI PivotGrid Excel export settings.


<div class="meta-api-description">
Exporting pivot table or grid data to Excel with control over file naming, worksheet arrangement, and formatting options including enabling or disabling export features, customizing workbook structure, setting sheet layout preferences, configuring file output settings, and managing Excel file generation from pivot data for seamless integration with spreadsheet workflows and automated report creation.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        excel: {
            fileName: "InternetSalesAmount.xlsx",
            forceProxy: true
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

### excel.fileName `String` *(default: "Export.xslx")*

Specifies the file name of the exported Excel file.


<div class="meta-api-description">
Configure or customize the default Excel export file name for a pivot table or data grid, enabling control over the downloaded .xlsx filename when exporting data. Set, specify, or override the output file name for Excel exports to tailor report downloads, automate naming conventions, or ensure consistent file naming during data extraction or saved exports from pivot tables or grids. Adjust the export file name property to influence how exported spreadsheets are named without altering file content, supporting export workflows that require distinct or descriptive Excel document names for reports, data analysis, or sharing.
</div>

#### Example - set the default Excel file name

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

Enables or disables column filtering in the Excel file. Not to be mistaken with the pivotgrid filtering feature.


<div class="meta-api-description">
Control enabling or disabling column filters in exported Excel workbooks to activate or deactivate Excel's autofilter feature for sorting, filtering, or narrowing data within spreadsheet columns after export. Configure whether exported Excel files include interactive filter dropdowns on each column header, allowing users to filter, search, or manipulate data directly in Excel separate from any on-screen grid filtering options. Enable Excel autofilter inclusion in export output to facilitate user-driven data filtering in spreadsheets generated from pivot or data grids. Toggle Excel export filter settings to allow or prevent Excel table filter functionalities on columns, distinct from in-app filter configurations or grid-based filtering behavior.
</div>

#### Example - enable filtering in the output Excel file

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        excel: {
            filterable: false
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
If set to true, the content will be forwarded to [proxyURL](/api/javascript/ui/pivotgrid#configuration-excel.proxyURL) even if the browser supports saving files locally.


<div class="meta-api-description">
Configure Excel export behavior to route file data through a proxy server or allow direct browser download by enabling or disabling forced forwarding of generated export content; control transmission of exported spreadsheet files via proxy URLs even when local browser saving is available, set options to manage export file handling between proxy forwarding and native browser save functionality, adjust settings to ensure export output can be intercepted or saved directly depending on network policies or environment constraints.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        excel: {
            forceProxy: true,
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
Configure or set a server-side proxy URL to enable exporting and downloading Excel files from the grid in browsers lacking native client-side save support like IE9 and earlier or Safari, by routing export data through a backend endpoint that handles POST requests containing base64-encoded file content, MIME type, and filename parameters; this proxy streams the decoded Excel file back to users with appropriate content-disposition headers for seamless file downloads, supporting scenarios where direct file downloads fail or are blocked, and allowing developers to implement backend handlers to manage export delivery across legacy or restrictive browsers.
</div>

#### Example - set the server proxy URL

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

Configures the Kendo UI PivotGrid PDF export settings.


<div class="meta-api-description">
Configure exporting or downloading PivotGrid content as PDF by setting up file name, page size, margins, orientation, scaling options, proxy settings for PDF generation, customizing export behavior including layout and print formatting, controlling how PivotGrid data is transformed into PDF documents, enabling precise PDF output adjustments, managing page properties, and handling export proxy integration for seamless PDF creation from grid data.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        pdf: {
            fileName: "PivotGrid.pdf",
            author: "Telerik",
            autoPrint: true,
            avoidLinks: true
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
            rows: [{ name: "[Geography].[City]" }],
            measures: [
                { name: "[Measures].[Internet Revenue Status]", type: "status" }, //KPI Status measure that will render kpiStatusTemplate
                { name: "[Measures].[Internet Revenue Trend]", type: "trend" } //KPI Trend measure that will render kpiTrendTemplate
            ],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
            },
            schema: {
                type: "xmla"
            },
            error: function (e) {
                alert("error: " + kendo.stringify(e.errors[0]));
            }
        }
    });
    </script>

### pdf.author `String` *(default: null)*

The author of the PDF document.


<div class="meta-api-description">
Configure the exported PDF's author metadata by specifying the document creator or author name during export setup, enabling control over PDF file properties such as the author tag for identification, tracking, or document management purposes when generating PDFs from grid or pivot data. This includes options to set, modify, or customize the creator's name embedded in the PDF metadata for clearer attribution in reports, automations, or document workflows involving data exports.
</div>

#### Example - set the author


    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.


<div class="meta-api-description">
Control automatic triggering of the print dialog or print preview immediately after exporting data to PDF, enabling seamless display of the print prompt once the PDF document loads. Configure settings to open the print window on document load, streamline user workflows by auto-launching print dialogs, or programmatically enable immediate printing prompts in exported reports. Manage automatic print preview display for pivot-style data exports, adjust behavior for supported PDF viewers, and handle scenarios where print dialogs may not appear by default due to viewer restrictions or configuration. Set options to auto-show the print interface for exported PDF grids or tables without manual user action.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        pdf: {
            autoPrint: true
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Category]", expand: true }],
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

### pdf.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce actual hyperlinks in the exported PDF file.

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

> Available in versions 2015.3.1020 and later


<div class="meta-api-description">
Control the inclusion or exclusion of hyperlinks when exporting a pivot grid to PDF by configuring whether to omit clickable links entirely or selectively disable links matching specific CSS selectors, enabling you to customize PDF exports for scenarios requiring no active hyperlinks, link filtering, disabling navigation within exported documents, or preventing URL embedding in generated PDFs from pivot grid data.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        pdf: {
            avoidLinks: true
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
            rows: [{ name: "[Product].[Category]", expand: true }],
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

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.


<div class="meta-api-description">
Configure or set the author, creator, or application name metadata embedded in exported PDF documents from a data grid or pivot table, allowing control over the PDF's creator field, document info, or author string used in PDF export settings to personalize or identify the source application for PDF generation.
</div>

#### Example - set the creator

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.


<div class="meta-api-description">
Set or customize the creation date and timestamp metadata for PDF files generated from pivot tables or grid exports, control the document's date property using JavaScript Date objects, specify or override the default export date to reflect custom times or historical timestamps, configure PDF metadata creation time for exported reports, adjust or enable precise date settings for PDF documents produced by data grids or pivot grid tools, manage the exported PDF’s date information for tracking, sorting, or compliance purposes, define the export timestamp for generated documents, control the embedded document date in PDFs to influence file properties or versioning, and set a specific creation or export time instead of the current time during PDF generation.
</div>

#### Example - set the date

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.


<div class="meta-api-description">
Configure or customize the exported PDF file name for PivotGrid reports, set or change the default download filename when saving PivotGrid data as PDF, control the output document name during PDF export, specify the exact file name for exported PivotGrid reports, enable setting a custom PDF filename to match reporting or organizational needs, rename the automatic PDF download file, define or override the export file title, manage naming conventions of exported PivotGrid PDFs, adjust the file name parameter for saved PDF reports, and tailor PDF export file names for integration or user readability.
</div>

#### Example - set the default PDF file name

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](/api/javascript/ui/pivotgrid#configuration-pdf.proxyURL) even if the browser supports saving files locally.


<div class="meta-api-description">
Enable or configure exporting PDF reports through a server-side proxy to guarantee consistent downloading and processing on the backend regardless of client browser capabilities, forcing all export operations to route the exported data to a specified proxy URL for server handling, controlling whether PDF generation and file retrieval occur via the server instead of direct local file saving, useful for scenarios requiring centralized export processing, proxy-based delivery, or restricting client-side file writes during PDF export tasks from pivot tables or data grids.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        pdf: {
            forceProxy: true,
            proxyURL: "/save"
            //configure a valid endpoint which will export the file 
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

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.


<div class="meta-api-description">
Adjust or configure image compression quality and resolution when exporting pivot grids or tabular data to PDF, controlling JPEG image fidelity and file size by setting compression ratios or quality levels from low to high. Optimize exported PDF visuals by balancing detail and image clarity against document size, setting parameters to reduce file weight or enhance picture sharpness in exported reports, documents, or data visualizations. Enable fine-tuning of export image quality for pivot tables, allowing control over how images embedded in PDFs compress during export operations, affecting both visual output and storage requirements.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        pdf: {
            jpegQuality: 0.8
        },
        height: 580,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
            rows: [{ name: "[Geography].[City]" }],
            measures: [
                { name: "[Measures].[Internet Revenue Status]", type: "status" }, //KPI Status measure that will render kpiStatusTemplate
                { name: "[Measures].[Internet Revenue Trend]", type: "trend" } //KPI Trend measure that will render kpiTrendTemplate
            ],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
            },
            schema: {
                type: "xmla"
            },
            error: function (e) {
                alert("error: " + kendo.stringify(e.errors[0]));
            }
        }
    });
    </script>

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.


<div class="meta-api-description">
Control whether embedded images in PNG format remain as PNG when exporting a PivotGrid or similar data grid to PDF, preserving image quality and clarity without converting to other formats like JPEG or vector graphics; configure the export process to retain original PNG files within the PDF output, enabling scenarios where maintaining transparency, sharpness, or exact image fidelity during PDF generation is required, useful for reports, dashboards, or data visualizations that include embedded pictures or icons.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        pdf: {
            keepPNG: true
        },
        height: 550,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
            rows: [{ name: "[Geography].[City]" }],
            measures: [
                { name: "[Measures].[Internet Revenue Status]", type: "status" }, //KPI Status measure that will render kpiStatusTemplate
                { name: "[Measures].[Internet Revenue Trend]", type: "trend" } //KPI Trend measure that will render kpiTrendTemplate
            ],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
            },
            schema: {
                type: "xmla"
            },
            error: function (e) {
                alert("error: " + kendo.stringify(e.errors[0]));
            }
        }
    });
    </script>

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.


<div class="meta-api-description">
Configure and set searchable metadata keywords for PDFs generated from PivotGrid exports to enhance document discoverability, indexing, and search engine optimization, enabling control over PDF metadata tags that improve file searchability within PDF viewers and external search tools by embedding relevant descriptive terms and key phrases directly into the exported file’s properties.
</div>

#### Example - set the keywords

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### pdf.landscape `Boolean` *(default: false)*

Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.


<div class="meta-api-description">
Configure the export orientation to landscape mode for PDF output, enabling wider page layouts where the width exceeds the height, ideal for printing or exporting PivotGrid data requiring horizontal formatting, rotated page dimensions, and landscape-style reports to enhance readability and presentation when generating PDF files.
</div>

#### Example - enable landscape mode

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).


<div class="meta-api-description">
Set or adjust page margins and spacing around the edges when exporting data grids or pivot tables to PDF format, specifying precise measurements in various units like millimeters, centimeters, inches, or points to control page layout, whitespace, and printable area, enabling customization of top, bottom, left, and right margins for professional document formatting and ensuring content fits well within PDF pages during export or print operations from grid or pivot components.
</div>

#### Example - set the margins

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Configure the bottom page margin size for PDF export to control spacing at the page's lower edge, adjust footer gaps, customize printable area, set page padding, manage layout margins for exported pivot tables, define precise bottom spacing for print-ready documents, modify page offsets when generating PDFs, control blank space below content, tune page bottom buffer for layout consistency, and specify numeric values to refine export formatting and page setup in PDF outputs.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        pdf: {
            margin: {
                bottom: 20
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

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Control the left-side margin when exporting a pivot grid to PDF by configuring the spacing between the content and the left edge of the page, adjusting alignment, printable area positioning, or custom page layout with numeric values measured in points for precise margin setup.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        pdf: {
            margin: {
                left: 15
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

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Configure the right page margin size for PDF exports of pivot grid data, adjusting the spacing on the right edge of the page to control layout, whitespace, and content alignment in generated PDF files, set custom numeric margin values in points to fine-tune the printable area, modify border padding, or control page formatting and export appearance for right margins in pivot table PDF reports.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        pdf: {
            margin: {
                right: 15
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

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Adjust or set the top page margin for PDF exports of data grids or pivot tables to control the vertical spacing at the top edge of the generated PDF document, configure top page padding or whitespace in exported reports, customize document layout by defining top margin size in points or units, control how much space appears above content when saving data grids as PDFs, and specify numerical values to fine-tune the upper margin area for print-friendly or presentation-ready PDF outputs.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        pdf: {
            margin: {
                top: 20
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
Configure the export PDF page dimensions or paper size for pivot grid data, specifying standard formats like A4, A3, or custom width and height in points, inches, millimeters, or centimeters to control layout, scaling, and output measurement units. Set page size precisely for printed or digital PDF exports, map pixel dimensions to PDF points for accurate sizing, adjust orientation or custom dimensions using arrays of numeric values or unit-based strings, and control how pivot grid content fits or scales in the exported PDF output format. Enable fixed or automatic page sizing to ensure correct dimensioning of exported reports, dashboards, or tables when converting pivot grid data to PDF files.
</div>

#### Example - set custom paper size

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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
Configure server-side proxy endpoints to enable streaming of generated PDF exports from a pivot grid in browsers lacking local file save capabilities like IE9 and Safari, controlling file delivery by specifying a proxy URL that accepts base64-encoded PDF data via POST requests and returns downloadable files with proper content disposition headers; set, enable, or customize intermediaries for secure file transfer, proxy handling, PDF streaming, fallback download mechanisms, cross-browser export support, and server integration for seamless document retrieval when direct client-side saving is unsupported.
</div>

#### Example - set the server proxy URL

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.


<div class="meta-api-description">
Specify or configure the destination for PDF output generated through a proxy by setting the target window, iframe, or named frame where the PDF should open or render; this includes directing the PDF display to a new browser tab, an existing window identified by name, or an inline iframe element. Control where and how proxy-returned PDF files are displayed by assigning a target name or keyword, enabling seamless integration of PDF previews or downloads within web layouts, single-page applications, or multiple-window environments. Manage PDF presentation behavior by defining display targets, useful for scenarios requiring embedded PDF viewers, popup windows, or specific frame containers to show downloadable or inline PDF documents fetched via proxy services, ensuring correct inline viewing when content disposition headers are configured accordingly.
</div>

#### Example - open the generated document in a new window

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.


<div class="meta-api-description">
Control or customize the PDF document subject metadata when exporting grid data to PDF, enabling setting the descriptive subject field embedded in the PDF file that appears in PDF viewers, search results, or document indexing systems. Configure or define the subject string for exported PDF reports, specify the metadata subject text that identifies or categorizes the PDF content, and set searchable or indexable subject information to improve document organization and discoverability during PDF generation from tabular or grid-based data.
</div>

#### Example - set the subject

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.


<div class="meta-api-description">
Configure, define, or set the export PDF document's title when generating PDF files from pivot table or data grid components, controlling the metadata title that appears in PDF viewers and file properties, specifying the file's printable or display name, adjusting or customizing PDF export titles for reports or data summaries, managing document information such as file name and metadata title in exported PDFs, enabling naming of exported pivot grid documents for clearer identification, affecting how PDF viewers show the document title or header, and setting descriptive titles for PDF exports to improve file organization, searchability, and user recognition across various export workflows.
</div>

#### Example - set the title

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### filterable `Boolean` *(default: false)*

If set to `true` the user will be able to filter by using the field menu.


<div class="meta-api-description">
Enable interactive filtering for pivot table fields by configuring filter options that let users apply, set, or control data filters directly through field menus; support for toggling field-level filter capabilities, customizable filter UI elements, and filtering data views dynamically during use, allowing detailed refinement, inclusion, exclusion, and criteria-based searches within pivot grid datasets.
</div>

#### Example - enable filtering

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        height: 550,
        filterable: true,
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

### sortable `Boolean|Object` *(default: false)*

If set to `true` the user could sort the pivotgrid by clicking the dimension fields. By default sorting is disabled.

Can be set to a JavaScript object which represents the sorting configuration.


<div class="meta-api-description">
Enable or control interactive sorting functionality for dimension fields in a pivot table or grid, allowing users to click on headers to toggle ascending or descending order, customize sorting behavior through configuration objects, activate or deactivate sortable columns, configure user-driven sorting options, set sorting states programmatically, and manage sorting preferences dynamically for improved data organization and user interaction within multidimensional data views.
</div>

#### Example - enable sorting

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        height: 550,
        sortable: true,
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

### sortable.allowUnsort `Boolean` *(default: true)*

If set to `true` the user can get the pivotgrid in unsorted state by clicking the sorted dimension field.


<div class="meta-api-description">
Enable or disable the ability for users to clear sorting on any dimension by clicking its column or row header, allowing toggling between sorted and unsorted states without additional code. This setting controls whether clicking a sorted field removes the current sort order, providing flexible interaction to turn off sorting on pivot table dimensions, headers, or fields by user action, supporting scenarios where sorting can be applied, switched, or completely cleared dynamically through the interface.
</div>

#### Example - disable unsorting

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        height: 550,
        sortable: {
            allowUnsort: false
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

### columnWidth `Number`

The width of the table columns. Value is treated as pixels.

> This option defines the **minimum** width of the column. If the widget is wider then (column numbers * column width) then the columns will be wider then the defined value. This is done to occupy all available space in the widget wrapper.


<div class="meta-api-description">
Control and configure the minimum width of table columns in a pivot grid or data table by setting fixed pixel values to ensure consistent column sizing, responsive layouts, and adaptive expansion when container width exceeds the total minimum widths. Enable setting fixed or adjustable column widths, enforce minimum pixel values for each grid column, and manage how columns proportionally resize or stretch to fill available space for better display and readability in pivot tables, data analysis tools, and responsive grid components. Adjust table column sizing to maintain layout control, prevent columns from shrinking below a specified pixel width, and optimize visual consistency across different screen sizes and container widths.
</div>

#### Example - set the column width as a number

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### height `Number|String`

The height of the PivotGrid. Numeric values are treated as pixels.


<div class="meta-api-description">
Set or adjust the vertical size, height, or fixed dimension of a pivot grid or data summary table to control layout, scrolling behavior, and rendering space using pixel values or numeric input. Configure the container height to fit within page designs, align with CSS layouts, or resize dynamically for optimal display of tabular or pivot data views, ensuring appropriate vertical allocation within user interfaces or dashboards. Control the grid’s overall vertical dimension to improve usability, visual consistency, or integration with surrounding elements in web or application layouts.
</div>

#### Example - set the height as a number

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

#### Example - set the height as a string

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

### columnHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the column header cell. By default it renders the *caption* of the tuple member.

The fields which can be used in the template are:

* member - the member of the corresponding column header cell
* tuple - the tuple of the corresponding column header cell

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource/configuration/schema#schemaaxes).


<div class="meta-api-description">
Customize and control the rendering and appearance of column header cells in a pivot grid by setting a template or custom layout for headers, enabling modification of the content, labels, captions, or formatting of column headings. This feature supports defining dynamic templates, custom text or styles, and accessing data elements related to the column header cell such as the associated member or tuple details, allowing developers to override default header captions, implement unique header designs, adjust header labeling, and tailor the display of column headers to specific business logic or UI requirements in pivot tables or grids.
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
    $("#pivotgrid").kendoPivotGrid({
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
Control and customize the rendering of individual data cells in a pivot table or grid by setting templates that define how cell content is displayed, enabling formatting, overriding default values, and dynamically injecting contextual data like row and column coordinates, measures, and underlying data records. Configure custom cell rendering, formatting, or templating to tailor the visual presentation of summarized or aggregated data points in multidimensional tables, pivot grids, or OLAP visualizations, including references to hierarchical row and column metadata as well as measure definitions and raw or formatted data values. Set up cell display templates to enhance or replace default aggregated metrics, apply conditional formatting, embed interactive components, or manipulate the appearance and content of each data intersection in a pivot or cross-tab report.
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
    $("#pivotgrid").kendoPivotGrid({
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

### kpiStatusTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the `KPI Status` value. By default renders "open", "hold" and "denied" status icons.

The fields which can be used in the template are:

* columnTuple - the tuple of the corresponding column header cell
* rowTuple - the tuple of the corresponding row header cell
* measure - the value of the data cell measure
* dataItem - the data item itself

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource/configuration/schema#schemaaxes).
About the data item structure review this [help topic](/api/javascript/data/pivotdatasource/configuration/schema#schemadata).


<div class="meta-api-description">
Customize or configure the display and rendering of key performance indicator statuses within a pivot grid or data table, enabling control over how status icons, labels, or custom visuals like “open,” “hold,” and “denied” are presented in status cells. Enable dynamic templating or formatting of KPI status content based on contextual data, including associated row and column tuples, measure values, and underlying data items, allowing developers to tailor status indicators according to specific business logic, conditional rendering, or presentation preferences. Adapt or set custom visual outputs, labels, or templates for KPI status cells linked to pivot table data points for enhanced user experience, flexible UI control, and data-driven presentation customization in analytic grids or reporting components.
</div>

#### Example - specify a custom template for the KPI Status measure

    <div id="pivotgrid"></div>

    <script id="kpiStatusTemplate" type="text/x-kendo-template">
        # if (dataItem.value !== 0) { #
            <em>Open/Denied</em>
        # } else { #
            <strong>Hold</strong>
        # } #
    </script>

    <script>
    $("#pivotgrid").kendoPivotGrid({
        kpiStatusTemplate: $("#kpiStatusTemplate").html(),
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true } ],
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

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource/configuration/schema#schemaaxes).
About the data item structure review this [help topic](/api/javascript/data/pivotdatasource/configuration/schema#schemadata).


<div class="meta-api-description">
Customize and control the visualization of key performance indicator trends by configuring templates that define how increase, decrease, or equal status icons and trend values appear in a pivot grid. Enable dynamic formatting and conditional display of KPI trends based on linked data items, row and column tuples, and associated measure values. Adjust and set trend display templates using variables that access underlying data cells, header tuples, and measure details to tailor the visual representation of trend changes, performance metrics, and comparative data analysis within pivot tables or grids. Set or modify the appearance, layout, and content of KPI trend indicators to match specific reporting, dashboard needs, or user interface preferences, enhancing clarity and customization of trend insights.
</div>

#### Example - specify a custom template for the KPI Trend measure

    <div id="pivotgrid"></div>

    <script id="kpiTrendTemplate" type="text/x-kendo-template">
        # if (dataItem.value !== 0) { #
            <em>Increase/Decrease</em>
        # } else { #
            <strong>Equal</strong>
        # } #
    </script>

    <script>
    $("#pivotgrid").kendoPivotGrid({
        kpiTrendTemplate: $("#kpiTrendTemplate").html(),
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true } ],
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
Customize and control the rendering of row header cells in a pivot grid or table by setting custom templates for row headers, allowing developers to replace default captions with personalized content, dynamic labels, or complex display elements based on the row data. Enable tailored formatting, conditionally render values, and use context like the row member or tuple data to configure how row headers appear in summaries, reports, or data analysis views. Useful for scenarios where users want to set, override, or modify row header content programmatically, incorporate additional insights or icons, or adapt layouts according to the hierarchical data structure. Supports flexible rendering patterns by injecting templates or components targeting row header elements to enhance readability, interaction, or visual presentation. This is applicable in pivot table customizations, advanced grid views, and data visualization interfaces requiring customized row label displays driven by underlying multidimensional data tuples.
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
    $("#pivotgrid").kendoPivotGrid({
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

### messages `Object`

The text messages displayed in the fields sections.


<div class="meta-api-description">
Customize, configure, or set text labels, prompts, notifications, or messages displayed within the fields area, field sections, or field list of a data pivot grid or interactive pivot table interface, including changing default wording, updating UI text strings, adjusting field captions, and controlling language or terminology used in field headers or selectors, enabling personalized or localized messages for improved user experience and clearer display of pivot table field-related information.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        height: 550,
        messages: {
            measureFields: "Drop Measure Here",
            columnFields: "Drop Column Here",
            rowFields: "Drop Rows Here"
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

### messages.measureFields `String` *(default: "Drop Measure Here")*

The text messages displayed in the measure fields sections.


<div class="meta-api-description">
Customize, configure, or set the display text, labels, or names for numerical value fields, metrics, or aggregated data areas within the pivot table or grid interface to support localization, translation, internationalization, user interface customization, or tailored field captions in summary or measure sections, enabling control over how measure or value fields are presented and described across different languages, regions, or user preferences in data analysis and reporting tools.
</div>

#### Example - setting measure fields section default text

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        height: 550,
        messages: {
            measureFields: "Drop Measure Here"
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

### messages.columnFields `String` *(default: "Drop Column Here")*

The text messages displayed in the column fields sections.


<div class="meta-api-description">
Customize, set, or change the text labels, messages, and titles displayed in the column fields section of a pivot grid or data table, including modifying field names, column headers, or interface prompts shown in the columns area. Adjust and localize the wording for column categories, control how column-related messages appear, and configure user-facing strings in the column fields region of pivot tables or grid controls to match different languages, styles, or application contexts. Enable developers to override default column header texts, tailor column field messages for better clarity, usability, or branding in pivot table interfaces and data analysis tools.
</div>

#### Example - setting column fields section default text

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        height: 550,
        messages: {
            columnFields: "Drop Column Here"
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

### messages.rowFields `String` *(default: "Drop Rows Here")*

The text messages displayed in the row fields sections.


<div class="meta-api-description">
Customize, modify, or update the text labels, messages, or captions displayed in the row fields area of a pivot grid or data pivot table, enabling localization, translation, or personalized naming for row field headers, titles, or prompts within pivot table row grouping, row headings, or row field sections, allowing developers to set, configure, or override default strings for improved user interface clarity and multi-language support in data analysis or reporting views.
</div>

#### Example - setting row fields section default text

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        height: 550,
        messages: {
            rowFields: "Drop Rows Here"
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

### messages.fieldMenu `Object`

The text messages displayed in the field menu.


<div class="meta-api-description">
Configure, customize, or set localized text labels, strings, and messages displayed in the pivot grid’s field menu interface, including translation, internationalization, or adjustment of prompts, tooltips, commands, and menu item wording for different languages or regional settings; control or override default field menu terminology, captions, hints, and message content to enhance user experience and adapt the pivot table field options to specific localization requirements or custom vocabularies used in various applications.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                info: "Show items with value that:",
                sortAscending: "Sort Ascending",
                sortDescending: "Sort Descending",
                filterFields: "Fields Filter",
                filter: "Filter",
                include: "Include Fields...",
                title: "Fields to include",
                clear: "Clear",
                ok: "Ok",
                cancel: "Cancel"
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

### messages.fieldMenu.info `String` *(default: "Show items with value that:")*

The text messages displayed in fields filter.


<div class="meta-api-description">
Customize or translate the informational text that appears in the filter menu for PivotGrid fields, enabling developers to set, configure, or localize the filter field messages with specific wording, language options, or customized instructions shown in field menus during pivot table filtering operations. This supports adapting filter prompts, hints, and info message content to different languages, user preferences, or application contexts to ensure clarity and usability in the pivot field filtering interface.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                info: "Filter items by field name:"
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

### messages.fieldMenu.sortAscending `String` *(default: "Sort Ascending")*

The text message displayed for the menu item which performs ascending sort.


<div class="meta-api-description">
Customize or translate the text label for the menu option that triggers sorting data in ascending order within a pivot grid or data table, enabling changes to the ascending sort command’s display name, menu prompt, or sort instruction wording to match different languages, locales, or specific terminology preferences in user interface sorting controls.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        sortable: true,
        height: 550,
        messages: {
            fieldMenu: {
              sortAscending: "Sort (asc)"
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

### messages.fieldMenu.sortDescending `String` *(default: "Sort Descending")*

The text message displayed for the menu item which performs descending sort.


<div class="meta-api-description">
Customize or configure the text label, caption, or wording for the menu option that triggers sorting data in descending order within a pivot grid or data table interface, enabling changes to the user interface prompt for controlling descending sort order, adjusting localization or translation for the descending sort command, setting the message string shown for sorting from highest to lowest, and modifying the textual menu item that activates reverse numeric or alphabetical sorting in pivot table field menus.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        sortable: true,
        height: 550,
        messages: {
            fieldMenu: {
              sortDescending: "Sort (desc)"
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

### messages.fieldMenu.filterFields `String` *(default: "Fields Filter")*

The text messages of the fields filter menu item.


<div class="meta-api-description">
Adjust, set, or configure the text labels, prompts, and user interface strings displayed in the field filter menu of a pivot table or data grid, enabling localization and customization of filter field options, filter menu wording, filter dialog messages, and filtering interface language to match different languages, terminologies, or user preferences in dynamic data exploration or pivot grid components.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                filterFields: "Filter current field"
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

### messages.fieldMenu.filter `String` *(default: "Filter")*

The text messages of the filter button.


<div class="meta-api-description">
Customize or translate the filter button label, text, or caption in the pivot table field menu to display different languages, adjust wording, or set personalized filter message prompts in the filtering options of pivot grid interfaces, enabling control over the filter command label shown to users when interacting with pivot table fields.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                filter: "Done"
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

### messages.fieldMenu.include `String` *(default: "Include Fields...")*

The text messages of the include menu item.


<div class="meta-api-description">
Customize, translate, or set the text label for the inclusion option in field menus within pivot tables or data grids, enabling control over the wording used to represent filter or selection actions like "include," "add," or "show" in localized user interfaces and adaptable data analysis tools.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                include: "Choose fields to include"
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

### messages.fieldMenu.title `String` *(default: "Fields to include")*

The title of the include fields dialog.


<div class="meta-api-description">
Customize or configure the dialog title text for the field inclusion menu within PivotGrid interfaces, enabling localization, setting, or overriding default titles to match specific language preferences or user interface labeling, control and adjust menu headings for field selection dialogs in data pivoting scenarios, support translating or personalizing the prompt text that appears when managing which fields to include, facilitate changing or localizing the title shown in pop-up menus for selecting pivot table fields.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                title: "Choose fields to include"
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

### messages.fieldMenu.clear `String` *(default: "Clear")*

The text of the clear filter expressions button.


<div class="meta-api-description">
Set or customize the label text for the button that clears or resets filter expressions in pivot grid field menus, enabling control over the wording used to remove active filters, reset filtering criteria, or clear selected filter conditions within the pivot table interface. This configuration supports localization, customization of button captions related to filter removal, and adjustments to the clear filter action label in data summarization or pivot table field menus.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                clear: "Clear filter expressions"
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

### messages.fieldMenu.ok `String` *(default: "Ok")*

The text of the OK button in the include fields dialog.


<div class="meta-api-description">
Configure or customize the confirmation button text in pivot table field selection dialogs, adjust or translate the "OK" label in field menus for pivot grids, set localized or alternative phrases to confirm field inclusion or selection, modify the acceptance button wording in pivot grid interfaces, enable changing the default confirm button text in field menus to support multiple languages or custom terminology during field selection processes.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                ok: "Done"
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

### messages.fieldMenu.cancel `String` *(default: "Cancel")*

The text of the cancel button in the include fields dialog.


<div class="meta-api-description">
Customize, set, or change the cancel button label, text, or caption in the pivot grid field selection menu, dialog, or popup; control the wording for the cancel action in field menus, configure the cancel button display text in UI dialogs related to include fields or field menus within pivot grid components, adjust the cancel label for clearer user prompts or localized text, modify the cancel option wording when working with pivot table field configuration menus or sidebars.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                cancel: "Close"
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

### messages.fieldMenu.operators `Object`

The text of the filter operators displayed in the filter menu.


<div class="meta-api-description">
Customize and localize the filter operator labels displayed in the pivot table or data grid filter menu by configuring, setting, or translating comparison operators such as equals, contains, starts with, and other filtering options; control how filter conditions appear in the UI, enable language-specific or custom operator names, and adapt the filtering vocabulary to different locales or user preferences for better clarity and usability in data slicing and dicing interfaces.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                operators: {
                    contains: "Contains",
                    doesnotcontain: "Does not contain",
                    startswith: "Starts with",
                    endswith: "Ends with",
                    eq: "Is equal to",
                    neq: "Is not equal to"
                }
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

### messages.fieldMenu.operators.contains `String` *(default: "Contains")*

The text of the "contains" filter operator.


<div class="meta-api-description">
Customize or translate the filter option text that performs partial text matching or substring searches like "contains" within pivot table or grid field menus, enabling control over how filter operators for inclusion or search by text fragments appear in UI elements, menus, or dropdowns for data filtering functionality.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                operators: {
                    contains: "Contains"
                }
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

### messages.fieldMenu.operators.doesnotcontain `String` *(default: "Does not contain")*

The text of the "Does not contain" filter operator.


<div class="meta-api-description">
Modify or set the label text for the "does not contain" filter operator in a PivotGrid field menu, enabling customization of filter option descriptions, control over negative substring matching terms, and adjustment of exclusion criteria wording in filtering interfaces. This supports tailoring filter operator names for user interface clarity, localization, alternative phrasing for "does not contain" conditions, and precise configuration of filter labels in grid or data table components.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                operators: {
                    doesnotcontain: "Doesn't contain"
                }
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

### messages.fieldMenu.operators.startswith `String` *(default: "Starts with")*

The text of the "Starts with" filter operator.


<div class="meta-api-description">
Customize or configure the label and text for the "starts with" filter option in pivot table or pivot grid field menus, enabling control over localization, translation, and display of the prefix matching operator used in filtering fields or columns, so users can search, filter, or set conditions that match values beginning with specific characters or substrings within data analysis or report interfaces.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                operators: {
                    startswith: "Starts"
                }
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

### messages.fieldMenu.operators.endswith `String` *(default: "Ends with")*

The text of the "Ends with" filter operator.


<div class="meta-api-description">
Customize or configure the filter operator text for conditions that match values ending with specific strings in pivot grid menus, enabling you to set or change how "ends with" filtering options are displayed or labeled in field menus, adjust the terminology or wording for suffix-based filtering expressions, control the user interface text related to filters that check if data entries conclude with certain characters or substrings, and tailor the suffix match filter operator wording to fit your application's language, style, or user preferences.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                operators: {
                    endswith: "Ends"
                }
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

### messages.fieldMenu.operators.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.


<div class="meta-api-description">
Customize or configure the label text for the equality filter operator in pivot grid field menus, enabling control over how the "equals" or "equal to" operator appears in filter dropdowns, search for ways to rename, localize, modify, or set the exact wording shown for equality comparison filters within data pivot tables or grid filtering options, supporting scenarios where developers want to adjust the textual representation of the "eq" filter operator for clearer user interfaces or multilingual applications.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                operators: {
                    eq: "Equal to"
                }
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

### messages.fieldMenu.operators.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.


<div class="meta-api-description">
Customize or localize the label text for the "not equal" filter operator in pivot table field menus, enabling configuration of how inequality conditions are displayed, renamed, or translated in filter options for pivot grid fields, so users can set or override the string shown when applying filters that exclude matching values or specify non-equality criteria.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        height: 550,
        messages: {
            fieldMenu: {
                operators: {
                    neq: "Not equal to"
                }
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

## Fields

### dataSource `kendo.data.PivotDataSource`

The [data source](/api/javascript/data/pivotdatasource) of the widget. Configured via the [dataSource](/api/javascript/ui/pivotgrid/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/pivotgrid/methods/setdatasource) method instead.


<div class="meta-api-description">
Retrieve or inspect the current data source field of a pivot grid to bind, monitor, or manipulate its underlying dataset driving rows, columns, values, and aggregates; understand how filters, schemas, and data transport settings within the existing data source influence the grid’s display and operations; connect or react to changes in the active pivot data collection without replacing the entire source, enabling dynamic updates and configurations reflecting user interactions, data transformation, or integration scenarios where modifying or accessing the live data context is required instead of assigning a completely new data source.
</div>

#### Example - get reference to the widget data source

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

    //get reference to the widget data source
    var dataSource = $("#pivotgrid").data("kendoPivotGrid").dataSource;
    </script>

## Methods

### cellInfo

Returns an information about a data cell at a specific column and row index.


<div class="meta-api-description">
Access detailed metadata and information for a specific data cell within a pivot table or grid by specifying its row and column indices. Retrieve cell content, values, headers, formatting details, or context data to enable conditional styling, customized rendering, dynamic cell inspection, or interactive manipulation. Use this method to query individual cells after grid initialization, facilitate custom data visualization, extract cell-level metrics, or implement specialized cell-based logic and formatting workflows. This functionality supports precise cell targeting, metadata retrieval, content lookup, and programmatic interaction within pivot table structures.
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
* measure - the measure value of the data cell
* dataItem - the data item itself

#### Example - get an information for a specific data cell

    <button id="get">Get info</button>
    <div id="pivotgrid"></div>
    <script>
    $(function() {
        var pivotgrid = $("#pivotgrid").kendoPivotGrid({
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
        }).data("kendoPivotGrid");

        $("#button").click(function() {
            var columnIndex = 1; //2006
            var rowIndex = 1; //Bikes

            var info = pivotgrid.cellInfo(columnIndex, rowIndex); //retrieve data cell information

	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(info);
        });
    });
    </script>

### cellInfoByElement

Returns an information about for a specific data cell element


<div class="meta-api-description">
Obtain detailed information and metadata for a rendered data cell within a pivot grid by providing the related DOM element or jQuery object representing that cell, enabling retrieval of its position coordinates, cell type, associated data context, cell value, and other relevant attributes to connect interface elements with underlying data, map visual components back to source data points, identify cell-specific details from the UI element, and support tasks like cell inspection, data extraction, or custom interaction handling based on cell properties.
</div>

#### Parameters

##### cell `String|Element|jQuery`

A string, DOM element or jQuery object which represents the data table cell. A string is treated as a jQuery selector.

#### Returns

`Object` the data cell information.

The fields of the result object:

* columnTuple - the tuple of the corresponding column header cell
* rowTuple - the tuple of the corresponding row header cell
* measure - the measure value of the data cell
* dataItem - the data item itself

#### Example - get information on element hover

    <div id="pivotgrid"></div>
    <script>
    $(function() {
        var pivotgrid = $("#pivotgrid").kendoPivotGrid({
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
        }).data("kendoPivotGrid");

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
Terminate or shut down the pivot grid component by removing all event listeners, clearing stored data attributes, and invoking cleanup processes for any embedded or nested child components to prevent memory leaks, release resources, and fully disconnect internal bindings while keeping the component element intact in the DOM; effectively reset, disable, or dismantle the pivot grid instance for safe disposal, ensuring thorough detachment of handlers and cleanup before removal or replacement.
</div>

#### Example

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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
    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    pivotgrid.destroy();
    </script>

### refresh

Renders all content using the current data items.


<div class="meta-api-description">
Trigger a full redraw and update of the pivot grid display to immediately reflect changes in data, layout, or underlying arrays without making additional data requests; refresh recomputes all aggregates, recalculates cell values, and re-renders the entire grid view based on current in-memory data, enabling developers to programmatically apply changes and instantly see updated pivot table results, structures, and calculated summaries without reloading or fetching remote data sources.
</div>

#### Example - refresh the widget

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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
    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    pivotgrid.refresh();
    </script>

### setDataSource

Sets the data source of the widget.


<div class="meta-api-description">
Change, update, or replace the pivot table's data source dynamically during application runtime by assigning a new data set, whether from an array, data configuration object, or data source instance, enabling live reconfiguration, rebinding, refreshing, or resetting of the pivot grid’s displayed information without recreating the component, supporting use cases like real-time data updates, switching datasets, or reloading data on user interaction through methods to configure or set new underlying data sources for the pivot grid visualization.
</div>

#### Parameters

##### dataSource `kendo.data.PivotDataSource`

The data source to which the widget should be bound.

#### Example - set the data source

    <div id="pivotgrid"></div>
    <script>
        $("#pivotgrid").kendoPivotGrid({
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
        var dataSource = new kendo.data.PivotDataSource({
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }],
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
        });

        setTimeout(function(){
            var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
            pivotgrid.setDataSource(dataSource);
        }, 2000);
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](/api/javascript/ui/pivotgrid/events/excelexport) event.

> Calling this method could trigger the browser built-in popup blocker in some cases. To avoid that, always call it as a response to an end-user action e.g. button click.


<div class="meta-api-description">
Export or save pivot table data and summaries to an Excel file, trigger file download in the browser, initiate exporting process that can be customized or canceled through event handling, enable or configure exporting pivot grid contents to spreadsheets, control and modify data before export, handle or prevent popup blockers by linking export to user interactions like clicks, convert dashboard or report data into .xlsx format programmatically, automate exporting and downloading Excel files from pivot tables, initiate spreadsheet exports with event-driven customization, save pivot grid reports as Excel workbooks on user demand.
</div>

#### Example - manually initiate Excel export

    <button id="export">Export to Excel</button>
    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

    $("#export").click(function(e) {
        var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
        pivotgrid.saveAsExcel();
    });
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](/api/javascript/ui/pivotgrid/events/pdfexport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.


<div class="meta-api-description">
Trigger PDF export of a pivot grid, initiate saving the grid data as a PDF file, start exporting pivot table reports programmatically, generate downloadable PDF versions of pivot data, handle PDF export results asynchronously with Promises for chaining success or error, manage export events during PDF creation, avoid browser pop-up blockers by running export in user-triggered actions like clicks, configure and enable PDF output of pivot tables, control and automate saving pivot grid content as PDF documents, facilitate exporting pivot grid views to PDF format in web applications.
</div>

#### Returns
`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](/api/javascript/ui/pivotgrid/events/pdfexport) event arguments.

#### Example - manually initiate PDF export

    <button id="export">Export to PDF</button>
    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

    $("#export").click(function(e) {
        var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
        pivotgrid.saveAsPDF();
    });
    </script>

## Events

### dataBinding

Fired before the widget binds to its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Trigger custom code or execute functions before a pivot grid connects to or loads data from its source, enabling validation checks, dynamic parameter adjustments, UI updates, or state inspections ahead of data binding; configure event handlers to intercept the data loading phase, control pre-binding workflows, handle data preparation tasks, or cancel binding based on conditions, with event context tied to the pivot grid instance for seamless integration and manipulation prior to displaying or processing data.
</div>

#### Event Data

##### e.preventDefault `Function`

If invoked prevents the data bind action. The PivotGrid will remain unchanged and `dataBound` event will not fire.

##### e.sender `kendo.ui.PivotGrid`

The widget instance which fired the event.

#### Example - subscribe to the "dataBinding" event during initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

#### Example - subscribe to the "dataBinding" event after initialization

    <div id="pivotgrid"></div>
    <script>
    function dataBinding(e) {
        e.preventDefault();
    }

    $("#pivotgrid").kendoPivotGrid({
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
    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    pivotgrid.bind("dataBinding", dataBinding);
    </script>

### dataBound

Fired after the widget is bound to the data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Trigger custom actions or run logic immediately after loading and rendering data in a pivot grid or similar data-driven UI components, enabling triggering follow-up processes such as layout adjustments, refreshing connected interfaces, initiating analytics, or starting dependent data requests once data binding completes. Detect when data has fully loaded and the component is visually updated, and execute callback functions tied to the component instance for dynamic UI updates, event-driven workflows, or post-load synchronization. Control or hook into the exact moment when data is ready and rendered, facilitating custom event handling, automated refreshes, or chaining additional operations dependent on successful data binding.
</div>

#### Event Data

##### e.sender `kendo.ui.PivotGrid`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

#### Example - subscribe to the "dataBound" event after initialization

    <div id="pivotgrid"></div>
    <script>
    function dataBound(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("data bound");
    }

    $("#pivotgrid").kendoPivotGrid({
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
    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    pivotgrid.bind("dataBound", dataBound);
    </script>

### expandMember

Fired before column or row field is expanded.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Capture or handle the action triggered when a row or column item within a data grid or pivot table is about to open or expand, enabling you to intercept expand requests, execute custom code before expansion, decide whether to allow or cancel expanding, inspect details of the expanding member, listen for expand events to control dynamic data loading, modify behavior based on user interaction or data context, control hierarchical data expansion in pivot tables or grids, and attach event handlers that respond just prior to expanding grid nodes.
</div>

#### Event Data

##### e.preventDefault `Function`

If invoked prevents the expand and the widget will remain in its current state.

##### e.sender `kendo.ui.PivotGrid`

The widget instance which fired the event.

##### e.axis `String`

The axis that will be expanded. Possible values `columns` or `rows`.

##### e.path `String`

The path to the field that will be expanded.

#### Example - subscribe to the "expandMember" event during initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

#### Example - subscribe to the "expandMember" event after initialization

    <div id="pivotgrid"></div>
    <script>
    function expandMember(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("expand member");
    }

    $("#pivotgrid").kendoPivotGrid({
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
    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    pivotgrid.bind("expandMember", expandMember);
    </script>

### collapseMember

Fired before column or row field is collapsed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and handle the action when a row or column group in a pivot table or grid is about to be collapsed, enabling you to intercept collapse triggers, run custom code before the group closes, update the user interface dynamically, validate or adjust state prior to collapsing fields, react to hierarchical member collapse events, or control and customize behavior just before sections fold in pivot layouts, with event handlers bound to the grid instance context for seamless integration and responsive updates.
</div>

#### Event Data

##### e.preventDefault `Function`

If invoked prevents the collapse and the widget will remain in its current state.

##### e.sender `kendo.ui.PivotGrid`

The widget instance which fired the event.

##### e.axis `String`

The axis that will be collapsed. Possible values `columns` or `rows`.

##### e.path `String`

The path to the field that will be collapsed.

#### Example - subscribe to the "collapseMember" event during initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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

#### Example - subscribe to the "collapseMember" event after initialization

    <div id="pivotgrid"></div>
    <script>
    function collapseMember(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("collapse member");
    }

    $("#pivotgrid").kendoPivotGrid({
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
    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    pivotgrid.bind("collapseMember", collapseMember);
    </script>

### excelExport

Fired when [`saveAsExcel`](/api/javascript/ui/pivotgrid/methods/saveasexcel) method is called.


<div class="meta-api-description">
Capture and respond to Excel export triggers from pivot table views by detecting when export-to-Excel commands are invoked, enabling custom logic execution during export initiation, monitoring export parameters, managing export workflows, providing user notifications or progress feedback during export operations, handling export events for data extraction or transformation, intercepting save or download actions of spreadsheet data, customizing export behavior, and integrating additional processing whenever an Excel file generation from pivot grid data begins.
</div>

#### Event Data

##### e.sender `kendo.ui.PivotGrid`

The widget instance which fired the event.

##### e.data `Array`

The array of data items used to create the Excel workbook.

##### e.workbook `Object`

The Excel [workbook configuration object](/api/javascript/ooxml/workbook#configuration). Used to initialize a `kendo.ooxml.Workbook` class. Modifications of the workbook will reflect in the output Excel document.

##### e.preventDefault `Function`

If invoked the grid will not save the generated file.

#### Example - subscribe to the "excelExport" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      excelExport: function(e) {
        e.workbook.fileName = "Grid.xslx";
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsExcel();
    </script>

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        excelExport: function(e) {
            e.workbook.fileName = "Grid.xslx";
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

    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    pivotgrid.saveAsExcel();
    </script>

#### Example - subscribe to the "excelExport" event after initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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
    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    pivotgrid.bind("excelExport", function(e) {
        e.workbook.fileName = "Grid.xslx";
    });
    pivotgrid.saveAsExcel();
    </script>

### pdfExport

Fired when the user clicks the "Export to PDF" toolbar button.


<div class="meta-api-description">
Detect triggering of PDF export actions from the pivot table or grid interface, capturing moments when users initiate export to PDF reports or files through toolbar buttons or commands, enabling interception, customization, enhancement, or alternative handling of PDF generation workflows, including running custom logic, telemetry collection, export flow modification, event listening, and binding for tailored export control in data summarization or reporting components.
</div>

#### Event Data

##### e.sender `kendo.ui.PivotGrid`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked the grid will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - subscribe to the "pdfExport" event during initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        pdfExport: function(e) {
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
    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    pivotgrid.saveAsPDF();
    </script>

#### Example - subscribe to the "pdfExport" event after initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
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
    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    pivotgrid.bind("pdfExport", function(e) {
        alert("PDF export");
    });
    pivotgrid.saveAsPDF();
    </script>
