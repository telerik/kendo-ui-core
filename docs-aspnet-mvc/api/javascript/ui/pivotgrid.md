---
title: PivotGrid
page_title: Configuration, methods and events of Kendo UI PivotGrid
description: Code examples for PivotGrid UI widget configuration, learn how to use methods and which events to set once the grid UI widget detail is initialized and expanded.
---

# kendo.ui.PivotGrid

Represents the Kendo UI PivotGrid widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### dataSource `Object|kendo.data.PivotDataSource`

The data source of the widget which is used to display values. Can be a JavaScript object which represents a valid data source configuration or an existing [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource)
instance.

If the `dataSource` option is set to a JavaScript object the widget will initialize a new [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource) instance the widget will use that instance and will **not** initialize a new one.

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                url: "http://demos.telerik.com/olap/msmdpump.dll",
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

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

### excel.fileName `String` *(default: "Export.xslx")*

Specifies the file name of the exported Excel file.

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
If set to true, the content will be forwarded to [proxyURL](#configuration-excel.proxyURL) even if the browser supports saving files locally.

### excel.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally.
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

### pdf.author `String` *(default: null)*

The author of the PDF document.

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
If set to true, the content will be forwarded to [proxyURL](#configuration-pdf.proxyURL) even if the browser supports saving files locally.

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

A proxy will be used when the browser isn't capable of saving files locally e.g. Internet Explorer 9 and Safari. PDF export is not supported in Internet Explorer 8 and below.

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

The [template](/api/javascript/kendo#methods-template) which renders the content of the column header cell. By default it renders the *caption* of the tuple member.

The fields which can be used in the template are:

* member - the member of the corresponding column header cell
* tuple - the tuple of the corresponding column header cell

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource#configuration-schema.axes).

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

The [template](/api/javascript/kendo#methods-template) which renders the content of the data cell. By default renders the formatted value (fmtValue) of the data item.

The fields which can be used in the template are:

* columnTuple - the tuple of the corresponding column header cell
* rowTuple - the tuple of the corresponding row header cell
* measure - the value of the data cell measure
* dataItem - the data item itself

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource#configuration-schema.axes).
About the data item structure review this [help topic](/api/javascript/data/pivotdatasource#configuration-schema.data).

#### Example - emphasize the values in *2005*

    <div id="pivotgrid"></div>

    <script id="dataCellTemplate" type="text/x-kendo-template">
        # if (columnTuple.members[0].name === "[Date].[Calendar].[Year].&[2005]") { #
            <em>#: kendo.toString(kendo.parseFloat(dataItem.value), "c2") #</em>
        # } else { #
            #: kendo.toString(kendo.parseFloat(dataItem.value), "c2") #
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

The [template](/api/javascript/kendo#methods-template) which renders the content of the `KPI Status` value. By default renders "open", "hold" and "denied" status icons.

The fields which can be used in the template are:

* columnTuple - the tuple of the corresponding column header cell
* rowTuple - the tuple of the corresponding row header cell
* measure - the value of the data cell measure
* dataItem - the data item itself

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource#configuration-schema.axes).
About the data item structure review this [help topic](/api/javascript/data/pivotdatasource#configuration-schema.data).

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
            measures: ["[Measures].[Internet Revenue Status]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: {
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

The [template](/api/javascript/kendo#methods-template) which renders the content of the `KPI Trend` value. By default renders "increase", "decrease" and "equal" status icons.

The fields which can be used in the template are:

* columnTuple - the tuple of the corresponding column header cell
* rowTuple - the tuple of the corresponding row header cell
* measure - the value of the data cell measure
* dataItem - the data item itself

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource#configuration-schema.axes).
About the data item structure review this [help topic](/api/javascript/data/pivotdatasource#configuration-schema.data).

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
            measures: ["[Measures].[Internet Revenue Trend]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: {
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

The [template](/api/javascript/kendo#methods-template) which renders the content of the row header cell. By default it renders the *caption* of the tuple member.

The fields which can be used in the template are:

* member - the member of the corresponding row header cell
* tuple - the tuple of the corresponding row header cell

For information about the tuple structure check this [link](/api/javascript/data/pivotdatasource#configuration-schema.axes).

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

The [data source](/api/javascript/data/pivotdatasource) of the widget. Configured via the [dataSource](#configuration-dataSource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](#methods-setDataSource) method instead.

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                        url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                        url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
    var dataSource = kendo.data.PivotDataSource({
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
                url: "http://demos.telerik.com/olap/msmdpump.dll",
                dataType: "text",
                contentType: "text/xml",
                type: "POST"
            }
        },
        schema: {
            type: "xmla"
        }
    });
    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    pivotgrid.setDataSource(dataSource);
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](#events-excelExport) event.

> Calling this method could trigger the browser built-in popup blocker in some cases. To avoid that, always call it as a response to an end-user action e.g. button click.

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](#events-pdfExport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.

#### Returns
`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](#events-pdfExport) event arguments.

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

#### Event Data

##### e.sender `kendo.ui.PivotGrid`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <div id="pivotgrid"></div>
    <script>
    $("#pivotgrid").kendoPivotGrid({
        height: 550,
        dataBound: function(e) {
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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

Fired when [`saveAsExcel`](#methods-saveAsExcel) method is called.

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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                read: {
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
                    url: "http://demos.telerik.com/olap/msmdpump.dll",
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
