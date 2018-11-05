---
title: Width
page_title: Width | Kendo UI Grid
description: "Learn how to apply different widths to the Kendo UI Grid for jQuery."
slug: width_kendoui_grid_widget
position: 3
---

# Width

By default, the Grid has no width and behaves like a block-level element.

This means that, similar to all block elements, it expands to a 100% width (to the width of its parent element). To control the width of the Grid, set the CSS `width` properties to the Grid itself or to some of its ancestors. If you use hierarchy and unless the detail template is scrollable, the detail template has to be narrower than the sum of the widths of all master columns.

If you enable scrolling and the sum of all column widths is greater than the width of the Grid, a horizontal scrollbar appears. If you disable scrolling and the columns do not fit, they overflow the `<div>` element of the Grid. The `div` overflowing results in the passing of the widget's right border through the data cells because the Grid is a `<table>` element inside a `<div>` element and while to enclose their content tables can expand horizontally beyond 100%, `<div>` elements lack this behavior.

You can apply any of the following possible approaches to avoid table overflowing:

* Enable the scrolling functionality which, by default, is disabled when the Kendo UI Grid MVC wrapper is in use.
* Set a large-enough width or a min-width style to the Grid wrapper&mdash;the `<div class="k-widget k-grid">` element.
* (Use this approach only if the previous two are unacceptable.) [Float](https://developer.mozilla.org/en-US/docs/Web/CSS/float) the Grid wrapper and [clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear) the float right after the widget. Floated elements expand and shrink automatically to enclose their content when needed.

## Frequently Asked Questions

### How can I apply a minimum width to the Grid?

**Solutions:**

* If scrolling is disabled, use the following CSS.

        #GridID
        {
            min-width: 800px;
        }

* If scrolling is enabled and the Grid does not use nested tables (hierarchy), use the following CSS.

        #GridID .k-grid-header-wrap > table, /* header table */
        #GridID .k-grid-content table, /* data table, no virtual scrolling */
        #GridID .k-virtual-scrollable-wrap table /* data table, with virtual scrolling */
        {
            min-width: 800px;
        }

* If scrolling is enabled the Grid uses nested tables (hierarchy), use the following CSS.

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

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
