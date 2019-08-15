---
title: Selection
page_title: Rating Selection | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the Telerik UI for ASP.NET MVC Rating HtmlHelper and learn how to configure the selection behavior of the items."
slug: selection_ratinghelper_aspnetmvc
position: 2
---

# Selection

The Rating allows to control the selection behavior of the items by configuring the [`Selection`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property:

* single - allows selecting a single item.

* continuous - allows selecting all items from the start to the end.

## Continuous Selection

This is the default selection behavior of the Rating. If not configured, the widget will automatically set the [`Selection`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"continuous"`:

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Selection("continuous")
    )
```

## Single Selection

Single selection can be configured by setting the [`Selection`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"single"`:

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .Selection("single")
    )
```

## See Also

* [Selection by the Rating HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/rating/selection)
* [API Reference of the Rating HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/Rating)
