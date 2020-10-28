---
title: Tooltip
page_title: jQuery Rating Documentation | Tooltip
description: "Get started with the jQuery Rating by Kendo UI and learn how to configure the tooltip of the widget."
slug: tooltip_rating_widget
position: 5
---

# Tooltip

Each Rating item displays a tooltip that is enabled by default and contains text that is equal to the value of the item.

## Getting Started

The following example demonstrates how to use the default tooltip of the Rating.

```dojo
   <input id="rating" name="rating">

    <script>
        $(document).ready(function() {
            $("#rating").kendoRating({
                min: 1,
                max: 6
            });
        });
    </script>
```

## Disabling Tooltips

Setting the [`tooltip`](/api/javascript/ui/rating/configuration/tooltip) option to `false` prevents the items to display tooltips when hovered.

```dojo
    <input id="rating" name="rating">

    <script>
        $(document).ready(function() {
            $("#rating").kendoRating({
                min: 1,
                max: 6,
                value: 3,
                tooltip: false
            });
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Rating](/api/javascript/ui/rating)
