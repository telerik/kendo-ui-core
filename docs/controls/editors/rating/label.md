---
title: Label
page_title: jQuery Rating Documentation | Label
description: "Get started with the jQuery Rating by Kendo UI and learn how to configure the label of the widget."
slug: label_rating_widget
position: 4
---

# Label

By default, the Rating displays a label that shows the current value out of the max value in the format `3 / 5`.

If the Rating does not have a selected value, the label will not be displayed initially and will be toggled after an item is selected.

## Getting Started

The following example demonstrates how to use the default label.

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

## Customizing the Label

To customize the text of the label, use the [`label.template`](/api/javascript/ui/rating/configuration/label.template) option. By default, the template automatically receives the `value` and `maxValue` in the data object which allows you to use those properties inside the template through [the Kendo UI Templates syntax](/framework/templates/overview).

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

## Disabling the Label

Setting the `label` option to `false` prevents the label from being displayed.

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
