---
title: Contrast Tool
page_title: ColorPicker Documentation - ColorPicker Contrast Tool
description: "Check out the Contrast Tool in the ColorPicker."
slug: contrast_tool_kendoui_colorpicker_widget
position: 5
---

# Contrast Tool

As of the end of 2021, the ColorPicker provides a Color Contrast Tool. It provides the option for checking the color contrast ratio between two colors. Color contrast between text and background is important on web pages. It affects some people’s ability to perceive the information. The tool follows the WCAG recommendations for web accessibility.

According to the WCAG standard, there are two levels of contrast ratio:
 * AA (minimum contrast)—The level AA requires a contrast ratio of at least 4.5:1 for normal text.
 * AAA (enhanced contrast)—The level AAA requires a contrast ratio of at least 7:1 for normal text.

The example below demonstrates how to enable the contrast tool in the ColorPicker:

```dojo
    <div class="demo-section">
        <div class="column">
            <h3 class="title"><label for="picker">Foreground Color</label></h3>
            <input id="foreground-picker" />
        </div>
        <div class="column">
            <h3 class="title"><label for="picker">Background Color</label></h3>
            <input id="background-picker" />
        </div>
    </div>
     <script>

        $("#foreground-colorpicker").kendoColorPicker({
            value: "#ffffff",
            buttons: false,
            contrastTool: {
                backgroundColor: "#ffffff"
            }
        });
        $("#background-colorpicker").kendoColorPicker({
            value: "#ffffff",
            input: false,
            views: ["gradient"],
            change: function (e) {
                var foregroundPicker = $("#foreground-colorpicker").data("kendoColorPicker")
                foregroundPicker.setBackgroundColor(e.sender.value())
            }
        });
    </script>
    <style>
        .demo-section {
            display: inline-flex;
            width: 100%;
            box-sizing: border-box;
        }

        .column {
            margin:auto;
            text-align: center;
        }
    </style>
```

## See Also

* [Contrast Tool of the ColorPicker (Demo)](https://demos.telerik.com/kendo-ui/colorpicker/contrast-tool)
* [JavaScript API Reference of the ColorPicker](/api/javascript/ui/colorpicker)
