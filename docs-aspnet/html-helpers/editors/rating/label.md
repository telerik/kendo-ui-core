---
title: Label
page_title: Label
description: "Learn how to configure the label of the Telerik UI Rating for {{ site.framework }}."
previous_url: /helpers/editors/rating/label
slug: htmlhelpers_rating_aspnetcore_label
position: 4
---

# Label

By default, the Rating displays a label that shows the current value out of the max value in the format `3 / 5`.

If the Rating does not have a selected value, the label will not be displayed initially and will be toggled after an item is selected.

## Getting Started

The following example demonstrates how to use the default label.

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

## Customizing the Label

To customize the text of the label, use the [`Label.TemplateId`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/ratinglabelsettingsbuilder#templateidsystemstring) property. by default, the template automatically receives the `value` and `maxValue` in the data object which allows you to use those properties inside the template through [the Kendo UI Templates syntax](https://docs.telerik.com/kendo-ui/framework/templates/overview).

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-rating name="rating" min="1" max="6" value="3">
        <label template-id="rating-label-template" />
    </kendo-rating>

    <script id="rating-label-template" type="text/x-kendo-template">
        <span>
            #: value # out of #: maxValue #
        </span>
    </script>
```
{% endif %}

## Disabling the Label

Setting the [`Label`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/ratingbuilder#labelsystemstring) property to `false` prevents the label from being displayed.

```HtmlHelper
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .Label(false)
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating" min="1" max="6" value="3">
        <label enabled="false" />
    </kendo-rating>
```
{% endif %}

## See Also

* [Server-Side API](/api/rating)
