---
title: Widths
page_title: Column Widths | Kendo UI Grid
description: "Learn how to modify the column widths of the Kendo UI Grid for jQuery."
slug: column_widths_kendoui_grid_widget
position: 1
---

# Column Widths

Depending on whether scrolling is enabled, the columns of the Grid acquire different behavior.

By default, scrolling in the Grid for jQuery is enabled and the `table-layout` style is set to `fixed`. This means that all columns without a defined width will appear equally wide no matter what their content is. If the horizontal space is not enough, columns without a defined width might shrink to a zero width. All set column widths will be obeyed regardless of the cell content. If the content cannot fit, it will either be wrapped or clipped. During the resizing of columns, only the resized column will change its width and the other columns will persist their widths. To achieve this, the width of the table will change altogether.

When scrolling is disabled, the `table-layout` style is set to `auto`, which is the default behavior of HTML tables. This means that if not explicitly set, the column widths are determined by the browser and by the cell content. The browser will try to obey all column widths that are set, but might readjust some columns depending on their content.

If needed, apply a fixed table layout to a non-scrollable Grid.

###### Example

    #GridID > table /* header + data table */
    {
        table-layout: fixed;
    }

<!--*-->
Column widths are set only through the `width` property of the Grid columns. It is not recommended to use width styles for table cells. It is possible to set the width of the columns through the `col` elements when you create a Grid from an HTML `table`.

> **Important**
>
> [The Grid renders separate tables for the header and data area when scrolling is enabled](#scrolling). These tables need to have column widths that are synchronized. To ensure this, configure `table-layout` to `fixed`. As a result, it is not possible to have a scrollable Grid with automatic table layout&mdash;that is, automatic column widths, which depend on the cell content.

When all columns have pixel widths, their sum exceeds the width of the Grid, and scrolling is enabled, a horizontal scrollbar appears. If that sum is less than the width of the Grid, the column widths are ignored and all columns expand. This leads to undesired side effects&mdash;for example, when resizing columns. In old Internet Explorer versions, the column widths are obeyed, but misalignment occurs. That is why it is recommended to have at least one column without a specified width, so that it can adjust freely. Set explicit widths for all columns only if they are set in percentage, or if their sum exceeds the width of the Grid and the goal is to achieve horizontal scrolling.

When you resize and hide columns, scrolling is enabled, and all currently visible columns have explicit widths, the Grid applies a pixel width to its table elements, so that the widths of all remaining columns are maintained (except for the column that is currently resized or hidden).

If the Grid has no fixed width, resizes with the browser window, and scrolling is disabled, it is possible to apply a minimum width to the Grid. If the Grid has no fixed width, resizes with the browser window, and scrolling is enabled, it is possible to apply a minimum width to its two table elements. This prevents undesired side effects if the size of the browser window is reduced too much.

###### Example

    /* Apply minimum width to the Grid when scrolling is disabled. */

    #GridID
    {
        min-width: 800px;
    }

    /* Apply a minimum width to the tables when scrolling is enabled and nested tables (hierarchy) ARE NOT USED. */

    #GridID .k-grid-header-wrap > table, /* header table */
    #GridID .k-grid-content table, /* data table, no virtual scrolling */
    #GridID .k-virtual-scrollable-wrap table /* data table, with virtual scrolling */
    {
        min-width: 800px;
    }

    /* Apply a minimum width to the tables when scrolling is enabled and nested tables (hierarchy) ARE USED. */

    #GridID .k-grid-header-wrap > table, /* header table */
    #GridID .k-grid-content table, /* data table, no virtual scrolling */
    #GridID .k-virtual-scrollable-wrap table /* data table, with virtual scrolling */
    {
        min-width: 800px;
    }
    #GridID .k-grid-content table table, /* data table, no virtual scrolling */
    #GridID .k-virtual-scrollable-wrap table table /* data table, with virtual scrolling */
    {
        min-width: initial;
    }

<!--*-->
It is optional to use the `Grid ID` (Name) in the selectors from the previous example, which makes it possible to apply the styles to a particular Grid instance only.

It is possible to set column widths in percentage only if the sum of all widths is greater than 100% (a horizontal scrollbar is desired) and is the Grid tables have a (min-)width style. Otherwise, the tables will be as wide as the Grid (100%) and the columns will be narrower than desired. When column widths are set in percentage, the resizing of one column might lead to the resizing of the other columns too.

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
