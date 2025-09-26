---
title: PivotConfigurator
page_title: Configuration, methods and events of Kendo UI PivotConfigurator
description: Code examples for PivotConfigurator UI widget configuration, learn how to use it.
res_type: api
---

# kendo.ui.PivotConfigurator

Represents the Kendo UI PivotConfigurator widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### dataSource `Object|kendo.data.PivotDataSource`

The data source of the widget which is used to display values. Can be a JavaScript object which represents a valid data source configuration or an existing [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource)
instance.

If the `dataSource` option is set to a JavaScript object the widget will initialize a new [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.PivotDataSource](/api/javascript/data/pivotdatasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
Configure, set, or bind the pivot table data source by providing either a JavaScript object with data source settings or an existing pivot data source instance for aggregation, field definitions, and value calculations. Enable reuse of pre-configured data sources or supply new configurations to control how pivot data is aggregated and displayed, including toggling between object-based configurations or linked data source instances for dynamic pivot grid setups, data binding, and flexible data aggregation management.
</div>

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

    $("#configurator").kendoPivotConfigurator({
        dataSource: dataSource
    });
    </script>

### filterable `Boolean` *(default: false)*

If set to `true` the user will be able to filter by using the field menu.


<div class="meta-api-description">
Control the ability to enable or disable interactive data filtering directly from each field's context menu within a pivot grid or table, allowing users to set, apply, or configure filters on individual data columns or fields through an embedded filter interface. This option lets users activate or deactivate per-column or per-field filtering user interfaces, customize filtering interactions like enabling filter dropdowns or menus within a pivot table or data grid view, and govern how end-users can refine, search, or narrow down dataset results using filter controls integrated into field menus for dynamic data exploration and analysis.
</div>

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

If set to `true` the user could sort the widget by clicking the dimension fields. By default sorting is disabled.

Can be set to a JavaScript object which represents the sorting configuration.


<div class="meta-api-description">
Configure interactive sorting for dimension fields in pivot tables by enabling click-to-sort functionality, allowing users to reorder data dynamically by clicking on dimensions. Control whether sorting is enabled or disabled, toggle sorting interactivity, set sorting preferences, or define custom sorting behavior using configuration objects. Support scenarios where users want to enable or disable sortable columns, customize sorting logic, implement drag-and-drop reorder, or configure multi-dimensional sorting in data visualization tools and pivot table interfaces. Adjust sortable settings to enhance user experience with flexible and customizable sorting options on rows or columns in pivot configurations.
</div>

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

### sortable.allowUnsort `Boolean` *(default: false)*

If set to `true` the user can get the widget in unsorted state by clicking the sorted dimension field.


<div class="meta-api-description">
Control whether users can remove or clear sorting on a data dimension by toggling the sort order, enabling or disabling the ability to unset or reset sorting on a column or field in a pivot configuration interface, allowing clicks on sorted headers to switch between ascending, descending, or no sort states, providing flexibility to enable, disable, or allow unsorting actions when managing how data is ordered in interactive pivot tables or data grids.
</div>

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

The height of the PivotConfigurator. Numeric values are treated as pixels.


<div class="meta-api-description">
Adjust, set, or control the vertical dimension, height, or size of a user interface component to manage layout spacing, constrain or fix its rendered height within containers, configure pixel-based height values for precise visual fitting, control scrollable area behavior by limiting vertical space, define or restrict component height to optimize layout flow, establish fixed or dynamic vertical measurements to ensure consistent design, manage the container’s vertical footprint, and customize the element’s height for responsive or static layouts.
</div>

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
Customize and translate the user interface text within the pivot configurator fields and sections by setting, modifying, or overriding language strings and messages to support localization, internationalization, and multilingual display for user prompts, labels, headings, and field descriptions in pivot configuration panels or builders.
</div>

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

### messages.measures `String` *(default: "Drop Data Fields Here")*

The text messages displayed in the measure fields sections.


<div class="meta-api-description">
Configure or customize the display text, labels, or localization strings for metric fields, numerical data sections, or measurement areas in a pivot table or data summarization tool, enabling adjusting or overriding default wording for measures, values, or aggregated data captions shown within the configuration panel or interface used to control data visualization settings.
</div>

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

### messages.columns `String` *(default: "Drop Column Fields Here")*

The text messages displayed in the column fields sections.


<div class="meta-api-description">
Customize, localize, or set the display text and labels for column fields in pivot table configuration interfaces, enabling control over column names, captions, or headers shown to users. Support for changing default column field messages, renaming columns dynamically, translating column labels into different languages, adjusting UI text for columns in pivot configurators, and modifying column-related strings during pivot table setup or configuration. This includes configuring column headings, altering column field titles, and personalizing the textual representation of columns within pivot table settings for enhanced clarity, localization, and user experience.
</div>

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

### messages.rows `String` *(default: "Drop Rows Fields Here")*

The text messages displayed in the row fields sections.


<div class="meta-api-description">
Customize and translate row labels in pivot table configurations by defining the exact wording, text, or language used for row field names, enabling localization, label customization, internationalization, or setting descriptive names for rows in pivot table interfaces or data summaries.
</div>

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

### messages.measuresLabel `String` *(default: "Measures")*

The text messages displayed for measure label.


<div class="meta-api-description">
Customize or translate the label text for measures or metrics displayed in the pivot table configuration interface, enabling setting, localizing, renaming, or controlling the text that identifies numerical data fields or aggregated values in the pivot configurator's user interface. This covers adjusting the measures caption, changing the default measures label, configuring language-specific terms for metrics, and tailoring the way measurement categories appear when organizing or filtering data in pivot setups.
</div>

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

### messages.rowsLabel `String` *(default: "Rows")*

The text messages displayed for rows label.


<div class="meta-api-description">
Adjust, set, or configure the label text for row headers in the pivot table settings interface, enabling localization or custom wording for the rows section title, translations, language adaptation, and personalized display of row-related labels within data configuration panels, headers, or pivot grid message areas.
</div>

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

### messages.columnsLabel `String` *(default: "Columns")*

The text messages displayed for column label.


<div class="meta-api-description">
Set, customize, or configure the text label displayed for column headers, column names, or column titles in a pivot table configurator interface, including options to change or override default column labels, adjust the wording for column selectors, and control how column-related labels appear in report or data pivot setup menus.
</div>

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

### messages.fieldsLabel `String` *(default: "Fields")*

The text messages displayed for fields label.


<div class="meta-api-description">
Customize or configure the label text displayed for the fields section in pivot configurators, control the wording or language of field indicators, set or localize the interface text for field selectors, modify or translate the fields label to match different languages or terminology preferences, adjust UI text for pivot field headers, enable text changes for the fields label to suit specific vocabularies or localization requirements, tailor field naming conventions, manage the caption or title shown above field lists, optimize the wording for user clarity in field selection areas, and support multilingual or customized text for pivot table field labels.
</div>

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
Customize and localize the text labels and messages displayed in the field menu of a pivot configurator, enabling control over language translation, label wording, interface text, and menu prompts for better user experience across different languages and regional settings, including adjusting terminology, renaming menu items, tailoring field options text, and supporting multilingual UI customization in data pivot table configurations.
</div>

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
Customize or set the informational text, tooltips, hints, or guidance messages displayed in field filters or menus within a pivot configurator or data field selector, enabling localization, translation, or modification of the filter info content seen by users when interacting with field menus, filters, or options in pivot tables or data grids, controlling how explanatory or instructional text appears in filtering interfaces to match different languages, user preferences, or contextual needs.
</div>

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
Customize or configure the label text, caption, or menu item name for ascending sort options in field menus, enabling control over how sorting directions like ascending order appear in pivot table or data grid configuration menus. Adjust, localize, or set the text shown for sorting ascending within field or column menus, tailoring user interface messages related to sorting direction to suit different languages, contexts, or style preferences. This includes modifying the ascending sort label for dynamic menus used in data pivot configurations and enabling clear, intuitive sorting prompts in configurable menu fields.
</div>

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
Customize or configure the text label, caption, or wording displayed for descending sort options in pivot table or grid field menus, enabling adjustment of sort order descriptions, sorting commands, or menu items related to sorting data in reverse order, descending arrangement, or highest-to-lowest sequences within configurable pivot components or data visualization controls.
</div>

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
Customize or localize the label text displayed for filtering fields within the pivot table's field menu, enabling control over the wording of field filter options, setting custom captions for the filter fields menu item, adjusting the filter label in the field selection interface, configuring the field filtering text in localization scenarios, and tailoring how the filter fields menu is named to suit different languages, UI preferences, or terminology.
</div>

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
Customize, set, or configure the text label, caption, or wording used for filter buttons within pivot table configurations, allowing control over the filtering interface language, button titles, and menu prompts in field menus, enabling developers to localize, rename, or adjust filter-related UI elements and labels for enhanced clarity, user experience, and internationalization in pivot configurator components.
</div>

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
Customize or localize the text label for the include option in a pivot table configuration menu, enabling developers to set, control, or modify the displayed name of the include item within field menus. This functionality supports changing, translating, or adjusting the menu item text that controls inclusion settings in pivot configurators, allowing for tailored field menu customization or localization of interface labels related to including fields or data elements.
</div>

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
Set, customize, or localize the title text appearing on the include fields dialog within a pivot table configuration interface, enabling control over the displayed heading for field selection menus, adjusting the dialog label to match different languages, user preferences, or UI themes, and tailoring the text for accessibility and clearer user guidance during pivot table field inclusion setup or modification.
</div>

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
Set or customize the label, text, or caption for the button that clears or resets filter expressions, filter criteria, or applied filters within pivot table configuration menus, enabling localization, internationalization, or custom naming for user interface elements that remove all active filters or expressions in data pivot controls or data slicing tools.
</div>

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
Customize or localize the confirmation button text in pivot table field selection dialogs by configuring the label for the OK or submit button, enabling developers to set, change, or translate the acceptance action text in field menus, dialog boxes, or selection interfaces within pivot configurator components.
</div>

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
Customize, change, or set the text label for the cancel button in the field selection or include fields dialog within pivot configurators, enabling control over the cancel action wording, button captions, or dismissal prompts when managing field menus, supporting localization, user interface adjustments, or renaming cancel controls during pivot table configuration and field inclusion tasks.
</div>

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
Customize, configure, or localize the text labels for all filter operators in the field menu of a pivot table or data grid, enabling control over the display names for comparison operators like equals, not equals, greater than, less than, contains, starts with, ends with, and other filtering criteria. Adjust operator names for internationalization, translation, or personalized wording in user interfaces where users select or configure filters, conditions, or rules within pivot table controls or data exploration tools. Support customization of filtering operator labels to match language preferences, branding, or specific terminology used in data analysis, reporting, and interactive dashboards.
</div>

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
Customize or configure the text label, display string, or wording for the "contains" filter operator used in pivot table field menus, enabling localization, translation, or setting custom filter operator names for "contains" conditions in data filtering, search queries, or field menu operator options within pivot table configurators or data grid filters.
</div>

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
Customize or translate the label, text, or wording for the filter operator that excludes items containing specific values in pivot table field menus, enabling localization, internationalization, or renaming of the "does not contain" filter option used in filtering data sets, pivot grid fields, or drop-down menus to reflect alternative phrases like "not including," "excluding," or "without substring" across different languages or dialects.
</div>

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
Customize or translate the filter label for string conditions that match values beginning with specific characters, enabling configuration of the "starts with" operator text in pivot table or grid field menus, adjusting localization or language support for filter options that check if data entries begin with certain prefixes, controlling how the filtering operator for initial substring matches appears in user interfaces, setting or modifying the display text for filters targeting values that start with specified sequences.
</div>

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
Customize or translate the label for the "Ends with" filter option in the field menu of a pivot grid, enabling you to set, configure, or localize the text that appears when filtering data based on suffix matching. This control supports changing, renaming, or adapting the operator name used in filter menus to match different languages, user preferences, or interface requirements for suffix-based string filters. Adjust, define, or localize the terminology for filtering entries that end with specific characters or substrings in pivot table configurations.
</div>

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
Set or customize the label text for the equality filter operator used in field menus, enabling control over how "equal to," "equals," or "is equal" conditions appear in pivot table configuration interfaces, filter expressions, or query builders, including adapting terminology for localization, user-friendly phrasing, or specialized comparison operators when specifying exact matches in data filtering and conditional logic.
</div>

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
Control or customize the label and display text for the "not equal," "!=" filter operator, exclusion filter, inequality condition, or non-matching value comparison in field menu filters, pivot table configurators, data filtering interfaces, or operator menus to tailor how the "does not equal" option appears across filter settings, enabling clear, localized, or customized wording for conditions that exclude specific values or handle inequality logic in data queries and configurations.
</div>

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

The [data source](/api/javascript/data/pivotdatasource) of the widget. Configured via the [dataSource](/api/javascript/ui/pivotconfigurator/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/pivotconfigurator/methods/setdatasource) method instead.


<div class="meta-api-description">
Control and manage the underlying data source connected to the pivot configuration interface for binding, updating, and synchronizing pivot table data dynamically; configure, modify, or replace the input dataset used by the pivot setup, enabling changes to data structure, filtering, sorting, or recalculations to be reflected seamlessly in the pivot view, with direct assignment prevented in favor of designated methods to update or reset the bound data source object, supporting use cases involving real-time data updates, data mutations, integration with various data inputs, and ensuring consistent synchronization between the pivot UI and its data backend.
</div>

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
    var dataSource = $("#configurator").data("kendoPivotConfigurator").dataSource;
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.


<div class="meta-api-description">
Release resources and clean up by properly disposing of the pivot configurator instance to prevent memory leaks, detach event listeners, clear data attributes, and recursively destroy any nested Kendo components, ensuring all associated handlers and internal references are removed while keeping the DOM element intact, supporting safe teardown, garbage collection, and efficient resource management without affecting the visual container or requiring manual DOM removal.
</div>

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

    var configurator = $("#configurator").data("kendoPivotConfigurator");
    configurator.destroy();
    </script>

### refresh

Refresh widget content


<div class="meta-api-description">
Trigger immediate update or redraw of the pivot table or pivot configurator to apply changes in filters, data, settings, or layout without recreating the entire component instance; refresh the view programmatically to force the pivot interface to reload its content, re-render the user interface, update displayed results, and synchronize with the latest configurations, data sources, or filter modifications, ensuring instant reflection of changes when dynamically adjusting pivot configurations or data inputs.
</div>

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

    var configurator = $("#configurator").data("kendoPivotConfigurator");
    configurator.refresh();
    </script>

### setDataSource

Sets the data source of the widget.


<div class="meta-api-description">
Change or update the data source dynamically for a pivot table configurator by binding new data at runtime, whether using a fresh data configuration object, a prebuilt data source instance, or a simple array of data. This method enables refreshing, resetting, swapping, or reassigning the underlying dataset for pivot layout and aggregation recalculation without needing to recreate or reload the component. It supports modifying the source data in use, updating displayed results instantly, reconfiguring data connections, and controlling dataset inputs on the fly for interactive or programmatic data manipulation scenarios.
</div>

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
                discover: {
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
            var configurator = $("#configurator").data("kendoPivotConfigurator");
            configurator.setDataSource(dataSource);
        }, 2000);
    </script>

