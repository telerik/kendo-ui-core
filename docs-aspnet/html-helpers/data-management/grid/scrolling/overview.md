---
title: Overview
page_title: Scrolling Overview
description: "Get started with the Telerik UI Grid HtmlHelper for {{ site.framework }} and learn how to configure the scrolling functionality of the Grid."
slug: htmlhelpers_grid_aspnetcore_scrolling
position: 1
---

# Scrolling Overview

By default, the scrolling functionality of the Grid is disabled. When scrolling is enabled, the widget applies a default height of 200px to its data area. This can be changed or removed by setting an optional height style in the Grid's `Scrollable()` method.

    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable(s => s.Height(400)) // Set a 400px-height style.
    )

    // Alternatively:

    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable(s => s.Height("auto")) // Remove the default height.
    )

The `Virtual` scrolling always displays a single page of data. Scrolling only changes the data which is currently displayed. The `Endless` scrolling mode appends new pages of data to the already rendered records. The `Endless` scrolling is suitable for limited number of records, because after some point the browser will start to freeze (due to the amount of DOM elements on the page). For huge amount of records it is recommended to use `Virtual` scrolling or standard paging.

For more information about the scroll modes of the Grid, refer to the articles on:
* [Virtual scrolling]({% slug virtual_scrolling_aspnetcore_grid %})
* [Endless scrolling]({% slug endless_scrolling_aspnetcore_grid %})

Depending on the enabled scroll mode, the rendering of the dimensions and layout of the Grid varies. For more information, refer to the following articles:
* [Height of the Grid]({% slug height_aspnetcore_grid %})
* [Width of the Grid]({% slug width_grid_aspnetcore %})
* [Rows]({% slug rows_aspnetcore_grid_widget %})
* [Hidden containers]({% slug hidden_containers_aspnetcore_grid %})
* [Responsive design]({% slug adaptive_rendering_gridhelper_aspnetcore %})

## Getting Started  

> To achieve a maximum level of accessibility through assistive technologies, the scrolling feature of the Grid has to be disabled.

By default, when scrolling is enabled, the Grid renders two tables&mdash;one for the header area and one for the scrollable data area. The two tables are important when you need to manually make JavaScript or CSS updates to the Grid tables.

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

The following example demonstrates the HTML output in a Grid with virtual scrolling. For more information, refer to the article on [on virtual scrolling]({% slug virtual_scrolling_aspnetcore_grid %}).

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

## Setting the Scrollbars

By default, the Grid does not display scrollbars when scrolling is enabled. To render scrollbars and achieve vertical or horizontal scrolling, define the following dimensions of the Grid. You can control vertical and horizontal scrolling independently.
* To achieve vertical scrolling, set the height of the Grid. Otherwise, it will expand vertically to show all rows.
* To achieve horizontal scrolling, explicitly define the width of all columns in pixels and make sure their sum exceeds the width of the Grid.

When scrolling is enabled, the vertical scrollbar of the Grid is always visible even if not needed which simplifies the implementation and improves the performance of the widget. To remove the vertical scrollbar, use CSS rules and make sure that neither the Grid nor its data area apply fixed heights so that they are able to shrink and expand according to the number of table rows. In the following example, the `#GridID` allows the application of styles only to a particular Grid instance. To use these styles in all Grid instances, replace the `ID` with the `.k-grid` CSS class. 

    #GridID .k-grid-header
    {
       padding: 0 !important;
    }

    #GridID .k-grid-content
    {
       overflow-y: visible;
    }

## Restoring the Scroll Position

In some scenarios, the scroll position of the Grid might be reset when the widget is rebound. To prevent the restoration of the scroll position:

1. Save the scroll position in the [`DataBinding()`](/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#databindingsystemstring) event handler.
1. Restore the scroll position in the [`DataBound()`](/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#databoundsystemstring) event handler.

The scrollable container is `div.k-grid-content` and it is possible to retrieve it as a child element of the widget `wrapper`. If virtual scrolling is enabled, the scrollable data container is `div.k-virtual-scrollable-wrap` and it is scrolled only horizontally.

    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable()
        /* Other configuration. */
        .Events(events=>events
            .DataBound("onGridDataBound")
            .DataBinding("onGridDataBinding")
        )
    )
    $(function () {
        // Initialize the variable which will hold the scroll positions.
        var scrollOffset = {
            left: 0,
            top: 0
        };

        // Save the scroll position before the new data is rendered.
        function onGridDataBinding (e) {
            var container = e.sender.wrapper.children(".k-grid-content"); // Or ".k-virtual-scrollable-wrap".
            scrollOffset.left = container.scrollLeft();
            scrollOffset.top = container.scrollTop(); // Use only if virtual scrolling is disabled.
        }

        // Restore the scroll position after the new data is rendered.
        function onGridDataBound (e) {
            var container = e.sender.wrapper.children(".k-grid-content"); // Or ".k-virtual-scrollable-wrap".
            container.scrollLeft(scrollOffset.left);
            container.scrollTop(scrollOffset.top); // Use only if virtual scrolling is disabled.
        }
    });

## Adjusting Scrollbar and Page Layout on Zoom

When a web page is zoomed, the browser changes the content size of all pages except for the scrollbars. This leads to misalignment between the header and the data areas in Grids that have their scrolling functionality enabled. To adjust the layout, execute the following code on `window.resize`.

> If the Grid is in the right-to-left (RTL) mode, use the `"padding-left"` instead of the `"padding-right"` configuration.

    $(window).resize(function (e) {
        var grid = $('#GridID').data("kendoGrid");
        grid.thead.closest(".k-grid-header").css("padding-right", kendo.support.scrollbar(true));
    });

## See Also

* [Scrolling a Grid HtmlHelper for {{ site.framework }} with Locked Columns (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/frozen-columns)
* [Server-Side API](/api/grid)
