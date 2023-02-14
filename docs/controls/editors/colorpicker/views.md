---
title: Views
page_title: jQuery ColorPicker Documentation - ColorPicker Views
description: "Review the available views in the ColorPicker."
slug: views_kendoui_colorpicker_widget
position: 2
---

# ColorPicker Views

As of the end of 2021, the ColorPicker has a new design. One of the introduced new features is the [views](/api/javascript/ui/colorpicker/configuration/views) configuration. It allows you to choose between a `gradient` and a `palette` view. You can also choose which the default view would be through the [view](/api/javascript/ui/colorpicker/configuration/view) option.

```dojo
    <input id="palette-picker" />
    <input id="gradient-picker" />
    <script>
        $("#palette-picker").kendoColorPicker({
            preview: false,
            view: "palette",
            views: ["gradient", "palette"]
        });

        $("#gradient-picker").kendoColorPicker({
            preview: false,
            view: "gradient",
            views: ["gradient", "palette"]
        });
    </script>
```

## See Also

* [Views of the ColorPicker (Demo)](https://demos.telerik.com/kendo-ui/colorpicker/views)
* [JavaScript API Reference of the ColorPicker](/api/javascript/ui/colorpicker)
