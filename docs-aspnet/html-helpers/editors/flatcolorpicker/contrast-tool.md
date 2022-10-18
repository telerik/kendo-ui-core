---
title: Contrast Tool
page_title: FlatColorPicker Documentation - FlatColorPicker Contrast Tool
description: "Check out the Contrast Tool in the FlatColorPicker."
slug: contrast_tool_flatcolorpickerhelper_aspnetcore
position: 4
---

# Contrast Tool

The FlatColorPicker provides a Color Contrast Tool. It offers the capability for checking the color contrast ratio between two colors.

Color contrast between text and background is important on web pages. It affects some people’s ability to perceive the required information. The tool follows [the WCAG recommendations](/editors/flatcolorpicker/accessibility/overview#wcag-21) for web accessibility.

According to the WCAG standard, there are two levels of contrast ratio:
 * AA (minimum contrast)—The level AA requires a contrast ratio of at least 4.5:1 for normal text.
 * AAA (enhanced contrast)—The level AAA requires a contrast ratio of at least 7:1 for normal text.

The example below demonstrates how to enable the contrast tool in the ColorPicker:

```HtmlHelper
@(Html.Kendo().FlatColorPicker()
     .Name("foreground-picker")
     .Opacity(true)
     .Value("#d13838ff")
     .ContrastTool(c=>c.BackgroundColor("#ffffff"))
     .Events(ev => ev.Change("foregroundSelect"))
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

@{
    string[] views = new string[] { "gradient" };
}

<kendo-flatcolorpicker name="foreground-picker" value="#d13838ff" on-change="foregroundSelect" opacity="true">
       <contrast-tool background-color="#ffffff"/>
</kendo-flatcolorpicker>
```
{% endif %}

## See Also

* [Contrast Tool of the FlatColorPicker (Demo)](https://demos.telerik.com/{{ site.platform }}/flatcolorpicker/contrast-tool)
* [JavaScript API Reference of the FlatColorPicker](/api/javascript/ui/flatcolorpicker)
