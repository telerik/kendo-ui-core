---
title: Tooltip
page_title: Rating Tooltip | Telerik UI for ASP.NET MVC HTML Helpers
description: "Get started with the Telerik UI for ASP.NET MVC Rating HtmlHelper and learn how to configure the tooltip."
slug: tooltip_ratinghelper_aspnetmvc
position: 5
---

# Tooltip

Each Rating item displays a tooltip that is enabled by default and contains text equal to the item's value.

## Default Tooltips

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
    )
```

## Disabling the Tooltips

Setting the [`Tooltip`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#tooltipsystemstring) to false prevents the items to display tooltips when hovered.

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

* [Tooltip by the Rating HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/rating/tooltip)
* [API Reference of the Rating HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/Rating)
