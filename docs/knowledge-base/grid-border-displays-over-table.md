---
title: Grid Border Displays Over the Table
description: The Grid table overflows the container and the Grid border displays over the table
type: troubleshooting
page_title: Grid Border Displays Over the Table
slug: grid-border-displays-over-table
position: 0
tags: grid,table,border,styling
teampulseid:
ticketid:
pitsid:

---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress® Kendo UI® version</td>
  <td>all4</td>
 </tr>
</table>

## Description

If Grid scrolling is disabled and the columns or rows cannot fit, they will overflow the `<div>` element of the Grid. This will result in the widget's right or bottom border passing through the table cells.

Vertical overflowing is possible only if Grid scrolling is disabled and the Grid has an explicit height, which is smaller than the space occupied by the table.

Horizontal overflowing is possible if Grid scrolling is disabled and the columns cannot fit in the available horizontal space, determined by the width of the Grid parent. The Grid is a <table> element inside a <div>. Tables can expand horizontally beyond 100% to enclose their content, while <div> elements lack this behavior.

## Possible Solutions

### For vertical overflowing

* Enable the scrolling functionality, which is enabled by default, except when using the [Kendo UI Grid MVC wrapper](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview) (for historical and backwards compatibility reasons).
* Remove the Grid `height`. A height should be applied only if Grid scrolling is enabled.
* Apply an `overflow:auto` style to the Grid `<div>`, i.e. the `<div class="k-widget k-grid">` element. Use this approach only if the previous ones are unacceptable.

### For horizontal overflowing

* Enable the scrolling functionality, which is enabled by default, except when using the [Kendo UI Grid MVC wrapper](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview) (for historical and backwards compatibility reasons).
* Set a large-enough `width` or a `min-width` style for the Grid `<div>`, i.e. the `<div class="k-widget k-grid">` element.
* Apply a `display:table` or `display:table-cell` style to the Grid `<div>`.
* [Float](https://developer.mozilla.org/en-US/docs/Web/CSS/float) the Grid wrapper and [clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear) the float right after the widget. Floated elements expand and shrink automatically to enclose their content when needed. Use this approach only if the previous ones are unacceptable.

## See Also

[Kendo UI Grid Appearance](http://docs.telerik.com/kendo-ui/controls/data-management/grid/appearance)
