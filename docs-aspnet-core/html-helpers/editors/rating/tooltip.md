---
title: Tooltip
page_title: Tooltip | Telerik UI Rating HtmlHelper for ASP.NET Core
description: "Learn how to configure the tooltip of the Telerik UI Rating for ASP.NET Core."
slug: htmlhelpers_rating_aspnetcore_tooltip
position: 5
---

# Tooltip

Each Rating item displays a tooltip that is enabled by default and contains text that is equal to the value of the item.

## Getting Started

The following example demonstrates how to use the default tooltip of the Rating.

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
    )
```

## Disabling the Tooltips

Setting the [`Tooltip`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingBuilder#tooltipsystemstring) property to `false` prevents the items to display tooltips when hovered.

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

* [Server-Side API](http://docs.telerik.com/aspnet-core/api/Kendo.Mvc/Rating)
