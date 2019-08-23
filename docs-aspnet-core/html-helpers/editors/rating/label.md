---
title: Label
page_title: Label | Telerik UI Rating HtmlHelper for ASP.NET Core
description: "Learn how to configure the label of the Telerik UI Rating for ASP.NET Core."
slug: htmlhelpers_rating_aspnetcore_label
position: 4
---

# Label

The Rating displays a label by default that shows the current value out of the max value in the format `3 / 5`. If the widget does not have a selected value, the label will not be displayed initially and will be toggled after an item is selected.

## Default Label

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
    )
```

## Customizing the Label

Customizing the text of the label could be achieved through the [`Label.TemplateId`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingLabelSettingsBuilder#templateidsystemstring) property.

By default, the template automatically receives the `value` and `maxValue` in the data object. This allows those properties to be used inside the template through [the Kendo UI Templates syntax](https://docs.telerik.com/kendo-ui/framework/templates/overview).

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .Label(l => l.TemplateId("rating-label-template"))
    )

    <script id="rating-label-template" type="text/x-kendo-template">
        <span>
            #: value # out of #: maxValue #
        </span>
    </script>
```

## Disabling the Label

Setting the [`Label`](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/RatingBuilder#labelsystemstring) property to false prevents the label from, being displayed.

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .Label(false)
    )
```

## See Also

* [Selection by the Rating HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/rating/selection)
* [Server-Side API](http://docs.telerik.com/aspnet-core/api/Kendo.Mvc/Rating)
