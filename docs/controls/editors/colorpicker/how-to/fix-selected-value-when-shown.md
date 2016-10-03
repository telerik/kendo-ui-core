---
title: Fix ColorPicker Value When Showing It Dynamically
page_title: Fix ColorPicker Value When Showing It Dynamically | Kendo UI DatePicker
description: "Learn how to fix the selected value of the Kendo UI ColorPicker when showing it by using jQuery."
slug: howto_fixselectedvalue_colorpicker
---

# Fix ColorPicker Value When Showing It Dynamically

When you hide the Kendo UI ColorPicker and change its value, the pallette renders an incorrect selection as a side-effect from these actions.

The reason for this behavior is that the viewport of the hidden DOM element is zero. As a result, the position of the DOM element that represents the selected value is not able to calculate its accurate position.

To handle such situations, call the `value` method of the Kendo UI FlatColorPicker widget again after showing it. This will reassign the color and position the selection to the selected color.

###### Example

```html
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

* [ColorPicker JavaScript API Reference](/api/javascript/ui/colorpicker)
* [ColorPalette JavaScript API Reference](/api/javascript/ui/colorpalette)
