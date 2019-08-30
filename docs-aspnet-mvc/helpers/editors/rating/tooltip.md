---
title: Tooltip
page_title: Tooltip | Telerik UI Rating HtmlHelper for ASP.NET MVC
description: "Get started with the Telerik UI for ASP.NET MVC Rating HtmlHelper and learn how to configure the tooltip."
slug: tooltip_ratinghelper_aspnetmvc
position: 5
---

# Tooltip

By default, each Rating item displays a tooltip which contains text that equals the value of the item.

## Rendering the Default Tooltip

The following example demonstrates how to render the default tooltip.  

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
    )
```

## Disabling the Tooltips

To prevent the tooltip from displaying on hover, set the [`Tooltip`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#tooltipsystemstring) to `false`.

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .Tooltip(false)
    )
```

## See Also

* [Tooltips by the Rating HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/rating/tooltip)
* [Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/Rating)
