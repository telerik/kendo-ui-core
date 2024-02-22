---
title: Adjusting Slider Configuration to Display Max Value Dynamically 
description: This article explains how to adjust the configuration of a Kendo UI Slider to display the maximum value dynamically in the application.
type: how-to
page_title: Adjusting Slider Configuration to Display Max Value Dynamically | Kendo UI Slider 
slug: slider-adjusting-configuration-display-max-value-dynamically 
tags: kendo ui, slider, configuration, max value
res_type: kb
---

## Environment

| Product | Version |
|---------|---------|
| Slider for Progress® Kendo UI® for jQuery | 2023.3.1114 |

## Description

When dynamically setting the maximum value for a Kendo UI Slider, you may encounter an issue where the drag handle does not move to the end of the slider as expected. This can occur when the smallStep and largeStep configurations are not properly adjusted to fit within the space of the component.

## Solution

To resolve this issue, follow these steps:

1. Adjust the [smallStep](/api/javascript/ui/slider/configuration/smallstep) and [largeStep](/api/javascript/ui/slider/configuration/largestep) configurations to ensure the slider ticks fit within the space of the component.
2. Set the [min](/api/javascript/ui/slider/configuration/min) and [max](/api/javascript/ui/slider/configuration/max) options of the slider to the desired values.
3. Set the [value](/api/javascript/ui/slider/configuration/value) option to the maximum value you want to display on the slider.

Here's an example of how to apply these changes in JavaScript:

```javascript
$(document).ready(function() {
  var slider = $("#slider").kendoSlider({
    min: 0,
    max: 20,
    largeStep: 10,
    showButtons: false,
    enabled: false,
    change: function (e) { console.log("some function")}
  }).data("kendoSlider");

  var index = 800;

  slider.setOptions({
    min: 0,
    max: index,
    largeStep: 100,
    smallStep: 10,
    value: index
  });
});
```

Note that in the above example, the `smallStep` and `largeStep` configurations have been adjusted to fit within the available space and ensure the maximum value is displayed correctly on the UI.

It is recommended to review and adjust the step configurations based on your specific requirements to achieve the desired result.  Please refer to this [Progress Kendo UI Dojo](https://dojo.telerik.com/oBeCaxuP) for a live example demonstrating this approach.


