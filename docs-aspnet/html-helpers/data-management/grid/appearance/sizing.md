---
title: Sizing
page_title: Telerik UI Grid component for {{ site.framework }} Documentation - Sizing
description: "Get started with the Telerik UI Grid for {{ site.framework }} and learn about its sizing options."
slug: sizing_grid
position: 6
---

# Sizing

The sizing feature of the Telerik UI for {{ site.framework }} Data Grid attempts at addressing the requirement for a compact grid component, which renders more items by utilizing the available space mainly through setting smaller paddings in its cells.

To increase or decrease the size of the Grid, utilize its [`Size`](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/gridbuilder#sizekendomvcuicomponentsize) configuration.

> Changing the `Size` property affects different building blocks of the component such as tables, buttons, inputs, an dropdowns among others.

```C#
            @(Html.Kendo().Grid<ModelName>()
               .Name("compact-grid")
               .Size(ComponentSize.Small) // Enable compact Grid.
```

## Affected Elements

The `Size` option does not affect elements which are displayed inside a popup such as a Filter Menu, Column Menu, and so on. By design, all popup elements are rendered on root level and not inside the Grid.

## See Also

* [Sizing the Telerik UI for {{ site.framework }} Data Grid (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/sizing)
* [JavaScript API Reference of the size property](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/size)
