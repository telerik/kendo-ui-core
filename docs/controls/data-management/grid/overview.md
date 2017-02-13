---
title: Overview
page_title: Overview | Kendo UI Grid
description: "Learn how to create, initialize, and enable the Kendo UI Grid widget."
previous_url: /web/grid/introduction
slug: overview_kendoui_grid_widget
position: 1
---

# Grid Overview

The [Kendo UI Grid widget](http://demos.telerik.com/kendo-ui/grid/index) is a powerful control for displaying data in a tabular format. It provides many options, such as paging, sorting, filtering, grouping, and editing, which determine the way data is presented and manipulated. The Grid can be bound to local or remote data by using the Kendo UI DataSource component.

## Getting Started

### Read in Advance

Because of the numerous functionalities it supports, the Grid is the most complex of the Kendo UI widgets so far. To gain greater confidence before you start working with it, make sure you get familiar with the following concepts:

* [DataSource]({% slug overview_kendoui_datasourcecomponent %})&mdash;The DataSource is one of the pivotal Kendo UI components. It is an abstraction for using local or remote data and a key concept in understanding how the Grid functions.
* [Remote CRUD Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %}#remote-transport-crud-operations)&mdash;The section elaborates on scenarios, in which data is retrieved from and submitted to a remote data service through HTTP requests made by the Kendo UI DataSource.
* [Remote Data Binding]({% slug remote_data_binding_grid %})&mdash;The article provides information on server filtering, paging, and other features of the Grid.
* [Kendo UI Editing Functionality]({% slug kendoui_editing_gettingstarted %})&mdash;The editing functionality in some Kendo UI widgets, including the Grid, is implemented with a specific editor element or form that is bound to the model by using the [Kendo UI MVVM bindings]({% slug overview_mvvmpattern_kendoui %}).

### Initialize the Grid

Use either of the two primary approaches to create Kendo UI Grids:

* From an empty `<div>` element.
* From an HTML table.

#### From an Empty div

When you initialize the Grid from an empty `<div>` element, all Grid settings are provided in the initialization script statement. This means that you have to describe the layout and configuration of the Grid in JavaScript.

###### Example

    // define the HTML div that will contain the Grid
    <div id="grid"></div>

    // initialize the Grid
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

#### From an HTML Table

When you initialize the Grid from an HTML table, some of its settings can be inferred from the table structure and the HTML attributes of the elements. This means that you can describe the layout of the Grid entirely in the HTML of the table.

The HTML table is usually already populated with data. This improves the accessibility and search engine optimization, and ensures that the user will see data even if JavaScript is disabled or there is a JavaScript error on the page.

###### Example

    // define the HTML table with rows, columns, and data
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

    // initialize the Grid
    <script>

        $(document).ready(function(){
          $("#grid").kendoGrid({
            sortable: true,
            filterable: true
          });
        });

    </script>

> **Important**
>
> The Grid uses a Kendo UI DataSource instance even when the widget is created from an HTML table. The content of the cell is extracted and populates the DataSource in the following way:
>    1. The names of the data fields in the DataSource are either created from the content of the header cells or from the `data-field` attributes of the header cells.
>    2. The names of the data fields have to be valid JavaScript identifiers. Therefore, it is recommended to use the `data-field` attributes. Otherwise the cell content of the header has to meet the following requirements:
>      * No spaces
>      * No special characters
>      * The first character has to be a letter

If the Grid is created from an HTML table, but the DataSource is configured to use transport and remote operations, a remote request is made for the initial Grid state even though the table might be already populated. This behavior is defined by design and cannot be avoided, except when using the MVC wrapper of the Grid.

When the Grid is created from an existing table, you can define the following `column` settings through the HTML attributes:

* The `data-field` attributes define the names of the data fields.
* The `width` styles when applied to the respective `<col>` elements set the width of the columns.
* The `data-type` attributes define the data types.
* The `data-template` attributes set the column templates.
* The `data-menu` attributes enable or disable the column menu.
* The `data-sortable` attributes enable or disable sorting.
* The `data-filterable` attributes enable or disable filtering.
* The `data-groupable` attributes enable or disable grouping.

All attributes have to be applied to the `<th>` elements, except for the column width styles.

It is not possible to define other column-related settings through HTML attributes in the `<table>`. If you have to use settings, such as commands, locking, editors, custom rows, cell CSS classes, and others, skip the above attribute configuration and include all settings in the JavaScript initialization statement of the Grid. Note that you have to set the column properties through the `data-columns` attribute when using the declarative widget initialization.

As the above code snippets demonstrate, the client object of the Grid is attached to a `<div>` in the first case and to a `<table>` in the second case. However, the generated HTML output of the Grid entirely depends on the settings of the widget and it will always be the same, regardless of the way the widget is initialized.

## Reference

### Existing Instances

Refer to an existing Grid instance through the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Grid API](/api/javascript/ui/grid) to control its behavior.

The example below demonstrates how to access an existing Grid instance.

###### Example

    var grid = $("#grid").data("kendoGrid");

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality of the Grid]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Localization of Messages in the Grid]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export of the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export of the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Printing of the Grid]({% slug exporting_pdf_kendoui_grid_widget %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Grid Widget](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview)
* [Overview of the Grid JSP Tag]({% slug overview_grid_uiforjsp %})
* [Overview of the Grid PHP Class]({% slug overview_grid_uiforphp %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
