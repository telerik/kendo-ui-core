---
title: Overview
page_title: jQuery Grid Documentation | Grid Overview
description: "Get started with the jQuery Grid by Kendo UI and learn how to create, initialize, and enable the widget."
previous_url: /web/grid/introduction
slug: overview_kendoui_grid_widget
position: 1
---

# Grid Overview

The Grid is a powerful control for displaying data in a tabular format.

It provides options for executing data operations, such as paging, sorting, filtering, grouping, and editing, which determine the way the data is presented and manipulated. The Grid supports data binding to local and remote sets of data by using the Kendo UI for jQuery DataSource component.

* [Demo page for the Grid](https://demos.telerik.com/kendo-ui/grid/index)

## Advance Reading

Because of the numerous functionalities it supports, the Grid is the most complex of the Kendo UI widgets. To gain greater confidence before you start working with it, make sure you get familiar with the following concepts:

* [DataSource]({% slug overview_kendoui_datasourcecomponent %})&mdash;The DataSource is one of the pivotal Kendo UI components. It is an abstraction for using local or remote data and a key concept in understanding how the Grid functions.
* [Remote CRUD operations]({% slug cruddataoperations_kendoui_datasourcecomponent %}#remote-transport-crud-operations)&mdash;The section elaborates on scenarios, in which data is retrieved from and submitted to a remote data service through HTTP requests made by the Kendo UI DataSource.
* [Remote data binding]({% slug remote_data_binding_grid %})&mdash;The article provides information on server filtering, paging, and other features of the Grid.
* [Kendo UI editing functionality]({% slug kendoui_editing_gettingstarted %})&mdash;The editing functionality in some Kendo UI widgets, including the Grid, is implemented with a specific editor element or form that is bound to the model by using the [Kendo UI MVVM bindings]({% slug overview_mvvmpattern_kendoui %}).

## Initializing the Grid

To initialize the Grid, use either of the following approaches:

* [Using an empty `<div>` element](#using-an-empty-div)
* [Using an HTML table](#using-an-html-table)

### Using an Empty div

When you initialize the Grid from an empty `<div>` element, all Grid settings are provided in the initialization script statement. This means that you have to describe the layout and configuration of the Grid in JavaScript.

```dojo
    // Define the HTML div that will contain the Grid.
    <div id="grid"></div>

    // Initialize the Grid.
    <script>

        $(document).ready(function(){
            $("#grid").kendoGrid({
                columns: [{
                    field: "FirstName",
                    title: "First Name"
                },
                {
                    field: "LastName",
                    title: "Last Name"
                }],
                dataSource: {
                    data: [{
                        FirstName: "Joe",
                        LastName: "Smith"
                    },
                    {
                        FirstName: "Jane",
                        LastName: "Smith"
                    }]
                }
            });
        });

    </script>
```

### Using an HTML Table

When you initialize the Grid from an HTML table, some of its settings can be inferred from the table structure and the HTML attributes of the elements. This means that you can describe the layout of the Grid entirely in the HTML of the table. The HTML table is usually already populated with data which improves the accessibility and search engine optimization, and ensures that the user will see data even if JavaScript is disabled or there is a JavaScript error on the page.

When you initialize the Grid from an HTML table, the widget uses a Kendo UI DataSource instance. The content of the cell is extracted and populates the DataSource in the following way:

1. The names of the data fields in the DataSource are either created from the content of the header cells or from the `data-field` attributes of the header cells.
2. The names of the data fields have to be valid JavaScript identifiers. Therefore, it is recommended to use the `data-field` attributes. Otherwise the cell content of the header has to meet the following requirements:
   * No spaces
   * No special characters
   * The first character has to be a letter

If you create the Grid from an HTML table but the DataSource is configured to use transport and remote operations, a remote request is made for the initial Grid state even though the table might be already populated. This behavior is defined by design and cannot be avoided except when using the MVC wrapper of the Grid.

When the Grid is created from an existing table, the Grid provides the following `column` settings that can be defined through the HTML attributes. Except for the width column styles, all attributes have to be applied to the `<th>` elements:
* The `id` attributes define the id of the columns.
* The `data-field` attributes define the names of the data fields.
* The `width` styles when applied to the respective `<col>` elements set the width of the columns.
* The `data-type` attributes define the data types.
* The `data-template` attributes set the column templates.
* The `data-menu` attributes enable or disable the column menu.
* The `data-sortable` attributes enable or disable sorting.
* The `data-filterable` attributes enable or disable filtering.
* The `data-groupable` attributes enable or disable grouping.
* The `data-index` attributes define a zero-based number indicator for the columns.

> To associate the `aria-describedby` attribute of the cells to the corresponding column header in a navigable Kendo UI Grid, define the `id` and `data-index` attributes for each `<th>` element.

It is not possible to define other column-related settings through HTML attributes in the `<table>`. If you have to use settings, such as commands, locking, editors, custom rows, cell CSS classes, and others, skip the above attribute configuration and include all settings in the JavaScript initialization statement of the Grid. Note that you have to set the column properties through the `data-columns` attribute when using the declarative widget initialization.

As the previous and the following examples demonstrate, the client object of the Grid is attached to a `<div>` in the first case and to a `<table>` in the second case. However, the generated HTML output of the Grid entirely depends on the settings of the widget and it will always be the same regardless of the way the widget is initialized. For the complete example, refer to the [demo on initializing the Grid from an HTML table](https://demos.telerik.com/kendo-ui/grid/from-table).

```dojo
    // Define the HTML table with rows, columns, and data.
    <table id="grid">
        <colgroup>
            <col />
            <col style="width:100px" />
        </colgroup>
        <thead>
            <tr>
                <th data-field="title" data-filterable="false">Title</th>
                <th data-field="year" data-type="number" data-template="<strong>#=year#</strong>">Year</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Star Wars: A New Hope</td>
                <td>1977</td>
            </tr>
            <tr>
                <td>Star Wars: The Empire Strikes Back</td>
                <td>1980</td>
            </tr>
        </tbody>
    </table>

    // Initialize the Grid.
    <script>

        $(document).ready(function(){
          $("#grid").kendoGrid({
            sortable: true,
            filterable: true
          });
        });

    </script>
```

## Functionality and Features

* Data operations
    * [Data binding]({% slug data_binding_grid %})
    * [Editing]({% slug editing_kendoui_grid_widget %})
    * [Filtering]({% slug filtering_kendoui_grid_widget %})
    * [Grouping]({% slug grouping_kendoui_grid_widget %})
    * [Paging]({% slug paging_kendoui_grid_widget %})
    * [Sorting]({% slug sorting_kendoui_grid_widget %})
* Export options
    * [Excel]({% slug exporting_excel_kendoui_grid_widget %})
    * [PDF]({% slug exporting_pdf_kendoui_grid_widget %})
    * [Printing]({% slug printing_kendoui_grid %})
* Advanced implementations
    * [Column enhancements]({% slug column_widths_kendoui_grid_widget %})
    * [State persistence]({% slug persiststate_kendoui_grid_widget %})
    * [Hierarchy]({% slug hierarchy_kendoui_grid_widget %})
    * [Templates]({% slug row_templates_kendoui_grid_widget %})
* More settings
    * [Scroll modes]({% slug scrolling_kendoui_grid_widget %})
    * [Selection]({% slug selection_kendoui_grid_widget %})
    * [Rendering and dimensions]({% slug width_kendoui_grid_widget %})
    * [Performance tips]({% slug performance_kendoui_grid_widget %})
    * [Globalization]({% slug globalization_kendoui_grid_widget %})
    * [Accessibility]({% slug accessibility_kendoui_grid_widget %})

For more information on implementing specific scenarios, refer to the [**Knowledge Base** section](https://docs.telerik.com/kendo-ui/knowledge-base).

## Referencing Existing Instances

To refer to an existing Grid instance:

1. Use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method.
1. Once a reference is established, use the [Grid API](/api/javascript/ui/grid) to control its behavior.

        var grid = $("#grid").data("kendoGrid");

## See Also

* [Basic Usage of the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/index)
* [Initializing the Grid from HTML Tables (Demo)](https://demos.telerik.com/kendo-ui/grid/from-table)
* [Knowledge Base Section](/knowledge-base)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
