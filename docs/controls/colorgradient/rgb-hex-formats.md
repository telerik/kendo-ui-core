---
title: Formats
page_title: jQuery ColorGradient Documentation - ColorGradient RGB and HEX Formats
description: "Learn more about the RGB and HEX input formats supported by the Kendo UI for jQuery ColorGradient."
slug: rgb_hex_kendoui_colorgradient_widget
position: 3
---

# RGB and HEX Input Formats

As of the end of 2021, the ColorGradient supports both RGB and HEX formats as input through its [`formats`](/api/javascript/ui/colorgradient/configuration/formats) configuration.

To choose the default format, use the [`format`](/api/javascript/ui/colorgradient/configuration/format) option:

```dojo
    <div id="rgb-picker"></div>
    <div id="hex-picker"></div>

    <script>
        $("#rgb-picker").kendoColorGradient({
            preview: false,
            format: "rgb",
            formats: ["rgb", "hex"]
        });

        $("#hex-picker").kendoColorGradient({
            preview: false,
            format: "hex",
            formats: ["rgb", "hex"]
        });
    </script>
```

## See Also

* [RGB and HEX formats of the ColorGradient (Demo)](https://demos.telerik.com/kendo-ui/colorgradient/rgb-hex)
* [JavaScript API Reference of the ColorGradient](/api/javascript/ui/colorgradient)
