---
title: Widths
page_title: jQuery Grid Documentation | Column Widths | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to modify its column widths."
previous_url: /appearance/columns/widths, /appearance/height#column-widths
slug: column_widths_kendoui_grid_widget
position: 1
---

# Column Widths

To set the widths of the Grid columns, use their [`width`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.width) property.

You can also set the width of the columns when you create a Grid from an HTML `table` through the `col` elements&mash;however, avoid this approach when you use width styles for table cells.

## Using Column Widths and Scrolling

Depending on whether scrolling is enabled, the columns of the Grid acquire different behavior:

* By default, scrolling is enabled for the Grid in Kendo UI for jQuery, UI for JSP, and UI for PHP. When scrolling is enabled:
    * The `table-layout` style is set to `fixed` and all columns without a defined width appear equally wide.
    * When the horizontal space is not enough, columns without a defined width shrink to a zero width.
    * Regardless of the cell content, the defined column widths are obeyed.
    * If the content of a cell cannot fit, the Grid will either wrap or clip it.
    * During the resizing of columns, only the resized column and the [`table`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/fields/table) will change its widths.
    * When a column is resized or hidden, the Grid applies a pixel width to its `table` elements. This behavior helps maintain the widths of all remaining columns except for the column that is currently resized or hidden.
    * When all columns have pixel widths and their sum exceeds the width of the Grid, a horizontal scrollbar appears.
    * When all columns have pixel widths and their sum is less than the width of the Grid, the column widths are ignored and the browser expands all columns.
* By default, scrolling is disabled for the Grid in UI for ASP.NET MVC and UI for ASP.NET Core. When scrolling is disabled:
    * The `table-layout` style is set to `auto`. If not explicitly defined, the column widths are determined by the browser and by the cell content, which is the default behavior of HTML tables.
    * The browser will try to obey all column widths that are set but might adjust the widths of some columns depending on their content.

## Common Scenarios

This sections provides information on common scenarios which require the implementation of column widths in the Grid.

### Making Non-Scrollable Grids Obey Column Widths

Change the `table-layout` to `fixed`.

      #GridID > table // Header and data table.
      {
          table-layout: fixed;
      }

### Avoiding Blank Space Rendering after Last columns

For more information on avoiding the blank space after the last column of the Grid when the columns are resized to less than the width of a resizable Grid, refer to the article on [removing trailing spaces when resizing Grid columns](https://docs.telerik.com/kendo-ui/knowledge-base/grid-remove-trailing-space-resize).

### Removing Column and Header Misalignment

To remove the misalignment of the columns and headers when the Grid is resized, provide at least one column without a specified width so that it can freely adjust.

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
