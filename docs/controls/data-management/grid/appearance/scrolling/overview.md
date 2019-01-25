---
title: Scrolling Configuration
page_title: jQuery Grid Documentation | Scrolling Configuration | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to configure the scrolling functionality of the widget."
slug: scrolling_kendoui_grid_widget
position: 1
---

# Configuration

The scrolling functionality of the Grid is enabled by default.

## Getting Started

To disable scrolling, set the `scrollable` option to `false`. For historical reasons, the [Grid MVC wrapper](http://docs.telerik.com/aspnet-mvc/helpers/grid/configuration#scrolling) has its scrolling disabled by default. However, the wrapper provides options for enabling the functionality if required.

###### Example

    $("#grid").kendoGrid({
        scrollable: false,
        // other configuration
    });

Though the scrolling functionality is enabled, the scrollbars do not necessarily appear. The reason for this is that scrolling requires you to define some of the Grid dimensions:

* To achieve vertical scrolling, set the height of the Grid. Otherwise, it will expand vertically to show all rows.
* To achieve horizontal scrolling, explicitly define the width of all columns in pixels and make sure their sum exceeds the width of the Grid.

You can control vertical and horizontal scrolling independently.

When scrolling is enabled, the Grid renders two tables&mdash;one for the header area and one for the scrollable data area. Take the two tables into account when you need to manually make JavaScript or CSS updates to the Grid tables.

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

## Removing the Vertical Scrollbar

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

## Restoring Scroll Positions

In some scenarios, the scroll position of the Grid might be reset when the widget is rebound. To avoid this behavior, save the scroll position in the [`dataBinding`](/api/javascript/ui/grid/events/databinding) event and restore it in the [`databound`](/api/javascript/ui/grid/events/databound) event. The scrollable container is `div.k-grid-content` and it is possible to retrieve it as a child element of the widget [`wrapper`]({% slug widgetwrapperandelement_references_gettingstarted %}).

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

## Adjusting Layout on Page Zoom

When a web page is zoomed, the browser changes the content size of all pages except for the scrollbars. This leads to misalignment between the header and the data areas in Grids that have their scrolling functionality enabled.

To adjust the layout, execute the following code on `window.resize`:

###### Example

    var grid = $('#GridID').data('kendoGrid');
    grid.thead.closest(".k-grid-header").css("padding-right", kendo.support.scrollbar(true));

If the Grid is in the right-to-left (RTL) mode, use the `"padding-left"` instead of the `"padding-right"` configuration.

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
