---
title: Grid Border Displays over the Table
description: The table of the Grid overflows the container and its border displays over the table.
type: troubleshooting
page_title: Grid Overflows and Its Border Is Displayed over the Table | Kendo UI Grid for jQuery
slug: grid-border-displays-over-table
tags: grid, table, border, styling
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>all</td>
 </tr>
</table>

## Description

If the scrolling of the Grid is disabled and the columns or rows do fit, they overflow the `<div>` element of the Grid. As a result, the right or bottom border of the widget shows through the table cells. How can I avoid this?

## Cause

The vertical overflowing of the table occurs if:
* The scrolling of the Grid is disabled, and
* The Grid has an explicit height that is smaller than the space occupied by the table.

The horizontal overflowing of the table occurs if:
* The scrolling of the Grid is disabled, and
* The columns cannot fit in the available horizontal space that is determined by the width of the Grid parent.

The Grid is a `<table>` inside a `<div>` element. While tables are able to expand horizontally beyond 100% to enclose their content, the `<div>` elements lack this behavior.

## Solution

To fix this issue, apply the following approaches for:

* [Vertical overflowing](#vertical-overflowing)
* [Horizontal overflowing](#horizontal-overflowing)

### Vertical Overflowing

To fix the vertical overflowing of the Grid, use any of the following approaches:

* Enable the scrolling functionality of the Grid. It is active by default except when using the [Kendo UI Grid for ASP.NET MVC](https://docs.telerik.com/aspnet-mvc/helpers/grid/overview) (for historical and backwards compatibility reasons).
* Remove the `height` of the Grid. Apply a height for the Grid only if the scrolling of the Grid is enabled.
* Apply an `overflow:auto` style to the `<div>` of the Grid, that is, to the `<div class="k-widget k-grid">` element. Use this approach only if the previous ones are unacceptable.

### Horizontal Overflowing

To fix the horizontal overflowing of the Grid, use any of the following approaches:

* Enable the scrolling functionality of the Grid. It is active by default except when using the [Kendo UI Grid for ASP.NET MVC](https://docs.telerik.com/aspnet-mvc/helpers/grid/overview) (for historical and backwards compatibility reasons).
* Set a `width` that is large enough to display the content of the Grid or set a `min-width` style to the `<div>` of the Grid, that is, to the `<div class="k-widget k-grid">` element.
* Apply a `display:table` or `display:table-cell` style to the `<div>` of the Grid.
* [Float](https://developer.mozilla.org/en-US/docs/Web/CSS/float) the Grid wrapper and [clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear) the float right after the widget. Floated elements expand and shrink automatically to enclose their content when needed. Use this approach only if the previous ones are unacceptable.

## See Also

* [Appearance of the Kendo UI Grid]({% slug hidden_containers_kendoui_grid_widget %})
