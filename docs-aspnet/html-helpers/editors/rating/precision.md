---
title: Precision
page_title: Precision
description: "Learn how to configure the precision functionality of the Telerik UI Rating for {{ site.framework }}."
previous_url: /helpers/editors/rating/precision
slug: htmlhelpers_rating_aspnetcore_precision
position: 3
---

# Precision

The Rating allows you to control the precision with which an item is selected.

To configure the [`Precision`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) property, use either of the available properties:

* `item`&mdash;Selects the whole item.
* `half`&mdash;Selects half of the item.

## Item Precision

The item mode is the default precision mode of the Rating. If not configured, the widget will automatically set the [`Precision`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) property to `"item"` which enables only whole stars to be selected by click or keyboard interaction.

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Precision("item")
    )
```

## Half Precision

To configure he half precision mode of the Rating, set the [`Precision`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) option to `"half"` which allows you to set decimal values. The passed value is rounded during the rendering phase to display a full or half item based on the following value specifics:
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

* [Precision by the Rating HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/rating/precision)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/rating)
