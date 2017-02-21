---
title: Appearance
page_title: Appearance | Kendo UI Grid
description: "Learn how to control the layout and appearance of the Kendo UI Grid widget."
slug: appearance_kendoui_grid_widget
position: 5
---

# Appearance

The [Kendo UI Grid widget](http://demos.telerik.com/kendo-ui/grid/index) supports various options that can be applied by setting its layout and appearance.

## Scrolling

The scrolling functionality of the Grid is enabled by default. To disable the scrolling functionality, set the `scrollable` option to `false`. On the other hand, the [Grid MVC wrapper](http://docs.telerik.com/aspnet-mvc/helpers/grid/configuration#scrolling) has scrolling disabled by default for historical reasons, but it can be enabled.

###### Example

    $("#grid").kendoGrid({
        scrollable: false,
        // other configuration
    });

Though the scrolling functionality is enabled, the scrollbars do not necessarily appear. The reason for this is that scrolling requires you to define some of the Grid dimensions:

1. To achieve vertical scrolling, set the height of the Grid. Otherwise, it will expand vertically to show all rows.
1. To achieve horizontal scrolling, explicitly define the width of all columns in pixels and make sure their sum exceeds the width of the Grid.

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

When you apply virtual scrolling, the HTML output is different.

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

> **Important**  
>
> To achieve a maximum level of accessibility through assistive technologies, disable the scrolling feature of the Grid.

### Remove the Vertical Scrollbar

When you enable the scrolling functionality of the Grid, its vertical scrollbar is always visible even if it is not needed. This simplifies the implementation and improves the performance of the widget.

To remove the vertical scrollbar, use CSS, as shown below. When using this approach, make sure that neither the Grid, nor its data area apply fixed heights, so that they are able to shrink and expand according to the number of table rows.

###### Example

    #GridID .k-grid-header
    {
       padding: 0 !important;
    }

    #GridID .k-grid-content
    {
       overflow-y: visible;
    }

The `#GridID` allows the application of styles only to a particular Grid instance. To use the above styles in all Grid instances, replace the ID with the `.k-grid` CSS class.

[This enhanced example]({% slug howto_hide_vertical_scrollbar_grid %}) shows how to hide or show the scrollbar, depending on the number of Grid rows.

### Restore Scroll Positions

In some scenarios, the scroll position of the Grid might be reset when the widget is rebound. To avoid this behavior, save the scroll position in the [`dataBinding`](/api/javascript/ui/grid#events-dataBinding) event and restore it in the [`dataBound`](/api/javascript/ui/grid#events-dataBound) event. The scrollable container is `div.k-grid-content` and it is possible to retrieve it as a child element of the widget [`wrapper`]({% slug widgetwrapperandelement_references_gettingstarted %}).

If virtual scrolling is enabled, the scrollable data container is `div.k-virtual-scrollable-wrap` and it is scrolled only horizontally.

###### Example

    $(function () {
        // initialize the variable, which will hold the scroll positions
        var scrollOffset = {
            left: 0,
            top: 0
        };

        //save the scroll position before the new data is rendered
        function onGridDataBinding (e) {
            var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
            scrollOffset.left = container.scrollLeft();
            scrollOffset.top = container.scrollTop(); // use only if virtual scrolling is disabled
        }

        //restore the scroll position after the new data is rendered
        function onGridDataBound (e) {
            var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
            container.scrollLeft(scrollOffset.left);
            container.scrollTop(scrollOffset.top); // use only if virtual scrolling is disabled
        }

        // attach the Grid event handlers
        $("#grid").kendoGrid({
            dataBinding: onGridDataBinding,
            dataBound: onGridDataBound
            // ...the rest of the code is ommitted for brevity...
        });
    });

### Adjust Grid Layout on Page Zoom

When a web page is zoomed, the browser changes the content size of all pages except for the scrollbars. This leads to misalignment between the header and the data areas in Grids that have their scrolling functionality enabled.

To adjust the layout, execute the following code on `window.resize`:

###### Example

    var grid = $('#GridID').data('kendoGrid');
    grid.thead.closest(".k-grid-header").css("padding-right", kendo.support.scrollbar(true));

If the Grid is in the right-to-left (RTL) mode, use the `"padding-left"` instead of the `"padding-right"` configuration.

### Virtual Scrolling

Virtual scrolling is an alternative to paging. When enabled, the Grid loads data from the remote data source as the user scrolls vertically.

###### Example

    $("#grid").kendoGrid({
        scrollable: {
            virtual: true
        },
        // other configuration
    });

When virtual scrolling is applied, the HTML output is different than the standard scrolling functionality.

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
            <div class="k-scrollbar k-scrollbar-vertical">
                ...<!-- divs, which generate a scrollbar -->...
            </div>
        </div>
    </div>

When using virtual scrolling, the data table of the Grid is not placed inside a scrollable container. The scrollbar belongs to a separate `div.k-scrollbar` shown above. This matters in scenarios when the data rows have to be manually scrolled to a particular position.

Virtual scrolling relies on a fake scrollbar. Its size is not determined by the browser, but is calculated based on the average row height of the data that is already loaded. As a result, variable row heights may cause unexpected behavior, such as inability to scroll to the last rows on the last page.

To ensure that all table rows have the same heights, use either of the options:
* Disable text wrapping.  
* Set an explicit row height that is large enough (as demonstrated in the example below).

###### Example

    .k-virtual-scrollable-wrap tr
    {
        height: 3em;
    }

    /* or */

    .k-virtual-scrollable-wrap td
    {
        white-space: nowrap;
    }

<!--*-->
When using mobile touch devices, which do not have a visible scrollbar that can be grabbed and dragged, virtual scrolling of a large number of data items (for example thousands) might hinder the easy access to all table rows, because the large number of data items will require a great deal of touch scrolling. On the other hand, using virtual scrolling with a very small number of items (for example, less than 200) does not make much sense either. Virtual scrolling on touch devices relies on drag-and-drop events, which are slower than native scrolling. This might lead to performance issues.

When a virtualized Grid is scrolled, it renders the table rows for the reached scroll position on the fly. If local data is used or if the remote data has already been loaded and cached, the rendering rate and performance depend on:

* The page size.
* The Grid height.
* The scrolling speed.
* The total number of data items.

If the total number of items is large and the scrolling is fast, the table of the Grid can be re-rendered frequently. If, additionally, the page size is huge, the user might observe issues with the smoothness of the scrolling. In such cases, consider reducing the page size and increasing the Grid height to improve the scrolling performance.

### Limitations of Virtual Scrolling

* Horizontal scrolling is not virtualized.

* Either enable virtual scrolling or paging. Do not apply both features at the same time.

* Virtual scrolling is not compatible with grouping, hierarchy, and editing.

* Virtual scrolling relies on calculating the average row height based on already loaded data. Having a large variance of row heights or an unknown number of rows that are not bound to data (such as group headers) might cause unexpected behavior.

* Provide for a page size of the Grid that is large enough, so that the table rows do not fit in the scrollable data area. Otherwise the vertical virtual scrollbar will not be created. The page size of the Grid must be over three times larger than the number of visible table rows in the data area.

* A scrollable Grid with a set height needs to be visible when initialized. In this way the Grid adjusts the height of its scrollable data area in accordance with the total height of the widget. In certain scenarios the Grid might be invisible when initialized - for example, when placed inside an initially inactive TabStrip tab or in another widget. In such cases use either of the following options:
    * Initialize the Grid while its element is still visible.
    * Initialize the Grid in a suitable event of the parent widget - for example, in the `activate` event of the TabStrip.

* Because of height-related browser limitations (which cannot be avoided), virtual scrolling works with up to one or two million records. The exact number of records depends on the browser and the row height. If you use a row count that is larger than the browser can handle, unexpected widget behavior or JavaScript errors might occur. In such cases, revert to standard paging.

* Refreshing or replacing the Grid data in the virtual mode has to be accompanied by resetting the position of the virtual scrollbar to zero&mdash;for example, by using `$('#GridID .k-scrollbar').scrollTop(0);`. In some scenarios, you might also need to call the [`refresh()` method](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-refresh).

* Programmatic scrolling to a particular Grid row is not supported when virtual scrolling is enabled, because it is not possible to reliably predict the exact scroll offset of the row.

* When the Grid is `navigatable`, keyboard navigation supports only the `Up Arrow` and `Down Arrow` keys. The `Page Up` and `Page Down` key scrolling is not supported.

* The Grid does not persist [selection](#selection) when virtual scrolling occurs. To achieve this behavior, [use this custom implementation]({% slug howto_persist_row_selection_paging_sorting_filtering_grid %}).

When virtual scrolling is not supported or recommended, revert to standard paging or non-virtual scrolling without paging, depending on the number of data items.

## Height

By default, the Grid has no height and expands to fit all table rows. To provide for a backwards compatibility, the scrollable MVC wrapper of the Grid [applies a default height of 200px to its scrollable data area](http://docs.telerik.com/aspnet-mvc/helpers/grid/configuration#scrolling). To control the height of the widget, specify a static pixel value.

###### Example

    $("#grid").kendoGrid({
        height: 100,
        // other configuration
    });

To set the height of the Grid, use any of the following approaches:

* Apply an inline height style to the `<div>` from which the Grid is initialized.
* Use the `height` property of the widget, which will apply an inline style to the Grid wrapper&mdash;the same as the previous option.
* Use external CSS. For example, use the ID or the `.k-grid` CSS class to apply a height style.

It is advisable to set a height to the Grid only if its scrolling is enabled.

When the height of the Grid is set, it calculates the appropriate height of its scrollable data area, so that the sum of the header rows, filter row, data, footer, and pager is equal to the expected height of the widget. That is why if the height of the Grid is changed through JavaScript after you create the widget,  you need to call the [`resize` method of the Grid]({% slug responsivewebdesign_integration_kendoui %}) afterwards. In this way the Grid recalculates the height of its data area.

**Figure 1. Grid with a fixed height and its scrolling functionality enabled**

![Grid With Fixed Height And Scrolling](/controls/data-management/grid/grid3_1.png)

In some special scenarios it is possible to set a height style to the scrollable data area of the Grid either by using JavaScript or external CSS, which is a `div.k-grid-content` element. In this case it is not recommended to set height to the Grid.

### Let the Height Vary within Limits

> **Important**
>
> This approach is not applicable when virtual scrolling is enabled.

It is possible to make the Grid expand and shrink vertically according to the number of its rows and yet within certain limits. To achieve this, apply a minimum and/or maximum height style to the scrollable data area and do not set any height of the Grid. If you use the MVC wrapper of the Grid, make sure you [remove the default data area height](http://docs.telerik.com/aspnet-mvc/helpers/grid/configuration#scrolling).

###### Example

    #GridID .k-grid-content
    {
        min-height: 100px;
        max-height: 400px;
    }

It is also possible to use the `.k-grid` class instead of the `GridID` to target all widget instances.

### Set 100% Height and Auto-Resize

> **Important**
>
> This section is applicable to scrollable Grids only.

To make the Grid 100% high and resize together with its parent, you need to apply a 100% height style to the widget&mdash;[that is, to the `<div class="k-grid">` wrapper of the widget]({% slug widgetwrapperandelement_references_gettingstarted %}). According to web standards, elements with a percentage height require that their parent has an explicit height. This requirement applies recursively until either an element with a pixel height, or the `html` element is reached. Elements that are 100% high cannot have margins, paddings, borders, or sibling elements. That is why you have to remove the default border of the Grid as well.

Then, you need to make sure that the inner layout of the Grid adapts to changes in the height of the `<div>` wrapper. If these changes are triggered by the resizing of the browser window, subscribe to the window `resize` event of the browser and execute the [`resize`]({% slug responsivewebdesign_integration_kendoui %}) method of the Grid. The `resize` method measures the height of the Grid `<div>` and adjusts the height of the scrollable data area.

If the Grid is placed inside a Kendo UI Splitter or Kendo UI Window, you do not need to call the `resize` method because these widgets will execute it automatically. Also, it is not necessary to apply the method if you use locked (frozen) columns.

If the vertical space that is available for the Grid depends on a custom resizing of the layout, which is controlled by the user, use a suitable event or method related to the layout changes to execute the `resize` method of the Grid. In this case, call the `resize` method even if you use locked columns.

The `resize` method works for the Kendo UI versions delivered after the Kendo UI Q3 2013 release. For older versions, instead of `resize`, use the following approach which practically functions in the same way.

###### Example

    $(window).resize(function() {
        var gridElement = $("#GridID"),
            newHeight = gridElement.innerHeight(),
            otherElements = gridElement.children().not(".k-grid-content"),
            otherElementsHeight = 0;

        otherElements.each(function(){
            otherElementsHeight += $(this).outerHeight();
        });

        gridElement.children(".k-grid-content").height(newHeight - otherElementsHeight);
    });

For a runnable example of the previously discussed scenario, refer to the article on [how to resize the Grid when the window is resized]({% slug howto_resize_whenthe_windowis_resized_grid %}).

### Configure the Loading Indicator

Internally, the Grid uses the [`kendo.ui.progress`](/api/javascript/ui/ui#methods-progress) method to display a loading overlay during remote `read` requests.

If the scrolling functionality of the Grid is disabled, the overlay is displayed over the whole Grid.

If scrolling is enabled, the overlay is displayed over the scrollable data area.

If scrolling is enabled and the Grid has no set height, the data area will initially have a zero height, which will make the loading overlay invisible during the first remote request. This issue can be resolved in two ways:

* Set the height of the Grid
* Apply the `min-height` style to the `div.k-grid-content` element.

For more information, refer to the [the example of setting the height within certain limits](#let-the-height-vary-within-limits).

## Width

By default, the Grid has no width and behaves like a block-level element. This means that similar to all block elements it expands to a 100% width, that is, to the width of its parent element.

The width of the Grid can be controlled by setting the CSS width properties for the Grid itself or for some of its ancestors. If you use hierarchy and unless the detail template is scrollable, the detail template has to be narrower than the total width of all master columns.

If you enable the scrolling functionality of the Grid and the sum of all column widths is greater than the width of the Grid, a horizontal scrollbar appears.

If you disable the scrolling functionality of the Grid and the columns do not fit, they overflow the `<div>` element of the Grid. This results in the widget's right border passing through the data cells. The reason for this is that, basically, the Grid is a `<table>` element inside a `<div>` one. Tables can expand horizontally beyond 100% to enclose their content, while `<div>` elements lack this behavior.

Possible solutions for table overflowing are:

* Enable the scrolling functionality, which, by default, is disabled when using the Kendo UI Grid MVC wrapper.
* Set a large-enough width or a min-width style for the Grid wrapper&mdash;the `<div class="k-widget k-grid">` element.
* [Float](https://developer.mozilla.org/en-US/docs/Web/CSS/float) the Grid wrapper and [clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear) the float right after the widget. Floated elements expand and shrink automatically to enclose their content when needed. Use this approach only if the previous two are unacceptable.

## Columns

### Column Widths

The columns of the Grid behave differently, depending on whether scrolling is enabled, or not.

By default, scrolling is enabled&mdash;except for the MVC wrapper of the Grid&mdash;and the `table-layout` style of the Grid tables is set to `fixed`. This means that all columns without a defined width will appear equally wide no matter what their content is. If there is not enough horizontal space, columns without a defined width might even shrink to a zero width. All set column widths will be obeyed regardless of the cell content. If the content cannot fit, it will either be wrapped or clipped. During the resizing of columns, only the resized column will change its width and the other columns will persist their widths. To achieve this, the width of the table will change altogether.

When scrolling is disabled, the `table-layout` style is set to `auto`, which is the default behavior of HTML tables. This means that if not explicitly set, the column widths are determined by the browser and by the cell content. The browser will try to obey all column widths that are set, but might readjust some columns depending on their content.

If needed, apply a fixed table layout to a non-scrollable Grid.

###### Example

    #GridID > table /* header + data table */
    {
        table-layout: fixed;
    }

<!--*-->
Column widths are set only through the `width` property of the Grid columns. It is not recommended to use width styles for table cells. It is possible to set the width of the columns through the `col` elements when you create a Grid from an HTML `table`.

> **Important**
>
> [The Grid renders separate tables for the header and data area when scrolling is enabled](#scrolling). These tables need to have column widths that are synchronized. To ensure this, configure `table-layout` to `fixed`. As a result, it is not possible to have a scrollable Grid with automatic table layout&mdash;that is, automatic column widths, which depend on the cell content.

When all columns have pixel widths, their sum exceeds the width of the Grid, and scrolling is enabled, a horizontal scrollbar appears. If that sum is less than the width of the Grid, the column widths are ignored and all columns expand. This leads to undesired side effects&mdash;for example, when resizing columns. In old Internet Explorer versions, the column widths are obeyed, but misalignment occurs. That is why it is recommended to have at least one column without a specified width, so that it can adjust freely. Set explicit widths for all columns only if they are set in percentage, or if their sum exceeds the width of the Grid and the goal is to achieve horizontal scrolling.

When you resize and hide columns, scrolling is enabled, and all currently visible columns have explicit widths, the Grid applies a pixel width to its table elements, so that the widths of all remaining columns are maintained (except for the column that is currently resized or hidden).

If the Grid has no fixed width, resizes with the browser window, and scrolling is disabled, it is possible to apply a minimum width to the Grid. If the Grid has no fixed width, resizes with the browser window, and scrolling is enabled, it is possible to apply a minimum width to its two table elements. This prevents undesired side effects if the size of the browser window is reduced too much.

###### Example

    /* Apply minimum width to the Grid when scrolling is disabled. */

    #GridID
    {
        min-width: 800px;
    }

    /* Apply a minimum width to the tables when scrolling is enabled and nested tables (hierarchy) ARE NOT USED. */

    #GridID .k-grid-header-wrap > table, /* header table */
    #GridID .k-grid-content table, /* data table, no virtual scrolling */
    #GridID .k-virtual-scrollable-wrap table /* data table, with virtual scrolling */
    {
        min-width: 800px;
    }

    /* Apply a minimum width to the tables when scrolling is enabled and nested tables (hierarchy) ARE USED. */

    #GridID .k-grid-header-wrap > table, /* header table */
    #GridID .k-grid-content table, /* data table, no virtual scrolling */
    #GridID .k-virtual-scrollable-wrap table /* data table, with virtual scrolling */
    {
        min-width: 800px;
    }
    #GridID .k-grid-content table table, /* data table, no virtual scrolling */
    #GridID .k-virtual-scrollable-wrap table table /* data table, with virtual scrolling */
    {
        min-width: initial;
    }

<!--*-->
It is optional to use the `Grid ID` (Name) in the selectors from the previous example, which makes it possible to apply the styles to a particular Grid instance only.

It is possible to set column widths in percentage only if the sum of all widths is greater than 100% (a horizontal scrollbar is desired) and is the Grid tables have a (min-)width style. Otherwise, the tables will be as wide as the Grid (100%) and the columns will be narrower than desired. When column widths are set in percentage, the resizing of one column might lead to the resizing of the other columns too.

### Column Resizing

When scrolling is disabled and a column is resized, other columns change widths too, so that the sum of all column widths remains constant. If both the columns and the Grid `<div>` already have their minimum possible widths applied, then the resizing of the columns stops working. In such scenarios, either apply a larger width to the Grid, or enable scrolling.

When scrolling is enabled and a column is resized, all other columns maintain their widths. When column resizing is applied, there are three possible outcomes with regard to the sum of all column widths:

* If the sum of all column widths is greater than the width of the Grid, a horizontal scrollbar appears.
* If the sum of all column widths is equal to the width of the Grid, no horizontal scrollbar appears.
* If the sum of all column widths is less than the width of the Grid, an empty space after the last column appears.

By design, the last column of the Grid has no right border, so that no double border appears at the right end of the Grid if the Grid table width matches the Grid widget width. If needed, it is possible to apply a right border with the CSS code from the following example.

###### Example

    .k-grid-header-wrap > table,
    .k-grid-content > table {
        border-right: 1px solid #ccc;
    }

The color value of the `#ccc` border has to match the color of the cell border from the [Kendo UI theme]({% slug themesandappearnce_kendoui_desktopwidgets %}). To obtain this, check the styles of the table cell by using a DOM inspector.

### Locked Columns

Locked (frozen) columns allow part of the columns to be visible at all times during horizontal Grid scrolling. When writing custom code, relying on selectors, or targeting the Grid table, you need to consider that the Grid creates separate tables for its locked and scrollable sections. The locked columns are inside a `.k-grid-content-locked` element and the scrollable content is inside a `.k-grid-content` one.  

The Grid allows you to lock columns on one side of the table. For the feature to work properly, provide the following configuration settings:  

* Enable [scrolling](#scrolling).
* Lock at least one column initially.
* Define the height of the Grid.
* Set explicit pixel widths to all columns to allow the Grid to adjust the layout of the frozen and non-frozen table parts.
* Make sure that the total width of all locked columns is equal to or less than the width of the Grid minus three times the width of the scrollbar.
* Make sure that the Grid is not [initialized inside a hidden container](#hidden-containers).

These settings ensure that at least one non-locked column is always visible and that it is possible to scroll the non-locked columns horizontally. Note that if the horizontal space intended for it is not enough, the horizontal scrollbar does not appear.

Frozen columns cannot be touch-scrolled, because they are wrapped in a container with an `overflow:hidden` style. This limitation can be worked around on desktop devices with the help of the mousewheel event, but such an alternative on touch devices does not exist.

Frozen columns rely on row height synchronization between the frozen and non-frozen parts. Some browsers, such as Internet Explorer 9 and Firefox, require a `line-height` style set in pixels. Otherwise, the synchronization might not work properly possibly because of sub-pixel quirks.

###### Example

    div.k-grid td
    {
        line-height: 18px;
    }

> **Important**  
> * The [JavaScript API of the Grid](/api/javascript/ui/grid) allows you to lock and unlock columns on the fly. However, this is possible only if at least one column is initially locked during initialization. The HTML output and script behavior of the Grid are very different when frozen columns are used. That is why the widget cannot switch between frozen and unfrozen mode after initialization.
> * The locked columns can be positioned only on the left side of the Grid. Positioning them on the right side is not supported.
> * The row template and detail features are not supported in combination with column locking. It is possible to lock a column at the topmost level only, if you use [multi-column headers](http://demos.telerik.com/kendo-ui/grid/multicolumnheaders).

## Rows

### Model IDs

It is possible to get a table row in the Grid by the ID of the data item. To achieve this behavior, follow the steps below:

1. Make sure the [ID field is defined in the model configuration](/api/javascript/data/model#configuration-Example) of the Grid dataSource.
2. Retrieve the row model, the model UID, and the Grid table row consecutively:

###### Example

    var rowModel = gridObject.dataSource.get(10249); // get method of the Kendo UI dataSource object
    var modelUID = rowModel.get("uid"); // get method of the Kendo UI Model object
    var tableRow = $("[data-uid='" + modelUID + "']"); // the data-uid attribute is applied to the desired table row element. This UID is rendered by the Grid automatically.

### Custom Rows When No Records Are Loaded

It is possible to manually add a table row with some user-friendly message when the dataSource does not return any data&mdash;for example, as a result of filtering.

The example below demonstrates how to add a table row in the [`dataBound`](/api/javascript/ui/grid#events-dataBound) event handler of the Grid.

###### Example

    function onGridDataBound(e) {
        if (!e.sender.dataSource.view().length) {
            var colspan = e.sender.thead.find("th:visible").length,
                emptyRow = '<tr><td colspan="' + colspan + '">... no records ...</td></tr>';
            e.sender.tbody.parent().width(e.sender.thead.width()).end().html(emptyRow);
        }
    }

### Row Templates

For more information on using row templates, refer to the [walkthrough article]({% slug walkthrough_kendoui_grid_widget %}#templates).

## Hidden Containers

If a scrollable Grid with a set height is initialized inside a hidden container&mdash;for example, when scrolling, virtual scrolling, or frozen columns are used&mdash;the Grid will not be able to adjust its vertical layout correctly, because the JavaScript size calculations do not work for elements with a `display:none` style.

### Symptoms

The following behaviors can be observed if the Grid is initialized while hidden:

* The Grid may appear smaller than expected.
* The scrollable data area overflows the bottom border of the Grid.
* If [virtual scrolling]({% slug walkthrough_kendoui_grid_widget%}#virtual-scrolling) is enabled, the vertical scrollbar is not visible.
* Frozen columns are too narrow and non-frozen columns are not visible.

### Solutions

* Delay the initialization of the Grid or change the order in which various Kendo UI widgets are initialized, so that the Grid is initialized after its element becomes visible.

* Execute the [`resize`]({% slug responsivewebdesign_integration_kendoui %}#individual-widget-resizing) method of the Grid after the widget becomes visible.

* Instead of setting an overall height for the Grid in its configuration, define the height for the scrollable data area only. In this case, no height calculations are made. This approach is applicable only if frozen columns and virtual scrolling are _not_ used.

    ###### Example

    ```
      #GridID .k-grid-content
      {
          height: 270px;
      }
    ```

* Fetch the data source instead of calling the `resize()` method. This approach is applicable if virtual scrolling is enabled and the Kendo UI version is older than 2014.3.1119.

    ###### Example

    ```
    $("#GridID").data("kendoGrid").dataSource.fetch();
    ```

For more information on how to initialize the Grid inside other Kendo UI widgets which act as hidden containers, refer to the following articles:

* [Initialize the Grid inside the PanelBar]({% slug initialize_thegrid_panelbar_widget %})
* [Initialize the Grid inside the TabStrib]({% slug initialize_thegrid_tabstrip_widget %})
* [Initialize the Grid inside the Window]({% slug initialize_thegrid_window_widget %})

## Interactive States

### Hover Effect on Table Rows

As of the Kendo UI Q1 2016 release, row hover state styles are added to all Kendo UI themes. Hover is a useful UI state providing visual affordance especially across long table rows and in the editing mode of the Grid. However, in some scenarios, the `hover` state might be misleading and is not recommended.

To remove the hover styling, use wither of the ways:
* Open the Kendo UI theme CSS file (for example, `kendo.default.min.css`) and remove the CSS rule shown in the following example.

  ###### Example

      ```
      .k-grid tr:hover {
          /* ...background styles here... */
        }
      ```

* Use the CSS code shown in the following example to override the hover styling.

  ###### Example

    ```
    .k-grid tr:not(.k-state-selected):hover {
        background: none;
        color: inherit;
    }

    .k-grid tr.k-alt:not(.k-state-selected):hover {
        background: #f1f1f1;
    }
    ```

The `#f1f1f1` value corresponds to the background color of the `.k-alt` table rows. To find the correct value for the Kendo UI theme that you are applying, use the DOM inspector of the browser. Alternatively, set a background color value of your preference.

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality of the Grid]({% slug editing_kendoui_grid_widget %})
* [Remote Data Binding of the Grid]({% slug remote_data_binding_grid %})
* [Localization of Messages in the Grid]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export of the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export of the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Printing of the Grid]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
