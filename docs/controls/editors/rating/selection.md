---
title: Selection
page_title: jQuery Rating Documentation | Selection | Kendo UI
description: "Get started with the jQuery Rating by Kendo UI and learn how to configure the selection behavior of the items."
slug: selection_rating_widget
position: 2
---

# Selection

The Rating allows to control the selection behavior of the items by configuring the [`selection`](http://docs.telerik.com/kendo-ui/api/javascript/rating/configuration/selection) option:

* single - allows selecting a single item.

* continuous - allows selecting all items from the start to the end.

## Continuous Selection

This is the default selection behavior of the Rating. If not configured, the widget will automatically set the [`selection`](http://docs.telerik.com/kendo-ui/api/javascript/rating/configuration/selection) option to `"continuous"`:

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

Single selection can be configured by setting the [`selection`](http://docs.telerik.com/kendo-ui/api/javascript/rating/configuration/label.template) option to `"single"`:

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

* [JavaScript API Reference of the Rating](/api/javascript/ui/rating)
