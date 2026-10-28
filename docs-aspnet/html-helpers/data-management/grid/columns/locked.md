---
title: Locked
page_title: Locked Columns
description: "Learn how to configure locked columns in the Telerik UI Grid for {{ site.framework }}, including setup requirements and feature limitations."
components: ["grid"]
slug: locked_columns_aspnetcore_grid
position: 3
---

# Locked Columns

Locked (frozen) columns enable you to display specific columns at all times while the user scrolls the Grid horizontally.

For a runnable example, refer to the demo on [implementing locked columns in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/frozen-columns).

For the feature to work properly, provide the following configuration settings. These settings ensure that at least one non-locked column remains visible and that you can scroll the non-locked columns horizontally. If the available horizontal space is not enough, the horizontal scrollbar does not appear:
* Enable [scrolling]({% slug htmlhelpers_grid_aspnetcore_scrolling %}).
* Lock at least one column initially.
* Define the height of the Grid.
* Set explicit pixel widths to all columns to allow the Grid to adjust the layout of the frozen and non-frozen table parts.
* Make sure that the total width of all locked columns is equal to or less than the width of the Grid minus three times the width of the scrollbar.
* Make sure that the Grid is not [initialized inside a hidden container]({% slug hidden_containers_aspnetcore_grid %}).

>important
> The client-side API of the Grid [lockColumn()](https://docs.telerik.com/kendo-ui/api/ui/grid/methods/lockcolumn) and [unlockColumn()](https://docs.telerik.com/kendo-ui/api/ui/grid/methods/unlockcolumn) methods allow you to lock and unlock columns on the fly. This behavior is available only if at least one column is initially locked during initialization. The HTML output and script behavior of the Grid are different when you apply frozen columns, so the widget cannot switch between frozen and unfrozen mode after initialization.
>
> You can position locked columns only on the left side of the Grid. Positioning them on the right side is not supported.
>
> Row template and detail features are not supported with locked columns. If you use [multi-column headers]({% slug multicolumn_headers_aspnetcore_grid %}), you can lock a column only at the topmost level.

Locked columns cannot be scrolled on touch because they are wrapped in a container with an `overflow:hidden` style. On desktop devices, you can work around this limitation by using the `mousewheel` event. No workaround exists for touch devices.

Locked columns rely on synchronizing the row height of the frozen and non-frozen parts of the Grid. Some browsers, such as Internet Explorer 9 and Firefox, require a `line-height` style set in pixels. Otherwise, the synchronization might not work properly because of sub-pixel issues.

```CSS
div.k-grid td
{
  line-height: 18px;
}
```

When you implement custom code and rely on selectors or target the Grid table, the Grid creates separate tables for its locked and scrollable sections. The locked columns are inside a `.k-grid-content-locked` element and the scrollable content is inside a `.k-grid-content` element.

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Implementing Locked Columns in the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/frozen-columns)
* [Server-Side API](/api/grid)
