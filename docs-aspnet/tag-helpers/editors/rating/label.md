---
title: Label
page_title: Rating Label
description: "Learn how to configure the label of the Rating when working with the Telerik UI Rating tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_rating_aspnetcore_label
position: 4
---

# Label

The Rating displays a label by default that shows the current value out of the max value in the format `3 / 5`. If the widget does not have a selected value, the label will not be displayed initially and will be toggled after an item is selected.

## Default Label

```tagHelper
    <kendo-rating name="rating" min="1" max="6" value="3"></kendo-rating>
```

## Customizing the Label

Customizing the text of the label could be achieved through the [`Label.TemplateId`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingLabelSettingsBuilder#templateidsystemstring) property.

By default, the template automatically receives the `value` and `maxValue` in the data object. This allows those properties to be used inside the template through [the Kendo UI Templates syntax](https://docs.telerik.com/kendo-ui/framework/templates/overview).

```tagHelper
    <kendo-rating name="rating" min="1" max="6" value="3">
        <label template-id="rating-label-template" />
    </kendo-rating>

    <script id="rating-label-template" type="text/x-kendo-template">
        <span>
            #: value # out of #: maxValue #
        </span>
    </script>
```

## Disabling the Label

Setting the [`Label`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingBuilder#labelsystemstring) property to false prevents the label from, being displayed.

```Razor
    <kendo-rating name="rating" min="1" max="6" value="3">
        <label enabled="false" />
    </kendo-rating>
```

## See Also

* [Server-Side API]https://docs.telerik.com/aspnet-core/api/rating)
