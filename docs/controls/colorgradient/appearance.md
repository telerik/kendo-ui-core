---
title: Appearance
page_title: jQuery ColorGradient Documentation - Appearance
description: "Learn how to apply different styling options to the ColorGradient component."
slug: appearance_kendoui_colorgradient
position: 5
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI ColorGradient.  

## Size

The `size` option controls how big or small the ColorGradient component looks. The structure of the class is `k-colorgradient-{size}`.

The following values are available for the [`size`](/api/javascript/ui/colorgradient/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `div` element through the `k-colorgradient-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<div id="colorgradient"></div>
<script>
    $("#colorgradient").kendoColorGradient({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `div.k-colorgradient` element:

```html
<div id="colorgradient" class="k-colorgradient k-colorgradient-lg">
    ...
</div>
```

## See Also

* [JavaScript API Reference of the ColorGradient](/api/javascript/ui/colorgradient)
