---
title: Keyboard Navigation
page_title: jQuery TileLayout Documentation | Keyboard Navigation
description: "Get started with the jQuery TileLayout by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_kendoui_tilelayout_widget
position: 5
---

# Keyboard Navigation

As of R1 2021, the Kendo UI TileLayout provides keyboard navigation.

For a complete example, refer to the [demo on using the keyboard navigation of the TileLayout](https://demos.telerik.com/kendo-ui/tilelayout/keyboard-navigation).  

The TileLayout supports its keyboard navigation functionality through the `navigatable` option. When set to `true`, you can initially focus the widget and modify the dimensions and order of its containers. The navigation occurs at a container-level.

The following example demonstrates how to enable the key navigation in the TileLayout.

```
    $("#tilelayout").kendoTileLayout({
        navigatable: true
        // options omitted for brevity
    });
```

## See Also

* [Keyboard Navigation by the Grid (Demo)](https://demos.telerik.com/kendo-ui/tilelayout/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
