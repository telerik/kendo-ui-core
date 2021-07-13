---
title: Precision
page_title: jQuery Rating Documentation | Precision
description: "Get started with the jQuery Rating by Kendo UI and learn how to configure the precision with which items are selected."
slug: precision_rating_widget
position: 3
---

# Precision

The Rating allows you to control the precision with which an item is selected.

To configure the [`precision`](/api/javascript/ui/rating/configuration/precision) option, use either of the available properties:

* `item`&mdash;Selects the whole item.
* `half`&mdash;Selects half of the item.

## Item Precision

The item mode is the default precision mode of the Rating. If not configured, the widget will automatically set the [`precision`](/api/javascript/ui/rating/configuration/precision) option to `"item"` which enables only whole stars to be selected by click or keyboard interaction.

```dojo
   <input id="rating" name="rating">

    <script>
        $(document).ready(function() {
            $("#rating").kendoRating({
                min: 1,
                max: 6,
                value: 3,
                precision: "item"
            });
        });
    </script>
```

## Half Precision

To configure he half precision mode of the Rating, set the [`precision`](/api/javascript/ui/rating/configuration/precision) option to `"half"` which allows you to set decimal values. The passed value is rounded during the rendering phase to display a full or half item based on the following value specifics:
* A value which is less than or equal to `.5` displays half an item.
* A value which is greater than `.5` displays a full item.

```dojo
    <input id="rating" name="rating">
    <br>
    <input id="rating2" name="rating">
    <br>
    <input id="rating3" name="rating">

    <script>
        $(document).ready(function() {
            $("#rating").kendoRating({
                min: 1,
                max: 6,
                value: 3.2,
                precision: "half"
            });

            $("#rating2").kendoRating({
                min: 1,
                max: 6,
                value: 3.5,
                precision: "half"
            });

            $("#rating3").kendoRating({
                min: 1,
                max: 6,
                value: 3.7,
                precision: "half"
            });
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Rating](/api/javascript/ui/rating)
