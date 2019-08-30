---
title: Label
page_title: Label | Telerik UI Rating HtmlHelper for ASP.NET MVC
description: "Get started with the Telerik UI for ASP.NET MVC Rating HtmlHelper and learn how to configure the label."
slug: label_ratinghelper_aspnetmvc
position: 4
---

# Label

By default, the Rating displays a label which shows the current out of the max value in the `3 / 5` format.

If the rating does not have a selected value, the label will not be initially displayed and will be toggled after an item is selected.

## Rendering the Default Label

The following example demonstrates how to render the default label.  

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
    )
```

## Customizing the Label

To customize the text of the label, use the [`Label.TemplateId`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingLabelSettingsBuilder#templateidsystemstring) property. By default, the template automatically receives the `value` and `maxValue` in the data object which allows you to use those properties inside the template through [the Kendo UI Templates syntax](https://docs.telerik.com/kendo-ui/framework/templates/overview).

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

To prevent the label from being displayed, set the [`Label`](https://docs.telerik.com/aspnet-mvc/api//Kendo.Mvc.UI.Fluent/RatingBuilder#labelsystemstring) property to `false`.

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

* [Labels by the Rating HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/rating/label)
* [Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/Rating)
