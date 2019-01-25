---
title: Resizing
page_title: jQuery Grid Documentation | Column Resizing | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to enable column resizing in order to modify the width of columns."
slug: column_resizing_kendoui_grid_widget
position: 2
---

# Column Resizing

When scrolling is disabled and a Grid column is resized, other columns change widths too, so that the sum of all column widths remains constant. If both the columns and the Grid `<div>` already have their minimum possible widths applied, then the resizing of the columns stops working. In such scenarios, either apply a larger width to the Grid, or enable scrolling.

When scrolling is enabled and a column is resized, all other columns maintain their widths. When column resizing is applied, there are three possible outcomes with regard to the sum of all column widths:

* If the sum of all column widths is greater than the width of the Grid, a horizontal scrollbar appears.
* If the sum of all column widths is equal to the width of the Grid, no horizontal scrollbar appears.
* If the sum of all column widths is less than the width of the Grid, an empty space after the last column appears.

By design, the last column of the Grid has no right border, so that no double border appears at the right end of the Grid if the Grid table width matches the Grid widget width. If needed, it is possible to apply a right border with the CSS code from the following example.

###### Example

    .k-grid-header-wrap > table,
    .k-grid-content > table {
        border-right: 1px solid #ccc;
    }

The color value of the `#ccc` border has to match the color of the cell border from the [Kendo UI theme]({% slug themesandappearnce_kendoui_desktopwidgets %}). To obtain this, check the styles of the table cell by using a DOM inspector.

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
