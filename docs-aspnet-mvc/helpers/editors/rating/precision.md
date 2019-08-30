---
title: Precision
page_title: Precision | Telerik UI Rating HtmlHelper for ASP.NET MVC
description: "Get started with the Telerik UI for ASP.NET MVC Rating HtmlHelper and learn how to configure the precision with which an item is selected."
slug: precision_ratinghelper_aspnetmvc
position: 3
---

# Precision

The Telerik UI Rating allows you to control the precision with which an item is selected.

To implement the precision functionality, configure the [`Precision`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) property which accepts the following values:

* (Default) `item`&mdash;Selects the whole item.
* `half`&mdash;Selects half of the item.

## Item Precision

Item precision is the default precision of the Rating. If not configured, the Rating will automatically set the [`Precision`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) property to `"item"`:

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Precision("item")
    )
```

## Half Precision

To configure the half precision, set the [`Precision`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) property to `"half"`. The half precision enables you to set decimal values. During the rendering phase, the passed value is rounded to display the full item or half of the item based on the value.

* A value which is less than or equal to `.5` displays half an item.
* A value which is greater than `.5` displays a full item.

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

* [Precision by the Rating HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/rating/precision)
* [Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/Rating)
