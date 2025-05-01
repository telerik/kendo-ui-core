---
title: Contrast Tool
page_title: Contrast Tool
description: "Learn more about the contrast tool provided by the Telerik UI ColorGradient component for {{ site.framework }}."
slug: htmlhelpers_contrast_tool_colorgradient
position: 3
---

# Contrast Tool

The ColorGradient provides a Color Contrast Tool. It provides the option for checking the color contrast ratio between two colors.

The color contrast between text and background is important on web pages. It affects the ability of some people to perceive the presented information. The tool follows [the WCAG recommendations]({% slug overview_accessibility %}#web-content-accessibility-guidelines) for web accessibility.

According to the WCAG standard, there are two levels of contrast ratio:
 * AA (minimum contrast)—the level AA requires a contrast ratio of at least 4.5:1 for normal text.
 * AAA (enhanced contrast)—the level AAA requires a contrast ratio of at least 7:1 for normal text.

The example below demonstrates how to enable the contrast tool in the ColorGradient:

```HtmlHelper
    <div class="k-d-flex k-justify-content-center">
        <div class="example-config">
            Try to apply different colors to the text on right side. Notice how the
            text becomes gradually harder for reading when the contrast ratio
            becomes smaller.
        </div>
        <div class="row">
            <div class="column">
                @(Html.Kendo().ColorGradient()
                    .Name("colorGradient")
                    .Opacity(true)
                    .Value("#d13838ff")
                    .ContrastTool(tool => tool.BackgroundColor("#ffffff"))
                    .Events(ev => ev.Change("onChange"))
                )
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
```
{% if site.core %}
```TagHelper
    <div class="k-d-flex k-justify-content-center">
        <div class="example-config">
            Try to apply different colors to the text on right side. Notice how the
            text becomes gradually harder for reading when the contrast ratio
            becomes smaller.
        </div>
        <div class="row">
            <div class="column">
                <kendo-colorgradient name="colorgradient" on-change="onChange"
                    opacity="true"
                    value="#d13838ff">
                    <contrast-tool enabled="true" background-color="#ffffff"/>
                </kendo-colorgradient>
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
```
{% endif %}
```JS scripts
    <script type="text/javascript">
        function onChange(e) {
            $(".text-wrapper").css("color", e.value);
        }
    </script>
```
```CSS Styles
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
        .column {
            padding-right: 20px;
            padding-bottom: 20px;
        }
        .k-colorpicker {
            vertical-align: top;
            margin: 20px 0;
        }
        .text-wrapper {
            border: 1px solid rgba(0, 0, 0, 0.08);
            padding: 10px;
            font-size: 16px;
        }
    </style>
```

## See Also

* [Contrast Tool of the ColorGradient (Demo)](https://demos.telerik.com/{{ site.platform }}/colorgradient/contrast-tool)
* [Server-Side API](/api/colorgradient)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorgradient)
