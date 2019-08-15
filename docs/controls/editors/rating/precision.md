---
title: Precision
page_title: jQuery Rating Documentation | Precision | Kendo UI
description: "Get started with the jQuery Rating by Kendo UI and learn how to configure the precision with which items are selected."
slug: precision_rating_widget
position: 3
---

# Precision

The widget allows to control the precision with which an item is selected by configuring the [`precision`](http://docs.telerik.com/kendo-ui/api/javascript/rating/configuration/label.template) option:

* item - selecting the whole item.

* half - selecting half of the item.

## Item Precision

This is the default precision mode of the Rating. If not configured, the widget will automatically set the [`precision`](http://docs.telerik.com/kendo-ui/api/javascript/rating/configuration/label.template) option to `"item"`:

In this mode only whole stars can be selected by click or keyboard interaction.

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

Half precision can be configured by setting the [`precision`](http://docs.telerik.com/kendo-ui/api/javascript/rating/configuration/label.template) option to `"half"`:

With half precision the Rating widget allows to set decimal values. The passed value is rounded during the rendering phase for the purpose of displaying full or half item based on the value:

* Value which is less than or equal to .5 displays a half item.
* Value which is greater than .5 displays a full item.

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
