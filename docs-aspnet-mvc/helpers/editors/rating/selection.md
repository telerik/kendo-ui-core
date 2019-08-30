---
title: Selection
page_title: Selection | Telerik UI Rating HtmlHelper for ASP.NET MVC
description: "Get started with the Telerik UI for ASP.NET MVC Rating HtmlHelper and learn how to configure the selection behavior of the items."
slug: selection_ratinghelper_aspnetmvc
position: 2
---

# Selection

The Rating allows to control the selection behavior of its items.

To implement the selection functionality, configure the [`Selection`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property which accepts the following values:

* (Default) `continuous`&mdash;Allows the selection of all items from the start to the end.
* `single`&mdash;Allows the selection of a single item.

## Continuous Selection

Continuous selection is the default selection of the Rating. If not configured, the Rating will automatically set the [`Selection`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"continuous"`:

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Selection("continuous")
    )
```

## Single Selection

To configure the single selection, set the [`Selection`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"single"`.

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
* [Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/Rating)
