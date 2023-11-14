---
title: Tooltip
page_title: Tooltip
description: "Learn how to configure the tooltip of the Telerik UI Rating for {{ site.framework }}."
previous_url: /helpers/editors/rating/tooltip
slug: htmlhelpers_rating_aspnetcore_tooltip
position: 5
---

# Tooltip

Each Rating item displays a tooltip that is enabled by default and contains text that is equal to the value of the item.

## Getting Started

The following example demonstrates how to use the default tooltip of the Rating.

```HtmlHelper
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating" min="1" max="6" value="3"></kendo-rating>
```
{% endif %}

## Disabling the Tooltips

Setting the [`Tooltip`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/ratingbuilder#tooltipsystemstring) property to `false` prevents the items to display tooltips when hovered.

```HtmlHelper
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .Tooltip(false)
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating" min="1" max="6" value="3" tooltip="false"></kendo-rating>
```
{% endif %}

## See Also

* [Server-Side API](/api/rating)
