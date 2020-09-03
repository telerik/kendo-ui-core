---
title: Sticky Columns
page_title: jQuery Grid Documentation | Sticky Columns | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI supporting sticky columns that are visible at all times while the user scrolls the Grid horizontally."
previous_url: /appearance/columns/sticky-columns
slug: sticky_columns_kendoui_grid_widget
position: 3
---

# Sticky Columns

Sticky columns enable you to display specific columns at all times while the user scrolls the Grid horizontally. This specific column will be scrollable as well, however, it will fix its position to the left/right when it reaches left/right Grid border.

For a runnable example, refer to the demo on [implementing locked columns in the Grid](https://demos.telerik.com/kendo-ui/grid/sticky-columns).

For the feature to work properly, the following configuration settings has to be provided. They ensure that it is possible to scroll the columns horizontally. If the horizontal space intended for it is not enough, the horizontal scrollbar does not appear.
* Enable [scrolling](#scrolling).
* Stick columns initially or enable the stickable configuration so users can stick column on the fly.
* Define the height of the Grid.
* Set explicit pixel widths to all columns to allow the Grid to adjust the layout of the sticky and non-sticky columns.
* Make sure that the Grid is not [initialized inside a hidden container](#hidden-containers).

The [JavaScript API of the Grid](/api/javascript/ui/grid) allows you to stick and unstick columns on the fly. However, this is possible only if the stickable configuration is enabled during initialization. If a certain column needs to be open for the users to change its position to sticky/non-sticky this must be specified in the column declaration.
```
columns: [{
    field: "OrderID",
    stickable: true,
    width: 150
}]
```

## KB Articles on Locked Columns

* [Find Out More in the Knowledge Base](/knowledge-base)

## Known Limitations

* The sticky columns are not supported in Microsoft Internet Explorer.
* The sticky columns does not combine with [column virtualization](https://demos.telerik.com/kendo-ui/grid/column-virtualization).
* A column cannot be both sticky and locked. If it is, it will be locked. (The sticky configuration will be ignored.)
* All columns must have explicit pixel widths.
* The scrolling must be enabled.
* The header of the first column cannot be sticky.
* Generated columns(hierarchy, grouping) cannot be sticky.
* The [row template](https://demos.telerik.com/kendo-ui/grid/rowtemplate) and [detail features](https://demos.telerik.com/kendo-ui/grid/detailtemplate) are not supported in combination with sticky columns. 
* If [multi-column headers](https://demos.telerik.com/kendo-ui/grid/multicolumnheaders) are used, only a column at the topmost level can be sticky. When the Grid uses Multi-column headers - the "Set Column Position" menu will not be visible.




## See Also

* [Implementing Locked Columns in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/sticky-columns)
* [Knowledge Base](/knowledge-base)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)