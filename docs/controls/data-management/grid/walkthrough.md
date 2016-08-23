---
title: Walkthrough
page_title: Walkthrough | Kendo UI Grid
description: "Learn how to create a grid, add an HTML table and control the features of the Kendo UI Grid widget."
slug: walkthrough_kendoui_grid_widget
position: 1
---

# Walkthrough

The [Kendo UI Grid widget](http://demos.telerik.com/kendo-ui/grid/index) is a powerful component of the Kendo UI toolkit and an essential part of almost any user interface. The Grid control is quick to set up and is packed with features such as [sorting](/api/javascript/ui/grid#configuration-sortable), [grouping](/api/javascript/ui/grid#configuration-groupable), [paging](/api/javascript/ui/grid#configuration-pageable), and [editing](/api/javascript/ui/grid#events-edit).

## Initialize the Grid

Use either of the two primary approaches to create Kendo UI Grids:

* From empty `<div>` elements&mdash;in this case all Grid settings are provided in the initialization script statement. This means that you have to describe the layout of the Grid in JavaScript.
* From HTML tables&mdash;in this case some of the Grid settings can be inferred from the table structure and the HTML attributes of the elements. This means that you can describe the layout of the Grid entirely in the HTML of the table.

### From Empty div Elements

1. Start with an empty `<div>` element that has an ID.

    ###### Example

    ```
    <div id="grid"></div>
    ```

2. Turn the `<div>` into a grid by selecting the `<div>` with a jQuery selector and by calling the `kendoGrid()` function.
3. Specify the column layout by passing an array of column definition objects to the `column` option of the widget. This step is necessary because the Grid is being created based on an empty `<div>`.

    ###### Example

    ```
    $("#grid").kendoGrid({
        columns: [ { title: "First Name", field: "firstName" },
                   { title: "Last Name", field: "lastName"},
                   { title: "Email", field: "email" } ]
    });
    ```

    Each column object features:

    * The `title` property, which defines the text you want to appear as the column header.
    * The `field` property, which defines the field in the data set that this column should be bound to.
    * The `template` property, which specifies a template instead of plain text for the Grid column to display.
    * The `width` property, which defines the desired width of the column.

### From HTML Tables

1. Add an HTML table.
2. Specify the table header. Each of the `<th>` elements you specify will become a column and the text will become the column header. The `<col>` elements define the widths of the columns. The data attributes define the fields and the templates.

    ###### Example

    ```
    <table id="grid">
        <colgroup>
            <col style="width:100px" />
            <col style="width:200px" />
            <col />
        </colgroup>
        <thead>
            <tr>
                <th data-field="firstName">First Name</th>
                <th data-field="lastName">Last Name</th>
                <th data-field="email" data-template="<a href='mailto:#= email #'>#= email #</a>">Email</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Nancy</td>
                <td>Davolio</td>
                <td>email@domain.com</td>
            </tr>
        </tbody>
    </table>
    ```

    The table can now describe the entire structure of the grid. The field in the data set to which the column is bound is specified in the `data-field` attribute of each `<th>` element. It is strongly recommended to use the `data-field` attributes. Otherwise the content of the header cell has to meet the [requirements for data field names](/api/javascript/ui/grid#configuration-columns.field).

3. Because the layout of the Grid is defined by the HTML, you only have to call the `kendoGrid()` function to create the Grid.

    ###### Example

    ```
    $("#grid").kendoGrid();
    ```

    When you create the Grid from an existing HTML table, each row from the table is added as a data item to the dataSource of the Grid. As a result, your Grid is populated with the content from the table and reflects the information it contains.

For more information on initializing the Grid, refer to the [introductory article of the widget]({% slug overview_kendoui_grid_widget %}).

## Data Binding

### Configure Auto Binding

By default, the Grid is set to automatically bind to data&mdash;as soon as it is loaded, it causes the data source to query, and the data is loaded to the Grid.

To disable this behavior, set the `autoBind` option of the widget to `false`, as shown below.

###### Example

    $("#grid").kendoGrid({
        autoBind: false,
        // other configuration
    });

### Bind to Local Arrays

To bind the Grid to local data, set the `dataSource` option of the `kendoGrid` object.

###### Example

    var people = [ { firstName: "John",
                     lastName: "Smith",
                     email: "john.smith@telerik.com" },
                   { firstName: "Jane",
                     lastName: "Smith",
                     email: "jane.smith@telerik.com" },
                   { firstName: "Josh",
                     lastName: "Davis",
                     email: "josh.davis@telerik.com" },
                   { firstName: "Cindy",
                     lastName: "Jones",
                     email: "cindy.jones@telerik.com" } ];

     $("#grid").kendoGrid({
         dataSource: people
     });

**Figure 1. Grid bound to a local data array**

![Kendo UI Grid bound to a local data array](/controls/data-management/grid/grid2_1.png)

### Bind to Remote Data

To bind the Grid to remote data, specify the `dataSource` option. It is possible to either create the data source outside the widget, or to pass it in it.

If multiple widgets are bound to the same data set, you have to create the data source as an object that you can refer to in different widgets. If the Grid is the only item bound to the data, create it inline.

###### Example

    $("#grid").kendoGrid({
         dataSource: {
             transport: {
                 read: "/Home/People.json"
             },
             schema: {
                 data: "data"
             }
         }
    });

For more information on binding the Grid to a remote data source, refer to the article on [remote data binding of the widget]({% slug remote_data_binding_grid %}).

## Height

By default, the Grid has no height and expands to fit all table rows. To provide for a backwards compatibility, the scrollable MVC wrapper of the Grid [applies a default height of 200px to its scrollable data area](/aspnet-mvc/helpers/grid/configuration#scrolling). To control the height of the widget, specify a static pixel value.

When the height of the Grid is set, it calculates the appropriate height of its scrollable data area, so that the sum of the header rows, filter row, data, footer, and pager is equal to the expected height of the widget.

**Figure 2. Grid with a fixed height and its scrolling functionality enabled**

![Grid with fixed height and scrolling](/controls/data-management/grid/grid3_1.png)

For more information on setting the height of the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#height).

### Let the Height Vary within Limits

It is possible to make the Grid expand and shrink vertically according to the number of its rows and yet within certain limits. To achieve this, apply a minimum and/or maximum height style to the scrollable data area and do not set any height of the Grid.

For more information on setting the height vary within limits in the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#let-the-height-vary-within-limits).

### Set a 100% Height and Auto-Resize

To make the Grid 100% high and resize together with its parent, you need to apply a 100% height style to the widget. According to web standards, elements with a percentage height require that their parent has an explicit height. Elements that are 100% high cannot have margins, paddings, borders, or sibling elements. That is why you have to remove the default border of the Grid as well.

Then, you need to make sure that the inner layout of the Grid adapts to changes in the height of the `<div>` wrapper.

If the Grid is placed inside a Kendo UI Splitter or Kendo UI Window, you do not need to call the `resize` method because these widgets will execute it automatically.

If the vertical space that is available for the Grid depends on a custom resizing of the layout, which is controlled by the user, use a suitable event or method related to the layout changes to execute the `resize` method of the Grid.

The `resize` method works for the Kendo UI versions delivered after the Kendo UI Q3 2013 release.

For more information on setting the height to 100% and auto-resize the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#set-100-height-and-auto-resize).

### Configure the Loading Indicator

Internally, the Grid uses the [`kendo.ui.progress`](/api/javascript/ui/ui#methods-progress) method to display a loading overlay during remote `read` requests.

If the scrolling functionality of the Grid is disabled, the overlay is displayed over the whole Grid. If scrolling is enabled, the overlay is displayed over the scrollable data area.

For more information on configuring the loading indicator in the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#configure-the-loading-indicator).

## Width

By default, the Grid has no width and behaves like a block-level element. This means that similar to all block elements it expands to a 100% width, that is, to the width of its parent element.

The width of the Grid can be controlled by setting the CSS width properties for the Grid itself or for some of its ancestors. If you use hierarchy and unless the detail template is scrollable, the detail template has to be narrower than the total width of all master columns.

If you enable the scrolling functionality of the Grid and the sum of all column widths is greater than the width of the Grid, a horizontal scrollbar appears.

If you disable the scrolling functionality of the Grid and the columns do not fit, they overflow the `<div>` element of the Grid.

For more information on configuring the width of the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#width).

## Columns

### Column Widths

The columns of the Grid behave differently, depending on whether scrolling is enabled, or not.

By default, scrolling is enabled&mdash;except for the MVC wrapper of the Grid&mdash;and the `table-layout` style of the Grid tables is set to `fixed`. This means that all columns without a defined width will appear equally wide no matter what their content is.

When scrolling is disabled, the `table-layout` style is set to `auto`, which is the default behavior of HTML tables. This means that if not explicitly set, the column widths are determined by the browser and by the cell content.

For more information on configuring the column widths of the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#column-widths).

### Column Resizing

When scrolling is disabled and a column is resized, other columns change widths too, so that the sum of all column widths remains constant. If both the columns and the Grid `<div>` already have their minimum possible widths applied, then the resizing of the columns stops working. In such scenarios, either apply a larger width to the Grid, or enable scrolling.

For more information on resizing the columns of the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#column-resizing).

### Locked Columns

Locked (frozen) columns allow part of the columns to be visible at all times during horizontal Grid scrolling.

The Grid allows you to lock columns on one side of the table. For the feature to work properly, provide the following configuration settings:  

* Enable [scrolling]({% slug appearance_kendoui_grid_widget %}#scrolling).
* Lock at least one column initially.
* Define the height of the Grid.
* Set explicit pixel widths to all columns to allow the Grid to adjust the layout of the frozen and non-frozen table parts.
* Make sure that the total width of all locked columns is equal to or less than the width of the Grid minus three times the width of the scrollbar.

These settings ensure that at least one non-locked column is always visible and that it is possible to scroll the non-locked columns horizontally.

The row template and detail features are not supported in combination with column locking. It is possible to lock a column at the topmost level only, if you use [multi-column headers](http://demos.telerik.com/kendo-ui/grid/multicolumnheaders).

It is not possible to scroll frozen columns by touch, because they are wrapped in a container with an `overflow:hidden` style.

For more information on locking columns in the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#locked-columns).

### Column Templates

Columns need additional specific templating when they represent complex displays and not single fields.

For more information on configuring columns by using templates in the Grid, refer to the article on [binding the Grid to a remote data source]({% slug remote_data_binding_grid %}#set-the-column-template).

For more information on the templating features in Kendo UI, refer to the [introductory article on templates]({% slug overview_kendoui_templatescomponent %}).

## Rows

### Model IDs

It is possible to get a table row in the Grid by the ID of the data item.

For more information on how to retrieve rows by a model ID in the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#rows-by-model-ids).

### Custom Rows When No Records Are Loaded

It is possible to manually add a table row with some user-friendly message when the dataSource does not return any data&mdash;for example, as a result of filtering.

For more information on adding custom rows when no records are loaded in the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#custom-rows-when-no-records-are-loaded).

### Row Templates  

It is possible to format any cell in the Grid by using templates within a script tag or within the template option on the column object if the Grid is initialized from a `<div>` element.

**Figure 3. Grid with a row template applied**

![Grid With Row Template](/controls/data-management/grid/grid8_1.png)

For more information on using row templates in the Grid, refer to the article on its [appearance]({% slug appearance_kendoui_grid_widget %}#row-templates).

For more information on the templating features in Kendo UI, refer to the [introductory article on templates]({% slug overview_kendoui_templatescomponent %}).

## Features

### Selection

To enable selection in the Grid, set the [`selectable`](/api/javascript/ui/grid#configuration-selectable) option to `true`. This enables the default single-row selection option.

**Figure 4. Grid with enabled row selection**

![Grid with enabled row selection](/controls/data-management/grid/grid4_1.png)

It is also possible to set the `selectable` option to any of the following values:
* `row`
* `cell`
* `multiple row`
* `multiple cell`

For more information on the selection functionality and its limitations in the Grid, refer to the [introductory article of the widget]({% slug overview_kendoui_grid_widget %}#configuration-Selection).

### Paging

To configure the paging functionality of the Grid, use Boolean configuration options. By default, paging&mdash;as well as grouping and sorting&mdash;are disabled, while scrolling is enabled.

The paging function of the Grid is controlled by the `pageable` option. Additionally, you have to indicate to the Grid the number of records to display on each page as well as the total number of records in the dataset. Specify the `pageSize` on the data source and the field in the dataset that will contain the total count of records.

###### Example

    $("#grid").kendoGrid({
         pageable: true
         // other configuration
    });

For more information on the paging functionality of the Grid, refer to the [introductory article of the widget]({% slug overview_kendoui_grid_widget %}#configuration-Paging).

### Grouping

By default, grouping&mdash;as well as paging and sorting&mdash;are disabled, while scrolling is enabled.

To enable the grouping functionality of the Grid, set the `groupable` option to `true`. This exposes a new area in the header, which informs that it is possible for the user to drop a column on it and in this way to group the Grid data by that column. It is also possible to do grouping by multiple columns by dragging a second column onto the grouping header.

###### Example

    $("#grid").kendoGrid({
         groupable: true
         // other configuration
    });

**Figure 5. Grid with its grouping functionality enabled**

![Grid With Grouping Enabled](/controls/data-management/grid/grid5_1.png)

**Figure 6. Grid with its data grouped by last name**

![Grid Grouped By Last Name](/controls/data-management/grid/grid6_1.png)

It is also possible to sort the grouped content by clicking on the grouping tab. In the previous example, click on **lastName** to sort the grouped data in descending order. Click it again to toggle to ascending order. Each of the individual groups themselves can be toggled from expanded to collapsed states by clicking on the arrow next to the respective header grouping.

Grouping can be configured to work also with row templates and together with paging.

For more information on the grouping functionality of the Grid, refer to the [introductory article of the widget]({% slug overview_kendoui_grid_widget %}#configuration-Grouping).

### Sorting

By default, sorting&mdash;as well as paging and grouping&mdash;is disabled, while scrolling is enabled.

**Figure 7. Grid with its sorting functionality enabled**

![Grid with Sorting Enabled](/controls/data-management/grid/grid7_1.png)

Sorting is also a function that can be pushed to the server for increased performance.

Sorting is supported in two formats:  
* Single-column sorting
* Multi-column sorting

For more information on the sorting functionality of the Grid, refer to the [introductory article of the widget]({% slug overview_kendoui_grid_widget %}#configuration-Sorting).

### Editing

Editing is one of the basic functionalities Kendo UI Grid supports and it allows you to manipulate the way the data is presented.

To set up the editing functionality of the Grid:
* Configure the dataSource of the widget.
* Declare the definitions of the fields through the `schema` option of the dataSource.
* Set the `editable` configuration option.

When editing the Grid, it is possible to work with:
* Foreign key columns
* Custom editors

For more information on the editing functionality of the Grid, refer to the article on [editing of the widget]({% slug editing_kendoui_grid_widget %}).

### Scrolling

By default, the scrolling functionality of the Grid is enabled. For historical reasons, however, the [Grid MVC wrapper]({% slug configuration_gridhelper_aspnetmvc %}#scrolling) does not support it.  

To disable the scrolling functionality, set the `scrollable` option to `false`.

###### Example

    $("#grid").kendoGrid({
        scrollable: false,
        // other configuration
    });

Though the scrolling functionality is enabled, the scrollbars do not necessarily appear. The reason for this is that scrolling requires you to define some of the Grid dimensions:

1. To achieve vertical scrolling, set the height of the Grid. Otherwise, it will expand vertically to show all rows.
1. To achieve horizontal scrolling, explicitly define the width of all columns in pixels and make sure their sum exceeds the width of the Grid.

It is possible for you to control vertical and horizontal scrolling independently.

For more information on the scrolling functionality of the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#scrolling).

#### Remove Vertical Scrollbar

When you enable the scrolling functionality of the Grid, its vertical scrollbar is always visible even if it is not needed. This simplifies the implementation and improves the performance of the widget.

To remove the vertical scrollbar, use CSS. When using this approach, make sure that neither the Grid, nor its data area, apply fixed heights, so that they are able to shrink and expand according to the number of table rows.

#### Restore Scroll Positions

In some scenarios, the scroll position of the Grid might be reset when the widget is rebound. To avoid this behavior, save the scroll position in the [`dataBinding`](/api/javascript/ui/grid#events-dataBinding) event and restore it in the [`dataBound`](/api/javascript/ui/grid#events-dataBound) event.

If virtual scrolling is enabled, the scrollable data container is scrolled only horizontally.

### Virtual Scrolling

When the Grid is bound to large datasets or when you apply large page sizes, it is important for the performance of the widget to reduce the active in-memory DOM objects.

To highly optimize the binding to large sets of data, the Grid provides a built-in [UI virtualization functionality]({% slug virtualization_kendoui_combobox_widget %}).  Virtual scrolling is an alternative to paging. When enabled, the Grid loads data from the remote data source as the user scrolls vertically.

To enable virtual scrolling, use the configuration demonstrated in the following example.

###### Example

       $(document).ready(function(){
          $("#grid").kendoGrid({
             scrollable: {
                 virtual: true
             }
          });
      });

For more information on the virtual scrolling and its limitations in the Grid, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#virtual-scrolling).

### Keyboard Navigation

Keyboard navigation within the Grid is configured through the `navigatable` option. When set to `true`, it is possible to initially select a row or a cell and then move through the Grid by using the `Arrow` keys.

The navigation occurs at a cell level regardless of what the `selectable` mode is. To select the current row or cell, press the space bar.

The example below demonstrates how to enable the key navigation in the Grid.

###### Example

    $("#grid").kendoGrid({
         navigatable: true
         // other configuration
    });

For more information on the keyboard navigation of the Grid, refer to the [introductory article of the widget]({% slug overview_kendoui_grid_widget %}#configuration-Keyboard).

## Hidden Containers

If a scrollable Grid with a set height is initialized inside a hidden container&mdash;for example, when scrolling, virtual scrolling, or frozen columns are used&mdash;the Grid will not be able to adjust its vertical layout correctly, because the JavaScript calculations of the size do not work for elements of the `display:none` style.

When you handle the initialization of the Grid in hidden containers, it is possible to use some general as well as specific approaches depending on the particular scenario.

For more information on initializing the Grid inside hidden containers and the approaches to consider, refer to the article on the [appearance of the widget]({% slug appearance_kendoui_grid_widget %}#hidden-containers).

## Adaptive Rendering

As of the [Kendo UI Q3 2013 release](http://www.telerik.com/blogs/new-in-kendo-ui-q3-2013), the Grid widget supports adaptive enhancements, such as changes in styling and behavior, to provide consistency to the client device experience.

To enable the adaptive rendering feature of the Grid, set the [`mobile`](/api/javascript/ui/grid#configuration-mobile) property to `true`, `phone`, or `tablet`.

When configuring the Grid in terms of responsive web design, it is possible to:
* Add an adaptive Grid to a Kendo UI mobile application
* Apply height and positions to parent Grid elements
* Destroy and adaptive Grid

For more information on the responsive web design of the Grid, refer to the article on the [adaptive rendering of the widget]({% slug adaptive_rendering_kendoui_grid_widget %}).

## Localization

The Kendo UI widgets allow you to change the text messages that are displayed to the end user.

The Grid provides options to localize messages related to the toolbar, columns, filter, grouping, and paging, by setting the following configurations:  
* `toolbar`
* `columnMenu`
* `columns`
* `filterable`
* `groupable`
* `pageable`

For more information on localizing messages in the Grid, refer to the article on [localizing the widget]({% slug localization_kendoui_grid_widget %}).

## Export to Excel

As of the [Kendo UI Q3 2014 (2014.3.1119) release](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q3-2014), the Grid provides a built-in Excel export functionality.

The Excel export of the Grid provides the following options and support:
* Export of all data
* Customization of the generated Excel document
* Reversion of the cells and Right-to-Left (RTL) support
* Row types
* Export of multiple Grids
* Saving files on the server
* Export of huge data sets to Excel

For more information on the Excel export of the Grid and its limitations, refer to the article on [exporting of the widget to Excel]({% slug exporting_excel_kendoui_grid_widget %}).

## Export to PDF

As of the [Kendo UI Q3 2014 (2014.3.1119) release](http://www.telerik.com/support/whats-new/kendo-ui/release-history/q3-2014), the Grid provides a built-in PDF export functionality.

The PDF export of the Grid provides the following options and support:  
* Export of all pages
* Fit the Grid to the paper size
* Use page templates
* Save files by using a server proxy
* Save files on the server
* Embed custom fonts and provide Unicode support

For more information on the PDF export of the Grid and its limitations, refer to the article on [exporting of the widget in PDF]({% slug exporting_pdf_kendoui_grid_widget %}).

## Printing

In most cases, the Grid is not the only content on a page. Yet, you might want to print the Grid only.

To print the content of the Grid only, though the widget might not be the only content on the page, it is possible to use either of the options:
* Print existing web pages
* Print new web pages

For more information on printing the Grid, refer to the article on [printing the widget]({% slug printing_kendoui_grid %}).

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Editing Functionality]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Localization of Messages]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Print the Grid]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
