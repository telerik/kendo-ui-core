---
title: Modifying Labels on Kendo UI for jQuery Slider Ticks
description: Learn how to modify the labels on Kendo UI for jQuery Slider ticks to display custom text values instead of numbers.
type: how-to
page_title: Customizing Tick Labels on Kendo UI for jQuery Slider
meta_title: Customizing Tick Labels on Kendo UI for jQuery Slider
slug: customizing-tick-labels-on-kendo-slider
tags: kendo-ui-for-jquery, slider, labels, ticks, customization
res_type: kb
ticketid: 528111
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Slider for Kendo UI for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>Current</td>
</tr>
</tbody>
</table>

## Description

I need to modify the labels on the Kendo UI for jQuery [Slider](https://docs.telerik.com/kendo-ui/api/javascript/ui/slider) ticks to display custom text values instead of numeric values. For example, I want each large step to display labels like "Small," "Medium," and "Large" instead of numbers.

This knowledge base article also answers the following questions:
- How do I add custom labels to Kendo UI for jQuery Slider ticks?
- How can I replace Slider numeric ticks with text labels?
- Is it possible to customize tick labels on Kendo UI for jQuery Slider?

## Solution

To achieve this, modify the Slider configuration and use JavaScript to replace the numeric tick labels with custom text values. Follow these steps:

1. Initialize the Kendo UI for jQuery Slider.
2. Use a custom function to replace the default tick labels with your desired text values.

Here is an example:

```javascript
var sizes = ["Small", "Medium", "Large"];
      
      var slider = $("#slider").kendoSlider({
        increaseButtonTitle: "Right",
        decreaseButtonTitle: "Left",
        showButtons: true,
        min: 1,
        max: 3,
        largeStep: 1,
        tooltip: {
          enabled: false,
        },
      });
      

      var sliderItems = slider.siblings(".k-slider-items");

      $.each(sizes, function (index, value) { 
        var item = sliderItems.find("li:eq(" + index + ")");
        item.attr("title", value );
        item.find("span").text(value );
      });
```

### Explanation:
- `min` and `max` properties define the range of the Slider based on the number of labels.
- The `smallStep` and `largeStep` properties control the tick intervals.
- The custom function replaces the numeric tick values with text labels after the Slider is initialized.

## See Also

- [Kendo UI for jQuery Slider Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/slider) 
- [Feature Request for Custom Formats on Slider](http://feedback.kendoui.com/forums/127393-kendo-ui-feedback/suggestions/3204718-allow-custom-formats-for-slider-range-slider-so-i-)
