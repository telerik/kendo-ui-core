---
title: Sizing
page_title: Telerik UI Grid component for {{ site.framework }} Documentation - Sizing
description: "Configure Grid sizing in {{ site.framework }} by setting the Size option and adjusting element dimensions."
components: ["grid"]
slug: sizing_grid
position: 7
---

# Sizing

Use the sizing feature to make the Telerik UI for {{ site.framework }} Data Grid more compact. Smaller paddings and element sizes let the Grid render more data in the same space.

To increase or decrease the size of the Grid, utilize its [`Size`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridbuilder#sizekendomvcuicomponentsize) configuration.

>note Changing the `Size` property affects Grid building blocks such as tables, buttons, inputs, and dropdowns.

```C#
@(Html.Kendo().Grid<ModelName>()
   .Name("compact-grid")
   .Size(ComponentSize.Small)
)
```

## Affected Elements

The `Size` option does not affect elements that appear inside popups, such as the Filter Menu and Column Menu. By design, popup elements render at the root level, outside the Grid.

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Sizing the Telerik UI for {{ site.framework }} Data Grid (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/sizing)
* [JavaScript API Reference of the size property](https://docs.telerik.com/kendo-ui/api/ui/grid/configuration/size)
