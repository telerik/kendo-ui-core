---
title: PivotConfiguratorV2
page_title: Configuration, methods and events of Kendo UI PivotConfiguratorV2
description: Code examples for PivotConfiguratorV2 UI widget configuration, learn how to use it.
res_type: api
---

# kendo.ui.PivotConfiguratorV2

Represents the Kendo UI PivotConfiguratorV2 widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### dataSource `Object|kendo.data.PivotDataSourceV2`

The data source of the widget which is used to display values. Can be a JavaScript object which represents a valid data source configuration or an existing [kendo.data.PivotDataSourceV2](/api/javascript/data/pivotdatasourcev2)
instance.

If the `dataSource` option is set to a JavaScript object the widget will initialize a new [kendo.data.PivotDataSourceV2](/api/javascript/data/pivotdatasourcev2) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.PivotDataSourceV2](/api/javascript/data/pivotdatasourcev2) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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

    <div id="configurator"></div>
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

    $("#configurator").kendoPivotConfiguratorV2({
        dataSource: dataSource
    });
    </script>

### filterable `Boolean` *(default: false)*

If set to `true` the user will be able to filter by using the field menu.

#### Example - enable filtering

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### sortable `Boolean|Object` *(default: false)*

If set to `true` the user could sort the widget by using the field menu.

#### Example - enable sorting

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### height `Number|String`

The height of the PivotConfiguratorV2. Numeric values are treated as pixels.

#### Example - set the height as a number

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages `Object`

The text messages displayed in the fields sections.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        messages: {
            title: "Settings",
            cancelButtonText: "Cancel",
            applyButtonText: "Apply",
            measures: "Select Measures",
            columns: "Select Columns",
            rows: "Select Rows"
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

### messages.applyButtonText `String` *(default: "Apply")*

The text of the apply button.

#### Example - setting measure fields section default text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        messages: {
            applyButtonText: "Apply"
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

### messages.cancelButtonText `String` *(default: "Cancel")*

The text of the cancel button.

#### Example - setting measure fields section default text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        messages: {
            cancelButtonText: "Cancel"
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

### messages.measures `String` *(default: "Select some fields to begin setup")*

The text messages displayed in the measure fields section when empty.

#### Example - setting measure fields section default text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        messages: {
            measures: "Select Measures"
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

### messages.columns `String` *(default: "Select some fields to begin setup")*

The text messages displayed in the column fields section when empty.

#### Example - setting column fields section default text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        messages: {
            columns: "Select columns"
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

### messages.rows `String` *(default: "Select some fields to begin setup")*

The text messages displayed in the row fields section when empty.

#### Example - setting row fields section default text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        messages: {
            rows: "Select Rows"
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

### messages.title `String` *(default: "Settings")*

The title message in the configurator.

#### Example - setting measure fields section default text

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        messages: {
            tittle: "Configurator settings"
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


### messages.fieldMenu `Object`

The text messages displayed in the field menu.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        filterable: true,
        messages: {
            fieldMenu: {
                apply: "Apply",
                sortAscending: "Sort Ascending",
                sortDescending: "Sort Descending",
                filterFields: "Fields Filter",
                filter: "Filter",
                include: "Include Fields...",
                clear: "Clear",
                reset: "Reset"
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.apply `String` *(default: "Apply")*

The text message displayed for the apply button in the includes menu item.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        sortable: true,
        messages: {
            fieldMenu: {
              apply: "Filter"
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.sortAscending `String` *(default: "Sort Ascending")*

The text message displayed for the menu item which performs ascending sort.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.sortDescending `String` *(default: "Sort Descending")*

The text message displayed for the menu item which performs descending sort.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.filterFields `String` *(default: "Fields Filter")*

The text messages of the fields filter menu item.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.filter `String` *(default: "Filter")*

The text messages of the filter button.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.include `String` *(default: "Include Fields...")*

The text messages of the include menu item.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.clear `String` *(default: "Clear")*

The text of the clear filter expressions button.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.reset `String` *(default: "Reset")*

The text of the reset button in the filter includes menu item.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        filterable: true,
        messages: {
            fieldMenu: {
                reset: "Clear"
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators `Object`

The text of the filter operators displayed in the filter menu.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.contains `String` *(default: "Contains")*

The text of the "contains" filter operator.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.doesnotcontain `String` *(default: "Does not contain")*

The text of the "Does not contain" filter operator.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.startswith `String` *(default: "Starts with")*

The text of the "Starts with" filter operator.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.endswith `String` *(default: "Ends with")*

The text of the "Ends with" filter operator.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
                read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
        }
    });
    </script>


### navigatable `Boolean` *(default: false)*

If set to `true` the user could navigate the component using the keyboard navigation. By default keyboard navigation is disabled.

#### Example - enable keyboard navigation

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        filterable: true,
        navigatable: true,
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

### orientation `String` *(default: "vertical")*

Defines a value indicating the type of layout that the configurator has. Possible values are:

- "vertical"
- "horizontal"

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        filterable: true,
        orientation: "horizontal",
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

## Fields

### dataSource `kendo.data.PivotDataSourceV2`

The [data source](/api/javascript/data/pivotdatasourcev2) of the widget. Configured via the [dataSource](/api/javascript/ui/pivotconfigurator/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/pivotconfigurator/methods/setdatasource) method instead.

#### Example - get reference to the widget data source

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
    var dataSource = $("#configurator").data("kendoPivotConfiguratorV2").dataSource;
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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

    var configurator = $("#configurator").data("kendoPivotConfiguratorV2");
    configurator.destroy();
    </script>

### refresh

Refresh widget content

#### Example - refresh the widget

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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

    var configurator = $("#configurator").data("kendoPivotConfiguratorV2");
    configurator.refresh();
    </script>

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.PivotDataSourceV2`

The data source to which the widget should be bound.

#### Example - set the data source

    <div id="configurator"></div>
    <script>
        $("#configurator").kendoPivotConfiguratorV2({
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
            var configurator = $("#configurator").data("kendoPivotConfiguratorV2");
            configurator.setDataSource(dataSource);
        }, 2000);
    </script>

