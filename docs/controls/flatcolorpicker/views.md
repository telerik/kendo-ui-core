---
title: Views
page_title: jQuery FlatColorPicker Documentation - FlatColorPicker Views
description: "Review the available views in the FlatColorPicker."
slug: views_kendoui_flatcolorpicker_widget
position: 3
---

# FlatColorPicker Views

As of the end of 2021, the FlatColorPicker has a new design. One of the introduced new features is the [views](/api/javascript/ui/flatcolorpicker/configuration/views) configuration. It allows you to choose between a `gradient` and a `palette` view. You can also choose which the default view would be through the [view](/api/javascript/ui/flatcolorpicker/configuration/view) option.

```dojo
    <div id="palette-picker"></div>
    <div id="gradient-picker"></div>
    <script>
        $("#palette-picker").kendoFlatColorPicker({
            preview: false,
            view: "palette",
            views: ["gradient", "palette"]
        });

        $("#gradient-picker").kendoFlatColorPicker({
            preview: false,
            view: "gradient",
            views: ["gradient", "palette"]
        });
    </script>
```

## See Also

* [Views of the FlatColorPicker (Demo)](https://demos.telerik.com/kendo-ui/flatcolorpicker/views)
* [JavaScript API Reference of the FlatColorPicker](/api/javascript/ui/flatcolorpicker)
