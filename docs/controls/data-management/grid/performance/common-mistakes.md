---
title: Common Mistakes
page_title: jQuery Grid Documentation | Common Mistakes | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to avoid and handle the most common performance mistakes."
slug: performance_kendoui_grid_widget
position: 2
---

# Common Mistakes

This article lists the configuration approaches which most frequently affect the performance of the Grid.

* [Rendering everything](#rendering-everything)
* [Excessive use of editors or widgets directly in the columns](#excessive-use-of-editors-or-widgets-in-cells)
* [Extreme number of columns](#using-too-many-columns)
* [Expanding all content](#expanding-all-content)

## Rendering Everything

If the Grid displays too many records and columns without having its paging or virtual scrolling functionality enabled, the result is a huge amount of DOM elements and event listeners on the page. While some browsers can handle more records than others, avoid rendering more than 100 records per page without paging or virtualization. To find specific records, enable filtering which is faster than, for example, rendering 1,000 records and scrolling down to find what the user is looking for.

## Using Editors or Widgets in Cells Excessively

Rendering editors directly in the columns looks great but hinders performance. Initializing widgets in each cell is a slow operation and will be a major performance issue when the Grid displays many records. Additionally, if you use custom code for the two-way binding between the editors and the underlying data items, each change will initiate the re-rendering of the entire data which will trigger the re-initialization of the editors  and will lead to slow performance.

If you prevent the rebinding of the Grid after each change by removing the two-way binding and by manually changing the dataItem values (changing the properties without using the `set` method and setting the dirty property to `true`), you can edit multiple records without re-rendering the Grid. However, the issue with the initial initialization of the widget is still present and to work around it, reduce the `pageSize` up to five or ten records per page depending on the number of columns.

## Using Too Many Columns

While the Grid may have its paging or virtual scrolling enabled, having too many columns slows down the rendering of the rows because each column increases the cells in the DOM. You can hide the column by setting the `hidden` property to `true` but this approach will worsen the situation because the columns will be still rendered in the DOM and in addition to that they will receive `display: none` as an inline style.

To work around this issue, if your Grid displays up to 20 columns, define all of them in its configuration and decrease the `pageSize` to up to 50 (1,000 cells). You can also hide some of the columns and enable the `columnMenu` so that the user can choose which columns to display. However, if your Grid displays 100 or more columns, implement external logic for allowing the end user to choose a list of columns that will be rendered. You can then use that list to initialize the Grid with only that set of columns. The benefit of this approach is that no hidden columns will be rendered in the DOM and you will reduce the cell count drastically.

Another issue you might encounter when the Grid displays too many columns is the usage of the `autoFitColumn` method which traverses each column cell to retrieve the width of its content. To work around this behavior, avoid using `autoFitColumn`.

## Expanding All Content

Hierarchical Grids are fast when the records for the child Grids in the `detailTemplate` request the records only when the detail row is expanded. If you initially expand all detail rows, all child Grids will be initialized and multiple requests will be made.

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Rendering and Dimensions of the Grid]({% slug width_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
