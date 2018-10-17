---
title: Widths
page_title: Column Widths | Kendo UI Grid
description: "Learn how to modify the column widths of the Kendo UI Grid for jQuery."
slug: column_widths_kendoui_grid_widget
position: 1
---

# Column Widths

Column widths are set only through the [`width`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.width) property of the Grid columns. It is possible to set the width of the columns through the `col` elements when you create a Grid from an HTML `table`.  It is not recommended to use width styles for table cells.

Depending on whether scrolling is enabled, the columns of the Grid acquire different behavior.

By default, the scrolling in the Grid for Kendo UI for jQuery, UI for JSP, and UI for PHP is enabled. In the UI for ASP.NET MVC and UI for ASP.NET Core, the scrolling is disabled.

## Enabled scrolling

When the scrolling is enabled, the following applies:

* The `table-layout` style is set to `fixed`, and all columns without a defined width will appear equally wide.
* When the horizontal space is not enough, columns without a defined width will shrink to a zero width.
* The defined column widths will be obeyed regardless of the cell content.
* If the content of a cell cannot fit, it will either be wrapped or clipped.
* During the resizing of columns, only the resized column and the [table](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/fields/table) will change its widths.
* When a column is resized or hidden, the Grid applies a pixel width to its table elements. This is needed to maintain the widths of all remaining columns (except for the column that is currently resized or hidden).
* When all columns have pixel widths and their sum exceeds the width of the Grid a horizontal scrollbar appears.
* When all columns have pixel widths and their sum is less than the width of the Grid, the column widths are ignored, and the browser expands all columns.

## Disabled scrolling

When the scrolling is disabled, the following applies:

* The `table-layout` style is set to `auto`. If not explicitly set, the column widths are determined by the browser and by the cell content. This is the default behavior of HTML tables.
* The browser will try to obey all column widths that are set but might adjust some columns depending on their content.

## Frequently Asked Questions

### How can I make a non-scrollable Grid obey the columns widths?

**Workaround:** Change the `table-layout` to `fixed`:

        #GridID > table /* header + data table */
        {
            table-layout: fixed;
        }

### How can I avoid the rendering of blank space after the last column when the columns are resized to less than the width of a resizable Grid?

**Workaround:** Follow the approach of [Remove Trailing Space When Resizing Grid Columns](https://docs.telerik.com/kendo-ui/knowledge-base/grid-remove-trailing-space-resize) article.

### How can I remove the misalignment of the columns and headers when the Grid is resized in old Internet Explorer versions?

**Workaround:** Have at least one column without a specified width, so that it can adjust freely.


## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
