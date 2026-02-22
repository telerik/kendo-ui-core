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


<div class="meta-api-description">
How do I configure the data source for Kendo UI Pivot Grid V2 using the dataSource property? Configure or set the source of data for pivot grid configuration by binding to a JavaScript object or an existing pivot data instance, enabling flexible assignment of data inputs, controlling the origin of pivot values, linking to custom or pre-initialized data sources, switching between raw data and instantiated data models, using either complex data configurations or direct data provider references, adjusting where and how pivot data is retrieved and managed, selecting data containers for pivot analysis, and integrating various data structures for pivot operations.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
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
            read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
        }
    });

    $("#configurator").kendoPivotConfiguratorV2({
        dataSource: dataSource
    });
    </script>

### filterable `Boolean` *(default: false)*

If set to `true` the user will be able to filter by using the field menu.


<div class="meta-api-description">
How do I enable filtering options in Kendo UI PivotGridV2? Control the ability to enable or disable filtering options within pivot table field menus, allowing users to apply, configure, or manage filters directly on pivot data columns through context menus or UI filters when interacting with pivot grid components; this setting governs whether end users can activate filter dialogs, refine displayed data via field-menu filters, toggle filter functionality on or off in pivot data views, and customize filtering behavior during the pivot table setup or initialization phase.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### sortable `Boolean|Object` *(default: false)*

If set to `true` the user could sort the widget by using the field menu.


<div class="meta-api-description">
How do I enable interactive sorting of pivot table data in Kendo UI for jQuery? Enable or disable interactive sorting of pivot table data through field menus, allowing users to control and apply sort orders on individual fields directly within the pivot grid interface; configure whether end-users can reorder rows or columns by sorting on specific fields, toggle sorting capabilities in the pivot table's configurator or initialization settings to permit dynamic sorting actions and field-level sort commands for enhanced data organization and analysis flexibility.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### height `Number|String`

The height of the PivotConfiguratorV2. Numeric values are treated as pixels.


<div class="meta-api-description">
How do I set a fixed height for a Kendo UI PivotConfiguratorV2 component? Adjust or specify the vertical dimension, height, or pixel size of a pivot configuration component to control its layout, scrolling behavior, visible area, or container size. Enable fixed or dynamic vertical sizing by setting height values during initialization or configuration, allowing for precise control over component height in pixels to manage content overflow, display area, or user interface layout constraints within pivot or tabbed navigation elements.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages `Object`

The text messages displayed in the fields sections.


<div class="meta-api-description">
How do I customize the field section labels in a Kendo UI PivotConfiguratorV2? Customize, localize, or configure the display text labels and messages within field sections of a pivot configurator interface by setting or overriding default captions, placeholders, prompts, instructions, or hints. Enable or adjust language-specific strings, translations, or terminology for better internationalization, user-friendly field section wording, or tailored UI messages in pivot table configuration scenarios. Control the text content appearing in configuration areas, field selectors, or headers to match localization needs, custom wording preferences, or multilingual user contexts.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.applyButtonText `String` *(default: "Apply")*

The text of the apply button.


<div class="meta-api-description">
How do I customize the apply button label in Kendo UI Pivot Grid V2 configuration? Customize the label text, caption, or wording for the apply button in a pivot grid configuration interface, enabling localization, translation, or setting custom apply button names for user actions, confirmation controls, or submit buttons within pivot table configurators, letting developers configure, change, or override the default apply button text to fit different languages, UI themes, or user preferences in data analysis or reporting tools.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.cancelButtonText `String` *(default: "Cancel")*

The text of the cancel button.


<div class="meta-api-description">
How do I change the cancel button text in Kendo UI PivotGridV2 configurator? Set or customize the text label displayed on the cancel button within the pivot configuration interface to support localization, adapt UI language, change button captions, configure cancel action text, override default cancel labels, and control user interface wording for cancellation functions in data pivot controls.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.measures `String` *(default: "Select some fields to begin setup")*

The text messages displayed in the measure fields section when empty.


<div class="meta-api-description">
What is the default message displayed when no measure data is available in Kendo UI PivotGridV2? Customize or configure the text displayed when no measure data is available, control the placeholders or empty-state messages for measure fields, set custom alerts or prompts shown during empty measure selections, localize or translate default messages that appear when measure values are missing or unpopulated, define user notifications or labels displayed for empty or absent measures in pivot or data configuration tools, adjust the wording and language of empty measure indicators to improve clarity or user experience in analytics and reporting interfaces.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.columns `String` *(default: "Select some fields to begin setup")*

The text messages displayed in the column fields section when empty.


<div class="meta-api-description">
How do I customize the "no columns" message in Kendo UI Pivot Grid V2? Customize or set the placeholder text, notification, or message displayed when there are no columns in the fields area; control, configure, or change the empty state text for column section, column headers, or column placeholders in pivot table or data grid interfaces; update labels, prompts, or empty column messages to guide users when no column fields are selected or available.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.rows `String` *(default: "Select some fields to begin setup")*

The text messages displayed in the row fields section when empty.


<div class="meta-api-description">
How to customize the row field placeholder text in Kendo UI PivotGridV2? Customize or configure the placeholder text, default messages, or empty-state prompts shown in the row fields area of the pivot table layout tool to support localization, internationalization, or user-friendly hints, including setting fallback text when no data or selections are present in the rows section. Adjust, localize, or define custom empty messages, placeholder labels, or default strings for row configurations in pivot table builders or data summary interfaces, enhancing clarity and user guidance in different languages or contexts.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.title `String` *(default: "Settings")*

The title message in the configurator.


<div class="meta-api-description">
How do I customize the title in the Kendo UI for jQuery Pivot Configurator V2 interface? Control or customize the header text or label displayed at the top of a pivot configurator interface, enabling you to set, change, localize, translate, or configure the title seen by users, adjust the heading text in pivot configurator components, and manage how the main title or caption appears across different languages and contexts for better user experience and interface clarity.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>


### messages.fieldMenu `Object`

The text messages displayed in the field menu.


<div class="meta-api-description">
How to customize the field menu messages in Kendo UI PivotConfiguratorV2? Customize, translate, or override the displayed text labels, prompts, and messages within the field menu of a pivot configurator interface, enabling localization and personalized wording for menu options, tooltips, and interface elements related to field selection, filtering, sorting, and configuration controls. This supports modifying default language strings, changing prompts for better user comprehension, adapting menu text for internationalization, and tailoring the field menu's user-facing messages to fit specific application contexts or user preferences in data pivoting tools.
</div>

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
                reset: "Reset",
                moveToColumns: "Move to Columns",
                moveToRows: "Move to Rows",
                movePrevious: "Move as Previous",
                moveNext: "Move as Next",
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

### messages.fieldMenu.apply `String` *(default: "Apply")*

The text message displayed for the apply button in the includes menu item.


<div class="meta-api-description">
How do I customize the apply button label in Kendo UI for jQuery PivotGridV2? Customize the text label or caption of the apply button within the field menu or includes menu of a pivot configuration interface, enabling control over button wording, captions, and prompts for confirming selections or applying filters in pivot table settings, data views, or UI components where users need to confirm or apply changes; supports changing default button text to match localization, branding, user preferences, or clearer call-to-action phrasing in data manipulation panels and interactive menus.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.sortAscending `String` *(default: "Sort Ascending")*

The text message displayed for the menu item which performs ascending sort.


<div class="meta-api-description">
How do I customize the label for sorting data in ascending order in Kendo UI PivotGridV2 field menus? Customize or configure the label, caption, or text displayed for the menu option that triggers sorting data in ascending order within the pivot configuration interface, control how the ascending sort command appears in field menus, set or change the prompt or title for sorting items from lowest to highest, enable renaming or localizing the ascending sort action in pivot field menus, modify the display text to clarify or adapt the ascending sort function in data arrangement or pivot table field controls.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.sortDescending `String` *(default: "Sort Descending")*

The text message displayed for the menu item which performs descending sort.


<div class="meta-api-description">
How do I customize the "Sort Descending" option in a Kendo UI Pivot Grid V2 field menu? Customize or set the display text, label, or caption for the descending sort option within the field menu of a pivot table configuration interface, control how the sort descending command appears, enable localization or translation of the sort order choice from ascending to descending, configure the user-facing wording for sorting fields in reverse order, and modify the menu item that triggers sorting data from highest to lowest in a pivot table setup.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.filterFields `String` *(default: "Fields Filter")*

The text messages of the fields filter menu item.


<div class="meta-api-description">
How do I customize the filter field menu text in a Kendo UI PivotGridV2 control? Customize or configure the text labels, messages, or prompts displayed for filtering fields within a pivot table or data configurator interface, enabling control over how filter options, field selections, or filtering menus are named, described, or presented. Adjust field filter menu text to tailor user prompts, change filter field descriptions, modify interface wording for filtering data fields, or set custom messages in field filtering contexts in pivot configurators or similar data tools. This covers scenarios where developers want to localize, personalize, or redefine filter field menu text to improve clarity, user experience, or match specific terminology in data filtering UIs.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.filter `String` *(default: "Filter")*

The text messages of the filter button.


<div class="meta-api-description">
How do I customize the filter button label in Kendo UI PivotGridV2? Customize and localize the text label for the filter button within a pivot table's field menu, enabling developers to set, configure, or override the default filtering UI language, customize the filter prompt text for different locales, adjust filter control labels dynamically in data visualization components, and tailor filter button captions for user interface translations or internationalization in pivot grid configurations.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.include `String` *(default: "Include Fields...")*

The text messages of the include menu item.


<div class="meta-api-description">
How to customize the display text for the "include" option in a PivotConfiguratorV2 field menu? Customize or configure the display text, label, or wording for the include option, filter inclusion choice, or menu item label within pivot table configurators, specifically tailoring how inclusion filters or selections appear in field menus, enabling control over descriptive language for inclusion commands, adjusting the phrasing or terminology for options that determine which data fields are included or filtered, and setting or overriding default inclusion menu labels for enhanced clarity, user interface customization, or localized text in pivot configuration messages related to field menus.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.clear `String` *(default: "Clear")*

The text of the clear filter expressions button.


<div class="meta-api-description">
How to customize the clear filters button in Kendo UI PivotConfiguratorV2? Customize or set the label, text, or caption for the button that clears filter expressions in pivot table field menus, enabling control over the clear filters action, reset filter button wording, or clearing selections text within pivot configurator interfaces.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.reset `String` *(default: "Reset")*

The text of the reset button in the filter includes menu item.


<div class="meta-api-description">
How to change the reset button label in Kendo UI PivotGridV2 field menu? Customize or translate the text label for the reset button within the field selection menu of a pivot configuration interface, enabling control over the display language or wording used to clear or revert field selections, modify button captions, localize interface elements, set reset action labels, and adapt the UI text for internationalization or user preference in pivot table field management.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.moveToColumns `String` *(default: "Move to Columns")*

The text of the move to columns action in the menu.


<div class="meta-api-description">
How do I customize the label for moving fields to columns in a Kendo UI PivotConfigurator? Adjust or customize the label text displayed for moving fields to columns within a pivot table configuration interface, enabling localization, translation, renaming, or tailoring of menu labels for user interfaces that control pivot table column placements, field movements, or data dimension assignments in pivot configurators.
</div>

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        filterable: true,
        messages: {
            fieldMenu: {
                moveToColumns: "Move to Columns"
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

### messages.fieldMenu.moveToRows `String` *(default: "Move to Rows")*

The text of the move to rows action in the menu.


<div class="meta-api-description">
How to change the "Move to Rows" label in Kendo UI PivotGrid V2 configuration? Control and customize the label or text displayed for the action that moves a field or column to the rows section within a pivot table or data configuration interface, enabling localization, translation, renaming, or adjusting the wording of the move-to-rows command, field repositioning, drag-and-drop instructions, or menu options so users can see this action in their preferred language or terminology when configuring data layouts, pivot grids, or report builders.
</div>

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        filterable: true,
        messages: {
            fieldMenu: {
                moveToRows: "Move to Rows"
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

### messages.fieldMenu.moveNext `String` *(default: "Move as Next")*

The text of the move as next action in the menu.


<div class="meta-api-description">
How to customize the "move as next" option in Kendo UI for jQuery PivotGridV2? Configure or customize the label text for the field menu option that moves a selected field to the next position within a pivot configurator interface, enabling control over how the "move as next" action is displayed or described in contextual menus, field arrangement controls, or UI labels for navigating and reordering pivot table fields or columns.
</div>

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        filterable: true,
        messages: {
            fieldMenu: {
                moveNext: "Move as Next"
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

### messages.fieldMenu.movePrevious `String` *(default: "Move as Previous")*

The text of the move as previous action in the menu.


<div class="meta-api-description">
How to customize the label for moving items to a previous position in pivot table field menus? Customize or configure the label text shown in menu options for moving items to a previous position within pivot table field menus, adjusting the wording for actions that reorder or shift fields backward in sequence, controlling the display text for navigation commands that reposition elements earlier or prior in the layout, enabling tailored captions for controls that move selected fields or columns to a previous step or slot in data organization interfaces.
</div>

#### Example

    <div id="configurator"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
        filterable: true,
        messages: {
            fieldMenu: {
                movePrevious: "Move as Previous"
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

### messages.fieldMenu.operators `Object`

The text of the filter operators displayed in the filter menu.


<div class="meta-api-description">
How to customize filter operator labels in Kendo UI PivotGridV2? Customize, configure, or localize the filter operator labels, names, or captions displayed in the filter or field menu for data filtering controls or pivot table configurations. Enable translation, rename, or modify the list of filter operators such as equals, contains, greater than, less than, and more within filtering dropdowns or menus. Control how filter condition options appear in user interfaces that involve field menus, operator selectors, or filter dropdown lists for enhanced localization, customization, and user-friendly filter setting management.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.contains `String` *(default: "Contains")*

The text of the "contains" filter operator.


<div class="meta-api-description">
How to customize the display text for the "contains" filter operator in Kendo UI PivotGrid V2? Customize, define, or change the display text, label, or name for the "contains" filter operator used in data grid field menus or pivot table filter configurations to indicate substring, inclusion, or matching criteria within filtering options, enabling flexible wording for search operators like "includes," "has," "contains," or similar expressions in dynamic filter dropdowns and UI components.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.doesnotcontain `String` *(default: "Does not contain")*

The text of the "Does not contain" filter operator.


<div class="meta-api-description">
How to customize the label for the "does not contain" filter operator in a Kendo UI PivotGridV2? Customize or configure the label, text, or wording for the "does not contain" filter operator in the field menu or filter options, enabling control over how exclusion filters, inverse substring matches, or negative containment conditions are displayed in pivot table interfaces, dashboards, or data configuration panels to enhance clarity, localization, or user interface preferences when setting filters that exclude records containing specific values or substrings.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.startswith `String` *(default: "Starts with")*

The text of the "Starts with" filter operator.


<div class="meta-api-description">
How do I customize the "starts with" operator label in a Kendo UI PivotGrid V2 field menu? Configure, customize, or set the label and display text for the "starts with" string filter operator in a field menu or filter menu, enabling control over how prefix matching, beginning substring filtering, or initial character checks appear in user interfaces, search filters, or data pivot configurations where selecting or changing the "starts with" condition text is needed.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.endswith `String` *(default: "Ends with")*

The text of the "Ends with" filter operator.


<div class="meta-api-description">
How do I customize the "Ends with" filter operator label in Kendo UI PivotGridV2? Customize, localize, or configure the label text for the "Ends with" filter operator used in field menus of pivot tables or grids, enabling control over how this string-matching filter option is presented in different languages or contexts, including setting or overriding the default suffix matching operator name shown in user interfaces where filtering by text endings is required.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.


<div class="meta-api-description">
How do I customize the "equal to" operator wording in a Kendo UI PivotGridV2 field menu? Customize or configure the display text, label, or name for the equality filter operator used in field menus, specifically enabling setting or changing the "equal to" operator wording within pivot table configurators or filter UI elements, including terms like "equals," "is equal," "eq," or comparators for exact matches, controlling how the equality condition is presented or labeled in filtering interfaces.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

### messages.fieldMenu.operators.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.


<div class="meta-api-description">
How do I customize the "not equal" filter operator label in Kendo UI PivotGridV2? Customize, translate, or set the label and text for the "not equal" filter operator used in field menus within pivot table configuration interfaces, enabling localization, renaming, or adjustment of the inequality filter operator display to match different languages, terminologies, or user preferences when applying filters that exclude matching values or specify non-equality conditions in data pivoting or filtering scenarios.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>


### navigatable `Boolean` *(default: false)*

If set to `true` the user could navigate the component using the keyboard navigation. By default keyboard navigation is disabled.


<div class="meta-api-description">
How do I enable keyboard navigation in Kendo UI PivotGridV2? Enable or configure keyboard navigation and focus management for interactive pivot or tab-based components to allow users to move through controls, activate buttons, switch tabs, and interact solely via keyboard inputs without mouse use. This setting supports accessibility and keyboard-only workflows by allowing navigation and control activation with arrow keys, tabbing, and enter or space key presses, ensuring that users can fully operate pivot or tab controls through keyboard commands or assistive technology without requiring pointer interactions.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

> Check [Keyboard navigation](https://demos.telerik.com/kendo-ui/pivotgridv2/keyboard-navigation) for a live demo.

### orientation `String` *(default: "vertical")*

Defines a value indicating the type of layout that the configurator has. Possible values are:

- "vertical"
- "horizontal"


<div class="meta-api-description">
How to set orientation in Kendo UI PivotConfiguratorV2 for horizontal layout? Control and customize the layout direction and arrangement of panels, fields, or sections in a pivot grid or data configurator interface by setting or adjusting the orientation to either vertical or horizontal. Enable switching between horizontal and vertical alignment to optimize user interface layout, configure the display flow for pivot table fields, choose how panels stack or align within grid components, and set the layout direction for field selectors or configurator areas to match design preferences or enhance usability. Manage the orientation for better data visualization setup, adapt to responsive layouts, and control the spatial distribution of configurator elements in dashboards or UI frameworks.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });
    </script>

## Fields

### dataSource `kendo.data.PivotDataSourceV2`

The [data source](/api/javascript/data/pivotdatasourcev2) of the widget. Configured via the [dataSource](/api/javascript/ui/pivotconfigurator/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/pivotconfigurator/methods/setdatasource) method instead.


<div class="meta-api-description">
How do I access the current data source in Kendo UI Pivot Grid V2? Retrieve, access, or inspect the current data source field used by the pivot grid configurator to examine its underlying dataset, monitor data items, track runtime data changes, and understand the active data connection powering the component. This includes reading or responding to dynamic updates, configuring or identifying the source of pivot data, and observing how data alterations impact the pivot table's behavior without directly assigning new data sources, as configuration and changes require specific methods to set or update the data source instance managing the component's rendering and aggregation logic.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
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


<div class="meta-api-description">
How do I properly destroy a Kendo UI PivotConfiguratorV2 instance? clean up and dispose of PivotConfiguratorV2 by detaching event handlers, unbinding listeners, clearing data attributes, preventing memory leaks during UI teardown, cascading destroy calls to child components for thorough resource release, safely preparing the configuration interface for removal without deleting the DOM element automatically, enabling developers to remove or reinitialize pivot grid configurator instances while ensuring efficient memory management and avoiding residual event bindings or data references.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });

    var configurator = $("#configurator").data("kendoPivotConfiguratorV2");
    configurator.destroy();
    </script>

### refresh

Refresh widget content


<div class="meta-api-description">
How to manually refresh pivot configurator interface in Kendo UI for jQuery? Trigger an update or refresh action to force re-rendering and rebuilding of the pivot configurator interface within the pivot grid component, ensuring the UI reflects the latest data source changes, schema modifications, field updates, or configuration options adjustments. Developers often seek ways to synchronize the pivot configurator with recent state changes, apply dynamic updates, refresh the view after data reloads or option tweaks, and programmatically rebuild or re-evaluate the configuration to maintain consistency between the configurator and the pivot grid. This method is useful for scenarios requiring manual or automatic refreshes following changes in data bindings, layout modifications, or schema updates to keep the configuration panel current and accurate.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
            }
        }
    });

    var configurator = $("#configurator").data("kendoPivotConfiguratorV2");
    configurator.refresh();
    </script>

### setDataSource

Sets the data source of the widget.


<div class="meta-api-description">
How to dynamically update data source for Kendo UI PivotGridV2 configurator at runtime? Change or update the data source for a pivot configurator dynamically by assigning new data using arrays, configuration objects, or data source instances, enabling runtime data switching, rebinding fields and measures associated with the new data, refreshing the user interface to reflect updated datasets, setting or replacing the source data feeding the pivot analysis, configuring live data updates, and controlling how data bindings are reset or refreshed to ensure accurate dynamic data visualization and pivot configuration adjustments.
</div>

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
            var configurator = $("#configurator").data("kendoPivotConfiguratorV2");
            configurator.setDataSource(dataSource);
        }, 2000);
    </script>

