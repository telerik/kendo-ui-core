---
title: Sizing
page_title: jQuery Grid Documentation - Sizing
description: "Get started with the jQuery Grid by Kendo UI and learn about its sizing options."
slug: sizing_kendoui_grid
position: 6
---

# Sizing

The sizing feature of the jQuery Data Grid attempts at addressing the requirement for a compact grid component, which renders more items by utilizing the available space mainly through setting smaller paddings in its cells.

To increase or decrease the size of the Grid, utilize its [`size`](/api/javascript/ui/grid/configuration/size) configuration.

> Changing the `size` property affects different building blocks of the component such as tables, buttons, inputs, an dropdowns among others.

```javascript
    $("#compact-grid").kendoGrid({
        size: "small", // Set the size of the Grid to `small`.
    });
```

## Affected Elements

The `size` option does not affect elements which are displayed inside a popup such as a Filter Menu, Column Menu, and so on. By design, all popup elements are rendered on root level and not inside the Grid.

## See Also

* [Sizing the jQuery Data Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/sizing)
* [JavaScript API Reference of the jQuery Data Grid](/api/javascript/ui/grid)
