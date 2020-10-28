---
title: Resizing
page_title: jQuery Grid Documentation | Resizing of Columns
description: "Get started with the jQuery Grid by Kendo UI and learn how to enable column resizing in order to modify the width of columns."
previous_url: /appearance/columns/resizing
slug: column_resizing_kendoui_grid_widget
position: 6
---

# Resizing of Columns

The resizing behavior of the Grid columns depends on whether scrolling is enabled or disabled.

For a runnable example, refer to the [demo on resizing columns in the Grid](https://demos.telerik.com/kendo-ui/grid/column-resizing).

When scrolling is disabled and a Grid column is resized, other columns change widths too, so that the sum of all column widths remains constant. If both the columns and the Grid `<div>` already have their minimum possible widths applied, then the resizing of the columns stops working. In such scenarios, use either of the following approaches:
* Apply a larger width to the Grid, or
* Enable scrolling.

When scrolling is enabled and a column is resized, all other columns maintain their widths. When column resizing is applied, the following outcomes with regard to the sum of all column widths are possible:
* If the sum of all column widths is greater than the width of the Grid, a horizontal scrollbar appears.
* If the sum of all column widths is equal to the width of the Grid, no horizontal scrollbar appears.
* If the sum of all column widths is less than the width of the Grid, an empty space after the last column appears.

By design, the last column of the Grid has no right border, so that no double border appears at the right end of the Grid if the Grid table width matches the Grid widget width. If needed, you can apply a right border with the CSS code from the following example. The color value of the `#ccc` border has to match the color of the cell border from the [Kendo UI theme]({% slug themesandappearnce_kendoui_desktopwidgets %}). To obtain this, check the styles of the table cell by using a DOM inspector.

    .k-grid-header-wrap > table,
    .k-grid-content > table {
        border-right: 1px solid #ccc;
    }

## KB Articles on Column Resizing

* [Resizing the Grid Columns from a Button]({% slug howto_resize_columnsfrom_abutton_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Column Resizing by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/column-resizing)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
