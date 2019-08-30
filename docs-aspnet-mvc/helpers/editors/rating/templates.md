---
title: Templates
page_title: Templates | Telerik UI Rating HtmlHelper for ASP.NET MVC
description: "Get started with the Telerik UI for ASP.NET MVC Rating HtmlHelper and learn how to configure the item templates."
slug: templates_ratinghelper_aspnetmvc
position: 6
---

# Templates

By default, each Rating item is rendered with a star icon from [the Kendo UI Web Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

To modify the default icon, use the [`ItemTemplate`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#itemtemplatesystemstring), [`SelectedTemplate`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectedtemplatesystemstring), and [`HoveredTemplate`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#hoveredtemplatesystemstring) properties.

## Item Template

The item template specifies the template which is used for rendering the items of the Rating. If the `SelectedTemplate` is not specified, the Rating will use the default start icon for selected items. Therefore, when the `ItemTemplate` option is used, you have to specify the `SelectedTemplate`.

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .ItemTemplate("<i class='k-icon k-i-heart-outline'></i>")
        .SelectedTemplate("<i class='k-icon k-i-heart'></i>")
    )
```

## Selected Template

The selected template specifies the template which is used for rendering the selected state of the items. If the `ItemTemplate` is not specified, the Rating will use the default start icon for displaying the normal state of the items. Therefore, when the `SelectedTemplate` option is used, you have to specify the `ItemTemplate`.

> When the Rating is in its half precision mode, use the same template for both the `SelectedTemplate` and `HoveredTemplate` options.

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .ItemTemplate("<i class='k-icon k-i-heart-outline'></i>")
        .SelectedTemplate("<i class='k-icon k-i-heart'></i>")
    )
```

## Hovered Template

The hovered template specifies the template which is used for rendering the hovered state of the items. If the `ItemTemplate` is not specified, the Rating will use the default start icon for displaying the normal and selected state of the items.

> When the Rating is in its half precision mode, use the same template for both the `SelectedTemplate` and `HoveredTemplate` options.

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .HoveredTemplate("<i class='k-icon k-i-heart'></i>")
    )
```

## See Also

* [Templates by the Rating HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/rating/templates)
* [Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/Rating)
