---
title: Overview
page_title: jQuery Rating Documentation | Rating Overview
description: "Get started with the jQuery Rating by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_rating_widget
position: 1
---

# Rating Overview

The Rating allows to intuitively rate by selecting number of items stars from a predefined maximum number of items.

* [Demo page for the Rating](https://demos.telerik.com/kendo-ui/rating/index) 

## Initializing the Rating

To initialize the Rating, use the `<input />` tag.

The number of starts that the widget will render depends on the `min` and `max` options. Alternatively, this can also be configured by adding `min` and `max` attributes to the `<input />` element of the Rating. If the `min` and `max` are not set, the widget will render with the default values from 1 to 5.

The following example demonstrates how to initialize the Rating from an existing `<input />` element with defined data items.

```dojo
    <input id="rating" name="rating" />

    <script>
        $(document).ready(function(){
            $("#rating").kendoRating();
        });
    </script>
```

## Functionality and Features

* [Selection]({% slug selection_rating_widget %})
* [Precision]({% slug precision_rating_widget %})
* [Label]({% slug label_rating_widget %})
* [Tooltip]({% slug tooltip_rating_widget %})
* [Templates]({% slug templates_rating_widget %})
* [Accessibility]({% slug accessibility_kendoui_rating_widget %})

## See Also

* [Basic Usage of the Rating (Demo)](https://demos.telerik.com/kendo-ui/rating/index)
* [JavaScript API Reference of the Rating](/api/javascript/ui/rating)
