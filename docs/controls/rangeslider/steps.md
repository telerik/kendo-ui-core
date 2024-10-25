---
title: Steps
page_title: jQuery RangeSlider Documentation - Steps
description: "Learn how to configure the small and the large steps of the jQuery RangeSlider for Kendo UI."
slug: steps_rangeslider_widget
position: 3
---

# Steps

You can configure the way the RangeSlider divides its range and updates the value by using the step options.


## Small Steps

To define the small step of the RangeSlider, use the [smallStep](/api/javascript/ui/rangeslider/configuration/smallstep) property. Based on the `min` and `max` values, the RangeSlider splits the track into equal ticks.

When the handles are dragged, the RangeSlider value changes with small steps. The `smallStep` property accepts both `integer` and `float` values.

```dojo
    <div id="rangeSlider">
        <input />
        <input />
    </div>

    <script>
        $("#rangeSlider").kendoRangeSlider({
            min: 0,
            max: 10,
            smallStep: 2
        });
    </script>
```

## Large Step

To define the large step of the RangeSlider, use the [largeStep](/api/javascript/ui/rangeslider/configuration/largestep) property. The property specifies that every n<sup>th</sup> step will render a large tick and a label. The `largeStep` value determines the step with which the RangeSlider will be updated when the Page Up and Page Down arrow keys are pressed. Must be a positive integer.

```dojo
    <div id="rangeSlider">
      <input />
      <input />
    </div>

    <script>
      $("#rangeSlider").kendoRangeSlider({
        min: 0,
        max: 12,
        smallStep:2,
        largeStep:4
      });
    </script>
```

## See Also 

* [Orientation in the Kendo UI RangeSlider for jQuery]({% slug orientation_rangeslider_widget %})
* [JavaScript API Reference of the RangeSlider](/api/javascript/ui/rangeslider)
