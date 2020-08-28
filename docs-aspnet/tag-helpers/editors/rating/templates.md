---
title: Templates
page_title: Rating Templates
description: "Learn how to configure the item templates of the Rating when working with the Telerik UI Rating tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_rating_aspnetcore_templates
position: 6
---

# Templates

By default each Rating item is rendered with a star icon from [the Kendo Web Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web). Modifying the default icon could be achieved through the [`ItemTemplate`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingBuilder#itemtemplatesystemstring), [`SelectedTemplate`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingBuilder#selectedtemplatesystemstring) and [`HoveredTemplate`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingBuilder#hoveredtemplatesystemstring) properties.

## Item Template

Specifies the template which is used for rendering the items of the Rating.

If the `SelectedTemplate` is not specified, the widget will use the default start icon for selected items. Therefore, it is recommended to specify the `SelectedTemplate` when the `ItemTemplate` option is used.

```Razor
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

## Selected Template

Specifies the template which is used for rendering the selected state of the items.

If the `ItemTemplate` is not specified, the widget will use the default start icon for displaying the normal state of the items. Therefore, it is recommended to specify the `ItemTemplate` when the `SelectedTemplate` option is used.

> **Important**
> * When the Rating is in half precision mode it is recommended to use the same template for both the SelectedTemplate and HoveredTemplate options.

```Razor
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

## Hovered Template

Specifies the template which is used for rendering the hovered state of the items.

If the `itemTemplate` is not specified, the widget will use the default start icon for displaying the normal and selected state of the items.

> **Important**
> * When the Rating is in half precision mode it is recommended to use the same template for both the SelectedTemplate and HoveredTemplate options.

```Razor
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

## See Also

* [Server-Side API](https://docs.telerik.com/aspnet-core/api/rating)
