---
title: PivotConfigurator
page_title: Configuration, methods and events of Kendo UI PivotConfigurator
description: Code examples for PivotConfigurator UI widget configuration, learn how to use it.
---

# kendo.ui.PivotConfigurator

Represents the Kendo UI PivotConfigurator widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### dataSource `Object|kendo.data.PivotDataSource`

The data source of the widget which is used to display values. Can be a JavaScript object which represents a valid data source configuration or an existing [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource)
instance.

If the `dataSource` option is set to a JavaScript object the widget will initialize a new [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
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
                discover: {
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

    <div id="configurator"></div>
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
            discover: {
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

    $("#configurator").kendoPivotConfigurator({
        dataSource: dataSource
    });
    </script>

### filterable `Boolean` *(default: false)*

If set to `true` the user will be able to filter by using the field menu.

#### Example - enable filtering

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
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
                discover: {
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

If set to `true` the user could sort the widget by clicking the dimension fields. By default sorting is disabled.

Can be set to a JavaScript object which represents the sorting configuration.

#### Example - enable sorting

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
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

### sortable.allowUnsort `Boolean` *(default: false)*

If set to `true` the user can get the widget in unsorted state by clicking the sorted dimension field.

#### Example - allow unsorting

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        sortable: {
            allowUnsort: true
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

### height `Number|String`

The height of the PivotConfigurator. Numeric values are treated as pixels.

#### Example - set the height as a number

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        height: "500px",
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

### messages `Object`

The text messages displayed in the fields sections.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        messages: {
            measures: "Drop Measure Here",
            columns: "Drop Column Here",
            rows: "Drop Rows Here",
            measuresLabel: "Measures",
            columnsLabel: "Columns",
            rowsLabel: "Rows",
            fieldsLabel: "Fields"
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
                discover: {
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

### messages.measures `String` *(default: "Drop Data Fields Here")*

The text messages displayed in the measure fields sections.

#### Example - setting measure fields section default text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        messages: {
            measures: "Drop Measure Here"
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
                discover: {
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

### messages.columns `String` *(default: "Drop Column Fields Here")*

The text messages displayed in the column fields sections.

#### Example - setting column fields section default text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        messages: {
            columns: "Drop Column Here"
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
                discover: {
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

### messages.rows `String` *(default: "Drop Rows Fields Here")*

The text messages displayed in the row fields sections.

#### Example - setting row fields section default text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        messages: {
            rows: "Drop Rows Here"
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
                discover: {
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

### messages.measuresLabel `String` *(default: "Measures")*

The text messages displayed for measure label.

#### Example - setting measure label text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        messages: {
            measuresLabel: "Values"
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
                discover: {
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

### messages.rowsLabel `String` *(default: "Rows")*

The text messages displayed for rows label.

#### Example - setting row label text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        rowsLabel: {
            rows: "Rows"
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
                discover: {
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

### messages.columnsLabel `String` *(default: "Columns")*

The text messages displayed for column label.

#### Example - setting column label text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        messages: {
            columnsLabel: "Columns"
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
                discover: {
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

### messages.fieldsLabel `String` *(default: "Fields")*

The text messages displayed for fields label.

#### Example - setting fields label text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        messages: {
            fieldsLabel: "Fields"
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
                discover: {
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        sortable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        sortable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
        filterable: true,
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
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
                discover: {
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
    var dataSource = $("#configurator").data("kendoPivotConfigurator").dataSource;
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
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
                discover: {
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

    var configurator = $("#configurator").data("kendoPivotConfigurator");
    configurator.destroy();
    </script>

### refresh

Refresh widget content

#### Example - refresh the widget

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
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
                discover: {
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

    var configurator = $("#configurator").data("kendoPivotConfigurator");
    configurator.refresh();
    </script>

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.PivotDataSource`

The data source to which the widget should be bound.

#### Example - set the data source

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfigurator({
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
                discover: {
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
        dataSource: {
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }],
            rows: [{ name: "[Product].[Product]" }],
            measures: ["[Measures].[Internet Sales Amount]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                discover: {
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

    var configurator = $("#configurator").data("kendoPivotConfigurator");
    configurator.setDataSource(dataSource);
    </script>

