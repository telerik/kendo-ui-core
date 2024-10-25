---
title: RGB and HEX Formats
page_title: jQuery ColorPicker Documentation - ColorPicker RGB and HEX Formats
description: "Check out the RGB and HEX input formats in the ColorPicker."
slug: rgb_hex_kendoui_colorpicker_widget
position: 4
---

# RGB and HEX Input Formats

As of the end of 2021, the ColorPicker supports both RGB and HEX formats as input through its [formats](/api/javascript/ui/colorpicker/configuration/formats) configuration. To choose the default format, you can use the [format](/api/javascript/ui/colorpicker/configuration/format) option:

```dojo
    <input id="rgb-picker" />
    <input id="hex-picker" />

    <script>
        $("#rgb-picker").kendoColorPicker({
            preview: false,
            format: "rgb",
            formats: ["rgb", "hex"]
        });

        $("#hex-picker").kendoColorPicker({
            preview: false,
            format: "hex",
            formats: ["rgb", "hex"]
        });
    </script>
```

## See Also

* [RGB and HEX formats of the ColorPicker (Demo)](https://demos.telerik.com/kendo-ui/colorpicker/rgb-hex)
* [JavaScript API Reference of the ColorPicker](/api/javascript/ui/colorpicker)
