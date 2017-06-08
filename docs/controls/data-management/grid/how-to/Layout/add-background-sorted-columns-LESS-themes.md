---
title: Add a Background to the Sorted Columns with LESS Themes
page_title: Add a Background for the Sorted Columns with LESS Themes | Kendo UI Grid
description: "Learn how to add background color to the sorted columns with LESS themes"
slug: howto_add_background_sorted_columns_LESS_themes_grid
---

# Add a Background to the Sorted Columns with LESS Themes

This article demonstrates how to add background to the sorted columns of the Grid with [LESS themes](/styles-and-layout/appearance-styling).

To achieve this behavior:

1. Change the default background color of the Alternate row to RGBA color format with a low opaque level.
1. Add background color to the `.k-sorted` class by using RGBA color format.

> **Important**
>
> The `.k-sorted` class is available since the Kendo UI 2017 R2 SP1 release.

## Examples

### Dark themes

For dark themes, use lighter colors.

##### Example

For the Kendo UI **Black** theme, the CSS code could look like this:

```CSS
.k-grid .k-alt{
    background-color: rgba(255, 255, 255, 0.04);
}
col.k-sorted, th.k-sorted {
    background-color: rgba(255, 255, 255, 0.2);
}
``` 

##### Example

For the Kendo UI **Material Black** theme, the CSS code could look like this:

```CSS
.k-grid .k-alt{
    background-color: rgba(255, 255, 255, 0);
}
col.k-sorted, th.k-sorted {
    background-color: rgba(255, 255, 255, 0.1);
}
``` 

### Light themes

For light themes, use darker colors.

##### Example

For the Kendo UI **Default** theme, the CSS code could look like this:

```CSS
.k-grid .k-alt{
    background-color: rgba(0, 0, 0, 0.06);
}
col.k-sorted, th.k-sorted {
    background-color: rgba(0, 0, 0, 0.1);
}
``` 

##### Example

For the Kendo UI **Material** theme, the CSS code could look like this:

```CSS
.k-grid .k-alt{
    background-color: rgba(0, 0, 0, 0);
}
col.k-sorted, th.k-sorted {
    background-color: rgba(0, 0, 0, 0.1);
}
``` 

## Notes

If you skip overriding the the `k-alt` class, the background color of the `.k-sorted` class will not apply.

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [Grid Sorting Demo](http://demos.telerik.com/kendo-ui/grid/sorting)

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
