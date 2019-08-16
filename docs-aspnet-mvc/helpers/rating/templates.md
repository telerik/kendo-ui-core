---
title: Templates
page_title: Rating Templates | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the Telerik UI for ASP.NET MVC Rating HtmlHelper and learn how to configure the item templates."
slug: templates_ratinghelper_aspnetmvc
position: 6
---

# Templates

By default each Rating item is rendered with a star icon from [the Kendo Web Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

Modifying the default icon could be achieved through the [`ItemTemplate`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#itemtemplatesystemstring), [`SelectedTemplate`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#selectedtemplatesystemstring) and [`HoveredTemplate`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#hoveredtemplatesystemstring) properties.

## Item Template

Specifies the template which is used for rendering the items of the Rating.

If the `SelectedTemplate` is not specified, the widget will use the default start icon for selected items. Therefore, it is recommended to specify the `SelectedTemplate` when the `ItemTemplate` option is used.

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

Specifies the template which is used for rendering the selected state of the items.

If the `ItemTemplate` is not specified, the widget will use the default start icon for displaying the normal state of the items. Therefore, it is recommended to specify the `ItemTemplate` when the `SelectedTemplate` option is used.

> When the Rating is in half precision mode it is recommended to use the same template for both the SelectedTemplate and HoveredTemplate options.

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

Specifies the template which is used for rendering the hovered state of the items.

If the `ItemTemplate` is not specified, the widget will use the default start icon for displaying the normal and selected state of the items.

> When the Rating is in half precision mode it is recommended to use the same template for both the SelectedTemplate and HoveredTemplate options.

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

* [Tooltip by the Rating HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/rating/tooltip)
* [API Reference of the Rating HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/Rating)
