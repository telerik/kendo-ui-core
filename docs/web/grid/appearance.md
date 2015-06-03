---
title: Appearance
page_title: Appearance of the Kendo UI Grid widget
description: This section will guide you how to control the Grid layout and appearance
position: 2
---

# Grid Appearance

## Scrolling

Grid scrolling is enabled by default (except for the [MVC wrapper](/aspnet-mvc/helpers/grid/configuration#scrolling), for historical reasons).

Enabled scrolling does not guarantee that scrollbars will appear. This is because scrolling makes sense and works together with set dimensions.

1. To achieve vertical scrolling, the Grid must have a set height. Otherwise, it will expand vertically to show all rows.
1. To achieve horizontal scrolling, all columns must have explicit pixel widths and their sum must exceed the Grid width.

Scenarios 1. and 2. can be controlled independently.

When enabled, scrolling causes the Grid to render **two** tables - one for the header area and one for the scrollable data area. This ensures that the header area is always visible during vertical Grid scrolling.
The two tables may need to be taken into account when making some manual Javascript or CSS manipulations to the Grid tables.

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

> If you want to allow maximum Grid accessibility with assistive technologies, disable the scrolling feature.

### Remove the vertical scrollbar

When Grid scrolling is enabled, its vertical scrollbar is always visible even when not active. This simplifies the implementation and improves performance.
In cases when it is certain that a vertical scrollbar will not be needed, and only horizontal scrolling will be used, the vertical scrollbar can be removed with CSS, as shown below.
When using this technique, the Grid and its data area **must not have fixed heights applied**, so that they are able to shrink and expand, according to the number of table rows.

    #GridID .k-grid-header
    {
       padding: 0 !important;
    }

    #GridID .k-grid-content
    {
       overflow-y: visible;
    }

Using the `#GridID` will allow the styles to be applied to a particular Grid instance only. In order to apply the above styles to all Grid instances, you can replace the ID with the `.k-grid` CSS class.

## Width

By default the Grid has no width and behaves like a block-level element, i.e. it expands to the width of its parent element.

If Grid **scrolling is enabled** and the sum of all column widths is greater than the Grid width, a horizontal scrollbar will appear.

If Grid **scrolling is disabled** and the columns cannot fit, they will overflow the Grid `<div>`, which will result in the widget's right border passing through the data cells.
This is because the Grid is basically a `<table>` element inside a `<div>` element. Tables can expand horizontally beyond 100% to enclose their content, while divs don't do that.
Possible resolutions to table overflowing include:

* enable Grid scrolling (which is disabled by default when using the Kendo UI Grid MVC wrapper)
* set a large-enough width or min-width style for the Grid wrapper - the `<div class="k-widget k-grid">` element
* [float](https://developer.mozilla.org/en-US/docs/Web/CSS/float) the Grid wrapper and [clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear) the float right after the widget.
Floated elements expand and shrink automatically to enclose their content, when needed.
This approach should be used only if the previous two are unacceptable.

When using hierarchy, the detail template content cannot be wider than the master table, unless the detail template is scrollable.

## Height

By default the Grid has no height and expands to fit all table rows. For historical reasons, the Grid MVC wrapper
[applies a default height of 200px to its data area](/aspnet-mvc/helpers/grid/configuration#scrolling) when widget scrolling is enabled.

A height can be set to the Grid in one of the following ways:

* apply an inline height style to the `div` from which the Grid is initialized
* use the widget's **`height`** property, which will apply an inline style to the Grid wrapper, i.e. same as above
* use external CSS, e.g. by using the Grid's ID or CSS class (`.k-grid`) to apply a height style

It makes sense to set height to the Grid **only if Grid scrolling is enabled**.

When the Grid has a set height, it calculates the appropriate height of its scrollable data area, so that the sum of the header, data and pager is equal to the expected Grid height.
That's why, if the Grid height is changed width Javascript after the widget has been created, the [Grid's `resize` method](/using-kendo-in-responsive-web-pages) must be called afterwards.
In this way the Grid will recalculate the height of its data area.

![Grid With Fixed Height And Scrolling](/web/grid/grid3_1.png)

In some special scenarios, it is possible to set a height style (via Javascript or external CSS) to the Grid's scrollable data area, which is a `div.k-grid-content` element.
In this case, please do not set height to the Grid.

### Allow the Grid height to vary within certain limits

It is possible to make the Grid expand and shrink vertically, according to the number of its rows, but within certain limits.
To achieve this, do not set any Grid height and apply a min and/or max height style to the scrollable data area.
Do not forget to [remove the default data area height](/aspnet-mvc/helpers/grid/configuration#scrolling) if using the MVC wrapper.

    #GridID .k-grid-content
    {
        min-height: 100px;
        max-height: 400px;
    }

You can use the `.k-grid` class instead of the Grid ID to target all widget instances.

### Make the Grid 100% high and auto resizable

This section is applicable to **scrollable** Grids only.

In order to configure the Grid to be 100% high and resize together with its parent element, the first and most important thing to do is
make the Grid [wrapper `<div>`](/framework/widgets/wrapper-element) 100% high. According to web standards,
**elements with a percentage height require their parent to have an explicit height**. This requirement applies recursively
until an element with a pixel height is reached, or until the `html` element is reached. 100% high elements cannot have margins, paddings, borders or sibling elements,
so the default border of the Grid should be removed as well.

The second step is to ensure that the inner Grid layout adapts to changes in the height of the widget's wrapper `<div>`.
If those changes are triggered by browser window resizing, then subscribe to the browser window's `resize` event and execute the Grid's
[`resize`](/using-kendo-in-responsive-web-pages) method. The `resize` method will take care of measuring the height of the Grid `div` and
adjusting the height of the scrollable data area. The `resize` method doesn't have to be called if the Grid is placed inside a Kendo UI Splitter,
because the Splitter will execute it automatically. The method is also not needed if locked (frozen) columns are used.

If the available vertical space for the Grid depends on some custom layout resizing controlled by the user, then use a suitable event or method, which is related to the layout changes,
to execute the Grid's `resize` method. In this case, call the `resize` method even if using locked (frozen) columns.

The `resize` method will work for Kendo UI versions **Q3 2013 or later**. For older versions, the following Javascript code must be used instead or `resize`, which practically does the same:

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

The "[How to resize the Grid when the window is resized](/web/grid/how-to/Layout/resize-grid-when-the-window-is-resized)" documentation page contains a runnable example of the discussed scenario.

### Grid Loading Indicator

The Grid uses internally the [`kendo.ui.progress`](/api/javascript/ui/ui#methods-progress) method to display a loading overlay during remote read requests.
If Grid scrolling is disabled, the overlay is displayed over the whole Grid. If scrolling is enabled, the overlay is displayed over the scrollable data area.
If Grid scrolling is enabled and the Grid has no height, the data area will initially have a zero height,
which will make the loading overlay invisible during the first remote request.
This issue can be resolved in two ways - set some Grid height, or apply a `min-height` style to the `div.k-grid-content` element
(see [example above](/web/grid/appearance#allow-the-grid-height-to-vary-within-certain-limits)).

## Initialize the Grid inside a hidden container

Depending on the Grid configuration, the widget may need to perform Javascript calculations to adjust its layout during initialization
(e.g. when scrolling, virtual scrolling or frozen columns are used). Generally, Javascript size calculations don't work for elements,
which are hidden with a `display:none` style and the Grid can also be affected.
Depending on the exact scenario, the following can be observed when the widget is eventually displayed:

* the scrollable data area overflows the Grid's bottom border. This can be resolved by executing the Grid's
[`resize`](/using-kendo-in-responsive-web-pages#individual-widget-resizing) method when the widget becomes visible.
Alternatively, apply the desired height to the scrollable data area, instead of the Grid widget:

        #GridID .k-grid-content
        {
            height: 270px;
        }
* the virtual scrollbar is not visible. This can be resolved by executing the Grid's
[`resize`](/using-kendo-in-responsive-web-pages#individual-widget-resizing) method when the widget becomes visible. For Kendo UI versions 2014.3.1119 (Q3 2014) and older,
the following statement is required instead of `resize()`:

        $("#GridID").data("kendoGrid").dataSource.fetch();
* frozen columns are too narrow and non-frozen columns are not visible. This can be resolved by executing the Grid's
[`resize`](/using-kendo-in-responsive-web-pages#individual-widget-resizing) method when the widget becomes visible.

In some cases it may be possible to delay the Grid initialization, or change the order in which various Kendo UI widgets are initialized, so that the Grid is initialized while visible.

## Column widths

The Grid columns behave differently, depending on whether scrolling is enabled or not.

* When Grid **scrolling is enabled** (by default, except for the widget MVC wrapper), the `table-layout` style of the Grid tables is set to `fixed`.
This means that all width-less columns will be equally wide no matter what their content is, and will expand or shrink, depending on the available space.
If there is not enough horizontal space, width-less columns can even shrink to zero width.
All set column widths will be obeyed no matter what the cell content is. If the content cannot fit, it will wrap or be clipped.

* When Grid **scrolling is disabled**, the `table-layout` style is set to `auto`. This is the default behavior of HTML tables.
The column widths are determined by the browser and cell content, if not set explicitly.
The browser will try to obey all set column widths, but may readjust some columns, depending on their content.
The column widths may change on paging, sorting and other data operations.

If needed, a fixed table layout can be applied to a non-scrollable Grid:

    #GridID > table /* includes both the header and the data cells */
    {
        table-layout: fixed;
    }

Column widths must be set only via the `width` property of the Grid columns. Using table cell width styles is incorrect.
When creating the Grid from an HTML `table`, column widths can be set via width styles of the table `col` elements.

> [Scrolling makes the Grid render separate tables for the header and data area](#scrolling) and naturally, these tables should have synchronized column widths.
This can be ensured only when the `table-layout` is `fixed`. As a result, it is not possible to have a scrollable Grid with automatic table layout
(i.e. automatic column widths, which depend on the cell content).

If all columns have pixel widths and their sum exceeds the width of the grid, a horizontal scrollbar will appear (if scrolling is enabled). If that sum is less than the width of the grid,
the column widths will be ignored and all columns will expand. This will lead to undesired side effects, e.g. when resizing columns.
In old IE versions the column widths will be obeyed, but misalignment will occur. That's why it is recommended to have at least one column without specified width,
so that it can adjust freely. Explicit widths for all columns should be set **only** if they are set in percent,
or if their sum exceeds the Grid width and the goal is to have horizontal scrolling.

If the Grid has no fixed width and resizes with the browser window, one can apply min-width to the Grid (if scrolling is disabled) or its two table elements (if scrolling is enabled).
This will prevent undesired side effects if the browser window size is reduced too much.

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

Using the Grid ID (Name) in the above selectors is optional, so that the styles are applied to a particular Grid instance only.

Setting column widths in percent is possible, but if the sum of all widths is greater than 100% (i.e. a horizontal scrollbar is desired), the Grid tables must have a (min-)width style,
otherwise the tables will be 100% wide (as wide as the Grid) and the columns will be narrower than desired.

## Virtual Scrolling

Virtual scrolling is an alternative to paging. When enabled, the Grid will load data from the remote data source as the user scrolls vertically (horizontal scrolling is not virtualized).

Either enable virtual scrolling, or paging, but not both features at the same time.

When virtual scrolling is used, the HTML output is a little different, compared to standard scrolling:

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

Due to the specifics of its behavior and implementation, the virtual scrolling imposes certain limitations with regard to some other Grid features.
It cannot be used together with grouping, hierarchy, keyboard navigation, batch editing and inline editing.

Virtual scrolling relies on a fake scrollbar. Its size is not determined by the browser, but calculated based on the average row height of already loaded data.
As a result, variable row heights may cause unexpected behavior, such as inability to scroll to the last rows on the last page.

> The Grid page size must be large-enough, so that the table rows do not fit in the scrollable data area. Otherwise the virtual vertical scrollbar will not be created.
> We recommend setting a page size, which is at least **three times larger** than the number of visible table rows in the data area.

Due to height-related browser limitations, which cannot be avoided, virtual scrolling works with up to a couple of million records (depending on the browser).
Using a larger row count than that can produce unexpected behavior or Javascript errors.

In all cases listed above when using virtual scrolling is not recommended, revert to standard paging.

## Locked columns (Frozen columns)

Frozen (locked) columns allow some columns to be visible at all times during horizontal Grid scrolling.

The Grid supports frozen columns on one side of the table. In order to work properly, the feature has the following requirements on the Grid configuration:

* [scrolling](#scrolling) must be enabled
* the Grid should have a height set
* all columns should have explicit **pixel** widths set, so that the Grid can adjust the layout of the frozen and non-frozen table parts
* the total width of all locked columns should be equal to or less than the Grid width minus three times the scrollbar width

The above ensures that at least one non-locked column is always visible and horizontal scrolling of the non-locked columns is possible.

Row template and detail features are not supported in combination with column locking.

Frozen columns cannot be touch-scrolled, because they are wrapped in a container with an `overflow:hidden` style.
This limitation is worked around on desktop devices with the help of the mousewheel event, but it does not exist on touch devices.

> The [Grid API](/api/javascript/ui/grid) allows columns to be locked and unlocked on the fly.
However, this is possible only if at least one column is locked initially during initialization.
The HTML output and script behavior of the Grid are very different when frozen columns are used,
that's why the widget cannot switch between "frozen" and "unfrozen" mode after initialization.

Frozen columns rely on row height synchronization between the frozen and non-frozen parts.
Some browsers, such as IE9 and Firefox require a `line-height` style set in pixels, otherwise the synchronization may not work properly, probably due to some sub-pixel quirks.

    div.k-grid td
    {
        line-height: 18px;
    }
