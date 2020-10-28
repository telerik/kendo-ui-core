---
title: Templates
page_title: jQuery Rating Documentation | Templates
description: "Get started with the jQuery Rating by Kendo UI and learn how to configure the item templates."
slug: templates_rating_widget
position: 5
---

# Templates

By default, each Rating item is rendered with a star icon from [the Kendo Web Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

To modify the default icon, use the `itemTemplate`, `selectedTemplate`, and `hoveredTemplate` options.

## Item Template

The item template specifies the template which is used for rendering the items of the Rating. If the `selectedTemplate` is not specified, the widget will use the default start icon for selected items. Therefore, it is recommended that you specify the `selectedTemplate` when the `itemTemplate` option is used.

```dojo
   <input id="rating" name="rating">

    <script>
        $(document).ready(function() {
            $("#rating").kendoRating({
                min: 1,
                max: 6,
                value: 3,
                itemTemplate: "<i class='k-icon k-i-heart-outline'></i>",
                selectedTemplate: "<i class='k-icon k-i-heart'></i>"
            });
        });
    </script>
```

## Selected Template

The selected template specifies the template for rendering the selected state of the items. If the `itemTemplate` is not specified, the widget will use the default start icon for displaying the normal state of the items. Therefore, it is recommended that you specify the `itemTemplate` when the `selectedTemplate` option is used.

> When the Rating is in half precision mode, use the same template for both the `selectedTemplate` and `hoveredTemplate` options.

```dojo
    <input id="rating" name="rating">

    <script>
        $(document).ready(function() {
            $("#rating").kendoRating({
                min: 1,
                max: 6,
                value: 3,
                itemTemplate: "<i class='k-icon k-i-heart-outline'></i>",
                selectedTemplate: "<i class='k-icon k-i-heart'></i>"
            });
        });
    </script>
```

## Hovered Template

The hovered template specifies the template which is used for rendering the hovered state of the items. If the `itemTemplate` is not specified, the widget will use the default start icon for displaying the normal and selected state of the items.

> When the Rating is in half precision mode, use the same template for both the `selectedTemplate` and `hoveredTemplate` options.

```dojo
    <input id="rating" name="rating">

    <script>
        $(document).ready(function() {
            $("#rating").kendoRating({
                min: 1,
                max: 6,
                value: 3,
                hoveredTemplate: "<i class='k-icon k-i-heart'></i>"
            });
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Rating](/api/javascript/ui/rating)
