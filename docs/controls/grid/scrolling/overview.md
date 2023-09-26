---
title: Overview
page_title: jQuery Grid Documentation - Scrolling Overview
description: "Get started with the jQuery Grid by Kendo UI and learn how to configure the scrolling functionality of the component."
previous_url: /appearance/scrolling/overview, /appearance/scrolling/virtual-scrolling, /appearance/scrolling/endless-scrolling
slug: scrolling_kendoui_grid_widget
position: 1
---

# Scrolling Overview

By default, the scrolling functionality of the Grid is enabled.

For more information about the scroll modes of the Grid, refer to the articles on:
* [Virtual scrolling]({% slug virtual_scrolling_kendoui_grid_widget %})
* [Endless scrolling]({% slug endless_scrolling_kendoui_grid_widget %})

Depending on the enabled scroll mode, the rendering of the dimensions and layout of the Grid varies. For more information, refer to the following articles:
* [Height of the Grid]({% slug height_kendoui_grid_widget %})
* [Width of the Grid]({% slug width_kendoui_grid_widget %})
* [Rows]({% slug rows_kendoui_grid_widget %})
* [Hidden containers]({% slug hidden_containers_kendoui_grid_widget %})
* [Responsive design]({% slug adaptive_rendering_kendoui_grid_widget %})

## Getting Started  

When scrolling is enabled, the component renders two tables by default&mdash;one for the header area and one for the scrollable data area. The two tables are important when you need to manually make JavaScript or CSS updates to the Grid tables.

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

The following example demonstrates the HTML output in a Grid with virtual scrolling. For more information, refer to the article on [on virtual scrolling]({% slug virtual_scrolling_kendoui_grid_widget %}).

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


However, to achieve a maximum level of accessibility through assistive technologies, disable the scrolling feature of the Grid. To disable scrolling, set the `scrollable` option to `false`.

    $("#grid").kendoGrid({
        scrollable: false,
        // other configuration
    });

## Setting the Scrollbars

By default, the Grid does not display scrollbars when scrolling is enabled. To render scrollbars and achieve vertical or horizontal scrolling, define the following dimensions of the Grid. You can control vertical and horizontal scrolling independently.
* To achieve vertical scrolling, set the height of the Grid. Otherwise, it will expand vertically to show all rows.
* To achieve horizontal scrolling, explicitly define the width of all columns in pixels and make sure their sum exceeds the width of the Grid.

When scrolling is enabled, the vertical scrollbar of the Grid is always visible even if not needed which simplifies the implementation and improves the performance of the component. To remove the vertical scrollbar, use CSS rules and make sure that neither the Grid nor its data area apply fixed heights so that they are able to shrink and expand according to the number of table rows. In the following example, the `#GridID` allows the application of styles only to a particular Grid instance. To use these styles in all Grid instances, replace the `ID` with the `.k-grid` CSS class. For a complete example on showing and hiding the scrollbar depending on the number of Grid rows, refer to [this example]({% slug howto_hide_vertical_scrollbar_grid %}).

    #GridID .k-grid-header
    {
       padding: 0 !important;
    }

    #GridID .k-grid-content
    {
       overflow-y: visible;
    }

## Restoring the Scroll Position

In some scenarios, the scroll position of the Grid can be reset when the component is rebound. To prevent the restoration of the scroll position:

1. Save the scroll position in the [`dataBinding`](/api/javascript/ui/grid/events/databinding) event.
1. Restore the scroll position in the [`databound`](/api/javascript/ui/grid/events/databound) event.

The scrollable container is `div.k-grid-content` and is possible to retrieve it as a child element of the component [`wrapper`]({% slug widgetwrapperandelement_references_gettingstarted %}). If virtual scrolling is enabled, the scrollable data container is `div.k-virtual-scrollable-wrap` and is scrolled only horizontally.

    $(function () {
        // Initialize the variable which will hold the scroll positions.
        var scrollOffset = {
            left: 0,
            top: 0
        };

        // Save the scroll position before the new data is rendered.
        function onGridDataBinding (e) {
            var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
            scrollOffset.left = container.scrollLeft();
            scrollOffset.top = container.scrollTop(); // use only if virtual scrolling is disabled
        }

        // Restore the scroll position after the new data is rendered.
        function onGridDataBound (e) {
            var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
            container.scrollLeft(scrollOffset.left);
            container.scrollTop(scrollOffset.top); // use only if virtual scrolling is disabled
        }

        // Attach the Grid event handlers.
        $("#grid").kendoGrid({
            dataBinding: onGridDataBinding,
            dataBound: onGridDataBound
            // ...the rest of the code is omitted for brevity...
        });
    });

## Adjusting Scrollbar and Page Layout on Zoom

When a web page is zoomed, the browser changes the content size of all pages except for the scrollbars. This leads to misalignment between the header and the data areas in Grids that have their scrolling functionality enabled. To adjust the layout, execute the following code on `window.resize`.

> If the Grid is in the right-to-left (RTL) mode, use the `"padding-left"` instead of the `"padding-right"` configuration.

    var grid = $('#GridID').data('kendoGrid');
    grid.thead.closest(".k-grid-header").css("padding-right", kendo.support.scrollbar(true));

## See Also

* [Scrolling Grids with Locked Columns (Demo)](https://demos.telerik.com/kendo-ui/grid/frozen-columns)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Knowledge Base Section](/knowledge-base)
