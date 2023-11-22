---
title: Formats
page_title: jQuery FlatColorPicker Documentation - FlatColorPicker RGB and HEX Formats
description: "Check out the RGB and HEX input formats in the FlatColorPicker."
slug: rgb_hex_kendoui_flatcolorpicker_widget
position: 4
---

# RGB and HEX Input Formats

As of the end of 2021, the FlatColorPicker supports both RGB and HEX formats as input through its [formats](/api/javascript/ui/flatcolorpicker/configuration/formats) configuration. To choose the default format, you can use the [format](/api/javascript/ui/flatcolorpicker/configuration/format) option:

```dojo
    <div id="rgb-picker"></div>
    <div id="hex-picker"></div>

    <script>
        $("#rgb-picker").kendoFlatColorPicker({
            preview: false,
            format: "rgb",
            formats: ["rgb", "hex"]
        });

        $("#hex-picker").kendoFlatColorPicker({
            preview: false,
            format: "hex",
            formats: ["rgb", "hex"]
        });
    </script>
```

## See Also

* [RGB and HEX formats of the FlatColorPicker (Demo)](https://demos.telerik.com/kendo-ui/flatcolorpicker/rgb-hex)
* [JavaScript API Reference of the FlatColorPicker](/api/javascript/ui/flatcolorpicker)
