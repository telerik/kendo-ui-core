---
title: Selection
page_title: Selection
description: "Learn how to configure the selection functionality of the Telerik UI Rating for {{ site.framework }}."
previous_url: /helpers/editors/rating/selection
slug: htmlhelpers_rating_aspnetcore_selection
position: 2
---

# Selection

The Rating allows you to control the selection of its items.

To configure the [`Selection`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property, use either of the following settings:

* `continuous`&mdash;Allows the selection of all items from the start to the end.
* `single`&mdash;Allows the selection of a single item.

## Continuous Selection

The continuous selection is the default selection mode of the Rating. If not configured, the Rating will automatically set the [`Selection`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"continuous"`.

```HtmlHelper
    @(Html.Kendo().Rating()
        .Name("rating")
        .Selection("continuous")
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating" selection="continuous"></kendo-rating>
```
{% endif %}

## Single Selection

To configure the single selection mode, set the [`Selection`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"single"`.

```HtmlHelper
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .Selection("single")
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating" 
                  min="1"
                  max="6"
                  value="3"
                  selection="single">
    </kendo-rating>
```
{% endif %}

## See Also

* [Selection by the Rating HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/rating/selection)
* [Server-Side API](/api/rating)
