---
title: Reversing Numbers on a Vertical Slider in Kendo UI for jQuery
description: Learn how to reverse the direction of numbers on a vertical slider using Kendo UI for jQuery.
type: how-to
page_title: How to Reverse Numbers on a Kendo UI for jQuery Vertical Slider
meta_title: How to Reverse Numbers on a Kendo UI for jQuery Vertical Slider
slug: reverse-numbers-kendo-ui-jquery-slider
tags: kendo-ui-for-jquery, slider, vertical-slider, value-mapping
res_type: kb
ticketid: 1695653
---

## Environment
<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Slider </td>
</tr>
<tr>
<td> Version </td>
<td> 2025.2.720 </td>
</tr>
</tbody>
</table>

## Description

I need to reverse the direction of numbers on a vertical slider in Kendo UI for jQuery. By default, the minimum value is at the bottom and the maximum is at the top. I want 0 at the top and 20 at the bottom.

This knowledge base article also answers the following questions:
- How can I invert the values on a vertical slider?
- How to customize the value direction of a vertical slider in Kendo UI for jQuery?
- How do I set 0 at the top and 20 at the bottom in a vertical slider?

## Solution

To reverse the direction of numbers on a vertical slider, map the slider's values in your code. Follow these steps:

1. Set the slider's `min` to 0 and `max` to 20 as usual.
2. Invert the value in the slider event handlers (`slide` and `change`) so that moving the handle up results in a lower value.

### Code Example

```html
<div id="slider"></div>
<span id="sliderValue"></span>

<script>
  $(document).ready(function() {
    var min = 0;
    var max = 20;

    $("#slider").kendoSlider({
      orientation: "vertical",
      min: min,
      max: max,
      value: max, // Start at the "bottom" (which will show as the top)
      slide: function(e) {
        // Invert the value
        var invertedValue = max - (e.value - min);
        $("#sliderValue").text(invertedValue);
      },
      change: function(e) {
        var invertedValue = max - (e.value - min);
        $("#sliderValue").text(invertedValue);
      }
    });
  });
</script>
```

### Key Notes

- This approach inverts the value displayed to users, ensuring 0 appears at the top and 20 at the bottom.
- Customize tooltips or labels for consistency in the user interface.
- Tick marks and labels will still show the default progression unless custom rendering is implemented.

## See Also

- [Kendo UI for jQuery Slider](https://docs.telerik.com/kendo-ui/controls/editors/slider/overview)
