---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product_short }} TileLayout by Telerik UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_aspnetcore_tilelayout
position: 5
---

# Keyboard Navigation

As of R1 2021, the Telerik UI TileLayout for {{ site.platform }} provides keyboard navigation.

For a complete example, refer to the [demo on using the keyboard navigation of the TileLayout](https://demos.telerik.com/{{ site.platform }}/tilelayout/keyboard-navigation).  
The TileLayout supports its keyboard navigation functionality through the `navigatable` option. When set to `true`, you can initially focus the widget and modify the dimensions and order of its containers. The navigation occurs at a container-level.

The following example demonstrates how to enable the key navigation in the TileLayout.

```
    @(Html.Kendo().TileLayout()
        .Name("tilelayout")
        .Navigatable(true)
        // options omitted for brevity
    )
```

## See Also

* [Keyboard Navigation by the TileLayout HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tilelayout/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
