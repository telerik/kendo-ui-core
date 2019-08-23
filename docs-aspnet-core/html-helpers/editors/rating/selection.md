---
title: Selection
page_title: Selection | Telerik UI Rating HtmlHelper for ASP.NET Core
description: "Learn how to configure the selection functionality of the Telerik UI Rating for ASP.NET Core."
slug: htmlhelpers_rating_aspnetcore_selection
position: 2
---

# Selection

The Rating allows to control the selection behavior of the items by configuring the [`Selection`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property:

* single - allows selecting a single item.

* continuous - allows selecting all items from the start to the end.

## Continuous Selection

This is the default selection behavior of the Rating. If not configured, the widget will automatically set the [`Selection`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"continuous"`:

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Selection("continuous")
    )
```

## Single Selection

Single selection can be configured by setting the [`Selection`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"single"`:

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
