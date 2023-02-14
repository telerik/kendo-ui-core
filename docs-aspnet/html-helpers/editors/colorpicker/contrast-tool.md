---
title: Contrast Tool
page_title: Contrast Tool
description: "Learn more about the contrast tool for the Telerik UI ColorPicker component for {{ site.framework }}."
slug: htmlhelpers_contrast_tool_colorpickerhelper_aspnetcore
position: 4
---

# Contrast Tool

The Color Contrast Tool is available for the {{ site.product }} ColorPicker as of the R3 SP1 of 2021 release. It provides the option for checking the color contrast ratio between two colors. Color contrast between text and background is important on web pages. It affects some people’s ability to perceive the information. The tool follows the WCAG recommendations for web accessibility.

According to the WCAG standard, there are two levels of contrast ratio:
 * AA (minimum contrast)—The level AA requires a contrast ratio of at least 4.5:1 for normal text.
 * AAA (enhanced contrast)—The level AAA requires a contrast ratio of at least 7:1 for normal text.

The example below demonstrates how to enable the contrast tool in the ColorPicker:

```HtmlHelper
    <div class="demo-section">
        <div class="column">
            <h3 class="title"><label for="picker">Foreground Color</label></h3>
            @(Html.Kendo().ColorPicker()
                .Name("foreground-picker")
                .Value("#d13838ff")
                .ContrastTool(tool=>tool
                    .BackgroundColor("#ffffff")
                )
            )
        </div>
        <div class="column">
            <h3 class="title"><label for="picker">Background Color</label></h3>
            @(Html.Kendo().ColorPicker()
                .Name("background-picker")
                .Opacity(true)
                .Input(false)
                .Views(new string[] { "gradient"})
                .Value("#ffffff")
                .Events(ev=>ev.Change("onChange"))
            )
        </div>
    </div>

     <script>
        function onChange(e) {
            var foregroundPicker = $("#foreground-picker").data("kendoColorPicker")
            foregroundPicker.setBackgroundColor(e.value)
        }
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
{% if site.core %}
```TagHelper
@{
    string[] views = new string[] { "gradient" };
}

    <div class="demo-section">
        <div class="column">
            <h3 class="title"><label for="picker">Foreground Color</label></h3>
            <kendo-colorpicker name="foreground-picker" value="#d13838ff" >
                 <contrast-tool background-color="#ffffff"/>
            </kendo-flatcolorpicker>
        </div>
        <div class="column">
            <h3 class="title"><label for="picker">Background Color</label></h3>
            @(Html.Kendo().ColorPicker()
                .Events(ev=>ev.Change("onChange"))
            )
            <kendo-colorpicker name="background-picker" input="false" views="views" value="#ffffff" on-change="onChange" opacity="true">
            </kendo-colorpicker>
        </div>
    </div>

     <script>
        function onChange(e) {
            var foregroundPicker = $("#foreground-picker").data("kendoColorPicker")
            foregroundPicker.setBackgroundColor(e.value)
        }
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
{% endif %}

## See Also

* [Contrast Tool of the ColorPicker (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/contrast-tool)
* [Server-Side API](/api/colorpicker)
* [Client-Side API](/api/javascript/ui/colorpicker)

