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
* [Grid Editing Functionality]({% slug editing_kendoui_grid_widget %})&mdash;The editing functionality of the Grid allows you to manipulate the way its data is presented.
* [Kendo UI Editing Functionality]({% slug kendoui_editing_gettingstarted %})&mdash;The editing functionality in some Kendo UI widgets, including the Grid, is implemented with a specific editor element or form that is bound to the model by using the [Kendo UI MVVM bindings]({% slug overview_mvvmpattern_kendoui %}).

### Initialize the Grid

Use either of the two primary approaches to create Kendo UI Grids:

* From empty `<div>` elements.
* From HTML tables.

To initialize a scrollable Grid with a set height in a PanelBar, TabStrip, or Window, you need to consider some additional layout specifics of the widget. For more information on this scenario, refer to the article on the [appearance of the Grid]({% slug appearance_kendoui_grid_widget %}#hidden-containers).

#### From Empty `<div>` Elements

When you initialize the Grid from an empty `<div>` element, all Grid settings are provided in the initialization script statement. This means that you have to describe the layout of the Grid in JavaScript.

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

#### From HTML Tables

When you initialize the Grid from an HTML table, some settings of the Grid can be inferred from the table structure and the HTML attributes of the elements. This means that you can describe the layout of the Grid entirely in the HTML of the table.

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
>    1. The names of the data fields in the DataSource are either created from the cell content of the header or from the `data-field` attributes of the header cells.  
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

It is not possible to define other column-related settings through HTML attributes in the `<table>`. If you have to use settings such as commands, locking, editors, custom rows, cell CSS classes, and others, skip the above attribute configuration and include all settings in the JavaScript initialization statement of the Grid. Note that you have to set the column properties through the `data-columns` attribute when using the declarative widget initialization.

As the code snippets initiating the Grid above demonstrate, the client object of the Grid is attached to a `<div>` in the first case and to a `<table>` in the second case. However, the generated HTML output of the Grid entirely depends on the settings of the widget and it will always be the same, regardless of the way the widget is initialized.

## Configuration

### Selection

To enable selection in the Grid, set the [`selectable`](/api/javascript/ui/grid#configuration-selectable) option to `true`. This enables the default single-row selection option.

###### Example

        $("#grid").kendoGrid({
            selectable: true,
            // other configuration
         });

**Figure 1. Grid with enabled row selection**

![Grid with enabled row selection](/controls/data-management/grid/grid4_1.png)

It is also possible to set the `selectable` option to any of the following values:
* `row`
* `cell`
* `multiple row`
* `multiple cell`

#### The row Value

The `row` value is set by default and enables a single row selection. It functions in the same way as the `selectable: true` configuration.

###### Example

    $("#grid").kendoGrid({
        selectable: "row",
        // other configuration
    });

#### The cell Value

The `cell` value enables the selection of individual cells within the Grid.

###### Example

    $("#grid").kendoGrid({
        selectable: "cell",
        // other configuration
    });

#### The multiple row Value

The `multiple row` value allows users to select multiple rows within the Grid.

###### Example

    $("#grid").kendoGrid({
        selectable: "multiple row",
        // other configuration
    });

#### The multiple cell Value

The `multiple cell` value enables the selection of multiple cells within the Grid.

###### Example

    $("#grid").kendoGrid({
        selectable: "multiple cell",
        // other configuration
    });

When the multiple selection is enabled, it is possible to select multiple rows or cells by dragging the mouse cursor and select them in a similar way to a block of text.

> **Important**  
> * Selection is not persisted when the Grid is rebound, that is, when paging, filtering, sorting, editing, or virtual scrolling occurs. To achieve such behavior, [use this custom implementation]({% slug howto_persist_row_selection_paging_sorting_filtering_grid %}).
> * Selection performance may decrease when the page size is too large, or if no paging is used, and the Grid is rendering hundreds or thousands of items. This behavior is most frequently seen in Internet Explorer. Grouping, hierarchy, and frozen columns also have a negative impact on the selection performance, because these features make the HTML output of the Grid more complex. Therefore, it is recommended to use paging and a reasonable page size.

### Paging

By default, paging is disabled.

The paging functionality of the Grid is controlled by the `pageable` option. To configure it, use Boolean parameters.

Additionally, you have to indicate to the Grid the number of records to display on each page as well as the total number of records in the dataset. Specify the `pageSize` on the data source and the field in the dataset that will contain the total count of records.

###### Example

    $("#grid").kendoGrid({
         pageable: true
         // other configuration
    });

Try to do paging operations on the server to keep away from including too much data in the HTML, which might slow down page performance. To accomplish this, set the `serverPaging` option on the data source to `true`.

If you decide to use server paging, be prepared to handle the requests to the server, and respond appropriately. When `serverPaging` is enabled, the data source will send the following default parameters to the server:

* The `top` parameter defines the number of records to send back in the response.
* The `skip` parameter defines the number of records to skip from the start of the dataset.

For example, if you want to show page 3 out of a 60-record dataset split into 10 records per page, the Grid will send `skip: 20`, `top: 10`.

In general, the Grid is platform-agnostic. This means that it works with HTTP requests sending and receiving JSON payload. For example, to bind the widget to a specific data subset (only to а particular page), instruct the dataSource to use [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging). In this way, it will directly use the received data. The same rule applies to the filtering, grouping, aggregation, and sorting operations.

###### Example

       $(document).ready(function(){
          $("#grid").kendoGrid({
             groupable: true,
             scrollable: true,
             sortable: true,
             pageable: true
          });
      });

### Grouping

By default, grouping is disabled.

To enable the grouping functionality of the Grid, set the `groupable` option to `true`. This exposes a new area in the header, which informs that it is possible for the user to drop a column on it and in this way to group the Grid data by that column. It is also possible to do grouping by multiple columns by dragging a second column onto the grouping header.

###### Example

    $("#grid").kendoGrid({
         groupable: true
         // other configuration
    });

**Figure 2. Grid with its grouping functionality enabled**

![Grid With Grouping Enabled](/controls/data-management/grid/grid5_1.png)

**Figure 3. Grid with its data grouped by last name**

![Grid Grouped By Last Name](/controls/data-management/grid/grid6_1.png)

It is also possible to sort the grouped content by clicking on the grouping tab. In the previous example, click on **lastName** to sort the grouped data in descending order. Click it again to toggle to ascending order. Each of the individual groups themselves can be toggled from expanded to collapsed states by clicking on the arrow next to the respective header grouping.

Grouping can be configured to work also with:
* Row templates
* Paging

#### Grouping with Row Templates

By definition, a row template explicitly defines the row markup, while grouping requires changing the row markup. As a result, the two features can be used at the same time only if the row template includes a script which, depending on the number of existing groups, adds additional cells.

###### Example

    $(document).ready(function () {
        // "window." can be omitted if the function is defined outside the document.ready closure
        window.getGridGroupCells = function(id) {
            var cnt = $("#" + id).data("kendoGrid").dataSource.group().length,
                result = "";

            for (var j = 0; j < cnt; j++) {
                result += "<td class='k-group-cell'>&nbsp;</td>";
            }

            return result;
        }

        $("#GridID").kendoGrid({
            groupable: true,
            rowTemplate: "<tr>" +
                "#= getGridGroupCells('GridID') #" +
                "<td>...</td><td>...</td><td>...</td></tr>",
            altRowTemplate: "<tr class='k-alt'>" +
                "#= getGridGroupCells('GridID') #" +
                "<td>...</td><td>...</td><td>...</td></tr>"
        });
    });

#### Grouping with Paging

Paging occurs before grouping. As a result, the following behavior is exhibited:

* The dataSource instance of the Grid is not aware if there are items from the displayed groups on other pages.
* If the groups are collapsed, it is not possible to display additional items and groups from other pages below the rendered items and groups. The only workaround is to increase the page size.

To configure the Grid so that grouping occurs before paging, you need to group the whole dataSource. However, this setup is not recommended because it leads to a greatly reduced performance.

### Sorting

By default, sorting is disabled.

**Figure 4. Grid with its sorting functionality enabled**

![Grid with Sorting Enabled](/controls/data-management/grid/grid7_1.png)

Sorting is also a function that can be pushed to the server for increased performance. This is done through the data source itself and by setting the `serverSorting` option on the data source to `true`. When you delegate the sorting to the server, you will receive the default `orderBy` parameter. This field will contain the field name of the column to sort by in the dataset.

Sorting is supported in two formats:  
* Single-column sorting
* Multi-column sorting

#### Single-Column Sorting

To enable the single-column sorting, set the `sortable` option of the Grid to `true`. This enables the default single-column sorting.

###### Example

    $("#grid").kendoGrid({
         sortable: true
         // other configuration
    });

#### Multi-Column Sorting

To enable the single-column sorting, set the `mode` option to `multiple`.

###### Example

    $("#grid").kendoGrid({
        sortable: {
            mode: "multiple"
        },
        // other configuration
    });

### Scrolling

By default, the scrolling functionality of the Grid is enabled. For historical reasons, however, the [Grid MVC wrapper]({% slug configuration_gridhelper_aspnetmvc %}#scrolling) does not support it.

For more information on scrolling, refer to the [article on the appearance of the Grid]({% slug appearance_kendoui_grid_widget %}#scrolling).

### Virtual Scrolling

When the Grid is bound to large datasets or when you apply large page sizes, it is important for the performance of the widget to reduce the active in-memory DOM objects.

To highly optimize the binding to large sets of data, the Grid provides a built-in [UI virtualization functionality]({% slug virtualization_kendoui_combobox_widget %}).  Virtual scrolling is an alternative to paging. When enabled, the Grid loads data from the remote data source as the user scrolls vertically.

For more information on virtual scrolling and its limitations, refer to the [article on the appearance of the Grid]({% slug appearance_kendoui_grid_widget %}#virtual-scrolling).

### Keyboard Navigation

Keyboard navigation within the Grid is configured through the `navigatable` option. When set to `true`, it is possible to initially select a row or a cell and then move through the Grid by using the `Arrow` keys.

The navigation occurs at a cell level regardless of what the `selectable` mode is. To select the current row or cell, press the space bar.

The example below demonstrates how to enable the key navigation in the Grid.

###### Example

    $("#grid").kendoGrid({
         navigatable: true
         // other configuration
    });

The keyboard navigation of the Grid works by listening to the `keydown` events on the wrapper element of the widget. It is assumed that everything the user does is in accordance with the currently focused Grid cell, not the focused element of the browser.

If the data cells of the Grid contain hyperlinks and you want to activate them through the keyboard, navigate to the respective Grid cell by using the `Arrow` keys, then press `Enter` to focus the hyperlink inside the cell, and press `Enter` again. To return the focus on the table cell, press `Esc`. In order for the hyperlinks to be inaccessible through tabbing, set the `tabindex="-1"` attribute to the custom hyperlinks.

It is also possible to avoid the described procedure. The custom hyperlinks can be accessed through tabbing and activated through `Enter` by hacking and bypassing the keyboard navigation of the Grid. To achieve this, prevent the event bubbling of the `keydown` event of the custom hyperlinks. In this way, the `Enter` key-presses go unnoticed by the Grid.

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
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Grid Widget]({% slug overview_gridhelper_aspnetmvc %})
* [Overview of the Grid JSP Tag]({% slug overview_grid_uiforjsp %})
* [Overview of the Grid PHP Class]({% slug overview_grid_uiforphp %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
