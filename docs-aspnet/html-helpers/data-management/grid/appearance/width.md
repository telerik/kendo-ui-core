---
title: Width
page_title: Width
description: "Get started with the Telerik UI Grid component for {{ site.framework }} and learn how to apply different widths to the Grid."
slug: width_grid_aspnetcore
position: 2
---

# Width

By default, the Grid has no set width, behaves like a block-level element, and expands to a 100% width (the width of the parent element).

## Getting Started

To control the width of the Grid, set the CSS `width` properties to the Grid itself or to some of its ancestors. If you use hierarchy and unless the detail template is scrollable, the detail template has to be narrower than the sum of the widths of all master columns. For more information on the supported scroll modes by the Grid, refer to the [article on scrolling]({% slug htmlhelpers_grid_aspnetcore_scrolling %}).

If you enable scrolling and the sum of all column widths is greater than the width of the Grid, a horizontal scrollbar appears. If you disable scrolling and the columns do not fit, they overflow the `<div>` element of the Grid. The `div` overflowing results in the passing of the right border of the Grid through the data cells because the Grid is a `<table>` element inside a `<div>` element and while to enclose their content tables can expand horizontally beyond 100%, `<div>` elements lack this behavior.

To avoid table overflowing, apply any of the following approaches:
* Enable the scrolling functionality which, by default, is disabled when the Kendo UI Grid MVC wrapper is in use.
* Set a large-enough width or a min-width style to the Grid wrapper&mdash;the `<div class="k-widget k-grid">` element.
* (Use this approach only if the previous two are unacceptable.) [Float](https://developer.mozilla.org/en-US/docs/Web/CSS/float) the Grid wrapper and [clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear) the float right after the Grid. Floated elements expand and shrink automatically to enclose their content when needed.

## Applying a Minimum Width

Depending on the specific scenarios, you can use any of the following approaches to define a minimum width to the Grid.

* If scrolling is disabled, use the following CSS.

        #GridID
        {
            min-width: 800px;
        }

* If scrolling is enabled and the Grid is not hierarchical (with no nested tables), use the following CSS. For more information on the supported scroll modes by the Grid, refer to the [article on scrolling]({% slug htmlhelpers_grid_aspnetcore_scrolling %}).

        #GridID .k-grid-header-wrap > table, // A header table.
        #GridID .k-grid-content table, // A data table, no virtual scrolling.
        #GridID .k-virtual-scrollable-wrap table // A data table, with virtual scrolling.
        {
            min-width: 800px;
        }

* If scrolling is enabled and the Grid is hierarchical (with nested tables), use the following CSS. For more information on the supported scroll modes by the Grid, refer to the [article on scrolling]({% slug htmlhelpers_grid_aspnetcore_scrolling %}).

        #GridID .k-grid-header-wrap > table, // A header table.
        #GridID .k-grid-content table, // A data table, no virtual scrolling.
        #GridID .k-virtual-scrollable-wrap table // A data table, with virtual scrolling.
        {
            min-width: 800px;
        }
        #GridID .k-grid-content table table, // A data table, no virtual scrolling.
        #GridID .k-virtual-scrollable-wrap table table // A data table, with virtual scrolling.
        {
            min-width: initial;
        }

## See Also

* [Scrolling by the Grid HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/virtualization-remote-data)
* [Scroll Modes of the Grid HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_grid_aspnetcore_scrolling %})
* [Server-Side API](/api/grid)
