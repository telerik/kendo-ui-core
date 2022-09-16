---
title: RGB and HEX Formats
page_title: RGB and HEX Formats
description: "Learn more about the input formats of the Telerik UI ColorPicker component for {{ site.framework }}."
slug: htmlhelpers_formats_colorpickerhelper_aspnetcore
position: 5
---

# RGB and HEX Input Formats

With R3 SP1 of 2021 release support for both RGB and HEX formats for the {{ site.product }} ColorPicker was introduced. The available input formats for the component can be specified through [`.Formats()`](/api/Kendo.Mvc.UI.Fluent/ColorPickerBuilder#formatssystemstring) configuration. To choose the default format, use the [`.Format()`](/api/Kendo.Mvc.UI.Fluent/ColorPickerBuilder#formatkendomvcuicolorpickerformat) option.

The example below demonstrates thow to configure the {{ site.product }} ColorPicker with a different default view:

```HtmlHelper
    <div>
        <h3><label>HEX ColorPicker</label></h3>
        @(Html.Kendo().ColorPicker()
            .Name("HexPicker")
            .Format(ColorPickerFormat.Hex)
            .Formats(new string[] { "rgb", "hex" })
        )
    </div>
    <div>
        <h3><label>RGB ColorPicker</label></h3>
        @(Html.Kendo().ColorPicker()
            .Name("RgbPicker")
            .Format(ColorPickerFormat.Rgb)
            .Formats(new string[] { "rgb", "hex" })
        )
    </div>
```
{% if site.core %}
```TagHelper
@{
    string[] formats = new string[] { "rgb", "hex" };
}

     <div>
        <h3><label>HEX ColorPicker</label></h3>
        <kendo-colorpicker name="HexPicker" 
         format="ColorPickerFormat.Hex"         formats="formats">
        </kendo-colorpicker>
    </div>
    <div>
        <h3><label>RGB ColorPicker</label></h3>
       <kendo-colorpicker name="RgbPicker" 
         format="ColorPickerFormat.Rgb"         formats="formats">
        </kendo-colorpicker>
    </div>
```
{% endif %}

## See Also

* [RGB and HEX formats of the {{ site.product }} ColorPicker (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/rgb-hex)
* [Server-Side API](/api/colorpicker)
* [Client-Side API](/api/javascript/ui/colorpicker)
