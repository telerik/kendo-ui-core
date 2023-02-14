---
title: Templates
page_title: Templates
description: "Learn how to configure the templates of the Telerik UI Rating for {{ site.framework }}."
previous_url: /helpers/editors/rating/templates
slug: htmlhelpers_rating_aspnetcore_templates
position: 6
---

# Templates

By default, each Rating item is rendered with a star icon from [the Kendo Web Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

To modify the default icon, use the [`ItemTemplate`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/RatingBuilder#itemtemplatesystemstring), [`SelectedTemplate`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/RatingBuilder#selectedtemplatesystemstring), and [`HoveredTemplate`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/RatingBuilder#hoveredtemplatesystemstring) properties.

## Item Template

The item template specifies the template which is used for rendering the items of the Rating. If the `SelectedTemplate` is not specified, the helper will use the default start icon for selected items. Therefore, it is recommended that you specify the `SelectedTemplate` when the `ItemTemplate` option is used.

```HtmlHelper
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .ItemTemplate("<i class='k-icon k-i-heart-outline'></i>")
        .SelectedTemplate("<i class='k-icon k-i-heart'></i>")
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating"
                  min="1"
                  max="6"
                  value="3"
                  item-template-id="rating-item-template"
                  selected-template-id="rating-selected-template">
    </kendo-rating>

    <script id="rating-item-template" type="text/x-kendo-template">
        <i class='k-icon k-i-heart-outline'></i>
    </script>

    <script id="rating-selected-template" type="text/x-kendo-template">
        <i class='k-icon k-i-heart'></i>
    </script>
```
{% endif %}

## Selected Template

The selected template specifies the template for rendering the selected state of the items. If the `ItemTemplate` is not specified, the helper will use the default start icon for displaying the normal state of the items. Therefore, it is recommended that you specify the `ItemTemplate` when the `SelectedTemplate` option is used.

> When the Rating is in half precision mode, use the same template for both the `SelectedTemplate` and `HoveredTemplate` options.

```HtmlHelper
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .ItemTemplate("<i class='k-icon k-i-heart-outline'></i>")
        .SelectedTemplate("<i class='k-icon k-i-heart'></i>")
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating"
                  min="1"
                  max="6"
                  value="3"
                  item-template-id="rating-item-template"
                  selected-template-id="rating-selected-template">
    </kendo-rating>

    <script id="rating-item-template" type="text/x-kendo-template">
        <i class='k-icon k-i-heart-outline'></i>
    </script>

    <script id="rating-selected-template" type="text/x-kendo-template">
        <i class='k-icon k-i-heart'></i>
    </script>
```
{% endif %}

## Hovered Template

The hovered template specifies the template which is used for rendering the hovered state of the items. If the `ItemTemplate` is not specified, the helper will use the default start icon for displaying the normal and selected state of the items.

> When the Rating is in half precision mode, use the same template for both the `SelectedTemplate` and `HoveredTemplate` options.

```HtmlHelper
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
        .HoveredTemplate("<i class='k-icon k-i-heart'></i>")
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating"
                  min="1"
                  max="6"
                  value="3"
                  hovered-template-id="rating-selected-template">
    </kendo-rating>

    <script id="rating-hovered-template" type="text/x-kendo-template">
        <i class='k-icon k-i-heart'></i>
    </script>
```
{% endif %}

## See Also

* [Server-Side API](/api/rating)
