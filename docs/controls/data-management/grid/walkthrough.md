---
title: Walkthrough
page_title: Walkthrough | Kendo UI Grid
description: "Learn how to create a grid, add an HTML table and control the features of the Kendo UI Grid widget."
slug: walkthrough_kendoui_grid_widget
position: 2
---

# Walkthrough

The [Kendo UI Grid widget](http://demos.telerik.com/kendo-ui/grid/index) is a powerful piece of the Kendo UI framework and an essential part of almost any user interface. The Grid control is quick to set up and is packed with features like [sorting](/api/javascript/ui/grid#configuration-sortable), [grouping](/api/javascript/ui/grid#configuration-groupable), [paging](/api/javascript/ui/grid#configuration-pageable), and [editing](/api/javascript/ui/grid#events-edit).

## Initialize the Grid

There are two primary ways to create a Kendo UI Grid:

* From an empty `<div>` element. In this case all Grid settings are provided in the initialization script statement, i.e. you will be describing the layout of the your grid in JavaScript.
* From an HTML table. In this case some of the Grid settings can be inferred from the table structure and the HTML attributes of the elements, i.e. you can describe the layout of the Grid entirely in the HTML of the table.

### From HTML Element: div

First start with an empty `<div>` element that has an ID.

###### Example

    <div id="grid"></div>

Now turn the `<div>` into a grid by selecting the `<div>` with a jQuery selector, and calling the `kendoGrid()` function. Since the Grid is being created based on an empty `<div>`, you must specify the column layout by passing an array of column definition objects to the column option of the widget.

###### Example

    $("#grid").kendoGrid({
        columns: [ { title: "First Name", field: "firstName" },
                   { title: "Last Name", field: "lastName"},
                   { title: "Email", field: "email" } ]
    });

Each column object has the following properties:

1. `title` - this is the text you want to appear as the column header.
2. `field` - the field in the data set that this column should be bound to.
3. `template` - you can specify a template for the Grid column to display instead of plain text.
4. `width` - the desired width of the column.

### From HTML Table

Add an HTML table. Specify the table header. Each of the `<th>` elements you specify will become a column and the text will become the column header. Column widths can be set via `<col>` elements. Fields and templates are defined via data attributes:

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

The table can now describe the entire structure of the grid. The field that the column is bound to in the data set is specified in the `data-field` attribute of each `<th>` element. Using `data-field` attributes is highly recommended. Otherwise the header cell content should meet the [requirements for data field names](/api/javascript/ui/grid#configuration-columns.field).

Since the layout of the Grid is defined by the HTML, it is only necessary to call the `kendoGrid()` function to create a grid, as shown below.

###### Example

    $("#grid").kendoGrid();

When you create the Grid from an existing HTML table, each row from the table is added as a data-item to the DataSource of the Grid. As a result, your Grid is populated with the content from the table to reflect the information it contains.

For more detailed information on how to create a Grid, refer to [the Grid overview article]({% slug overview_kendoui_grid_widget %}).

## Data Binding

### Bind to Local Data

The next step is to bind the grid to data. The grid can be bound to local data very simply by setting the `dataSource` option of the `kendoGrid` object.

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

![](/controls/data-management/grid/grid2_1.png)

### Bind to Remote Data

You can bind your grid to remote data by specifying the `dataSource` option. The data source can either be created outside of the grid, or passed in it. If you have multiple widgets bound to the same set of data, you need to create the data source as an object that you can reference in different widgets. If the grid is the only item bound to the data, it makes more sense to simply create it inline.

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

For more detailed information on binding the Grid to a remote data source, refer to [this article]({% slug remote_data_binding_grid %})

### Auto Binding

The grid is set to automatically bind to data by default, meaning it will cause the data source to query as soon as it is loaded and data will be loaded into the grid. This can be disabled by setting the `autoBind` option of the grid to `false`, as shown below.

###### Example

    $("#grid").kendoGrid({
        autoBind: false,
        // other configuration
    });

## Size

By default, the Grid has no height and expands vertically to fit its contents. For backwards compatibility, a scrollable MVC wrapper of the Grid has a height of 200px for its scrollable data area. You can control the height of your grid by specifying a static pixel value.

###### Example

    $("#grid").kendoGrid({
        height: 100,
        // other configuration
    });

**Figure 2. Grid with a fixed height and its scrolling functionality enabled**

![Grid With Fixed Height And Scrolling](/controls/data-management/grid/grid3_1.png)

Like all block elements, the Grid expands to a 100% width. Setting CSS width properties for the Grid itself, or for some of its ancestors, can control the width of the Grid. When using hierarchy, the detail template content cannot be wider than the total width of all master columns, unless the detail template is scrollable.

### Set a 100% Height and Auto-Resize

> **Important**  
>
> This section is applicable to scrollable Grids only.

To configure the height of the Grid to 100% and resize together with its parent element, first make the Grid `<div>` 100% high. According to web standards, elements with a percentage height require that their parent has an explicit height. This requirement applies recursively either until an element with a pixel height, or the `html` element is reached. 100% high elements cannot have margins, paddings, borders, or sibling elements, so remove the default border of the Grid as well.

Second, subscribe to the browser window's `resize` event and execute the [`resize`]({% slug responsivewebdesign_integration_kendoui %}) method of the Grid. If the virtual scrolling Grid functionality is used, instead of `resize`, execute the code below.

###### Example

    $("#GridID").data("kendoGrid").dataSource.fetch();

The above statements will take care of measuring the total height of the Grid and adjusting the height of the scrollable data area.

If you use locked (frozen) columns in your grid, executing `resize` is not necessary.

The `resize` method works for Kendo UI versions delivered after the Kendo UI Q3 2013 release. For older versions, use the JavaScript code from the example below instead of `resize`, which practically does the same.

###### Example

    $(window).resize(function() {
        var gridElement = $("#grid"),
            newHeight = gridElement.innerHeight(),
            otherElements = gridElement.children().not(".k-grid-content"),
            otherElementsHeight = 0;

        otherElements.each(function(){
            otherElementsHeight += $(this).outerHeight();
        });

        gridElement.children(".k-grid-content").height(newHeight - otherElementsHeight);
    });

### Initialize inside Hidden Containers

If a scrollable Grid with a set height is initialized while inside a hidden container, the Grid will not be able to adjust its vertical layout correctly, because JavaScript size calculations do not work for elements with a `display:none` style. Depending on the exact configuration, the widget may appear smaller than expected, or the scrollable data area may overflow.

If you apply virtual scrolling, the vertical scrollbar will not appear.

If you do not apply virtual scrolling, there are several options:

* Initialize the Grid when its element becomes visible.
* You must manually adjust the layout of the Grid. Apply the code from the above example is you use an old Kendo UI version. You do not need to attach a window `resize` handler. As of Kendo UI Q3 2013 release onwards, use [`kendo.resize()`](/api/javascript/kendo#methods-resize) or the [`resize()`]({% slug responsivewebdesign_integration_kendoui %}#individual-widget-resizing) method of the Grid.
* Instead of setting an overall height for the Grid in its configuration, define the height for the scrollable data area only. In this case no height calculations are made.

###### Example

        #GridID .k-grid-content
        {
            height: 270px;
        }

If you use virtual scrolling and the Grid is initialized while hidden, you must re-fetch its dataSource when the widget becomes visible. This also readjusts the height of the scrollable data area and no other coding is required.

###### Example

    $("#GridID").data("kendoGrid").dataSource.fetch();

### Column Width

When the scrolling functionality is enabled, which is the default case except for the Grid MVC wrapper, the `table-layout` style of the Grid tables is set to `fixed`. This means that all columns without a defined width will appear equally wide, no matter what their content is. All set column widths will be obeyed no matter what the cell content is. If the content cannot fit, it will be either wrapped, or clipped.

When the scrolling functionality is disabled, the `table-layout` style is set to `auto`. This means that if not explicitly set, the column widths are determined by the browser and cell content. The browser will try to obey all set column widths, but may readjust some columns depending on their content.

If needed, a fixed table layout can be applied to a non-scrollable Grid:

###### Example

    #GridID > table /* header + data table */
    {
        table-layout: fixed;
    }

<!--*-->
When you create a grid from an HTML `table`, you can set column widths via the `col` elements.

If all columns have pixel widths and their sum exceeds the width of the Grid, a horizontal scrollbar appears if scrolling is enabled. If that sum is less than the width of the Grid, the column widths are ignored and all columns expand. This leads to undesired side effects, e.g. when resizing columns. In old Internet Explorer versions the column widths are obeyed, but misalignment occurs. That is why it is recommended to have at least one column without a specified width. Set explicit widths for all columns only if they are set in percent, or if their sum exceeds the Grid width and the goal is to achieve horizontal scrolling.

If the Grid has no fixed width and resizes with the browser window, you can apply a min-width to the Grid if scrolling is disabled, or its two table elements if [scrolling](#scrolling) is enabled. This prevents undesired side effects if the browser window size is reduced too much.

The example below demonstrates how to apply a minimum width to the Grid when the scrolling functionality is disabled.

###### Example

    #GridID /* or use the .k-grid class to apply to all Grids */
    {
        min-width: 800px;
    }

<!--*-->
The example below demonstrates how to apply a minimum width to the Grid tables when the scrolling functionality is enabled.

###### Example

    #GridID .k-grid-header-wrap > table, /* header table */
    #GridID .k-grid-content > table, /* data table, no virtual scrolling */
    #GridID .k-virtual-scrollable-wrap > table /* data table, with virtual scrolling */
    {
        min-width: 800px;
    }

<!--*-->
Using the `Grid ID` (Name) in the above selectors is optional, so that the styles are applied to a particular Grid instance only.

### Use a Wide Non-Scrollable Grid

Basically, the Grid is a `<table>` element inside a `<div>` one. Tables can expand horizontally beyond 100% to enclose their content, while `<div>` elements lack this beahvior. As a result, if the scrolling functionality of the Grid is disabled, the widget `<table>` may overflow the wrapper `<div>` and lead to a visual glitch.

Possible solutions for table overflowing are:

* Enable the scrolling functionality, which, by default, is disabled when using the Kendo UI Grid MVC wrapper.
* Set a large-enough width or a min-width style for the `<div>` wrapper of the Grid.
* Float the Grid `<div>` wrapper and clear the float right after the widget. Floated elements expand and shrink automatically to enclose their content when needed.

## Features

### Virtual Scrolling

Virtual scrolling loads the data from the remote data source as you scroll down the Grid.

    $("#grid").kendoGrid({
        scrollable: {
            virtual: true
        },
        // other configuration
    });

> **Important**  
> * It is not recommended to use virtual scrolling together with grouping, hierarchy or editing. Virtual scrolling relies on calculating average row height, based on already loaded data, so having a large variance of row heights, or an unknown number of non-databound rows, such as group headers, may cause unexpected behavior.
> * A scrollable Grid with a set height needs to be visible when initialized. In this way the Grid can adjust the height of its scrollable data area in accordance with the total height of the widget. In certain scenarios the Grid may be invisible when initialized - for example, when placed inside an initially inactive TabStrip tab, or in another widget. In such cases there are generally two options: initialize the Grid while its element is still visible, or initialize the Grid in a suitable event of the parent widget, e.g. in the TabStrip `activate` event.
> * Due to height-related browser limitations, which cannot be avoided, virtual scrolling works with up to a couple of million records. The exact number of records depends on the browser. Note that if you use a row count that is larger than, can produce unexpected widget behavior, or JavaScript errors. In such cases, revert to standard paging.
> * Keyboard navigation does not work with virtual scrolling.

### Scrolling

The scrolling functionality of the Grid is enabled by default. For historical reasons, however, the [Grid MVC wrapper](/aspnet-mvc/helpers/grid/configuration#scrolling) does not support it. If you want to disable the scrolling functionality, set the `scrollable` option to `false`.

Though the scrolling functionality is enabled, the scrollbars do not necessarily appear. The reason for this is that scrolling requires you to define some of the widget's dimensions:

1. To achieve vertical scrolling, the Grid must have a set height. Otherwise, it will expand vertically to show all rows.
1. To achieve horizontal scrolling, all columns must have explicit widths defined in pixels and their sum must exceed the width of the Grid.

You can control vertical and horizontal scrolling independently.

When scrolling is enabled, the Grid renders two tables - one for the header area and one for the scrollable data area. Take the two tables into account when you need to manually make JavaScript or CSS updates to the Grid tables.

###### Example

    <div class="k-widget k-grid">
        <div class="k-grid-header">
            <div class="k-grid-header-wrap">
                <table>...</table>
            </div>
        </div>
        <div class="k-grid-content">
            <table>...</table>
        </div>
    </div>

When you apply virtual scrolling, the HTML output is a little different.

###### Example

    <div class="k-widget k-grid">
        <div class="k-grid-header">
            <div class="k-grid-header-wrap">
                <table>...</table>
            </div>
        </div>
        <div class="k-grid-content">
            <div class="k-virtual-scrollable-wrap">
                <table>...</table>
            </div>
        </div>
    </div>

The example below demonstrates how to disable the scrolling functionality of the Grid.

###### Example

    $("#grid").kendoGrid({
        scrollable: false,
        // other configuration
    });

#### Remove Vertical Scrollbar

When you enable scrolling in the Grid, its vertical scrollbar is always visible even if it is not needed. This simplifies the implementation and improves the performance of the widget. If your project does not require a vertical scrollbar, remove it via CSS in the way demonstrated below:

    #GridID .k-grid-header
    {
       padding: 0 !important;
    }

    #GridID .k-grid-content
    {
       overflow-y: visible;
    }

The `#GridID` allows the application of styles only to a particular Grid instance. To use the above styles in all Grid instances, replace the ID with the `.k-grid` CSS class.

### Locked Columns

Locked (frozen) columns allow some columns to be visible at all times during horizontal Grid scrolling.

The Grid allows you to freeze/lock columns on one side of the table. In order to work properly, the feature has the following requirements to the Grid configuration:

* [Scrolling](#scrolling) must be enabled.
* Lock at least one column initially.
* The Grid must have a defined height.
* All columns must have explicit pixel widths set.
* The total width of all locked columns must be equal to or less than the Grid width minus three times the scrollbar width.

The above ensures that at least one non-locked column is always visible and horizontal scrolling of the non-locked columns is possible. Note that the horizontal scrollbar will not appear if there is not enough horizontal space for it.

The row template and detail features are not supported in combination with column locking.

### Selection

Enable selection in the Grid simply by setting the `selectable` option to `true`, as shown below. This enables the single row selection in the Grid by default.

###### Example

        $("#grid").kendoGrid({
            selectable: true,
            // other configuration
         });

**Figure 3. Grid with its row selection functionality enabled**

![Grid With Row Selection Enabled](/controls/data-management/grid/grid4_1.png)

You can also set the `selectable` option to any of the following values:

#### Value: row

This value is set by default and enables a single row selection. It is the same as `selectable: true`.

###### Example

        $("#grid").kendoGrid({
            selectable: "row",
            // other configuration
        });

#### Value: cell

The value enables individual cell selection within the Grid.

###### Example

        $("#grid").kendoGrid({
            selectable: "cell",
            // other configuration
        });

#### Value: multiple row

The value allows users to select multiple rows in the Grid.

###### Example

        $("#grid").kendoGrid({
            selectable: "multiple row",
            // other configuration
        });

#### Value: multiple cell

The value enables a multiple cell selection within the Grid.

###### Example

        $("#grid").kendoGrid({
            selectable: "multiple cell",
            // other configuration
        });

When the multiple selection is enabled, it is possible to select multiple rows/cells by dragging the mouse cursor to select them similar to the way you would select a block of text.

> **Important**  
> * Selection is not persisted when the Grid is rebound, i.e. when paging, filtering, sorting, editing, or virtual scrolling occurs. You can achieve this by a custom implementation, as shown in the help article on [how to persist a row selection while paging]({% slug howto_persist_row_selection_paging_sorting_filtering_grid %}).
> * Selection performance may decrease when the page size is too large, or if no paging is used, and the Grid is rendering hundreds or thousands of items. This behavior is most frequently seen in Internet Explorer. Grouping, hierarchy, and frozen columns also have a negative impact on the selection performance, because these features make the HTML output of the Grid more complex. Therefore, it is recommended to use paging and a reasonable page size.

### Paging

The paging function of the Grid is controlled by the `pageable` option. You need to additionally indicate to the Grid the number of records to display on each page as well as the total number of records in the data set. Specify the `pageSize` on the data source and the field in the dataset that will contain the total count of records.

    $("#grid").kendoGrid({
         pageable: true
         // other configuration
    });

Try to do paging operations on the server to keep from including too much data in the HTML, which can slow down page performance. To accomplish this, set the `serverPaging` option on the data source to `true`.

If you decide to use server paging, be prepared to handle the requests to the server, and respond appropriately. The data source will send the following default parameters to the server when `serverPaging` is enabled:

* `top` - the number of records to send back in the response.
* `skip` - the number of records to skip from the start of the dataset.

For instance, if you want to show page 3 out of a 60-record dataset split into 10 records per page, the grid would send `skip: 20`, `top: 10`.

In general, Kendo UI Grid is platform-agnostic, which means that it works with HTTP requests sending and receiving JSON payload.For instance, if you want to bind the widget to a specific data subset (only to а particular page), instruct the DataSource to use [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging). Thus, it will use the received data directly. The same rule applies to the filtering, grouping, aggregation, and sorting operations.

### Grouping

Setting the `groupable` option to `true` turns on the grouping functionality in the Grid. You can set this option either to `true`, or `false`. By default, it is set to `false`.

Once grouping is enabled, a new area will be exposed in the header informing you to drop a column there so you can group the data in the Grid by that column. It is possible to group by multiple columns simply by dragging a second column onto the grouping header.

    $("#grid").kendoGrid({
         groupable: true
         // other configuration
    });

**Figure 4. Grid with its grouping functionality enabled**

![Grid With Grouping Enabled](/controls/data-management/grid/grid5_1.png)

**Figure 5. Grid with its data grouped by last name**

![Grid Grouped By Last Name](/controls/data-management/grid/grid6_1.png)

You can additionally sort the grouped content by clicking on the grouping tab. In the example above, click on **lastName** to sort the grouped data in descending order. Click it again to toggle to ascending order. Each of the individual groups themselves can be toggled from expanded to collapsed by clicking on the arrow next to the respective header grouping.

#### Grouping with row templates

By definition, the row template defines the row markup explicitly, while grouping requires changing the row markup. As a result, the two features can be used at the same time only if the row template includes a script, which adds additional cells, depending on the number of existing groups.

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

### Sorting

Sorting is supported in two formats: either single-column sorting, or multi-column sorting. To enable single column sorting, set the `sortable` option of the Grid to `true`. This will enable the default single-column sorting:

    $("#grid").kendoGrid({
         sortable: true
         // other configuration
    });

**Figure 6. Grid with its sorting functionality enabled**

![Grid With Sorting Enabled](/controls/data-management/grid/grid7_1.png)

The sortable attribute also has the following settings:

#### Single-column sorting

Enable single-column sorting:

    $("#grid").kendoGrid({
         sortable: true
         // other configuration
    });

#### Multi-column sorting

Enable multi-column sorting:

    $("#grid").kendoGrid({
        sortable: {
            mode: "multiple"
        },
        // other configuration
    });

Sorting is also a function that can be pushed to the server for increased performance. This is done via the data source itself and setting the `serverSorting` option on the data source to `true`. When you delegate sorting to the server, be prepared to receive the default parameter which is `orderBy`. This field will contain the field name of the column to sort by in the dataset.

### Keyboard Navigation

Keyboard navigation within the Grid is supported by the `navigatable` option. When it is set to `true`, you are able to move through the Grid using the arrow keys after you have initially selected a row or a cell. The navigation occurs at a cell level regardless of what `selectable` mode is specified. The current row or cell will be selected when the space bar is pressed.

The example below demonstrates how to enable the key navigation in a Kendo UI Grid.

###### Example

    $("#grid").kendoGrid({
         navigatable: true
         // other configuration
    });

The Grid keyboard navigation works by listening to `keydown` events on the Grid wrapper element. The assumption is that everything the user does is in accordance with the currently focused Grid cell, not the focused element of the browser. If the Grid data cells contain hyperlinks and users want to activate them via the keyboard, the correct way to do that is to navigate to the respective Grid cell using the arrow keys, press `Enter` to focus the hyperlink inside the cell, and then to press `Enter` again. Afterwards, pressing `Esc` will return focus to the table cell. The custom hyperlinks should have a `tabindex="-1"` attribute, so that they are inaccessible via tabbing.

If needed, you can avoid the described procedure. The custom hyperlinks can be accessed via tabbing and activated via `Enter` by hacking and bypassing the Grid keyboard navigation. This is achieved by preventing event bubbling of the `keydown` event of the custom hyperlinks, so that the Grid never finds out about their `Enter` keypresses.

### Rows

#### Retrieve Rows by Model IDs

To get a Grid table row by the data item ID, follow the steps below:

1. Make sure the [ID field is defined in the model configuration](/api/javascript/data/model#configuration-Example) of the Grid datasource.
2. Retrieve the row model, the model UID and the Grid table row consecutively:

    var rowModel = gridObject.dataSource.get(10249); // get method of the Kendo UI DataSource object
    var modelUID = rowModel.get("uid"); // get method of the Kendo UI Model object
    var tableRow = $("[data-uid='" + modelUID + "']"); // the data-uid attribute is applied to the desired table row element. This UID is rendered by the Grid automatically.

#### Add Custom Rows When No Records Are Loaded

When the datasource does not return any data, for example, as a result of filtering, a table row with some user-friendly message can be manually added.

The example below demonstrates how to add a table row in the [dataBound](/api/javascript/ui/grid#events-dataBound) event handler of the Grid.

###### Example

    function onGridDataBound(e) {
        if (!e.sender.dataSource.view().length) {
            var colspan = e.sender.thead.find("th:visible").length,
                emptyRow = '<tr><td colspan="' + colspan + '">... no records ...</td></tr>';
            e.sender.tbody.parent().width(e.sender.thead.width()).end().html(emptyRow);
        }
    }

For more detailed information on the layout options, refer to [the article about the appearance of the Grid]({% slug appearance_kendoui_grid_widget %}).    

## Templates

Using templates within a script tag, or within the template option on the column object if the Grid is initialized from a `<div>` element, can format each cell in the Grid.

The example below demonstrates how to use a template to format the email address as a hyperlink by using a template, declared in a script block:

    <script id="template" type="text/x-kendo-tmpl">
        <tr>
            <td>
                #= firstName #
            </td>
            <td>
                #= lastName #
            </td>
            <td>
                <a href="mailto:#= email #">#= email #</a>
            </td>
        </tr>
    </script>

This is then specified as a template for each row by passing it in to the `rowTemplate` option on the Grid and initializing it with the `kendo.template` function:

    $("#grid").kendoGrid({
        rowTemplate: kendo.template($("#template").html()),
       // other configuration
    });

Now the email address is an interactive hyperlink, which will open a new email message.

**Figure 7. Grid with a row template applied**

![Grid With Row Template](/controls/data-management/grid/grid8_1.png)

## Printing

The following example demonstrates how to inject the HTML output of the Grid in a new browser window, and trigger printing.

When the Grid is scrollable, which is a default option except for the Grid MVC wrapper, it renders a [separate table for the header area](#scrolling). Since the browser cannot understand the relationship between the two Grid tables, it will not repeat the header row on top of every printed page. The code below addresses this issue by cloning the header row and prepending it to the printable Grid. Another option is to [disable the scrolling functionality of the Grid](#scrolling).

###### Example

    //HTML
    <div id="grid"></div>

    <script type="text/x-kendo-template" id="toolbar-template">
        <button type="button" class="k-button" id="printGrid">Print Grid</button>
    </script>

    //JavaScript
	function printGrid() {
		var gridElement = $('#grid'),
			printableContent = '',
			win = window.open('', '', 'width=800, height=500'),
			doc = win.document.open();

		var htmlStart =
				'<!DOCTYPE html>' +
				'<html>' +
				'<head>' +
				'<meta charset="utf-8" />' +
				'<title>Kendo UI Grid</title>' +
				'<link href="http://kendo.cdn.telerik.com/' + kendo.version + '/styles/kendo.common.min.css" rel="stylesheet" /> ' +
				'<style>' +
				'html { font: 11pt sans-serif; }' +
				'.k-grid { border-top-width: 0; }' +
				'.k-grid, .k-grid-content { height: auto !important; }' +
				'.k-grid-content { overflow: visible !important; }' +
				'.k-grid .k-grid-header th { border-top: 1px solid; }' +
				'.k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
				'</style>' +
				'</head>' +
				'<body>';

		var htmlEnd =
				'</body>' +
				'</html>';

		var gridHeader = gridElement.children('.k-grid-header');
		if (gridHeader[0]) {
			var thead = gridHeader.find('thead').clone().addClass('k-grid-header');
			printableContent = gridElement
				.clone()
					.children('.k-grid-header').remove()
				.end()
					.children('.k-grid-content')
						.find('table')
							.first()
								.children('tbody').before(thead)
							.end()
						.end()
					.end()
				.end()[0].outerHTML;
		} else {
			printableContent = gridElement.clone()[0].outerHTML;
		}

		doc.write(htmlStart + printableContent + htmlEnd);
		doc.close();
		win.print();
	}

	$(document).ready(function () {
		var grid = $('#grid').kendoGrid({
			dataSource: {
				type: 'odata',
				transport: {
					read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
				},
				pageSize: 20,
				serverPaging: true,
				serverSorting: true,
				serverFiltering: true
			},
			toolbar: kendo.template($('#toolbar-template').html()),
			height: 400,
			pageable: true,
			columns: [
				{ field: 'ProductID', title: 'Product ID', width: 100 },
				{ field: 'ProductName', title: 'Product Name' },
				{ field: 'UnitPrice', title: 'Unit Price', width: 100 },
				{ field: 'QuantityPerUnit', title: 'Quantity Per Unit' }
			]
		});

		$('#printGrid').click(function () {
			printGrid();
		});

	});

For more detailed information on printing the Grid, refer to [this article]({% slug printing_kendoui_grid %}).

## See Also

Other articles on the Kendo UI Grid:

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Editing Functionality]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Localization of Messages]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Print the Grid]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
