---
title: Selection
page_title: jQuery Rating Documentation | Selection
description: "Get started with the jQuery Rating by Kendo UI and learn how to configure the selection behavior of the items."
slug: selection_rating_widget
position: 2
---

# Selection

The Rating allows you to control the selection of its items.

To configure the [`selection`](/api/javascript/ui/rating/configuration/selection) option, use either of the following settings:

* `continuous`&mdash;Allows the selection of all items from the start to the end.
* `single`&mdash;Allows the selection of a single item.

## Continuous Selection

The continuous selection is the default selection mode of the Rating. If not configured, the Rating will automatically set the [`selection`](/api/javascript/ui/rating/configuration/selection) option to `"continuous"`.

```dojo
   <input id="rating" name="rating">

    <script>
        $(document).ready(function() {
            $("#rating").kendoRating({
                selection: "continuous"
            });
        });
    </script>
```

## Single Selection

To configure the single selection mode, set the [`selection`](/api/javascript/ui/rating/configuration/selection) option to `"single"`.

```dojo
    <input id="rating" name="rating">

    <script>
        $(document).ready(function() {
            $("#rating").kendoRating({
                selection: "single"
            });
        });
    </script>
```

## See Also

* [Selection by the Rating (Demo)](https://demos.telerik.com/kendo-ui/rating/selection)
* [JavaScript API Reference of the Rating](/api/javascript/ui/rating)
