---
title: ChartWizard
page_title: Configuration, methods and events of Kendo UI ChartWizard component
description: Configuration options, methods and events for the Kendo UI ChartWizard component.
res_type: api
component: aiprompt
---

# kendo.ui.ChartWizard

Represents the Kendo UI ChartWizard. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### dataSource `Array|Object|kendo.data.DataSource` *(default: [])*

Specifies the data to be visualized in the ChartWizard component.

If the `dataSource` option is set to a JavaScript object or array, the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance by using the value as a data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

> ChartWizard component needs a specific type of data(`ChartWizardDataRow`) to work as expected. This type of data, which is an array consists of single or multiple arrays of Objects, which have the `field` and `value` properties.

> ChartWizard component accepts a Table-like data which is an Array consisting of Objects with `dataItem` and `dataColumns` fields. 


<div class="meta-api-description">
Connect charts to data by assigning arrays, objects, or existing data source instances to configure what the chart visualizes, enabling binding from local in-memory data collections, remote data with paging, sorting, filtering, or grouped datasets. Support for plain JavaScript arrays or objects automatically initializes underlying data handling structures, while allowing reuse of preconfigured data source objects for dynamic updates, live data feeds, or complex hierarchical data scenarios. Compatible data formats include arrays of objects with key-value pairs specifying fields and values, or table-like structures with data items and column definitions to map chart series and categories effectively. This setup supports configuring, setting, enabling, or controlling input data flexibly to match diverse data shapes, structures, and loading strategies for comprehensive chart visualization needs.
</div>

#### Example - set dataSource as an Array
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
               dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                    ],
                ]
            });
    </script>

#### Example - set dataSource as a JavaScript object with data
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
               dataSource: {
                data: [
                        [
                            { field: 'Product Name', value: 'Calzone' },
                            { field: 'Quantity', value: 1 },
                            { field: 'Price', value: 12.39 },
                            { field: 'Tax', value: 2.48 },
                            { field: 'Total', value: 14.87 }
                        ],
                    ]
                }
            });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

> To bind the chartWizard component to a remote dataSource which returns only the dataItems, you should set the [dataColumns](/api/javascript/ui/chartwizard#configuration-dataColumns) field.

    <div id="chartwizard"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
                    type: "odata-v4",
                    transport: {
                        read: "https://demos.telerik.com/service/v2/odata/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 20,
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true
                });

    $("#chartwizard").kendoChartWizard({
               dataSource: dataSource,
               dataColumns: [
                    {
                        field: "OrderID",
                    },
                    {
                        field: "Freight",
                    },
                    {
                        field: "ShipName",
                        title: "Ship Name"
                    }, {
                        field: "ShipCity",
                        title: "Ship City"
                    }
                ],
            });
    </script>

### dataColumns `Array`

Configure the columns which will be used to map the dataItems.

> Each dataColumn can be set to an Object which have a `field` property or a `string` which will be considered as the `field` property. 


<div class="meta-api-description">
Configure and control which data fields or columns are used to bind, map, or associate your dataset with chart series and categories, enabling flexible field-to-column assignments for data visualization. Set or customize data source columns, map data items to specific fields, specify binding for chart categories and values, define which dataset fields populate chart series, and manage column-to-field relationships for rendering charts accurately. Adjust data column mappings during chart setup to control how input data translates to chart elements, supporting object or string formats for field identification and enabling precise data-to-visual binding configurations.
</div>

#### Example 

    <div id="chartwizard"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
                    type: "odata-v4",
                    transport: {
                        read: "https://demos.telerik.com/service/v2/odata/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 20,
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true
                });

    $("#chartwizard").kendoChartWizard({
               dataSource: dataSource,
               dataColumns: [
                    {
                        field: "OrderID",
                    },
                    {
                        field: "Freight",
                    },
                    {
                        field: "ShipName",
                        title: "Ship Name"
                    }, {
                        field: "ShipCity",
                        title: "Ship City"
                    }
                ],
            });
    </script>

### dataColumns.field `String`

Sets the field name of the column.


<div class="meta-api-description">
Configure the mapping between chart data columns and underlying data object properties by specifying the property name or field key used for data binding, enabling dynamic linking of chart visuals to data source attributes, setting or controlling which object attribute the chart reads values from, defining the column’s data field for correct value extraction, and ensuring synchronization between chart components and the corresponding data item properties through accurately naming or matching fields in data binding scenarios.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        dataColumns: [
            {
                field: "productName",
                title: "Product"
            },
            {
                field: "unitPrice", 
                title: "Price"
            }
        ]
    });
    </script>

### dataColumns.title `String`

Sets the title of the column.


<div class="meta-api-description">
Set or customize the visible header text, column caption, or label for data columns during chart setup or initialization, enabling clear identification, naming, or titling of columns in a chart or data visualization tool; configure, control, or rename the column header to improve clarity, readability, or presentation of data columns within the chart wizard interface, ensuring intuitive labeling for columns in charts, graphs, or data tables.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        dataColumns: [
            {
                field: "productName",
                title: "Product Name"
            },
            {
                field: "unitPrice", 
                title: "Unit Price"
            }
        ]
    });
    </script>

### exportOptions `Object`

Configure the options for the export functionality


<div class="meta-api-description">
Set and customize chart export behavior including file formats like PNG, JPEG, PDF, and SVG, specify output file names, define export dimensions and scaling for resolution control, enable or disable backgrounds during export, and configure proxy or server settings to manage downloads and printing workflows, covering everything needed to tailor chart saving, exporting, and sharing options across various use cases and environments.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
                dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                    ],
                ],
                exportOptions: {
                    fileName: 'report',
                    pdf: {
                        paperSize: 'Letter'
                    },
                    image: {
                        width: 1900,
                        height: 1200
                    }
                }
            });
    </script>

### exportOptions.fileName `String`

Configure the name of the exported file.


<div class="meta-api-description">
Configure or set the default name for files exported from charts including images or documents in formats like PNG, PDF, SVG, or others; control and customize the filename used during chart export to improve file organization and identification, ensuring that exported visuals are saved with meaningful, user-defined names that simplify file management and retrieval across various export types.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
                dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                    ],
                ],
                exportOptions: {
                    fileName: 'report',
                }
            });
    </script>

### exportOptions.pdf `Object`

Parameters for the exported PDF file as `kendo.drawing.PDFOptions`.


<div class="meta-api-description">
Set and customize PDF export parameters for chart exports including page dimensions, margins, scaling factors, layout control, PDF metadata such as author and title, export quality settings, and output formatting options to produce tailored, high-quality PDF files when saving or exporting charts. Adjust document size, orientation, resolution, and embed fonts or images for optimizing PDF exports in chart generation workflows, controlling how charts render in PDF files with flexible options for professional or print-ready output.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
                dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                    ],
                ],
                exportOptions: {
                    pdf: {
                        paperSize: 'Letter'
                    },
                }
            });
    </script>

### exportOptions.pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.


<div class="meta-api-description">
Configure automatic printing behavior for PDF exports by enabling or disabling the immediate display of the print dialog once the PDF file is opened, allowing users to prompt printing directly after export without manual interaction; manage print preview activation as part of export settings, control auto-launch of the print interface in PDF viewers, and adjust workflow to streamline printing of charts or documents by setting this option, while considering compatibility with different PDF reader applications and their print dialog handling capabilities.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                autoPrint: true
            }
        }
    });
    </script>

### exportOptions.pdf.creator `String` *(default: "Kendo UI PDF Generator")*
The creator of the PDF document.


<div class="meta-api-description">
Configure or set the PDF document creator metadata, author name, or creator string for exported PDF files generated from charts to control document properties, metadata tags, indexing information, PDF viewer display data, and searchable author attributes when saving or exporting charts as PDFs.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                creator: "My Application v1.0"
            }
        }
    });
    </script>

### exportOptions.pdf.date `Date`
The date when the PDF document is created. Defaults to `new Date()`.


<div class="meta-api-description">
Control and configure the PDF creation timestamp to set the document’s Date metadata and printed time when exporting charts, enabling customization of export dates for reporting, documentation, or versioning purposes. Enable setting a specific date and time for PDF export to override default timestamps, support audit trails, and synchronize file metadata with external systems or user requirements. Adjust or define the export date to influence how the PDF's creation time appears in metadata, print headers, or file properties, useful for backdating, future dating, or aligning with event logs during automated report generation.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                date: new Date(2023, 11, 25)
            }
        }
    });
    </script>

### exportOptions.pdf.imgDPI `Number`
The forced resolution (in dpi) of the images in the exported PDF document.
By default, the images are exported at their full resolution.


<div class="meta-api-description">
Control and configure the resolution or dots per inch (dpi) of images embedded within exported PDF charts to adjust image clarity, sharpness, and file size when saving or exporting graphical data as PDF files; set custom image dpi values to enhance print quality or reduce PDF document size by lowering image resolution, enabling developers to define image output quality for chart export workflows, image compression in PDFs, or maintaining high definition visuals in PDF reports generated from charts.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                imgDPI: 300
            }
        }
    });
    </script>

### exportOptions.pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.


<div class="meta-api-description">
Adjust JPEG compression quality level when exporting charts or graphical reports to PDF format, enabling control over image clarity versus file size by setting a value between 0 and 1; optimize visual fidelity, reduce export file bulk, enhance PDF image rendering, balance compression ratio, configure output quality for charts and diagrams, fine-tune JPEG encoding during export, improve or shrink exported images, and set quality parameters for PDF chart exports to tailor the resolution and storage footprint according to user preferences and performance needs.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                jpegQuality: 0.8
            }
        }
    });
    </script>

### exportOptions.pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.


<div class="meta-api-description">
Control whether embedded PNG images remain in their original PNG format during PDF export, enabling retention of image quality and clarity when generating PDFs with charts, graphs, or visual data; configure export settings to preserve raster image fidelity, maintain transparent backgrounds, avoid conversion to other image formats, and ensure that exported PDFs include high-resolution PNG graphics exactly as displayed within the chart or report output.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                keepPNG: true
            }
        }
    });
    </script>

### exportOptions.pdf.keywords `String` *(default: null)*
Specifies the keywords of the exported PDF file.


<div class="meta-api-description">
Set or configure PDF metadata keywords for exported documents to include searchable terms, tags, or indexable phrases that enhance discovery and indexing of PDF files generated from charts or visual data components; control and customize embedded document properties, descriptions, and keyword strings to improve PDF file classification, search engine optimization, and content identification within exported reports or visual exports.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                keywords: "chart, data visualization, report"
            }
        }
    });
    </script>

### exportOptions.pdf.landscape `Boolean` *(default: false)*
Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.


<div class="meta-api-description">
Configure PDF export orientation to landscape or portrait when generating charts, enabling control over page layout by setting the width as the longer edge for horizontal display or the height as the dominant dimension for vertical format; adjust export settings to switch between landscape and portrait modes for optimized printing, presentation, or file output, ensuring exported PDFs match desired layout preferences for charts and graphical data.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                landscape: true,
                paperSize: "A4"
            }
        }
    });
    </script>

### exportOptions.pdf.margin `Object`
Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).


<div class="meta-api-description">
Set, customize, or adjust page margins for PDF exports of charts by defining numeric values or strings with units like millimeters, centimeters, inches, or points to control whitespace around the content, fine-tune layout spacing, and manage printable area boundaries when generating PDF files from graphical data representations.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                margin: {
                    top: "20mm",
                    left: "20mm",
                    bottom: "20mm",
                    right: "20mm"
                }
            }
        }
    });
    </script>

### exportOptions.pdf.margin.bottom `Number|String` *(default: 0)*
The bottom margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Configure the bottom margin size or spacing at the base of PDF pages when exporting charts or visual data to PDF format, enabling control over page layout, whitespace, padding, and edge distance in the exported document; set numeric values for precise page margin adjustment to optimize the printable or viewable area, customize page borders, and ensure proper content positioning on the bottom edge of PDF exports from charts or graphical reports.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                margin: {
                    bottom: "15mm"
                }
            }
        }
    });
    </script>

### exportOptions.pdf.margin.left `Number|String` *(default: 0)*
The left margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Adjust the left page margin or left whitespace of exported PDF files when saving charts, graphs, or data visualizations; set, configure, or control the left side indentation, padding, or offset in PDF exports to customize layout spacing, ensure proper alignment, and manage printable area margins.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                margin: {
                    left: "20mm"
                }
            }
        }
    });
    </script>

### exportOptions.pdf.margin.right `Number|String` *(default: 0)*
The right margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Configure or adjust the right margin size for PDF exports of charts, controlling the spacing on the right edge of exported pages in points or units, enabling customization of page layout for PDF output, setting the right page padding or whitespace when saving charts as PDF files, specifying how much empty space appears on the right side during PDF export, and tailoring margin width to ensure proper alignment or formatting in exported chart documents.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                margin: {
                    right: "20mm"
                }
            }
        }
    });
    </script>

### exportOptions.pdf.margin.top `Number|String` *(default: 0)*
The top margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Adjust or configure the upper page margin for PDF outputs generated from chart exports or print jobs, controlling the amount of whitespace at the top edge of the exported PDF document by specifying a numeric measurement value in points, enabling customization of PDF layout spacing, top padding, or margin settings for visually balanced chart presentations during export or printing processes.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                margin: {
                    top: "25mm"
                }
            }
        }
    });
    </script>

### exportOptions.pdf.paperSize `String|Array` *(default: "auto")*
Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size. The supported paper sizes are: A0-A10, B0-B10, C0-C10, Executive, Folio, Legal, Letter, Tabloid.
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".


<div class="meta-api-description">
Configure and customize the page dimensions, size, format, layout, and scale for PDF exports of charts or graphical data, including setting predefined standard paper sizes like A0 through A10, B series, C series, Executive, Legal, Letter, Tabloid, or defining custom page width and height using points, inches, millimeters, or centimeters units. Adjust or control output PDF page format for chart exports, specify exact paper size measurements, switch between automatic sizing based on content or fixed dimensions, and convert pixel dimensions to point scale for precise layout and printing preferences in PDF documents. Enable managing export page layout options, setting export resolution, and controlling printable area size to fit various requirements for sharing, printing, or embedding charts in PDF format.
</div>

#### Example - set the paper size of the PDF document
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
                dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                    ],
                ],
                exportOptions: {
                    pdf: {
                        paperSize: 'Letter'
                    },
                }
            });
    </script>

### exportOptions.pdf.subject `String` *(default: null)*
Sets the subject of the PDF file.


<div class="meta-api-description">
Set or modify the PDF document subject metadata when exporting charts, reports, or visualizations to PDF format to customize searchable metadata, control file properties for indexing, enable compliance with document standards, and tailor exported PDF information for easier identification, filtering, or cataloging in document management systems.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                subject: "Sales Report Q4 2023"
            }
        }
    });
    </script>

### exportOptions.pdf.title `String` *(default: null)*
Sets the title of the PDF file.


<div class="meta-api-description">
Set or customize the title text embedded in the exported PDF file’s metadata, defining the document’s name, header, or identifier for generated reports, charts, or graphical exports to reflect branding, project names, or user-defined labels; control, specify, or configure the PDF document title string that appears in file properties or PDF viewers upon saving, sharing, or printing chart visualizations.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        exportOptions: {
            pdf: {
                title: "Annual Sales Chart Report"
            }
        }
    });
    </script>

### exportOptions.image `Object`

Parameters for the exported Image.

* options.width `Number`
The width of the exported image. Defaults to the scene width.

* options.height `Number`
The height of the exported image. Defaults to the scene height.

* options.cors `String` *(default: "anonymous")*
Specifies how [cross-origin images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)
should be requested.

Requesting images without CORS will "taint" the canvas. It will still be visible on the page, but all
script access to it is disabled to prevent information disclosure.


<div class="meta-api-description">
Configure image export settings including the ability to set or control the width and height dimensions of exported charts, customize image size or resolution, adjust output image proportions, and manage cross-origin resource sharing (CORS) policies such as specifying anonymous or credentialed image requests to prevent canvas tainting or enable access to embedded images from different origins during chart download or export processes. This includes options to define image export width and height explicitly, enable CORS handling for secure image retrieval, control how cross-domain images affect canvas scripting access, and optimize exported chart images for quality, size, and security when saving or sharing visualized data.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
                dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                    ],
                ],
                exportOptions: {
                    image: {
                        width: 1900,
                        height: 1200
                    }
                }
            });
    </script>

### exportOptions.image.width `Number`

The width of the exported image. Defaults to the scene width.


<div class="meta-api-description">
Adjust or configure the horizontal pixel dimension for exported images from the chart generation tool, enabling control over the final output size and resolution when saving or exporting visual data. This setting lets users define a custom numeric width for the image file, overriding default scene or viewport widths, to optimize export quality, fit specific display or printing requirements, or tailor image dimensions for sharing, embedding, or further processing. Whether you need to set exact pixel widths, resize exported charts, manage export scaling, or ensure consistent image sizes across different outputs, this parameter handles customization of the exported graphic’s width dimension.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
                dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                    ],
                ],
                exportOptions: {
                    image: {
                        width: 1900,
                    }
                }
            });
    </script>

### exportOptions.image.height `Number`

The width of the exported image. Defaults to the scene width.


<div class="meta-api-description">
Adjust, set, or configure the height dimension of exported images to control vertical size and output resolution during image export processes; manage the pixel height or image height parameter to define precisely the output image dimensions, ensuring exported graphics match desired vertical scale or scene dimensions; control image height for exports in various formats to customize aspect ratio, resolution, and sizing when saving or outputting chart visuals and graphics; specify or override automatic height sizing to fit export needs or maintain consistent image proportions across different export scenarios or user-defined requirements.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
                dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                    ],
                ],
                exportOptions: {
                    image: {
                        height: 1200,
                    }
                }
            });
    </script>

### exportOptions.image.cors `String` *(default: "anonymous")*

Specifies how [cross-origin images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)
should be requested.

Requesting images without CORS will "taint" the canvas. It will still be visible on the page, but all
script access to it is disabled to prevent information disclosure.

Can be set to:

* "anonymous" - do not send user credentials as part of the request
* "use-credentials" - send credentials as part of the request
* false - fetch images without CORS, possibly tainting the canvas


<div class="meta-api-description">
Configure cross-origin resource sharing behavior for external images during chart export by setting CORS modes that control image loading with or without credentials, enabling you to manage canvas tainting and security restrictions. Adjust image fetching options to either allow anonymous requests, include credentials, or bypass CORS entirely, influencing whether the canvas becomes write-protected due to security policies. Control how cross-origin images are handled to prevent or permit script access, avoid information leakage, and customize export behavior regarding external image sources and cross-domain resource sharing. Manage credential settings and CORS modes to set secure or unrestricted loading of images during exporting graphical content.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
                dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                    ],
                ],
                exportOptions: {
                    image: {
                        cors: "use-credentials",
                    }
                }
            });
    </script>

### messages `Object`

The configuration of the ChartWizard messages. Use this option to customize or localize the ChartWizard messages.


<div class="meta-api-description">
Customize, configure, and localize user interface text, labels, prompts, and messages for interactive chart creation tools, enabling control over displayed copy, adapting the UI language to different locales, setting custom strings for various UI elements, modifying default prompts or tooltips, and tailoring the messaging experience to specific user preferences or internationalization requirements in chart wizard components and interactive data visualization interfaces.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            window: {
                title: "Custom Chart Wizard"
            },
            chart: {
                bar: {
                    expandText: "Custom Bar Chart"
                }
            },
            data: {
                configuration: {
                    expandText: "Custom"
                }
            }
        }
    });
    </script>

### messages.window `Object`

Specifies the text configuration for the ChartWizard window messages.


<div class="meta-api-description">
Customize and control the window title, labels, prompts, alerts, and all user interface text related to chart creation windows, enabling localization, translation, and modification of default strings for better user experience and multi-language support in chart configuration dialogs and wizard interfaces.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            window: {
                title: "Chart Creation Wizard"
            }
        }
    });
    </script>

### messages.window.title `String`

Specifies the text in the title bar of the Window.


<div class="meta-api-description">
Customize, configure, or localize the window title text displayed in chart creation dialogs by setting or controlling the text label that appears at the top of chart wizard windows, enabling support for different languages, translations, and user interface adjustments for internationalization or branding purposes.
</div>

#### Example - set the "title" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                window: {
                    title: "Custom Window Title"
                }     
            }
        });
    </script>

### messages.export `String`

Specifies the text of the export button.


<div class="meta-api-description">
Configure or customize the export button label text for chart wizards, enabling localization, translation, UI text changes, customizing button captions, setting export action labels, adjusting user interface strings, modifying export prompts, updating button wording, tailoring export messages, and controlling how export options are displayed in different languages or user settings.
</div>

#### Example - set the "export" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                export: "Download"     
            }
        });
    </script>

### messages.exportPDF `String`

Specifies the text of the export to PDF item.


<div class="meta-api-description">
Customize or configure the label, text, or wording shown for exporting charts as PDF within the chart wizard menu, enabling localization, translation, renaming, or adjusting the export to PDF button, menu item, or command text to fit different languages, branding, or user interface preferences.
</div>

#### Example - set the "exportPDF" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                exportPDF: "Download PDF"     
            }
        });
    </script>

### messages.exportSVG `String`

Specifies the text of the export to SVG item.


<div class="meta-api-description">
Customize or localize the text label for exporting charts as SVG by configuring the export menu item language, setting the export-to-SVG button caption, adjusting the label for save-as-SVG options, controlling the export dialog wording, or modifying the UI message for SVG output to fit different languages, regions, or user preferences in chart export functionality.
</div>

#### Example - set the "exportSVG" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                exportSVG: "Download SVG"     
            }
        });
    </script>

### messages.exportPNG `String`

Specifies the text of the export to PNG item.


<div class="meta-api-description">
Set or customize the label text, caption, or display name for exporting charts as PNG files in the export menu, control or change the menu item text for saving charts in PNG image format, configure the wording or tooltip for the export to PNG option, modify the export button label for PNG output, adjust the menu item description or locale string related to PNG chart export, update the text shown when enabling or calling the export to PNG feature.
</div>

#### Example - set the "exportPNG" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                exportPNG: "Download PNG"    
            }
        });
    </script>

### messages.tab `Object`

Specifies the text of the tabs.


<div class="meta-api-description">
Configure and customize tab labels, set or localize tab text, define tab captions, control the display names for tabs, enable multi-language support for tab headers, customize interface labels within tabbed navigation, adjust tab titles, specify user-facing tab names, translate or modify tab text content, and manage tab label strings to match localization or branding requirements.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            tab: {
                chart: "Chart Type",
                data: "Data Source",
                format: "Formatting"
            }
        }
    });
    </script>

### messages.tab.chart `String`

Specifies the text of the chart tab.


<div class="meta-api-description">
Customize, configure, or set the label, title, or text for the chart tab within a chart wizard interface to control how the tab name appears, including changing default names, localizing tab captions, updating tab headers, editing display text for chart selection tabs, and managing the wording shown when users navigate to the chart section in a multi-tab wizard environment.
</div>

#### Example - set the "chart" tab ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                tab: {
                    chart: "Custom Tab"
                }   
            }
        });
    </script>

### messages.tab.data `String`

Specifies the text of the data tab.


<div class="meta-api-description">
Customize and localize the label or title of the data tab within the Chart Wizard interface, enabling setting, configuring, or modifying the tab name shown for data input or data selection. Control the displayed text for the data tab to match specific languages, localizations, or custom naming conventions in chart creation workflows, adjusting the user interface terminology related to the data section or data configuration tab.
</div>

#### Example - set the "data" tab ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                tab: {
                    data: "Custom Tab"
                }   
            }
        });
    </script>

### messages.tab.format `String`

Specifies the text of the format tab.


<div class="meta-api-description">
Customize or configure the text label, caption, or title displayed on the format tab within chart creation or editing interfaces such as ChartWizard, enabling control over the tab name, heading, or descriptor shown to users when formatting charts, graphs, or data visualizations.
</div>

#### Example - set the "format" tab ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                tab: {
                    format: "Custom Tab"
                }   
            }
        });
    </script>

### messages.chart `Object`

Specifies the text of the chart tab content.


<div class="meta-api-description">
Customize or localize the text label or title shown on the chart tab within ChartWizard by setting or configuring the displayed caption, name, or header for the chart section; control the tab’s visible wording, language, or display string to reflect different locales, translations, or user preferences for chart identification or navigation in the interface.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            chart: {
                bar: {
                    expandText: "Bar Charts"
                },
                column: {
                    expandText: "Column Charts"
                },
                line: {
                    expandText: "Line Charts"
                }
            }
        }
    });
    </script>

### messages.chart.bar `Object`

Specifies the text of the bar chart panel.


<div class="meta-api-description">
Set or customize the text label for bar charts within a chart configuration tool, control the display language or localization of bar chart titles and labels, configure bar chart panel messages, adjust bar chart captions or descriptions, enable setting or updating bar chart text elements, customize or translate bar chart labels for internationalization, modify bar chart headings, control bar chart text content, and manage bar chart label strings for different languages or contexts.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            chart: {
                bar: {
                    expandText: "Bar Chart Options",
                    description: "Create horizontal bar charts"
                }
            }
        }
    });
    </script>

### messages.chart.bar.expandText `String`

Specifies the title of the panel for bar chart.


<div class="meta-api-description">
Customize and localize the title or header text for the bar chart panel in chart configuration tools, enabling control over the display name, label, or caption that appears above bar chart visualizations. Adjust, set, or translate the panel’s expand or header text for internationalization, user interface clarity, or context-specific naming in dashboards, reports, or analytic tools using charts. Enable fine-tuning of bar chart panel titles for improved user experience, readable labels, and localized display strings in chart wizard interfaces.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    bar: {
                        expandText: "Open"
                    }
                }   
            }
        });
    </script>

### messages.chart.bar.bar `String`

Specifies the text for the bar chart type item.


<div class="meta-api-description">
Customize or configure the displayed text label, caption, or title used for bar chart elements, bars, or bar series in charting tools and visualization widgets. Control the localization, language translation, or custom wording for bar chart labels, including modifying default text, enabling internationalization, or setting descriptive names for the bar graph representation within data visualization interfaces or reporting dashboards. Adjust how bars are named or referred to in various UI contexts, such as tooltips, legends, or axis labels, to suit user preferences or application-specific terminology.
</div>

#### Example - set the "bar" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    bar: {
                        bar: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.chart.bar.stackedBar `String`

Specifies the text for the stacked bar chart type item.


<div class="meta-api-description">
Configure, customize, or set the label text, caption, or display name for stacked bar chart options, stacked bar graph labels, or multi-segment bar indicators within chart or graph wizards, enabling clear identification and localization of stacked bar elements, stack bar chart titles, or segmented bar descriptions in chart-building tools or data visualization components.
</div>

#### Example - set the "stacked" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    bar: {
                        stackedBar: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.chart.bar.hundredStackedBar `String`

Specifies the text for the 100% stacked bar chart type item.


<div class="meta-api-description">
Customize or configure the label text, caption, or title shown for hundred percent stacked bar chart elements, control the displayed names or tags for fully stacked bar chart segments, modify or set descriptive labels for charts representing data as 100% stacked bars, adjust the text identifiers or display strings for stacked bar graphs normalized to total percentages, and enable precise naming or labeling of each section within hundred stacked bar visualizations in chart configuration tools.
</div>

#### Example - set the "hundredStackedBar" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    bar: {
                        hundredStackedBar: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.chart.pie `Object`

Specifies the text of the pie chart panel.


<div class="meta-api-description">
Customize or localize the text label displayed on the pie chart panel, enabling control over the chart’s caption, title, or description in different languages or formats, set or change the pie chart’s heading, caption, or informational text, configure display text for pie sections, adjust labels for localized or custom presentations, and modify the wording shown on pie chart panels to match user preferences or multilingual requirements.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            chart: {
                pie: {
                    expandText: "Pie Chart Options",
                    description: "Create circular pie charts"
                }
            }
        }
    });
    </script>

### messages.chart.pie.expandText `String`

Specifies the title of the panel for pie chart.


<div class="meta-api-description">
Control and customize the title text displayed on the pie chart configuration panel, including setting or updating localized labels, captions, or headings that appear during chart expansion or editing, enabling clear, context-sensitive, and region-specific panel naming for pie chart interfaces within chart wizards or visualization tools.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    pie: {
                        expandText: "Open"
                    }
                }   
            }
        });
    </script>


### messages.chart.pie.pie `String`

Specifies the text for the pie chart type item.


<div class="meta-api-description">
Configure or customize the label text displayed on pie chart segments or slices, control how pie chart type names appear in chart interfaces, set or modify the textual representation of pie chart data fields or legends, enable tailored labeling for pie chart visualization elements, adjust or update the descriptive text associated with pie chart categories or sections, customize pie chart labels for clearer data presentation, control display names for pie chart slices, define or override default pie chart slice labels, manage pie chart legend text, and set user-friendly names for pie chart components.
</div>

#### Example - set the "pie" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    pie: {
                        pie: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.chart.column `Object`

Specifies the text of the column chart panel.


<div class="meta-api-description">
Customize or configure the text label, title, or description displayed on column chart panels by setting or localizing the column chart panel message, enabling control over the wording, language, or phrases shown for column charts in charting tools or chart wizards, including updating, modifying, translating, or overriding default labels and messages related to column chart visualization components.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            chart: {
                column: {
                    expandText: "Column Chart Options",
                    description: "Create vertical column charts"
                }
            }
        }
    });
    </script>

### messages.chart.column.expandText `String`

Specifies the title of the panel for column chart.


<div class="meta-api-description">
Configure, customize, or set the title text, label, or heading for expanding the column chart panel within a chart wizard interface, including changing, adjusting, or defining the expandable section's display name or message for column-type charts when users want to open, extend, or reveal additional chart details, ensuring flexible control over the expand/collapse text prompt or caption in a guided chart creation or configuration tool.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    column: {
                        expandText: "Open"
                    }
                }   
            }
        });
    </script>

### messages.chart.column.column `String`

Specifies the text for the column chart type item.


<div class="meta-api-description">
Customize and localize the label text displayed for column chart types within the chart wizard interface, enabling configuration of column chart titles, captions, or headings in multiple languages or customized text, including setting display names, user-facing labels, or localized strings for column-based charts in data visualization tools.
</div>

#### Example - set the "column" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    column: {
                        column: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.chart.column.stackedBar `String`

Specifies the text for the stacked column chart type item.


<div class="meta-api-description">
Customize, configure, and localize the label or display text for stacked column bar charts, stack bar graphs, and combined height columns in chart wizards, enabling setting or changing chart type names, adjusting language-specific captions, and controlling the text shown for stacked bar visuals in data visualization tools.
</div>

#### Example - set the "stacked" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    column: {
                        stackedBar: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.chart.column.hundredStackedBar `String`

Specifies the text for the 100% stacked column chart type item.


<div class="meta-api-description">
Configure, customize, or set the label text, display name, or localization string for the 100 percent stacked column chart type, also known as a fully stacked bar chart, to control how this chart variant is named or presented in chart wizards, interfaces, or visualizations. Enable changing or translating the descriptive label for charts that show data in columns stacked to total 100%, adjust the naming for multilingual support, and manage the exact wording or phrasing users see when selecting or referencing this specific chart style in reporting tools or dashboard builders.
</div>

#### Example - set the "hundredStackedBar" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    column: {
                        hundredStackedBar: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.chart.line `Object`

Specifies the text of the line chart panel.


<div class="meta-api-description">
Configure or customize the text labels, titles, captions, or annotations displayed on line chart panels within a chart wizard or chart-building tool. Control how line chart descriptions, headings, or messages appear in the user interface, including setting or modifying chart line panel text, captions, tooltips, or panel headers to enhance clarity, presentation, or localization in interactive visualizations and data dashboards. Adjust or set the wording used in line chart display areas to optimize user understanding, chart interpretation, or interface language preferences.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            chart: {
                line: {
                    expandText: "Line Chart Options",
                    description: "Create trend line charts"
                }
            }
        }
    });
    </script>

### messages.chart.line.expandText `String`

Specifies the title of the panel for line chart.


<div class="meta-api-description">
Customize or localize the title text for the line chart panel in the chart wizard interface by setting or configuring the expandable heading label, control the displayed panel header for line charts, modify the line chart section title, set the expand text string to tailor the line chart panel caption, change or define the user-visible heading to support different languages or preferences, adjust the label text that appears when expanding the line chart panel within the wizard workflow for clearer UI communication.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    line: {
                        expandText: "Open"
                    }
                }   
            }
        });
    </script>

### messages.chart.line.line `String`

Specifies the text for the line chart type item.


<div class="meta-api-description">
Configure or customize the display text, label, or caption for line chart options, set localized or translated names for line graph selections, adjust the naming or descriptions shown within chart creation tools or wizards specifically for line charts or line graph choices, define or change the terminology used in UI elements related to line chart types, and manage language-specific versions of line chart labels in visualization or chart-building interfaces.
</div>

#### Example - set the "line" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    line: {
                        line: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.chart.line.stackedBar `String`

Specifies the text for the stacked line chart type item.


<div class="meta-api-description">
Configure and customize the text label or display name for stacked line charts in charting tools, control localization or translation of chart labels related to stacked bar or line combinations, set or modify the naming conventions for stacked line or bar chart data visualizations, enable personalized or localized label messages for complex line chart types that use stacking, update chart legend or tooltip text specifically for stacked line and bar chart representations.
</div>

#### Example - set the "stacked" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    line: {
                        stackedBar: "Custom Bar"
                    }
                }   
            }
        });
    </script>

### messages.chart.line.hundredStackedBar `String`

Specifies the text for the 100% stacked line chart type item.


<div class="meta-api-description">
Configure and customize the label text or display name for the 100 percent stacked line chart style in interactive chart creation tools, allowing localization, translation, or renaming of the stacked line visualization option. Enable setting or changing the wording that appears for fully stacked line charts in chart wizards or data visualization interfaces, supporting internationalization and adaptable user interface text for the hundred percent stacked line chart feature. Adjust the descriptive label or caption associated with the 100% stacked line chart choice to fit various languages, user preferences, or custom chart templates within chart-building environments.
</div>

#### Example - set the "hundredStackedBar" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    line: {
                        hundredStackedBar: "Custom"
                    }
                }   
            }
        });
    </script>


### messages.chart.scatter `Object`

Specifies the text of the scatter chart panel.


<div class="meta-api-description">
Configure or customize the scatter chart panel label, adjust or set the display text for scatter plots, localize or translate scatter chart captions, control the naming or title of scatter panel elements, enable customization of scatter plot labels or headings, change the scatter chart text strings, define or modify the scatter panel's displayed message, tailor or personalize messages for scatter charts, update scatter graph labels for different languages, and manage how scatter chart text appears within the chart wizard interface.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            chart: {
                scatter: {
                    expandText: "Scatter Chart Options",
                    description: "Create scatter plot charts"
                }
            }
        }
    });
    </script>

### messages.chart.scatter.expandText `String`

Specifies the title of the panel for scatter chart.


<div class="meta-api-description">
Customize or localize the scatter plot panel header, configure the title text displayed on the scatter chart section, set or change the expand or collapse label for scatter diagram panels, control the visible heading for scatter visualizations in the chart wizard interface, update the panel title to different languages or styles, adjust the text shown when expanding the scatter chart area, tailor the scatter chart panel name for user interfaces, modify the display string for scatter plot expansions, and define or translate the scatter chart panel heading to match user preference or localization needs.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    scatter: {
                        expandText: "Open"
                    }
                }   
            }
        });
    </script>


### messages.chart.scatter.scatter `String`

Specifies the text for the scatter chart type item.


<div class="meta-api-description">
Customize, configure, or localize the label and display text for scatter chart types in chart wizards, enabling control over how scatter plots are named or described within chart creation interfaces, dashboards, or visualization tools. This setting affects the terminology, captions, or prompts shown when selecting or presenting scatter charts, supporting varied user language preferences and customizable UI text for scatterplot chart labels. Adjust or translate the scatter chart designation, scatter graph naming, or scatter diagram text to fit different locales or user interface branding needs.
</div>

#### Example - set the "scatter" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                chart: {
                    scatter: {
                        scatter: "Custom"
                    }
                }   
            }
        });
    </script>


### messages.data `Object`

Specifies the text of the data tab content.


<div class="meta-api-description">
Customize or translate the text content displayed in the data tab of the chart creation wizard, enabling localization and internationalization by configuring labels, messages, prompts, or instructions related to data input, data selection, and chart data handling within the wizard interface.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            data: {
                configuration: {
                    expandText: "Data Configuration Options"
                }
            }
        }
    });
    </script>

### messages.data.configuration `Object`

Specifies the text of the configuration panel.


<div class="meta-api-description">
Customize, modify, or configure the text labels, headings, prompts, or messages displayed within the data configuration or setup panel of a chart or graph wizard interface; control how instructions, titles, or descriptions appear when users are setting up, adjusting, or managing chart data sources or parameters; adjust display language, wording, or interface text related to data properties, options, or settings in the chart creation workflow to improve clarity, localization, or user guidance during chart data configuration steps.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            data: {
                configuration: {
                    expandText: "Configure Data Source",
                    description: "Set up data fields and series"
                }
            }
        }
    });
    </script>

### messages.data.configuration.expandText `String`

Specifies the title of the configuration panel


<div class="meta-api-description">
Configure, customize, or set the title text displayed on the data configuration panel or settings section within chart-building interfaces or visualization wizards. Control the label, heading, or expandable panel name that appears when adjusting data source options, chart parameters, or input configurations during chart creation or editing. Enable changing or localizing the text shown for expanding or managing data-related settings in interactive chart setup workflows.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                data: {
                    configuration: {
                        expandText: "Custom"
                    }
                }   
            }
        });
    </script>


### messages.data.configuration.series `Object`

Specifies the text for the series fields in the configuration panel


<div class="meta-api-description">
Customize or configure the text labels and messages related to data series fields within chart configuration interfaces, controlling how series information is displayed or described in setup panels, enabling localization, tailored user prompts, and adjusted terminology for data series configuration in chart builders, dashboards, or visualization tools.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            data: {
                configuration: {
                    series: {
                        title: "Chart Series Configuration",
                        addSeries: "Add New Series"
                    }
                }
            }
        }
    });
    </script>

### messages.data.configuration.series.title `String`

Specifies the text of the series legend of the configuration panel


<div class="meta-api-description">
Set or customize the text label for data series legends in chart configuration interfaces, control the naming or titling of chart series displayed in the legend, configure how series titles appear for clarity in chart legends, enable setting descriptive or custom names for each data series within chart setup tools, adjust legend text to match series content for better chart readability and user understanding, modify series labels for chart legend presentation, define or change series names shown alongside chart visuals, manage series identification text to improve legend accuracy and user interface clarity.
</div>

#### Example - set the "title" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                data: {
                    configuration: {
                        series: {
                            title: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.data.configuration.series.add `String`

Specifies the text of the Add button of series grid of configuration panel


<div class="meta-api-description">
Customize or localize the label text displayed on the Add button within the series configuration grid of a chart setup interface, control the button caption for adding new data series or entries, configure the wording for adding series items in chart data settings, set or modify the text shown on the button that triggers adding series during chart data configuration, enable multilingual or custom button labels for series additions in chart creation tools, change or provide specific labels for the add series action in chart data setup screens.
</div>

#### Example - set the "add" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                data: {
                    configuration: {
                        series: {
                            add: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.data.configuration.categoryAxis `String`

Specifies the text of the categoryAxis legend of the configuration panel


<div class="meta-api-description">
Configure and customize the label or text displayed on the category axis or X-axis legend within chart setup or visualization tools, enabling control over axis naming, axis titles, category axis captions, and legend texts. This covers scenarios where developers want to set, change, or localize the category axis name, modify axis descriptors, update category axis labels for charts, or control the visual text representation of the horizontal axis in chart configuration panels or data visualization settings. Adjusting the axis label supports clearer axis identification and enhances chart readability, relevant for dashboard building, report generation, or interactive charting environments.
</div>

#### Example - set the "categoryAxis" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                data: {
                    configuration: {
                        categoryAxis: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.data.configuration.valueAxis `String`

Specifies the text of the valueAxis legend of the configuration panel. Value Axis is present only with non-categorical type of chart.


<div class="meta-api-description">
Configure or customize the label text, title, or legend for the value axis or vertical axis in charts that use continuous or numerical data, excluding categorical or discrete axis types; control how the value axis is displayed in chart configuration panels, set or update the axis captions, descriptions, or annotations reflecting data range or scale for line charts, bar charts, scatter plots, and other non-categorical visualizations.
</div>

#### Example - set the "valueAxis" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                data: {
                    configuration: {
                        valueAxis: "Custom"
                    }
                }   
            },
            defaultState: {
                seriesType: 'pie'
            }
        });
    </script>

### messages.data.configuration.xAxis `String`

Specifies the text of the xAxis legend of the configuration panel. xAxis is present only with scatter type of chart.


<div class="meta-api-description">
Set or customize the horizontal axis label, title, or legend text in scatter plot charts, configure or modify the x-axis description, control the naming or caption shown beneath the bottom axis, update or define the label for the x dimension in scatter diagrams or charts, adjust the text displayed on the horizontal coordinate axis, tailor axis legends or annotations for better chart readability, enable or change the x-axis legend in scatter chart settings, specify the text that appears along the x-axis for data representation in scatter plots.
</div>

#### Example - set the "xAxis" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                data: {
                    configuration: {
                        xAxis: "Custom"
                    }
                }   
            },
            defaultState: {
                seriesType: 'scatter'
            }
        });
    </script>

### messages.format `Object`

Specifies the text of the format tab content.


<div class="meta-api-description">
Customize or localize the displayed text within the format section of the chart wizard interface, enabling adjustment of the format tab labels, messages, prompts, and content presentation to match different languages, regional settings, or user preferences. Configure and control the wording, translations, and interface text for the formatting options in chart setup dialogs, ensuring tailored display and improved user understanding across diverse localization and internationalization scenarios.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            format: {
                chartArea: {
                    expandText: "Chart Area Settings"
                },
                title: {
                    expandText: "Title Settings"
                }
            }
        }
    });
    </script>

### messages.format.chartArea `Object`

Specifies the text of the chartArea panel.


<div class="meta-api-description">
Customize and localize the text labels or messages shown within the chart editing area, enabling control over the wording, translations, and display of panel information related to the chart layout or background settings. Adjust or set descriptive text, captions, or interface prompts for the chart area panel to tailor language, support internationalization, or modify user-facing labels during chart configuration or design stages.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            format: {
                chartArea: {
                    expandText: "Chart Area Configuration",
                    background: "Background Settings",
                    margins: "Margin Settings"
                }
            }
        }
    });
    </script>

### messages.format.chartArea.expandText `String`

Specifies the title of the chartArea panel


<div class="meta-api-description">
Customize, localize, or configure the header text for the chart area panel to control how the chart area title appears, including setting or changing the expand button label, adjusting the panel title for different languages, modifying the text displayed when expanding the chart area, and tailoring the user interface prompt that guides expanding or collapsing the chart section within ChartWizard or similar chart configuration tools.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    chartArea: {
                        expandText: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.chartArea.margins `Object`

Specifies the text for the margins area of the chartArea panel


<div class="meta-api-description">
Customize and localize the label text for the margins settings in the chart area configuration panel, enabling you to set or translate the margin descriptions shown in chart setup interfaces, adjust or override default margin labels for global or regional applications, control the wording for margin controls in the chart design wizard, and configure user-facing margin panel text to support different languages, phrasing, or terminology preferences related to chart area spacing and boundary settings.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            format: {
                chartArea: {
                    margins: {
                        default: "Default Margins",
                        custom: "Custom Margins"
                    }
                }
            }
        }
    });
    </script>

### messages.format.chartArea.margins.default `String`

Specifies the text for the margins legend of the chartArea panel


<div class="meta-api-description">
Configure or customize the default text labels and descriptions for margins within a chart’s layout settings, including adjusting, setting, or controlling the legend or label that appears in the chart area margin controls, managing how margin information is displayed in chart configuration panels, specifying the wording for margin-related UI elements, or personalizing default margin annotations in chart design tools.
</div>

#### Example - set the "default" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    chartArea: {
                        margins: {
                            default: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.chartArea.margins.left `String`

Specifies the text for the margin left label of the chartArea panel


<div class="meta-api-description">
Configure the left margin label text for the chart area panel, adjust or customize the text that appears indicating the left spacing or padding inside chart layouts, set descriptive or localized margin labels specifically for the left boundary of chart display areas, control the wording or message shown relating to the left margin dimension in chart formatting interfaces, and define or override the default left margin label to clarify spacing settings on the chart’s left side.
</div>

#### Example - set the "left" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    chartArea: {
                        margins: {
                            left: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.chartArea.margins.right `String`

Specifies the text for the margin right label of the chartArea panel


<div class="meta-api-description">
Customize, translate, or localize the text label for the right margin setting within the chart area configuration panel, enabling you to control the display wording for margin adjustments on the right side of a chart layout, configure label localization, set or override default margin text, and adapt UI text for different languages or contexts related to right margin spacing in visual data presentations.
</div>

#### Example - set the "right" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    chartArea: {
                        margins: {
                            right: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.chartArea.margins.top `String`

Specifies the text for the margin top label of the chartArea panel


<div class="meta-api-description">
Configure, customize, or adjust the label text or caption displayed for the top margin of the chart area within chart layout settings, including modifying or setting margin labels, controlling text for chart area boundary spacing at the top edge, and managing how the top margin is represented or described in the chart formatting or wizard interface.
</div>

#### Example - set the "top" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    chartArea: {
                        margins: {
                            top: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.chartArea.margins.bottom `String`

Specifies the text for the margin bottom label of the chartArea panel


<div class="meta-api-description">
Configure or customize the bottom margin label text within chart area panels for chart visualizations, supporting localization, translation, and adjustment of text in chart interfaces, control over margin descriptions in chart layout messages, setting or modifying bottom spacing labels, adapting label content for different languages or user preferences in chart tools, and enabling precise control of margin-related annotations in chart configuration dialogs.
</div>

#### Example - set the "top" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    chartArea: {
                        margins: {
                            bottom: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.chartArea.background `Object`

Specifies the text for the background area of the chartArea panel


<div class="meta-api-description">
Customize, set, or configure the label text for the background settings within a chart area panel, enabling control over how background formatting options are described or presented in chart customization interfaces; adjust or localize the descriptor text for background area controls inside chart wizards, tailoring interface language to specific needs or preferences, including changing or translating label prompts related to chart background styling in user interface panels.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            format: {
                chartArea: {
                    background: {
                        default: "Default Background",
                        color: "Background Color"
                    }
                }
            }
        }
    });
    </script>

### messages.format.chartArea.background.default `String`

Specifies the text for the background legend of the chartArea panel


<div class="meta-api-description">
Customize, localize, and set the default text label, caption, or legend for the chart area background in wizard-driven chart tools, enabling control over the displayed background description, default background text, background legend wording, or localized background message within chart generation interfaces or chart configuration flows.
</div>

#### Example - set the "default" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    chartArea: {
                        background: {
                            default: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.chartArea.background.color `String`

Specifies the text of the label for the color editor of the chartArea panel


<div class="meta-api-description">
Configure, customize, or localize the label text for the background color picker or editor within the chart's chart area settings, enabling control over how users see and interact with the color selection interface for the chart area background; supports adjusting text display, translation of interface labels, setting messages related to chart background color editing, and modifying UI prompts or tooltips related to color configuration within chart formatting wizards or dialogs.
</div>

#### Example - set the "color" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    chartArea: {
                        background: {
                            color: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.title `Object`

Specifies the text of the title panel.


<div class="meta-api-description">
Configure or set the title text shown in the chart formatting panel, customize the heading label or caption that appears in the format section of the chart wizard interface, control the display text for the format panel header, adjust the title wording used in chart customization dialogs, and enable personalized or localized titles for the chart format screen.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            format: {
                title: {
                    expandText: "Title Configuration",
                    color: "Title Color",
                    font: "Title Font"
                }
            }
        }
    });
    </script>

### messages.format.title.expandText `String`

Specifies the title of the title panel


<div class="meta-api-description">
Control and customize the title text displayed in the chart wizard’s header or title panel by setting or localizing the expansion label, configure the text shown when expanding sections, enable adjustments for display wording, set captions or titles for expanded views, customize the header text for user interface panels, and manage localization or translation of the title wording in the chart wizard’s interactive components.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    title: {
                        expandText: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.title.applyTo `String`

Specifies the text of the applyTo label of the title panel


<div class="meta-api-description">
Customize, configure, or set the label text for the title panel's "Apply to" option in chart wizard interfaces, enabling localization, translation, or modification of the title area wording to match different languages, UI contexts, or user preferences, ensuring the title's apply-to label is clear, adaptable, and properly displayed according to regional or project-specific terminology in data visualization tools or chart configuration dialogs.
</div>

#### Example - set the "applyTo" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    title: {
                        applyTo: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.title.chartTitle `String`

Specifies the text of the applyTo DropDownList item which represents the chart title


<div class="meta-api-description">
Configure the display text or label that appears in dropdown menus or selection lists for chart titles, customize or set the name shown in user interfaces for choosing the chart title, control the wording or message associated with the chart title option in chart configuration panels, modify the text representing chart titles in chart setup dropdowns, and adjust the user-facing string that identifies the chart title selection in chart builders or wizards.
</div>

#### Example - set the "chartTitle" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    title: {
                        chartTitle: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.title.chartSubtitle `String`

Specifies the text of the applyTo DropDownList item which represents the chart subtitle


<div class="meta-api-description">
Configure or customize the label text for the chart subtitle selection option within a dropdown menu, enabling control over the display name linked to the chart subtitle feature in interactive chart creation tools. Users may want to rename, adjust, or localize the subtitle label text shown in filter or apply-to dropdown lists for better clarity, matching UI language, or specific application contexts during chart configuration and customization workflows. This setting supports modifying the subtitle dropdown item text for improved user guidance, interface clarity, or multilingual support in visual data representation controls.
</div>

#### Example - set the "chartSubtitle" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    title: {
                        chartSubtitle: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.title.label `String`

Specifies the text of the label of textbox of the title panel


<div class="meta-api-description">
Customize and localize the label text displayed in the chart title input field or title panel textbox, enabling you to configure, change, translate, rename, or set the prompt or placeholder text for the chart title area in user interfaces, dashboards, or chart editors, supporting multi-language setups, UI string adjustments, and title input field labeling for better clarity and user guidance across different languages and contexts.
</div>

#### Example - set the "label" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    title: {
                        label: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.title.font `String`

Specifies the text of the font label of the title panel


<div class="meta-api-description">
Customize and localize the text label that defines the font settings for the chart title, enabling control over the appearance and styling of title fonts in chart configurations, including changing font families, sizes, styles, or language-specific labels for display customization, formatting the chart header typography, setting or modifying the font descriptor for the title panel, and adapting the title font label for different locales or user preferences in chart interfaces.
</div>

#### Example - set the "font" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    title: {
                        font: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.title.fontPlaceholder `String`

Specifies the text of the placeholder for the font editor of the title panel


<div class="meta-api-description">
Set or customize the placeholder text shown in the font editor input for the chart title, enabling control over the default hint or sample text displayed when selecting or configuring the chart's title font style, typeface, size, color, or formatting. This covers scenarios where you want to adjust the example text or prompt inside the font configuration area of the chart title panel to guide users or indicate expected input, supporting various ways developers might refer to configuring, labeling, or setting placeholder hints for the font selector in chart title customization interfaces.
</div>

#### Example - set the "fontPlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    title: {
                        fontPlaceholder: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.title.size `String`

Specifies the text of the size label of the title panel


<div class="meta-api-description">
Control and customize the size label text displayed in the title panel of a chart or wizard interface by configuring the format settings for title size, adjusting how size information appears in charts, graphs, or visual data presentations, enabling developers to set, modify, or translate the title’s size descriptor text to match UI requirements or localization needs, and tailor the display of size-related labels within chart titles for enhanced clarity and user interaction in data visualization components.
</div>

#### Example - set the "size" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    title: {
                        size: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.title.sizePlaceholder `String`

Specifies the text of the placeholder for the size editor of the title panel


<div class="meta-api-description">
Set or customize the placeholder text displayed in the size input field of a chart title editor to support different languages, localization needs, user interface customization, configurable size prompts, editable title size hints, dynamic placeholder configuration, localization of UI elements for chart sizing, adaptable text for size input boxes, and user-friendly instructions for entering chart title dimensions.
</div>

#### Example - set the "sizePlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    title: {
                        sizePlaceholder: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.title.color `String`

Specifies the text of the label for the color editor of the title panel


<div class="meta-api-description">
Customize and localize the label text for the color selector in the chart title panel, enabling translation, editing, and configuration of the color editor’s prompt or caption to match different languages, regional settings, or user interface text preferences related to chart title color formatting and display.
</div>

#### Example - set the "color" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    title: {
                        color: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.series `Object`

Specifies the text of the series panel.


<div class="meta-api-description">
Customize or configure the label text displayed in the series panel of chart creation tools, control the naming or formatting of series labels shown within interactive chart wizards or setups, set or modify the descriptive text that identifies data series in chart configuration interfaces, adjust the series panel heading or caption to tailor the display for clarity or localization, enable personalized naming for data groups or categories in chart builder panels.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        messages: {
            format: {
                series: {
                    expandText: "Series Configuration",
                    color: "Series Color",
                    labels: "Series Labels"
                }
            }
        }
    });
    </script>

### messages.format.series.expandText `String`

Specifies the title of the series panel


<div class="meta-api-description">
Customize or configure the heading, label, or title text displayed on the series panel or series section within ChartWizard, enabling control over how the series expand or collapse prompt appears. Adjust the descriptive text that guides users when interacting with data series, series lists, or chart segments, helping improve the clarity or localization of the series panel expansion message. Ideal for setting or overriding the default text for the expand or toggle indicator associated with series formatting or data grouping areas in chart configuration interfaces.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    series: {
                        expandText: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.series.applyTo `String`

Specifies the text of the applyTo label of the series panel


<div class="meta-api-description">
Configure or customize the label text related to applying formats or settings to series elements within a chart wizard interface, enabling localization and internationalization by setting or overriding the default "apply to" wording. This setting controls how the user-facing text identifies the scope of format changes for chart data series, supporting scenarios where developers want to localize, change, or personalize the label that guides applying styles, adjustments, or configurations specifically to series components in chart creation or editing panels. Adjusting this text facilitates translated UI labels, custom prompts, and context-specific instructions relevant to applying formatting options to different chart series or subsets, enhancing multi-language support and dynamic interface customization for chart series management.
</div>

#### Example - set the "applyTo" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    series: {
                        applyTo: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.series.allSeries `String`

Specifies the text of the series DropDownList item which represents allSeries


<div class="meta-api-description">
Configure the text label, caption, or display name for the dropdown option representing all data series in a chart wizard interface, enabling customization and localization of the choice that selects every series simultaneously. Control how the "all series" option appears in chart configuration menus, setting or changing the default wording or translation for users needing to apply actions, filters, or formats across all series combined, and tailor multi-series selection prompts in chart setup workflows. Adjust or localize the label for comprehensive series selection in charts to enhance clarity, usability, and internationalization of chart-building user interfaces.
</div>

#### Example - set the "allSeries" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    series: {
                        allSeries: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.series.color `String`

Specifies the text of the label for the color editor of the series panel


<div class="meta-api-description">
Customize and localize the label text for the color selection interface in the chart series formatting panel, enabling developers to modify, set, or translate the caption shown when choosing series colors in data visualizations, chart libraries, or GUI chart editors. This configuration controls the displayed message or tooltip describing the series color picker, supporting internationalization, user interface customization, and adaptable text for color editor labels within charting components.
</div>

#### Example - set the "color" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    title: {
                        color: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.series.showLabels `String`

Specifies the text of the checkbox label of the series panel


<div class="meta-api-description">
Configure or customize the text labels for checkboxes that control the visibility of data series in chart settings, enabling users to change, localize, or personalize series toggle labels in chart configuration panels, series management dialogs, or visualization controls. Adjust the display names or captions associated with series show/hide options in chart interface elements, supporting flexible labeling, internationalization, and user-specific naming of series visibility toggles in data visualization tools.
</div>

#### Example - set the "showLabels" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    series: {
                        showLabels: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.legend `Object`

Specifies the text of the legend panel.


<div class="meta-api-description">
Customize, configure, or override chart legend text to support localization, translate labels, modify legend descriptions, adapt text for different languages, set legend panel messages, control display wording, and tailor chart legend content for internationalization or personalized messaging across various user interfaces and language settings.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                legend: {
                    expandText: "Expand Legend",
                    collapseText: "Collapse Legend"
                }
            }
        }
    });
    </script>

### messages.format.legend.expandText `String`

Specifies the title of the legend panel


<div class="meta-api-description">
Configure or customize the legend panel title text to change, localize, translate, or set the header label, caption, or name for the chart legend area, enabling control over how the expand or collapse text appears in chart interfaces, dashboards, or visualization controls for clearer labeling and user-friendly display of legend information.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        expandText: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.legend.showLegend `String`

Specifies the text of the label for the switch of the legend panel


<div class="meta-api-description">
Control and customize the text label that toggles the visibility of the chart legend, including setting, changing, or localizing the display string for showing or hiding the legend panel in chart configuration interfaces, enabling developers to define the exact wording or phrase presented to users for the legend visibility toggle in various charting or data visualization contexts.
</div>

#### Example - set the "showLegend" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        showLegend: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.legend.font `String`

Specifies the text of the label for the font editor of the legend panel


<div class="meta-api-description">
Customize and control the font style, size, weight, and appearance of the text labels within the chart legend panel, adjusting how legend entries are displayed visually. Enable precise configuration of legend text typography, including font family, formatting, and styling options, to ensure clarity and consistency in chart annotations. Modify, style, or update the legend’s font settings dynamically for enhanced readability and design alignment in data visualization environments where legend label presentation impacts user interpretation. Set and fine-tune font attributes related to chart legends to meet specific UI design requirements or branding guidelines for interactive or static chart displays.
</div>

#### Example - set the "font" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        font: "Custom"
                    }
                }   
            }
        });
    </script>


### messages.format.legend.fontPlaceholder `String`

Specifies the text of the placeholder for the font editor of the legend panel


<div class="meta-api-description">
Configure or customize the default placeholder text or sample text that appears in the font editor of the chart legend panel, enabling control over what hint or example users see when selecting or setting font styles for legends, captions, or labels in charts or graphs. This setting affects how font input fields display temporary guidance text, supporting customization of font selection UX in charting interfaces. Adjust placeholder prompts to improve clarity when editing legend fonts, including changing prompt text for font family, size, style, or appearance within chart legend settings.
</div>

#### Example - set the "fontPlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        fontPlaceholder: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.legend.size `String`

Specifies the text of the label for the size editor of the legend panel


<div class="meta-api-description">
Customize, configure, or localize the label text that appears for the legend size editor in chart interfaces, enabling control over the textual prompt users see when adjusting the size of chart legends, supporting multiple languages, translations, or label customization for improved user experience and accessibility in chart legend resizing controls.
</div>

#### Example - set the "size" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        size: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.legend.sizePlaceholder `String`

Specifies the text of the placeholder for the size editor of the legend panel


<div class="meta-api-description">
Set, customize, or configure the placeholder text that appears in the legend size input field or editor within the chart configuration wizard, enabling control over default hints, prompts, or placeholder labels shown when adjusting legend size; useful for tailoring UI text, guiding users on legend dimension input, or localizing the placeholder message for legend size editing interfaces.
</div>

#### Example - set the "sizePlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        sizePlaceholder: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.legend.color `String`

Specifies the text of the label for the color editor of the legend panel


<div class="meta-api-description">
Customize, localize, or configure the text label for the color selector or color picker in chart legend formatting, enabling adjustment of legend color editor prompts, captions, or messages for internationalization, UI customization, or user interface language changes related to chart legend color settings and formatting options.
</div>

#### Example - set the "color" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        color: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.legend.position `Object`

Specifies the text for the position DropDownList of the legend panel


<div class="meta-api-description">
Customize or set the label text for the legend position dropdown in chart configuration interfaces, enabling localization, translation, or adjustment of the legend placement options display. Control how legend position choices appear in UI elements, modify or specify the wording for legend placement selectors, and configure the text shown for chart legend location selectors in different languages or custom phrasing. Optimize user interface labels related to selecting or positioning chart legends, including internationalization and user-defined label overrides for legend placement options.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                legend: {
                    position: {
                        default: "Position",
                        top: "Top",
                        bottom: "Bottom",
                        left: "Left",
                        right: "Right"
                    }
                }
            }
        }
    });
    </script>

### messages.format.legend.position.default `String`

Specifies the text of label for the position editor of the legend panel


<div class="meta-api-description">
Set or customize the default label text for the legend position selector, configure how the legend placement options are displayed, control the naming or text shown in legend position settings, adjust or localize the legend position description, define the default wording for legend layout choices, manage the text that appears in legend alignment controls, edit or translate the default legend position label seen in chart configuration interfaces, specify the baseline text for legend placement options, and tailor the legend position indicator text for user interfaces or chart editing tools.
</div>

#### Example - set the "default" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        position: {
                            default: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.legend.position.top `String`

Specifies the text of position dropdownlist item which represent the top position


<div class="meta-api-description">
Adjust or configure the text label, caption, or display name shown for the chart legend position option placed at the top, including localization, translation, or custom naming for the "top" position in dropdown menus or user interface elements controlling legend placement. This involves setting or customizing how the "Top" choice appears in legend position selectors, legend placement controls, or chart UI components that let users select and identify the legend's position above the chart, enabling tailored or localized naming conventions and user-friendly legend position descriptors.
</div>

#### Example - set the "top" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        position: {
                            top: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.legend.position.bottom `String`

Specifies the text of position dropdownlist item which represent the bottom position


<div class="meta-api-description">
Customize or configure the text label, caption, or display name for the option that positions the chart legend at the bottom, enabling localization, translation, or adjustment of the dropdown menu item text for placing legends beneath the chart area. This supports controlling, setting, or customizing the legend placement descriptor shown to users for bottom alignment in chart formatting interfaces, accommodating varied languages, UI preferences, or localization needs for legend position selection.
</div>

#### Example - set the "bottom" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        position: {
                            bottom: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.legend.position.left `String`

Specifies the text of position dropdownlist item which represent the left position


<div class="meta-api-description">
Customize the label or text displayed in dropdown menus or UI elements for selecting the left position of chart legends, enabling configuration or localization of legend placement options, modifying how the left legend position appears in chart formatting dropdowns, controlling the naming or wording shown when setting legend alignment to the left side in chart tools, and adjusting interface text for left-positioned legends in chart customization panels.
</div>

#### Example - set the "left" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        position: {
                            left: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.legend.position.right `String`

Specifies the text of position dropdownlist item which represent the right position


<div class="meta-api-description">
Control and customize the label or text displayed for the option placing the chart legend on the right side within a chart creation or configuration tool, including setting or modifying the legend's right positioning descriptor, adjusting dropdown menu entries related to legend alignment on the right, defining how the right legend position is represented in the user interface, and tailoring the legend alignment options to clearly indicate or rename the right-side placement in chart legends.
</div>

#### Example - set the "right" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    legend: {
                        position: {
                            right: "Custom"
                        }
                    }
                }   
            }
        });
    </script>


### messages.format.categoryAxis `Object`

Specifies the text of the categoryAxis panel. The categoryAxis panel is visible only for categorical chart types.


<div class="meta-api-description">
Control and customize the text labels, titles, or messages displayed on the category axis panel for categorical charts, enabling configuration of axis descriptors, category names, and axis-related formatting in chart wizards, with options to set or override default axis texts, manage axis label appearance, and tailor category axis information for bar charts, column charts, or other categorical data visualizations.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                categoryAxis: {
                    expandText: "Category Axis",
                    collapseText: "Collapse Category Axis"
                }
            }
        }
    });
    </script>

### messages.format.categoryAxis.expandText `String`

Specifies the title of the categoryAxis panel


<div class="meta-api-description">
Customize, set, or configure the label, title, or heading text of the category axis panel in chart setup or wizard interfaces, including how the text appears when expanded or detailed, with options to localize or translate this axis descriptor for different languages or regional settings, control the display wording for category axis headers in chart creation tools, enable adjustment of the category axis panel’s descriptive text or tooltip during chart configuration workflows, and manage the phrasing used to represent the category axis area in UI helpers or guided chart-building steps.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        expandText: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.title `Object`

Specifies the text for the title area of the categoryAxis panel


<div class="meta-api-description">
Set or customize the label text, heading, or title displayed on the category axis or x-axis of a chart, controlling how category names or data groupings appear visually. Enable localization, change default axis titles, configure axis header text, define custom names for category axes, adjust labels for data grouping on charts, and control the displayed text shown above or beside category axes in chart tools or wizards. This supports multiple languages, personalization of axis titles, and tailoring axis identifiers in chart configurations or formatting settings.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                categoryAxis: {
                    title: {
                        text: "Title Text",
                        color: "Title Color",
                        font: "Title Font"
                    }
                }
            }
        }
    });
    </script>

### messages.format.categoryAxis.title.text `String`

Specifies the text for the title legend of the categoryAxis panel


<div class="meta-api-description">
Customize, set, or configure the displayed title text, label, or heading for the category axis in chart building or data visualization tools, including localization or translation of axis titles, adjusting the category axis header text string, modifying axis captions or annotations, controlling the text shown on the x-axis category labels, and enabling dynamic or static naming of the category axis title for better clarity, user interface clarity, or multi-language support in chart configurations.
</div>

#### Example - set the "text" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        title: {
                            text: "Custom"
                        }
                    }
                }   
            }
        });
    </script>


### messages.format.categoryAxis.title.placeholder `String`

Specifies the text for the placeholder of the textbox editor of the categoryAxis panel


<div class="meta-api-description">
Customize, define, or specify the default placeholder text or input hint displayed in the category axis label field within a chart configuration tool or wizard. Control, set, or update the prompt shown in the category axis text box to guide users entering axis titles, enabling clear axis labeling guidance, default input placeholders, or user interface hints for chart category axis naming. Adjust or override the example text appearing in the axis title input for better user experience, clarity, and input contextual help related to category axis labeling in chart builders or visualization tools.
</div>

#### Example - set the "placeholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        title: {
                            placeholder: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.title.font `String`

Specifies the text for the label of font editor for the title of the categoryAxis panel


<div class="meta-api-description">
Customize or configure the font styling, typography, and appearance of the category axis title text in chart editors or visualization tools, including setting font type, size, weight, style, and color for axis labels on category axes, enabling control over the look and feel of the axis header text in charts or graphs, adjusting text formatting for category axis titles to improve readability or match design requirements, and modifying label fonts on horizontal or vertical category axes in chart wizard interfaces.
</div>

#### Example - set the "font" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        title: {
                            font: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.title.fontPlaceholder `String`

Specifies the text for the placeholder of font editor for the title of the categoryAxis panel


<div class="meta-api-description">
Set or customize the localized placeholder text that appears in the font editor for the category axis title, enabling control over the display text hints, labels, or prompts related to font configuration, style selection, and typography settings for the category axis title area in chart customization and formatting interfaces.
</div>

#### Example - set the "fontPlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        title: {
                            fontPlaceholder: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.title.size `String`

Specifies the text for the label of size editor for the title of the categoryAxis panel


<div class="meta-api-description">
Adjust or configure the text size, font scaling, or label dimensions of the category axis title in chart formatting tools, enabling control over how large or small the axis title appears on the chart display. This setting is useful for customizing the appearance of axis labels, modifying the title font size for readability or style preferences, and fine-tuning visual hierarchy in chart design interfaces where users seek to set or change the size of category axis titles. Whether you want to enlarge, shrink, or standardize the category axis title text, this control supports flexible sizing adjustments in chart customization environments.
</div>

#### Example - set the "size" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        title: {
                            size: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.title.sizePlaceholder `String`

Specifies the text for the placeholder of size editor for the title of the categoryAxis panel


<div class="meta-api-description">
Customize the placeholder text shown in the input field for adjusting the size of the category axis title in chart configuration tools, enabling setting, modifying, or controlling the default prompt or hint text that appears when specifying font size or dimensions for the axis label in chart wizards or editors. This supports developers looking to localize, configure, or personalize the user interface for category axis title size inputs in data visualization customization workflows or chart formatting scenarios.
</div>

#### Example - set the "sizePlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        title: {
                            sizePlaceholder: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.title.color `String`

Specifies the text for the label of color editor for the title of the categoryAxis panel


<div class="meta-api-description">
Set or customize the text label for the color picker or color editor related to the category axis title in chart configuration messages. Enable developers to localize, rename, or adjust descriptive text for color selection interfaces connected to axis title styling, including prompts, UI labels, or tooltips for the horizontal or categorical axis title's color settings. Control or modify labels presented in chart wizards or design tools that guide users when changing the color of the category axis title, supporting customization, internationalization, and user interface clarity for color customization steps involving the categoryAxis title.
</div>

#### Example - set the "color" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        title: {
                            color: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.labels `Object`

Specifies the text for the labels area of the categoryAxis panel


<div class="meta-api-description">
Customize, translate, or localize the text displayed on the category axis labels of charts, enabling control over label formatting, language settings, and display options for category axis text in chart visualizations. Configure how category axis labels appear, including altering default wording, adjusting localization for different languages or regions, and setting custom messages or text for the axis label area to suit internationalization and user interface preferences.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                categoryAxis: {
                    labels: {
                        text: "Labels Text",
                        color: "Labels Color",
                        font: "Labels Font",
                        rotation: "Labels Rotation"
                    }
                }
            }
        }
    });
    </script>

### messages.format.categoryAxis.labels.text `String`

Specifies the text for the labels legend of the categoryAxis panel


<div class="meta-api-description">
Customize or localize the text displayed on category axis labels by configuring, setting, or controlling the label legend content for charts, enabling modification of axis label strings, captions, or titles on the category axis panel to reflect different languages, formats, or terminology for user interfaces or data visualization presentations.
</div>

#### Example - set the "text" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        labels: {
                            text: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.labels.font `String`

Specifies the text for the label of font editor for the labels of the categoryAxis panel


<div class="meta-api-description">
Control, configure, and customize the font style, size, weight, color, and appearance of category axis labels in charts, enabling developers to modify label typography on categoryAxis, set label text formatting, adjust font properties for axis labels, define text styling for chart categories, and tailor how category axis label fonts are rendered to improve readability and visual consistency in chart presentations.
</div>

#### Example - set the "font" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        labels: {
                            font: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.labels.fontPlaceholder `String`

Specifies the text for the placeholder of font editor for the labels of the categoryAxis panel


<div class="meta-api-description">
Configure or customize the placeholder text displayed in the font editor for category axis labels within a chart wizard interface, enabling control over the default or suggested font input prompt when adjusting label styles on the category axis. This setting helps users identify, modify, or reset font attributes for axis labels, supporting tasks like setting font style, adjusting typography options, editing label appearance, and improving user guidance around font selections in chart axis customization. It is useful for scenarios involving dynamic font editing prompts, user interface hints in font pickers, and enhancing clarity in font configuration workflows for chart categories.
</div>

#### Example - set the "fontPlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        labels: {
                            fontPlaceholder: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.labels.size `String`

Specifies the text for the label of size editor for the labels of the categoryAxis panel


<div class="meta-api-description">
Set, customize, or control the text label for the size input field related to category axis labels in chart configuration interfaces, enabling adjustment of the category axis label size setting, modifying or localizing the size editor prompt within chart customization wizards, and managing how size options for category axis labels are presented or named in user interface messages and localization files.
</div>

#### Example - set the "size" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        labels: {
                            size: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.labels.sizePlaceholder `String`

Specifies the text for the placeholder of size editor for the labels of the categoryAxis panel


<div class="meta-api-description">
Configure placeholder text or default hint for the input field controlling the font size or dimensions of category axis labels in chart setup tools, enabling users to customize the sizing interface prompt, adjust label size inputs, set default text in size editors for category axis labels, control placeholder display when specifying label dimensions, and enhance the user experience in chart label size configuration options.
</div>

#### Example - set the "sizePlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        labels: {
                            sizePlaceholder: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.labels.color `String`

Specifies the text for the label of color editor for the labels of the categoryAxis panel


<div class="meta-api-description">
Customize or localize the display text for color selectors controlling the category axis labels in chart configuration interfaces, enabling setting, changing, or translating the label color picker prompt or descriptor for category axis text styling in charting tools or visualization wizards.
</div>

#### Example - set the "color" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        labels: {
                            color: "Custom"
                        }
                    }
                }   
            }
        });
    </script>


### messages.format.categoryAxis.labels.rotation `Object`

Specifies the text for the rotation area for the labels of the categoryAxis panel


<div class="meta-api-description">
Adjust the angle, orientation, or rotation settings of category axis label text in charts, enabling customization of label display for better readability and alignment in different languages or localized contexts; control how category labels tilt, spin, or slant on the axis to enhance visual clarity, manage text direction or rotation degree, and optimize label presentation for internationalization and data visualization needs.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                categoryAxis: {
                    labels: {
                        rotation: {
                            text: "Rotation",
                            auto: "Auto"
                        }
                    }
                }
            }
        }
    });
    </script>

### messages.format.categoryAxis.labels.rotation.text `String`

Specifies the text for the label of the rotation editor for the labels of the categoryAxis panel


<div class="meta-api-description">
Set or customize the rotation angle text for category axis labels in chart configuration, control label rotation display, adjust the label orientation text shown in the chart wizard, define or modify the rotation description of category axis labels, enable precise label rotation text settings, configure how axis labels indicate rotation, specify rotation text for category axis labels, manage label rotation annotations, and tailor the text that represents the label rotation on the category axis in chart design interfaces.
</div>

#### Example - set the "color" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        labels: {
                            rotation: {
                                text: "Custom"
                            }
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.categoryAxis.labels.rotation.auto `String`

Specifies the text for the placeholder of the rotation editor for the labels of the categoryAxis panel


<div class="meta-api-description">
Configure automatic label rotation for category axis in charts by enabling or setting the rotation mode to auto, allowing dynamic adjustment of axis label angles to improve readability in different languages and localized contexts. Control or customize category axis label orientation automatically for optimal display, enhance visualization by enabling auto rotation of axis labels, set adaptive rotation behavior for category axis text, and manage dynamic label rotation settings during chart localization or internationalization.
</div>

#### Example - set the "auto" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        labels: {
                            rotation: {
                                auto: "Custom"
                            }    
                        }
                    }   
                }
            }
        });
    </script>

### messages.format.categoryAxis.labels.reverseOrder `String`

Specifies the text for the checkbox label of the categoryAxis panel


<div class="meta-api-description">
Control and configure the ordering and display of category axis labels or category axis panel checkbox labels in chart wizards, enabling reversal or flipping of label order, toggling label sequence, customizing axis label arrangement, adjusting axis label sorting, setting labels to appear in descending or ascending order, enabling reversed category label display on charts, managing axis category label positions, and defining how category labels appear visually on charts or category axes through options that modify label order and orientation.
</div>

#### Example - set the "reverseOrder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    categoryAxis: {
                        reverseOrder: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis `Object`

Specifies the text of the valueAxis panel. The valueAxis panel is visible only for categorical chart types.


<div class="meta-api-description">
Customize or configure the text label, title, or heading of the value axis or Y-axis panel in chart wizard tools specifically for categorical charts, enabling control over how numerical scale descriptions, value indicators, or axis text are displayed, formatted, or presented in charts with categories rather than continuous data, including options to modify, set, or update axis captions and labels for better clarity and user understanding.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                valueAxis: {
                    expandText: "Value Axis",
                    collapseText: "Collapse Value Axis"
                }
            }
        }
    });
    </script>

### messages.format.valueAxis.expandText `String`

Specifies the title of the valueAxis panel


<div class="meta-api-description">
Customize or localize the title text shown on the vertical axis panel of a chart or graph, enabling control over how the value axis label appears in different languages or formats, supporting scenarios where users need to set, change, translate, or configure the axis panel heading for better clarity, user interface adaptation, or internationalization of chart components.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        expandText: "Custom"
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.title `Object`

Specifies the text for the title area of the valueAxis panel


<div class="meta-api-description">
Configure and customize the displayed text label for the value axis title in chart components, enabling localization, setting, or changing the heading shown above the value axis panel to match different languages, formats, or contextual requirements. Adjust or translate the axis heading, control the title string that identifies the measurement scale, and define how the axis descriptor appears for users needing localized, user-friendly, or dynamically set value axis titles in chart interfaces.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                valueAxis: {
                    title: {
                        text: "Title Text",
                        color: "Title Color",
                        font: "Title Font"
                    }
                }
            }
        }
    });
    </script>

### messages.format.valueAxis.title.text `String`

Specifies the text for the title legend of the valueAxis panel


<div class="meta-api-description">
Set or customize the title text displayed on the value axis panel of a chart, control or configure the label shown along the vertical value axis, update or change the numeric axis header or caption, define the wording or phrasing that describes the scale or values on the Y-axis, adjust the axis title text for clarity, accessibility, or presentation in chart-generating tools or interactive data visualizations, specify the text string for the value axis heading to match data context or user requirements, enable localization or translation of the value axis title content, manage how the value axis is labeled in charts for improved readability and user understanding.
</div>

#### Example - set the "text" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        title: {
                            text: "Custom"
                        }
                    }
                }   
            }
        });
    </script>


### messages.format.valueAxis.title.placeholder `String`

Specifies the text for the placeholder of the textbox editor of the valueAxis panel


<div class="meta-api-description">
Customize or localize the placeholder text displayed in the value axis title input field within the chart formatting interface, enabling developers to configure, set, or modify the default prompt or hint shown when editing or defining the vertical axis label; control how the placeholder guides users in entering descriptive titles for the value axis in chart wizard panels, supporting internationalization and user-friendly axis labeling prompts.
</div>

#### Example - set the "placeholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        title: {
                            placeholder: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.title.font `String`

Specifies the text for the label of font editor for the title of the valueAxis panel


<div class="meta-api-description">
Customize or configure the font style, size, weight, color, and typography for the value axis title in chart formatting tools or editors, enabling control over the appearance and design of the vertical axis label in chart interfaces, dashboards, or visualization panels, including setting or adjusting the value axis title font attributes in chart setup, design customization, or report generation environments.
</div>

#### Example - set the "font" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        title: {
                            font: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.title.fontPlaceholder `String`

Specifies the text for the placeholder of font editor for the title of the valueAxis panel


<div class="meta-api-description">
Configure or customize the placeholder text shown in the font editor for the value axis title, enabling control over default hints or prompts when adjusting axis title typography, setting temporary text in font selection inputs, managing placeholder visibility for font styling of value axis labels, and enhancing user guidance in chart axis title font configuration interfaces.
</div>

#### Example - set the "fontPlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        title: {
                            fontPlaceholder: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.title.size `String`

Specifies the text for the label of size editor for the title of the valueAxis panel


<div class="meta-api-description">
Configure or customize the text label displayed in the size adjustment control for the value axis title within chart setup tools, enabling localization or renaming of the size editor prompt. Adjust, set, or translate the label text shown when changing the size of the vertical axis title in chart wizard interfaces, ensuring the size control description matches language preferences or user context. Manage the naming or wording of the size input field that affects the value axis title's font dimension or scale configurations during chart formatting or axis title styling steps.
</div>

#### Example - set the "size" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        title: {
                            size: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.title.sizePlaceholder `String`

Specifies the text for the placeholder of size editor for the title of the valueAxis panel


<div class="meta-api-description">
Set or customize the placeholder text, hint, or default prompt shown in the input field or editor for adjusting the size or font dimensions of the value axis title in chart configuration tools, enabling users to configure, define, or control the display or formatting of axis label size during chart setup or editing within visualization wizards, dashboards, or UI panels.
</div>

#### Example - set the "sizePlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        title: {
                            sizePlaceholder: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.title.color `String`

Specifies the text for the label of color editor for the title of the valueAxis panel


<div class="meta-api-description">
Adjust, customize, or configure the color of the value axis title label in chart or graph editors, enabling control over the text color displayed on the vertical or numerical axis; modify title appearance, set value axis label color, change axis title font shade, and personalize chart axis title styling to match themes or design preferences across chart visualization tools.
</div>

#### Example - set the "color" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        title: {
                            color: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.labels `Object`

Specifies the text for the labels area of the valueAxis panel


<div class="meta-api-description">
Customize or localize numerical axis labels on chart value axes, adjust the formatting and text of vertical or horizontal axis labels, configure label captions and display values on charts, set the strings shown for data value markers on axis panels, translate or redefine axis label content for different languages, control the appearance and wording of value axis text, modify axis label strings for clarity or regional settings, handle numerical scale label text customization and localization for charting components, enable precise control over value axis label phrasing and presentation in chart interfaces.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                valueAxis: {
                    labels: {
                        text: "Labels Text",
                        color: "Labels Color",
                        font: "Labels Font",
                        labelFormat: "Label Format",
                        rotation: "Labels Rotation"
                    }
                }
            }
        }
    });
    </script>

### messages.format.valueAxis.labels.text `String`

Specifies the text for the labels legend of the valueAxis panel


<div class="meta-api-description">
Customize or configure the text displayed on the numeric axis labels, adjust the label captions or legends for the value axis in chart settings, control or set the wording shown next to the value axis indicators, modify the descriptive text of vertical or numeric axis labels, and define label content for value axis panels to tailor chart axis labeling, captions, or legends according to specific charting or data visualization requirements.
</div>

#### Example - set the "text" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            text: "Custom"
                        }
                    }
                }   
            }
        });
    </script>


### messages.format.valueAxis.labels.labelFormat `Object`

Specifies the text for the labelFormat area of the valueAxis panel


<div class="meta-api-description">
Control and customize the formatting of value axis labels in chart configurations, including setting number formats, date formats, and custom label templates for axes values, enabling precise display of numerical or categorical data annotations on charts, formatting axis tick labels, adjusting decimal places, prefixes, suffixes, and localization settings, configuring how values appear on vertical or horizontal axes, and tailoring visible label styles and text representations to match data visualization requirements and enhance readability.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                valueAxis: {
                    labels: {
                        labelFormat: {
                            default: "Default",
                            text: "Text",
                            number: "Number",
                            currency: "Currency",
                            percent: "Percent"
                        }
                    }
                }
            }
        }
    });
    </script>

### messages.format.valueAxis.labels.labelFormat.default `String`

Specifies the text for the labels legend for labelsFormat editor of the valueAxis panel


<div class="meta-api-description">
Configure the default text or format template applied to the value axis labels in chart configuration tools, enabling control over how numerical or categorical values appear along the vertical axis, customize legend label formats, set baseline display styles for axis labels, adjust default formatting for value axis legends, and manage the initial label appearance on charts for clearer data visualization and presentation consistency.
</div>

#### Example - set the "default" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            labelFormat: {
                                default: "Custom"
                            }
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.labels.labelFormat.text `String`

Specifies the text for the DropDownList item which represents the text option


<div class="meta-api-description">
Customize, set, or change the label text for the dropdown option related to axis value formatting in chart configuration interfaces, enabling developers to control the displayed name or description for the text format choice on value axis labels. Adjust or localize the dropdown label for text formatting of value axis labels, modify the user-visible label in chart wizard configuration for value axis label formats, and tailor naming conventions to suit UI requirements or multilingual support when configuring chart axis label appearance and formats.
</div>

#### Example - set the "text" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            labelFormat: {
                                text: "Custom"
                            }
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.labels.labelFormat.number `String`

Specifies the text for the DropDownList item which represents the number option


<div class="meta-api-description">
Configure and customize the text label displayed for numeric value axis options in chart setup interfaces, enabling control over how number format choices appear in dropdown menus, label captions, or selection lists for value axis formatting. Adjust, set, or change the descriptive text associated with number formatting in chart axis controls, including labels in format pickers, dropdowns, or user selection elements related to value axis number presentation and formatting preferences.
</div>

#### Example - set the "number" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            labelFormat: {
                                number: "Custom"
                            }
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.labels.labelFormat.currency `String`

Specifies the text for the DropDownList item which represents the currency option


<div class="meta-api-description">
Configure or customize the display format of currency labels on the value axis in chart dropdown selectors, control how monetary values appear using various label formats, set or modify the currency symbol and number formatting in axis labels, enable adjusting currency presentation in axis label dropdowns for charts, define formatting options for value axis currency texts in visual data representations, tailor the currency label format shown in chart configuration menus, specify how currency units and decimals appear in axis labels, adjust or set currency display styles for value axis labels, manage dropdown text options related to currency formats in chart axis settings, and refine currency formatting for value axis labels within interactive chart wizards or builders.
</div>

#### Example - set the "currency" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            labelFormat: {
                                currency: "Custom"
                            }
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.labels.labelFormat.percent `String`

Specifies the text for the DropDownList item which represents the percent option


<div class="meta-api-description">
Customize, translate, or localize the percentage label text shown in the value axis format dropdown or selector within chart configuration tools, enabling control over how percent options are displayed for value axis labels, including adjusting language, terminology, or wording for percent formats in axis labeling and formatting settings.
</div>

#### Example - set the "percent" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            labelFormat: {
                                percent: "Custom"
                            }
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.labels.font `String`

Specifies the text for the label of font editor for the labels of the valueAxis panel


<div class="meta-api-description">
Control and customize the text label that appears in the font settings panel for value axis labels within chart configuration tools, enabling you to set, change, or localize the displayed wording for axis label font editors, adjust labeling for numeric scales or value indicators on charts, and tailor the interface text that guides users in modifying font styles for value axes.
</div>

#### Example - set the "font" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            font: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.labels.fontPlaceholder `String`

Specifies the text for the placeholder of font editor for the labels of the valueAxis panel


<div class="meta-api-description">
Set or customize the placeholder text shown in the font selector or editor for value axis labels in chart configuration tools, enabling control over default prompt text or hints when adjusting font styles, sizes, and types for axis labels on charts, graphs, or data visualizations. This replaces or defines the sample text appearing in font input fields for vertical or numeric axis label customization, helping guide users while configuring label fonts in charting interfaces or wizard steps.
</div>

#### Example - set the "fontPlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            fontPlaceholder: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.labels.size `String`

Specifies the text for the label of size editor for the labels of the valueAxis panel


<div class="meta-api-description">
Adjust the font size, text scaling, and label dimensions for value axis labels in chart configuration, enabling customization of label appearance, readability, and spacing on value axes for charts, graphs, and data visualizations, including control over numeric axis label text size, styling the size of axis tick labels, and setting label font size to improve clarity and presentation in charting tools.
</div>

#### Example - set the "size" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            size: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.labels.sizePlaceholder `String`

Specifies the text for the placeholder of size editor for the labels of the valueAxis panel


<div class="meta-api-description">
Configure or customize the placeholder text shown in the size input field for value axis labels in chart editing tools, enable setting or changing the default size editor hint, control the textual prompt guiding user input for value axis label sizing, adjust or update the placeholder to improve clarity on size adjustments for value axis labels during chart design or formatting, modify the input field placeholder to instruct users on setting label dimensions on the value axis within chart wizard interfaces or similar visualization editors.
</div>

#### Example - set the "sizePlaceholder" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            sizePlaceholder: "Custom"
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.labels.color `String`

Specifies the text for the label of color editor for the labels of the valueAxis panel


<div class="meta-api-description">
Customize or configure the color of value axis labels in charts by setting, adjusting, or controlling the label text color for the value axis, enabling developers to specify or change the color format, style, or appearance of axis label text dynamically, supporting use cases for visual customization, color theming, label formatting, and enhancing chart readability through text color adjustments on value axis labels.
</div>

#### Example - set the "color" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            color: "Custom"
                        }
                    }
                }   
            }
        });
    </script>


### messages.format.valueAxis.labels.rotation `Object`

Specifies the text for the rotation area for the labels of the valueAxis panel


<div class="meta-api-description">
Customize, set, or configure the rotation angle and orientation of value axis labels on charts or graphs, enabling control over how vertical, diagonal, or angled text appears along the value or Y axis. Adjust label rotation to improve readability, avoid overlap, align label text direction, and enhance visualization clarity in charting tools, dashboards, or data visualization components by specifying rotation degrees or predefined angles for axis label formatting, orientation, or layout.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                valueAxis: {
                    labels: {
                        rotation: {
                            text: "Rotation",
                            auto: "Auto"
                        }
                    }
                }
            }
        }
    });
    </script>

### messages.format.valueAxis.labels.rotation.text `String`

Specifies the text for the label of the rotation editor for the labels of the valueAxis panel


<div class="meta-api-description">
Customize and control the text displayed for the rotation angle input or label on value axis labels within chart configuration tools, enabling you to set, modify, or localize the descriptor or prompt tied to the value axis label rotation editor; useful for adjusting UI elements, configuring axis label orientation settings, setting descriptive text for rotation controls, and enhancing clarity in chart customization interfaces regarding how value axis labels are rotated or aligned.
</div>

#### Example - set the "color" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            rotation: {
                                text: "Custom"
                            }
                        }
                    }
                }   
            }
        });
    </script>

### messages.format.valueAxis.labels.rotation.auto `String`

Specifies the text for the placeholder of the rotation editor for the labels of the valueAxis panel


<div class="meta-api-description">
Configure automatic rotation settings, enable or disable dynamic angle adjustment, control label orientation for value axis ticks, set placeholder text for rotation input fields, manage axis label display and rotation behavior in chart customization, adjust label tilt or alignment on the value axis, specify defaults for label rotation controls, and handle formatting and presentation of value axis labels to improve readability in chart wizard interfaces.
</div>

#### Example - set the "auto" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    valueAxis: {
                        labels: {
                            rotation: {
                                auto: "Custom"
                            }    
                        }
                    }   
                }
            }
        });
    </script>

### messages.format.xAxis `Object`

Specifies the text of the xAxis panel. The xAxis panel is visible only for non-categorical chart types.


<div class="meta-api-description">
Customize, configure, or localize the x-axis label, title, or text displayed in chart configuration dialogs or wizards for numeric, continuous, or date/time axes; set or change axis panel messages, prompts, or headings that appear when adjusting the x-axis properties in charts that are non-categorical, continuous, or quantitative; control how the horizontal axis information is presented in chart setup interfaces, including localization for different languages or regions and specific text for axis identification in line, scatter, or area charts.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                xAxis: {
                    expandText: "X Axis",
                    collapseText: "Collapse X Axis"
                }
            }
        }
    });
    </script>

### messages.format.xAxis.expandText `String`

Specifies the title of the xAxis panel


<div class="meta-api-description">
Customize, configure, or set the text label, title, or heading shown on the x-axis panel of a chart, including localization and internationalization options for displaying axis descriptions or captions. Control or modify the horizontal axis text used in chart interfaces, enable custom strings or translated titles for better clarity, user guidance, and presentation on the x-axis panel within charting wizards or visualization tools. Adjust, change, or specify the displayed content for the x-axis label area to fit different language settings or user preferences in chart layout customization.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    xAxis: {
                        expandText: "Custom"
                    }
                }   
            }
        });
    </script>


### messages.format.yAxis `Object`

Specifies the text of the xAxis panel. The yAxis panel is visible only for non-categorical chart types.


<div class="meta-api-description">
Customize or configure the vertical axis labels, titles, or text formatting for charts that use continuous or numerical data, controlling how the y-axis panel displays information in line, area, scatter, or other non-categorical charts; adjust, enable, or set the y-axis text output to improve readability, presentation, and interpretation of data scales and values on the vertical axis of graphs or visualizations that categorize data by measurement rather than discrete categories.
</div>

#### Example

    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        messages: {
            format: {
                yAxis: {
                    expandText: "Y Axis",
                    collapseText: "Collapse Y Axis"
                }
            }
        }
    });
    </script>

### messages.format.yAxis.expandText `String`

Specifies the title of the yAxis panel


<div class="meta-api-description">
Customize, define, localize, or set the y-axis panel title text, label, or heading in charts to control how the vertical axis description appears in interfaces, dashboards, or visualizations. Adjust, configure, or specify the wording for the y-axis expansion tooltip, caption, or message, enabling tailored language, translations, or localization options for clearer axis information display in ChartWizard or similar graph configuration tools.
</div>

#### Example - set the "expandText" ChartWizard message
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            messages: {
                format: {
                    yAxis: {
                        expandText: "Custom"
                    }
                }   
            }
        });
    </script>


### state `Object`

Specifies the state of the ChartWizard component. If a state object is provided, the ChartWizard will neglect the dataSource and the creation of an initial state and will use this state instance instead.

> In order to work as expected, the CharWizard requires the `state` object to have defined [data](/api/javascript/ui/chartwizard#configuration-state.data) and [series](/api/javascript/ui/chartwizard#configuration-state.series) fields.


<div class="meta-api-description">
Configure or set a custom initial configuration for the chart setup wizard by providing a full state object that overrides automatic data source initialization and predefined defaults. Enable control over the wizard’s starting point by supplying a complete state including data and series definitions, allowing bypass of default or auto-generated states tied to data sources. Control, customize, or replace the wizard’s initial state with your own preconfigured data and series structure to tailor the chart creation experience, supporting cases where you want precise setup without relying on built-in data or series extraction. Use this to directly inject a prepared state configuration, ignoring any automatic setup based on connected data sources or default behaviors.
</div>

#### Example - configure the initial state of the ChartWizard
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            window: {
                    visible: true
                },
                state: {
                    columns: [
                        "Product Name",
                        "Quantity",
                        "Price",
                        "Tax",
                        "Total"
                    ],
                    data: [
                            [{
                                field: "Product Name",
                                value: "Calzone"
                            },{
                                field: "Quantity",
                                value: 1
                            },{
                                field: "Price",
                                value: 12.39
                            },{
                                field: "Tax",
                                value: 2.48
                            },{
                                field: "Total",
                                value: 14.87
                            }],
                            [{
                                field: "Product Name",
                                value: "Neapolitana"
                            },{
                                field: "Quantity",
                                value: 2
                            },{
                                field: "Price",
                                value: 7.39
                            },{
                                field: "Tax",
                                value: 1.23
                            },{
                                field: "Total",
                                value: 8.62
                            }]
                        ],
                    series: [
                        {
                            name: "Quantity",
                            type: "bar",
                            data: [
                                1
                            ],
                            stack: false,
                            labels: {
                                visible: false
                            },
                            id: 0
                        },
                        {
                            name: "Price",
                            type: "bar",
                            data: [
                                12.39
                            ],
                            stack: false,
                            labels: {
                                visible: false
                            },
                            id: 1
                        },
                        {
                            name: "Tax",
                            type: "bar",
                            data: [
                                2.48
                            ],
                            stack: false,
                            labels: {
                                visible: false
                            },
                            id: 2
                        },
                        {
                            name: "Total",
                            type: "bar",
                            data: [
                                14.87
                            ],
                            stack: false,
                            labels: {
                                visible: false
                            },
                            id: 3
                        }
                    ],
                    initialSeries: [
                        {
                            name: "Quantity",
                            type: "bar",
                            data: [
                                1
                            ],
                            stack: false,
                            labels: {
                                visible: false
                            },
                            id: 0
                        },
                        {
                            name: "Price",
                            type: "bar",
                            data: [
                                12.39
                            ],
                            stack: false,
                            labels: {
                                visible: false
                            },
                            id: 1
                        },
                        {
                            name: "Tax",
                            type: "bar",
                            data: [
                                2.48
                            ],
                            stack: false,
                            labels: {
                                visible: false
                            },
                            id: 2
                        },
                        {
                            name: "Total",
                            type: "bar",
                            data: [
                                14.87
                            ],
                            stack: false,
                            labels: {
                                visible: false
                            },
                            id: 3
                        }
                    ],
                    categoryAxis: [
                        {
                            categories: [
                                "Calzone"
                            ],
                            labels: {
                                visible: true,
                                rotation: "auto"
                            }
                        }
                    ],
                    valueAxis: [
                        {
                            labels: {
                                visible: true,
                                rotation: "auto"
                            }
                        }
                    ],
                    area: {
                        margin: {}
                    },
                    title: {
                        text: ""
                    },
                    subtitle: {
                        text: ""
                    },
                    stack: false,
                    seriesType: "bar",
                    legend: {
                        visible: true,
                        position: "bottom"
                    },
                    categoryField: "Product Name",
                    chartArea: {
                        margin: {}
                    }
                }
            });
    </script>

### state.columns `Array`

Specifies the columns to be used for the ChartWizard component. An array of strings should be provided.


<div class="meta-api-description">
Specify or configure the data fields, column names, or dataset keys used for chart generation, controlling which series, categories, or values are included in the visualization; set or update an array of field identifiers to bind chart components to specific data sources, enabling customization of chart content, data mapping, and field selection during setup or runtime for accurate chart rendering based on chosen columns or attributes.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            columns: [
                "Product Name",
                "Sales",
                "Profit",
                "Region"
            ]
        }
    });
    </script>

### state.data `Array`

Specifies the data to be visualized in ChartWizard component.

> ChartWizard component needs a specific type of data(`ChartWizardDataRow`) to work as expected. This type of data, which is an array consists of single or multiple arrays of Objects, which have the `field` and `value` properties.


<div class="meta-api-description">
Control, set, or update the input data for dynamic chart rendering by binding arrays of data objects with defined fields and corresponding values, enabling loading, refreshing, or modifying datasets in various formats for visualization components; manage structured collections of records with key-value pairs to drive chart displays, handle multiple data series, map field names to values correctly, and ensure the data format fits chart mapping requirements, supporting use cases like real-time updates, data binding, and dataset manipulation for interactive graphs or dashboards.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            data: [
                [
                    { field: "Product", value: "Widget A" },
                    { field: "Sales", value: 1000 },
                    { field: "Profit", value: 250 }
                ],
                [
                    { field: "Product", value: "Widget B" },
                    { field: "Sales", value: 1500 },
                    { field: "Profit", value: 400 }
                ]
            ]
        }
    });
    </script>

### state.initialSeries `Array`

The initial series configuration of the chart.


<div class="meta-api-description">
Set or configure the initial data series and chart types when starting or creating a chart, including defining series configurations like data binding fields, series names, chart styles, types, and visual options to control how the chart renders at initialization, allowing preloading of series settings, specifying default series arrays, customizing initial chart data mappings, and establishing base series properties for charts before any user interaction or dynamic updates.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: [{
                name: "Sales",
                data: [
                    { category: "Jan", value: 100 },
                    { category: "Feb", value: 150 },
                    { category: "Mar", value: 200 }
                ],
                field: "value",
                categoryField: "category",
                type: "column"
            }]
        }
    });
    </script>

### state.initialSeries.categoryField `String` *(default: "category")*

The data item field which contains the category name or date.

> The points will be rendered in chronological order if the category is a date.


<div class="meta-api-description">
Configure the data source field that defines category labels or date values for grouping and organizing chart points along the category axis, enabling sorting by names or chronological order, setting or assigning the field name that represents categories, labels, or timestamps to control how data items group and display on charts with categorical or time-based axes, supporting category grouping, date-based sorting, axis labeling, and grouping points by specified fields for visualizing trends or categories in charts.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: {
                categoryField: "month",
                field: "sales"
            }
        }
    });
    </script>

### state.initialSeries.name `String`

The name of the chart series which is visible in the legend.


<div class="meta-api-description">
Configure or customize the label text that appears in the chart legend for each data series, enabling setting, altering, or controlling the series name shown in the legend display, chart key, or series label for clear identification, naming, or renaming of chart data groupings at initialization or runtime to ensure the legend accurately represents data series titles or captions.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: {
                name: "Sales Data",
                field: "sales"
            }
        }
    });
    </script>

### state.initialSeries.color `String`

The series base color. The supported values are:


<div class="meta-api-description">
Set or customize the default base color for data series in chart components using common CSS color formats like hex codes (#RRGGBB), rgb(), rgba(), hsl(), hsla(), or named colors; configure initial or default series coloring during chart setup, control the primary color shown for chart lines or bars, and specify the starting color for chart series visualization by assigning color strings in various standard CSS formats.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: {
                color: "#ff6800",
                field: "sales"
            }
        }
    });
    </script>

* CSS color string, including hex and rgb
* function(point) - user-defined function that will be evaluated for each point. Returning `undefined` will assume the default series color.

### state.initialSeries.data `Array`

The array of data items which represent the series data.

Can be set to :

* Array of objects. Each point is bound to the field specified via the [series.field](/api/javascript/dataviz/ui/chart#configuration-series.field) option.
* Array of numbers. Supported when the [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) option is set to "bar", "column", "pie", or "line".
* Array of arrays of numbers. Supported when the [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) option is set to "scatter".
* Scatter and scatter line series need arrays of two values - X value and Y value


<div class="meta-api-description">
Set or configure the data points for a chart series using arrays of objects, numeric values, or coordinate pairs depending on the chart type, enabling binding series points to fields, numeric arrays for bar, column, pie, or line charts, or arrays of X and Y coordinate pairs for scatter and scatter line charts, supporting flexible data input formats to control series data, points, and values for diverse chart visualizations.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: {
                data: [
                    { category: "Q1", value: 100 },
                    { category: "Q2", value: 150 },
                    { category: "Q3", value: 200 },
                    { category: "Q4", value: 180 }
                ]
            }
        }
    });
    </script>

### state.initialSeries.field `String` *(default: "value")*

The data item field which contains the series value. **The field name should be a valid Javascript identifier and should contain only alphanumeric characters (or "$" or "_"), and may not start with a digit.**


<div class="meta-api-description">
Specify or configure the data field name that holds the series values for chart generation, including how to map dataset properties to individual chart series, set or assign the field identifier for series data binding, control which data attribute is used as the series value in chart creation, define the key or property name from data records that corresponds to series classification, and determine the JavaScript-valid field representing series elements in visualization setups.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: {
                field: "sales",
                data: [
                    { month: "Jan", sales: 100 },
                    { month: "Feb", sales: 150 }
                ]
            }
        }
    });
    </script>

### state.initialSeries.labels `Object`

The chart series label configuration.

> The chart displays the series labels when the [series.labels.visible](/api/javascript/dataviz/ui/chart#configuration-series.labels.visible) option is set to `true`.


<div class="meta-api-description">
Customize and control the appearance and behavior of data series labels within charts, including setting label text content, positioning around or on the data points, formatting styles such as fonts and colors, and visual display options to enhance readability and clarity. Enable or disable series label visibility, adjust label placement relative to chart elements, tailor label formats for dates, numbers, or custom text, and configure how labels update dynamically with the data. This enables fine-tuning of chart annotations, facilitating clearer data storytelling, highlighting specific data points, or improving overall chart aesthetics with flexible label customization controls.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: {
                labels: {
                    visible: true,
                    format: "{0:C}",
                    color: "red"
                }
            }
        }
    });
    </script>

### state.initialSeries.labels.visible `Boolean|Function` *(default: false)*

If set to `true` the chart will display the series labels. By default chart series labels are not displayed.


<div class="meta-api-description">
Control whether data series labels are shown or hidden on charts, enabling the display of series names or values directly on the graph lines or bars by toggling visibility settings in initial chart configurations. Adjust label visibility for clearer data presentation, dynamic labeling, or to reduce clutter by enabling, disabling, showing, hiding, or configuring series labels at the start of chart rendering. Ideal for customizing the appearance of charts to show or suppress series identification, improve readability, or tailor label display in reporting, dashboards, or interactive chart components.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: {
                labels: {
                    visible: true
                }
            }
        }
    });
    </script>

### state.initialSeries.stack `Boolean|String|Object` *(default: false)*

A boolean value indicating if the series should be stacked.
A string value is interpreted as [series.stack.group](/api/javascript/dataviz/ui/chart#configuration-series.stack.group).

> The `stack` options is supported when [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) is set to "bar", "column", or "line". All series in the stack must be of the same type.

> Stack settings of the first series are inherited as a default value by the rest of the series, in case they are not overridden.


<div class="meta-api-description">
Configure and control series stacking to enable cumulative rendering in bar, column, or line charts by setting stacking to true or assigning series to named stack groups with string identifiers; manage group stacking behavior where stacked series must share the same chart type, allowing inheritance of stacking settings from initial series and precise control over layered visualization, cumulative series display, grouped data aggregation, and stack grouping for multi-series charts.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: {
                stack: {
                    type: "100%"
                }
            }
        }
    });
    </script>

### state.initialSeries.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.


<div class="meta-api-description">
Set and control the stacking mode of chart series to define how data points combine within categories or groups, choosing between absolute stacking where values add up cumulatively to totals, or normalized stacking where each stack represents a percentage share totaling 100%. Configure initial stack behavior to render series as either summed values or proportional percentages, enabling visuals that display total sums or relative contribution of each point within groups. Customize the stacking approach to show data as standard cumulative stacks, normalized percentage stacks, or adjust grouping methods to compare aggregated sums versus 100% stacked distributions in charts.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: {
                stack: {
                    type: "100%"
                }
            }
        }
    });
    </script>

### state.initialSeries.type `String` *(default: "column")*

The type of the series.

The supported values are:

* [`bar`](/controls/charts/chart-types/bar-charts)
* [`column`](api/javascript/dataviz/ui/chart/configuration/seriesdefaults.column)
* [`line`](/controls/charts/chart-types/line-charts)
* [`pie`](/controls/charts/chart-types/pie-charts)
* [`scatter`](/controls/charts/chart-types/scatter-charts)


<div class="meta-api-description">
Define or configure the default chart series visualization style, such as bar, column, line, pie, or scatter plot, to control how initial data sets appear when generating charts. Customize or set the starting chart type for displaying data series, enabling different graph formats like bar charts, line graphs, pie sectors, or scatter points to suit analysis needs, data representation preferences, or visual insights. Adjust initial visualization mode, chart display format, or primary graph type for the first data series to influence user interactions and overall chart layout right from the start.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: {
                type: "line"
            }
        }
    });
    </script>

### state.initialSeries.width `Number`

The line width.

> The `width` option is supported when [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) is set to "line".


<div class="meta-api-description">
Configure or adjust the thickness, stroke width, or line weight of line series in chart rendering to control the visual thickness or boldness of plotted lines, including setting or customizing the stroke thickness during chart setup or initialization for line-type series, enabling control over how thick or thin the lines appear in line charts or line graph series display.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            initialSeries: {
                type: "line",
                width: 3
            }
        }
    });
    </script>

### state.series `Array`

The configuration of the chart [series](/api/javascript/dataviz/ui/chart#configuration-series).

The series type is determined by the value of the type field.
If a type value is missing, the type is assumed to be the one specified in seriesDefaults.

> Some options accept function as argument. They will be evaluated for each point (supplied as parameter). The theme/seriesDefaults value will be used if no value is returned.


<div class="meta-api-description">
Configure and control the chart’s data series collection, specifying which data series to display, customize series types such as line, bar, or pie, and set individual series behaviors including dynamic option evaluation per data point through functions that override default settings. Enable fine-tuning of series appearance and functionality by defining series properties, fallback to global defaults when specific types or options are omitted, and manage how each series is rendered and updated to match varied charting needs such as multi-series visualization, dynamic data-driven styling, or theme-based inheritance for consistent look and feel.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                name: "Sales",
                data: [100, 150, 200],
                type: "column"
            }, {
                name: "Profit",
                data: [20, 30, 40],
                type: "line"
            }]
        }
    });
    </script>

### state.series.categoryField `String` *(default: "category")*

The data item field which contains the category name or date.

> The points will be rendered in chronological order if the category is a date.


<div class="meta-api-description">
Configure how data points associate with categories or dates on the X axis by specifying the field that holds category names, labels, or timestamps for a series. Enable binding of categorical values such as strings or date/time values to chart series, controlling how data items map to the horizontal axis and determining if points are ordered chronologically for time series or grouped by named categories. Set or customize the key that identifies categories, labels, or date fields within data items to organize series presentation in charts, supporting date-based sorting and categorical grouping for flexible axis mapping and series alignment.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                categoryField: "month",
                data: [
                    { month: "Jan", value: 100 },
                    { month: "Feb", value: 150 }
                ]
            }]
        }
    });
    </script>

### state.series.name `String`

The name of the chart series which is visible in the legend.


<div class="meta-api-description">
Configure or customize the label text shown in the chart legend to identify and distinguish data series, controlling how series are named, referenced, filtered, or displayed in visualizations and interactive chart interfaces, enabling clear series naming for binding, legend display, tooltip descriptions, or UI element labeling in dynamic chart setups.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                name: "Monthly Sales",
                data: [100, 150, 200]
            }]
        }
    });
    </script>

### state.series.color `String|Function`

The series base color. The supported values are:

* CSS color string, including hex and rgb
* function(point) - user-defined function that will be evaluated for each point. Returning `undefined` will assume the default series color.


<div class="meta-api-description">
Set or configure the default color for data series in a chart, specifying fill and stroke colors using CSS formats like hex, rgb, or named colors, or dynamically assign colors by providing a function that evaluates each data point to determine its color; you can control series appearance, customize individual point colors, create color gradients or conditional coloring rules, and fallback to default colors when the function does not return a value, enabling flexible, programmable styling for chart series visualization and design.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                color: "#ff6600",
                data: [100, 150, 200]
            }]
        }
    });
    </script>

### state.series.data `Array`

The array of data items which represent the series data.

Can be set to :

* Array of objects. Each point is bound to the field specified via the [series.field](/api/javascript/dataviz/ui/chart#configuration-series.field) option.
* Array of numbers. Supported when the [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) option is set to "bar", "column", "pie", or "line".
* Array of arrays of numbers. Supported when the [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) option is set to "scatter".
* Scatter and scatter line series need arrays of two values - X value and Y value


<div class="meta-api-description">
Supply or configure the data array for chart series, including arrays of numbers, objects bound by field names, or arrays of coordinate pairs for scatter plots, allowing control over data binding, point values, series types like bar, column, pie, line, or scatter, enabling dynamic input of data points, customizing how series data is structured and interpreted, and setting values for X and Y coordinates in scatter or scatter line charts.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                data: [
                    { quarter: "Q1", sales: 100 },
                    { quarter: "Q2", sales: 150 },
                    { quarter: "Q3", sales: 200 }
                ]
            }]
        }
    });
    </script>

### state.series.field `String` *(default: "value")*

The data item field which contains the series value. **The field name should be a valid Javascript identifier and should contain only alphanumeric characters (or "$" or "_"), and may not start with a digit.**


<div class="meta-api-description">
Configure the specific data attribute or key that holds the numeric values for chart series, enabling binding, mapping, and aggregation of data points such as stacking, grouping, or plotting within chart components. Set, define, or select the data property name representing series values on each data item, ensuring it matches valid JavaScript identifiers including letters, numbers, underscores, or dollar signs, commonly used for referencing field names in datasets or JSON objects to control which numeric data drives the chart's visual series representation. Adjust or designate the source field for series data values to facilitate dynamic chart updates, aggregation calculations, and correct rendering of grouped or stacked series in data visualization.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                field: "revenue",
                name: "Monthly Revenue"
            }]
        }
    });
    </script>

### state.series.labels `Object`

The chart series label configuration.

> The chart displays the series labels when the [series.labels.visible](/api/javascript/dataviz/ui/chart#configuration-series.labels.visible) option is set to `true`.


<div class="meta-api-description">
Control and customize series labels in charts by setting label text content, positioning locations, formatting styles, visibility toggles, and display options for data points or series elements. Enable, configure, or adjust label appearance including font style, color, alignment, placement relative to data markers, and content formatting. Manage how series labels appear on graphs, controlling visibility, text layout, label positioning preferences, and styling attributes to enhance clarity, readability, and presentation of chart data series. Adjust label display settings, format numerical or textual data in labels, and position labels dynamically or statically within chart series to tailor the information shown on visual data plots.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                labels: {
                    visible: true,
                    format: "{0:C}",
                    color: "blue"
                }
            }]
        }
    });
    </script>

### state.series.labels.visible `Boolean|Function` *(default: false)*

If set to `true` the chart will display the series labels. By default chart series labels are not displayed.


<div class="meta-api-description">
Toggle display of data labels on chart series, enabling or disabling visibility of series labels to show or hide numerical or categorical information directly on each data point or segment. Configure label appearance on graph lines or bars, set series label visibility states, control whether text annotations or value tags appear on charts, and manage showing or hiding metadata labels for clarity or decluttering visuals. Switch on or off labels that identify series data points for enhanced readability, data callouts, or minimalist chart design.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                labels: {
                    visible: true
                }
            }]
        }
    });
    </script>

### state.series.stack `Boolean|String|Object` *(default: false)*

A boolean value indicating if the series should be stacked.
A string value is interpreted as [series.stack.group](/api/javascript/dataviz/ui/chart#configuration-series.stack.group).

> The `stack` options is supported when [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) is set to "bar", "column", or "line". All series in the stack must be of the same type.

> Stack settings of the first series are inherited as a default value by the rest of the series, in case they are not overridden.


<div class="meta-api-description">
Control stacking behavior for chart series to enable or disable layered data visualization in bar, column, or line charts by configuring whether series share a common stack group. Adjust stack grouping using boolean values or custom group identifiers to combine series visually, ensuring consistent chart types within a stack. Manage stacking for multiple series by setting group affiliations, overriding default inheritance, and facilitating comparisons through stacked or unstacked chart displays in data presentations.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                stack: {
                    type: "100%"
                }
            }]
        }
    });
    </script>

### state.series.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.


<div class="meta-api-description">
Configure how data series are stacked in charts by setting the stacking method to display either cumulative absolute totals or normalized percentages, enabling control over whether series values sum up directly or are represented proportionally as part of a whole, with options to adjust stack behavior for grouped or categorized data to show standard additive stacks or percentage-based normalized views for better comparative visualization and analysis of charted data.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                stack: {
                    type: "100%"
                }
            }]
        }
    });
    </script>

### state.series.type `String` *(default: "column")*

The type of the series.

The supported values are:

* [`bar`](/controls/charts/chart-types/bar-charts)
* [`column`](api/javascript/dataviz/ui/chart/configuration/seriesdefaults.column)
* [`line`](/controls/charts/chart-types/line-charts)
* [`pie`](/controls/charts/chart-types/pie-charts)
* [`scatter`](/controls/charts/chart-types/scatter-charts)


<div class="meta-api-description">
Configure or select the visualization style for your chart series, choosing between bar, column, line, pie, or scatter types to control how data points are presented and interpreted in your graphs; adjust the series rendering format, switch chart types dynamically, specify graph styles for different datasets, enable various chart representations like bar charts, line charts, pie charts, or scatter plots, and customize the visual output of each data series to match specific analytical or display needs.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                type: "line",
                data: [100, 150, 200]
            }]
        }
    });
    </script>

### state.series.width `Number`

The line width.

> The `width` option is supported when [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) is set to "line".


<div class="meta-api-description">
Adjust or configure the line thickness, stroke weight, or drawn line width for line chart series by setting a numeric value that controls how bold, thin, or heavy the line appears in chart rendering. Enable customization of line visual weight, stroke size, or line width in data series when working with line chart types to emphasize or de-emphasize trend lines, control line prominence, and improve chart readability or styling. Use this setting to fine-tune how thick or slim the lines display, modify series stroke strength, or set the line border width in time series, trend analysis, or data visualization scenarios involving line charts.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            series: [{
                type: "line",
                width: 4,
                data: [100, 150, 200]
            }]
        }
    });
    </script>

### state.title `Object|String`

The chart title configuration options or text.


<div class="meta-api-description">
Set or customize the chart title text, control visibility, styling, formatting, and appearance of the chart's heading, use plain text or detailed configuration objects to define the title content, enable or disable the title display, adjust font, color, alignment, and other visual properties that determine how the chart’s main heading is shown during initialization or runtime, supporting flexible title customization for charts.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            title: {
                text: "Sales Report",
                color: "#333",
                font: "16px Arial"
            }
        }
    });
    </script>

### state.title.color `String`

The color of the chart title.


<div class="meta-api-description">
Control and customize the chart title text color using any valid CSS color format such as hex codes, rgb(), rgba(), or named colors to enhance visibility, match themes, improve contrast, or emphasize important titles in charts. Adjust the title color dynamically to fit different styles, branding requirements, or user preferences, enabling flexible and precise color configuration for chart headings, labels, and captions. This customization supports design consistency and accessibility by allowing you to set, modify, or theme the chart title’s color in various ways.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            title: {
                color: "#ff0000"
            }
        }
    });
    </script>

### state.title.font `String`

The font of the chart title.


<div class="meta-api-description">
Customize or configure the chart title font style, including font family, size, weight, style, and other text appearance options to control how the chart’s main heading is displayed; adjust or set font properties using CSS-like values or object-based settings to style the title text's typography, including bold, italic, different font sizes, and custom fonts for enhanced visual presentation and readability in chart titles.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            title: {
                font: "18px Arial, sans-serif"
            }
        }
    });
    </script>

### state.title.text `String`

The text of the chart title.


<div class="meta-api-description">
Configure or update the chart’s main heading, label, or title text to display a fixed string, dynamic content, or localized messages within the chart area; customize, set, control, or programmatically alter the primary title caption or header shown on data visualizations to reflect current context, user language preferences, or real-time values.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            title: {
                text: "Annual Sales Report",
                color: "#333",
                font: "18px Arial"
            }
        }
    });
    </script>

### state.subtitle `Object`

The chart subtitle configuration options or text.


<div class="meta-api-description">
Set and customize the subtitle text, appearance, formatting, alignment, style, and templates for chart subtitles, including static strings or dynamic data bindings to control subtitle content and presentation during chart setup or runtime configuration, enabling developers to define, update, and style chart subtitles flexibly for dashboards, reports, or visualizations.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            subtitle: {
                text: "Q1-Q4 2023",
                color: "#666",
                font: "14px Arial"
            }
        }
    });
    </script>

### state.subtitle.color `String`

The color of the chart subtitle.


<div class="meta-api-description">
Customize and control the subtitle text color in chart components by setting or changing the subtitle’s font color, text color, or label color within the chart state configuration. Adjust, configure, or enable specific colors for the subtitle text to enhance visual styling, update subtitle appearance, or modify color schemes dynamically in chart rendering environments. This includes options to define subtitle color properties during component state changes, affect subtitle theming, and tailor subtitle visuals to match branding or user interface design requirements.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            subtitle: {
                color: "#999999"
            }
        }
    });
    </script>

### state.subtitle.font `String`

The font of the chart subtitle.


<div class="meta-api-description">
Customize the subtitle text appearance by specifying font characteristics such as font family, size, weight, style, line height, or CSS font shorthand to control the typography of chart subtitles. Enable precise font styling, adjust subtitle text formatting, set custom fonts, and configure subtitle typography during chart setup to tailor the subtitle’s visual presentation. This includes modifying subtitle font properties for clarity, emphasis, or branding in chart visualizations.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            subtitle: {
                font: "12px Arial, sans-serif"
            }
        }
    });
    </script>

### state.subtitle.text `String`

The text of the chart subtitle.


<div class="meta-api-description">
Configure, set, update, or modify the chart’s secondary caption or subtitle text displayed below the main title, including dynamic binding, localization, runtime adjustments, and programmatic changes to the subtitle string or label for enhanced chart descriptions, additional context, or supporting information beneath the primary chart heading.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            subtitle: {
                text: "Quarterly Performance Report"
            }
        }
    });
    </script>

### state.area `Object` *(required)*

The chart area configuration options. Represents the entire visible area of the chart.


<div class="meta-api-description">
Set and control the visible chart canvas dimensions, layout, and appearance including background colors, borders, margins, and sizing options for the entire chart rendering area; customize how the chart's main display region is initialized and visually structured, enabling precise configuration of chart boundaries, spacing, and container styling to influence rendering size and layout during chart setup or dynamic updates.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            area: {
                background: "#f5f5f5",
                margin: {
                    top: 20,
                    right: 15,
                    bottom: 25,
                    left: 30
                }
            }
        }
    });
    </script>

### state.area.background `String`

The background color of the chart area. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
Customize or configure the chart plot area's background color to adjust the fill behind data series and axis elements using any valid CSS color format such as hex codes, RGB, RGBA, HSL, named colors, or transparency to control visual styling, set color themes, apply custom color overlays, or modify the backdrop appearance behind chart components.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            area: {
                background: "#ffffff"
            }
        }
    });
    </script>

### state.area.margin `Number|Object`

The margin of the chart area. A numeric value will set all margins.


<div class="meta-api-description">
Adjust or configure the spacing around the chart content area by setting uniform or custom margins between the chart edges and the visual data, enabling control over padding, buffer space, and layout boundaries during chart initialization or setup. Fine-tune the whitespace surrounding the chart to optimize visibility, prevent content clipping, or enhance aesthetic layout by specifying numeric values that apply consistent spacing on all sides. Control how close or far the chart elements appear relative to the container edges, adjust chart padding for better alignment or to accommodate labels, axes, and legends, and manage the chart area’s outer buffer to refine overall display and presentation.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            area: {
                margin: {
                    top: 10,
                    right: 15,
                    bottom: 20,
                    left: 25
                }
            }
        }
    });
    </script>

### state.area.margin.bottom `Number`

The bottom margin of the chart area.


<div class="meta-api-description">
Adjust the bottom spacing or padding below the chart plotting area to create extra room for axis labels, legends, annotations, or additional chart elements, enabling configuration of margin size beneath the graph to prevent overlapping or clipping, control whitespace under the chart area, set or customize the gap below the plotting region, and manage layout spacing for clear display of chart components at the bottom edge.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            area: {
                margin: {
                    bottom: 30
                }
            }
        }
    });
    </script>

### state.area.margin.left `Number`

The left margin of the chart area.


<div class="meta-api-description">
Adjust or configure the left horizontal margin or spacing inside the chart area to control layout alignment, content positioning, or padding on the left edge of the visualization. Enable setting or fine-tuning left-side space within charts to manage white space, prevent content clipping, control chart positioning relative to container edges, and customize horizontal offsets during chart initialization or runtime layout adjustments. Use this setting to control left padding, margin size, or empty space, ensuring precise alignment and balance of chart elements on the left boundary for various display scenarios or responsive designs.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            area: {
                margin: {
                    left: 40
                }
            }
        }
    });
    </script>

### state.area.margin.right `Number`

The right margin of the chart area.


<div class="meta-api-description">
Adjust or set the right margin spacing inside the chart area to control layout and prevent clipping or overlapping of chart content, including axes, labels, legends, and other elements near the right edge. Configure the right-side padding or inner spacing within the chart container to fine-tune visual alignment, optimize chart boundaries, manage whitespace, and ensure all components are fully visible without cutting off data or annotations. Enable precise control over chart area margins, right edge gaps, layout offsets, or boundary buffers to customize chart presentation and avoid overlapping or crowding on the right side of the visualization.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            area: {
                margin: {
                    right: 25
                }
            }
        }
    });
    </script>

### state.area.margin.top `Number`

The top margin of the chart area.


<div class="meta-api-description">
Adjust, configure, or set the vertical spacing or top margin above the plotting area or chart canvas to control the layout, padding, and space between the chart and the upper boundary, enabling customization of the visual top gap, marginTop, or distance above axes and graph elements for precise alignment and spacing adjustments within chart rendering or display settings.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            area: {
                margin: {
                    top: 15
                }
            }
        }
    });
    </script>

### state.categoryAxis `Array` *(required)*

The category axis configuration options.


<div class="meta-api-description">
Set and customize the horizontal or categorical axis by configuring axis fields, label formats, titles, tick marks, gridlines, axis type selection like category or datetime, scale ranges, and binding options to control how categories or dates appear and behave on charts, enabling precise display adjustments, formatting customization, axis labeling, data grouping, and visual organization for categorical data series or time-based categories within chart components.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                labels: {
                    color: "#333",
                    font: "12px Arial",
                    rotation: 45
                },
                title: {
                    text: "Categories",
                    color: "#666"
                }
            }
        }
    });
    </script>

### state.categoryAxis.labels `Object`

The axis labels configuration.


<div class="meta-api-description">
Control and customize the appearance and behavior of category axis labels in charting tools, including setting text content, applying formatting styles, rotating label orientation for better readability, toggling visibility on or off, using templates for dynamic or styled labels, and adjusting layout positioning to fit various chart designs or data presentations. This covers configuring axis label display options, formatting number or date labels, managing overlap or clutter by rotation or trimming, enabling or disabling labels, applying custom templates or formatting functions, and fine-tuning label placement to enhance chart clarity and user interaction.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                labels: {
                    color: "#666",
                    font: "11px Arial",
                    format: "{0:MMM}",
                    rotation: 30,
                    visible: true
                }
            }
        }
    });
    </script>

### state.categoryAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
Customize the text appearance of category axis labels by setting the label font color, text hue, or label shade using any valid CSS color notation such as hexadecimal codes, RGB values, or named colors to style, configure, or change the visual color of axis category labels on charts for enhanced readability, thematic consistency, or design personalization.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                labels: {
                    color: "#ff0000"
                }
            }
        }
    });
    </script>

### state.categoryAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels. Accepts a valid CSS color string, for example "20px 'Courier New'".


<div class="meta-api-description">
Adjust font appearance for category axis labels including size, family, weight, style, and typeface to customize chart axis text visuals. Control label typography such as font size, font family, font weight, font style, and other text formatting options when rendering category axis labels on charts. Configure or set font styling for axis label text to improve readability or match design requirements by specifying CSS-compatible font strings, including size and font-family combinations. Enable tailored text formatting, font customization, or typography control for horizontal or categorical chart axis labels to ensure clear and consistent label display within chart visualization components.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                labels: {
                    font: "14px 'Times New Roman'"
                }
            }
        }
    });
    </script>

### state.categoryAxis.labels.format `String` *(default: "{0}")*

The format used to display the labels. Uses [kendo.format](/api/javascript/kendo/methods/format). Contains one placeholder ("{0}") which represents the category value.


<div class="meta-api-description">
Control or customize the display format of category axis labels in charts by setting a formatting string that includes placeholders for dynamic category values, enabling flexible number, date, text, or currency presentation on chart axes. Configure label appearance by applying format patterns, adjust how axis labels render categories using template strings, specify formats for axis tick labels, and enable consistent or localized formatting for category descriptions in data visualizations. This covers scenarios like setting numeric precision, date-time formatting, appending units, or modifying label text styles through formatting expressions that insert category data values dynamically.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                labels: {
                    format: "{0:MMM yyyy}"
                }
            }
        }
    });
    </script>

### state.categoryAxis.labels.rotation `Number|String` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated. Can be set to `"auto"` if the axis is horizontal in which case the labels will be rotated only if the slot size is not sufficient for the entire labels.


<div class="meta-api-description">
Adjust or configure the angle of axis labels on a chart’s category axis by setting numeric degrees or enabling automatic rotation, which dynamically tilts labels to prevent overlap or clipping when space is limited, helping improve readability of horizontal or vertical label text. Control label orientation, set custom rotation angles, enable smart automatic tilting to optimize label visibility, and manage how axis category names display when space is constrained or labels are too long.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                labels: {
                    rotation: 45
                }
            }
        }
    });
    </script>

### state.categoryAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis labels. By default the category axis labels are visible.


<div class="meta-api-description">
Control the display of category axis labels on charts by enabling or disabling their visibility, configure whether axis labels for categories appear or are hidden on visualization plots, toggle category axis text or label display on bar charts, line charts, or any chart type with categorical axes, set label visibility to show or suppress category names on the horizontal or vertical axis, customize chart axis label presentation by turning category label rendering on or off, manage the appearance of category axis annotations to improve readability or minimalism, adjust chart settings to reveal or conceal category labels for better data interpretation, control whether chart category axis labels are drawn or suppressed during chart initialization or rendering, and set boolean flags to enable category axis text visibility in data visualizations.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                labels: {
                    visible: false
                }
            }
        }
    });
    </script>

### state.categoryAxis.title `Object`

The title configuration of the category axis.

> The [categoryAxis.title.text](/api/javascript/dataviz/ui/chart#configuration-categoryAxis.title.text) option must be set in order to display the title.


<div class="meta-api-description">
Set, customize, and control the text, style, appearance, formatting, and position of the category axis label or heading in a chart or graph, including enabling or disabling the category axis title, adjusting font, color, visibility, and placement to enhance readability and clarity of categorical data labels on charts, graphs, or visualizations, with options to define the exact title text and tweak how it is presented along the horizontal or vertical category dimension.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    color: "#333",
                    font: "14px Arial"
                }
            }
        }
    });
    </script>

### state.categoryAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
Set and customize the text color of the category axis title in charts, enabling control over axis label appearance to enhance visual contrast, align with branding colors, or improve readability; supports any CSS-compatible color formats such as hex codes, RGB values, and named color keywords, allowing developers to configure, style, or theme axis titles according to design requirements or accessibility needs.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                title: {
                    color: "#0066cc"
                }
            }
        }
    });
    </script>

### state.categoryAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.


<div class="meta-api-description">
Adjust or customize the font appearance of the category axis title by setting font family, size, weight, style, color, and additional font attributes to control the text style, typography, and visual emphasis on the chart's categorical label, enabling users to personalize or standardize title fonts for clarity, readability, branding, or design consistency across chart axes.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                title: {
                    font: "18px 'Segoe UI'"
                }
            }
        }
    });
    </script>

### state.categoryAxis.title.text `String`

The text of the title.

> The text can be split into multiple lines by using line feed characters ("\n").


<div class="meta-api-description">
Configure or set the label text displayed on the chart's category axis, including the ability to specify multiline titles using line breaks or newline characters to format the axis label with custom strings, captions, or headings that clarify the category axis context or meaning in charts, graphs, or data visualizations.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                title: {
                    text: "Categories"
                }
            }
        }
    });
    </script>

### state.categoryAxis.reverse `Boolean` *(default: false)*

The reverse option of the axis.


<div class="meta-api-description">
Configure the category axis to display categories in reverse order by flipping or inverting the sequence of category ticks, labels, and data points along the axis, enabling control over the direction and orientation of categorical values in charts, allowing users to set, enable, or toggle reverse ordering to customize how categories appear from start to end or end to start on the axis for clearer data representation and enhanced visualization options.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                reverse: true
            }
        }
    });
    </script>

### state.categoryAxis.categories `Array`

The category names. The chart will create a category for every item of the array.


<div class="meta-api-description">
Configure or set the list of category labels, category names, or group names displayed on the horizontal or vertical category axis in a chart by supplying an array of strings representing each distinct category or grouping. Enable custom labeling or naming of data points, define axis categories explicitly, control category axis ticks or markers, and specify the ordered set of categories to organize chart data visually according to these labels. This helps customize and control the categorical axis display, replacing default labels with user-defined category titles or names for bar charts, line charts, or other categorical visualizations.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryAxis: {
                categories: ["Q1", "Q2", "Q3", "Q4"]
            }
        }
    });
    </script>

### state.valueAxis `Array`

The value axis configuration options.

If set to `true` the category axis direction will be reversed. By default categories are listed from left to right and from bottom to top.


<div class="meta-api-description">
Control and customize the numerical axis of charts by setting options that define the scale type, label formatting, tick intervals, orientation, and direction of the value axis, including reversing the axis or adjusting label placement on the vertical or horizontal axis; this enables configuring axis directionality, scaling behavior, tick mark distribution, label rotation, and alignment for charts where the numerical data dimension needs precise display and ordering, supporting use cases like reversing categories, changing the numerical axis from ascending to descending, modifying tick placement strategies, and formatting numeric labels for better readability or specific styling requirements.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueAxis: {
                labels: {
                    color: "#666",
                    font: "12px Arial",
                    format: "{0:C}"
                },
                title: {
                    text: "Values",
                    color: "#333"
                },
                reverse: false
            }
        }
    });
    </script>

### state.valueAxis.labels `Object`

The axis labels configuration.


<div class="meta-api-description">
Control and customize the numeric axis labels on charts by setting label text, formatting options, visibility toggles, rotation angles, styling presets, font choices, and color schemes; adjust how values appear along the value axis with templates or formats to enhance readability, tailor presentation styles, and manage label display settings for clarity, appearance, and data interpretation on the chart’s numeric scale.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueAxis: {
                labels: {
                    color: "#333",
                    font: "11px Arial",
                    format: "{0:N0}",
                    rotation: 0
                }
            }
        }
    });
    </script>

### state.valueAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
Customize the color or text appearance of numeric or value axis labels on charts by defining any CSS-compatible color format such as hex codes, RGB, RGBA, HSL, or named colors to enhance readability, adapt to themes, control label styling, or enable contrasting visuals. This setting supports configuring label color for clearer data presentation, improving accessibility, adjusting text contrast against backgrounds, or matching chart aesthetics by setting CSS color values dynamically or statically on value axis numbers.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueAxis: {
                labels: {
                    color: "#0066cc"
                }
            }
        }
    });
    </script>

### state.valueAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels. Accepts a valid CSS color string, for example "20px 'Courier New'".


<div class="meta-api-description">
Adjust and configure the typography, font style, size, weight, family, and appearance of value axis labels in charts or graphs by specifying CSS font settings. Customize label fonts for readability and design consistency, including options to set font size, font family such as Courier New or Arial, font weight like bold or normal, font style including italic or normal, and combine these into a single CSS font string. Enable precise control over axis label text styling on chart components, supporting various font customization needs for data visualization, chart axis labeling, and graph presentation formatting.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueAxis: {
                labels: {
                    font: "14px 'Georgia'"
                }
            }
        }
    });
    </script>

### state.valueAxis.labels.format `String` *(default: "{0}")*

The format used to display the labels. Uses [kendo.format](/api/javascript/kendo/methods/format). Contains one placeholder ("{0}") which represents the category value.


<div class="meta-api-description">
Customize or configure the display format of numerical or value axis labels on charts by specifying formatting patterns, controlling how numbers, dates, or values appear, adjusting label presentation, applying custom formatting strings that include placeholders like {0}, enabling developers to set precision, currency, percentages, or date formats on axis labels, formatting scale labels for better readability, and managing the way numeric or categorical values are shown along the chart’s value axis.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueAxis: {
                labels: {
                    format: "{0:C2}"
                }
            }
        }
    });
    </script>

### state.valueAxis.labels.rotation `Number|String` *(default: 0)*

The rotation angle (in degrees) of the labels. By default the labels are not rotated. Angles increase clockwise and zero is to the left. Negative values are acceptable. Can be set to `"auto"` if the axis is horizontal in which case the labels will be rotated only if the slot size is not sufficient for the entire labels.


<div class="meta-api-description">
Control or configure the rotation angle of axis labels on a chart’s value axis to enhance readability by specifying degrees of rotation clockwise, including negative values for counter-clockwise tilt, or enable automatic adaptive rotation that dynamically adjusts label orientation based on available space, container size, or label length to prevent overlap and improve clarity on horizontal or vertical axes; frequently used to set manual fixed tilt, optimize label display in dense data visualizations, adjust text slant angle, or toggle between no rotation, fixed degree rotation, and automatic layout-aware rotation for better chart label presentation and user interface customization.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueAxis: {
                labels: {
                    rotation: -45
                }
            }
        }
    });
    </script>

### state.valueAxis.reverse `Boolean` *(default: false)*

If set to `true` the value axis direction will be reversed. By default categories are listed from left to right and from bottom to top.

> **Important**
>
> A reverse value axis is not supported for radar and polar charts.


<div class="meta-api-description">
Invert or flip the numeric value axis direction, reverse the scale order, enable descending or upward numeric axis orientation, set the value axis to count backwards, adjust axis values to run from high to low, toggle value axis mirroring or reversal for charts excluding radar and polar types, configure axis scaling to reverse numeric progression, change value axis direction from bottom-to-top or left-to-right to top-to-bottom or right-to-left for linear charts.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueAxis: {
                reverse: true
            }
        }
    });
    </script>

### state.valueAxis.title `Object`

The title configuration of the value axis.

> The [valueAxis.title.text](/api/javascript/dataviz/ui/chart#configuration-valueAxis.title.text) option must be set in order to display the title.


<div class="meta-api-description">
Set and customize the value axis label or title text for charts, controlling its display, positioning, styling, formatting, and rendering during chart initialization. Enable or configure how the numeric or value axis title appears, including setting text content, font, alignment, rotation, and visibility to improve chart readability and presentation. Adjust the configuration for axis label captions, axis description, or value axis headings to suit different charting needs, ensuring the title is properly shown and styled on the chart's value axis.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueAxis: {
                title: {
                    text: "Sales Amount",
                    color: "#333",
                    font: "14px Arial"
                }
            }
        }
    });
    </script>

### state.valueAxis.title.text `String`

The text of the title.

> The text can be split into multiple lines by using line feed characters ("\n").


<div class="meta-api-description">
Configure or update the label text for the chart’s value axis title, including setting or binding the axis caption, modifying or customizing the vertical axis header, and enabling multi-line titles with line breaks. Control the Y-axis title text dynamically through code or data binding, adjust axis labeling for clarity, and support splitting the axis title across multiple lines using newline characters to enhance chart readability and presentation.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueAxis: {
                title: {
                    text: "Revenue ($)"
                }
            }
        }
    });
    </script>

### state.valueAxis.title.color `String`

The color of the title.


<div class="meta-api-description">
Configure and customize the color of the chart’s value axis title text using CSS color formats such as named colors, hexadecimal codes, RGB, RGBA, or other valid color strings to control the appearance and styling of axis labels, match themes, adjust readability, and visually differentiate axis titles via color settings or styling properties.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueAxis: {
                title: {
                    color: "#009900"
                }
            }
        }
    });
    </script>

### state.valueAxis.title.font `String`

The font of the title.


<div class="meta-api-description">
Configure, customize, or set the font style, typeface, size, weight, color, or appearance of the value axis title in chart components to enhance readability and visual design. Enable control over the typography of the vertical or numeric axis label on charts, graphs, or data visualizations by defining font properties such as family, style, or formatting to match branding, themes, or user preferences during chart initialization or dynamic updates. Adjust the textual representation of axis titles in plotting libraries, dashboards, or reporting tools to improve clarity, accessibility, and aesthetic alignment with overall chart design.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueAxis: {
                title: {
                    font: "16px 'Segoe UI'"
                }
            }
        }
    });
    </script>

### state.legend `Object`

The chart legend configuration options.


<div class="meta-api-description">
Control and customize the chart legend’s visibility, placement, orientation, label content, styling, and item templates to tailor the legend’s layout and appearance during chart setup. Enable or disable showing the legend, choose its position on the chart (top, bottom, left, right), adjust orientation (horizontal or vertical), modify label formats, apply custom templates to legend items, and style fonts, colors, and spacing for interactive and readable legends. Configure how the legend displays to match different chart types, improve user comprehension, and enhance visual presentation by setting options that govern legend layout, interactivity, and text/graphic appearance in chart initialization.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            legend: {
                position: "bottom",
                visible: true,
                labels: {
                    color: "#333",
                    font: "12px Arial"
                }
            }
        }
    });
    </script>

### state.legend.labels `Object`

The chart legend label configuration.


<div class="meta-api-description">
Customize and control how chart legend labels display by configuring text content, formatting styles, templates, data bindings, and visual options to tailor label appearance in chart components. Enable dynamic label customization, set presentation attributes, format legend texts, bind labels to data sources or templates, and adjust styling for clarity, readability, and design consistency within interactive or static charts. Adjust label templates, content strings, or formatting rules to influence legend display for better visualization, user interface optimization, and data communication in charting environments.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            legend: {
                labels: {
                    color: "#444",
                    font: "11px Verdana"
                }
            }
        }
    });
    </script>

### state.legend.labels.color `String` *(default: "black")*

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
Customize the text color of legend labels in charts by configuring label colors to align with themes, data series, or design preferences using any valid CSS color format such as hex codes, RGB, RGBA, or named colors. Enable setting or changing legend label colors during chart creation or dynamically to enhance readability, match branding, distinguish series, or comply with accessibility standards related to legend text appearance and styling. Adjusting this property helps control visual consistency and clarity of legend text in data visualizations across different chart types and layouts.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            legend: {
                labels: {
                    color: "#666666"
                }
            }
        }
    });
    </script>

### state.legend.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels. Accepts a valid CSS color string, for example "20px 'Courier New'".


<div class="meta-api-description">
Adjust and customize the typography of legend labels by configuring font properties such as size, family, weight, and style to control how legend text appears in charts, enabling developers to set or change font styles, define label text appearance, control label readability, and apply specific font settings for legend captions including CSS-compatible font definitions during chart initialization or runtime.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            legend: {
                labels: {
                    font: "13px 'Tahoma'"
                }
            }
        }
    });
    </script>

### state.legend.position `String` *(default: "right")*

The positions of the chart legend.

The supported values are:

* "top" - the legend is positioned on the top.
* "bottom" - the legend is positioned on the bottom.
* "left" - the legend is positioned on the left.
* "right" - the legend is positioned on the right.
* "custom" - the legend is positioned using [legend.offsetX](/api/javascript/dataviz/ui/chart#configuration-legend.offsetX) and [legend.offsetY](/api/javascript/dataviz/ui/chart#configuration-legend.offsetY).


<div class="meta-api-description">
Adjust or configure the positioning of chart legends to display on the top, bottom, left, right, or a customized location using coordinate offsets, enabling control over legend alignment, placement, layout preferences, or custom offset positioning in charts, graphs, or data visualizations, with options to set legend location during initialization or dynamically manage the legend’s spatial arrangement within the chart area for enhanced readability and design flexibility.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            legend: {
                position: "top"
            }
        }
    });
    </script>

### state.legend.visible `Boolean` *(default: true)*

If set to `true` the chart will display the legend. By default the chart legend is visible.


<div class="meta-api-description">
Control the display of chart legends by toggling visibility on or off, configure whether the legend appears alongside data visualizations, enable or disable legend rendering to show labels and keys for chart elements, set legend display to visible or hidden during chart setup or runtime, adjust presence of explanatory legend information in graphs, manage label visibility for chart categories, switch legend on for clarity or off for minimalistic visuals, customize chart presentation by showing or hiding the legend component, and set legend visibility to true or false to control display of data descriptors in various chart types.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            legend: {
                visible: false
            }
        }
    });
    </script>

### state.seriesType `String`

The series type of the chart.

The supported series types are:

* 'column'
* 'bar'
* 'line'
* 'pie'
* 'scatter'


<div class="meta-api-description">
Configure or select the type of chart series to control the visual style and representation of data points within a chart, enabling the setting of series visualization as columns, bars, lines, pies, or scatter plots to fit various data structures and presentation needs. Adjust, customize, or switch between chart series formats like line graphs, bar charts, column visuals, pie charts, or scatter diagrams to best illustrate trends, comparisons, distributions, or relationships in your dataset. Whether you need to enable stacked columns, grouped bars, continuous lines, pie slices, or scattered points, this property helps tailor the chart rendering to match data characteristics and user preferences for effective data visualization and analysis.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            seriesType: "line"
        }
    });
    </script>

### state.stack `Boolean|Object` *(default: false)*

The stack configuration of the series.


<div class="meta-api-description">
Control and configure how multiple data series group and layer visually by stacking or combining values in charts, enabling developers to set stack groups, manage accumulation behavior, and determine the layering of series across categories or data points. Adjust how series overlap, aggregate, or appear on top of each other in stacked, grouped, or layered formats to customize chart display, compare cumulative totals, and create complex multi-series visualizations with flexible stacking options.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            stack: {
                type: "100%"
            }
        }
    });
    </script>

### state.stack.type `String`

The stack configuration of the series.

The supported stack values are:

* "normal"
* "100%"


<div class="meta-api-description">
Control and configure series stacking methods in chart visualizations by setting stacking type options that determine how multiple data series are layered or aggregated. Enable cumulative stacking where values stack normally to form a total sum, or switch to percentage-based stacking that scales series proportionally to 100%, allowing clear comparisons of parts to whole. Adjust stacking behavior for grouped or layered charts to display data as combined totals or relative percentages, supporting scenarios like stacked bar charts, area charts, or column charts. Set, enable, or customize stack modes to influence how data series overlap, aggregate, and visually represent combined or normalized values in chart plotting tools.
</div>

#### Example - set the "stack type" ChartWizard
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            defaultState: {
                stack: { type: "100%" }
            }
        });
    </script>

### state.categoryField `String`

The field which represents the configuration of the [series.categoryField](/api/javascript/ui/chartwizard#configuration-state.series.categoryField).


<div class="meta-api-description">
Specify or configure the data field or key that provides category labels or groups for chart series, enabling control over how categorical data is assigned, displayed, or mapped in chart visualizations; set or define which property in your data source determines the category axis values, category grouping, or legend categories for charts, allowing customization of category fields in chart series configuration through wizards or programmatic settings.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            categoryField: "month"
        }
    });
    </script>

### state.valueField `String`

The field which represents the configuration of the [series.valueField](/api/javascript/ui/chartwizard#configuration-state.series.valueField).


<div class="meta-api-description">
Set or configure the data field that determines the numeric or value data used for chart series, control which dataset column or property populates the series values, specify the source field for series data points, map specific data fields to chart series values, enable selection or modification of the value field driving the chart's data visualization, control which attribute or field from input data is interpreted as the series values, configure how the chart reads and applies value information for rendering series, customize or update the field that provides numerical data for chart plotting, assign or change the data source property that feeds series values, and manage the binding between data fields and the chart’s value display.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        state: {
            valueField: "sales"
        }
    });
    </script>

### defaultState `Object`

Specifies the default [seriesType](/api/javascript/ui/chartwizard#configuration-defaultState.seriesType) and [stack](/api/javascript/ui/chartwizard#configuration-defaultState.stack) of the ChartWizard component. If a [state](/api/javascript/ui/chartwizard#configuration-state) is not defined, the ChartWizard will use the values of the defaultState to create an initial state.


<div class="meta-api-description">
Configure the initial chart setup by defining the starting series type and stacking behavior, specifying how data series appear and whether they stack by default, enabling control over the default visualization mode, initial chart style, and base series configuration before any user changes or dynamic updates; set the foundational chart type and stacking option to control the chart wizard’s first rendered state and default data presentation format, including base series display, stacking method, and initial chart layout.
</div>

#### Example

    <div id="chart-wizard"></div>
    <script>
    $("#chart-wizard").kendoChartWizard({
        defaultState: {
            seriesType: "column",
            stack: {
                type: "normal"
            }
        }
    });
    </script>

### defaultState.seriesType `String`

Specifies series type of the chart.

The supported series types are:

* column
* bar
* line
* pie
* scatter


<div class="meta-api-description">
Set or customize the initial chart style by defining the default data visualization type such as column, bar, line, pie, or scatter for newly created charts. Control how the chart represents data series by choosing from categorical charts like bars and columns, continuous line graphs, proportional pie segments, or point-based scatter plots. Enable or configure the primary series rendering method to influence default chart display behaviors, helping to specify whether the chart uses bars, lines, pies, or scatter points as the default series type for data representation and visualization.
</div>

#### Example - set the "seriesType" ChartWizard
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            defaultState: {
                seriesType: 'pie'
            }
        });
    </script>

### defaultState.stack `Boolean|Object` *(default: false)*

The stack configuration of the series.


<div class="meta-api-description">
Configure how chart series stack or group by setting stacking behavior for initial chart states, including enabling stacked bar or area layouts, controlling overlapping versus cumulative values, adjusting series arrangement to show grouped or separate lines or columns, and specifying whether data series accumulate vertically or display side-by-side. This setting governs how multiple data series combine visually in default chart rendering, supporting options to stack values atop each other, group them without stacking, or leave them ungrouped for independent comparison. Enable, disable, or customize the stacking mode for series in default chart presentations to control aggregation, layered visualizations, and series sequencing.
</div>

#### Example - set the "stack" ChartWizard
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            defaultState: {
                stack: false
            }
        });
    </script>


### defaultState.stack.type `String`

The stack configuration of the series.

The supported stack values are:

* "normal"
* "100%"


<div class="meta-api-description">
Configure how chart series are combined and layered by controlling the stacking mode for multiple data series, enabling cumulative stacking with absolute values or normalized stacking where each segment reflects its percentage of the total per category, allowing selection between standard additive stacks and proportional 100 percent stacking to visualize relative contributions, adjust layering behavior in multi-series visualizations, set stacking to "normal" to sum values directly or "100%" to show percentage distribution, manage series overlap and aggregation in charts to present data comparisons either as totals or normalized shares.
</div>

#### Example - set the "stack type" ChartWizard
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            defaultState: {
                stack: { type: "100%" }
            }
        });
    </script>

### window `Object`

Specifies configuration for the [Window](/api/javascript/ui/window#configuration).


<div class="meta-api-description">
Configure and customize the popup dialog or modal window displayed by a chart wizard interface, controlling its appearance, size, position, modal behavior, draggable and resizable options, animations, and buttons or actions; set window titles, choose where to append the popup in the DOM, manage visibility, and handle events triggered on open or close to tailor the user interaction and visual presentation of chart configuration popups.
</div>

#### Example - set the "window" options for the ChartWizard 
    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
            dataSource: [
            [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
                ],
            ],
            window: {
                visible: false
            }
        });
    </script>

## Methods

### open

Opens the ChartWizard component.


<div class="meta-api-description">
Trigger or invoke the interactive chart setup wizard, launch the step-by-step chart configuration interface, programmatically open the chart customization dialog, initiate the chart builder tool after initialization, display the guided chart creation or modification process on demand, enable dynamic showing of chart setup screens, call to present chart design flows in response to user input or application events, activate the visual chart wizard interface for configuring chart properties, or set to open the chart configuration tool within your app logic.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    var chartwizard = $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: false
                }
            }).data("kendoChartWizard");
    setTimeout(() => {
        chartwizard.open()
    }, 1000);
    </script>

### close

Closes the ChartWizard component.


<div class="meta-api-description">
Control the dismissal, hiding, or programmatic closing of interactive wizard interfaces, enabling you to terminate, exit, cancel, or close modal or popup chart wizard UIs and end user sessions with the wizard component to return focus or control back to the main application flow.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    var chartwizard = $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: true
                }
            }).data("kendoChartWizard");
    setTimeout(() => {
        chartwizard.close()
    }, 1000);
    </script>

### destroy

Destroys the ChartWizard component.


<div class="meta-api-description">
remove or delete chart wizard instance, clear event listeners and handlers, detach related DOM elements and nodes, free up memory and resources occupied by the component, clean up stored data and internal state, disable or deactivate the chart wizard so it is no longer active or accessible, reset or teardown the chart wizard environment, completely dispose of the chart wizard to prevent leaks, stop all internal operations and interactions, prepare the component for reinitialization or complete removal from the page or application.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    var chartwizard = $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: true
                }
            }).data("kendoChartWizard");
    setTimeout(() => {
        chartwizard.destroy()
    }, 1000);
    </script>

### setOptions

Sets the provided options to the ChartWizard component.


<div class="meta-api-description">
configure or update chart visualization settings dynamically, modify runtime data display options, change appearance attributes, control interactive behavior, adjust chart parameters on the fly, customize chart styles and data rendering, set or refresh chart properties programmatically, enable immediate application of new chart configurations, manipulate chart options such as colors, labels, axes, and data sources, and manage real-time updates to chart presentation and interactivity within customizable dashboard or reporting tools.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    var chartwizard = $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: false
                }
            }).data("kendoChartWizard");
    setTimeout(() => {
        chartwizard.setOptions({
            window: {
                visible: true
            },
            defaultState: {
                seriesType: "pie"
            }
        })
    }, 1000);
    </script>

#### Parameters

##### options `Object`

The new set of options.

### setDataSource

Sets the provided dataSource to the ChartWizard component.


<div class="meta-api-description">
Configure or update the data input for a chart-building tool by setting or changing the source of data with options to bind new datasets, replace existing input arrays, or switch to different configurations including JavaScript objects, arrays, or data source instances, enabling dynamic updates and flexible manipulation of chart data after initialization for rendering and processing purposes.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    var chartwizard = $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: false
                }
            }).data("kendoChartWizard");
    setTimeout(() => {
        chartwizard.setDataSource([
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    ],
                ])
    }, 1000);
    </script>

#### Parameters

##### dataSource `kendo.data.dataSource`

The new dataSource.

### setDataColumns

Sets the provided [dataColumns](/api/javascript/ui/chartwizard#configuration-dataColumns) to the ChartWizard component.


<div class="meta-api-description">
Configure or update the data columns dynamically for chart field mappings, enabling runtime changes to which data fields are bound to the chart without restarting or reinitializing the visualization; set, modify, or switch the data columns that drive the chart’s data bindings, allowing flexible control over data source selection, field-to-chart mappings, and real-time updates to chart inputs programmatically by applying new column configurations directly to the chart setup.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    var chartwizard = $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: false
                }
            }).data("kendoChartWizard");
    setTimeout(() => {
        var dataSource = new kendo.data.DataSource({
                    type: "odata-v4",
                    transport: {
                        read: "https://demos.telerik.com/service/v2/odata/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 20,
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true
                });

    
        chartWizard.setDataColumns([
                    {
                        field: "OrderID",
                    },
                    {
                        field: "Freight",
                    },
                    {
                        field: "ShipName",
                        title: "Ship Name"
                    }, {
                        field: "ShipCity",
                        title: "Ship City"
                    }
                    ]); 
        chartwizard.setDataSource(dataSource);
    }, 1000);
    </script>

#### Parameters

##### dataColumns `Array`

The new dataColumns.

### getWizardDataFromDataRows

Prepares the data to be of an acceptable type for the ChartWizard.


<div class="meta-api-description">
Transform and normalize raw input data rows by mapping fields, converting data types, reshaping arrays and objects, and preparing datasets in the correct format for chart generation or visualization components; this process enables developers to convert various data structures into compatible, sanitized inputs for dynamic chart builders, data wizards, or visualization tools, ensuring seamless data handling from diverse sources, automatic type coercion, structural normalization, and convenient preprocessing for graphical rendering or analytics workflows.
</div>

#### Example
    <div id="chartwizard"></div>
    <script>
    const dataColumns = [
        {
            field: 'Product',
            title: 'Product Name'
        },
        {
            field: 'Quantity',
            title: 'Quantity'
        }
    ];

    const dataRows = [
        {
            dataItem: {
                ID: 216321,
                Product: 'Calzone',
                Quantity: 1
            },
            dataColumns
        },
        {
            dataItem: {
                ID: 546897,
                Product: 'Margarita',
                Quantity: 2
            },
            dataColumns
        },
        {
            dataItem: {
                ID: 456231,
                Product: 'Pollo Formaggio',
                Quantity: 1
            },
            dataColumns
        }
    ];

    const chartWizardData = window.kendo.ui.ChartWizard.getWizardDataFromDataRows(dataRows);

    var chartwizard = $("#chartwizard").kendoChartWizard({
                dataSource: chartWizardData,
                window: {
                    visible: true
                }
            }).data("kendoChartWizard");
    </script>

#### Parameters

##### dataRows `Array`

Array of objects with dataItem and dataColumns fields.


### generateDataRows

Prepares the DataRows for the ChartWizard component based on the provided data and columns.


<div class="meta-api-description">
Transform raw datasets and column configurations into the internal structured rows format suitable for chart rendering by mapping and converting input data into standardized data rows, enabling accurate association between data fields and chart elements such as series and axes, supporting dynamic data preparation, data binding, and visualization setup for graphical components that require well-formed input arrays derived from varied source data formats.
</div>

#### Example
    <div id="grid"></div>
    <button id="get">generateDataRows</button>
    <div id="chartwizard"></div>
    <script>
        $("#grid").kendoGrid({
                dataSource: {
                    data: [
                      {
                        ID: '1',
                        Product: 'Calzone',
                        Quantity: 1,
                        Price: 12.39,

                      }, {
                        ID: '2',
                        Product: 'Margarita',
                        Quantity: 2,
                        Price: 8.79,
                      }, {
                        ID: '3',
                        Product: 'Formaggio',
                        Quantity: 1,
                        Price: 13.99,
                        Tax: 2.8,
                        Total: 16.79
                      }, {
                        ID: '4',
                        Product: 'Greek Salad',
                        Quantity: 1,
                        Price: 9.49,
                      }, {
                        ID: '5',
                        Product: 'Blue Cheese',
                        Quantity: 3,
                        Price: 11.49,
                      }
                    ],
                    
                    schema: {
                        model: {
                            id: "ID"
                        }
                    }
                },
                selectable: {
                  mode: "multiple, cell",
                },
                scrollable: true,
                columns: [
                    {
                        field: "Product",
                        title: "Product",
                        width: 300
                    },
                    {
                        field: "Quantity",
                        width: 300,
                        title: "Quantity"
                    },
                    {
                        field: "Price",
                        title: "Price",
                    }
                ]
            });


            $("#chartwizard").kendoChartWizard({
                window: {
                  visible: false
                }
            });

            $("#get").kendoButton({
                click: () => {
                  const grid = $("#grid").data("kendoGrid");
                  const data = grid.getSelectedData();
                  const columns = grid.columns;

                  const wizardData = kendo.ui.ChartWizard.generateDataRows(data, columns);

                  const chartWizard = $("#chartwizard").data("kendoChartWizard");
                  chartWizard.setDataSource(wizardData);
                  chartWizard.open();
                }
            });
    </script>

#### Parameters

##### columns `Array`

The columns containing the data fields.

##### data `Array`

The dataItems.

## Events

### close

Triggered when a ChartWizard is closed either by the user or through the `close()` method.


<div class="meta-api-description">
Trigger actions or execute code when the chart wizard or configuration dialog closes, whether the user manually closes it or it is programmatically shut down. Detect closing events to perform cleanup tasks, save user selections or preferences, update the interface, persist state changes, run teardown routines, handle modal or popup dismissal, respond to exit or cancel actions, or trigger follow-up workflows after the chart creation process ends. Enable event-driven handling of dialog closure, wizard completion, or cancellation to maintain state consistency and update UI components accordingly.
</div>

#### Event Data

##### e.sender `kendo.ui.ChartWizard`

The widget instance.

#### Example - subscribing to the close event during initialization

    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: true
                },
                close: function (e) {
                    e.preventDefault();
                    console.log(e);
                },
            });
    </script>

#### Example - subscribing to the close event after initialization

    <div id="chartwizard"></div>
    <script>
        function chartwizard_close(e) {
            console.log(e);
        }
        $("#chartwizard").kendoChartWizard({
                    dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                        ],
                    ],
                    window: {
                        visible: true
                    },
                });
        var chartwizard = $("#chartwizard").data("kendoChartWizard");
        chartwizard.bind("close", chartwizard_close);
    </script>

### open

Triggered when a ChartWizard is opened through the `open()` method.


<div class="meta-api-description">
Detect when the chart wizard interface becomes visible or is activated to trigger initialization processes, load or refresh data sets, set user interface focus on specific elements, enable animations, or execute custom handling immediately upon opening; valuable for configuring event listeners, tracking component visibility changes, running setup tasks right after activation, or managing UI state transitions when the chart creation tool is launched or displayed.
</div>

#### Event Data

##### e.sender `kendo.ui.ChartWizard`

The widget instance.

#### Example - subscribing to the open event during initialization

    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: true
                },
                open: function (e) {
                    console.log(e);
                },
            });
    </script>

#### Example - subscribing to the open event after initialization

    <div id="chartwizard"></div>
    <script>
        function chartwizard_open(e) {
            console.log(e);
        }
        $("#chartwizard").kendoChartWizard({
                    dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                        ],
                    ],
                    window: {
                        visible: true
                    },
                });
        var chartwizard = $("#chartwizard").data("kendoChartWizard");
        chartwizard.bind("open", chartwizard_open);
    </script>

### change

Triggered when the ChartWizard changes its state.


<div class="meta-api-description">
Detect and handle updates or transitions within a step-by-step chart configuration process, triggering custom logic or validation whenever the wizard advances steps, modifies settings, or alters internal state. Enable event-driven responses to changes during interactive chart setup, capturing detailed change data to conditionally update UI components, synchronize related controls, or implement dynamic validation and feedback based on specific state modifications or configuration adjustments in the wizard workflow.
</div>

#### Event Data

##### e.sender `kendo.ui.ChartWizard`

The widget instance.

##### e.state `Object`

The state object instance.

#### Example - subscribing to the change event during initialization

    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: true
                },
                change: function (e) {
                    console.log(e);
                },
            });
    </script>

#### Example - subscribing to the change event after initialization

    <div id="chartwizard"></div>
    <script>
        function chartwizard_change(e) {
            console.log(e);
        }
        $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: true
                },
            });
        var chartwizard = $("#chartwizard").data("kendoChartWizard");
        chartwizard.bind("change", chartwizard_change);
    </script>

### exportPDF

Triggered when the ChartWizard export the chart to PDF.


<div class="meta-api-description">
Detect and handle events when a chart is exported or saved as a PDF file, enabling integration of custom actions like logging export activity, triggering analytics tracking, notifying users upon PDF creation, initiating post-export workflows or processing, capturing export triggers for automation, and controlling export completion with event listeners or handlers to smoothly incorporate PDF export functionality into your app’s workflow.
</div>

#### Event Data

##### e.sender `kendo.ui.ChartWizard`

The widget instance.

##### e.chart `kendo.ui.Chart`

The Chart widget instance.

##### e.exportOptions `Object`

The exportOptions object instance.

#### Example - subscribing to the exportPDF event during initialization

    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: true
                },
                exportPDF: function (e) {
                    console.log(e);
                },
            });
    </script>

#### Example - subscribing to the exportPDF event after initialization

    <div id="chartwizard"></div>
    <script>
        function chartwizard_exportPDF(e) {
            console.log(e);
        }
        $("#chartwizard").kendoChartWizard({
                    dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                        ],
                    ],
                    window: {
                        visible: true
                    },
                });
        var chartwizard = $("#chartwizard").data("kendoChartWizard");
        chartwizard.bind("exportPDF", chartwizard_exportPDF);
    </script>


### exportSVG

Triggered when the ChartWizard export the chart to SVG.


<div class="meta-api-description">
Detect and respond to chart export actions triggered during SVG generation, capturing events when the chart is saved or output as SVG format; enables running custom code, executing callbacks, handling post-export tasks like storing or uploading the SVG file, manipulating or accessing the exported vector graphic data, integrating export completion hooks, triggering UI updates or notifications after exporting charts in SVG, intercepting export workflow events for automation, logging, or modification of SVG content upon export operations.
</div>

#### Event Data

##### e.sender `kendo.ui.ChartWizard`

The widget instance.

##### e.chart `kendo.ui.Chart`

The Chart widget instance.

##### e.exportOptions `Object`

The exportOptions object instance.

#### Example - subscribing to the exportSVG event during initialization

    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: true
                },
                exportSVG: function (e) {
                    console.log(e);
                },
            });
    </script>

#### Example - subscribing to the exportSVG event after initialization

    <div id="chartwizard"></div>
    <script>
        function chartwizard_exportSVG(e) {
            console.log(e);
        }
        $("#chartwizard").kendoChartWizard({
                    dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                        ],
                    ],
                    window: {
                        visible: true
                    },
                });
        var chartwizard = $("#chartwizard").data("kendoChartWizard");
        chartwizard.bind("exportSVG", chartwizard_exportSVG);
    </script>

### exportImage

Triggered when the ChartWizard export the chart to Image.


<div class="meta-api-description">
Detect and handle the moment a chart is exported to an image file like PNG or JPEG, enabling you to trigger custom actions such as saving files, modifying or processing the exported image data, updating interface elements, logging export operations, or integrating export events into workflows. Capture export initiation events to programmatically respond when a chart is transformed into a downloadable or shareable image format, supporting automation, event-driven processing, UI feedback, error handling, or analytics related to image output generation and export triggers.
</div>

#### Event Data

##### e.sender `kendo.ui.ChartWizard`

The widget instance.

##### e.chart `kendo.ui.Chart`

The Chart widget instance.

##### e.exportOptions `Object`

The exportOptions object instance.

#### Example - subscribing to the exportImage event during initialization

    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: true
                },
                exportImage: function (e) {
                    console.log(e);
                },
            });
    </script>

#### Example - subscribing to the exportImage event after initialization

    <div id="chartwizard"></div>
    <script>
        function chartwizard_exportImage(e) {
            console.log(e);
        }
        $("#chartwizard").kendoChartWizard({
                    dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                        ],
                    ],
                    window: {
                        visible: true
                    },
                });
        var chartwizard = $("#chartwizard").data("kendoChartWizard");
        chartwizard.bind("exportImage", chartwizard_exportImage);
    </script>


### dataBinding

Fired before the widget binds to its data source.


<div class="meta-api-description">
Capture or hook into the phase just before the chart or wizard begins connecting to its data source to inspect, modify, validate, or transform incoming data and parameters, enable custom pre-processing, apply conditional checks, update UI elements or states before data rendering, and implement diagnostic or logging mechanisms during the data binding initialization or setup process.
</div>

#### Event Data

##### e.sender `kendo.ui.ChartWizard`

The widget instance.

##### e.data `kendo.ui.Chart`

The data to which the ChartWizard is about to bind.

#### Example - subscribing to the dataBinding event during initialization

    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: true
                },
                dataBinding: function (e) {
                    console.log(e);
                },
            });
    </script>

#### Example - subscribing to the dataBinding event after initialization

    <div id="chartwizard"></div>
    <script>
        function chartwizard_dataBinding(e) {
            console.log(e);
        }
        $("#chartwizard").kendoChartWizard({
                    dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                        ],
                    ],
                    window: {
                        visible: true
                    },
                });
        var chartwizard = $("#chartwizard").data("kendoChartWizard");
        chartwizard.bind("dataBinding", chartwizard_dataBinding);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.


<div class="meta-api-description">
Trigger actions or execute custom code immediately after data has been fully loaded and synchronized in the chart; respond to the completion of data binding by updating interface elements, initiating further data fetching, running analytics or calculations, handling post-render events, or managing workflows that depend on the chart’s data readiness and UI state changes once data connection and rendering are finalized.
</div>

#### Event Data

##### e.sender `kendo.ui.ChartWizard`

The widget instance.

##### e.data `kendo.ui.Chart`

The data to which the ChartWizard is bound.

#### Example - subscribing to the dataBound event during initialization

    <div id="chartwizard"></div>
    <script>
        $("#chartwizard").kendoChartWizard({
                dataSource: [
                [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                    ],
                ],
                window: {
                    visible: true
                },
                dataBound: function (e) {
                    console.log(e);
                },
            });
    </script>

#### Example - subscribing to the dataBound event after initialization

    <div id="chartwizard"></div>
    <script>
        function chartwizard_dataBound(e) {
            console.log(e);
        }
        $("#chartwizard").kendoChartWizard({
                    dataSource: [
                    [
                        { field: 'Product Name', value: 'Calzone' },
                        { field: 'Quantity', value: 1 },
                        { field: 'Price', value: 12.39 },
                        { field: 'Tax', value: 2.48 },
                        { field: 'Total', value: 14.87 }
                        ],
                    ],
                    window: {
                        visible: true
                    },
                });
        var chartwizard = $("#chartwizard").data("kendoChartWizard");
        chartwizard.bind("dataBound", chartwizard_dataBound);
    </script>
