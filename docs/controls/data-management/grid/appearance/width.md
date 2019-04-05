---
title: Width
page_title: Get started with the jQuery Grid by Kendo UI and learn how to apply different widths to the widget.
description: "jQuery Grid Documentation | Width | Kendo UI"
slug: width_kendoui_grid_widget
position: 2
---

# Width

By default, the Grid has no set width, behaves like a block-level element, and expands to a 100% width (the width of the parent element).

## Setting the Width

To control the width of the Grid, set the CSS `width` properties to the Grid itself or to some of its ancestors. If you use hierarchy and unless the detail template is scrollable, the detail template has to be narrower than the sum of the widths of all master columns. For more information on the supported scroll modes by the Grid, refer to the [section on scrolling]({% slug scrolling_kendoui_grid_widget %}).

If you enable scrolling and the sum of all column widths is greater than the width of the Grid, a horizontal scrollbar appears. If you disable scrolling and the columns do not fit, they overflow the `<div>` element of the Grid. The `div` overflowing results in the passing of the widget's right border through the data cells because the Grid is a `<table>` element inside a `<div>` element and while to enclose their content tables can expand horizontally beyond 100%, `<div>` elements lack this behavior.

To avoid table overflowing, apply any of the following approaches:
* Enable the scrolling functionality which, by default, is disabled when the Kendo UI Grid MVC wrapper is in use.
* Set a large-enough width or a min-width style to the Grid wrapper&mdash;the `<div class="k-widget k-grid">` element.
* (Use this approach only if the previous two are unacceptable.) [Float](https://developer.mozilla.org/en-US/docs/Web/CSS/float) the Grid wrapper and [clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear) the float right after the widget. Floated elements expand and shrink automatically to enclose their content when needed.

## Applying Minimum Width

Depending on the specific scenarios, you can use any of the following approaches to define a minimum width to the Grid.

* If scrolling is disabled, use the following CSS.

        #GridID
        {
            min-width: 800px;
        }

* If scrolling is enabled and the Grid is not hierarchical (with no nested tables), use the following CSS. For more information on the supported scroll modes by the Grid, refer to the [section on scrolling]({% slug scrolling_kendoui_grid_widget %}).

        #GridID .k-grid-header-wrap > table, // header table
        #GridID .k-grid-content table, // data table, no virtual scrolling
        #GridID .k-virtual-scrollable-wrap table // data table, with virtual scrolling
        {
            min-width: 800px;
        }

* If scrolling is enabled and the Grid is hierarchical (with nested tables), use the following CSS. For more information on the supported scroll modes by the Grid, refer to the [section on scrolling]({% slug scrolling_kendoui_grid_widget %}).

        #GridID .k-grid-header-wrap > table, // header table
        #GridID .k-grid-content table, // data table, no virtual scrolling
        #GridID .k-virtual-scrollable-wrap table // data table, with virtual scrolling
        {
            min-width: 800px;
        }
        #GridID .k-grid-content table table, // data table, no virtual scrolling
        #GridID .k-virtual-scrollable-wrap table table // data table, with virtual scrolling
        {
            min-width: initial;
        }

## See Also

* [Scroll Modes of the Grid]({% slug scrolling_kendoui_grid_widget %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
