---
title: Tooltip
page_title: jQuery Rating Documentation | Tooltip | Kendo UI
description: "Get started with the jQuery Rating by Kendo UI and learn how to configure the tooltip of the widget."
slug: tooltip_rating_widget
position: 5
---

# Tooltip

Each Rating item displays a tooltip that is enabled by default and contains text equal to the item's value.

## Default Tooltips

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

## Disabled Tooltips

Setting the [`tooltip`](http://docs.telerik.com/kendo-ui/api/javascript/rating/configuration/label.template) option to false prevents the items to display tooltips when hovered.

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
