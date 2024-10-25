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

To configure the [`Precision`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/ratingbuilder#precisionsystemstring) property, use either of the available properties:

* `item`&mdash;Selects the whole item.
* `half`&mdash;Selects half of the item.

## Item Precision

The item mode is the default precision mode of the Rating. If not configured, the widget will automatically set the [`Precision`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/ratingbuilder#precisionsystemstring) property to `"item"` which enables only whole stars to be selected by click or keyboard interaction.

```HtmlHelper
    @(Html.Kendo().Rating()
        .Name("rating")
        .Precision("item")
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating" precision="item"></kendo-rating>
```
{% endif %}

## Half Precision

To configure he half precision mode of the Rating, set the [`Precision`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/ratingbuilder#precisionsystemstring) option to `"half"` which allows you to set decimal values. The passed value is rounded during the rendering phase to display a full or half item based on the following value specifics:
* A value which is less than or equal to `.5` displays half an item.
* A value which is greater than `.5` displays a full item.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-rating name="rating"
                  min="1"
                  max="6"
                  value="3.2"
                  precision="half">
    </kendo-rating>
    <br>
    <kendo-rating name="rating2"
                  min="1"
                  max="6"
                  value="3.5"
                  precision="half">
    </kendo-rating>
    <br>
    <kendo-rating name="rating3"
                  min="1"
                  max="6"
                  value="3.7"
                  precision="half">
    </kendo-rating>
```
{% endif %}

## See Also

* [Precision by the Rating HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/rating/precision)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/rating)
