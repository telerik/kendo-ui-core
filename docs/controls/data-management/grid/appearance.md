---
title: Appearance
page_title: Appearance | Kendo UI Grid
description: "Learn how to control the layout and appearance of the Kendo UI Grid widget."
slug: appearance_kendoui_grid_widget
position: 5
---

# Appearance

The [Kendo UI Grid widget](http://demos.telerik.com/kendo-ui/grid/index) supports various options for you to apply to your project by setting its layout and appearance that best match your needs.

## Scrolling

The scrolling functionality of the Grid is enabled by default. For historical reasons, however, scrolling is disabled by default when using the [Grid MVC wrapper](/aspnet-mvc/helpers/grid/overview), but can be [enabled explicitly](/aspnet-mvc/helpers/grid/configuration#scrolling).

Though the scrolling functionality is enabled, the scrollbars do not necessarily appear. The reason for this is that scrolling requires you to define some of the widget's dimensions:

1. To achieve vertical scrolling, the Grid must have a set height. Otherwise, it will expand vertically to show all rows.
1. To achieve horizontal scrolling, all columns must have explicit widths defined in pixels and their sum must exceed the width of the Grid.

You can control vertical and horizontal scrolling independently.

When scrolling is enabled, the Grid renders two tables - one for the header area and one for the scrollable data area. This ensures that the header area of the Grid is always visible during vertical scrolling. Take the two tables into account when you need to manually make JavaScript or CSS updates to the Grid tables.

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

> **Important**  
>
> If you want to achieve maximum Grid accessibility with assistive technologies, disable the scrolling feature.

### Remove Vertical Scrollbars

When you enable scrolling in the Grid, its vertical scrollbar is always visible even if it is not needed. This simplifies the implementation and improves the performance of the widget. If your project does not require a vertical scrollbar, but will apply only horizontal scrolling, you can remove the vertical scrollbar via CSS in the way demonstrated in the example below. When using this technique, make sure that neither the Grid, nor its data area apply fixed heights, so that they are able to shrink and expand according to the number of table rows.

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

Here is an enhanced example, which shows how to hide or show the scrollbar, depending on the number of Grid rows.

[Hide the Grid's vertical scrollbar when not needed]({% slug howto_hide_vertical_scrollbar_grid %})

### Restore Scroll Positions

In some scenarios, the Grid scroll position may be reset when the widget is rebound. If you want to avoid this behavior, save the scroll position in the [`dataBinding`](/api/javascript/ui/grid#events-dataBinding) event and restore it in the [`dataBound`](/api/javascript/ui/grid#events-dataBound) event. The scrollable container is `div.k-grid-content` and you can retrieve it as a child element of the widget [`wrapper`]({% slug widgetwrapperandelement_references_gettingstarted %}). If virtual scrolling is enabled, the scrollable data container is `div.k-virtual-scrollable-wrap` and it is scrolled only horizontally.

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

### Virtual Scrolling

Virtual scrolling is an alternative to paging. When enabled, the Grid will load data from the remote data source as the user scrolls vertically. Note that horizontal scrolling is not virtualized.

> **Important**  
>
> Either enable virtual scrolling, or paging. Do not apply both features at the same time.

When you apply virtual scrolling, the HTML output is a little different as compared to the standard scrolling functionality, as shown below.

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

Note that when you use virtual scrolling, the Grid data table is not placed inside a scrollable container. The scrollbar belongs to a separate `div.k-scrollbar` shown above. This matters in scenarios when the data rows should be manually scrolled to a particular position. Scrolling to a specific table row is unreliable and not supported with virtual scrolling.

The virtual scrolling behavior and implementation imposes limitations with regard to some other Grid features. Virtual scrolling cannot be used together with grouping and hierarchy. CRUD operations are not supported either.

Virtual scrolling relies on a fake scrollbar. Its size is not determined by the browser, but is calculated based on the average row height of the data that is already loaded. As a result, variable row heights may cause unexpected behavior, such as inability to scroll to the last rows on the last page. There are two ways to ensure that all table rows have the same heights&mdash;either disable text wrapping, or set an explicit large-enough row height, as demonstrated below.

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
> **Important**  
> * The page size of the Grid must be large-enough, so that the table rows do not fit in the scrollable data area. Otherwise the vertical virtual scrollbar will not be created.
> * The page size of the Grid must be over three times larger than the number of visible table rows in the data area.

Due to height-related browser limitations, which cannot be avoided, virtual scrolling works with up to a couple of million records. The exact number of records depends on the browser. Note that if you use a row count that is larger than, can produce unexpected widget behavior, or JavaScript errors. Adjusting the scroll position programmatically, so that a certain row becomes visible is not supported.

When using mobile touch devices, which do not have a visible scrollbar that can be grabbed and dragged, virtual scrolling combined with a large number of data items, e.g. thousands, can impose a challenge to easily access all table rows, as this will require a great deal of touch scrolling. On the other hand, using virtual scrolling with a very small number of items, e.g. less than two hundred, does not make much sense either. Virtual scrolling on touch devices relies on drag and drop events, which are slower than native scrolling, so inferior scrolling performance may be noticeable.

In the cases listed above, when using virtual scrolling is not supported or recommended, revert to standard paging or non-virtual scrolling without paging, depending on the number of data items.

## Width

By default, the Grid has no width and behaves like a block-level element. This means that it expands to the width of its parent element.

If you enable the scrolling functionality of the Grid and the sum of all column widths is greater than the width of the Grid, a horizontal scrollbar will appear.

If you disable the scrolling functionality of the Grid and the columns are not able to fit, they will overflow the Grid `<div>`. This results in the widget's right border passing through the data cells. The reason for this is that, basically, the Grid is a `<table>` element inside a `<div>` one. Tables can expand horizontally beyond 100% to enclose their content, while `<div>` elements lack this behavior.

Possible solutions for table overflowing are:

* Enable the scrolling functionality, which, by default, is disabled when using the Kendo UI Grid MVC wrapper.
* Set a large-enough width or a min-width style for the Grid wrapper, the `<div class="k-widget k-grid">` element.
* [Float](https://developer.mozilla.org/en-US/docs/Web/CSS/float) the Grid wrapper and [clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear) the float right after the widget. Floated elements expand and shrink automatically to enclose their content when needed. Use this approach only if the previous two are unacceptable.

When you use hierarchy, the detail template content cannot be wider than the master table, unless the detail template is scrollable.

## Height

By default, the Grid has no height and expands to fit all table rows. For historical reasons, the Grid MVC wrapper [applies a default height of 200px to its data area](/aspnet-mvc/helpers/grid/configuration#scrolling) when scrolling is enabled.

Set the height of the Grid in one of the following ways:

* Apply an inline height style to the `<div>` from which the Grid is initialized.
* Use the `height` property of the widget, which will apply an inline style to the Grid wrapper, i.e. the same as the above option.
* Use external CSS, e.g. use the ID or CSS class (`.k-grid`) of the Grid to apply a height style.

It makes sense to set a height to the Grid only if its scrolling is enabled.

When the Grid has a set height, it calculates the appropriate height of its scrollable data area, so that the sum of the header rows, filter row, data, footer, and pager is equal to the expected Grid height. That is why, if the Grid height is changed via JavaScript after you create the widget, you must call the [`resize` method of the Grid]({% slug responsivewebdesign_integration_kendoui %}) afterwards. In this way, the Grid recalculates the height of its data area.

**Figure 1. Grid with a fixed height and its scrolling functionality enabled**

![Grid With Fixed Height And Scrolling](/controls/data-management/grid/grid3_1.png)

In some special scenarios, it is possible to set a height style to the scrollable data area of the Grid, either via JavaScript, or external CSS, which is a `div.k-grid-content` element. In this case, do not set height to the Grid.

### Let the Height Vary within Limits

It is possible to make the Grid expand and shrink vertically according to the number of its rows, but within certain limits. To achieve this, do not set any Grid height and apply a min and/or max height style to the scrollable data area. Make sure you [remove the default data area height](/aspnet-mvc/helpers/grid/configuration#scrolling) if you use the MVC wrapper.

> **Important**
>
> This whole approach is not applicable when virtual scrolling is enabled.

###### Example

    #GridID .k-grid-content
    {
        min-height: 100px;
        max-height: 400px;
    }

You can use the `.k-grid` class instead of the `GridID` to target all widget instances.

### Set a 100% Height and Auto-Resize

> **Important**
>
> This section is applicable to scrollable Grids only.

To make the Grid 100% high and resize together with its parent, first apply a 100% height style to the Grid [(i.e. to the widget's `<div class="k-grid">` wrapper)]({% slug widgetwrapperandelement_references_gettingstarted %}). According to web standards, elements with a percentage height require that their parent has an explicit height. This requirement applies recursively either until an element with a pixel height, or the `html` element is reached. 100% high elements cannot have margins, paddings, borders, or sibling elements, so remove the default border of the Grid as well.

Secondly, ensure that the inner Grid layout adapts to changes in the height of the Grid wrapper `<div>`. If those changes are triggered by browser window resizing, subscribe to the window `resize` event of the browser and execute the [`resize`]({% slug responsivewebdesign_integration_kendoui %}) method of the Grid. The `resize` method will take care of measuring the height of the Grid `<div>` and adjusting the height of the scrollable data area. You do not need to call the `resize` method if the Grid is placed inside a Kendo UI Splitter or Kendo UI Window, because these widgets will execute it automatically. Also, you do not need the method if you use locked (frozen) columns.

If the available vertical space for the Grid depends on a custom layout resizing controlled by the user, use a suitable event or method related to the layout changes to execute the `resize` method of the Grid. In this case, call the `resize` method even if you use locked (frozen) columns.

The `resize` method will work for Kendo UI versions delivered after the Kendo UI Q3 2013 release. For older versions, use the following Javascript code instead of `resize`, which practically does the same.

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

The [help article on how to resize the Grid when the window is resized]({% slug howto_resize_whenthe_windowis_resized_grid %}) contains a runnable example of the discussed scenario.

### Loading Indicator

The Grid internally uses the [`kendo.ui.progress`](/api/javascript/ui/ui#methods-progress) method to display a loading overlay during remote `read` requests. If the scrolling Grid functionality is disabled, the overlay is displayed over the whole Grid. If scrolling is enabled, the overlay is displayed over the scrollable data area.

If the scrolling Grid functionality is enabled and the Grid has no height, the data area will initially have a zero height, which will make the loading overlay invisible during the first remote request. This issue can be resolved in two ways: either set a Grid height, or apply a `min-height` style to the `div.k-grid-content` element. For more information, refer to the [the example of setting the height within certain limits](#let-the-height-vary-within-limits).

## Columns

### Widths

The Grid columns behave differently, depending on whether scrolling is enabled, or not.

When the scrolling functionality is enabled, which is the default case except for the Grid MVC wrapper, the `table-layout` style of the Grid tables is set to `fixed`. This means that all columns without a defined width will appear equally wide, no matter what their content is, and will expand or shrink depending on the available space. If there is not enough horizontal space, columns without a defined width may even shrink to a zero width. All set column widths will be obeyed no matter what the cell content is. If the content cannot fit, it will be either wrapped, or clipped. During column resizing, only the resized column will change its width and the other column widths will be persisted. To achieve this, the table width will change.

When the scrolling functionality is disabled, the `table-layout` style is set to `auto`. This is the default behavior of HTML tables. If not explicitly set, the column widths are determined by the browser and cell content. The browser will try to obey all set column widths, but may readjust some columns depending on their content. The column widths may change on paging, sorting, and other data operations.

If needed, a fixed table layout can be applied to a non-scrollable Grid.

###### Example

    #GridID > table /* includes both the header and the data cells */
    {
        table-layout: fixed;
    }

<!--*-->
Column widths should be set only via the `width` property of the Grid columns. Using table cell width styles is not recommended. When creating the Grid from an HTML `table`, column widths can be set via width styles of the table `col` elements.

> **Important**
>
> [Scrolling makes the Grid render separate tables for the header and data area](#scrolling). These tables must have synchronized column widths. This can be ensured only when the `table-layout` is `fixed`. As a result, it is not possible to have a scrollable Grid with automatic table layout, i.e. automatic column widths, which depend on the cell content.

If all columns have pixel widths and their sum exceeds the width of the Grid, a horizontal scrollbar appears if scrolling is enabled. If that sum is less than the width of the Grid, the column widths are ignored and all columns expand. This leads to undesired side effects, e.g. when resizing columns. In old Internet Explorer versions the column widths are obeyed, but misalignment occurs. That is why it is recommended to have at least one column without a specified width, so that it can adjust freely. Set explicit widths for all columns only if they are set in percent, or if their sum exceeds the Grid width and the goal is to achieve horizontal scrolling.

Column resizing and hiding trigger the following behavior when scrolling is enabled: if all currently visible columns have explicit widths, the Grid applies a pixel width to its table elements, so that the widths of all remaining columns, i.e. except the column that is currently resized or hidden, are maintained.

If the Grid has no fixed width and resizes with the browser window, you can apply a min-width to the Grid if scrolling is disabled, or its two table elements if scrolling is enabled. This prevents undesired side effects if the browser window size is reduced too much.

###### Example

    /* How to apply minimum width to the Grid when scrolling is disabled */

    #GridID
    {
        min-width: 800px;
    }

    /* How to apply minimum width to the Grid tables when scrolling is enabled and nested tables (hierarchy) ARE NOT USED */

    #GridID .k-grid-header-wrap > table, /* header table */
    #GridID .k-grid-content table, /* data table, no virtual scrolling */
    #GridID .k-virtual-scrollable-wrap table /* data table, with virtual scrolling */
    {
        min-width: 800px;
    }

    /* How to apply minimum width to the Grid tables when scrolling is enabled and nested tables (hierarchy) ARE USED */

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
Using the `Grid ID` (Name) in the above selectors is optional, so that the styles are applied to a particular Grid instance only.

Setting column widths in percent is possible, but if the sum of all widths is greater than 100%, i.e. a horizontal scrollbar is desired, the Grid tables must have a (min-)width style. Otherwise, the tables will be 100% wide (as wide as the Grid) and the columns will be narrower than desired. Note that when column widths are set in percent, resizing one column may lead to other columns changing their widths as well.

### Resizing

When Grid scrolling is `disabled` and a column is resized, other columns will change widths too, so that the sum of all column widths remains constant. If both the columns and the Grid `<div>` already have their minimum possible widths applied, then column resizing will stop working. In such scenarios, either apply a larger width to the Grid, or enable scrolling.

When Grid scrolling is `enabled` and a column is resized, all other columns will maintain their widths. There are three possible outcomes of column resizing with regard to the sum of all column widths:

* If it is greater than the Grid width, then a horizontal scrollbar will appear.
* If it is equal to the Grid width, then no horizontal scrollbar will be visible.
* If it is less than the Grid width, then empty space after the last column will appear.

The last Grid column has no right border by design, so that no double border appears at the right end of the Grid if the Grid table width matches the Grid widget width, which is the most common scenario. If needed, a right border can be applied with the following CSS code.

###### Example

    .k-grid-header-wrap > table,
    .k-grid-content > table {
        border-right: 1px solid #ccc;
    }

The `#ccc` border color value should match the cell border color from the [Kendo UI theme]({% slug themesandappearnce_kendoui_desktopwidgets %}). It can be obtained by checking the table cell styles with a DOM inspector.

### Locking

Locked (frozen) columns allow some columns to be visible at all times during horizontal Grid scrolling.

The Grid supports frozen columns on one side of the table. In order to work properly, the feature has the following requirements to the Grid configuration:

* [Scrolling](#scrolling) must be enabled.
* The Grid must have a defined height.
* All columns must have explicit pixel widths set, so that the Grid can adjust the layout of the frozen and non-frozen table parts.
* The total width of all locked columns must be equal to or less than the Grid width minus three times the scrollbar width.

The above ensures that at least one non-locked column is always visible and horizontal scrolling of the non-locked columns is possible.

The row template and detail features are not supported in combination with column locking.

Frozen columns cannot be touch-scrolled, because they are wrapped in a container with an `overflow:hidden` style. This limitation can be worked around on desktop devices with the help of the mousewheel event, but it does not exist on touch devices.

> **Important**  
>
> The [Grid JavaScript API](/api/javascript/ui/grid) allows columns to be locked and unlocked on the fly. However, this is possible only if at least one column is initially locked during initialization. The HTML output and script behavior of the Grid are very different when frozen columns are used. That is why the widget cannot switch between frozen and unfrozen mode after initialization.

Frozen columns rely on row height synchronization between the frozen and non-frozen parts. Some browsers, such as Internet Explorer 9 and Firefox, require a `line-height` style set in pixels. Otherwise the synchronization may not work properly, probably due to some sub-pixel quirks.

###### Example

    div.k-grid td
    {
        line-height: 18px;
    }

## Hidden Containers

Depending on the Grid configuration, the widget may need to perform JavaScript calculations to adjust its layout during initialization inside hidden containers, e.g. when scrolling, virtual scrolling, or frozen columns are used. Generally, JavaScript size calculations do not work for elements, which are hidden with a `display:none` style and the Grid can also be affected.

Depending on the exact scenario, the following behavior can be observed when the widget is eventually displayed:

* The scrollable data area overflows the bottom border of the Grid. This can be resolved by executing the [`resize`]({% slug responsivewebdesign_integration_kendoui %}#individual-widget-resizing) method when the Grid becomes visible. Alternatively, apply the desired height to the scrollable data area instead of the Grid widget.

###### Example

        #GridID .k-grid-content
        {
            height: 270px;
        }

* The virtual scrollbar is not visible. This can be resolved by executing the [`resize`](/using-kendo-in-responsive-web-pages#individual-widget-resizing) method when the Grid becomes visible. For Kendo UI Q3 2014 (2014.3.1119) release and older, apply the following statement instead of `resize()`.

###### Example

        $("#GridID").data("kendoGrid").dataSource.fetch();

* Frozen columns are too narrow and non-frozen columns are not visible. This can be resolved by executing the [`resize`]({% slug responsivewebdesign_integration_kendoui %}#individual-widget-resizing) method when the Grid becomes visible.

In some cases it may be possible to delay the initialization of the Grid, or change the order in which various Kendo UI widgets are initialized, so that the Grid is initialized while visible. For more information on how to initialize the Grid inside other Kendo UI widgets which act as hidden containers, see:

* [Initialize the Grid inside the PanelBar]({% slug initialize_thegrid_panelbar_widget %})
* [Initialize the Grid inside the TabStrib]({% slug initialize_thegrid_tabstrip_widget %})
* [Initialize the Grid inside the Window]({% slug initialize_thegrid_window_widget %})

## Interactive States

### Hover Effect on Table Rows

As of Kendo UI Q1 2016 row hover state styles are added to all Kendo UI themes. Hover is a useful UI state providing visual affordance especially across long table rows and in the editing mode of the Grid. However, there are scenarios in which the `hover` state might be misleading and is not needed.

There are two ways to remove the hover styling. One is to open the Kendo UI theme CSS file (e.g. `kendo.default.min.css`) and remove the following CSS rule.

###### Example

    .k-grid tr:hover {
        /* ...background styles here... */
    }

<!--*-->
The other option is to use the following CSS code to override the hover styling.

###### Example

    .k-grid tr:not(.k-state-selected):hover {
        background: none;
        color: inherit;
    }

    .k-grid tr.k-alt:not(.k-state-selected):hover {
        background: #f1f1f1;
    }

The `#f1f1f1` value corresponds to the background color of `.k-alt` table rows. You can find the correct value for the Kendo UI theme that you are using by using the browser's DOM inspector. Alternatively, set a background color value or your preference.

## See Also

Other articles on the Kendo UI Grid:

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality]({% slug editing_kendoui_grid_widget %})
* [Remote Data Binding]({% slug remote_data_binding_grid %})
* [Localization of Messages]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Print the Grid]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
