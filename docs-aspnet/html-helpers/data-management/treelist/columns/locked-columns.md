---
title: Locked
page_title: Locked Columns
description: "Get started with the Telerik UI TreeList HtmlHelper for {{ site.framework }} (Demo) supporting locked columns that are visible at all times while the user scrolls the TreeList horizontally."
slug: htmlhelpers_treelist_aspnetcore_locked_columns
position: 1
---

# Locked Columns

Locked (frozen) columns enable you to display specific columns at all times while the user scrolls the TreeList horizontally.

For a runnable example, refer to the demo on [implementing locked columns in the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/frozen-columns).

For the feature to work properly, the following configuration settings has to be provided. They ensure that at least one non-locked column is always visible and that it is possible to scroll the non-locked columns horizontally. If the horizontal space intended for it is not enough, the horizontal scrollbar does not appear.
* Enable scrolling.
* Lock at least one column initially.
* Define the height of the TreeList.
* Set explicit pixel widths to all columns to allow the TreeList to adjust the layout of the frozen and non-frozen table parts.
* Make sure that the total width of all locked columns is equal to or less than the width of the TreeList minus three times the width of the scrollbar.
* Make sure that the TreeList is not [initialized inside a hidden container](#hidden-containers).

> * The client-side [`lockColumn()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/methods/lockcolumn) and [`unlockColumn()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/methods/unlockcolumn) methods allow you to lock and unlock columns on the fly. However, this is possible only if at least one column is initially locked during initialization. The HTML output and script behavior of the TreeList are different when you apply frozen columns. That is why the TreeList cannot switch between its frozen and unfrozen mode after initialization.
> * The locked columns can be positioned only to the left side of the TreeList. Positioning them on the right side is not supported.
> * The row template and detail features are not supported in combination with locked columns. If you use [multi-column headers]({% slug multicolumn_aspnetcore_treelist_helper %}), you can lock a column at the topmost level only.

Locked columns cannot be scrolled on touch because they are wrapped in a container with an `overflow:hidden` style. To work around this limitation on desktop devices, use the `mousewheel` event. However, no workaround exists for touch devices.

Locked columns rely on synchronizing the row height of the frozen and non-frozen parts of the TreeList. Some browsers, such as Internet Explorer 9 and Firefox, require a `line-height` style set in pixels. Otherwise, the synchronization might not work properly because of sub-pixel issues.

```
div.k-treelist td
{
  line-height: 18px;
}
```

When you implement custom code and rely on selectors or target the TreeList table, the TreeList creates separate tables for its locked and scrollable sections. The locked columns are inside a `.k-grid-content-locked` element and the scrollable content is inside a `.k-grid-content` element.

## See Also

* [Implementing Locked Columns in the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/frozen-columns)
* [Server-Side API](/api/treelist)
