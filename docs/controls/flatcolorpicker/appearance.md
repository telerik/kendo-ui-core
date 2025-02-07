---
title: Appearance
page_title: jQuery FlatColorPicker Documentation - Appearance
description: "Learn how to apply different styling options to the FlatColorPicker component."
slug: appearance_kendoui_flatcolorpicker
position: 5
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI FlatColorPicker.  

## Size

The `size` option controls how big or small the FlatColorPicker component looks. The structure of the class is `k-flatcolorpicker-{size}`.

The following values are available for the [`size`](/api/javascript/ui/flatcolorpicker/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `div` element through the `k-flatcolorpicker-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<div id="flatcolorpicker"></div>
<script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `div.k-flatcolorpicker` element:

```html
<div id="flatcolorpicker" class="k-flatcolorpicker k-coloreditor k-coloreditor-lg">
    ...
</div>
```

## See Also

* [JavaScript API Reference of the FlatColorPicker](/api/javascript/ui/flatcolorpicker)
