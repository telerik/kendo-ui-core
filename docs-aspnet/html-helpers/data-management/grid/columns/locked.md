---
title: Locked
page_title: Locked Columns
description: "Get started with the Telerik UI Grid HtmlHelper for {{ site.framework }} (Demo) supporting locked columns that are visible at all times while the user scrolls the Grid horizontally."
slug: locked_columns_aspnetcore_grid
position: 3
---

# Locked Columns

Locked (frozen) columns enable you to display specific columns at all times while the user scrolls the Grid horizontally.

For a runnable example, refer to the demo on [implementing locked columns in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/frozen-columns).

For the feature to work properly, the following configuration settings has to be provided. They ensure that at least one non-locked column is always visible and that it is possible to scroll the non-locked columns horizontally. If the horizontal space intended for it is not enough, the horizontal scrollbar does not appear.
* Enable [scrolling]({% slug htmlhelpers_grid_aspnetcore_scrolling %}).
* Lock at least one column initially.
* Define the height of the Grid.
* Set explicit pixel widths to all columns to allow the Grid to adjust the layout of the frozen and non-frozen table parts.
* Make sure that the total width of all locked columns is equal to or less than the width of the Grid minus three times the width of the scrollbar.
* Make sure that the Grid is not [initialized inside a hidden container]({% slug hidden_containers_aspnetcore_grid %}).

> * The client-side API of the Grid [lockColumn()](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/lockcolumn) and [unlockColumn()](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/unlockcolumn) methods allow you to lock and unlock columns on the fly. However, this is possible only if at least one column is initially locked during initialization. The HTML output and script behavior of the Grid are different when you apply frozen columns. That is why the widget cannot switch between frozen and unfrozen mode after initialization.
> * The locked columns can be positioned only at the left side of the Grid. Positioning them on the right side is not supported.
> * The row template and detail features are not supported in combination with locked columns. If you use [multi-column headers]({% slug multicolumn_headers_aspnetcore_grid %}), you can lock a column at the topmost level only.

Locked columns cannot be scrolled on touch because they are wrapped in a container with an `overflow:hidden` style. To work around this limitation on desktop devices, use the `mousewheel` event. However, no workaround exists for touch devices.

Locked columns rely on synchronizing the row height of the frozen and non-frozen parts of the Grid. Some browsers, such as Internet Explorer 9 and Firefox, require a `line-height` style set in pixels. Otherwise, the synchronization might not work properly because of sub-pixel issues.

```
div.k-grid td
{
  line-height: 18px;
}
```

When you implement custom code and rely on selectors or target the Grid table, the Grid creates separate tables for its locked and scrollable sections. The locked columns are inside a `.k-grid-content-locked` element and the scrollable content is inside a `.k-grid-content` element.

## See Also

* [Implementing Locked Columns in the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/frozen-columns)
* [Server-Side API](/api/grid)
