---
title: Formats
page_title: The {{ site.product }} FlatColorPicker Documentation - FlatColorPicker RGB and HEX Formats
description: Check out the RGB and HEX input formats in the FlatColorPicker.
slug: rgb_hex_flatcolorpickerhelper_aspnetcore
position: 3
---

# RGB and HEX Input Formats

The FlatColorPicker supports both RGB and HEX formats as input through its [formats](/api/javascript/ui/flatcolorpicker/configuration/formats) configuration. To choose the default format, you can use the [format](/api/javascript/ui/flatcolorpicker/configuration/format) option:

{% if site.core %}
```HtmlHelper
@(Html.Kendo().FlatColorPicker()
      .Name("rgb")
      .Buttons(true)
      .Value("#ff0000")
      .Format(ColorPickerFormat.Rgb)
      .Formats(new string[] {"rgb","hex"})
)
```
```TagHelper
@addTagHelper *, Kendo.Mvc
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

@{
    string[] formats = new string[] { "rgb", "hex" };
}

<kendo-flatcolorpicker name="rgb" value="#ff0000" buttons="true"
  format="ColorPickerFormat.Rgb" formats="formats">
 </kendo-flatcolorpicker>
```
{% else %}
```HtmlHelper
@(Html.Kendo().FlatColorPicker()
      .Name("rgb")
      .Buttons(true)
      .Value("#ff0000")
      .Format("rgb")
      .Formats(new string[] {"rgb","hex"})
)
```
{% endif %}

## See Also

* [RGB and HEX formats of the FlatColorPicker (Demo)](https://demos.telerik.com/{{ site.platform }}/flatcolorpicker/rgb-hex)
* [JavaScript API Reference of the FlatColorPicker](/api/javascript/ui/flatcolorpicker)
