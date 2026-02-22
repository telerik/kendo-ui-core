---
title: Appearance
page_title: jQuery ColorPalette Documentation - Appearance
description: "Learn how to apply different styling options to the ColorPalette component."
components: ["colorpalette"]
slug: appearance_kendoui_colorpalette
position: 4
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI ColorPalette.  

## Size

The `size` option controls how big or small the ColorGradient component looks. The structure of the class is `k-colorpalette-{size}`.

The following values are available for the [`size`](/api/javascript/ui/colorpalette/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `div` element through the `k-colorpalette-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<div id="colorpalette"></div>
<script>
    $("#colorpalette").kendoColorPalette({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `div.k-colorgradient` element:

```html
<div id="colorpalette" class="k-colorpalette k-colorpalette-lg">
    ...
</div>
```

## See Also

* [JavaScript API Reference of the ColorPalette](/api/javascript/ui/colorpalette)
