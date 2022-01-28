---
title: Adaptive Rendering
page_title: Adaptive Rendering
description: "Get started with the {{ site.framework }} Grid by Telerik UI which provides consistency to the customer experience on any device by supporting adaptive rendering."
previous_url: /html-helpers/data-management/grid/adaptive, /helpers/data-management/grid/adaptive
slug: adaptive_rendering_gridhelper_aspnetcore
position: 5
---

# Adaptive Rendering

The Telerik UI Grid for {{ site.framework }} provides consistency to the customer experience on any device by supporting adaptive enhancements.

For example, when you filter or edit data on mobile, the system slides in a new screen for the user, which is a departure from the desktop-like inline and popup behaviors. For a runnable example, refer to the [demo on implementing the responsive web design in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/adaptive-rendering).

## Enabling the Responsive Web Design

To enable the adaptive rendering feature, set the [`Mobile`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridBuilder#mobile) property to `MobileMode.Auto` or `MobileMode.Phone`:

* If set to `MobileMode.Auto`, the component will use adaptive rendering when viewed on a mobile browser.
* If set to `MobileMode.Phone`, the component will be forced to use adaptive rendering regardless of the browser type.

> Important: With the mobile rendering, we recommend to set up `height` as well. Without setting an explicit height, every view of the grid might have a different height.

```Razor
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .Mobile()
        .HtmlAttributes(new { style = "height:450px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )
```

## Resizing Columns

The column resizing feature on touch screen devices is triggered when the user holds a finger on the respective column header. When the resizing icon appears, the user can resize the column by dragging.

![A Grid with resizable columns on a mobile device](../adaptive-resizing-icon.png)

## Destroying Adaptive Grids

When the Grid is in its adaptive rendering mode, it generates auxiliary markup which needs to be removed if the Grid is to be `destroyed` manually.

To manually destroy the Grid:

1. Call the Kendo UI for jQuery [`kendo.destroy()`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/destroy) method over the closest `.k-pane-wrapper` ancestor which is created around the Grid.
1. Remove the whole `.k-pane-wrapper` element from the DOM.

## See Also

* [Responsive Columns by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/responsive-columns)
* [Adaptive Rendering by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/adaptive-rendering)
* [Server-Side API](/api/grid)
