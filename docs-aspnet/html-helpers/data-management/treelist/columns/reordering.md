---
title: Reordering
page_title: Reordering of Columns
description: "Get started with the Telerik UI TreeList HtmlHelper for {{ site.framework }} and learn how to implement columns that can be reordered by dragging and dropping."
slug: htmlhelpers_treelist_aspnetcore_column_reordering
position: 5
---

# Reordering of Columns

The TreeList provides options for reordering its columns.

To enable the user to reorder the columns of the TreeList by dragging, set the `Reorderable()` method to `true`. For a runnable example, refer to the [demo on implementing column reordering in the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/column-reordering).

         .Reorderable(reorderable => reorderable.Columns(true))

## See Also

* [Column Reordering by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/column-reordering)
* [Server-Side API](/api/treelist)
