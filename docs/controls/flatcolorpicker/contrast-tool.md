---
title: Contrast Tool
page_title: FlatColorPicker Documentation - FlatColorPicker Contrast Tool
description: "Check out the Contrast Tool in the FlatColorPicker."
slug: contrast_tool_kendoui_flatcolorpicker_widget
position: 5
---

# Contrast Tool

As of the end of 2021, the FlatColorPicker provides a Color Contrast Tool. It provides the option for checking the color contrast ratio between two colors. Color contrast between text and background is important on web pages. It affects some people’s ability to perceive the information. The tool follows [the WCAG recommendations](/flatcolorpicker/accessibility/overview#wcag-21) for web accessibility.

According to the WCAG standard, there are two levels of contrast ratio:
 * AA (minimum contrast)—The level AA requires a contrast ratio of at least 4.5:1 for normal text.
 * AAA (enhanced contrast)—The level AAA requires a contrast ratio of at least 7:1 for normal text.

The example below demonstrates how to enable the contrast tool in the ColorPicker:

```dojo
    <div id="example">

    <div class="demo-section hidden-on-narrow k-content wide">
            <div class="example-config">
                Try to apply different colors to the text on right side. Notice how the
                text becomes gradually harder for reading when the contrast ratio
                becomes smaller.
            </div>
            <div class="row">
                <div class="column">
                    <div id="flatcolorpicker"></div>
                </div>
                <div class="column">
                    <p class="text-wrapper">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not
                        only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s
                        with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus
                        PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>
    </div>


    <script>

        $("#flatcolorpicker").kendoFlatColorPicker({
            opacity: true,
            value: "#d13838ff",
            contrastTool: {
                backgroundColor: "#ffffff"
            },
            change: function (e) {
                $(".text-wrapper").css("color", e.value);
            }
        });
        
    </script>

    <style>
        .row {
            display: flex;         
        }
        .example-config {
            margin: 0 0 20px;
            padding: 20px;
            background-color: rgba(0,0,0,.03);
            border: 1px solid rgba(0,0,0,.08);
        }

        .demo-section {
            width: 100%;
            box-sizing: border-box;
        }

        .column {
            padding-right: 20px;
            padding-bottom: 20px;
        }

        .text-wrapper {
            border: 1px solid rgba(0, 0, 0, 0.08);
            padding: 10px;
            font-size: 16px;
        }
    </style>
</div>
```

## See Also

* [Contrast Tool of the FlatColorPicker (Demo)](https://demos.telerik.com/kendo-ui/flatcolorpicker/contrast-tool)
* [JavaScript API Reference of the FlatColorPicker](/api/javascript/ui/flatcolorpicker)
