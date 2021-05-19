---
title: Column Virtualization
page_title: jQuery Grid Documentation | Column Virtualization
description: "Get started with the jQuery Grid by Kendo UI and learn how to enable its column virtualization."
slug: columnvirtualization_kendoui_grid_widget
---

# Column Virtualization

The Grid provides a built-in option for virtualizing its columns. To enable it, set the [`scollable.virtual`](/api/javascript/ui/grid/configuration/scrollable.virtual) property to `"columns"`. As a result, the columns outside the current visible aria of the Grid will not be rendered and this will improve the rendering performance. When scrolling is performed the visual subset of columns is changed accordingly.

> To work properly, the column virtualization requires you to set the [`columns.width`](/api/javascript/ui/grid/configuration/columns.width).

To enable virtualized columns:

```
    $("#grid").kendoGrid({
        scrollable: {
            virtual: "columns"
        }
    });
```

To enable both virtualized columns and rows:

```
    $("#grid").kendoGrid({
        scrollable: {
            virtual: "rows, columns"
        }
    });

```

## See Also

* [Column Virtualization by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/column-virtualization)
* [Virtual Scrolling of the Kendo UI Grid]({% slug virtual_scrolling_kendoui_grid_widget %})
* [Column Widths]({% slug column_widths_kendoui_grid_widget %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
