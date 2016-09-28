---
title: Fix Value of ColorPicker when Showing it Dynamically
page_title: Fix Value of ColorPicker when Showing it Dynamically | Kendo UI DatePicker
description: "Learn how to fix the selected value of the ColorPicker when showing it with jQuery."
slug: howto_fixselectedvalue_colorpicker
---

# Fix Value of ColorPicker when Showing it Dynamically

Hiding the color picker and changing its value will lead to a side effect where the pallette will render incorrect selection.  

This side effect occurs because the viewport of the hidden DOM element is zero. Due to that, the position of the DOM element that represents the selected value cannot calculate its accurate position.

To handle such situations you should call the `value` method of the **FlatColorPicker** widget again after showing it. This will reassign the color and position the selection to the selected color.

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

Other articles on Kendo UI ColorPicker:

* [ColorPicker JavaScript API Reference](/api/javascript/ui/colorpicker)

Articles on Kendo UI ColorPalette:

* [ColorPalette JavaScript API Reference](/api/javascript/ui/colorpalette)
