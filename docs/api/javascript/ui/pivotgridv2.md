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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
            read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    var dataSource = $("#pivotgrid").data("kendoPivotGridV2").dataSource;
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true` the user could navigate the component using the keyboard navigation. By default keyboard navigation is disabled.

#### Example - enable keyboard navigation

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGridV2({
        navigatable: true,
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

> Check [Keyboard navigation](https://demos.telerik.com/kendo-ui/pivotgridv2/keyboard-navigation) for a live demo.

### excel `Object`

Configures the Kendo UI PivotGridV2 Excel export settings.

### excel.fileName `String` *(default: "Export.xslx")*

Specifies the file name of the exported Excel file.

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
                    url: "https://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "https://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "https://demos.telerik.com/olap/msmdpump.dll",
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

### pdf.author `String` *(default: null)*

The author of the PDF document.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.

### pdf.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce actual hyperlinks in the exported PDF file.

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](/api/javascript/ui/pivotgridv2#configuration-pdf.proxyURL) even if the browser supports saving files locally.

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.landscape `Boolean` *(default: false)*

Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as "pt" units.

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as "pt" units.

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as "pt" units.

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as "pt" units.

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### columnWidth `Number`

The width of the table columns. Value is treated as pixels.

> This option defines the **minimum** width of the column. If the widget is wider then (column numbers * column width) then the columns will be wider then the defined value. This is done to occupy all available space in the widget wrapper.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### height `Number|String`

The height of the PivotGridV2. Numeric values are treated as pixels.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### columnHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the column header cell. By default it renders the *caption* of the tuple member.

The fields which can be used in the template are:

* member - the member of the corresponding column header cell
* tuple - the tuple of the corresponding column header cell

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource/configuration/schema.axes).

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource/configuration/schema.axes).
About the data item structure review this [help topic](/api/javascript/data/pivotdatasource/configuration/schema.data).

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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

#### Example - specify a custom template for the KPI Status measure

    <div id="pivotgrid"></div>

    <script>
    $("#pivotgrid").kendoPivotGridV2({
        kpiStatusTemplate:({ dataItem }) => `${dataItem.value !== 0 ? "<em>Open/Denied</em>" : "<strong>Hold</strong>"}`,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true } ],
            measures: ["[Measures].[Internet Revenue Status]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: {
                    url: "https://demos.telerik.com/olap/msmdpump.dll",
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

#### Example - specify a custom template for the KPI Trend measure

    <div id="pivotgrid"></div>

    <script>
    $("#pivotgrid").kendoPivotGridV2({
        kpiTrendTemplate: ({ dataItem }) => `${dataItem.value !== 0 ? "<em>Increase/Decrease</em>" : "<strong>Equal</strong>"}`,
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true } ],
            measures: ["[Measures].[Internet Revenue Trend]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: {
                    url: "https://demos.telerik.com/olap/msmdpump.dll",
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

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource/configuration/schema.axes).

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

## Fields

### dataSource `kendo.data.PivotDataSourceV2`

The [data source](/api/javascript/data/pivotdatasourcev2) of the widget. Configured via the [dataSource](/api/javascript/ui/pivotgridv2/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/pivotgridv2/methods/setdatasource) method instead.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });

    //get reference to the widget data source
    var dataSource = $("#pivotgrid").data("kendoPivotGridV2").dataSource;
    </script>

## Methods

### cellInfo

Returns an information about a data cell at a specific column and row index.

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
                    read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                    read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.destroy();
    </script>

### refresh

Renders all content using the current data items.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.refresh();
    </script>

### setDataSource

Sets the data source of the widget.

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
                    read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.bind("dataBinding", dataBinding);
    </script>

### dataBound

Fired after the widget is bound to the data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.bind("dataBound", dataBound);
    </script>

### expandMember

Fired before column or row field is expanded.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.bind("expandMember", expandMember);
    </script>

### collapseMember

Fired before column or row field is collapsed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.bind("collapseMember", collapseMember);
    </script>

### pdfExport

Fired when the user clicks the "Export to PDF" toolbar button.

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
            alert("PDF export");
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
    pivotgrid.bind("pdfExport", function(e) {
        alert("PDF export");
    });
    pivotgrid.saveAsPDF();
    </script>
