---
title: RGB and HEX Formats
page_title: RGB and HEX Formats
description: "Learn more about the input formats of the Telerik UI ColorGradient component for {{ site.framework }}."
slug: htmlhelpers_rgb_hex_formats_colorgradient
position: 2
---

# RGB and HEX Input Formats

The ColorGradient supports both RGB and HEX input formats. You can be specify them through the `.Formats()` configuration. To choose the default format, use the `.Format()` option.


```HtmlHelper
    @(Html.Kendo().ColorGradient()
        .Name("rgb-picker")
        .Format(ColorGradientFormat.Rgb)
        .Formats(new string[] { "rgb", "hex" })
    )

    @(Html.Kendo().ColorGradient()
        .Name("hex-picker")
        .Format(ColorGradientFormat.Hex)
        .Formats(new string[] { "rgb", "hex" })
    )
```
{% if site.core %}
```TagHelper
    @{
        var format_types = new string[] { "rgb", "hex" };
    }

    <kendo-colorgradient name="rgb-picker"
        format="ColorGradientFormat.Rgb"
        formats="format_types">
    </kendo-colorgradient>

    <kendo-colorgradient name="hex-picker"
        format="ColorGradientFormat.Hex"
        formats="format_types">
    </kendo-colorgradient>
```
{% endif %}

## See Also

* [RGB and HEX formats of the ColorGradient (Demo)](https://demos.telerik.com/{{ site.platform }}/colorgradient/rgb-hex)
* [Server-Side API](/api/colorgradient)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorgradient)
