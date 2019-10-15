---
title: Selection
page_title: Selection | Telerik UI Rating HtmlHelper for ASP.NET Core
description: "Learn how to configure the selection functionality of the Telerik UI Rating for ASP.NET Core."
slug: htmlhelpers_rating_aspnetcore_selection
position: 2
---

# Selection

The Rating allows you to control the selection of its items.

To configure the [`Selection`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property, use either of the following settings:

* `continuous`&mdash;Allows the selection of all items from the start to the end.
* `single`&mdash;Allows the selection of a single item.

## Continuous Selection

The continuous selection is the default selection mode of the Rating. If not configured, the Rating will automatically set the [`Selection`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"continuous"`.

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Selection("continuous")
    )
```

## Single Selection

To configure the single selection mode, set the [`Selection`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"single"`.

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

* [Selection by the Rating HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/rating/selection)
* [Server-Side API](http://docs.telerik.com/aspnet-core/api/Kendo.Mvc/Rating)
