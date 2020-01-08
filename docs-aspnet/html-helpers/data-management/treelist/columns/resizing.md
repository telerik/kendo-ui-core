---
title: Resizing
page_title: Resizing of Columns
description: "Get started with the Telerik UI TreeList HtmlHelper for {{ site.framework }} and learn how to enable column resizing to modify the width of columns."
slug: htmlhelpers_treelist_aspnetcore_column_resizing
position: 4
---

# Resizing of Columns

The resizing behavior of the TreeList columns depends on whether scrolling is enabled or disabled.

For a runnable example, refer to the [demo on resizing columns in the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/column-resizing).

When scrolling is disabled and a TreeList column is resized, other columns change their widths too, so that the sum of all column widths remains constant. If both the columns and the TreeList `<div>` already have their minimum possible widths applied, then the resizing of the columns stops working. In such scenarios, use either of the following approaches:
* Apply a larger width to the TreeList, or
* Enable scrolling.

When scrolling is enabled and a column is resized, all other columns maintain their widths. When column resizing is applied, the following outcomes with regard to the sum of all column widths are possible:
* If the sum of all column widths is greater than the width of the TreeList, a horizontal scrollbar appears.
* If the sum of all column widths is equal to the width of the TreeList, no horizontal scrollbar appears.
* If the sum of all column widths is less than the width of the TreeList, an empty space after the last column appears.

By design, the last column of the TreeList has no right border, so that no double border appears at the right end of the TreeList if the TreeList table width matches the TreeList width. If needed, you can apply a right border with the CSS code from the following example. The color value of the `#ccc` border has to match the color of the cell border from the Kendo UI theme.

## See Also

* [Column Resizing by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/column-resizing)
* [Server-Side API](/api/treelist)
