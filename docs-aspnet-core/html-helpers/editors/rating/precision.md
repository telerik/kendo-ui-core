---
title: Precision
page_title: Precision | Telerik UI Rating HtmlHelper for ASP.NET Core
description: "Learn how to configure the precision functionality of the Telerik UI Rating for ASP.NET Core."
slug: htmlhelpers_rating_aspnetcore_precision
position: 3
---

# Precision

The widget allows to control the precision with which an item is selected by configuring the [`Precision`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) property:

* item - selecting the whole item.

* half - selecting half of the item.

## Item Precision

This is the default precision of the Rating. If not configured, the widget will automatically set the [`Precision`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) property to `"item"`:

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Precision("item")
    )
```

## Half Precision

Half precision can be configured by setting the [`Precision`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) property to `"half"`:

With half precision the Rating widget allows to set decimal values. The passed value is rounded during the rendering phase for the purpose of displaying full or half item based on the value:

* Value which is less than or equal to .5 displays a half item.
* Value which is greater than .5 displays a full item.

```Razor
    @(Html.Kendo().Rating()
        .Name("rating1")
        .Min(1)
        .Max(6)
        .Value(3.2)
        .Precision("half")
    )
    <br>
    @(Html.Kendo().Rating()
        .Name("rating2")
        .Min(1)
        .Max(6)
        .Value(3.5)
        .Precision("half")
    )
    <br>
    @(Html.Kendo().Rating()
        .Name("rating3")
        .Min(1)
        .Max(6)
        .Value(3.7)
        .Precision("half")
    )
```

## See Also

* [Precision by the Rating HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/rating/precision)
* [Server-Side API](http://docs.telerik.com/aspnet-core/api/Kendo.Mvc/Rating)
