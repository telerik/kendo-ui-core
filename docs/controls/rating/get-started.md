---
title: Getting Started
page_title: jQuery Rating Documentation - Getting Started with the Rating
description: "Get started with the jQuery Rating by Kendo UI and learn how to create and initialize the component."
slug: getting_started_kendoui_rating_widget
position: 1
---

# Getting Started with the Rating

This guide demonstrates how to get up and running with the Kendo UI for jQuery Rating.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="rating" />

    <script>
    $("#rating").kendoRating({
        min: 1,
        max: 6,
        value: 3
    });
</script>
```

## 1. Create an Input Element

First, create an `<input>` element on the page. 

```html
<input id="rating" />
```

## 2. Initialize the Rating

In this step, you will initialize the Rating from the `<input>` element. All settings of the Rating will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<input id="rating" />

<script>
    // Target the input element by using jQuery and then call the kendoRating() method.
    $("#rating").kendoRating();
</script>
```

## 3. Set the Min and Max Options

You can define the values of the first and the last items through the [`min`](/api/javascript/ui/rating/configuration/min) and [`max`](/api/javascript/ui/rating/configuration/max) options.

```html
<input id="rating" />

<script>
  // Target the input element by using jQuery and then call the kendoRating() method.
  $("#rating").kendoRating({
    min: 1,
    max: 6
  });
</script>
```

## 4. Set the Value of the Rating

You can set the value of the Rating upon initialization.

```html
<input id="rating" />

<script>
  // Target the input element by using jQuery and then call the kendoRating() method.
  $("#rating").kendoRating({
    min: 1,
    max: 6,
    value: 3
  });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Rating](https://demos.telerik.com/kendo-ui/rating/index)

## See Also

* [JavaScript API Reference of the jQuery Rating](/api/javascript/ui/rating)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
