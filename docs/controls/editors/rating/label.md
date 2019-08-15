---
title: Label
page_title: jQuery Rating Documentation | Label | Kendo UI
description: "Get started with the jQuery Rating by Kendo UI and learn how to configure the label of the widget."
slug: label_rating_widget
position: 4
---

# Label

The Rating displays a label by default that shows the current value out of the max value in the format `3 / 5`. If the widget does not have a selected value, the label will not be displayed initially and will be toggled after an item is selected.

## Default Label

```dojo
   <input id="rating" name="rating">

    <script>
        $(document).ready(function() {
            $("#rating").kendoRating({
                min: 1,
                max: 6,
                value: 3
            });
        });
    </script>
```

## Customized Label

Customizing the text of the label could be achieved through the [`label.template`]((http://docs.telerik.com/kendo-ui/api/javascript/rating/configuration/label.template)) option.

By default, the template automatically receives the `value` and `maxValue` in the data object. This allows those properties to be used inside the template through [the Kendo UI Templates syntax](https://docs.telerik.com/kendo-ui/framework/templates/overview).

```dojo
    <input id="rating" name="rating">

    <script id="template" type="text/x-kendo-template">
        <span>
            #: value # out of #: maxValue #
        </span>
    </script>

    <script>
        $("#rating15").kendoRating({
            min: 1,
            max: 6,
            value: 3,
            label: { template: kendo.template($("#template").html()) }
        });
    </script>
```

## Disabled label

Setting the `label` option to false prevents the label from, being displayed.

```dojo
    <input id="rating" name="rating">

    <script>
        $(document).ready(function() {
            $("#rating").kendoRating({
                min: 1,
                max: 6,
                value: 3,
                label: false
            });
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Rating](/api/javascript/ui/rating)
