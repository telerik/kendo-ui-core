---
title: Fix the ColorPicker Value When Showing It Dynamically
page_title: Fix the ColorPicker Value When Showing It Dynamically
description: "Learn how to fix the selected value of the Kendo UI ColorPicker when showing it by using jQuery."
slug: colorpicker_fix_selected_value_when_shown
previous_url: /controls/editors/colorpicker/how-to/fix-selected-value-when-shown
tags: telerik, kendo, jquery, colorpicker, fix, value, when, showing, dynamically
component: colorpicker
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ColorPicker for jQuery</td>
 </tr>
</table>

## Description

How can I fix the selected value of the Kendo UI ColorPicker when showing it by using jQuery?

## Solution

When you hide the Kendo UI ColorPicker and change its value, the palette renders an incorrect selection as a side-effect from these actions.

The reason for this behavior is that the viewport of the hidden DOM element is zero. As a result, the position of the DOM element that represents the selected value cannot calculate its accurate position.

To handle such situations, call the `value` method of the Kendo UI FlatColorPicker widget again after showing it. This reassigns the color and positions the selection to the selected color.

```dojo
    <div id="colorPickerFlat"></div>
    <div id="colorPicker"></div>
    <button id="hide">Hide</button>
    <button id="show">Show</button>

    <script>
        $("#hide").click(function () {
            $("#colorPickerFlat").hide();
        });

        $("#show").click(function () {
            $("#colorPickerFlat").show();

            var colorPicker = $("#colorPickerFlat").data("kendoFlatColorPicker");
            // Set the value again when showing the DOM element
            // in order for the selected color to be properly positioned.
            colorPicker.value(colorPicker.value());
        });

        $("#colorPickerFlat").kendoFlatColorPicker();

        $("#colorPicker").kendoColorPalette({
            change: function (e) {
                $("#colorPickerFlat").data("kendoFlatColorPicker").value(e.value);
            }
        });
    </script>
```

## See Also

* [Basic Usage of the ColorPicker (Demo)](https://demos.telerik.com/kendo-ui/colorpicker/index)
* [Using the API of the ColorPicker (Demo)](https://demos.telerik.com/kendo-ui/colorpicker/api)
* [JavaScript API Reference of the ColorPicker](/api/javascript/ui/colorpicker)
* [JavaScript API Reference of the ColorPalette](/api/javascript/ui/colorpalette)
