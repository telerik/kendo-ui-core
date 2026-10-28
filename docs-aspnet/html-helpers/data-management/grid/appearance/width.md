---
title: Width
page_title: Width
description: "Learn how to set Grid column widths in {{ site.framework }} for responsive layouts and complex hierarchy."
components: ["grid"]
slug: width_grid_aspnetcore
position: 2
---

# Width

By default, the Grid has no set width. It behaves like a block-level element and expands to 100% of its parent element width.

## Getting Started

To control the width of the Grid, set CSS `width` properties on the Grid element or its ancestors. When you use hierarchy and the detail template is not scrollable, the detail template must be narrower than the combined width of all master columns. For more information about supported Grid scroll modes, see [Scroll Modes of the Grid HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_grid_aspnetcore_scrolling %}).

If you enable scrolling and the sum of all column widths is greater than the Grid width, a horizontal scrollbar appears. If you disable scrolling and the columns do not fit, they overflow the Grid `<div>` element. This overflow can move the Grid right border through the data cells because the Grid renders a `<table>` inside a `<div>`. The table can grow beyond 100% width to fit its content, but the `<div>` cannot.

To avoid table overflowing, apply any of the following approaches:
* Enable scrolling, which is disabled by default when you use the Kendo UI Grid MVC wrapper.
* Set a large enough `width` or `min-width` style on the Grid wrapper (`<div class="k-widget k-grid">`).
* (Use this approach only if the previous two are unacceptable.) [Float](https://developer.mozilla.org/en-US/docs/Web/CSS/float) the Grid wrapper and [clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear) the float right after the Grid. Floated elements expand and shrink automatically to enclose their content when needed.

## Applying a Minimum Width

Depending on the specific scenarios, you can use any of the following approaches to define a minimum width to the Grid.

* If scrolling is disabled, use the following CSS.

    ```CSS
    #GridID
    {
        min-width: 800px;
    }
    ```

* If scrolling is enabled and the Grid is not hierarchical (with no nested tables), use the following CSS. For more information about supported Grid scroll modes, see [Scroll Modes of the Grid HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_grid_aspnetcore_scrolling %}).

    ```CSS
    /* Header table */
    #GridID .k-grid-header-wrap > table,
    /* Data table without virtual scrolling */
    #GridID .k-grid-content table,
    /* Data table with virtual scrolling */
    #GridID .k-virtual-scrollable-wrap table
    {
        min-width: 800px;
    }
    ```

* If scrolling is enabled and the Grid is hierarchical (with nested tables), use the following CSS. For more information about supported Grid scroll modes, see [Scroll Modes of the Grid HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_grid_aspnetcore_scrolling %}).

    ```CSS
    /* Header table */
    #GridID .k-grid-header-wrap > table,
    /* Data table without virtual scrolling */
    #GridID .k-grid-content table,
    /* Data table with virtual scrolling */
    #GridID .k-virtual-scrollable-wrap table
    {
        min-width: 800px;
    }
    /* Nested data table without virtual scrolling */
    #GridID .k-grid-content table table,
    /* Nested data table with virtual scrolling */
    #GridID .k-virtual-scrollable-wrap table table
    {
        min-width: initial;
    }
    ```

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Scrolling by the Grid HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/virtualization-remote-data)
* [Scroll Modes of the Grid HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_grid_aspnetcore_scrolling %})
* [Server-Side API](/api/grid)
