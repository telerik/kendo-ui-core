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
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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

#### Example 

    <div id="chartwizard"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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

### dataColumns.title `String`

Sets the title of the column.

### exportOptions `Object`

Configure the options for the export functionality

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

### exportOptions.pdf.creator `String` *(default: "Kendo UI PDF Generator")*
The creator of the PDF document.

### exportOptions.pdf.date `Date`
The date when the PDF document is created. Defaults to `new Date()`.

### exportOptions.pdf.imgDPI `Number`
The forced resolution (in dpi) of the images in the exported PDF document.
By default, the images are exported at their full resolution.

### exportOptions.pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.

### exportOptions.pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.

### exportOptions.pdf.keywords `String` *(default: null)*
Specifies the keywords of the exported PDF file.

### exportOptions.pdf.landscape `Boolean` *(default: false)*
Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.

### exportOptions.pdf.margin `Object`
Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

### exportOptions.pdf.margin.bottom `Number|String` *(default: 0)*
The bottom margin. Numbers are considered as "pt" units.

### exportOptions.pdf.margin.left `Number|String` *(default: 0)*
The left margin. Numbers are considered as "pt" units.

### exportOptions.pdf.margin.right `Number|String` *(default: 0)*
The right margin. Numbers are considered as "pt" units.

### exportOptions.pdf.margin.top `Number|String` *(default: 0)*
The top margin. Numbers are considered as "pt" units.

### exportOptions.pdf.paperSize `String|Array` *(default: "auto")*
Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size. The supported paper sizes are: A0-A10, B0-B10, C0-C10, Executive, Folio, Legal, Letter, Tabloid.
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".

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

### exportOptions.pdf.title `String` *(default: null)*
Sets the title of the PDF file.

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

### messages.window `Object`

### messages.window.title `String`

Specifies the text in the title bar of the Window.

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

### messages.tab.chart `String`

Specifies the text of the chart tab.

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

### messages.chart.bar `Object`

Specifies the text of the bar chart panel.

### messages.chart.bar.expandText `String`

Specifies the title of the panel for bar chart.

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

### messages.chart.pie.expandText `String`

Specifies the title of the panel for pie chart.

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

### messages.chart.column.expandText `String`

Specifies the title of the panel for column chart.

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

### messages.chart.line.expandText `String`

Specifies the title of the panel for line chart.

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

### messages.chart.scatter.expandText `String`

Specifies the title of the panel for scatter chart.

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

### messages.data.configuration `Object`

Specifies the text of the configuration panel.

### messages.data.configuration.expandText `String`

Specifies the title of the configuration panel

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

### messages.data.configuration.series.title `String`

Specifies the text of the series legend of the configuration panel

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

### messages.format.chartArea `Object`

Specifies the text of the chartArea panel.

### messages.format.chartArea.expandText `String`

Specifies the title of the chartArea panel

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

### messages.format.chartArea.margins.default `String`

Specifies the text for the margins legend of the chartArea panel

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

### messages.format.chartArea.background.default `String`

Specifies the text for the background legend of the chartArea panel

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

### messages.format.title.expandText `String`

Specifies the title of the title panel

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

### messages.format.series.expandText `String`

Specifies the title of the series panel

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

### messages.format.legend.expandText `String`

Specifies the title of the legend panel

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

### messages.format.legend.position.default `String`

Specifies the text of label for the position editor of the legend panel

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

### messages.format.categoryAxis.expandText `String`

Specifies the title of the categoryAxis panel

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

### messages.format.categoryAxis.title.text `String`

Specifies the text for the title legend of the categoryAxis panel

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

### messages.format.categoryAxis.labels.text `String`

Specifies the text for the labels legend of the categoryAxis panel

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

### messages.format.categoryAxis.labels.rotation.text `String`

Specifies the text for the label of the rotation editor for the labels of the categoryAxis panel

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

### messages.format.valueAxis.expandText `String`

Specifies the title of the valueAxis panel

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

### messages.format.valueAxis.title.text `String`

Specifies the text for the title legend of the valueAxis panel

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

### messages.format.valueAxis.labels.text `String`

Specifies the text for the labels legend of the valueAxis panel

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

### messages.format.valueAxis.labels.labelFormat.default `String`

Specifies the text for the labels legend for labelsFormat editor of the valueAxis panel

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

### messages.format.valueAxis.labels.rotation.text `String`

Specifies the text for the label of the rotation editor for the labels of the valueAxis panel

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

### messages.format.xAxis.expandText `String`

Specifies the title of the xAxis panel

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

### messages.format.yAxis.expandText `String`

Specifies the title of the yAxis panel

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

### state.data `Array`

Specifies the data to be visualized in ChartWizard component.

> ChartWizard component needs a specific type of data(`ChartWizardDataRow`) to work as expected. This type of data, which is an array consists of single or multiple arrays of Objects, which have the `field` and `value` properties.

### state.initialSeries `Array`

The initial series configuration of the chart.

### state.initialSeries.categoryField `String` *(default: "category")*

The data item field which contains the category name or date.

> The points will be rendered in chronological order if the category is a date.

### state.initialSeries.name `String`

The name of the chart series which is visible in the legend.

### state.initialSeries.color `String`

The series base color. The supported values are:

* CSS color string, including hex and rgb
* function(point) - user-defined function that will be evaluated for each point. Returning `undefined` will assume the default series color.

### state.initialSeries.data `Array`

The array of data items which represent the series data.

Can be set to :

* Array of objects. Each point is bound to the field specified via the [series.field](/api/javascript/dataviz/ui/chart#configuration-series.field) option.
* Array of numbers. Supported when the [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) option is set to "bar", "column", "pie", or "line".
* Array of arrays of numbers. Supported when the [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) option is set to "scatter".
* Scatter and scatter line series need arrays of two values - X value and Y value

### state.initialSeries.field `String` *(default: "value")*

The data item field which contains the series value. **The field name should be a valid Javascript identifier and should contain only alphanumeric characters (or "$" or "_"), and may not start with a digit.**

### state.initialSeries.labels `Object`

The chart series label configuration.

> The chart displays the series labels when the [series.labels.visible](/api/javascript/dataviz/ui/chart#configuration-series.labels.visible) option is set to `true`.

### state.initialSeries.labels.visible `Boolean|Function` *(default: false)*

If set to `true` the chart will display the series labels. By default chart series labels are not displayed.

### state.initialSeries.stack `Boolean|String|Object` *(default: false)*

A boolean value indicating if the series should be stacked.
A string value is interpreted as [series.stack.group](/api/javascript/dataviz/ui/chart#configuration-series.stack.group).

> The `stack` options is supported when [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) is set to "bar", "column", or "line". All series in the stack must be of the same type.

> Stack settings of the first series are inherited as a default value by the rest of the series, in case they are not overridden.

### state.initialSeries.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.

### state.initialSeries.type `String` *(default: "column")*

The type of the series.

The supported values are:

* [`bar`](/controls/charts/chart-types/bar-charts)
* [`column`](api/javascript/dataviz/ui/chart/configuration/seriesdefaults.column)
* [`line`](/controls/charts/chart-types/line-charts)
* [`pie`](/controls/charts/chart-types/pie-charts)
* [`scatter`](/controls/charts/chart-types/scatter-charts)

### state.initialSeries.width `Number`

The line width.

> The `width` option is supported when [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) is set to "line".

### state.series `Array`

The configuration of the chart [series](/api/javascript/dataviz/ui/chart#configuration-series).

The series type is determined by the value of the type field.
If a type value is missing, the type is assumed to be the one specified in seriesDefaults.

> Some options accept function as argument. They will be evaluated for each point (supplied as parameter). The theme/seriesDefaults value will be used if no value is returned.

### state.series.categoryField `String` *(default: "category")*

The data item field which contains the category name or date.

> The points will be rendered in chronological order if the category is a date.

### state.series.name `String`

The name of the chart series which is visible in the legend.

### state.series.color `String|Function`

The series base color. The supported values are:

* CSS color string, including hex and rgb
* function(point) - user-defined function that will be evaluated for each point. Returning `undefined` will assume the default series color.

### state.series.data `Array`

The array of data items which represent the series data.

Can be set to :

* Array of objects. Each point is bound to the field specified via the [series.field](/api/javascript/dataviz/ui/chart#configuration-series.field) option.
* Array of numbers. Supported when the [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) option is set to "bar", "column", "pie", or "line".
* Array of arrays of numbers. Supported when the [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) option is set to "scatter".
* Scatter and scatter line series need arrays of two values - X value and Y value

### state.series.field `String` *(default: "value")*

The data item field which contains the series value. **The field name should be a valid Javascript identifier and should contain only alphanumeric characters (or "$" or "_"), and may not start with a digit.**

### state.series.labels `Object`

The chart series label configuration.

> The chart displays the series labels when the [series.labels.visible](/api/javascript/dataviz/ui/chart#configuration-series.labels.visible) option is set to `true`.

### state.series.labels.visible `Boolean|Function` *(default: false)*

If set to `true` the chart will display the series labels. By default chart series labels are not displayed.

### state.series.stack `Boolean|String|Object` *(default: false)*

A boolean value indicating if the series should be stacked.
A string value is interpreted as [series.stack.group](/api/javascript/dataviz/ui/chart#configuration-series.stack.group).

> The `stack` options is supported when [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) is set to "bar", "column", or "line". All series in the stack must be of the same type.

> Stack settings of the first series are inherited as a default value by the rest of the series, in case they are not overridden.

### state.series.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.

### state.series.type `String` *(default: "column")*

The type of the series.

The supported values are:

* [`bar`](/controls/charts/chart-types/bar-charts)
* [`column`](api/javascript/dataviz/ui/chart/configuration/seriesdefaults.column)
* [`line`](/controls/charts/chart-types/line-charts)
* [`pie`](/controls/charts/chart-types/pie-charts)
* [`scatter`](/controls/charts/chart-types/scatter-charts)

### state.series.width `Number`

The line width.

> The `width` option is supported when [series.type](/api/javascript/ui/chartwizard#configuration-state.series.type) is set to "line".

### state.title `Object|String`

The chart title configuration options or text.

### state.title.color `String`

The color of the chart title.

### state.title.font `String`

The font of the chart title.

### state.title.text `String`

The text of the chart title.

### state.subtitle `Object`

The chart subtitle configuration options or text.

### state.subtitle.color `String`

The color of the chart subtitle.

### state.subtitle.font `String`

The font of the chart subtitle.

### state.subtitle.text `String`

The text of the chart subtitle.

### state.area `Object` *(required)*

The chart area configuration options. Represents the entire visible area of the chart.

### state.area.background `String`

The background color of the chart area. Accepts a valid CSS color string, including hex and rgb.

### state.area.margin `Number|Object`

The margin of the chart area. A numeric value will set all margins.

### state.area.margin.bottom `Number`

The bottom margin of the chart area.

### state.area.margin.left `Number`

The left margin of the chart area.

### state.area.margin.right `Number`

The right margin of the chart area.

### state.area.margin.top `Number`

The top margin of the chart area.

### state.categoryAxis `Array` *(required)*

The category axis configuration options.

### state.categoryAxis.labels `Object`

The axis labels configuration.

### state.categoryAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

### state.categoryAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels. Accepts a valid CSS color string, for example "20px 'Courier New'".

### state.categoryAxis.labels.format `String` *(default: "{0}")*

The format used to display the labels. Uses [kendo.format](/api/javascript/kendo/methods/format). Contains one placeholder ("{0}") which represents the category value.

### state.categoryAxis.labels.rotation `Number|String` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated. Can be set to `"auto"` if the axis is horizontal in which case the labels will be rotated only if the slot size is not sufficient for the entire labels.

### state.categoryAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis labels. By default the category axis labels are visible.

### state.categoryAxis.title `Object`

The title configuration of the category axis.

> The [categoryAxis.title.text](/api/javascript/dataviz/ui/chart#configuration-categoryAxis.title.text) option must be set in order to display the title.

### state.categoryAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

### state.categoryAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

### state.categoryAxis.title.text `String`

The text of the title.

> The text can be split into multiple lines by using line feed characters ("\n").

### state.categoryAxis.reverse `Boolean` *(default: false)*

The reverse option of the axis.

### state.categoryAxis.categories `Array`

The category names. The chart will create a category for every item of the array.

### state.valueAxis `Array`

The value axis configuration options.

If set to `true` the category axis direction will be reversed. By default categories are listed from left to right and from bottom to top.

### state.valueAxis.labels `Object`

The axis labels configuration.

### state.valueAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

### state.valueAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels. Accepts a valid CSS color string, for example "20px 'Courier New'".

### state.valueAxis.labels.format `String` *(default: "{0}")*

The format used to display the labels. Uses [kendo.format](/api/javascript/kendo/methods/format). Contains one placeholder ("{0}") which represents the category value.

### state.valueAxis.labels.rotation `Number|String` *(default: 0)*

The rotation angle (in degrees) of the labels. By default the labels are not rotated. Angles increase clockwise and zero is to the left. Negative values are acceptable. Can be set to `"auto"` if the axis is horizontal in which case the labels will be rotated only if the slot size is not sufficient for the entire labels.

### state.valueAxis.reverse `Boolean` *(default: false)*

If set to `true` the value axis direction will be reversed. By default categories are listed from left to right and from bottom to top.

> **Important**
>
> A reverse value axis is not supported for radar and polar charts.

### state.valueAxis.title `Object`

The title configuration of the value axis.

> The [valueAxis.title.text](/api/javascript/dataviz/ui/chart#configuration-valueAxis.title.text) option must be set in order to display the title.

### state.valueAxis.title.text `String`

The text of the title.

> The text can be split into multiple lines by using line feed characters ("\n").

### state.valueAxis.title.color `String`

The color of the title.

### state.valueAxis.title.font `String`

The font of the title.

### state.legend `Object`

The chart legend configuration options.

### state.legend.labels `Object`

The chart legend label configuration.

### state.legend.labels.color `String` *(default: "black")*

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

### state.legend.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels. Accepts a valid CSS color string, for example "20px 'Courier New'".

### state.legend.position `String` *(default: "right")*

The positions of the chart legend.

The supported values are:

* "top" - the legend is positioned on the top.
* "bottom" - the legend is positioned on the bottom.
* "left" - the legend is positioned on the left.
* "right" - the legend is positioned on the right.
* "custom" - the legend is positioned using [legend.offsetX](/api/javascript/dataviz/ui/chart#configuration-legend.offsetX) and [legend.offsetY](/api/javascript/dataviz/ui/chart#configuration-legend.offsetY).

### state.legend.visible `Boolean` *(default: true)*

If set to `true` the chart will display the legend. By default the chart legend is visible.

### state.seriesType `String`

The series type of the chart.

The supported series types are:

* 'column'
* 'bar'
* 'line'
* 'pie'
* 'scatter'

### state.stack `Boolean|Object` *(default: false)*

The stack configuration of the series.

### state.stack.type `String`

The stack configuration of the series.

The supported stack values are:

* "normal"
* "100%"

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

### state.valueField `String`

The field which represents the configuration of the [series.valueField](/api/javascript/ui/chartwizard#configuration-state.series.valueField).

### defaultState `Object`

Specifies the default [seriesType](/api/javascript/ui/chartwizard#configuration-defaultState.seriesType) and [stack](/api/javascript/ui/chartwizard#configuration-defaultState.stack) of the ChartWizard component. If a [state](/api/javascript/ui/chartwizard#configuration-state) is not defined, the ChartWizard will use the values of the defaultState to create an initial state.

### defaultState.seriesType `String`

Specifies series type of the chart.

The supported series types are:

* column
* bar
* line
* pie
* scatter

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

Specifies configuration for the [Window](/api/javascript/ui/window/#configuration).

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
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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

#### Example
    <div id="chartwizard"></div>
    <script>
    const dataColumns: DataColumn[] = [
        {
            field: 'Product',
            title: 'Product Name'
        },
        {
            field: 'Quantity',
            title: 'Quantity'
        }
    ];

    const dataRows: DataRow[] = [
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
