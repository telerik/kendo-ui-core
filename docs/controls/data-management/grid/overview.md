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

Because of the numerous functionalities it supports, the Grid is the most complex of the Kendo UI widgets so far. To gain greater confidence before you start working with it, make sure you get familiar with the concepts listed below in advance:

* [DataSource]({% slug overview_kendoui_datasourcecomponent %})&mdash;The DataSource is one of the pivotal Kendo UI components. It is an abstraction for using local or remote data and is, therefore, a key concept in understanding how the Grid functions.
* [Remote CRUD Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %}#remote-transport-crud-operations)&mdash;The section elaborates on scenarios, in which data is retrieved from and submitted to a remote data service via HTTP requests made by the Kendo UI DataSource.
* [Remote Data Binding]({% slug remote_data_binding_grid %})&mdash;The article provides information on server filtering, paging, and other features of the Grid.
* [Grid Editing Functionality]({% slug editing_kendoui_grid_widget %})&mdash;The editing functionality of the Grid allows you to manipulate the way the data in it is presented.
* [Kendo UI Editing Functionality]({% slug kendoui_editing_gettingstarted %})&mdash;The editing functionality in some Kendo UI widgets, including the Grid, is implemented with a specific editor element/form that is bound to the model using the [Kendo UI MVVM bindings]({% slug overview_mvvmpattern_kendoui %}).

### Initialize the Grid

There are two primary ways to create a Kendo UI Grid:

* From an empty `<div>` element. In this case all Grid settings are provided in the initialization script statement.
* From an existing HTML `<table>` element. In this case some of the Grid settings can be inferred from the table structure and the HTML attributes of the elements.

#### From HTML Element: div

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

#### From HTML Table

When creating the Grid from a table, it is usually already populated with data. This improves the accessibility and search engine optimization, and ensures that the user will see data even if JavaScript is disabled or there is a JavaScript error on the page.

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
> The Grid uses a Kendo UI DataSource instance even when the widget is created from a table. The cell content is extracted and populates the DataSource in this way:  
> 1. The data field names in the DataSource are either created from the header cell content, or from the `data-field` attributes of the header cells.  
> 2. The data field names must be valid JavaScript identifiers. Therefore, it is recommended to use `data-field` attributes. Otherwise the header cell content must comply with the following limitations:  
>   * No spaces
>   * No special characters
>   * The first character must be a letter

If the Grid is created from a `<table>`, but the DataSource is configured to use transport and remote operations, a remote request is made for the initial Grid state, even though the `<table>` may already be populated. This behavior is by design and cannot be avoided, except when using the Grid MVC wrapper.

When creating the Grid from an existing table, you can define the following `column` settings via HTML attributes:

* Define data field names via the `data-field` attributes.
* Set column widths via the `width` styles applied to the respective `<col>` elements.
* Define data types via the `data-type` attributes.
* Set column templates via the `data-template` attributes.
* Enable or disable the column menu via the `data-menu` attributes.
* Enable or disable sorting via the `data-sortable` attributes.
* Enable or disable filtering via the `data-filterable` attributes.
* Enable or disable grouping via the `data-groupable` attributes.

All attributes must be applied to the `<th>` elements, except for the column width styles.

Other column-related settings cannot be defined via HTML attributes in the `<table>`. If you must use such settings, e.g. commands, locking, editors, custom row, or cell CSS classes, etc., the above attribute configuration should be abandoned and all settings should be included in the Grid's JavaScript initialization statement. Note that when using a declarative widget initialization, you must set the column properties via the `data-columns` attribute.

As seen from the code snippets above, in the first case the Grid client object is attached to a `<div>`, while in the second one the object is attached to a `<table>`. However, the generated HTML output of the Grid depends entirely on the widget settings and it will always be the same, no matter how the widget is initialized.

## Configuration

### Paging, Sorting, Grouping, and Scrolling

To configure the paging, sorting, grouping, or scrolling functionality of the Grid, use simple Boolean configuration options. Note that, by default, paging, grouping, and sorting are disabled, and scrolling is enabled.

###### Example

       $(document).ready(function(){
          $("#grid").kendoGrid({
             groupable: true,
             scrollable: true,
             sortable: true,
             pageable: true
          });
      });

### Virtualization

When binding to large data sets or when using large page sizes, reducing active in-memory DOM objects is important for the performance of the widget. The Grid provides a built-in [UI virtualization functionality]({% slug virtualization_kendoui_combobox_widget %}) for highly optimized binding to large sets of data. Enabling virtual scrolling is done by means of a simple configuration.

###### Example

       $(document).ready(function(){
          $("#grid").kendoGrid({
             scrollable: {
                 virtual: true
             }
          });
      });

For more information on the layout features avaialbe in the Grid, refer to:

* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})

## Reference

### Existing Instances

Refer to an existing Grid instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Grid API](/api/javascript/ui/grid) to control its behavior.

The example below demonstrates how to access and existing Grid instance.

###### Example

    var grid = $("#grid").data("kendoGrid");

## See Also

Other articles on the Kendo UI Grid:

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality]({% slug editing_kendoui_grid_widget %})
* [Localization of Messages]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Print the Grid]({% slug exporting_pdf_kendoui_grid_widget %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Grid Widget](/aspnet-mvc/helpers/grid/overview)
* [Overview of the Grid JSP Tag]({% slug overview_grid_uiforjsp %})
* [Overview of the Grid PHP Class](/php/widgets/grid/overview)

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
